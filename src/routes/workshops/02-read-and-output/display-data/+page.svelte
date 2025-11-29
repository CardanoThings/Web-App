<script>
	import { page } from '$app/state';
	import IntroContainer from '$lib/base/IntroContainer.svelte';
	import SectionNavigator from '$lib/components/SectionNavigator.svelte';
	import WorkshopNavigation from '$lib/WorkshopNavigation.svelte';
	import SyntaxHighlighter from '$lib/components/SyntaxHighlighter.svelte';
	import FurtherResources from '$lib/components/FurtherResources.svelte';
	import TipBox from '$lib/components/TipBox.svelte';
	import CodeCard from '$lib/components/CodeCard.svelte';
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

		<CodeCard
			title="Hello World Display Test"
			language="cpp"
			code={data.helloWorldCode}
			githubLink="https://github.com/CardanoThings/Workshops/tree/main/Workshop-02/examples/hello-world-code"
			footerText="Upload this sketch to your CYD. If everything is configured correctly, you should see 'Hello World!' displayed in white text, centered on a blue screen. If the display doesn't work or shows corrupted graphics, double-check that you've replaced the User_Setup.h file correctly."
			howItWorksContent={`
			<h3>Display Initialization</h3>
			<p>The code begins by initializing the TFT display hardware and configuring it for use:</p>
			<ul>
				<li><strong>tft.init():</strong> Powers on the display and initializes the ILI9341 driver chip</li>
				<li><strong>tft.setRotation(1):</strong> Sets landscape orientation where 0=0°, 1=90°, 2=180°, 3=270°</li>
				<li><strong>tft.invertDisplay(true):</strong> Inverts the display colors to correct color mapping. Some CYD displays require this for colors to appear correctly (blue shows as blue instead of yellow, white shows as white instead of black)</li>
				<li><strong>tft.fillScreen(TFT_BLUE):</strong> Fills the entire 320x240 pixel screen with blue color, creating our background</li>
			</ul>

			<h3>Screen Dimensions and Coordinate System</h3>
			<p>Understanding the display coordinate system is essential for positioning elements:</p>
			<ul>
				<li><strong>Screen dimensions:</strong> 320 pixels wide × 240 pixels tall (in landscape mode with rotation 1)</li>
				<li><strong>Origin point:</strong> (0,0) is at the top-left corner of the screen</li>
				<li><strong>X-axis:</strong> Increases from left (0) to right (319)</li>
				<li><strong>Y-axis:</strong> Increases from top (0) to bottom (239)</li>
			</ul>

			<h3>Text Rendering</h3>
			<p>Text is rendered with specific properties to make it visible and centered:</p>
			<ul>
				<li><strong>Text color:</strong> <code>setTextColor(TFT_WHITE, TFT_BLUE)</code> sets white text with blue background</li>
				<li><strong>Text size:</strong> Size 3 means each character is 18 pixels wide × 24 pixels tall (base 6×8 multiplied by 3)</li>
				<li><strong>Character dimensions:</strong> Each character is approximately 6 pixels wide per size unit</li>
				<li><strong>Cursor positioning:</strong> <code>setCursor(x, y)</code> sets where the text top-left corner begins</li>
			</ul>

			<h3>Text Centering Formula</h3>
			<p>To center the text on the screen, we calculate the position mathematically:</p>
			<ul>
				<li><code>textWidth = text.length() × 6 × textSize</code> estimates the total pixel width of the text</li>
				<li><code>textHeight = 8 × textSize</code> calculates the pixel height of the text</li>
				<li><code>textX = (320 - textWidth) / 2</code> centers the text horizontally on the 320-pixel wide screen</li>
				<li><code>textY = (240 - textHeight) / 2</code> centers the text vertically on the 240-pixel tall screen</li>
			</ul>
			<p>This formula works by finding the leftover space and dividing it equally on both sides.</p>

			<h3>The Loop Function</h3>
			<p>The <code>loop()</code> function is empty because this is a static display test. Once the display is drawn in <code>setup()</code>, nothing needs to update. For dynamic displays (like showing sensor data or wallet balances), you would update the display content in the loop.</p>
		`}
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

		<CodeCard
			title="Wallet Balance Display Code"
			language="cpp"
			code={data.tftDisplayCode}
			githubLink="https://github.com/CardanoThings/Workshops/tree/main/Workshop-02/examples/tft-display-code"
			footerText="Copy and paste the code into your Arduino IDE. Make sure you've completed the library configuration steps above (replacing User_Setup.h with the CYD version). Replace the WiFi credentials and stake address with your own. Upload it to your microcontroller and you should see your wallet balance in white text on a blue background. The balance fetches every 60 seconds, and the timestamp updates every second."
			howItWorksContent={`
				<h3>Program Structure</h3>
				<p>This sketch combines WiFi connectivity, API requests, JSON parsing, and TFT display control into a complete wallet monitoring system.</p>

				<h3>Setup Phase</h3>
				<p>The <code>setup()</code> function initializes all components in sequence:</p>
				<ul>
					<li><strong>Serial Communication:</strong> Opens serial monitor at 115200 baud for debugging</li>
					<li><strong>Display Initialization:</strong> Configures the TFT display with landscape orientation and color inversion</li>
					<li><strong>WiFi Connection:</strong> Connects to your network and displays status messages on screen</li>
					<li><strong>Initial Fetch:</strong> Immediately fetches and displays the wallet balance</li>
				</ul>

				<h3>Main Loop</h3>
				<p>The <code>loop()</code> function continuously monitors and updates the display:</p>
				<ul>
					<li><strong>WiFi Health Check:</strong> Verifies WiFi connection and reconnects if necessary</li>
					<li><strong>Timing Control:</strong> Uses <code>millis()</code> to check if 60 seconds have elapsed since last fetch</li>
					<li><strong>Balance Update:</strong> Calls <code>fetchWalletBalance()</code> at regular intervals</li>
				</ul>

			<h3>Fetching Stake Balance</h3>
			<p>The <code>fetchStakeBalance()</code> function handles API communication:</p>
			<ul>
				<li><strong>HTTP Setup:</strong> Creates HTTP client and configures headers for JSON request</li>
				<li><strong>Stake Address Usage:</strong> Uses <code>account_info</code> endpoint with stake address (not payment address)</li>
				<li><strong>JSON Payload:</strong> Constructs request body with "_stake_addresses" array containing your stake address</li>
				<li><strong>POST Request:</strong> Sends request to Koios API endpoint</li>
				<li><strong>Response Parsing:</strong> Uses ArduinoJson to extract total_balance from response</li>
				<li><strong>String to Number Conversion:</strong> Koios returns balance as a string, so we use <code>atoll()</code> to convert it to a long long for large Lovelace values</li>
				<li><strong>Balance Conversion:</strong> Converts from Lovelace (1 tADA = 1,000,000 Lovelace) to tADA for display</li>
				<li><strong>Change Detection:</strong> Only updates display if balance has changed, and logs whether it increased or decreased</li>
				<li><strong>Serial Logging:</strong> Prints detailed information to serial monitor for debugging</li>
			</ul>

			<h3>Display Update</h3>
			<p>The display uses a simple, clean design with all white text on a blue background:</p>
			<ul>
				<li><strong>Screen Background:</strong> Fills entire screen with blue for consistent appearance</li>
				<li><strong>Title (White, Size 2):</strong> "Wallet Balance" at top of screen</li>
				<li><strong>Balance (White, Size 4):</strong> Large, prominent display of ADA amount with 2 decimal places</li>
				<li><strong>Unit Label (White, Size 2):</strong> "ADA" text to clearly identify the currency</li>
				<li><strong>Timestamp (White, Size 1):</strong> Lower left corner shows "Updated Xs ago" with live counter that updates every second</li>
			</ul>

			<h3>Timestamp Updates</h3>
			<p>A separate <code>updateTimestamp()</code> function efficiently updates just the timestamp:</p>
			<ul>
				<li><strong>Calculated Display:</strong> Shows seconds elapsed since last successful balance fetch</li>
				<li><strong>Efficient Redraw:</strong> Only clears and redraws the small timestamp area (200×10 pixels)</li>
				<li><strong>Live Counter:</strong> Called every second in the loop to provide real-time feedback</li>
				<li><strong>No Flicker:</strong> Minimal screen updates prevent flickering while keeping display responsive</li>
			</ul>

				<h3>Timing and Intervals</h3>
				<p>The sketch uses non-blocking timing for efficient operation:</p>
				<ul>
					<li><strong>checkInterval = 60000:</strong> Fetches balance every 60 seconds (60,000 milliseconds)</li>
					<li><strong>millis():</strong> Tracks time since device boot without blocking code execution</li>
					<li><strong>Non-blocking:</strong> Device remains responsive during delays between updates</li>
				</ul>

				<h3>Error Handling</h3>
				<p>The code includes basic error handling:</p>
				<ul>
					<li><strong>WiFi Reconnection:</strong> Automatically reconnects if connection drops</li>
					<li><strong>HTTP Response Codes:</strong> Checks if request was successful (>0)</li>
					<li><strong>JSON Validation:</strong> Verifies parsing succeeded and data exists before accessing</li>
					<li><strong>Default Values:</strong> Uses safe defaults (0.0) if data extraction fails</li>
				</ul>
			`}
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
