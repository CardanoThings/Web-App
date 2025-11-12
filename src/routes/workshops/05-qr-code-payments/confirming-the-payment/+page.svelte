<script>
	import { page } from '$app/state';
	import IntroContainer from '$lib/base/IntroContainer.svelte';
	import SectionNavigator from '$lib/components/SectionNavigator.svelte';
	import WorkshopNavigation from '$lib/WorkshopNavigation.svelte';
	import { MoveLeft } from 'lucide-svelte';
	import { Button } from '$lib/components/ui/button/index.js';
	let parentPage = $derived(page.url.pathname.split('/')[2]);
</script>

<section class="mb-16 flex flex-col gap-4 text-white">
	<a href={`/workshops/${parentPage}`} class="flex items-center gap-2">
		<MoveLeft size="20" />
		<h1 class="text-lg font-normal text-white sm:max-w-[50%]">Workshop 05: QR-Code Payments</h1>
	</a>
	<h2 class="text-6xl font-medium text-white sm:max-w-[50%]">Confirming the payment</h2>
	<p class="text-lg font-thin text-white sm:max-w-[50%]">
		In this last step you will implement a simple listener for the created transaction and display a
		confirmation, once the transaction has arrived in your wallet.
	</p>
</section>

<SectionNavigator>
	<section class="mb-16 flex flex-col gap-4 text-white">
		<h2 class="text-4xl font-medium">Introduction</h2>
		<p class="text-lg font-thin text-white"></p>
	</section>

	<section class="mb-16 flex flex-col gap-4 text-white">
		<h2 class="text-4xl font-medium">Setting up Transaction Monitoring</h2>
		<p class="text-lg font-thin text-white"></p>
	</section>

	<section class="mb-16 flex flex-col gap-4 text-white">
		<h2 class="text-4xl font-medium">Polling for Transactions</h2>
		<p class="text-lg font-thin text-white"></p>
	</section>

	<section class="mb-16 flex flex-col gap-4 text-white">
		<h2 class="text-4xl font-medium">Displaying Confirmation</h2>
		<p class="text-lg font-thin text-white"></p>
	</section>

	<section class="mb-16 flex flex-col gap-4 text-white">
		<h2 class="text-4xl font-medium">Error Handling</h2>
		<p class="text-lg font-thin text-white"></p>
	</section>
</SectionNavigator>

<WorkshopNavigation />

