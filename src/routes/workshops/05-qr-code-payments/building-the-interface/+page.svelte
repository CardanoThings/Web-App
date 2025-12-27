<script>
	import { page } from '$app/state';
	import SectionNavigator from '$lib/components/SectionNavigator.svelte';
	import WorkshopNavigation from '$lib/WorkshopNavigation.svelte';
	import FurtherResources from '$lib/components/FurtherResources.svelte';
	import TipBox from '$lib/components/TipBox.svelte';
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
		<h2 class="text-4xl font-medium">Building the Interface</h2>
		<p class="text-lg font-thin text-white">
			Now that you have your webserver running, it's time to build the payment interface. First we
			will create the HTML and CSS files for the interface, which will be served by the webserver.
			It shows a list of payment requests, their status and a button to create a new payment
			request. Once the user clicks the button, the webserver will create a new payment request,
			save it in a JSON file and displays the QR code on the Microcontroller's display. We then wait
			for the user to scan the QR code, sign and submit the transaction with Yoroi on their phone.
			Once the transaction is confirmed on chain (we are checking the Koios API for this), the
			webserver will update the status of the payment request and display a confirmation message on
			the Microcontroller's display.
		</p>

		<TipBox title="Important Note" variant="info">
			You have to upload the data directory to the microcontroller every time you want to update the
			interface. You learned how to do this in the <a
				href="/workshops/05-qr-code-payments/getting-started"
				class="link">Getting Started</a
			> section of this workshop.
		</TipBox>
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
