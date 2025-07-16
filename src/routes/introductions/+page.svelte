<script>
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	let { data } = $props();
</script>

{#each data as item}
	<Card.Root class="mb-4">
		<Card.Header>
			<Card.Title>{item.title}</Card.Title>
			<Card.Description>{item.description}</Card.Description>
		</Card.Header>
		<Card.Content>
			<p>{item.content}</p>
			<Button href={item.link} target="_blank" variant="primary">Learn More</Button>
		</Card.Content>
	</Card.Root>
{/each}
