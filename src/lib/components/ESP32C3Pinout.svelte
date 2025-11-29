<script>
	import { glossary } from '$lib/data/glossary.js';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import { HelpCircle } from 'lucide-svelte';

	// ESP32-C3 Pinout Component
	// Displays the pinout diagram for the ESP32-C3 development board with interactive legend

	// Get protocol definitions from glossary
	const spiDefinition = glossary.find((item) => item.term === 'SPI')?.definition || '';
	const i2cDefinition = glossary.find((item) => item.term === 'I2C')?.definition || '';
	const uartDefinition = glossary.find((item) => item.term === 'UART')?.definition || '';

	// Pin category definitions
	const pinCategories = {
		spi: {
			title: 'SPI Protocol Pins',
			color: '#00B50D',
			definition: spiDefinition,
			details: `<span style="color: #00B50D; font-weight: 600;">SPI</span> (Serial Peripheral Interface) pins on the ESP32-C3 include:
			<ul class="mt-2 ml-4 list-disc space-y-1">
				<li><strong style="color: #00B50D;">MOSI</strong> (Master Out Slave In): Data line from microcontroller to peripheral device</li>
				<li><strong style="color: #00B50D;">MISO</strong> (Master In Slave Out): Data line from peripheral device to microcontroller</li>
				<li><strong style="color: #00B50D;">SCK</strong> (Serial Clock): Clock signal that synchronizes data transmission</li>
				<li><strong style="color: #00B50D;">SS/CS</strong> (Slave Select/Chip Select): Selects which peripheral device to communicate with</li>
			</ul>
			<p class="mt-2"><span style="color: #00B50D; font-weight: 600;">SPI</span> is commonly used for TFT displays, SD cards, and other devices requiring fast data transfer.</p>`
		},
		i2c: {
			title: 'I2C Protocol Pins',
			color: '#B5B500',
			definition: i2cDefinition,
			details: `<span style="color: #B5B500; font-weight: 600;">I2C</span> (Inter-Integrated Circuit) pins on the ESP32-C3 include:
			<ul class="mt-2 ml-4 list-disc space-y-1">
				<li><strong style="color: #B5B500;">SDA</strong> (Serial Data): Bidirectional data line for transmitting data between devices</li>
				<li><strong style="color: #B5B500;">SCL</strong> (Serial Clock): Clock signal that synchronizes data transmission</li>
			</ul>
			<p class="mt-2"><span style="color: #B5B500; font-weight: 600;">I2C</span> allows multiple devices to share the same two wires, making it ideal for connecting multiple sensors (like temperature, humidity, or motion sensors) to your microcontroller using just two pins.</p>`
		},
		uart: {
			title: 'UART Protocol Pins',
			color: '#001BB5',
			definition: uartDefinition,
			details: `<span style="color: #001BB5; font-weight: 600;">UART</span> (Universal Asynchronous Receiver-Transmitter) pins on the ESP32-C3 include:
			<ul class="mt-2 ml-4 list-disc space-y-1">
				<li><strong style="color: #001BB5;">TX</strong> (Transmit): Sends data from the microcontroller to another device</li>
				<li><strong style="color: #001BB5;">RX</strong> (Receive): Receives data from another device to the microcontroller</li>
			</ul>
			<p class="mt-2"><span style="color: #001BB5; font-weight: 600;">UART</span> is used for serial communication, including communication with your computer via USB (for the Serial Monitor) and communication between microcontrollers or other devices.</p>`
		},
		digital: {
			title: 'Digital I/O Pins',
			color: '#8A00FF',
			definition:
				'General Purpose Input/Output pins that can be configured as digital inputs or outputs, and can also generate PWM (Pulse Width Modulation) signals.',
			details: `<span style="color: #8A00FF; font-weight: 600;">Digital I/O & PWM</span> pins on the ESP32-C3 can:
			<ul class="mt-2 ml-4 list-disc space-y-1">
				<li><strong style="color: #8A00FF;">Digital Input:</strong> Read on/off states from buttons, switches, or digital sensors</li>
				<li><strong style="color: #8A00FF;">Digital Output:</strong> Control LEDs, relays, motors, and other digital devices</li>
				<li><strong style="color: #8A00FF;">PWM</strong> (Pulse Width Modulation): Control analog-like behavior such as LED brightness, motor speed, or servo position by rapidly switching the pin on and off</li>
			</ul>
			<p class="mt-2">These pins are the most versatile and commonly used pins for connecting sensors, actuators, and other components. Most <span style="color: #8A00FF; font-weight: 600;">GPIO</span> pins on the ESP32-C3 support <span style="color: #8A00FF; font-weight: 600;">PWM</span> functionality.</p>`
		},
		analog: {
			title: 'Analog I/O Pins',
			color: '#008EFF',
			definition:
				'Pins with Analog-to-Digital Converter (ADC) capability that can read analog voltage levels from sensors and other analog devices.',
			details: `<span style="color: #008EFF; font-weight: 600;">Analog I/O (ADC)</span> pins on the ESP32-C3 can:
			<ul class="mt-2 ml-4 list-disc space-y-1">
				<li><strong style="color: #008EFF;">Read Analog Values:</strong> Measure voltage levels from 0V to 3.3V and convert them to digital values (typically 0-4095 on a 12-bit <span style="color: #008EFF; font-weight: 600;">ADC</span>)</li>
				<li><strong style="color: #008EFF;">Connect Analog Sensors:</strong> Read values from potentiometers, light sensors, temperature sensors with analog output, and other analog devices</li>
				<li><strong style="color: #008EFF;">Precise Measurements:</strong> Provide more detailed readings than simple on/off digital inputs</li>
			</ul>
			<p class="mt-2">These pins are essential for reading analog sensors that output varying voltage levels rather than simple digital signals. The ESP32-C3 has multiple <span style="color: #008EFF; font-weight: 600;">ADC</span>-capable pins (<span style="color: #008EFF; font-weight: 600;">A0-A5</span>) that can read analog values.</p>`
		},
		power: {
			title: 'Power Pins',
			color: '#FF0000',
			definition:
				'Pins that provide power to the ESP32-C3 board and can supply power to external components.',
			details: `<span style="color: #FF0000; font-weight: 600;">Power</span> pins on the ESP32-C3 include:
			<ul class="mt-2 ml-4 list-disc space-y-1">
				<li><strong style="color: #FF0000;">5V:</strong> Provides 5 volts of power, typically used for powering external components that require 5V (like some relay modules, sensors, or displays)</li>
				<li><strong style="color: #FF0000;">3.3V:</strong> Provides 3.3 volts of power, the standard operating voltage for the ESP32-C3 and most compatible components</li>
			</ul>
			<p class="mt-2">⚠️ <strong>Important:</strong> Always check the voltage requirements of your components. Most ESP32-C3 compatible components use <span style="color: #FF0000; font-weight: 600;">3.3V</span>, but some (like certain relay modules) may require <span style="color: #FF0000; font-weight: 600;">5V</span>. Never exceed the maximum current rating of these pins.</p>`
		},
		ground: {
			title: 'Ground (GND)',
			color: '#000000',
			definition:
				'The reference point for electrical circuits, providing the common return path for current.',
			details: `The <span style="color: #000000; font-weight: 600;">Ground (GND)</span> pin on the ESP32-C3:
			<ul class="mt-2 ml-4 list-disc space-y-1">
				<li><strong style="color: #000000;">Common Reference:</strong> All voltage measurements are relative to ground</li>
				<li><strong style="color: #000000;">Current Return Path:</strong> Completes electrical circuits by providing a return path for current</li>
			</ul>
			<p class="mt-2">Every circuit needs a ground connection. Always connect the <span style="color: #000000; font-weight: 600;">GND</span> pin of your components (sensors, displays, relays, etc.) to the <span style="color: #000000; font-weight: 600;">GND</span> pin on the ESP32-C3 to complete the circuit.</p>`
		}
	};

	let openDialogs = {
		spi: false,
		i2c: false,
		uart: false,
		digital: false,
		analog: false,
		power: false,
		ground: false
	};
