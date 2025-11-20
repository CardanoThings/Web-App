<script>
	import { page } from '$app/state';
	import IntroContainer from '$lib/base/IntroContainer.svelte';
	import SectionNavigator from '$lib/components/SectionNavigator.svelte';
	import WorkshopNavigation from '$lib/WorkshopNavigation.svelte';
	import SyntaxHighlighter from '$lib/components/SyntaxHighlighter.svelte';
	import * as Card from '$lib/components/ui/card/index.js';
	import { MoveLeft } from 'lucide-svelte';
	import { Button } from '$lib/components/ui/button/index.js';
	let parentPage = $derived(page.url.pathname.split('/')[2]);
	let { data } = $props();
</script>

<section class="mb-8 flex flex-col gap-4 text-white">
	<a href={`/workshops/${parentPage}`} class="flex items-center gap-2">
		<MoveLeft size="20" />
		<h1 class="text-lg font-normal text-white sm:max-w-[50%]">Workshop 05: QR-Code Payments</h1>
	</a>
	<h2 class="text-6xl font-medium text-white sm:max-w-[50%]">CIP13 Integration</h2>
	<p class="text-lg font-thin text-white sm:max-w-[50%]">
		You will learn about Cardano Improvement Proposals (CIPs) in general and in the specific case of
		CIP13, which lets you create payment URIs for Cardano mobile wallets. Of cause, you'll get a brief
		introduction into various mobile wallets, too.
	</p>
</section>

