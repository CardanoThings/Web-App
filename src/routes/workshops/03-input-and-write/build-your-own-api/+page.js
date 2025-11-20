export const load = async () => {
	return {
		nodeApiCode: `
			// Import required Node.js packages
			const express = require('express');              // Web framework for building API
			const cors = require('cors');                   // Enable Cross-Origin Resource Sharing
			const axios = require('axios');                  // HTTP client for making requests
			const { BlockFrostAPI } = require('@blockfrost/blockfrost-js');  // Blockfrost SDK

			// Create Express application instance
			const app = express();
			
			// Server port number
			const PORT = 3000;

			// Initialize Blockfrost API client
			// Get your API key from blockfrost.io (free tier available)
			const API = new BlockFrostAPI({
				projectId: 'your-blockfrost-api-key',  // Your Blockfrost project API key
				network: 'preprod'                      // Use 'preprod' for testnet, 'mainnet' for mainnet
			});

			// Middleware: Enable CORS to allow requests from different origins
			app.use(cors());
			
			// Middleware: Parse JSON request bodies
			app.use(express.json());

			// POST endpoint to receive sensor data from microcontroller
			// URL: http://your-server-ip:3000/sensor-data
			app.post('/sensor-data', async (req, res) => {
				try {
					// Extract sensor data from request body
					const { temperature, humidity, timestamp } = req.body;
					
					// Log received data to console for debugging
					console.log('Received sensor data:', { temperature, humidity, timestamp });
					
					// NOTE: This is a simplified example
					// Actual NFT minting requires:
					// 1. Building a Cardano transaction
					// 2. Creating metadata for the NFT
					// 3. Signing the transaction with a wallet or private key
					// 4. Submitting the signed transaction to the network
					// This is complex and requires Cardano serialization libraries
					
					// Return success response to microcontroller
					res.json({ 
						success: true, 
						message: 'Data received. Mint transaction will be created.',
						data: { temperature, humidity, timestamp }
					});
				} catch (error) {
					// Handle errors and return error response
					console.error('Error:', error);
					res.status(500).json({ success: false, error: error.message });
				}
			});

			// GET endpoint for health check
			// Useful for testing if server is running
			// URL: http://your-server-ip:3000/health
			app.get('/health', (req, res) => {
				res.json({ status: 'ok', timestamp: new Date().toISOString() });
			});

			// Start server and listen on specified port
			app.listen(PORT, () => {
				console.log(\`Server running on http://localhost:\${PORT}\`);
			});`,
		packageJson: `
			{
				"name": "cardano-sensor-api",
				"version": "1.0.0",
				"description": "API to mint NFTs with sensor data",
				"main": "server.js",
				"scripts": {
					"start": "node server.js"
				},
				"dependencies": {
					"express": "^4.18.2",
					"cors": "^2.8.5",
					"axios": "^1.6.0",
					"@blockfrost/blockfrost-js": "^6.0.0"
				}
			}`,
		arduinoApiCall: `
			// Include necessary libraries
			#include <WiFi.h>              // WiFi connectivity
			#include <HTTPClient.h>       // HTTP client for API calls
			#include <ArduinoJson.h>      // JSON parsing and creation
			#include <DHT.h>               // DHT sensor library

			// DHT sensor pin configuration
			#define DHTPIN 4               // Digital GPIO pin connected to DHT22 data pin
			#define DHTTYPE DHT22          // Sensor type: DHT22

			// Create DHT sensor object
			DHT dht(DHTPIN, DHTTYPE);

			// WiFi credentials - replace with your network details
			const char* ssid = "Your SSID";
			const char* password = "Your Password";
			
			// Your Node.js API server URL
			// Replace 'your-server-ip' with your computer's IP address on local network
			const char* apiUrl = "http://your-server-ip:3000/sensor-data";

			// Variables for timing data sends
			unsigned long lastSend = 0;                    // Timestamp of last data send
			const unsigned long sendInterval = 60000;      // Send every minute (60000 milliseconds)

			void setup() {
				// Initialize serial communication for debugging
				Serial.begin(115200);
				
				// Initialize DHT sensor
				dht.begin();
				
				// Start WiFi connection
				WiFi.begin(ssid, password);
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
				
				// Check if enough time has passed since last send
				if (currentMillis - lastSend >= sendInterval) {
					sendSensorData();  // Send data to API
					lastSend = currentMillis;  // Update last send timestamp
				}
			}

			void sendSensorData() {
				// Read humidity from DHT sensor
				float h = dht.readHumidity();
				
				// Read temperature from DHT sensor
				float t = dht.readTemperature();
				
				// Check if sensor reads failed
				if (isnan(h) || isnan(t)) {
					Serial.println("Failed to read from DHT sensor!");
					return;  // Exit function if read failed
				}
				
				// Only proceed if WiFi is connected
				if (WiFi.status() == WL_CONNECTED) {
					HTTPClient http;
					
					// Initialize HTTP client with API URL
					http.begin(apiUrl);
					
					// Set content type header for JSON request
					http.addHeader("Content-Type", "application/json");
					
					// Create JSON document to build payload
					DynamicJsonDocument doc(256);
					doc["temperature"] = t;           // Add temperature value
					doc["humidity"] = h;              // Add humidity value
					doc["timestamp"] = millis();      // Add current time in milliseconds
					
					// Serialize JSON document to string
					String jsonPayload;
					serializeJson(doc, jsonPayload);
					
					// Send POST request with JSON payload
					int httpResponseCode = http.POST(jsonPayload);
					
					// Check if request was successful
					if (httpResponseCode > 0) {
						// Get response body
						String response = http.getString();
						Serial.println("HTTP Response Code: " + String(httpResponseCode));
						Serial.println("Response: " + response);
					} else {
						Serial.println("Error in HTTP request");
					}
					
					// Close HTTP connection
					http.end();
				}
			}`,
		touchScreenCode: `
			// Include TFT display library and SPI communication
			#include <TFT_eSPI.h>
			#include <SPI.h>

			// Create TFT display object
			TFT_eSPI tft = TFT_eSPI();

			// Touch screen pin configuration (adjust for your specific display)
			#define TOUCH_CS 2    // Chip Select pin for touch controller
			#define TOUCH_IRQ 15  // Interrupt pin for touch controller

			// Track button press state to prevent multiple triggers
			bool mintButtonPressed = false;

			void setup() {
				// Initialize serial communication for debugging
				Serial.begin(115200);
				
				// Initialize TFT display
				tft.init();
				tft.setRotation(1);        // Set to landscape orientation
				tft.fillScreen(TFT_BLACK);  // Clear screen with black background
				
				// Draw the mint button on screen
				drawMintButton();
			}

			void loop() {
				// Variables to store touch coordinates
				uint16_t x, y;
				
				// Check if screen is being touched
				// getTouch() returns true if touch detected and fills x, y with coordinates
				bool pressed = tft.getTouch(&x, &y);
				
				if (pressed) {
					// Check if touch coordinates are within button area
					// Button area: x from 50 to 190, y from 100 to 140
					if (x > 50 && x < 190 && y > 100 && y < 140) {
						// Only trigger if button wasn't already pressed (debouncing)
						if (!mintButtonPressed) {
							mintButtonPressed = true;
							triggerMint();  // Call mint function
							delay(500);     // Debounce delay to prevent multiple triggers
						}
					}
				} else {
					// Reset button state when touch is released
					mintButtonPressed = false;
				}
			}

			void drawMintButton() {
				// Draw button background (filled blue rectangle)
				// Parameters: x, y, width, height, color
				tft.fillRect(50, 100, 140, 40, TFT_BLUE);
				
				// Draw button border (white rectangle outline)
				tft.drawRect(50, 100, 140, 40, TFT_WHITE);
				
				// Draw button text "MINT NFT"
				tft.setTextSize(2);                    // Medium text size
				tft.setTextColor(TFT_WHITE, TFT_BLUE);  // White text on blue background
				tft.setCursor(70, 110);                // Position text in center of button
				tft.println("MINT NFT");
			}

			void triggerMint() {
				// This function is called when the mint button is pressed
				Serial.println("Mint button pressed!");
				
				// TODO: Add your API call here to send mint request
				// You would typically:
				// 1. Read sensor data
				// 2. Create JSON payload with sensor data
				// 3. Send POST request to your API or NMKR
				// 4. Display success/error message on screen
			}`
	};
};

