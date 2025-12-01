import { findWorkshopStep } from '$lib/utils/workshop-utils.js';

export const load = async ({ url }) => {
	const { workshop, step } = findWorkshopStep(url.pathname);

	return {
		workshop,
		step,
		walletBalanceCode: `
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
			
			// Variables for timing balance checks
			unsigned long lastCheck = 0;                    // Timestamp of last balance check
			const unsigned long checkInterval = 30000;      // Check every 30 seconds (30000 milliseconds)
			
			// Store previous balance to detect changes
			float previousBalance = 0;

			void setup() {
				// Initialize serial communication for debugging (115200 baud rate)
				Serial.begin(115200);
				
				// Start WiFi connection
				WiFi.begin(ssid, password);
				
				// Wait until WiFi is connected
				while (WiFi.status() != WL_CONNECTED) {
					delay(1000);
					Serial.println("Connecting to WiFi...");
				}
				
				// Print connection confirmation and IP address
				Serial.println("Connected to WiFi");
				Serial.print("IP address: ");
				Serial.println(WiFi.localIP());
				
				// Perform initial balance check on startup
				fetchStakeBalance();
			}

			void loop() {
				// Check if WiFi connection is still active
				if (WiFi.status() != WL_CONNECTED) {
					Serial.println("WiFi connection lost. Reconnecting...");
					WiFi.reconnect();
					
					// Wait for reconnection
					while (WiFi.status() != WL_CONNECTED) {
						delay(1000);
						Serial.print(".");
					}
					Serial.println("Reconnected!");
				}
				
				// Get current time in milliseconds
				unsigned long currentMillis = millis();
				
				// Check if enough time has passed since last check
				if (currentMillis - lastCheck >= checkInterval) {
					fetchStakeBalance();
					lastCheck = currentMillis;  // Update last check timestamp
				}
			}

			void fetchStakeBalance() {
				// Only proceed if WiFi is connected
				if (WiFi.status() == WL_CONNECTED) {
					HTTPClient http;
					
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
					
					// Send POST request and get response code
					int httpResponseCode = http.POST(jsonPayload);
					
					// Check if request was successful (response code > 0)
					if (httpResponseCode > 0) {
						// Get response body as string
						String response = http.getString();
						Serial.println("HTTP Response Code: " + String(httpResponseCode));
						
						// Create JSON document to parse response (2048 bytes buffer)
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
							Serial.println("Total Balance: " + String(balance, 6) + " tADA");
								
								// Check if balance has changed since last check
								if (balance != previousBalance) {
									if (balance > previousBalance) {
										Serial.println("✓ Balance increased!");
									} else {
										Serial.println("✓ Balance decreased!");
									}
									// Update previous balance for next comparison
									previousBalance = balance;
								}
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
				} else {
					Serial.println("WiFi not connected");
				}
			}`,
		blockfrostCode: `
			// Include necessary libraries for WiFi, HTTP requests, and JSON parsing
			#include <WiFi.h>
			#include <HTTPClient.h>
			#include <ArduinoJson.h>

			// WiFi credentials - replace with your network details
			const char* ssid = "Your SSID";
			const char* password = "Your Password";
			
			// Blockfrost API endpoint (Preprod Testnet)
			// Note: Blockfrost uses GET requests with stake address in URL path
			const char* apiUrl = "https://cardano-preprod.blockfrost.io/api/v0/accounts/";
			
			// Your Blockfrost API key (get free key from blockfrost.io)
			const char* apiKey = "your-blockfrost-api-key";
			
			// Your Cardano stake address (Preprod Testnet)
			String stakeAddress = "stake_test1...";
			
			// Variables for timing balance checks
			unsigned long lastCheck = 0;                    // Timestamp of last balance check
			const unsigned long checkInterval = 30000;      // Check every 30 seconds

			void setup() {
				// Initialize serial communication for debugging
				Serial.begin(115200);
				
				// Start WiFi connection
				WiFi.begin(ssid, password);
				
				// Wait until WiFi is connected
				while (WiFi.status() != WL_CONNECTED) {
					delay(1000);
					Serial.println("Connecting to WiFi...");
				}
				Serial.println("Connected to WiFi");
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
					fetchStakeBalance();
					lastCheck = currentMillis;  // Update last check timestamp
				}
			}

			void fetchStakeBalance() {
				// Only proceed if WiFi is connected
				if (WiFi.status() == WL_CONNECTED) {
					HTTPClient http;
					
					// Build full URL by appending stake address to base URL
					String fullUrl = apiUrl + stakeAddress;
					
					// Initialize HTTP client with full URL
					http.begin(fullUrl);
					
					// Blockfrost requires API key in "project_id" header
					http.addHeader("project_id", apiKey);
					
					// Send GET request (Blockfrost uses GET, not POST like Koios)
					int httpResponseCode = http.GET();
					
					// Check if request was successful
					if (httpResponseCode > 0) {
						// Get response body as string
						String response = http.getString();
						
						// Create JSON document to parse response (1024 bytes buffer)
						DynamicJsonDocument doc(1024);
						DeserializationError error = deserializeJson(doc, response);
						
					// Check if JSON parsing was successful
					if (!error) {
						// Extract controlled_amount as string (Blockfrost returns balance as string)
						// controlled_amount is the total balance including delegated amount and rewards
						const char* balanceStr = doc["controlled_amount"];
						
						// Convert string to long long (for large Lovelace values)
						long long balanceLovelace = 0;
						if (balanceStr != nullptr) {
							balanceLovelace = atoll(balanceStr);
						}
						
						// Convert from Lovelace to tADA (test ADA) - 1 tADA = 1,000,000 Lovelace
						float balance = balanceLovelace / 1000000.0;
						
						// Print account information
						Serial.println("Stake Address: " + String(doc["stake_address"].as<const char*>()));
						Serial.println("Total Balance: " + String(balance, 6) + " tADA");
					}
					}
					
					// Close HTTP connection
					http.end();
				}
			}`
	};
};

