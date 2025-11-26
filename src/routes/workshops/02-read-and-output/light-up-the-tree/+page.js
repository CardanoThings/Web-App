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
			
			// Koios API endpoint for fetching address information
			const char* apiUrl = "https://preprod.koios.rest/api/v1/address_info";
			
			// Your Cardano wallet address (Preprod Testnet)
			String walletAddress = "addr_test1...";
			
			// GPIO pin connected to LED
			const int ledPin = 2;
			
			// Variables for timing balance checks
			unsigned long lastCheck = 0;                    // Timestamp of last balance check
			const unsigned long checkInterval = 30000;      // Check every 30 seconds (30,000 ms)
			
			// Variables for LED timing
			unsigned long ledOnTime = 0;                    // Time when LED was turned on
			const unsigned long ledDuration = 60000;        // LED stays on for 60 seconds (60,000 ms)
			bool ledActive = false;                         // Track if LED is currently on
			
			// Store previous balance to detect changes
			float previousBalance = 0;
			bool firstCheck = true;                         // Flag to skip change detection on first check

			void setup() {
				// Initialize serial communication for debugging
				Serial.begin(115200);
				
				// Configure LED pin as output
				pinMode(ledPin, OUTPUT);
				digitalWrite(ledPin, LOW);  // Start with LED off
				
				// Start WiFi connection
				WiFi.begin(ssid, password);
				Serial.print("Connecting to WiFi");
				while (WiFi.status() != WL_CONNECTED) {
					delay(500);
					Serial.print(".");
				}
				Serial.println("\\nConnected to WiFi");
				Serial.print("IP Address: ");
				Serial.println(WiFi.localIP());
				
				// Perform initial balance check on startup
				fetchWalletBalance();
			}

			void loop() {
				// Check if WiFi connection is still active
				if (WiFi.status() != WL_CONNECTED) {
					Serial.println("WiFi connection lost, reconnecting...");
					WiFi.reconnect();
					while (WiFi.status() != WL_CONNECTED) {
						delay(1000);
					}
					Serial.println("Reconnected to WiFi");
				}
				
				// Get current time in milliseconds
				unsigned long currentMillis = millis();
				
				// Check if enough time has passed since last balance check
				if (currentMillis - lastCheck >= checkInterval) {
					fetchWalletBalance();
					lastCheck = currentMillis;  // Update last check timestamp
				}
				
				// Check if LED should be turned off (after 60 seconds)
				if (ledActive && (currentMillis - ledOnTime >= ledDuration)) {
					digitalWrite(ledPin, LOW);  // Turn off LED
					ledActive = false;
					Serial.println("LED turned OFF after 60 seconds");
				}
			}

			void fetchWalletBalance() {
				// Only proceed if WiFi is connected
				if (WiFi.status() == WL_CONNECTED) {
					HTTPClient http;
					
					Serial.println("\\nFetching wallet balance...");
					
					// Initialize HTTP client with API URL
					http.begin(apiUrl);
					
					// Set content type header for JSON request
					http.addHeader("Content-Type", "application/json");
					
					// Create JSON payload with wallet address
					String jsonPayload = "{\\"_addresses\\":[\\"" + walletAddress + "\\"]}";
					
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
							
							Serial.print("Current balance: ");
							Serial.print(balance, 6);
							Serial.println(" ADA");
							
							// Skip change detection on first check (just store the balance)
							if (!firstCheck) {
								// Check if balance changed (up or down)
								if (balance != previousBalance) {
									Serial.println("\\n***** BALANCE CHANGE DETECTED! *****");
									if (balance > previousBalance) {
										Serial.println("Balance INCREASED (transaction received)");
									} else {
										Serial.println("Balance DECREASED (transaction sent)");
									}
									
									// Turn on LED and start timer
									digitalWrite(ledPin, HIGH);
									ledOnTime = millis();  // Record current time
									ledActive = true;
									Serial.println("LED turned ON for 60 seconds");
								}
							} else {
								firstCheck = false;  // Clear first check flag
								Serial.println("Initial balance recorded");
							}
							
							// Update previous balance for next comparison
							previousBalance = balance;
						} else {
							Serial.println("Error parsing JSON response");
						}
					} else {
						Serial.print("Error on HTTP request: ");
						Serial.println(httpResponseCode);
					}
					
					// Close HTTP connection
					http.end();
				}
			}`
	};
};

