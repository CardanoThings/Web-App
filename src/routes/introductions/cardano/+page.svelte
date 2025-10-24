<script>
	import * as Card from '$lib/components/ui/card/index.js';
	import GlossaryTracker from '$lib/components/GlossaryTracker.svelte';
</script>

<GlossaryTracker as="section">
	<h1 class="mb-4" use:glossaryHover>Introduction to Cardano</h1>

	<section class="mb-4">
		<p>
			Cardano is a decentralized public blockchain and cryptocurrency project that aims to provide a
			scalable, secure, and sustainable platform for the development of decentralized applications
			(dApps). Founded in 2015 by Charles Hoskinson, Jeremy Wood, and John Ouzilleau, Cardano has
			grown into one of the largest and most ambitious blockchain projects globally. Its native
			cryptocurrency is called Ada (ADA).
		</p>
	</section>

	<section class="mb-4">
		<h2>History</h2>

		<p>
			Cardano's development was initiated in 2015 as a response to the perceived limitations of
			existing blockchain platforms, such as Bitcoin and Ethereum. The project focused on creating a
			more scalable, secure, and sustainable platform by developing its own proof-of-stake consensus
			algorithm, referred to as Ouroboros. In September 2017, Cardano launched its mainnet, followed
			by the listing of ADA on several major exchanges in October 2017.
		</p>
	</section>

	<section class="mb-4">
		<h2>Key Features</h2>

		<ul>
			<li>
				<strong>Proof-of-Stake (PoS) Consensus:</strong> Cardano uses a proof-of-stake consensus algorithm
				called Ouroboros to secure the network.
			</li>
			<li>
				<strong>Scalability:</strong> Cardano is designed to handle a high volume of transactions per
				second, making it more scalable than other blockchain platforms.
			</li>
			<li>
				<strong>Security:</strong> The platform incorporates various security features, including a formal
				verification process and a novel cryptography-based solution for preventing 51% attacks.
			</li>
			<li>
				<strong>Interoperability:</strong> Cardano aims to enable seamless interactions between different
				blockchain systems through its interoperability protocols.
			</li>
		</ul>
	</section>

	<section class="mb-4">
		<Card.Root class="border-0 bg-slate-800 p-2 text-white shadow-none">
			<Card.Header class="p-4 pb-0 pt-2 ">
				<Card.Title class="text-lg font-medium">Getting started</Card.Title>
				<Card.Description class="mb-0 p-0 text-white">
					To get started with development on Cardano, follow these steps:
				</Card.Description>
			</Card.Header>
			<Card.Content class="p-4">
				<ol>
					<li>
						Download a wallet browsers extension or mobile app with support for the Preprod testnet
						(e.g.
						<a
							href="https://www.yoroiwallet.com"
							target="_blank"
							rel="noopener noreferrer"
							class="link">Yoroi</a
						>,
						<a href="https://begin.is" target="_blank" rel="noopener noreferrer" class="link"
							>Begin
						</a>,
						<a href="https://vespr.xyz" target="_blank" rel="noopener noreferrer" class="link"
							>Vespr
						</a>)
					</li>
					<li>Create or restore a wallet and switch to the Preprod Network</li>
					<li>
						Copy your wallet address and request tAda (the testnet currency) from the official
						faucet:
						<a
							href="https://docs.cardano.org/cardano-testnets/tools/faucet"
							target="_blank"
							rel="noopener noreferrer"
							class="link">Cardano Faucet</a
						>
					</li>
				</ol>
			</Card.Content>
		</Card.Root>
	</section>

	<section class="mt-8">
		<h2 class="text-lg">Further Resources</h2>
		<ul>
			<li>
				<a href="https://cardano.org" target="_blank" rel="noopener noreferrer" class="link"
					>Cardano Official Website</a
				>
			</li>
			<li>
				<a href="https://docs.cardano.org" target="_blank" rel="noopener noreferrer" class="link"
					>Cardano Documentation</a
				>
			</li>
			<li>
				<a href="https://forum.cardano.org" target="_blank" rel="noopener noreferrer" class="link"
					>Cardano Forum</a
				>
			</li>
		</ul>
	</section>
</GlossaryTracker>
