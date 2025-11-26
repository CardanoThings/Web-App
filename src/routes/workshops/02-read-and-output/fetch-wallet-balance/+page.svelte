<script>
	import { page } from '$app/state';
	import IntroContainer from '$lib/base/IntroContainer.svelte';
	import SectionNavigator from '$lib/components/SectionNavigator.svelte';
	import WorkshopNavigation from '$lib/WorkshopNavigation.svelte';
	import SyntaxHighlighter from '$lib/components/SyntaxHighlighter.svelte';
	import FurtherResources from '$lib/components/FurtherResources.svelte';
	import * as Card from '$lib/components/ui/card/index.js';
	import { MoveLeft } from 'lucide-svelte';
	import { Button } from '$lib/components/ui/button/index.js';
	let parentPage = $derived(page.url.pathname.split('/')[2]);
	let { data } = $props();
</script>

<section class="mb-8 flex flex-col gap-4 text-white">
	<a href={`/workshops/${parentPage}`} class="flex items-center gap-2">
		<MoveLeft size="20" />
		<h1 class="text-lg font-normal text-white sm:max-w-[50%]">Workshop 02: Read and Output</h1>
	</a>
	<h2 class="text-6xl font-medium text-white sm:max-w-[50%]">Fetch your Wallet Balance</h2>
	<p class="text-lg font-thin text-white sm:max-w-[50%]">
		You will learn how to fetch your wallet balance in intervals using your Microcontroller and an API,
		output the fetched data to the Arduino console and listen for changes. We will also introduce you to
		other API endpoints and look into different APIs like Blockfrost or Maestro.
	</p>
</section>

