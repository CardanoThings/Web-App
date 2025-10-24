<script>
	import { Button } from '$lib/components/ui/button';
	import { canInstall, isInstalled, installPWA } from '$stores/pwa.js';

	export let variant = 'default';
	export let size = 'default';
	export let class_name = '';

	async function handleInstall() {
		try {
			await installPWA();
		} catch (error) {
			console.error('Installation failed:', error);
		}
	}
</script>

{#if $canInstall && !$isInstalled}
	<Button {variant} {size} class="gap-2 {class_name}" on:click={handleInstall}>
		<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
			/>
		</svg>
		Install App
	</Button>
{/if}
