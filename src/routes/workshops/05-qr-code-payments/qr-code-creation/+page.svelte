<script>
	import { page } from '$app/state';
	import SectionNavigator from '$lib/components/SectionNavigator.svelte';
	import WorkshopNavigation from '$lib/WorkshopNavigation.svelte';
	import { MoveLeft } from 'lucide-svelte';
	let parentPage = $derived(page.url.pathname.split('/')[2]);
</script>

<section class="mb-8 flex flex-col gap-4 text-white">
	<a href={`/workshops/${parentPage}`} class="flex items-center gap-2">
		<MoveLeft size="20" />
		<h1 class="text-lg font-normal text-white sm:max-w-[50%]">Workshop 05: QR-Code Payments</h1>
	</a>
	<h2 class="text-6xl font-medium text-white sm:max-w-[50%]">QR-Code Creation</h2>
	<p class="text-lg font-thin text-white sm:max-w-[50%]">
		You will learn how to create and display a QR-Code with a CIP-13 Payment URI on your microcontroller
		display that can be scanned to send a transaction by using your smartphone and a mobile wallet (tbd).
	</p>
</section>

<SectionNavigator>
	<section class="mb-16 flex flex-col gap-4 text-white">
		<div class="rounded-lg border border-yellow-500/50 bg-yellow-500/10 p-8 text-center">
			<h2 class="mb-4 text-3xl font-medium text-yellow-400">Work in Progress</h2>
			<p class="text-lg font-thin text-white">
				This workshop is currently under development. Content will be available soon.
			</p>
		</div>
	</section>
</SectionNavigator>

<WorkshopNavigation />
