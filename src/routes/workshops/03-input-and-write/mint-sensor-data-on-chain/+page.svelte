<script>
	import { page } from '$app/state';
	import SectionNavigator from '$lib/components/SectionNavigator.svelte';
	import WorkshopNavigation from '$lib/WorkshopNavigation.svelte';
	import CodeCard from '$lib/components/CodeCard.svelte';
	import LiveCodeCard from '$lib/components/LiveCodeCard.svelte';
	import FurtherResources from '$lib/components/FurtherResources.svelte';
	import TipBox from '$lib/components/TipBox.svelte';
	import { MoveLeft } from 'lucide-svelte';
	let parentPage = $derived(page.url.pathname.split('/')[2]);
	let { data } = $props();

	const mintFirstNftHowItWorks = `
		<h3>Overview</h3>
		<p>This example demonstrates how to mint your first NFT on the Cardano blockchain using Mesh SDK. It walks through each step of the process, from setting up your wallet to submitting the transaction.</p>
		
		<h3>Step-by-Step Process</h3>
		<ol>
			<li><strong>Set up the Provider:</strong> Connect to the Cardano network (testnet for testing, mainnet for real NFTs)</li>
			<li><strong>Create Your Wallet:</strong> Initialize your wallet using your mnemonic phrase</li>
			<li><strong>Initialize Wallet:</strong> Load your wallet information from the blockchain</li>
			<li><strong>Get UTXOs:</strong> Retrieve your available funds (needed to pay transaction fees)</li>
			<li><strong>Get Change Address:</strong> Your wallet address where leftover funds are returned</li>
			<li><strong>Create Forging Script:</strong> Define the policy that controls who can mint NFTs</li>
			<li><strong>Prepare Metadata:</strong> Create the data that will be stored in your NFT</li>
			<li><strong>Generate Policy ID:</strong> Create a unique identifier for your NFT collection</li>
			<li><strong>Create Token Name:</strong> Give your NFT a unique name</li>
			<li><strong>Convert to Hex:</strong> Convert the name to hexadecimal format (blockchain requirement)</li>
			<li><strong>Structure Metadata:</strong> Format metadata according to CIP-25 standard</li>
			<li><strong>Build Transaction:</strong> Create the transaction that will mint your NFT</li>
			<li><strong>Sign Transaction:</strong> Sign it with your wallet to authorize it</li>
			<li><strong>Submit Transaction:</strong> Send it to the Cardano network</li>
			<li><strong>View Results:</strong> Get the transaction hash to view on the explorer</li>
		</ol>
		
		<h3>Key Concepts</h3>
		<ul>
			<li><strong>Policy ID:</strong> A unique identifier for your NFT collection. All NFTs with the same Policy ID belong to the same collection.</li>
			<li><strong>Token Name:</strong> A unique name for each individual NFT within a collection.</li>
			<li><strong>UTXOs:</strong> Unspent Transaction Outputs - these are like coins in your wallet that you can spend.</li>
			<li><strong>Transaction Hash:</strong> A unique identifier for your transaction. You can use this to view it on blockchain explorers.</li>
			<li><strong>Minting:</strong> The process of creating a new NFT on the blockchain.</li>
		</ul>
		
		<h3>Important Notes</h3>
		<ul>
			<li><strong>Replace the mnemonic:</strong> The example uses placeholder words. Replace them with your actual wallet mnemonic.</li>
			<li><strong>Use environment variables:</strong> In production, never hardcode your mnemonic. Use <code>process.env.WALLET_MNEMONIC</code> instead.</li>
			<li><strong>Testnet vs Mainnet:</strong> The code uses 'preprod' (testnet) which is free. Change to 'api' for mainnet (real money).</li>
			<li><strong>Transaction Fees:</strong> You need tADA (testnet ADA) in your wallet to pay for transaction fees (about 0.2 tADA per NFT).</li>
			<li><strong>Network ID:</strong> 0 = testnet, 1 = mainnet. Make sure this matches your provider setting.</li>
		</ul>
	`;

	const burnNftHowItWorks = `
		<h3>Overview</h3>
		<p>This code permanently destroys (burns) an NFT from your wallet. Burning an NFT is like minting a negative amount - you're removing it from the blockchain forever. Think of it as the opposite of minting.</p>
		
		<h3>How It Works</h3>
		<ol>
			<li><strong>Set up the Provider:</strong> Connect to the Cardano network (same network where you minted the NFT)</li>
			<li><strong>Create Your Wallet:</strong> Initialize your wallet using your mnemonic phrase (must be the same wallet that owns the NFT)</li>
			<li><strong>Initialize Wallet:</strong> Load your wallet information from the blockchain</li>
			<li><strong>Get UTXOs:</strong> Retrieve your available funds (needed to pay transaction fees)</li>
			<li><strong>Get Change Address:</strong> Your wallet address where leftover funds are returned</li>
			<li><strong>Create Forging Script:</strong> Recreate the same policy script used when minting (must match exactly)</li>
			<li><strong>Generate Policy ID:</strong> Calculate the Policy ID from the forging script (must match the minting Policy ID)</li>
			<li><strong>Set Token Name:</strong> Specify the exact token name of the NFT you want to burn</li>
			<li><strong>Convert to Hex:</strong> Convert the token name to hexadecimal format (blockchain requirement)</li>
			<li><strong>Build Transaction:</strong> Create a transaction that mints "-1" of the token (this burns 1 token)</li>
			<li><strong>Sign Transaction:</strong> Sign it with your wallet to authorize it</li>
			<li><strong>Submit Transaction:</strong> Send it to the Cardano network</li>
			<li><strong>View Results:</strong> Get the transaction hash to view on the explorer</li>
		</ol>
		
		<h3>Key Concepts</h3>
		<ul>
			<li><strong>Burning = Minting -1:</strong> To burn a token, you mint a negative amount. Minting "-1" destroys one token.</li>
			<li><strong>Policy ID Must Match:</strong> You must use the exact same Policy ID that was used when minting the NFT.</li>
			<li><strong>Token Name Must Match:</strong> The token name must be exactly the same as when you minted it (case-sensitive).</li>
			<li><strong>You Must Own It:</strong> You can only burn NFTs that are currently in your wallet.</li>
			<li><strong>Permanent Action:</strong> Once burned, the NFT is permanently destroyed and cannot be recovered.</li>
		</ul>
		
		<h3>Important Notes</h3>
		<ul>
			<li><strong>Replace the mnemonic:</strong> The example uses placeholder words. Replace them with your actual wallet mnemonic.</li>
			<li><strong>Set the token name:</strong> You must set the <code>tokenName</code> variable to the exact name of the NFT you want to burn.</li>
			<li><strong>Same wallet required:</strong> You must use the same wallet that owns the NFT you want to burn.</li>
			<li><strong>Transaction fees:</strong> You still pay a transaction fee to burn an NFT (about 0.2 tADA on testnet).</li>
			<li><strong>Cannot be undone:</strong> Burning is permanent. Make sure you really want to destroy the NFT before running this code.</li>
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
		<h2 class="text-4xl font-medium">Overview</h2>
		<p class="text-lg font-thin text-white">
			In this workshop, you'll build a complete system that:
		</p>
		<ul>
			<li>
				Reads temperature and humidity from your sensor (you learned this in the previous step)
			</li>
			<li>Sends that data to your computer's API server</li>
			<li>Turns the sensor data into an NFT on the Cardano blockchain</li>
		</ul>
		<p class="text-lg font-thin text-white">
			By the end, you'll have a system that automatically creates NFTs from your sensor readings.
			Each NFT is like a permanent digital record that can never be deleted or changed - it's stored
			on the blockchain forever!
		</p>
		<p class="text-lg font-thin text-white">
			<strong>Prerequisites:</strong>
		</p>
		<ul>
			<li>Completed the "Connect and Read Sensor Data" workshop step</li>
			<li>Completed the "Build Your Own API" workshop step</li>
			<li>Node.js and npm installed</li>
			<li>A Cardano testnet wallet with some tADA for transaction fees</li>
			<li>Your API server from the previous workshop step</li>
		</ul>
	</section>

	<section class="mb-16 flex flex-col gap-4 text-white">
		<h2 class="text-4xl font-medium">Understanding NFT Minting</h2>
		<p class="text-lg font-thin text-white">
			<strong>What is Minting?</strong>
		</p>
		<p class="text-lg font-thin text-white">
			"Minting" is just a fancy word for "creating" an NFT. When you mint an NFT, you're creating a
			unique digital item on the blockchain. It's like creating a digital certificate that says
			"This sensor reading happened at this time" - and it's stored forever on the Cardano
			blockchain where anyone can verify it.
		</p>
		<p class="text-lg font-thin text-white">
			<strong>What is a Policy ID?</strong>
		</p>
		<p class="text-lg font-thin text-white">
			A policy ID is a unique identifier for the NFT collection. It's like a label that tells you
			which collection the NFT belongs to. You can use the policy ID to mint multiple NFTs in the
			same collection or look up the whole collection on the blockchain explorer or check which
			wallets hold the NFTs.
		</p>

		<p class="text-lg font-thin text-white">
			<strong>What Data Gets Stored?</strong>
		</p>
		<p class="text-lg font-thin text-white">
			In our (very basic) NFT example below, you can see that the NFT contains information about
			your sensor readings, the timestamp and the author of the NFT as well as an image of the NFT.
			The policyId and the tokenName will be generated automatically by the server.
		</p>
		<CodeCard
			title="Example NFT Metadata Structure"
			language="json"
			code={`{
  "policyId": {
    "tokenName": {
      "name": "Sensor Data NFT - 2024-01-15T10:30:00Z",
      "image": "https://cardanothings.io/nft.png",
      "mediaType": "image/png",
      "description": "Temperature and humidity sensor data",
      "author": "A CardanoThings.io User",
      "temperature": "23.5",
      "humidity": "65.2",
      "timestamp": 1705312200000
    }
  }
}`}
		/>
	</section>

	<section class="mb-16 flex flex-col gap-4 text-white">
		<h2 class="text-4xl font-medium">Minting Your First NFT</h2>
		<p class="text-lg font-thin text-white">
			Now that you understand the concepts, let's see how to mint an NFT step by step. This example
			shows you the complete process of creating an NFT on the Cardano blockchain.
		</p>
		<p class="text-lg font-thin text-white">
			<strong>What this code does:</strong>
		</p>
		<ul>
			<li>Connects to the Cardano testnet (Preprod)</li>
			<li>Sets up your wallet using your mnemonic phrase</li>
			<li>Creates NFT metadata with sensor data</li>
			<li>Builds and signs a minting transaction</li>
			<li>Submits the transaction to create your NFT</li>
			<li>Provides a link to view your NFT on the blockchain explorer</li>
		</ul>
		<LiveCodeCard
			title="Basic NFT Minting Code Example"
			files={[
				{
					path: 'Workshop-03/examples/mesh-nft-basics/mint-nft.js',
					language: 'javascript',
					filename: 'mint-nft.js'
				},
				{
					path: 'Workshop-03/examples/mesh-nft-basics/package.json',
					language: 'json',
					filename: 'package.json'
				}
			]}
			readmePath="Workshop-03/examples/mesh-nft-basics/README.md"
			repo="CardanoThings/Workshops"
			branch="main"
			footerText="Copy this code into a file called mint-nft.js. Make sure you have @meshsdk/core installed (npm install @meshsdk/core). Replace the mnemonic array with your actual wallet mnemonic. Make sure your wallet has some tADA for transaction fees. Run it with node mint-nft.js and it will mint your first NFT!"
		/>

		<p class="text-lg font-thin text-white">
			<strong>Congratulations! You've minted your first NFT!</strong> You can now (well, once the
			transaction is confirmed, remember this may take a moment) view either the single NFT on
			<a
				href="https://preprod.cardanoscan.io/"
				target="_blank"
				rel="noopener noreferrer"
				class="link">CardanoScan.io</a
			> by pasting the transaction hash or view the whole collection by pasting the policy ID into the
			search bar. Or use the "NFTs" tab in Yoroi to view your NFTs.
		</p>
	</section>

	<section class="mb-16 flex flex-col gap-4 text-white">
		<h2 class="text-4xl font-medium">Posting Sensor Data to Your API</h2>
		<p class="text-lg font-thin text-white">
			Now that you've minted your first NFT, you can start posting sensor data to your API server.
			This code reads temperature and humidity from the AHT10 sensor and posts it to your Node.js
			API endpoint from the previous workshop step.
		</p>
		<p class="text-lg font-thin text-white">
			<strong>What this code does:</strong>
		</p>
		<ul>
			<li>Connects to your WiFi network</li>
			<li>Reads temperature and humidity from the sensor every 5 minutes</li>
			<li>
				Sends the data to your API server (only once if <code>sendOnce</code> is set to true - useful
				for testing)
			</li>
			<li>Shows you what's happening in the serial monitor</li>
		</ul>
		<TipBox title="Send Once Flag for Testing" variant="info">
			The code includes a <code>sendOnce</code> flag that's set to <code>true</code> by default.
			When enabled, the sensor data will only be sent once instead of every 5 minutes. This is
			useful for testing to avoid creating too many blockchain transactions while you're developing
			and debugging your setup.
			<br /><br />
			<strong>To send data continuously:</strong> Set <code>sendOnce</code> to <code>false</code> in
			the code.
		</TipBox>
		<LiveCodeCard
			title="Arduino Code - Post Sensor Data to API"
			repo="CardanoThings/Workshops"
			branch="main"
			files={[
				{
					path: 'Workshop-03/examples/post-sensor-data/post-sensor-data.ino',
					language: 'cpp'
				}
			]}
			readmePath="Workshop-03/examples/post-sensor-data/README.md"
			footerText="Copy this code into Arduino IDE. Make sure you have the Adafruit AHT10 library installed (and its dependencies: Adafruit BusIO and Adafruit Unified Sensor). Update your WiFi name, password, and your computer's IP address. Upload to your microcontroller and watch the serial monitor to see it working!"
		/>
		<p class="text-lg font-thin text-white">
			<strong>Configuration Steps:</strong>
		</p>
		<ol>
			<li>
				Update <code class="rounded bg-gray-800 px-2 py-1 text-white">ssid</code> and
				<code class="rounded bg-gray-800 px-2 py-1 text-white">password</code> with your WiFi network
				credentials
			</li>
			<li>
				Replace <code class="rounded bg-gray-800 px-2 py-1 text-white">YOUR_SERVER_IP</code> with your
				computer's IP address (where your Node.js server is running)
			</li>
			<li>Make sure your Node.js API server is running and accessible from your network</li>
			<li>Upload the code to your microcontroller and open the serial monitor (115200 baud)</li>
		</ol>
		<TipBox title="Finding Your Server IP Address" variant="info">
			<strong>On Windows:</strong> Open Command Prompt and run <code>ipconfig</code>. Look for "IPv4
			Address" under your active network adapter.
			<br /><br />
			<strong>On Mac/Linux:</strong> Open Terminal and run <code>ifconfig</code> or
			<code>ip addr</code>. Look for your network interface (usually "en0" on Mac or "wlan0" on
			Linux) and find the "inet" address.
			<br /><br />
			Make sure your computer and microcontroller are on the same network!
		</TipBox>

		<p class="text-lg font-thin text-white">
			At this point your are most likely still using the same API server from the previous workshop
			step, so every time the microcontroller posts sensor data to your API server, a normal
			blockchain transaction is created and stored on the blockchain instead of an NFT, so lets
			combine the two steps into a single code example.
		</p>
	</section>

	<section class="mb-16 flex flex-col gap-4 text-white">
		<h2 class="text-4xl font-medium">Putting it all together</h2>
		<p class="text-lg font-thin text-white">
			Now let's combine everything into a single API server that automatically mints an NFT every
			time sensor data is posted to it. This replaces your previous API server and adds NFT minting
			functionality.
		</p>
		<p class="text-lg font-thin text-white">
			<strong>What this code does:</strong>
		</p>
		<ul>
			<li>Receives sensor data from your microcontroller via POST request</li>
			<li>Validates the temperature and humidity data</li>
			<li>Automatically mints an NFT with the sensor data as metadata</li>
			<li>Returns the transaction hash and explorer URL so you can view your NFT</li>
			<li>Handles errors gracefully and provides helpful error messages</li>
		</ul>
		<LiveCodeCard
			title="Complete API Server with NFT Minting"
			repo="CardanoThings/Workshops"
			branch="main"
			files={[
				{
					path: 'Workshop-03/examples/nodejs-nft-api/server.js',
					language: 'javascript'
				},
				{
					path: 'Workshop-03/examples/nodejs-nft-api/package.json',
					language: 'json'
				}
			]}
			readmePath="Workshop-03/examples/nodejs-nft-api/README.md"
			footerText="Copy this code into a file called server.js. Make sure you have the required packages installed (npm install express cors @meshsdk/core). Replace the mnemonic array with your actual wallet mnemonic. Run it with node server.js. Every time your microcontroller posts sensor data, an NFT will be automatically minted!"
		/>
		<p class="text-lg font-thin text-white">
			<strong>Setup Steps:</strong>
		</p>
		<ol>
			<li>
				Install required packages:
				<code class="rounded bg-gray-800 px-2 py-1 text-white"
					>npm install express cors @meshsdk/core</code
				>
			</li>
			<li>
				Replace the mnemonic array in the code with your actual wallet mnemonic phrase (12 or 24
				words):
				<code class="rounded bg-gray-800 px-2 py-1 text-white"
					>const mnemonic = ["word1", "word2", "word3", ...];</code
				>
			</li>
			<li>
				Run the server:
				<code class="rounded bg-gray-800 px-2 py-1 text-white">node api-server.js</code>
			</li>
			<li>
				Make sure your Arduino code is configured to send data to this server (same IP address and
				port 3000)
			</li>
		</ol>
		<TipBox title="Important Notes" variant="info">
			<strong>Security Warning:</strong> Never commit your mnemonic to GitHub! In production code,
			always use environment variables or a <code>.env</code> file (and add <code>.env</code> to
			your
			<code>.gitignore</code>).
			<br /><br />
			<strong>Testnet vs Mainnet:</strong> This code uses Preprod testnet (networkId: 0). For
			mainnet, change
			<code>networkId</code> to <code>1</code> and use <code>new KoiosProvider('api')</code>.
			<br /><br />
			<strong>Transaction Fees:</strong> Each NFT mint costs a small fee (about 0.2 tADA on testnet).
			Make sure your wallet has enough balance to cover multiple transactions if you're sending data
			frequently.
		</TipBox>
	</section>

	<section class="mb-16 flex flex-col gap-4 text-white">
		<h2 class="text-4xl font-medium">Burning NFTs</h2>
		<p class="text-lg font-thin text-white">
			Sometimes you may want to "burn" (permanently destroy) an NFT. Burning an NFT removes it from
			the blockchain forever (though the transaction will still be visible) - This can be useful if
			you want to remove test NFTs or clean up your collection.
		</p>
		<p class="text-lg font-thin text-white">
			<strong>What is Burning?</strong>
		</p>
		<p class="text-lg font-thin text-white">
			Burning an NFT is essentially minting a negative amount of tokens. When you mint "-1" of a
			token, you're destroying one token. The NFT will be permanently removed from your wallet and
			the blockchain.
		</p>
		<p class="text-lg font-thin text-white">
			<strong>Important Notes:</strong>
		</p>
		<ul>
			<li>You can only burn NFTs that you minted</li>
			<li>You must use the exact same policy ID and token name that was used when minting</li>
			<li>Burning is permanent - once burned, the NFT cannot be recovered</li>
			<li>You still pay a transaction fee to burn an NFT</li>
		</ul>
		<LiveCodeCard
			title="Burn NFT Example"
			files={[
				{
					path: 'Workshop-03/examples/mesh-nft-basics/burn-nft.js',
					language: 'javascript',
					filename: 'burn-nft.js'
				},
				{
					path: 'Workshop-03/examples/mesh-nft-basics/package.json',
					language: 'json',
					filename: 'package.json'
				}
			]}
			readmePath="Workshop-03/examples/mesh-nft-basics/README.md"
			repo="CardanoThings/Workshops"
			branch="main"
			footerText="Copy this code into a file called burn-nft.js. Replace the mnemonic array with your actual wallet mnemonic. Set the tokenName variable to the exact name of the NFT you want to burn (this should match the tokenName from when you minted it). Run it with node burn-nft.js to permanently destroy the NFT."
		/>
		<p class="text-lg font-thin text-white">
			<strong>How to Find Your Token Name:</strong>
		</p>
		<p class="text-lg font-thin text-white">
			When you mint an NFT, the server returns a <code>tokenName</code> in the response. You can use
			that exact value to burn the NFT. Alternatively, you can check your wallet or the blockchain explorer
			to find the token name.
		</p>
		<TipBox title="Finding Token Names" variant="info">
			<strong>From API Response:</strong> When you mint an NFT via the API server, the response
			includes a <code>tokenName</code> field. Copy that value exactly.
			<br /><br />
			<strong>From Wallet:</strong> Open your Cardano wallet (Yoroi, Vespr, Eternl, etc.) and view
			your NFTs. The token name is usually displayed in the NFT details.
			<br /><br />
			<strong>From Explorer:</strong> View your transaction on
			<a href="https://preprod.cardanoscan.io/" target="_blank" class="link">CardanoScan</a> and look
			for the minted asset details.
		</TipBox>
	</section>

	<section class="mb-16 flex flex-col gap-4 text-white">
		<h2 class="text-4xl font-medium">Whats Next?</h2>
		<p class="text-lg font-thin text-white">
			Now that you can mint NFTs from sensor data, you can start exploring the possibilities. Here
			are some ideas to try:
		</p>
		<ul>
			<li>
				Mint NFTs for your temperatur readings every hour, day or whenever the temperature hits a
				certain threshold
			</li>
			<li>
				Create a website to display your NFTs and sensor data using the Koios API endpoints like <a
					href="https://preprod.koios.rest/#post-/account_assets"
					target="_blank"
					class="link">/account_assets</a
				>
				or
				<a href="https://preprod.koios.rest/#get-/policy_asset_info" target="_blank" class="link"
					>/policy_asset_info</a
				>
			</li>
			<li>
				Connect other sensors (like a light or motion sensor maybe?) to your microcontroller and API
				server and mint NFTs when certain events occur in the real world
			</li>
			<li>
				Use the <a href="https://meshjs.dev/" target="_blank" class="link">Mesh SDK</a> to build more
				complex applications on the Cardano blockchain
			</li>
		</ul>

		<p class="text-lg font-thin text-white">
			If all of this is still a bit overwhelming, don't worry. You can always come back to this
			workshop and refer to the code examples. And if building your own API server is still too
			much, you can always use a paid service like <a
				href="https://nmkr.io/"
				target="_blank"
				class="link">NMKR</a
			>
			API to mint NFTs. There is a tutorial available
			<a
				href="https://github.com/elRaulito/IoT-NMKR-integration-Open-Source-Tutorial"
				target="_blank"
				class="link">here</a
			> that shows you how to integrate the NMKR API with your ESP32 Cam.
		</p>

		<p class="text-lg font-thin text-white">
			If you still don't have enough, continue with the next workshop, where we will build a Cardano
			Ticker showing token pricesusing the ESP32 Cheap Yellow Display, no API or soldering required!
		</p>
	</section>

	<FurtherResources
		resources={[
			{
				title: 'Mesh SDK Documentation',
				url: 'https://meshjs.dev/',
				description:
					'Complete documentation for Mesh SDK, including transaction building, wallet integration, and minting examples.'
			},
			{
				title: 'Mesh Minting Guide',
				url: 'https://meshjs.dev/apis/txbuilder/minting',
				description:
					'Detailed guide on minting NFTs with Mesh SDK, including examples for native scripts and Plutus scripts.'
			},
			{
				title: 'CIP-25 NFT Metadata Standard',
				url: 'https://cips.cardano.org/cips/cip25/',
				description:
					'The Cardano Improvement Proposal that defines the standard for NFT metadata on Cardano.'
			},
			{
				title: 'Preprod CardanoScan',
				url: 'https://preprod.cardanoscan.io/',
				description:
					'Blockchain explorer for the Preprod testnet to view your transactions and NFTs.'
			},
			{
				title: 'Koios API',
				url: 'https://api.koios.rest/',
				description:
					'Free community-driven Cardano API service. No API key required for blockchain data access.'
			}
		]}
	/>
</SectionNavigator>

<WorkshopNavigation />
