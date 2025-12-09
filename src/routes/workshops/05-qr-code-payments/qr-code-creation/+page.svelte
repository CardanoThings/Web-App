<script>
	import { page } from '$app/state';
	import SectionNavigator from '$lib/components/SectionNavigator.svelte';
	import WorkshopNavigation from '$lib/WorkshopNavigation.svelte';
	import LiveCodeCard from '$lib/components/LiveCodeCard.svelte';
	import TipBox from '$lib/components/TipBox.svelte';
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
			<strong>QRcodeDisplay</strong> (the base QR code library) and <strong>QRcode_eSPI</strong> (the
			TFT_eSPI adapter).
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

		<h3 class="mt-8 mb-4 text-2xl font-medium">Step 3: Verify TFT_eSPI is Installed</h3>
		<p class="text-lg font-thin text-white">
			You should already have the <strong>TFT_eSPI</strong> library installed from{' '}
			<a href="/workshops/02-read-and-output/display-data" class="link">previous workshops</a>. If
			not, install it now:
		</p>
		<ol class="ml-4 list-decimal space-y-2 text-lg font-thin text-white">
			<li>Search for <strong>"TFT_eSPI"</strong> in the Library Manager</li>
			<li>Find <strong>"TFT_eSPI" by Bodmer</strong> and install it</li>
			<li>
				<strong>Important:</strong> Make sure your TFT_eSPI is configured for your display (CYD
				users should have already done this in{' '}
				<a href="/workshops/02-read-and-output/display-data" class="link">Workshop 02</a>)
			</li>
		</ol>

		<TipBox title="Library Dependencies" variant="info">
			The QRcode_eSPI library depends on both QRcodeDisplay and TFT_eSPI. Make sure all three
			libraries are installed before proceeding. If you encounter compilation errors, verify that
			all libraries are properly installed and up to date.
		</TipBox>

		<TipBox title="GitHub Links" variant="success">
			If you prefer manual installation or want to check the source code:
			<ul class="mt-2 ml-4 list-disc space-y-1">
				<li>
					<strong>QRcodeDisplay:</strong>{' '}
					<a
						href="https://github.com/yoprogramo/QRcodeDisplay"
						target="_blank"
						rel="noopener noreferrer"
						class="link">https://github.com/yoprogramo/QRcodeDisplay</a
					>
				</li>
				<li>
					<strong>QRcode_eSPI:</strong>{' '}
					<a
						href="https://github.com/yoprogramo/QRcode_eSPI"
						target="_blank"
						rel="noopener noreferrer"
						class="link">https://github.com/yoprogramo/QRcode_eSPI</a
					>
				</li>
				<li>
					<strong>TFT_eSPI:</strong>{' '}
					<a
						href="https://github.com/Bodmer/TFT_eSPI"
						target="_blank"
						rel="noopener noreferrer"
						class="link">https://github.com/Bodmer/TFT_eSPI</a
					>
				</li>
			</ul>
		</TipBox>
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
			TFT display. In the last step of this workshop, you'll learn how to:
		</p>
		<ul class="ml-4 list-disc space-y-2 text-lg font-thin text-white">
			<li>Display the QR code on the TFT display once the payment request is created</li>
			<li>Listen for payment confirmations and update the display accordingly</li>
		</ul>
	</section>
</SectionNavigator>

<WorkshopNavigation />
