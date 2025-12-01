import { findWorkshopStep } from '$lib/utils/workshop-utils.js';

export const load = async ({ url }) => {
	const { workshop, step } = findWorkshopStep(url.pathname);

	return {
		workshop,
		step,
		relayBlinkCode: `
			// Simple Relay Blink Example
			// This example demonstrates basic relay control without any network connectivity
			// Perfect for testing your relay wiring before adding blockchain integration
			//
			// Wiring:
			//   VCC -> 3.3V or 5V (check your relay module specifications)
			//   GND -> GND
			//   IN  -> GPIO 4 (or any available GPIO pin)
			//
			// Note: Most relay modules are active LOW (LOW = ON, HIGH = OFF)
			// If your relay doesn't work, try reversing HIGH and LOW

			// Define the GPIO pin connected to the relay IN pin
			const int relayPin = 4;  // Change this to match your wiring

			void setup() {
				// Initialize serial communication for debugging
				Serial.begin(115200);
				
				// Wait for serial port to initialize
				delay(1000);
				
				// Configure relay pin as output
				pinMode(relayPin, OUTPUT);
				
				// Set relay to OFF state initially
				// For active LOW relays: HIGH = OFF, LOW = ON
				// For active HIGH relays: LOW = OFF, HIGH = ON
				// Try both if unsure - you'll hear a click when the relay activates
				digitalWrite(relayPin, HIGH);  // Start with relay OFF
				
				Serial.println("Relay Blink Example");
				Serial.println("Relay will turn ON for 2 seconds, then OFF for 2 seconds");
				Serial.println("You should hear a click when the relay activates");
			}

			void loop() {
				// Turn relay ON
				// For active LOW: set pin to LOW
				// For active HIGH: set pin to HIGH
				Serial.println("Relay ON");
				digitalWrite(relayPin, LOW);  // LOW activates active LOW relays
				delay(2000);                  // Keep relay ON for 2 seconds
				
				// Turn relay OFF
				// For active LOW: set pin to HIGH
				// For active HIGH: set pin to LOW
				Serial.println("Relay OFF");
				digitalWrite(relayPin, HIGH); // HIGH deactivates active LOW relays
				delay(2000);                  // Keep relay OFF for 2 seconds
				
				// This creates a continuous 2-second ON/OFF cycle
				// You should hear the relay clicking every 2 seconds
			}`,
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
			const int relayPin = 4;
			
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
			
			// Koios API endpoint for fetching account information
			const char* apiUrl = "https://preprod.koios.rest/api/v1/account_info";
			
			// Your Cardano stake address (Preprod Testnet)
			String stakeAddress = "stake_test1...";
			
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
				fetchStakeBalance();
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
					fetchStakeBalance();
					lastCheck = currentMillis;  // Update last check timestamp
				}
				
				// Check if LED should be turned off (after 60 seconds)
				if (ledActive && (currentMillis - ledOnTime >= ledDuration)) {
					digitalWrite(ledPin, LOW);  // Turn off LED
					ledActive = false;
					Serial.println("LED turned OFF after 60 seconds");
				}
			}

			void fetchStakeBalance() {
				// Only proceed if WiFi is connected
				if (WiFi.status() == WL_CONNECTED) {
					HTTPClient http;
					
					Serial.println("\\nFetching stake balance...");
					
					// Initialize HTTP client with API URL
					http.begin(apiUrl);
					
					// Set content type header for JSON request
					http.addHeader("Content-Type", "application/json");
					
					// Create JSON payload with stake address
					// Koios API expects stake addresses in an array under "_stake_addresses" key
					String jsonPayload = "{\\"";
					jsonPayload += "_stake_addresses";
					jsonPayload += "\\":[\\"";
					jsonPayload += stakeAddress;
					jsonPayload += "\\"]}";
					
					// Send POST request
					int httpResponseCode = http.POST(jsonPayload);
					
					// Check if request was successful
					if (httpResponseCode > 0) {
						// Get response body as string
						String response = http.getString();
						Serial.println("HTTP Response Code: " + String(httpResponseCode));
						
						// Create JSON document to parse response
						DynamicJsonDocument doc(2048);
						DeserializationError error = deserializeJson(doc, response);
						
						// Check if JSON parsing was successful
						if (!error) {
							// Verify response is an array with at least one element
							if (doc.is<JsonArray>() && doc.size() > 0) {
								// Get first account info object from array
								JsonObject accountInfo = doc[0];
								
								// Extract total balance as string (Koios returns balance as string)
								// total_balance includes delegated amount + rewards
								const char* balanceStr = accountInfo["total_balance"];
								
								// Convert string to long long (for large Lovelace values)
								long long balanceLovelace = 0;
								if (balanceStr != nullptr) {
									balanceLovelace = atoll(balanceStr);
								}
								
								// Convert from Lovelace (smallest unit) to tADA (test ADA)
								// 1 tADA = 1,000,000 Lovelace
								float balance = balanceLovelace / 1000000.0;
								
								// Print account information
								Serial.println("Stake Address: " + String(accountInfo["stake_address"].as<const char*>()));
								Serial.print("Total Balance: ");
								Serial.print(balance, 6);
								Serial.println(" tADA");
								
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
							}
						} else {
							// Print error if JSON parsing failed
							Serial.print("JSON parsing failed: ");
							Serial.println(error.c_str());
						}
					} else {
						// Print error if HTTP request failed
						Serial.println("Error in HTTP request");
						Serial.println("HTTP Response Code: " + String(httpResponseCode));
					}
					
					// Close HTTP connection
					http.end();
				}
			}`
	};
};

