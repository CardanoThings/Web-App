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
		<h1 class="text-lg font-normal text-white sm:max-w-[50%]">Workshop 04: Cardano Ticker</h1>
	</a>
	<h2 class="text-6xl font-medium text-white sm:max-w-[50%]">Building the Ticker</h2>
	<p class="text-lg font-thin text-white sm:max-w-[50%]">
		With most of the building blocks already in place from former workshops, you will learn more about
		the Arduino TFT_eSPI Library, how to work with fonts, images and sprites and how to animate text, to
		make your ticker interesting and visually beautiful.
	</p>
</section>

<SectionNavigator>
	<section class="mb-16 flex flex-col gap-4 text-white">
		<h2 class="text-4xl font-medium">Advanced TFT_eSPI Features</h2>
		<p class="text-lg font-thin text-white">
			Now that you're familiar with basic TFT display operations, let's explore more advanced features
			that will make your ticker visually appealing and professional-looking.
		</p>
		<p class="text-lg font-thin text-white">
			<strong>Key Advanced Features:</strong>
		</p>
		<ul>
			<li>
				<strong>Sprites:</strong> Off-screen buffers for smooth animations without flickering
			</li>
			<li>
				<strong>Custom Fonts:</strong> Load and use custom font files for better typography
			</li>
			<li>
				<strong>Images:</strong> Display bitmap images and icons
			</li>
			<li>
				<strong>Animations:</strong> Create scrolling text, transitions, and visual effects
			</li>
			<li>
				<strong>Screen Cycling:</strong> Rotate through multiple screens of information
			</li>
		</ul>
		<p class="text-lg font-thin text-white">
			These features will help you create a ticker that's not just functional, but also visually
			engaging and easy to read.
		</p>
	</section>

	<section class="mb-16 flex flex-col gap-4 text-white">
		<h2 class="text-4xl font-medium">Working with Fonts</h2>
		<p class="text-lg font-thin text-white">
			TFT_eSPI supports custom fonts that you can load from files. This allows you to use better-looking
			typography than the default built-in fonts.
		</p>
		<p class="text-lg font-thin text-white">
			<strong>Using Custom Fonts:</strong>
		</p>
		<ol>
			<li>
				Download or create font files (usually in .vlw format for TFT_eSPI)
			</li>
			<li>
				Place font files in your sketch's data folder
			</li>
			<li>
				Load fonts using <code class="bg-gray-800 px-2 py-1 rounded text-white">tft.loadFont()</code>
			</li>
			<li>
				Use <code class="bg-gray-800 px-2 py-1 rounded text-white">tft.setFont()</code> to switch between fonts
			</li>
		</ol>
		<p class="text-lg font-thin text-white">
			<strong>Font Creation Tools:</strong>
		</p>
		<ul>
			<li>
				Use the TFT_eSPI font conversion tool to create fonts from TTF/OTF files
			</li>
			<li>
				Font files are converted to bitmap format optimized for embedded displays
			</li>
			<li>
				You can create fonts at different sizes for different use cases
			</li>
		</ul>
		<p class="text-lg font-thin text-white">
			For this workshop, we'll use the built-in fonts, but you can enhance your ticker later with custom
			fonts for a more professional appearance.
		</p>
	</section>

	<section class="mb-16 flex flex-col gap-4 text-white">
		<h2 class="text-4xl font-medium">Using Images and Sprites</h2>
		<p class="text-lg font-thin text-white">
			<strong>Sprites</strong> are off-screen buffers that allow you to draw complex graphics without
			causing screen flicker. This is essential for smooth animations.
		</p>
		<p class="text-lg font-thin text-white">
			<strong>How Sprites Work:</strong>
		</p>
		<ul>
			<li>
				Create a sprite buffer in memory (smaller than full screen to save RAM)
			</li>
			<li>
				Draw everything to the sprite (off-screen)
			</li>
			<li>
				Push the sprite to the display in one operation (smooth, no flicker)
			</li>
		</ul>
		<Card.Root>
			<Card.Header class="mb-0 pb-0">
				<Card.Title>Sprite Example</Card.Title>
			</Card.Header>
			<Card.Content>
				<SyntaxHighlighter language="cpp" code={data.spriteCode} />
			</Card.Content>
			<Card.Footer>
				<p class="text-xs leading-relaxed">
					This example shows how to create and use a sprite. The sprite acts as an off-screen buffer
					that you draw to, then push to the display all at once for smooth rendering.
				</p>
			</Card.Footer>
		</Card.Root>
		<p class="text-lg font-thin text-white">
			<strong>Displaying Images:</strong>
		</p>
		<ul>
			<li>
				Convert images to bitmap format (BMP) or use the TFT_eSPI image converter
			</li>
			<li>
				Store images in program memory (PROGMEM) or on SD card
			</li>
			<li>
				Use <code class="bg-gray-800 px-2 py-1 rounded text-white">tft.drawBitmap()</code> or
				<code class="bg-gray-800 px-2 py-1 rounded text-white">tft.pushImage()</code> to display images
			</li>
		</ul>
	</section>

	<section class="mb-16 flex flex-col gap-4 text-white">
		<h2 class="text-4xl font-medium">Animating Text</h2>
		<p class="text-lg font-thin text-white">
			Scrolling or animated text makes your ticker more dynamic and can display more information in a
			limited space. Here's how to create scrolling text:
		</p>
		<Card.Root>
			<Card.Header class="mb-0 pb-0">
				<Card.Title>Scrolling Text Animation</Card.Title>
			</Card.Header>
			<Card.Content>
				<SyntaxHighlighter language="cpp" code={data.animatedTextCode} />
			</Card.Content>
			<Card.Footer>
				<p class="text-xs leading-relaxed">
					This example demonstrates scrolling text. The text moves from right to left, and when it
					completely scrolls off screen, it resets and starts again. Adjust the scroll speed by
					changing the scrollDelay and scrollPosition increment values.
				</p>
			</Card.Footer>
		</Card.Root>
		<p class="text-lg font-thin text-white">
			<strong>Animation Tips:</strong>
		</p>
		<ul>
			<li>
				Use sprites for complex animations to avoid flickering
			</li>
			<li>
				Adjust animation speed based on your needs (faster = more dynamic, slower = easier to read)
			</li>
			<li>
				Consider pausing animations when displaying important information
			</li>
			<li>
				Use color changes or effects to highlight important data
			</li>
		</ul>
	</section>

	<section class="mb-16 flex flex-col gap-4 text-white">
		<h2 class="text-4xl font-medium">Displaying the Ticker Data</h2>
		<p class="text-lg font-thin text-white">
			Now let's combine everything to create a complete ticker that displays the data we gathered in the
			previous step. We'll create multiple screens that cycle through different information:
		</p>

		<Card.Root>
			<Card.Header class="mb-0 pb-0">
				<Card.Title>Complete Ticker Display Code</Card.Title>
			</Card.Header>
			<Card.Content>
				<SyntaxHighlighter language="cpp" code={data.tickerDisplayCode} />
			</Card.Content>
			<Card.Footer>
				<p class="text-xs leading-relaxed">
					This complete ticker code fetches data from your API and displays it across multiple
					screens that cycle automatically. Each screen shows different information (wallet balance,
					token prices, 24h changes) to maximize the use of your display space.
				</p>
			</Card.Footer>
		</Card.Root>

		<h3 class="mt-4 text-2xl font-medium">Features</h3>
		<ul>
			<li>
				<strong>Multiple Screens:</strong> Cycles through wallet, prices, and changes screens
			</li>
			<li>
				<strong>Automatic Updates:</strong> Fetches new data every 30 seconds
			</li>
			<li>
				<strong>Screen Rotation:</strong> Changes screens every 5 seconds
			</li>
			<li>
				<strong>Color Coding:</strong> Green for positive changes, red for negative
			</li>
			<li>
				<strong>Structured Data:</strong> Uses structs to organize token data
			</li>
		</ul>
		<p class="text-lg font-thin text-white">
			You can customize the screens, timing, and displayed information to match your preferences. Add
			more screens for NFT floors, specific tokens, or other data you want to track.
		</p>
	</section>

	<section class="mb-16 flex flex-col gap-4 text-white">
		<h2 class="text-4xl font-medium">Final Polish</h2>
		<p class="text-lg font-thin text-white">
			To make your ticker production-ready, consider these enhancements:
		</p>
		<p class="text-lg font-thin text-white">
			<strong>Visual Enhancements:</strong>
		</p>
		<ul>
			<li>
				Add icons or logos for tokens/collections
			</li>
			<li>
				Use gradients or backgrounds for better contrast
			</li>
			<li>
				Add borders or dividers between sections
			</li>
			<li>
				Implement smooth transitions between screens
			</li>
		</ul>
		<p class="text-lg font-thin text-white">
			<strong>Functional Enhancements:</strong>
		</p>
		<ul>
			<li>
				Add touch screen controls to manually switch screens
			</li>
			<li>
				Implement settings screen to configure displayed tokens
			</li>
			<li>
				Add error handling and display error messages gracefully
			</li>
			<li>
				Show loading indicators while fetching data
			</li>
			<li>
				Cache data locally to display even when API is unavailable
			</li>
		</ul>
		<p class="text-lg font-thin text-white">
			<strong>Performance Optimizations:</strong>
		</p>
		<ul>
			<li>
				Use sprites for all screen updates to eliminate flicker
			</li>
			<li>
				Only update changed data, not the entire screen
			</li>
			<li>
				Optimize font sizes and image sizes to reduce memory usage
			</li>
			<li>
				Consider using an SD card for storing images/fonts if memory is limited
			</li>
		</ul>
		<p class="text-lg font-thin text-white">
			<strong>Enclosure Ideas:</strong>
		</p>
		<ul>
			<li>
				3D printed case with mounting options
			</li>
			<li>
				Wall-mounted frame for permanent display
			</li>
			<li>
				Desk stand for portable use
			</li>
			<li>
				Add LED backlighting for better visibility
			</li>
		</ul>
	</section>

	<FurtherResources
		resources={[
			{
				title: 'TFT_eSPI Library GitHub',
				url: 'https://github.com/Bodmer/TFT_eSPI',
				description: 'Official repository with examples and documentation.'
			},
			{
				title: 'TFT_eSPI Sprites Guide',
				url: 'https://github.com/Bodmer/TFT_eSPI/wiki/Using-Sprites',
				description: 'Learn more about using sprites for smooth animations.'
			},
			{
				title: 'TFT_eSPI Fonts Guide',
				url: 'https://github.com/Bodmer/TFT_eSPI/wiki/Using-Fonts',
				description: 'Guide on using custom fonts with TFT_eSPI.'
			}
		]}
	/>
</SectionNavigator>

<WorkshopNavigation />

