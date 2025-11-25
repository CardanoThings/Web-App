<script>
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import { MessageCircleQuestion, ChevronRight } from 'lucide-svelte';
	let { workshop } = $props();
</script>

<section class="mb-16 flex flex-col gap-4 text-white">
	<h1 class="max-w-[50%] text-6xl font-medium text-white">
		{workshop.title.split(':')[0]}:
		<br />
		{workshop.title.split(':')[1]}
	</h1>
	<div class="max-w-[420px]">
		<p class="mb-8 text-lg font-thin">{workshop.description}</p>
	</div>
	<div class="flex flex-col gap-8 lg:flex-row">
		<div class="max-w-[420px]">
			<ol class="overview-list">
				{#each workshop.steps as step}
					<li class="mb-4">
						{step.title}
						<p class="font-thin">
							{step.description}
						</p>

						{#if step.intros}
							<ul class="mt-2 flex flex-col p-0">
								{#each step.intros as intro}
									<li class="mb-2 flex items-center gap-2">
										<MessageCircleQuestion size={20} strokeWidth={1.5} />
										<a href={intro.link} target="_blank" class="text-sm">
											{intro.title}
										</a>
									</li>
								{/each}
							</ul>
						{/if}

						<Button href={step.link} variant="secondary" class="mt-2 mb-4 text-xs" size="sm"
							>Lets begin!</Button
						>
					</li>
				{/each}
			</ol>
		</div>
	</div>
</section>
