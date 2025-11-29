<script>
	import { page } from '$app/state';
	import SectionNavigator from '$lib/components/SectionNavigator.svelte';
	import WorkshopNavigation from '$lib/WorkshopNavigation.svelte';
	import CodeCard from '$lib/components/CodeCard.svelte';
	import FurtherResources from '$lib/components/FurtherResources.svelte';
	import TipBox from '$lib/components/TipBox.svelte';
	import { MoveLeft } from 'lucide-svelte';
	let parentPage = $derived(page.url.pathname.split('/')[2]);
	let { data } = $props();

	const arduinoPostHowItWorks = `
		<h3>Overview</h3>
		<p>This code reads temperature and humidity from your sensor and sends it to your computer's API server. Think of it like sending a text message - your microcontroller reads the sensor, packages the data, and sends it to your server over WiFi.</p>
		
		<h3>How the Code Works</h3>
		<ol>
			<li>When the microcontroller starts, it connects to your WiFi network</li>
			<li>Every 10 seconds, it reads the temperature and humidity from the sensor</li>
			<li>It packages the data (like putting it in an envelope)</li>
			<li>It sends the data to your API server (like mailing the envelope)</li>
			<li>It prints what happened to the serial monitor so you can see if it worked</li>
		</ol>
		
		<h3>What You Need to Change</h3>
		<ul>
			<li><strong>WiFi Name and Password:</strong> Update <code>ssid</code> and <code>password</code> with your WiFi details</li>
			<li><strong>Server Address:</strong> Replace <code>YOUR_SERVER_IP</code> with your computer's IP address (where your server is running)</li>
			<li><strong>How Often:</strong> You can change <code>readingInterval</code> to send data more or less frequently (currently every 10 seconds)</li>
		</ul>
	`;

	const meshMintHowItWorks = `
		<h3>Overview</h3>
		<p>This server receives sensor data from your microcontroller and turns it into an NFT on the Cardano blockchain. Think of it like a factory: it takes your sensor data, packages it as an NFT, and puts it on the blockchain forever.</p>
		
		<h3>How It Works</h3>
		<ol>
			<li>Your microcontroller sends sensor data to the server</li>
			<li>The server receives the data (temperature, humidity, timestamp)</li>
			<li>It creates a unique name for this NFT (based on the timestamp)</li>
			<li>It packages everything together: the sensor data, a name, and a description</li>
			<li>It creates a blockchain transaction to mint (create) the NFT</li>
			<li>It signs the transaction with your wallet (like signing a check)</li>
			<li>It sends the transaction to the Cardano network</li>
			<li>It gives you back a link to view your new NFT</li>
		</ol>
		
		<h3>What Gets Stored in the NFT</h3>
		<p>Each NFT contains:</p>
		<ul>
			<li><strong>Name:</strong> A title for your NFT (like "Sensor Data NFT - 2024-01-15")</li>
			<li><strong>Description:</strong> What the NFT is about</li>
			<li><strong>Your Sensor Data:</strong> The temperature, humidity, timestamp, and sensor type</li>
		</ul>
		
		<h3>Important Security Tips</h3>
		<ul>
			<li>Never put your wallet passphrase directly in your code - always use a .env file</li>
			<li>We're using testnet (Preprod) which uses fake money - safe for testing!</li>
			<li>Make sure your wallet has some tADA for fees (about 0.2 ADA per NFT)</li>
			<li>Never share your wallet passphrase with anyone</li>
		</ul>
	`;
</script>

