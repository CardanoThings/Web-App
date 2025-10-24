export function load() {
    return {
        title: "Handle JSON Data",
        description: "Parse and handle JSON data with this block.",
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
    };
}