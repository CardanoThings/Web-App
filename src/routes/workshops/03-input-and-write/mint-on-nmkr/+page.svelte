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
		<h1 class="text-lg font-normal text-white sm:max-w-[50%]">Workshop 03: Input and Write</h1>
	</a>
	<h2 class="text-6xl font-medium text-white sm:max-w-[50%]">Mint on NMKR</h2>
	<p class="text-lg font-thin text-white sm:max-w-[50%]">
		If building your own API to mint NFTs seems to complex for you, no worries. You will get a short
		introduction into NMKR and how to set it up to use their API to mint an NFT with data from your
		Microcontroller.
	</p>
</section>

<SectionNavigator>
	<section class="mb-16 flex flex-col gap-4 text-white">
		<h2 class="text-4xl font-medium">Introduction to NMKR</h2>
		<p class="text-lg font-thin text-white">
			NMKR (formerly NFT-MAKER) is a platform that simplifies the process of minting NFTs on Cardano.
			Instead of building complex transaction structures yourself, NMKR provides a simple API that handles
			all the technical complexity for you.
		</p>
		<p class="text-lg font-thin text-white">
			<strong>Key Benefits:</strong>
		</p>
		<ul>
			<li>Simple API - no need to understand Cardano transaction structure</li>
			<li>Handles all the complex minting logic</li>
			<li>Supports metadata and images</li>
			<li>Works with both Mainnet and Testnet</li>
			<li>Free tier available for testing</li>
		</ul>
		<p class="text-lg font-thin text-white">
			NMKR is perfect for beginners who want to mint NFTs without diving deep into Cardano's technical
			details. It's also great for rapid prototyping and projects where you want to focus on your
			application logic rather than blockchain transaction building.
		</p>
	</section>

	<section class="mb-16 flex flex-col gap-4 text-white">
		<h2 class="text-4xl font-medium">Setting up NMKR</h2>
		<p class="text-lg font-thin text-white">
			<strong>Creating an Account:</strong>
		</p>
		<ol>
			<li>Go to <a href="https://www.nmkr.io/" target="_blank" class="link">nmkr.io</a></li>
			<li>Sign up for a free account</li>
			<li>Verify your email address</li>
		</ol>
		<p class="text-lg font-thin text-white">
			<strong>Creating a Project:</strong>
		</p>
		<ol>
			<li>Log in to your NMKR dashboard</li>
			<li>Navigate to "Projects" or "Create Project"</li>
			<li>Create a new project for your sensor data NFTs</li>
			<li>Note down your Project ID (you'll need this for the API)</li>
		</ol>
		<p class="text-lg font-thin text-white">
			<strong>Getting Your API Key:</strong>
		</p>
		<ol>
			<li>Go to your account settings or API section</li>
			<li>Generate a new API key</li>
			<li>Copy and save your API key securely (you won't be able to see it again)</li>
			<li>Make sure to select the correct network (Preprod Testnet for testing)</li>
		</ol>
		<p class="text-lg font-thin text-white">
			<strong>Important:</strong> Keep your API key secure and never share it publicly. Treat it like a
			password. If you're using version control (Git), make sure to add your API key to
			<code class="bg-gray-800 px-2 py-1 rounded text-white">.gitignore</code> or use environment variables.
		</p>
	</section>

	<section class="mb-16 flex flex-col gap-4 text-white">
		<h2 class="text-4xl font-medium">Using the NMKR API</h2>
		<p class="text-lg font-thin text-white">
			NMKR provides a REST API that you can call from your microcontroller or from a Node.js server. The
			API endpoint for minting is:
		</p>
		<p class="text-lg font-thin text-white font-mono text-sm bg-gray-800 p-2 rounded">
			POST https://api.nmkr.io/v2/mint
		</p>
		<p class="text-lg font-thin text-white">
			<strong>Direct from Microcontroller:</strong>
		</p>
		<p class="text-lg font-thin text-white">
			You can call the NMKR API directly from your Arduino/ESP32 code. Here's an example:
		</p>
		<Card.Root>
			<Card.Header class="mb-0 pb-0">
				<Card.Title>Arduino Code - Direct NMKR API Call</Card.Title>
			</Card.Header>
			<Card.Content>
				<SyntaxHighlighter language="cpp" code={data.nmkrApiCode} />
			</Card.Content>
			<Card.Footer>
				<p class="text-xs leading-relaxed">
					This code reads sensor data and mints an NFT via NMKR every 5 minutes. Replace the API key,
					project ID, and receiver address with your own values. Make sure you're using the correct
					API endpoint for your network (testnet vs mainnet).
				</p>
			</Card.Footer>
		</Card.Root>
		<p class="text-lg font-thin text-white">
			<strong>Via Node.js Server:</strong>
		</p>
		<p class="text-lg font-thin text-white">
			Alternatively, you can create a Node.js server that acts as a proxy between your microcontroller
			and NMKR. This approach has several advantages:
		</p>
		<ul>
			<li>Keeps your API key secure on the server</li>
			<li>Allows for additional processing and validation</li>
			<li>Can store data in a database before minting</li>
			<li>Easier to update and maintain</li>
		</ul>
		<Card.Root>
			<Card.Header class="mb-0 pb-0">
				<Card.Title>Node.js Server - NMKR Proxy</Card.Title>
			</Card.Header>
			<Card.Content>
				<SyntaxHighlighter language="javascript" code={data.nodeNmkrCode} />
			</Card.Content>
			<Card.Footer>
				<p class="text-xs leading-relaxed">
					This Node.js server receives sensor data from your microcontroller and forwards it to NMKR
					for minting. Install required packages with
					<code class="bg-gray-800 px-2 py-1 rounded text-white">npm install express cors axios</code>.
				</p>
			</Card.Footer>
		</Card.Root>
	</section>

	<section class="mb-16 flex flex-col gap-4 text-white">
		<h2 class="text-4xl font-medium">Minting with Sensor Data</h2>
		<p class="text-lg font-thin text-white">
			When minting NFTs with sensor data, you'll want to include the data in the NFT's metadata. NMKR
			supports metadata in JSON format, which allows you to store structured data.
		</p>
		<p class="text-lg font-thin text-white">
			<strong>Metadata Structure:</strong>
		</p>
		<p class="text-lg font-thin text-white">
			The metadata you send to NMKR should include:
		</p>
		<ul>
			<li><strong>name:</strong> A name for your NFT</li>
			<li><strong>description:</strong> A description of what the NFT represents</li>
			<li><strong>Custom fields:</strong> Your sensor data (temperature, humidity, timestamp, etc.)</li>
		</ul>
		<p class="text-lg font-thin text-white">
			<strong>Example Metadata:</strong>
		</p>
		<Card.Root>
			<Card.Header>
				<Card.Title>NFT Metadata Example</Card.Title>
			</Card.Header>
			<Card.Content>
				<SyntaxHighlighter
					language="json"
					code={`{
  "name": "Sensor Data NFT #1",
  "description": "Temperature and humidity data from microcontroller",
  "temperature": 23.5,
  "humidity": 65.2,
  "timestamp": "2024-01-15T10:30:00Z",
  "location": "Workshop",
  "sensor_type": "DHT-22"
}`}
				/>
			</Card.Content>
		</Card.Root>
		<p class="text-lg font-thin text-white">
			<strong>Best Practices:</strong>
		</p>
		<ul>
			<li>
				Include a timestamp so you know when the data was collected
			</li>
			<li>
				Use descriptive names and descriptions
			</li>
			<li>
				Include all relevant sensor data
			</li>
			<li>
				Consider adding location or device information
			</li>
			<li>
				Keep metadata size reasonable (very large metadata can be expensive)
			</li>
		</ul>
		<p class="text-lg font-thin text-white">
			<strong>Testing:</strong>
		</p>
		<p class="text-lg font-thin text-white">
			Always test on Preprod Testnet first before using Mainnet. This allows you to:
		</p>
		<ul>
			<li>Test your code without spending real ADA</li>
			<li>Verify the metadata looks correct</li>
			<li>Ensure the minting process works as expected</li>
			<li>Debug any issues safely</li>
		</ul>
	</section>

	<section class="mb-16 flex flex-col gap-4 text-white">
		<h2 class="text-4xl font-medium">Viewing Your NFTs</h2>
		<p class="text-lg font-thin text-white">
			After successfully minting an NFT, you can view it in several ways:
		</p>
		<ul>
			<li>
				<strong>In your wallet:</strong> Open your Yoroi or other Cardano wallet and check your NFT
				collection
			</li>
			<li>
				<strong>On NMKR:</strong> View your minted NFTs in the NMKR dashboard
			</li>
			<li>
				<strong>On blockchain explorers:</strong> Use
				<a href="https://cardanoscan.io/" target="_blank" class="link">CardanoScan</a> or
				<a href="https://cexplorer.io/" target="_blank" class="link">Cexplorer</a> to view transaction
				details
			</li>
			<li>
				<strong>On NFT marketplaces:</strong> Some marketplaces automatically index NFTs minted via NMKR
			</li>
		</ul>
		<p class="text-lg font-thin text-white">
			<strong>Next Steps:</strong>
		</p>
		<p class="text-lg font-thin text-white">
			Now that you can mint NFTs with sensor data, you can:
		</p>
		<ul>
			<li>Create a collection of sensor data NFTs</li>
			<li>Set up automatic minting based on conditions (e.g., temperature threshold)</li>
			<li>Add images or visualizations to your NFTs</li>
			<li>Build a dashboard to track your minted NFTs</li>
			<li>Create a marketplace or gallery for your sensor data NFTs</li>
		</ul>
	</section>
</SectionNavigator>

<Card.Root class="mt-8 bg-transparent text-white sm:w-3/4">
	<Card.Header>
		<Card.Title>Resources</Card.Title>
		<Card.Description>
			Here are some resources to help you learn more about NMKR and NFT minting on Cardano.
		</Card.Description>
	</Card.Header>
	<Card.Content>
		<ul>
			<li>
				<a href="https://www.nmkr.io/" target="_blank" class="link">NMKR Website</a>
				<p class="text-sm font-thin text-white">Official NMKR platform and documentation.</p>
			</li>
			<li>
				<a href="https://docs.nmkr.io/" target="_blank" class="link">NMKR Documentation</a>
				<p class="text-sm font-thin text-white">Complete API documentation and guides.</p>
			</li>
			<li>
				<a href="https://cardanoscan.io/" target="_blank" class="link">CardanoScan</a>
				<p class="text-sm font-thin text-white">Blockchain explorer to view your transactions and NFTs.</p>
			</li>
			<li>
				<a href="https://cexplorer.io/" target="_blank" class="link">Cexplorer</a>
				<p class="text-sm font-thin text-white">Another Cardano blockchain explorer.</p>
			</li>
		</ul>
	</Card.Content>
</Card.Root>

<WorkshopNavigation />

