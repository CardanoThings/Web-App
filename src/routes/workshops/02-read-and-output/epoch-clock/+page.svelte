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
		<h1 class="text-lg font-normal text-white sm:max-w-[50%]">Workshop 02: Read and Output</h1>
	</a>
	<h2 class="text-6xl font-medium text-white sm:max-w-[50%]">Epoch Clock</h2>
	<p class="text-lg font-thin text-white sm:max-w-[50%]">
		Based on what you have learned in former steps and workshops, you will learn how to build a physical
		Epoch Clock with a D1 Microcontroller and LED Matrix.
	</p>
</section>

<SectionNavigator>
	<section class="mb-16 flex flex-col gap-4 text-white">
		<h2 class="text-4xl font-medium">Introduction</h2>
		<p class="text-lg font-thin text-white">
			In this final step of Workshop 02, we'll combine everything you've learned to create a physical
			Epoch Clock. This project will display the current Cardano epoch number and epoch slot on an LED
			matrix display, creating a tangible connection to the blockchain.
		</p>
		<p class="text-lg font-thin text-white">
			An epoch in Cardano is a period of approximately 5 days during which the blockchain operates
			under specific parameters. Each epoch contains multiple slots, and tracking these values gives you
			insight into the current state of the Cardano network.
		</p>
		<p class="text-lg font-thin text-white">
			This project combines:
		</p>
		<ul>
			<li>WiFi connectivity (from Workshop 01)</li>
			<li>API calls to fetch blockchain data (from step 1 of this workshop)</li>
			<li>Display functionality (from step 2 of this workshop)</li>
			<li>Hardware integration (from step 3 of this workshop)</li>
		</ul>
	</section>

	<section class="mb-16 flex flex-col gap-4 text-white">
		<h2 class="text-4xl font-medium">Setting up the LED Matrix</h2>
		<p class="text-lg font-thin text-white">
			For this project, you'll need an 8x8 or larger LED matrix display. The most common types are:
		</p>
		<ul>
			<li>
				<strong>MAX7219-based modules:</strong> These are the most common and easiest to use. They
				typically come in 8x8 or 4-in-1 (32x8) configurations.
			</li>
			<li>
				<strong>HT16K33-based modules:</strong> Another popular option with good library support.
			</li>
			<li>
				<strong>Direct-drive matrices:</strong> More complex but offer more control and customization.
			</li>
		</ul>
		<p class="text-lg font-thin text-white">
			<strong>Wiring the MAX7219 LED Matrix:</strong>
		</p>
		<ol>
			<li>Connect VCC to 5V</li>
			<li>Connect GND to GND</li>
			<li>Connect DIN (Data In) to a GPIO pin (e.g., GPIO 23)</li>
			<li>Connect CS (Chip Select) to a GPIO pin (e.g., GPIO 5)</li>
			<li>Connect CLK (Clock) to a GPIO pin (e.g., GPIO 18)</li>
		</ol>
		<p class="text-lg font-thin text-white">
			<strong>Installing the Library:</strong>
		</p>
		<ol>
			<li>Open Arduino IDE</li>
			<li>Go to <strong>Sketch → Include Library → Manage Libraries</strong></li>
			<li>Search for "MD_Parola" or "MD_MAX72XX"</li>
			<li>Install the library by MajicDesigns</li>
		</ol>
		<p class="text-lg font-thin text-white">
			The MD_Parola library provides easy-to-use functions for displaying scrolling and static text on
			MAX7219 LED matrices.
		</p>
	</section>

	<section class="mb-16 flex flex-col gap-4 text-white">
		<h2 class="text-4xl font-medium">Fetching Epoch Data</h2>
		<p class="text-lg font-thin text-white">
			We'll use the Koios API tip endpoint (which you used in Workshop 01) to fetch the current epoch
			number and epoch slot. This endpoint returns JSON data that includes:
		</p>
		<ul>
			<li><i>epoch_no</i> - The current epoch number</li>
			<li><i>epoch_slot</i> - The current slot within the epoch</li>
			<li><i>abs_slot</i> - The absolute slot number</li>
			<li>Other blockchain metadata</li>
		</ul>
		<p class="text-lg font-thin text-white">
			The code will fetch this data periodically (every minute) and update the display accordingly.
		</p>
	</section>

	<section class="mb-16 flex flex-col gap-4 text-white">
		<h2 class="text-4xl font-medium">Displaying the Epoch</h2>
		<p class="text-lg font-thin text-white">
			Now let's create the complete Epoch Clock sketch that fetches epoch data and displays it on the
			LED matrix:
		</p>

		<Card.Root>
			<Card.Header class="mb-0 pb-0">
				<Card.Title>Epoch Clock Code</Card.Title>
			</Card.Header>
			<Card.Content>
				<SyntaxHighlighter language="cpp" code={data.epochClockCode} />
			</Card.Content>
			<Card.Footer>
				<p class="text-xs leading-relaxed">
					Copy and paste the code into your Arduino IDE. Make sure you've installed the MD_Parola
					library and connected your LED matrix correctly. Update the pin definitions (CS_PIN, DATA_PIN,
					CLK_PIN) to match your wiring. Replace WiFi credentials with your own. Upload it to your
					microcontroller and you should see the epoch number and slot displayed on your LED matrix.
				</p>
			</Card.Footer>
		</Card.Root>

		<h3 class="mt-4 text-2xl font-medium">How it works</h3>
		<ul>
			<li>
				The <i>setup</i> function initializes the LED matrix display and connects to WiFi, then fetches
				the initial epoch data.
			</li>
			<li>
				The <i>loop</i> function checks WiFi connection, fetches epoch data every minute, and updates
				the display.
			</li>
			<li>
				The <i>fetchEpochData</i> function makes a GET request to the Koios API tip endpoint and parses
				the epoch number and slot from the JSON response.
			</li>
			<li>
				The <i>displayEpoch</i> function shows the epoch number (prefixed with "E") and then the epoch
				slot (prefixed with "S") on the LED matrix.
			</li>
		</ul>
		<p class="text-lg font-thin text-white">
			You can customize the display by changing the text effects, animation speed, or adding more
			information like the absolute slot number or block height.
		</p>
	</section>

	<section class="mb-16 flex flex-col gap-4 text-white">
		<h2 class="text-4xl font-medium">Simplified Version (Without LED Matrix)</h2>
		<p class="text-lg font-thin text-white">
			If you don't have an LED matrix yet, you can still build a simpler version that displays the epoch
			information in the serial monitor or on a TFT display (if you have one from step 2):
		</p>

		<Card.Root>
			<Card.Header class="mb-0 pb-0">
				<Card.Title>Simple Epoch Monitor</Card.Title>
			</Card.Header>
			<Card.Content>
				<SyntaxHighlighter language="cpp" code={data.simpleEpochCode} />
			</Card.Content>
			<Card.Footer>
				<p class="text-xs leading-relaxed">
					This simplified version fetches and displays epoch data in the serial monitor. You can easily
					extend it to work with a TFT display using the TFT_eSPI library from step 2.
				</p>
			</Card.Footer>
		</Card.Root>
	</section>

	<section class="mb-16 flex flex-col gap-4 text-white">
		<h2 class="text-4xl font-medium">Final Assembly</h2>
		<p class="text-lg font-thin text-white">
			Once your code is working, you can create a nice enclosure for your Epoch Clock:
		</p>
		<ol>
			<li>
				<strong>3D Printed Case:</strong> Design or find a case that fits your microcontroller and LED
				matrix. Make sure to leave space for the USB cable and ventilation.
			</li>
			<li>
				<strong>Acrylic Enclosure:</strong> Use laser-cut acrylic sheets to create a professional-looking
				enclosure.
			</li>
			<li>
				<strong>Wooden Box:</strong> A simple wooden box can give your clock a warm, natural appearance.
			</li>
			<li>
				<strong>Wall Mount:</strong> Consider mounting options if you want to display it on a wall.
			</li>
		</ol>
		<p class="text-lg font-thin text-white">
			<strong>Power Options:</strong>
		</p>
		<ul>
			<li>
				<strong>USB Power:</strong> The simplest option - plug into a wall adapter or power bank.
			</li>
			<li>
				<strong>Battery Pack:</strong> For a portable version, use a USB battery pack.
			</li>
			<li>
				<strong>Solar Power:</strong> For an eco-friendly option, add a small solar panel and battery.
			</li>
		</ul>
		<p class="text-lg font-thin text-white">
			<strong>Enhancement Ideas:</strong>
		</p>
		<ul>
			<li>Add a button to switch between displaying epoch, slot, and other metrics</li>
			<li>Add an LED that blinks when a new epoch starts</li>
			<li>Display countdown to next epoch</li>
			<li>Add temperature/humidity sensor and display that data too</li>
			<li>Create multiple clocks showing different networks (Mainnet, Preprod, Preview)</li>
		</ul>
	</section>
