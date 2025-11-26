/**
 * Building Blocks Data
 * 
 * This file contains all the code block examples for ESP32-based projects.
 * Each block represents a complete, ready-to-use code example with comprehensive
 * documentation including prerequisites, usage instructions, and troubleshooting tips.
 * 
 * @typedef {Object} Block
 * @property {string} slug - URL-friendly identifier for the block
 * @property {string} title - Display title of the block
 * @property {string[]} tags - Array of tags for filtering (e.g., "Arduino-IDE", "ESP32-C3", "ESP32-CYD")
 * @property {string} [language] - Programming language for syntax highlighting (e.g., "cpp", "javascript") - defaults to "cpp" if not specified
 * @property {string} description - Short description of what the block does
 * @property {string} link - Internal link to the block's detail page
 * @property {string} overview - Detailed explanation of the block's purpose and functionality
 * @property {string[]} features - List of key features this block demonstrates
 * @property {string} prerequisites - HTML string with setup instructions (optional)
 * @property {string} code - The actual Arduino/C++/JavaScript code with comprehensive inline comments
 * @property {string} githubLink - URL to the code repository (optional)
 * @property {Object[]} [resources] - Additional learning resources (optional)
 * @property {string} resources[].title - Resource title
 * @property {string} resources[].url - Resource URL
 * @property {string} resources[].description - Resource description
 * @property {string} usage - HTML string with step-by-step usage instructions
 * @property {Object[]} parameters - List of important parameters/functions used in the code
 * @property {string} parameters[].name - Parameter or function name
 * @property {string} parameters[].type - Type (e.g., "define", "function")
 * @property {string} parameters[].description - What the parameter/function does
 * @property {string} notes - HTML string with additional notes and explanations for beginners
 * @property {string} [troubleshooting] - HTML string with common issues and solutions (optional)
 * @property {string} [nextSteps] - HTML string with suggestions for what to build next (optional)
 */

/**
 * Array of all available building blocks
 * Blocks are organized by hardware platform and complexity
 * @type {Block[]}
 */
