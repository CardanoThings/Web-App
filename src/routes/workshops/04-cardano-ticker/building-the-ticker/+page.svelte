<script>
	import { page } from '$app/state';
	import SectionNavigator from '$lib/components/SectionNavigator.svelte';
	import WorkshopNavigation from '$lib/WorkshopNavigation.svelte';
	import CodeCard from '$lib/components/CodeCard.svelte';
	import TipBox from '$lib/components/TipBox.svelte';
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
		<h2 class="text-4xl font-medium">Setting Things Up</h2>
		<p class="text-lg font-thin text-white">
			Goods news: If you completed the former workshops, you already have the basic knowledge and
			building blocks to build your own Ticker: Connect your microcontroler to Wifi, fetch data and
			display it on your TFT display.
		</p>
		<p class="text-lg font-thin text-white">
			We will start with the code example you have already learned about in <a
				href="/workshops/02-read-and-output/display-data"
				target="_blank"
				class="link">Workshop 02</a
			> and build on this example to fetch the token & NFT prices and the focus on displaying them neatly
			on your TFT display.
		</p>
		<p class="text-lg font-thin text-white">
			Revisit the code example to make sure you understand it before we continue.
		</p>
	</section>

	<section class="mb-16 flex flex-col gap-4 text-white">
		<h2 class="text-4xl font-medium">Fetch All Ticker Data</h2>
		<p class="text-lg font-thin text-white">
			Now let's create an Arduino sketch that fetches all the data we need for our ticker. The code
			will:
		</p>
		<ol class="list-inside list-decimal space-y-2">
			<li>Set up all necessary variables (stake address, wallet address, API keys)</li>
			<li>Connect to WiFi</li>
			<li>Fetch wallet balance from Koios using your stake address</li>
			<li>Fetch wallet assets and NFT positions from MinSwap</li>
			<li>Fetch NFT collection information from Cexplorer.io</li>
			<li>Log all the fetched data to the serial console</li>
		</ol>
		<p class="text-lg font-thin text-white">
			For now, the data will be fetched only once when the microcontroller starts. Later, we'll add
			code to fetch the data in intervals to keep it up to date.
		</p>

		<TipBox title="Example Addresses" variant="info">
			The code example uses example addresses from the
			<a
				href="https://pool.pm/stake1u8l0y82je0t2wkkpps97rv0q7lf882q0fc24gwjz9nacz0c5gt5k3"
				target="_blank"
				class="link">CardanoThings.io</a
			> wallet for demonstration purposes. This is a mainnet wallet and contains some tokens and NFTs.
			Feel free to use your own addresses when you use this code.
		</TipBox>

		<CodeCard
			title="Fetch All Ticker Data"
			code={data.fetchAllDataCode}
			language="cpp"
			githubLink="https://github.com/CardanoThings/Workshops/tree/main/Workshop-04/examples/arduino-fetch-code"
			footerText="Copy and paste the code into your Arduino IDE. Make sure to replace 'Your SSID' and 'Your Password' with your WiFi credentials, replace 'stake_test1...' with your actual stake address, replace 'addr_test1...' with your wallet address, and replace 'your-api-key-here' with your Cexplorer.io API key. Upload it to your microcontroller and open the serial monitor to see all the fetched data."
			howItWorksContent={`
				<h3>Overview</h3>
				<p>This code example demonstrates how to fetch all the data needed for a Cardano ticker by making API calls to three different services: Koios (for wallet balance), MinSwap (for token and NFT positions), and Cexplorer.io (for NFT collection information).</p>
				
				<h3>Step-by-Step Breakdown</h3>
				
				<h4>Step 1: Setting Up Variables</h4>
				<ul>
					<li><strong>WiFi Credentials:</strong> Your network SSID and password for connecting to the internet</li>
					<li><strong>Cardano Addresses:</strong> Your stake address (for balance) and wallet address (for tokens/NFTs)</li>
					<li><strong>API Key:</strong> Your Cexplorer.io API key (required for their API)</li>
					<li><strong>API URLs:</strong> The endpoints for each service we'll be calling</li>
				</ul>
				
				<h4>Step 2: Connecting to WiFi</h4>
				<ul>
					<li>The <strong>connectToWiFi()</strong> function initializes the WiFi connection using your credentials</li>
					<li>It waits until the connection is established (checking every second)</li>
					<li>Once connected, it prints the IP address assigned to your microcontroller</li>
					<li>This is essential because all API calls require an internet connection</li>
				</ul>
				
				<h4>Step 3: Fetching Wallet Balance from Koios</h4>
				<ul>
					<li>The <strong>fetchWalletBalance()</strong> function makes a POST request to the Koios API</li>
					<li>It sends your stake address in a JSON payload: <code>{"_stake_addresses": ["your_stake_address"]}</code></li>
					<li>Koios returns the balance as a string in Lovelace (the smallest unit of ADA)</li>
					<li>The code converts Lovelace to ADA by dividing by 1,000,000 (1 ADA = 1,000,000 Lovelace)</li>
					<li>The balance is stored in the <code>walletBalance</code> variable and printed to the console</li>
				</ul>
				
				<h4>Step 4: Fetching Tokens and NFTs from MinSwap</h4>
				<ul>
					<li>The <strong>fetchMinSwapData()</strong> function makes a GET request to the MinSwap API</li>
					<li>It appends your wallet address as a query parameter: <code>?address=YOUR_ADDRESS&only_minswap=true&filter_small_value=false</code></li>
					<li>The API returns a JSON object with "positions" containing "nft_positions" and "asset_positions" arrays</li>
					<li>The code extracts:
						<ul>
							<li>NFT count and currency symbols</li>
							<li>Token information (ticker, name, price in USD, amount, 24h change percentage)</li>
						</ul>
					</li>
					<li>All found tokens and NFTs are logged to the serial console</li>
				</ul>
				
				<h4>Step 5: Fetching NFT Info from Cexplorer</h4>
				<ul>
					<li>The <strong>fetchCexplorerData()</strong> function makes a GET request to the Cexplorer API</li>
					<li>It requires your API key in the request header: <code>"api-key": "your-api-key"</code></li>
					<li>The API URL includes the policy ID as a query parameter: <code>?id=POLICY_ID</code></li>
					<li>The response contains collection information including:
						<ul>
							<li>Collection name</li>
							<li>Floor price (in Lovelace, converted to ADA)</li>
							<li>Number of owners</li>
							<li>Volume and other statistics</li>
						</ul>
					</li>
					<li>This data is printed to the console for verification</li>
				</ul>
				
				<h3>Key Concepts</h3>
				<ul>
					<li><strong>HTTP Methods:</strong> Koios uses POST (sends data in body), MinSwap and Cexplorer use GET (data in URL)</li>
					<li><strong>JSON Parsing:</strong> All responses are JSON, which we parse using ArduinoJSON library</li>
					<li><strong>API Keys:</strong> Cexplorer requires authentication via API key in headers</li>
					<li><strong>Lovelace Conversion:</strong> Cardano amounts are often returned in Lovelace and need conversion to ADA</li>
					<li><strong>Error Handling:</strong> The code checks HTTP response codes and JSON parsing errors</li>
				</ul>
				
				<h3>What Happens Next</h3>
				<p>Currently, the code fetches data once when the microcontroller starts. In the next steps, you'll learn how to:</p>
				<ul>
					<li>Fetch data in intervals (e.g., every 30 seconds) to keep it up to date</li>
					<li>Display the fetched data on your TFT display</li>
					<li>Format and animate the data for a beautiful ticker display</li>
				</ul>
				
				<h3>Important Notes</h3>
				<ul>
					<li><strong>Replace all placeholders:</strong> Make sure to replace SSID, password, addresses, and API key with your actual values</li>
					<li><strong>API Key Security:</strong> Never share your API keys publicly or commit them to version control</li>
					<li><strong>Rate Limits:</strong> Be mindful of API rate limits, especially for free tiers</li>
					<li><strong>Network Requirements:</strong> All API calls require an active WiFi connection</li>
					<li><strong>Serial Monitor:</strong> Open the Serial Monitor at 115200 baud to see all the output</li>
				</ul>
			`}
		/>
	</section>
</SectionNavigator>

<WorkshopNavigation />
