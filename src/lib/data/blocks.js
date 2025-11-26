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
 * @property {string} notes - HTML string with additional notes, troubleshooting tips, and next steps
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
    notes: `<p><strong>ESP32-C3 Notes:</strong></p>
        <ul>
          <li>The built-in LED on most ESP32-C3 boards is connected to GPIO8</li>
          <li>Some boards may have the LED on a different pin - check your board's documentation</li>
          <li>You can change LED_PIN to use an external LED on any GPIO pin</li>
        </ul>
        <p><strong>Troubleshooting:</strong></p>
        <ul>
          <li>If the LED doesn't blink, verify the LED_PIN matches your board's built-in LED</li>
          <li>If you don't see serial output, check that the correct COM port is selected</li>
          <li>Make sure the baud rate in Serial Monitor matches the code (115200)</li>
          <li>Try pressing the reset button on your ESP32-C3</li>
        </ul>
        <p><strong>Next Steps:</strong> Try changing the delay times to make the LED blink faster or slower, or connect an external LED to a different GPIO pin.</p>`
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
    notes: `<p><strong>CYD Specifications:</strong></p>
        <ul>
          <li>Display: 320x240 pixels, 2.8" ILI9341 TFT LCD</li>
          <li>Touchscreen: Resistive touch (XPT2046)</li>
          <li>Processor: ESP32 with WiFi and Bluetooth</li>
          <li>Cost: Around $15 USD</li>
          <li>Additional features: SD card slot, RGB LED (GPIO4), extra GPIO pins</li>
        </ul>
        <p><strong>CYD Notes:</strong></p>
        <ul>
          <li>The built-in RGB LED on the CYD is connected to GPIO4</li>
          <li>This is an RGB LED, so you can control different colors with additional code</li>
          <li>The CYD has many more features including a touchscreen display - check the resources for advanced examples</li>
        </ul>
        <p><strong>Troubleshooting:</strong></p>
        <ul>
          <li><strong>Port not detected:</strong> Install CH340 driver and restart your computer</li>
          <li><strong>Upload fails:</strong> Try holding the BOOT button while uploading</li>
          <li>If the LED doesn't blink, verify the LED_PIN is set to 4</li>
          <li>If you don't see serial output, check that the correct COM port is selected</li>
          <li>Make sure the baud rate in Serial Monitor matches the code (115200)</li>
          <li>Try pressing the reset button on your CYD after upload</li>
        </ul>
        <p><strong>Next Steps:</strong></p>
        <ul>
          <li>Try changing the delay times to make the LED blink faster or slower</li>
          <li>Explore the TFT display functionality using the TFT_eSPI library</li>
          <li>Add touch screen functionality using the XPT2046_Touchscreen library</li>
          <li>Add WiFi connectivity to fetch and display real-time data</li>
          <li>Check the <a href="https://github.com/witnessmenow/ESP32-Cheap-Yellow-Display" target="_blank">CYD GitHub repository</a> for more advanced examples</li>
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
    notes: `<p><strong>Understanding the Basics:</strong></p>
        <ul>
          <li><strong>GET:</strong> Used to retrieve/read data from the server</li>
          <li><strong>POST:</strong> Used to send/create new data on the server</li>
          <li><strong>API:</strong> Application Programming Interface - a way for programs to talk to each other</li>
          <li><strong>JSON:</strong> JavaScript Object Notation - a format for sending data</li>
        </ul>
        
        <p><strong>Common Issues:</strong></p>
        <ul>
          <li><strong>"Cannot find module 'express'":</strong> Run <code>npm install express</code></li>
          <li><strong>"Port already in use":</strong> Another program is using port 3000. Change the PORT number in the code.</li>
          <li><strong>"Cannot read property 'name'":</strong> Make sure you're sending the data in the correct JSON format</li>
        </ul>
        
        <p><strong>What's Next?</strong></p>
        <ul>
          <li>Try adding a PUT endpoint to update items</li>
          <li>Try adding a DELETE endpoint to remove items</li>
          <li>Connect to a real database like MongoDB</li>
          <li>Learn about authentication to protect your API</li>
          <li>Add more fields to your items (like price, category, etc.)</li>
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
    notes: `<p><strong>Understanding WiFi on ESP32:</strong></p>
        <ul>
          <li><strong>2.4GHz Only:</strong> ESP32 only supports 2.4GHz WiFi networks, not 5GHz</li>
          <li><strong>RSSI Values:</strong> Signal strength in dBm. -50 dBm is excellent, -70 dBm is fair, below -80 dBm is poor</li>
          <li><strong>Station Mode (STA):</strong> Your ESP32 acts as a WiFi client connecting to a router</li>
          <li><strong>Access Point Mode (AP):</strong> Your ESP32 creates its own WiFi network (not shown in this example)</li>
        </ul>
        
        <p><strong>Common Connection Issues:</strong></p>
        <ul>
          <li><strong>Stuck on connecting dots:</strong> Check that your WiFi name and password are correct (they are case-sensitive!)</li>
          <li><strong>"Failed to connect":</strong> Make sure you're using a 2.4GHz network, not 5GHz</li>
          <li><strong>Connection drops:</strong> Your ESP32 might be too far from the router. Try moving it closer</li>
          <li><strong>Special characters in password:</strong> If your password has quotes or backslashes, you may need to escape them</li>
          <li><strong>Hidden network:</strong> If your WiFi is hidden, you may need additional configuration</li>
        </ul>
        
        <p><strong>Security Tips:</strong></p>
        <ul>
          <li>Never share your code with the WiFi password still in it</li>
          <li>Consider storing credentials in a separate file that you don't commit to version control</li>
          <li>For production projects, consider using WiFi provisioning methods</li>
        </ul>
        
        <p><strong>Next Steps:</strong></p>
        <ul>
          <li>Make HTTP requests to APIs once connected</li>
          <li>Create a web server on your ESP32 to control it from your browser</li>
          <li>Use mDNS to access your ESP32 with a custom name instead of IP</li>
          <li>Implement OTA (Over-The-Air) updates to upload code via WiFi</li>
          <li>Add WiFi Manager for easy credential configuration without code changes</li>
          <li>Connect to MQTT broker for IoT messaging</li>
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
    notes: `<p><strong>Understanding the Code:</strong></p>
        <ul>
          <li><strong>Nested Values:</strong> Use <code>doc["key1"]["key2"]</code> to access nested objects</li>
          <li><strong>Arrays:</strong> Use <code>JsonArray</code> and loop through with <code>for (int value : array)</code></li>
          <li><strong>Error Checking:</strong> Always check if <code>error</code> exists before using parsed data</li>
          <li><strong>Data Types:</strong> Can extract strings, numbers (int/float), and booleans</li>
        </ul>
        
        <p><strong>Common Issues:</strong></p>
        <ul>
          <li><strong>"Parsing failed":</strong> Check that your JSON syntax is correct (use an online validator)</li>
          <li><strong>Wrong values:</strong> Key names are case-sensitive - "Temperature" ≠ "temperature"</li>
          <li><strong>Library not found:</strong> Install ArduinoJson from Library Manager</li>
          <li><strong>Garbled output:</strong> Make sure Serial Monitor baud rate is set to 115200</li>
        </ul>
        
        <p><strong>Using with Real APIs:</strong></p>
        <ul>
          <li>This example uses a simulated response stored in the code</li>
          <li>In real projects, replace <code>apiResponse</code> with data from HTTP requests</li>
          <li>Combine with WiFi and HTTPClient to fetch live data</li>
          <li>Most APIs (weather, crypto, IoT) return JSON responses</li>
        </ul>
        
        <p><strong>Next Steps:</strong></p>
        <ul>
          <li>Connect to WiFi and fetch real API data</li>
          <li>Parse blockchain APIs (Cardano epoch data, wallet balances)</li>
          <li>Display parsed data on an LCD or OLED screen</li>
          <li>Learn to create JSON for sending data to APIs</li>
          <li>Build a weather station that displays live data</li>
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
      "Draw shapes and graphics",
      "Show sensor readings",
      "Scrolling text",
      "Simple animation example"
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
 * This example shows how to use a small OLED display with I2C communication.
 * Perfect for displaying sensor data, status messages, or simple graphics.
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
  
  // Clear the display buffer
  display.clearDisplay();
  
  // Run through different display examples
  displayWelcome();
  delay(3000);
  
  displayTextSizes();
  delay(3000);
  
  displayShapes();
  delay(3000);
  
  displaySensorData();
  delay(3000);
  
  displayScrollingText();
}

