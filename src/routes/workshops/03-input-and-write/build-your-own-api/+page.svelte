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
		<h1 class="text-lg font-normal text-white sm:max-w-[50%]">Workshop 03: Input and Write</h1>
	</a>
	<h2 class="text-6xl font-medium text-white sm:max-w-[50%]">
		Build your own API to put data on chain
	</h2>
	<p class="text-lg font-thin text-white sm:max-w-[50%]">
		You will learn how to setup a really simple API with NodeJs and how to create and submit a mint
		transaction on chain using Blockfrost using the data from your Microcontroller. We will also
		look into how to utilize the touch screen capabilities of your microcontroller.
	</p>
</section>

<SectionNavigator>
	<section class="mb-16 flex flex-col gap-4 text-white">
		<h2 class="text-4xl font-medium">Setting up Node.js API</h2>
		<p class="text-lg font-thin text-white">
			In this step, we'll create a simple Node.js API server that receives sensor data from your
			microcontroller and prepares it for minting on the Cardano blockchain. This API will act as a
			bridge between your microcontroller and the blockchain.
		</p>
		<p class="text-lg font-thin text-white">
			<strong>Prerequisites:</strong>
		</p>
		<ul>
			<li>Node.js installed on your computer (version 14 or higher)</li>
			<li>npm (Node Package Manager) - comes with Node.js</li>
			<li>A text editor or IDE (VS Code, Cursor, etc.)</li>
		</ul>
		<p class="text-lg font-thin text-white">
			<strong>Creating the Project:</strong>
		</p>
		<ol>
			<li>Create a new directory for your project</li>
			<li>Open a terminal in that directory</li>
			<li>
				Run <code class="rounded bg-gray-800 px-2 py-1 text-white">npm init -y</code> to initialize a
				new Node.js project
			</li>
			<li>
				Install required packages: <code class="rounded bg-gray-800 px-2 py-1 text-white"
					>npm install express cors axios @blockfrost/blockfrost-js</code
				>
			</li>
		</ol>
		<p class="text-lg font-thin text-white">
			<strong>Basic API Structure:</strong>
		</p>
		<Card.Root>
			<Card.Header class="mb-0 pb-0">
				<Card.Title>Node.js API Server</Card.Title>
			</Card.Header>
			<Card.Content>
				<SyntaxHighlighter language="javascript" code={data.nodeApiCode} />
			</Card.Content>
			<Card.Footer>
				<p class="text-xs leading-relaxed">
					This is a basic Express.js server that receives POST requests with sensor data. Save this
					as
					<code>server.js</code> in your project directory. Make sure to replace the Blockfrost API key
					with your own (get one free at blockfrost.io).
				</p>
			</Card.Footer>
		</Card.Root>
		<p class="text-lg font-thin text-white">
			<strong>Package.json:</strong>
		</p>
		<Card.Root>
			<Card.Header class="mb-0 pb-0">
				<Card.Title>package.json</Card.Title>
			</Card.Header>
			<Card.Content>
				<SyntaxHighlighter language="json" code={data.packageJson} />
			</Card.Content>
		</Card.Root>
		<p class="text-lg font-thin text-white">
			To start the server, run <code class="rounded bg-gray-800 px-2 py-1 text-white"
				>node server.js</code
			>
			or
			<code class="rounded bg-gray-800 px-2 py-1 text-white">npm start</code> in your project
			directory. The server will run on
			<code class="rounded bg-gray-800 px-2 py-1 text-white">http://localhost:3000</code>.
		</p>
	</section>

	<section class="mb-16 flex flex-col gap-4 text-white">
		<h2 class="text-4xl font-medium">Sending Data from Microcontroller</h2>
		<p class="text-lg font-thin text-white">
			Now let's modify your microcontroller code to send sensor data to your API server. You'll need
			to know your computer's IP address on your local network (or use a service like ngrok if you
			want to expose it to the internet).
		</p>
		<p class="text-lg font-thin text-white">
			<strong>Finding Your IP Address:</strong>
		</p>
		<ul>
			<li>
				<strong>Windows:</strong> Open Command Prompt and run
				<code class="rounded bg-gray-800 px-2 py-1 text-white">ipconfig</code>
			</li>
			<li>
				<strong>Mac/Linux:</strong> Open Terminal and run
				<code class="rounded bg-gray-800 px-2 py-1 text-white">ifconfig</code>
				or <code class="rounded bg-gray-800 px-2 py-1 text-white">ip addr</code>
			</li>
			<li>Look for your local network IP (usually starts with 192.168.x.x or 10.x.x.x)</li>
		</ul>
		<Card.Root>
			<Card.Header class="mb-0 pb-0">
				<Card.Title>Arduino Code - Sending to API</Card.Title>
			</Card.Header>
			<Card.Content>
				<SyntaxHighlighter language="cpp" code={data.arduinoApiCall} />
			</Card.Content>
			<Card.Footer>
				<p class="text-xs leading-relaxed">
					This code reads sensor data and sends it to your Node.js API every minute. Replace
					<code>your-server-ip</code> with your computer's IP address. Make sure your microcontroller
					and computer are on the same WiFi network.
				</p>
			</Card.Footer>
		</Card.Root>
	</section>

	<section class="mb-16 flex flex-col gap-4 text-white">
		<h2 class="text-4xl font-medium">Integrating Blockfrost</h2>
		<p class="text-lg font-thin text-white">
			Blockfrost is a Cardano API service that provides easy access to blockchain data and
			transaction submission. To use it:
		</p>
		<ol>
			<li>Go to <a href="https://blockfrost.io/" target="_blank" class="link">blockfrost.io</a></li>
			<li>Sign up for a free account</li>
			<li>Create a new project (select Preprod Testnet for testing)</li>
			<li>Copy your API key</li>
		</ol>
		<p class="text-lg font-thin text-white">
			<strong>Note:</strong> Creating and submitting mint transactions requires additional libraries
			and more complex code. For a complete implementation, you'll need:
		</p>
		<ul>
			<li>
				<code class="rounded bg-gray-800 px-2 py-1 text-white"
					>@cardano-foundation/cardano-connect-with-wallet</code
				> - For wallet integration
			</li>
			<li>
				<code class="rounded bg-gray-800 px-2 py-1 text-white"
					>@emurgo/cardano-serialization-lib</code
				> - For transaction building
			</li>
			<li>Or use a service like NMKR (covered in the next step) for simpler minting</li>
		</ul>
		<p class="text-lg font-thin text-white">
			The example code above shows the basic structure. For a production implementation, you would
			need to:
		</p>
		<ul>
			<li>Build the transaction using Cardano serialization libraries</li>
			<li>Sign the transaction with a wallet or private key</li>
			<li>Submit the signed transaction to the network</li>
		</ul>
		<p class="text-lg font-thin text-white">
			This is a complex topic that requires understanding of Cardano's transaction structure, UTXO
			model, and native asset minting. For beginners, using a service like NMKR (covered in step 3)
			is recommended.
		</p>
	</section>

	<section class="mb-16 flex flex-col gap-4 text-white">
		<h2 class="text-4xl font-medium">Touch Screen Integration</h2>
		<p class="text-lg font-thin text-white">
			If your microcontroller has a touch screen (like the D1 Mini with TFT display), you can add a
			button to trigger minting manually. This gives you control over when to mint NFTs with your
			sensor data.
		</p>
		<Card.Root>
			<Card.Header class="mb-0 pb-0">
				<Card.Title>Touch Screen Button Example</Card.Title>
			</Card.Header>
			<Card.Content>
				<SyntaxHighlighter language="cpp" code={data.touchScreenCode} />
			</Card.Content>
			<Card.Footer>
				<p class="text-xs leading-relaxed">
					This example shows how to create a touch button on your TFT display. When the button is
					pressed, it triggers a mint request. You'll need to integrate this with your API call to
					actually send the mint request to your server.
				</p>
			</Card.Footer>
		</Card.Root>
		<p class="text-lg font-thin text-white">
			<strong>How it works:</strong>
		</p>
		<ul>
			<li>
				The <i>drawMintButton()</i> function draws a button on the screen with the text "MINT NFT"
			</li>
			<li>
				In the <i>loop()</i> function, we check for touch input using <i>tft.getTouch()</i>
			</li>
			<li>
				If a touch is detected within the button area, we call <i>triggerMint()</i>
			</li>
			<li>Debouncing prevents multiple triggers from a single touch</li>
		</ul>
		<p class="text-lg font-thin text-white">You can enhance this by:</p>
		<ul>
			<li>Adding visual feedback when the button is pressed</li>
			<li>Showing a loading indicator while the mint is processing</li>
			<li>Displaying the transaction ID after successful minting</li>
			<li>Adding multiple buttons for different actions</li>
		</ul>
	</section>

	<section class="mb-16 flex flex-col gap-4 text-white">
		<h2 class="text-4xl font-medium">Submitting to the Blockchain</h2>
		<p class="text-lg font-thin text-white">
			<strong>Important Note:</strong> Creating and submitting mint transactions is a complex process
			that involves:
		</p>
		<ul>
			<li>Building the transaction structure</li>
			<li>Calculating fees</li>
			<li>Signing with a wallet or private key</li>
			<li>Submitting to the network</li>
		</ul>
		<p class="text-lg font-thin text-white">
			For a complete implementation, you would need to use Cardano's serialization libraries and
			understand the transaction format. This is beyond the scope of this introductory workshop.
		</p>
		<p class="text-lg font-thin text-white">
			<strong>Alternative Approaches:</strong>
		</p>
		<ul>
			<li>
				<strong>Use NMKR:</strong> The next step covers using NMKR's API, which handles all the complex
				transaction building for you
			</li>
			<li>
				<strong>Use Cardano CLI:</strong> For advanced users, you can use the Cardano command-line tools
				to build and submit transactions
			</li>
			<li>
				<strong>Use a Wallet SDK:</strong> Libraries like Eternl or Begin provide JavaScript SDKs for
				building transactions
			</li>
		</ul>
		<p class="text-lg font-thin text-white">
			The API structure we've built here provides a foundation. You can extend it to:
		</p>
		<ul>
			<li>Store sensor data in a database</li>
			<li>Create metadata for NFTs</li>
			<li>Queue mint requests</li>
			<li>Track minting status</li>
			<li>Integrate with wallet services</li>
		</ul>
	</section>

	<FurtherResources
		resources={[
			{
				title: 'Express.js Documentation',
				url: 'https://expressjs.com/',
				description: 'Learn more about building APIs with Express.'
			},
			{
				title: 'Blockfrost',
				url: 'https://blockfrost.io/',
				description: 'Cardano API service for blockchain data.'
			},
			{
				title: 'Cardano Documentation',
				url: 'https://docs.cardano.org/',
				description: 'Official Cardano documentation and guides.'
			},
			{
				title: 'Cardano Developer Portal',
				url: 'https://developers.cardano.org/',
				description: 'Resources for Cardano developers.'
			}
		]}
	/>
</SectionNavigator>

<WorkshopNavigation />
