<script>
	import * as Card from '$lib/components/ui/card/index.js';
	import { ChevronRight } from 'lucide-svelte';

	let { data } = $props();
</script>

<svelte:head>
	<title>{data.title} - CardanoThings</title>
	<meta name="description" content={data.description} />
</svelte:head>

<div class="container mx-auto px-4">
	<!-- Header -->
	<section class="mb-8">
		<h1 class="mb-4 w-full text-4xl font-medium text-white md:w-1/2 md:text-6xl">
			Introduction to {data.title}
		</h1>
		<!-- Summary -->
		<p class="w-full text-lg leading-relaxed font-thin text-white md:w-1/2 md:text-xl">
			{data.summary}
		</p>
	</section>

	<!-- History -->
	{#if data.history}
		<section class="m-auto mt-12 mb-12 w-full text-white md:w-1/2">
			<h2 class="inline-block text-2xl font-medium md:text-3xl">History</h2>
			<p class="text-base leading-relaxed font-thin md:text-lg">{data.history}</p>
		</section>
	{/if}

	<!-- Key Features -->
	<div class="mt-12 flex w-full flex-col gap-6 md:flex-row">
		{#if data.keyFeatures && data.keyFeatures.length > 0}
			<section class="w-full md:w-3/4" id="key-features">
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
			<section id="further-resources" class="w-full md:w-1/4">
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
