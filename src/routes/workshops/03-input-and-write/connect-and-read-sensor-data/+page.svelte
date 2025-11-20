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
		<h1 class="text-lg font-normal text-white sm:max-w-[50%]">Workshop 03: Input and Write</h1>
	</a>
	<h2 class="text-6xl font-medium text-white sm:max-w-[50%]">Connect and read sensor data</h2>
	<p class="text-lg font-thin text-white sm:max-w-[50%]">
		Your will learn how to connect a DHT-22 temperature sensor to your Microcontroller, read the sensor
		output, store it and display it in the Arduino console and on the display of your Microcontroller.
	</p>
</section>

<SectionNavigator>
	<section class="mb-16 flex flex-col gap-4 text-white">
		<h2 class="text-4xl font-medium">Introduction to DHT-22 Sensor</h2>
		<p class="text-lg font-thin text-white">
			The DHT-22 (also known as AM2302) is a popular digital temperature and humidity sensor. It's
			affordable, easy to use, and provides reasonably accurate readings. The sensor uses a single data
			line to communicate with your microcontroller, making it simple to connect.
		</p>
		<p class="text-lg font-thin text-white">
			<strong>Key Features:</strong>
		</p>
		<ul>
			<li>Temperature range: -40°C to 80°C with ±0.5°C accuracy</li>
			<li>Humidity range: 0-100% RH with ±2% accuracy</li>
			<li>Digital output (no analog-to-digital conversion needed)</li>
			<li>Low power consumption</li>
			<li>Long-term stability</li>
		</ul>
		<p class="text-lg font-thin text-white">
			The DHT-22 communicates using a proprietary single-wire protocol, which means you'll need a
			dedicated library to read from it. The most popular library for Arduino is the DHT sensor library
			by Adafruit.
		</p>
	</section>

	<section class="mb-16 flex flex-col gap-4 text-white">
		<h2 class="text-4xl font-medium">Connecting the Sensor</h2>
		<p class="text-lg font-thin text-white">
			<strong>Wiring the DHT-22:</strong>
		</p>
		<p class="text-lg font-thin text-white">
			The DHT-22 has four pins (some modules have only three, with VCC and GND combined):
		</p>
		<ol>
			<li><strong>VCC (Power):</strong> Connect to 3.3V or 5V (check your module's requirements)</li>
			<li><strong>Data:</strong> Connect to a digital GPIO pin (e.g., GPIO 4)</li>
			<li><strong>NC (Not Connected):</strong> Leave unconnected</li>
			<li><strong>GND (Ground):</strong> Connect to GND</li>
		</ol>
		<p class="text-lg font-thin text-white">
			<strong>Important:</strong> The DHT-22 requires a pull-up resistor (usually 4.7kΩ to 10kΩ) on the
			data line. Many DHT-22 modules come with this resistor already built-in. If your module doesn't
			have one, you'll need to add an external pull-up resistor between the data pin and VCC.
		</p>
		<p class="text-lg font-thin text-white">
			<strong>Installing the Library:</strong>
		</p>
		<ol>
			<li>Open Arduino IDE</li>
			<li>Go to <strong>Sketch → Include Library → Manage Libraries</strong></li>
			<li>Search for "DHT sensor library"</li>
			<li>Install the library by Adafruit</li>
			<li>Also install "Adafruit Unified Sensor" (dependency)</li>
		</ol>
		<p class="text-lg font-thin text-white">
			The library provides easy-to-use functions for reading temperature and humidity values from the
			sensor.
		</p>
	</section>

	<section class="mb-16 flex flex-col gap-4 text-white">
		<h2 class="text-4xl font-medium">Reading Sensor Data</h2>
		<p class="text-lg font-thin text-white">
			Now let's create a sketch that reads data from the DHT-22 sensor. We'll start with a simple
			version that just prints to the serial monitor:
		</p>

		<Card.Root>
			<Card.Header class="mb-0 pb-0">
				<Card.Title>Simple DHT-22 Reading</Card.Title>
			</Card.Header>
			<Card.Content>
				<SyntaxHighlighter language="cpp" code={data.simpleDhtCode} />
			</Card.Content>
			<Card.Footer>
				<p class="text-xs leading-relaxed">
					This basic example reads temperature and humidity every 2 seconds and prints the values to
					the serial monitor. Make sure to set the correct pin number (DHTPIN) to match your wiring.
				</p>
			</Card.Footer>
		</Card.Root>

		<h3 class="mt-4 text-2xl font-medium">How it works</h3>
		<ul>
			<li>
				The <i>DHT</i> object is initialized with the pin number and sensor type (DHT22).
			</li>
			<li>
				In <i>setup()</i>, we call <i>dht.begin()</i> to initialize the sensor.
			</li>
			<li>
				In <i>loop()</i>, we read humidity with <i>dht.readHumidity()</i> and temperature with
				<i>dht.readTemperature()</i>.
			</li>
			<li>
				We check if the readings are valid using <i>isnan()</i> before using them.
			</li>
			<li>
				The sensor needs at least 2 seconds between readings for accurate measurements.
			</li>
		</ul>
	</section>

	<section class="mb-16 flex flex-col gap-4 text-white">
		<h2 class="text-4xl font-medium">Displaying on Console and Screen</h2>
		<p class="text-lg font-thin text-white">
			Now let's enhance the code to display the sensor data both in the serial monitor and on your TFT
			display (if you have one from Workshop 02):
		</p>

		<Card.Root>
			<Card.Header class="mb-0 pb-0">
				<Card.Title>DHT-22 with Display</Card.Title>
			</Card.Header>
			<Card.Content>
				<SyntaxHighlighter language="cpp" code={data.dht22Code} />
			</Card.Content>
			<Card.Footer>
				<p class="text-xs leading-relaxed">
					This complete example reads sensor data every 2 seconds and displays it both in the serial
					monitor and on a TFT display. Make sure you have the TFT_eSPI library installed and
					configured for your display. Adjust the pin numbers to match your wiring.
				</p>
			</Card.Footer>
		</Card.Root>

		<h3 class="mt-4 text-2xl font-medium">Features</h3>
		<ul>
			<li>
				Reads temperature and humidity every 2 seconds (the minimum interval for DHT-22)
			</li>
			<li>
				Displays data in the serial monitor with formatted output
			</li>
			<li>
				Shows temperature and humidity on the TFT display with different colors for visual distinction
			</li>
			<li>
				Calculates and displays the heat index (feels-like temperature)
			</li>
			<li>
				Handles sensor read errors gracefully
			</li>
		</ul>

		<h3 class="mt-4 text-2xl font-medium">Display Layout</h3>
		<p class="text-lg font-thin text-white">
			The display shows:
		</p>
		<ul>
			<li>A title "Sensor Data" in cyan</li>
			<li>A separator line</li>
			<li>Temperature in large red text with the value and unit</li>
			<li>Humidity in large blue text with the value and unit</li>
		</ul>
		<p class="text-lg font-thin text-white">
			You can customize the display layout, colors, and add more information like the heat index or
			graphical representations of the data.
		</p>

		<h3 class="mt-4 text-2xl font-medium">Troubleshooting</h3>
		<p class="text-lg font-thin text-white">
			If you're getting "Failed to read from DHT sensor!" errors:
		</p>
		<ul>
			<li>Check your wiring connections</li>
			<li>Ensure the pull-up resistor is present (if your module doesn't have one built-in)</li>
			<li>Try a different GPIO pin</li>
			<li>Make sure you're waiting at least 2 seconds between readings</li>
			<li>Check that the sensor is getting power (3.3V or 5V depending on your module)</li>
		</ul>
	</section>
</SectionNavigator>

<Card.Root class="mt-8 bg-transparent text-white sm:w-3/4">
	<Card.Header>
		<Card.Title>Resources</Card.Title>
		<Card.Description>
			Here are some resources to help you learn more about the DHT-22 sensor and working with sensors
			in general.
		</Card.Description>
	</Card.Header>
	<Card.Content>
		<ul>
			<li>
				<a href="https://github.com/adafruit/DHT-sensor-library" target="_blank" class="link"
					>DHT Sensor Library</a
				>
				<p class="text-sm font-thin text-white">Official Adafruit DHT sensor library for Arduino.</p>
			</li>
			<li>
				<a
					href="https://learn.adafruit.com/dht/overview"
					target="_blank"
					class="link"
					>Adafruit DHT Tutorial</a
				>
				<p class="text-sm font-thin text-white">Comprehensive guide to using DHT sensors.</p>
			</li>
			<li>
				<a
					href="https://www.arduino.cc/reference/en/libraries/dht-sensor-library/"
					target="_blank"
					class="link"
					>Arduino DHT Library Reference</a
				>
				<p class="text-sm font-thin text-white">Official Arduino library documentation.</p>
			</li>
		</ul>
	</Card.Content>
</Card.Root>

<WorkshopNavigation />

