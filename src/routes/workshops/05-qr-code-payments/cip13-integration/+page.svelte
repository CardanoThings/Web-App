<script>
	import { page } from '$app/state';
	import IntroContainer from '$lib/base/IntroContainer.svelte';
	import SectionNavigator from '$lib/components/SectionNavigator.svelte';
	import WorkshopNavigation from '$lib/WorkshopNavigation.svelte';
	import FurtherResources from '$lib/components/FurtherResources.svelte';
	import TipBox from '$lib/components/TipBox.svelte';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { MoveLeft } from 'lucide-svelte';
	let parentPage = $derived(page.url.pathname.split('/')[2]);
	let { data } = $props();

	const cip13PaymentUriFormat = 'web+cardano:{address}?amount={amount}';
	const cip13PaymentUriExample = 'web+cardano:addr1qy...xyz?amount=10.5';
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
		<IntroContainer topic="CIPs" link="/introductions/cips" />
	</div>
</section>

<SectionNavigator>
	<section class="mb-16 flex flex-col gap-4 text-white">
		<h2 class="text-4xl font-medium">What are CIPs?</h2>
		<p class="text-lg font-thin text-white">
			Cardano Improvement Proposals (CIPs) are formalized design documents that serve as the primary
			mechanism for proposing new features, standards, and processes within the Cardano ecosystem.
			Similar to Bitcoin's BIPs or Ethereum's EIPs, CIPs ensure interoperability, document design
			decisions, and enable decentralized governance.
		</p>

		<p class="text-lg font-thin text-white">
			The CIP process is open and community-driven: anyone can propose a CIP, which then goes
			through discussion, review, and voting stages before implementation. This ensures that Cardano
			evolves in alignment with the community's collective vision and needs. You can explore all
			CIPs and learn more about the process at the <a
				href="https://cips.cardano.org/"
				target="_blank"
				rel="noopener noreferrer"
				class="link">official CIP repository</a
			>.
		</p>
		<TipBox title="Important" variant="info">
			Not all CIPs are supported by all wallets. Wallet developers choose which CIPs to implement
			based on their priorities and user needs. Always check wallet documentation to verify which
			CIPs are supported before building applications that depend on specific CIP implementations.
		</TipBox>
	</section>

	<section class="mb-16 flex flex-col gap-4 text-white">
		<h2 class="text-4xl font-medium">CIP-13: Cardano URI Scheme</h2>
		<p class="text-lg font-thin text-white">
			<a
				href="https://cips.cardano.org/cip/CIP-0013"
				target="_blank"
				rel="noopener noreferrer"
				class="link">CIP-13</a
			> defines a general standard URI scheme for Cardano with specific protocols for handling Ada transfers
			and other blockchain interactions. The standard is inspired by Bitcoin's BIP-21 and provides a
			way for applications to initiate wallet actions through URI links or QR codes.
		</p>
		<p class="text-lg font-thin text-white">
			CIP-13 enables developers to create payment links that can be clicked or scanned,
			automatically opening a compatible wallet with pre-populated transaction fields. This
			significantly improves the user experience for donations, payments, and other Cardano
			interactions.
		</p>
		<p class="text-lg font-thin text-white">
			The URI scheme uses the <code class="rounded bg-gray-800 px-2 py-1 text-white"
				>web+cardano:</code
			> prefix, depending on the context and browser requirements. For payment URIs, the address is specified
			directly after the colon, making it the default protocol when no authority is specified.
		</p>
		<p class="text-lg font-thin text-white">
			CIP-13 supports multiple authorities beyond payment URIs. The standard defines a <strong
				>stake pool authority</strong
			>
			(<code class="rounded bg-gray-800 px-2 py-1 text-white">//stake</code>) that allows creating
			URIs for delegating to stake pools or weighted lists of pools. Additional authorities can be
			defined in separate CIPs, allowing the URI scheme to be extended for new use cases without
			modifying the core specification.
		</p>
		<p class="text-lg font-thin text-white">
			<strong>Upcoming enhancements:</strong> Additional authorities are currently under
			development, including a <strong>browse authority</strong> that opens websites directly in the
			wallet browser (enabling mobile wallets to connect to dApps seamlessly) and an
			<strong>enhanced payment authority</strong>
			with support for native assets and metadata. These improvements are being discussed and developed
			in this
			<a
				href="https://github.com/cardano-foundation/CIPs/issues/836"
				target="_blank"
				rel="noopener noreferrer"
				class="link">CIP-0013 GitHub issue</a
			>, where the community is working to advance the standard and improve wallet interoperability.
		</p>
	</section>

	<section class="mb-16 flex flex-col gap-4 text-white">
		<h2 class="text-4xl font-medium">Cardano Payment URIs</h2>
		<p class="text-lg font-thin text-white">
			Payment URIs defined in CIP-13 allow you to create links that pre-populate a wallet with a
			recipient address and optional amount, making it easy for users to send payments without
			manually entering addresses.
		</p>
		<p class="text-lg font-thin text-white">A Cardano payment URI follows this format:</p>
		<div class="rounded-lg bg-gray-800/50 p-4 font-mono text-sm text-white">
			<pre>{cip13PaymentUriFormat}</pre>
		</div>
		<p class="text-lg font-thin text-white">Where:</p>
		<ul class="ml-6 list-disc space-y-2 text-lg font-thin text-white">
			<li>
				<strong>web+cardano:</strong> The protocol prefix
			</li>
			<li>
				<strong>&#123;address&#125;:</strong> A valid Cardano address (Bech32 format)
			</li>
			<li>
				<strong>amount:</strong> Optional parameter specifying the amount in decimal ADA (using period
				as decimal separator, no commas)
			</li>
		</ul>
		<p class="text-lg font-thin text-white">Example:</p>
		<div class="rounded-lg bg-gray-800/50 p-4 font-mono text-sm text-white">
			<pre>{cip13PaymentUriExample}</pre>
		</div>
		<p class="text-lg font-thin text-white">
			When a user clicks or scans a payment URI, a compatible wallet will open with the recipient
			address and amount (if specified) pre-filled. The user still needs to confirm and sign the
			transaction, ensuring security and preventing accidental payments.
		</p>
		<p class="mt-4 text-lg font-thin text-white">
			<strong>Note:</strong> The amount parameter is specified in ADA, not Lovelace. The wallet will
			handle the conversion to Lovelace (1 ADA = 1,000,000 Lovelace) when building the transaction and
			add the appropriate fees to cover the transaction costs.
		</p>
	</section>

	<section class="mb-16 flex flex-col gap-4 text-white">
		<h2 class="text-4xl font-medium">CIP-13 Support</h2>
		<p class="text-lg font-thin text-white">
			We will be using Yoroi Mobile for this workshop, which fully supports CIP-13 payment URIs.
			Make sure to install the Yoroi Mobile app on your smartphone with the mnemonic / keyphrase you
			created in the previous workshop.
		</p>

		<TipBox title="Testing Payment URIs" variant="info">
			Wallet support for CIP-13 may vary. Always test your payment URIs with the wallets your users
			are likely to use. Check the wallet's documentation or support channels for the most
			up-to-date information on CIP support.
		</TipBox>
	</section>

	<section class="mb-16 flex flex-col gap-4 text-white">
		<h2 class="text-4xl font-medium">Whats Next?</h2>
		<p class="text-lg font-thin text-white">
			Now that you know how to create payment URIs, in the next workshop we will learn how to create
			a QR-Code with a CIP-13 Payment URI on your microcontroller display that can be scanned to
			send a transaction by using your smartphone and a mobile wallet like Yoroi.
		</p>
	</section>

	<FurtherResources
		resources={[
			{
				title: 'CIP Repository',
				url: 'https://cips.cardano.org/',
				description:
					'The official Cardano Improvement Proposals repository. Browse all CIPs, learn about the CIP process, and explore standards for the Cardano ecosystem.'
			},
			{
				title: 'CIP-13 Specification',
				url: 'https://cips.cardano.org/cip/CIP-0013',
				description:
					'The complete specification for CIP-13 Cardano URI Scheme, including payment URIs, stake pool URIs, grammar definitions, and security considerations.'
			},
			{
				title: 'CIP-1: CIP Process',
				url: 'https://cips.cardano.org/cips/cip1/',
				description:
					'Learn about the CIP process itself, including how to propose, discuss, and structure a Cardano Improvement Proposal.'
			}
		]}
	/>
</SectionNavigator>

<WorkshopNavigation />