<SectionNavigator>
	<section class="mb-16 flex flex-col gap-4 text-white">
		<h2 class="text-4xl font-medium">Introduction</h2>
		<p class="text-lg font-thin text-white">
			In this step, we will build upon what you learned in Workshop 01. Instead of just fetching the
			epoch number, we will now fetch your wallet balance from the Cardano blockchain. This will allow
			you to monitor your wallet and react to changes, such as when you receive a transaction.
		</p>
		<p class="text-lg font-thin text-white">
			We'll use the Koios API endpoint for address information, which allows us to query wallet balances
			and other address-related data. We'll also explore alternative APIs like Blockfrost and Maestro
			that offer similar functionality.
		</p>
	</section>

	<section class="mb-16 flex flex-col gap-4 text-white">
		<h2 class="text-4xl font-medium">Setting up the API</h2>
		<p class="text-lg font-thin text-white">
			To fetch wallet balance, we'll use the Koios API endpoint
			<a href="https://preprod.koios.rest/#post-/address_info" target="_blank" class="link"
				>/address_info</a
			>. This endpoint requires a POST request with your wallet address in the request body.
		</p>
		<p class="text-lg font-thin text-white">
			First, you'll need to get your wallet address from Yoroi:
		</p>
		<ol>
			<li>Open your Yoroi wallet extension</li>
			<li>Make sure you're on the Preprod Testnet (orange banner at the top)</li>
			<li>Go to the "Receive" tab</li>
			<li>Copy your receive address (it starts with "addr_test1...")</li>
		</ol>
		<p class="text-lg font-thin text-white">
			You can test the API endpoint directly in your browser or using a tool like
			<a href="https://insomnia.rest/" target="_blank" class="link">Insomnia</a> or
			<a href="https://www.postman.com/" target="_blank" class="link">Postman</a>. The endpoint expects
			a JSON payload like this:
		</p>
		<Card.Root>
			<Card.Header>
				<Card.Title>API Request Example</Card.Title>
			</Card.Header>
			<Card.Content>
				<SyntaxHighlighter
					language="json"
					code={`{
  "_addresses": [
    "addr_test1q..."
  ]
}`}
				/>
			</Card.Content>
		</Card.Root>
	</section>

	<section class="mb-16 flex flex-col gap-4 text-white">
		<h2 class="text-4xl font-medium">Fetching the Balance</h2>
		<p class="text-lg font-thin text-white">
			Now let's create an Arduino sketch that fetches your wallet balance. The code will:
		</p>
		<ol>
			<li>Connect to WiFi</li>
			<li>Make a POST request to the Koios API with your wallet address</li>
			<li>Parse the JSON response to extract the balance</li>
			<li>Display the balance in the serial monitor</li>
		</ol>

		<Card.Root>
			<Card.Header class="mb-0 pb-0">
				<Card.Title>Wallet Balance Code</Card.Title>
			</Card.Header>
			<Card.Content>
				<SyntaxHighlighter language="cpp" code={data.walletBalanceCode} />
			</Card.Content>
			<Card.Footer>
				<p class="text-xs leading-relaxed">
					Copy and paste the code into your Arduino IDE. Make sure to replace "Your SSID" and "Your
					Password" with your WiFi credentials, and replace "addr_test1..." with your actual wallet
					address. Upload it to your microcontroller and open the serial monitor to see your balance.
				</p>
			</Card.Footer>
		</Card.Root>

		<h3 class="mt-4 text-2xl font-medium">How it works</h3>
		<ul>
			<li>
				The <i>setup</i> function initializes the serial communication and connects to WiFi, then makes
				an initial balance check.
			</li>
			<li>
				The <i>loop</i> function checks the WiFi connection and calls <i>fetchWalletBalance</i> every
				30 seconds.
			</li>
			<li>
				The <i>fetchWalletBalance</i> function makes a POST request to the Koios API with your wallet
				address in JSON format.
			</li>
			<li>
				The response is parsed using ArduinoJSON, and the balance is extracted and converted from
				Lovelace (the smallest unit) to ADA by dividing by 1,000,000.
			</li>
			<li>The balance is printed to the serial monitor.</li>
		</ul>
	</section>

	<section class="mb-16 flex flex-col gap-4 text-white">
		<h2 class="text-4xl font-medium">Listening for Changes</h2>
		<p class="text-lg font-thin text-white">
			The code above already includes logic to detect balance changes. It stores the previous balance
			and compares it with the current balance. When a change is detected, it prints a message to the
			serial monitor.
		</p>
		<p class="text-lg font-thin text-white">
			You can extend this functionality to trigger actions when your balance changes, such as:
		</p>
		<ul>
			<li>Turning on an LED when you receive funds</li>
			<li>Playing a sound or buzzer</li>
			<li>Updating a display (which we'll cover in the next step)</li>
			<li>Controlling external hardware like relays (covered in step 3)</li>
		</ul>
	</section>

	<section class="mb-16 flex flex-col gap-4 text-white">
		<h2 class="text-4xl font-medium">Alternative APIs</h2>
		<p class="text-lg font-thin text-white">
			While Koios is free and open source, there are other APIs you can use to fetch wallet data:
		</p>

		<h3 class="mt-4 text-2xl font-medium">Blockfrost</h3>
		<p class="text-lg font-thin text-white">
			<a href="https://blockfrost.io/" target="_blank" class="link">Blockfrost</a> is a popular Cardano
			API that offers both free and paid tiers. It uses a simpler GET request format and requires an API
			key. Here's an example:
		</p>
		<Card.Root>
			<Card.Header class="mb-0 pb-0">
				<Card.Title>Blockfrost Example</Card.Title>
			</Card.Header>
			<Card.Content>
				<SyntaxHighlighter language="cpp" code={data.blockfrostCode} />
			</Card.Content>
			<Card.Footer>
				<p class="text-xs leading-relaxed">
					To use Blockfrost, you'll need to sign up at blockfrost.io and get an API key. The free tier
					has rate limits but is sufficient for most projects.
				</p>
			</Card.Footer>
		</Card.Root>

		<h3 class="mt-4 text-2xl font-medium">Maestro</h3>
		<p class="text-lg font-thin text-white">
			<a href="https://www.gomaestro.org/" target="_blank" class="link">Maestro</a> is another Cardano
			API provider with a free tier. It offers similar functionality to Blockfrost and Koios, with
			different rate limits and features.
		</p>
		<p class="text-lg font-thin text-white">
			Each API has its own advantages:
		</p>
		<ul>
			<li><strong>Koios:</strong> Free, open source, no API key required</li>
			<li><strong>Blockfrost:</strong> Well-documented, reliable, requires API key</li>
			<li><strong>Maestro:</strong> Good free tier, requires API key</li>
		</ul>
	</section>

	<FurtherResources
		resources={[
			{
				title: 'Koios Documentation',
				url: 'https://preprod.koios.rest/',
				description: 'Full documentation of Koios API endpoints.'
			},
			{
				title: 'Blockfrost',
				url: 'https://blockfrost.io/',
				description: 'Alternative Cardano API with free tier.'
			},
			{
				title: 'Maestro',
				url: 'https://www.gomaestro.org/',
				description: 'Another Cardano API provider.'
			},
			{
				title: 'ArduinoJSON Library',
				url: 'https://docs.arduino.cc/learn/programming/arduino-json-library',
				description: 'Learn more about parsing JSON in Arduino.'
			}
		]}
	/>
</SectionNavigator>

<WorkshopNavigation />

