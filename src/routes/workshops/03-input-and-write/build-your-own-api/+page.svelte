<script>
	import { page } from '$app/state';
	import SectionNavigator from '$lib/components/SectionNavigator.svelte';
	import WorkshopNavigation from '$lib/WorkshopNavigation.svelte';
	import CodeCard from '$lib/components/CodeCard.svelte';
	import SyntaxHighlighter from '$lib/components/SyntaxHighlighter.svelte';
	import FurtherResources from '$lib/components/FurtherResources.svelte';
	import TipBox from '$lib/components/TipBox.svelte';
	import PingPongWallet from '$lib/base/PingPongWallet.svelte';
	import * as Card from '$lib/components/ui/card/index.js';
	import { MoveLeft } from 'lucide-svelte';
	let parentPage = $derived(page.url.pathname.split('/')[2]);
	let { data } = $props();

	const meshTransactionHowItWorks = `
		<h3>Overview</h3>
		<p>This example demonstrates how to create and submit a Cardano transaction using Mesh. It shows how to send ADA from your wallet to another address on the testnet, including metadata. The transaction is built, signed, and submitted to the blockchain.</p>
		
		<h3>Key Concepts</h3>
		<ul>
			<li><strong>MeshTxBuilder:</strong> A low-level transaction builder that provides fine-grained control over transaction construction. It's the foundation that higher-level APIs like <code>wallet.buildTx()</code> use internally.</li>
			<li><strong>Transaction Building:</strong> Creating a transaction structure that specifies inputs (UTXOs to spend), outputs (recipient address and amount), and metadata.</li>
			<li><strong>UTXO Selection:</strong> The process of choosing which unspent transaction outputs (UTXOs) to use as inputs for funding the transaction. <code>selectUtxosFrom()</code> automatically selects the necessary UTXOs.</li>
			<li><strong>Change Address:</strong> The address that receives any remaining funds after the transaction (input amount minus output amount minus fees).</li>
			<li><strong>Transaction Metadata:</strong> Additional data attached to transactions that can include messages, timestamps, or any structured information. Metadata is permanently stored on the blockchain.</li>
			<li><strong>Metadata Labels:</strong> Numbers (0-65535) that categorize metadata. Common labels include 674 (message, CIP-20) and 721 (NFT metadata, CIP-25).</li>
			<li><strong>Transaction Signing:</strong> Cryptographically signing the transaction with your wallet's private key to prove ownership.</li>
			<li><strong>Transaction Submission:</strong> Sending the signed transaction to the Cardano network for processing.</li>
			<li><strong>Lovelace:</strong> The smallest unit of ADA (1 ADA = 1,000,000 Lovelace). Transactions use Lovelace for precision.</li>
			<li><strong>Transaction Hash:</strong> A unique identifier for the transaction that can be used to track it on the blockchain explorer.</li>
		</ul>
		
		<h3>How the Code Works</h3>
		<ol>
			<li><strong>Initialize Wallet:</strong> Creates a MeshWallet instance from your mnemonic, same as the balance example.</li>
			<li><strong>Set Transaction Details:</strong> Defines the recipient address and amount to send (in ADA, then converted to Lovelace).</li>
			<li><strong>Create Metadata:</strong> Defines metadata with label 674 (CIP-20 standard for messages) containing an array of message strings.</li>
			<li><strong>Get Wallet Data:</strong> Fetches UTXOs (unspent transaction outputs) and the change address from the wallet. UTXOs are needed to fund the transaction, and the change address receives any remaining funds after the transaction.</li>
			<li><strong>Initialize MeshTxBuilder:</strong> Creates a <code>MeshTxBuilder</code> instance with the provider. <code>MeshTxBuilder</code> provides low-level APIs for building transactions with more control than the higher-level <code>wallet.buildTx()</code> method.</li>
			<li><strong>Build Transaction:</strong> Uses <code>MeshTxBuilder</code> to construct the transaction:
				<ul>
					<li><code>.txOut()</code> - Specifies the output: recipient address and amount in lovelace</li>
					<li><code>.changeAddress()</code> - Sets the address to receive change (remaining funds after transaction)</li>
					<li><code>.metadataValue()</code> - Attaches metadata to the transaction (label 674 for messages)</li>
					<li><code>.selectUtxosFrom()</code> - Automatically selects UTXOs from the provided list to fund the transaction</li>
					<li><code>.complete()</code> - Finalizes the transaction structure and returns the unsigned transaction</li>
				</ul>
			</li>
			<li><strong>Sign Transaction:</strong> Uses <code>wallet.signTx()</code> to cryptographically sign the transaction with your wallet's private key.</li>
			<li><strong>Submit Transaction:</strong> Uses <code>wallet.submitTx()</code> to send the signed transaction to the Cardano network via the Koios provider.</li>
			<li><strong>Get Transaction Hash:</strong> The submission returns a transaction hash that can be used to track the transaction on a blockchain explorer.</li>
		</ol>
		
		<h3>Transaction Metadata</h3>
		<p>Metadata allows you to attach additional information to transactions that is permanently stored on the blockchain. This is useful for:</p>
		<ul>
			<li><strong>Messages:</strong> Adding text messages or notes to transactions (label 674)</li>
			<li><strong>Tracking:</strong> Including timestamps, source information, or version numbers</li>
			<li><strong>NFT Data:</strong> Storing NFT metadata (label 721) for minting operations</li>
			<li><strong>Custom Data:</strong> Any structured JSON data you want to store on-chain</li>
		</ul>
		<p><strong>Metadata Structure:</strong></p>
		<ul>
			<li>Metadata labels must be numbers between 0 and 65535</li>
			<li>Each label can contain any valid JSON structure</li>
			<li>Multiple metadata labels can be attached to a single transaction</li>
			<li>Metadata increases transaction size and fees slightly</li>
		</ul>
		<p><strong>Common Metadata Labels:</strong></p>
		<ul>
			<li><strong>674:</strong> Message metadata (CIP-20 standard)</li>
			<li><strong>721:</strong> NFT metadata (CIP-25 standard)</li>
			<li><strong>100-999:</strong> Custom labels for application-specific data</li>
		</ul>
		
		<h3>Transaction Process</h3>
		<p>The transaction process follows these steps:</p>
		<ol>
			<li><strong>Build:</strong> Create the transaction structure with inputs (UTXOs to spend), outputs (recipient address and amount), and metadata.</li>
			<li><strong>Calculate Fees:</strong> The network automatically calculates transaction fees based on transaction size (including metadata) and network conditions.</li>
			<li><strong>Sign:</strong> Sign the transaction with your private key to prove you own the funds being spent.</li>
			<li><strong>Submit:</strong> Send the signed transaction to the network for validation and inclusion in a block.</li>
			<li><strong>Confirm:</strong> Wait for the transaction to be included in a block (usually takes a few seconds to minutes).</li>
		</ol>
		
		<h3>Running the Script</h3>
		<ol>
			<li>Make sure you have <code>@meshsdk/core</code> installed: <code>npm install @meshsdk/core</code></li>
			<li>Set your <code>WALLET_MNEMONIC</code> environment variable in a <code>.env</code> file</li>
			<li>Update the <code>recipientAddress</code> variable with a valid testnet address</li>
			<li>Customize the metadata object to include your own data (messages, timestamps, etc.)</li>
			<li>Make sure your wallet has enough tADA to cover the transaction amount plus fees</li>
			<li>Run the script: <code>node send-transaction.js</code></li>
			<li>You should see the transaction hash printed to the console</li>
			<li>Use the Cardano Explorer link to view your transaction and its metadata on the blockchain</li>
		</ol>
		
		<h3>Important Notes</h3>
		<ul>
			<li><strong>Testnet Only:</strong> Always use testnet addresses (starting with <code>addr_test1</code>) for development.</li>
			<li><strong>Transaction Fees:</strong> Every transaction requires a small fee (usually around 0.17-0.2 ADA). Metadata increases the transaction size, which may slightly increase fees.</li>
			<li><strong>Irreversible:</strong> Once submitted, transactions cannot be reversed. Always double-check the recipient address and amount.</li>
			<li><strong>Network Confirmation:</strong> Transactions may take a few seconds to minutes to be confirmed and appear on the blockchain.</li>
			<li><strong>Change Output:</strong> If you send less than your total balance, the remaining amount (minus fees) is automatically sent back to your wallet as change.</li>
			<li><strong>Metadata Visibility:</strong> All metadata is publicly visible on the blockchain explorer. Don't include sensitive information.</li>
		</ul>
		
		<h3>Viewing Metadata</h3>
		<p>After submitting a transaction with metadata, you can view it on Cardano blockchain explorers:</p>
		<ul>
			<li>Open the transaction hash link provided in the console output</li>
			<li>Look for the "Metadata" or "Transaction Metadata" section</li>
			<li>You'll see all metadata labels and their associated data</li>
			<li>Metadata is permanently stored and cannot be modified or deleted</li>
		</ul>
		
		<h3>Testing Transactions</h3>
		<p>For testing, you can use the CardanoThings PingPong wallet address (available in the Cardano Setup workshop). The PingPong wallet automatically sends transactions back to you, making it perfect for testing transaction flows with metadata.</p>
	`;

	const meshWalletHowItWorks = `
		<h3>Overview</h3>
		<p>This simple example demonstrates how to use Mesh with the Koios provider to fetch and display your wallet balance. It's a standalone script that initializes a wallet from your mnemonic and logs the balance information to the console.</p>
		
		<h3>Key Concepts</h3>
		<ul>
			<li><strong>KoiosProvider:</strong> A data provider that connects to Koios API to fetch blockchain data. Koios is free to use and doesn't require an API key.</li>
			<li><strong>MeshWallet:</strong> A wallet instance created from your mnemonic passphrase. It provides methods to interact with your wallet.</li>
			<li><strong>getChangeAddress():</strong> Returns the wallet's change address (the address where change from transactions is sent).</li>
			<li><strong>getBalance():</strong> Fetches the wallet balance as an array of assets. Returns <code>[{ unit: 'lovelace', quantity: '...' }, ...]</code> where the first item is always lovelace (ADA). This is a convenient method that automatically calculates the balance from all available funds.</li>
		</ul>
		
		<h3>How the Code Works</h3>
		<ol>
			<li><strong>Initialize Provider:</strong> Creates a KoiosProvider instance for the Preprod testnet.</li>
			<li><strong>Load Mnemonic:</strong> Reads the mnemonic from the mnemonic array in the code.</li>
			<li><strong>Create Wallet:</strong> Initializes a MeshWallet instance with the mnemonic and provider.</li>
			<li><strong>Fetch Balance:</strong> The <code>fetchWalletBalance()</code> function:
				<ul>
					<li>Gets the wallet address using <code>getChangeAddress()</code></li>
					<li>Fetches the wallet balance using <code>getBalance()</code> which returns an array of assets</li>
					<li>Extracts the lovelace amount from the array by finding the asset with <code>unit === 'lovelace'</code></li>
					<li>Converts from Lovelace to ADA (1 ADA = 1,000,000 Lovelace)</li>
					<li>Logs the wallet address and balance to the console</li>
				</ul>
			</li>
		</ol>
		
		<h3>Running the Script</h3>
		<ol>
			<li>Make sure you have <code>@meshsdk/core</code> installed: <code>npm install @meshsdk/core</code></li>
			<li>Set your <code>WALLET_MNEMONIC</code> environment variable in a <code>.env</code> file</li>
			<li>Run the script: <code>node wallet-balance.js</code></li>
			<li>You should see your wallet address and balance in ADA and Lovelace printed to the console</li>
		</ol>
		
		<h3>Security Notes</h3>
		<ul>
			<li>Always store your mnemonic in environment variables, never in code</li>
			<li>Use testnet wallets for development and testing</li>
			<li>Never commit files containing mnemonics to version control</li>
		</ul>
	`;

	const meshHowItWorks = `
		<h3>Overview</h3>
		<p>This complete API server combines Express.js with Mesh to create a REST API that can interact with Cardano wallets and submit transactions. It includes endpoints to retrieve wallet information and create/submit transactions with metadata using the wallet instance initialized from your mnemonic.</p>
		
		<h3>Key Concepts</h3>
		<ul>
			<li><strong>Express.js:</strong> Web framework for creating the API server and handling HTTP requests.</li>
			<li><strong>KoiosProvider:</strong> Data provider that connects to Koios API to fetch blockchain data. Koios is free to use and doesn't require an API key.</li>
			<li><strong>MeshWallet:</strong> Wallet instance created from your mnemonic passphrase, initialized once at server startup.</li>
			<li><strong>MeshTxBuilder:</strong> Low-level transaction builder that provides fine-grained control over transaction construction.</li>
			<li><strong>GET /wallet:</strong> API endpoint that uses the wallet instance to fetch and return wallet information.</li>
			<li><strong>POST /transaction:</strong> API endpoint that accepts transaction parameters, builds a transaction with metadata, signs it, and submits it to the blockchain.</li>
		</ul>
		
		<h3>How the API Works</h3>
		<ol>
			<li><strong>Server Initialization:</strong> The server starts and initializes the Koios provider and Mesh wallet from the environment variable.</li>
			<li><strong>Wallet Setup:</strong> The wallet is created once at startup, not per request, making it efficient.</li>
			<li><strong>GET /wallet Endpoint:</strong> When a GET request is made to <code>/wallet</code>:
				<ul>
					<li>The endpoint uses the pre-initialized wallet instance</li>
					<li>Fetches the wallet address using <code>getChangeAddress()</code></li>
					<li>Fetches the wallet balance using <code>getBalance()</code> which returns an array of assets</li>
					<li>Extracts the lovelace amount from the balance array</li>
					<li>Converts from Lovelace to ADA</li>
					<li>Returns JSON response with wallet information</li>
				</ul>
			</li>
			<li><strong>POST /transaction Endpoint:</strong> When a POST request is made to <code>/transaction</code>:
				<ul>
					<li>Validates the request body (recipientAddress, amount, optional metadata)</li>
					<li>Converts the amount from ADA to Lovelace</li>
					<li>Gets wallet UTXOs and change address</li>
					<li>Initializes MeshTxBuilder to build the transaction</li>
					<li>Adds transaction output, change address, and metadata</li>
					<li>Selects UTXOs to fund the transaction</li>
					<li>Signs the transaction with the wallet</li>
					<li>Submits the transaction to the Cardano network</li>
					<li>Returns the transaction hash and explorer URL</li>
				</ul>
			</li>
		</ol>
		
		<h3>API Endpoints</h3>
		<ul>
			<li><strong>GET /wallet:</strong> Retrieves wallet information including address and balance. Uses the wallet instance initialized from the mnemonic array in the code.</li>
			<li><strong>POST /transaction:</strong> Creates and submits a transaction. Requires <code>recipientAddress</code> and <code>amount</code> in the request body. Optional <code>metadata</code> can be included. Returns transaction hash and explorer URL.</li>
			<li><strong>GET /health:</strong> Health check endpoint to verify the server is running.</li>
		</ul>
		
		<h3>POST /transaction Request Body</h3>
		<p>The POST /transaction endpoint expects a JSON body with the following structure:</p>
		<pre><code>{
  "recipientAddress": "addr_test1...",  // Required: Cardano testnet address
  "amount": 1.0,                        // Required: Amount in ADA
  "metadata": {                          // Optional: Transaction metadata
    "674": {
      "msg": ["Your message here"]
    }
  }
}</code></pre>
		
		<h3>Testing with Insomnia</h3>
		<ol>
			<li>Start your server with <code>node server.js</code></li>
			<li>Make sure your <code>WALLET_MNEMONIC</code> environment variable is set</li>
			<li><strong>Test GET /wallet:</strong>
				<ul>
					<li>Open Insomnia and create a new GET request to <code>http://localhost:3000/wallet</code></li>
					<li>Click Send to get your wallet information</li>
					<li>You should receive a response with your wallet address and balance in Lovelace and ADA</li>
				</ul>
			</li>
			<li><strong>Test POST /transaction:</strong>
				<ul>
					<li>Create a new POST request to <code>http://localhost:3000/transaction</code></li>
					<li>In the Body tab, select JSON format</li>
					<li>Enter the transaction data:
						<pre><code>{
  "recipientAddress": "addr_test1...",
  "amount": 1.0,
  "metadata": {
    "674": {
      "msg": ["Hello from API!"]
    }
  }
}</code></pre>
					</li>
					<li>Click Send to submit the transaction</li>
					<li>You should receive a response with the transaction hash and explorer URL</li>
					<li>Use the explorer URL to view your transaction on the blockchain</li>
				</ul>
			</li>
		</ol>
		
		<h3>Security Considerations</h3>
		<ul>
			<li><strong>Never expose private keys or mnemonics:</strong> Keep sensitive wallet information secure and never include it in your API code or environment variables that might be exposed.</li>
			<li><strong>Testnet only:</strong> Always use 'preprod' for testnet development. Only switch to 'api' (mainnet) when deploying production applications.</li>
			<li><strong>Input validation:</strong> The endpoint validates required fields and amount values. In production, add more robust validation and sanitization.</li>
			<li><strong>Rate limiting:</strong> Implement rate limiting to prevent abuse of your API endpoints. Koios has rate limits, so be mindful of request frequency.</li>
			<li><strong>Transaction fees:</strong> Make sure your wallet has enough balance to cover transaction amounts plus fees (usually around 0.17-0.2 ADA).</li>
			<li><strong>No API key needed:</strong> Koios is free and doesn't require an API key, making it perfect for development and testing.</li>
		</ul>
	`;

	const basicApiHowItWorks = `
		<h3>Overview</h3>
		<p>This is the simplest possible Express.js API server. It creates a basic HTTP server with a single health check endpoint. This is a great starting point to verify your server is working correctly.</p>
		
		<h3>Key Concepts</h3>
		<ul>
			<li><strong>Express.js:</strong> A minimal web framework for Node.js that simplifies creating HTTP servers and handling routes.</li>
			<li><strong>ESM Modules:</strong> Modern JavaScript module system using <code>import</code> and <code>export</code> instead of CommonJS <code>require()</code>.</li>
			<li><strong>Health Check Endpoint:</strong> A simple endpoint that returns server status, useful for monitoring and testing if the server is running.</li>
		</ul>
		
		<h3>How it Works</h3>
		<ol>
			<li><strong>Import Express:</strong> The code imports the Express framework.</li>
			<li><strong>Create App Instance:</strong> Creates an Express application instance.</li>
			<li><strong>Define Route:</strong> Sets up a GET route at <code>/health</code> that returns a JSON response with status and timestamp.</li>
			<li><strong>Start Server:</strong> The server listens on port 3000 and logs a message when it's ready.</li>
		</ol>
		
		<h3>Testing the Server</h3>
		<ol>
			<li>Start the server: <code>node server.js</code></li>
			<li>Open your browser or use Insomnia to send a GET request to <code>http://localhost:3000/health</code></li>
			<li>You should receive a JSON response: <code>{"status": "ok", "timestamp": "..."}</code></li>
		</ol>
	`;

	const enhancedApiHowItWorks = `
		<h3>Overview</h3>
		<p>This enhanced API server adds a POST endpoint to receive and store data, and a GET endpoint to retrieve the stored data. It includes CORS middleware to allow cross-origin requests and JSON parsing middleware to handle JSON request bodies. Data is stored in memory using a variable (in production, you would use a database).</p>
		
		<h3>Key Concepts</h3>
		<ul>
			<li><strong>CORS:</strong> Cross-Origin Resource Sharing middleware that allows the API to accept requests from different origins (domains, ports, or protocols).</li>
			<li><strong>JSON Middleware:</strong> The <code>express.json()</code> middleware automatically parses incoming JSON request bodies into JavaScript objects.</li>
			<li><strong>POST Endpoint:</strong> An endpoint that accepts data in the request body, stores it in a variable, and returns a success response.</li>
			<li><strong>GET Endpoint:</strong> An endpoint that retrieves and returns the stored data.</li>
			<li><strong>Data Storage:</strong> Data is stored in a variable (<code>storedData</code>) in memory. Note that this data will be lost when the server restarts. In production, use a database.</li>
			<li><strong>Error Handling:</strong> Try-catch blocks to handle errors gracefully and return appropriate error responses.</li>
		</ul>
		
		<h3>How it Works</h3>
		<ol>
			<li><strong>Data Storage Variable:</strong> A variable <code>storedData</code> is declared at the top level to store received data in memory.</li>
			<li><strong>Middleware Setup:</strong> CORS and JSON parsing middleware are added to handle cross-origin requests and parse JSON bodies.</li>
			<li><strong>POST /data Endpoint:</strong> 
				<ul>
					<li>Accepts POST requests with JSON data in the body</li>
					<li>Stores the received data in the <code>storedData</code> variable</li>
					<li>Logs the data to the console for debugging</li>
					<li>Returns a success response with the received data</li>
				</ul>
			</li>
			<li><strong>GET /data Endpoint:</strong>
				<ul>
					<li>Retrieves the data stored in the <code>storedData</code> variable</li>
					<li>Returns a 404 error if no data has been stored yet</li>
					<li>Returns the stored data in a JSON response if available</li>
				</ul>
			</li>
			<li><strong>Error Handling:</strong> If an error occurs, it's caught and a 500 status code with an error message is returned.</li>
			<li><strong>Health Check:</strong> The original health check endpoint remains available for testing.</li>
		</ol>
		
		<h3>API Endpoints</h3>
		<ul>
			<li><strong>POST /data:</strong> Receives JSON data in the request body, stores it in memory, and returns a success response with the received data.</li>
			<li><strong>GET /data:</strong> Retrieves and returns the stored data. Returns a 404 error if no data has been stored yet.</li>
			<li><strong>GET /health:</strong> Health check endpoint that returns server status and current timestamp.</li>
		</ul>
		
		<h3>Testing with Insomnia</h3>
		<ol>
			<li>Start your server: <code>node server.js</code></li>
			<li><strong>Store Data:</strong>
				<ul>
					<li>Open Insomnia and create a new POST request to <code>http://localhost:3000/data</code></li>
					<li>In the Body tab, select JSON format</li>
					<li>Enter your JSON data (e.g., <code>{"temperature": 23.5, "humidity": 65.2}</code>)</li>
					<li>Click Send to make the request</li>
					<li>You should see a success response confirming the data was stored</li>
				</ul>
			</li>
			<li><strong>Retrieve Data:</strong>
				<ul>
					<li>Create a new GET request to <code>http://localhost:3000/data</code></li>
					<li>Click Send to retrieve the stored data</li>
					<li>You should receive the data you previously sent via POST</li>
				</ul>
			</li>
		</ol>
		
		<h3>Important Notes</h3>
		<ul>
			<li><strong>In-Memory Storage:</strong> Data stored in the variable will be lost when the server restarts. This is fine for testing, but use a database (MongoDB, PostgreSQL, etc.) for production applications.</li>
			<li><strong>Single Data Item:</strong> This example stores only one data item. Each new POST request will overwrite the previous data. For multiple items, use an array or a database.</li>
		</ul>
		
		<h3>Next Steps</h3>
		<ul>
			<li>Store multiple data items using an array</li>
			<li>Add validation to ensure incoming data meets your requirements</li>
			<li>Store data in a database (MongoDB, PostgreSQL, etc.) for persistence</li>
			<li>Add authentication to secure your API endpoints</li>
			<li>Add more endpoints for different operations (PUT, DELETE)</li>
			<li>Implement rate limiting to prevent abuse</li>
		</ul>
	`;
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
		You will learn how to setup a really simple API with NodeJs to receive and process data.
	</p>
