<script>
	import { page } from '$app/state';
	import IntroContainer from '$lib/base/IntroContainer.svelte';
	import SectionNavigator from '$lib/components/SectionNavigator.svelte';
	import WorkshopNavigation from '$lib/WorkshopNavigation.svelte';
	import { MoveLeft } from 'lucide-svelte';
	import { Button } from '$lib/components/ui/button/index.js';
	let parentPage = $derived(page.url.pathname.split('/')[2]);
</script>

<section class="mb-16 flex flex-col gap-4 text-white">
	<a href={`/workshops/${parentPage}`} class="flex items-center gap-2">
		<MoveLeft size="20" />
		<h1 class="text-lg font-normal text-white sm:max-w-[50%]">Workshop 04: Cardano Ticker</h1>
	</a>
	<h2 class="text-6xl font-medium text-white sm:max-w-[50%]">Building the Ticker</h2>
	<p class="text-lg font-thin text-white sm:max-w-[50%]">
		With most of the building blocks already in place from former workshops, you will learn more about
		the Arduino TFT_eSPI Library, how to work with fonts, images and sprites and how to animate text, to
		make your ticker interesting and visually beautiful.
	</p>
</section>

<SectionNavigator>
	<section class="mb-16 flex flex-col gap-4 text-white">
		<h2 class="text-4xl font-medium">Advanced TFT_eSPI Features</h2>
		<p class="text-lg font-thin text-white"></p>
	</section>

	<section class="mb-16 flex flex-col gap-4 text-white">
		<h2 class="text-4xl font-medium">Working with Fonts</h2>
		<p class="text-lg font-thin text-white"></p>
	</section>

	<section class="mb-16 flex flex-col gap-4 text-white">
		<h2 class="text-4xl font-medium">Using Images and Sprites</h2>
		<p class="text-lg font-thin text-white"></p>
	</section>

	<section class="mb-16 flex flex-col gap-4 text-white">
		<h2 class="text-4xl font-medium">Animating Text</h2>
		<p class="text-lg font-thin text-white"></p>
	</section>

	<section class="mb-16 flex flex-col gap-4 text-white">
		<h2 class="text-4xl font-medium">Displaying the Ticker Data</h2>
		<p class="text-lg font-thin text-white"></p>
	</section>

	<section class="mb-16 flex flex-col gap-4 text-white">
		<h2 class="text-4xl font-medium">Final Polish</h2>
		<p class="text-lg font-thin text-white"></p>
	</section>
</SectionNavigator>

<WorkshopNavigation />

