<script>
  import ESP32 from "$lib/ESP32.svelte";
  import SectionWorkshops from "$lib/SectionWorkshops.svelte";
  import SectionIntroductions from "$lib/SectionIntroductions.svelte";
  import SectionBlocks from "$lib/SectionBlocks.svelte";
  let { data } = $props();
</script>

<!-- <div id="esp32" class="relative w-full h-[600px] mb-16">
  <ESP32 modelUrl="/models/esp32c6.gltf" />
</div> -->

<section class="flex">
  <h1 class="text-white font-thin text-8xl">
    Cardano meets the Internet of Things.
  </h1>
</section>

<SectionWorkshops />

<SectionIntroductions />

<SectionBlocks />
