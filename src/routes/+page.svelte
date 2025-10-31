<script>
	import ESP32 from '$lib/ESP32.svelte';
	import SectionWorkshops from '$lib/SectionWorkshops.svelte';
	import SectionIntroductions from '$lib/SectionIntroductions.svelte';
	import SectionHardware from '$lib/SectionHardware.svelte';
	import SectionBlocks from '$lib/SectionBlocks.svelte';
	import SectionGlossary from '$lib/SectionGlossary.svelte';
	let { data } = $props();
</script>

<!-- <div id="esp32" class="relative w-full h-[600px] mb-16">
  <ESP32 modelUrl="/models/esp32c6.gltf" />
</div> -->

<section class="flex">
	<h1 class="mb-12 text-8xl font-thin text-white">Cardano meets the Internet of Things.</h1>
</section>

<div class="mb-16 w-full border-b border-dashed border-white">
	<SectionWorkshops />
</div>

<div class="mb-16 w-full border-b border-dashed border-white">
	<SectionIntroductions />
</div>

<div class="mb-16 w-full border-b border-dashed border-white">
	<SectionHardware />
</div>

<div class="mb-16 w-full border-b border-dashed border-white">
	<SectionBlocks />
</div>

<div class="mb-16 w-full border-b border-dashed border-white">
	<SectionGlossary />
</div>
