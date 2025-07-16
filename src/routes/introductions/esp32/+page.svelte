<h1>🔌 ESP32 Microcontrollers – A Quick Overview</h1>

<h2>🧠 What is the ESP32?</h2>
<p>
	The <strong>ESP32</strong> is a powerful, low-cost microcontroller developed by
	<strong>Espressif Systems</strong>. It’s widely used in IoT (Internet of Things) and embedded
	systems due to its combination of performance, connectivity, and affordability.
</p>

<h2>⚙️ Key Features:</h2>
<ul>
	<li><strong>Dual-core Tensilica CPU</strong> (up to 240 MHz)</li>
	<li><strong>Built-in Wi-Fi and Bluetooth (BLE)</strong></li>
	<li><strong>Multiple GPIO pins</strong> for sensors, motors, LEDs, etc.</li>
	<li><strong>Analog and digital I/O</strong>, PWM, I²C, SPI, UART</li>
	<li><strong>Built-in ADC and DAC</strong> (analog to digital & digital to analog)</li>
	<li><strong>Ultra-low power mode</strong> for battery-powered projects</li>
</ul>

<h2>📦 Popular ESP32 Boards:</h2>
<ul>
	<li>ESP32 DevKit v1</li>
	<li>ESP32-WROOM & ESP32-WROVER modules</li>
	<li>TTGO T-Display / T-Beam</li>
	<li>LilyGO, D-duino, and other variants with screens or LoRa</li>
</ul>

<h2>🛠️ How to Use ESP32 with the Arduino IDE</h2>

<h3>✅ Step 1: Install the ESP32 Board Support</h3>
<ol>
	<li>Open <strong>Arduino IDE</strong></li>
	<li>Go to <strong>File > Preferences</strong></li>
	<li>
		In "Additional Boards Manager URLs", add:<br />
		<code
			>https://raw.githubusercontent.com/espressif/arduino-esp32/gh-pages/package_esp32_index.json</code
		>
	</li>
	<li>Go to <strong>Tools > Board > Boards Manager</strong></li>
	<li>
		Search for <strong>ESP32</strong> and install the <strong>esp32 by Espressif Systems</strong> package
	</li>
</ol>

<h3>🔌 Step 2: Select Your Board and Port</h3>
<ul>
	<li>
		Go to <strong>Tools > Board</strong> and choose your ESP32 model (e.g.
		<code>ESP32 Dev Module</code>)
	</li>
	<li>
		Plug in your ESP32 via USB and select the correct <strong>COM port</strong> under
		<strong>Tools > Port</strong>
	</li>
</ul>

<!-- <h3>💡 Step 3: Upload Your First Sketch</h3>
    <pre><code>void setup() {
  pinMode(2, OUTPUT); // Onboard LED is usually on pin 2
}

void loop() {
  digitalWrite(2, HIGH);
  delay(1000);
  digitalWrite(2, LOW);
  delay(1000);
}</code></pre>

    <p>Click <strong>Upload</strong>, and your ESP32 will start blinking!</p> -->

<h2>🌐 Why Use the ESP32?</h2>
<table>
	<thead>
		<tr><th>Feature</th><th>ESP32 Benefits</th></tr>
	</thead>
	<tbody>
		<tr><td>Wi-Fi & BLE</td><td>Great for IoT, home automation, sensors</td></tr>
		<tr><td>Dual-core CPU</td><td>Fast for multitasking and real-time use</td></tr>
		<tr><td>Affordable</td><td>Low cost compared to similar platforms</td></tr>
		<tr><td>Flexible</td><td>Works with Arduino, MicroPython, PlatformIO</td></tr>
	</tbody>
</table>

<h2>📚 Further Resources</h2>
<ul>
	<li>
		<a href="https://github.com/espressif/arduino-esp32" target="_blank"
			>ESP32 Arduino Core GitHub</a
		>
	</li>
	<li><a href="https://randomnerdtutorials.com" target="_blank">Random Nerd Tutorials</a></li>
	<li>
		<a href="https://docs.espressif.com/projects/esp-idf/en/latest/esp32/" target="_blank"
			>Espressif Documentation</a
		>
	</li>
	<li>
		<a href="https://docs.platformio.org/en/latest/boards/espressif32/" target="_blank"
			>PlatformIO ESP32 Guide</a
		>
	</li>
</ul>
