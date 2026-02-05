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
</section>

<SectionNavigator>
	<section class="mb-16 flex flex-col gap-4 text-white">
		<h2 class="text-4xl font-medium">Hardware Requirements</h2>
		<p class="text-lg font-thin text-white">
			To complete this workshop, you will need the following hardware components:
		</p>
		<ul>
			<li>
				<strong>ESP32-C3 or ESP32 Microcontroller</strong> - The main controller for this project
			</li>
			<li>
				<strong>AHT10 Temperature and Humidity Sensor</strong> - High-precision digital sensor with I2C
				interface
			</li>
			<li>
				<strong>TFT Display</strong> (Optional) - For displaying sensor data visually (from Workshop
				02)
			</li>
			<li><strong>Breadboard</strong> - For prototyping without soldering</li>
			<li>
				<strong>Jumper Cables</strong> - For making connections (male-to-male, male-to-female)
			</li>
		</ul>
		<p class="text-lg font-thin text-white">
			<strong>Note:</strong> You can use either a breadboard with jumper cables for prototyping, or solder
			components directly for a permanent installation. We recommend starting with a breadboard for easier
			troubleshooting and modifications.
		</p>
	</section>

	<section class="mb-16 flex flex-col gap-4 text-white">
		<h2 class="text-4xl font-medium">Introduction to AHT10 Sensor</h2>
		<p class="text-lg font-thin text-white">
			The AHT10 is a high-precision digital temperature and humidity sensor from Aosong. It features
			excellent accuracy, low power consumption, and factory-calibrated measurements, making it
			superior to basic sensors like the DHT-22.
		</p>
		<p class="text-lg font-thin text-white">
			<strong>Key Features:</strong>
		</p>
		<ul>
			<li>Temperature range: -40°C to +85°C with ±0.3°C accuracy</li>
			<li>Humidity range: 0-100% RH with ±2% RH accuracy</li>
			<li>I2C interface (only requires 2 wires for data communication)</li>
			<li>3.3V operation (compatible with ESP32)</li>
			<li>Low power consumption</li>
			<li>Factory calibrated (no user calibration needed)</li>
			<li>Fast response time</li>
		</ul>
		<p class="text-lg font-thin text-white">
			The AHT10 communicates using the I2C protocol, which is simpler than single-wire protocols
			used by sensors like the DHT-22. I2C requires only two wires (SDA for data and SCL for clock)
			and supports multiple devices on the same bus. The Adafruit AHTX0 library supports both AHT10
			and AHT20 sensors.
		</p>
	</section>

	<section class="mb-16 flex flex-col gap-4 text-white">
		<h2 class="text-4xl font-medium">Connecting the Sensor</h2>
		<p class="text-lg font-thin text-white">
			<strong>Wiring the AHT10:</strong>
		</p>
		<p class="text-lg font-thin text-white">The AHT10 sensor module typically has four pins:</p>
		<ol>
			<li><strong>VCC (Power):</strong> Connect to 3.3V</li>
			<li><strong>GND (Ground):</strong> Connect to GND</li>
			<li><strong>SDA (Data):</strong> Connect to GPIO 8 (standard SDA pin on ESP32)</li>
			<li>
				<strong>SCL (Clock):</strong> Connect to GPIO 9 (standard SCL pin on ESP32)
			</li>
		</ol>
		<p class="text-lg font-thin text-white">
			<strong>Important:</strong> I2C requires pull-up resistors (usually 4.7kΩ to 10kΩ) on both SDA
			and SCL lines. Most AHT10 modules come with these resistors already built-in. If your module doesn't
			have one, you'll need to add external pull-up resistors between the data/clock pins and VCC.
		</p>
		<ESP32C3Pinout />
		<p class="text-lg font-thin text-white">
			<strong>Installing the Library:</strong>
		</p>
		<ol>
			<li>Open Arduino IDE</li>
			<li>Go to <strong>Sketch → Include Library → Manage Libraries</strong></li>
			<li>Search for "Adafruit AHT10"</li>
			<li>Install the library by Adafruit</li>
			<li>
				If prompted, install the required dependencies: Adafruit BusIO and Adafruit Unified Sensor
			</li>
		</ol>
		<TipBox title="Library Information" variant="info">
			The Adafruit AHT10 library provides easy-to-use functions for reading temperature and humidity
			from AHT10 sensors. It handles the complex I2C communication protocol and provides simple
			functions like <code>getEvent()</code> to read both temperature and humidity simultaneously.
			This library uses the standard I2C pins (GPIO 8/9 on ESP32) automatically, so no pin
			configuration is needed. More information available at
			<a href="https://github.com/adafruit/Adafruit_AHTX0" target="_blank" class="link"
				>https://github.com/adafruit/Adafruit_AHTX0</a
			>.
		</TipBox>
	</section>

	<section class="mb-16 flex flex-col gap-4 text-white">
		<h2 class="text-4xl font-medium">Basic Sensor Reading Example</h2>
		<p class="text-lg font-thin text-white">
			Before adding display functionality, let's start with a basic example that reads sensor data
			and prints it to the serial monitor. This will help you verify that your wiring is correct and
			that the sensor is working properly.
		</p>
		<p class="text-lg font-thin text-white">
			This example reads temperature and humidity every 500ms and prints the values to the serial
			monitor. You should see readings like "Temperature: 23.45 degrees C" and "Humidity: 55.67% rH"
			updating every 500ms.
		</p>

		<LiveCodeCard
			title="Basic AHT10 Reading Code"
			repo="CardanoThings/Workshops"
			branch="main"
			files={[
				{
					path: 'Workshop-03/examples/sensor-example/sensor-example.ino',
					language: 'cpp'
				}
			]}
			readmePath="Workshop-03/examples/sensor-example/README.md"
			footerText="Copy and paste this code into your Arduino IDE. Make sure you've installed the Adafruit AHT10 library and its dependencies (Adafruit BusIO and Adafruit Unified Sensor) and connected your sensor correctly. Connect SDA to GPIO 8 and SCL to GPIO 9 (standard I2C pins on ESP32). Upload it to your microcontroller and open the serial monitor (115200 baud) to see temperature and humidity readings updating every 500ms. If you see error messages, check your wiring and make sure the I2C pull-up resistors are present."
		/>

		<TipBox title="Other Temperature Sensors" variant="info">
			The AHT10 is just one of many temperature and humidity sensors available. If you have a
			different sensor, you can adapt this code with minimal changes:
			<ul class="mt-2 ml-4 list-disc">
				<li>
					<strong>SHT21/SHT31:</strong> Similar I2C sensors with different addresses (0x40 for SHT21,
					0x44 for SHT31)
				</li>
				<li>
					<strong>DHT11/DHT22:</strong> Single-wire sensors (not I2C) - require different library and
					wiring
				</li>
				<li>
					<strong>BME280:</strong> I2C sensor that also measures pressure - address 0x76 or 0x77
				</li>
				<li><strong>HTU21D:</strong> I2C sensor similar to SHT21 - address 0x40</li>
			</ul>
			<p class="mt-2">
				If you're not sure what sensor you have or what its I2C address is, use the{' '}
				<a href="/blocks/i2c-device-scanner" class="link">I2C Scanner block</a> to scan for all connected
				I2C devices. This will help you identify your sensor's address and verify your wiring is correct.
			</p>
		</TipBox>
	</section>

	<section class="mb-16 flex flex-col gap-4 text-white">
		<h2 class="text-4xl font-medium">Connecting the 1.3" OLED Display</h2>
		<p class="text-lg font-thin text-white">
			The 1.3" OLED display (SH1106 controller) also uses I2C communication, just like the AHT10
			sensor. This is great news because I2C supports multiple devices on the same bus! Both the
			AHT10 sensor and OLED display can share the same SDA and SCL lines, as long as they have
			different I2C addresses.
		</p>
		<p class="text-lg font-thin text-white">
			<strong>Wiring the 1.3" OLED Display (I2C):</strong>
		</p>
		<p class="text-lg font-thin text-white">
			The OLED display connects to the same I2C bus as the AHT10 sensor:
		</p>
		<ol>
			<li><strong>VCC (Power):</strong> Connect to 3.3V (share with AHT10 sensor)</li>
			<li><strong>GND (Ground):</strong> Connect to GND (share with AHT10 sensor)</li>
			<li><strong>SDA (Data):</strong> Connect to GPIO 8 (same SDA line as AHT10 sensor)</li>
			<li><strong>SCL (Clock):</strong> Connect to GPIO 9 (same SCL line as AHT10 sensor)</li>
		</ol>
		<TipBox title="Complete Wiring Setup" variant="info">
			<strong>Power and Ground Connections:</strong>
			<ul class="mt-2 ml-4">
				<li>
					Both the AHT10 sensor and OLED display can share the same 3.3V power supply and GND
					connections
				</li>
				<li>Connect all VCC pins together to ESP32-C3's 3.3V pin</li>
				<li>Connect all GND pins together to ESP32-C3's GND pin</li>
			</ul>
			<br />
			<strong>I2C Bus Sharing:</strong>
			<ul class="mt-2 ml-4">
				<li>
					<strong>AHT10 Sensor:</strong> Uses I2C address 0x38 on GPIO 8 (SDA) and GPIO 9 (SCL)
				</li>
				<li>
					<strong>1.3" OLED Display (SH1106):</strong> Uses I2C address 0x3C (or 0x3D) on the same GPIO
					8 (SDA) and GPIO 9 (SCL) lines
				</li>
				<li>
					<strong>Why this works:</strong> I2C supports multiple devices on the same bus because each
					device has a unique address. The microcontroller communicates with specific devices by addressing
					them individually.
				</li>
				<li>Both devices share the same two wires (SDA and SCL), making wiring very simple!</li>
			</ul>
			<br />
			<strong>I2C Addresses:</strong>
			<ul class="mt-2 ml-4">
				<li>AHT10 sensor: 0x38 (fixed address)</li>
				<li>
					1.3" OLED display (SH1106): 0x3C or 0x3D (check your display's documentation or use an I2C
					scanner)
				</li>
				<li>
					If you're not sure what addresses your devices use, check out the{' '}
					<a href="/blocks/esp32-i2c-scanner" class="link">I2C Scanner block</a> to scan for all connected
					I2C devices.
				</li>
			</ul>
		</TipBox>
	</section>

	<section class="mb-16 flex flex-col gap-4 text-white">
		<h2 class="text-4xl font-medium">Displaying Sensor Data</h2>
		<p class="text-lg font-thin text-white">
			Now let's enhance the code to display the sensor data both in the serial monitor and on your
			OLED display (if you have one from Workshop 02). This creates a complete sensor monitoring
			system with visual feedback.
		</p>
		<p class="text-lg font-thin text-white">
			The display shows temperature and humidity values, making it easy to read at a glance. The
			data updates every 2 seconds, providing real-time environmental monitoring.
		</p>

		<LiveCodeCard
			title="Display Sensor Data"
			repo="CardanoThings/Workshops"
			branch="main"
			files={[
				{
					path: 'Workshop-03/examples/display-sensor-data/display-sensor-data.ino',
					language: 'cpp'
				}
			]}
			readmePath="Workshop-03/examples/display-sensor-data/README.md"
			footerText="Copy and paste the code into your Arduino IDE. Make sure you've installed the Adafruit AHT10 library (and its dependencies: Adafruit BusIO and Adafruit Unified Sensor) and the Adafruit SH110X library (with Adafruit GFX Library dependency) for the 1.3 inch OLED display. Connect both the AHT10 sensor and OLED display to GPIO 8 (SDA) and GPIO 9 (SCL) - they share the same I2C bus. Upload it to your microcontroller and you should see sensor data updating on both the serial monitor and the OLED display every 2 seconds."
		/>

		<h3 class="mt-6 text-2xl font-medium">Display Layout</h3>
		<p class="text-lg font-thin text-white">The OLED display shows:</p>
		<ul>
			<li>Temperature label at the top in small text</li>
			<li>Temperature value in large text (size 3) with the unit (C)</li>
			<li>Humidity label and value at the bottom in small text with the unit (%)</li>
		</ul>
		<p class="text-lg font-thin text-white">
			You can customize the display layout, colors, and add more information like timestamps,
			graphs, or calculated values like dew point.
		</p>

		<h3 class="mt-6 text-2xl font-medium">Troubleshooting</h3>
		<p class="text-lg font-thin text-white">
			If you're getting "Failed to find AHT10 sensor!" errors:
		</p>
		<ul>
			<li>Check your wiring connections (VCC, GND, SDA, SCL)</li>
			<li>Ensure I2C pull-up resistors are present (usually included on the module)</li>
			<li>
				Verify the I2C pins match your wiring (GPIO 8 for SDA, GPIO 9 for SCL - standard I2C pins on
				ESP32)
			</li>
			<li>Check that the sensor is getting power (3.3V)</li>
			<li>
				Use an I2C scanner sketch to verify the sensor is detected at address 0x38. If you're not
				sure what the I2C address of your sensor is, check out the{' '}
				<a href="/blocks/esp32-i2c-scanner" class="link">I2C Scanner block</a> to scan for all connected
				I2C devices.
			</li>
			<li>Make sure no other I2C devices are conflicting on the same bus</li>
			<li>
				Verify that you've installed all required libraries: Adafruit AHT10, Adafruit BusIO, and
				Adafruit Unified Sensor
			</li>
		</ul>
	</section>

	<FurtherResources
		resources={[
			{
				title: 'Adafruit AHT10 Library',
				url: 'https://github.com/adafruit/Adafruit_AHTX0',
				description: 'Arduino library for AHT10 temperature and humidity sensor by Adafruit.'
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
