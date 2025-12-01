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
		<p>This project demonstrates how to read temperature and humidity data from an SHT21 sensor using I2C communication and display it on a TFT screen. The SHT21 is a high-precision digital sensor that provides accurate measurements with factory calibration, making it ideal for environmental monitoring projects.</p>
		
		<h3>Key Concepts</h3>
		<ul>
			<li><strong>I2C Communication:</strong> The SHT21 uses the I2C (Inter-Integrated Circuit) protocol, which requires only two wires (SDA for data and SCL for clock) to communicate with the microcontroller. This makes it simpler than single-wire protocols like DHT sensors.</li>
			<li><strong>Sensor Initialization:</strong> The SHT21 sensor is initialized through the I2C bus using the Wire library. The sensor has a default I2C address (0x40) and doesn't require additional configuration.</li>
			<li><strong>Non-blocking Timing:</strong> Using <code>millis()</code> instead of <code>delay()</code> allows the microcontroller to update the display while checking for new sensor data, creating a responsive user interface.</li>
			<li><strong>Display Updates:</strong> The TFT display is updated every 2 seconds with fresh sensor readings, providing real-time environmental data visualization.</li>
		</ul>
		
		<h3>How the Sensor Reading Works</h3>
		<ol>
			<li>The code initializes the I2C bus and SHT2x sensor on startup</li>
			<li>The TFT display is initialized and configured for landscape orientation</li>
			<li>Every 2 seconds, the code reads temperature and humidity from the sensor</li>
			<li>The <code>readSensorData()</code> function calls <code>sht.getTemperature()</code> and <code>sht.getHumidity()</code> to get current readings</li>
			<li>Sensor readings are validated using <code>sht.getError()</code> which returns 0 for success, non-zero for errors</li>
			<li>Valid readings are stored in global variables and printed to the serial monitor</li>
			<li>The <code>displayData()</code> function updates the TFT screen with formatted sensor data</li>
			<li>The display shows temperature in large red text and humidity in large blue text for easy reading</li>
			<li>The process repeats continuously, providing real-time updates of environmental conditions</li>
		</ol>
		
		<h3>I2C Communication</h3>
		<p>The SHT21 sensor communicates via I2C protocol:</p>
		<ul>
			<li><strong>SDA (Serial Data Line):</strong> Carries data between the sensor and microcontroller. Connect to GPIO 3.</li>
			<li><strong>SCL (Serial Clock Line):</strong> Provides the clock signal for synchronization. Connect to GPIO 4.</li>
			<li>
				<strong>I2C Address:</strong> The SHT21 has a fixed I2C address of 0x40, which the library
				handles automatically. If you're not sure what the I2C address of your sensor is, use the{' '}
				<a href="/blocks/esp32-i2c-scanner" class="link">I2C Scanner block</a> to scan for all
				connected I2C devices.
			</li>
			<li><strong>Pull-up Resistors:</strong> I2C requires pull-up resistors (usually 4.7kΩ) on both SDA and SCL lines. Most sensor modules include these resistors.</li>
		</ul>
		
		<h3>Display Functions</h3>
		<ul>
			<li><strong>readSensorData():</strong> Reads temperature and humidity from the SHT2x sensor via I2C. Validates readings using <code>getError()</code> and stores them in global variables. Prints data to serial monitor for debugging.</li>
			<li><strong>displayData():</strong> Updates the TFT display with current sensor readings. Clears the screen, displays a title, and shows temperature and humidity in different colors and sizes for visual distinction.</li>
			<li><strong>Error Handling:</strong> The code checks for sensor read failures (indicated by -999.0) and handles them gracefully without crashing the program.</li>
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
		<p>This simple example demonstrates basic SHT21 sensor reading without any display hardware. It's perfect for testing your wiring and verifying that your sensor is working correctly before adding display functionality.</p>
		
		<h3>Key Concepts</h3>
		<ul>
			<li><strong>I2C Initialization:</strong> The Wire library is initialized with <code>Wire.begin(SDA_PIN, SCL_PIN)</code>, which sets up the I2C communication on GPIO 3 (SDA) and GPIO 4 (SCL).</li>
			<li><strong>Sensor Library:</strong> The SHT2x library by RobTillaart provides easy-to-use functions like <code>getTemperature()</code> and <code>getHumidity()</code> that handle the complex I2C communication protocol.</li>
			<li><strong>Error Detection:</strong> The sensor library returns -999.0 when a read fails, allowing you to detect and handle errors gracefully.</li>
			<li><strong>Serial Output:</strong> All sensor readings are printed to the serial monitor, making it easy to debug and verify sensor functionality.</li>
		</ul>
		
		<h3>How the Reading Sequence Works</h3>
		<ol>
			<li>The code initializes serial communication for debugging output</li>
			<li>The I2C bus is initialized with <code>Wire.begin()</code></li>
			<li>The SHT2x sensor is initialized with <code>sht.begin()</code></li>
			<li>The main loop reads temperature using <code>sht.getTemperature()</code></li>
			<li>Humidity is read using <code>sht.getHumidity()</code></li>
			<li>Readings are validated using <code>sht.getError()</code> which returns 0 for success, non-zero for errors</li>
			<li>Valid readings are printed to the serial monitor with 2 decimal places</li>
			<li>The code waits 2 seconds before taking the next reading</li>
			<li>The process repeats continuously, providing regular sensor updates</li>
		</ol>
		
		<h3>I2C Wiring</h3>
		<p>The SHT21 sensor requires four connections:</p>
		<ul>
			<li><strong>VCC:</strong> Connect to 3.3V power supply</li>
			<li><strong>GND:</strong> Connect to ground</li>
			<li><strong>SDA:</strong> Connect to GPIO 3 (I2C data line)</li>
			<li><strong>SCL:</strong> Connect to GPIO 4 (I2C clock line)</li>
		</ul>
		<p>Most SHT21 modules include pull-up resistors on the I2C lines, so no additional components are needed.</p>
		
		<h3>Important Notes</h3>
		<ul>
			<li><strong>I2C Address:</strong> The SHT21 has a fixed I2C address of 0x40. If you have multiple I2C devices, make sure they don't conflict.</li>
			<li><strong>Power Supply:</strong> The SHT21 operates at 3.3V. Make sure your power supply is stable and provides adequate current.</li>
			<li><strong>Reading Frequency:</strong> While the sensor can be read more frequently, waiting 2 seconds between readings is a good practice to ensure accurate measurements and reduce power consumption.</li>
			<li><strong>Error Handling:</strong> Always check for error values (-999.0) before using sensor readings in calculations or displays.</li>
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
				<strong>SHT21 Temperature and Humidity Sensor</strong> - High-precision digital sensor with I2C
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
		<h2 class="text-4xl font-medium">Introduction to SHT21 Sensor</h2>
		<p class="text-lg font-thin text-white">
			The SHT21 is a high-precision digital temperature and humidity sensor from Sensirion. It
			features excellent accuracy, low power consumption, and factory-calibrated measurements,
			making it superior to basic sensors like the DHT-22.
		</p>
		<p class="text-lg font-thin text-white">
			<strong>Key Features:</strong>
		</p>
		<ul>
			<li>Temperature range: -40°C to +125°C with ±0.3°C accuracy</li>
			<li>Humidity range: 0-100% RH with ±2% RH accuracy</li>
			<li>I2C interface (only requires 2 wires for data communication)</li>
			<li>3.3V operation (compatible with ESP32)</li>
			<li>Low power consumption</li>
			<li>Factory calibrated (no user calibration needed)</li>
			<li>Fast response time</li>
		</ul>
		<p class="text-lg font-thin text-white">
			The SHT21 communicates using the I2C protocol, which is simpler than single-wire protocols
			used by sensors like the DHT-22. I2C requires only two wires (SDA for data and SCL for clock)
			and supports multiple devices on the same bus.
		</p>
	</section>

	<section class="mb-16 flex flex-col gap-4 text-white">
		<h2 class="text-4xl font-medium">Connecting the Sensor</h2>
		<p class="text-lg font-thin text-white">
			<strong>Wiring the SHT21:</strong>
		</p>
		<p class="text-lg font-thin text-white">The SHT21 sensor module typically has four pins:</p>
		<ol>
			<li><strong>VCC (Power):</strong> Connect to 3.3V</li>
			<li><strong>GND (Ground):</strong> Connect to GND</li>
			<li><strong>SDA (Data):</strong> Connect to GPIO 3 (I2C data line)</li>
			<li>
				<strong>SCL (Clock):</strong> Connect to GPIO 4 (I2C clock line)
			</li>
		</ol>
		<p class="text-lg font-thin text-white">
			<strong>Important:</strong> I2C requires pull-up resistors (usually 4.7kΩ to 10kΩ) on both SDA
			and SCL lines. Most SHT21 modules come with these resistors already built-in. If your module doesn't
			have one, you'll need to add external pull-up resistors between the data/clock pins and VCC.
		</p>
		<ESP32C3Pinout />
		<p class="text-lg font-thin text-white">
			<strong>Installing the Library:</strong>
		</p>
		<ol>
			<li>Open Arduino IDE</li>
			<li>Go to <strong>Sketch → Include Library → Manage Libraries</strong></li>
			<li>Search for "SHT2x"</li>
			<li>Install the library by RobTillaart</li>
		</ol>
		<TipBox title="Library Information" variant="info">
			The SHT2x library by RobTillaart provides easy-to-use functions for reading temperature and
			humidity from SHT2x series sensors (SHT20, SHT21, SHT25). It handles the complex I2C
			communication protocol and provides simple functions like <code>getTemperature()</code> and
			<code>getHumidity()</code>. This library makes it easy to integrate SHT2x sensors into your
			projects. More information available at
			<a href="https://github.com/RobTillaart/SHT2x" target="_blank" class="link"
				>https://github.com/RobTillaart/SHT2x</a
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
			This example reads temperature and humidity every 2 seconds and prints the values to the
			serial monitor. You should see readings like "Temperature: 23.45 °C" and "Humidity: 55.67 %RH"
			updating every 2 seconds.
		</p>

		<CodeCard
			title="Simple SHT21 Reading Code"
			code={data.simpleShtCode}
			language="cpp"
			githubLink="https://github.com/CardanoThings/Workshops/tree/main/Workshop-03/examples/simple-sht-code"
			howItWorksContent={simpleShtHowItWorks}
			footerText="Copy and paste this code into your Arduino IDE. Make sure you've installed the SHT2x library by RobTillaart and connected your sensor correctly. Upload it to your microcontroller and open the serial monitor (115200 baud) to see temperature and humidity readings updating every 2 seconds. If you see error messages, check your wiring and make sure the I2C pull-up resistors are present."
		/>
	</section>

	<section class="mb-16 flex flex-col gap-4 text-white">
		<h2 class="text-4xl font-medium">Connecting the TFT Display</h2>
		<p class="text-lg font-thin text-white">
			The TFT display uses SPI (Serial Peripheral Interface) communication, which is different from
			I2C. This means both the SHT21 sensor (I2C) and the TFT display (SPI) can be connected
			simultaneously to your ESP32-C3 without any conflicts, as they use different communication
			protocols and different GPIO pins.
		</p>
		<p class="text-lg font-thin text-white">
			<strong>Wiring the TFT Display (SPI):</strong>
		</p>
		<p class="text-lg font-thin text-white">
			Most TFT displays using the TFT_eSPI library require the following connections. Note that pin
			assignments may vary depending on your specific display model, so check your display's
			documentation:
		</p>
		<ol>
			<li><strong>VCC (Power):</strong> Connect to 3.3V (can share with SHT21 sensor)</li>
			<li><strong>GND (Ground):</strong> Connect to GND (can share with SHT21 sensor)</li>
			<li>
				<strong>MOSI (Master Out Slave In):</strong> Connect to GPIO 10 (or check your display's requirements)
			</li>
			<li>
				<strong>SCK (Serial Clock):</strong> Connect to GPIO 8 (or check your display's requirements)
			</li>
			<li><strong>CS (Chip Select):</strong> Connect to GPIO 7 (or any available GPIO pin)</li>
			<li><strong>DC (Data/Command):</strong> Connect to GPIO 6 (or any available GPIO pin)</li>
			<li>
				<strong>RST (Reset):</strong> Connect to GPIO 5 (or any available GPIO pin, can share with ESP32
				reset)
			</li>
		</ol>
		<TipBox title="Complete Wiring Setup" variant="info">
			<strong>Power and Ground Connections:</strong>
			<ul class="mt-2 ml-4">
				<li>
					Both the SHT21 sensor and TFT display can share the same 3.3V power supply and GND
					connections
				</li>
				<li>Connect all VCC pins together to ESP32-C3's 3.3V pin</li>
				<li>Connect all GND pins together to ESP32-C3's GND pin</li>
			</ul>
			<br />
			<strong>Communication Protocols:</strong>
			<ul class="mt-2 ml-4">
				<li><strong>SHT21 Sensor:</strong> Uses I2C on GPIO 3 (SDA) and GPIO 4 (SCL)</li>
				<li>
					<strong>TFT Display:</strong> Uses SPI on GPIO 8 (SCK), GPIO 10 (MOSI), and control pins (CS,
					DC, RST)
				</li>
				<li>These protocols are independent and don't interfere with each other</li>
			</ul>
			<br />
			<strong>Pin Configuration:</strong>
			<ul class="mt-2 ml-4">
				<li>
					Make sure to configure the TFT_eSPI library's User_Setup.h file with the correct pin
					assignments for your specific display model
				</li>
				<li>
					The pin numbers listed above are examples - always verify with your display's
					documentation
				</li>
			</ul>
		</TipBox>
	</section>

	<section class="mb-16 flex flex-col gap-4 text-white">
		<h2 class="text-4xl font-medium">Displaying Sensor Data on TFT Screen</h2>
		<p class="text-lg font-thin text-white">
			Now let's enhance the code to display the sensor data both in the serial monitor and on your
			TFT display (if you have one from Workshop 02). This creates a complete sensor monitoring
			system with visual feedback.
		</p>
		<p class="text-lg font-thin text-white">
			The display shows temperature in large red text and humidity in large blue text, making it
			easy to read at a glance. The data updates every 2 seconds, providing real-time environmental
			monitoring.
		</p>

		<CodeCard
			title="SHT21 with TFT Display Code"
			code={data.sht21Code}
			language="cpp"
			githubLink="https://github.com/CardanoThings/Workshops/tree/main/Workshop-03/examples/sht-21-code"
			howItWorksContent={sht21HowItWorks}
			footerText="Copy and paste the code into your Arduino IDE. Make sure you've installed both the SHT2x library by RobTillaart and the TFT_eSPI library. Configure the TFT_eSPI library for your specific display model. Upload it to your microcontroller and you should see sensor data updating on both the serial monitor and the TFT display every 2 seconds."
		/>

		<h3 class="mt-6 text-2xl font-medium">Display Layout</h3>
		<p class="text-lg font-thin text-white">The display shows:</p>
		<ul>
			<li>A title "Sensor Data" in cyan at the top</li>
			<li>A separator line</li>
			<li>Temperature in large red text with the value and unit (°C)</li>
			<li>Humidity in large blue text with the value and unit (%RH)</li>
		</ul>
		<p class="text-lg font-thin text-white">
			You can customize the display layout, colors, and add more information like timestamps,
			graphs, or calculated values like dew point.
		</p>

		<h3 class="mt-6 text-2xl font-medium">Troubleshooting</h3>
		<p class="text-lg font-thin text-white">
			If you're getting "Failed to read from SHT2x sensor!" errors:
		</p>
		<ul>
			<li>Check your wiring connections (VCC, GND, SDA, SCL)</li>
			<li>Ensure I2C pull-up resistors are present (usually included on the module)</li>
			<li>Verify the I2C pins match your wiring (GPIO 3 for SDA, GPIO 4 for SCL)</li>
			<li>Check that the sensor is getting power (3.3V)</li>
			<li>
				Use an I2C scanner sketch to verify the sensor is detected at address 0x40. If you're not
				sure what the I2C address of your sensor is, check out the{' '}
				<a href="/blocks/esp32-i2c-scanner" class="link">I2C Scanner block</a> to scan for all connected
				I2C devices.
			</li>
			<li>Make sure no other I2C devices are conflicting on the same bus</li>
		</ul>
	</section>

	<FurtherResources
		resources={[
			{
				title: 'SHT2x Library by RobTillaart',
				url: 'https://github.com/RobTillaart/SHT2x',
				description:
					'Arduino library for SHT2x series temperature and humidity sensors (SHT20, SHT21, SHT25).'
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
