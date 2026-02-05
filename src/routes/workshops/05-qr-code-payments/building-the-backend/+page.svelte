<script>
	import { page } from '$app/state';
	import SectionNavigator from '$lib/components/SectionNavigator.svelte';
	import WorkshopNavigation from '$lib/WorkshopNavigation.svelte';
	import LiveCodeCard from '$lib/components/LiveCodeCard.svelte';
	import { MoveLeft } from 'lucide-svelte';
	import CodeCard from '$lib/components/CodeCard.svelte';
	import TipBox from '$lib/components/TipBox.svelte';
	import FurtherResources from '$lib/components/FurtherResources.svelte';
	import ImageSlideshow from '$lib/components/ImageSlideshow.svelte';
	import * as Card from '$lib/components/ui/card/index.js';
	let parentPage = $derived(page.url.pathname.split('/')[2]);
	let { data } = $props();
</script>

<section class="mb-8 flex flex-col gap-4 text-white">
	<a
		href={`/workshops/${parentPage}`}
		class="flex items-center gap-2 text-lg font-normal text-white sm:max-w-[50%]"
	>
		<MoveLeft size="20" />
		{data.workshop.title}
	</a>
	<h2 class="text-5xl font-medium text-white sm:max-w-[50%] sm:text-6xl">{data.step.title}</h2>
	<p class="text-lg font-thin text-white sm:max-w-[50%]">
		{data.step.description}
	</p>
</section>

