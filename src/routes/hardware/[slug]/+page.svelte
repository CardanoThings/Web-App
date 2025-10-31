<script>
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Card from '$lib/components/ui/card/index.js';

	const { data } = $props();
	const hardware = data.hardware;
</script>

<section class="mb-16 flex flex-col gap-8 text-white">
	<div>
		<h1 class="text-6xl font-medium">{hardware.name}</h1>
		<p class="mt-4 text-lg font-thin">{hardware.intro}</p>
	</div>

	<!-- Features Section -->
	<Card.Root>
		<Card.Header>
			<Card.Title>Features</Card.Title>
		</Card.Header>
		<Card.Content>
			<ul class="list-inside list-disc space-y-2">
				{#each hardware.features as feature}
					<li>{feature}</li>
				{/each}
			</ul>
		</Card.Content>
	</Card.Root>

	<!-- How to Use Section -->
	<Card.Root>
		<Card.Header>
			<Card.Title>How to Use</Card.Title>
		</Card.Header>
		<Card.Content>
			<p>{hardware.howToUse}</p>
		</Card.Content>
	</Card.Root>

	<!-- Resources Section -->
	<Card.Root>
		<Card.Header>
			<Card.Title>Resources</Card.Title>
		</Card.Header>
		<Card.Content>
			<div class="flex flex-wrap gap-2">
				{#each hardware.resources as resource}
					<Button href={resource.url} target="_blank" rel="noopener noreferrer" variant="outline">
						{resource.name}
					</Button>
				{/each}
			</div>
		</Card.Content>
	</Card.Root>

	<!-- Where to Buy Section -->
	<Card.Root>
		<Card.Header>
			<Card.Title>Where to Buy</Card.Title>
		</Card.Header>
		<Card.Content>
			<div class="flex flex-wrap gap-2">
				{#each hardware.whereToBuy as store}
					<Button href={store.url} target="_blank" rel="noopener noreferrer">
						{store.name}
					</Button>
				{/each}
			</div>
		</Card.Content>
	</Card.Root>
</section>
