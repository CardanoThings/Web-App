<script>
	import { page } from '$app/state';
	import IntroContainer from '$lib/base/IntroContainer.svelte';
	import SectionNavigator from '$lib/components/SectionNavigator.svelte';
	import WorkshopNavigation from '$lib/WorkshopNavigation.svelte';
	import SyntaxHighlighter from '$lib/components/SyntaxHighlighter.svelte';
	import FurtherResources from '$lib/components/FurtherResources.svelte';
	import TipBox from '$lib/components/TipBox.svelte';
	import CodeCard from '$lib/components/CodeCard.svelte';
	import * as Card from '$lib/components/ui/card/index.js';
	import { MoveLeft } from 'lucide-svelte';
	let parentPage = $derived(page.url.pathname.split('/')[2]);
	let { data } = $props();

	const ledHowItWorks = `
		<h3>Overview</h3>
		<p>This example demonstrates how to connect blockchain events to physical hardware. When your wallet balance changes (either increases or decreases), the LED turns on for 60 seconds, providing immediate visual feedback.</p>
		
		<h3>Key Concepts</h3>
		<ul>
			<li><strong>Balance Monitoring:</strong> The code checks your wallet balance every 30 seconds using the Koios API, comparing it to the previous balance to detect any changes.</li>
			<li><strong>Change Detection:</strong> By storing the previous balance and comparing it to the current balance, we can detect both incoming and outgoing transactions.</li>
			<li><strong>Timed LED Control:</strong> When a change is detected, the LED turns on and a timer is set. After 60 seconds, the LED automatically turns off.</li>
			<li><strong>Non-blocking Timing:</strong> Using <code>millis()</code> instead of <code>delay()</code> allows the microcontroller to continue checking balances while the LED is on.</li>
		</ul>
		
		<h3>How the Timer Works</h3>
		<p>The code uses two timing mechanisms:</p>
		<ul>
			<li><strong>Balance Check Timer:</strong> Every 30 seconds, the code fetches the current wallet balance from the API.</li>
			<li><strong>LED Off Timer:</strong> When a balance change is detected, <code>ledOnTime</code> is set to the current time. The LED stays on for 60 seconds (60,000 milliseconds) and then automatically turns off.</li>
		</ul>
		
		<h3>Hardware Setup</h3>
		<ul>
			<li>Connect an LED with a current-limiting resistor (220Ω-1kΩ) to GPIO pin 2.</li>
			<li>The longer leg (anode) of the LED connects to the GPIO pin through the resistor.</li>
			<li>The shorter leg (cathode) connects to GND.</li>
		</ul>
		
		<h3>Customization Ideas</h3>
		<ul>
			<li>Change the LED on duration by modifying the <code>60000</code> value to a different number of milliseconds.</li>
			<li>Trigger different patterns (like blinking) instead of just turning on the LED.</li>
			<li>Use different pins to control multiple LEDs for different types of events.</li>
			<li>Detect only increases (incoming) or only decreases (outgoing) transactions.</li>
		</ul>
	`;
</script>

