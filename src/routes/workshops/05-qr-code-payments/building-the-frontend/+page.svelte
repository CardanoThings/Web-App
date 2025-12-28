<script>
	import { page } from '$app/state';
	import SectionNavigator from '$lib/components/SectionNavigator.svelte';
	import WorkshopNavigation from '$lib/WorkshopNavigation.svelte';
	import FurtherResources from '$lib/components/FurtherResources.svelte';
	import TipBox from '$lib/components/TipBox.svelte';
	import { MoveLeft } from 'lucide-svelte';
	import LiveCodeCard from '$lib/components/LiveCodeCard.svelte';
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

	<section class="mb-16 flex flex-col gap-4 text-white">
		<h2 class="text-4xl font-medium">Project Structure</h2>
		<p class="text-lg font-thin text-white">
			Here is the project structure of the frontend, this lives in the data directory of your
			project.
		</p>

		<div class="rounded-lg bg-gray-800/50 p-4 font-mono text-sm">
			<pre class="text-white">data/
├── index.html
├── styles.css
├── requestPayment.js #
├── transactionList.js
├── transactions.json
├── favicon.ico
└── README.md
</pre>
		</div>
	</section>

	<section class="mb-16 flex flex-col gap-4 text-white">
		<h2 class="text-4xl font-medium">HTML & CSS</h2>
		<p class="text-lg font-thin text-white">
			The HTML and CSS files are the main files that are served by the webserver. They are the entry
			point of your project.
		</p>

		<LiveCodeCard
			title="index.html"
			repo="CardanoThings/Workshops"
			branch="main"
			files={[
				{
					path: 'Workshop-05/examples/cardano-pos/data/index.html',
					language: 'html',
					filename: 'index.html'
				},
				{
					path: 'Workshop-05/examples/cardano-pos/data/styles.css',
					language: 'css',
					filename: 'styles.css'
				}
			]}
			readmePath="Workshop-05/examples/cardano-pos/data/README.md"
		/>
	</section>

	<section class="mb-16 flex flex-col gap-4 text-white">
		<h2 class="text-4xl font-medium">Creating the Payment Request</h2>
		<p class="text-lg font-thin text-white">
			Now let's create the payment request form and handle the submission. This will be a simple
			form that allows the user to enter the amount of ADA and submit it to the backend API to
			create a new payment request and display the QR code on the display.
		</p>

		<LiveCodeCard
			title="requestPayment.js"
			repo="CardanoThings/Workshops"
			branch="main"
			files={[
				{
					path: 'Workshop-05/examples/cardano-pos/data/requestPayment.js',
					language: 'javascript',
					filename: 'requestPayment.js'
				}
			]}
			readmePath="Workshop-05/examples/cardano-pos/data/README.md"
		/>
	</section>

	<section class="mb-16 flex flex-col gap-4 text-white">
		<h2 class="text-4xl font-medium">Displaying the Transaction List</h2>
		<p class="text-lg font-thin text-white">
			Now let's create the transaction list and display the transactions on the page. This will be a
			simple list that displays the transactions on the page. We will also add a function to fetch
			the transactions periodically from the backend API to update the list with transaction hashes.
		</p>

		<LiveCodeCard
			title="transactionList.js"
			repo="CardanoThings/Workshops"
			branch="main"
			files={[
				{
					path: 'Workshop-05/examples/cardano-pos/data/transactionList.js',
					language: 'javascript',
					filename: 'transactionList.js'
				}
			]}
			readmePath="Workshop-05/examples/cardano-pos/data/README.md"
		/>
	</section>

	<section class="mb-16 flex flex-col gap-4 text-white">
		<h2 class="text-4xl font-medium">What's Next?</h2>
		<p class="text-lg font-thin text-white">
			Now that you have the frontend built, you can upload the data directory to your
			microcontroller, but be aware: as you haven't built the backend yet, the frontend will not be
			able to create new payment requests or display the transaction list.
		</p>
		<p class="text-lg font-thin text-white">
			Feel free to make further advancements to the frontend, such as adding a confirmation message,
			different styling or additional features like creating a direct link to <a
				href="https://cardanoscan.io/"
				target="_blank"
				class="link">CardanoScan</a
			> for the transaction hashes.
		</p>
		<p class="text-lg font-thin text-white">
			In the next step you will build the backend API endpoints to create a new payment request,
			display the CIP-13 QR code on the display of your Microcontroller and check for payments and
			display a confirmation message on the display of your Microcontroller.
		</p>
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
