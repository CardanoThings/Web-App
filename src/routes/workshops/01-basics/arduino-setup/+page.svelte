<script>
	import { page } from '$app/state';
	import IntroContainer from '$lib/base/IntroContainer.svelte';
	import SectionNavigator from '$lib/components/SectionNavigator.svelte';
	import WorkshopNavigation from '$lib/WorkshopNavigation.svelte';
	import { MoveLeft } from 'lucide-svelte';
	import { Button } from '$lib/components/ui/button/index.js';
	import SyntaxHighlighter from '$lib/components/SyntaxHighlighter.svelte';
	import * as Card from '$lib/components/ui/card/index.js';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	let parentPage = $derived(page.url.pathname.split('/')[2]);
	let { data } = $props();
	let blinkHowItWorksOpen = $state(false);
	let wifiHowItWorksOpen = $state(false);
</script>

<section class="mb-8 flex flex-col gap-4 text-white">
	<a href={`/workshops/${parentPage}`} class="flex items-center gap-2">
		<MoveLeft size="20" />
		<h1 class="text-lg font-normal text-white sm:max-w-[50%]">Workshop 01: The Basics</h1>
	</a>
	<h2 class="text-6xl font-medium text-white sm:max-w-[50%]">Arduino Setup</h2>
	<p class="text-lg font-thin text-white sm:max-w-[50%]">
		We will now install the Arduino IDE, connect your microcontroller to Wifi and install the
		infamous blink sketch on it. Once this works, we'll continue to connect it to your
		Wifi/Internet. In this workshop we will use the ESP32-C3 Microcontroller, the setup for other
		microcontrollers might be slightly different.
	</p>
	<div class="mt-4 sm:w-1/2">
		<IntroContainer topic="Arduino" />
	</div>
</section>

