<script>
	import { goto } from '$app/navigation';

	let {
		tag = '',
		size = 'default',
		onclick = undefined
	} = $props();

	function handleClick() {
		if (onclick) {
			onclick();
		} else {
			goto(`/blocks?tags=${encodeURIComponent(tag)}`);
		}
	}
</script>

<button class="tag-badge {size === 'small' ? 'tag-badge-small' : 'tag-badge-default'}" onclick={handleClick}>
	{tag}
</button>

<style>
	.tag-badge {
		font-weight: 500;
		border-radius: 0.375rem;
		cursor: pointer;
		background-color: transparent;
		border: 1px solid white;
		color: white;
	}

	.tag-badge-default {
		padding: 0.375rem 0.75rem;
		font-size: 0.75rem;
	}

	.tag-badge-small {
		padding: 0.25rem 0.5rem;
		font-size: 0.7rem;
		border-radius: 0.25rem;
	}
</style>

