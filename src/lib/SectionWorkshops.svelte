<script>
	import * as Card from '$lib/components/ui/card/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { workshops } from '$lib/data/workshops.js';
</script>

<div class="sectionWrapper">
	<section id="workshops" class="mb-6">
		<div class="text-white">
			<h1 class="text-4xl">Workshops</h1>
			<p class="mt-2 max-w-[90%] text-lg font-thin">
				Step-by-step workshops to build your first Cardano IoT project with ESP32-based
				Microcontrollers
			</p>
		</div>
		{#each workshops as workshop}
			<Card.Root>
				<Card.Header>
					<Card.Title class="mt-0 pt-0 text-xl">{workshop.title}</Card.Title>
					<Card.Description>
						{workshop.description}
					</Card.Description>
				</Card.Header>
				<Card.Content class="flex-1">
					<!-- <ol>
            {#each workshop.steps as step}
              <li>
                {step.title}
                <p>
                  {step.description}
                </p>
              </li>
            {/each}
          </ol> -->
				</Card.Content>
				<Card.Footer class="">
					<Button href={workshop.link} size="sm">Start Workshop</Button>
				</Card.Footer>
			</Card.Root>
		{/each}
	</section>
</div>
