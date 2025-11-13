<script>
	import { dev } from '$app/environment';
	import { MoveRight } from 'lucide-svelte';
</script>

{#if !dev}
	<div class="w-full bg-sky-200 p-3 text-center text-sm font-medium">
		<a
			href="https://bsky.app/profile/cardanothings.io"
			target="_blank"
			class="m-auto inline-flex items-center gap-2"
			>Open Beta & absolutely WIP &mdash; For Updates follow us on BlueSky <MoveRight
				size={20}
				strokeWidth={2}
			/>
		</a>
	</div>
{/if}
