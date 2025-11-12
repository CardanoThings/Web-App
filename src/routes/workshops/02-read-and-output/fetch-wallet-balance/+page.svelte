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
	<h2 class="text-6xl font-medium text-white sm:max-w-[50%]">Fetch your Wallet Balance</h2>
	<p class="text-lg font-thin text-white sm:max-w-[50%]">
		You will learn how to fetch your wallet balance in intervals using your Microcontroller and an API,
		output the fetched data to the Arduino console and listen for changes. We will also introduce you to
		other API endpoints and look into different APIs like Blockfrost or Maestro.
	</p>
</section>

<SectionNavigator>
	<section class="mb-16 flex flex-col gap-4 text-white">
		<h2 class="text-4xl font-medium">Introduction</h2>
		<p class="text-lg font-thin text-white"></p>
	</section>

	<section class="mb-16 flex flex-col gap-4 text-white">
		<h2 class="text-4xl font-medium">Setting up the API</h2>
		<p class="text-lg font-thin text-white"></p>
	</section>

	<section class="mb-16 flex flex-col gap-4 text-white">
		<h2 class="text-4xl font-medium">Fetching the Balance</h2>
		<p class="text-lg font-thin text-white"></p>
	</section>

	<section class="mb-16 flex flex-col gap-4 text-white">
		<h2 class="text-4xl font-medium">Listening for Changes</h2>
		<p class="text-lg font-thin text-white"></p>
	</section>
</SectionNavigator>

<WorkshopNavigation />