<SectionNavigator>
	<section class="mb-16 flex flex-col gap-4 text-white">
		<h2 class="text-4xl font-medium">Install Arduino IDE</h2>
		<p class="text-lg font-thin text-white">
			To keep things simple, we will use the <a
				href="https://www.arduino.cc/en/software/#ide"
				target="_blank"
				class="link">Arduino IDE</a
			>
			as development environment for all workshops. It is free, easy to install, setup and use and will
			get you started. If you're an experienced coder and want an integration into VS Code or Cursor,
			you might wanna look into
			<a href="https://platformio.org/" target="_blank" class="link">PlatformIO</a>
			or the
			<a
				href="https://docs.espressif.com/projects/arduino-esp32/en/latest/getting_started.html"
				target="_blank"
				class="link">Espressif Arduino SDK</a
			>.
		</p>

		<p>
			Go to the link below, choose your Operating System and click on download, then follow the
			installation process.
		</p>

		<div class="sm:w-1/2">
			<Button
				href="https://www.arduino.cc/en/software/#ide"
				target="_blank"
				rel="noopener noreferrer"
				variant="secondary"
				class="text-xs"
				size="sm">Download Arduino IDE</Button
			>
		</div>
	</section>

	<section class="mb-16 flex flex-col gap-4 text-white">
		<h2 class="text-4xl font-medium">Setup your Microcontroller</h2>
		<p class="text-lg font-thin text-white">
			Now that you have the Arduino IDE installed, you need to install the ESP32 board support
			package. This allows the Arduino IDE to compile and upload code to ESP32 microcontrollers.
		</p>

		<h3 class="mt-4 text-2xl font-medium">Step 1: Install ESP32 Board Support</h3>
		<p class="text-lg font-thin text-white">
			The ESP32 board package is now available directly in the Arduino IDE Boards Manager.
		</p>
		<ol class="ml-4 list-decimal space-y-2">
			<li>Open Arduino IDE</li>
			<li>Go to <strong>Tools → Board → Boards Manager</strong></li>
			<li>In the search box, type <strong>esp32</strong></li>
			<li>Find <strong>"esp32 by Espressif Systems"</strong> in the list</li>
			<li>Click <strong>Install</strong> (this may take a few minutes)</li>
			<li>Wait for the installation to complete</li>
		</ol>

		<h3 class="mt-6 text-2xl font-medium">Step 2: Select Your Board</h3>
		<p class="text-lg font-thin text-white">
			After installation, you need to select the correct board for your ESP32 microcontroller.
		</p>

		<div class="mb-4 rounded-lg border border-red-500/30 bg-red-500/10 p-4">
			<p class="text-sm font-medium text-red-300">
				<strong>⚠️ Important - USB Cable:</strong> Make sure you're using a USB cable that supports
				<strong>data transfer</strong>, not just charging! Many USB cables (especially cheap ones or
				those that come with power banks) are charging-only and don't have the data lines connected.
				If your computer doesn't recognize your ESP32, try a different USB cable. Data cables are
				typically thicker and often labeled as "data" or "sync" cables.
			</p>
		</div>

		<ol class="ml-4 list-decimal space-y-2">
			<li>Connect your ESP32-C3 to your computer via USB</li>
			<li>Go to <strong>Tools → Board → esp32</strong></li>
			<li>Select <strong>ESP32C3 Dev Module</strong> from the list</li>
			<li>
				Go to <strong>Tools → Port</strong> and select the port where your ESP32 is connected
				<ul class="mt-1 ml-4 list-disc space-y-1 text-sm">
					<li>On Windows: Usually shows as COM3, COM4, etc.</li>
					<li>On macOS: Usually shows as /dev/cu.usbserial-* or /dev/cu.SLAB_USBtoUART</li>
					<li>On Linux: Usually shows as /dev/ttyUSB0 or /dev/ttyACM0</li>
				</ul>
			</li>
		</ol>
	</section>

	<section class="mb-16 flex flex-col gap-4 text-white">
		<h2 class="text-4xl font-medium">Your first sketch</h2>
		<p class="text-lg font-thin text-white">
			Lets upload the first sketch to your microcontroller. This will make it blink.
		</p>

		<Card.Root>
			<Card.Header class="mb-0 flex flex-row items-center justify-between pb-0">
				<Card.Title>Blink Sketch</Card.Title>
				<div class="flex gap-2">
					<Button
						onclick={() => (blinkHowItWorksOpen = true)}
						variant="outline"
						size="sm"
						class="gap-2 text-xs"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="16"
							height="16"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						>
							<circle cx="12" cy="12" r="10" />
							<path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
							<path d="M12 17h.01" />
						</svg>
						How it Works
					</Button>
					<Button
						href="https://github.com/CardanoThings/Workshops/tree/main/Workshop-01/examples/blink-code"
						target="_blank"
						variant="outline"
						size="sm"
						class="gap-2 text-xs"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="16"
							height="16"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						>
							<path
								d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"
							/>
							<path d="M9 18c-4.51 2-5-2-7-2" />
						</svg>
						View on GitHub
					</Button>
				</div>
			</Card.Header>
			<Card.Content>
				<SyntaxHighlighter language="cpp" code={data.blinkCode} />
			</Card.Content>
			<Card.Footer>
				<p class="text-xs leading-relaxed">
					Copy and paste the code into your Arduino IDE and upload it to your microcontroller. Make
					sure to select the correct board and port. You should see the LED on your microcontroller
					blink.
				</p>
			</Card.Footer>
		</Card.Root>
	</section>

	<section class="mb-16 flex flex-col gap-4 text-white">
		<h2 class="text-4xl font-medium">Connect to Wifi</h2>
		<p class="text-lg font-thin text-white">
			Now that you have your microcontroller blinking, we will connect it to your Wifi and Internet.
		</p>

		<Card.Root>
			<Card.Header class="mb-0 flex flex-row items-center justify-between pb-0">
				<Card.Title>Wifi Connection</Card.Title>
				<div class="flex gap-2">
					<Button
						onclick={() => (wifiHowItWorksOpen = true)}
						variant="outline"
						size="sm"
						class="gap-2 text-xs"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="16"
							height="16"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						>
							<circle cx="12" cy="12" r="10" />
							<path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
							<path d="M12 17h.01" />
						</svg>
						How it Works
					</Button>
					<Button
						href="https://github.com/CardanoThings/Workshops/tree/main/Workshop-01/examples/wifi-code"
						target="_blank"
						variant="outline"
						size="sm"
						class="gap-2 text-xs"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="16"
							height="16"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						>
							<path
								d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"
							/>
							<path d="M9 18c-4.51 2-5-2-7-2" />
						</svg>
						View on GitHub
					</Button>
				</div>
			</Card.Header>
			<Card.Content>
				<SyntaxHighlighter language="cpp" code={data.wifiCode} />
			</Card.Content>
			<Card.Footer>
				<p class="text-xs leading-relaxed">
					Copy and paste the code into your Arduino IDE and upload it to your microcontroller. Make
					sure to select the correct board and port. You should see the microcontroller connect to
					your Wifi and print the IP address to the serial monitor.
				</p>
			</Card.Footer>
		</Card.Root>

		<p class="text-lg font-thin text-white">
			Now that you have your microcontroller connected to your Wifi, you can start using it to make
			API calls.
		</p>
	</section>
