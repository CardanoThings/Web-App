<script>
	import { page } from '$app/state';
	import SectionNavigator from '$lib/components/SectionNavigator.svelte';
	import WorkshopNavigation from '$lib/WorkshopNavigation.svelte';
	import FurtherResources from '$lib/components/FurtherResources.svelte';
	import CodeCard from '$lib/components/CodeCard.svelte';
	import LiveCodeCard from '$lib/components/LiveCodeCard.svelte';
	import TipBox from '$lib/components/TipBox.svelte';
	import PingPongWallet from '$lib/base/PingPongWallet.svelte';
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
		<h2 class="text-4xl font-medium">Setting up the API</h2>
		<p class="text-lg font-thin text-white">
			To fetch your wallet balance (and other information about your account), we'll use the Koios
			API endpoint
			<a href="https://preprod.koios.rest/#post-/account_info" target="_blank" class="link"
				>/account_info</a
			>. This endpoint requires a POST request with your stake address in the request body.
		</p>
		<p class="text-lg font-thin text-white">
			First, you'll need to get your stake address from Yoroi:
		</p>
		<ol>
			<li>Open your Yoroi wallet extension</li>
			<li>Make sure you're on the Preprod Testnet (orange banner at the top)</li>
			<li>Go to the "Wallet" section</li>
			<li>Click on the "Receive" tab</li>
			<li>Copy your stake address from the rewards section (it starts with "stake_test1...")</li>
		</ol>
		<p class="text-lg font-thin text-white">
			You can test the API endpoint directly using a tool like
			<a href="https://insomnia.rest/" target="_blank" class="link">Insomnia</a> or
			<a href="https://www.postman.com/" target="_blank" class="link">Postman</a>. The endpoint
			expects a JSON payload like this:
		</p>
		<CodeCard
			title="API Request Example"
			language="json"
			code={`{
  "_stake_addresses": [
    "stake_test1urq4rcynzj4uxqc74c852zky7wa6epgmn9r6k3j3gv7502q8jks0l"
  ]
}`}
		/>
		<p class="text-lg font-thin text-white">
			The API will respond with an array containing account information. Here's an example response:
		</p>
		<CodeCard
			title="API Response Example"
			language="json"
			code={`[
  {
    "stake_address": "stake_test1uz22g9jd408t8zq8g3dw8p60qla49qjgvhh7z74kjpvuyrctlwf4m",
    "status": "registered",
    "delegated_pool": null,
    "delegated_drep": "drep1ytesfw7n2pq5ys2rk0m7fxxd2dyagf820wy24d82rdd9yxqfm4qjg",
    "total_balance": "10497440929",
    "utxo": "10497440929",
    "rewards": "0",
    "withdrawals": "0",
    "rewards_available": "0",
    "deposit": "2000000",
    "reserves": "0",
    "treasury": "0",
    "proposal_refund": "0"
  }
]`}
		/>
		<p class="text-lg font-thin text-white">Key fields in the response:</p>
		<ul>
			<li><strong>stake_address</strong>: Your stake address</li>
			<li><strong>status</strong>: Registration status of the stake address</li>
			<li>
				<strong>total_balance</strong>: Total balance in Lovelace (1 tADA = 1,000,000 Lovelace)
			</li>
			<li><strong>utxo</strong>: Total UTXO value in Lovelace</li>
			<li><strong>rewards_available</strong>: Available rewards in Lovelace</li>
			<li><strong>delegated_pool</strong>: Pool ID if delegated (null if not)</li>
			<li><strong>delegated_drep</strong>: DRep ID for governance voting</li>
		</ul>
	</section>

	<section class="mb-16 flex flex-col gap-4 text-white">
		<h2 class="text-4xl font-medium">Fetching the Balance</h2>
		<p class="text-lg font-thin text-white">
			Now let's create an Arduino sketch that fetches your stake address balance. The code will:
		</p>
		<ol>
			<li>Connect to WiFi</li>
			<li>Make a POST request to the Koios API with your stake address</li>
			<li>Parse the JSON response to extract the total balance</li>
			<li>Display the balance in the serial monitor</li>
		</ol>

		<LiveCodeCard
			title="Wallet Balance from Koios"
			repo="CardanoThings/Workshops"
			branch="main"
			files={[
				{
					path: 'Workshop-02/examples/wallet-balance/wallet-balance.ino',
					language: 'cpp'
				}
			]}
			readmePath="Workshop-02/examples/wallet-balance/README.md"
			howItWorksTitle="How the Stake Address Balance Code Works"
			footerText="Copy and paste the code into your Arduino IDE. Make sure to replace 'Your SSID' and 'Your Password' with your WiFi credentials, and replace 'stake_test1...' with your actual stake address. Upload it to your microcontroller and open the serial monitor to see your balance."
		/>
	</section>

	<section class="mb-16 flex flex-col gap-4 text-white">
		<h2 class="text-4xl font-medium">Listening for Changes</h2>
		<p class="text-lg font-thin text-white">
			The code above already includes logic to detect balance changes. It stores the previous
			balance and compares it with the current balance. When a change is detected, it prints a
			message to the serial monitor.
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
		<PingPongWallet />
	</section>

	<section class="mb-16 flex flex-col gap-4 text-white">
		<h2 class="text-4xl font-medium">Alternative APIs</h2>
		<p class="text-lg font-thin text-white">
			While Koios is free and open source, there are other APIs you can use to fetch stake address
			data:
		</p>

		<h3 class="mt-4 text-2xl font-medium">Blockfrost</h3>
		<p class="text-lg font-thin text-white">
			<a href="https://blockfrost.io/" target="_blank" class="link">Blockfrost</a> is a popular
			Cardano API that offers both free and paid tiers. It uses a simpler GET request format and
			requires an API key. To get an API key, you need to sign up at
			<a href="https://blockfrost.io/" target="_blank" class="link">blockfrost.io</a> and create a new
			project on the dashboard. Make sure to select the Preprod Testnet for testing. After you have created
			your project, you can copy your API key and use it in your code below.
		</p>
		<p class="text-lg font-thin text-white">
			The Blockfrost API uses a GET request with the stake address in the URL path and requires your
			API key in the <code>project_id</code> header. You can find the complete API documentation at
			<a href="https://docs.blockfrost.io/" target="_blank" class="link">docs.blockfrost.io</a>.
		</p>
		<p class="text-lg font-thin text-white">
			The Blockfrost API will respond with a slightly different structure:
		</p>
		<CodeCard
			title="Blockfrost API Response Example"
			language="json"
			code={`{
  "stake_address": "stake_test1ux3g2c9dx2nhhehyrezyxpkstartcqmu9hk63qgfkccw5rqttygt7",
  "active": true,
  "active_epoch": 412,
  "controlled_amount": "619154618165",
  "rewards_sum": "319154618165",
  "withdrawals_sum": "12125369253",
  "reserves_sum": "319154618165",
  "treasury_sum": "12000000",
  "withdrawable_amount": "319154618165",
  "pool_id": "pool1pu5jlj4q9w9jlxeu370a3c9myx47md5j5m2str0naunn2q3lkdy",
  "drep_id": "drep15cfxz9exyn5rx0807zvxfrvslrjqfchrd4d47kv9e0f46uedqtc"
}`}
		/>
		<p class="text-lg font-thin text-white">Key fields in the response:</p>
		<ul>
			<li><strong>stake_address</strong>: Your stake address</li>
			<li><strong>active</strong>: Whether the stake address is currently active</li>
			<li>
				<strong>controlled_amount</strong>: Total controlled balance in Lovelace (1 tADA = 1,000,000
				Lovelace)
			</li>
			<li><strong>rewards_sum</strong>: Total rewards earned in Lovelace</li>
			<li><strong>withdrawable_amount</strong>: Amount available to withdraw in Lovelace</li>
			<li><strong>pool_id</strong>: Stake pool ID if delegated</li>
			<li><strong>drep_id</strong>: DRep ID for governance voting</li>
		</ul>
		<p class="text-lg font-thin text-white">
			Here's an Arduino example for fetching stake account information like your wallet balance
			using Blockfrost:
		</p>
		<LiveCodeCard
			title="Wallet Balance from Blockfrost"
			repo="CardanoThings/Workshops"
			branch="main"
			files={[
				{
					path: 'Workshop-02/examples/wallet-balance-blockfrost/wallet-balance-blockfrost.ino',
					language: 'cpp'
				}
			]}
			readmePath="Workshop-02/examples/wallet-balance-blockfrost/README.md"
			howItWorksTitle="How the Blockfrost Arduino Code Works"
			footerText="To use Blockfrost, you'll need to sign up at blockfrost.io and get an API key. The free tier has rate limits but is sufficient for most projects."
		/>

		<TipBox title="Advanced Users" variant="purple">
			If you're using PlatformIO, Blockfrost provides an official Arduino SDK that simplifies
			working with their API. The SDK handles authentication, serialization, and provides type-safe
			methods for all Blockfrost endpoints. Check it out at
			<a
				href="https://github.com/blockfrost/blockfrost-arduino"
				target="_blank"
				class="underline hover:text-purple-200">github.com/blockfrost/blockfrost-arduino</a
			>.
		</TipBox>

		<h3 class="mt-4 text-2xl font-medium">Maestro</h3>
		<p class="text-lg font-thin text-white">
			<a href="https://www.gomaestro.org/" target="_blank" class="link">Maestro</a> is another Cardano
			API provider with a free tier. It offers similar functionality to Blockfrost and Koios, with different
			rate limits and features.
		</p>

		<h3 class="mt-4 text-2xl font-medium">Dolos</h3>
		<p class="text-lg font-thin text-white">
			You can also run your own API using <a
				href="https://docs.txpipe.io/dolos"
				target="_blank"
				class="link">TxPipes Dolos</a
			>
			which provides a
			<a href="https://docs.txpipe.io/dolos/apis/minibf" target="_blank" class="link"
				>Mini Blockfrost API</a
			> to access Cardano blockchain data.
		</p>
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
				title: 'Blockfrost API Documentation',
				url: 'https://docs.blockfrost.io/',
				description: 'Complete API documentation for Blockfrost endpoints.'
			},
			{
				title: 'Maestro',
				url: 'https://www.gomaestro.org/',
				description: 'Another Cardano API provider.'
			},
			{
				title: 'TxPipe Dolos',
				url: 'https://docs.txpipe.io/dolos',
				description: 'Run your own Cardano node with Mini Blockfrost API compatibility.'
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
