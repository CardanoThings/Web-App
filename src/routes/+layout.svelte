<script>
	import '../app.css';
	import { ModeWatcher } from 'mode-watcher';
	import DarkMode from '$lib/base/DarkMode.svelte';
	let { children } = $props();
</script>

<ModeWatcher defaultMode={'dark'} />

<DarkMode />
{@render children()}