</SectionNavigator>

<WorkshopNavigation />

<Dialog.Root bind:open={blinkHowItWorksOpen}>
	<Dialog.Content class="max-h-[90vh] max-w-3xl overflow-y-auto">
		<Dialog.Header>
			<Dialog.Title>How the Blink Sketch Works</Dialog.Title>
		</Dialog.Header>
		<div class="how-it-works-content">
			<ul>
				<li>
					The <code>#define LED_PIN 8</code> statement creates a constant that maps pin 8 to LED_PIN.
					This makes the code more readable and easier to modify.
				</li>
				<li>
					The <code>setup()</code> function is called once when the microcontroller starts up.
				</li>
				<li>The <code>loop()</code> function is called repeatedly.</li>
				<li>The <code>setup()</code> function is used to initialize the microcontroller.</li>
				<li>The <code>loop()</code> function is used to run the main program.</li>
				<li>
					The <code>digitalWrite()</code> function is used to set the state of the pin. The HIGH state
					is 3.3V (for ESP32) and the LOW state is 0V. The delay function is used to pause the program
					for the specified number of milliseconds.
				</li>
				<li>
					Pin 8 is used to control an external LED. You'll need to connect an LED with a
					current-limiting resistor (220Ω-1kΩ) to this pin.
				</li>
			</ul>
		</div>
	</Dialog.Content>
</Dialog.Root>

<Dialog.Root bind:open={wifiHowItWorksOpen}>
	<Dialog.Content class="max-h-[90vh] max-w-3xl overflow-y-auto">
		<Dialog.Header>
			<Dialog.Title>How the WiFi Connection Works</Dialog.Title>
		</Dialog.Header>
		<div class="how-it-works-content">
			<ul>
				<li>The <code>#include &lt;WiFi.h&gt;</code> library is used to connect to your Wifi.</li>
				<li>
					The <code>ssid</code> and <code>password</code> variables are used to store your Wifi credentials.
				</li>
				<li>The <code>WiFi.begin()</code> function is used to connect to your Wifi.</li>
				<li>The <code>while</code> loop is used to wait for the connection to be established.</li>
				<li>
					The <code>delay()</code> function is used to pause the program for the specified number of
					milliseconds.
				</li>
				<li>
					The <code>Serial.println()</code> function is used to print the connection status to the serial
					monitor.
				</li>
			</ul>
		</div>
	</Dialog.Content>
</Dialog.Root>

<style>
	.how-it-works-content :global(ul) {
		list-style-type: disc;
		padding-left: 1.5rem;
		margin: 0.5rem 0;
	}

	.how-it-works-content :global(li) {
		margin: 0.75rem 0;
		line-height: 1.6;
	}

	.how-it-works-content :global(strong) {
		color: #5b21b6;
	}

	.how-it-works-content :global(code) {
		background: rgba(255, 255, 255, 0.1);
		padding: 0.2rem 0.4rem;
		border-radius: 0.25rem;
		font-size: 0.9em;
		color: #34d399;
	}
</style>