export const blocks = [
  {
    slug: "blink",
    title: "Hello World / Blink",
    tags: ["Arduino-IDE", "ESP32-C3"],
    description: "Get started with your ESP32-C3 by blinking the built-in LED and output messages to the serial monitor",
    link: "/blocks/blink",
    overview: "This is the most basic block to get you started with ESP32-C3 programming. It demonstrates how to control an LED and output status messages to the serial monitor, which is essential for debugging and understanding your ESP32 applications.",
    features: [
      "LED control with digitalWrite",
      "Serial output for monitoring",
      "Basic ESP32-C3 setup",
      "Foundation for more complex projects"
    ],
    prerequisites: `<h3>Before You Begin</h3>
        <p>Make sure you have the following set up before running this example:</p>
        
        <h4>1. Install Arduino IDE</h4>
        <ul>
          <li>Download the latest Arduino IDE from <a href="https://www.arduino.cc/en/software" target="_blank">arduino.cc/en/software</a></li>
          <li>Install the IDE following the instructions for your operating system (Windows, macOS, or Linux)</li>
          <li>Launch the Arduino IDE after installation</li>
        </ul>
        
        <h4>2. Install ESP32 Board Support</h4>
        <ul>
          <li>Go to <strong>Tools → Board → Boards Manager</strong></li>
          <li>Search for "ESP32" and install <strong>"esp32 by Espressif Systems"</strong></li>
          <li>Wait for the installation to complete (this may take a few minutes)</li>
        </ul>
        
        <h4>3. Select Your Board</h4>
        <ul>
          <li>Go to <strong>Tools → Board → esp32</strong></li>
          <li>Select <strong>"ESP32C3 Dev Module"</strong> from the list</li>
          <li>If you have a specific ESP32-C3 board (like Seeed XIAO ESP32C3), select that instead</li>
        </ul>
        
        <h4>4. Select the Correct Port</h4>
        <ul>
          <li>Connect your ESP32-C3 to your computer using a USB cable</li>
          <li>Go to <strong>Tools → Port</strong></li>
          <li>Select the port that appears (usually labeled as "USB Serial" or similar)</li>
          <li><strong>Windows:</strong> Look for COM3, COM4, etc.</li>
          <li><strong>macOS:</strong> Look for /dev/cu.usbserial-* or /dev/cu.usbmodem*</li>
          <li><strong>Linux:</strong> Look for /dev/ttyUSB* or /dev/ttyACM*</li>
        </ul>`,
    code: `
/*
 * ESP32-C3 Blink Example
 * 
 * This is the "Hello World" of microcontroller programming. It demonstrates
 * the basics of digital output control and serial communication.
 * 
 * What you'll learn:
 * - How to define constants with #define
 * - How to configure GPIO pins as outputs
 * - How to turn LEDs on and off
 * - How to send debug messages to the Serial Monitor
 * - How to create timing delays
 */

// Define the GPIO pin number for the built-in LED
// On ESP32-C3 boards, the built-in LED is typically connected to GPIO 8
#define LED_PIN 8

/**
 * setup() function runs once when the board starts up or is reset
 * Use this function to initialize pins, start serial communication,
 * and perform any one-time configuration
 */
void setup() {
  // Initialize serial communication at 115200 baud rate
  // This allows us to send debug messages to the Serial Monitor
  Serial.begin(115200);
  
  // Wait 1 second for the serial port to initialize
  // This ensures we don't miss any early debug messages
  delay(1000);
  
  // Configure the LED pin as an OUTPUT
  // This tells the ESP32 that we want to control this pin's voltage
  pinMode(LED_PIN, OUTPUT);
  
  // Print initialization messages to the Serial Monitor
  Serial.println("ESP32-C3 Blink Example");
  Serial.println("LED will blink every second");
  Serial.println("------------------------");
}

/**
 * loop() function runs repeatedly after setup() completes
 * This is where you put your main program logic
 * The loop continues forever until the board is reset or powered off
 */
void loop() {
  // Turn the LED ON by setting the pin to HIGH (3.3V)
  digitalWrite(LED_PIN, HIGH);
  Serial.println("LED ON");
  
  // Wait for 1000 milliseconds (1 second) with LED on
  delay(1000);
  
  // Turn the LED OFF by setting the pin to LOW (0V)
  digitalWrite(LED_PIN, LOW);
  Serial.println("LED OFF");
  
  // Wait for 1000 milliseconds (1 second) with LED off
  delay(1000);
  
  // After this delay, the loop() function starts over from the top
}`,
    githubLink: "https://github.com/cardanothings/examples/tree/main/blocks/blink",
    usage: `<ol>
          <li>Connect your ESP32-C3 to your computer via USB</li>
          <li>Open Arduino IDE or PlatformIO</li>
          <li>Copy and paste the code into your project</li>
          <li>Upload the code to your ESP32-C3</li>
          <li>The built-in LED should start blinking</li>
          <li>Open the Serial Monitor (<strong>Tools → Serial Monitor</strong>)</li>
          <li>Set the baud rate to 115200</li>
          <li>You should see "LED ON" and "LED OFF" messages as the LED blinks</li>
        </ol>`,
    parameters: [
      {
        name: "LED_PIN",
        type: "define",
        description: "GPIO pin number for the built-in LED (GPIO8 on ESP32-C3)"
      },
      {
        name: "pinMode()",
        type: "function",
        description: "Configures the specified pin to behave as an input or output"
      },
      {
        name: "digitalWrite()",
        type: "function",
        description: "Sets a digital pin to HIGH (on) or LOW (off)"
      },
      {
        name: "Serial.begin()",
        type: "function",
        description: "Initializes serial communication. The parameter (115200) sets the baud rate for communication."
      },
      {
        name: "Serial.println()",
        type: "function",
        description: "Prints text to the serial monitor followed by a newline character."
      },
      {
        name: "delay()",
        type: "function",
        description: "Pauses the program for the specified number of milliseconds."
      }
    ],
    notes: `<p><strong>Understanding the Code:</strong></p>
        <ul>
          <li><strong>GPIO8:</strong> The built-in LED on most ESP32-C3 boards is connected to GPIO8</li>
          <li><strong>pinMode():</strong> Configures a pin to be either an input (reads signals) or output (sends signals)</li>
          <li><strong>digitalWrite():</strong> Sets a pin to HIGH (3.3V, LED on) or LOW (0V, LED off)</li>
          <li><strong>delay():</strong> Pauses the program for a specified time in milliseconds (1000ms = 1 second)</li>
          <li><strong>Serial Monitor:</strong> A tool that lets you see messages from your ESP32 on your computer</li>
        </ul>
        
        <p><strong>Board Variations:</strong></p>
        <ul>
          <li>Some ESP32-C3 boards may have the LED on a different pin - check your board's documentation</li>
          <li>You can change <code>LED_PIN</code> to any GPIO pin to use an external LED</li>
          <li>Different ESP32-C3 models (like Seeed XIAO) may need different board selections in Arduino IDE</li>
        </ul>`,
    troubleshooting: `<p><strong>LED Issues:</strong></p>
        <ul>
          <li><strong>LED doesn't blink:</strong> Verify <code>LED_PIN</code> matches your board's built-in LED pin</li>
          <li><strong>No LED at all:</strong> Some boards don't have a built-in LED - you'll need to connect an external one</li>
        </ul>
        
        <p><strong>Serial Monitor Issues:</strong></p>
        <ul>
          <li><strong>No serial output:</strong> Check that the correct COM port is selected in <strong>Tools → Port</strong></li>
          <li><strong>Garbled text:</strong> Make sure the baud rate in Serial Monitor matches the code (115200)</li>
          <li><strong>Port not showing:</strong> Try a different USB cable or USB port on your computer</li>
        </ul>
        
        <p><strong>Upload Issues:</strong></p>
        <ul>
          <li><strong>Can't upload:</strong> Press and hold the BOOT button on your board, then click Upload</li>
          <li><strong>Still not working:</strong> Try pressing the reset button on your ESP32-C3</li>
        </ul>`,
    nextSteps: `<ul>
          <li>Change the delay times to make the LED blink faster or slower</li>
          <li>Connect an external LED to a different GPIO pin and control it</li>
          <li>Try making the LED blink in a pattern (like SOS: ···---···)</li>
          <li>Add a second LED and make them blink alternately</li>
          <li>Move on to the WiFi Connection block to connect your ESP32 to the internet</li>
        </ul>`
  },
  {
    slug: "cyd-hello-display",
    title: "Hello World / Blink",
    tags: ["Arduino-IDE", "ESP32-CYD"],
    description: "Get started with the Cheap Yellow Display (CYD) by blinking the built-in LED and output messages to the serial monitor",
    link: "/blocks/cyd-hello-display",
    overview: "The Cheap Yellow Display (CYD), officially known as ESP32-2432S028R, is an all-in-one ESP32 development board with a built-in 320x240 color touchscreen display. This is the most basic block to get you started with CYD programming. It demonstrates how to control an LED and output status messages to the serial monitor, which is essential for debugging and understanding your CYD applications.",
    features: [
      "LED control with digitalWrite",
      "Serial output for monitoring",
      "Basic CYD setup",
      "Foundation for more complex projects"
    ],
    prerequisites: `<h3>Before You Begin</h3>
        <p>The CYD requires some specific setup steps. Make sure you complete all of these before running the example:</p>
        
        <h4>1. Install Arduino IDE</h4>
        <ul>
          <li>Download the latest Arduino IDE from <a href="https://www.arduino.cc/en/software" target="_blank">arduino.cc/en/software</a></li>
          <li>Install the IDE following the instructions for your operating system (Windows, macOS, or Linux)</li>
          <li>Launch the Arduino IDE after installation</li>
        </ul>
        
        <h4>2. Install CH340 USB Driver</h4>
        <p><strong>⚠️ Important:</strong> The CYD uses a CH340 USB-to-serial chip. You must install the driver before your computer can communicate with the board.</p>
        <ul>
          <li>Visit the <a href="https://learn.sparkfun.com/tutorials/how-to-install-ch340-drivers/all" target="_blank">SparkFun CH340 Driver Installation Guide</a></li>
          <li>Download the appropriate driver for your operating system</li>
          <li>Follow the installation instructions for your OS</li>
          <li>Restart your computer after installation (recommended)</li>
        </ul>
        
        <h4>3. Install ESP32 Board Support</h4>
        <ul>
          <li>Go to <strong>Tools → Board → Boards Manager</strong></li>
          <li>Search for "ESP32" and install <strong>"esp32 by Espressif Systems"</strong></li>
          <li>Wait for the installation to complete (this may take a few minutes)</li>
        </ul>
        
        <h4>4. Select Your Board</h4>
        <ul>
          <li>Go to <strong>Tools → Board → esp32</strong></li>
          <li>Select <strong>"ESP32 Dev Module"</strong> from the list</li>
        </ul>
        
        <h4>5. Select the Correct Port</h4>
        <ul>
          <li>Connect your CYD to your computer using a USB cable</li>
          <li>Go to <strong>Tools → Port</strong></li>
          <li>Select the port that appears (usually labeled as "USB Serial" or similar)</li>
          <li><strong>Windows:</strong> Look for COM3, COM4, etc.</li>
          <li><strong>macOS:</strong> Look for /dev/cu.usbserial-* or /dev/cu.wchusbserial*</li>
          <li><strong>Linux:</strong> Look for /dev/ttyUSB* or /dev/ttyACM*</li>
        </ul>`,
    code: `
/*
 * Cheap Yellow Display (CYD) Blink Example
 * 
 * This is the "Hello World" for the CYD (ESP32-2432S028R) board.
 * The CYD has a built-in RGB LED and a TFT touchscreen display.
 * This example demonstrates basic LED control and serial communication.
 * 
 * What you'll learn:
 * - How to define constants for GPIO pins
 * - How to configure GPIO pins as outputs
 * - How to control the built-in RGB LED
 * - How to send debug messages to the Serial Monitor
 * - How to create timing delays
 * 
 * Hardware: ESP32-2432S028R (Cheap Yellow Display)
 * LED: Built-in RGB LED on GPIO 4
 */

// Define the GPIO pin number for the built-in RGB LED
// On the CYD board, the RGB LED is connected to GPIO 4
#define LED_PIN 4

/**
 * setup() function runs once when the board starts up or is reset
 * Use this function to initialize pins, start serial communication,
 * and perform any one-time configuration
 */
void setup() {
  // Initialize serial communication at 115200 baud rate
  // This allows us to send debug messages to the Serial Monitor
  // Make sure to set your Serial Monitor to the same baud rate
  Serial.begin(115200);
  
  // Wait 1 second for the serial port to initialize
  // This is especially important for boards with native USB
  // It ensures we don't miss any early debug messages
  delay(1000);
  
  // Configure the LED pin as an OUTPUT
  // This tells the ESP32 that we want to control this pin's voltage
  // OUTPUT mode allows us to set the pin HIGH (3.3V) or LOW (0V)
  pinMode(LED_PIN, OUTPUT);
  
  // Print initialization messages to the Serial Monitor
  // These messages confirm the program has started successfully
  Serial.println("CYD Blink Example");
  Serial.println("LED will blink every second");
  Serial.println("------------------------");
}

/**
 * loop() function runs repeatedly after setup() completes
 * This is where you put your main program logic
 * The loop continues forever until the board is reset or powered off
 */
void loop() {
  // Turn the LED ON by setting the pin to HIGH (3.3V)
  // This illuminates the RGB LED (appears as white/blue depending on the LED)
  digitalWrite(LED_PIN, HIGH);
  Serial.println("LED ON");
  
  // Wait for 1000 milliseconds (1 second) with LED on
  // delay() pauses the program - nothing else happens during this time
  delay(1000);
  
  // Turn the LED OFF by setting the pin to LOW (0V)
  // This turns off the LED completely
  digitalWrite(LED_PIN, LOW);
  Serial.println("LED OFF");
  
  // Wait for 1000 milliseconds (1 second) with LED off
  // This creates a complete on/off blink cycle of 2 seconds total
  delay(1000);
  
  // After this delay, the loop() function automatically starts over from the top
  // This creates a continuous blinking pattern: ON -> wait -> OFF -> wait -> repeat
}`,
    githubLink: "https://github.com/witnessmenow/ESP32-Cheap-Yellow-Display",
    resources: [
      {
        title: "CYD GitHub Repository",
        url: "https://github.com/witnessmenow/ESP32-Cheap-Yellow-Display",
        description: "Complete documentation, examples, and community resources for the Cheap Yellow Display"
      },
      {
        title: "CH340 Driver Installation Guide",
        url: "https://learn.sparkfun.com/tutorials/how-to-install-ch340-drivers/all",
        description: "Step-by-step guide for installing CH340 USB drivers on Windows, macOS, and Linux"
      }
    ],
    usage: `<ol>
          <li>Complete all prerequisite steps, especially the CH340 driver installation</li>
          <li>Connect your CYD to your computer via USB</li>
          <li>Open Arduino IDE</li>
          <li>Copy and paste the code into a new sketch</li>
          <li>Select "ESP32 Dev Module" from <strong>Tools → Board</strong></li>
          <li>Select the correct port from <strong>Tools → Port</strong></li>
          <li>Click Upload</li>
          <li>The RGB LED should start blinking</li>
          <li>Open the Serial Monitor (<strong>Tools → Serial Monitor</strong>)</li>
          <li>Set the baud rate to 115200</li>
          <li>You should see "LED ON" and "LED OFF" messages as the LED blinks</li>
        </ol>`,
    parameters: [
      {
        name: "LED_PIN",
        type: "define",
        description: "GPIO pin number for the built-in RGB LED (GPIO4 on CYD)"
      },
      {
        name: "pinMode()",
        type: "function",
        description: "Configures the specified pin to behave as an input or output"
      },
      {
        name: "digitalWrite()",
        type: "function",
        description: "Sets a digital pin to HIGH (on) or LOW (off)"
      },
      {
        name: "Serial.begin()",
        type: "function",
        description: "Initializes serial communication. The parameter (115200) sets the baud rate for communication."
      },
      {
        name: "Serial.println()",
        type: "function",
        description: "Prints text to the serial monitor followed by a newline character."
      },
      {
        name: "delay()",
        type: "function",
        description: "Pauses the program for the specified number of milliseconds."
      }
    ],
    notes: `<p><strong>About the CYD (Cheap Yellow Display):</strong></p>
        <ul>
          <li><strong>Official name:</strong> ESP32-2432S028R</li>
          <li><strong>Display:</strong> 320x240 pixels, 2.8" ILI9341 TFT LCD</li>
          <li><strong>Touchscreen:</strong> Resistive touch (XPT2046)</li>
          <li><strong>Processor:</strong> ESP32 with WiFi and Bluetooth</li>
          <li><strong>Cost:</strong> Around $15 USD (very affordable!)</li>
          <li><strong>Extra features:</strong> SD card slot, RGB LED, extra GPIO pins</li>
        </ul>
        
        <p><strong>Understanding the RGB LED:</strong></p>
        <ul>
          <li>The built-in RGB LED is connected to GPIO4</li>
          <li>An RGB LED can show different colors (red, green, blue, and combinations)</li>
          <li>This example just turns it on/off - you can control individual colors with more advanced code</li>
          <li>Perfect for status indicators in your projects</li>
        </ul>
        
        <p><strong>CYD Hardware Features:</strong></p>
        <ul>
          <li><strong>Touchscreen:</strong> You can detect finger touches and build interactive interfaces</li>
          <li><strong>Display:</strong> Much larger than OLED displays - great for dashboards and UIs</li>
          <li><strong>SD Card:</strong> Store data, images, or configuration files</li>
          <li><strong>All-in-one:</strong> Everything you need in one board - no extra wiring!</li>
        </ul>`,
    troubleshooting: `<p><strong>Driver Issues:</strong></p>
        <ul>
          <li><strong>Computer doesn't detect CYD:</strong> Install the CH340 USB driver (see prerequisites)</li>
          <li><strong>Driver installed but still not working:</strong> Restart your computer after driver installation</li>
          <li><strong>Port shows but upload fails:</strong> Try a different USB cable (some cables are charge-only)</li>
        </ul>
        
        <p><strong>Upload Issues:</strong></p>
        <ul>
          <li><strong>Upload fails:</strong> Hold the BOOT button on the CYD while clicking Upload</li>
          <li><strong>Timeout during upload:</strong> Press and hold BOOT, then press Reset, then release BOOT, then try uploading</li>
          <li><strong>Still can't upload:</strong> Make sure you selected "ESP32 Dev Module" (not ESP32-C3)</li>
        </ul>
        
        <p><strong>LED and Serial Issues:</strong></p>
        <ul>
          <li><strong>LED doesn't blink:</strong> Verify <code>LED_PIN</code> is set to 4</li>
          <li><strong>No serial output:</strong> Check the correct COM port is selected in <strong>Tools → Port</strong></li>
          <li><strong>Garbled text:</strong> Set Serial Monitor baud rate to 115200</li>
          <li><strong>After upload:</strong> Try pressing the reset button on your CYD</li>
        </ul>`,
    nextSteps: `<ul>
          <li>Change the delay times to make the LED blink in different patterns</li>
          <li>Explore the color TFT display using the TFT_eSPI library</li>
          <li>Add touch screen functionality using the XPT2046_Touchscreen library</li>
          <li>Connect to WiFi and display live data from the internet</li>
          <li>Build a weather dashboard, crypto ticker, or smart home control panel</li>
          <li>Check the <a href="https://github.com/witnessmenow/ESP32-Cheap-Yellow-Display" target="_blank">CYD GitHub repository</a> for tons of examples and inspiration</li>
        </ul>`
  },
  {
    slug: "nodejs-express-server",
    title: "Node.js Express API Basics",
    tags: ["Node.js"],
    language: "javascript",
    description: "Learn the basics of building an API with Node.js and Express - includes GET and POST endpoints",
    link: "/blocks/nodejs-express-server",
    overview: "This is a beginner-friendly introduction to creating a simple API server using Node.js and Express.js. You'll learn how to read data with GET requests and create new data with POST requests. Perfect for understanding the fundamentals before building more complex applications.",
    features: [
      "Simple Express.js server setup",
      "GET endpoint to retrieve data",
      "POST endpoint to create data",
      "JSON data handling",
      "Easy to understand for beginners"
    ],
    prerequisites: `<h3>Before You Begin</h3>
        
        <h4>1. Install Node.js</h4>
        <ul>
          <li>Download and install Node.js from <a href="https://nodejs.org/" target="_blank">nodejs.org</a></li>
          <li>Verify it works by running <code>node --version</code> in your terminal</li>
        </ul>
        
        <h4>2. Set Up Your Project</h4>
        <ul>
          <li>Create a new folder and open your terminal there</li>
          <li>Run: <code>npm init -y</code></li>
          <li>Run: <code>npm install express</code></li>
        </ul>`,
    code: `
// Simple Express API - Beginner Friendly
// This example shows you how to create a basic API with GET and POST endpoints

// Import Express
const express = require('express');
const app = express();
const PORT = 3000;

// This lets Express understand JSON data
app.use(express.json());

// Our "database" - just an array for now
let items = [
  { id: 1, name: 'Apple', description: 'A red fruit' },
  { id: 2, name: 'Banana', description: 'A yellow fruit' },
  { id: 3, name: 'Orange', description: 'An orange fruit' }
];

let nextId = 4; // For creating new items

// GET endpoint - Retrieve all items
// Try: http://localhost:3000/api/items
app.get('/api/items', (req, res) => {
  res.json(items);
});

// POST endpoint - Create a new item
// Send JSON like: { "name": "Grape", "description": "A purple fruit" }
app.post('/api/items', (req, res) => {
  // Get the name and description from the request
  const { name, description } = req.body;
  
  // Make sure we have both fields
  if (!name || !description) {
    return res.status(400).json({ error: 'Please provide name and description' });
  }
  
  // Create the new item
  const newItem = {
    id: nextId++,
    name,
    description
  };
  
  // Add it to our array
  items.push(newItem);
  
  // Send back the new item
  res.status(201).json(newItem);
});

// Start the server
app.listen(PORT, () => {
  console.log(\`Server running at http://localhost:\${PORT}\`);
  console.log('Try these endpoints:');
  console.log(\`  GET  http://localhost:\${PORT}/api/items\`);
  console.log(\`  POST http://localhost:\${PORT}/api/items\`);
});`,
    githubLink: "https://github.com/cardanothings/examples/tree/main/blocks/nodejs-express-server",
    resources: [
      {
        title: "Express.js Getting Started",
        url: "https://expressjs.com/en/starter/hello-world.html",
        description: "Official Express.js beginner tutorial"
      },
      {
        title: "What is an API?",
        url: "https://www.freecodecamp.org/news/what-is-an-api-in-english-please-b880a3214a82/",
        description: "Simple explanation of APIs for beginners"
      }
    ],
    usage: `<ol>
          <li>Create a file named <code>server.js</code> in your project folder</li>
          <li>Copy and paste the code into <code>server.js</code></li>
          <li>Open your terminal and run: <code>node server.js</code></li>
          <li>Open your browser and go to: <code>http://localhost:3000/api/items</code></li>
          <li>You should see the list of items!</li>
        </ol>
        
        <h4>Testing the POST endpoint:</h4>
        <p>You can use a tool like <a href="https://www.postman.com/" target="_blank">Postman</a> or curl in your terminal:</p>
        <pre><code># Get all items
curl http://localhost:3000/api/items

# Create a new item
curl -X POST http://localhost:3000/api/items \\
  -H "Content-Type: application/json" \\
  -d '{"name":"Grape","description":"A purple fruit"}'</code></pre>`,
    parameters: [
      {
        name: "express()",
        type: "function",
        description: "Creates a new Express application"
      },
      {
        name: "app.use(express.json())",
        type: "middleware",
        description: "Tells Express to understand JSON data in requests"
      },
      {
        name: "app.get()",
        type: "function",
        description: "Creates an endpoint that responds to GET requests (for reading data)"
      },
      {
        name: "app.post()",
        type: "function",
        description: "Creates an endpoint that responds to POST requests (for creating data)"
      },
      {
        name: "req.body",
        type: "object",
        description: "Contains the data sent in the request"
      },
      {
        name: "res.json()",
        type: "function",
        description: "Sends JSON data back as the response"
      },
      {
        name: "app.listen()",
        type: "function",
        description: "Starts the server on the specified port"
      }
    ],
    notes: `<p><strong>Understanding HTTP Methods:</strong></p>
        <ul>
          <li><strong>GET:</strong> Used to retrieve/read data from the server (like viewing a list)</li>
          <li><strong>POST:</strong> Used to send/create new data on the server (like adding a new item)</li>
          <li><strong>PUT:</strong> Used to update existing data (not shown in this example)</li>
          <li><strong>DELETE:</strong> Used to remove data (not shown in this example)</li>
        </ul>
        
        <p><strong>Key Concepts for Beginners:</strong></p>
        <ul>
          <li><strong>API:</strong> Application Programming Interface - a way for programs to talk to each other</li>
          <li><strong>Endpoint:</strong> A specific URL path (like <code>/api/items</code>) that does something</li>
          <li><strong>JSON:</strong> JavaScript Object Notation - a format for sending data that looks like: <code>{"name": "value"}</code></li>
          <li><strong>Request:</strong> When someone (or a program) asks your API for something</li>
          <li><strong>Response:</strong> What your API sends back</li>
          <li><strong>Port:</strong> A numbered "door" on your computer where the server listens (like 3000)</li>
        </ul>
        
        <p><strong>How This Example Works:</strong></p>
        <ul>
          <li>The server stores items in an array (temporary - resets when you restart)</li>
          <li>GET /api/items shows all items</li>
          <li>POST /api/items creates a new item</li>
          <li>Each item gets an automatic ID number</li>
          <li>You can test it in your browser or with tools like Postman or curl</li>
        </ul>`,
    troubleshooting: `<p><strong>Installation Errors:</strong></p>
        <ul>
          <li><strong>"Cannot find module 'express'":</strong> Run <code>npm install express</code> in your project folder</li>
          <li><strong>"npm: command not found":</strong> Install Node.js first from <a href="https://nodejs.org" target="_blank">nodejs.org</a></li>
          <li><strong>"Permission denied":</strong> Don't use <code>sudo</code> - instead fix npm permissions or use nvm</li>
        </ul>
        
        <p><strong>Server Errors:</strong></p>
        <ul>
          <li><strong>"Port already in use" / EADDRINUSE:</strong> Another program is using port 3000. Change <code>PORT</code> to 3001 or 8080 in the code</li>
          <li><strong>Can't access from browser:</strong> Make sure you're using <code>http://localhost:3000</code> (not https)</li>
          <li><strong>Empty response:</strong> Check the URL path is exactly <code>/api/items</code> (with the slash)</li>
        </ul>
        
        <p><strong>POST Request Errors:</strong></p>
        <ul>
          <li><strong>"Cannot read property 'name'":</strong> Make sure you're sending JSON data with the correct field names</li>
          <li><strong>"Unexpected token":</strong> Check your JSON syntax - use double quotes, not single quotes</li>
          <li><strong>400 error:</strong> The request is missing required fields (name or description)</li>
        </ul>`,
    nextSteps: `<ul>
          <li>Add a PUT endpoint to update items by ID</li>
          <li>Add a DELETE endpoint to remove items</li>
          <li>Add a GET endpoint to retrieve a single item by ID (like <code>/api/items/:id</code>)</li>
          <li>Connect to a real database like MongoDB to save data permanently</li>
          <li>Learn about authentication to protect your API with passwords or tokens</li>
          <li>Add more fields to your items (price, category, image URL, etc.)</li>
          <li>Build a simple HTML frontend to interact with your API</li>
          <li>Add validation to check if data is correct before saving</li>
        </ul>`
  },
  {
    slug: "esp32-wifi-connection",
    title: "ESP32 WiFi Connection",
    tags: ["Arduino-IDE", "ESP32-C3", "ESP32-CYD"],
    description: "Connect your ESP32 to a WiFi network and verify the connection with IP address display",
    link: "/blocks/esp32-wifi-connection",
    overview: "This block teaches you how to connect your ESP32 (C3, CYD, or any ESP32 board) to a WiFi network. WiFi connectivity is essential for IoT projects, allowing your device to access the internet, make API calls, and communicate with other devices. You'll learn how to set up WiFi credentials, establish a connection, and verify that your device is successfully connected to your network.",
    features: [
      "WiFi connection setup",
      "Network scanning and connection",
      "Connection status monitoring",
      "IP address display",
      "Signal strength (RSSI) monitoring",
      "Automatic reconnection handling"
    ],
    prerequisites: `<h3>Before You Begin</h3>
        
        <h4>1. Hardware Setup</h4>
        <ul>
          <li>ESP32-C3, ESP32 CYD, or any ESP32 development board</li>
          <li>USB cable to connect to your computer</li>
          <li>Arduino IDE installed with ESP32 board support</li>
        </ul>
        
        <h4>2. WiFi Network Information</h4>
        <ul>
          <li>Know your WiFi network name (SSID)</li>
          <li>Know your WiFi password</li>
          <li>Make sure you're connecting to a 2.4GHz network (ESP32 does not support 5GHz)</li>
        </ul>
        
        <h4>3. Arduino IDE Configuration</h4>
        <ul>
          <li>Board selected: ESP32C3 Dev Module or ESP32 Dev Module</li>
          <li>Correct COM port selected</li>
          <li>Serial Monitor ready to view connection status</li>
        </ul>`,
    code: `
/*
 * ESP32 WiFi Connection Example
 * 
 * This example demonstrates how to connect your ESP32 to a WiFi network.
 * Once connected, it displays the IP address assigned to your device
 * and monitors the connection status.
 * 
 * Compatible with: ESP32-C3, ESP32 CYD, and all ESP32 boards
 * 
 * What you'll learn:
 * - How to include the WiFi library
 * - How to set WiFi mode
 * - How to connect to a WiFi network
 * - How to check connection status
 * - How to retrieve network information (IP, signal strength)
 */

#include <WiFi.h>

// Replace with your network credentials
const char* ssid = "YOUR_WIFI_NAME";      // Your WiFi network name
const char* password = "YOUR_WIFI_PASSWORD";  // Your WiFi password

void setup() {
  // Initialize serial communication
  Serial.begin(115200);
  delay(1000);
  
  Serial.println();
  Serial.println("==============================");
  Serial.println("ESP32 WiFi Connection Example");
  Serial.println("==============================");
  
  // Set WiFi mode to Station (client mode)
  // This means the ESP32 will connect to an existing WiFi network
  WiFi.mode(WIFI_STA);
  
  // Disconnect from any previously connected networks
  WiFi.disconnect();
  delay(100);
  
  // Start connecting to WiFi
  Serial.println();
  Serial.print("Connecting to: ");
  Serial.println(ssid);
  
  // Begin WiFi connection
  WiFi.begin(ssid, password);
  
  // Wait for connection
  // The WiFi.status() returns WL_CONNECTED when successfully connected
  int attempts = 0;
  while (WiFi.status() != WL_CONNECTED && attempts < 30) {
    delay(500);
    Serial.print(".");
    attempts++;
  }
  
  // Check if connected successfully
  if (WiFi.status() == WL_CONNECTED) {
    Serial.println();
    Serial.println("==============================");
    Serial.println("WiFi Connected Successfully!");
    Serial.println("==============================");
    
    // Display connection details
    Serial.print("Network Name (SSID): ");
    Serial.println(WiFi.SSID());
    
    Serial.print("IP Address: ");
    Serial.println(WiFi.localIP());
    
    Serial.print("Signal Strength (RSSI): ");
    Serial.print(WiFi.RSSI());
    Serial.println(" dBm");
    
    Serial.print("MAC Address: ");
    Serial.println(WiFi.macAddress());
    
    Serial.println("==============================");
  } else {
    Serial.println();
    Serial.println("==============================");
    Serial.println("Failed to connect to WiFi");
    Serial.println("Please check your credentials");
    Serial.println("==============================");
  }
}

void loop() {
  // Check WiFi connection status every 10 seconds
  static unsigned long lastCheck = 0;
  unsigned long currentMillis = millis();
  
  if (currentMillis - lastCheck >= 10000) {
    lastCheck = currentMillis;
    
    if (WiFi.status() == WL_CONNECTED) {
      Serial.print("WiFi Status: Connected | IP: ");
      Serial.print(WiFi.localIP());
      Serial.print(" | Signal: ");
      Serial.print(WiFi.RSSI());
      Serial.println(" dBm");
    } else {
      Serial.println("WiFi Status: Disconnected - Attempting to reconnect...");
      WiFi.disconnect();
      WiFi.begin(ssid, password);
    }
  }
}`,
    githubLink: "https://github.com/cardanothings/examples/tree/main/blocks/esp32-wifi-connection",
    resources: [
      {
        title: "ESP32 WiFi Library Documentation",
        url: "https://docs.espressif.com/projects/arduino-esp32/en/latest/api/wifi.html",
        description: "Official documentation for the ESP32 WiFi library"
      },
      {
        title: "WiFi Basics Tutorial",
        url: "https://randomnerdtutorials.com/esp32-useful-wi-fi-functions-arduino/",
        description: "Comprehensive guide to ESP32 WiFi functions"
      }
    ],
    usage: `<ol>
          <li>Open Arduino IDE and create a new sketch</li>
          <li>Copy and paste the code into your sketch</li>
          <li><strong>Important:</strong> Replace <code>YOUR_WIFI_NAME</code> with your actual WiFi network name</li>
          <li><strong>Important:</strong> Replace <code>YOUR_WIFI_PASSWORD</code> with your actual WiFi password</li>
          <li>Select your board (<strong>Tools → Board → ESP32C3 Dev Module</strong> or <strong>ESP32 Dev Module</strong>)</li>
          <li>Select your COM port (<strong>Tools → Port</strong>)</li>
          <li>Click Upload to flash the code to your ESP32</li>
          <li>Open Serial Monitor (<strong>Tools → Serial Monitor</strong>)</li>
          <li>Set baud rate to 115200</li>
          <li>Press the reset button on your ESP32</li>
          <li>You should see the connection process and your IP address!</li>
        </ol>`,
    parameters: [
      {
        name: "#include <WiFi.h>",
        type: "library",
        description: "Includes the WiFi library for ESP32, providing all WiFi functionality"
      },
      {
        name: "WiFi.mode()",
        type: "function",
        description: "Sets the WiFi mode. WIFI_STA means Station mode (client), WIFI_AP means Access Point mode"
      },
      {
        name: "WiFi.begin()",
        type: "function",
        description: "Starts the WiFi connection with the provided SSID and password"
      },
      {
        name: "WiFi.status()",
        type: "function",
        description: "Returns the current WiFi connection status. WL_CONNECTED means successfully connected"
      },
      {
        name: "WiFi.localIP()",
        type: "function",
        description: "Returns the IP address assigned to your ESP32 by the router"
      },
      {
        name: "WiFi.SSID()",
        type: "function",
        description: "Returns the name of the WiFi network you're connected to"
      },
      {
        name: "WiFi.RSSI()",
        type: "function",
        description: "Returns signal strength in dBm. Higher values (closer to 0) mean stronger signal"
      },
      {
        name: "WiFi.macAddress()",
        type: "function",
        description: "Returns the MAC address of your ESP32's WiFi interface"
      }
    ],
    notes: `<p><strong>Understanding WiFi Basics:</strong></p>
        <ul>
          <li><strong>SSID:</strong> Your WiFi network name (the name you see when looking for WiFi on your phone)</li>
          <li><strong>Password:</strong> The key needed to connect to your WiFi network</li>
          <li><strong>IP Address:</strong> A unique number assigned to your ESP32 on the network (like 192.168.1.100)</li>
          <li><strong>RSSI:</strong> Signal strength in dBm - closer to 0 is better (-50 is excellent, -80 is poor)</li>
        </ul>
        
        <p><strong>WiFi Modes Explained:</strong></p>
        <ul>
          <li><strong>Station Mode (STA):</strong> ESP32 connects to your existing WiFi (like your phone does) - this is what we use in this example</li>
          <li><strong>Access Point Mode (AP):</strong> ESP32 creates its own WiFi network that others can connect to</li>
          <li><strong>Both modes:</strong> ESP32 can do both at the same time in advanced setups</li>
        </ul>
        
        <p><strong>Important Limitations:</strong></p>
        <ul>
          <li><strong>2.4GHz Only:</strong> ESP32 only works with 2.4GHz WiFi, NOT 5GHz networks</li>
          <li><strong>Most routers:</strong> Modern routers usually broadcast both 2.4GHz and 5GHz - make sure you're connecting to the 2.4GHz one</li>
          <li><strong>How to tell:</strong> Some routers name them differently (like "MyWiFi" for 2.4GHz and "MyWiFi-5G" for 5GHz)</li>
        </ul>
        
        <p><strong>Security Best Practices:</strong></p>
        <ul>
          <li>Never share your code with the WiFi password visible - remove it before sharing</li>
          <li>For GitHub or public projects, use environment variables or separate config files</li>
          <li>Both SSID and password are case-sensitive - "MyWiFi" is different from "mywifi"</li>
        </ul>`,
    troubleshooting: `<p><strong>Connection Problems:</strong></p>
        <ul>
          <li><strong>Stuck on connecting dots (...):</strong> Check that SSID and password are spelled exactly right (case-sensitive!)</li>
          <li><strong>"Failed to connect":</strong> Make sure you're using a 2.4GHz network, not 5GHz</li>
          <li><strong>Connection drops frequently:</strong> ESP32 might be too far from router - try moving it closer or use a WiFi extender</li>
          <li><strong>Connects then immediately disconnects:</strong> Router might have MAC address filtering or too many devices connected</li>
        </ul>
        
        <p><strong>Password Issues:</strong></p>
        <ul>
          <li><strong>Special characters:</strong> If your password has quotes (") or backslashes (\\), you need to "escape" them: use \\" for " and \\\\ for \\</li>
          <li><strong>Spaces in password:</strong> These work fine, but make sure you include them exactly</li>
          <li><strong>Hidden networks:</strong> If your WiFi network is hidden, you may need to add extra configuration</li>
        </ul>
        
        <p><strong>ESP32-Specific Issues:</strong></p>
        <ul>
          <li><strong>No IP address shown:</strong> Connection failed - check Serial Monitor for error messages</li>
          <li><strong>Can't see Serial output:</strong> Make sure Serial Monitor baud rate is set to 115200</li>
          <li><strong>Brownout detector triggered:</strong> Power issue - use a better USB cable or power supply</li>
        </ul>`,
    nextSteps: `<ul>
          <li>Make HTTP requests to fetch data from the internet (see the HTTP Request block)</li>
          <li>Create a web server on your ESP32 to control it from your web browser</li>
          <li>Display the IP address on an OLED screen so you don't need Serial Monitor</li>
          <li>Use mDNS to access your ESP32 with a friendly name like "http://esp32.local" instead of an IP address</li>
          <li>Implement OTA (Over-The-Air) updates to upload new code via WiFi without USB cable</li>
          <li>Add WiFiManager library for easy WiFi setup without hardcoding credentials</li>
          <li>Connect to MQTT broker for real-time IoT messaging</li>
          <li>Build a web dashboard to monitor sensor data</li>
        </ul>`
  },
  {
    slug: "arduino-json-basics",
    title: "Working with JSON in Arduino",
    tags: ["Arduino-IDE", "ESP32-C3", "ESP32-CYD"],
    description: "Learn how to parse and create JSON data in Arduino using the ArduinoJson library",
    link: "/blocks/arduino-json-basics",
    overview: "JSON (JavaScript Object Notation) is the most common data format for APIs and web services. This block teaches you how to use the ArduinoJson library to parse JSON responses from APIs and create JSON data to send. Perfect for projects that need to work with web APIs, IoT platforms, or any service that uses JSON.",
    features: [
      "Parse JSON API responses",
      "Extract values from nested JSON",
      "Handle objects and arrays",
      "Error checking for safe parsing",
      "Real-world weather API example"
    ],
    prerequisites: `<h3>Before You Begin</h3>
        
        <h4>1. Install ArduinoJson Library</h4>
        <ul>
          <li>Open Arduino IDE</li>
          <li>Go to <strong>Sketch → Include Library → Manage Libraries</strong></li>
          <li>Search for "ArduinoJson" by Benoit Blanchon</li>
          <li>Click Install (version 6.x or later recommended)</li>
        </ul>
        
        <h4>2. Hardware</h4>
        <ul>
          <li>ESP32-C3, ESP32 CYD, or any Arduino-compatible board</li>
          <li>USB cable for serial communication</li>
        </ul>
        
        <h4>3. Basic Knowledge</h4>
        <ul>
          <li>Understanding of variables and data types</li>
          <li>Familiarity with Serial Monitor for viewing output</li>
        </ul>`,
    code: `
/*
 * Arduino JSON - Parsing API Response
 * 
 * This example shows how to parse a JSON response from an API.
 * We'll use a simulated weather API response to demonstrate
 * extracting values from nested JSON structures.
 * 
 * Perfect for: Weather APIs, Blockchain APIs, IoT platforms
 */

#include <ArduinoJson.h>

void setup() {
  Serial.begin(115200);
  delay(1000);
  
  Serial.println("========================================");
  Serial.println("Parsing API Response Example");
  Serial.println("========================================\\n");
  
  // This simulates a response from a weather API
  // In a real project, you'd get this from an HTTP request
  const char* apiResponse = R"({
    "location": {
      "city": "Amsterdam",
      "country": "Netherlands"
    },
    "current": {
      "temperature": 18.5,
      "condition": "Partly Cloudy",
      "wind_speed": 12
    },
    "forecast": [15, 17, 19, 20, 22]
  })";
  
  Serial.println("Received API Response:");
  Serial.println(apiResponse);
  Serial.println();
  
  // Create a JSON document to hold the parsed data
  JsonDocument doc;
  
  // Parse the JSON string
  DeserializationError error = deserializeJson(doc, apiResponse);
  
  // Always check if parsing was successful!
  if (error) {
    Serial.print("JSON parsing failed: ");
    Serial.println(error.c_str());
    return;
  }
  
  // Extract values from nested objects
  // Use ["key"]["nested_key"] to access nested values
  const char* city = doc["location"]["city"];
  const char* country = doc["location"]["country"];
  float temperature = doc["current"]["temperature"];
  const char* condition = doc["current"]["condition"];
  int windSpeed = doc["current"]["wind_speed"];
  
  // Display the extracted weather information
  Serial.println("========================================");
  Serial.println("Extracted Weather Data:");
  Serial.println("========================================");
  
  Serial.print("Location: ");
  Serial.print(city);
  Serial.print(", ");
  Serial.println(country);
  
  Serial.print("Temperature: ");
  Serial.print(temperature);
  Serial.println(" °C");
  
  Serial.print("Condition: ");
  Serial.println(condition);
  
  Serial.print("Wind Speed: ");
  Serial.print(windSpeed);
  Serial.println(" km/h");
  
  // Extract and display array values
  JsonArray forecast = doc["forecast"];
  Serial.print("5-Day Forecast: ");
  for (int temp : forecast) {
    Serial.print(temp);
    Serial.print("°C ");
  }
  Serial.println("\\n========================================");
}

void loop() {
  // Nothing to do here
  // In a real project, you might fetch new data periodically
}`,
    githubLink: "https://github.com/cardanothings/examples/tree/main/blocks/arduino-json-basics",
    resources: [
      {
        title: "ArduinoJson Documentation",
        url: "https://arduinojson.org/",
        description: "Official documentation with examples and API reference"
      },
      {
        title: "ArduinoJson Assistant",
        url: "https://arduinojson.org/v6/assistant/",
        description: "Tool to calculate the right memory size for your JSON"
      },
      {
        title: "JSON Formatter & Validator",
        url: "https://jsonformatter.org/",
        description: "Online tool to validate and format JSON data"
      }
    ],
    usage: `<ol>
          <li>Install the ArduinoJson library (see Prerequisites above)</li>
          <li>Create a new sketch in Arduino IDE</li>
          <li>Copy and paste the code</li>
          <li>Upload to your board</li>
          <li>Open Serial Monitor (115200 baud)</li>
          <li>You'll see the API response parsed and displayed!</li>
        </ol>
        
        <h4>Quick Reference:</h4>
        <pre><code>// Parse JSON from API
JsonDocument doc;
deserializeJson(doc, jsonString);

// Get simple values
float temp = doc["temperature"];

// Get nested values
const char* city = doc["location"]["city"];

// Get array values
JsonArray forecast = doc["forecast"];</code></pre>`,
    parameters: [
      {
        name: "#include <ArduinoJson.h>",
        type: "library",
        description: "Includes the ArduinoJson library for JSON parsing"
      },
      {
        name: "JsonDocument",
        type: "class",
        description: "Container that holds your parsed JSON data"
      },
      {
        name: "deserializeJson()",
        type: "function",
        description: "Parses a JSON string. Returns an error if parsing fails"
      },
      {
        name: "DeserializationError",
        type: "class",
        description: "Error object returned by deserializeJson(). Check this to ensure parsing succeeded"
      },
      {
        name: "doc[\"key\"]",
        type: "operator",
        description: "Gets a value from JSON using its key. Use doc[\"key1\"][\"key2\"] for nested values"
      },
      {
        name: "JsonArray",
        type: "class",
        description: "Represents a JSON array. Loop through it to get each value"
      }
    ],
    notes: `<p><strong>What is JSON?</strong></p>
        <ul>
          <li><strong>JSON:</strong> JavaScript Object Notation - a way to structure data that both humans and computers can read</li>
          <li><strong>Used everywhere:</strong> Almost all web APIs send data as JSON</li>
          <li><strong>Format:</strong> Data is organized in key-value pairs like <code>{"temperature": 23.5}</code></li>
          <li><strong>Why parse it:</strong> We need to extract specific values (like the temperature) from the JSON text</li>
        </ul>
        
        <p><strong>Understanding JSON Structure:</strong></p>
        <ul>
          <li><strong>Objects:</strong> Data wrapped in <code>{}</code> with key-value pairs: <code>{"city": "Amsterdam"}</code></li>
          <li><strong>Arrays:</strong> Lists wrapped in <code>[]</code>: <code>[1, 2, 3, 4, 5]</code></li>
          <li><strong>Nested objects:</strong> Objects inside objects: <code>{"location": {"city": "Amsterdam"}}</code></li>
          <li><strong>Accessing nested data:</strong> Use <code>doc["location"]["city"]</code> to get "Amsterdam"</li>
        </ul>
        
        <p><strong>How the Code Works:</strong></p>
        <ul>
          <li><strong>JsonDocument:</strong> Creates a container to hold the parsed JSON data in memory</li>
          <li><strong>deserializeJson():</strong> Converts JSON text into data you can use</li>
          <li><strong>Error checking:</strong> Always check if parsing worked before using the data (prevents crashes)</li>
          <li><strong>Extracting values:</strong> Use the key names to get specific pieces of data</li>
          <li><strong>Data types:</strong> Can extract text (strings), numbers (int/float), true/false (booleans), and arrays</li>
        </ul>
        
        <p><strong>Real-World Usage:</strong></p>
        <ul>
          <li>This example uses simulated JSON stored in the code for learning</li>
          <li>In real projects, you'll get JSON from HTTP API requests</li>
          <li>Weather APIs, cryptocurrency prices, blockchain data - they all use JSON</li>
          <li>Combine this with the WiFi and HTTP Request blocks to fetch live data</li>
        </ul>`,
    troubleshooting: `<p><strong>Parsing Errors:</strong></p>
        <ul>
          <li><strong>"Parsing failed":</strong> The JSON syntax is wrong - use an online JSON validator to check it</li>
          <li><strong>Missing data:</strong> Check that all quotes, brackets, and braces match up correctly</li>
          <li><strong>Memory errors:</strong> JSON response might be too large - you may need a bigger JsonDocument</li>
        </ul>
        
        <p><strong>Wrong Values or Crashes:</strong></p>
        <ul>
          <li><strong>Wrong values extracted:</strong> Key names are case-sensitive - "Temperature" is NOT the same as "temperature"</li>
          <li><strong>Crash when accessing data:</strong> The key doesn't exist in the JSON - always check error first</li>
          <li><strong>Getting zeros or blanks:</strong> Data type mismatch - can't extract a number as a string or vice versa</li>
        </ul>
        
        <p><strong>Library Issues:</strong></p>
        <ul>
          <li><strong>"Library not found":</strong> Install ArduinoJson from <strong>Sketch → Include Library → Manage Libraries</strong></li>
          <li><strong>Compilation errors:</strong> Make sure you installed ArduinoJson version 6 or later</li>
          <li><strong>Garbled Serial output:</strong> Set Serial Monitor baud rate to 115200</li>
        </ul>`,
    nextSteps: `<ul>
          <li>Combine with WiFi and HTTP blocks to fetch real JSON data from APIs</li>
          <li>Parse weather API data and display temperature/conditions</li>
          <li>Fetch Cardano blockchain data (epoch info, ada prices, pool data)</li>
          <li>Get cryptocurrency prices from CoinGecko API</li>
          <li>Display parsed data on an OLED or TFT screen</li>
          <li>Learn to create JSON for sending data to APIs (use serializeJson)</li>
          <li>Build a complete weather station or crypto price ticker</li>
        </ul>`
  },
  {
    slug: "esp32-oled-i2c-display",
    title: "I2C OLED Display (SSD1306)",
    tags: ["Arduino-IDE", "ESP32-C3", "Display"],
    description: "Display text and graphics on a 0.96\" I2C OLED screen using the ESP32-C3",
    link: "/blocks/esp32-oled-i2c-display",
    overview: "Learn how to use a small OLED display with your ESP32-C3 via I2C communication. These tiny displays are perfect for showing sensor readings, status information, or simple graphics. This example uses the popular SSD1306 OLED display (128x64 pixels) which is widely available and easy to connect with just 4 wires.",
    features: [
      "I2C communication setup",
      "Display text in different sizes",
      "Draw rectangles",
      "Simple and easy to understand"
    ],
    prerequisites: `<h3>Before You Begin</h3>
        
        <h4>1. Install Required Libraries</h4>
        <ul>
          <li>Open Arduino IDE</li>
          <li>Go to <strong>Sketch → Include Library → Manage Libraries</strong></li>
          <li>Search for and install:
            <ul>
              <li><strong>Adafruit SSD1306</strong> by Adafruit</li>
              <li><strong>Adafruit GFX Library</strong> by Adafruit (dependency)</li>
            </ul>
          </li>
        </ul>
        
        <h4>2. Hardware Setup</h4>
        <ul>
          <li>ESP32-C3 development board</li>
          <li>0.96" I2C OLED display (SSD1306, 128x64 pixels)</li>
          <li>4 jumper wires</li>
        </ul>
        
        <h4>3. Wiring Connections</h4>
        <ul>
          <li><strong>VCC</strong> (OLED) → <strong>3.3V</strong> (ESP32-C3)</li>
          <li><strong>GND</strong> (OLED) → <strong>GND</strong> (ESP32-C3)</li>
          <li><strong>SDA</strong> (OLED) → <strong>GPIO 8</strong> (ESP32-C3)</li>
          <li><strong>SCL</strong> (OLED) → <strong>GPIO 9</strong> (ESP32-C3)</li>
        </ul>
        
        <p><strong>Note:</strong> GPIO 8 and 9 are the default I2C pins on ESP32-C3. If your board uses different pins, adjust the code accordingly.</p>`,
    code: `
/*
 * ESP32-C3 I2C OLED Display Example (SSD1306)
 * 
 * A simple example showing how to display text and shapes on an OLED screen.
 * This demonstrates the basics of OLED display control with I2C.
 * 
 * Hardware:
 * - ESP32-C3 board
 * - 0.96" I2C OLED Display (SSD1306, 128x64)
 * 
 * Connections:
 * OLED VCC → ESP32 3.3V
 * OLED GND → ESP32 GND
 * OLED SDA → ESP32 GPIO 8
 * OLED SCL → ESP32 GPIO 9
 */

#include <Wire.h>
#include <Adafruit_GFX.h>
#include <Adafruit_SSD1306.h>

// OLED display settings
#define SCREEN_WIDTH 128    // OLED display width in pixels
#define SCREEN_HEIGHT 64    // OLED display height in pixels
#define OLED_RESET -1       // Reset pin (or -1 if sharing ESP32 reset pin)
#define SCREEN_ADDRESS 0x3C // I2C address (usually 0x3C or 0x3D)

// I2C pins for ESP32-C3
#define I2C_SDA 8
#define I2C_SCL 9

// Create display object
Adafruit_SSD1306 display(SCREEN_WIDTH, SCREEN_HEIGHT, &Wire, OLED_RESET);

void setup() {
  Serial.begin(115200);
  delay(1000);
  
  // Initialize I2C with custom pins
  Wire.begin(I2C_SDA, I2C_SCL);
  
  // Initialize the OLED display
  if(!display.begin(SSD1306_SWITCHCAPVCC, SCREEN_ADDRESS)) {
    Serial.println("SSD1306 allocation failed");
    for(;;); // Don't proceed, loop forever
  }
  
  Serial.println("OLED Display initialized!");
}

void loop() {
  // Clear the display buffer
  display.clearDisplay();
  
  // Set text color to white
  display.setTextColor(SSD1306_WHITE);
  
  // Display small text (size 1)
  display.setTextSize(1);
  display.setCursor(0, 0);
  display.println("Small Text");
  
  // Display medium text (size 2)
  display.setTextSize(2);
  display.setCursor(0, 15);
  display.println("Medium");
  
  // Display large text (size 3)
  display.setTextSize(3);
  display.setCursor(0, 40);
  display.println("Big!");
  
  // Draw a rectangle in the top right
  display.drawRect(95, 5, 30, 25, SSD1306_WHITE);
  
  // Send everything to the display
  display.display();
  
  // Wait 2 seconds before refreshing
  delay(2000);
}`,
    githubLink: "https://github.com/cardanothings/examples/tree/main/blocks/esp32-oled-i2c-display",
    resources: [
      {
        title: "Adafruit SSD1306 Library Guide",
        url: "https://learn.adafruit.com/monochrome-oled-breakouts/arduino-library-and-examples",
        description: "Official guide for using the SSD1306 OLED library"
      },
      {
        title: "Adafruit GFX Graphics Library",
        url: "https://learn.adafruit.com/adafruit-gfx-graphics-library",
        description: "Learn about drawing functions and graphics"
      }
    ],
    usage: `<ol>
          <li>Install the required libraries (see Prerequisites)</li>
          <li>Wire up your OLED display to the ESP32-C3:
            <ul>
              <li>VCC → 3.3V</li>
              <li>GND → GND</li>
              <li>SDA → GPIO 8</li>
              <li>SCL → GPIO 9</li>
            </ul>
          </li>
          <li>Create a new sketch and paste the code</li>
          <li>Upload to your ESP32-C3</li>
          <li>The display will show text in different sizes and a rectangle!</li>
        </ol>`,
    parameters: [
      {
        name: "#include <Wire.h>",
        type: "library",
        description: "I2C communication library for ESP32"
      },
      {
        name: "#include <Adafruit_SSD1306.h>",
        type: "library",
        description: "Library for controlling SSD1306 OLED displays"
      },
      {
        name: "Wire.begin()",
        type: "function",
        description: "Initializes I2C communication with specified SDA and SCL pins"
      },
      {
        name: "display.begin()",
        type: "function",
        description: "Initializes the OLED display with I2C address"
      },
      {
        name: "display.clearDisplay()",
        type: "function",
        description: "Clears the display buffer (doesn't update screen yet)"
      },
      {
        name: "display.setCursor(x, y)",
        type: "function",
        description: "Sets the position where next text will be drawn"
      },
      {
        name: "display.setTextSize()",
        type: "function",
        description: "Sets text size (1=small, 2=medium, 3=large, etc.)"
      },
      {
        name: "display.print()",
        type: "function",
        description: "Writes text to the display buffer"
      },
      {
        name: "display.display()",
        type: "function",
        description: "Updates the actual screen with the buffer contents - always call this to see changes!"
      },
      {
        name: "display.drawRect()",
        type: "function",
        description: "Draws a rectangle outline at (x, y) with width and height"
      }
    ],
    notes: `<p><strong>Understanding OLED Displays:</strong></p>
        <ul>
          <li><strong>OLED:</strong> Organic Light-Emitting Diode - each pixel lights up on its own (no backlight needed)</li>
          <li><strong>Monochrome:</strong> These displays only show one color (white, blue, or yellow depending on model)</li>
          <li><strong>Small but useful:</strong> Perfect for showing sensor readings, status messages, or simple menus</li>
          <li><strong>Low power:</strong> Uses very little electricity compared to TFT LCD screens</li>
        </ul>
        
        <p><strong>How the Buffer System Works:</strong></p>
        <ul>
          <li><strong>Buffer:</strong> A temporary storage area in ESP32's memory that holds what you want to show</li>
          <li><strong>Why use a buffer:</strong> You can prepare the entire screen in memory first, then display it all at once (prevents flicker)</li>
          <li><strong>clearDisplay():</strong> Clears the buffer in memory (doesn't touch the screen yet)</li>
          <li><strong>print(), drawRect():</strong> These add things to the buffer</li>
          <li><strong>display():</strong> Sends the buffer to the actual screen - this is when you see the changes!</li>
        </ul>
        
        <p><strong>Understanding Coordinates:</strong></p>
        <ul>
          <li><strong>(0, 0):</strong> Top-left corner of the screen</li>
          <li><strong>(127, 63):</strong> Bottom-right corner on a 128x64 display</li>
          <li><strong>X-axis:</strong> Horizontal position (0 to 127)</li>
          <li><strong>Y-axis:</strong> Vertical position (0 to 63)</li>
          <li><strong>Example:</strong> <code>setCursor(10, 20)</code> puts text 10 pixels from the left, 20 pixels from the top</li>
        </ul>
        
        <p><strong>I2C Communication:</strong></p>
        <ul>
          <li><strong>I2C:</strong> A way for devices to talk to each other using just 2 wires (SDA and SCL)</li>
          <li><strong>I2C address:</strong> Like a phone number for the display (usually 0x3C or 0x3D)</li>
          <li><strong>Multiple devices:</strong> You can connect several I2C devices to the same pins if they have different addresses</li>
        </ul>`,
    troubleshooting: `<p><strong>Display Not Working:</strong></p>
        <ul>
          <li><strong>"SSD1306 allocation failed":</strong> Check all 4 wire connections - especially VCC (power) and GND (ground)</li>
          <li><strong>Nothing shows on display:</strong> Make sure you call <code>display.display()</code> after all your drawing commands</li>
          <li><strong>Display shows old content:</strong> Call <code>display.clearDisplay()</code> before drawing new content</li>
        </ul>
        
        <p><strong>Wrong I2C Address:</strong></p>
        <ul>
          <li><strong>Still "allocation failed":</strong> Your display might use address 0x3D instead of 0x3C</li>
          <li><strong>How to fix:</strong> Change <code>SCREEN_ADDRESS 0x3C</code> to <code>SCREEN_ADDRESS 0x3D</code> in the code</li>
          <li><strong>Find your address:</strong> Check the back of your display module - it might have the address printed on it</li>
        </ul>
        
        <p><strong>Display Quality Issues:</strong></p>
        <ul>
          <li><strong>Display very dim:</strong> Power issue - try a different USB cable or USB port with more power</li>
          <li><strong>Flickering:</strong> You're updating too fast - add longer delays between updates</li>
          <li><strong>Text cut off:</strong> Check that your cursor position + text size fits within screen bounds</li>
        </ul>
        
        <p><strong>Wiring Problems:</strong></p>
        <ul>
          <li><strong>Wrong pins:</strong> ESP32-C3 uses GPIO 8 (SDA) and GPIO 9 (SCL) - other ESP32 boards might use different pins</li>
          <li><strong>Loose wires:</strong> Make sure jumper wires are firmly connected</li>
          <li><strong>3.3V not 5V:</strong> OLED needs 3.3V - don't connect VCC to 5V pin!</li>
        </ul>`,
    nextSteps: `<ul>
          <li>Display real sensor data like temperature and humidity</li>
          <li>Show your ESP32's WiFi connection status and IP address</li>
          <li>Display live data from internet APIs (weather, crypto prices)</li>
          <li>Add circles, lines, and filled shapes to make fancy graphics</li>
          <li>Create a simple menu system that you can navigate with buttons</li>
          <li>Show progress bars or animated indicators</li>
          <li>Build a clock that displays time (use NTP time server)</li>
          <li>Make a tiny game with simple graphics</li>
        </ul>`
  },
  {
    slug: "esp32-http-request",
    title: "Making HTTP GET Requests",
    tags: ["Arduino-IDE", "ESP32-C3", "ESP32-CYD"],
    description: "Learn how to make HTTP GET requests to APIs and process the responses with your ESP32",
    link: "/blocks/esp32-http-request",
    overview: "This block teaches you how to connect to web APIs using HTTP GET requests. You'll learn how to fetch data from the internet, which is essential for building IoT projects that display live information like weather data, cryptocurrency prices, or blockchain information. The example uses a free test API to demonstrate the complete flow from making a request to parsing the response.",
    features: [
      "WiFi connection setup",
      "HTTP GET requests to APIs",
      "Response status code handling",
      "Parse and display JSON responses",
      "Error handling and retry logic",
      "Works with any REST API"
    ],
    prerequisites: `<h3>Before You Begin</h3>
        
        <h4>1. Hardware Setup</h4>
        <ul>
          <li>ESP32-C3 or ESP32 CYD development board</li>
          <li>USB cable to connect to your computer</li>
          <li>Arduino IDE installed with ESP32 board support</li>
        </ul>
        
        <h4>2. WiFi Connection</h4>
        <ul>
          <li>Make sure you have completed the <strong>ESP32 WiFi Connection</strong> block first</li>
          <li>Know your WiFi network name (SSID) and password</li>
          <li>Ensure you're using a 2.4GHz network (ESP32 doesn't support 5GHz)</li>
        </ul>
        
        <h4>3. Libraries</h4>
        <ul>
          <li>HTTPClient library (included with ESP32 board support)</li>
          <li>WiFi library (included with ESP32 board support)</li>
          <li>ArduinoJson library (optional, for parsing responses)</li>
        </ul>
        
        <h4>4. Internet Connection</h4>
        <ul>
          <li>Your WiFi network must have internet access</li>
          <li>The ESP32 will need to reach external APIs</li>
          <li>Some networks block outbound requests - test with your network</li>
        </ul>`,
    code: `
/*
 * ESP32 HTTP GET Request Example
 * 
 * This example demonstrates how to make HTTP GET requests to web APIs.
 * We'll fetch data from a free test API (JSONPlaceholder) and display
 * the response in the Serial Monitor.
 * 
 * Compatible with: ESP32-C3, ESP32 CYD, and all ESP32 boards
 * 
 * What you'll learn:
 * - How to include HTTP and WiFi libraries
 * - How to make HTTP GET requests
 * - How to handle HTTP response codes
 * - How to read and parse API responses
 * - How to handle connection errors
 */

#include <WiFi.h>
#include <HTTPClient.h>

// Replace with your network credentials
const char* ssid = "YOUR_WIFI_NAME";
const char* password = "YOUR_WIFI_PASSWORD";

// API endpoint - using JSONPlaceholder as a free test API
// This API provides fake data for testing and prototyping
const char* apiEndpoint = "https://jsonplaceholder.typicode.com/posts/1";

void setup() {
  // Initialize serial communication
  Serial.begin(115200);
  delay(1000);
  
  Serial.println();
  Serial.println("========================================");
  Serial.println("ESP32 HTTP Request Example");
  Serial.println("========================================");
  
  // Connect to WiFi
  connectToWiFi();
  
  // Make HTTP request
  if (WiFi.status() == WL_CONNECTED) {
    makeHTTPRequest();
  } else {
    Serial.println("ERROR: Not connected to WiFi");
  }
}

void loop() {
  // Make a new request every 30 seconds
  static unsigned long lastRequest = 0;
  unsigned long currentMillis = millis();
  
  if (currentMillis - lastRequest >= 30000) {
    lastRequest = currentMillis;
    
    // Check WiFi connection
    if (WiFi.status() == WL_CONNECTED) {
      Serial.println("\\n--- Making periodic request ---");
      makeHTTPRequest();
    } else {
      Serial.println("\\n--- WiFi disconnected, reconnecting... ---");
      connectToWiFi();
    }
  }
}

/**
 * Connect to WiFi network
 */
void connectToWiFi() {
  Serial.println();
  Serial.print("Connecting to WiFi: ");
  Serial.println(ssid);
  
  // Set WiFi mode to Station (client)
  WiFi.mode(WIFI_STA);
  WiFi.disconnect();
  delay(100);
  
  // Begin WiFi connection
  WiFi.begin(ssid, password);
  
  // Wait for connection (max 30 seconds)
  int attempts = 0;
  while (WiFi.status() != WL_CONNECTED && attempts < 60) {
    delay(500);
    Serial.print(".");
    attempts++;
  }
  
  if (WiFi.status() == WL_CONNECTED) {
    Serial.println();
    Serial.println("========================================");
    Serial.println("WiFi Connected!");
    Serial.print("IP Address: ");
    Serial.println(WiFi.localIP());
    Serial.println("========================================");
  } else {
    Serial.println();
    Serial.println("Failed to connect to WiFi");
  }
}

/**
 * Make HTTP GET request to API
 */
void makeHTTPRequest() {
  // Create HTTPClient object
  HTTPClient http;
  
  Serial.println();
  Serial.println("--- Making HTTP GET Request ---");
  Serial.print("Endpoint: ");
  Serial.println(apiEndpoint);
  
  // Initialize HTTP connection
  // For HTTPS, you may need to add SSL certificate (for testing, we use HTTP)
  http.begin(apiEndpoint);
  
  // Set timeout (optional)
  http.setTimeout(10000); // 10 seconds
  
  // Add custom headers if needed (optional)
  // http.addHeader("Content-Type", "application/json");
  // http.addHeader("Authorization", "Bearer YOUR_TOKEN");
  
  // Make GET request
  int httpResponseCode = http.GET();
  
  Serial.print("Response Code: ");
  Serial.println(httpResponseCode);
  
  // Check response code
  if (httpResponseCode > 0) {
    // Success - we got a response
    Serial.println("--- Response received ---");
    
    // Get the response payload (body)
    String payload = http.getString();
    
    Serial.println("Response Body:");
    Serial.println("----------------------------------------");
    Serial.println(payload);
    Serial.println("----------------------------------------");
    
    // You can now parse the JSON response
    // See the "Arduino JSON Basics" block for parsing examples
    
    // Common HTTP response codes:
    // 200: OK - Request successful
    // 201: Created - Resource created successfully
    // 400: Bad Request - Invalid request
    // 401: Unauthorized - Authentication required
    // 404: Not Found - Resource doesn't exist
    // 500: Internal Server Error - Server error
    
    if (httpResponseCode == 200) {
      Serial.println("✓ Request successful!");
    }
    
  } else {
    // Error making request
    Serial.print("✗ Error making request: ");
    Serial.println(http.errorToString(httpResponseCode));
    
    // Common error codes:
    // -1: Connection refused
    // -2: Send header failed
    // -3: Send payload failed
    // -11: Timeout
  }
  
  // Free resources
  http.end();
}`,
    githubLink: "https://github.com/cardanothings/examples/tree/main/blocks/esp32-http-request",
    resources: [
      {
        title: "ESP32 HTTPClient Documentation",
        url: "https://github.com/espressif/arduino-esp32/tree/master/libraries/HTTPClient",
        description: "Official HTTPClient library documentation for ESP32"
      },
      {
        title: "HTTP Status Codes",
        url: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status",
        description: "Complete reference for HTTP status codes"
      },
      {
        title: "JSONPlaceholder API",
        url: "https://jsonplaceholder.typicode.com/",
        description: "Free fake API for testing and prototyping"
      }
    ],
    usage: `<ol>
          <li>Open Arduino IDE and create a new sketch</li>
          <li>Copy and paste the code into your sketch</li>
          <li><strong>Important:</strong> Replace <code>YOUR_WIFI_NAME</code> with your WiFi network name</li>
          <li><strong>Important:</strong> Replace <code>YOUR_WIFI_PASSWORD</code> with your WiFi password</li>
          <li>Select your board (<strong>Tools → Board → ESP32C3 Dev Module</strong> or <strong>ESP32 Dev Module</strong>)</li>
          <li>Select your COM port (<strong>Tools → Port</strong>)</li>
          <li>Click Upload to flash the code to your ESP32</li>
          <li>Open Serial Monitor (<strong>Tools → Serial Monitor</strong>)</li>
          <li>Set baud rate to 115200</li>
          <li>Press the reset button on your ESP32</li>
          <li>You should see the WiFi connection process and then the API response!</li>
          <li>The ESP32 will automatically make a new request every 30 seconds</li>
        </ol>
        
        <h4>Testing with Different APIs:</h4>
        <p>You can easily change the <code>apiEndpoint</code> to test other APIs:</p>
        <pre><code>// Weather example (requires API key from openweathermap.org)
const char* apiEndpoint = "http://api.openweathermap.org/data/2.5/weather?q=London&appid=YOUR_API_KEY";

// Cryptocurrency price (CoinGecko - no API key needed)
const char* apiEndpoint = "https://api.coingecko.com/api/v3/simple/price?ids=cardano&vs_currencies=usd";

// Random user data
const char* apiEndpoint = "https://randomuser.me/api/";</code></pre>`,
    parameters: [
      {
        name: "#include <HTTPClient.h>",
        type: "library",
        description: "HTTP client library for making web requests"
      },
      {
        name: "HTTPClient",
        type: "class",
        description: "Object that handles HTTP requests and responses"
      },
      {
        name: "http.begin()",
        type: "function",
        description: "Initialize HTTP connection with the specified URL"
      },
      {
        name: "http.GET()",
        type: "function",
        description: "Make an HTTP GET request. Returns the HTTP response code (200 = success)"
      },
      {
        name: "http.getString()",
        type: "function",
        description: "Get the response body as a String"
      },
      {
        name: "http.setTimeout()",
        type: "function",
        description: "Set the timeout for the HTTP request in milliseconds"
      },
      {
        name: "http.addHeader()",
        type: "function",
        description: "Add custom HTTP headers to the request (e.g., API keys, content type)"
      },
      {
        name: "http.end()",
        type: "function",
        description: "Close the HTTP connection and free resources - always call this when done"
      }
    ],
    notes: `<p><strong>Understanding HTTP Methods:</strong></p>
        <ul>
          <li><strong>GET:</strong> Retrieve/read data from a server (like viewing a webpage or fetching API data)</li>
          <li><strong>POST:</strong> Send data to create new resources (like submitting a form)</li>
          <li><strong>PUT:</strong> Update existing resources</li>
          <li><strong>DELETE:</strong> Remove resources</li>
          <li><strong>This example uses GET:</strong> The most common method for fetching data from APIs</li>
        </ul>
        
        <p><strong>HTTP vs HTTPS - What's the Difference?</strong></p>
        <ul>
          <li><strong>HTTP:</strong> Regular unencrypted connection (port 80) - anyone can see the data</li>
          <li><strong>HTTPS:</strong> Encrypted connection with SSL/TLS (port 443) - data is scrambled for security</li>
          <li><strong>When to use:</strong> Always use HTTPS for passwords or sensitive data. HTTP is OK for public data like weather or crypto prices</li>
          <li><strong>Certificates:</strong> HTTPS needs SSL certificates - the example uses HTTP for simplicity</li>
        </ul>
        
        <p><strong>Understanding Response Codes:</strong></p>
        <ul>
          <li><strong>200:</strong> Success! Everything worked</li>
          <li><strong>404:</strong> Not Found - the URL/endpoint doesn't exist</li>
          <li><strong>401:</strong> Unauthorized - you need an API key or password</li>
          <li><strong>500:</strong> Server Error - something broke on the API's side</li>
          <li><strong>Negative numbers:</strong> Connection errors (WiFi problem, timeout, etc.)</li>
        </ul>
        
        <p><strong>API Authentication - Getting Access:</strong></p>
        <ul>
          <li><strong>API Keys:</strong> Like passwords that let you use an API (usually free to get)</li>
          <li><strong>In headers:</strong> Add using <code>http.addHeader("Authorization", "Bearer YOUR_KEY")</code></li>
          <li><strong>In URL:</strong> Add using <code>?apikey=YOUR_KEY</code> at the end of the URL</li>
          <li><strong>Security:</strong> Never share your API keys publicly or commit them to GitHub</li>
          <li><strong>Free APIs:</strong> Many APIs offer free tiers (like OpenWeather, CoinGecko, Koios for Cardano)</li>
        </ul>
        
        <p><strong>Memory and Performance:</strong></p>
        <ul>
          <li><strong>ESP32 has limited RAM:</strong> Large responses (like 50KB+) can cause crashes</li>
          <li><strong>Always free memory:</strong> Call <code>http.end()</code> when done</li>
          <li><strong>For large data:</strong> Use <code>http.getStream()</code> to process data in chunks</li>
          <li><strong>Keep responses small:</strong> Many APIs let you filter what data you receive</li>
        </ul>`,
    troubleshooting: `<p><strong>Connection Errors:</strong></p>
        <ul>
          <li><strong>Response code -1 (Connection refused):</strong> Check WiFi is connected and has internet access. Try opening a website on your phone using the same WiFi</li>
          <li><strong>Response code -11 (Timeout):</strong> API is too slow or unreachable. Try increasing timeout with <code>http.setTimeout(15000)</code></li>
          <li><strong>Response code -2 or -3:</strong> Network problem. Try resetting your ESP32 and router</li>
        </ul>
        
        <p><strong>HTTP Status Errors:</strong></p>
        <ul>
          <li><strong>Response code 404:</strong> URL is wrong. Double-check the <code>apiEndpoint</code> spelling and path</li>
          <li><strong>Response code 401 or 403:</strong> API needs authentication. Add your API key in headers or URL</li>
          <li><strong>Response code 429:</strong> Too many requests. Wait a bit - you're being rate-limited</li>
          <li><strong>Response code 500 or 502:</strong> API server has problems. Not your fault - try again later</li>
        </ul>
        
        <p><strong>Data Problems:</strong></p>
        <ul>
          <li><strong>Empty response:</strong> Make sure you call <code>http.getString()</code> BEFORE <code>http.end()</code></li>
          <li><strong>Garbled data:</strong> Set Serial Monitor to 115200 baud. Some APIs send compressed data - check API documentation</li>
          <li><strong>ESP32 crashes/restarts:</strong> Response too large for memory. Reduce data requested or use streaming</li>
        </ul>
        
        <p><strong>API-Specific Issues:</strong></p>
        <ul>
          <li><strong>HTTPS not working:</strong> Some HTTPS APIs need certificates. Try finding an HTTP alternative for testing</li>
          <li><strong>CORS errors:</strong> Don't apply to ESP32 - this is only a browser security feature</li>
          <li><strong>Rate limiting:</strong> Many free APIs limit requests (like 60 per hour). Add longer delays between requests</li>
        </ul>`,
    nextSteps: `<ul>
          <li>Combine with the Arduino JSON block to parse API responses and extract specific data</li>
          <li>Display API data on an OLED display or TFT screen</li>
          <li>Fetch Cardano blockchain data from Koios or Blockfrost (epoch info, wallet balances, pool data)</li>
          <li>Get real-time cryptocurrency prices from CoinGecko API</li>
          <li>Build a weather station using OpenWeatherMap API</li>
          <li>Make POST requests to send sensor data to your own server</li>
          <li>Create a smart ticker that displays live prices on an LED matrix</li>
          <li>Add error handling and retry logic for more reliable connections</li>
          <li>Store API responses in ESP32's flash memory for offline access</li>
        </ul>`
  },
  {
    slug: "esp32-i2c-scanner",
    title: "I2C Device Scanner",
    tags: ["Arduino-IDE", "ESP32-C3", "ESP32-CYD"],
    description: "Scan for I2C devices and find their addresses - essential for debugging I2C connections",
    link: "/blocks/esp32-i2c-scanner",
    overview: "The I2C Scanner is a debugging tool that helps you find I2C devices connected to your ESP32. When you connect an OLED display, sensor, or any I2C device, you need to know its address to communicate with it. This simple scanner checks all possible I2C addresses (0-127) and reports which ones have devices connected. It's like a WiFi scanner, but for I2C devices!",
    features: [
      "Scan all I2C addresses (0x00 to 0x7F)",
      "Display found devices with their addresses",
      "Works with ESP32-C3 and ESP32-CYD",
      "Continuous scanning every 5 seconds",
      "Essential debugging tool"
    ],
    prerequisites: `<h3>Before You Begin</h3>
        
        <h4>1. Hardware Setup</h4>
        <ul>
          <li>ESP32-C3 or ESP32-CYD development board</li>
          <li>USB cable to connect to your computer</li>
          <li>Arduino IDE installed with ESP32 board support</li>
          <li><strong>Optional:</strong> An I2C device to test (like an OLED display or sensor)</li>
        </ul>
        
        <h4>2. I2C Pins</h4>
        <ul>
          <li><strong>ESP32-C3:</strong> SDA = GPIO 8, SCL = GPIO 9</li>
          <li><strong>ESP32-CYD:</strong> SDA = GPIO 27, SCL = GPIO 22 (check your board documentation)</li>
          <li>You can use different pins by changing them in the code</li>
        </ul>
        
        <h4>3. No Libraries Needed</h4>
        <ul>
          <li>This scanner uses the built-in Wire library</li>
          <li>No additional libraries to install!</li>
        </ul>`,
    code: `
/*
 * ESP32 I2C Scanner
 * 
 * This tool scans all I2C addresses and reports which devices are found.
 * Use this when you don't know your device's I2C address or to verify connections.
 * 
 * Compatible with: ESP32-C3, ESP32 CYD, and all ESP32 boards
 * 
 * What you'll learn:
 * - How to scan for I2C devices
 * - How to use the Wire library for I2C communication
 * - How to interpret I2C addresses
 * - How to debug I2C connection issues
 */

#include <Wire.h>

// I2C pins - adjust these for your board
// ESP32-C3: SDA = GPIO 8, SCL = GPIO 9
// ESP32 CYD: SDA = GPIO 27, SCL = GPIO 22 (may vary)
#define I2C_SDA 8
#define I2C_SCL 9

void setup() {
  // Initialize serial communication
  Serial.begin(115200);
  delay(1000);
  
  Serial.println();
  Serial.println("========================================");
  Serial.println("I2C Device Scanner");
  Serial.println("========================================");
  Serial.println();
  
  // Initialize I2C with custom pins
  Wire.begin(I2C_SDA, I2C_SCL);
  
  Serial.print("Scanning I2C bus on SDA=GPIO");
  Serial.print(I2C_SDA);
  Serial.print(", SCL=GPIO");
  Serial.println(I2C_SCL);
  Serial.println();
}

void loop() {
  int devicesFound = 0;
  
  Serial.println("Scanning...");
  
  // Scan all 128 possible I2C addresses (0x00 to 0x7F)
  for (byte address = 1; address < 127; address++) {
    // Try to communicate with this address
    Wire.beginTransmission(address);
    byte error = Wire.endTransmission();
    
    // If error is 0, a device responded
    if (error == 0) {
      Serial.print("✓ I2C device found at address 0x");
      if (address < 16) {
        Serial.print("0");  // Add leading zero for addresses < 0x10
      }
      Serial.print(address, HEX);
      Serial.println();
      
      devicesFound++;
    }
    else if (error == 4) {
      // Error 4 means unknown error at this address
      Serial.print("✗ Unknown error at address 0x");
      if (address < 16) {
        Serial.print("0");
      }
      Serial.print(address, HEX);
      Serial.println();
    }
  }
  
  // Summary
  Serial.println();
  if (devicesFound == 0) {
    Serial.println("No I2C devices found.");
    Serial.println("Check your wiring:");
    Serial.println("- Is VCC connected to 3.3V?");
    Serial.println("- Is GND connected to GND?");
    Serial.println("- Are SDA and SCL connected correctly?");
  }
  else {
    Serial.print("Found ");
    Serial.print(devicesFound);
    Serial.print(" device");
    if (devicesFound > 1) Serial.print("s");
    Serial.println();
  }
  
  Serial.println("========================================");
  Serial.println();
  
  // Wait 5 seconds before scanning again
  delay(5000);
}`,
    githubLink: "https://github.com/cardanothings/examples/tree/main/blocks/esp32-i2c-scanner",
    resources: [
      {
        title: "I2C Protocol Basics",
        url: "https://learn.sparkfun.com/tutorials/i2c",
        description: "Learn how the I2C protocol works"
      },
      {
        title: "Common I2C Addresses",
        url: "https://i2cdevices.org/addresses",
        description: "Database of common I2C device addresses"
      }
    ],
    usage: `<ol>
          <li>Open Arduino IDE and create a new sketch</li>
          <li>Copy and paste the code into your sketch</li>
          <li><strong>Important:</strong> Check the I2C pin definitions match your board:
            <ul>
              <li>ESP32-C3: Usually SDA=GPIO8, SCL=GPIO9</li>
              <li>ESP32-CYD: May be SDA=GPIO27, SCL=GPIO22 (check your board docs)</li>
            </ul>
          </li>
          <li>Select your board (<strong>Tools → Board → ESP32C3 Dev Module</strong> or <strong>ESP32 Dev Module</strong>)</li>
          <li>Select your COM port (<strong>Tools → Port</strong>)</li>
          <li>Click Upload to flash the code to your ESP32</li>
          <li>Open Serial Monitor (<strong>Tools → Serial Monitor</strong>)</li>
          <li>Set baud rate to 115200</li>
          <li>The scanner will automatically start and show any devices found!</li>
          <li>It will re-scan every 5 seconds</li>
        </ol>
        
        <h4>Reading the Results:</h4>
        <p>The scanner will show addresses in hexadecimal format (0x3C, 0x76, etc.). Common devices:</p>
        <ul>
          <li><strong>0x3C or 0x3D:</strong> SSD1306 OLED display</li>
          <li><strong>0x27 or 0x3F:</strong> LCD display with I2C backpack</li>
          <li><strong>0x40:</strong> SHT21 temperature/humidity sensor</li>
          <li><strong>0x76 or 0x77:</strong> BME280/BMP280 pressure sensor</li>
          <li><strong>0x68:</strong> MPU6050 accelerometer/gyroscope or DS3231 RTC</li>
        </ul>`,
    parameters: [
      {
        name: "#include <Wire.h>",
        type: "library",
        description: "Built-in library for I2C communication on ESP32"
      },
      {
        name: "Wire.begin(SDA, SCL)",
        type: "function",
        description: "Initialize I2C communication with custom pin numbers"
      },
      {
        name: "Wire.beginTransmission(address)",
        type: "function",
        description: "Start I2C transmission to a specific address"
      },
      {
        name: "Wire.endTransmission()",
        type: "function",
        description: "End transmission and return status code (0 = success, 4 = error)"
      }
    ],
    notes: `<p><strong>What is I2C?</strong></p>
        <ul>
          <li><strong>I2C:</strong> Inter-Integrated Circuit - a way for chips to talk to each other</li>
          <li><strong>Only 2 wires:</strong> SDA (data) and SCL (clock) - much simpler than other protocols</li>
          <li><strong>Multiple devices:</strong> You can connect many I2C devices to the same two wires</li>
          <li><strong>Addresses:</strong> Each device has a unique address (like a phone number) so they don't interfere</li>
        </ul>
        
        <p><strong>Understanding I2C Addresses:</strong></p>
        <ul>
          <li><strong>Format:</strong> Usually shown in hexadecimal with "0x" prefix (like 0x3C)</li>
          <li><strong>Range:</strong> 0x00 to 0x7F (0 to 127 in decimal)</li>
          <li><strong>Reserved addresses:</strong> 0x00-0x07 and 0x78-0x7F are reserved, so we scan 0x08-0x77</li>
          <li><strong>Fixed vs configurable:</strong> Some devices have fixed addresses, others have jumpers to change them</li>
        </ul>
        
        <p><strong>When to Use This Scanner:</strong></p>
        <ul>
          <li><strong>New device:</strong> You bought a sensor/display but don't know its I2C address</li>
          <li><strong>Debugging:</strong> Your I2C device isn't working - check if it's even detected</li>
          <li><strong>Multiple devices:</strong> Make sure addresses don't conflict</li>
          <li><strong>Verify wiring:</strong> Confirm your SDA and SCL connections are correct</li>
        </ul>
        
        <p><strong>How the Scanner Works:</strong></p>
        <ul>
          <li><strong>Step 1:</strong> Loop through all 127 possible addresses</li>
          <li><strong>Step 2:</strong> Try to start communication with each address</li>
          <li><strong>Step 3:</strong> If a device responds (error = 0), print its address</li>
          <li><strong>Step 4:</strong> If no response, move to next address</li>
          <li><strong>Result:</strong> List of all devices that responded</li>
        </ul>`,
    troubleshooting: `<p><strong>No Devices Found:</strong></p>
        <ul>
          <li><strong>Check power:</strong> Is VCC connected to 3.3V (NOT 5V for most devices)?</li>
          <li><strong>Check ground:</strong> Is GND connected to ESP32 ground?</li>
          <li><strong>Check SDA/SCL:</strong> Are data and clock wires on the correct GPIO pins?</li>
          <li><strong>Swapped wires:</strong> Try swapping SDA and SCL - easy mistake to make</li>
          <li><strong>Wrong pins in code:</strong> Make sure <code>I2C_SDA</code> and <code>I2C_SCL</code> match your actual wiring</li>
        </ul>
        
        <p><strong>Device Should Be There But Isn't Found:</strong></p>
        <ul>
          <li><strong>Power cycle:</strong> Unplug and replug your ESP32 and I2C device</li>
          <li><strong>Bad connections:</strong> Check that jumper wires are firmly connected</li>
          <li><strong>Faulty device:</strong> Try the device on a different I2C bus or with different wiring</li>
          <li><strong>Pull-up resistors:</strong> I2C needs pull-up resistors - most breakout boards have them built in, but check your device</li>
        </ul>
        
        <p><strong>Scanner Shows Errors:</strong></p>
        <ul>
          <li><strong>"Unknown error at 0x__":</strong> Might indicate a wiring issue or device in a bad state</li>
          <li><strong>Many addresses found:</strong> Could be noise on the I2C bus - check your wiring for loose connections</li>
          <li><strong>Scanner freezes:</strong> Short circuit possible - immediately disconnect and check wiring</li>
        </ul>
        
        <p><strong>ESP32-Specific Issues:</strong></p>
        <ul>
          <li><strong>Different boards, different pins:</strong> ESP32-C3 uses different default pins than regular ESP32</li>
          <li><strong>GPIO limitations:</strong> Not all GPIO pins support I2C - stick to recommended pins</li>
          <li><strong>Serial Monitor blank:</strong> Make sure baud rate is set to 115200</li>
        </ul>`,
    nextSteps: `<ul>
          <li>Once you find your device's address, update it in your project code (like the OLED display block)</li>
          <li>Connect multiple I2C devices to the same bus and scan to verify they don't conflict</li>
          <li>Use the found addresses to configure OLED displays, sensors, or other I2C modules</li>
          <li>Build a temperature/humidity monitor using an I2C sensor</li>
          <li>Create a multi-sensor dashboard with several I2C devices</li>
          <li>Learn about I2C pull-up resistors and when you need external ones</li>
          <li>Experiment with changing I2C clock speed for faster or more reliable communication</li>
        </ul>`
  }
]