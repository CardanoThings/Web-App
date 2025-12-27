<script>
	import { page } from '$app/state';
	import SectionNavigator from '$lib/components/SectionNavigator.svelte';
	import WorkshopNavigation from '$lib/WorkshopNavigation.svelte';
	import { MoveLeft } from 'lucide-svelte';
	import CodeCard from '$lib/components/CodeCard.svelte';
	import TipBox from '$lib/components/TipBox.svelte';
	import FurtherResources from '$lib/components/FurtherResources.svelte';
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
		<h2 class="text-4xl font-medium">Before we get started</h2>
		<p class="text-lg font-thin text-white">
			For this part of the workshop, you should create a second wallet, so you send payments from
			one wallet and listen for the payments in the other wallet. This way you can test the payment
			listener without having to send real payments. You already know how to create a new wallet
			from <a href="/workshops/01-basics/cardano-setup" class="link">Workshop 01</a>.
		</p>
	</section>

	<section class="mb-16 flex flex-col gap-4 text-white">
		<h2 class="text-4xl font-medium">Core Concept</h2>
		<p class="text-lg font-thin text-white">
			As we do not know the transaction hash or if the user even scanned the QR code and submitted
			the transaction, we need to listen for the transaction to be confirmed on chain and an UTxO
			with the exact lovelace amount to appear for the recipient address.
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
			To not return all UTxOs and then having to loop through them, we can directly filter for the
			amount of lovelace via the <a
				href="https://preprod.koios.rest/#overview--horizontal-filtering"
				target="_blank"
				class="link">horizontal filtering</a
			>
			feature of the Koios API by adding the following query parameter to the endpoint like this
			<code class="rounded bg-gray-800 px-2 py-1 text-white"
				>https://preprod.koios.rest/api/v1/address_utxos?value=eq.15140930</code
			>. This will return only the UTxOs with the value of 15140930 Lovelace.
		</p>

		<p class="text-lg font-thin text-white">
			Once the API returns an UTxO for this query, we can assume that the payment has been made and
			display a confirmation message on the TFT display, update the backend database / JSON file
			with the transaction hash and stop listening for that specific payment.
		</p>

		<TipBox title="Caution" variant="warning">
			This is a very simple approach, which 100% relies on individual lovelace amounts being added
			to the amount of lovelace to be paid. This concept will fail if the user pays a different
			amount or there are multiple UTxOs with the expected lovelace amount. You can make this
			approach more robust by filtering for additional parameters like the timestamp of the
			transaction.
		</TipBox>

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
		<h2 class="text-4xl font-medium">Building the Payment Listener</h2>
		<p class="text-lg font-thin text-white">
			This part is pretty straight forward after all you have learned so far: Add a new function to
			display the QR code once the API on the Microcontroller receives a new payment request. Then
			regularly check the Koios API for the payment to be confirmed on chain and an UTxO with the
			exact lovelace amount to appear for the recipient address and display a confirmation message
			on the TFT display.
		</p>
	</section>

	<FurtherResources
		resources={[
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
