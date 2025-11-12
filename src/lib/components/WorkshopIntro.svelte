<script>
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import { ChevronRight } from 'lucide-svelte';
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
			<ol>
				{#each workshop.steps as step}
					<li class="mb-4">
						{step.title}
						<p class="font-thin">
							{step.description}
						</p>

						{#if step.intros}
							<div class="inline-flex gap-1">
								{#each step.intros as intro}
									<Button href={intro.link} variant="secondary" class="mt-2 mb-4 text-xs" size="sm"
										>{intro.title}</Button
									>
								{/each}
							</div>
						{/if}

						<Button href={step.link} variant="secondary" class="mt-2 mb-4 text-xs" size="sm"
							>Lets begin!</Button
						>
					</li>
				{/each}
			</ol>
		</div>

		{#if workshop.requirements}
			<div class="w-full lg:max-w-[320px]">
				<Card.Root class="border border-white bg-transparent text-white">
					<Card.Header>
						<Card.Title class="text-white">Requirements</Card.Title>
					</Card.Header>
					<Card.Content>
						{#if workshop.requirements.hardware && workshop.requirements.hardware.length > 0}
							<div class="mb-4">
								<h4 class="mb-2 font-medium text-white">Hardware</h4>
								<ul class="space-y-1">
									{#each workshop.requirements.hardware as requirement}
										<li class="flex gap-2">
											<ChevronRight size="18" class="relative top-0.5 shrink-0" strokeWidth="2" />
											<span class="text-sm text-white/90">{requirement}</span>
										</li>
									{/each}
								</ul>
							</div>
						{/if}
						{#if workshop.requirements.software && workshop.requirements.software.length > 0}
							<div>
								<h4 class="mb-2 font-medium text-white">Software</h4>
								<ul class="space-y-1">
									{#each workshop.requirements.software as requirement}
										<li class="flex gap-2">
											<ChevronRight size="18" class="relative top-0.5 shrink-0" strokeWidth="2" />
											<span class="text-sm text-white/90">{requirement}</span>
										</li>
									{/each}
								</ul>
							</div>
						{/if}
					</Card.Content>
				</Card.Root>
			</div>
		{/if}
	</div>
</section>
