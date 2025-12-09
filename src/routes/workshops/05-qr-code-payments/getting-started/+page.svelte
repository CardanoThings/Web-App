<script>
	import { page } from '$app/state';
	import SectionNavigator from '$lib/components/SectionNavigator.svelte';
	import WorkshopNavigation from '$lib/WorkshopNavigation.svelte';
	import LiveCodeCard from '$lib/components/LiveCodeCard.svelte';
	import TipBox from '$lib/components/TipBox.svelte';
	import FurtherResources from '$lib/components/FurtherResources.svelte';
	import { MoveLeft } from 'lucide-svelte';
	let parentPage = $derived(page.url.pathname.split('/')[2]);
	let { data } = $props();
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
		<h2 class="text-4xl font-medium">What We're Building</h2>
		<p class="text-lg font-thin text-white">
			In this workshop you'll build a simple QR code payment interface and web server that allows
			users to pay with ADA to a given address using the TFT display of your microcontroller. The
			flow will be as follows:
		</p>
		<ol class="list-inside space-y-2">
			<li>Create a payment request via a website running directly on your microcontroller</li>
			<li>
				Once the payment request is created, the Microcontroller will display a QR code on the TFT
				display that can be scanned by a mobile wallet like Yoroi
			</li>
			<li>The user will sign and send the transaction from their mobile wallet</li>
			<li>
				The Microcontroller will check the Koios API and wait for the payment to be confirmed on
				chain
			</li>
			<li>
				Once the payment is confirmed, the Microcontroller will display a confirmation message on
				the TFT display and update the backend database
			</li>
		</ol>
		<p class="text-lg font-thin text-white">
			We will use the already known Koios API to check for payments and update the data on the
			microcontroller, look briefly into the CIP-13 standard for payment URIs and create QR codes
			that can be scanned by most mobile wallet of the Cardano ecosystem.
		</p>
	</section>

	<section class="mb-16 flex flex-col gap-4 text-white">
		<h2 class="text-4xl font-medium">Project Structure</h2>
		<p class="text-lg font-thin text-white">
			Understanding the project structure is important for organizing your webserver code. The basic
			webserver example follows this structure:
		</p>

		<div class="rounded-lg bg-gray-800/50 p-4 font-mono text-sm">
			<pre class="text-white">basic-webserver/
