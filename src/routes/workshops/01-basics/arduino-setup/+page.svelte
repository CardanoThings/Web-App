<script>
	import { page } from '$app/state';
	import IntroContainer from '$lib/base/IntroContainer.svelte';
	import SectionNavigator from '$lib/components/SectionNavigator.svelte';
	import WorkshopNavigation from '$lib/components/WorkshopNavigation.svelte';
	import { MoveLeft } from 'lucide-svelte';
	import { Button } from '$lib/components/ui/button/index.js';
	let parentPage = $derived(page.url.pathname.split('/')[2]);
</script>

<section class="mb-16 flex flex-col gap-4 text-white">
	<a href={`/workshops/${parentPage}`} class="flex items-center gap-2">
		<MoveLeft size="20" />
		<h1 class="text-lg font-normal text-white sm:max-w-[50%]">Workshop 01: The Basics</h1>
	</a>
	<h2 class="text-6xl font-medium text-white sm:max-w-[50%]">Arduino Setup</h2>
	<p class="text-lg font-thin text-white sm:max-w-[50%]">
		We will now install the Arduino IDE, connect your microcontroller to Wifi and install the
		infamous blink script on it. In this workshop we will use the ESP32-C3 Microcontroller, the
		setup for other microcontrollers might be slightly different.
	</p>
	<div class="mt-4 sm:w-1/2">
		<IntroContainer topic="Arduino" />
	</div>
</section>

<SectionNavigator>
	<section class="mb-16 flex flex-col gap-4 text-white">
		<h2 class="text-4xl font-medium">Install Arduino IDE</h2>
		<p class="text-lg font-thin text-white">
			To keep things simple, we will use the <a
				href="https://www.arduino.cc/en/software/#ide"
				target="_blank"
				class="link">Arduino IDE</a
			>
			as development environment for all workshops. It is free, easy to install, setup and use and will
			get you started. If you're an experienced coder and want an integration into VS Code or Cursor,
			you might wanna look into
			<a href="https://platformio.org/" target="_blank" class="link">PlatformIO</a>
			or the
			<a
				href="https://docs.espressif.com/projects/arduino-esp32/en/latest/getting_started.html"
				target="_blank"
				class="link">Espressif Arduino SDK</a
			>.
		</p>

		<p>
			Go to the link below, choose your Operating System and click on download, then follow the
			installation process.
		</p>

		<div class="sm:w-1/2">
			<Button
				href="https://www.arduino.cc/en/software/#ide"
				target="_blank"
				rel="noopener noreferrer"
				variant="secondary"
				class="text-xs"
				size="sm">Download Arduino IDE</Button
			>
		</div>
	</section>

	<section class="mb-16 flex flex-col gap-4 text-white">
		<h2 class="text-4xl font-medium">Setup your Microcontroller</h2>
		<p class="text-lg font-thin text-white"></p>
	</section>

	<section class="mb-16 flex flex-col gap-4 text-white">
		<h2 class="text-4xl font-medium">Your first sketch</h2>
		<p class="text-lg font-thin text-white"></p>
	</section>

	<section class="mb-16 flex flex-col gap-4 text-white">
		<h2 class="text-4xl font-medium">Connect to Wifi</h2>
		<p class="text-lg font-thin text-white"></p>
	</section>
</SectionNavigator>

<WorkshopNavigation />
