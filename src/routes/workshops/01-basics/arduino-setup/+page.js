export const load = async () => {
	return {
		blinkCode: `
			// Define the pin number for the LED
			#define LED_PIN 8

			// Setup function is called once when the microcontroller starts up.
			void setup() {
				pinMode(LED_PIN, OUTPUT); // Set the LED pin as an output.
			}

			// Loop function is called repeatedly.
			void loop() {
				digitalWrite(LED_PIN, HIGH); // Turn the LED on (HIGH is the voltage level).
				delay(1000); // Wait for 1 second.
				digitalWrite(LED_PIN, LOW); // Turn the LED off by making the voltage LOW.
				delay(1000); // Wait for 1 second.
			}`,
		wifiCode: `
			#include <WiFi.h> // Include the WiFi library for ESP32
			const char* ssid = "Your SSID"; // Your WiFi SSID
			const char* password = "Your Password"; // Your WiFi Password

			// Setup function is called once when the microcontroller starts up.
			void setup() {
				Serial.begin(115200); // Initialize the serial communication at 115200 baud rate
				WiFi.mode(WIFI_STA); // Set WiFi mode to Station (client mode)
				WiFi.setTxPower(WIFI_POWER_8_5dBm); // Workaround for ESP32-C3 Super Mini
				WiFi.begin(ssid, password); // Connect to WiFi using the SSID and Password
				// Wait for the connection to be established
				while (WiFi.status() != WL_CONNECTED) {
					delay(1000); // Wait for 1 second
					Serial.println("Connecting to WiFi..."); // Print "Connecting to WiFi..." to the serial monitor
				}
				Serial.println("Connected to WiFi"); // Print "Connected to WiFi" to the serial monitor
				Serial.println("IP address: "); // Print "IP address: " to the serial monitor
				Serial.println(WiFi.localIP()); // Print the IP address to the serial monitor
			}

			// Loop function is called repeatedly.
			void loop() {
				// Check if the WiFi connection is lost
				if (WiFi.status() != WL_CONNECTED) {
					// Print "WiFi connection lost. Reconnecting..." to the serial monitor
					Serial.println("WiFi connection lost. Reconnecting...");
					WiFi.reconnect(); // Reconnect to WiFi
					// Wait for the connection to be established
					while (WiFi.status() != WL_CONNECTED) {
						delay(1000); // Wait for 1 second
						Serial.print("."); // Print "." to the serial monitor
						Serial.print(".");
					}
					Serial.println("Reconnected!"); // Print "Reconnected!" to the serial monitor
				}
			}`
	};
};