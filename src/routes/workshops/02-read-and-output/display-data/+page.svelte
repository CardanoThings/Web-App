<script>
	import { page } from '$app/state';
	import IntroContainer from '$lib/base/IntroContainer.svelte';
	import SectionNavigator from '$lib/components/SectionNavigator.svelte';
	import WorkshopNavigation from '$lib/WorkshopNavigation.svelte';
	import SyntaxHighlighter from '$lib/components/SyntaxHighlighter.svelte';
	import FurtherResources from '$lib/components/FurtherResources.svelte';
	import TipBox from '$lib/components/TipBox.svelte';
	import CodeCard from '$lib/components/CodeCard.svelte';
	import LiveCodeCard from '$lib/components/LiveCodeCard.svelte';
	import * as Card from '$lib/components/ui/card/index.js';
	import { MoveLeft } from 'lucide-svelte';
	import { Button } from '$lib/components/ui/button/index.js';
	let parentPage = $derived(page.url.pathname.split('/')[2]);
	let { data } = $props();
</script>

<section class="mb-8 flex flex-col gap-4 text-white">
	<a href={`/workshops/${parentPage}`} class="flex items-center gap-2">
		<MoveLeft size="20" />
		<h1 class="text-lg font-normal text-white sm:max-w-[50%]">{data.workshop.title}</h1>
	</a>
	<h2 class="text-6xl font-medium text-white sm:max-w-[50%]">
		{data.step.title}
	</h2>
	<p class="text-lg font-thin text-white sm:max-w-[50%]">
		{data.step.description}
	</p>
	<TipBox title="Hardware Requirement" variant="info">
		This workshop uses the <strong>Cheap Yellow Display (CYD)</strong> with its built-in TFT
		display. If you're using an <strong>ESP32-C3</strong> with an I2C OLED display instead, check
		out the <a href="/blocks/esp32-oled-i2c-display" class="link">I2C OLED Display block</a> for the
		appropriate code examples.
	</TipBox>
</section>