├── basic-webserver.ino    # Main Arduino sketch
├── web_server.h            # Web server header file
├── web_server.cpp          # Web server implementation
├── wifi_manager.h          # WiFi manager header file
├── wifi_manager.cpp        # WiFi manager implementation
├── secrets.h               # WiFi credentials (not in git)
├── secrets.h.example       # Example secrets file
└── data/                   # Files to be served by the webserver
    └── index.html          # HTML file served at root path</pre>
		</div>

		<h3 class="mt-8 mb-4 text-2xl font-medium">The Data Directory</h3>
		<p class="text-lg font-thin text-white">
			The <code class="rounded bg-gray-800 px-2 py-1 text-white">data</code> directory contains all the
			files that will be served by your webserver. These files are stored on the ESP32's flash memory
			using LittleFS (Little File System).
		</p>
		<p class="text-lg font-thin text-white">
			When a client requests a file (like <code class="rounded bg-gray-800 px-2 py-1 text-white"
				>/index.html</code
			>), the webserver reads it from LittleFS and sends it to the client. You can place HTML, CSS,
			JavaScript, images, and other static files in this directory.
		</p>

		<h3 class="mt-8 mb-4 text-2xl font-medium">LittleFS (Little File System)</h3>
		<p class="text-lg font-thin text-white">
			LittleFS is a lightweight filesystem designed for embedded systems like the ESP32. It allows
			you to store files directly on the microcontroller's flash memory, which can then be served by
			the webserver.
		</p>
		<p class="text-lg font-thin text-white">
			In the webserver code, you can see LittleFS being initialized in <code
				class="rounded bg-gray-800 px-2 py-1 text-white">webServerSetup()</code
			>:
		</p>

		<div class="rounded-lg bg-gray-800/50 p-4 font-mono text-sm">
			<pre class="text-white">{`if (!LittleFS.begin(true)) {
  Serial.println("ERROR: LittleFS Mount Failed");
  return;
}`}</pre>
		</div>

		<p class="text-lg font-thin text-white">
			The <code class="rounded bg-gray-800 px-2 py-1 text-white">begin(true)</code> parameter formats
			the filesystem if it doesn't exist, which is useful for first-time setup.
		</p>

		<TipBox title="File Paths in LittleFS" variant="success">
			Files in the <code class="rounded bg-gray-800 px-2 py-1 text-white">data</code> directory are
			accessible at the root path. For example:
			<ul class="mt-2 list-inside list-disc space-y-1">
				<li>
					<code class="rounded bg-gray-800 px-2 py-1 text-white">data/index.html</code> → accessible
					at <code class="rounded bg-gray-800 px-2 py-1 text-white">http://[IP]/index.html</code> or
					<code class="rounded bg-gray-800 px-2 py-1 text-white">http://[IP]/</code>
				</li>
				<li>
					<code class="rounded bg-gray-800 px-2 py-1 text-white">data/style.css</code> → accessible
					at <code class="rounded bg-gray-800 px-2 py-1 text-white">http://[IP]/style.css</code>
				</li>
				<li>
					<code class="rounded bg-gray-800 px-2 py-1 text-white">data/app.js</code> → accessible at
					<code class="rounded bg-gray-800 px-2 py-1 text-white">http://[IP]/app.js</code>
				</li>
			</ul>
		</TipBox>
	</section>

	<section class="mb-16 flex flex-col gap-4 text-white">
		<h2 class="text-4xl font-medium">Creating the Webserver</h2>
		<p class="text-lg font-thin text-white">
			As always, we will start with the basics and connect your microcontroller to WiFi, you already
			know most of the code, but let's review it quickly.
		</p>

		<LiveCodeCard
			title="Basic Setup"
			repo="CardanoThings/Workshops"
			branch="main"
			files={[
				{
					path: 'Workshop-05/examples/basic-webserver/basic-webserver.ino',
					language: 'cpp'
				},
				{
					path: 'Workshop-05/examples/basic-webserver/wifi_manager.cpp',
					language: 'cpp',
					filename: 'wifi_manager.cpp'
				},
				{
					path: 'Workshop-05/examples/basic-webserver/wifi_manager.h',
					language: 'cpp',
					filename: 'wifi_manager.h'
				}
			]}
			readmePath="Workshop-05/examples/basic-webserver/README.md"
		/>

		<p class="text-lg font-thin text-white">
			Now let's dive into the webserver implementation files to understand how it works. The
			webserver uses the ESP32's built-in <code class="rounded bg-gray-800 px-2 py-1 text-white"
				>WebServer</code
			> library to handle HTTP requests and serve files from LittleFS.
		</p>
		<p class="text-lg font-thin text-white">Here's how it works:</p>
		<ul class="list-inside space-y-2 text-lg font-thin text-white">
			<li>
				<strong>Server Initialization:</strong> The webserver is created on port 80 (standard HTTP port)
				and listens for incoming client requests.
			</li>
			<li>
				<strong>File Serving:</strong> When a client requests a file (like
				<code class="rounded bg-gray-800 px-2 py-1 text-white">/index.html</code>), the server
				checks if the file exists in LittleFS. If it exists, the file is streamed to the client with
				the appropriate content type.
			</li>
			<li>
				<strong>Request Handling:</strong> The
				<code class="rounded bg-gray-800 px-2 py-1 text-white">onNotFound()</code> handler catches all
				requests and routes them to the file handler. This means any path requested will try to find
				a matching file in LittleFS.
			</li>
			<li>
				<strong>Fallback Behavior:</strong> If a requested file doesn't exist, the server falls back
				to serving <code class="rounded bg-gray-800 px-2 py-1 text-white">index.html</code> (if available),
				or returns a 404 error.
			</li>
			<li>
				<strong>Continuous Processing:</strong> The
				<code class="rounded bg-gray-800 px-2 py-1 text-white">webServerLoop()</code>
				function must be called regularly in your main
				<code class="rounded bg-gray-800 px-2 py-1 text-white">loop()</code> to process incoming requests.
				This is non-blocking, so your code can continue doing other tasks.
			</li>
		</ul>

		<LiveCodeCard
			title="Webserver Implementation"
			repo="CardanoThings/Workshops"
			branch="main"
			files={[
				{
					path: 'Workshop-05/examples/basic-webserver/web_server.cpp',
					language: 'cpp',
					filename: 'web_server.cpp'
				},
				{
					path: 'Workshop-05/examples/basic-webserver/web_server.h',
					language: 'cpp',
					filename: 'web_server.h'
				}
			]}
			readmePath="Workshop-05/examples/basic-webserver/web_server.md"
		/>
	</section>

	<section class="mb-16 flex flex-col gap-4 text-white">
		<h2 class="text-4xl font-medium">Creating the Web Content</h2>
		<p class="text-lg font-thin text-white">
			Now that we have the webserver set up, we need to create the HTML content that will be served
			to users. The webserver serves files from the <code
				class="rounded bg-gray-800 px-2 py-1 text-white">data</code
			> directory, which is stored in LittleFS on the ESP32.
		</p>
		<p class="text-lg font-thin text-white">
			The <code class="rounded bg-gray-800 px-2 py-1 text-white">index.html</code> file is the main entry
			point for your web interface. When users visit your ESP32's IP address, they'll see this page.
			You can create a simple HTML file to start with, and later add CSS and JavaScript files as needed.
		</p>

		<LiveCodeCard
			title="index.html"
			repo="CardanoThings/Workshops"
			branch="main"
			files={[
				{
					path: 'Workshop-05/examples/basic-webserver/data/index.html',
					language: 'html',
					filename: 'index.html'
				}
			]}
		/>

		<p class="text-lg font-thin text-white">
			This is a simple HTML file that demonstrates the basic structure. Once you upload this file to
			LittleFS (using Arduino IDE's "ESP32 Sketch Data Upload" tool), it will be accessible at
			<code class="rounded bg-gray-800 px-2 py-1 text-white">http://[ESP32_IP_ADDRESS]/</code> or
			<code class="rounded bg-gray-800 px-2 py-1 text-white"
				>http://[ESP32_IP_ADDRESS]/index.html</code
			>.
		</p>
		<p class="text-lg font-thin text-white">
			You can extend this HTML file with additional features like forms, JavaScript for
			interactivity, and CSS for styling. Any additional files (CSS, JavaScript, images) should also
			be placed in the
			<code class="rounded bg-gray-800 px-2 py-1 text-white">data</code> directory and will be served
			by the webserver.
		</p>
	</section>

	<section class="mb-16 flex flex-col gap-4 text-white">
		<h2 class="text-4xl font-medium">Uploading Files to LittleFS</h2>
		<p class="text-lg font-thin text-white">
			After creating your HTML, CSS, and JavaScript files in the <code
				class="rounded bg-gray-800 px-2 py-1 text-white">data</code
			> directory, you need to upload them to the ESP32's LittleFS filesystem. This requires a special
			tool since regular sketch uploads don't include the data directory.
		</p>

		<h3 class="mt-8 mb-4 text-2xl font-medium">LittleFS Upload Tool</h3>
		<p class="text-lg font-thin text-white">
			The LittleFS Upload Tool is a plugin for Arduino IDE that allows you to upload files from the
			<code class="rounded bg-gray-800 px-2 py-1 text-white">data</code> directory to your ESP32's LittleFS
			filesystem.
		</p>
		<p class="text-lg font-thin text-white">
			<strong>GitHub:</strong>{' '}
			<a
				href="https://github.com/earlephilhower/arduino-littlefs-upload"
				target="_blank"
				rel="noopener noreferrer"
				class="link">https://github.com/earlephilhower/arduino-littlefs-upload</a
			>
		</p>

		<h4 class="mt-6 mb-3 text-xl font-medium">Installation</h4>
		<ol class="list-inside list-decimal space-y-2 text-lg font-thin text-white">
			<li>
				Download the VSIX file from the{' '}
				<a
					href="https://github.com/earlephilhower/arduino-littlefs-upload/releases"
					target="_blank"
					rel="noopener noreferrer"
					class="link">releases page</a
				>
			</li>
			<li>
				Copy the VSIX file to:
				<ul class="mt-2 ml-6 list-disc space-y-1">
					<li>
						<strong>Mac/Linux:</strong>
						<code class="rounded bg-gray-800 px-2 py-1 text-white">~/.arduinoIDE/plugins/</code>
					</li>
					<li>
						<strong>Windows:</strong>
						<code class="rounded bg-gray-800 px-2 py-1 text-white"
							>C:\Users\&lt;username&gt;\.arduinoIDE\plugins\</code
						>
					</li>
				</ul>
			</li>
			<li>Restart Arduino IDE</li>
		</ol>

		<h4 class="mt-6 mb-3 text-xl font-medium">Usage</h4>
		<p class="text-lg font-thin text-white">
			Once installed, you can upload files to LittleFS using the Command Palette:
		</p>
		<ul class="list-inside list-disc space-y-2 text-lg font-thin text-white">
			<li>
				<strong>On Windows/Linux:</strong> Press
				<code class="rounded bg-gray-800 px-2 py-1 text-white">[Ctrl] + [Shift] + [P]</code> to open
				the Command Palette
			</li>
			<li>
				<strong>On macOS:</strong> Press
				<code class="rounded bg-gray-800 px-2 py-1 text-white">[⌘] + [Shift] + [P]</code> to open the
				Command Palette
			</li>
			<li>
				Type and select: <strong>"Upload LittleFS to Pico/ESP8266/ESP32"</strong>
			</li>
		</ul>
		<p class="text-lg font-thin text-white">
			The files from the <code class="rounded bg-gray-800 px-2 py-1 text-white">data/</code> directory
			will be uploaded to the ESP32's LittleFS filesystem.
		</p>

		<TipBox title="Important Notes" variant="info">
			<ul class="mt-2 list-inside list-disc space-y-1">
				<li>
					Make sure your ESP32 is connected and the correct port is selected in Arduino IDE before
					uploading
				</li>
				<li>
					The upload process will erase any existing files in LittleFS and replace them with files
					from your <code class="rounded bg-gray-800 px-2 py-1 text-white">data</code> directory
				</li>
				<li>You need to upload files to LittleFS separately from uploading your sketch code</li>
				<li>After uploading, restart your ESP32 or wait a moment for the filesystem to be ready</li>
			</ul>
		</TipBox>
	</section>

	<section class="mb-16 flex flex-col gap-4 text-white">
		<h2 class="text-4xl font-medium">Testing the Webserver</h2>
		<p class="text-lg font-thin text-white">
			Now that you have all the code and files ready, it's time to test your webserver. Follow these
			steps to get everything running:
		</p>

		<h3 class="mt-8 mb-4 text-2xl font-medium">Step 1: Upload the Sketch</h3>
		<ol class="list-inside list-decimal space-y-2 text-lg font-thin text-white">
			<li>
				Open the <code class="rounded bg-gray-800 px-2 py-1 text-white">basic-webserver.ino</code> file
				in Arduino IDE
			</li>
			<li>
				Make sure you have created <code class="rounded bg-gray-800 px-2 py-1 text-white"
					>secrets.h</code
				>
				from <code class="rounded bg-gray-800 px-2 py-1 text-white">secrets.h.example</code> and added
				your WiFi credentials
			</li>
			<li>
				Select your ESP32 board and port from the <strong>Tools</strong> menu
			</li>
			<li>
				Click the <strong>Upload</strong> button (or press
				<code class="rounded bg-gray-800 px-2 py-1 text-white">Ctrl+U</code>
				/ <code class="rounded bg-gray-800 px-2 py-1 text-white">⌘+U</code>) to upload the sketch to
				your microcontroller
			</li>
			<li>
				Wait for the upload to complete and check the Serial Monitor (115200 baud) to see the WiFi
				connection status
			</li>
		</ol>

		<h3 class="mt-8 mb-4 text-2xl font-medium">Step 2: Upload Files to LittleFS</h3>
		<ol class="list-inside list-decimal space-y-2 text-lg font-thin text-white">
			<li>Make sure your ESP32 is still connected</li>
			<li>
				Open the Command Palette (<code class="rounded bg-gray-800 px-2 py-1 text-white"
					>[Ctrl] + [Shift] + [P]</code
				>
				on Windows/Linux,
				<code class="rounded bg-gray-800 px-2 py-1 text-white">[⌘] + [Shift] + [P]</code> on macOS)
			</li>
			<li>
				Select <strong>"Upload LittleFS to Pico/ESP8266/ESP32"</strong>
			</li>
			<li>Wait for the upload to complete</li>
		</ol>

		<h3 class="mt-8 mb-4 text-2xl font-medium">Step 3: Find Your ESP32's IP Address</h3>
		<p class="text-lg font-thin text-white">
			After the sketch uploads and connects to WiFi, check the Serial Monitor. You should see a
			message like:
		</p>
		<div class="rounded-lg bg-gray-800/50 p-4 font-mono text-sm">
			<pre class="text-white">Web server started on http://192.168.1.100</pre>
		</div>
		<p class="text-lg font-thin text-white">
			Note down the IP address shown in this message - you'll need it to access your webserver.
		</p>

		<h3 class="mt-8 mb-4 text-2xl font-medium">Step 4: Visit the Website</h3>
		<ol class="list-inside list-decimal space-y-2 text-lg font-thin text-white">
			<li>Open a web browser on any device connected to the same WiFi network as your ESP32</li>
			<li>
				Navigate to <code class="rounded bg-gray-800 px-2 py-1 text-white"
					>http://[ESP32_IP_ADDRESS]</code
				>
				(replace <code class="rounded bg-gray-800 px-2 py-1 text-white">[ESP32_IP_ADDRESS]</code> with
				the IP address from Step 3)
			</li>
			<li>
				You should see the "Hello World!" page from your <code
					class="rounded bg-gray-800 px-2 py-1 text-white">index.html</code
				> file
			</li>
		</ol>

		<TipBox title="Troubleshooting" variant="info">
			<ul class="mt-2 list-inside list-disc space-y-1">
				<li>
					<strong>Can't connect to WiFi:</strong> Check your
					<code class="rounded bg-gray-800 px-2 py-1 text-white">secrets.h</code> file and ensure your
					WiFi credentials are correct
				</li>
				<li>
					<strong>Can't access the website:</strong> Make sure your device is on the same WiFi network
					as the ESP32
				</li>
				<li>
					<strong>404 error or blank page:</strong> Make sure you uploaded the files to LittleFS after
					uploading the sketch
				</li>
				<li>
					<strong>IP address not showing:</strong> Check the Serial Monitor for error messages and ensure
					WiFi connection was successful
				</li>
			</ul>
		</TipBox>
	</section>

	<FurtherResources
		resources={[
			{
				title: 'Arduino LittleFS Upload',
				url: 'https://github.com/earlephilhower/arduino-littlefs-upload',
				description:
					'Build and upload LittleFS filesystems for Arduino-Pico RP2040, RP2350, ESP8266, and ESP32 cores under Arduino IDE 2.2.1 or higher.'
			}
		]}
	/>
</SectionNavigator>

<WorkshopNavigation />
