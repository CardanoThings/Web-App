<script>
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import { MessageCircleQuestion, ChevronRight, Check } from 'lucide-svelte';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';

	let { workshop } = $props();

	const STORAGE_KEY = 'workshop-completions';
	let completedSteps = $state(new Set());

	// Load completed steps from localStorage
	onMount(() => {
		if (browser) {
			try {
				const stored = localStorage.getItem(STORAGE_KEY);
				if (stored) {
					const parsed = JSON.parse(stored);
					completedSteps = new Set(parsed);
				}
			} catch (e) {
				console.error('Error loading workshop completions:', e);
			}
		}
	});

	// Toggle step completion
	function toggleStep(stepLink) {
		if (!browser) return;

		// Create a new Set to trigger reactivity
		const newSet = new Set(completedSteps);

		if (newSet.has(stepLink)) {
			newSet.delete(stepLink);
		} else {
			newSet.add(stepLink);
		}

		// Reassign to trigger reactivity
		completedSteps = newSet;

		// Update localStorage
		try {
			localStorage.setItem(STORAGE_KEY, JSON.stringify([...completedSteps]));
		} catch (e) {
			console.error('Error saving workshop completions:', e);
		}
	}

	function isStepCompleted(stepLink) {
		return completedSteps.has(stepLink);
	}
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
			<ul class="list-none p-0">
				{#each workshop.steps as step}
					<li class="mb-4">
						<div class="flex items-start gap-3">
							<button
								type="button"
								onclick={() => toggleStep(step.link)}
								class="mt-1 flex h-5 w-5 shrink-0 cursor-pointer items-center justify-center rounded border-2 border-white transition-all {isStepCompleted(
									step.link
								)
									? 'bg-white'
									: 'bg-transparent'}"
								aria-label={isStepCompleted(step.link) ? 'Mark as incomplete' : 'Mark as complete'}
								title={isStepCompleted(step.link) ? 'Mark as incomplete' : 'Mark as complete'}
							>
								{#if isStepCompleted(step.link)}
									<Check size={14} class="text-black" strokeWidth={3} />
								{/if}
							</button>
							<div class="flex-1">
								<div class="flex items-center gap-2">
									<span class="text-lg font-medium">
										{step.title}
									</span>
								</div>
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
							</div>
						</div>
					</li>
				{/each}
			</ul>
		</div>
	</div>
</section>
