export const blocks = [
    {
        slug: "hello-world",
        title: "Hello World",
        tags: ["Arduino"],
        description: "Get started with your ESP32 by displaying 'Hello World!'",
        link: "/blocks/hello-world",
        overview: "This is the most basic block to get you started with ESP32 programming. It demonstrates how to output text to the serial monitor, which is essential for debugging and monitoring your ESP32 applications.",
        features: [
            "Simple serial output",
            "Basic ESP32 setup",
            "Debug-friendly output",
            "Foundation for more complex projects"
        ],
        code: `#include <Arduino.h>

void setup() {
  // Initialize serial communication at 115200 baud rate
  Serial.begin(115200);
  
  // Wait for serial port to connect (needed for native USB)
  while (!Serial) {
    ; // wait for serial port to connect
  }
  
  // Print Hello World message
  Serial.println("Hello World!");
  Serial.println("ESP32 is ready!");
}

void loop() {
  // Print a message every 2 seconds
  Serial.println("Hello from ESP32!");
  delay(2000);
}`,
        usage: `<ol>
          <li>Connect your ESP32 to your computer via USB</li>
          <li>Open Arduino IDE or PlatformIO</li>
          <li>Copy and paste the code into your project</li>
          <li>Upload the code to your ESP32</li>
          <li>Open the Serial Monitor (Tools → Serial Monitor)</li>
          <li>Set the baud rate to 115200</li>
          <li>You should see "Hello World!" messages appearing every 2 seconds</li>
        </ol>`,
        parameters: [
            {
                name: "Serial.begin()",
                type: "function",
                description: "Initializes serial communication. The parameter (115200) sets the baud rate for communication."
            },
            {
                name: "Serial.println()",
                type: "function",
                description: "Prints text to the serial monitor followed by a newline character."
            },
            {
                name: "delay()",
                type: "function",
                description: "Pauses the program for the specified number of milliseconds."
            }
        ],
        notes: `<p><strong>Troubleshooting:</strong></p>
        <ul>
          <li>If you don't see any output, check that the correct COM port is selected</li>
          <li>Make sure the baud rate in Serial Monitor matches the one in your code (115200)</li>
          <li>Try pressing the reset button on your ESP32</li>
        </ul>
        <p><strong>Next Steps:</strong> Once you have this working, you can modify the message or change the delay time to experiment with different output patterns.</p>`
    },
    {
        slug: "wifi-connection",
        title: "WiFi Connection",
        tags: ["Arduino"],
        description: "Easily connect your ESP32 to WiFi networks with this block.",
        link: "/blocks/wifi-connection",
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
    },
    {
        slug: "http-requests",
        title: "HTTP Requests",
        tags: ["Arduino"],
        description: "Fetch data from REST APIs with this simple block.",
        link: "/blocks/http-requests",
        overview: "This block enables your ESP32 to make HTTP requests to web APIs, allowing you to fetch data from the internet, send data to servers, or integrate with web services. Essential for IoT applications that need to communicate with cloud services.",
        features: [
            "GET and POST requests",
            "Custom headers support",
            "JSON payload handling",
            "Response parsing",
            "Error handling and timeouts"
        ],
        code: `#include <WiFi.h>
#include <HTTPClient.h>
#include <ArduinoJson.h>

const char* ssid = "YOUR_WIFI_NAME";
const char* password = "YOUR_WIFI_PASSWORD";

void setup() {
  Serial.begin(115200);
  
  // Connect to WiFi
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("WiFi connected!");
  
  // Make HTTP GET request
  makeHttpRequest();
}

void makeHttpRequest() {
  if (WiFi.status() == WL_CONNECTED) {
    HTTPClient http;
    
    // Example API endpoint (replace with your API)
    http.begin("https://api.coindesk.com/v1/bpi/currentprice.json");
    
    // Add headers if needed
    http.addHeader("Content-Type", "application/json");
    
    // Make GET request
    int httpResponseCode = http.GET();
    
    if (httpResponseCode > 0) {
      String response = http.getString();
      Serial.println("HTTP Response Code: " + String(httpResponseCode));
      Serial.println("Response:");
      Serial.println(response);
      
      // Parse JSON response
      parseJsonResponse(response);
    } else {
      Serial.println("Error in HTTP request");
      Serial.println("HTTP Response Code: " + String(httpResponseCode));
    }
    
    http.end();
  } else {
    Serial.println("WiFi not connected");
  }
}

void parseJsonResponse(String jsonString) {
  DynamicJsonDocument doc(1024);
  DeserializationError error = deserializeJson(doc, jsonString);
  
  if (error) {
    Serial.println("JSON parsing failed!");
    return;
  }
  
  // Extract data from JSON
  const char* disclaimer = doc["disclaimer"];
  const char* rate = doc["bpi"]["USD"]["rate"];
  
  Serial.println("Parsed Data:");
  Serial.println("Disclaimer: " + String(disclaimer));
  Serial.println("Bitcoin USD Rate: " + String(rate));
}

void loop() {
  // Make request every 30 seconds
  delay(30000);
  makeHttpRequest();
}`,
        usage: `<ol>
          <li>Install the ArduinoJson library (Tools → Manage Libraries → Search "ArduinoJson")</li>
          <li>Replace the WiFi credentials with your network details</li>
          <li>Replace the API endpoint with your desired API URL</li>
          <li>Modify the JSON parsing section to match your API response structure</li>
          <li>Upload the code to your ESP32</li>
          <li>Open Serial Monitor to see the API responses</li>
        </ol>`,
        parameters: [
            {
                name: "HTTPClient http",
                type: "object",
                description: "HTTP client object for making requests"
            },
            {
                name: "http.begin()",
                type: "function",
                description: "Initializes HTTP connection to the specified URL"
            },
            {
                name: "http.addHeader()",
                type: "function",
                description: "Adds custom headers to the HTTP request"
            },
            {
                name: "http.GET()",
                type: "function",
                description: "Performs HTTP GET request and returns response code"
            },
            {
                name: "http.POST()",
                type: "function",
                description: "Performs HTTP POST request with payload"
            },
            {
                name: "deserializeJson()",
                type: "function",
                description: "Parses JSON string into a document object"
            }
        ],
        notes: `<p><strong>Common HTTP Response Codes:</strong></p>
        <ul>
          <li>200: Success</li>
          <li>404: Not Found</li>
          <li>401: Unauthorized</li>
          <li>500: Server Error</li>
        </ul>
        <p><strong>API Best Practices:</strong></p>
        <ul>
          <li>Always check response codes before processing data</li>
          <li>Implement proper error handling</li>
          <li>Be mindful of API rate limits</li>
          <li>Use HTTPS for secure communications</li>
          <li>Consider implementing retry logic for failed requests</li>
        </ul>
        <p><strong>Memory Management:</strong> Large JSON responses can cause memory issues. Adjust the DynamicJsonDocument size based on your expected response size.</p>`
    },
    {
        slug: "display-output",
        title: "Display Output",
        tags: ["Arduino"],
        description: "Output data to various displays using this block.",
        link: "/blocks/display-output",
        overview: "This block provides functionality to display data on various types of screens connected to your ESP32, including TFT displays, OLED screens, and LCD displays. Perfect for creating visual interfaces for your IoT projects.",
        features: [
            "Multiple display type support",
            "Text and graphics rendering",
            "Custom fonts and colors",
            "Screen rotation and orientation",
            "Touch screen support"
        ],
        code: `#include <TFT_eSPI.h>
#include <SPI.h>

// Initialize display
TFT_eSPI tft = TFT_eSPI();

void setup() {
  Serial.begin(115200);
  
  // Initialize the display
  tft.init();
  tft.setRotation(1); // 0-3 for different orientations
  
  // Clear screen with black background
  tft.fillScreen(TFT_BLACK);
  
  // Display welcome message
  displayWelcome();
  
  // Display some data
  displayData("Temperature", "23.5°C", TFT_RED);
  displayData("Humidity", "65%", TFT_BLUE);
  displayData("Status", "Online", TFT_GREEN);
}

void displayWelcome() {
  tft.setTextColor(TFT_WHITE, TFT_BLACK);
  tft.setTextSize(2);
  tft.setCursor(10, 10);
  tft.println("ESP32 Display");
  
  tft.setTextSize(1);
  tft.setCursor(10, 40);
  tft.println("CardanoThings Project");
  
  // Draw a line separator
  tft.drawLine(0, 60, tft.width(), 60, TFT_WHITE);
}

void displayData(String label, String value, uint16_t color) {
  static int yPos = 80; // Starting Y position
  
  // Display label
  tft.setTextColor(TFT_WHITE, TFT_BLACK);
  tft.setTextSize(1);
  tft.setCursor(10, yPos);
  tft.print(label + ": ");
  
  // Display value with color
  tft.setTextColor(color, TFT_BLACK);
  tft.setTextSize(2);
  tft.setCursor(80, yPos);
  tft.println(value);
  
  yPos += 30; // Move to next line
}

void updateDisplay(String sensor, String newValue, uint16_t color) {
  // Clear specific area and update
  tft.fillRect(80, 80, 200, 100, TFT_BLACK);
  
  // Redisplay all data (simplified approach)
  displayData(sensor, newValue, color);
}

void loop() {
  // Example: Update display with new data every 5 seconds
  delay(5000);
  
  // Simulate new sensor reading
  static float temp = 23.5;
  temp += 0.1;
  
  String tempStr = String(temp, 1) + "°C";
  updateDisplay("Temperature", tempStr, TFT_RED);
}`,
        usage: `<ol>
          <li>Install the TFT_eSPI library (Tools → Manage Libraries → Search "TFT_eSPI")</li>
          <li>Configure the library for your specific display in User_Setup.h</li>
          <li>Connect your display to the ESP32 according to your display's pinout</li>
          <li>Upload the code to your ESP32</li>
          <li>The display should show a welcome message and sensor data</li>
          <li>Customize the displayData() function for your specific needs</li>
        </ol>`,
        parameters: [
            {
                name: "TFT_eSPI tft",
                type: "object",
                description: "Display driver object for TFT screens"
            },
            {
                name: "tft.init()",
                type: "function",
                description: "Initializes the display hardware"
            },
            {
                name: "tft.setRotation()",
                type: "function",
                description: "Sets screen orientation (0-3 for 0°, 90°, 180°, 270°)"
            },
            {
                name: "tft.fillScreen()",
                type: "function",
                description: "Fills entire screen with specified color"
            },
            {
                name: "tft.setTextColor()",
                type: "function",
                description: "Sets text color and optional background color"
            },
            {
                name: "tft.setCursor()",
                type: "function",
                description: "Sets cursor position for text output (x, y coordinates)"
            }
        ],
        notes: `<p><strong>Display Types Supported:</strong></p>
        <ul>
          <li>TFT LCD displays (ILI9341, ST7735, etc.)</li>
          <li>OLED displays (SSD1306, SH1106)</li>
          <li>E-Paper displays</li>
          <li>LED Matrix displays</li>
        </ul>
        <p><strong>Common Display Connections:</strong></p>
        <ul>
          <li>VCC → 3.3V or 5V (check your display specs)</li>
          <li>GND → Ground</li>
          <li>SCK → GPIO 18 (SPI Clock)</li>
          <li>MOSI → GPIO 23 (SPI Data)</li>
          <li>CS → GPIO 5 (Chip Select)</li>
          <li>DC → GPIO 2 (Data/Command)</li>
          <li>RST → GPIO 4 (Reset)</li>
        </ul>
        <p><strong>Performance Tips:</strong> Use sprites for smooth animations, minimize full-screen updates, and cache frequently used graphics in memory.</p>`
    },
    {
        slug: "handle-json-data",
        title: "Handle JSON Data",
        tags: ["Arduino"],
        description: "Parse and handle JSON data on your microcontroller with this block.",
        link: "/blocks/handle-json-data",
        overview: "This block provides comprehensive JSON handling capabilities for your ESP32 projects. Parse incoming JSON from APIs, create JSON payloads for sending data, and manipulate JSON structures efficiently.",
        features: [
            "JSON parsing and creation",
            "Nested object handling",
            "Array processing",
            "Memory-efficient parsing",
            "Error handling for malformed JSON"
        ],
        code: `#include <ArduinoJson.h>

// Example JSON string to parse
const char* jsonString = R"({
  "sensor": "DHT22",
  "location": "Living Room",
  "timestamp": 1640995200,
  "readings": {
    "temperature": 23.5,
    "humidity": 65.2
  },
  "alerts": ["high_humidity", "normal_temp"]
})";

void setup() {
  Serial.begin(115200);
  
  // Parse JSON
  parseJsonExample();
  
  // Create JSON
  createJsonExample();
}

void parseJsonExample() {
  Serial.println("=== Parsing JSON ===");
  
  // Create JSON document (adjust size based on your JSON)
  DynamicJsonDocument doc(1024);
  
  // Parse the JSON string
  DeserializationError error = deserializeJson(doc, jsonString);
  
  if (error) {
    Serial.print("JSON parsing failed: ");
    Serial.println(error.c_str());
    return;
  }
  
  // Extract simple values
  const char* sensor = doc["sensor"];
  const char* location = doc["location"];
  long timestamp = doc["timestamp"];
  
  Serial.println("Sensor: " + String(sensor));
  Serial.println("Location: " + String(location));
  Serial.println("Timestamp: " + String(timestamp));
  
  // Extract nested object values
  float temperature = doc["readings"]["temperature"];
  float humidity = doc["readings"]["humidity"];
  
  Serial.println("Temperature: " + String(temperature) + "°C");
  Serial.println("Humidity: " + String(humidity) + "%");
  
  // Extract array values
  JsonArray alerts = doc["alerts"];
  Serial.println("Alerts:");
  for (JsonVariant alert : alerts) {
    Serial.println("  - " + String(alert.as<const char*>()));
  }
}

void createJsonExample() {
  Serial.println("\\n=== Creating JSON ===");
  
  // Create new JSON document
  DynamicJsonDocument doc(512);
  
  // Add simple values
  doc["device_id"] = "ESP32_001";
  doc["status"] = "active";
  doc["uptime"] = millis();
  
  // Add nested object
  JsonObject readings = doc.createNestedObject("readings");
  readings["voltage"] = 3.33;
  readings["free_heap"] = ESP.getFreeHeap();
  
  // Add array
  JsonArray networks = doc.createNestedArray("wifi_networks");
  networks.add("HomeNetwork");
  networks.add("OfficeWiFi");
  
  // Serialize to string
  String output;
  serializeJson(doc, output);
  
  Serial.println("Created JSON:");
  Serial.println(output);
  
  // Pretty print version
  Serial.println("\\nPretty printed:");
  serializeJsonPretty(doc, Serial);
  Serial.println();
}

// Function to handle JSON from HTTP response
void processApiResponse(String jsonResponse) {
  DynamicJsonDocument doc(2048);
  DeserializationError error = deserializeJson(doc, jsonResponse);
  
  if (error) {
    Serial.println("Failed to parse API response");
    return;
  }
  
  // Check if response has expected structure
  if (doc.containsKey("data") && doc["data"].is<JsonObject>()) {
    JsonObject data = doc["data"];
    
    // Process the data
    if (data.containsKey("value")) {
      float value = data["value"];
      Serial.println("Received value: " + String(value));
    }
  }
}

void loop() {
  // Example: Process JSON data every 10 seconds
  delay(10000);
  
  // In a real application, you might receive JSON from:
  // - HTTP API responses
  // - MQTT messages
  // - Serial communication
  // - File system
}`,
        usage: `<ol>
          <li>Install the ArduinoJson library (Tools → Manage Libraries → Search "ArduinoJson")</li>
          <li>Include the library in your project with #include &lt;ArduinoJson.h&gt;</li>
          <li>Determine the appropriate document size for your JSON data</li>
          <li>Use deserializeJson() to parse JSON strings</li>
          <li>Use serializeJson() to create JSON strings</li>
          <li>Always check for parsing errors before using the data</li>
        </ol>`,
        parameters: [
            {
                name: "DynamicJsonDocument",
                type: "class",
                description: "Creates a JSON document with dynamic memory allocation"
            },
            {
                name: "deserializeJson()",
                type: "function",
                description: "Parses JSON string into a document object"
            },
            {
                name: "serializeJson()",
                type: "function",
                description: "Converts JSON document to string"
            },
            {
                name: "JsonObject",
                type: "type",
                description: "Represents a JSON object for nested data access"
            },
            {
                name: "JsonArray",
                type: "type",
                description: "Represents a JSON array for handling multiple values"
            },
            {
                name: "createNestedObject()",
                type: "function",
                description: "Creates a nested JSON object within the document"
            }
        ],
        notes: `<p><strong>Memory Management:</strong></p>
        <ul>
          <li>Choose appropriate document size: too small causes parsing failures, too large wastes memory</li>
          <li>Use StaticJsonDocument for known, fixed-size JSON</li>
          <li>Use DynamicJsonDocument for variable-size JSON</li>
          <li>Consider using the ArduinoJson Assistant online tool to calculate optimal size</li>
        </ul>
        <p><strong>Best Practices:</strong></p>
        <ul>
          <li>Always check for parsing errors before accessing data</li>
          <li>Use containsKey() to verify expected fields exist</li>
          <li>Validate data types before casting (is&lt;int&gt;(), is&lt;String&gt;(), etc.)</li>
          <li>Handle missing or null values gracefully</li>
        </ul>
        <p><strong>Common Use Cases:</strong> API responses, configuration files, sensor data transmission, IoT device communication, web service integration.</p>`
    },
    {
        slug: "sensor-input",
        title: "Sensor Input",
        tags: ["Arduino"],
        description: "Read data from different sensors with this block.",
        link: "/blocks/sensor-input",
        overview: "This block provides functionality to read data from various sensors connected to your ESP32, including temperature, humidity, light, motion, and other environmental sensors. Essential for creating responsive IoT applications.",
        features: [
            "Multiple sensor type support",
            "Digital and analog sensor reading",
            "Sensor calibration functions",
            "Data validation and filtering",
            "Interrupt-based sensor handling"
        ],
        code: `#include <DHT.h>

// DHT22 sensor setup
#define DHT_PIN 4
#define DHT_TYPE DHT22
DHT dht(DHT_PIN, DHT_TYPE);

// Analog sensors
#define LIGHT_SENSOR_PIN A0
#define MOTION_SENSOR_PIN 2

// Variables for sensor readings
float temperature = 0.0;
float humidity = 0.0;
int lightLevel = 0;
bool motionDetected = false;

// Motion detection variables
volatile bool motionFlag = false;
unsigned long lastMotionTime = 0;

void setup() {
  Serial.begin(115200);
  
  // Initialize DHT sensor
  dht.begin();
  
  // Setup motion sensor pin
  pinMode(MOTION_SENSOR_PIN, INPUT);
  attachInterrupt(digitalPinToInterrupt(MOTION_SENSOR_PIN), motionInterrupt, RISING);
  
  Serial.println("Sensor monitoring started!");
  Serial.println("Temperature | Humidity | Light Level | Motion");
  Serial.println("------------------------------------------------");
}

void loop() {
  // Read sensors every 2 seconds
  readAllSensors();
  
  // Display sensor data
  displaySensorData();
  
  // Check for motion
  checkMotion();
  
  delay(2000);
}

void readAllSensors() {
  // Read DHT22 sensor
  temperature = dht.readTemperature();
  humidity = dht.readHumidity();
  
  // Validate DHT readings
  if (isnan(temperature) || isnan(humidity)) {
    Serial.println("Failed to read from DHT sensor!");
    temperature = -999;
    humidity = -999;
  }
  
  // Read light sensor (0-4095 on ESP32)
  lightLevel = analogRead(LIGHT_SENSOR_PIN);
  
  // Convert to percentage (0-100%)
  lightLevel = map(lightLevel, 0, 4095, 0, 100);
}

void displaySensorData() {
  Serial.print(temperature, 1);
  Serial.print("°C       | ");
  Serial.print(humidity, 1);
  Serial.print("%        | ");
  Serial.print(lightLevel);
  Serial.print("%          | ");
  Serial.println(motionDetected ? "YES" : "NO");
}

void checkMotion() {
  if (motionFlag) {
    motionDetected = true;
    lastMotionTime = millis();
    motionFlag = false;
    Serial.println("*** MOTION DETECTED! ***");
  }
  
  // Reset motion detection after 5 seconds
  if (motionDetected && (millis() - lastMotionTime > 5000)) {
    motionDetected = false;
  }
}

// Interrupt service routine for motion sensor
void IRAM_ATTR motionInterrupt() {
  motionFlag = true;
}

// Function to get calibrated sensor reading
float getCalibratedTemperature() {
  float rawTemp = dht.readTemperature();
  
  // Apply calibration offset if needed
  float calibrationOffset = -1.5; // Adjust based on your sensor
  
  return rawTemp + calibrationOffset;
}

// Function to filter sensor noise
float getFilteredReading(float newReading, float lastReading, float filterFactor = 0.1) {
  // Simple low-pass filter
  return (filterFactor * newReading) + ((1.0 - filterFactor) * lastReading);
}

// Function to check if reading is within valid range
bool isValidTemperature(float temp) {
  return (temp >= -40.0 && temp <= 80.0);
}

bool isValidHumidity(float humid) {
  return (humid >= 0.0 && humid <= 100.0);
}`,
        usage: `<ol>
          <li>Install the DHT sensor library (Tools → Manage Libraries → Search "DHT sensor library")</li>
          <li>Connect your DHT22 sensor to pin 4 (or modify DHT_PIN)</li>
          <li>Connect light sensor (LDR) to analog pin A0</li>
          <li>Connect motion sensor (PIR) to digital pin 2</li>
          <li>Upload the code to your ESP32</li>
          <li>Open Serial Monitor to see real-time sensor readings</li>
          <li>Move in front of the motion sensor to test detection</li>
        </ol>`,
        parameters: [
            {
                name: "DHT dht",
                type: "object",
                description: "DHT sensor object for temperature and humidity reading"
            },
            {
                name: "dht.readTemperature()",
                type: "function",
                description: "Reads temperature from DHT sensor in Celsius"
            },
            {
                name: "dht.readHumidity()",
                type: "function",
                description: "Reads humidity from DHT sensor as percentage"
            },
            {
                name: "analogRead()",
                type: "function",
                description: "Reads analog voltage from specified pin (0-4095 on ESP32)"
            },
            {
                name: "attachInterrupt()",
                type: "function",
                description: "Attaches interrupt function to digital pin for motion detection"
            },
            {
                name: "map()",
                type: "function",
                description: "Maps a value from one range to another (useful for sensor calibration)"
            }
        ],
        notes: `<p><strong>Common Sensors and Connections:</strong></p>
        <ul>
          <li><strong>DHT22:</strong> VCC→3.3V, GND→GND, DATA→GPIO4</li>
          <li><strong>LDR (Light):</strong> One leg to 3.3V via 10kΩ resistor, other to A0 and GND</li>
          <li><strong>PIR Motion:</strong> VCC→5V, GND→GND, OUT→GPIO2</li>
          <li><strong>Ultrasonic (HC-SR04):</strong> VCC→5V, GND→GND, Trig→GPIO5, Echo→GPIO18</li>
        </ul>
        <p><strong>Sensor Reading Tips:</strong></p>
        <ul>
          <li>Always validate sensor readings before using them</li>
          <li>Implement filtering for noisy sensors</li>
          <li>Use interrupts for time-critical sensors like motion detectors</li>
          <li>Consider sensor warm-up time (DHT22 needs ~2 seconds between readings)</li>
          <li>Add pull-up resistors for digital sensors if needed</li>
        </ul>
        <p><strong>Power Considerations:</strong> Some sensors require 5V while ESP32 runs at 3.3V. Use level shifters or check sensor specifications for compatibility.</p>`
    }
]