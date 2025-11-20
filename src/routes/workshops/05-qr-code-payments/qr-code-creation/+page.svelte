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
	<h2 class="text-6xl font-medium text-white sm:max-w-[50%]">QR-Code Creation</h2>
	<p class="text-lg font-thin text-white sm:max-w-[50%]">
		You will learn how to create and display a QR-Code with a CIP-13 Payment URI on your microcontroller
		display that can be scanned to send a transaction by using your smartphone and a mobile wallet (tbd).
	</p>
</section>

<SectionNavigator>
	<section class="mb-16 flex flex-col gap-4 text-white">
		<h2 class="text-4xl font-medium">Introduction to QR Codes</h2>
		<p class="text-lg font-thin text-white">
			QR (Quick Response) codes are two-dimensional barcodes that can store various types of data,
			including text, URLs, and payment information. They're perfect for mobile payments because users
			can simply scan the code with their smartphone camera.
		</p>
		<p class="text-lg font-thin text-white">
			<strong>Why QR Codes for Payments?</strong>
		</p>
		<ul>
			<li>
				Easy to scan with any smartphone camera
			</li>
			<li>
				Can store complex data (like CIP-13 URIs) in a small space
			</li>
			<li>
				Works offline (the QR code contains all necessary information)
			</li>
			<li>
				Fast and convenient for users
			</li>
			<li>
				No need to manually type addresses or amounts
			</li>
		</ul>
		<p class="text-lg font-thin text-white">
			For Cardano payments, we'll encode the CIP-13 payment URI into a QR code, which mobile wallets
			can scan and automatically open with the correct payment details pre-filled.
		</p>
	</section>

	<section class="mb-16 flex flex-col gap-4 text-white">
		<h2 class="text-4xl font-medium">QR Code Libraries</h2>
		<p class="text-lg font-thin text-white">
			To generate QR codes on Arduino/ESP32, you'll need a QR code library. The most popular option is
			the QRCode library by ricardocosme.
		</p>
		<p class="text-lg font-thin text-white">
			<strong>Installing the Library:</strong>
		</p>
		<ol>
			<li>Open Arduino IDE</li>
			<li>Go to <strong>Sketch → Include Library → Manage Libraries</strong></li>
			<li>Search for "QRCode"</li>
			<li>Install "QRCode" by ricardocosme</li>
		</ol>
		<p class="text-lg font-thin text-white">
			<strong>Library Features:</strong>
		</p>
		<ul>
			<li>
				Generates QR codes from text strings
			</li>
			<li>
				Supports multiple QR code versions (1-40)
			</li>
			<li>
				Configurable error correction levels
			</li>
			<li>
				Low memory footprint
			</li>
			<li>
				Easy to use API
			</li>
		</ul>
		<Card.Root>
			<Card.Header>
				<Card.Title>QR Code Library Information</Card.Title>
			</Card.Header>
			<Card.Content>
				<SyntaxHighlighter language="cpp" code={data.qrLibraryInfo} />
			</Card.Content>
		</Card.Root>
	</section>

	<section class="mb-16 flex flex-col gap-4 text-white">
		<h2 class="text-4xl font-medium">Generating QR Codes</h2>
		<p class="text-lg font-thin text-white">
			Let's start with a simple example to understand how QR code generation works:
		</p>

		<Card.Root>
			<Card.Header class="mb-0 pb-0">
				<Card.Title>Simple QR Code Example</Card.Title>
			</Card.Header>
			<Card.Content>
				<SyntaxHighlighter language="cpp" code={data.simpleQRCode} />
			</Card.Content>
			<Card.Footer>
				<p class="text-xs leading-relaxed">
					This basic example generates a QR code from a text string and displays it on the TFT
					screen. The QR code is drawn pixel by pixel, with white squares for data modules and black
					for empty spaces.
				</p>
			</Card.Footer>
		</Card.Root>

		<h3 class="mt-4 text-2xl font-medium">How it works</h3>
		<ul>
			<li>
				<i>qrcode_initText()</i> creates the QR code structure from your text data
			</li>
			<li>
				<i>qrcode_getModule()</i> checks if each position in the QR code should be filled (black) or
				empty (white)
			</li>
			<li>
				You draw each module as a small rectangle on the display
			</li>
			<li>
				The scale factor determines how large each module appears (larger = easier to scan, but takes
				more screen space)
			</li>
		</ul>
	</section>

	<section class="mb-16 flex flex-col gap-4 text-white">
		<h2 class="text-4xl font-medium">Displaying on the Screen</h2>
		<p class="text-lg font-thin text-white">
			Now let's create a complete implementation that generates a QR code from a CIP-13 payment URI:
		</p>

		<Card.Root>
			<Card.Header class="mb-0 pb-0">
				<Card.Title>Complete QR Code Payment Display</Card.Title>
			</Card.Header>
			<Card.Content>
				<SyntaxHighlighter language="cpp" code={data.qrCodeCode} />
			</Card.Content>
			<Card.Footer>
				<p class="text-xs leading-relaxed">
					This complete example creates a CIP-13 payment URI, generates a QR code from it, and
					displays it on the TFT screen. The QR code is centered and scaled appropriately for the
					display size. Users can scan this QR code with their mobile wallet to make a payment.
				</p>
			</Card.Footer>
		</Card.Root>

		<h3 class="mt-4 text-2xl font-medium">Key Features</h3>
		<ul>
			<li>
				<strong>CIP-13 URI Generation:</strong> Creates proper payment URIs from amount and address
			</li>
			<li>
				<strong>QR Code Generation:</strong> Converts URI to QR code format
			</li>
			<li>
				<strong>Centered Display:</strong> Calculates position to center QR code on screen
			</li>
			<li>
				<strong>Scaling:</strong> Scales QR code modules for optimal size and scanability
			</li>
			<li>
				<strong>Payment Info:</strong> Displays payment amount below QR code
			</li>
		</ul>

		<h3 class="mt-4 text-2xl font-medium">Optimization Tips</h3>
		<ul>
			<li>
				Use appropriate QR code version - version 3-4 is usually sufficient for CIP-13 URIs
			</li>
			<li>
				Choose error correction level based on your needs (ECC_MEDIUM is a good balance)
			</li>
			<li>
				Ensure QR code is large enough to scan easily (at least 100x100 pixels recommended)
			</li>
			<li>
				Maintain good contrast (white QR code on black background or vice versa)
			</li>
			<li>
				Leave quiet zone (border) around QR code for better scanning
			</li>
		</ul>
	</section>

	<section class="mb-16 flex flex-col gap-4 text-white">
		<h2 class="text-4xl font-medium">Testing with Mobile Wallets</h2>
		<p class="text-lg font-thin text-white">
			Once you've generated and displayed the QR code, you can test it with a mobile wallet:
		</p>
		<ol>
			<li>
				<strong>Install a Cardano wallet</strong> on your smartphone (Yoroi, Vespr, or Begin)
			</li>
			<li>
				<strong>Switch to Preprod Testnet</strong> in the wallet settings (for testing)
			</li>
			<li>
				<strong>Open the wallet's QR scanner</strong> (usually in the Send or Receive section)
			</li>
			<li>
				<strong>Scan the QR code</strong> displayed on your microcontroller
			</li>
			<li>
				<strong>Verify the payment details</strong> are pre-filled correctly (amount, address)
			</li>
			<li>
				<strong>Complete the transaction</strong> (or cancel if just testing)
			</li>
		</ol>
		<p class="text-lg font-thin text-white">
			<strong>Common Issues:</strong>
		</p>
		<ul>
			<li>
				<strong>QR code too small:</strong> Increase the scale factor or use a larger display
			</li>
			<li>
				<strong>Poor contrast:</strong> Ensure QR code is clearly visible (white on black or black on
				white)
			</li>
			<li>
				<strong>Wallet doesn't recognize URI:</strong> Verify the CIP-13 URI format is correct
			</li>
			<li>
				<strong>Wrong network:</strong> Make sure wallet and microcontroller are on the same network
				(mainnet or testnet)
			</li>
		</ul>
		<p class="text-lg font-thin text-white">
			<strong>Testing Tips:</strong>
		</p>
		<ul>
			<li>
				Start with small test amounts (1-2 ADA on testnet)
			</li>
			<li>
				Test with different wallets to ensure compatibility
			</li>
			<li>
				Verify the QR code can be scanned from different distances
			</li>
			<li>
				Test in different lighting conditions
			</li>
		</ul>
	</section>
</SectionNavigator>

<Card.Root class="mt-8 bg-transparent text-white sm:w-3/4">
	<Card.Header>
		<Card.Title>Resources</Card.Title>
		<Card.Description>
			Here are some resources to help you learn more about QR codes and testing.
		</Card.Description>
	</Card.Header>
	<Card.Content>
		<ul>
			<li>
				<a
					href="https://github.com/ricardocosme/qrcode"
					target="_blank"
					class="link"
					>QRCode Library GitHub</a
				>
				<p class="text-sm font-thin text-white">Official QRCode library for Arduino.</p>
			</li>
			<li>
				<a href="https://www.qrcode.com/en/" target="_blank" class="link">QR Code Standards</a>
				<p class="text-sm font-thin text-white">Learn about QR code specifications and standards.</p>
			</li>
			<li>
				<a href="https://cips.cardano.org/cips/cip13/" target="_blank" class="link">CIP-13 Specification</a>
				<p class="text-sm font-thin text-white">Official CIP-13 documentation for payment URIs.</p>
			</li>
		</ul>
	</Card.Content>
</Card.Root>

<WorkshopNavigation />

