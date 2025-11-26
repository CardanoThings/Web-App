<script>
	import { page } from '$app/state';
	import IntroContainer from '$lib/base/IntroContainer.svelte';
	import SectionNavigator from '$lib/components/SectionNavigator.svelte';
	import WorkshopNavigation from '$lib/WorkshopNavigation.svelte';
	import CodeCard from '$lib/components/CodeCard.svelte';
	import TipBox from '$lib/components/TipBox.svelte';
	import FurtherResources from '$lib/components/FurtherResources.svelte';
	import * as Card from '$lib/components/ui/card/index.js';
	import { MoveLeft } from 'lucide-svelte';
	import { Button } from '$lib/components/ui/button/index.js';
	let parentPage = $derived(page.url.pathname.split('/')[2]);
	let { data } = $props();

	const koiosHowItWorks = `
		<h3>Overview</h3>
		<p>This sketch connects to WiFi and makes HTTP requests to the Koios API to fetch blockchain data, specifically the current epoch number from the Cardano preprod testnet.</p>
		
		<h3>Key Components</h3>
		<ul>
			<li>
				<strong>Libraries:</strong> Uses <code>WiFi.h</code> for network connectivity, <code>HTTPClient.h</code> for making HTTP requests, and <code>ArduinoJson.h</code> for parsing JSON responses.
			</li>
			<li>
				<strong>Global Variables:</strong> Stores WiFi credentials, the API URL, and an <code>epochNumber</code> variable to hold the parsed epoch value.
			</li>
			<li>
				<strong>WiFi Connection:</strong> The <code>setup()</code> function initializes serial communication at 115200 baud and connects to WiFi, displaying the connection status and assigned IP address.
			</li>
			<li>
				<strong>JSON Parsing:</strong> The <code>parseJsonResponse()</code> function uses ArduinoJson to deserialize the API response. It creates a <code>JsonDocument</code>, handles parsing errors, and extracts the <code>epoch_no</code> value from the first element of the JSON array returned by Koios.
			</li>
			<li>
				<strong>Loop Function:</strong> Continuously checks WiFi connection status (reconnects if needed), calls <code>makeHttpRequest()</code>, and waits 60 seconds before the next request to avoid rate limiting.
			</li>
			<li>
				<strong>HTTP Request:</strong> The <code>makeHttpRequest()</code> function creates an HTTP client, sends a GET request to the Koios API, checks the response code (200 = success), prints the full response, parses the JSON to extract the epoch number, and displays it in the serial monitor.
			</li>
		</ul>

		<h3>Important Notes</h3>
		<ul>
			<li><strong>WiFi Credentials:</strong> Replace "Your SSID" and "Your Password" with your actual WiFi network credentials.</li>
			<li><strong>Network:</strong> The API URL points to the Koios preprod (testnet) endpoint. For mainnet, use <code>https://api.koios.rest/api/v1/tip</code></li>
			<li><strong>Rate Limiting:</strong> The code includes a 60-second delay between requests to prevent overwhelming the API. Adjust this value based on your needs.</li>
			<li><strong>JSON Structure:</strong> The Koios API returns an array with one object. The code accesses the first element <code>doc[0]</code> to get the epoch number.</li>
		</ul>
	`;
</script>

<section class="mb-8 flex flex-col gap-4 text-white">
	<a href={`/workshops/${parentPage}`} class="flex items-center gap-2">
		<MoveLeft size="20" />
		<h1 class="text-lg font-normal text-white sm:max-w-[50%]">Workshop 01: The Basics</h1>
	</a>
	<h2 class="text-6xl font-medium text-white sm:max-w-[50%]">API Setup</h2>
	<p class="text-lg font-thin text-white sm:max-w-[50%]">
		Now that you're all set up for developing with your ESP32 microcontroller, we will make the
		first call to <a href="https://koios.rest/" target="_blank" class="link">Koios</a> - a free and open
		source API on Cardano - to get the current epoch number and log it to the console of the Arduino
		IDE.
	</p>
	<div class="mt-4 sm:w-1/2">
		<IntroContainer topic="Rest APIs" link="/introductions/rest-apis" />
	</div>
