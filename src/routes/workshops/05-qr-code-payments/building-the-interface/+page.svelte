<script>
	import { page } from '$app/state';
	import IntroContainer from '$lib/base/IntroContainer.svelte';
	import SectionNavigator from '$lib/components/SectionNavigator.svelte';
	import WorkshopNavigation from '$lib/WorkshopNavigation.svelte';
	import SyntaxHighlighter from '$lib/components/SyntaxHighlighter.svelte';
	import * as Card from '$lib/components/ui/card/index.js';
	import { MoveLeft } from 'lucide-svelte';
	import { Button } from '$lib/components/ui/button/index.js';
	let parentPage = $derived(page.url.pathname.split('/')[2]);
	let { data } = $props();
</script>

<section class="mb-8 flex flex-col gap-4 text-white">
	<a href={`/workshops/${parentPage}`} class="flex items-center gap-2">
		<MoveLeft size="20" />
		<h1 class="text-lg font-normal text-white sm:max-w-[50%]">Workshop 05: QR-Code Payments</h1>
	</a>
	<h2 class="text-6xl font-medium text-white sm:max-w-[50%]">Building the Interface</h2>
	<p class="text-lg font-thin text-white sm:max-w-[50%]">
		You will learn how to build a simple payment user interface utilizing the touch capabilities of your
		microcontroller and your knowledge from former workshops about the TFT_eSPI Library.
	</p>
</section>

