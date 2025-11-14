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
			on the Cardano blockchain and available for most browsers and mobile devices. Head over to the
			<a href="https://yoroi-wallet.com/" target="_blank" class="link">Yoroi website</a> and install
			the extension for your browser.
		</p>
	</section>

	<section class="mb-16 flex flex-col gap-4 text-white">
		<h2 class="text-4xl font-medium">Create a Wallet</h2>
		<p class="text-lg font-thin text-white">
			Once you have installed the Yoroi extension, you can create a wallet by clicking on the
			"Create Wallet" button in the extension. You will need to create a password and a recovery
			phrase. The recovery phrase is important and you will need to backup it in a safe place. Once
			you have created the wallet, you will be able to use it to send and receive tADA.
		</p>
		<ul>
			<li>We highly recommend creating a new wallet for this workshop.</li>
			<li>Write down your recovery phrase in a safe place and do not share it with anyone.</li>
		</ul>
	</section>

	<section class="mb-16 flex flex-col gap-4 text-white">
		<h2 class="text-4xl font-medium">Request tADA</h2>
		<p class="text-lg font-thin text-white">
			Now we will request some tADA to your wallet - tADA is the testnet version of ADA and is used
			for testing purposes. Follow the steps below to request tADA:
		</p>

		<ol class="font-normal">
			<li>
				Switch to the Preprod Testnet in the Yoroi extension: Go to Settings and click on "Switch
				Network" and select "Preprod Testnet". An orange banner at the top of the extension will
				indicate that you are on the Preprod Testnet.
			</li>
			<li>
				Go to the Wallet-Tab and switch to the tab called "Receive" - here you will find your
				receive address. Copy it to the clipboard.
			</li>
			<li>
				Go to https://docs.cardano.org/cardano-testnets/tools/faucet select "Preprod Testnet" as
				environment and "Receive test ADA" as action, then paste your receive address into the input
				field. Click on "Request funds".
			</li>
		</ol>

		<p class="text-lg font-thin text-white">
			You will receive tADA in your wallet shortly. You can check the balance in the Wallet-Tab of
			Yoroi.
		</p>
	</section>
</SectionNavigator>

<WorkshopNavigation />
