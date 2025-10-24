export function load() {
    return {
        title: "WiFi Connection",
        description: "Easily connect your ESP32 to WiFi networks with this block.",
        overview: "This block handles WiFi connectivity for your ESP32, including connection management, status monitoring, and reconnection logic. Essential for any IoT project that needs internet connectivity.",
        features: [
            "Automatic WiFi connection",
            "Connection status monitoring",
            "Automatic reconnection on failure",
            "Multiple network support",
            "Signal strength monitoring"
        ],
        code: `#include <WiFi.h>

// WiFi credentials
const char* ssid = "YOUR_WIFI_NAME";
const char* password = "YOUR_WIFI_PASSWORD";

void setup() {
  Serial.begin(115200);
  
  // Start WiFi connection
  WiFi.begin(ssid, password);
  Serial.print("Connecting to WiFi");
  
  // Wait for connection
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  
  Serial.println();
  Serial.println("WiFi connected!");
  Serial.print("IP address: ");
  Serial.println(WiFi.localIP());
  Serial.print("Signal strength (RSSI): ");
  Serial.print(WiFi.RSSI());
  Serial.println(" dBm");
}

void loop() {
  // Check WiFi connection status
  if (WiFi.status() != WL_CONNECTED) {
    Serial.println("WiFi connection lost. Reconnecting...");
    WiFi.reconnect();
    
    // Wait for reconnection
    while (WiFi.status() != WL_CONNECTED) {
      delay(500);
      Serial.print(".");
    }
    Serial.println("Reconnected!");
  }
  
  // Your main code here
  delay(10000); // Check every 10 seconds
}`,
        usage: `<ol>
          <li>Replace "YOUR_WIFI_NAME" with your actual WiFi network name (SSID)</li>
          <li>Replace "YOUR_WIFI_PASSWORD" with your actual WiFi password</li>
          <li>Upload the code to your ESP32</li>
          <li>Open the Serial Monitor to see connection status</li>
          <li>The ESP32 will automatically connect and display its IP address</li>
          <li>If connection is lost, it will automatically attempt to reconnect</li>
        </ol>`,
        parameters: [
            {
                name: "ssid",
                type: "const char*",
                description: "The name of your WiFi network (case-sensitive)"
            },
            {
                name: "password",
                type: "const char*",
                description: "The password for your WiFi network"
            },
            {
                name: "WiFi.begin()",
                type: "function",
                description: "Initiates WiFi connection with the provided credentials"
            },
            {
                name: "WiFi.status()",
                type: "function",
                description: "Returns the current WiFi connection status"
            },
            {
                name: "WiFi.localIP()",
                type: "function",
                description: "Returns the IP address assigned to the ESP32"
            },
            {
                name: "WiFi.RSSI()",
                type: "function",
                description: "Returns the signal strength in dBm (decibel-milliwatts)"
            }
        ],
        notes: `<p><strong>Security Tips:</strong></p>
        <ul>
          <li>Never hardcode WiFi credentials in production code</li>
          <li>Consider using WiFi Manager library for easier credential management</li>
          <li>Use environment variables or config files for sensitive data</li>
        </ul>
        <p><strong>Troubleshooting:</strong></p>
        <ul>
          <li>Double-check your SSID and password (case-sensitive)</li>
          <li>Ensure your WiFi network uses WPA/WPA2 (not WEP or open networks)</li>
          <li>Check if your network has MAC address filtering enabled</li>
          <li>Try moving closer to your router for better signal strength</li>
        </ul>
        <p><strong>Signal Strength Guide:</strong> -30 to -50 dBm = Excellent, -50 to -60 dBm = Good, -60 to -70 dBm = Fair, below -70 dBm = Poor</p>`
    };
}