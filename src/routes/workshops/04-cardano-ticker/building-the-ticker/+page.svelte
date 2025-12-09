<script>
	import { page } from '$app/state';
	import SectionNavigator from '$lib/components/SectionNavigator.svelte';
	import WorkshopNavigation from '$lib/WorkshopNavigation.svelte';
	import LiveCodeCard from '$lib/components/LiveCodeCard.svelte';
	import TipBox from '$lib/components/TipBox.svelte';
	import FurtherResources from '$lib/components/FurtherResources.svelte';
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
		<h2 class="text-4xl font-medium">What We're Building</h2>
		<p class="text-lg font-thin text-white">
			In this workshop, you'll build a complete Cardano Ticker that displays your wallet information
			on a TFT display. The ticker will show:
		</p>
		<ul class="list-inside list-disc space-y-2">
			<li>Your ADA wallet balance</li>
			<li>All your token holdings with prices and 24h changes</li>
			<li>Your NFT collections with floor prices</li>
			<li>System status information</li>
			<li>A scrolling ticker at the bottom showing token prices</li>
		</ul>
		<p class="text-lg font-thin text-white">
			The ticker automatically rotates between different screens every 10 seconds, and the data
			updates periodically from Cardano blockchain APIs. On startup, it connects to WiFi, fetches
			initial data, and displays the first screen. During operation, it continuously maintains the
			WiFi connection, updates data (wallet balance every 1 minute, tokens/NFTs every 10 minutes),
			rotates screens, and animates the scrolling ticker.
		</p>
		<p class="text-lg font-thin text-white">
			<strong>Good news:</strong> If you've completed the previous workshops, you already know most of
			what you need! This project combines:
		</p>
		<ul class="list-inside list-disc space-y-2">
			<li>
				WiFi connectivity from
				<a href="/workshops/02-read-and-output/fetch-wallet-balance" target="_blank" class="link"
					>Workshop 02</a
				>
			</li>
			<li>
				Display techniques from
				<a href="/workshops/02-read-and-output/display-data" target="_blank" class="link"
					>Workshop 02</a
				>
			</li>
			<li>
				API fetching from
				<a href="/workshops/02-read-and-output/fetch-wallet-balance" target="_blank" class="link"
					>Workshop 02</a
				>
				and
				<a
					href="/workshops/03-input-and-write/connect-and-read-sensor-data"
					target="_blank"
					class="link">Workshop 03</a
				>
			</li>
		</ul>
		<TipBox title="Mainnet Data & Examples" variant="info">
			This workshop uses mainnet data and all examples show the tokens and NFTs of the
			CardanoThings.io wallet.
		</TipBox>
	</section>

	<section class="mb-16 flex flex-col gap-4 text-white">
		<h2 class="text-4xl font-medium">Project Structure</h2>
		<p class="text-lg font-thin text-white">
			The CardanoTicker is organized as a multi-file Arduino project, splitting the code into
			logical modules for easier understanding and maintenance. Each component has its own file (or
			pair of .h and .cpp files), and we'll walk through each one step by step in the following
			sections. You can view the complete project structure in the
			<a
				href="https://github.com/CardanoThings/Workshops/tree/main/Workshop-04/examples/CardanoTicker"
				target="_blank"
				class="link">GitHub repository</a
			>.
		</p>
	</section>

	<section class="mb-16 flex flex-col gap-4 text-white">
		<h2 class="text-4xl font-medium">Configuration Files</h2>
		<p class="text-lg font-thin text-white">
			Before we dive into the code, you need to configure the project with your wallet addresses and
			API keys. This is similar to how you configured WiFi credentials in previous workshops.
		</p>
		<h3 class="mt-6 text-2xl font-medium">config.cpp - Your Wallet Addresses</h3>
		<p class="text-lg font-thin text-white">
			The <code>config.cpp</code> file stores your Cardano addresses and API endpoints. You need to edit
			this file with your own addresses:
		</p>
		<ul class="list-inside list-disc space-y-2">
			<li>
				<strong>stakeAddress</strong> - Your stake address (starts with "stake1..."). This is used
				to fetch your wallet balance from Koios. You learned about stake addresses in
				<a href="/workshops/02-read-and-output/fetch-wallet-balance" target="_blank" class="link"
					>Workshop 02</a
				>!
			</li>
			<li>
				<strong>walletAddress</strong> - Your payment address (starts with "addr1..."). This is used
				to fetch your tokens and NFTs from MinSwap.
			</li>
			<li>
				<strong>cexplorerApiKey</strong> - Your Cexplorer.io API key. Get this from cexplorer.io after
				creating an account (as explained in the previous step).
			</li>
		</ul>
		<TipBox title="Finding Your Addresses" variant="info">
			You can find your stake address and wallet address in your Cardano wallet (Yoroi, Eternl,
			Vespr, etc.). The stake address is usually shown in the "Staking" or "Rewards" section, and
			the payment address is your main receiving address. Both addresses are also available on
			blockchain explorers like
			<a href="https://cardanoscan.io/" target="_blank" class="link">CardanoScan</a> or
			<a href="https://cexplorer.io/" target="_blank" class="link">Cexplorer</a>.
		</TipBox>
		<LiveCodeCard
			title="Config Files"
			repo="CardanoThings/Workshops"
			branch="main"
			files={[
				{
					path: 'Workshop-04/examples/CardanoTicker/config.cpp',
					language: 'cpp'
				},
				{
					path: 'Workshop-04/examples/CardanoTicker/config.h',
					language: 'cpp'
				}
			]}
		/>
		<h3 class="mt-6 text-2xl font-medium">secrets.h - WiFi Credentials</h3>
		<p class="text-lg font-thin text-white">
			The <code>secrets.h</code> file stores your WiFi credentials. This file is not committed to
			git for security. You'll need to create it from <code>secrets.h.example</code>:
		</p>
		<ul class="list-inside list-disc space-y-2">
			<li>
				Copy <code>secrets.h.example</code> to <code>secrets.h</code>
			</li>
			<li>
				Replace <code>WIFI_SSID</code> with your WiFi network name (same as you did in Workshop 02!)
			</li>
			<li>
				Replace <code>WIFI_PASSWORD</code> with your WiFi password
			</li>
		</ul>
		<p class="text-lg font-thin text-white">
			This is exactly the same process you used in previous workshops for WiFi configuration!
		</p>
		<LiveCodeCard
			title="secrets.h.example"
			repo="CardanoThings/Workshops"
			branch="main"
			files={[
				{
					path: 'Workshop-04/examples/CardanoTicker/secrets.h.example',
					language: 'cpp'
				}
			]}
		/>
	</section>

	<section class="mb-16 flex flex-col gap-4 text-white">
		<h2 class="text-4xl font-medium">WiFi Manager & Data Fetcher</h2>
		<p class="text-lg font-thin text-white">
			The WiFi manager handles connecting to WiFi and automatically reconnecting if the connection
			drops. The data fetcher organizes all the API calls from the previous step (Koios, MinSwap,
			and Cexplorer) into a reusable module that fetches data periodically and stores it for the
			screens to display.
		</p>
		<p class="text-lg font-thin text-white">
			Both modules use the same techniques you learned in
			<a href="/workshops/02-read-and-output/fetch-wallet-balance" target="_blank" class="link"
				>Workshop 02</a
			>, just organized into reusable components. The data fetcher uses rate limiting (wallet
			balance every 1 minute, tokens/NFTs every 10 minutes) and provides getter functions like
			<code>getWalletBalance()</code> and <code>getToken(i)</code> that the screen files use to display
			data.
		</p>
		<LiveCodeCard
			title="WiFi Manager & Data Fetcher Code"
			repo="CardanoThings/Workshops"
			branch="main"
			files={[
				{
					path: 'Workshop-04/examples/CardanoTicker/wifi_manager.cpp',
					language: 'cpp'
				},
				{
					path: 'Workshop-04/examples/CardanoTicker/wifi_manager.h',
					language: 'cpp'
				},
				{
					path: 'Workshop-04/examples/CardanoTicker/data_fetcher.cpp',
					language: 'cpp'
				},
				{
					path: 'Workshop-04/examples/CardanoTicker/data_fetcher.h',
					language: 'cpp'
				}
			]}
			readmePath="Workshop-04/examples/CardanoTicker/data_fetcher.md"
		/>
	</section>

	<section class="mb-16 flex flex-col gap-4 text-white">
		<h2 class="text-4xl font-medium">Wallet Screen</h2>
		<p class="text-lg font-thin text-white">
			After the start screen displays "CardanoTicker" on boot, the ticker automatically rotates
			between four data screens every 10 seconds: the wallet screen, token screen, NFT screen, and
			status screen.
		</p>
		<p class="text-lg font-thin text-white">
			The wallet screen displays your ADA balance prominently. This is similar to the wallet balance
			display you created in
			<a href="/workshops/02-read-and-output/display-data" target="_blank" class="link"
				>Workshop 02</a
			>!
		</p>
		<p class="text-lg font-thin text-white">
			<strong>What it shows:</strong>
		</p>
		<ul class="list-inside list-disc space-y-2">
			<li>
				<strong>Balance:</strong> Your ADA balance in large text (size 3) - this is the most important
				information!
			</li>
			<li>
				<strong>Stake Address:</strong> Your stake address, truncated to fit on screen (shows first 12
				characters + "..." + last 12 characters)
			</li>
			<li>
				<strong>Last Updated:</strong> How long ago the balance was fetched (e.g., "2m 30s ago" or "just
				now")
			</li>
		</ul>
		<LiveCodeCard
			title="Wallet Screen Code"
			repo="CardanoThings/Workshops"
			branch="main"
			files={[
				{
					path: 'Workshop-04/examples/CardanoTicker/wallet_screen.cpp',
					language: 'cpp'
				},
				{
					path: 'Workshop-04/examples/CardanoTicker/wallet_screen.h',
					language: 'cpp'
				}
			]}
			readmePath="Workshop-04/examples/CardanoTicker/wallet_screen.md"
		/>
	</section>

	<section class="mb-16 flex flex-col gap-4 text-white">
		<h2 class="text-4xl font-medium">Token Screen</h2>
		<p class="text-lg font-thin text-white">
			The token screen displays all your token holdings in a table format. Each row shows one token
			with its ticker symbol, amount you own, total value, and 24-hour price change.
		</p>
		<p class="text-lg font-thin text-white">
			<strong>What it shows:</strong>
		</p>
		<ul class="list-inside list-disc space-y-2">
			<li>
				<strong>Ticker:</strong> The token symbol (e.g., "MIN", "HOSKY", "ADA")
			</li>
			<li>
				<strong>Amount:</strong> How many tokens you own
			</li>
			<li>
				<strong>Value:</strong> Total value in USD (amount × price per token)
			</li>
			<li>
				<strong>24h Change:</strong> Price change percentage, color-coded green (up) or red (down)
			</li>
		</ul>
		<LiveCodeCard
			title="Token Screen Code"
			repo="CardanoThings/Workshops"
			branch="main"
			files={[
				{
					path: 'Workshop-04/examples/CardanoTicker/token_screen.cpp',
					language: 'cpp'
				},
				{
					path: 'Workshop-04/examples/CardanoTicker/token_screen.h',
					language: 'cpp'
				}
			]}
			readmePath="Workshop-04/examples/CardanoTicker/token_screen.md"
		/>
	</section>

	<section class="mb-16 flex flex-col gap-4 text-white">
		<h2 class="text-4xl font-medium">NFT Screen</h2>
		<p class="text-lg font-thin text-white">
			The NFT screen displays all your NFT collections. Each row shows one collection with its name,
			how many NFTs you own from that collection, and the floor price.
		</p>
		<p class="text-lg font-thin text-white">
			<strong>What it shows:</strong>
		</p>
		<ul class="list-inside list-disc space-y-2">
			<li>
				<strong>Name:</strong> The NFT collection name (e.g., "Cardano Punks", "SpaceBudz")
			</li>
			<li>
				<strong>Amount:</strong> How many NFTs you own from this collection (if you own 3 NFTs from the
				same collection, it shows "3")
			</li>
			<li>
				<strong>Floor Price:</strong> The lowest current selling price for this collection in ADA
			</li>
		</ul>
		<LiveCodeCard
			title="NFT Screen Code"
			repo="CardanoThings/Workshops"
			branch="main"
			files={[
				{
					path: 'Workshop-04/examples/CardanoTicker/nft_screen.cpp',
					language: 'cpp'
				},
				{
					path: 'Workshop-04/examples/CardanoTicker/nft_screen.h',
					language: 'cpp'
				}
			]}
			readmePath="Workshop-04/examples/CardanoTicker/nft_screen.md"
		/>
	</section>

	<section class="mb-16 flex flex-col gap-4 text-white">
		<h2 class="text-4xl font-medium">Status Screen</h2>
		<p class="text-lg font-thin text-white">
			The status screen shows technical information about your device and network connection. This
			is useful for debugging and monitoring.
		</p>
		<p class="text-lg font-thin text-white">
			<strong>What it shows:</strong>
		</p>
		<ul class="list-inside list-disc space-y-2">
			<li>
				<strong>Network Status:</strong> "Connected" or "Offline" in large text
			</li>
			<li>
				<strong>Signal Strength:</strong> WiFi signal strength in dBm (closer to 0 is better)
			</li>
			<li>
				<strong>IP Address:</strong> Your device's address on the network (e.g., 192.168.1.100)
			</li>
			<li>
				<strong>MAC Address:</strong> Your device's unique hardware identifier
			</li>
			<li>
				<strong>Uptime:</strong> How long the device has been running (e.g., "2d 5h 30m 15s")
			</li>
		</ul>
		<LiveCodeCard
			title="Status Screen Code"
			repo="CardanoThings/Workshops"
			branch="main"
			files={[
				{
					path: 'Workshop-04/examples/CardanoTicker/status_screen.cpp',
					language: 'cpp'
				},
				{
					path: 'Workshop-04/examples/CardanoTicker/status_screen.h',
					language: 'cpp'
				}
			]}
			readmePath="Workshop-04/examples/CardanoTicker/status_screen.md"
		/>
	</section>

	<section class="mb-16 flex flex-col gap-4 text-white">
		<h2 class="text-4xl font-medium">Scrolling Ticker</h2>
		<p class="text-lg font-thin text-white">
			The scrolling ticker at the bottom of the screen continuously scrolls token prices
			horizontally. This creates a stock-market-style ticker effect!
		</p>
		<p class="text-lg font-thin text-white">
			<strong>What it displays:</strong>
		</p>
		<p class="text-lg font-thin text-white">For each token, the ticker shows:</p>
		<ul class="list-inside list-disc space-y-2">
			<li>
				<strong>Ticker symbol</strong> in larger text (e.g., "MIN")
			</li>
			<li>
				<strong>Price per token</strong> in USD (e.g., "$0.0123")
			</li>
			<li>
				<strong>24h change</strong> color-coded green (up) or red (down) (e.g., "+5.67%")
			</li>
		</ul>
		<LiveCodeCard
			title="Scrolling Ticker Code"
			repo="CardanoThings/Workshops"
			branch="main"
			files={[
				{
					path: 'Workshop-04/examples/CardanoTicker/ticker.cpp',
					language: 'cpp'
				},
				{
					path: 'Workshop-04/examples/CardanoTicker/ticker.h',
					language: 'cpp'
				}
			]}
			readmePath="Workshop-04/examples/CardanoTicker/ticker.md"
		/>
	</section>

	<section class="mb-16 flex flex-col gap-4 text-white">
		<h2 class="text-4xl font-medium">Getting Started</h2>
		<p class="text-lg font-thin text-white">
			Now that you understand how the code works, here's how to set it up:
		</p>
		<ol class="list-inside list-decimal space-y-2">
			<li>
				<strong>Download the code:</strong> Get the CardanoTicker project from the GitHub repository
			</li>
			<li>
				<strong>Configure addresses:</strong> Edit <code>config.cpp</code> with your stake address and
				wallet address
			</li>
			<li>
				<strong>Set up WiFi:</strong> Copy <code>secrets.h.example</code> to <code>secrets.h</code>
				and add your WiFi credentials
			</li>
			<li>
				<strong>Get API key:</strong> Get your Cexplorer.io API key and add it to
				<code>config.cpp</code>
			</li>
			<li>
				<strong>Install libraries:</strong> Make sure you have TFT_eSPI, ArduinoJson, and WiFi libraries
				installed (you should already have these from previous workshops!)
			</li>
			<li>
				<strong>Upload and run:</strong> Upload the code to your ESP32 and watch your ticker come to
				life!
			</li>
		</ol>
		<TipBox title="Library Requirements" variant="info">
			You should already have all the required libraries from previous workshops:
			<ul class="mt-2 ml-4 list-disc">
				<li>
					<strong>TFT_eSPI</strong> - From Workshop 02 (display library)
				</li>
				<li>
					<strong>ArduinoJson</strong> - From Workshop 02 (JSON parsing)
				</li>
				<li>
					<strong>WiFi</strong> - Built into ESP32 (WiFi connectivity)
				</li>
				<li>
					<strong>HTTPClient</strong> - Built into ESP32 (HTTP requests)
				</li>
			</ul>
		</TipBox>
	</section>

	<FurtherResources
		resources={[
			{
				title: 'TFT_eSPI Library',
				url: 'https://github.com/Bodmer/TFT_eSPI',
				description:
					'Arduino and PlatformIO IDE compatible TFT library optimized for ESP8266 and ESP32. Supports different driver chips and provides fast graphics rendering with proportional fonts and sprite support.'
			},
			{
				title: 'ArduinoJson Library',
				url: 'https://arduinojson.org/',
				description:
					'JSON library for Arduino. Used for parsing API responses from Koios, MinSwap, and Cexplorer.'
			},
			{
				title: 'Koios API Documentation',
				url: 'https://api.koios.rest/',
				description:
					'Free community-driven Cardano API. Used for fetching wallet balance from stake addresses.'
			},
			{
				title: 'MinSwap',
				url: 'https://minswap.org/',
				description:
					"Cardano's leading decentralized exchange. Used for fetching token and NFT positions with prices and 24h changes."
			},
			{
				title: 'Cexplorer.io',
				url: 'https://cexplorer.io/',
				description:
					'Cardano blockchain explorer with API access. Used for fetching NFT collection information and floor prices.'
			}
		]}
	/>
</SectionNavigator>

<WorkshopNavigation />
