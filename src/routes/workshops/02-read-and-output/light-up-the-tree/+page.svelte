<script>
	import { page } from '$app/state';
	import SectionNavigator from '$lib/components/SectionNavigator.svelte';
	import WorkshopNavigation from '$lib/WorkshopNavigation.svelte';
	import CodeCard from '$lib/components/CodeCard.svelte';
	import FurtherResources from '$lib/components/FurtherResources.svelte';
	import TipBox from '$lib/components/TipBox.svelte';
	import ESP32C3Pinout from '$lib/components/ESP32C3Pinout.svelte';
	import PingPongWallet from '$lib/base/PingPongWallet.svelte';
	import { MoveLeft } from 'lucide-svelte';
	let parentPage = $derived(page.url.pathname.split('/')[2]);
	let { data } = $props();

	const relayBlinkHowItWorks = `
		<h3>Overview</h3>
		<p>This simple example demonstrates basic relay control without any network connectivity. It's perfect for testing your relay wiring before adding blockchain integration.</p>
		
		<h3>Key Concepts</h3>
		<ul>
			<li><strong>Pin Configuration:</strong> The relay control pin is configured as an OUTPUT using <code>pinMode()</code>, allowing the microcontroller to control the relay state.</li>
			<li><strong>Active LOW vs Active HIGH:</strong> Most relay modules are active LOW, meaning LOW (0V) turns the relay ON and HIGH (3.3V/5V) turns it OFF. Some modules work the opposite way.</li>
			<li><strong>Timing:</strong> The code uses <code>delay()</code> to create a simple on/off cycle. The relay turns ON for 2 seconds, then OFF for 2 seconds, repeating continuously.</li>
			<li><strong>Serial Feedback:</strong> The code prints messages to the Serial Monitor so you can verify the relay is responding to commands.</li>
		</ul>
		
		<h3>How the Blink Cycle Works</h3>
		<ol>
			<li>The relay pin is set to LOW (for active LOW relays), activating the relay</li>
			<li>The program waits 2 seconds using <code>delay(2000)</code></li>
			<li>The relay pin is set to HIGH, deactivating the relay</li>
			<li>The program waits another 2 seconds</li>
			<li>The cycle repeats indefinitely</li>
		</ol>
		
		<h3>Testing Your Setup</h3>
		<p>When the code is running correctly, you should:</p>
		<ul>
			<li>Hear a clicking sound every 2 seconds (the relay switching)</li>
			<li>See the status LED on the relay module turn on and off</li>
			<li>If you've connected a device, it should turn on and off with the relay</li>
		</ul>
		
		<h3>Troubleshooting</h3>
		<p>If the relay doesn't work:</p>
		<ul>
			<li>Check your wiring (VCC, GND, and IN pins)</li>
			<li>Verify the GPIO pin number matches your wiring</li>
			<li>Try reversing HIGH and LOW in the code (some relays are active HIGH)</li>
			<li>Check that your relay module is receiving power (verify VCC connection)</li>
		</ul>
	`;

	const relayIntegrationHowItWorks = `
		<h3>Overview</h3>
		<p>This example demonstrates how to connect blockchain events to physical hardware using a relay. When your wallet balance changes, the relay activates or deactivates, controlling your connected device.</p>
		
		<h3>Key Concepts</h3>
		<ul>
			<li><strong>Balance Monitoring:</strong> The code checks your wallet balance every 30 seconds using the Koios API <code>/address_info</code> endpoint, comparing it to the previous balance to detect changes.</li>
			<li><strong>Change Detection:</strong> By storing the previous balance and comparing it to the current balance, we can detect both incoming (balance increases) and outgoing (balance decreases) transactions.</li>
			<li><strong>Relay Control:</strong> When a balance change is detected, the code calls either <code>turnOnLight()</code> or <code>turnOffLight()</code> to control the relay state.</li>
			<li><strong>Non-blocking Timing:</strong> Using <code>millis()</code> instead of <code>delay()</code> allows the microcontroller to continue checking balances while maintaining timing control.</li>
		</ul>
		
		<h3>How the Balance Monitoring Works</h3>
		<ol>
			<li>The code connects to WiFi and performs an initial balance check on startup</li>
			<li>Every 30 seconds, the <code>loop()</code> function calls <code>fetchWalletBalance()</code></li>
			<li>The function sends a POST request to the Koios API with your wallet address</li>
			<li>The API response is parsed to extract the current balance (converted from Lovelace to ADA)</li>
			<li>The current balance is compared to the previous balance</li>
			<li>If the balance increased, <code>turnOnLight()</code> is called (relay activates)</li>
			<li>If the balance decreased, <code>turnOffLight()</code> is called (relay deactivates)</li>
			<li>The previous balance is updated for the next comparison</li>
		</ol>
		
		<h3>Relay Control Functions</h3>
		<ul>
			<li><strong>turnOnLight():</strong> Sets the relay pin to HIGH (for most relay modules), activating the relay and turning on your connected device. Also updates the <code>lightState</code> variable and prints a confirmation message.</li>
			<li><strong>turnOffLight():</strong> Sets the relay pin to LOW, deactivating the relay and turning off your connected device. Updates the state variable and prints a confirmation message.</li>
		</ul>
		
		<h3>Customization Ideas</h3>
		<ul>
			<li>Modify the logic to trigger only on balance increases (incoming transactions)</li>
			<li>Add a threshold check (e.g., only activate if balance exceeds a certain amount)</li>
			<li>Detect specific token receipts instead of ADA balance changes</li>
			<li>Add multiple relays for different types of events</li>
			<li>Implement timed activation (e.g., relay turns on for 60 seconds then automatically turns off)</li>
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
		<h2 class="text-4xl font-medium">Introduction to external Hardware</h2>
		<p class="text-lg font-thin text-white">
			One of the most powerful features of microcontrollers is their ability to control external
			hardware. While microcontrollers operate at low voltages (typically 3.3V or 5V), they can
			control much more powerful devices through the use of external hardware components.
		</p>
		<p class="text-lg font-thin text-white">
			Microcontrollers can control various types of external hardware:
		</p>
		<ul class="ml-6 list-disc">
			<li><strong>LEDs and Displays:</strong> Visual feedback and information display</li>
			<li>
				<strong>Motors:</strong> Servo motors for precise positioning, stepper motors for accurate rotation
			</li>
			<li>
				<strong>Sensors:</strong> Temperature, humidity, motion, light, and many other environmental
				sensors
			</li>
			<li>
				<strong>Actuators:</strong> Relays, solenoids, and other devices that can control larger systems
			</li>
			<li><strong>Audio Devices:</strong> Buzzers, speakers, and audio modules for sound output</li>
		</ul>
		<p class="text-lg font-thin text-white">
			In this workshop, we'll focus on <strong>relays</strong>, which are essential for controlling
			high-voltage devices safely.
		</p>
		<h3 class="mt-6 text-2xl font-medium">What is a Relay?</h3>
		<p class="text-lg font-thin text-white">
			A relay is an electrically operated switch that allows a low-power signal (from your
			microcontroller) to control a high-power circuit (like a 110V or 220V light bulb, motor, or
			appliance). This is essential for safety - your microcontroller operates at 3.3V or 5V, which
			is not enough to directly control household appliances.
		</p>
		<p class="text-lg font-thin text-white">
			Relays work by using an electromagnet to physically open or close a switch. When you send a
			signal from your microcontroller to the relay module, it activates the electromagnet, which
			moves the switch contacts. This physical separation between the control circuit (low voltage)
			and the load circuit (high voltage) provides electrical isolation and safety.
		</p>
		<TipBox title="Choosing a Relay Module" variant="info">
			When purchasing a relay module, look for one that includes <strong>status LEDs</strong>. These
			LEDs light up when the relay is activated, making it easy to monitor if your software is
			working as expected without needing to connect a high-voltage device. This is especially
			useful during development and testing, as you can verify the relay is responding to your code
			commands visually before connecting any actual appliances or lights.
		</TipBox>
		<h3 class="mt-6 text-2xl font-medium">Why Use a Relay?</h3>
		<ul class="ml-6 list-disc">
			<li>
				<strong>Safety:</strong> Electrical isolation between low-voltage control and high-voltage load
			</li>
			<li>
				<strong>Power Handling:</strong> Can control devices that require much more current than a microcontroller
				can provide
			</li>
			<li>
				<strong>Versatility:</strong> Can switch AC or DC circuits, making them suitable for a wide range
				of applications
			</li>
			<li>
				<strong>Reliability:</strong> Physical switching mechanism is robust and can handle high currents
			</li>
		</ul>
		<TipBox title="Safety Warning" variant="warning">
			Working with high voltage can be dangerous. Always ensure you understand what you're doing and
			take proper safety precautions. If you're unsure, start with low-voltage components like LEDs
			before moving to relays and high-voltage devices.
		</TipBox>
	</section>

	<section class="mb-16 flex flex-col gap-4 text-white">
		<h2 class="text-4xl font-medium">Setting up the Relay with Wiring</h2>
		<p class="text-lg font-thin text-white">
			For this project, you'll need a relay module (often called a "relay board" or "relay shield").
			These modules typically have:
		</p>
		<ul class="ml-6 list-disc">
			<li><strong>Input pins (VCC, GND, IN):</strong> These connect to your microcontroller</li>
			<li>
				<strong>Output terminals (NO, COM, NC):</strong> For connecting your high-voltage device
			</li>
			<li>
				<strong>Optocoupler:</strong> Provides electrical isolation between control and load circuits
			</li>
			<li><strong>Status LED:</strong> Shows when the relay is active (you'll see it light up)</li>
		</ul>
		<h3 class="mt-6 text-2xl font-medium">Wiring the Relay to Your Microcontroller</h3>
		<p class="text-lg font-thin text-white">Follow these steps to connect your relay module:</p>
		<ol class="ml-6 list-decimal">
			<li>
				<strong>Connect VCC:</strong> Connect the VCC pin on the relay module to 5V (or 3.3V depending
				on your relay module specifications - check the module's documentation)
			</li>
			<li>
				<strong>Connect GND:</strong> Connect the GND pin on the relay module to GND on your microcontroller
			</li>
			<li>
				<strong>Connect IN (Signal Pin):</strong> Connect the IN pin (sometimes labeled "SIG" or "IN")
				to a GPIO pin on your microcontroller (e.g., GPIO 2)
			</li>
		</ol>
		<ESP32C3Pinout />
		<h3 class="mt-6 text-2xl font-medium">Wiring Your Device to the Relay</h3>
		<p class="text-lg font-thin text-white">
			<strong>⚠️ Important:</strong> Only proceed with this step if you have experience working with
			high voltage. If you're unsure, test the relay first with a low-voltage LED before connecting any
			high-voltage devices.
		</p>
		<p class="text-lg font-thin text-white">The relay has three output terminals:</p>
		<ul class="ml-6 list-disc">
			<li>
				<strong>COM (Common):</strong> The common terminal - this is your main connection point
			</li>
			<li>
				<strong>NO (Normally Open):</strong> When the relay is OFF, this terminal is disconnected from
				COM. When the relay is ON, this terminal connects to COM.
			</li>
			<li>
				<strong>NC (Normally Closed):</strong> When the relay is OFF, this terminal is connected to COM.
				When the relay is ON, this terminal disconnects from COM.
			</li>
		</ul>
		<p class="text-lg font-thin text-white">
			For most applications (like turning a light on/off), you'll use <strong>COM and NO</strong>:
		</p>
		<ol class="ml-6 list-decimal">
			<li>Connect one wire from your power source (hot/live wire) to COM</li>
			<li>Connect the other wire from your device (light, appliance, etc.) to NO</li>
			<li>
				Complete the circuit by connecting the neutral wire from your device back to the power
				source's neutral
			</li>
		</ol>
		<TipBox title="Active LOW vs Active HIGH" variant="info">
			Most relay modules are <strong>active LOW</strong>, meaning they turn ON when you set the GPIO
			pin to LOW (0V) and OFF when set to HIGH. However, some modules work the opposite way (active
			HIGH). Check your relay module's documentation to confirm. You'll know it's working when you
			hear a click sound and see the status LED light up.
		</TipBox>
	</section>

	<section class="mb-16 flex flex-col gap-4 text-white">
		<h2 class="text-4xl font-medium">Blink Example for the Relay</h2>
		<p class="text-lg font-thin text-white">
			Before connecting your relay to blockchain events, let's start with a simple blink example.
			This will help you verify that your wiring is correct and that the relay is working properly.
		</p>
		<p class="text-lg font-thin text-white">
			This example will turn the relay ON for 2 seconds, then OFF for 2 seconds, creating a
			continuous blinking pattern. You should hear a click sound each time the relay switches state,
			and see the status LED on the relay module light up when it's active. Make sure to use the
			correct GPIO pin for your relay module.
		</p>

		<CodeCard
			title="Simple Relay Blink Code"
			code={data.relayBlinkCode}
			language="cpp"
			githubLink="https://github.com/CardanoThings/Workshops/tree/main/Workshop-02/examples/relay-blink-code"
			howItWorksContent={relayBlinkHowItWorks}
			footerText="Copy and paste this code into your Arduino IDE. Make sure to set the correct GPIO pin number to match your wiring. Upload it to your microcontroller and you should hear the relay clicking every 2 seconds. If your relay doesn't work, try reversing HIGH and LOW in the code (some relays are active HIGH instead of active LOW)."
		/>
	</section>

	<section class="mb-16 flex flex-col gap-4 text-white">
		<h2 class="text-4xl font-medium">Putting it All Together</h2>
		<p class="text-lg font-thin text-white">
			Now that you've verified your relay is working with the blink example, let's connect it to
			blockchain events. This code will monitor your wallet balance and control the relay based on
			transactions.
		</p>
		<p class="text-lg font-thin text-white">
			When your wallet balance increases (you receive a transaction), the relay will turn ON,
			activating your connected device. When the balance decreases (you send a transaction), the
			relay will turn OFF.
		</p>

		<CodeCard
			title="Relay Control with Blockchain Integration"
			code={data.relayCode}
			language="cpp"
			githubLink="https://github.com/CardanoThings/Workshops/tree/main/Workshop-02/examples/relay-code"
			howItWorksContent={relayIntegrationHowItWorks}
			footerText="Copy and paste the code into your Arduino IDE. Make sure to set the correct GPIO pin for your relay module. Replace WiFi credentials and wallet address with your own. Upload it to your microcontroller. When you receive a transaction to your wallet, the relay should activate and turn on your light. Make sure you're using a Preprod Testnet wallet address (starting with 'addr_test1...')."
		/>
		<PingPongWallet />
	</section>

	<section class="mb-16 flex flex-col gap-4 text-white">
		<h2 class="text-4xl font-medium">What's Next?</h2>
		<p class="text-lg font-thin text-white">
			Congratulations! You've learned the basic building blocks for attaching blockchain events to
			the real world. The concepts you've mastered in this workshop—monitoring blockchain data,
			detecting changes, and controlling external hardware—form the foundation for countless
			innovative projects.
		</p>
		<p class="text-lg font-thin text-white">
			With these skills, you can now create projects that bridge the digital and physical worlds.
			Here are some ideas to inspire your next build:
		</p>
		<ul class="ml-6 list-disc">
			<li>
				<strong>Automated Fountains:</strong> Turn on a fountain when a specific blockchain event occurs,
				such as receiving a payment from a particular address or when a certain NFT is transferred
			</li>
			<li>
				<strong>Blockchain-Powered Vending Machines:</strong> Wire a vending machine to accept blockchain
				payments, automatically dispensing products when payment is received
			</li>
			<li>
				<strong>Smart Home Integration:</strong> Control lights, fans, or other appliances based on blockchain
				events or token holdings
			</li>
			<li>
				<strong>Event-Driven Displays:</strong> Create dynamic displays that update when specific transactions
				occur or when certain conditions are met on-chain
			</li>
		</ul>
		<p class="text-lg font-thin text-white">
			The possibilities are endless. Combine what you've learned with your creativity to build
			projects that connect Cardano's blockchain to the physical world around you!
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
				title: 'Introduction to ESP32-C3',
				url: 'https://www.youtube.com/watch?v=V9I9koQ0AeA',
				description: 'Video introduction to the ESP32-C3 microcontroller.'
			},
			{
				title: 'Relays Explained',
				url: 'https://www.youtube.com/watch?v=jXcdH1PgmMI',
				description: 'Video tutorial explaining how relays work and how to use them.'
			},
			{
				title: 'SPI Communication Tutorial',
				url: 'https://www.youtube.com/watch?v=ZGaCXHvgcE4',
				description: 'Learn about SPI (Serial Peripheral Interface) communication protocol.'
			},
			{
				title: 'I2C Communication Tutorial',
				url: 'https://www.youtube.com/watch?v=pxhg2Rwm_h8',
				description: 'Learn about I2C (Inter-Integrated Circuit) communication protocol.'
			}
		]}
	/>
</SectionNavigator>

<WorkshopNavigation />