void loop() {
  // Display updating counter
  static int counter = 0;
  
  display.clearDisplay();
  display.setTextSize(2);
  display.setTextColor(SSD1306_WHITE);
  display.setCursor(20, 20);
  display.print("Count: ");
  display.println(counter);
  display.display();
  
  counter++;
  delay(1000);
}

// ============================================================================
// EXAMPLE 1: Welcome Message
// ============================================================================
void displayWelcome() {
  display.clearDisplay();
  
  // Set text properties
  display.setTextSize(2);              // Medium text
  display.setTextColor(SSD1306_WHITE); // White text
  display.setCursor(15, 10);           // Position (x, y)
  display.println("ESP32-C3");
  
  display.setTextSize(1);
  display.setCursor(15, 35);
  display.println("OLED Display");
  display.setCursor(30, 50);
  display.println("Example");
  
  // Send buffer to display
  display.display();
}

// ============================================================================
// EXAMPLE 2: Different Text Sizes
// ============================================================================
void displayTextSizes() {
  display.clearDisplay();
  
  display.setTextColor(SSD1306_WHITE);
  
  // Size 1 (small)
  display.setTextSize(1);
  display.setCursor(0, 0);
  display.println("Size 1 Text");
  
  // Size 2 (medium)
  display.setTextSize(2);
  display.setCursor(0, 15);
  display.println("Size 2");
  
  // Size 3 (large)
  display.setTextSize(3);
  display.setCursor(0, 40);
  display.println("Big!");
  
  display.display();
}

