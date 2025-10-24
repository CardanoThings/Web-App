export function load() {
    return {
        title: "HTTP Requests",
        description: "Fetch data from REST APIs with this simple block.",
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
    };
}