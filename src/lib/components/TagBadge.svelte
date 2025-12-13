<script>
	import { goto } from '$app/navigation';

	let { tag = '', size = 'default', onclick = undefined } = $props();

	function handleClick() {
		if (onclick) {
			onclick();
		} else {
			goto(`/blocks?tags=${encodeURIComponent(tag)}`);
		}
	}
</script>

<button
	class="tag-badge cursor-pointer border border-slate-400 bg-transparent text-slate-400 transition-all duration-200 hover:border-slate-100 hover:text-slate-100 {size ===
	'small'
		? 'tag-badge-small'
		: 'tag-badge-default'}"
	onclick={handleClick}>{tag}</button
>

<style>
	.tag-badge-default {
		padding: 0.375rem 0.75rem;
		font-size: 0.75rem;
		border-radius: 0.375rem;
	}

	.tag-badge-small {
		padding: 0.15rem 0.375rem;
		font-size: 0.6rem;
		border-radius: 0.25rem;
	}
</style>
