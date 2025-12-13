<script>
	import { Button } from '$lib/components/ui/button/index.js';
	import SectionWorkshops from '$lib/SectionWorkshops.svelte';
	import SectionIntroductions from '$lib/SectionIntroductions.svelte';
	import SectionBlocks from '$lib/SectionBlocks.svelte';
	import FeaturedProjects from '$lib/FeaturedProjects.svelte';
	let { data } = $props();
</script>

<!-- <div id="esp32" class="relative w-full h-[600px] mb-16">
  <ESP32 modelUrl="/models/esp32c6.gltf" />
</div> -->

<section class="flex w-3/4">
	<h1 class="mb-16 text-8xl font-thin text-white">Cardano meets the Internet of Things.</h1>
</section>

<div class="mb-12 w-full border-b border-dashed border-white">
	<SectionWorkshops />
</div>

<div class="mb-8 w-full border-b border-dashed border-white">
	<SectionIntroductions />
</div>

<!-- <div class="mb-8 w-full border-b border-dashed border-white">
	<SectionBlocks />
</div> -->

<div class="mb-8 flex border-b border-dashed border-white">
	<section id="blocks" class="mb-8 w-1/2">
		<div class="mb-4 text-white">
			<h1 class="text-3xl">Glossary</h1>
			<p class="mt-2 max-w-[90%] text-lg font-thin">
				A collection of terms and definitions related to all the tech used on CardanoThings.io.
			</p>
		</div>
		<Button href="/glossary" class="bg-white text-black transition-all hover:bg-zinc-200"
			>View Full Glossary</Button
		>
	</section>

	<section id="hardware" class="mb-8 w-1/2">
		<div class="mb-4 text-white">
			<h1 class="text-3xl">Hardware</h1>
			<p class="mt-2 max-w-[90%] text-lg font-thin">
				Essential hardware components and development boards for building IoT projects on
				CardanoThings.io
			</p>
		</div>
		<Button href="/hardware" class="bg-white text-black transition-all hover:bg-zinc-200"
			>View Hardware List</Button
		>
	</section>
</div>

<!-- <div class="mb-8 w-full border-b border-dashed border-white pb-8">
	<FeaturedProjects />
</div> -->
