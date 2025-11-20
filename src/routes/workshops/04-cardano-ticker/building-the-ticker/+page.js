export const load = async () => {
	return {
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
			}`
	};
};

