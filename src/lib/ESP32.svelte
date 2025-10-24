<script>
	import { onMount } from 'svelte';
	let container;
	let renderer, scene, camera, controls;
	let width = 0;
	let height = 0;
	export let modelUrl = '';

	onMount(async () => {
		// Dynamically import Three.js and GLTFLoader
		const THREE = await import('three');
		const { GLTFLoader } = await import('three/examples/jsm/loaders/GLTFLoader.js');
		const { OrbitControls } = await import('three/examples/jsm/controls/OrbitControls.js');

		renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
		renderer.setClearColor(0x000000, 0); // Transparent background
		renderer.shadowMap.enabled = true;
		renderer.shadowMap.type = THREE.PCFSoftShadowMap;
		container.appendChild(renderer.domElement);

		// Camera must be created before resizeRenderer is called
		camera = new THREE.PerspectiveCamera(45, 2, 0.1, 1000);
		camera.position.set(0, 20, -50); // Slightly above, looking down

		function resizeRenderer() {
			if (container && camera) {
				width = container.clientWidth;
				height = width / 2; // 2:1 aspect ratio
				renderer.setSize(width, height, false);
				camera.aspect = width / height;
				camera.updateProjectionMatrix();
				container.style.height = height + 'px';
			}
		}
		resizeRenderer();
		window.addEventListener('resize', resizeRenderer);

		scene = new THREE.Scene();
		scene.background = null; // Transparent background

		// camera is now created above

		controls = new OrbitControls(camera, renderer.domElement);
		controls.enableDamping = true;
		controls.dampingFactor = 0.05;

		// Lighting
		const ambientLight = new THREE.AmbientLight(0xffffff, 2.5); // Very bright base
		scene.add(ambientLight);

		const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0xcccccc, 2.0); // Very bright fill
		hemisphereLight.position.set(0, 20, 0);
		scene.add(hemisphereLight);

		const dirLight1 = new THREE.DirectionalLight(0xffffff, 3.5);
		dirLight1.position.set(10, 20, 10);
		dirLight1.castShadow = true;
		dirLight1.shadow.mapSize.width = 1024;
		dirLight1.shadow.mapSize.height = 1024;
		dirLight1.shadow.camera.near = 0.5;
		dirLight1.shadow.camera.far = 0;
		scene.add(dirLight1);

		const dirLight2 = new THREE.DirectionalLight(0xffffff, 2.0);
		dirLight2.position.set(-10, 10, -10);
		scene.add(dirLight2);

		// Load GLB or GLTF
		const gltfLoader = new GLTFLoader();
		let modelGroup = null;
		let modelCenter = new THREE.Vector3(0, 0, 0);
		gltfLoader.load(
			modelUrl,
			(gltf) => {
				const root = gltf.scene;
				// Center the model
				const box = new THREE.Box3().setFromObject(root);
				const size = box.getSize(new THREE.Vector3());
				const center = box.getCenter(new THREE.Vector3());
				root.position.sub(center);
				modelCenter.copy(center);
				// Auto-scale to fit scene if needed
				const maxDim = Math.max(size.x, size.y, size.z);
				const desiredSize = 30; // Target size for the largest dimension
				if (maxDim > 0) {
					const scale = desiredSize / maxDim;
					root.scale.set(scale, scale, scale);
				}
				// Rotate as before
				root.rotation.z = Math.PI / 2;
				root.rotation.x = Math.PI / 2;
				// Enable shadows for all meshes
				root.traverse((child) => {
					if (child.isMesh) {
						child.castShadow = true;
						child.receiveShadow = true;
					}
				});
				scene.add(root);
				modelGroup = root;
			},
			(xhr) => {
				// Progress
				if (xhr.lengthComputable) {
					const percent = (xhr.loaded / xhr.total) * 100;
				}
			},
			(error) => {
				console.error('Error loading GLTF:', error);
			}
		);

		// Spherical coordinates for orbit
		// Store the actual initial camera position for non-mirrored transition
		const initialCameraPosition = { x: 0, y: 20, z: -50 };
		const initial = {
			angle: 0,
			radius: Math.sqrt(
				Math.pow(initialCameraPosition.x, 2) + Math.pow(initialCameraPosition.z, 2)
			),
			height: initialCameraPosition.y,
			phi: Math.atan2(20, 50)
		};
		let angle = initial.angle;
		let autoRotate = true;
		let autoRotateTimeout;
		let lerpProgress = 1; // 1 means at target, <1 means transitioning
		let lerpStart = { x: 0, y: 0, z: 0 };
		let lerpEnd = { x: 0, y: 0, z: 0 };
		// Keep track of original orbit point
		let orbitCenter = new THREE.Vector3();
		function setAutoRotateTimeout() {
			if (autoRotateTimeout) clearTimeout(autoRotateTimeout);
			autoRotateTimeout = setTimeout(() => {
				// Store the current model world position as the orbit center
				if (modelGroup) {
					orbitCenter = modelGroup.getWorldPosition(new THREE.Vector3());
				} else {
					orbitCenter = new THREE.Vector3(0, 0, 0);
				}

				// Start smooth transition back to the closest point on the original orbit
				lerpStart = { x: camera.position.x, y: camera.position.y, z: camera.position.z };

				// Get current camera position relative to orbit center
				const relativeX = camera.position.x - orbitCenter.x;
				const relativeY = camera.position.y - orbitCenter.y;
				const relativeZ = camera.position.z - orbitCenter.z;

				// Calculate the closest angle on the orbit path to the current camera position
				// This finds the angle that represents the closest point on our orbit circle
				const currentAngle = Math.atan2(relativeX, -relativeZ);

				// Use this angle to calculate the target position on the orbit
				const radius = initial.radius;
				const height = initial.height;

				// Calculate target position on the original orbit path
				const targetVector = new THREE.Vector3(
					radius * Math.sin(currentAngle),
					height, // Keep the original height
					-radius * Math.cos(currentAngle)
				);

				// Set the end position to the point on the orbit path
				lerpEnd = {
					x: orbitCenter.x + targetVector.x,
					y: orbitCenter.y + targetVector.y,
					z: orbitCenter.z + targetVector.z
				};

				// Update the orbit angle to match where we'll end up
				angle = currentAngle;

				lerpProgress = 0;
				autoRotate = true;
			}, 10000); // 10 seconds
		}
		function stopAutoRotate() {
			if (autoRotate) {
				autoRotate = false;
				setAutoRotateTimeout();
			}
		}
		controls.addEventListener('start', stopAutoRotate);
		renderer.domElement.addEventListener('keydown', stopAutoRotate);
		function getModelWorldPosition(local) {
			if (!modelGroup) return local;
			// Transform local position by model's world matrix
			return modelGroup.localToWorld(local.clone());
		}

		function animate() {
			requestAnimationFrame(animate);
			if (autoRotate && modelGroup) {
				if (lerpProgress < 1) {
					// Smoothly interpolate camera position
					lerpProgress += 0.02; // Adjust speed as needed
					if (lerpProgress >= 1) {
						lerpProgress = 1;
						// After lerp, set angle so orbit resumes seamlessly
						// Calculate angle relative to orbit center
						const relativeX = camera.position.x - orbitCenter.x;
						const relativeZ = camera.position.z - orbitCenter.z;
						angle = Math.atan2(relativeX, -relativeZ); // Note the negative Z for correct orientation
					} else {
						camera.position.x = lerpStart.x + (lerpEnd.x - lerpStart.x) * lerpProgress;
						camera.position.y = lerpStart.y + (lerpEnd.y - lerpStart.y) * lerpProgress;
						camera.position.z = lerpStart.z + (lerpEnd.z - lerpStart.z) * lerpProgress;
					}
					// Look at model's world center
					camera.lookAt(orbitCenter);
				} else {
					// Normal auto-rotation (around Y axis)
					angle += 0.01; // Adjust speed as needed

					// Get current model world position for orbit center
					orbitCenter = modelGroup.getWorldPosition(new THREE.Vector3());

					// Calculate radius from initial position
					const radius = initial.radius;
					const height = initial.height;

					// Compute orbit position relative to model center
					const orbitVector = new THREE.Vector3(
						radius * Math.sin(angle), // Note: sin and cos flipped for correct rotation
						height,
						-radius * Math.cos(angle)
					);

					// Set camera position by adding orbit vector to orbit center
					camera.position.copy(orbitCenter.clone().add(orbitVector));
					camera.lookAt(orbitCenter);
				}
			}
			controls.update();
			renderer.render(scene, camera);
		}
		animate();

		return () => {
			renderer.dispose();
			controls.dispose();
			scene.clear();
		};
	});
</script>

<div bind:this={container} style="width: 100%; position: relative; background: transparent;"></div>
