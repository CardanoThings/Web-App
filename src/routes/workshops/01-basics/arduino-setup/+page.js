export const load = async () => {
	return {
		blinkCode: `
			void setup() {
				pinMode(LED_BUILTIN, OUTPUT);
			}

			void loop() {
				digitalWrite(LED_BUILTIN, HIGH);
				delay(1000);
				digitalWrite(LED_BUILTIN, LOW);
				delay(1000);
			}`,
		wifiCode: `
			#include <WiFi.h>
			const char* ssid = "Your SSID";
			const char* password = "Your Password";

			void setup() {
				Serial.begin(115200);
				WiFi.begin(ssid, password);
				while (WiFi.status() != WL_CONNECTED) {
					delay(1000);
					Serial.println("Connecting to WiFi...");
				}
				Serial.println("Connected to WiFi");
				Serial.println("IP address: ");
				Serial.println(WiFi.localIP());
			}

			void loop() {
				if (WiFi.status() != WL_CONNECTED) {
					Serial.println("WiFi connection lost. Reconnecting...");
					WiFi.reconnect();
					while (WiFi.status() != WL_CONNECTED) {
						delay(1000);
						Serial.print(".");
					}
					Serial.println("Reconnected!");
				}
			}`
	};
};