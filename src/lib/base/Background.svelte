<script>
  import { onMount } from "svelte";

  let canvas;
  let animationId;
  let noise;

  // Perlin noise implementation
  function perlinNoise() {
    const p = [
      151, 160, 137, 91, 90, 15, 131, 13, 201, 95, 96, 53, 194, 233, 7, 225,
      140, 36, 103, 30, 69, 142, 8, 99, 37, 240, 21, 10, 23, 190, 6, 148, 247,
      120, 234, 75, 0, 26, 197, 62, 94, 252, 219, 203, 117, 35, 11, 32, 57, 177,
      33, 88, 237, 149, 56, 87, 174, 20, 125, 136, 171, 168, 68, 175, 74, 165,
      71, 134, 139, 48, 27, 166, 102, 143, 54, 65, 25, 63, 161, 1, 215, 104,
      142, 212, 57, 106, 203, 190, 57, 74, 76, 88, 207, 208, 239, 170, 251, 67,
      77, 51, 133, 69, 249, 2, 127, 80, 60, 159, 168, 81, 163, 64, 143, 146,
      157, 56, 245, 188, 182, 218, 33, 16, 255, 243, 210, 205, 12, 19, 236, 95,
      151, 68, 23, 196, 167, 126, 61, 100, 93, 25, 115, 96, 129, 79, 220, 34,
      42, 144, 136, 70, 238, 184, 20, 222, 94, 11, 219, 224, 50, 58, 10, 73, 6,
      36, 92, 194, 211, 172, 98, 145, 149, 228, 121, 231, 200, 55, 109, 141,
      213, 78, 169, 108, 86, 244, 234, 101, 122, 174, 10, 241, 196, 123, 14,
      118, 168, 106, 30, 83, 55, 66, 90, 130, 57, 210, 31, 24, 123, 58, 130,
      180, 160,
    ];

    const fade = (t) => t * t * t * (t * (t * 6 - 15) + 10);
    const lerp = (t, a, b) => a + t * (b - a);
    const grad = (hash, x, y) => {
      const h = hash & 15;
      const u = h < 8 ? x : y;
      const v = h < 8 ? y : x;
      return ((h & 1) === 0 ? u : -u) + ((h & 2) === 0 ? v : -v);
    };

    return (x, y) => {
      const xi = Math.floor(x) & 255;
      const yi = Math.floor(y) & 255;
      const xf = x - Math.floor(x);
      const yf = y - Math.floor(y);

      const u = fade(xf);
      const v = fade(yf);

      const aa = p[p[xi] + yi];
      const ab = p[p[xi] + yi + 1];
      const ba = p[p[xi + 1] + yi];
      const bb = p[p[xi + 1] + yi + 1];

      const x1 = lerp(u, grad(aa, xf, yf), grad(ba, xf - 1, yf));
      const x2 = lerp(u, grad(ab, xf, yf - 1), grad(bb, xf - 1, yf - 1));
      return lerp(v, x1, x2);
    };
  }

  // Wavy circle: many radial points, perlin noise controls radius
  class WavyCircle {
    constructor(color, width, height) {
      // random center that can slightly overflow the viewport
      this.cx = width * (Math.random() * 1.4 - 0.2);
      this.cy = height * (Math.random() * 1.4 - 0.2);
      this.color = color; // expect a low-alpha rgba string
      this.offset = Math.random() * 10;
    }

    draw(ctx, baseRadius, time) {
      const steps = 360; // points around circle
      const pts = new Array(steps);
      const amp = Math.max(12, baseRadius * 0.45);

      for (let i = 0; i < steps; i++) {
        const angle = (i / steps) * Math.PI * 2;
        const nx = Math.cos(angle);
        const ny = Math.sin(angle);
        // sample noise; tune scale and time so motion is smooth
        const n = noise(
          nx * 0.9 + this.offset + time * 0.15,
          ny * 0.9 + this.offset + time * 0.35
        );
        // perlin here returns values roughly in [-1,1]; map to radius offset
        const r = baseRadius + n * amp * 0.6;
        pts[i] = [this.cx + Math.cos(angle) * r, this.cy + Math.sin(angle) * r];
      }

      // fill the polygon once with the given low-alpha color
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(pts[0][0], pts[0][1]);
      for (let i = 1; i < steps; i++) ctx.lineTo(pts[i][0], pts[i][1]);
      ctx.closePath();
      ctx.fillStyle = this.color; // low alpha (e.g. 0.01) recommended
      ctx.fill();
      ctx.restore();
    }
  }

  let circles = [];

  function animate() {
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const w = canvas.width;
    const h = canvas.height;
    const time = Date.now() * 0.0005;

    // background
    ctx.fillStyle = "#100212";
    ctx.fillRect(0, 0, w, h);

    const baseRadius = Math.min(w, h) * 0.48;

    // draw each wavy circle (each color)
    for (let i = 0; i < circles.length; i++) {
      circles[i].draw(ctx, baseRadius, time);
    }

    animationId = requestAnimationFrame(animate);
  }

  function initCircles() {
    // original low-alpha palette — these are intentionally very faint
    const colors = [
      "rgba(100,100,120,0.1)",
      "rgba(0,0,50,255.1)",
      "rgba(200,0,220,0.1)",
      "rgba(128,0,250,0.1)",
      "rgba(0,190,250,0.1)",
      "rgba(255,255,250,0.05)",
      "rgba(0,0,0,0.7)",
    ];

    circles = [];
    for (let i = 0; i < colors.length; i++) {
      circles.push(new WavyCircle(colors[i], canvas.width, canvas.height));
    }
  }

  onMount(() => {
    if (!canvas) return;
    noise = perlinNoise();
    const ctx = canvas.getContext("2d");

    const resize = () => {
      // make canvas slightly larger than the viewport so circles can overflow
      canvas.width = Math.ceil(window.innerWidth * 1.1);
      canvas.height = Math.ceil(window.innerHeight * 1.1);
      initCircles();
    };

    resize();
    window.addEventListener("resize", resize);
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationId);
    };
  });
</script>

<canvas
  bind:this={canvas}
  class="fixed top-0 left-0 w-full h-full -z-10"
  style="display: block; background: #100212;"
></canvas>

<style>
  :global(canvas) {
    pointer-events: none;
    width: 100vw;
    height: 100vh;
  }
</style>
