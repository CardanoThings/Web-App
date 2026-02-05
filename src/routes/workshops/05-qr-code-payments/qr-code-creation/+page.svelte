<script>
	import { page } from '$app/state';
	import SectionNavigator from '$lib/components/SectionNavigator.svelte';
	import WorkshopNavigation from '$lib/WorkshopNavigation.svelte';
	import LiveCodeCard from '$lib/components/LiveCodeCard.svelte';
	import TipBox from '$lib/components/TipBox.svelte';
	import FurtherResources from '$lib/components/FurtherResources.svelte';
	import PingPongWallet from '$lib/base/PingPongWallet.svelte';
	import { MoveLeft } from 'lucide-svelte';
	let parentPage = $derived(page.url.pathname.split('/')[2]);
	let { data } = $props();
</script>

<section class="mb-8 flex flex-col gap-4 text-white">
	<a
		href={`/workshops/${parentPage}`}
		class="flex items-center gap-2 text-lg font-normal text-white sm:max-w-[50%]"
	>
		<MoveLeft size="20" />
		{data.workshop.title}
	</a>
	<h2 class="text-5xl font-medium text-white sm:max-w-[50%] sm:text-6xl">{data.step.title}</h2>
	<p class="text-lg font-thin text-white sm:max-w-[50%]">
		{data.step.description}
	</p>
</section>

<SectionNavigator>
	<section class="mb-16 flex flex-col gap-4 text-white">
		<h2 class="text-4xl font-medium">Introduction</h2>
		<p class="text-lg font-thin text-white">
			Now that you have learned how easy it is to create payment links with CIP-13, it is time to
			create a QR code that can be scanned by a mobile wallet. We will just turn the payment link
			into a QR code, display it on the TFT display and we can proceed with putting all the pieces
			together to create a complete payment interface.
		</p>
	</section>

	<section class="mb-16 flex flex-col gap-4 text-white">
		<h2 class="text-4xl font-medium">Installing Required Libraries</h2>
		<p class="text-lg font-thin text-white">
			To generate and display QR codes on your TFT display, you'll need to install two libraries:
			<strong>QRcodeDisplay</strong> (the base QR code library) and <strong>QRcode_eSPI</strong>
			(the TFT_eSPI adapter). Make sure to install both libraries, as QRcode_eSPI depends on QRcodeDisplay.
			You should already have the TFT_eSPI library installed and configured from{' '}
			<a href="/workshops/02-read-and-output/display-data" class="link">Workshop 02</a>, where you
			learned how to display data on your microcontroller.
		</p>

		<h3 class="mt-8 mb-4 text-2xl font-medium">Step 1: Install QRcodeDisplay Library</h3>
		<p class="text-lg font-thin text-white">
			The QRcodeDisplay library provides the core QR code generation functionality:
		</p>
		<ol class="ml-4 list-decimal space-y-2 text-lg font-thin text-white">
			<li>Open Arduino IDE</li>
			<li>
				Go to <strong>Sketch → Include Library → Manage Libraries</strong> (or press
				<code class="rounded bg-gray-800 px-2 py-1 text-white">Ctrl+Shift+I</code> /
				<code class="rounded bg-gray-800 px-2 py-1 text-white">⌘+Shift+I</code>)
			</li>
			<li>In the Library Manager search box, type <strong>"QRcodeDisplay"</strong></li>
			<li>
				Find <strong>"QRcodeDisplay" by yoprogramo</strong> in the list
			</li>
			<li>Click <strong>Install</strong></li>
			<li>Wait for the installation to complete</li>
		</ol>

		<h3 class="mt-8 mb-4 text-2xl font-medium">Step 2: Install QRcode_eSPI Library</h3>
		<p class="text-lg font-thin text-white">
			The QRcode_eSPI library is an adapter that allows QRcodeDisplay to work with TFT_eSPI
			displays:
		</p>
		<ol class="ml-4 list-decimal space-y-2 text-lg font-thin text-white">
			<li>In the same Library Manager window, search for <strong>"QRcode_eSPI"</strong></li>
			<li>
				Find <strong>"QRcode_eSPI" by yoprogramo</strong> in the list
			</li>
			<li>Click <strong>Install</strong></li>
			<li>Wait for the installation to complete</li>
		</ol>
	</section>

	<section class="mb-16 flex flex-col gap-4 text-white">
		<h2 class="text-4xl font-medium">QR Code Basics Example</h2>
		<p class="text-lg font-thin text-white">
			The example code generates a QR code containing a URL and displays it on your TFT screen. Most
			of the code you already know from{' '}
			<a href="/workshops/02-read-and-output/display-data" class="link">earlier examples</a>, the
			only new thing is the QR code generation. The QR code is rendered to a sprite (off-screen
			buffer) first, which allows for flexible positioning before displaying it on the screen.
		</p>

		<LiveCodeCard
			title="QR Code Basics Example"
			repo="CardanoThings/Workshops"
			branch="main"
			files={[
				{
					path: 'Workshop-05/examples/qr-code-basics/qr-code-basics.ino',
					language: 'cpp'
				}
			]}
			readmePath="Workshop-05/examples/qr-code-basics/README.md"
		/>

		<TipBox title="Sprites and Memory Usage" variant="info">
			Sprites are off-screen buffers stored in RAM that allow you to draw graphics before displaying
			them. This prevents flickering and enables flexible positioning. However, sprites consume
			memory: a 200×200 pixel sprite uses approximately 80 KB of RAM (200 × 200 × 2 bytes per
			pixel). ESP32 typically has 200-300 KB free RAM, so be mindful of sprite size. If you
			encounter out-of-memory errors, reduce the <code
				class="rounded bg-gray-800 px-2 py-1 text-white">qrSize</code
			> variable.
		</TipBox>
	</section>

	<section class="mb-16 flex flex-col gap-4 text-white">
		<h2 class="text-4xl font-medium">Next Steps</h2>
		<p class="text-lg font-thin text-white">
			Congratulations! You've successfully created and displayed a QR code on your microcontroller's
			TFT display. Feel free to try out a CIP-13 payment URI example right away by creating a
			payment URI for the CardanoThings PingPong wallet and send some tADA around!
		</p>

		<PingPongWallet />

		<p class="text-lg font-thin text-white">
			In the last step of this workshop, you'll learn how to:
		</p>
		<ul class="ml-4 list-disc space-y-2 text-lg font-thin text-white">
			<li>Display the QR code on the TFT display once the payment request is created</li>
			<li>Listen for payment confirmations and update the display accordingly</li>
		</ul>
	</section>

	<FurtherResources
		resources={[
			{
				title: 'QRcodeDisplay',
				url: 'https://github.com/yoprogramo/QRcodeDisplay',
				description:
					'GitHub repository for the QRcodeDisplay library. Use this for manual installation or to check the source code.'
			},
			{
				title: 'QRcode_eSPI',
				url: 'https://github.com/yoprogramo/QRcode_eSPI',
				description:
					'GitHub repository for the QRcode_eSPI library, which depends on QRcodeDisplay and TFT_eSPI. Use this for manual installation or to check the source code.'
			},
			{
				title: 'TFT_eSPI',
				url: 'https://github.com/Bodmer/TFT_eSPI',
				description:
					'GitHub repository for the TFT_eSPI library, a graphics library for TFT displays. Use this for manual installation or to check the source code.'
			}
		]}
	/>
</SectionNavigator>

<WorkshopNavigation />
