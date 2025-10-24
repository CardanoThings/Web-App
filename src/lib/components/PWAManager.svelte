<script>
	import { onMount } from 'svelte';
	import {
		canInstall,
		isInstalled,
		swUpdateAvailable,
		installPWA,
		checkForUpdates,
		applyUpdate
	} from '$stores/pwa.js';
	import { Button } from '$lib/components/ui/button';
	import { toast } from 'svelte-sonner';

	let showInstallPrompt = false;
	let showUpdatePrompt = false;

	// Subscribe to store changes
	$: if ($canInstall && !$isInstalled) {
		showInstallPrompt = true;
	}

	$: if ($swUpdateAvailable) {
		showUpdatePrompt = true;
		toast.info('A new version is available!', {
			description: 'Click to update the app',
			action: {
				label: 'Update',
				onClick: handleUpdate
			}
		});
	}

	onMount(() => {
		checkForUpdates();
	});

	async function handleInstall() {
		try {
			await installPWA();
			showInstallPrompt = false;
			toast.success('App installed successfully!');
		} catch (error) {
			console.error('Installation failed:', error);
			toast.error('Installation failed');
		}
	}

	function dismissInstall() {
		showInstallPrompt = false;
	}

	async function handleUpdate() {
		try {
			await applyUpdate();
			showUpdatePrompt = false;
		} catch (error) {
			console.error('Update failed:', error);
			toast.error('Update failed');
		}
	}

	function dismissUpdate() {
		showUpdatePrompt = false;
	}
</script>

<!-- Install Prompt -->
{#if showInstallPrompt}
	<div
		class="fixed bottom-4 left-4 right-4 z-50 rounded-lg border border-gray-200 bg-white p-4 shadow-lg dark:border-gray-700 dark:bg-gray-800 md:left-auto md:max-w-md"
	>
		<div class="flex items-start space-x-3">
			<div class="flex-shrink-0">
				<svg class="h-6 w-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
					/>
				</svg>
			</div>
			<div class="min-w-0 flex-1">
				<p class="text-sm font-medium text-gray-900 dark:text-white">Install CardanoThings App</p>
				<p class="text-sm text-gray-500 dark:text-gray-400">
					Add to your home screen for quick access
				</p>
			</div>
		</div>
		<div class="mt-3 flex space-x-3">
			<Button size="sm" on:click={handleInstall}>Install</Button>
			<Button variant="outline" size="sm" on:click={dismissInstall}>Maybe Later</Button>
		</div>
	</div>
{/if}

<!-- Update Prompt -->
{#if showUpdatePrompt}
	<div
		class="fixed left-4 right-4 top-4 z-50 rounded-lg border border-blue-200 bg-blue-50 p-4 shadow-lg dark:border-blue-800 dark:bg-blue-900/20 md:left-auto md:max-w-md"
	>
		<div class="flex items-start space-x-3">
			<div class="flex-shrink-0">
				<svg class="h-6 w-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
					/>
				</svg>
			</div>
			<div class="min-w-0 flex-1">
				<p class="text-sm font-medium text-blue-900 dark:text-blue-100">Update Available</p>
				<p class="text-sm text-blue-700 dark:text-blue-300">A new version of the app is ready</p>
			</div>
		</div>
		<div class="mt-3 flex space-x-3">
			<Button size="sm" on:click={handleUpdate}>Update Now</Button>
			<Button variant="outline" size="sm" on:click={dismissUpdate}>Later</Button>
		</div>
	</div>
{/if}
