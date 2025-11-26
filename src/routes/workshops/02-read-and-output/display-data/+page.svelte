<script>
	import { page } from '$app/state';
	import IntroContainer from '$lib/base/IntroContainer.svelte';
	import SectionNavigator from '$lib/components/SectionNavigator.svelte';
	import WorkshopNavigation from '$lib/WorkshopNavigation.svelte';
	import SyntaxHighlighter from '$lib/components/SyntaxHighlighter.svelte';
	import FurtherResources from '$lib/components/FurtherResources.svelte';
	import * as Card from '$lib/components/ui/card/index.js';
	import { MoveLeft } from 'lucide-svelte';
	import { Button } from '$lib/components/ui/button/index.js';
	let parentPage = $derived(page.url.pathname.split('/')[2]);
	let { data } = $props();
</script>

<section class="mb-8 flex flex-col gap-4 text-white">
	<a href={`/workshops/${parentPage}`} class="flex items-center gap-2">
		<MoveLeft size="20" />
		<h1 class="text-lg font-normal text-white sm:max-w-[50%]">Workshop 02: Read and Output</h1>
	</a>
	<h2 class="text-6xl font-medium text-white sm:max-w-[50%]">
		Display data on your Microcontroller
	</h2>
	<p class="text-lg font-thin text-white sm:max-w-[50%]">
		We will introduce you to the Arduino TFT_eSPI Library and you will learn how to display the
		fetched data from Step 1 on your TFT-Display.
	</p>
</section>

