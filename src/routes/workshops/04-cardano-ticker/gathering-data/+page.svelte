<script>
	import { page } from '$app/state';
	import SectionNavigator from '$lib/components/SectionNavigator.svelte';
	import WorkshopNavigation from '$lib/WorkshopNavigation.svelte';
	import FurtherResources from '$lib/components/FurtherResources.svelte';
	import TipBox from '$lib/components/TipBox.svelte';
	import CodeCard from '$lib/components/CodeCard.svelte';
	import { MoveLeft } from 'lucide-svelte';
	let parentPage = $derived(page.url.pathname.split('/')[2]);
	let { data } = $props();
</script>

<section class="mb-16 flex flex-col gap-4 text-white">
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
		<h2 class="text-4xl font-medium">Before we get started</h2>
		<p class="text-lg font-thin text-white">
			Please note: The API endpoints used in this workshop are for educational purposes only and
			some are not officially supported by the API providers. If you want to use this data in a
			production environment, you will need to use official (mostly paid) APIs or build your own
			API.
		</p>
	</section>

	<section class="mb-16 flex flex-col gap-4 text-white">
		<h2 class="text-4xl font-medium">Checking Your Wallet</h2>
		<p class="text-lg font-thin text-white">
			If you followed along with this workshop series, you already know several ways to fetch data
			from the Cardano blockchain:
		</p>
		<ul class="">
			<li>
				Using the Koios or Blockfrost API from
				<a href="/workshops/02-read-and-output/fetch-wallet-balance" target="_blank" class="link"
					>Workshop 01: Fetch your Wallet Balance</a
				>
			</li>
			<li>
				Fetching your wallet balance using Mesh SDK from<a
					href="/workshops/03-input-and-write/build-your-own-api"
					target="_blank"
					class="link">Workshop 03: Build your own API</a
				>
			</li>
			<li>
				Using on-chain explorers like <a href="https://cardanoscan.io/" target="_blank" class="link"
					>CardanoScan</a
				>, <a href="https://cexplorer.io/" target="_blank" class="link">Cexplorer</a>,
				<a href="https://adastat.net/" target="_blank" class="link">Adastat</a>
				or <a href="https://pool.pm/" target="_blank" class="link">pool.pm</a> by simply searching for
				your wallet address.
			</li>
			<li>
				And of course your wallet extension itself like <a
					href="https://yoroi-wallet.com/"
					target="_blank"
					class="link">Yoroi</a
				>, <a href="https://eternl.io/" target="_blank" class="link">Eternl</a>,
				<a href="https://vespr.xyz/" target="_blank" class="link">Vespr</a>,
				<a href="https://begin.is/" target="_blank" class="link">Begin</a>, etc.
			</li>
		</ul>

		<p>
			Revisit the workshops from the previous steps if you need a refresher on how to fetch data
			from the Cardano blockchain. In the next steps we will check the actual prices for tokens and
			NFTs from the MinSwap and JPG.store APIs.
		</p>
	</section>

	<section class="mb-16 flex flex-col gap-4 text-white">
		<h2 class="text-4xl font-medium">Fetching data from Minswap</h2>
		<p class="text-lg font-thin text-white">
			<a href="https://minswap.org/" target="_blank" class="link">MinSwap</a> is a decentralized exchange
			on Cardano that allows you to trade tokens, provide liquidity and access DeFi on Cardano. It is
			one of the leading exchanges on Cardano and is a great way to get started with trading tokens on
			Cardano.
		</p>
		<p class="text-lg font-thin text-white">
			MinSwap exposes an API endpoint to fetch all tokens and prices for a specific wallet address
			at
			<code class="rounded bg-white/10 px-1 py-0.5 font-mono text-sm"
				>https://monorepo-mainnet-prod.minswap.org/v1/portfolio/tokens?address=[WALLETADDRESS]&only_minswap=true&filter_small_value=false</code
			> with [WALLETADDRESS] being your wallet address.
		</p>
		<p class="text-lg font-thin text-white">
			The API endpoint will return a JSON response with your wallet's token positions. Here's an
			example response:
		</p>

		<CodeCard
			title="MinSwap API Response Example"
			language="json"
			code={`{
  "positions": {
    "nft_positions": [
      {
        "currency_symbol": "f0ff48bbb7bbe9d59a40f1ce90e9e9d0ff5002ec48f232b49ca0fb9a",
        "token_name": "000de14063617264616e6f7468696e6773",
        "is_verified": true
      }
    ],
    "asset_positions": [
      {
        "asset": {
          "currency_symbol": "",
          "token_name": "",
          "is_verified": true,
          "metadata": {
            "decimals": 6,
            "name": "Cardano",
            "ticker": "ADA"
          }
        },
        "price_usd": 0.3864,
        "amount": 11.37058,
        "amount_usd": 4.393592112,
        "pnl_24h_usd": -0.3466696040696063,
        "pnl_24h_percent": -7.8903456495828275
      },
      {
        "asset": {
          "currency_symbol": "3d77d63dfa6033be98021417e08e3368cc80e67f8d7afa196aaa0b39",
          "token_name": "53746172636820546f6b656e",
          "is_verified": true,
          "metadata": {
            "name": "STRCH",
            "url": "https://starch.one",
            "ticker": "STRCH",
            "decimals": 0,
            "description": ""
          }
        },
        "price_usd": 3.0215906268916395e-9,
        "amount": 114081,
        "amount_usd": 0.00034470608030642515,
        "pnl_24h_usd": -0.00005476157689164048,
        "pnl_24h_percent": -15.88645516289135
      }
    ],
    "lp_asset_positions": []
  }
}`}
		/>

		<p class="text-lg font-thin text-white">
			As you can see, the API response contains the following information:
		</p>
		<ul class="list-inside list-disc">
			<li>The list of NFTs in the wallet</li>
			<li>The list of tokens in the wallet</li>
			<li>The price of each token in USD</li>
			<li>The amount of each token in the wallet</li>
			<li>The 24h change in USD</li>
			<li>The 24h change in percentage</li>
		</ul>

		<p class="text-lg font-thin text-white">
			We will use this data to display token prices and prices changes in a nice way on your TFT
			display.
		</p>
	</section>

	<section class="mb-16 flex flex-col gap-4 text-white">
		<h2 class="text-4xl font-medium">Fetching data from jpeg.store (not)</h2>
		<p class="text-lg font-thin text-white">
			<a href="https://www.jpg.store/" target="_blank" class="link">JPG.store</a> is the biggest NFT
			marketplace on Cardano. It allows you to buy, sell and discover NFTs with no escrow and instant
			transactions.
		</p>
		<p class="text-lg font-thin text-white">
			Unfortunately jpg.store has locked down their API since this workshop series was written up
			and does not offer API endpoints - public or paid - anymore.
		</p>
	</section>

	<section class="mb-16 flex flex-col gap-4 text-white">
		<h2 class="text-4xl font-medium">Cexplorer.io for the win</h2>
		<p class="text-lg font-thin text-white">
			Lucky for us, we have another great on-chain explorer at our disposal: <a
				href="https://cexplorer.io/"
				target="_blank"
				class="link">Cexplorer.io</a
			>. Cexplorer.io offers different endpoints and a free tier for basic usage. Just head over to
			cexplorer.io, connect your wallet, go to your profile page by clicking on your wallet address
			in the top right corner. You'll be able to create your own API key by clicking on the "API"
			tab and creating a new project.
		</p>
		<p class="text-lg font-thin text-white">
			Cexplorer.io offers a lot of different endpoints and for advanced users there even is a nodejs
			SDK available at <a
				href="https://github.com/vellum-labs/cexplorer-api/tree/main/packages/cexplorer-api"
				target="_blank"
				class="link"
				>https://github.com/vellum-labs/cexplorer-api/tree/main/packages/cexplorer-api</a
			>
		</p>
		<p class="text-lg font-thin text-white">
			We will use the Cexplorer API to fetch the floorprices for NFT collections by using the
			endpoint <code>https://api-mainnet-stage.cexplorer.io/v1/policy/detail?id=[POLICYID]</code> with
			[POLICYID] being the policy ID of the NFT collection.
		</p>

		<p class="text-lg font-thin text-white">An example response will look like this:</p>
		<CodeCard
			title="Cexplorer API Response Example"
			language="json"
			code={`{
  "license": "private/dev usage only.",
  "code": 200,
  "data": {
    "id": "f0ff48bbb7bbe9d59a40f1ce90e9e9d0ff5002ec48f232b49ca0fb9a",
    "policy": {
      "mintc": 320782,
      "stats": null,
      "script": {
        "json": {
          "type": "sig",
          "keyHash": "4da965a049dfd15ed1ee19fba6e2974a0b79fc416dd1796a1f97f5e1"
        },
        "type": "timelock"
      },
      "quantity": 310506,
      "last_mint": "2025-12-01T08:58:06",
      "first_mint": "2021-12-14T16:00:24"
    },
    "collection": {
      "url": "adahandle",
      "name": "ADA Handle",
      "stats": {
        "floor": 5000000,
        "owners": 66766,
        "volume": 612934424304312,
        "royalties": {
          "rate": 0.02,
          "address": "addr1qye59j5vquaprdmxf0gs2y3n20necqg3dnzxty23x07u7awkchm0w43pg2uczh4vcvdr59teny2996rq4tmq2umjyqvqlhm7d2"
        }
      }
    }
  },
  "tokens": 4,
  "ex": 0.0174,
  "debug": false
}`}
		/>

		<p class="text-lg font-thin text-white">
			As you can see, the API response contains - among other things - the following information:
		</p>
		<ul class="list-inside list-disc">
			<li>The policy ID of the NFT collection</li>
			<li>The name of the NFT collection</li>
			<li>The floor price of the NFT collection</li>
			<li>The number of owners of the NFT collection</li>
			<li>The volume of the NFT collection</li>
		</ul>

		<p class="text-lg font-thin text-white">
			We will use this data to display the floor price of the NFT collection on your TFT display.
		</p>

		<TipBox title="API Key Required" variant="info">
			Make sure to include your API key in the request headers in the field <code>"api-key"</code> -
			otherwise you might get a 401 Unauthorized error or no data at all. Also keep in mind: the free
			tier is limited and you might get rate limited if you make too many requests.
		</TipBox>
	</section>

	<section class="mb-16 flex flex-col gap-4 text-white">
		<h2 class="text-4xl font-medium">The TapTools API</h2>
		<p class="text-lg font-thin text-white">
			Once you feel ready to build real products with Cardano data, you might want to consider using
			the TapTools API:
			<a href="https://www.taptools.io/" target="_blank" class="link">TapTools</a> is a comprehensive
			Cardano analytics platform that provides detailed insights into tokens, portfolios and market data
			and offers various paid tiers for more advanced usage.
		</p>
		<p>
			You can check out the TapTools API documentation <a
				href="https://openapi.taptools.io/"
				target="_blank"
				class="link">here</a
			>.
		</p>
	</section>

	<section class="mb-16 flex flex-col gap-4 text-white">
		<h2 class="text-4xl font-medium">Whats next?</h2>
		<p class="text-lg font-thin text-white">
			Now that we have all the data we need, we can start building the Ticker. In the next workshop,
			you will learn how to build the Ticker and display the data on your TFT display.
		</p>
	</section>

	<FurtherResources
		resources={[
			{
				title: 'Minswap',
				url: 'https://minswap.org/',
				description:
					"Cardano's leading decentralized exchange. Trade tokens, provide liquidity, and access DeFi on Cardano."
			},
			{
				title: 'Cexplorer.io',
				url: 'https://cexplorer.io/',
				description:
					'Cardano blockchain explorer with API access. View transactions, addresses, and NFT collection data with a free tier available.'
			},
			{
				title: 'JPG.store',
				url: 'https://www.jpg.store/',
				description:
					'The #1 Cardano NFT marketplace. Buy, sell, and discover NFTs with no escrow and instant transactions.'
			},
			{
				title: 'TapTools',
				url: 'https://www.taptools.io/',
				description:
					'Comprehensive Cardano analytics platform. Track tokens, portfolios, and market data with detailed insights.'
			}
		]}
	/>
</SectionNavigator>

<WorkshopNavigation />
