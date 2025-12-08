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

	const sht21HowItWorks = `
		<h3>Overview</h3>
		<p>This project demonstrates how to read temperature and humidity data from an AHT10 sensor using I2C communication and display it on an OLED screen. The AHT10 is a high-precision digital sensor that provides accurate measurements with factory calibration, making it ideal for environmental monitoring projects.</p>
		
		<h3>Key Concepts</h3>
		<ul>
			<li><strong>I2C Communication:</strong> The AHT10 uses the I2C (Inter-Integrated Circuit) protocol, which requires only two wires (SDA for data and SCL for clock) to communicate with the microcontroller. This makes it simpler than single-wire protocols like DHT sensors.</li>
			<li><strong>Sensor Initialization:</strong> The AHT10 sensor is initialized through the I2C bus using the Wire library. The sensor has a default I2C address (0x38) and doesn't require additional configuration.</li>
			<li><strong>Non-blocking Timing:</strong> Using <code>millis()</code> instead of <code>delay()</code> allows the microcontroller to update the display while checking for new sensor data, creating a responsive user interface.</li>
			<li><strong>Display Updates:</strong> The OLED display is updated every 2 seconds with fresh sensor readings, providing real-time environmental data visualization.</li>
		</ul>
		
		<h3>How the Sensor Reading Works</h3>
		<ol>
			<li>The code initializes the AHT10 sensor on startup using standard I2C pins (GPIO 8/9)</li>
			<li>The OLED display is initialized on the same I2C bus</li>
			<li>Every 2 seconds, the code reads temperature and humidity from the sensor</li>
			<li>The <code>readSensorData()</code> function calls <code>aht.getEvent(&humidity, &temp)</code> to get both temperature and humidity readings simultaneously</li>
			<li>Sensor readings are stored in <code>sensors_event_t</code> structures, with temperature accessed via <code>temp.temperature</code> and humidity via <code>humidity.relative_humidity</code></li>
			<li>Valid readings are stored in global variables and printed to the serial monitor</li>
			<li>The <code>displayData()</code> function updates the OLED screen with formatted sensor data</li>
			<li>The display shows temperature and humidity values for easy reading</li>
			<li>The process repeats continuously, providing real-time updates of environmental conditions</li>
		</ol>
		
		<h3>I2C Communication</h3>
		<p>Both the AHT10 sensor and OLED display communicate via I2C protocol:</p>
		<ul>
			<li><strong>SDA (Serial Data Line):</strong> Carries data between devices and microcontroller. Connect both AHT10 and OLED to GPIO 8 (standard SDA pin on ESP32).</li>
			<li><strong>SCL (Serial Clock Line):</strong> Provides the clock signal for synchronization. Connect both AHT10 and OLED to GPIO 9 (standard SCL pin on ESP32).</li>
			<li>
				<strong>I2C Addresses:</strong> Each device has a unique address:
				<ul>
					<li>AHT10 sensor: 0x38 (fixed address)</li>
					<li>OLED display: 0x3C or 0x3D (check your display's documentation)</li>
				</ul>
				The libraries handle addressing automatically. If you're not sure what addresses your devices use, use the{' '}
				<a href="/blocks/esp32-i2c-scanner" class="link">I2C Scanner block</a> to scan for all
				connected I2C devices.
			</li>
			<li><strong>Multiple Devices on One Bus:</strong> I2C supports multiple devices on the same bus because each device has a unique address. Both the sensor and display can share the same SDA and SCL lines.</li>
			<li><strong>Pull-up Resistors:</strong> I2C requires pull-up resistors (usually 4.7kΩ) on both SDA and SCL lines. Most modules include these resistors.</li>
		</ul>
		
		<h3>Display Functions</h3>
		<ul>
			<li><strong>readSensorData():</strong> Reads temperature and humidity from the AHT10 sensor via I2C using <code>getEvent(&humidity, &temp)</code>. Stores readings in global variables and prints data to serial monitor for debugging.</li>
			<li><strong>displayData():</strong> Updates the TFT display with current sensor readings. Clears the screen, displays a title, and shows temperature and humidity in different colors and sizes for visual distinction.</li>
			<li><strong>Error Handling:</strong> The code checks for sensor initialization failures using <code>begin()</code> which returns false if the sensor is not found, halting execution to prevent invalid readings.</li>
		</ul>
		
		<h3>Customization Ideas</h3>
		<ul>
			<li>Add data logging to SD card or send data to a cloud service</li>
			<li>Create graphs or charts showing temperature and humidity trends over time</li>
			<li>Add alerts when temperature or humidity exceeds certain thresholds</li>
			<li>Display additional calculated values like dew point or heat index</li>
			<li>Add WiFi connectivity to send sensor data to a remote server</li>
			<li>Create a multi-screen interface with buttons to switch between different views</li>
		</ul>
	`;

	const simpleShtHowItWorks = `
		<h3>Overview</h3>
		<p>This simple example demonstrates basic AHT10 sensor reading without any display hardware. It's perfect for testing your wiring and verifying that your sensor is working correctly before adding display functionality.</p>
		
		<h3>Key Concepts</h3>
		<ul>
			<li><strong>I2C Communication:</strong> The AHT10 uses standard I2C pins on ESP32 (GPIO 8 for SDA and GPIO 9 for SCL). The library handles I2C initialization automatically.</li>
			<li><strong>Sensor Library:</strong> The Adafruit AHT10 library provides easy-to-use functions like <code>getEvent()</code> that handle the complex I2C communication protocol and return both temperature and humidity in a single call.</li>
			<li><strong>Error Detection:</strong> The sensor library's <code>begin()</code> function returns false if the sensor is not found, allowing you to detect initialization errors.</li>
			<li><strong>Serial Output:</strong> All sensor readings are printed to the serial monitor, making it easy to debug and verify sensor functionality.</li>
		</ul>
		
		<h3>How the Reading Sequence Works</h3>
		<ol>
			<li>The code initializes serial communication for debugging output (115200 baud)</li>
			<li>The AHT10 sensor is initialized with <code>aht.begin()</code>, which returns true if successful</li>
			<li>If initialization fails, the code halts with an error message</li>
			<li>The main loop creates <code>sensors_event_t</code> structures to hold sensor readings</li>
			<li>Both temperature and humidity are read simultaneously using <code>aht.getEvent(&humidity, &temp)</code></li>
			<li>Temperature is accessed via <code>temp.temperature</code> and humidity via <code>humidity.relative_humidity</code></li>
			<li>Readings are printed to the serial monitor</li>
			<li>The code waits 500ms before taking the next reading</li>
			<li>The process repeats continuously, providing regular sensor updates</li>
		</ol>
		
		<h3>I2C Wiring</h3>
		<p>The AHT10 sensor requires four connections:</p>
		<ul>
			<li><strong>VCC:</strong> Connect to 3.3V power supply</li>
			<li><strong>GND:</strong> Connect to ground</li>
			<li><strong>SDA:</strong> Connect to GPIO 8 (standard SDA pin on ESP32)</li>
			<li><strong>SCL:</strong> Connect to GPIO 9 (standard SCL pin on ESP32)</li>
		</ul>
		<p>Most AHT10 modules include pull-up resistors on the I2C lines, so no additional components are needed.</p>
		
		<h3>Important Notes</h3>
		<ul>
			<li><strong>I2C Address:</strong> The AHT10 has a fixed I2C address of 0x38. If you have multiple I2C devices, make sure they don't conflict.</li>
			<li><strong>Power Supply:</strong> The AHT10 operates at 3.3V. Make sure your power supply is stable and provides adequate current.</li>
			<li><strong>Reading Frequency:</strong> The example code reads every 500ms, but you can adjust this delay to suit your needs. More frequent readings provide faster updates but consume more power.</li>
			<li><strong>Standard I2C Pins:</strong> On ESP32, GPIO 8 and GPIO 9 are the standard SDA and SCL pins respectively. The library uses these by default, so no pin configuration is needed.</li>
		</ul>
		
		<h3>Customization Ideas</h3>
		<ul>
			<li>Change the delay between readings to update more or less frequently</li>
			<li>Add calculations like dew point or heat index based on temperature and humidity</li>
			<li>Format the output differently or add timestamps to readings</li>
			<li>Store readings in an array to track trends over time</li>
			<li>Add conditional logic to trigger actions based on sensor values (e.g., turn on a fan if temperature is too high)</li>
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
		<h2 class="text-4xl font-medium">Simple Sensor Reading Example</h2>
		<p class="text-lg font-thin text-white">
			Before adding display functionality, let's start with a simple example that reads sensor data
			and prints it to the serial monitor. This will help you verify that your wiring is correct and
			that the sensor is working properly.
		</p>
		<p class="text-lg font-thin text-white">
			This example reads temperature and humidity every 500ms and prints the values to the serial
			monitor. You should see readings like "Temperature: 23.45 degrees C" and "Humidity: 55.67% rH"
			updating every 500ms.
		</p>

		<CodeCard
			title="Simple AHT10 Reading Code"
			code={data.simpleShtCode}
			language="cpp"
			githubLink="https://github.com/CardanoThings/Workshops/tree/main/Workshop-03/examples/simple-sht-code"
			howItWorksContent={simpleShtHowItWorks}
			footerText="Copy and paste this code into your Arduino IDE. Make sure you've installed the Adafruit AHT10 library and its dependencies (Adafruit BusIO and Adafruit Unified Sensor) and connected your sensor correctly. Connect SDA to GPIO 8 and SCL to GPIO 9 (standard I2C pins on ESP32). Upload it to your microcontroller and open the serial monitor (115200 baud) to see temperature and humidity readings updating every 500ms. If you see error messages, check your wiring and make sure the I2C pull-up resistors are present."
		/>
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
		<h2 class="text-4xl font-medium">Displaying Sensor Data on OLED Screen</h2>
		<p class="text-lg font-thin text-white">
			Now let's enhance the code to display the sensor data both in the serial monitor and on your
			OLED display (if you have one from Workshop 02). This creates a complete sensor monitoring
			system with visual feedback.
		</p>
		<p class="text-lg font-thin text-white">
			The display shows temperature and humidity values, making it easy to read at a glance. The
			data updates every 2 seconds, providing real-time environmental monitoring.
		</p>

		<CodeCard
			title="AHT10 with OLED Display Code"
			code={data.sht21Code}
			language="cpp"
			githubLink="https://github.com/CardanoThings/Workshops/tree/main/Workshop-03/examples/sht-21-code"
			howItWorksContent={sht21HowItWorks}
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