<SectionNavigator>
	<section class="mb-16 flex flex-col gap-4 text-white">
		<h2 class="text-4xl font-medium">Introduction to TFT_eSPI</h2>
		<p class="text-lg font-thin text-white">
			The TFT_eSPI library is a powerful and flexible library for driving TFT displays with ESP32
			and ESP8266 microcontrollers. It supports a wide variety of TFT displays and provides
			functions for drawing text, shapes, and images.
		</p>

		<p class="text-lg font-thin text-white">The TFT_eSPI library offers many features:</p>
		<ul>
			<li>Multiple text sizes and colors</li>
			<li>Drawing shapes (rectangles, circles, lines)</li>
			<li>Displaying images and sprites</li>
			<li>Rotation support</li>
			<li>Fast rendering performance</li>
		</ul>
	</section>

	<section class="mb-16 flex flex-col gap-4 text-white">
		<h2 class="text-4xl font-medium">Installing and Configuring the Library</h2>

		<h3 class="mt-4 text-2xl font-medium">Step 1: Install TFT_eSPI Library</h3>
		<p class="text-lg font-thin text-white">First, install the TFT_eSPI library in Arduino IDE:</p>
		<ol>
			<li>Open Arduino IDE</li>
			<li>Go to <strong>Sketch → Include Library → Manage Libraries</strong></li>
			<li>Search for "TFT_eSPI"</li>
			<li>Click on the library by Bodmer and click <strong>Install</strong></li>
		</ol>

		<h3 class="mt-4 text-2xl font-medium">Step 2: Configure for Cheap Yellow Display (CYD)</h3>
		<p class="text-lg font-thin text-white">
			The TFT_eSPI library needs to be configured specifically for the CYD. The easiest way to do
			this is to replace the default configuration file with the one optimized for the CYD:
		</p>
		<ol>
			<li>
				Download the CYD-specific User_Setup.h file from the <a
					href="https://github.com/witnessmenow/ESP32-Cheap-Yellow-Display/blob/main/DisplayConfig/User_Setup.h"
					target="_blank"
					class="link">ESP32-Cheap-Yellow-Display repository</a
				>
			</li>
			<li>
				Locate your TFT_eSPI library folder:
				<ul class="mt-2 ml-4">
					<li><strong>Windows:</strong> <code>Documents\Arduino\libraries\TFT_eSPI\</code></li>
					<li><strong>Mac:</strong> <code>~/Documents/Arduino/libraries/TFT_eSPI/</code></li>
					<li><strong>Linux:</strong> <code>~/Arduino/libraries/TFT_eSPI/</code></li>
				</ul>
			</li>
			<li>Replace the existing <code>User_Setup.h</code> file with the downloaded one</li>
			<li>Restart Arduino IDE for the changes to take effect</li>
		</ol>

		<TipBox title="Important Configuration Details" variant="warning">
			The CYD-specific User_Setup.h file configures the following for you:
			<ul class="mt-2 ml-4">
				<li><strong>Display Driver:</strong> ILI9341_2_DRIVER</li>
				<li><strong>Display Size:</strong> 240x320 pixels</li>
				<li><strong>Pin Configuration:</strong> Correct GPIO pins for the CYD</li>
				<li><strong>SPI Speed:</strong> 55MHz for optimal performance</li>
				<li><strong>Backlight:</strong> GPIO 21 (controlled automatically)</li>
			</ul>
			If you skip this configuration step, your display will not work correctly!
		</TipBox>
	</section>

	<section class="mb-16 flex flex-col gap-4 text-white">
		<h2 class="text-4xl font-medium">Testing Your Display</h2>
		<p class="text-lg font-thin text-white">
			Before we dive into displaying wallet data, let's verify that your display is configured
			correctly with a simple "Hello World" test. This will display centered white text on a blue
			background covering the entire screen, confirming that your CYD is working properly.
		</p>

		<LiveCodeCard
			title="Hello World Display Test"
			repo="CardanoThings/Workshops"
			branch="main"
			files={[
				{
					path: 'Workshop-02/examples/display-hello-world/display-hello-world.ino',
					language: 'cpp'
				}
			]}
			readmePath="Workshop-02/examples/display-hello-world/README.md"
			footerText="Upload this sketch to your CYD. If everything is configured correctly, you should see 'Hello World!' displayed in white text, centered on a blue screen. If the display doesn't work or shows corrupted graphics, double-check that you've replaced the User_Setup.h file correctly."
		/>

		<h3 class="mt-4 text-2xl font-medium">Understanding the Code</h3>
		<ul>
			<li>
				<strong>tft.init():</strong> Initializes the display hardware and prepares it for use.
			</li>
			<li>
				<strong>tft.setRotation(1):</strong> Sets the display to landscape orientation. Values can be
				0-3 for different orientations (0°, 90°, 180°, 270°).
			</li>
			<li>
				<strong>tft.invertDisplay(true):</strong> Inverts the display colors. This is necessary for some
				CYD displays to show correct colors (without this, blue might appear yellow and white might appear
				black).
			</li>
			<li>
				<strong>tft.fillScreen(TFT_BLUE):</strong> Fills the entire screen with a blue background. You
				can use any color constant like TFT_RED, TFT_GREEN, TFT_BLACK, etc.
			</li>
			<li>
				<strong>tft.setTextColor(foreground, background):</strong> Sets the text color (white) and background
				color (blue) for text rendering.
			</li>
			<li>
				<strong>tft.setTextSize(size):</strong> Sets the text size multiplier. Size 3 makes characters
				3× larger than the default size.
			</li>
			<li>
				<strong>tft.setCursor(x, y):</strong> Positions where the next text will be drawn, with (0,0)
				at the top-left corner.
			</li>
		</ul>

		<TipBox title="Screen Dimensions" variant="info">
			The CYD display is 320x240 pixels in landscape mode (rotation 1). When calculating centered
			positions, use these dimensions. The origin (0,0) is at the top-left corner of the screen.
		</TipBox>
	</section>

	<section class="mb-16 flex flex-col gap-4 text-white">
		<h2 class="text-4xl font-medium">Displaying Your Wallet Balance</h2>
		<p class="text-lg font-thin text-white">
			Now that you've verified your display works, let's create a sketch that fetches your stake
			account balance and displays it on the TFT screen. This example uses a simple, clean design
			with white text on a blue background, showing your balance and a live timestamp that updates
			every second. The balance is fetched every 60 seconds.
		</p>

		<LiveCodeCard
			title="Wallet Balance Display Code"
			repo="CardanoThings/Workshops"
			branch="main"
			files={[
				{
					path: 'Workshop-02/examples/display-wallet-balance/display-wallet-balance.ino',
					language: 'cpp'
				}
			]}
			readmePath="Workshop-02/examples/display-wallet-balance/README.md"
			footerText="Copy and paste the code into your Arduino IDE. Make sure you've completed the library configuration steps above (replacing User_Setup.h with the CYD version). Replace the WiFi credentials and stake address with your own. Upload it to your microcontroller and you should see your wallet balance in white text on a blue background. The balance fetches every 60 seconds, and the timestamp updates every second."
		/>
	</section>

	<section class="mt-16 mb-16 flex flex-col gap-4 text-white">
		<h2 class="text-4xl font-medium">What's Next?</h2>

		<p class="text-lg font-thin text-white">
			Now that you have fetched data in intervals and displayed it on your Microcontroller, you can
			start to build more complex projects. In the last steps of this workshop, you will learn how
			to connect external hardware to your Microcontroller. Feel free to explore different endpoints
			and build different visualizations on your Mikrocontroller using the APIs you have learned
			about so far!
		</p>
	</section>

	<FurtherResources
		resources={[
			{
				title: 'TFT_eSPI Library GitHub',
				url: 'https://github.com/Bodmer/TFT_eSPI',
				description: 'Official repository with documentation and examples.'
			},
			{
				title: 'Adafruit GFX Graphics Library',
				url: 'https://learn.adafruit.com/adafruit-gfx-graphics-library',
				description: 'TFT_eSPI is based on this library - useful reference.'
			},
			{
				title: 'Arduino TFT_eSPI Reference',
				url: 'https://www.arduino.cc/reference/en/libraries/tft-espi/',
				description: 'Official Arduino library documentation.'
			},
			{
				title: 'ESP32-Cheap-Yellow-Display',
				url: 'https://github.com/witnessmenow/ESP32-Cheap-Yellow-Display',
				description:
					'Community resources, examples, and documentation for the CYD (Cheap Yellow Display).'
			},
			{
				title: 'LVGL - Light and Versatile Graphics Library',
				url: 'https://github.com/lvgl/lvgl',
				description:
					'Popular embedded graphics library for creating beautiful UIs - an advanced alternative to TFT_eSPI with 30+ widgets and modern design features.'
			}
		]}
	/>
</SectionNavigator>

<WorkshopNavigation />
