<script>
	import * as Card from '$lib/components/ui/card/index.js';

	let { resources = [] } = $props();
</script>

<section id="further-resources" class="mt-8 flex flex-col gap-4 text-white">
	<h2 class="text-4xl font-medium">Further Resources</h2>
	<Card.Root class="sm:[calc(100%-2rem)] bg-transparent pb-4 text-white">
		<Card.Content>
			<ul>
				{#each resources as resource}
					<li>
						<a href={resource.url} target="_blank" class="link">{resource.title}</a>
						<p class="text-sm font-thin text-white">{resource.description}</p>
					</li>
				{/each}
			</ul>
		</Card.Content>
	</Card.Root>
</section>
