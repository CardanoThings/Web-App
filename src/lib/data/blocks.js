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

// Built-in LED pin for ESP32-C3
#define LED_PIN 8

void setup() {
  // Initialize serial communication at 115200 baud rate
  Serial.begin(115200);
  
  // Wait for serial port to connect (needed for native USB)
  delay(1000);
  
  // Configure LED pin as output
  pinMode(LED_PIN, OUTPUT);
  
  Serial.println("ESP32-C3 Blink Example");
  Serial.println("LED will blink every second");
  Serial.println("------------------------");
}

void loop() {
  // Turn LED on
  digitalWrite(LED_PIN, HIGH);
  Serial.println("LED ON");
  delay(1000);
  
  // Turn LED off
  digitalWrite(LED_PIN, LOW);
  Serial.println("LED OFF");
  delay(1000);
}`,
    githubLink: "https://github.com/cardanothings/examples/tree/main/blocks/blink",
    usage: `<ol>
          <li>Connect your ESP32-C3 to your computer via USB</li>
          <li>Open Arduino IDE or PlatformIO</li>
          <li>Copy and paste the code into your project</li>
          <li>Upload the code to your ESP32-C3</li>
          <li>The built-in LED should start blinking</li>
          <li>Open the Serial Monitor (Tools → Serial Monitor)</li>
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

// Built-in RGB LED pin for CYD
#define LED_PIN 4

void setup() {
  // Initialize serial communication at 115200 baud rate
  Serial.begin(115200);
  
  // Wait for serial port to connect (needed for native USB)
  delay(1000);
  
  // Configure LED pin as output
  pinMode(LED_PIN, OUTPUT);
  
  Serial.println("CYD Blink Example");
  Serial.println("LED will blink every second");
  Serial.println("------------------------");
}

void loop() {
  // Turn LED on
  digitalWrite(LED_PIN, HIGH);
  Serial.println("LED ON");
  delay(1000);
  
  // Turn LED off
  digitalWrite(LED_PIN, LOW);
  Serial.println("LED OFF");
  delay(1000);
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
          <li>Select "ESP32 Dev Module" from Tools → Board</li>
          <li>Select the correct port from Tools → Port</li>
          <li>Click Upload</li>
          <li>The RGB LED should start blinking</li>
          <li>Open the Serial Monitor (Tools → Serial Monitor)</li>
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
  }
]