</script>

<Card.Root class="my-6">
	<Card.Header>
		<Card.Title>ESP32-C3 Pinout Diagram</Card.Title>
		<Card.Description>
			Reference diagram showing all GPIO pins, power pins, and communication protocol pins on the
			ESP32-C3 development board. Click the colored buttons below to learn more about each pin
			category.
			<strong class="mt-2 block text-purple-800 dark:text-purple-600">
				Note: There may be different variants of the ESP32-C3 with slightly different pin-outs.
				Always verify the pinout for your specific board model.
			</strong>
		</Card.Description>
	</Card.Header>
	<Card.Content class="flex flex-col gap-4">
		<div class="flex justify-center">
			<img
				src="/images/esp32c3-pinout.jpg"
				alt="ESP32-C3 Pinout Diagram"
				class="w-full max-w-2xl rounded-lg object-contain"
				loading="lazy"
			/>
		</div>

		<!-- Legend -->
		<div class="flex flex-col gap-0">
			<!-- Protocol Pins Row -->
			<div class="grid grid-cols-1 gap-2 sm:grid-cols-6">
				{#each ['spi', 'i2c', 'uart'] as key}
					{@const category = pinCategories[key]}
					<Dialog.Root bind:open={openDialogs[key]}>
						<Dialog.Trigger
							title={category.title}
							class="inline-flex cursor-pointer items-center gap-2 py-1.5 pr-3 pl-0 text-xs font-medium text-black transition-colors focus:outline-none sm:col-span-2"
						>
							<div class="h-4 w-4" style="background-color: {category.color};"></div>
							{category.title}
							<HelpCircle class="-ml-1 h-3.5 w-3.5 text-slate-500" />
						</Dialog.Trigger>
						<Dialog.Content
							class="max-h-[90vh] max-w-[calc(100vw-2rem)] overflow-y-auto sm:max-w-2xl"
						>
							<Dialog.Header class="text-left">
								<Dialog.Title class="text-left text-black">{category.title}</Dialog.Title>
								<Dialog.Description class="text-left text-black">
									{@html category.definition}
								</Dialog.Description>
							</Dialog.Header>
							<div class="mt-4 text-left text-sm text-black">
								{@html category.details}
							</div>
						</Dialog.Content>
					</Dialog.Root>
				{/each}
			</div>

			<!-- Digital and Analog Pins Row -->
			<div class="grid grid-cols-1 gap-2 sm:grid-cols-6">
				{#each ['digital', 'analog'] as key}
					{@const category = pinCategories[key]}
					<Dialog.Root bind:open={openDialogs[key]}>
						<Dialog.Trigger
							title={category.title}
							class="inline-flex cursor-pointer items-center gap-2 py-1.5 pr-3 pl-0 text-xs font-medium text-black transition-colors focus:outline-none sm:col-span-2"
						>
							<div class="h-4 w-4" style="background-color: {category.color};"></div>
							{category.title}
							<HelpCircle class="-ml-1 h-3.5 w-3.5 text-slate-500" />
						</Dialog.Trigger>
						<Dialog.Content
							class="max-h-[90vh] max-w-[calc(100vw-2rem)] overflow-y-auto sm:max-w-2xl"
						>
							<Dialog.Header class="text-left">
								<Dialog.Title class="text-left text-black">{category.title}</Dialog.Title>
								<Dialog.Description class="text-left text-black">
									{@html category.definition}
								</Dialog.Description>
							</Dialog.Header>
							<div class="mt-4 text-left text-sm text-black">
								{@html category.details}
							</div>
						</Dialog.Content>
					</Dialog.Root>
				{/each}
			</div>

			<!-- Power and Ground Row -->
			<div class="grid grid-cols-1 gap-2 sm:grid-cols-6">
				{#each ['power', 'ground'] as key}
					{@const category = pinCategories[key]}
					<Dialog.Root bind:open={openDialogs[key]}>
						<Dialog.Trigger
							title={category.title}
							class="inline-flex cursor-pointer items-center gap-2 py-1.5 pr-3 pl-0 text-xs font-medium text-black transition-colors focus:outline-none sm:col-span-2"
						>
							<div class="h-4 w-4" style="background-color: {category.color};"></div>
							{category.title}
							<HelpCircle class="-ml-1 h-3.5 w-3.5 text-slate-500" />
						</Dialog.Trigger>
						<Dialog.Content
							class="max-h-[90vh] max-w-[calc(100vw-2rem)] overflow-y-auto sm:max-w-2xl"
						>
							<Dialog.Header class="text-left">
								<Dialog.Title class="text-left text-black">{category.title}</Dialog.Title>
								<Dialog.Description class="text-left text-black">
									{@html category.definition}
								</Dialog.Description>
							</Dialog.Header>
							<div class="mt-4 text-left text-sm text-black">
								{@html category.details}
							</div>
						</Dialog.Content>
					</Dialog.Root>
				{/each}
			</div>
		</div>
	</Card.Content>
</Card.Root>
