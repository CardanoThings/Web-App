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

<div class="mb-8 flex flex-col gap-8 border-b border-dashed border-white sm:flex-row">
	<section id="blocks" class="sm:mb-8 sm:w-1/3">
		<div class="mb-4 text-white">
			<h1 class="text-3xl">Glossary</h1>
			<p class="mt-2 max-w-[90%] text-lg font-thin">
				A collection of terms and definitions related to all the tech used on CardanoThings.io.
			</p>
		</div>
		<Button
			href="/glossary"
			size="sm"
			class="bg-white text-xs text-black transition-all hover:bg-zinc-200"
			>View Full Glossary</Button
		>
	</section>

	<section id="hardware" class="sm:mb-8 sm:w-1/3">
		<div class="mb-4 text-white">
			<h1 class="text-3xl">Hardware</h1>
			<p class="mt-2 max-w-[90%] text-lg font-thin">
				Essential hardware components and development boards for building IoT projects on
				CardanoThings.io
			</p>
		</div>
		<Button
			href="/hardware"
			size="sm"
			class="bg-white text-xs text-black transition-all hover:bg-zinc-200"
			>View Hardware List</Button
		>
	</section>

	<section id="troubleshooting" class="mb-8 sm:w-1/3">
		<div class="mb-4 text-white">
			<h1 class="text-3xl">Troubleshooting</h1>
			<p class="mt-2 max-w-[90%] text-lg font-thin">
				Common issues and solutions for building IoT projects on CardanoThings.io
			</p>
		</div>
		<Button
			href="/troubleshooting"
			size="sm"
			class="bg-white text-xs text-black transition-all hover:bg-zinc-200"
			>View Troubleshooting Guide</Button
		>
	</section>
</div>

<div class="mb-8 w-full border-b border-dashed border-white pb-8">
	<FeaturedProjects />
</div>
