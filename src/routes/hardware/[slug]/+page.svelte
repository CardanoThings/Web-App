<script>
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import SyntaxHighlighter from '$lib/components/SyntaxHighlighter.svelte';

	const { data } = $props();
	const hardware = data.hardware;
</script>

<section class="mb-16 flex flex-col gap-8 text-white">
	<div>
		<h1 class="w-1/2 text-6xl font-medium">{hardware.name}</h1>
		<p class="mt-4 w-1/2 text-lg leading-relaxed font-thin">{hardware.intro}</p>
	</div>

	<!-- Images Section -->
	{#if hardware.images && hardware.images.length > 0}
		<Card.Root>
			<Card.Header>
				<Card.Title>Images</Card.Title>
			</Card.Header>
			<Card.Content>
				<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
					{#each hardware.images as image}
						<img
							src={image}
							alt="{hardware.name}"
							class="w-full rounded-lg object-cover"
							loading="lazy"
						/>
					{/each}
				</div>
			</Card.Content>
		</Card.Root>
	{/if}

	<!-- Features Section -->
	<Card.Root>
		<Card.Header>
			<Card.Title class="text-lg">Features</Card.Title>
		</Card.Header>
		<Card.Content>
			<ul class="list-inside list-disc space-y-2">
				{#each hardware.features as feature}
					<li>{feature}</li>
				{/each}
			</ul>
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

	<!-- How to Use Section -->
	<Card.Root>
		<Card.Header>
			<Card.Title>How to Use</Card.Title>
		</Card.Header>
		<Card.Content>
			<p>{hardware.howToUse}</p>
		</Card.Content>
	</Card.Root>

	<!-- Libraries Section -->
	{#if hardware.libraries && hardware.libraries.length > 0}
		<Card.Root>
			<Card.Header>
				<Card.Title>Required Libraries</Card.Title>
			</Card.Header>
			<Card.Content>
				<ul class="list-inside list-disc space-y-2">
					{#each hardware.libraries as library}
						<li>{library}</li>
					{/each}
				</ul>
				<p class="mt-4 text-sm text-slate-400">
					Install libraries via Arduino IDE: Sketch → Include Library → Manage Libraries, then search for the library name.
				</p>
			</Card.Content>
		</Card.Root>
	{/if}

	<!-- Code Example Section -->
	{#if hardware.code}
		<Card.Root>
			<Card.Header>
				<Card.Title>Code Example</Card.Title>
			</Card.Header>
			<Card.Content>
				<SyntaxHighlighter language="arduino" code={hardware.code} />
			</Card.Content>
		</Card.Root>
	{/if}
</section>
