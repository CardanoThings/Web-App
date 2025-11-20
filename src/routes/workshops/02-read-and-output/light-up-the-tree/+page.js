export const load = async () => {
	return {
		relayCode: `
			// Include necessary libraries for WiFi, HTTP requests, and JSON parsing
			#include <WiFi.h>
			#include <HTTPClient.h>
			#include <ArduinoJson.h>

			// WiFi credentials - replace with your network details
			const char* ssid = "Your SSID";
			const char* password = "Your Password";
			
			// Koios API endpoint for fetching address information
			const char* apiUrl = "https://preprod.koios.rest/api/v1/address_info";
			
			// Your Cardano wallet address (Preprod Testnet)
			String walletAddress = "addr_test1...";
			
			// GPIO pin connected to relay module control input
			const int relayPin = 2;
			
			// Variables for timing balance checks
			unsigned long lastCheck = 0;                    // Timestamp of last balance check
			const unsigned long checkInterval = 30000;      // Check every 30 seconds
			
			// Store previous balance to detect changes
			float previousBalance = 0;
			
			// Track current light state
			bool lightState = false;

			void setup() {
				// Initialize serial communication for debugging
				Serial.begin(115200);
				
				// Configure relay pin as output
				pinMode(relayPin, OUTPUT);
				
				// Start with light off (LOW = relay off for most modules)
				digitalWrite(relayPin, LOW);
				
				// Start WiFi connection
				WiFi.begin(ssid, password);
				while (WiFi.status() != WL_CONNECTED) {
					delay(1000);
					Serial.println("Connecting to WiFi...");
				}
				Serial.println("Connected to WiFi");
				
				// Perform initial balance check on startup
				fetchWalletBalance();
			}

			void loop() {
				// Check if WiFi connection is still active
				if (WiFi.status() != WL_CONNECTED) {
					WiFi.reconnect();
					while (WiFi.status() != WL_CONNECTED) {
						delay(1000);
					}
				}
				
				// Get current time in milliseconds
				unsigned long currentMillis = millis();
				
				// Check if enough time has passed since last check
				if (currentMillis - lastCheck >= checkInterval) {
					fetchWalletBalance();
					lastCheck = currentMillis;  // Update last check timestamp
				}
			}

			void fetchWalletBalance() {
				// Only proceed if WiFi is connected
				if (WiFi.status() == WL_CONNECTED) {
					HTTPClient http;
					
					// Initialize HTTP client with API URL
					http.begin(apiUrl);
					
					// Set content type header for JSON request
					http.addHeader("Content-Type", "application/json");
					
					// Create JSON payload with wallet address
					String jsonPayload = "{\"_addresses\":[\"" + walletAddress + "\"]}";
					
					// Send POST request
					int httpResponseCode = http.POST(jsonPayload);
					
					// Check if request was successful
					if (httpResponseCode > 0) {
						// Get response body as string
						String response = http.getString();
						
						// Create JSON document to parse response
						DynamicJsonDocument doc(2048);
						DeserializationError error = deserializeJson(doc, response);
						
						// Check if JSON parsing was successful and response has data
						if (!error && doc.is<JsonArray>() && doc.size() > 0) {
							// Get first address info object from array
							JsonObject addressInfo = doc[0];
							
							// Extract balance and convert from Lovelace to ADA
							float balance = addressInfo["balance"] | 0.0;
							balance = balance / 1000000;  // 1 ADA = 1,000,000 Lovelace
							
							// Check if balance increased (new transaction received)
							if (balance > previousBalance) {
								Serial.println("New transaction detected! Turning on light...");
								turnOnLight();  // Activate relay to turn on light
							} else if (balance < previousBalance) {
								// Balance decreased (funds sent out)
								Serial.println("Balance decreased. Turning off light...");
								turnOffLight();  // Deactivate relay to turn off light
							}
							
							// Update previous balance for next comparison
							previousBalance = balance;
						}
					}
					
					// Close HTTP connection
					http.end();
				}
			}

			void turnOnLight() {
				// Set relay pin HIGH to activate relay (turn on light)
				digitalWrite(relayPin, HIGH);
				lightState = true;
				Serial.println("Light is ON");
			}

			void turnOffLight() {
				// Set relay pin LOW to deactivate relay (turn off light)
				digitalWrite(relayPin, LOW);
				lightState = false;
				Serial.println("Light is OFF");
			}`,
		ledCode: `
			// Include necessary libraries for WiFi, HTTP requests, and JSON parsing
			#include <WiFi.h>
			#include <HTTPClient.h>
			#include <ArduinoJson.h>

			// WiFi credentials - replace with your network details
			const char* ssid = "Your SSID";
			const char* password = "Your Password";
			
			// GPIO pin numbers for hardware control
			const int ledPin = 2;      // GPIO pin connected to LED
			const int relayPin = 4;    // GPIO pin connected to relay module
			
			// Your Cardano wallet address (Preprod Testnet)
			String walletAddress = "addr_test1...";
			
			// Store previous balance to detect changes
			float previousBalance = 0;

			void setup() {
				// Initialize serial communication for debugging
				Serial.begin(115200);
				
				// Configure pins as outputs
				pinMode(ledPin, OUTPUT);    // LED pin
				pinMode(relayPin, OUTPUT);  // Relay pin
				
				// Start WiFi connection
				WiFi.begin(ssid, password);
				while (WiFi.status() != WL_CONNECTED) {
					delay(1000);
				}
			}

			void loop() {
				// Check balance and control hardware based on changes
				checkAndControl();
				
				// Wait 30 seconds before next check
				delay(30000);
			}

			void checkAndControl() {
				// Fetch current balance from API (simplified - implement fetchBalance())
				float currentBalance = fetchBalance();
				
				// Check if balance increased (new transaction received)
				if (currentBalance > previousBalance) {
					// New funds received - provide visual and hardware feedback
					blinkLED(5);                    // Blink LED 5 times
					digitalWrite(relayPin, HIGH);    // Turn on relay (activate connected device)
				}
				
				// Update previous balance for next comparison
				previousBalance = currentBalance;
			}

			void blinkLED(int times) {
				// Blink LED specified number of times
				for (int i = 0; i < times; i++) {
					digitalWrite(ledPin, HIGH);  // Turn LED on
					delay(200);                 // Wait 200ms
					digitalWrite(ledPin, LOW);   // Turn LED off
					delay(200);                 // Wait 200ms
				}
			}

			float fetchBalance() {
				// Your balance fetching code here
				// This should call the Koios or Blockfrost API
				// and return the current wallet balance
				return 0.0;
			}`
	};
};