// ============================================================================
// EXAMPLE 3: Draw Shapes
// ============================================================================
void displayShapes() {
  display.clearDisplay();
  
  // Draw rectangle
  display.drawRect(5, 5, 40, 30, SSD1306_WHITE);
  
  // Draw filled rectangle
  display.fillRect(50, 5, 40, 30, SSD1306_WHITE);
  
  // Draw circle
  display.drawCircle(20, 50, 10, SSD1306_WHITE);
  
  // Draw filled circle
  display.fillCircle(70, 50, 10, SSD1306_WHITE);
  
  // Draw line
  display.drawLine(95, 5, 120, 30, SSD1306_WHITE);
  
  display.display();
}

// ============================================================================
// EXAMPLE 4: Simulated Sensor Data
// ============================================================================
void displaySensorData() {
  display.clearDisplay();
  
  // Simulate sensor readings
  float temperature = 23.5;
  int humidity = 65;
  
  // Title
  display.setTextSize(1);
  display.setTextColor(SSD1306_WHITE);
  display.setCursor(25, 0);
  display.println("Sensor Data");
  
  // Draw separator line
  display.drawLine(0, 12, 128, 12, SSD1306_WHITE);
  
  // Temperature
  display.setTextSize(1);
  display.setCursor(5, 20);
  display.print("Temp: ");
  display.setTextSize(2);
  display.setCursor(5, 30);
  display.print(temperature, 1);
  display.setTextSize(1);
  display.print(" C");
  
  // Humidity
  display.setTextSize(1);
  display.setCursor(5, 48);
  display.print("Humidity: ");
  display.print(humidity);
  display.print("%");
  
  display.display();
}

