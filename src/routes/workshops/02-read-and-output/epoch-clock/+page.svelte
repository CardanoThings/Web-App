<script>
	import { page } from '$app/state';
	import SectionNavigator from '$lib/components/SectionNavigator.svelte';
	import WorkshopNavigation from '$lib/WorkshopNavigation.svelte';
	import CodeCard from '$lib/components/CodeCard.svelte';
	import FurtherResources from '$lib/components/FurtherResources.svelte';
	import TipBox from '$lib/components/TipBox.svelte';
	import ESP32C3Pinout from '$lib/components/ESP32C3Pinout.svelte';
	import { MoveLeft } from 'lucide-svelte';
	let parentPage = $derived(page.url.pathname.split('/')[2]);
	let { data } = $props();

	const epochClockHowItWorks = `
		<h3>Overview</h3>
		<p>This project combines WiFi connectivity, API calls, and LED ring display to create a physical Epoch Clock that visually represents epoch progress. The circular LED ring with 12 LEDs lights up progressively around the circle to show how far through the current epoch the blockchain has progressed, based on block data from the API.</p>
		
		<h3>Key Concepts</h3>
		<ul>
			<li><strong>Epoch Progress:</strong> Cardano epochs last approximately 5 days. By tracking blocks created within an epoch, we can calculate what percentage of the epoch has been completed.</li>
			<li><strong>API Integration:</strong> The code uses the Koios API to fetch current blockchain state, including block height and epoch information needed to calculate progress.</li>
			<li><strong>Visual Progress Indicator:</strong> The 12 LEDs on the circular ring light up sequentially around the circle to create a clock-like visual representation of epoch progress. As more blocks are created, more LEDs light up around the ring.</li>
			<li><strong>LED Ring Control:</strong> The code directly controls individual RGB LEDs on the WS2812 ring to create a circular progress indicator. Each LED can display any color, allowing for creative visualizations of epoch progression.</li>
			<li><strong>Non-blocking Timing:</strong> Using <code>millis()</code> instead of <code>delay()</code> allows the microcontroller to update the display while checking for new blockchain data.</li>
		</ul>
		
		<h3>How the Epoch Clock Works</h3>
		<ol>
			<li>The code initializes the LED ring display and connects to WiFi on startup</li>
			<li>An initial API call fetches the current epoch data and block information from the Koios API</li>
			<li>The code calculates epoch progress based on blocks created within the current epoch</li>
			<li>Every minute (or at your configured interval), the code fetches updated blockchain data</li>
			<li>The <code>fetchEpochData()</code> function sends a request to the Koios API to get current block height and epoch information</li>
			<li>The JSON response is parsed to extract block data and epoch details</li>
			<li>The <code>displayProgress()</code> function determines how many of the 12 LEDs should be lit based on epoch progress</li>
			<li>The function lights up the appropriate number of LEDs around the ring in blue</li>
			<li>As the epoch progresses and more blocks are created, more LEDs light up around the circle, creating a clock-like progress indicator</li>
			<li>A white walking LED moves around the ring every 5 seconds, creating a second-hand effect that completes a full rotation in 60 seconds</li>
			<li>When a new epoch starts, the display resets and begins filling again from the start</li>
		</ol>
		
		<h3>Progress Calculation</h3>
		<p>The code calculates epoch progress by:</p>
		<ul>
			<li>Determining the total number of slots in an epoch (typically 432,000 slots)</li>
			<li>Getting the current epoch slot from the API</li>
			<li>Calculating the percentage: (current_epoch_slot / total_epoch_slots) × 100</li>
			<li>Mapping this percentage to the 12 LEDs: (progress_percentage / 100) × 12</li>
			<li>Lighting up that many LEDs around the ring</li>
		</ul>
		
		<h3>Display Functions</h3>
		<ul>
			<li><strong>displayProgress():</strong> Lights up the appropriate number of LEDs around the ring based on calculated epoch progress. All LEDs are lit in blue to create a simple visual progress indicator showing how far through the epoch the blockchain has progressed.</li>
			<li><strong>updateWalkingLED():</strong> Displays a white LED that moves around the ring, blinking at each position for 5 seconds. This creates a clock-like second hand effect, completing a full rotation in 60 seconds (1 minute). The white LED appears on top of the blue progress LEDs.</li>
			<li><strong>clearDisplay():</strong> Turns off all LEDs, used when resetting for a new epoch.</li>
			<li><strong>setPixelColor():</strong> Sets the color of individual LEDs on the ring using RGB values, allowing precise control over which LEDs are lit and what color they display.</li>
		</ul>
		
		<h3>Customization Ideas</h3>
		<ul>
			<li>Change the starting position of the progress indicator (e.g., start at 12 o'clock position)</li>
			<li>Add color coding around the ring (e.g., green for early epoch, yellow for middle, red for near end)</li>
			<li>Add a blinking LED to indicate when a new block is detected</li>
			<li>Display different colors for different epochs</li>
			<li>Add a reset animation when a new epoch starts (e.g., all LEDs flash before resetting)</li>
			<li>Create a countdown effect as the epoch nears completion</li>
		</ul>
	`;

	const ledBlinkHowItWorks = `
		<h3>Overview</h3>
		<p>This simple example demonstrates basic WS2812 LED ring control without any network connectivity. It's perfect for testing your wiring and verifying that your LED ring is working correctly before adding blockchain integration.</p>
		
		<h3>Key Concepts</h3>
		<ul>
			<li><strong>Library Initialization:</strong> The Adafruit NeoPixel library is initialized with the number of LEDs (12 for the ring), the data pin, and the LED type (NEO_GRB + NEO_KHZ800 for WS2812).</li>
			<li><strong>Brightness Control:</strong> The brightness is set to a very low value (5 out of 255, approximately 2%) to protect the ESP32-C3 from excessive current draw. This is safe for USB power and prevents damage to the microcontroller.</li>
			<li><strong>Individual LED Control:</strong> Each LED can be controlled individually using <code>setPixelColor()</code>, which takes the LED index (0-11) and RGB color values.</li>
			<li><strong>Update Display:</strong> After setting LED colors, you must call <code>show()</code> to actually update the physical display. This allows you to set multiple LEDs before updating.</li>
		</ul>
		
		<h3>How the Blink Sequence Works</h3>
		<ol>
			<li>The code initializes the NeoPixel ring with 12 LEDs on the specified pin</li>
			<li>Brightness is set to 5 (very low) to protect the ESP32-C3 from excessive current draw</li>
			<li>The main loop cycles through all 12 LEDs one at a time</li>
			<li>For each LED, the code clears all LEDs, sets the current LED to white, and updates the display</li>
			<li>Each LED stays lit for 200 milliseconds before moving to the next one</li>
			<li>After all LEDs have been lit, the display is cleared and the sequence immediately repeats continuously</li>
		</ol>
		
		<h3>Important Safety Notes</h3>
		<ul>
			<li><strong>Low Brightness:</strong> The brightness is intentionally set very low (5/255) to prevent damage. WS2812 LEDs can draw significant current - a 12-LED ring at full brightness can draw up to 720mA, which is safer than larger displays but still requires caution with USB power.</li>
			<li><strong>Power Supply:</strong> If you need brighter LEDs, use an external 5V power supply for the ring and connect the grounds together. Never exceed the current rating of your power supply.</li>
			<li><strong>Testing:</strong> This example is perfect for verifying your wiring is correct. You should see one LED light up at a time, moving around the circular ring.</li>
		</ul>
		
		<h3>Customization Ideas</h3>
		<ul>
			<li>Change the delay between LEDs to make the sequence faster or slower</li>
			<li>Try different colors instead of white (e.g., red, green, blue, or custom RGB values)</li>
			<li>Light up multiple LEDs at once to create patterns around the ring</li>
			<li>Add a fade effect by gradually increasing and decreasing brightness</li>
			<li>Create different patterns (clockwise, counter-clockwise, alternating, etc.)</li>
		</ul>
	`;
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
		<h2 class="text-4xl font-medium">Simple LED Blink Example</h2>
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

		<CodeCard
			title="Simple LED Blink Code"
			code={data.ledBlinkCode}
			language="cpp"
			githubLink="https://github.com/CardanoThings/Workshops/tree/main/Workshop-02/examples/led-blink-code"
			howItWorksContent={ledBlinkHowItWorks}
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

		<CodeCard
			title="Epoch Clock Code"
			code={data.epochClockCode}
			language="cpp"
			githubLink="https://github.com/CardanoThings/Workshops/tree/main/Workshop-02/examples/epoch-clock-code"
			howItWorksContent={epochClockHowItWorks}
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
