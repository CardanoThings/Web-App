<script>
	import { Button } from '$lib/components/ui/button/index.js';
	import { toggleMode, mode } from 'mode-watcher';
</script>

<Button onclick={toggleMode} variant="outline">
	{$mode === 'dark' ? 'Light' : 'Dark'}
</Button>