<SectionNavigator>
	<section class="mb-16 flex flex-col gap-4 text-white">
		<h2 class="text-4xl font-medium">Introduction to CIPs</h2>
		<p class="text-lg font-thin text-white">
			Cardano Improvement Proposals (CIPs) are documents that describe standards, processes, or features
			for the Cardano ecosystem. They are similar to Ethereum's EIPs (Ethereum Improvement Proposals) or
			Bitcoin's BIPs (Bitcoin Improvement Proposals).
		</p>
		<p class="text-lg font-thin text-white">
			<strong>What are CIPs?</strong>
		</p>
		<ul>
			<li>
				Standards that define how things should work on Cardano
			</li>
			<li>
				Proposed by community members and developers
			</li>
			<li>
				Reviewed and discussed before implementation
			</li>
			<li>
				Help ensure interoperability between different applications and wallets
			</li>
		</ul>
		<p class="text-lg font-thin text-white">
			You can find all CIPs at
			<a href="https://cips.cardano.org/" target="_blank" class="link">cips.cardano.org</a>. Each CIP has
			a number and describes a specific standard or feature.
		</p>
	</section>

	<section class="mb-16 flex flex-col gap-4 text-white">
		<h2 class="text-4xl font-medium">Understanding CIP13</h2>
		<p class="text-lg font-thin text-white">
			<a href="https://cips.cardano.org/cips/cip13/" target="_blank" class="link">CIP-13</a> defines a
			standard URI scheme for Cardano payments. It allows applications to create payment links that can
			be opened by Cardano wallets, similar to how "bitcoin:" URIs work for Bitcoin.
		</p>
		<p class="text-lg font-thin text-white">
			<strong>CIP-13 URI Format:</strong>
		</p>
		<p class="text-lg font-thin text-white font-mono text-sm bg-gray-800 p-2 rounded text-white">
			web+cardano://[address]?amount=[lovelace]&label=[label]
		</p>
		<p class="text-lg font-thin text-white">
			<strong>Components:</strong>
		</p>
		<ul>
			<li>
				<code class="bg-gray-800 px-2 py-1 rounded text-white">web+cardano://</code> - The URI scheme
				identifier
			</li>
			<li>
				<code class="bg-gray-800 px-2 py-1 rounded text-white">[address]</code> - Cardano address to
				receive payment
			</li>
			<li>
				<code class="bg-gray-800 px-2 py-1 rounded text-white">amount</code> - Payment amount in
				Lovelace (optional)
			</li>
			<li>
				<code class="bg-gray-800 px-2 py-1 rounded text-white">label</code> - Payment label/memo
				(optional)
			</li>
		</ul>
		<p class="text-lg font-thin text-white">
			<strong>Example:</strong>
		</p>
		<p class="text-lg font-thin text-white font-mono text-sm bg-gray-800 p-2 rounded text-white">
			web+cardano://addr_test1q...?amount=10000000&label=Coffee
		</p>
		<p class="text-lg font-thin text-white">
			This URI represents a payment of 10 ADA (10,000,000 Lovelace) to the specified address with the
			label "Coffee".
		</p>
	</section>

	<section class="mb-16 flex flex-col gap-4 text-white">
		<h2 class="text-4xl font-medium">Cardano Mobile Wallets</h2>
		<p class="text-lg font-thin text-white">
			Several Cardano mobile wallets support CIP-13 payment URIs. Here are the most popular ones:
		</p>

		<h3 class="mt-4 text-2xl font-medium">Yoroi Wallet</h3>
		<p class="text-lg font-thin text-white">
			<a href="https://yoroi-wallet.com/" target="_blank" class="link">Yoroi</a> is one of the most
			popular Cardano wallets, available on both iOS and Android. It's free, open source, and has been
			around since the early days of Cardano.
		</p>
		<ul>
			<li>Free and open source</li>
			<li>Supports both Mainnet and Testnet</li>
			<li>Supports CIP-13 payment URIs</li>
			<li>User-friendly interface</li>
		</ul>

		<h3 class="mt-4 text-2xl font-medium">Vespr Wallet</h3>
		<p class="text-lg font-thin text-white">
			<a href="https://vespr.xyz/" target="_blank" class="link">Vespr</a> is a modern Cardano wallet
			with a focus on user experience and design.
		</p>
		<ul>
			<li>Modern, intuitive interface</li>
			<li>Supports CIP-13</li>
			<li>Available on iOS and Android</li>
		</ul>

		<h3 class="mt-4 text-2xl font-medium">Begin Wallet</h3>
		<p class="text-lg font-thin text-white">
			<a href="https://begin.is/" target="_blank" class="link">Begin</a> is a user-friendly Cardano
			wallet designed for beginners.
		</p>
		<ul>
			<li>Simple, beginner-friendly interface</li>
			<li>Supports CIP-13</li>
			<li>Available on iOS and Android</li>
		</ul>

		<h3 class="mt-4 text-2xl font-medium">Other Wallets</h3>
		<p class="text-lg font-thin text-white">
			Other wallets that support CIP-13 include Nami (browser extension and mobile), Eternl (formerly
			CCVault), and others. Check each wallet's documentation to confirm CIP-13 support.
		</p>
	</section>

	<section class="mb-16 flex flex-col gap-4 text-white">
		<h2 class="text-4xl font-medium">Creating Payment URIs</h2>
		<p class="text-lg font-thin text-white">
			Now let's implement a function to create CIP-13 payment URIs. Here's how to do it in Arduino:
		</p>

		<Card.Root>
			<Card.Header class="mb-0 pb-0">
				<Card.Title>Arduino CIP-13 URI Creation</Card.Title>
			</Card.Header>
			<Card.Content>
				<SyntaxHighlighter language="cpp" code={data.cip13UriCode} />
			</Card.Content>
			<Card.Footer>
				<p class="text-xs leading-relaxed">
					This code creates CIP-13 payment URIs from payment details. The function converts ADA to
					Lovelace, URL-encodes the label, and constructs the proper URI format that mobile wallets
					can recognize.
				</p>
			</Card.Footer>
		</Card.Root>

		<p class="text-lg font-thin text-white">
			<strong>Node.js Version:</strong>
		</p>
		<Card.Root>
			<Card.Header class="mb-0 pb-0">
				<Card.Title>Node.js CIP-13 URI Creation</Card.Title>
			</Card.Header>
			<Card.Content>
				<SyntaxHighlighter language="javascript" code={data.nodeCip13Code} />
			</Card.Content>
			<Card.Footer>
				<p class="text-xs leading-relaxed">
					If you're using a Node.js API server, you can create CIP-13 URIs on the server side and
					send them to your microcontroller. This example shows how to do it in JavaScript.
				</p>
			</Card.Footer>
		</Card.Root>

		<h3 class="mt-4 text-2xl font-medium">Important Notes</h3>
		<ul>
			<li>
				Amounts must be specified in <strong>Lovelace</strong> (not ADA). 1 ADA = 1,000,000 Lovelace
			</li>
			<li>
				Labels and other parameters should be URL-encoded to handle special characters
			</li>
			<li>
				The address must be a valid Cardano address (starts with "addr" for mainnet or "addr_test" for
				testnet)
			</li>
			<li>
				Amount and label are optional - you can create a URI with just an address
			</li>
		</ul>
	</section>

	<section class="mb-16 flex flex-col gap-4 text-white">
		<h2 class="text-4xl font-medium">Implementing CIP13</h2>
		<p class="text-lg font-thin text-white">
			To integrate CIP-13 into your payment system:
		</p>
		<ol>
			<li>
				Get the payment amount from your UI (from the previous step)
			</li>
			<li>
				Get the recipient address (your wallet address)
			</li>
			<li>
				Optionally add a payment label/memo
			</li>
			<li>
				Create the CIP-13 URI using the function above
			</li>
			<li>
				Convert the URI to a QR code (next step)
			</li>
		</ol>
		<p class="text-lg font-thin text-white">
			<strong>Wallet Comparison:</strong>
		</p>
		<Card.Root>
			<Card.Header>
				<Card.Title>Cardano Mobile Wallets</Card.Title>
			</Card.Header>
			<Card.Content>
				<SyntaxHighlighter language="cpp" code={data.walletComparison} />
			</Card.Content>
		</Card.Root>
		<p class="text-lg font-thin text-white">
			All these wallets support CIP-13, so users can scan your QR code with any of them to make
			payments. This interoperability is one of the key benefits of using standards like CIP-13.
		</p>
	</section>
</SectionNavigator>

<Card.Root class="mt-8 bg-transparent text-white sm:w-3/4">
	<Card.Header>
		<Card.Title>Resources</Card.Title>
		<Card.Description>
			Here are some resources to help you learn more about CIP-13 and Cardano wallets.
		</Card.Description>
	</Card.Header>
	<Card.Content>
		<ul>
			<li>
				<a href="https://cips.cardano.org/cips/cip13/" target="_blank" class="link">CIP-13 Specification</a>
				<p class="text-sm font-thin text-white">Official CIP-13 documentation.</p>
			</li>
			<li>
				<a href="https://cips.cardano.org/" target="_blank" class="link">Cardano CIPs</a>
				<p class="text-sm font-thin text-white">Browse all Cardano Improvement Proposals.</p>
			</li>
			<li>
				<a href="https://yoroi-wallet.com/" target="_blank" class="link">Yoroi Wallet</a>
				<p class="text-sm font-thin text-white">Popular Cardano mobile wallet.</p>
			</li>
			<li>
				<a href="https://vespr.xyz/" target="_blank" class="link">Vespr Wallet</a>
				<p class="text-sm font-thin text-white">Modern Cardano wallet with great UX.</p>
			</li>
		</ul>
	</Card.Content>
</Card.Root>

<WorkshopNavigation />

