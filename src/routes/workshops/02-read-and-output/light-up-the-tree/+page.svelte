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
		<h1 class="text-lg font-normal text-white sm:max-w-[50%]">Workshop 02: Read and Output</h1>
	</a>
	<h2 class="text-6xl font-medium text-white sm:max-w-[50%]">Light up the tree</h2>
	<p class="text-lg font-thin text-white sm:max-w-[50%]">
		In this step of this workshop you will learn how to use your Microcontroller with external hardware
		like a 110V/220V relais to turn a lightbulb (or the Christmas Tree for that matter) on and off based
		on on-chain events. We will also look briefly into other options like motors, LEDs and other
		hardware.
	</p>
</section>

<SectionNavigator>
	<section class="mb-16 flex flex-col gap-4 text-white">
		<h2 class="text-4xl font-medium">Introduction to External Hardware</h2>
		<p class="text-lg font-thin text-white"></p>
	</section>

	<section class="mb-16 flex flex-col gap-4 text-white">
		<h2 class="text-4xl font-medium">Setting up the Relay</h2>
		<p class="text-lg font-thin text-white"></p>
	</section>

	<section class="mb-16 flex flex-col gap-4 text-white">
		<h2 class="text-4xl font-medium">Connecting to On-Chain Events</h2>
		<p class="text-lg font-thin text-white"></p>
	</section>

	<section class="mb-16 flex flex-col gap-4 text-white">
		<h2 class="text-4xl font-medium">Other Hardware Options</h2>
		<p class="text-lg font-thin text-white"></p>
	</section>
</SectionNavigator>

<WorkshopNavigation />

