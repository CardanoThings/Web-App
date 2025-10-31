<script>
	import * as Card from '$lib/components/ui/card/index.js';
	import { ChevronRight } from 'lucide-svelte';

	let { data } = $props();
</script>

<svelte:head>
	<title>{data.title} - CardanoThings</title>
	<meta name="description" content={data.description} />
</svelte:head>

<div class="">
	<!-- Header -->
	<section class="mb-8">
		<h1 class="mb-4 w-1/2 text-6xl font-medium text-white">
			Introduction to {data.title}
		</h1>
		<!-- Summary -->
		<p class="w-1/2 text-xl leading-relaxed font-thin text-white">
			{data.summary}
		</p>
	</section>

	<!-- History -->
	{#if data.history}
		<section class="m-auto mt-12 mb-12 w-1/2 text-white">
			<h2 class="inline-block text-3xl font-medium">History</h2>
			<p class="text-lg leading-relaxed font-thin">{data.history}</p>
		</section>
	{/if}

	<!-- Key Features -->
	<div class="mt-12 flex w-full gap-6">
		{#if data.keyFeatures && data.keyFeatures.length > 0}
			<section class="w-3/4" id="key-features">
				<Card.Root>
					<Card.Header>
						<Card.Title class="pb-0 text-lg">Key Features</Card.Title>
					</Card.Header>
					<Card.Content>
						<ul class="space-y-2">
							{#each data.keyFeatures as feature}
								<li class="ml-0 flex items-start">
									<div>
										<ChevronRight size="18" class="relative top-1.5" strokeWidth="2" />
									</div>
									<div>
										<span class="font-medium">{feature.split(':')[0]}</span>: {feature
											.split(':')
											.slice(1)
											.join(':')}
									</div>
								</li>
							{/each}
						</ul>
					</Card.Content>
				</Card.Root>
			</section>
		{/if}

		<!-- Resources -->
		{#if data.resources && data.resources.length > 0}
			<section id="further-resources" class="w-1/4">
				<Card.Root>
					<Card.Header>
						<Card.Title>Further Resources</Card.Title>
					</Card.Header>
					<Card.Content>
						<ul class="list-none text-nowrap">
							{#each data.resources as resource}
								<li>
									<a href={resource.link} target="_blank" rel="noopener noreferrer" class="link">
										{resource.title}
									</a>
								</li>
							{/each}
						</ul>
					</Card.Content>
				</Card.Root>
			</section>
		{/if}
	</div>
</div>
