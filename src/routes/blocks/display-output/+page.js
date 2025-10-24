export function load() {
    return {
        title: "Display Output",
        description: "Output data to various displays using this block.",
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
    };
}