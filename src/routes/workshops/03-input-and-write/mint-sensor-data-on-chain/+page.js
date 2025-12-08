import { findWorkshopStep } from '$lib/utils/workshop-utils.js';

export const load = async ({ url }) => {
	const { workshop, step } = findWorkshopStep(url.pathname);

	return {
		workshop,
		step,
		arduinoPostSensorCode: `
			// Include necessary libraries
			#include <WiFi.h>              // WiFi connectivity
			#include <HTTPClient.h>       // HTTP client for API calls
			#include <ArduinoJson.h>      // JSON parsing and creation
			#include <Adafruit_AHT10.h>   // Adafruit AHT10 library

			// Create AHT10 sensor object
			Adafruit_AHT10 aht;

			// WiFi credentials - replace with your network details
			const char* ssid = "Your SSID";
			const char* password = "Your Password";
			
			// Your API server URL - replace with your server's IP address
			const char* apiUrl = "http://YOUR_SERVER_IP:3000/data";

			// Variables for timing sensor readings
			unsigned long lastReading = 0;                    // Timestamp of last reading
			const unsigned long readingInterval = 300000;     // Read every 5 minutes (300000 milliseconds)
			
			// Send once flag - set to true for testing to avoid creating too many transactions
			const bool sendOnce = true;                       // If true, send sensor data only once
			bool dataSent = false;                            // Track if data has been sent

			void setup() {
				// Initialize serial communication for debugging
				Serial.begin(115200);
				Serial.println("Temperature Sensor NFT Demo!");
				
				// Initialize AHT10 sensor
				if (!aht.begin()) {
					Serial.println("Could not find AHT10? Check wiring");
					while (1) delay(10);  // Halt if sensor not found
				}
				Serial.println("AHT10 found");
				
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
					// Only send if sendOnce is false, or if sendOnce is true and data hasn't been sent yet
					if (!sendOnce || !dataSent) {
						sendSensorData();  // Read sensor and send to API
						dataSent = true;   // Mark that data has been sent
					}
					lastReading = currentMillis;  // Update last reading timestamp
				}
			}

			void sendSensorData() {
				// Create sensor event structures to hold readings
				sensors_event_t humidity_event, temp_event;
				
				// Read both temperature and humidity from sensor
				// The getEvent() function populates temp and humidity objects with fresh data
				aht.getEvent(&humidity_event, &temp_event);
				
				// Extract temperature and humidity values
				float temperature = temp_event.temperature;        // Temperature in Celsius
				float humidity = humidity_event.relative_humidity;  // Humidity as percentage (0-100)
				
				// Print sensor readings to serial monitor
				Serial.print("Temperature: ");
				Serial.print(temperature);
				Serial.println(" degrees C");
				Serial.print("Humidity: ");
				Serial.print(humidity);
				Serial.println("% rH");
				
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
					doc["humidity"] = humidity;          // Humidity as percentage (0-100)
					doc["timestamp"] = millis();         // Current time in milliseconds
					
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

			// Initialize wallet using mnemonic
			// IMPORTANT: Replace these words with your actual wallet mnemonic phrase
			// NEVER share your mnemonic with anyone or commit it to GitHub!
			const mnemonic = ["word1", "word2", "word3", "word4", "word5", "word6", "word7", "word8", "word9", "word10", "word11", "word12"];

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
			// URL: http://localhost:3000/data
			app.post('/data', async (req, res) => {
				try {
					// Extract sensor data from request body
					const { temperature, humidity, timestamp } = req.body;
					
					// Validate required fields
					if (temperature === undefined || humidity === undefined) {
						return res.status(400).json({ 
							success: false, 
							error: 'temperature and humidity are required' 
						});
					}

					console.log('Received sensor data:', { temperature, humidity, timestamp });

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
						image: "https://cardanothings.io/nft.png",
						mediaType: "image/png",
						description: 'Temperature and humidity sensor data',
						author: "A CardanoThings.io User",
						temperature: temperature.toString(),
						humidity: humidity.toString(),
						timestamp: timestamp || Date.now()
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
				console.log('POST sensor data to: http://localhost:' + PORT + '/data');
			});`,
		mintFirstNftCode: `
			// Import Mesh SDK components needed for minting NFTs
			// KoiosProvider: Connects to Cardano blockchain to read and submit data
			// MeshWallet: Represents your wallet and handles signing transactions
			// MeshTxBuilder: Builds blockchain transactions step by step
			// ForgeScript: Creates the policy script that controls who can mint NFTs
			// resolveScriptHash: Converts the policy script into a Policy ID
			// stringToHex: Converts text names into hexadecimal format for blockchain
			import { KoiosProvider, MeshWallet } from '@meshsdk/core';
			import { MeshTxBuilder, ForgeScript, resolveScriptHash, stringToHex } from '@meshsdk/core';

			// Step 1: Set up the blockchain provider
			// This connects you to the Cardano network
			// 'preprod' = testnet (free, for testing), 'api' = mainnet (real money)
			const provider = new KoiosProvider('preprod');

			// Step 2: Set up your wallet
			// IMPORTANT: Replace these words with your actual wallet mnemonic phrase
			// NEVER share your mnemonic with anyone or commit it to GitHub!
			// In production, use environment variables: process.env.WALLET_MNEMONIC?.split(' ')
			const mnemonic = ["word1", "word2", "word3", "word4", "word5", "word6", "word7", "word8", "word9", "word10", "word11", "word12"];

			// Step 3: Create your wallet instance
			// This wallet will be used to sign transactions and interact with the blockchain
			const wallet = new MeshWallet({
				networkId: 0,        // 0 = testnet (Preprod), 1 = mainnet
				fetcher: provider,   // Provider for reading blockchain data (like your balance)
				submitter: provider, // Provider for sending transactions to the network
				key: {
					type: 'mnemonic',  // We're using a mnemonic phrase (12 or 24 words)
					words: mnemonic    // Your wallet's mnemonic words
				}
			});

			// Step 4: Initialize the wallet
			// This loads your wallet's information from the blockchain
			await wallet.init();

			// Step 5: Get your wallet's UTXOs (Unspent Transaction Outputs)
			// UTXOs are like coins in your wallet - they represent available funds
			// We need these to pay for the transaction fees
			const utxos = await wallet.getUtxos();

			// Step 6: Get your change address
			// This is your wallet address where any leftover funds will be sent back
			const changeAddress = await wallet.getChangeAddress();

			// Step 7: Create a forging script (minting policy)
			// This script defines who can mint NFTs from this collection
			// withOneSignature means only your wallet can mint NFTs with this policy
			const forgingScript = ForgeScript.withOneSignature(changeAddress);

			// Step 8: Prepare the NFT metadata
			// This is the information that will be stored in your NFT
			// It can include name, description, image, and any custom data
			const demoAssetMetadata = {
				name: "Sensor Data NFT - 2024-01-15T10:30:00Z",  // Name of your NFT
				image: "https://cardanothings.io/nft.png",      // URL to the NFT image
				mediaType: "image/png",                          // Type of image file
				description: "Temperature and humidity sensor data",  // Description of the NFT
				author: "A CardanoThings.io User",              // Who created this NFT
				temperature: "23.5",                            // Sensor reading: temperature
				humidity: "65.2",                               // Sensor reading: humidity
				timestamp: Date.now(),                           // When this data was recorded
			};

			// Step 9: Generate the Policy ID
			// The Policy ID is a unique identifier for your NFT collection
			// All NFTs minted with the same policy belong to the same collection
			const policyId = resolveScriptHash(forgingScript);
			console.log("Policy ID:", policyId);

			// Step 10: Create a unique token name
			// Each NFT needs a unique name within the collection
			// We add a timestamp to make sure each NFT has a different name
			const tokenName = "TemperatureNFT" + Date.now().toString();
			
			// Step 11: Convert token name to hexadecimal
			// Blockchain requires names to be in hexadecimal format (base 16)
			const tokenNameHex = stringToHex(tokenName);

			// Step 12: Structure the metadata according to CIP-25 standard
			// CIP-25 is the Cardano standard for NFT metadata
			// The structure is: { policyId: { tokenName: { metadata } } }
			const metadata = { 
				[policyId]: { 
					[tokenName]: { ...demoAssetMetadata } 
				} 
			};

			// Step 13: Create a transaction builder
			// This tool helps us build the minting transaction step by step
			const txBuilder = new MeshTxBuilder({
				fetcher: provider,   // Provider for fetching blockchain data
				verbose: false,     // Set to true for detailed logging (helpful for debugging)
			});

			// Step 14: Build the minting transaction
			// This creates the transaction that will mint your NFT
			const unsignedTx = await txBuilder
				.mint("1", policyId, tokenNameHex)      // Mint 1 NFT with the given policy and name
				.mintingScript(forgingScript)            // Use our policy script
				.metadataValue(721, metadata)           // Attach metadata (721 is the CIP-25 standard label)
				.changeAddress(changeAddress)           // Where to send any leftover funds
				.selectUtxosFrom(utxos)                 // Which UTXOs to use for payment
				.complete();                             // Finish building the transaction

			// Step 15: Sign the transaction
			// Your wallet signs the transaction to prove you authorized it
			// This is like signing a check - it proves the transaction came from you
			const signedTx = await wallet.signTx(unsignedTx);

			// Step 16: Submit the transaction to the blockchain
			// This sends your transaction to the Cardano network
			// The network will process it and create your NFT
			const txHash = await wallet.submitTx(signedTx);

			// Step 17: Check if the transaction was successful
			// If txHash exists, the transaction was submitted successfully
			if (txHash) {
				console.log("Transaction submitted successfully!");
				console.log("Transaction Hash:", txHash);
				// You can view your transaction on the Cardano explorer
				console.log("View on Cardano Explorer:", \`https://preprod.cardanoscan.io/transaction/\${txHash}\`);
			} else {
				console.error("Transaction submission failed!");
			}`,
		burnNftCode: `
			// Import Mesh SDK components needed for burning NFTs
			import { KoiosProvider, MeshWallet } from '@meshsdk/core';
			import { MeshTxBuilder, ForgeScript, resolveScriptHash, stringToHex } from '@meshsdk/core';

			// IMPORTANT: Replace these words with your actual wallet mnemonic phrase
			// NEVER share your mnemonic with anyone or commit it to GitHub!
			const mnemonic = ["word1", "word2", "word3", "word4", "word5", "word6", "word7", "word8", "word9", "word10", "word11", "word12"];

			// The exact name of the token you want to burn
			// This should match the tokenName used when minting the NFT
			const tokenName = ""; // Replace with your token name, e.g., "SensorData_1705312200000"

			// Initialize Koios provider for Preprod Testnet
			const provider = new KoiosProvider('preprod');

			// Create MeshWallet instance
			// This wallet will be used to interact with the Cardano blockchain
			const wallet = new MeshWallet({
				networkId: 0,  // 0 = testnet (Preprod), 1 = mainnet
				fetcher: provider,  // Provider for fetching blockchain data
				submitter: provider,  // Provider for submitting transactions
				key: {
					type: 'mnemonic',  // Wallet key type: mnemonic phrase
					words: mnemonic  // Array of mnemonic words
				}
			});

			// Initialize the wallet to load its information from the blockchain
			await wallet.init();

			// Get wallet UTXOs (Unspent Transaction Outputs) - these are like coins in your wallet
			const utxos = await wallet.getUtxos();
			
			// Get the change address where any leftover funds will be sent back
			const changeAddress = await wallet.getChangeAddress();
			
			// Create forging script for the policy
			// This must match the policy used when minting the NFT
			const forgingScript = ForgeScript.withOneSignature(changeAddress);
			
			// Generate the Policy ID from the forging script
			const policyId = resolveScriptHash(forgingScript);
			
			// Convert token name to hexadecimal format (required by blockchain)
			const tokenNameHex = stringToHex(tokenName);

			// Initialize transaction builder
			const txBuilder = new MeshTxBuilder({
				fetcher: provider, // Provider for fetching blockchain data
				verbose: false, // Set to true for detailed debugging information during transaction building
			});

			// Build the burn transaction
			// Minting "-1" is the same as burning 1 token
			const unsignedTx = await txBuilder
				.mint("-1", policyId, tokenNameHex)  // Mint -1 token (burns 1 token)
				.mintingScript(forgingScript)         // Use the same policy script
				.changeAddress(changeAddress)        // Address to receive change
				.selectUtxosFrom(utxos)               // Select UTXOs to fund the transaction
				.complete();

			// Sign the transaction with your wallet
			const signedTx = await wallet.signTx(unsignedTx);

			// Submit the transaction to the blockchain
			const txHash = await wallet.submitTx(signedTx);

			// Log the transaction hash - you can view it on the Cardano explorer
			if (txHash) {
				console.log("Transaction submitted successfully!");
				console.log("Transaction Hash:", txHash);
				console.log("View on Cardano Explorer:", \`https://preprod.cardanoscan.io/transaction/\${txHash}\`);
			} else {
				console.error("Transaction submission failed!");
			}`
	};
};
