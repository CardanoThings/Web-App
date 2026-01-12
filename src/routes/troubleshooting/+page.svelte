<script>
	import * as Accordion from '$lib/components/ui/accordion/index.js';
	import { Badge } from '$lib/components/ui/badge/index.js';
	import ChevronRight from '@lucide/svelte/icons/chevron-right';

	const { data } = $props();
</script>

<section class="mb-16 flex flex-col gap-8 text-white">
	<div>
		<h1 class="w-1/2 text-6xl font-medium">Troubleshooting</h1>
		<p class="mt-4 w-1/2 text-lg leading-relaxed font-thin">
			Common issues and solutions for ESP32 microcontrollers and Arduino IDE. If you're encountering
			problems, check this FAQ first.
		</p>
	</div>

	<Accordion.Root type="single" collapsible class="w-full border-b border-dashed border-white">
		{#each data.troubleshooting as item}
			<Accordion.Item value={item.id} class="border-b border-dashed border-white">
				<Accordion.Trigger
					class="cursor-pointer text-left hover:no-underline [&>svg]:h-6 [&>svg]:w-6 [&>svg]:text-white"
				>
					<div
						class="flex w-full flex-col items-start gap-2 pr-4 sm:flex-row sm:items-center sm:gap-2"
					>
						<span class="text-lg font-normal text-white">{item.question}</span>
						<div class="flex shrink-0 gap-1 sm:ml-2">
							{#each item.categories as category}
								<Badge variant="outline" class="text-xs text-white hover:no-underline"
									>{category}</Badge
								>
							{/each}
						</div>
					</div>
				</Accordion.Trigger>
				<Accordion.Content>
					<div class="space-y-4 pt-2">
						<div class="leading-relaxed">
							{@html item.answer}
						</div>

						{#if item.links && item.links.length > 0}
							<div>
								<ul class="m-0 list-none space-y-1 pl-0">
									{#each item.links as link}
										<li class="flex items-start">
											<ChevronRight class="mr-0 inline h-5 w-5 shrink-0" strokeWidth="2.5" />
											<a
												href={link.url}
												target="_blank"
												rel="noopener noreferrer"
												class="text-sm font-normal no-underline"
											>
												{link.name}
											</a>
										</li>
									{/each}
								</ul>
							</div>
						{/if}
					</div>
				</Accordion.Content>
			</Accordion.Item>
		{/each}
	</Accordion.Root>
</section>
