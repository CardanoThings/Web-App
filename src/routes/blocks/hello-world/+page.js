export function load() {
    return {
        title: "Hello World",
        description: "Get started with your ESP32 by displaying 'Hello World!'",
        overview: "This is the most basic block to get you started with ESP32 programming. It demonstrates how to output text to the serial monitor, which is essential for debugging and monitoring your ESP32 applications.",
        features: [
            "Simple serial output",
            "Basic ESP32 setup",
            "Debug-friendly output",
            "Foundation for more complex projects"
        ],
        code: `#include <Arduino.h>

void setup() {
  // Initialize serial communication at 115200 baud rate
  Serial.begin(115200);
  
  // Wait for serial port to connect (needed for native USB)
  while (!Serial) {
    ; // wait for serial port to connect
  }
  
  // Print Hello World message
  Serial.println("Hello World!");
  Serial.println("ESP32 is ready!");
}

void loop() {
  // Print a message every 2 seconds
  Serial.println("Hello from ESP32!");
  delay(2000);
}`,
        usage: `<ol>
          <li>Connect your ESP32 to your computer via USB</li>
          <li>Open Arduino IDE or PlatformIO</li>
          <li>Copy and paste the code into your project</li>
          <li>Upload the code to your ESP32</li>
          <li>Open the Serial Monitor (Tools → Serial Monitor)</li>
          <li>Set the baud rate to 115200</li>
          <li>You should see "Hello World!" messages appearing every 2 seconds</li>
        </ol>`,
        parameters: [
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
        notes: `<p><strong>Troubleshooting:</strong></p>
        <ul>
          <li>If you don't see any output, check that the correct COM port is selected</li>
          <li>Make sure the baud rate in Serial Monitor matches the one in your code (115200)</li>
          <li>Try pressing the reset button on your ESP32</li>
        </ul>
        <p><strong>Next Steps:</strong> Once you have this working, you can modify the message or change the delay time to experiment with different output patterns.</p>`
    };
}