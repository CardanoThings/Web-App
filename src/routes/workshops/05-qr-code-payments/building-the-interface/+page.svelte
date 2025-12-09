<script>
	import { page } from '$app/state';
	import SectionNavigator from '$lib/components/SectionNavigator.svelte';
	import WorkshopNavigation from '$lib/WorkshopNavigation.svelte';
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
		<h2 class="text-4xl font-medium">Building the Payment Interface</h2>
		<p class="text-lg font-thin text-white">
			Now that you have your webserver running, it's time to build the payment interface. This
			interface will allow users to create payment requests through the web interface, which will
			then be displayed on your microcontroller's TFT display as a QR code.
		</p>

		<section class="mb-16 flex flex-col gap-4 text-white">
			<div class="rounded-lg border border-yellow-500/50 bg-yellow-500/10 p-8 text-center">
				<h2 class="mb-4 text-3xl font-medium text-yellow-400">Work in Progress</h2>
				<p class="text-lg font-thin text-white">
					This workshop is currently under development. Content will be available soon.
				</p>
			</div>
		</section>
	</section>

	<FurtherResources
		resources={[
			{
				title: 'W3Schools',
				url: 'https://www.w3schools.com/',
				description:
					'Learn HTML, CSS, JavaScript, and other web technologies with free tutorials, references, and examples.'
			}
		]}
	/>
</SectionNavigator>

<WorkshopNavigation />
