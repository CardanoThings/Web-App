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
		<h1 class="text-lg font-normal text-white sm:max-w-[50%]">Workshop 04: Cardano Ticker</h1>
	</a>
	<h2 class="text-6xl font-medium text-white sm:max-w-[50%]">Gathering data</h2>
	<p class="text-lg font-thin text-white sm:max-w-[50%]">
		We will go through the process of fetching and setting up all the data on your own API: First we check
		your own (or any other) wallet, see what is in there, fetch token prices from the Realfi.info API and
		some NFT floors from JPG.store and put it all together to be requested by your microcontroller. We
		will also introduce you to the paid Taptools API.
	</p>
</section>

<SectionNavigator>
	<section class="mb-16 flex flex-col gap-4 text-white">
		<h2 class="text-4xl font-medium">Introduction</h2>
		<p class="text-lg font-thin text-white">
			In this workshop, we'll build a Cardano ticker that displays real-time data from multiple sources.
			To create an efficient ticker, we'll aggregate data from various APIs into a single endpoint that
			your microcontroller can easily consume.
		</p>
		<p class="text-lg font-thin text-white">
			The ticker will display:
		</p>
		<ul>
			<li>Wallet balance and token holdings</li>
			<li>Token prices from Realfi.info</li>
			<li>NFT floor prices from JPG.store</li>
			<li>24-hour price changes</li>
		</ul>
		<p class="text-lg font-thin text-white">
			By creating your own API that aggregates this data, you reduce the number of API calls your
			microcontroller needs to make, improve response times, and can add caching or data processing
			logic.
		</p>
	</section>

	<section class="mb-16 flex flex-col gap-4 text-white">
		<h2 class="text-4xl font-medium">Checking Wallet Contents</h2>
		<p class="text-lg font-thin text-white">
			First, we'll fetch wallet information using the Koios API (which you're already familiar with from
			previous workshops). This will give us the wallet balance and a list of tokens held in the wallet.
		</p>
		<p class="text-lg font-thin text-white">
			The wallet data includes:
		</p>
		<ul>
			<li>Total ADA balance</li>
			<li>List of native tokens (with quantities)</li>
			<li>UTXO count</li>
			<li>Transaction history (if needed)</li>
		</ul>
		<p class="text-lg font-thin text-white">
			This information helps personalize the ticker by showing what tokens the user actually owns, making
			the display more relevant.
		</p>
	</section>

	<section class="mb-16 flex flex-col gap-4 text-white">
		<h2 class="text-4xl font-medium">Fetching Token Prices from Realfi.info</h2>
		<p class="text-lg font-thin text-white">
			<a href="https://realfi.info/" target="_blank" class="link">Realfi.info</a> provides free API
			access to Cardano token prices. It's a great resource for getting real-time price data for ADA and
			popular native tokens.
		</p>
		<p class="text-lg font-thin text-white">
			<strong>Realfi.info API Features:</strong>
		</p>
		<ul>
			<li>Free to use (no API key required)</li>
			<li>Real-time token prices in USD</li>
			<li>24-hour price changes</li>
			<li>Market cap and volume data</li>
			<li>Supports popular Cardano tokens</li>
		</ul>
		<p class="text-lg font-thin text-white">
			The API endpoint is:
			<code class="bg-gray-800 px-2 py-1 rounded text-white">https://api.realfi.info/v1/tokens</code>
		</p>
		<p class="text-lg font-thin text-white">
			This returns a JSON array of tokens with their current prices, making it easy to filter for the
			tokens you want to display.
		</p>
	</section>

	<section class="mb-16 flex flex-col gap-4 text-white">
		<h2 class="text-4xl font-medium">Fetching NFT Floors from JPG.store</h2>
		<p class="text-lg font-thin text-white">
			<a href="https://jpg.store/" target="_blank" class="link">JPG.store</a> is a popular NFT
			marketplace on Cardano. Their API provides access to NFT collection data, including floor prices
			and trading volume.
		</p>
		<p class="text-lg font-thin text-white">
			<strong>JPG.store API Features:</strong>
		</p>
		<ul>
			<li>Free API access</li>
			<li>Collection floor prices</li>
			<li>24-hour trading volume</li>
			<li>Collection statistics</li>
		</ul>
		<p class="text-lg font-thin text-white">
			The API endpoint is:
			<code class="bg-gray-800 px-2 py-1 rounded text-white">https://api.jpg.store/v1/collections</code>
		</p>
		<p class="text-lg font-thin text-white">
			You can filter collections by popularity, volume, or specific collection names to show the most
			relevant NFT data on your ticker.
		</p>
	</section>

	<section class="mb-16 flex flex-col gap-4 text-white">
		<h2 class="text-4xl font-medium">Introduction to Taptools API</h2>
		<p class="text-lg font-thin text-white">
			<a href="https://taptools.io/" target="_blank" class="link">Taptools</a> is a comprehensive
			Cardano analytics platform that offers both free and paid API tiers. While the free tier has
			limitations, the paid tier provides extensive data including:
		</p>
		<ul>
			<li>Advanced token analytics</li>
			<li>Historical price data</li>
			<li>Wallet analytics</li>
			<li>DeFi protocol data</li>
			<li>Higher rate limits</li>
		</ul>
		<p class="text-lg font-thin text-white">
			<strong>Free Tier:</strong> Limited requests per day, basic token data
		</p>
		<p class="text-lg font-thin text-white">
			<strong>Paid Tier:</strong> Higher rate limits, advanced analytics, historical data
		</p>
		<p class="text-lg font-thin text-white">
			For this workshop, we'll focus on free APIs (Realfi.info and JPG.store), but you can easily
			integrate Taptools if you need more advanced features or higher rate limits.
		</p>
	</section>

	<section class="mb-16 flex flex-col gap-4 text-white">
		<h2 class="text-4xl font-medium">Setting up Your API</h2>
		<p class="text-lg font-thin text-white">
			Now let's create a Node.js API that aggregates all this data into a single endpoint. This makes it
			easy for your microcontroller to fetch everything it needs in one request.
		</p>

		<Card.Root>
			<Card.Header class="mb-0 pb-0">
				<Card.Title>Node.js Ticker API Server</Card.Title>
			</Card.Header>
			<Card.Content>
				<SyntaxHighlighter language="javascript" code={data.nodeApiCode} />
			</Card.Content>
			<Card.Footer>
				<p class="text-xs leading-relaxed">
					This API server aggregates data from multiple sources and provides a single endpoint for
					your microcontroller. Install dependencies with
					<code class="bg-gray-800 px-2 py-1 rounded text-white">npm install express cors axios</code>. Start
					the server with <code class="bg-gray-800 px-2 py-1 rounded text-white">node server.js</code>.
				</p>
			</Card.Footer>
		</Card.Root>

		<h3 class="mt-4 text-2xl font-medium">How it works</h3>
		<ul>
			<li>
				The <i>/ticker-data</i> endpoint fetches data from multiple sources in parallel using
				<i>Promise.all()</i> for efficiency.
			</li>
			<li>
				Wallet data is fetched from Koios API using the address provided in the query parameter.
			</li>
			<li>
				Token prices are fetched from Realfi.info and filtered for popular tokens.
			</li>
			<li>
				NFT floors are fetched from JPG.store and limited to the top collections.
			</li>
			<li>
				All data is combined into a single JSON response that your microcontroller can easily parse.
			</li>
		</ul>
	</section>

	<section class="mb-16 flex flex-col gap-4 text-white">
		<h2 class="text-4xl font-medium">Fetching Data from Microcontroller</h2>
		<p class="text-lg font-thin text-white">
			Now let's create Arduino code that fetches the aggregated data from your API:
		</p>

		<Card.Root>
			<Card.Header class="mb-0 pb-0">
				<Card.Title>Arduino Code - Fetching Ticker Data</Card.Title>
			</Card.Header>
			<Card.Content>
				<SyntaxHighlighter language="cpp" code={data.arduinoFetchCode} />
			</Card.Content>
			<Card.Footer>
				<p class="text-xs leading-relaxed">
					This code fetches ticker data from your API every 30 seconds. Replace the API URL with your
					server's IP address. The code parses the JSON response and extracts wallet balance, token
					prices, and other relevant data.
				</p>
			</Card.Footer>
		</Card.Root>

		<h3 class="mt-4 text-2xl font-medium">Features</h3>
		<ul>
			<li>
				Fetches all ticker data in a single API call (more efficient than multiple calls)
			</li>
			<li>
				Parses complex JSON structure with nested objects and arrays
			</li>
			<li>
				Extracts specific data points (ADA price, wallet balance, token count)
			</li>
			<li>
				Handles errors gracefully and reconnects WiFi if needed
			</li>
		</ul>
	</section>
</SectionNavigator>

<Card.Root class="mt-8 bg-transparent text-white sm:w-3/4">
	<Card.Header>
		<Card.Title>Resources</Card.Title>
		<Card.Description>
			Here are some resources to help you learn more about the APIs used in this workshop.
		</Card.Description>
	</Card.Header>
	<Card.Content>
		<ul>
			<li>
				<a href="https://realfi.info/" target="_blank" class="link">Realfi.info</a>
				<p class="text-sm font-thin text-white">Free Cardano token price API.</p>
			</li>
			<li>
				<a href="https://jpg.store/" target="_blank" class="link">JPG.store</a>
				<p class="text-sm font-thin text-white">Cardano NFT marketplace with API access.</p>
			</li>
			<li>
				<a href="https://taptools.io/" target="_blank" class="link">Taptools</a>
				<p class="text-sm font-thin text-white">Advanced Cardano analytics platform with paid API.</p>
			</li>
			<li>
				<a href="https://preprod.koios.rest/" target="_blank" class="link">Koios API</a>
				<p class="text-sm font-thin text-white">Free Cardano blockchain API.</p>
			</li>
		</ul>
	</Card.Content>
</Card.Root>

<WorkshopNavigation />