</SectionNavigator>

<Card.Root class="mt-8 bg-transparent text-white sm:w-3/4">
	<Card.Header>
		<Card.Title>Resources</Card.Title>
		<Card.Description>
			Here are some resources to help you learn more about LED matrices and Cardano epochs.
		</Card.Description>
	</Card.Header>
	<Card.Content>
		<ul>
			<li>
				<a href="https://github.com/MajicDesigns/MD_Parola" target="_blank" class="link"
					>MD_Parola Library</a
				>
				<p class="text-sm font-thin text-white">Official library for MAX7219 LED matrices.</p>
			</li>
			<li>
				<a href="https://docs.cardano.org/cardano-testnets/about-testnets" target="_blank" class="link"
					>Cardano Testnets</a
				>
				<p class="text-sm font-thin text-white">Learn about Cardano networks and epochs.</p>
			</li>
			<li>
				<a href="https://preprod.koios.rest/#get-/tip" target="_blank" class="link"
					>Koios Tip Endpoint</a
				>
				<p class="text-sm font-thin text-white">API documentation for fetching epoch data.</p>
			</li>
			<li>
				<a
					href="https://www.arduino.cc/reference/en/libraries/md_max72xx/"
					target="_blank"
					class="link"
					>MD_MAX72XX Reference</a
				>
				<p class="text-sm font-thin text-white">Low-level library for MAX7219 control.</p>
			</li>
		</ul>
	</Card.Content>
</Card.Root>

<WorkshopNavigation />