</section>

<SectionNavigator>
	<section class="mb-16 flex flex-col gap-4 text-white">
		<h2 class="text-4xl font-medium">Setting up Node.js API</h2>
		<p class="text-lg font-thin text-white">
			In this step, we'll create a simple Node.js API server that can receive and process data.
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
				Install Express: <code class="rounded bg-gray-800 px-2 py-1 text-white"
					>npm install express</code
				>
			</li>
		</ol>
		<p class="text-lg font-thin text-white">
			<strong>Basic API Structure:</strong>
		</p>
		<CodeCard
			title="Basic Node.js API Server"
			code={data.basicApiCode}
			language="javascript"
			githubLink="https://github.com/CardanoThings/Workshops/tree/main/Workshop-03/examples/nodejs-express-api-basics"
			howItWorksContent={basicApiHowItWorks}
			footerText="This is a minimal Express.js server with a health check endpoint. Save this as server.js in your project directory. Make sure your package.json includes 'type: module' to use ESM syntax."
		/>
		<p class="text-lg font-thin text-white">
			<strong>Important:</strong> Make sure your
			<code class="rounded bg-gray-800 px-2 py-1 text-white">package.json</code>
			includes <code class="rounded bg-gray-800 px-2 py-1 text-white">"type": "module"</code> to use
			ESM syntax.
		</p>
		<p class="text-lg font-thin text-white">
			To start the server, run <code class="rounded bg-gray-800 px-2 py-1 text-white"
				>node server.js</code
			>
			or
			<code class="rounded bg-gray-800 px-2 py-1 text-white">npm start</code> in your project
			directory. The server will run on
			<code class="rounded bg-gray-800 px-2 py-1 text-white">http://localhost:3000</code>.
		</p>
		<p class="text-lg font-thin text-white">
			Test the health endpoint by opening <code class="rounded bg-gray-800 px-2 py-1 text-white"
				>http://localhost:3000/health</code
			> in your browser or using Insomnia. You should see a JSON response with the server status.
		</p>
	</section>

	<section class="mb-16 flex flex-col gap-4 text-white">
		<h2 class="text-4xl font-medium">Adding a POST Endpoint</h2>
		<p class="text-lg font-thin text-white">
			Now let's enhance the API by adding a POST endpoint to receive and process data. This will
			allow your API to accept data from external sources like microcontrollers or other
			applications.
		</p>
		<p class="text-lg font-thin text-white">
			<strong>What we're adding:</strong>
		</p>
		<ul>
			<li>CORS middleware to allow cross-origin requests</li>
			<li>JSON parsing middleware to handle JSON request bodies</li>
			<li>A POST endpoint at <code>/data</code> to receive and store data</li>
			<li>A GET endpoint at <code>/data</code> to retrieve stored data</li>
			<li>In-memory data storage using a variable</li>
			<li>Error handling for robust API responses</li>
		</ul>
		<p class="text-lg font-thin text-white">
			<strong>Installing Additional Dependencies:</strong>
		</p>
		<p class="text-lg font-thin text-white">
			Install the CORS package: <code class="rounded bg-gray-800 px-2 py-1 text-white"
				>npm install cors</code
			>
		</p>
		<p class="text-lg font-thin text-white">
			<strong>Enhanced API with POST Endpoint:</strong>
		</p>
		<CodeCard
			title="Enhanced Node.js API with POST Endpoint"
			code={data.enhancedApiCode}
			language="javascript"
			githubLink="https://github.com/CardanoThings/Workshops/tree/main/Workshop-03/examples/nodejs-express-api-basics"
			howItWorksContent={enhancedApiHowItWorks}
			footerText="This enhanced API includes CORS support and a POST endpoint to receive data. Save this as server.js. Make sure to install express and cors, and that your package.json includes 'type: module' to use ESM syntax."
		/>
		<p class="text-lg font-thin text-white">
			<strong>Testing the POST Endpoint:</strong>
		</p>
		<ol>
			<li>
				Start your server: <code class="rounded bg-gray-800 px-2 py-1 text-white"
					>node server.js</code
				>
			</li>
			<li>
				Open Insomnia and create a new POST request to
				<code class="rounded bg-gray-800 px-2 py-1 text-white">http://localhost:3000/data</code>
			</li>
			<li>
				In the Body tab, select JSON format and enter some data:
				<code class="rounded bg-gray-800 px-2 py-1 text-white"
					>{'{'}"temperature": 23.5, "humidity": 65.2{'}'}</code
				>
			</li>
			<li>Click Send - you should receive a success response confirming the data was stored</li>
			<li>
				Create a new GET request to
				<code class="rounded bg-gray-800 px-2 py-1 text-white">http://localhost:3000/data</code>
				to retrieve the stored data
			</li>
			<li>Click Send - you should receive the data you previously sent via POST</li>
		</ol>
		<p class="text-lg font-thin text-white">
			<strong>Note:</strong> Data is stored in memory and will be lost when the server restarts. In production
			applications, use a database for persistent storage.
		</p>
	</section>

	<section class="mb-16 flex flex-col gap-4 text-white">
		<h2 class="text-4xl font-medium">Adding Mesh for Blockchain Interaction</h2>
		<p class="text-lg font-thin text-white">
			Now let's enhance your API with <a
				href="https://meshjs.dev/"
				target="_blank"
				rel="noopener noreferrer"
				class="link">Mesh SDK</a
			>
			to interact with the blockchain.
			<a href="https://meshjs.dev/" target="_blank" rel="noopener noreferrer" class="link"
				>Mesh SDK</a
			> is an open-source TypeScript SDK that simplifies Cardano development by providing easy-to-use
			APIs for wallet operations, transaction building, and blockchain data access.
		</p>

		<p class="text-lg font-thin text-white">
			<strong>Setting up Mesh:</strong>
		</p>
		<ol>
			<li>
				Install Mesh: <code class="rounded bg-gray-800 px-2 py-1 text-white"
					>npm install @meshsdk/core</code
				>
			</li>
			<li>
				No API key required! Koios is free to use and doesn't require registration or API keys. If
				you run into rate limiting issues, sign up for the free tier at <a
					href="https://koios.rest/"
					target="_blank"
					rel="noopener noreferrer"
					class="link">Koios.rest</a
				>.
			</li>
			<li>Simply use 'preprod' for testnet or 'api' for mainnet when initializing the provider</li>
		</ol>
		<p class="text-lg font-thin text-white">
			<strong>Adding Your Wallet Passphrase:</strong>
		</p>
		<p class="text-lg font-thin text-white">
			To use the wallet functionality, you'll need to add your mnemonic passphrase (seed phrase) to
			the code. The code example uses a <code class="rounded bg-gray-800 px-2 py-1 text-white"
				>mnemonic</code
			> array where you can directly add your 12 or 24-word phrase. This is for example purposes only
			- in production, always use environment variables to store your passphrase securely. Make sure
			to use a testnet wallet for development and testing.
		</p>
	</section>

	<section class="mb-16 flex flex-col gap-4 text-white">
		<h2 class="text-4xl font-medium">Fetching Wallet Balance with Mesh</h2>
		<p class="text-lg font-thin text-white">
			Let's start with a simple example that uses <a
				href="https://meshjs.dev/"
				target="_blank"
				rel="noopener noreferrer"
				class="link">Mesh SDK</a
			>
			and the
			<a href="https://koios.rest/" target="_blank" rel="noopener noreferrer" class="link">
				Koios</a
			> provider to fetch your wallet balance and log it to the console. This will help you understand
			how Mesh works before building a full API.
		</p>
		<CodeCard
			title="Fetch Wallet Balance with Mesh"
			code={data.meshWalletCode}
			language="javascript"
			githubLink="https://github.com/CardanoThings/Workshops/tree/main/Workshop-03/examples/nodejs-express-api-basics"
			howItWorksContent={meshWalletHowItWorks}
			footerText="Save this as wallet-balance.js. Make sure to install @meshsdk/core and add your mnemonic phrase to the mnemonic array in the code. Run it with 'node wallet-balance.js' to see your wallet balance logged to the console."
		/>
		<p class="text-lg font-thin text-white">
			<strong>Running the Example:</strong>
		</p>
		<ol>
			<li>
				Install Mesh: <code class="rounded bg-gray-800 px-2 py-1 text-white"
					>npm install @meshsdk/core</code
				>
			</li>
			<li>
				Add your mnemonic phrase to the <code class="rounded bg-gray-800 px-2 py-1 text-white"
					>mnemonic</code
				>
				array in the code (replace the empty array with your 12 or 24 word phrase)
			</li>
			<li>
				Run the script: <code class="rounded bg-gray-800 px-2 py-1 text-white"
					>node wallet-balance.js</code
				>
			</li>
			<li>You should see your wallet address and balance in ADA printed to the console</li>
		</ol>
		<TipBox type="info">
			<strong>Important Notes:</strong>
			<ul class="mt-2 ml-4">
				<li>Always use testnet wallets for development and testing</li>
				<li>Never expose private keys or mnemonics in your code</li>
				<li>Koios is free and doesn't require an API key, making it perfect for development</li>
			</ul>
		</TipBox>
	</section>

	<section class="mb-16 flex flex-col gap-4 text-white">
		<h2 class="text-4xl font-medium">Creating and Submitting Transactions with Mesh</h2>
		<p class="text-lg font-thin text-white">
			Now let's learn how to create and submit transactions using <a
				href="https://meshjs.dev/"
				target="_blank"
				rel="noopener noreferrer"
				class="link">Mesh.js</a
			>. This example demonstrates how to send ADA from your wallet to another address on the
			Cardano testnet, including metadata. You'll learn how to build, sign, and submit transactions
			with additional data permanently stored on the blockchain.
		</p>
		<p class="text-lg font-thin text-white">
			This example uses <code class="rounded bg-gray-800 px-2 py-1 text-white">MeshTxBuilder</code>,
			which provides low-level APIs for building transactions with fine-grained control. For more
			details on transaction building, see the{' '}
			<a
				href="https://meshjs.dev/apis/txbuilder/basics"
				target="_blank"
				rel="noopener noreferrer"
				class="link">Mesh.js Transaction Builder documentation</a
			>.
		</p>
		<CodeCard
			title="Create and Submit Transaction with Mesh"
			code={data.meshTransactionCode}
			language="javascript"
			githubLink="https://github.com/CardanoThings/Workshops/tree/main/Workshop-03/examples/nodejs-express-api-basics"
			howItWorksContent={meshTransactionHowItWorks}
			footerText="Save this as send-transaction.js. Make sure to install @meshsdk/core and set your WALLET_MNEMONIC environment variable. Update the recipientAddress variable with a valid testnet address. Run it with 'node send-transaction.js' to create and submit a transaction."
		/>
		<p class="text-lg font-thin text-white">
			<strong>Running the Example:</strong>
		</p>
		<ol>
			<li>
				Install Mesh: <code class="rounded bg-gray-800 px-2 py-1 text-white"
					>npm install @meshsdk/core</code
				>
			</li>
			<li>
				Add your mnemonic phrase to the <code class="rounded bg-gray-800 px-2 py-1 text-white"
					>mnemonic</code
				>
				array in the code (replace the empty array with your 12 or 24 word phrase)
			</li>
			<li>
				The <code class="rounded bg-gray-800 px-2 py-1 text-white">recipientAddress</code>
				is already set to the PingPong wallet address for testing
			</li>
			<li>
				Make sure your wallet has enough tADA to cover the transaction amount plus fees (usually
				around 0.2 ADA for fees)
			</li>
			<li>
				Run the script: <code class="rounded bg-gray-800 px-2 py-1 text-white"
					>node send-transaction.js</code
				>
			</li>
			<li>You should see the transaction hash printed to the console</li>
			<li>
				Use the <a
					href="https://preprod.cardanoscan.io/"
					target="_blank"
					rel="noopener noreferrer"
					class="link">CardanoScan.io</a
				> link in the output to view your transaction on the blockchain explorer or just paste the transaction
				hash into the search bar
			</li>
		</ol>
		<div class="mt-2">
			<PingPongWallet />
		</div>
		<TipBox type="warning">
			<strong>Important Notes:</strong>
			<ul class="mt-2 ml-4">
				<li>Always use testnet addresses (starting with <code>addr_test1</code>) for testing</li>
				<li>Transactions require fees - make sure your wallet has enough balance</li>
				<li>
					Once submitted, transactions cannot be reversed - always double-check the recipient
					address
				</li>
				<li>Transactions may take a few seconds to minutes to be confirmed on the blockchain</li>
			</ul>
		</TipBox>
	</section>

	<section class="mb-16 flex flex-col gap-4 text-white">
		<h2 class="text-4xl font-medium">Putting it all Together</h2>
		<p class="text-lg font-thin text-white">
			Now let's combine everything we've learned into a complete API server. This example includes
			Express.js for the API, Mesh for wallet integration, and the Koios provider for blockchain
			data access. The server includes endpoints to retrieve wallet information and submit
			transactions with metadata.
		</p>
		<p class="text-lg font-thin text-white">
			<strong>Installing All Dependencies:</strong>
		</p>
		<p class="text-lg font-thin text-white">Install all required packages:</p>
		<ol>
			<li>
				Express and CORS: <code class="rounded bg-gray-800 px-2 py-1 text-white"
					>npm install express cors</code
				>
			</li>
			<li>
				Mesh SDK: <code class="rounded bg-gray-800 px-2 py-1 text-white"
					>npm install @meshsdk/core</code
				>
			</li>
		</ol>
		<p class="text-lg font-thin text-white">
			<strong>Complete API Server:</strong>
		</p>
		<CodeCard
			title="Complete Node.js API with Mesh Integration"
			code={data.meshApiCode}
			language="javascript"
			githubLink="https://github.com/CardanoThings/Workshops/tree/main/Workshop-03/examples/nodejs-express-api-basics"
			howItWorksContent={meshHowItWorks}
			footerText="This complete API includes Express.js server, Mesh integration with Koios provider, GET /wallet endpoint, and POST /transaction endpoint for submitting transactions. Save this as server.js. Make sure to install express, cors, and @meshsdk/core. Add your mnemonic phrase to the mnemonic array in the code. Ensure your package.json includes 'type: module' to use ESM syntax."
		/>
		<p class="text-lg font-thin text-white">
			<strong>Testing the API:</strong>
		</p>
		<ol>
			<li>
				Start your server: <code class="rounded bg-gray-800 px-2 py-1 text-white"
					>node server.js</code
				>
			</li>
			<li>
				Make sure your <code class="rounded bg-gray-800 px-2 py-1 text-white">WALLET_MNEMONIC</code>
				environment variable is set in your
				<code class="rounded bg-gray-800 px-2 py-1 text-white">.env</code> file
			</li>
			<li>
				<strong>Test GET /wallet:</strong> Use Insomnia or curl to send a GET request to
				<code class="rounded bg-gray-800 px-2 py-1 text-white">http://localhost:3000/wallet</code>
			</li>
			<li>You'll receive your wallet information including address and balance</li>
			<li>
				<strong>Test POST /transaction:</strong> Create a POST request to
				<code class="rounded bg-gray-800 px-2 py-1 text-white"
					>http://localhost:3000/transaction</code
				>
			</li>
			<li>
				In the Body tab, select JSON format and enter:
				<code class="rounded bg-gray-800 px-2 py-1 text-white"
					>{'{'}"recipientAddress": "addr_test1...", "amount": 1.0{'}'}</code
				>
			</li>
			<li>Click Send - you should receive a response with the transaction hash and explorer URL</li>
			<li>Use the explorer URL to view your transaction on the blockchain</li>
		</ol>
		<TipBox type="warning">
			<strong>Important:</strong> Make sure your wallet has enough tADA to cover the transaction amount
			plus fees (usually around 0.2 ADA). Transactions are irreversible once submitted.
		</TipBox>
	</section>

	<FurtherResources
		resources={[
			{
				title: 'Mesh',
				url: 'https://meshjs.dev/',
				description:
					'Open-source TypeScript SDK for building Cardano applications with wallet integration and transaction building.'
			},
			{
				title: 'Express.js Documentation',
				url: 'https://expressjs.com/',
				description: 'Learn more about building APIs with Express.'
			},
			{
				title: 'Koios',
				url: 'https://api.koios.rest/',
				description:
					'Free community-driven Cardano API service. No API key required for blockchain data access.'
			},
			{
				title: 'Insomnia',
				url: 'https://insomnia.rest/',
				description: 'A free and open source API client for testing endpoints.'
			},
			{
				title: 'Awesome JSON Viewer',
				url: 'https://github.com/rbrahul/Awesome-JSON-Viewer',
				description:
					'A free and open source JSON viewer for viewing JSON data in a readable format in your browser.'
			},
			{
				title: 'REST API Tutorial',
				url: 'https://www.restapitutorial.com/',
				description: 'A tutorial to learn about REST APIs.'
			}
		]}
	/>
</SectionNavigator>

<WorkshopNavigation />
