<script>
	import { onMount } from 'svelte';
	import { version } from '$app/environment';
	import { fly } from 'svelte/transition';

	let currentVersion = version;
	let newVersionAvailable = false;

	onMount(() => {
		const checkForUpdates = async () => {
			try {
				const response = await fetch('/version.json', { cache: 'no-cache' });
				if (!response.ok) throw new Error('Failed to fetch version');

				const v = await response.json();
				if (v.version !== currentVersion) {
					console.log('New version available:', v.version);
					newVersionAvailable = true;
				}
			} catch (error) {
				console.error('Error checking for updates:', error);
			}
		};

		// Check for updates every 5 minutes
		const interval = setInterval(checkForUpdates, 5 * 60 * 1000);
		checkForUpdates();

		return () => clearInterval(interval); // Cleanup on component destroy
	});

	function reloadPage() {
		window.location.reload();
	}
</script>

{#if newVersionAvailable}
	<div class="" in:fly={{ y: '-100%', opacity: 1 }}>
		<button onclick={reloadPage}> A new version of this page is available. Update Now.</button>
	</div>
{/if}

<style>
	div {
		top: 0;
		left: 0;
		width: 100%;
		background: #f33;
		color: white;
		padding: 1rem;
		box-sizing: border-box;
		text-align: center;
	}
	button {
		background: #f33;
		color: white;
		border: none;
		padding: 0rem 1rem;
		border-radius: 0.25rem;
		cursor: pointer;
	}
</style>
