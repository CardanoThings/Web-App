<script>
	import * as Card from '$lib/components/ui/card/index.js';
</script>

<h1 class="mb-4">Introduction to the Arduino Platform</h1>

<p class="mb-4">
	The Arduino platform is a popular open-source electronics platform based on microcontrollers
	(MCUs) that allows users to create interactive projects with ease. It has become one of the most
	widely-used and accessible platforms for prototyping, learning, and developing IoT, robotics, and
	other embedded systems.
</p>

<section class="mb-4">
	<h2>What is Arduino?</h2>

	<p>
		Arduino is not just a single microcontroller, but rather a family of boards and software tools
		designed to make it easy to develop interactive projects. The platform consists of:
	</p>

	<ul>
		<li>
			<strong>Microcontrollers:</strong> Arduino boards are based on Atmel AVR or ARM Cortex-M microcontrollers.
		</li>
		<li>
			<strong>IDE (Integrated Development Environment):</strong> A user-friendly software environment
			for writing, compiling, and uploading code to the board.
		</li>
		<li>
			<strong>Libraries:</strong> Pre-built libraries that provide functionality for various sensors,
			actuators, and communication protocols.
		</li>
	</ul>
</section>

<section class="mb-4">
	<h2>What is Arduino used for?</h2>

	<p>The Arduino platform has a wide range of applications:</p>

	<ul>
		<li>Prototyping and development: Quickly test and refine ideas before moving to production.</li>
		<li>
			Education and learning: Introduce programming concepts, electronics, and robotics to students
			and hobbyists.
		</li>
		<li>
			IoT (Internet of Things): Connect devices to the internet for data collection, monitoring, and
			control.
		</li>
	</ul>
</section>

<section class="mb-4">
	<h2>Key Features</h2>

	<p>Arduino's key features include:</p>

	<ul>
		<li>
			Easy programming: Write code using a simple, intuitive syntax in languages like C++, Python,
			or JavaScript.
		</li>
		<li>
			Open-source: The Arduino platform is open-source, allowing developers to modify and extend the
			software and hardware.
		</li>
		<li>
			Large community: A vast online community provides extensive resources, documentation, and
			support.
		</li>
		<li>
			Wide range of boards: Choose from various boards with different microcontrollers, memory
			sizes, and features.
		</li>
		<li>
			Extensive libraries: Access a wide range of libraries for sensors, actuators, and
			communication protocols.
		</li>
		<li>
			Expansibility: Use a wide variety of shields (expansion boards) to add functionality and
			extend the capabilities of your project.
		</li>
	</ul>

	<p class="mt-4">
		The Arduino IDE is available for Windows, macOS, and Linux platforms. It includes:
	</p>

	<ul>
		<li>Code editor: Write and edit code using a simple syntax.</li>
		<li>Compiler: Compile and upload code to the board.</li>
		<li>Debugger: Debug and test your code in real-time.</li>
	</ul>
</section>

<section class="mb-4">
	<Card.Root>
		<Card.Header class="p-4 pb-0">
			<Card.Title class="text-lg">Getting started</Card.Title>
			<Card.Description class="mb-0 p-0">
				To get started with Arduino, follow these steps:
			</Card.Description>
		</Card.Header>
		<Card.Content class="p-4">
			<ul>
				<li>Download and install the Arduino IDE from the official website.</li>
				<li>Connect your Arduino board to your computer using a USB cable.</li>
				<li>Open the Arduino IDE and select the appropriate board and port from the Tools menu.</li>
				<li>Write your code in the IDE and click the Upload button to upload it to the board.</li>
			</ul>
		</Card.Content>
	</Card.Root>
</section>

<section class="mt-8">
	<h2 class="text-lg">Further Resources</h2>
	<ul>
		<li>
			<a href="https://www.arduino.cc" target="_blank" rel="noopener noreferrer" class="link"
				>Arduino Official Website</a
			>
		</li>
		<li>
			<a
				href="https://www.arduino.cc/en/Tutorial/HomePage"
				target="_blank"
				rel="noopener noreferrer"
				class="link">Arduino Tutorials</a
			>
		</li>
		<li>
			<a href="https://forum.arduino.cc" target="_blank" rel="noopener noreferrer" class="link"
				>Arduino Forum</a
			>
		</li>
	</ul>
</section>
