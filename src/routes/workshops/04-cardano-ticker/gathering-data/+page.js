export const load = async () => {
	return {
		nodeApiCode: `
			// Import required Node.js packages
			const express = require('express');              // Web framework for building API
			const cors = require('cors');                   // Enable Cross-Origin Resource Sharing
			const axios = require('axios');                  // HTTP client for making API requests

			// Create Express application instance
			const app = express();
			
			// Server port number
			const PORT = 3000;

			// API endpoints for different data sources
			const REALFI_API = 'https://api.realfi.info/v1/tokens';      // Realfi.info token prices API
			const JPG_STORE_API = 'https://api.jpg.store/v1/collections'; // JPG.store NFT floors API
			const KOIOS_API = 'https://preprod.koios.rest/api/v1';        // Koios Cardano API

			// Middleware: Enable CORS to allow requests from different origins
			app.use(cors());
			
			// Middleware: Parse JSON request bodies
			app.use(express.json());

			// GET endpoint to fetch all ticker data
			// This endpoint aggregates data from multiple sources
			// URL: http://your-server-ip:3000/ticker-data
			app.get('/ticker-data', async (req, res) => {
				try {
					// Fetch data from multiple sources in parallel
					const [walletData, tokenPrices, nftFloors] = await Promise.all([
						fetchWalletData(req.query.address || 'default-address'),  // Wallet address from query param
						fetchTokenPrices(),                                       // Token prices from Realfi
						fetchNFTFloors()                                          // NFT floors from JPG.store
					]);
					
					// Combine all data into single response
					res.json({
						success: true,
						timestamp: new Date().toISOString(),
						wallet: walletData,
						tokens: tokenPrices,
						nfts: nftFloors
					});
				} catch (error) {
					console.error('Error fetching ticker data:', error);
					res.status(500).json({ 
						success: false, 
						error: error.message 
					});
				}
			});

			// Function to fetch wallet data from Koios API
			async function fetchWalletData(address) {
				try {
					// Fetch address information from Koios
					const response = await axios.post(
						\`\${KOIOS_API}/address_info\`,
						{ _addresses: [address] }
					);
					
					if (response.data && response.data.length > 0) {
						const addressInfo = response.data[0];
						
						// Extract relevant wallet information
						return {
							address: address,
							balance: addressInfo.balance / 1000000,  // Convert Lovelace to ADA
							utxos: addressInfo.utxos || [],
							tokens: addressInfo.asset_list || []     // List of tokens in wallet
						};
					}
					
					return { address: address, balance: 0, utxos: [], tokens: [] };
				} catch (error) {
					console.error('Error fetching wallet data:', error);
					return { address: address, balance: 0, utxos: [], tokens: [] };
				}
			}

			// Function to fetch token prices from Realfi.info API
			async function fetchTokenPrices() {
				try {
					// Fetch token prices from Realfi.info
					const response = await axios.get(REALFI_API);
					
					// Extract popular tokens (ADA, popular native tokens)
					const popularTokens = ['ADA', 'AGIX', 'MIN', 'WMT', 'DANA'];
					
					const tokenPrices = response.data
						.filter(token => popularTokens.includes(token.symbol))
						.map(token => ({
							symbol: token.symbol,
							name: token.name,
							price: token.price_usd,
							change24h: token.change_24h || 0
						}));
					
					return tokenPrices;
				} catch (error) {
					console.error('Error fetching token prices:', error);
					return [];
				}
			}

			// Function to fetch NFT floor prices from JPG.store
			async function fetchNFTFloors() {
				try {
					// Fetch NFT collections from JPG.store
					const response = await axios.get(JPG_STORE_API);
					
					// Extract floor prices for popular collections
					const nftFloors = response.data
						.slice(0, 10)  // Get top 10 collections
						.map(collection => ({
							name: collection.name,
							floorPrice: collection.floor_price || 0,
							volume24h: collection.volume_24h || 0
						}));
					
					return nftFloors;
				} catch (error) {
					console.error('Error fetching NFT floors:', error);
					return [];
				}
			}

			// Health check endpoint
			app.get('/health', (req, res) => {
				res.json({ status: 'ok', timestamp: new Date().toISOString() });
			});

			// Start server and listen on specified port
			app.listen(PORT, () => {
				console.log(\`Ticker API server running on http://localhost:\${PORT}\`);
			});`,
		arduinoFetchCode: `
			// Include necessary libraries
			#include <WiFi.h>              // WiFi connectivity
			#include <HTTPClient.h>       // HTTP client for API calls
			#include <ArduinoJson.h>      // JSON parsing

			// WiFi credentials - replace with your network details
			const char* ssid = "Your SSID";
			const char* password = "Your Password";
			
			// Your Node.js API server URL
			// Replace 'your-server-ip' with your computer's IP address
			const char* apiUrl = "http://your-server-ip:3000/ticker-data";

			// Variables for timing API calls
			unsigned long lastFetch = 0;                    // Timestamp of last data fetch
			const unsigned long fetchInterval = 30000;      // Fetch every 30 seconds

			// Structure to store ticker data
			struct TickerData {
				float adaPrice;
				float walletBalance;
				int tokenCount;
			} tickerData;

			void setup() {
				// Initialize serial communication for debugging
				Serial.begin(115200);
				
				// Start WiFi connection
				WiFi.begin(ssid, password);
				while (WiFi.status() != WL_CONNECTED) {
					delay(1000);
					Serial.println("Connecting to WiFi...");
				}
				Serial.println("Connected to WiFi");
				Serial.print("IP address: ");
				Serial.println(WiFi.localIP());
				
				// Initial data fetch
				fetchTickerData();
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
				
				// Check if enough time has passed since last fetch
				if (currentMillis - lastFetch >= fetchInterval) {
					fetchTickerData();
					lastFetch = currentMillis;  // Update last fetch timestamp
				}
			}

			void fetchTickerData() {
				// Only proceed if WiFi is connected
				if (WiFi.status() == WL_CONNECTED) {
					HTTPClient http;
					
					// Initialize HTTP client with API URL
					http.begin(apiUrl);
					
					// Send GET request
					int httpResponseCode = http.GET();
					
					// Check if request was successful
					if (httpResponseCode > 0) {
						// Get response body as string
						String response = http.getString();
						Serial.println("HTTP Response Code: " + String(httpResponseCode));
						
						// Create JSON document to parse response (large buffer for complex data)
						DynamicJsonDocument doc(8192);
						DeserializationError error = deserializeJson(doc, response);
						
						// Check if JSON parsing was successful
						if (!error) {
							// Extract wallet balance
							if (doc.containsKey("wallet")) {
								tickerData.walletBalance = doc["wallet"]["balance"] | 0.0;
							}
							
							// Extract ADA price from tokens array
							if (doc.containsKey("tokens") && doc["tokens"].is<JsonArray>()) {
								JsonArray tokens = doc["tokens"];
								for (JsonObject token : tokens) {
									if (token["symbol"] == "ADA") {
										tickerData.adaPrice = token["price"] | 0.0;
										break;
									}
								}
							}
							
							// Count number of tokens
							if (doc.containsKey("tokens")) {
								tickerData.tokenCount = doc["tokens"].size();
							}
							
							// Print parsed data to serial monitor
							Serial.println("ADA Price: $" + String(tickerData.adaPrice, 2));
							Serial.println("Wallet Balance: " + String(tickerData.walletBalance, 2) + " ADA");
							Serial.println("Token Count: " + String(tickerData.tokenCount));
						} else {
							Serial.print("JSON parsing failed: ");
							Serial.println(error.c_str());
						}
					} else {
						Serial.println("Error in HTTP request");
						Serial.println("HTTP Response Code: " + String(httpResponseCode));
					}
					
					// Close HTTP connection
					http.end();
				} else {
					Serial.println("WiFi not connected");
				}
			}`
	};
};

