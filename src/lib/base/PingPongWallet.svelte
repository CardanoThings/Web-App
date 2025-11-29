<script>
	import { Button } from '$lib/components/ui/button/index.js';
	import { ArrowLeftRight, Copy, Check } from 'lucide-svelte';
	import { toast } from 'svelte-sonner';
	import { onDestroy } from 'svelte';

	let { link } = $props();

	const pingPongAddress =
		'addr_test1qpvla0l6zgkl4ufzur0wal0uny5lyqsg4rw7g6gxj08lzacth0hnd66lz6uqqz7kwkmx07xyppsk2cddvxnqvfd05reqf7p26w';
	let isCopied = $state(false);
	let copyTimeout = null;

	async function copyAddress() {
		try {
			await navigator.clipboard.writeText(pingPongAddress);
			isCopied = true;
			toast.success('Address copied to clipboard');

			if (copyTimeout) {
				clearTimeout(copyTimeout);
			}

			copyTimeout = setTimeout(() => {
				isCopied = false;
			}, 2000);
		} catch (error) {
			console.error('Failed to copy address:', error);
			toast.error('Failed to copy address to clipboard');
		}
	}

	onDestroy(() => {
		if (copyTimeout) {
			clearTimeout(copyTimeout);
		}
	});
</script>

<aside class=" flex gap-3 rounded-md border border-white p-4 text-white">
	<ArrowLeftRight size="48" strokeWidth={1.5} class="-mt-2" />
	<div class="flex flex-col gap-2">
		<h1 class="text-lg font-normal">Need transactions for testing?</h1>
		<p class="text-xs leading-relaxed font-thin">
			The CardanoThings PingPong wallet can receive transactions at the address below and will
			automatically send it back within 60 seconds to your wallet. This is perfect for testing
			payment flows and transactions on the Cardano Preprod testnet.
		</p>
		<p>
			Please note that the PingPong wallet is only available on the Cardano Preprod testnet. It is
			not available on the Cardano mainnet.
		</p>
		<div class="mt-2 flex flex-col gap-2">
			<div class="flex items-center gap-2">
				<code class="flex-1 rounded bg-white/10 px-2 py-1 font-mono text-xs break-all text-white">
					{pingPongAddress}
				</code>
				<Button
					onclick={copyAddress}
					variant="secondary"
					size="sm"
					class="shrink-0 text-xs"
					title={isCopied ? 'Copied!' : 'Copy address'}
					aria-label={isCopied ? 'Address copied to clipboard' : 'Copy address to clipboard'}
				>
					{#if isCopied}
						<Check size={14} />
					{:else}
						<Copy size={14} />
					{/if}
				</Button>
			</div>
			{#if link}
				<Button href={link} variant="secondary" size="sm" class="w-fit text-xs">Use PingPong</Button
				>
			{/if}
		</div>
	</div>
</aside>
