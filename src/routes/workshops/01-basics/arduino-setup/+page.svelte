<script>
	import { page } from '$app/state';
	import IntroContainer from '$lib/base/IntroContainer.svelte';
	import SectionNavigator from '$lib/components/SectionNavigator.svelte';
	import WorkshopNavigation from '$lib/WorkshopNavigation.svelte';
	import LiveCodeCard from '$lib/components/LiveCodeCard.svelte';
	import TipBox from '$lib/components/TipBox.svelte';
	import FurtherResources from '$lib/components/FurtherResources.svelte';
	import { MoveLeft } from 'lucide-svelte';
	import { Button } from '$lib/components/ui/button/index.js';
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

		<h2 class="mt-6 text-2xl font-medium">Install CH340 Driver</h2>
		<p class="text-lg font-thin text-white">
			If you're using a CYD, you will need to install the CH340 driver.
		</p>
		<ol class="ml-4 list-decimal space-y-2">
			<li>
				Download the CH340 driver from <a
					href="https://learn.sparkfun.com/tutorials/how-to-install-ch340-drivers/all"
					target="_blank"
					class="link">here</a
				>
			</li>
			<li>Install the driver following the instructions for your operating system</li>
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

		<LiveCodeCard
			title="Blink Sketch"
			repo="CardanoThings/Workshops"
			branch="main"
			files={[
				{
					path: 'Workshop-01/examples/blink/blink.ino',
					language: 'cpp'
				}
			]}
			readmePath="Workshop-01/examples/blink/README.md"
			footerText="Copy and paste the code into your Arduino IDE and upload it to your microcontroller. Make 
            sure to select the correct board and port. You should see the LED on your microcontroller blink."
		/>
	</section>

	<section class="mb-16 flex flex-col gap-4 text-white">
		<h2 class="text-4xl font-medium">Connect to Wifi</h2>
		<p class="text-lg font-thin text-white">
			Now that you have your microcontroller blinking, we will connect it to your Wifi and the
			Internet.
		</p>

		<LiveCodeCard
			title="Wifi Connection"
			repo="CardanoThings/Workshops"
			branch="main"
			files={[
				{
					path: 'Workshop-01/examples/wifi/wifi.ino',
					language: 'cpp'
				}
			]}
			readmePath="Workshop-01/examples/wifi/README.md"
			footerText="Copy and paste the code into your Arduino IDE and upload it to your microcontroller. Make sure to select the correct board and port. You should see the microcontroller connect to your Wifi and print the IP address to the serial monitor."
		/>

		<TipBox title="ESP32-C3 Super Mini WiFi Workaround" variant="info">
			If you're using an ESP32-C3 Super Mini and experiencing WiFi connection issues, the code
			includes <code>WiFi.setTxPower(WIFI_POWER_8_5dBm);</code> as a workaround. This sets the WiFi transmit
			power to 8.5 dBm, which helps resolve connectivity problems specific to this board variant.
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
			},
			{
				title: 'SparkFun CH340 Driver Installation Guide',
				url: 'https://learn.sparkfun.com/tutorials/how-to-install-ch340-drivers/all',
				description:
					'Step-by-step guide for installing CH340 USB drivers on Windows, macOS, and Linux'
			},
			{
				title: 'CH340 Driver Installation Guide',
				url: 'https://learn.adafruit.com/how-to-install-drivers-for-wch-usb-to-serial-chips-ch9102f-ch9102/overview',
				description:
					'Step-by-step guide for installing CH340 USB drivers on Windows, macOS, and Linux'
			}
		]}
	/>
</SectionNavigator>

<WorkshopNavigation />
