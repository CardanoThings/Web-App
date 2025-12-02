<script>
	import { page } from '$app/state';
	import IntroContainer from '$lib/base/IntroContainer.svelte';
	import PingPongWallet from '$lib/base/PingPongWallet.svelte';
	import FurtherResources from '$lib/components/FurtherResources.svelte';
	import SectionNavigator from '$lib/components/SectionNavigator.svelte';
	import WorkshopNavigation from '$lib/WorkshopNavigation.svelte';
	import { MoveLeft } from 'lucide-svelte';

	let { data } = $props();
	let parentPage = $derived(page.url.pathname.split('/')[2]);
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

		<ol>
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

	<section class="mb-16 flex flex-col gap-4 text-white">
		<h2 class="text-4xl font-medium">Sending and Receiving tADA</h2>
		<p class="text-lg font-thin text-white">
			Now that you have tADA in your wallet, you can practice sending and receiving transactions.
			This is essential for testing your IoT projects that interact with the Cardano blockchain.
		</p>

		<div class="mt-4 mb-4">
			<PingPongWallet />
		</div>

		<p class="text-lg font-thin text-white">
			To send tADA, go to the "Send" tab in your Yoroi wallet, enter the recipient address and the
			amount you want to send. You can use the PingPong wallet address above to test sending
			transactions - it will automatically send the tADA back to you (minus a small fee for the
			transaction).
		</p>
	</section>

	<section class="mb-16 flex flex-col gap-4 text-white">
		<h2 class="text-4xl font-medium">Checking Transactions</h2>
		<p class="text-lg font-thin text-white">
			After sending or receiving a transaction, you can verify it on the blockchain using a
			blockchain explorer like CardanoScan. To do this, you'll need the transaction hash (txhash).
		</p>

		<h3 class="mt-4 text-2xl font-medium">What is a Transaction Hash (txhash)?</h3>
		<p class="text-lg font-thin text-white">
			A transaction hash, also known as a txhash or transaction ID, is a unique identifier for a
			specific transaction on the blockchain. It's a long hexadecimal string that acts like a
			fingerprint for that transaction. On Cardano, transaction hashes look like this:
			<code class="rounded bg-white/10 px-1 py-0.5 font-mono text-sm"
				>d4d57c0339eb955c4c5f80d87779bbf6b820aa0387b2349adf2f7c7ce074c909</code
			>
			- a 64-character hexadecimal string (they do not start with "0x" like some other blockchains).
			Every transaction on Cardano has a unique txhash that can be used to look up all the details about
			that transaction.
		</p>

		<h3 class="mt-6 text-2xl font-medium">Finding Your Transaction Hash</h3>
		<p class="text-lg font-thin text-white">
			In your Yoroi wallet, you can find the transaction hash for any transaction you've sent or
			received:
		</p>
		<ol class="ml-4 list-decimal space-y-2">
			<li>Go to the "Transactions" tab in your Yoroi wallet</li>
			<li>Click on any transaction in the list</li>
			<li>
				You'll see the transaction details, including the transaction hash (a 64-character
				hexadecimal string, for example: <code
					class="rounded bg-white/10 px-1 py-0.5 font-mono text-xs"
					>d4d57c0339eb955c4c5f80d87779bbf6b820aa0387b2349adf2f7c7ce074c909</code
				>)
			</li>
			<li>Copy the transaction hash</li>
		</ol>

		<h3 class="mt-6 text-2xl font-medium">Looking Up Transactions on CardanoScan</h3>
		<p class="text-lg font-thin text-white">
			Once you have the transaction hash, you can look it up on
			<a href="https://preprod.cardanoscan.io/" target="_blank" class="link">Preprod CardanoScan</a>
			to see all the details:
		</p>
		<ol class="ml-4 list-decimal space-y-2">
			<li>
				Go to <a href="https://preprod.cardanoscan.io/" target="_blank" class="link"
					>preprod.cardanoscan.io</a
				>
			</li>
			<li>Paste the transaction hash into the search bar</li>
			<li>
				You'll see detailed information about the transaction, including:
				<ul class="mt-1 ml-4 list-disc space-y-1 text-sm">
					<li>The sender and receiver addresses</li>
					<li>The amount transferred</li>
					<li>The transaction fee</li>
					<li>The block number and timestamp</li>
					<li>The transaction status (confirmed or pending)</li>
				</ul>
			</li>
		</ol>

		<p class="text-lg font-thin text-white">
			This is especially useful when testing your IoT projects - you can verify that transactions
			were successfully sent and received by checking them on CardanoScan.
		</p>

		<p class="text-lg font-thin text-white">
			While CardanoScan is a popular choice, there are other Cardano blockchain explorers you can
			use as well, such as <a href="https://adastat.net/" target="_blank" class="link">Adastat</a>,
			<a href="https://cexplorer.io/" target="_blank" class="link">Cexplorer</a>, and
			<a href="https://pool.pm/" target="_blank" class="link">pool.pm</a>. Each explorer may have
			slightly different features or interfaces, but they all allow you to look up transactions,
			addresses, and other blockchain data.
		</p>
	</section>

	<FurtherResources
		resources={[
			{
				title: 'Cardano.org',
				url: 'https://cardano.org/',
				description:
					'Official Cardano website with information about the blockchain, wallets, staking, governance, and more.'
			},
			{
				title: 'Preprod CardanoScan',
				url: 'https://preprod.cardanoscan.io/',
				description:
					'Look up transactions, blocks, and all kinds of blockchain data on the Preprod testnet.'
			},
			{
				title: 'Adastat',
				url: 'https://adastat.net/',
				description:
					'Cardano blockchain explorer for viewing transactions, addresses, and blockchain data.'
			},
			{
				title: 'Cexplorer',
				url: 'https://cexplorer.io/',
				description:
					'Cardano blockchain explorer providing detailed information about transactions, addresses, epochs, and more.'
			},
			{
				title: 'pool.pm',
				url: 'https://pool.pm/',
				description:
					'Cardano blockchain explorer and NFT viewer for exploring transactions, addresses, and tokens.'
			},
			{
				title: 'Lido Nation',
				url: 'https://lidonation.com/',
				description:
					'Great resources and articles about Cardano and blockchain in general, covering topics from basics to advanced concepts.'
			}
		]}
	/>
</SectionNavigator>

<WorkshopNavigation />
