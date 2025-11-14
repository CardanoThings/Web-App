<script>
	import { page } from '$app/state';
	import IntroContainer from '$lib/base/IntroContainer.svelte';
	import SectionNavigator from '$lib/components/SectionNavigator.svelte';
	import WorkshopNavigation from '$lib/WorkshopNavigation.svelte';
	import { MoveLeft } from 'lucide-svelte';
	import { Button } from '$lib/components/ui/button/index.js';
	import SyntaxHighlighter from '$lib/SyntaxHighlighter.svelte';
	import * as Card from '$lib/components/ui/card/index.js';
	let parentPage = $derived(page.url.pathname.split('/')[2]);
	let { data } = $props();
</script>

<section class="mb-16 flex flex-col gap-4 text-white">
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
			Now that you have the Arduino IDE installed, you can start setting up your microcontroller.
			Follow the steps below to get your microcontroller ready for development.
		</p>
	</section>

	<section class="mb-16 flex flex-col gap-4 text-white">
		<h2 class="text-4xl font-medium">Your first sketch</h2>
		<p class="text-lg font-thin text-white">
			Lets upload the first sketch to your microcontroller. This will make it blink.
		</p>

		<Card.Root>
			<Card.Header class="mb-0 pb-0">
				<Card.Title>Blink Sketch</Card.Title>
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

		<h3 class="mt-4 text-2xl font-medium">How it works</h3>
		<ul>
			<li>The <i>setup</i> function is called once when the microcontroller starts up.</li>
			<li>The <i>loop</i> function is called repeatedly.</li>
			<li>The <i>setup</i> function is used to initialize the microcontroller.</li>
			<li>The <i>loop</i> function is used to run the main program.</li>
			<li>
				The <i>digitalWrite</i> function is used to set the state of the pin. The HIGH state is 5V and
				the LOW state is 0V. The delay function is used to pause the program for the specified number
				of milliseconds.
			</li>
			<li>
				The <i>LED_BUILTIN</i> is the built-in LED on your Microcontroller. You can find the actual pin
				number in the Microcontroller datasheet.
			</li>
		</ul>
	</section>

	<section class="mb-16 flex flex-col gap-4 text-white">
		<h2 class="text-4xl font-medium">Connect to Wifi</h2>
		<p class="text-lg font-thin text-white">
			Now that you have your microcontroller blinking, we will connect it to your Wifi and Internet.
		</p>

		<Card.Root>
			<Card.Header class="mb-0 pb-0">
				<Card.Title>Wifi Connection</Card.Title>
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

		<h3 class="mt-4 text-2xl font-medium">How it works</h3>
		<ul>
			<li>The include <i>WiFi.h</i> library is used to connect to your Wifi.</li>
			<li>
				The <i>ssid</i> and <i>password</i> variables are used to store your Wifi credentials.
			</li>
			<li>The <i>WiFi.begin</i> function is used to connect to your Wifi.</li>
			<li>The <i>while</i> loop is used to wait for the connection to be established.</li>
			<li>
				The <i>delay</i> function is used to pause the program for the specified number of milliseconds.
			</li>
			<li>
				The <i>Serial.println</i> function is used to print the connection status to the serial monitor.
			</li>
		</ul>

		<p class="text-lg font-thin text-white">
			Now that you have your microcontroller connected to your Wifi, you can start using it to make
			API calls.
		</p>
	</section>
</SectionNavigator>

<WorkshopNavigation />