<section class="mb-8 flex flex-col gap-4 text-white">
	<a href={`/workshops/${parentPage}`} class="flex items-center gap-2">
		<MoveLeft size="20" />
		<h1 class="text-lg font-normal text-white sm:max-w-[50%]">Workshop 03: Input and Write</h1>
	</a>
	<h2 class="text-6xl font-medium text-white sm:max-w-[50%]">Mint sensor data on-chain</h2>
	<p class="text-lg font-thin text-white sm:max-w-[50%]">
		Learn how to send temperature sensor data from your microcontroller to your computer, then turn
		it into an NFT on the Cardano blockchain. You'll create a system that permanently stores your
		sensor readings as unique digital items that can never be deleted or changed.
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
		<h2 class="text-4xl font-medium">Posting Sensor Data to Your API</h2>
		<p class="text-lg font-thin text-white">
			First, we'll modify your Arduino code to send sensor data to your API server. This code reads
			temperature and humidity from the SHT21 sensor and posts it to your Node.js API endpoint.
		</p>
		<p class="text-lg font-thin text-white">
			<strong>What this code does:</strong>
		</p>
		<ul>
			<li>Connects to your WiFi network</li>
			<li>Reads temperature and humidity from the sensor every 10 seconds</li>
			<li>Sends the data to your API server</li>
			<li>Shows you what's happening in the serial monitor</li>
		</ul>
		<CodeCard
			title="Arduino Code - Post Sensor Data to API"
			code={data.arduinoPostSensorCode}
			language="cpp"
			githubLink="https://github.com/CardanoThings/Workshops/tree/main/Workshop-03/examples/arduino-post-sensor-code"
			howItWorksContent={arduinoPostHowItWorks}
			footerText="Copy this code into Arduino IDE. Make sure you have the SHT2x library installed. Update your WiFi name, password, and your computer's IP address. Upload to your microcontroller and watch the serial monitor to see it working!"
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
	</section>

	<section class="mb-16 flex flex-col gap-4 text-white">
		<h2 class="text-4xl font-medium">Minting NFTs with Mesh SDK</h2>
		<p class="text-lg font-thin text-white">
			Now we'll update your API server to turn the sensor data into NFTs on the Cardano blockchain.
			We'll use Mesh SDK, which is a tool that makes it easy to create NFTs without needing to
			understand all the complicated blockchain details.
		</p>
		<p class="text-lg font-thin text-white">
			<strong>What is Mesh SDK?</strong>
		</p>
		<p class="text-lg font-thin text-white">
			Mesh SDK is a free tool that makes working with Cardano much easier. Instead of writing
			complex blockchain code, you can use simple commands to create NFTs. Think of it like a helper
			that does the hard work for you!
		</p>
		<ul>
			<li>It's free and open-source</li>
			<li>It's small and fast</li>
			<li>It makes creating NFTs simple</li>
			<li>No API key needed - just install and use it</li>
		</ul>
		<p class="text-lg font-thin text-white">
			<strong>Setting up Mesh:</strong>
		</p>
		<ol>
			<li>
				Install Mesh SDK: <code class="rounded bg-gray-800 px-2 py-1 text-white"
					>npm install @meshsdk/core</code
				>
			</li>
			<li>
				Set your <code class="rounded bg-gray-800 px-2 py-1 text-white">WALLET_MNEMONIC</code>
				environment variable with your testnet wallet passphrase
			</li>
			<li>
				Make sure your wallet has some tADA for transaction fees (usually around 0.2 ADA per
				transaction)
			</li>
		</ol>
		<TipBox title="Security Warning - Never Commit Secrets to GitHub" variant="danger">
			<strong
				>Never upload code containing your wallet passphrase or mnemonic to GitHub or any public
				repository!</strong
			>
			If someone gains access to your passphrase, they can steal all funds from your wallet.
			<br /><br />
			<strong>Always use environment variables (.env files) to store sensitive information:</strong>
			<ul class="mt-2 ml-4">
				<li>Create a <code>.env</code> file in your project root</li>
				<li>Add your mnemonic: <code>WALLET_MNEMONIC="word1 word2 word3 ..."</code></li>
				<li>Add <code>.env</code> to your <code>.gitignore</code> file</li>
				<li>Never commit <code>.env</code> files to version control</li>
			</ul>
		</TipBox>
	</section>

	<section class="mb-16 flex flex-col gap-4 text-white">
		<h2 class="text-4xl font-medium">Complete API Server with NFT Minting</h2>
		<p class="text-lg font-thin text-white">
			Here's the complete server code that receives sensor data and turns it into NFTs. Don't worry
			if it looks long - most of it is just setting things up. The important part is that when it
			receives sensor data, it creates an NFT automatically.
		</p>
		<CodeCard
			title="Node.js API Server - Mint NFT with Sensor Data"
			code={data.meshMintCode}
			language="javascript"
			githubLink="https://github.com/CardanoThings/Workshops/tree/main/Workshop-03/examples/mesh-mint-code"
			howItWorksContent={meshMintHowItWorks}
			footerText="Save this as server.js. Install the packages with 'npm install express cors @meshsdk/core'. Create a .env file with your WALLET_MNEMONIC. Make sure package.json has 'type: module'. Run 'node server.js' and it will automatically turn sensor data into NFTs!"
		/>
		<p class="text-lg font-thin text-white">
			<strong>Testing the Complete System:</strong>
		</p>
		<ol>
			<li>
				Start your Node.js API server: <code class="rounded bg-gray-800 px-2 py-1 text-white"
					>node server.js</code
				>
			</li>
			<li>
				Make sure your <code class="rounded bg-gray-800 px-2 py-1 text-white">WALLET_MNEMONIC</code>
				environment variable is set
			</li>
			<li>Upload the Arduino code to your microcontroller</li>
			<li>Watch the serial monitor - you should see sensor data being sent every 10 seconds</li>
			<li>Check your server console - you should see NFT minting transactions being created</li>
			<li>Use the explorer URL from the response to view your NFT on the blockchain</li>
			<li>Check your wallet - the minted NFT should appear in your NFT collection</li>
		</ol>
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
			<strong>What Gets Stored?</strong>
		</p>
		<p class="text-lg font-thin text-white">
			Each NFT you create contains information about your sensor reading. Think of it like a digital
			file folder that holds:
		</p>
		<ul>
			<li><strong>Name:</strong> A title for your NFT</li>
			<li><strong>Description:</strong> What the NFT is about</li>
			<li><strong>Your Data:</strong> The temperature, humidity, timestamp, and sensor type</li>
		</ul>
		<CodeCard
			title="Example NFT Metadata Structure"
			language="json"
			code={`{
  "policyId": {
    "tokenName": {
      "name": "Sensor Data NFT - 2024-01-15T10:30:00Z",
      "description": "Temperature and humidity sensor data from SHT21 sensor",
      "temperature": 23.5,
      "humidity": 65.2,
      "timestamp": 1705312200000,
      "sensor_type": "SHT21"
    }
  }
}`}
		/>
	</section>

	<section class="mb-16 flex flex-col gap-4 text-white">
		<h2 class="text-4xl font-medium">Viewing Your Minted NFTs</h2>
		<p class="text-lg font-thin text-white">
			After successfully minting an NFT, you can view it in several ways:
		</p>
		<ul>
			<li>
				<strong>In your wallet:</strong> Open your Yoroi, Vespr, Eternl, or other Cardano wallet and
				check your NFT collection. The NFT should appear with its metadata.
			</li>
			<li>
				<strong>On blockchain explorers:</strong> Use the transaction hash from the API response to
				view the transaction on
				<a href="https://preprod.cardanoscan.io/" target="_blank" class="link">CardanoScan</a> or
				<a href="https://cexplorer.io/" target="_blank" class="link">Cexplorer</a>. You can see all
				the transaction details, including the metadata.
			</li>
			<li>
				<strong>In your API response:</strong> The server returns the transaction hash and explorer URL,
				which you can use to immediately view your minted NFT.
			</li>
		</ul>
		<p class="text-lg font-thin text-white">
			<strong>Transaction Fees:</strong>
		</p>
		<p class="text-lg font-thin text-white">
			Creating an NFT costs a small fee (about 0.2 tADA on testnet). This fee goes to the network to
			process your transaction. Make sure your wallet has enough tADA - the fee is automatically
			taken from your wallet when you mint an NFT.
		</p>
	</section>

	<section class="mb-16 flex flex-col gap-4 text-white">
		<h2 class="text-4xl font-medium">Next Steps and Customization</h2>
		<p class="text-lg font-thin text-white">
			Now that you can turn sensor data into NFTs, here are some fun ideas to try:
		</p>
		<ul>
			<li>
				<strong>Smart Minting:</strong> Only create NFTs when something interesting happens (like temperature
				gets too high)
			</li>
			<li>
				<strong>Add Pictures:</strong> Create graphs or charts of your data and include them in the NFT
			</li>
			<li>
				<strong>Combine Readings:</strong> Collect multiple sensor readings and put them all in one NFT
			</li>
			<li>
				<strong>More Sensors:</strong> Add other sensors (light, motion, air quality) to your setup
			</li>
			<li>
				<strong>Daily Summaries:</strong> Create one NFT per day with all the day's readings
			</li>
			<li>
				<strong>Make a Website:</strong> Build a simple webpage to show all your minted NFTs
			</li>
		</ul>
		<p class="text-lg font-thin text-white">
			<strong>Important Notes:</strong>
		</p>
		<ul>
			<li>Always test on Preprod Testnet before using Mainnet</li>
			<li>Make sure your wallet has enough balance to cover transaction fees</li>
			<li>Keep your wallet mnemonic secure and never share it</li>
			<li>Consider rate limiting to prevent minting too many NFTs too quickly</li>
		</ul>
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
