<script>
	import { page } from '$app/state';
	import SectionNavigator from '$lib/components/SectionNavigator.svelte';
	import WorkshopNavigation from '$lib/WorkshopNavigation.svelte';
	import LiveCodeCard from '$lib/components/LiveCodeCard.svelte';
	import FurtherResources from '$lib/components/FurtherResources.svelte';
	import TipBox from '$lib/components/TipBox.svelte';
	import ESP32C3Pinout from '$lib/components/ESP32C3Pinout.svelte';
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
		<h2 class="text-4xl font-medium">Hardware Requirements</h2>
		<p class="text-lg font-thin text-white">
			To complete this workshop, you will need the following hardware components:
		</p>
		<ul>
			<li><strong>ESP32-C3 Microcontroller</strong> - The main controller for this project</li>
			<li>
				<strong>WS2812 LED Ring</strong> - Circular addressable RGB LED ring with 12 LEDs for showing
				epoch progress
			</li>
			<li><strong>Breadboard</strong> - For prototyping without soldering</li>
			<li>
				<strong>Jumper Cables</strong> - For making connections (male-to-male, male-to-female)
			</li>
			<li>
				<strong>Soldering Iron</strong> (Optional) - For permanent connections instead of breadboard
			</li>
		</ul>
		<p class="text-lg font-thin text-white">
			<strong>Note:</strong> You can use either a breadboard with jumper cables for prototyping, or solder
			components directly for a permanent installation. We recommend starting with a breadboard for easier
			troubleshooting and modifications.
		</p>
	</section>

	<section class="mb-16 flex flex-col gap-4 text-white">
		<h2 class="text-4xl font-medium">Introduction to Epochs and Slots</h2>
		<p class="text-lg font-thin text-white">
			An epoch in Cardano is a period of approximately 5 days during which the blockchain operates
			under specific parameters. Each epoch contains multiple slots, and tracking these values gives
			you insight into the current state of the Cardano network.
		</p>
		<p class="text-lg font-thin text-white">This project combines everything you've learned:</p>
		<ul class="ml-6 list-disc">
			<li>
				<strong>WiFi Connectivity:</strong> From Workshop 01, connecting your microcontroller to the
				internet
			</li>
			<li>
				<strong>API Calls:</strong> From step 1 of this workshop, fetching blockchain data from the Koios
				API
			</li>
			<li>
				<strong>Display Functionality:</strong> From step 2 of this workshop, showing data on external
				displays
			</li>
			<li>
				<strong>Hardware Integration:</strong> From step 3 of this workshop, controlling external hardware
				components
			</li>
		</ul>
		<p class="text-lg font-thin text-white">
			By combining these concepts, you'll create a physical device that displays real-time
			blockchain information, bridging the digital and physical worlds.
		</p>
	</section>

	<section class="mb-16 flex flex-col gap-4 text-white">
		<h2 class="text-4xl font-medium">Setting up the LED Ring</h2>
		<p class="text-lg font-thin text-white">
			For this project, we'll use a WS2812-based circular LED ring (also known as NeoPixel). These
			are addressable RGB LEDs arranged in a circle that allow you to control each LED individually
			with full color control. This makes them perfect for creating visual progress indicators that
			show epoch progress around a circular display.
		</p>
		<p class="text-lg font-thin text-white">
			WS2812 LED rings are available in various sizes, with 12 LEDs being ideal for this project as
			it provides a clear visual representation of epoch progress. Each LED can display any color in
			the RGB spectrum, and the circular arrangement creates an intuitive clock-like display showing
			how far through the epoch the blockchain has progressed.
		</p>

		<TipBox title="Critical Warning - Current Draw" variant="danger">
			<strong
				>WS2812 LEDs can draw significant current and may damage your ESP32-C3 if not handled
				properly.</strong
			>
			<br /><br />
			<strong>Current Draw Facts:</strong>
			<ul class="mt-2 ml-4">
				<li>Each WS2812 LED can draw up to 60mA at full brightness when displaying white</li>
				<li>
					A 12-LED ring can draw up to <strong>720mA</strong> at full brightness with all LEDs on white
				</li>
				<li>USB ports typically provide 500mA-1A, which is insufficient for full brightness</li>
				<li>Exceeding the current rating can damage your ESP32-C3, USB port, or power supply</li>
			</ul>
			<br />
			<strong>Safety Measures:</strong>
			<ul class="mt-2 ml-4">
				<li>
					<strong>Always set brightness low in code</strong> (we use 5/255, approximately 2% brightness)
					when powered via USB
				</li>
				<li>
					For brighter displays, use an <strong>external 5V power supply</strong> rated for at least
					1A
				</li>
				<li>When using external power, connect the grounds together (common ground)</li>
				<li>Never power the ring directly from the ESP32-C3's 5V pin at full brightness</li>
				<li>Test with low brightness first, then gradually increase if using external power</li>
			</ul>
			<br />
			We are <strong>not responsible for any damage</strong> that may occur. Always use appropriate power
			supplies and set brightness levels safely!
		</TipBox>

		<h3 class="mt-6 text-2xl font-medium">Wiring the WS2812 LED Ring</h3>
		<p class="text-lg font-thin text-white">
			Your WS2812 LED ring typically has connection points for power and data:
		</p>
		<ul class="ml-6 list-disc">
			<li><strong>V+ (Power):</strong> 5V power input</li>
			<li><strong>V- (Ground):</strong> Ground connection</li>
			<li><strong>IN (Data Input):</strong> Data signal input</li>
			<li><strong>OUT (Data Output):</strong> Data signal output (for daisy-chaining)</li>
		</ul>
		<p class="text-lg font-thin text-white">Follow these steps to connect your LED ring:</p>
		<ol class="ml-6 list-decimal">
			<li>
				<strong>Connect V+ (Power):</strong> Connect the V+ pin on the LED ring to 5V on your
				microcontroller. <strong>Note:</strong> For USB power, keep brightness very low. For brighter
				displays, use an external 5V power supply.
			</li>
			<li>
				<strong>Connect V- (Ground):</strong> Connect the V- pin on the LED ring to GND on your microcontroller.
				If using external power, connect both grounds together (common ground).
			</li>
			<li>
				<strong>Connect IN (Data Input):</strong> Connect the IN pin to a GPIO pin for data (e.g., GPIO
				4). WS2812 uses a special timing protocol, so any GPIO pin can be used for data.
			</li>
		</ol>
		<TipBox title="Pin Configuration Note" variant="info">
			The OUT pin is used for daisy-chaining multiple LED rings together. If you're only using one
			ring, you don't need to connect the OUT pin. WS2812 uses a single-wire data protocol, so you
			only need to connect power (V+ and V-) and data (IN).
		</TipBox>
		<ESP32C3Pinout />
		<h3 class="mt-6 text-2xl font-medium">Installing the Library</h3>
		<p class="text-lg font-thin text-white">
			Before uploading code, you'll need to install the Adafruit NeoPixel library for controlling
			the WS2812 LED ring:
		</p>
		<ol class="ml-6 list-decimal">
			<li>Open Arduino IDE</li>
			<li>Go to <strong>Sketch → Include Library → Manage Libraries</strong></li>
			<li>Search for "Adafruit NeoPixel"</li>
			<li>Install the library by Adafruit</li>
		</ol>
		<TipBox title="Library Information" variant="info">
			The Adafruit NeoPixel library provides easy-to-use functions for controlling WS2812
			addressable RGB LEDs. It handles the complex timing protocol required by WS2812 LEDs and
			provides functions to set individual LED colors, brightness, and create animations. This
			library is perfect for creating custom visual patterns and progress indicators on LED rings.
		</TipBox>
	</section>

	<section class="mb-16 flex flex-col gap-4 text-white">
		<h2 class="text-4xl font-medium">Basic LED Ring Test</h2>
		<p class="text-lg font-thin text-white">
			Before connecting your LED ring to blockchain events, let's start with a simple blink example.
			This will help you verify that your wiring is correct and that the LED ring is working
			properly.
		</p>
		<p class="text-lg font-thin text-white">
			This example will light up each of the 12 LEDs one at a time in white, creating a sequential
			blink pattern around the ring. The brightness is set to a very low value (approximately 2%) to
			protect your ESP32-C3 from excessive current draw. You should see one LED light up at a time,
			moving around the circular ring.
		</p>

		<LiveCodeCard
			title="Basic LED Ring Test"
			repo="CardanoThings/Workshops"
			branch="main"
			files={[
				{
					path: 'Workshop-02/examples/led-ring-blink/led-ring-blink.ino',
					language: 'cpp'
				}
			]}
			readmePath="Workshop-02/examples/led-ring-blink/README.md"
			footerText="Copy and paste this code into your Arduino IDE. Make sure you've installed the Adafruit NeoPixel library and connected your WS2812 LED ring correctly. Update the LED_PIN definition to match your wiring (the pin connected to the IN pin on your ring). Upload it to your microcontroller and you should see LEDs lighting up one at a time in sequence around the ring. If no LEDs light up, check your wiring and make sure the pin number matches your connection."
		/>
	</section>

	<section class="mb-16 flex flex-col gap-4 text-white">
		<h2 class="text-4xl font-medium">Fetching Epoch and Block Data</h2>
		<p class="text-lg font-thin text-white">
			We'll use the Koios API tip endpoint to fetch the current epoch information and block data. If
			you haven't already learned how to fetch epoch data from the Koios API, check out the
			<a href="/workshops/01-basics/api-setup" class="link">API Setup workshop</a> from Workshop 01,
			which covers this in detail. This endpoint returns JSON data that includes:
		</p>
		<ul class="ml-6 list-disc">
			<li><strong>epoch_no</strong> - The current epoch number</li>
			<li>
				<strong>epoch_slot</strong> - The current slot within the epoch (used to calculate progress)
			</li>
			<li><strong>abs_slot</strong> - The absolute slot number</li>
			<li><strong>block_no</strong> - The current block height</li>
			<li>Other blockchain metadata</li>
		</ul>
		<p class="text-lg font-thin text-white">
			The code uses the <strong>epoch_slot</strong> value to calculate how far through the current epoch
			the blockchain has progressed. Since each epoch contains approximately 432,000 slots, we can calculate
			the percentage complete and map that to the 12 LEDs on the ring. The code will fetch this data
			periodically (every minute) and update the LED display accordingly, ensuring your Epoch Clock always
			shows the most current blockchain progress.
		</p>
		<TipBox title="Understanding Epoch Progress" variant="info">
			An epoch contains a fixed number of slots (approximately 432,000 on Mainnet). By tracking the
			current epoch slot, we can calculate what percentage of the epoch has been completed. For
			example, if we're at slot 216,000 in an epoch, we're 50% complete, so 6 of the 12 LEDs would
			be lit (halfway around the ring).
		</TipBox>
	</section>

	<section class="mb-16 flex flex-col gap-4 text-white">
		<h2 class="text-4xl font-medium">Putting It All Together</h2>
		<p class="text-lg font-thin text-white">
			Now let's create the complete Epoch Clock sketch that fetches epoch and block data from the
			API and displays epoch progress visually on the LED ring. This code combines WiFi
			connectivity, API calls, and LED ring control to show real-time Cardano blockchain progress
			through the current epoch.
		</p>
		<p class="text-lg font-thin text-white">
			The 12 LEDs on the circular ring will light up progressively around the circle as the epoch
			progresses, creating a clock-like visual indicator that shows how far through the current
			epoch the blockchain has advanced.
		</p>

		<LiveCodeCard
			title="Epoch Clock Code"
			repo="CardanoThings/Workshops"
			branch="main"
			files={[
				{
					path: 'Workshop-02/examples/epoch-clock/epoch-clock.ino',
					language: 'cpp'
				}
			]}
			readmePath="Workshop-02/examples/epoch-clock/README.md"
			footerText="Copy and paste the code into your Arduino IDE. Make sure you've installed the Adafruit NeoPixel library and connected your WS2812 LED ring correctly. Update the LED_PIN definition to match your wiring. Replace WiFi credentials with your own. Upload it to your microcontroller and you should see LEDs lighting up progressively around the ring in blue as the epoch advances."
		/>
	</section>

	<section class="mb-16 flex flex-col gap-4 text-white">
		<h2 class="text-4xl font-medium">What's Next?</h2>
		<p class="text-lg font-thin text-white">
			Congratulations! You've completed Workshop 02 and learned how to read blockchain data and
			output it to physical displays. The Epoch Clock project demonstrates how to combine multiple
			concepts into a complete, functional device that bridges the digital and physical worlds.
		</p>
		<p class="text-lg font-thin text-white">
			With the skills you've mastered, you can now create even more sophisticated projects. Here are
			some ideas to inspire your next build:
		</p>
		<ul class="ml-6 list-disc">
			<li>
				<strong>Enhanced Visual Patterns:</strong> Change how LEDs light up around the ring - try different
				patterns like clockwise, counter-clockwise, or alternating directions. Add animations when blocks
				are detected.
			</li>
			<li>
				<strong>Color-Coded Progress:</strong> Use different colors to represent different stages of
				the epoch (e.g., green for early, yellow for middle, red for near completion) around the ring.
			</li>
			<li>
				<strong>Multi-Network Display:</strong> Use multiple LED rings to show epoch progress from different
				networks (Mainnet, Preprod, Preview) simultaneously, giving you a comprehensive view of the Cardano
				ecosystem.
			</li>
			<li>
				<strong>Epoch Transition Effects:</strong> Add special animations or patterns when a new epoch
				starts, such as all LEDs blinking or a "chase" effect around the ring before resetting.
			</li>
			<li>
				<strong>Custom Enclosures:</strong> Design and build a professional enclosure using 3D printing,
				laser-cut acrylic, or woodworking to create a polished, finished product that showcases your
				circular epoch progress display.
			</li>
			<li>
				<strong>Portable Solutions:</strong> Power your clock with a battery pack or solar panel for
				a truly portable blockchain progress indicator.
			</li>
		</ul>
		<p class="text-lg font-thin text-white">
			The foundation you've built in this workshop—connecting to APIs, parsing JSON data,
			controlling displays, and integrating hardware—opens up endless possibilities for creating
			physical devices that interact with the Cardano blockchain. Continue experimenting, building,
			and exploring what's possible when you combine code, hardware, and blockchain technology!
		</p>
	</section>

	<FurtherResources
		resources={[
			{
				title: 'Adafruit NeoPixel Library',
				url: 'https://github.com/adafruit/Adafruit_NeoPixel',
				description: 'Official library for controlling WS2812 addressable RGB LEDs (NeoPixels).'
			},
			{
				title: 'Cardano Testnets',
				url: 'https://docs.cardano.org/cardano-testnets/environments',
				description:
					'Learn about Cardano testnet environments including Preview, Pre-production, and Mainnet.'
			},
			{
				title: 'Koios Tip Endpoint',
				url: 'https://preprod.koios.rest/#get-/tip',
				description: 'API documentation for fetching epoch data.'
			},
			{
				title: 'WS2812 LED Guide',
				url: 'https://learn.adafruit.com/adafruit-neopixel-uberguide',
				description: 'Comprehensive guide to using WS2812 addressable RGB LEDs (NeoPixels).'
			}
		]}
	/>
</SectionNavigator>

<WorkshopNavigation />
