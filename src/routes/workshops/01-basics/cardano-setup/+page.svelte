<script>
	import { page } from '$app/state';
	import IntroContainer from '$lib/base/IntroContainer.svelte';
	import SectionNavigator from '$lib/components/SectionNavigator.svelte';
	import WorkshopNavigation from '$lib/components/WorkshopNavigation.svelte';
	import { MoveLeft } from 'lucide-svelte';
	import { Button } from '$lib/components/ui/button/index.js';
	let parentPage = $derived(page.url.pathname.split('/')[2]);
</script>

<section class="mb-16 flex flex-col gap-4 text-white">
	<a href={`/workshops/${parentPage}`} class="flex items-center gap-2">
		<MoveLeft size="20" />
		<h1 class="text-lg font-normal text-white sm:max-w-[50%]">Workshop 01: The Basics</h1>
	</a>
	<h2 class="text-6xl font-medium text-white sm:max-w-[50%]">Cardano Setup</h2>
	<p class="text-lg font-thin text-white sm:max-w-[50%]">
		The easiest way to get started on Cardano is using a wallet extension for your browser. We will
		use Yoroi for this workshop, but you can use any wallet extension that supports the Preprod
		Testnet.
	</p>
	<div class="mt-4 sm:w-1/2">
		<IntroContainer topic="Cardano" />
	</div>
</section>

<SectionNavigator>
	<section class="mb-16 flex flex-col gap-4 text-white">
		<h2 class="text-4xl font-medium">Install Yoroi</h2>
		<p class="text-lg font-thin text-white">
			Yoroi is a wallet extension for the Cardano blockchain. It is one of the most popular wallets
			on the Cardano blockchain and available for most browsers and mobile devices.
		</p>

		<div class="sm:w-1/2">
			<Button
				href="https://yoroi-wallet.com/"
				target="_blank"
				rel="noopener noreferrer"
				variant="secondary"
				class="text-xs"
				size="sm">Install Yoroi</Button
			>
		</div>
	</section>

	<section class="mb-16 flex flex-col gap-4 text-white">
		<h2 class="text-4xl font-medium">Create a Wallet</h2>
		<p class="text-lg font-thin text-white">
			To create a wallet, you need to click on the "Create Wallet" button in the Yoroi extension.
		</p>
	</section>

	<section class="mb-16 flex flex-col gap-4 text-white">
		<h2 class="text-4xl font-medium">Request tADA</h2>
		<p class="text-lg font-thin text-white">
			To request tADA, you need to click on the "Request tADA" button in the Yoroi extension.
		</p>
	</section>
</SectionNavigator>

<WorkshopNavigation />
