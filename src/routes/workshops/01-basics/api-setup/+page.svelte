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
		<Card.Root>
			<Card.Header>
				<Card.Title>Chain Tip Response</Card.Title>
			</Card.Header>
			<Card.Content>
				<SyntaxHighlighter language="json" code={data.tip} />
			</Card.Content>
		</Card.Root>

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

		<Card.Root class="">
			<Card.Header>
				<Card.Title>Koios API Code</Card.Title>
			</Card.Header>
			<Card.Content>
				<SyntaxHighlighter language="cpp" code={data.koiosApiCode} />
			</Card.Content>
			<Card.Footer>
				<p class="text-xs leading-relaxed">
					Copy and paste the code into your Arduino IDE and upload it to your microcontroller. Make
					sure to select the correct board and port. You should see the microcontroller connect to
					your Wifi and print the IP address to the serial monitor.
				</p>
			</Card.Footer>
		</Card.Root>
	</section>
</SectionNavigator>

<Card.Root class="mt-8 bg-transparent text-white sm:w-3/4">
	<Card.Header>
		<Card.Title>Resources</Card.Title>
		<Card.Description>
			Here are some resources that you can use to learn more about Koios and the Cardano blockchain.
		</Card.Description>
	</Card.Header>
	<Card.Content>
		<ul>
			<li>
				<a href="https://preprod.koios.rest/" target="_blank" class="link">Koios Documentation</a>
				<p class="text-sm font-thin text-white">The full documentation of Koios endpoints.</p>
			</li>
			<li>
				<a href="https://www.restapitutorial.com/" target="_blank" class="link">REST API Tutorial</a
				>
				<p class="text-sm font-thin text-white">A tutorial to learn about REST APIs.</p>
			</li>
			<li>
				<a href="https://github.com/rbrahul/Awesome-JSON-Viewer" target="_blank" class="link"
					>Awesome JSON Viewer</a
				>
				<p class="text-sm font-thin text-white">
					A free and open source JSON viewer for viewing JSON data in a readable format in your
					browser.
				</p>
			</li>
			<li>
				<a href="https://insomnia.rest/" target="_blank" class="link">Insomnia</a>
				<p class="text-sm font-thin text-white">
					A free and open source API client for testing endpoints.
				</p>
			</li>
		</ul>
	</Card.Content>
</Card.Root>

<WorkshopNavigation />
