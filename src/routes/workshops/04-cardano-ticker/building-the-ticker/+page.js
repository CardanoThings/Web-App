import { findWorkshopStep } from '$lib/utils/workshop-utils.js';

export const load = async ({ url }) => {
	const { workshop, step } = findWorkshopStep(url.pathname);

	return {
		workshop,
		step,
		fetchAllDataCode: `
			// Include necessary libraries for WiFi, HTTP requests, and JSON parsing
			#include <WiFi.h>              // WiFi connectivity library
			#include <HTTPClient.h>       // HTTP client for making API requests
			#include <ArduinoJson.h>      // JSON parsing library

			// ============================================
			// STEP 1: SET UP ALL VARIABLES
			// ============================================
			
			// WiFi credentials - replace with your network details
			const char* ssid = "Your SSID";           // Your WiFi network name
			const char* password = "Your Password";   // Your WiFi password
			
			// Cardano addresses
			// Note: These are example addresses from the CardanoThings.io wallet for demonstration purposes
			// Feel free to use your own addresses when you use this code
			String stakeAddress = "stake1u8l0y82je0t2wkkpps97rv0q7lf882q0fc24gwjz9nacz0c5gt5k3";    // Example stake address from CardanoThings.io wallet
			String walletAddress = "addr1q8xy5cfmccecvvr2z7ns7mzld8qkq73lgwnq7vy3my0s5rl77gw49j7k5advzrqtuxc7pa7jww5q7ns42sayyt8msylsx4k2qx";   // Example wallet address from CardanoThings.io wallet
			
			// Cexplorer.io API key - get this from cexplorer.io after creating an account
			String cexplorerApiKey = "your-api-key-here";
			
			// API endpoints
			const char* koiosApiUrl = "https://api.koios.rest/api/v1/account_info";  // Koios API for wallet balance
			const char* minswapApiUrl = "https://monorepo-mainnet-prod.minswap.org/v1/portfolio/tokens";  // MinSwap API for tokens
			const char* cexplorerApiUrl = "https://api-mainnet-stage.cexplorer.io/v1/policy/detail";  // Cexplorer API for NFT info
			
			// Variables to store fetched data
			float walletBalance = 0.0;                // Store wallet balance in ADA
			int tokenCount = 0;                       // Number of tokens found
			int nftCount = 0;                         // Number of NFTs found
			
			// Array to store policy IDs extracted from MinSwap NFT positions
			// Policy IDs are the currency_symbol values from nft_positions
			String policyIds[10];                     // Store up to 10 policy IDs
			int policyIdCount = 0;                    // Number of policy IDs found

			// ============================================
			// SETUP FUNCTION - Runs once when microcontroller starts
			// ============================================
			void setup() {
				// Initialize serial communication for debugging
				// This allows us to see messages in the Arduino Serial Monitor
				Serial.begin(115200);  // 115200 is the baud rate (speed of communication)
				delay(1000);            // Wait 1 second for serial to initialize
				
				Serial.println("\\n=== Cardano Ticker Data Fetcher ===");
				Serial.println("Starting setup...");
				
				// Connect to WiFi
				connectToWiFi();
				
				// Fetch all data once
				// Note: Later we'll add code to fetch data in intervals
				Serial.println("\\n=== Fetching All Data ===");
				fetchWalletBalance();      // Step 3: Fetch wallet balance from Koios
				fetchMinSwapData();        // Step 4: Fetch tokens and NFTs from MinSwap (extracts policy IDs)
				
				// Step 5: Fetch NFT info from Cexplorer for each policy ID found
				// Policy IDs are extracted from the MinSwap response (currency_symbol field)
				for (int i = 0; i < policyIdCount; i++) {
					Serial.print("\\nFetching info for policy ID ");
					Serial.print(i + 1);
					Serial.print(" of ");
					Serial.println(policyIdCount);
					fetchCexplorerData(policyIds[i]);
				}
				
				if (policyIdCount == 0) {
					Serial.println("\\nNo policy IDs found in MinSwap response, skipping Cexplorer fetch");
				}
				
				Serial.println("\\n=== All Data Fetched Successfully ===");
				Serial.println("Check the output above for all the data.");
			}

			// ============================================
			// LOOP FUNCTION - Runs continuously after setup
			// ============================================
			void loop() {
				// For now, we just check WiFi connection
				// Later we'll add code here to fetch data in intervals
				
				// Check if WiFi connection is still active
				if (WiFi.status() != WL_CONNECTED) {
					Serial.println("WiFi connection lost. Reconnecting...");
					connectToWiFi();
				}
				
				// Small delay to prevent the loop from running too fast
				delay(1000);  // Wait 1 second before checking again
			}

			// ============================================
			// STEP 2: CONNECT TO WIFI
			// ============================================
			void connectToWiFi() {
				Serial.println("\\n--- Connecting to WiFi ---");
				Serial.print("SSID: ");
				Serial.println(ssid);
				
				// Start WiFi connection with credentials
				WiFi.begin(ssid, password);
				
				// Wait until WiFi is connected
				// Keep checking every second until connected
				int attempts = 0;
				while (WiFi.status() != WL_CONNECTED) {
					delay(1000);  // Wait 1 second
					attempts++;
					Serial.print(".");
					
					// Safety check: stop trying after 30 seconds
					if (attempts > 30) {
						Serial.println("\\nWiFi connection failed! Check your credentials.");
						return;
					}
				}
				
				// Successfully connected!
				Serial.println("\\nWiFi Connected!");
				Serial.print("IP Address: ");
				Serial.println(WiFi.localIP());  // Print the IP address assigned to your device
			}

			// ============================================
			// STEP 3: FETCH WALLET BALANCE FROM KOIOS
			// ============================================
			void fetchWalletBalance() {
				Serial.println("\\n--- Fetching Wallet Balance from Koios ---");
				
				// Only proceed if WiFi is connected
				if (WiFi.status() != WL_CONNECTED) {
					Serial.println("Error: WiFi not connected!");
					return;
				}
				
				// Create HTTP client object
				HTTPClient http;
				
				// Initialize HTTP client with Koios API URL
				http.begin(koiosApiUrl);
				
				// Set content type header - tells the server we're sending JSON
				http.addHeader("Content-Type", "application/json");
				
				// Create JSON payload with stake address
				// Koios API expects stake addresses in an array under "_stake_addresses" key
				// We build the JSON string step by step to avoid escaping issues
				String jsonPayload = "{\\"";
				jsonPayload += "_stake_addresses";
				jsonPayload += "\\":[\\"";
				jsonPayload += stakeAddress;
				jsonPayload += "\\"]}";
				
				Serial.println("Sending POST request to Koios...");
				Serial.print("Payload: ");
				Serial.println(jsonPayload);
				
				// Send POST request and get response code
				int httpResponseCode = http.POST(jsonPayload);
				
				// Check if request was successful (response code > 0)
				if (httpResponseCode > 0) {
					Serial.print("HTTP Response Code: ");
					Serial.println(httpResponseCode);
					
					// Get response body as string
					String response = http.getString();
					
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
							
							// Convert from Lovelace to ADA
							// 1 ADA = 1,000,000 Lovelace
							walletBalance = balanceLovelace / 1000000.0;
							
							// Print wallet balance information
							Serial.println("\\n✓ Wallet Balance Fetched Successfully!");
							Serial.print("Stake Address: ");
							Serial.println(accountInfo["stake_address"].as<const char*>());
							Serial.print("Total Balance: ");
							Serial.print(walletBalance, 6);  // Print with 6 decimal places
							Serial.println(" ADA");
						} else {
							Serial.println("Error: Empty response from Koios API");
						}
					} else {
						// Print error if JSON parsing failed
						Serial.print("JSON parsing failed: ");
						Serial.println(error.c_str());
					}
				} else {
					// Print error if HTTP request failed
					Serial.print("Error in HTTP request. Response Code: ");
					Serial.println(httpResponseCode);
				}
				
				// Close HTTP connection
				http.end();
			}

			// ============================================
			// STEP 4: FETCH TOKENS AND NFTS FROM MINSWAP
			// ============================================
			void fetchMinSwapData() {
				Serial.println("\\n--- Fetching Tokens and NFTs from MinSwap ---");
				
				// Only proceed if WiFi is connected
				if (WiFi.status() != WL_CONNECTED) {
					Serial.println("Error: WiFi not connected!");
					return;
				}
				
				// Create HTTP client object
				HTTPClient http;
				
				// Build MinSwap API URL with wallet address as query parameter
				String fullUrl = String(minswapApiUrl);
				fullUrl += "?address=";
				fullUrl += walletAddress;
				fullUrl += "&only_minswap=true&filter_small_value=false";
				
				Serial.print("Requesting: ");
				Serial.println(fullUrl);
				
				// Initialize HTTP client with full URL
				http.begin(fullUrl);
				
				// Send GET request (MinSwap uses GET, not POST)
				Serial.println("Sending GET request to MinSwap...");
				int httpResponseCode = http.GET();
				
				// Check if request was successful
				if (httpResponseCode > 0) {
					Serial.print("HTTP Response Code: ");
					Serial.println(httpResponseCode);
					
					// Get response body as string
					String response = http.getString();
					
					// Create JSON document to parse response (8192 bytes for larger responses)
					DynamicJsonDocument doc(8192);
					DeserializationError error = deserializeJson(doc, response);
					
					// Check if JSON parsing was successful
					if (!error) {
						Serial.println("\\n✓ MinSwap Data Fetched Successfully!");
						
						// Check if response has "positions" object
						if (doc.containsKey("positions")) {
							JsonObject positions = doc["positions"];
							
							// Extract NFT positions
							// The currency_symbol field contains the policy ID we need for Cexplorer
							if (positions.containsKey("nft_positions")) {
								JsonArray nftArray = positions["nft_positions"];
								nftCount = nftArray.size();
								Serial.print("NFTs found: ");
								Serial.println(nftCount);
								
								// Extract policy IDs from currency_symbol field and store them
								// We'll use these policy IDs to fetch NFT collection info from Cexplorer
								policyIdCount = 0;  // Reset counter
								for (int i = 0; i < nftArray.size() && i < 10; i++) {
									JsonObject nft = nftArray[i];
									
									// Get the currency_symbol which is the policy ID
									const char* currencySymbol = nft["currency_symbol"];
									if (currencySymbol != nullptr) {
										// Store the policy ID for later use with Cexplorer API
										policyIds[policyIdCount] = String(currencySymbol);
										policyIdCount++;
										
										Serial.print("  NFT ");
										Serial.print(i + 1);
										Serial.print(": Policy ID (currency_symbol): ");
										Serial.println(currencySymbol);
									}
								}
								
								Serial.print("\\nExtracted ");
								Serial.print(policyIdCount);
								Serial.println(" policy ID(s) for Cexplorer API calls");
							}
							
							// Extract asset positions (tokens)
							if (positions.containsKey("asset_positions")) {
								JsonArray assetArray = positions["asset_positions"];
								tokenCount = assetArray.size();
								Serial.print("Tokens found: ");
								Serial.println(tokenCount);
								
								// Print first few tokens with their prices
								for (int i = 0; i < assetArray.size() && i < 5; i++) {
									JsonObject asset = assetArray[i];
									
									// Get token metadata
									if (asset.containsKey("asset")) {
										JsonObject assetInfo = asset["asset"];
										if (assetInfo.containsKey("metadata")) {
											JsonObject metadata = assetInfo["metadata"];
											String ticker = metadata["ticker"] | "UNKNOWN";
											String name = metadata["name"] | "Unknown Token";
											
											// Get price and amount
											float priceUsd = asset["price_usd"] | 0.0;
											float amount = asset["amount"] | 0.0;
											float change24h = asset["pnl_24h_percent"] | 0.0;
											
											Serial.print("  Token ");
											Serial.print(i + 1);
											Serial.print(": ");
											Serial.print(ticker);
											Serial.print(" (");
											Serial.print(name);
											Serial.print(") - Price: $");
											Serial.print(priceUsd, 4);
											Serial.print(", Amount: ");
											Serial.print(amount, 2);
											Serial.print(", 24h Change: ");
											Serial.print(change24h, 2);
											Serial.println("%");
										}
									}
								}
							}
						} else {
							Serial.println("Warning: No positions found in MinSwap response");
						}
					} else {
						// Print error if JSON parsing failed
						Serial.print("JSON parsing failed: ");
						Serial.println(error.c_str());
					}
				} else {
					// Print error if HTTP request failed
					Serial.print("Error in HTTP request. Response Code: ");
					Serial.println(httpResponseCode);
				}
				
				// Close HTTP connection
				http.end();
			}

			// ============================================
			// STEP 5: FETCH NFT INFO FROM CEXPLORER
			// ============================================
			// This function fetches NFT collection information for a specific policy ID
			// The policy ID is extracted from the MinSwap response (currency_symbol field)
			void fetchCexplorerData(String policyId) {
				Serial.println("\\n--- Fetching NFT Info from Cexplorer ---");
				Serial.print("Policy ID: ");
				Serial.println(policyId);
				
				// Only proceed if WiFi is connected
				if (WiFi.status() != WL_CONNECTED) {
					Serial.println("Error: WiFi not connected!");
					return;
				}
				
				// Create HTTP client object
				HTTPClient http;
				
				// Build Cexplorer API URL with policy ID as query parameter
				String fullUrl = String(cexplorerApiUrl);
				fullUrl += "?id=";
				fullUrl += policyId;
				
				Serial.print("Requesting: ");
				Serial.println(fullUrl);
				
				// Initialize HTTP client with full URL
				http.begin(fullUrl);
				
				// Add API key to request headers
				// Cexplorer requires the API key in the "api-key" header field
				http.addHeader("api-key", cexplorerApiKey);
				
				// Send GET request
				Serial.println("Sending GET request to Cexplorer...");
				int httpResponseCode = http.GET();
				
				// Check if request was successful
				if (httpResponseCode > 0) {
					Serial.print("HTTP Response Code: ");
					Serial.println(httpResponseCode);
					
					// Get response body as string
					String response = http.getString();
					
					// Create JSON document to parse response (4096 bytes buffer)
					DynamicJsonDocument doc(4096);
					DeserializationError error = deserializeJson(doc, response);
					
					// Check if JSON parsing was successful
					if (!error) {
						Serial.println("\\n✓ Cexplorer Data Fetched Successfully!");
						
						// Check if response has "data" object
						if (doc.containsKey("data")) {
							JsonObject data = doc["data"];
							
							// Extract collection information
							if (data.containsKey("collection")) {
								JsonObject collection = data["collection"];
								String collectionName = collection["name"] | "Unknown";
								
								Serial.print("Collection Name: ");
								Serial.println(collectionName);
								
								// Extract collection stats (floor price, etc.)
								if (collection.containsKey("stats")) {
									JsonObject stats = collection["stats"];
									
									// Floor price is in Lovelace, convert to ADA
									long floorLovelace = stats["floor"] | 0;
									float floorPriceAda = floorLovelace / 1000000.0;
									
									int owners = stats["owners"] | 0;
									
									Serial.print("Floor Price: ");
									Serial.print(floorPriceAda, 2);
									Serial.println(" ADA");
									Serial.print("Owners: ");
									Serial.println(owners);
								}
							}
						} else {
							Serial.println("Warning: No data found in Cexplorer response");
						}
					} else {
						// Print error if JSON parsing failed
						Serial.print("JSON parsing failed: ");
						Serial.println(error.c_str());
					}
				} else {
					// Print error if HTTP request failed
					Serial.print("Error in HTTP request. Response Code: ");
					Serial.println(httpResponseCode);
					
					// If we get 401, it means the API key is missing or invalid
					if (httpResponseCode == 401) {
						Serial.println("Error: 401 Unauthorized - Check your Cexplorer API key!");
					}
				}
				
				// Close HTTP connection
				http.end();
			}`,
		tickerDisplayCode: `
			// Include necessary libraries
			#include <WiFi.h>              // WiFi connectivity
			#include <HTTPClient.h>       // HTTP client for API calls
			#include <ArduinoJson.h>      // JSON parsing
			#include <TFT_eSPI.h>         // TFT display library
			#include <SPI.h>               // SPI communication

			// Create TFT display object
			TFT_eSPI tft = TFT_eSPI();

			// WiFi credentials - replace with your network details
			const char* ssid = "Your SSID";
			const char* password = "Your Password";
			
			// Your Node.js API server URL
			const char* apiUrl = "http://your-server-ip:3000/ticker-data";

			// Variables for timing
			unsigned long lastFetch = 0;
			const unsigned long fetchInterval = 30000;  // Fetch every 30 seconds
			
			// Display variables
			int currentScreen = 0;        // Current screen/page being displayed
			const int maxScreens = 3;     // Number of different screens to cycle through
			unsigned long lastScreenChange = 0;
			const unsigned long screenChangeInterval = 5000;  // Change screen every 5 seconds

			// Data storage
			struct TokenData {
				String symbol;
				float price;
				float change24h;
			};
			
			TokenData tokens[5];  // Store up to 5 tokens
			int tokenCount = 0;
			float walletBalance = 0;

			void setup() {
				// Initialize serial communication
				Serial.begin(115200);
				
				// Initialize TFT display
				tft.init();
				tft.setRotation(1);        // Landscape orientation
				tft.fillScreen(TFT_BLACK);
				
				// Display startup message
				tft.setTextColor(TFT_WHITE, TFT_BLACK);
				tft.setTextSize(2);
				tft.setCursor(10, 10);
				tft.println("Connecting...");
				
				// Start WiFi connection
				WiFi.begin(ssid, password);
				while (WiFi.status() != WL_CONNECTED) {
					delay(1000);
					Serial.println("Connecting to WiFi...");
				}
				
				Serial.println("Connected to WiFi");
				tft.fillScreen(TFT_BLACK);
				tft.setCursor(10, 10);
				tft.println("Connected!");
				delay(1000);
				
				// Initial data fetch
				fetchTickerData();
			}

			void loop() {
				// Check WiFi connection
				if (WiFi.status() != WL_CONNECTED) {
					WiFi.reconnect();
					while (WiFi.status() != WL_CONNECTED) {
						delay(1000);
					}
				}
				
				unsigned long currentMillis = millis();
				
				// Fetch new data periodically
				if (currentMillis - lastFetch >= fetchInterval) {
					fetchTickerData();
					lastFetch = currentMillis;
				}
				
				// Change display screen periodically
				if (currentMillis - lastScreenChange >= screenChangeInterval) {
					currentScreen = (currentScreen + 1) % maxScreens;
					lastScreenChange = currentMillis;
					updateDisplay();
				}
			}

			void fetchTickerData() {
				if (WiFi.status() == WL_CONNECTED) {
					HTTPClient http;
					http.begin(apiUrl);
					int httpResponseCode = http.GET();
					
					if (httpResponseCode > 0) {
						String response = http.getString();
						DynamicJsonDocument doc(8192);
						DeserializationError error = deserializeJson(doc, response);
						
						if (!error) {
							// Extract wallet balance
							if (doc.containsKey("wallet")) {
								walletBalance = doc["wallet"]["balance"] | 0.0;
							}
							
							// Extract token data
							if (doc.containsKey("tokens") && doc["tokens"].is<JsonArray>()) {
								JsonArray tokensArray = doc["tokens"];
								tokenCount = 0;
								
								for (JsonObject token : tokensArray) {
									if (tokenCount < 5) {
										tokens[tokenCount].symbol = token["symbol"] | "UNKNOWN";
										tokens[tokenCount].price = token["price"] | 0.0;
										tokens[tokenCount].change24h = token["change24h"] | 0.0;
										tokenCount++;
									}
								}
							}
							
							// Update display with new data
							updateDisplay();
						}
					}
					
					http.end();
				}
			}

			void updateDisplay() {
				// Clear screen
				tft.fillScreen(TFT_BLACK);
				
				// Display different screens based on currentScreen variable
				switch (currentScreen) {
					case 0:
						displayWalletScreen();
						break;
					case 1:
						displayTokenPricesScreen();
						break;
					case 2:
						displayTokenChangesScreen();
						break;
				}
			}

			void displayWalletScreen() {
				// Display wallet balance screen
				tft.setTextSize(3);
				tft.setTextColor(TFT_CYAN, TFT_BLACK);
				tft.setCursor(10, 10);
				tft.println("Wallet");
				
				tft.setTextSize(4);
				tft.setTextColor(TFT_GREEN, TFT_BLACK);
				tft.setCursor(10, 50);
				tft.print(String(walletBalance, 2));
				tft.setTextSize(2);
				tft.println(" ADA");
			}

			void displayTokenPricesScreen() {
				// Display token prices screen
				tft.setTextSize(2);
				tft.setTextColor(TFT_YELLOW, TFT_BLACK);
				tft.setCursor(10, 10);
				tft.println("Token Prices");
				
				// Display up to 3 tokens
				int yPos = 40;
				for (int i = 0; i < min(tokenCount, 3); i++) {
					tft.setTextSize(2);
					tft.setTextColor(TFT_WHITE, TFT_BLACK);
					tft.setCursor(10, yPos);
					tft.print(tokens[i].symbol);
					tft.print(": $");
					tft.println(String(tokens[i].price, 4));
					yPos += 30;
				}
			}

			void displayTokenChangesScreen() {
				// Display 24h changes screen
				tft.setTextSize(2);
				tft.setTextColor(TFT_YELLOW, TFT_BLACK);
				tft.setCursor(10, 10);
				tft.println("24h Changes");
				
				// Display up to 3 tokens with their changes
				int yPos = 40;
				for (int i = 0; i < min(tokenCount, 3); i++) {
					tft.setTextSize(2);
					tft.setTextColor(TFT_WHITE, TFT_BLACK);
					tft.setCursor(10, yPos);
					tft.print(tokens[i].symbol);
					tft.print(": ");
					
					// Color code based on change (green for positive, red for negative)
					if (tokens[i].change24h >= 0) {
						tft.setTextColor(TFT_GREEN, TFT_BLACK);
						tft.print("+");
					} else {
						tft.setTextColor(TFT_RED, TFT_BLACK);
					}
					tft.print(String(tokens[i].change24h, 2));
					tft.println("%");
					yPos += 30;
				}
			}`,
		animatedTextCode: `
			// Include TFT display library
			#include <TFT_eSPI.h>
			#include <SPI.h>

			TFT_eSPI tft = TFT_eSPI();

			// Text scrolling variables
			String scrollText = "Cardano Ticker - Real-time prices and data";
			int scrollPosition = 0;
			unsigned long lastScroll = 0;
			const unsigned long scrollDelay = 50;  // Scroll speed (milliseconds)

			void setup() {
				Serial.begin(115200);
				tft.init();
				tft.setRotation(1);
				tft.fillScreen(TFT_BLACK);
			}

			void loop() {
				unsigned long currentMillis = millis();
				
				// Scroll text periodically
				if (currentMillis - lastScroll >= scrollDelay) {
					scrollTextDisplay();
					lastScroll = currentMillis;
				}
			}

			void scrollTextDisplay() {
				// Clear screen
				tft.fillScreen(TFT_BLACK);
				
				// Calculate text position for scrolling effect
				int textWidth = scrollText.length() * 6;  // Approximate character width
				int xPos = 240 - scrollPosition;  // Start from right, scroll left
				
				// Display text at calculated position
				tft.setTextSize(2);
				tft.setTextColor(TFT_CYAN, TFT_BLACK);
				tft.setCursor(xPos, 100);
				tft.println(scrollText);
				
				// Update scroll position
				scrollPosition += 2;  // Scroll speed
				
				// Reset position when text has scrolled completely off screen
				if (scrollPosition > textWidth + 240) {
					scrollPosition = 0;
				}
			}`,
		spriteCode: `
			// Include TFT display library
			#include <TFT_eSPI.h>
			#include <SPI.h>

			TFT_eSPI tft = TFT_eSPI();

			// Create sprite for smooth animations
			// Sprite is an off-screen buffer that can be drawn to screen
			TFT_eSprite sprite = TFT_eSprite(&tft);

			void setup() {
				Serial.begin(115200);
				tft.init();
				tft.setRotation(1);
				tft.fillScreen(TFT_BLACK);
				
				// Create sprite with specified dimensions
				sprite.createSprite(240, 135);  // Width, Height
			}

			void loop() {
				// Draw to sprite (off-screen buffer)
				drawToSprite();
				
				// Push sprite to display (shows the sprite on screen)
				sprite.pushSprite(0, 0);
				
				delay(100);
			}

			void drawToSprite() {
				// Clear sprite with black background
				sprite.fillScreen(TFT_BLACK);
				
				// Draw title
				sprite.setTextSize(2);
				sprite.setTextColor(TFT_YELLOW, TFT_BLACK);
				sprite.setCursor(10, 10);
				sprite.println("Cardano Ticker");
				
				// Draw a line
				sprite.drawLine(10, 35, 230, 35, TFT_WHITE);
				
				// Draw token information
				sprite.setTextSize(2);
				sprite.setTextColor(TFT_CYAN, TFT_BLACK);
				sprite.setCursor(10, 50);
				sprite.print("ADA: $");
				sprite.setTextColor(TFT_GREEN, TFT_BLACK);
				sprite.println("0.45");
				
				// Draw rectangle around important data
				sprite.drawRect(5, 45, 235, 40, TFT_BLUE);
				
				// Draw filled circle as indicator
				sprite.fillCircle(220, 65, 5, TFT_GREEN);
			}`,
		startScreenCode: `
			// Include TFT display library
			#include <TFT_eSPI.h>
			#include <SPI.h>

			// Create TFT display object
			TFT_eSPI tft = TFT_eSPI();

			void setup() {
				// Initialize serial communication for debugging
				Serial.begin(115200);
				
				// Initialize TFT display
				tft.init();
				
				// Set display rotation (1 = landscape)
				tft.setRotation(1);
				
				// Invert display colors (required for some CYD displays)
				tft.invertDisplay(true);
				
				// Display the start screen
				displayStartScreen();
				
				Serial.println("Start screen displayed!");
			}

			void loop() {
				// Nothing to do in the loop - static display
			}

			// Function to display the start screen
			// This function can be extracted to its own file later
			void displayStartScreen() {
				// Fill entire screen with black background
				tft.fillScreen(TFT_BLACK);
				
				// Set text properties for main title
				tft.setTextColor(TFT_WHITE, TFT_BLACK);  // White text on black background
				tft.setTextSize(3);                      // Large text size
				
				// Calculate main title position to center it on screen
				String mainText = "CardanoTicker";
				int mainTextWidth = mainText.length() * 6 * 3;   // Approximate width (6 pixels per char * text size)
				int mainTextHeight = 8 * 3;                      // Approximate height (8 pixels * text size)
				int mainTextX = (320 - mainTextWidth) / 2;       // Center horizontally (320 is screen width)
				int mainTextY = (240 - mainTextHeight) / 2 - 15; // Center vertically, slightly above center
				
				// Display the centered main title
				tft.setCursor(mainTextX, mainTextY);
				tft.println("CardanoTicker");
				
				// Set text properties for website URL (smaller text)
				tft.setTextSize(1);                      // Smaller text size
				
				// Calculate website URL position to center it below the main title
				String urlText = "www.cardanothings.io";
				int urlTextWidth = urlText.length() * 6 * 1;   // Approximate width (6 pixels per char * text size)
				int urlTextX = (320 - urlTextWidth) / 2;      // Center horizontally
				int urlTextY = mainTextY + mainTextHeight + 10; // Position below main title with spacing
				
				// Display the centered website URL
				tft.setCursor(urlTextX, urlTextY);
				tft.println("www.cardanothings.io");
			}`,
		statusPageCode: `
			// Include necessary libraries for WiFi and TFT display
			#include <WiFi.h>              // WiFi connectivity library
			#include <TFT_eSPI.h>         // TFT display library
			#include <SPI.h>               // SPI communication

			// Create TFT display object
			TFT_eSPI tft = TFT_eSPI();
			
			// Create small sprite for updating values (reduces flicker)
			TFT_eSprite valueSprite = TFT_eSprite(&tft);

			// WiFi credentials - replace with your network details
			const char* ssid = "Your SSID";           // Your WiFi network name
			const char* password = "Your Password";   // Your WiFi password

			// Table configuration
			const int tableBottomMargin = 50;         // Bottom margin (50px from bottom)
			const int numRows = 6;                    // Number of data rows
			const int headerHeight = 30;              // Height for header row
			const int labelColumnWidth = 140;         // Width of label column
			const int valueColumnMargin = 10;          // Margin from vertical line and right border
			
			// Store calculated positions
			int tableHeight = 0;
			int tableWidth = 0;
			int rowHeight = 0;
			int textOffsetY = 0;
			int valueColumnWidth = 0;                  // Calculated width for value column
			bool tableDrawn = false;

			void setup() {
				// Initialize serial communication for debugging
				Serial.begin(115200);
				delay(1000);
				
				Serial.println("\\n=== Status Page Example ===");
				
				// Initialize TFT display
				tft.init();
				tft.setRotation(1);                   // Landscape orientation
				tft.invertDisplay(true);              // Invert colors for CYD displays
				tft.fillScreen(TFT_BLACK);
				
				// Calculate table dimensions
				tableWidth = tft.width();                        // Full width
				tableHeight = tft.height() - tableBottomMargin;  // Full height minus 50px
				rowHeight = (tableHeight - headerHeight) / numRows;  // Height of each data row
				textOffsetY = (rowHeight - 8) / 2;  // Vertical text offset for centering (text size 1 is ~8px tall)
				
				// Calculate value column width (table width - label column - margins)
				valueColumnWidth = tableWidth - labelColumnWidth - (valueColumnMargin * 2);
				
				// Create small sprite for value updates (one row height, slightly smaller to avoid overlapping lines)
				valueSprite.createSprite(valueColumnWidth, rowHeight - 2);
				
				// Connect to WiFi
				connectToWiFi();
				
				// Draw static table structure once
				drawTableStructure();
				
				// Display initial status values
				updateStatusValues();
				
				Serial.println("Status page displayed!");
			}

			void loop() {
				// Update status values every 1 second
				static unsigned long lastUpdate = 0;
				unsigned long currentTime = millis();
				
				if (currentTime - lastUpdate >= 1000) {
					updateStatusValues();
					lastUpdate = currentTime;
				}
				
				delay(100);
			}

			// Connect to WiFi
			void connectToWiFi() {
				Serial.println("\\n--- Connecting to WiFi ---");
				Serial.print("SSID: ");
				Serial.println(ssid);
				
				WiFi.begin(ssid, password);
				
				int attempts = 0;
				while (WiFi.status() != WL_CONNECTED) {
					delay(1000);
					attempts++;
					Serial.print(".");
					
					if (attempts > 30) {
						Serial.println("\\nWiFi connection failed!");
						return;
					}
				}
				
				Serial.println("\\nWiFi Connected!");
				Serial.print("IP Address: ");
				Serial.println(WiFi.localIP());
			}

			// Draw static table structure (borders, header, labels) - called once
			// This function can be extracted to its own file later
			void drawTableStructure() {
				
				// Draw table border (outer rectangle)
				tft.drawRect(0, 0, tableWidth, tableHeight, TFT_WHITE);
				
				// Draw header bottom border
				tft.drawLine(0, headerHeight, tableWidth, headerHeight, TFT_WHITE);
				
				// Draw "Status" header text (left aligned, vertically centered)
				tft.setTextSize(2);
				tft.setTextColor(TFT_WHITE, TFT_BLACK);
				int headerTextY = (headerHeight - 16) / 2;  // Vertically center (text size 2 is ~16px tall)
				tft.setCursor(10, headerTextY);
				tft.print("Status");
				
				// Draw vertical line separating label and value columns (full height from header to bottom)
				tft.drawLine(labelColumnWidth, headerHeight, labelColumnWidth, tableHeight, TFT_WHITE);
				
				// Draw horizontal lines between rows (not after last row - that's the bottom border)
				for (int i = 1; i < numRows; i++) {
					int yPos = headerHeight + (i * rowHeight);
					tft.drawLine(0, yPos, tableWidth, yPos, TFT_WHITE);
				}
				
				// Draw static labels (left column)
				tft.setTextSize(1);
				tft.setTextColor(TFT_WHITE, TFT_BLACK);
				
				// Row 1: WiFi Status
				int row1Y = headerHeight + (0 * rowHeight) + textOffsetY;
				tft.setCursor(10, row1Y);
				tft.print("WiFi Status:");
				
				// Row 2: WiFi Name (SSID)
				int row2Y = headerHeight + (1 * rowHeight) + textOffsetY;
				tft.setCursor(10, row2Y);
				tft.print("WiFi Name:");
				
				// Row 3: IP Address
				int row3Y = headerHeight + (2 * rowHeight) + textOffsetY;
				tft.setCursor(10, row3Y);
				tft.print("IP Address:");
				
				// Row 4: Signal Strength (RSSI)
				int row4Y = headerHeight + (3 * rowHeight) + textOffsetY;
				tft.setCursor(10, row4Y);
				tft.print("Signal:");
				
				// Row 5: MAC Address
				int row5Y = headerHeight + (4 * rowHeight) + textOffsetY;
				tft.setCursor(10, row5Y);
				tft.print("MAC Address:");
				
				// Row 6: Uptime
				int row6Y = headerHeight + (5 * rowHeight) + textOffsetY;
				tft.setCursor(10, row6Y);
				tft.print("Uptime:");
				
				tableDrawn = true;
			}

			// Update only the values in the table using a small sprite
			// This function can be extracted to its own file later
			void updateStatusValues() {
				// Set text properties for values
				valueSprite.setTextSize(1);
				
				// Calculate vertical offset to center text in sprite (sprite is rowHeight-2, text is 8px)
				int spriteTextY = (rowHeight - 2 - 8) / 2;
				
				// Row 1: WiFi Status
				valueSprite.fillSprite(TFT_BLACK);
				valueSprite.setCursor(0, spriteTextY);
				if (WiFi.status() == WL_CONNECTED) {
					valueSprite.setTextColor(TFT_GREEN, TFT_BLACK);
					valueSprite.print("Connected");
				} else {
					valueSprite.setTextColor(TFT_RED, TFT_BLACK);
					valueSprite.print("Disconnected");
				}
				valueSprite.pushSprite(labelColumnWidth + valueColumnMargin, headerHeight + (0 * rowHeight) + 1);
				
				// Row 2: WiFi Name (SSID)
				valueSprite.fillSprite(TFT_BLACK);
				valueSprite.setCursor(0, spriteTextY);
				valueSprite.setTextColor(TFT_WHITE, TFT_BLACK);
				if (WiFi.status() == WL_CONNECTED) {
					valueSprite.print(WiFi.SSID());
				} else {
					valueSprite.print("---");
				}
				valueSprite.pushSprite(labelColumnWidth + valueColumnMargin, headerHeight + (1 * rowHeight) + 1);
				
				// Row 3: IP Address
				valueSprite.fillSprite(TFT_BLACK);
				valueSprite.setCursor(0, spriteTextY);
				valueSprite.setTextColor(TFT_WHITE, TFT_BLACK);
				if (WiFi.status() == WL_CONNECTED) {
					valueSprite.print(WiFi.localIP());
				} else {
					valueSprite.print("---");
				}
				valueSprite.pushSprite(labelColumnWidth + valueColumnMargin, headerHeight + (2 * rowHeight) + 1);
				
				// Row 4: Signal Strength (RSSI)
				valueSprite.fillSprite(TFT_BLACK);
				valueSprite.setCursor(0, spriteTextY);
				valueSprite.setTextColor(TFT_WHITE, TFT_BLACK);
				if (WiFi.status() == WL_CONNECTED) {
					int rssi = WiFi.RSSI();
					valueSprite.print(rssi);
					valueSprite.print(" dBm");
				} else {
					valueSprite.print("---");
				}
				valueSprite.pushSprite(labelColumnWidth + valueColumnMargin, headerHeight + (3 * rowHeight) + 1);
				
				// Row 5: MAC Address
				valueSprite.fillSprite(TFT_BLACK);
				valueSprite.setCursor(0, spriteTextY);
				valueSprite.setTextColor(TFT_WHITE, TFT_BLACK);
				valueSprite.print(WiFi.macAddress());
				valueSprite.pushSprite(labelColumnWidth + valueColumnMargin, headerHeight + (4 * rowHeight) + 1);
				
				// Row 6: Uptime
				valueSprite.fillSprite(TFT_BLACK);
				valueSprite.setCursor(0, spriteTextY);
				valueSprite.setTextColor(TFT_WHITE, TFT_BLACK);
				unsigned long uptimeSeconds = millis() / 1000;
				unsigned long uptimeMinutes = uptimeSeconds / 60;
				unsigned long uptimeHours = uptimeMinutes / 60;
				valueSprite.print(uptimeHours);
				valueSprite.print("h ");
				valueSprite.print(uptimeMinutes % 60);
				valueSprite.print("m ");
				valueSprite.print(uptimeSeconds % 60);
				valueSprite.print("s");
				valueSprite.pushSprite(labelColumnWidth + valueColumnMargin, headerHeight + (5 * rowHeight) + 1);
			}`,
		statusBarCode: `
			// Include TFT display library
			#include <TFT_eSPI.h>
			#include <SPI.h>

			// Create TFT display object
			TFT_eSPI tft = TFT_eSPI();

			// Dummy data for status bar (will be replaced with real data later)
			bool wifiConnected = true;                    // WiFi connection status
			String ipAddress = "192.168.1.100";          // IP address
			unsigned long lastFetchTime = 0;               // Timestamp of last data fetch
			unsigned long currentTime = 0;                 // Current time in milliseconds

			void setup() {
				// Initialize serial communication for debugging
				Serial.begin(115200);
				
				// Initialize TFT display
				tft.init();
				
				// Set display rotation (1 = landscape)
				tft.setRotation(1);
				
				// Invert display colors (required for some CYD displays)
				tft.invertDisplay(true);
				
				// Fill screen with black background
				tft.fillScreen(TFT_BLACK);
				
				// Initialize dummy data
				lastFetchTime = millis() - 30000;  // 30 seconds ago
				currentTime = millis();
				
				// Display status bar
				displayStatusBar();
				
				Serial.println("Status bar displayed!");
			}

			void loop() {
				// Update current time
				currentTime = millis();
				
				// Update status bar periodically (every second)
				static unsigned long lastUpdate = 0;
				if (currentTime - lastUpdate >= 1000) {
					displayStatusBar();
					lastUpdate = currentTime;
				}
				
				delay(100);  // Small delay to prevent excessive updates
			}

			// Function to display the status bar at the top of the screen
			// This function can be extracted to its own file later
			void displayStatusBar() {
				// Status bar dimensions
				const int statusBarHeight = 20;           // Height of status bar in pixels
				const int statusBarY = 0;                  // Y position (top of screen)
				
				// Clear status bar area (draw black rectangle to erase previous content)
				tft.fillRect(0, statusBarY, 320, statusBarHeight, TFT_BLACK);
				
				// Draw a line separator below the status bar
				tft.drawLine(0, statusBarHeight, 320, statusBarHeight, TFT_WHITE);
				
				// Set text properties for status bar
				tft.setTextSize(1);                        // Small text size
				tft.setTextColor(TFT_WHITE, TFT_BLACK);    // White text on black background
				
				// Calculate positions for status elements
				int xPos = 5;                             // Starting X position
				int yPos = 5;                             // Y position (centered vertically in status bar)
				
				// 1. Display WiFi Status
				tft.setCursor(xPos, yPos);
				tft.print("WiFi: ");
				if (wifiConnected) {
					tft.setTextColor(TFT_GREEN, TFT_BLACK);  // Green for connected
					tft.print("ON");
				} else {
					tft.setTextColor(TFT_RED, TFT_BLACK);    // Red for disconnected
					tft.print("OFF");
				}
				tft.setTextColor(TFT_WHITE, TFT_BLACK);     // Reset to white
				
				// 2. Display IP Address (positioned in the middle)
				xPos = 80;                                 // Position for IP address
				tft.setCursor(xPos, yPos);
				tft.print("IP: ");
				tft.print(ipAddress);
				
				// 3. Display Last Fetch Time (positioned on the right)
				// Calculate seconds since last fetch
				unsigned long secondsAgo = (currentTime - lastFetchTime) / 1000;
				
				// Calculate position for time display (right-aligned)
				String timeText = "Updated: ";
				timeText += String(secondsAgo);
				timeText += "s ago";
				int timeTextWidth = timeText.length() * 6;  // Approximate width
				xPos = 320 - timeTextWidth - 5;              // Right-aligned with 5px margin
				
				tft.setCursor(xPos, yPos);
				tft.print(timeText);
			}`,
		walletBalanceCode: `
			// Include TFT display library
			#include <TFT_eSPI.h>
			#include <SPI.h>

			// Create TFT display object
			TFT_eSPI tft = TFT_eSPI();

			// Dummy data for wallet balance display (will be replaced with real data later)
			float walletBalance = 1234.56;              // Wallet balance in ADA
			float adaPriceUsd = 0.3864;                // ADA price in USD
			float adaChange24h = -7.89;                 // 24h price change in percentage

			// Status bar height (to position content below it)
			const int statusBarHeight = 20;

			void setup() {
				// Initialize serial communication for debugging
				Serial.begin(115200);
				
				// Initialize TFT display
				tft.init();
				
				// Set display rotation (1 = landscape)
				tft.setRotation(1);
				
				// Invert display colors (required for some CYD displays)
				tft.invertDisplay(true);
				
				// Fill screen with black background
				tft.fillScreen(TFT_BLACK);
				
				// Display wallet balance information
				displayWalletBalance();
				
				Serial.println("Wallet balance displayed!");
			}

			void loop() {
				// Update display periodically (every 5 seconds)
				static unsigned long lastUpdate = 0;
				unsigned long currentTime = millis();
				
				if (currentTime - lastUpdate >= 5000) {
					displayWalletBalance();
					lastUpdate = currentTime;
				}
				
				delay(100);
			}

			// Function to display wallet balance, ADA price, and 24h change
			// This function can be extracted to its own file later
			// Optimized to reduce flicker by only updating changed areas
			void displayWalletBalance() {
				// Starting Y position (below status bar)
				int yPos = statusBarHeight + 20;
				int xPos = 10;
				
				// Store previous values to detect changes (static variables persist between calls)
				static float prevWalletBalance = -1;
				static float prevAdaPriceUsd = -1;
				static float prevAdaChange24h = -1;
				static bool firstDraw = true;
				
				// 1. Display "Wallet Balance" label (only on first draw)
				if (firstDraw) {
					tft.setTextSize(2);
					tft.setTextColor(TFT_DARKGREY, TFT_BLACK);  // Grey color for label
					tft.setCursor(xPos, yPos);
					tft.println("Wallet Balance");
				}
				
				yPos += 30;
				
				// 2. Display wallet balance in ADA (only update if value changed)
				if (walletBalance != prevWalletBalance || firstDraw) {
					// Clear previous value area (large enough for the number)
					tft.fillRect(xPos, yPos, 200, 32, TFT_BLACK);
					
					tft.setTextSize(4);
					tft.setTextColor(TFT_WHITE, TFT_BLACK);  // White color for wallet balance
					tft.setCursor(xPos, yPos);
					tft.print(walletBalance, 2);  // Display with 2 decimal places
					
					// Display "ADA" unit
					tft.setTextSize(2);
					tft.setTextColor(TFT_WHITE, TFT_BLACK);  // White color for ADA label
					tft.print(" ADA");
					
					prevWalletBalance = walletBalance;
				}
				
				yPos += 50;
				
				// 3. Display ADA price in USD (only update if value changed)
				if (adaPriceUsd != prevAdaPriceUsd || firstDraw) {
					// Clear previous value area (label + value)
					tft.fillRect(xPos, yPos, 200, 24, TFT_BLACK);
					
					tft.setTextSize(2);
					tft.setTextColor(TFT_WHITE, TFT_BLACK);  // White instead of yellow
					tft.setCursor(xPos, yPos);
					tft.print("ADA Price: $");
					tft.setTextColor(TFT_WHITE, TFT_BLACK);
					tft.print(adaPriceUsd, 4);  // Display with 4 decimal places
					
					prevAdaPriceUsd = adaPriceUsd;
				}
				
				yPos += 30;
				
				// 4. Display 24h price change (only update if value changed)
				if (adaChange24h != prevAdaChange24h || firstDraw) {
					// Clear previous value area (label + value)
					tft.fillRect(xPos, yPos, 200, 24, TFT_BLACK);
					
					tft.setTextSize(2);
					tft.setTextColor(TFT_WHITE, TFT_BLACK);  // White instead of yellow
					tft.setCursor(xPos, yPos);
					tft.print("24h Change: ");
					
					// Color code based on change (green for positive, red for negative)
					if (adaChange24h >= 0) {
						tft.setTextColor(TFT_GREEN, TFT_BLACK);
						tft.print("+");
					} else {
						tft.setTextColor(TFT_RED, TFT_BLACK);
					}
					
					tft.print(adaChange24h, 2);  // Display with 2 decimal places
					tft.print("%");
					
					prevAdaChange24h = adaChange24h;
				}
				
				firstDraw = false;
			}`,
		tokenScrollCode: `
			// Include TFT display library
			#include <TFT_eSPI.h>
			#include <SPI.h>

			// Create TFT display object
			TFT_eSPI tft = TFT_eSPI();
			
			// Create sprite for smooth scrolling (reduces flicker)
			// Sprite is an off-screen buffer that can be drawn to screen
			TFT_eSprite scrollSprite = TFT_eSprite(&tft);

			// Scroll area configuration
			const int scrollAreaHeight = 30;  // Height of the scrolling area at bottom
			const int yPos = 4;               // Y position within the sprite (vertical offset)
			const int scrollSpeed = 2;        // Pixels to scroll per update

			// Data structures for tokens and NFTs
			struct TokenData {
				String ticker;
				float price;
				float change24h;
			};
			
			struct NFTData {
				String name;
				float floorPrice;
			};

			// Token data array
			TokenData tokens[] = {
				{"ADA", 0.3864, -7.89},
				{"MIN", 0.0123, 2.45},
				{"HOSKY", 0.0001, -15.23},
				{"IAG", 0.0456, 5.67}
			};

			// NFT data array
			NFTData nfts[] = {
				{"ADA Handle", 5.0},
				{"SpaceBudz", 300.0},
				{"HOSKY C(ash grab)NFT", 8.0}
			};

			// Scrolling variables
			int scrollX = 0;           // Current scroll position in pixels
			int contentWidth = 0;      // Total width of all content for seamless looping

			void setup() {
				// Initialize serial communication for debugging
				Serial.begin(115200);
				
				// Initialize TFT display
				tft.init();
				
				// Set display rotation (1 = landscape)
				tft.setRotation(1);
				
				// Invert display colors (required for some CYD displays)
				tft.invertDisplay(true);
				
				// Fill screen with black background
				tft.fillScreen(TFT_BLACK);

				// Configure sprite for smooth scrolling
				// 16-bit color depth for full color support
				scrollSprite.setColorDepth(16);
				
				// Create sprite with full screen width and scroll area height
				// This creates an off-screen buffer for the scrolling content
				scrollSprite.createSprite(tft.width(), scrollAreaHeight);

				// Calculate total content width for seamless scrolling
				calculateContentWidth();
				
				Serial.println("Token scroll display initialized!");
			}

			void loop() {
				// Clear the sprite with black background
				scrollSprite.fillSprite(TFT_BLACK);

				// Draw first copy of content at current scroll position
				drawContentLine(-scrollX);

				// Draw second copy for seamless endless scrolling
				// Offset by contentWidth to create continuous loop
				drawContentLine(-scrollX + contentWidth);

				// Push sprite to display at bottom of screen
				// This updates the display in one operation, reducing flicker
				scrollSprite.pushSprite(0, tft.height() - scrollAreaHeight);

				// Update scroll position
				scrollX += scrollSpeed;
				
				// Reset scroll position when content has scrolled completely
				// This creates endless scrolling effect
				if (scrollX >= contentWidth) {
					scrollX = 0;
				}

				// Delay to control scroll speed
				delay(30);
			}

			// Calculate total width of all content dynamically
			// This function uses actual text width measurements for accurate spacing
			// This function can be extracted to its own file later
			void calculateContentWidth() {
				contentWidth = 0;

				// Calculate width for all tokens
				for (int i = 0; i < sizeof(tokens) / sizeof(tokens[0]); i++) {
					// Ticker width (size 2)
					tft.setTextSize(2);
					contentWidth += tft.textWidth(tokens[i].ticker) + 4;  // Add 4px spacing
					
					// Price width (size 1)
					tft.setTextSize(1);
					String priceStr = "$" + String(tokens[i].price, 4);
					contentWidth += tft.textWidth(priceStr) + 4;  // Add 4px spacing
					
					// 24h change width (size 1)
					String changeStr = (tokens[i].change24h >= 0 ? "+" : "") + String(tokens[i].change24h, 2) + "%";
					contentWidth += tft.textWidth(changeStr) + 8;  // Add 8px spacing after change
				}

				// Calculate width for all NFTs
				for (int i = 0; i < sizeof(nfts) / sizeof(nfts[0]); i++) {
					// NFT name width (size 2)
					tft.setTextSize(2);
					contentWidth += tft.textWidth(nfts[i].name) + 4;  // Add 4px spacing
					
					// Floor price width (size 1)
					tft.setTextSize(1);
					String floorStr = "Floor: " + String(nfts[i].floorPrice, 2) + " ADA";
					contentWidth += tft.textWidth(floorStr) + 8;  // Add 8px spacing after floor price
				}
			}

			// Draw all tokens and NFTs at a given x position
			// This function draws content into the sprite buffer
			// This function can be extracted to its own file later
			void drawContentLine(int xPos) {
				// Draw all tokens
				for (int i = 0; i < sizeof(tokens) / sizeof(tokens[0]); i++) {
					// Draw token ticker (larger text)
					scrollSprite.setTextSize(2);
					scrollSprite.setTextColor(TFT_WHITE, TFT_BLACK);
					scrollSprite.drawString(tokens[i].ticker, xPos, yPos);
					xPos += scrollSprite.textWidth(tokens[i].ticker) + 4;  // Advance position with spacing

					// Draw token price (smaller text, slightly offset vertically)
					scrollSprite.setTextSize(1);
					String priceStr = "$" + String(tokens[i].price, 4);
					scrollSprite.drawString(priceStr, xPos, yPos + 2);  // +2 for vertical alignment
					xPos += scrollSprite.textWidth(priceStr) + 4;  // Advance position with spacing

					// Draw 24h change with color coding
					String changeStr = (tokens[i].change24h >= 0 ? "+" : "") + String(tokens[i].change24h, 2) + "%";
					
					// Color: green for positive, red for negative
					if (tokens[i].change24h >= 0) {
						scrollSprite.setTextColor(TFT_GREEN, TFT_BLACK);
					} else {
						scrollSprite.setTextColor(TFT_RED, TFT_BLACK);
					}
					scrollSprite.drawString(changeStr, xPos, yPos + 2);  // +2 for vertical alignment
					xPos += scrollSprite.textWidth(changeStr) + 8;  // Advance position with spacing
				}

				// Draw all NFTs
				for (int i = 0; i < sizeof(nfts) / sizeof(nfts[0]); i++) {
					// Draw NFT name (larger text)
					scrollSprite.setTextSize(2);
					scrollSprite.setTextColor(TFT_WHITE, TFT_BLACK);
					scrollSprite.drawString(nfts[i].name, xPos, yPos);
					xPos += scrollSprite.textWidth(nfts[i].name) + 4;  // Advance position with spacing

					// Draw floor price (smaller text, slightly offset vertically)
					scrollSprite.setTextSize(1);
					String floorStr = "Floor: " + String(nfts[i].floorPrice, 2) + " ADA";
					scrollSprite.drawString(floorStr, xPos, yPos + 2);  // +2 for vertical alignment
					xPos += scrollSprite.textWidth(floorStr) + 8;  // Advance position with spacing
				}
			}`
		};
};
