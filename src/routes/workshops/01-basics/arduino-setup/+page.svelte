<script>
	import { page } from '$app/state';
	import IntroContainer from '$lib/base/IntroContainer.svelte';
	import SectionNavigator from '$lib/components/SectionNavigator.svelte';
	import WorkshopNavigation from '$lib/WorkshopNavigation.svelte';
	import CodeCard from '$lib/components/CodeCard.svelte';
	import TipBox from '$lib/components/TipBox.svelte';
	import FurtherResources from '$lib/components/FurtherResources.svelte';
	import { MoveLeft } from 'lucide-svelte';
	import { Button } from '$lib/components/ui/button/index.js';
	let parentPage = $derived(page.url.pathname.split('/')[2]);
	let { data } = $props();

	const blinkHowItWorks = `
		<ul>
			<li>
				The <code>#define LED_PIN 8</code> statement creates a constant that maps pin 8 to LED_PIN. This makes
				the code more readable and easier to modify.
			</li>
			<li>The <code>setup()</code> function is called once when the microcontroller starts up.</li>
			<li>The <code>loop()</code> function is called repeatedly.</li>
			<li>The <code>setup()</code> function is used to initialize the microcontroller.</li>
			<li>The <code>loop()</code> function is used to run the main program.</li>
			<li>
				The <code>digitalWrite()</code> function is used to set the state of the pin. The HIGH state is 3.3V
				(for ESP32) and the LOW state is 0V. The delay function is used to pause the program for the
				specified number of milliseconds.
			</li>
			<li>
				Pin 8 is used to control an external LED. You'll need to connect an LED with a
				current-limiting resistor (220Ω-1kΩ) to this pin.
			</li>
		</ul>
	`;

	const wifiHowItWorks = `
		<ul>
			<li>The <code>#include &lt;WiFi.h&gt;</code> library is used to connect to your Wifi.</li>
			<li>
				The <code>ssid</code> and <code>password</code> variables are used to store your Wifi credentials.
			</li>
			<li>The <code>WiFi.begin()</code> function is used to connect to your Wifi.</li>
			<li>The <code>while</code> loop is used to wait for the connection to be established.</li>
			<li>
				The <code>delay()</code> function is used to pause the program for the specified number of milliseconds.
			</li>
			<li>
				The <code>Serial.println()</code> function is used to print the connection status to the serial monitor.
			</li>
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
			get you started quickly.
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

		<TipBox title="Pro Tip" variant="purple">
			If you're an experienced developer and prefer a more advanced development environment, check
			out
			<a href="https://platformio.org/" target="_blank" class="link">PlatformIO</a>
			for VS Code/Cursor integration, or use the
			<a
				href="https://docs.espressif.com/projects/arduino-esp32/en/latest/getting_started.html"
				target="_blank"
				class="link">Espressif Arduino SDK</a
			>. However, for beginners, we recommend sticking with Arduino IDE for simplicity.
		</TipBox>
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

		<TipBox title="A note on USB Cables" variant="danger">
			Make sure you're using a USB cable that supports <strong>data transfer</strong>, not just
			charging! Many USB cables (especially cheap ones or those that come with power banks) are
			charging-only and don't have the data lines connected. If your computer doesn't recognize your
			ESP32, try a different USB cable. Data cables are typically thicker and often labeled as
			"data" or "sync" cables.
		</TipBox>

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

		<TipBox title="LED Connection" variant="info">
			This sketch uses pin 8 on the ESP32-C3. If you are using the Cheap Yellow Display (CYD), the
			LED is connected to pin 4.
		</TipBox>

		<CodeCard
			title="Blink Sketch"
			code={data.blinkCode}
			language="cpp"
			githubLink="https://github.com/CardanoThings/Workshops/tree/main/Workshop-01/examples/blink-code"
			howItWorksTitle="How the Blink Sketch Works"
			howItWorksContent={blinkHowItWorks}
			footerText="Copy and paste the code into your Arduino IDE and upload it to your microcontroller. Make sure to select the correct board and port. You should see the LED on your microcontroller blink."
		/>
	</section>

	<section class="mb-16 flex flex-col gap-4 text-white">
		<h2 class="text-4xl font-medium">Connect to Wifi</h2>
		<p class="text-lg font-thin text-white">
			Now that you have your microcontroller blinking, we will connect it to your Wifi and the
			Internet.
		</p>

		<CodeCard
			title="Wifi Connection"
			code={data.wifiCode}
			language="cpp"
			githubLink="https://github.com/CardanoThings/Workshops/tree/main/Workshop-01/examples/wifi-code"
			howItWorksTitle="How the WiFi Connection Works"
			howItWorksContent={wifiHowItWorks}
			footerText="Copy and paste the code into your Arduino IDE and upload it to your microcontroller. Make sure to select the correct board and port. You should see the microcontroller connect to your Wifi and print the IP address to the serial monitor."
		/>

		<TipBox title="ESP32-C3 Super Mini WiFi Workaround" variant="info">
			If you're using an ESP32-C3 Super Mini and experiencing WiFi connection issues, the code includes <code>WiFi.setTxPower(WIFI_POWER_8_5dBm);</code> as a workaround. This sets the WiFi transmit power to 8.5 dBm, which helps resolve connectivity problems specific to this board variant.
		</TipBox>

		<TipBox title="Serial Monitor" variant="success">
			To view the WiFi connection status and IP address, open the Serial Monitor in Arduino IDE by
			going to <strong>Tools → Serial Monitor</strong> or pressing <strong>Ctrl+Shift+M</strong>
			(Cmd+Shift+M on Mac). Make sure the baud rate is set to <strong>115200</strong> to match the code.
		</TipBox>

		<p class="text-lg font-thin text-white">
			Now that you have your microcontroller connected to your Wifi, you can start using it to make
			API calls.
		</p>
	</section>

	<FurtherResources
		resources={[
			{
				title: 'Arduino Workshop Video Tutorial',
				url: 'https://www.youtube.com/watch?v=EdXQUEMOfgU&list=PLPK2l9Knytg5s2dk8V09thBmNl2g5pRSr&index=2',
				description: 'Video tutorial covering Arduino setup and basics.'
			},
			{
				title: 'Arduino Documentation',
				url: 'https://docs.arduino.cc/',
				description:
					'Official Arduino documentation covering hardware, software, programming, and tutorials.'
			},
			{
				title: 'Arduino IDE Download',
				url: 'https://www.arduino.cc/en/software/',
				description: 'Download the Arduino IDE and other Arduino software tools.'
			}
		]}
	/>
</SectionNavigator>

<WorkshopNavigation />
