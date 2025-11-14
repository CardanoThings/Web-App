<script>
	import * as Card from '$lib/components/ui/card/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { MessageCircleQuestion } from 'lucide-svelte';
	let { topic, link } = $props();
</script>

<aside class="mb-16 flex gap-3 rounded-md border border-white p-4 text-white">
	<MessageCircleQuestion size="48" strokeWidth={1.5} class="-mt-2" />
	<div class="flex flex-col gap-2">
		<h1 class="text-lg font-normal">You know nothing about {topic}?</h1>
		<p class="text-xs leading-relaxed font-thin">
			If you don't know anything about {topic} yet, you can read more about it in the Introductions-Section.
		</p>
		<Button
			href={!link ? '/introductions/' + topic.toLowerCase() : link}
			variant="secondary"
			size="sm"
			class="mt-2 mb-1 w-fit text-xs">Introduction to {topic}</Button
		>
	</div>
</aside>
