<script>
	import { page } from '$app/state';
	import SectionNavigator from '$lib/components/SectionNavigator.svelte';
	import WorkshopNavigation from '$lib/WorkshopNavigation.svelte';
	import { MoveLeft } from 'lucide-svelte';
	let parentPage = $derived(page.url.pathname.split('/')[2]);
</script>

<section class="mb-8 flex flex-col gap-4 text-white">
	<a href={`/workshops/${parentPage}`} class="flex items-center gap-2">
		<MoveLeft size="20" />
		<h1 class="text-lg font-normal text-white sm:max-w-[50%]">Workshop 04: Cardano Ticker</h1>
	</a>
	<h2 class="text-6xl font-medium text-white sm:max-w-[50%]">Gathering data</h2>
	<p class="text-lg font-thin text-white sm:max-w-[50%]">
		We will go through the process of fetching and setting up all the data on your own API: First we check
		your own (or any other) wallet, see what is in there, fetch token prices from the Realfi.info API and
		some NFT floors from JPG.store and put it all together to be requested by your microcontroller. We
		will also introduce you to the paid Taptools API.
	</p>
</section>

<SectionNavigator>
	<section class="mb-16 flex flex-col gap-4 text-white">
		<div class="rounded-lg border border-yellow-500/50 bg-yellow-500/10 p-8 text-center">
			<h2 class="mb-4 text-3xl font-medium text-yellow-400">Work in Progress</h2>
			<p class="text-lg font-thin text-white">
				This workshop is currently under development. Content will be available soon.
			</p>
		</div>
	</section>
</SectionNavigator>

<WorkshopNavigation />