<SectionNavigator>
	<section class="mb-16 flex flex-col gap-4 text-white">
		<h2 class="text-4xl font-medium">Introduction to TFT_eSPI</h2>
		<p class="text-lg font-thin text-white">
			The TFT_eSPI library is a powerful and flexible library for driving TFT displays with ESP32 and
			ESP8266 microcontrollers. It supports a wide variety of TFT displays and provides functions for
			drawing text, shapes, and images.
		</p>
		<p class="text-lg font-thin text-white">
			In this step, we'll combine what you learned in the previous step (fetching wallet balance) with
			displaying that data on your TFT screen. This will create a visual representation of your wallet
			balance that updates in real-time.
		</p>
		<p class="text-lg font-thin text-white">
			The TFT_eSPI library offers many features:
		</p>
		<ul>
			<li>Multiple text sizes and colors</li>
			<li>Drawing shapes (rectangles, circles, lines)</li>
			<li>Displaying images and sprites</li>
			<li>Rotation support</li>
			<li>Fast rendering performance</li>
		</ul>
	</section>

	<section class="mb-16 flex flex-col gap-4 text-white">
		<h2 class="text-4xl font-medium">Installing the Library</h2>
		<p class="text-lg font-thin text-white">
			To install the TFT_eSPI library in Arduino IDE:
		</p>
		<ol>
			<li>Open Arduino IDE</li>
			<li>Go to <strong>Sketch → Include Library → Manage Libraries</strong></li>
			<li>Search for "TFT_eSPI"</li>
			<li>Click on the library by Bodmer and click <strong>Install</strong></li>
		</ol>
		<p class="text-lg font-thin text-white">
			After installation, you'll need to configure the library for your specific display. The
			configuration file is located at:
		</p>
		<p class="text-lg font-thin text-white font-mono text-sm bg-gray-800 p-2 rounded">
			Arduino/libraries/TFT_eSPI/User_Setup.h
		</p>
		<p class="text-lg font-thin text-white">
			Open this file and uncomment the driver for your display. For most D1 Mini TFT displays, you'll
			need to uncomment one of the ST7735 or ILI9341 drivers. Check your display's documentation or
			the label on the back of the display to find the correct driver.
		</p>
		<p class="text-lg font-thin text-white">
			You'll also need to set the correct pin definitions for your display (CS, DC, RST, MOSI, SCK).
			These are usually printed on the back of your display or in its documentation.
		</p>
	</section>

	<section class="mb-16 flex flex-col gap-4 text-white">
		<h2 class="text-4xl font-medium">Displaying Data</h2>
		<p class="text-lg font-thin text-white">
			Now let's create a sketch that fetches your wallet balance and displays it on the TFT screen. This
			combines the wallet balance fetching code from the previous step with TFT display functionality.
		</p>

		<Card.Root>
			<Card.Header class="mb-0 pb-0">
				<Card.Title>Wallet Balance Display Code</Card.Title>
			</Card.Header>
			<Card.Content>
				<SyntaxHighlighter language="cpp" code={data.tftDisplayCode} />
			</Card.Content>
			<Card.Footer>
				<p class="text-xs leading-relaxed">
					Copy and paste the code into your Arduino IDE. Make sure you've configured the TFT_eSPI
					library for your display in User_Setup.h. Replace the WiFi credentials and wallet address
					with your own. Upload it to your microcontroller and you should see your wallet balance
					displayed on the screen.
				</p>
			</Card.Footer>
		</Card.Root>

		<h3 class="mt-4 text-2xl font-medium">How it works</h3>
		<ul>
			<li>
				The <i>setup</i> function initializes the TFT display, sets the rotation, and connects to
				WiFi.
			</li>
			<li>
				The <i>updateDisplay</i> function clears the screen and draws the wallet balance with
				different text sizes and colors for visual hierarchy.
			</li>
			<li>
				The <i>fetchWalletBalance</i> function is similar to the previous step, but now calls
				<i>updateDisplay</i> when the balance changes.
			</li>
			<li>
				The display shows the title, balance amount, and last update time, making it easy to see your
				wallet status at a glance.
			</li>
		</ul>
	</section>

	<section class="mb-16 flex flex-col gap-4 text-white">
		<h2 class="text-4xl font-medium">Formatting and Styling</h2>
		<p class="text-lg font-thin text-white">
			The TFT_eSPI library provides many options for formatting and styling your display. Here are some
			key functions you can use:
		</p>

		<h3 class="mt-4 text-2xl font-medium">Text Functions</h3>
		<ul>
			<li><i>setTextSize(size)</i> - Sets the text size (1-7)</li>
			<li><i>setTextColor(color, background)</i> - Sets text and background colors</li>
			<li><i>setCursor(x, y)</i> - Sets the position for text</li>
			<li><i>println(text)</i> - Prints text and moves to next line</li>
		</ul>

		<h3 class="mt-4 text-2xl font-medium">Drawing Functions</h3>
		<ul>
			<li><i>drawLine(x1, y1, x2, y2, color)</i> - Draws a line</li>
			<li><i>drawRect(x, y, width, height, color)</i> - Draws a rectangle outline</li>
			<li><i>fillRect(x, y, width, height, color)</i> - Draws a filled rectangle</li>
			<li><i>drawCircle(x, y, radius, color)</i> - Draws a circle outline</li>
			<li><i>fillCircle(x, y, radius, color)</i> - Draws a filled circle</li>
		</ul>

		<Card.Root>
			<Card.Header class="mb-0 pb-0">
				<Card.Title>Formatted Display Example</Card.Title>
			</Card.Header>
			<Card.Content>
				<SyntaxHighlighter language="cpp" code={data.formattedDisplayCode} />
			</Card.Content>
			<Card.Footer>
				<p class="text-xs leading-relaxed">
					This example shows how to create a more visually appealing display with different text
					sizes, colors, lines, and shapes. Experiment with these functions to create your own
					unique display layout.
				</p>
			</Card.Footer>
		</Card.Root>

		<h3 class="mt-4 text-2xl font-medium">Color Constants</h3>
		<p class="text-lg font-thin text-white">
			The library provides predefined color constants you can use:
		</p>
		<ul>
			<li><i>TFT_BLACK</i>, <i>TFT_WHITE</i>, <i>TFT_RED</i>, <i>TFT_GREEN</i>, <i>TFT_BLUE</i></li>
			<li><i>TFT_CYAN</i>, <i>TFT_MAGENTA</i>, <i>TFT_YELLOW</i></li>
			<li><i>TFT_GRAY</i>, <i>TFT_ORANGE</i>, <i>TFT_PINK</i></li>
		</ul>
		<p class="text-lg font-thin text-white">
			You can also create custom colors using RGB values with the <i>color565(red, green, blue)</i>
			function, where each color component is 0-255.
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
			}
		]}
	/>
</SectionNavigator>

<WorkshopNavigation />
