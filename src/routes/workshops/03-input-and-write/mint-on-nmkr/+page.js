export const load = async () => {
	return {
		nmkrApiCode: `
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
			
			// NMKR API endpoint for minting NFTs
			const char* nmkrApiUrl = "https://api.nmkr.io/v2/mint";
			
			// Your NMKR API key (get from nmkr.io dashboard)
			const char* nmkrApiKey = "your-nmkr-api-key";

			// Variables for timing NFT mints
			unsigned long lastMint = 0;                    // Timestamp of last mint
			const unsigned long mintInterval = 300000;     // Mint every 5 minutes (300000 milliseconds)

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
				
				// Check if enough time has passed since last mint
				if (currentMillis - lastMint >= mintInterval) {
					mintNFT();  // Mint NFT with current sensor data
					lastMint = currentMillis;  // Update last mint timestamp
				}
			}

			void mintNFT() {
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
					
					// Initialize HTTP client with NMKR API URL
					http.begin(nmkrApiUrl);
					
					// Set content type header for JSON request
					http.addHeader("Content-Type", "application/json");
					
					// Set NMKR API key in header (required for authentication)
					http.addHeader("X-API-KEY", nmkrApiKey);
					
					// Create JSON document to build mint request payload
					DynamicJsonDocument doc(1024);
					
					// Set project ID (get from NMKR dashboard)
					doc["projectId"] = "your-project-id";
					
					// Set wallet address to receive the minted NFT
					doc["receiverAddress"] = "addr_test1...";  // Your Cardano wallet address
					
					// Create nested metadata object with sensor data
					JsonObject metadata = doc.createNestedObject("metadata");
					metadata["temperature"] = String(t, 2);    // Temperature with 2 decimal places
					metadata["humidity"] = String(h, 2);       // Humidity with 2 decimal places
					metadata["timestamp"] = String(millis());  // Current time in milliseconds
					metadata["name"] = "Sensor Data NFT";       // NFT name
					metadata["description"] = "NFT minted with temperature and humidity data";  // NFT description
					
					// Serialize JSON document to string
					String jsonPayload;
					serializeJson(doc, jsonPayload);
					
					// Send POST request to NMKR API
					int httpResponseCode = http.POST(jsonPayload);
					
					// Check if request was successful
					if (httpResponseCode > 0) {
						// Get response body
						String response = http.getString();
						Serial.println("HTTP Response Code: " + String(httpResponseCode));
						Serial.println("Response: " + response);
					} else {
						// Print error if request failed
						Serial.println("Error in HTTP request");
						Serial.println("HTTP Response Code: " + String(httpResponseCode));
					}
					
					// Close HTTP connection
					http.end();
				}
			}`,
		nodeNmkrCode: `
			// Import required Node.js packages
			const express = require('express');  // Web framework for building API
			const cors = require('cors');        // Enable Cross-Origin Resource Sharing
			const axios = require('axios');       // HTTP client for making requests to NMKR

			// Create Express application instance
			const app = express();
			
			// Server port number
			const PORT = 3000;

			// NMKR API configuration
			const NMKR_API_URL = 'https://api.nmkr.io/v2';  // NMKR API base URL
			const NMKR_API_KEY = 'your-nmkr-api-key';       // Your NMKR API key (get from nmkr.io)

			// Middleware: Enable CORS to allow requests from different origins
			app.use(cors());
			
			// Middleware: Parse JSON request bodies
			app.use(express.json());

			// POST endpoint to mint NFT via NMKR
			// This endpoint receives sensor data from microcontroller and forwards it to NMKR
			// URL: http://your-server-ip:3000/mint-nft
			app.post('/mint-nft', async (req, res) => {
				try {
					// Extract sensor data and wallet address from request body
					const { temperature, humidity, receiverAddress } = req.body;
					
					// Build mint request payload for NMKR API
					const mintData = {
						projectId: 'your-project-id',              // Your NMKR project ID
						receiverAddress: receiverAddress,           // Wallet address to receive NFT
						metadata: {
							temperature: temperature,                // Temperature reading
							humidity: humidity,                     // Humidity reading
							timestamp: new Date().toISOString(),    // Current timestamp in ISO format
							name: 'Sensor Data NFT',                // NFT name
							description: 'NFT minted with temperature and humidity data from microcontroller'  // NFT description
						}
					};
					
					// Send POST request to NMKR API
					const response = await axios.post(
						\`\${NMKR_API_URL}/mint\`,  // Full URL: https://api.nmkr.io/v2/mint
						mintData,                  // Request body with mint data
						{
							headers: {
								'Content-Type': 'application/json',  // JSON content type
								'X-API-KEY': NMKR_API_KEY           // API key for authentication
							}
						}
					);
					
					// Return success response with NMKR API response data
					res.json({ 
						success: true, 
						data: response.data 
					});
				} catch (error) {
					// Handle errors
					// error.response?.data contains error details from NMKR API if available
					console.error('Error:', error.response?.data || error.message);
					
					// Return error response
					res.status(500).json({ 
						success: false, 
						error: error.response?.data || error.message 
					});
				}
			});

			// Start server and listen on specified port
			app.listen(PORT, () => {
				console.log(\`Server running on http://localhost:\${PORT}\`);
			});`
	};
};

