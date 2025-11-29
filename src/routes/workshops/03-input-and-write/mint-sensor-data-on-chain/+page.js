export const load = async () => {
	return {
		arduinoPostSensorCode: `
			// Include necessary libraries
			#include <WiFi.h>              // WiFi connectivity
			#include <HTTPClient.h>       // HTTP client for API calls
			#include <ArduinoJson.h>      // JSON parsing and creation
			#include <SHT2x.h>            // SHT21 sensor library

			// I2C pins for SHT21 sensor
			#define SDA_PIN 3             // I2C data line
			#define SCL_PIN 4              // I2C clock line

			// Create SHT2x sensor object
			SHT2x sht;

			// WiFi credentials - replace with your network details
			const char* ssid = "Your SSID";
			const char* password = "Your Password";
			
			// Your API server URL - replace with your server's IP address
			const char* apiUrl = "http://YOUR_SERVER_IP:3000/sensor-data";

			// Variables for timing sensor readings
			unsigned long lastReading = 0;                    // Timestamp of last reading
			const unsigned long readingInterval = 10000;      // Read every 10 seconds (10000 milliseconds)

			void setup() {
				// Initialize serial communication for debugging
				Serial.begin(115200);
				
				// Initialize I2C bus
				Wire.begin(SDA_PIN, SCL_PIN);
				
				// Initialize SHT21 sensor
				sht.begin();
				
				// Start WiFi connection
				WiFi.begin(ssid, password);
				while (WiFi.status() != WL_CONNECTED) {
					delay(1000);
					Serial.println("Connecting to WiFi...");
				}
				Serial.println("Connected to WiFi");
				Serial.print("IP Address: ");
				Serial.println(WiFi.localIP());
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
				
				// Check if enough time has passed since last reading
				if (currentMillis - lastReading >= readingInterval) {
					sendSensorData();  // Read sensor and send to API
					lastReading = currentMillis;  // Update last reading timestamp
				}
			}

			void sendSensorData() {
				// Read temperature from SHT21 sensor
				float temperature = sht.getTemperature();
				
				// Read humidity from SHT21 sensor
				float humidity = sht.getHumidity();
				
				// Check if sensor reads failed
				if (sht.getError() != 0) {
					Serial.println("Failed to read from SHT21 sensor!");
					return;  // Exit function if read failed
				}
				
				// Print sensor readings to serial monitor
				Serial.print("Temperature: ");
				Serial.print(temperature, 2);
				Serial.println(" °C");
				Serial.print("Humidity: ");
				Serial.print(humidity, 2);
				Serial.println(" %RH");
				
				// Only proceed if WiFi is connected
				if (WiFi.status() == WL_CONNECTED) {
					HTTPClient http;
					
					// Initialize HTTP client with API URL
					http.begin(apiUrl);
					
					// Set content type header for JSON request
					http.addHeader("Content-Type", "application/json");
					
					// Create JSON document to build request payload
					DynamicJsonDocument doc(512);
					
					// Add sensor data to JSON document
					doc["temperature"] = temperature;    // Temperature in Celsius
					doc["humidity"] = humidity;          // Humidity in %RH
					doc["timestamp"] = millis();         // Current time in milliseconds
					doc["sensor_type"] = "SHT21";        // Sensor type identifier
					
					// Serialize JSON document to string
					String jsonPayload;
					serializeJson(doc, jsonPayload);
					
					Serial.println("Sending data to API...");
					Serial.println("Payload: " + jsonPayload);
					
					// Send POST request to API
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
		meshMintCode: `
			// Import required Node.js packages
			import express from 'express';
			import cors from 'cors';
			import { KoiosProvider, MeshWallet, MeshTxBuilder, ForgeScript, resolveScriptHash, stringToHex } from '@meshsdk/core';

			// Create Express application instance
			const app = express();
			
			// Server port number
			const PORT = 3000;

			// Initialize Koios provider for Preprod Testnet
			// Koios is free to use and doesn't require an API key
			const provider = new KoiosProvider('preprod');

			// Initialize wallet using mnemonic from environment variable
			// IMPORTANT: Store your mnemonic in an environment variable, never in code!
			const mnemonic = process.env.WALLET_MNEMONIC?.split(' ') || [];
			
			if (mnemonic.length === 0) {
				console.warn('Warning: WALLET_MNEMONIC not set. Minting functionality will not work.');
			}

			const wallet = new MeshWallet({
				networkId: 0,  // 0 = testnet
				fetcher: provider,
				submitter: provider,
				key: {
					type: 'mnemonic',
					words: mnemonic
				}
			});

			// Middleware: Enable CORS to allow requests from different origins
			app.use(cors());
			
			// Middleware: Parse JSON request bodies
			app.use(express.json());

			// POST endpoint to receive sensor data and mint NFT
			// URL: http://localhost:3000/sensor-data
			app.post('/sensor-data', async (req, res) => {
				try {
					if (mnemonic.length === 0) {
						return res.status(400).json({ 
							success: false, 
							error: 'Wallet mnemonic not configured. Set WALLET_MNEMONIC environment variable.' 
						});
					}

					// Extract sensor data from request body
					const { temperature, humidity, timestamp, sensor_type } = req.body;
					
					// Validate required fields
					if (temperature === undefined || humidity === undefined) {
						return res.status(400).json({ 
							success: false, 
							error: 'temperature and humidity are required' 
						});
					}

					console.log('Received sensor data:', { temperature, humidity, timestamp, sensor_type });

					// Get wallet UTXOs and change address
					const utxos = await wallet.getUtxos();
					const changeAddress = await wallet.getChangeAddress();
					
					// Create forging script for minting
					// This creates a simple policy that allows minting from the wallet address
					const forgingScript = ForgeScript.withOneSignature(changeAddress);
					const policyId = resolveScriptHash(forgingScript);
					
					// Create unique token name based on timestamp
					const tokenName = \`SensorData_\${timestamp || Date.now()}\`;
					const tokenNameHex = stringToHex(tokenName);
					
					// Create NFT metadata following CIP-25 standard (label 721)
					const assetMetadata = {
						name: \`Sensor Data NFT - \${new Date().toISOString()}\`,
						description: \`Temperature and humidity sensor data from \${sensor_type || 'SHT21'} sensor\`,
						temperature: temperature,
						humidity: humidity,
						timestamp: timestamp || Date.now(),
						sensor_type: sensor_type || 'SHT21'
					};
					
					// Structure metadata according to CIP-25 standard
					const metadata = {
						[policyId]: {
							[tokenName]: assetMetadata
						}
					};

					// Initialize MeshTxBuilder
					const txBuilder = new MeshTxBuilder({
						fetcher: provider,
						verbose: true
					});
					
					// Build the minting transaction
					const unsignedTx = await txBuilder
						.mint("1", policyId, tokenNameHex)  // Mint 1 token
						.mintingScript(forgingScript)         // Use the forging script
						.metadataValue(721, metadata)         // Attach NFT metadata (CIP-25 standard)
						.changeAddress(changeAddress)        // Address to receive change
						.selectUtxosFrom(utxos)              // Select UTXOs to fund the transaction
						.complete();
					
					// Sign the transaction with your wallet
					const signedTx = await wallet.signTx(unsignedTx);
					
					// Submit the transaction to the network
					const txHash = await wallet.submitTx(signedTx);
					
					console.log('NFT minted successfully!');
					console.log('Transaction Hash:', txHash);
					
					res.json({ 
						success: true, 
						message: 'Sensor data received and NFT minted successfully',
						txHash: txHash,
						explorerUrl: \`https://preprod.cardanoscan.io/transaction/\${txHash}\`,
						policyId: policyId,
						tokenName: tokenName,
						metadata: assetMetadata
					});
				} catch (error) {
					console.error('Error minting NFT:', error);
					res.status(500).json({ success: false, error: error.message });
				}
			});

			// GET endpoint for health check
			app.get('/health', (req, res) => {
				res.json({ status: 'ok', timestamp: new Date().toISOString() });
			});

			// Start server and listen on specified port
			app.listen(PORT, () => {
				console.log(\`Server running on http://localhost:\${PORT}\`);
				console.log('POST sensor data to: http://localhost:' + PORT + '/sensor-data');
			});`
	};
};
