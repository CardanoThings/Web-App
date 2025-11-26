<script>
	import { page } from '$app/state';
	import IntroContainer from '$lib/base/IntroContainer.svelte';
	import SectionNavigator from '$lib/components/SectionNavigator.svelte';
	import WorkshopNavigation from '$lib/WorkshopNavigation.svelte';
	import SyntaxHighlighter from '$lib/components/SyntaxHighlighter.svelte';
	import FurtherResources from '$lib/components/FurtherResources.svelte';
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
	<h2 class="text-6xl font-medium text-white sm:max-w-[50%]">Confirming the payment</h2>
	<p class="text-lg font-thin text-white sm:max-w-[50%]">
		In this last step you will implement a simple listener for the created transaction and display a
		confirmation, once the transaction has arrived in your wallet.
	</p>
</section>

<SectionNavigator>
	<section class="mb-16 flex flex-col gap-4 text-white">
		<h2 class="text-4xl font-medium">Introduction</h2>
		<p class="text-lg font-thin text-white">
			After displaying the QR code and the user scans it to make a payment, you need a way to detect
			when the payment has been received. This final step completes the payment flow by monitoring the
			blockchain for incoming transactions and displaying a confirmation.
		</p>
		<p class="text-lg font-thin text-white">
			The confirmation system will:
		</p>
		<ul>
			<li>Monitor your wallet address for new transactions</li>
			<li>Detect when a payment arrives</li>
			<li>Display a confirmation message on the screen</li>
			<li>Show transaction details (hash, amount, etc.)</li>
		</ul>
		<p class="text-lg font-thin text-white">
			This provides feedback to both the merchant (you) and can be used to trigger actions like turning
			off the QR code display or resetting the payment interface.
		</p>
	</section>

	<section class="mb-16 flex flex-col gap-4 text-white">
		<h2 class="text-4xl font-medium">Setting up Transaction Monitoring</h2>
		<p class="text-lg font-thin text-white">
			To monitor for incoming payments, we'll use the Koios API to check for new transactions to your
			wallet address. There are two main approaches:
		</p>
		<p class="text-lg font-thin text-white">
			<strong>Method 1: Check Transaction History</strong>
		</p>
		<ul>
			<li>
				Use the <code class="bg-gray-800 px-2 py-1 rounded text-white">/address_txs</code> endpoint
			</li>
			<li>
				Compare transaction hashes to detect new transactions
			</li>
			<li>
				More accurate but requires tracking transaction hashes
			</li>
		</ul>
		<p class="text-lg font-thin text-white">
			<strong>Method 2: Monitor Balance Changes</strong>
		</p>
		<ul>
			<li>
				Use the <code class="bg-gray-800 px-2 py-1 rounded text-white">/address_info</code> endpoint
			</li>
			<li>
				Track balance changes (simpler but less precise)
			</li>
			<li>
				Good for simple use cases
			</li>
		</ul>
		<p class="text-lg font-thin text-white">
			For this workshop, we'll use Method 1 (transaction history) for more accurate detection, with a
			simplified balance-based alternative shown as well.
		</p>
	</section>

	<section class="mb-16 flex flex-col gap-4 text-white">
		<h2 class="text-4xl font-medium">Polling for Transactions</h2>
		<p class="text-lg font-thin text-white">
			Since Cardano transactions are not instant (they need to be included in a block), we need to poll
			the API periodically to check for new transactions. Here's a complete implementation:
		</p>

		<Card.Root>
			<Card.Header class="mb-0 pb-0">
				<Card.Title>Complete Payment Monitoring System</Card.Title>
			</Card.Header>
			<Card.Content>
				<SyntaxHighlighter language="cpp" code={data.paymentMonitorCode} />
			</Card.Content>
			<Card.Footer>
				<p class="text-xs leading-relaxed">
					This code monitors your wallet address for new transactions every 5 seconds. When a new
					transaction is detected, it displays a confirmation screen with the transaction hash and
					payment details. The system tracks the last seen transaction hash to avoid duplicate
					confirmations.
				</p>
			</Card.Footer>
		</Card.Root>

		<h3 class="mt-4 text-2xl font-medium">How it works</h3>
		<ul>
			<li>
				The system polls the Koios API every 5 seconds for transactions to your address
			</li>
			<li>
				It compares the latest transaction hash with the previously seen hash
			</li>
			<li>
				When a new transaction is detected, it triggers the confirmation display
			</li>
			<li>
				The confirmation screen shows success message, transaction hash, and payment amount
			</li>
			<li>
				Once confirmed, the system stops checking (or you can reset it for the next payment)
			</li>
		</ul>

		<p class="text-lg font-thin text-white">
			<strong>Simplified Alternative:</strong>
		</p>
		<p class="text-lg font-thin text-white">
			If you prefer a simpler approach, you can monitor balance changes instead:
		</p>
		<Card.Root>
			<Card.Header class="mb-0 pb-0">
				<Card.Title>Simple Balance-Based Monitoring</Card.Title>
			</Card.Header>
			<Card.Content>
				<SyntaxHighlighter language="cpp" code={data.simpleMonitorCode} />
			</Card.Content>
			<Card.Footer>
				<p class="text-xs leading-relaxed">
					This simpler approach monitors wallet balance changes. When the balance increases by the
					expected amount (or more), it confirms the payment. This is easier to implement but less
					precise than tracking individual transactions.
				</p>
			</Card.Footer>
		</Card.Root>
	</section>

	<section class="mb-16 flex flex-col gap-4 text-white">
		<h2 class="text-4xl font-medium">Displaying Confirmation</h2>
		<p class="text-lg font-thin text-white">
			When a payment is confirmed, you should provide clear visual feedback. The confirmation screen
			should include:
		</p>
		<ul>
			<li>
				<strong>Success Message:</strong> Clear indication that payment was received
			</li>
			<li>
				<strong>Visual Indicator:</strong> Checkmark, icon, or color change
			</li>
			<li>
				<strong>Transaction Hash:</strong> Proof of the transaction (can be truncated for display)
			</li>
			<li>
				<strong>Payment Amount:</strong> Confirmed amount received
			</li>
			<li>
				<strong>Timestamp:</strong> When the payment was received (optional)
			</li>
		</ul>
		<p class="text-lg font-thin text-white">
			The confirmation screen should be visually distinct from the QR code display, using colors like
			green for success and clear, large text for important information.
		</p>
		<p class="text-lg font-thin text-white">
			<strong>User Experience Considerations:</strong>
		</p>
		<ul>
			<li>
				Keep the confirmation visible for a few seconds so users can see it
			</li>
			<li>
				Consider adding a sound or LED indicator for physical feedback
			</li>
			<li>
				Provide a way to reset and start a new payment
			</li>
			<li>
				Show a timeout if payment doesn't arrive within a reasonable time
			</li>
		</ul>
	</section>

	<section class="mb-16 flex flex-col gap-4 text-white">
		<h2 class="text-4xl font-medium">Error Handling</h2>
		<p class="text-lg font-thin text-white">
			It's important to handle various error scenarios gracefully:
		</p>
		<p class="text-lg font-thin text-white">
			<strong>Network Errors:</strong>
		</p>
		<ul>
			<li>
				WiFi disconnection - automatically reconnect and resume monitoring
			</li>
			<li>
				API timeout - retry with exponential backoff
			</li>
			<li>
				API errors - display error message but continue trying
			</li>
		</ul>
		<p class="text-lg font-thin text-white">
			<strong>Payment Issues:</strong>
		</p>
		<ul>
			<li>
				Payment timeout - if no payment arrives after X minutes, show timeout message
			</li>
			<li>
				Incorrect amount - if payment amount doesn't match expected amount, show warning
			</li>
			<li>
				Multiple payments - handle case where multiple transactions arrive
			</li>
		</ul>
		<p class="text-lg font-thin text-white">
			<strong>Display Issues:</strong>
		</p>
		<ul>
			<li>
				Screen refresh - ensure confirmation stays visible long enough
			</li>
			<li>
				Memory issues - if QR code generation uses too much memory, optimize or use external storage
			</li>
		</ul>
		<p class="text-lg font-thin text-white">
			<strong>Best Practices:</strong>
		</p>
		<ul>
			<li>
				Always validate API responses before processing
			</li>
			<li>
				Use try-catch blocks or error checking for all API calls
			</li>
			<li>
				Log errors to serial monitor for debugging
			</li>
			<li>
				Provide user-friendly error messages on the display
			</li>
			<li>
				Implement retry logic for transient failures
			</li>
		</ul>
	</section>

	<section class="mb-16 flex flex-col gap-4 text-white">
		<h2 class="text-4xl font-medium">Complete Payment Flow</h2>
		<p class="text-lg font-thin text-white">
			Now you have a complete payment system! Here's the full flow:
		</p>
		<ol>
			<li>
				<strong>User enters amount</strong> using the touch screen interface
			</li>
			<li>
				<strong>User confirms payment</strong> details
			</li>
			<li>
				<strong>System generates CIP-13 URI</strong> from amount and address
			</li>
			<li>
				<strong>QR code is displayed</strong> on the screen
			</li>
			<li>
				<strong>User scans QR code</strong> with mobile wallet
			</li>
			<li>
				<strong>User sends transaction</strong> from mobile wallet
			</li>
			<li>
				<strong>System monitors</strong> for incoming transaction
			</li>
			<li>
				<strong>Payment confirmed</strong> and displayed on screen
			</li>
		</ol>
		<p class="text-lg font-thin text-white">
			<strong>Enhancement Ideas:</strong>
		</p>
		<ul>
			<li>
				Add payment timeout (cancel if no payment after X minutes)
			</li>
			<li>
				Support multiple payment methods or currencies
			</li>
			<li>
				Add payment history/logging
			</li>
			<li>
				Implement payment receipts or invoices
			</li>
			<li>
				Add sound/visual feedback for payment confirmation
			</li>
			<li>
				Support partial payments or payment plans
			</li>
			<li>
				Add admin interface for viewing all payments
			</li>
		</ul>
	</section>

	<FurtherResources
		resources={[
			{
				title: 'Koios API Documentation',
				url: 'https://preprod.koios.rest/',
				description: 'API endpoints for transaction monitoring.'
			},
			{
				title: 'CIP-13 Specification',
				url: 'https://cips.cardano.org/cips/cip13/',
				description: 'Payment URI standard documentation.'
			},
			{
				title: 'Cardano Documentation',
				url: 'https://docs.cardano.org/',
				description: 'Official Cardano documentation.'
			}
		]}
	/>
</SectionNavigator>

<WorkshopNavigation />

