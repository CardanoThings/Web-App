<script>
	import { page } from '$app/state';
	import SectionNavigator from '$lib/components/SectionNavigator.svelte';
	import WorkshopNavigation from '$lib/WorkshopNavigation.svelte';
	import FurtherResources from '$lib/components/FurtherResources.svelte';
	import { MoveLeft } from 'lucide-svelte';
	let parentPage = $derived(page.url.pathname.split('/')[2]);
	let { data } = $props();
</script>

<section class="mb-8 flex flex-col gap-4 text-white">
	<a href={`/workshops/${parentPage}`} class="flex items-center gap-2">
		<MoveLeft size="20" />
		<h1 class="text-lg font-normal text-white sm:max-w-[50%]">{data.workshop.title}</h1>
	</a>
	<h2 class="text-6xl font-medium text-white sm:max-w-[50%]">{data.step.title}</h2>
	<p class="text-lg font-thin text-white sm:max-w-[50%]">
		{data.step.description}
	</p>
</section>

<SectionNavigator>
	<section class="mb-16 flex flex-col gap-4 text-white">
		<h2 class="text-4xl font-medium">Before we get started</h2>
	</section>

	<section class="mb-16 flex flex-col gap-4 text-white">
		<h2 class="text-4xl font-medium">Checking wallet contents</h2>
	</section>

	<section class="mb-16 flex flex-col gap-4 text-white">
		<h2 class="text-4xl font-medium">Fetching data from Minswap</h2>
	</section>

	<section class="mb-16 flex flex-col gap-4 text-white">
		<h2 class="text-4xl font-medium">Fetching data from jpeg.store</h2>
	</section>

	<section class="mb-16 flex flex-col gap-4 text-white">
		<h2 class="text-4xl font-medium">The TapTools API</h2>
	</section>

	<FurtherResources
		resources={[
			{
				title: 'Minswap',
				url: 'https://minswap.org/',
				description:
					"Cardano's leading decentralized exchange. Trade tokens, provide liquidity, and access DeFi on Cardano."
			},
			{
				title: 'JPG.store',
				url: 'https://www.jpg.store/',
				description:
					'The #1 Cardano NFT marketplace. Buy, sell, and discover NFTs with no escrow and instant transactions.'
			},
			{
				title: 'TapTools',
				url: 'https://www.taptools.io/',
				description:
					'Comprehensive Cardano analytics platform. Track tokens, portfolios, and market data with detailed insights.'
			}
		]}
	/>
</SectionNavigator>

<WorkshopNavigation />
