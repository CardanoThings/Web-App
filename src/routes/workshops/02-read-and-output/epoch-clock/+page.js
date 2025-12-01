import { findWorkshopStep } from '$lib/utils/workshop-utils.js';

export const load = async ({ url }) => {
	const { workshop, step } = findWorkshopStep(url.pathname);

	return {
		workshop,
		step,
		epochClockCode: `
			// Include necessary libraries
			#include <WiFi.h>
			#include <HTTPClient.h>
			#include <ArduinoJson.h>
			#include <Adafruit_NeoPixel.h>
			#include <WiFiClientSecure.h>

			// Pin connected to the WS2812 data input
			#define LED_PIN 4
			
			// Number of LEDs in the ring (12 LEDs)
			#define NUM_LEDS 12
			
			// Total slots in an epoch (approximately 432,000 on Mainnet)
			#define SLOTS_PER_EPOCH 432000
			
			// Create NeoPixel object
			Adafruit_NeoPixel strip = Adafruit_NeoPixel(NUM_LEDS, LED_PIN, NEO_GRB + NEO_KHZ800);

			// WiFi credentials
			const char* ssid = "Your SSID";
			const char* password = "Your Password";
			
			// Koios API endpoint
			const char* apiUrl = "https://preprod.koios.rest/api/v1/tip";
			
			// Variables for timing API calls
			unsigned long lastCheck = 0;
			const unsigned long checkInterval = 60000;  // Check every minute
			
			// Variables for walking LED - creates a clock-like second hand effect
			// The white LED moves around the ring every 5 seconds
			// 12 LEDs × 5 seconds = 60 seconds (1 minute) for a full rotation
			unsigned long lastWalkUpdate = 0;
			const unsigned long walkInterval = 5000;  // Move to next LED every 5 seconds
			int walkPosition = 0;  // Current position of walking LED (0-11)
			
			// Store current epoch data
			int currentEpoch = 0;
			int currentEpochSlot = 0;
			int lastEpoch = -1;

			void setup() {
				Serial.begin(115200);
				
				// Initialize LED ring
				strip.begin();
				strip.setBrightness(5);  // Low brightness for safety
				strip.clear();
				strip.show();
				
				// Connect to WiFi
				WiFi.begin(ssid, password);
				WiFi.setTxPower(WIFI_POWER_8_5dBm);  // Workaround for ESP32-C3 Super Mini
				
				while (WiFi.status() != WL_CONNECTED) {
					delay(1000);
				}
				
				// Initial fetch
				fetchEpochData();
				displayProgress();
			}

			void loop() {
				// Check WiFi connection
				if (WiFi.status() != WL_CONNECTED) {
					WiFi.reconnect();
					while (WiFi.status() != WL_CONNECTED) {
						delay(1000);
					}
				}
				
				// Check if enough time has passed for API call
				unsigned long currentMillis = millis();
				if (currentMillis - lastCheck >= checkInterval) {
					fetchEpochData();
					displayProgress();
					lastCheck = currentMillis;
				}
				
				// Update walking LED every 5 seconds (creates second-hand effect)
				if (currentMillis - lastWalkUpdate >= walkInterval) {
					updateWalkingLED();
					lastWalkUpdate = currentMillis;
				}
			}

			void fetchEpochData() {
				if (WiFi.status() == WL_CONNECTED) {
					HTTPClient http;
					WiFiClientSecure client;
					
					client.setInsecure();
					http.begin(client, apiUrl);
					
					int httpResponseCode = http.GET();
					
					if (httpResponseCode > 0) {
						String response = http.getString();
						
						JsonDocument doc;
						DeserializationError error = deserializeJson(doc, response);
						
						if (!error && doc.is<JsonArray>() && doc.size() > 0) {
							JsonObject tip = doc[0];
							currentEpoch = tip["epoch_no"] | 0;
							currentEpochSlot = tip["epoch_slot"] | 0;
							
							// Reset display if epoch changed
							if (currentEpoch != lastEpoch) {
								lastEpoch = currentEpoch;
								strip.clear();
								strip.show();
								delay(500);
							}
						}
					}
					
					http.end();
				}
			}

			void displayProgress() {
				// Calculate epoch progress percentage
				int progressPercent = (currentEpochSlot * 100) / SLOTS_PER_EPOCH;
				if (progressPercent > 100) progressPercent = 100;
				
				// Calculate how many LEDs should be lit
				int ledsToLight = (progressPercent * NUM_LEDS) / 100;
				
				// Clear all LEDs
				strip.clear();
				
				// Light up LEDs based on progress in blue
				for (int i = 0; i < ledsToLight; i++) {
					strip.setPixelColor(i, strip.Color(0, 0, 255));  // Blue
				}
				
				strip.show();
			}

			void updateWalkingLED() {
				// Display epoch progress first (blue LEDs showing epoch completion)
				displayProgress();
				
				// Add white walking LED at current position (creates clock second-hand effect)
				// This LED blinks white for 5 seconds at each position before moving
				strip.setPixelColor(walkPosition, strip.Color(255, 255, 255));  // White
				strip.show();
				
				// Move to next position (wrap around after LED 11 to complete 60-second cycle)
				walkPosition = (walkPosition + 1) % NUM_LEDS;
			}`,
		simpleEpochCode: `
			// Include necessary libraries for WiFi, HTTP requests, and JSON parsing
			#include <WiFi.h>
			#include <HTTPClient.h>
			#include <ArduinoJson.h>
			#include <WiFiClientSecure.h>

			// WiFi credentials - replace with your network details
			const char* ssid = "Your SSID";
			const char* password = "Your Password";
			
			// Koios API endpoint for fetching chain tip (epoch information)
			const char* apiUrl = "https://preprod.koios.rest/api/v1/tip";
			
			// Variables for timing API calls
			unsigned long lastCheck = 0;                    // Timestamp of last API call
			const unsigned long checkInterval = 60000;      // Check every minute (60000 milliseconds)
			
			// Store current epoch number
			int currentEpoch = 0;

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
				
				// Perform initial epoch data fetch on startup
				fetchEpochData();
			}

			void loop() {
				// Check if WiFi connection is still active
				if (WiFi.status() != WL_CONNECTED) {
					WiFi.reconnect();
				}
				
				// Get current time in milliseconds
				unsigned long currentMillis = millis();
				
				// Check if enough time has passed since last API call
				if (currentMillis - lastCheck >= checkInterval) {
					fetchEpochData();
					lastCheck = currentMillis;  // Update last check timestamp
				}
			}

			void fetchEpochData() {
				// Only proceed if WiFi is connected
				if (WiFi.status() == WL_CONNECTED) {
					HTTPClient http;
					WiFiClientSecure client;
					
					// For HTTPS, we need to skip certificate validation (simplest approach)
					// In production, you should use proper certificate validation
					client.setInsecure();
					
					// Initialize HTTP client with API URL and secure client
					http.begin(client, apiUrl);
					
					// Send GET request (tip endpoint doesn't need POST)
					int httpResponseCode = http.GET();
					
					// Check if request was successful
					if (httpResponseCode > 0) {
						// Get response body as string
						String response = http.getString();
						
						// Create JSON document to parse response
						DynamicJsonDocument doc(1024);
						DeserializationError error = deserializeJson(doc, response);
						
						// Check if JSON parsing was successful and response has data
						if (!error && doc.is<JsonArray>() && doc.size() > 0) {
							// Get first tip object from array
							JsonObject tip = doc[0];
							
							// Extract epoch number (default to 0 if not found)
							currentEpoch = tip["epoch_no"] | 0;
							
							// Print current epoch to serial monitor
							Serial.print("Current Epoch: ");
							Serial.println(currentEpoch);
						}
					}
					
					// Close HTTP connection
					http.end();
				}
			}`,
		ledBlinkCode: `
			// Include the Adafruit NeoPixel library
			#include <Adafruit_NeoPixel.h>

			// Pin connected to the WS2812 data input
			#define LED_PIN 4
			
			// Number of LEDs in the ring (12 LEDs)
			#define NUM_LEDS 12
			
			// Create NeoPixel object
			// Parameter 1 = number of pixels
			// Parameter 2 = pin number
			// Parameter 3 = pixel type flags (NEO_GRB + NEO_KHZ800 for WS2812)
			Adafruit_NeoPixel strip = Adafruit_NeoPixel(NUM_LEDS, LED_PIN, NEO_GRB + NEO_KHZ800);

			void setup() {
				// Initialize serial communication for debugging
				Serial.begin(115200);
				
				// Initialize the NeoPixel ring
				strip.begin();
				
				// Set brightness to a very low value (5 out of 255) to protect ESP32-C3
				// This is approximately 2% brightness - safe for USB power
				strip.setBrightness(5);
				
				// Clear all LEDs (turn them all off)
				strip.clear();
				
				// Update the strip to apply changes
				strip.show();
				
				Serial.println("LED Ring initialized. Starting blink sequence...");
			}

			void loop() {
				// Loop through all 12 LEDs one at a time
				for (int i = 0; i < NUM_LEDS; i++) {
					// Clear all LEDs first
					strip.clear();
					
					// Set the current LED to white (R=255, G=255, B=255)
					// The brightness is already limited by setBrightness(5) in setup()
					strip.setPixelColor(i, strip.Color(255, 255, 255));
					
					// Update the strip to show the change
					strip.show();
					
					// Print which LED is lit
					Serial.print("LED ");
					Serial.print(i);
					Serial.println(" ON");
					
					// Wait 200 milliseconds before moving to next LED
					delay(200);
				}
				
				// After all LEDs have been lit, clear the display
				strip.clear();
				strip.show();
			}`
	};
};