<section class="mb-8 flex flex-col gap-4 text-white">
	<a href={`/workshops/${parentPage}`} class="flex items-center gap-2">
		<MoveLeft size="20" />
		<h1 class="text-lg font-normal text-white sm:max-w-[50%]">Workshop 02: Read and Output</h1>
	</a>
	<h2 class="text-6xl font-medium text-white sm:max-w-[50%]">Light up the tree</h2>
	<p class="text-lg font-thin text-white sm:max-w-[50%]">
		In this step of this workshop you will learn how to use your Microcontroller with external
		hardware like a 110V/220V relais to turn a lightbulb (or the Christmas Tree for that matter) on
		and off based on on-chain events.
	</p>

	<TipBox title="Safety Warning - High Voltage" variant="danger">
		This workshop involves working with <strong>external hardware including 110V/220V relays</strong
		>
		that can control mains electricity.
		<strong
			>High voltage can cause serious injury, death, or damage to your equipment if handled
			improperly.</strong
		>
		<br /><br />
		<strong>Only proceed if you:</strong>
		<ul class="mt-2 ml-4">
			<li>Have a basic understanding of electronics and electrical safety</li>
			<li>Know how to safely work with mains voltage (110V/220V)</li>
			<li>Understand the risks of working with relays and high-voltage circuits</li>
			<li>Have proper safety equipment and work in a safe environment</li>
		</ul>
		<br />
		<strong>If you are unsure or lack experience with electronics, please:</strong>
		<ul class="mt-2 ml-4">
			<li>Start with the low-voltage LED examples provided in this workshop</li>
			<li>Consult with someone experienced in electronics before proceeding to relays</li>
			<li>Never work with live mains voltage without proper training and safety measures</li>
		</ul>
		<br />
		We are <strong>not responsible for any injuries or damage</strong> that may occur. Proceed at your
		own risk and always prioritize safety!
	</TipBox>
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
				<strong>Hardware Relay Module</strong> - For controlling high-voltage devices (110V/220V)
			</li>
			<li><strong>Breadboard</strong> - For prototyping without soldering</li>
			<li>
				<strong>Jumper Cables</strong> - For making connections (male-to-male, male-to-female)
			</li>
			<li>
				<strong>Soldering Iron</strong> (Optional) - For permanent connections instead of breadboard
			</li>
			<li>
				<strong>LED with Resistor</strong> (Recommended for testing) - Start with LED before using relay
			</li>
		</ul>
		<p class="text-lg font-thin text-white">
			<strong>Note:</strong> You can use either a breadboard with jumper cables for prototyping, or solder
			components directly for a permanent installation. We recommend starting with a breadboard for easier
			troubleshooting and modifications.
		</p>
	</section>

	<section class="mb-16 flex flex-col gap-4 text-white">
		<h2 class="text-4xl font-medium">Connecting to On-Chain Events</h2>
		<p class="text-lg font-thin text-white">
			Let's start by connecting blockchain events to hardware control. We'll begin with a simple LED
			example that responds to wallet balance changes. This is a safe way to test the concept before
			moving to more powerful hardware like relays.
		</p>

		<CodeCard
			title="LED Balance Monitor - 60 Second Alert"
			code={data.ledCode}
			language="cpp"
			howItWorksContent={ledHowItWorks}
			githubLink="https://github.com/CardanoThings/workshops/tree/main/Workshop-02/examples/led-balance-monitor"
			footerText="This example monitors your wallet balance and turns on an LED for 60 seconds whenever the balance changes (up or down). Perfect for testing on-chain event detection before moving to more powerful hardware like relays."
		/>
	</section>

	<section class="mb-16 flex flex-col gap-4 text-white">
		<h2 class="text-4xl font-medium">Introduction to External Hardware</h2>
		<p class="text-lg font-thin text-white">
			One of the most powerful features of microcontrollers is their ability to control external
			hardware. In this step, we'll connect a relay module to your microcontroller, which will allow
			you to control high-voltage devices like lights, motors, or appliances based on blockchain
			events.
		</p>
		<p class="text-lg font-thin text-white">
			A relay is an electrically operated switch that allows a low-power signal (from your
			microcontroller) to control a high-power circuit (like a 110V or 220V light bulb). This is
			essential for safety - your microcontroller operates at 3.3V or 5V, which is not enough to
			directly control household appliances.
		</p>
		<p class="text-lg font-thin text-white">
			<strong>⚠️ Safety Warning:</strong> Working with high voltage can be dangerous. Always ensure you
			understand what you're doing and take proper safety precautions. If you're unsure, start with low-voltage
			components like LEDs before moving to relays and high-voltage devices.
		</p>
	</section>

	<section class="mb-16 flex flex-col gap-4 text-white">
		<h2 class="text-4xl font-medium">Setting up the Relay</h2>
		<p class="text-lg font-thin text-white">
			For this project, you'll need a relay module (often called a "relay board" or "relay shield").
			These modules typically have:
		</p>
		<ul>
			<li>Input pins (VCC, GND, IN) that connect to your microcontroller</li>
			<li>Output terminals (NO, COM, NC) for connecting your high-voltage device</li>
			<li>An optocoupler for electrical isolation</li>
			<li>Status LEDs to show when the relay is active</li>
		</ul>
		<p class="text-lg font-thin text-white">
			<strong>Wiring the Relay:</strong>
		</p>
		<ol>
			<li>Connect VCC to 5V (or 3.3V depending on your relay module)</li>
			<li>Connect GND to GND</li>
			<li>Connect IN (or signal pin) to a GPIO pin on your microcontroller (e.g., GPIO 2)</li>
			<li>Connect your light/appliance to the relay's output terminals (NO and COM)</li>
		</ol>
		<p class="text-lg font-thin text-white">
			Most relay modules are active LOW, meaning they turn ON when you set the GPIO pin to LOW (0V)
			and OFF when set to HIGH. Check your relay module's documentation to confirm.
		</p>

		<Card.Root>
			<Card.Header class="mb-0 pb-0">
				<Card.Title>Relay Control Code</Card.Title>
			</Card.Header>
			<Card.Content>
				<SyntaxHighlighter language="cpp" code={data.relayCode} />
			</Card.Content>
			<Card.Footer>
				<p class="text-xs leading-relaxed">
					Copy and paste the code into your Arduino IDE. Make sure to set the correct GPIO pin for
					your relay module. Replace WiFi credentials and wallet address with your own. Upload it to
					your microcontroller. When you receive a transaction to your wallet, the relay should
					activate and turn on your light.
				</p>
			</Card.Footer>
		</Card.Root>

		<h3 class="mt-4 text-2xl font-medium">How it works</h3>
		<ul>
			<li>
				The code monitors your wallet balance every 30 seconds using the same API call from step 1.
			</li>
			<li>
				When the balance increases (new transaction received), it calls <i>turnOnLight()</i> which sets
				the relay pin to HIGH, activating the relay.
			</li>
			<li>
				When the balance decreases (you sent a transaction), it calls <i>turnOffLight()</i> which sets
				the relay pin to LOW, deactivating the relay.
			</li>
			<li>
				You can modify this logic to trigger on different conditions, such as when balance exceeds a
				certain threshold, or when a specific token is received.
			</li>
		</ul>
		<p class="text-lg font-thin text-white">
			<strong>Testing:</strong> To test without waiting for a real transaction, you can temporarily modify
			the code to trigger the relay based on a timer or button press. Once you confirm it works, restore
			the blockchain-based logic.
		</p>
	</section>

	<section class="mb-16 flex flex-col gap-4 text-white">
		<h2 class="text-4xl font-medium">Other Hardware Options</h2>
		<p class="text-lg font-thin text-white">
			Relays are just one type of hardware you can control. Here are other options you might want to
			explore:
		</p>

		<h3 class="mt-4 text-2xl font-medium">Servo Motors</h3>
		<p class="text-lg font-thin text-white">
			Servo motors can rotate to specific angles, making them useful for physical displays or
			indicators. You can use them to point to different values or create mechanical animations.
		</p>

		<h3 class="mt-4 text-2xl font-medium">Stepper Motors</h3>
		<p class="text-lg font-thin text-white">
			Stepper motors provide precise rotation control, useful for clocks, counters, or any
			application requiring accurate positioning.
		</p>

		<h3 class="mt-4 text-2xl font-medium">Buzzer/Speaker</h3>
		<p class="text-lg font-thin text-white">
			Add audio feedback to your projects. Play different tones or melodies when specific blockchain
			events occur.
		</p>

		<h3 class="mt-4 text-2xl font-medium">NeoPixels/WS2812B LEDs</h3>
		<p class="text-lg font-thin text-white">
			Addressable RGB LEDs that can create colorful light shows. Perfect for creating visual
			displays that change based on blockchain data.
		</p>

		<p class="text-lg font-thin text-white">
			The possibilities are endless! You can combine multiple hardware components to create complex
			interactive projects that respond to blockchain events in creative ways.
		</p>
	</section>

	<FurtherResources
		resources={[
			{
				title: 'Arduino digitalWrite() Reference',
				url: 'https://www.arduino.cc/reference/en/language/functions/digital-io/digitalwrite/',
				description: 'Learn about controlling digital pins.'
			},
			{
				title: 'ESP32 Relay Module Tutorial',
				url: 'https://randomnerdtutorials.com/esp32-relay-module-ac-arduino/',
				description: 'Detailed guide on using relays with ESP32.'
			},
			{
				title: 'NeoPixel Guide',
				url: 'https://learn.adafruit.com/adafruit-neopixel-uberguide',
				description: 'Learn about addressable RGB LEDs.'
			}
		]}
	/>
</SectionNavigator>

<WorkshopNavigation />