// ============================================================================
// EXAMPLE 5: Scrolling Text
// ============================================================================
void displayScrollingText() {
  display.clearDisplay();
  display.setTextSize(2);
  display.setTextColor(SSD1306_WHITE);
  display.setCursor(10, 0);
  display.println("Scrolling");
  display.setTextSize(1);
  display.setCursor(0, 25);
  display.println("This text will");
  display.println("scroll up!");
  display.display();
  
  delay(1000);
  
  // Scroll up
  display.startscrollup(0x00, 0x0F);
  delay(2000);
  display.stopscroll();
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
          <li>Wire up your OLED display to the ESP32-C3</li>
          <li>Create a new sketch and paste the code</li>
          <li>Upload to your ESP32-C3</li>
          <li>Watch the display show different examples!</li>
          <li>The display will cycle through:
            <ul>
              <li>Welcome message</li>
              <li>Different text sizes</li>
              <li>Shapes (rectangles, circles, lines)</li>
              <li>Sensor data display</li>
              <li>Scrolling text</li>
              <li>Finally, a counting loop</li>
            </ul>
          </li>
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
      },
      {
        name: "display.fillRect()",
        type: "function",
        description: "Draws a filled rectangle"
      },
      {
        name: "display.drawCircle()",
        type: "function",
        description: "Draws a circle outline at center (x, y) with radius"
      }
    ],
    notes: `<p><strong>Understanding the Display:</strong></p>
        <ul>
          <li><strong>Buffer System:</strong> Changes are stored in memory first, then sent to display with <code>display.display()</code></li>
          <li><strong>Coordinates:</strong> (0,0) is top-left corner, (127,63) is bottom-right on 128x64 display</li>
          <li><strong>Colors:</strong> OLED is monochrome - pixels are either on (white) or off (black)</li>
          <li><strong>I2C Address:</strong> Usually 0x3C, but some displays use 0x3D - check your display's documentation</li>
        </ul>
        
        <p><strong>Common Issues:</strong></p>
        <ul>
          <li><strong>"SSD1306 allocation failed":</strong> Check wiring connections, especially VCC and GND</li>
          <li><strong>Nothing on display:</strong> Make sure you call <code>display.display()</code> after drawing</li>
          <li><strong>Wrong I2C address:</strong> Try changing SCREEN_ADDRESS to 0x3D if 0x3C doesn't work</li>
          <li><strong>Text cut off:</strong> Check that cursor position and text size fit within screen bounds</li>
          <li><strong>Display dim or flickering:</strong> Power issue - make sure ESP32 is getting enough power via USB</li>
        </ul>
        
        <p><strong>Display Tips:</strong></p>
        <ul>
          <li>Always clear the display before drawing new content: <code>display.clearDisplay()</code></li>
          <li>Call <code>display.display()</code> only once after all drawing commands for smooth updates</li>
          <li>Use smaller text sizes to fit more information</li>
          <li>Draw frames or lines to organize information</li>
          <li>Avoid updating the display too frequently (causes flicker) - once per second is usually fine</li>
        </ul>
        
        <p><strong>Finding Your I2C Address:</strong></p>
        <p>If your display doesn't work, scan for I2C devices:</p>
        <pre><code>// I2C Scanner
#include &lt;Wire.h&gt;

void setup() {
  Serial.begin(115200);
  Wire.begin(8, 9); // SDA, SCL
  Serial.println("I2C Scanner");
  
  for(byte address = 1; address < 127; address++) {
    Wire.beginTransmission(address);
    if(Wire.endTransmission() == 0) {
      Serial.print("Found device at: 0x");
      Serial.println(address, HEX);
    }
  }
}</code></pre>
        
        <p><strong>Next Steps:</strong></p>
        <ul>
          <li>Display real sensor data (temperature, humidity, etc.)</li>
          <li>Show WiFi connection status and IP address</li>
          <li>Display API data (weather, crypto prices, etc.)</li>
          <li>Create animated icons or progress bars</li>
          <li>Build a simple menu system with button navigation</li>
          <li>Show QR codes for payments or URLs</li>
        </ul>`
  }
]