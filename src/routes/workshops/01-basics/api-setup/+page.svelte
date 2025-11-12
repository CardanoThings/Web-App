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
		<h1 class="text-lg font-normal text-white sm:max-w-[50%]">Workshop 01: The Basics</h1>
	</a>
	<h2 class="text-6xl font-medium text-white sm:max-w-[50%]">API Setup</h2>
	<p class="text-lg font-thin text-white sm:max-w-[50%]">
		Now that you're all set up for developing with your ESP32 microcontroller, we will make the
		first call to Koios - a free and open source API on Cardano - get the current epoch number and
		log it to the console of the Arduino IDE.
	</p>
</section>

<SectionNavigator>
	<section class="mb-16 flex flex-col gap-4 text-white">
		<h2 class="text-4xl font-medium">What is Koios?</h2>

		<p class="text-lg font-thin text-white">
			<a href="https://koios.rest/" target="_blank" class="link">Koios</a> is a distributed & open-source
			public API query layer for Cardano, that is elastic in nature and addresses ever-demanding requirements
			from Cardano Blockchain. It provides a easy to query RESTful layer that has a lot of flexibility
			to cater for different data consumption requirements from blockchain.
		</p>
	</section>

	<section class="mb-16 flex flex-col gap-4 text-white">
		<h2 class="text-4xl font-medium">API Endpoints</h2>
		<p class="text-lg font-thin text-white"></p>
	</section>

	<section class="mb-16 flex flex-col gap-4 text-white">
		<h2 class="text-4xl font-medium">Fetching Data</h2>
		<p class="text-lg font-thin text-white"></p>
	</section>

	<section class="mb-16 flex flex-col gap-4 text-white">
		<h2 class="text-4xl font-medium">Creating the sketch</h2>
		<p class="text-lg font-thin text-white"></p>
	</section>
</SectionNavigator>

<WorkshopNavigation />