<SectionNavigator>
	<section class="mb-16 flex flex-col gap-4 text-white">
		<h2 class="text-4xl font-medium">Before we get started</h2>
		<p class="text-lg font-thin text-white">
			For this part of the workshop, you should create a second wallet, so you send payments from
			one wallet and listen for the payments in the other wallet. This way you can test the payment
			listener without having to send real payments. You already know how to create a new wallet
			from <a href="/workshops/01-basics/cardano-setup" class="link">Workshop 01</a>.
		</p>

		<TipBox title="CIP-13 Support" variant="warning">
			As of today, no mobile wallet currently supports CIP-13 payments correctly, so you'll have to
			send the payment with the exact lovelace amount manually with a desktop wallet. We are working
			on getting wallets to automatically attach exact lovelace amounts to the payment, you can read
			more about it in this
			<a href="https://github.com/cardano-foundation/CIPs/issues/836" target="_blank" class="link"
				>CIP-0013 GitHub issue</a
			>.
		</TipBox>
	</section>

	<section class="mb-16 flex flex-col gap-4 text-white">
		<h2 class="text-4xl font-medium">Core Concepts</h2>
		<h3 class="text-2xl font-medium">Identifying the Payment Request</h3>
		<p class="text-lg font-thin text-white">
			To match a payment transaction on chain with a payment request in the transaction list, we
			will add the payment request ID in lovelace to the payment. For example: instead of requesting
			10 ADA to be paid, we will request 10.000001 ADA to be paid in the CIP-13 payment URI. Once we
			find a payment transaction on chain with the exact lovelace amount (10000001 lovelace), we can
			then match it with the payment request in the transaction list.
		</p>

		<TipBox title="Limitations" variant="info">
			This is a very simple approach, which 100% relies on individual lovelace amounts being added
			to the amount of lovelace to be paid. This concept will fail if the user pays a different
			amount or there are multiple UTxOs with the expected lovelace amount. You can make this
			approach more robust by filtering for additional parameters like the timestamp of the
			transaction.
		</TipBox>

		<h3 class="text-2xl font-medium">Listening for the Transaction</h3>
		<p class="text-lg font-thin text-white">
			As there is no way to know the transaction hash or if the user even scanned the QR code and
			submitted the transaction, we need to listen for the transaction to be confirmed on chain and
			an UTxO with the exact lovelace amount to appear for the recipient address.
		</p>
		<p class="text-lg font-thin text-white">
			The Koios endpoint we will use to listen for the transaction is
			<a href="https://preprod.koios.rest/#get-/address_utxos" target="_blank" class="link"
				>/address_utxos</a
			>. This endpoint requires a POST request with the address as a body parameter like this:
		</p>

		<CodeCard
			title="API Request Example"
			language="json"
			code={`{
  "_addresses": [
    "addr_test1qq3y2eqxprkk0dz2tyeuhav4hj3fem4duersn7w6eees9ru55stym27wkwyqw3z6uwr57plm22pyse00u9atdyzecg8skz0jec"
  ]
}`}
		/>

		<p class="text-lg font-thin text-white">
			The API will respond with an array containing all UTxOs for the address. Here's an example
			response:
		</p>
		<CodeCard
			title="API Response Example"
			language="json"
			code={`[
	{
		"tx_hash": "7ca6e052da9fa365ae156b40e5d6c208b808c3faa9985a8b1562ef9136fbdbd5",
		"tx_index": 0,
		"address": "addr_test1qq3y2eqxprkk0dz2tyeuhav4hj3fem4duersn7w6eees9ru55stym27wkwyqw3z6uwr57plm22pyse00u9atdyzecg8skz0jec",
		"value": "15140930",
		"stake_address": "stake_test1uz22g9jd408t8zq8g3dw8p60qla49qjgvhh7z74kjpvuyrctlwf4m",
		"payment_cred": "2245640608ed67b44a5933cbf595bca29ceeade64709f9dace73028f",
		"epoch_no": 258,
		"block_height": 4223127,
		"block_time": 1765568200,
		"datum_hash": null,
		"inline_datum": null,
		"reference_script": null,
		"asset_list": null,
		"is_spent": false
	},
	{
		"tx_hash": "a197fae86248a054d6b7434a6a71aebed456376218862309f8370ed894f26cf9",
		"tx_index": 0,
		"address": "addr_test1qq3y2eqxprkk0dz2tyeuhav4hj3fem4duersn7w6eees9ru55stym27wkwyqw3z6uwr57plm22pyse00u9atdyzecg8skz0jec",
		"value": "16998316",
		"stake_address": "stake_test1uz22g9jd408t8zq8g3dw8p60qla49qjgvhh7z74kjpvuyrctlwf4m",
		"payment_cred": "2245640608ed67b44a5933cbf595bca29ceeade64709f9dace73028f",
		"epoch_no": 258,
		"block_height": 4223261,
		"block_time": 1765572045,
		"datum_hash": null,
		"inline_datum": null,
		"reference_script": null,
		"asset_list": null,
		"is_spent": false
	}]`}
		/>

		<p class="text-lg font-thin text-white">
			We can directly filter for the expected amount of lovelace via the <a
				href="https://preprod.koios.rest/#overview--horizontal-filtering"
				target="_blank"
				class="link">horizontal filtering</a
			>
			feature of the Koios API by adding the following query parameter to the endpoint like this
			<code
				class="inline-block max-w-full rounded bg-gray-800 px-2 py-1 text-sm break-all whitespace-normal text-white"
				>https://preprod.koios.rest/api/v1/address_utxos?value=eq.13000004</code
			>
		</p>

		<p class="text-lg font-thin text-white">
			This will return only the UTxOs with the value of 13000004 Lovelace, where 13 is the amount of
			ADA requested and the 4 added lovelace lets us identify the payment request for this specific
			payment.
		</p>

		<p class="text-lg font-thin text-white">
			Once the API returns an UTxO for this query, we can assume that the payment has been made and
			display a confirmation message on the TFT display, update the backend database / JSON file
			with the transaction hash and stop listening for that specific payment.
		</p>

		<TipBox title="Future Improvements" variant="info">
			There currently is a CIP being worked on which will allow adding individual metadata to CIP-13
			payment URIs (such as a unique payment ID for example) for more robust payment systems in the
			future.<br />Read all about it in this
			<a href="https://github.com/cardano-foundation/CIPs/pull/843" target="_blank" class="link"
				>CIP-0157 GitHub issue</a
			>
		</TipBox>
	</section>

	<section class="mb-16 flex flex-col gap-4 text-white">
		<h2 class="text-4xl font-medium">Putting it all together</h2>
		<p class="text-lg font-thin text-white">
			You can use the same setup as the one you used for the webserver in the <a
				href="/workshops/05-qr-code-payments/getting-started"
				class="link">Getting Started</a
			> section of this workshop, but you will need to add a few things to your main Arduino sketch and
			secrets.h - the Wifi Manager is the same as before.
		</p>

		<LiveCodeCard
			title="Main Arduino Sketch"
			repo="CardanoThings/Workshops"
			branch="main"
			files={[
				{
					path: 'Workshop-05/examples/cardano-pos/cardano-pos.ino',
					language: 'cpp',
					filename: 'cardano-pos.ino'
				},
				{
					path: 'Workshop-05/examples/cardano-pos/secrets.h.example',
					language: 'cpp',
					filename: 'secrets.h.example'
				}
			]}
			readmePath="Workshop-05/examples/cardano-pos/README.md"
		/>

		<p class="text-lg font-thin text-white">
			Make sure you have added your Wifi credentials, your payment address and the correct Koios API
			endpoint to your secrets.h file.
		</p>
	</section>

	<section class="mb-16 flex flex-col gap-4 text-white">
		<h2 class="text-4xl font-medium">Building the Webserver</h2>
		<p class="text-lg font-thin text-white">
			Now let's build the webserver that will be used to serve the frontend, create new payment
			requests and store the payment requests in a JSON file. Of cause you will need your basic
			setup from the <a href="/workshops/05-qr-code-payments/getting-started" class="link"
				>Getting Started</a
			> section of this workshop to connect to your WiFi network, etc.
		</p>

		<LiveCodeCard
			title="Webserver Implementation"
			repo="CardanoThings/Workshops"
			branch="main"
			files={[
				{
					path: 'Workshop-05/examples/cardano-pos/web_server.h',
					language: 'cpp',
					filename: 'web_server.h'
				},
				{
					path: 'Workshop-05/examples/cardano-pos/web_server.cpp',
					language: 'cpp',
					filename: 'web_server.cpp'
				}
			]}
			readmePath="Workshop-05/examples/cardano-pos/web_server.md"
		/>

		<TipBox title="A note on updating the webserver data directory" variant="info">
			If you include a transactions.json file in your data directory, this will overwrite the
			existing transaction list when you upload the data directory. While this is great for testing,
			you will loose the transaction data of previous payment requests and their transaction hashes.
		</TipBox>
	</section>

	<section class="mb-16 flex flex-col gap-4 text-white">
		<h2 class="text-4xl font-medium">QR-Code & Transaction Listener</h2>
		<p class="text-lg font-thin text-white">
			Now let's build the QR-Code Display & Transaction Listener. This will be a simple function
			that will display the CIP-13 QR code on the display of your Microcontroller with the correct
			amount and defined payment address, then listen for payments to be confirmed on chain and
			display a confirmation message on the display of your Microcontroller once the payment
			transaction is confirmed on chain.
		</p>

		<LiveCodeCard
			title="QR-Code & Transaction Listener"
			repo="CardanoThings/Workshops"
			branch="main"
			files={[
				{
					path: 'Workshop-05/examples/cardano-pos/transaction_qr.h',
					language: 'cpp',
					filename: 'transaction_qr.h'
				},
				{
					path: 'Workshop-05/examples/cardano-pos/transaction_qr.cpp',
					language: 'cpp',
					filename: 'transaction_qr.cpp'
				}
			]}
			readmePath="Workshop-05/examples/cardano-pos/transaction_qr.md"
		/>

		<p class="text-lg font-thin text-white">
			Now that you have the backend built, you can upload the data directory and the <a
				href="https://github.com/CardanoThings/Workshops/tree/main/Workshop-05/examples/cardano-pos"
				target="_blank"
				class="link">complete code</a
			> to your microcontroller. Navigate to the frontend of your microcontroller and test the payment
			system.
		</p>

		<TipBox title="Mobile Wallet CIP-13 Support" variant="info">
			Keep in mind that you will need to send the exact lovelace amount manually with a desktop
			wallet, as mobile wallets currently do not support CIP-13 payments with exact lovelace
			amounts.
		</TipBox>
	</section>

	<section class="mb-16 flex flex-col gap-4 text-white">
		<h2 class="text-4xl font-medium">What's Next?</h2>

		<p class="text-lg font-thin text-white">
			This concludes this workshop and you can now implement further features: What about a
			screensaver to be displayed when no payment is expected? Or a more sophisticated frontend? If
			your CYD supports touch input, you can even build a more sophisticated frontend with a touch
			screen.
		</p>

		<p class="text-lg font-thin text-white">
			How about a physical vending machine that accepts ADA payments? Or a smart locker, that only
			opens when you send a certain amount of ADA to a specific address? Happy building!
		</p>

		<Card.Root>
			<Card.Header>
				<Card.Title>QR-Code Display on your CYD/ESP32</Card.Title>
			</Card.Header>
			<Card.Content>
				<ImageSlideshow
					images={['/images/workshops/CardanoPOS1.jpg', '/images/workshops/CardanoPOS2.jpg']}
					alt="Cardano POS Project"
					autoplay={true}
					autoplayInterval={5000}
					showIndicators={true}
					showArrows={false}
				/>
			</Card.Content>
		</Card.Root>

		<TipBox title="Production readiness" variant="warning">
			Please keep in mind, that these workshops are educational and not ready for production use.
			You will need to add a lot of error handling, security measures such as authentication for the
			backend and further features to make it production ready.
		</TipBox>
	</section>

	<FurtherResources
		resources={[
			{
				title: 'LVGL - Light and Versatile Graphics Library',
				url: 'https://lvgl.io/',
				description:
					'If you want to build more sophisticated UIs, you can use the LVGL library to create beautiful UIs for any MCU, MPU and display type. Features 30+ built-in widgets, 100+ style properties, and web-inspired layouts.'
			},
			{
				title: 'CIP-0013: Current state of integration and further advancements',
				url: 'https://github.com/cardano-foundation/CIPs/issues/836',
				description:
					'GitHub issue discussing the current state of CIP-0013 (Cardano URI Scheme) integration across mobile wallets and proposed improvements for asset support and metadata in payment links.'
			},
			{
				title: 'CIP-0157',
				url: 'https://github.com/cardano-foundation/CIPs/pull/843',
				description:
					'CIP-0157 proposal for adding metadata to CIP-13 payment URIs, enabling more robust payment systems with unique payment IDs.'
			}
		]}
	/>
</SectionNavigator>

<WorkshopNavigation />