<SectionNavigator>
	<section class="mb-16 flex flex-col gap-4 text-white">
		<h2 class="text-4xl font-medium">Introduction</h2>
		<p class="text-lg font-thin text-white">
			In this step, we'll create a payment interface that allows users to enter a payment amount using
			the touch screen. This interface will be the foundation for the QR code payment system we'll build
			in the following steps.
		</p>
		<p class="text-lg font-thin text-white">
			The interface will include:
		</p>
		<ul>
			<li>A numeric keypad for entering amounts</li>
			<li>An amount display area</li>
			<li>Confirm and cancel buttons</li>
			<li>Touch input handling</li>
		</ul>
		<p class="text-lg font-thin text-white">
			This combines everything you've learned about TFT displays and touch screens from previous
			workshops into a functional payment interface.
		</p>
	</section>

	<section class="mb-16 flex flex-col gap-4 text-white">
		<h2 class="text-4xl font-medium">Designing the UI Layout</h2>
		<p class="text-lg font-thin text-white">
			A good payment interface should be intuitive and easy to use. Here's a recommended layout:
		</p>
		<ul>
			<li>
				<strong>Top Section:</strong> Title and amount display area (shows entered amount)
			</li>
			<li>
				<strong>Middle Section:</strong> Numeric keypad (0-9, decimal point, clear)
			</li>
			<li>
				<strong>Side Section:</strong> Action buttons (Confirm, Cancel)
			</li>
		</ul>
		<p class="text-lg font-thin text-white">
			<strong>Design Principles:</strong>
		</p>
		<ul>
			<li>Large, easy-to-tap buttons</li>
			<li>Clear visual feedback when buttons are pressed</li>
			<li>Readable text sizes</li>
			<li>Good contrast between elements</li>
			<li>Logical button arrangement (like a phone keypad)</li>
		</ul>
		<p class="text-lg font-thin text-white">
			The layout should make it easy for users to enter amounts quickly and accurately, even on a small
			touch screen.
		</p>
	</section>

	<section class="mb-16 flex flex-col gap-4 text-white">
		<h2 class="text-4xl font-medium">Implementing Touch Interactions</h2>
		<p class="text-lg font-thin text-white">
			Touch input handling is crucial for a responsive interface. You need to:
		</p>
		<ol>
			<li>Detect touch events</li>
			<li>Determine which button was touched</li>
			<li>Provide visual feedback</li>
			<li>Handle debouncing to prevent multiple triggers</li>
		</ol>
		<p class="text-lg font-thin text-white">
			Here's a simple example to get started:
		</p>
		<Card.Root>
			<Card.Header class="mb-0 pb-0">
				<Card.Title>Simple Touch Button Example</Card.Title>
			</Card.Header>
			<Card.Content>
				<SyntaxHighlighter language="cpp" code={data.simpleUICode} />
			</Card.Content>
			<Card.Footer>
				<p class="text-xs leading-relaxed">
					This basic example shows how to create a button and detect touches. The button structure
					stores position, size, and label, making it easy to create multiple buttons.
				</p>
			</Card.Footer>
		</Card.Root>
	</section>

	<section class="mb-16 flex flex-col gap-4 text-white">
		<h2 class="text-4xl font-medium">Using TFT_eSPI for UI Elements</h2>
		<p class="text-lg font-thin text-white">
			TFT_eSPI provides all the functions you need to create UI elements:
		</p>
		<ul>
			<li>
				<code class="bg-gray-800 px-2 py-1 rounded text-white">fillRect()</code> - Draw filled
				rectangles for buttons
			</li>
			<li>
				<code class="bg-gray-800 px-2 py-1 rounded text-white">drawRect()</code> - Draw rectangle
				outlines for borders
			</li>
			<li>
				<code class="bg-gray-800 px-2 py-1 rounded text-white">setTextColor()</code> - Set text and
				background colors
			</li>
			<li>
				<code class="bg-gray-800 px-2 py-1 rounded text-white">setCursor()</code> - Position text
			</li>
			<li>
				<code class="bg-gray-800 px-2 py-1 rounded text-white">println()</code> - Draw text
			</li>
		</ul>
		<p class="text-lg font-thin text-white">
			By combining these functions, you can create professional-looking UI elements like buttons, input
			fields, and displays.
		</p>
	</section>

	<section class="mb-16 flex flex-col gap-4 text-white">
		<h2 class="text-4xl font-medium">Input Handling</h2>
		<p class="text-lg font-thin text-white">
			Now let's create a complete payment interface with number pad input:
		</p>

		<Card.Root>
			<Card.Header class="mb-0 pb-0">
				<Card.Title>Complete Payment Interface</Card.Title>
			</Card.Header>
			<Card.Content>
				<SyntaxHighlighter language="cpp" code={data.paymentUICode} />
			</Card.Content>
			<Card.Footer>
				<p class="text-xs leading-relaxed">
					This complete payment interface includes a numeric keypad, amount display, and confirmation
					screen. Users can enter amounts, see them displayed, and confirm before proceeding to QR
					code generation.
				</p>
			</Card.Footer>
		</Card.Root>

		<h3 class="mt-4 text-2xl font-medium">Features</h3>
		<ul>
			<li>
				<strong>Number Pad:</strong> 0-9 digits, decimal point, and clear button
			</li>
			<li>
				<strong>Amount Display:</strong> Shows entered amount in real-time
			</li>
			<li>
				<strong>State Management:</strong> Tracks current screen state (input, confirm, QR display)
			</li>
			<li>
				<strong>Touch Detection:</strong> Accurately detects which button was pressed
			</li>
			<li>
				<strong>Input Validation:</strong> Ensures valid amount entry
			</li>
			<li>
				<strong>Confirmation Screen:</strong> Shows payment details before finalizing
			</li>
		</ul>

		<h3 class="mt-4 text-2xl font-medium">Button Layout</h3>
		<p class="text-lg font-thin text-white">
			The number pad is arranged like a phone keypad:
		</p>
		<ul>
			<li>Top row: 1, 2, 3</li>
			<li>Middle row: 4, 5, 6</li>
			<li>Bottom row: 7, 8, 9</li>
			<li>Bottom: 0, decimal point (.), Clear (C)</li>
		</ul>
		<p class="text-lg font-thin text-white">
			This familiar layout makes it easy for users to enter amounts quickly.
		</p>
	</section>
</SectionNavigator>

<Card.Root class="mt-8 bg-transparent text-white sm:w-3/4">
	<Card.Header>
		<Card.Title>Resources</Card.Title>
		<Card.Description>
			Here are some resources to help you learn more about building touch interfaces.
		</Card.Description>
	</Card.Header>
	<Card.Content>
		<ul>
			<li>
				<a href="https://github.com/Bodmer/TFT_eSPI" target="_blank" class="link"
					>TFT_eSPI Library</a
				>
				<p class="text-sm font-thin text-white">Official library documentation and examples.</p>
			</li>
			<li>
				<a
					href="https://github.com/Bodmer/TFT_eSPI/wiki/Touch-Screen-Support"
					target="_blank"
					class="link"
					>TFT_eSPI Touch Screen Guide</a
				>
				<p class="text-sm font-thin text-white">Guide on implementing touch screen support.</p>
			</li>
		</ul>
	</Card.Content>
</Card.Root>

<WorkshopNavigation />