</section>

<SectionNavigator>
	<section class="mb-16 flex flex-col gap-4 text-white">
		<h2 class="text-4xl font-medium">What is Koios?</h2>

		<p class="text-lg font-thin text-white">
			Koios is a free and open source API on Cardano. It is a REST API that provides a lot of
			different endpoints to fetch data from the Cardano blockchain and its testnets. You can find
			the full documentation of endpoints <a
				href="https://preprod.koios.rest/"
				target="_blank"
				class="link">here</a
			>. All data returned by the Koios API are in the JSON Format.
		</p>
		<p class="text-lg font-thin text-white">
			For this workshop we will use the
			<a href="https://preprod.koios.rest/#get-/tip" target="_blank" class="link">Chain Tip</a> endpoint
			to get the current epoch number.
		</p>
	</section>

	<section class="mb-16 flex flex-col gap-4 text-white">
		<h2 class="text-4xl font-medium">The API Endpoint</h2>
		<p class="text-lg font-thin text-white">
			If you open the <a href="https://preprod.koios.rest/api/v1/tip" target="_blank" class="link"
				>Chain Tip endpoint</a
			> in your browser, you will see a JSON response like below.
		</p>

		<TipBox title="Tip" variant="info">
			For better readability when viewing JSON in your browser, you can install the
			<a href="https://github.com/rbrahul/Awesome-JSON-Viewer" target="_blank" class="link"
				>Awesome JSON Viewer</a
			>
			browser extension. It provides syntax highlighting, tree view, and makes JSON responses much easier
			to read and navigate.
		</TipBox>

		<CodeCard title="Chain Tip Response" code={data.tip} language="json" />

		<p class="font-thin text-white">
			As you can see, the response includes the current epoch number, the absolute slot, the epoch
			slot, the block height, the block number, and the block time as well as the hash of the block.
			We will now fetch this data in our Arduino sketch and log the epoch number to the serial
			monitor.
		</p>
	</section>

	<section class="mb-16 flex flex-col gap-4 text-white">
		<h2 class="text-4xl font-medium">Fetching Data in Arduino</h2>
		<p class="text-lg font-thin text-white">
			We will use the <a
				href="https://www.arduino.cc/reference/en/libraries/https-client/"
				target="_blank"
				class="link">HTTPS Client</a
			>
			library to fetch the data from the Koios API and then parse the JSON response using the
			<a
				href="https://www.arduino.cc/reference/en/libraries/arduinojson/"
				target="_blank"
				class="link">ArduinoJSON</a
			> library.
		</p>

		<h3 class="mt-4 text-2xl font-medium">Installing ArduinoJSON Library</h3>
		<p class="text-lg font-thin text-white">
			Before you can parse JSON responses, you need to install the ArduinoJSON library in your
			Arduino IDE.
		</p>
		<ol class="ml-4 list-decimal space-y-2">
			<li>Open Arduino IDE</li>
			<li>Go to <strong>Tools → Manage Libraries</strong> (or use Ctrl+Shift+I / Cmd+Shift+I)</li>
			<li>In the Library Manager search box, type <strong>ArduinoJson</strong></li>
			<li>
				Find <strong>"ArduinoJson" by Benoit Blanchon</strong> in the list (make sure it's the one with
				millions of downloads)
			</li>
			<li>Click <strong>Install</strong></li>
			<li>Wait for the installation to complete</li>
		</ol>
		<p class="mt-4 text-lg font-thin text-white">
			The HTTPClient library comes pre-installed with the ESP32 board support package, so you don't
			need to install it separately.
		</p>
	</section>

	<section class="mb-16 flex flex-col gap-4 text-white">
		<h2 class="text-4xl font-medium">Creating the sketch</h2>
		<p class="text-lg font-thin text-white">
			To fetch the data from the Koios API, we will need to code the following steps:
		</p>
		<ol>
			<li>Connect to WiFi</li>
			<li>Make an HTTP GET request to the Koios API</li>
			<li>Parse the JSON response</li>
			<li>Log the epoch number to the serial monitor</li>
		</ol>

		<CodeCard
			title="Koios API Code"
			code={data.koiosApiCode}
			language="cpp"
			githubLink="https://github.com/CardanoThings/Workshops/tree/main/Workshop-01/examples/koios-api-code"
			howItWorksTitle="How the Koios API Code Works"
			howItWorksContent={koiosHowItWorks}
			footerText="Copy and paste the code into your Arduino IDE and upload it to your microcontroller. Make sure to select the correct board and port. You should see the microcontroller connect to your Wifi and print the API response to the serial monitor."
		/>
	</section>

	<section class="flex flex-col gap-4 text-white">
		<h2 class="text-4xl font-medium">What You'll See in the Serial Monitor</h2>
		<p class="text-lg font-thin text-white">
			After uploading the code to your ESP32 and opening the Serial Monitor (set to 115200 baud),
			you'll observe the following output:
		</p>

		<CodeCard
			title="Serial Monitor Output"
			code={`Connecting to WiFi...
Connecting to WiFi...
Connected to WiFi
IP address: 
192.168.1.XXX

HTTP Response Code: 200
Response:
[{
  "hash": "14c6413b8df915c58d9da162cf22ad58dc52834c8ce7105fe91d08e804cb5a36",
  "epoch_no": 252,
  "abs_slot": 107460097,
  "epoch_slot": 237697,
  "block_height": 4122947,
  "block_no": 4122947,
  "block_time": 1763143297
}]
Epoch number: 252`}
			language="json"
		/>

		<p class="text-lg font-thin text-white">
			The output will repeat every 60 seconds with updated blockchain data. Here's what each part
			means:
		</p>

		<ul class="ml-4 list-disc space-y-2">
			<li>
				<strong>Connecting to WiFi...</strong> - The ESP32 is attempting to connect to your WiFi network
			</li>
			<li>
				<strong>Connected to WiFi</strong> - Successfully connected to your network
			</li>
			<li>
				<strong>IP address</strong> - The local IP address assigned to your ESP32 by your router
			</li>
			<li>
				<strong>HTTP Response Code: 200</strong> - The API request was successful (200 = OK)
			</li>
			<li>
				<strong>Response</strong> - The complete JSON response from the Koios API containing current
				blockchain data
			</li>
			<li>
				<strong>Epoch number</strong> - The parsed epoch number extracted from the JSON response
			</li>
		</ul>

		<TipBox title="Troubleshooting" variant="warning">
			If you see <code>HTTP Response Code: -1</code> or connection errors, check that:
			<ul class="mt-2 ml-4 list-disc">
				<li>Your WiFi credentials are correct</li>
				<li>Your ESP32 is within range of your WiFi network</li>
				<li>Your firewall isn't blocking HTTPS requests</li>
				<li>
					The Koios API is operational (check <a
						href="https://preprod.koios.rest/"
						target="_blank"
						class="link">preprod.koios.rest</a
					>)
				</li>
			</ul>
		</TipBox>
	</section>

	<FurtherResources
		resources={[
			{
				title: 'Koios Documentation',
				url: 'https://preprod.koios.rest/',
				description: 'The full documentation of Koios endpoints.'
			},
			{
				title: 'REST API Tutorial',
				url: 'https://www.restapitutorial.com/',
				description: 'A tutorial to learn about REST APIs.'
			},
			{
				title: 'Awesome JSON Viewer',
				url: 'https://github.com/rbrahul/Awesome-JSON-Viewer',
				description:
					'A free and open source JSON viewer for viewing JSON data in a readable format in your browser.'
			},
			{
				title: 'Insomnia',
				url: 'https://insomnia.rest/',
				description: 'A free and open source API client for testing endpoints.'
			}
		]}
	/>
</SectionNavigator>

<WorkshopNavigation />
