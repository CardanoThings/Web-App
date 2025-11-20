export const load = async () => {
	return {
		cip13UriCode: `
			// Include necessary libraries
			#include <WiFi.h>
			#include <TFT_eSPI.h>
			#include <SPI.h>

			TFT_eSPI tft = TFT_eSPI();

			// WiFi credentials
			const char* ssid = "Your SSID";
			const char* password = "Your Password";

			// Payment details
			String recipientAddress = "addr_test1...";  // Address to receive payment
			float paymentAmount = 0.0;                   // Payment amount in ADA
			String paymentLabel = "";                    // Optional payment label/memo

			void setup() {
				Serial.begin(115200);
				tft.init();
				tft.setRotation(1);
				tft.fillScreen(TFT_BLACK);
				
				WiFi.begin(ssid, password);
				while (WiFi.status() != WL_CONNECTED) {
					delay(1000);
				}
			}

			void loop() {
				// Your main loop
			}

			// Function to create CIP-13 payment URI
			// Format: web+cardano://[address]?amount=[amount]&label=[label]
			String createCIP13URI(float amount, String address, String label = "") {
				// Start with the CIP-13 scheme
				String uri = "web+cardano://";
				
				// Add recipient address
				uri += address;
				
				// Add amount parameter (convert ADA to Lovelace: 1 ADA = 1,000,000 Lovelace)
				if (amount > 0) {
					unsigned long lovelace = (unsigned long)(amount * 1000000);
					uri += "?amount=";
					uri += String(lovelace);
					
					// Add optional label if provided
					if (label.length() > 0) {
						uri += "&label=";
						uri += urlEncode(label);  // URL encode the label
					}
				}
				
				return uri;
			}

			// Simple URL encoding function
			// Encodes special characters for use in URLs
			String urlEncode(String str) {
				String encoded = "";
				for (int i = 0; i < str.length(); i++) {
					char c = str.charAt(i);
					
					// Encode spaces as %20
					if (c == ' ') {
						encoded += "%20";
					}
					// Encode other special characters
					else if (c == '&') {
						encoded += "%26";
					}
					else if (c == '=') {
						encoded += "%3D";
					}
					else if (c == '?') {
						encoded += "%3F";
					}
					// Keep alphanumeric and safe characters as-is
					else {
						encoded += c;
					}
				}
				return encoded;
			}

			// Example usage
			void generatePaymentURI() {
				// Set payment details
				paymentAmount = 10.5;  // 10.5 ADA
				recipientAddress = "addr_test1q...";
				paymentLabel = "Coffee Payment";
				
				// Create CIP-13 URI
				String paymentURI = createCIP13URI(paymentAmount, recipientAddress, paymentLabel);
				
				// Print to serial monitor for debugging
				Serial.println("CIP-13 Payment URI:");
				Serial.println(paymentURI);
				
				// Example output:
				// web+cardano://addr_test1q...?amount=10500000&label=Coffee%20Payment
			}`,
		nodeCip13Code: `
			// Node.js function to create CIP-13 payment URI
			function createCIP13URI(amount, address, label = '') {
				// Start with CIP-13 scheme
				let uri = 'web+cardano://';
				
				// Add recipient address
				uri += address;
				
				// Convert ADA to Lovelace (1 ADA = 1,000,000 Lovelace)
				if (amount > 0) {
					const lovelace = Math.floor(amount * 1000000);
					uri += \`?amount=\${lovelace}\`;
					
					// Add optional label if provided
					if (label) {
						// URL encode the label
						const encodedLabel = encodeURIComponent(label);
						uri += \`&label=\${encodedLabel}\`;
					}
				}
				
				return uri;
			}

			// Example usage
			const paymentURI = createCIP13URI(
				10.5,                                    // Amount in ADA
				'addr_test1q...',                        // Recipient address
				'Coffee Payment'                          // Optional label
			);

			console.log('CIP-13 Payment URI:', paymentURI);
			// Output: web+cardano://addr_test1q...?amount=10500000&label=Coffee%20Payment`,
		walletComparison: `
			// Cardano Mobile Wallets Supporting CIP-13:
			
			// 1. Yoroi Wallet
			// - Available on iOS and Android
			// - Supports CIP-13 payment URIs
			// - Free and open source
			// - Website: https://yoroi-wallet.com/
			
			// 2. Vespr Wallet
			// - Available on iOS and Android
			// - Modern UI/UX
			// - Supports CIP-13
			// - Website: https://vespr.xyz/
			
			// 3. Begin Wallet
			// - Available on iOS and Android
			// - User-friendly interface
			// - Supports CIP-13
			// - Website: https://begin.is/
			
			// 4. Nami Wallet (Browser Extension)
			// - Browser extension (Chrome, Firefox, Edge)
			// - Also has mobile app
			// - Supports CIP-13
			// - Website: https://namiwallet.io/
			
			// 5. Eternl Wallet (formerly CCVault)
			// - Available on iOS, Android, and browser
			// - Advanced features
			// - Supports CIP-13
			// - Website: https://eternl.io/`
	};
};

