export const hardware = [
  {
    name: "Cheap Yellow Display (CYD)",
    slug: "cheap-yellow-display-cyd",
    intro: "The Cheap Yellow Display (CYD) is an affordable ESP32-based development board featuring an integrated 2.8-inch TFT display with resistive touch capabilities, making it perfect for interactive IoT projects and GUIs.",
    images: [
      "/images/hardware/cyd-01.webp",
      "/images/hardware/cyd-02.webp"
    ],
    features: [
      "ESP32-WROOM-32 microcontroller (240 MHz dual-core)",
      "2.8\" 320x240 ILI9341 TFT LCD display",
      "Resistive touch panel (XPT2046)",
      "MicroSD card slot",
      "3.5mm audio jack with speaker amplifier",
      "LiPo battery connector (with charging circuit)",
      "30+ GPIO pins",
      "WiFi and Bluetooth support",
      "USB-C for programming and power"
    ],
    howToUse: "Connect via USB-C to computer, select ESP32 Dev Module in Arduino IDE. The display is pre-wired to specific GPIOs (typically TFT_CS=5, TFT_DC=2, TFT_RST=4, TFT_MOSI=23, TFT_SCLK=18, TFT_MISO=19). Use TFT_eSPI library with proper pin configuration. Touch input via XPT2046 controller on GPIOs 15, 2, 0, 4.",
    resources: [
      {
        name: "Datasheet - ESP32",
        url: "https://www.espressif.com/sites/default/files/documentation/esp32_datasheet_en.pdf"
      },
      {
        name: "Datasheet - ILI9341",
        url: "https://cdn-shop.adafruit.com/datasheets/ILI9341.pdf"
      },
      {
        name: "Schematic",
        url: "https://github.com/witnessmenow/ESP32-Cheap-Yellow-Display/blob/main/pinout.png"
      },
      {
        name: "Pinout Diagram",
        url: "https://github.com/witnessmenow/ESP32-Cheap-Yellow-Display/blob/main/pinout.png"
      },
      {
        name: "Tutorial",
        url: "https://randomnerdtutorials.com/esp32-cheap-yellow-display/"
      }
    ],
    whereToBuy: [
      {
        name: "AliExpress",
        url: "https://www.aliexpress.com/item/1005001621096425.html"
      },
      {
        name: "Amazon",
        url: "https://www.amazon.com/s?k=esp32+cheap+yellow+display"
      }
    ],
    libraries: [
      "TFT_eSPI (by Bodmer)",
      "XPT2046_Touchscreen (by Paul Stoffregen)"
    ],
    code: `// Cheap Yellow Display (CYD) - TFT Display and Touchscreen Example
// This example demonstrates how to use the integrated TFT display and touchscreen

// Include required libraries
#include <TFT_eSPI.h>              // TFT display library for ILI9341
#include <XPT2046_Touchscreen.h>   // Touchscreen controller library
#include <SPI.h>                   // SPI communication library

// Initialize display and touchscreen objects
TFT_eSPI tft = TFT_eSPI();                    // Create TFT display object
XPT2046_Touchscreen ts(15);                    // Create touchscreen object (CS pin on GPIO 15)

void setup() {
  // Initialize serial communication for debugging
  Serial.begin(115200);
  
  // Initialize and configure the TFT display
  tft.init();                      // Initialize the display
  tft.setRotation(0);              // Set display rotation (0-3 for 0°, 90°, 180°, 270°)
  tft.fillScreen(TFT_BLACK);       // Fill screen with black color
  tft.setTextColor(TFT_WHITE, TFT_BLACK);  // Set text color (foreground, background)
  tft.setTextSize(2);              // Set text size (1-8)
  
  // Initialize and configure the touchscreen
  ts.begin();                      // Initialize touchscreen
  ts.setRotation(0);               // Set touchscreen rotation to match display
  
  // Draw initial text on the display
  tft.drawString("CYD Test", 50, 100);  // Draw string at coordinates (x, y)
}

void loop() {
  // Check if the touchscreen is being touched
  if (ts.touched()) {
    // Get the touch point coordinates
    TS_Point p = ts.getPoint();
    
    // Draw a red circle at the touch point
    tft.fillCircle(p.x, p.y, 5, TFT_RED);  // Draw filled circle (x, y, radius, color)
    
    // Print touch coordinates to serial monitor
    Serial.printf("Touch: x=%d, y=%d\\n", p.x, p.y);
  }
  
  // Small delay to prevent excessive processing
  delay(10);
}`,
    link: "/hardware/cheap-yellow-display-cyd"
  },
  {
    name: "ESP32-C3",
    slug: "esp32-c3",
    intro: "The ESP32-C3 is a cost-effective, RISC-V based microcontroller with Wi-Fi and Bluetooth 5 (LE) support, perfect for IoT applications requiring low power consumption and modern architecture.",
    images: [
      "/images/hardware/esp32c3-01.webp",
      "/images/hardware/esp32c3-02.webp",
      "/images/hardware/esp32c3-03.webp"
    ],
    features: [
      "RISC-V 32-bit single-core processor (up to 160 MHz)",
      "400 KB SRAM, 384 KB ROM",
      "2.4 GHz Wi-Fi (802.11 b/g/n)",
      "Bluetooth 5 (LE only)",
      "22 GPIOs, ADC, I2C, SPI, UART",
      "USB-to-UART bridge for programming",
      "USB-C for power/programming",
      "Lower power consumption than ESP32",
      "Built-in USB support"
    ],
    howToUse: "Connect via USB-C to computer, select ESP32C3 Dev Module in Arduino IDE. Install ESP32 board support via Board Manager. Use GPIOs for sensors/displays, WiFi for internet connectivity. Note: Some GPIOs are input-only, check pinout before use.",
    resources: [
      {
        name: "Datasheet",
        url: "https://www.espressif.com/sites/default/files/documentation/esp32-c3_datasheet_en.pdf"
      },
      {
        name: "Pinout Diagram",
        url: "https://randomnerdtutorials.com/esp32-c3-pinout-reference-gpios/"
      },
      {
        name: "Technical Reference Manual",
        url: "https://www.espressif.com/sites/default/files/documentation/esp32-c3_technical_reference_manual_en.pdf"
      },
      {
        name: "Schematic",
        url: "https://docs.espressif.com/projects/esp-idf/en/latest/esp32c3/hw-reference/esp32c3/user-guide-devkitm-1.html"
      }
    ],
    whereToBuy: [
      {
        name: "AliExpress",
        url: "https://www.aliexpress.com/item/1005001621294563.html"
      },
      {
        name: "Amazon",
        url: "https://www.amazon.com/s?k=esp32-c3+devkit"
      }
    ],
    libraries: [
      "WiFi (built-in)",
      "BluetoothSerial (built-in)",
      "ArduinoJson (by Benoit Blanchon)"
    ],
    code: `// ESP32-C3 WiFi Connection Example
// This example demonstrates how to connect to WiFi and blink the built-in LED

// Include WiFi library (built-in)
#include <WiFi.h>

// WiFi network credentials - replace with your network details
const char* ssid = "YOUR_WIFI_SSID";        // Your WiFi network name
const char* password = "YOUR_WIFI_PASSWORD"; // Your WiFi password

void setup() {
  // Initialize serial communication for debugging
  Serial.begin(115200);
  delay(1000);  // Wait for serial monitor to open
  
  // Configure WiFi mode as Station (client mode)
  WiFi.mode(WIFI_STA);
  
  // Set WiFi transmit power (workaround for ESP32-C3 Super Mini)
  WiFi.setTxPower(WIFI_POWER_8_5dBm);
  
  // Begin WiFi connection with credentials
  WiFi.begin(ssid, password);
  
  // Wait for WiFi connection to be established
  Serial.print("Connecting to WiFi");
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");  // Print dots while connecting
  }
  
  // Connection successful - print IP address
  Serial.println();
  Serial.print("Connected! IP address: ");
  Serial.println(WiFi.localIP());  // Print the assigned IP address
  
  // Configure built-in LED pin (GPIO 8 on ESP32-C3)
  pinMode(8, OUTPUT);
}

void loop() {
  // Blink the built-in LED
  digitalWrite(8, HIGH);  // Turn LED on
  delay(500);              // Wait 500ms
  digitalWrite(8, LOW);    // Turn LED off
  delay(500);              // Wait 500ms
  
  // Print status message
  Serial.println("ESP32-C3 running...");
}`,
    link: "/hardware/esp32-c3"
  },
  {
    name: "Relay Module 3V, 1 Channel",
    slug: "relay-module-3v-1channel",
    intro: "A low-voltage 3V single-channel relay module with opto-isolation, perfect for controlling AC/DC devices safely from ESP32 or other 3.3V microcontrollers without level shifters.",
    images: [
      "/images/hardware/relay-01.webp",
      "/images/hardware/relay-02.webp"
    ],
    features: [
      "3.3V operation (compatible with ESP32)",
      "Single channel relay",
      "Normally open (NO) and normally closed (NC) contacts",
      "Max load: 10A/250VAC or 10A/30VDC",
      "Opto-isolated input for safety",
      "LED indicator for relay status",
      "Low trigger (active LOW)",
      "No external driver circuit needed"
    ],
    howToUse: "Connect VCC to 3.3V, GND to ground, IN to any digital GPIO pin (e.g., GPIO 12). Set pin LOW to activate relay (active LOW). The relay can control lights, motors, or other AC/DC devices up to 10A. Always use proper safety precautions when working with AC voltage.",
    resources: [
      {
        name: "Relay Module Schematic",
        url: "https://components101.com/sites/default/files/component_datasheet/1%20Channel%20Relay%20Module%20Datasheet.pdf"
      },
      {
        name: "Tutorial",
        url: "https://randomnerdtutorials.com/guide-for-relay-module-with-arduino/"
      },
      {
        name: "Safety Guide",
        url: "https://randomnerdtutorials.com/relay-module-with-esp32-esp8266-arduino/"
      }
    ],
    whereToBuy: [
      {
        name: "AliExpress",
        url: "https://www.aliexpress.com/item/1005001621294563.html"
      },
      {
        name: "Amazon",
        url: "https://www.amazon.com/s?k=3v+relay+module+1+channel"
      }
    ],
    libraries: [
      "No external library required (uses digitalWrite)"
    ],
    code: `// 3V Relay Module Control Example
// This example demonstrates how to control a 3V single-channel relay module
// 
// Wiring:
//   VCC -> 3.3V
//   GND -> GND
//   IN  -> GPIO 12
//
// Note: This relay module is active LOW (LOW = ON, HIGH = OFF)

// Define the GPIO pin connected to the relay IN pin
const int relayPin = 12;  // Change this to match your wiring

void setup() {
  // Initialize serial communication for debugging
  Serial.begin(115200);
  
  // Configure relay pin as output
  pinMode(relayPin, OUTPUT);
  
  // Set relay to OFF state initially (HIGH = OFF for active LOW relay)
  digitalWrite(relayPin, HIGH);
  
  // Confirm initialization
  Serial.println("Relay module initialized");
}

void loop() {
  // Turn relay ON (set pin LOW for active LOW relay)
  Serial.println("Relay ON");
  digitalWrite(relayPin, LOW);  // LOW activates the relay
  delay(2000);                  // Keep relay ON for 2 seconds
  
  // Turn relay OFF (set pin HIGH for active LOW relay)
  Serial.println("Relay OFF");
  digitalWrite(relayPin, HIGH); // HIGH deactivates the relay
  delay(2000);                   // Keep relay OFF for 2 seconds
  
  // This creates a 2-second ON/OFF cycle
}`,
    link: "/hardware/relay-module-3v-1channel"
  },
  {
    name: "WS2812B LED Ring (12 LEDs)",
    slug: "ws2812b-led-ring-12",
    intro: "A circular RGB LED ring using WS2812B addressable LEDs with 12 individually controllable pixels with 24-bit color. Perfect for creating clock-like displays, progress indicators, and circular animations.",
    images: [
      "/images/hardware/led-ring-01.webp",
      "/images/hardware/led-ring-02.webp",
      "/images/hardware/led-ring-03.webp"
    ],
    features: [
      "12 WS2812B addressable RGB LEDs arranged in a circle",
      "24-bit color depth (16.7 million colors)",
      "Single-wire data interface (DIN/DOUT)",
      "5V operation (3.3V logic compatible with level shifter)",
      "Cascadable via DOUT pin",
      "Refresh rate: up to 800 Hz",
      "Low power consumption per LED",
      "No external resistors needed",
      "Perfect for clock displays and progress indicators"
    ],
    howToUse: "Connect V+ to 5V, V- to ground, IN to a digital GPIO pin (e.g., GPIO 4). For ESP32, use a level shifter or connect directly (works but not recommended for long wires). Use Adafruit NeoPixel library to control individual LEDs. The ring is addressed as a linear array of 12 LEDs (0-11). Set brightness low (5/255) when powered via USB to protect the microcontroller.",
    resources: [
      {
        name: "WS2812B Datasheet",
        url: "https://cdn-shop.adafruit.com/datasheets/WS2812B.pdf"
      },
      {
        name: "FastLED Library",
        url: "https://github.com/FastLED/FastLED"
      },
      {
        name: "Tutorial",
        url: "https://randomnerdtutorials.com/esp32-ws2812b-addressable-rgb-leds-neopixel/"
      },
      {
        name: "Schematic",
        url: "https://learn.adafruit.com/adafruit-neopixel-uberguide/neomatrix-library"
      }
    ],
    whereToBuy: [
      {
        name: "AliExpress",
        url: "https://www.aliexpress.com/item/1005001621294563.html"
      },
      {
        name: "Amazon",
        url: "https://www.amazon.com/s?k=ws2812b+led+ring+12"
      }
    ],
    libraries: [
      "FastLED (by FastLED)",
      "Adafruit NeoPixel (alternative)"
    ],
    code: `// WS2812B LED Ring (12 LEDs) Example
// This example demonstrates how to control a WS2812B LED ring with a simple blink pattern
//
// Wiring:
//   V+ -> 5V
//   V- -> GND
//   IN -> GPIO 4 (or any digital pin)

// Include Adafruit NeoPixel library
#include <Adafruit_NeoPixel.h>

// Configuration defines
#define LED_PIN     4    // GPIO pin connected to ring IN pin
#define NUM_LEDS    12   // Total number of LEDs in the ring
#define BRIGHTNESS  5    // Brightness level (0-255, very low for USB power safety)

// Create NeoPixel object
Adafruit_NeoPixel strip = Adafruit_NeoPixel(NUM_LEDS, LED_PIN, NEO_GRB + NEO_KHZ800);

void setup() {
  // Initialize serial communication for debugging
  Serial.begin(115200);
  
  // Initialize the NeoPixel ring
  strip.begin();
  
  // Set brightness to a very low value to protect ESP32-C3
  strip.setBrightness(BRIGHTNESS);
  
  // Clear all LEDs
  strip.clear();
  strip.show();
  
  Serial.println("WS2812B LED Ring initialized");
}

void loop() {
  // Loop through all 12 LEDs one at a time
  for (int i = 0; i < NUM_LEDS; i++) {
    // Clear all LEDs first
    strip.clear();
    
    // Set the current LED to white
    strip.setPixelColor(i, strip.Color(255, 255, 255));
    
    // Update the ring to show the change
    strip.show();
    
    // Wait 200 milliseconds before moving to next LED
    delay(200);
  }
  
  // After all LEDs have been lit, clear the display
  strip.clear();
  strip.show();
  
  // Wait 1 second before starting the sequence again
  delay(1000);
}`,
    link: "/hardware/ws2812b-led-ring-12"
  },
  {
    name: "1.3 Inch OLED Display (SH1106, I2C)",
    slug: "oled-display-sh1106-13inch-i2c",
    intro: "A compact 1.3-inch monochrome OLED display using the SH1106 controller with I2C interface. Features high contrast, low power consumption, and excellent visibility even in bright light conditions.",
    images: [
      "/images/hardware/oled-01.webp",
      "/images/hardware/oled-02.webp",
      "/images/hardware/oled-03.webp",
      "/images/hardware/oled-04.webp"
    ],
    features: [
      "1.3\" diagonal display",
      "128x64 pixel resolution",
      "SH1106 controller",
      "I2C interface (SDA, SCL)",
      "3.3V or 5V operation",
      "High contrast monochrome OLED",
      "Wide viewing angle",
      "Low power consumption",
      "No backlight needed"
    ],
    howToUse: "Connect VCC to 3.3V or 5V, GND to ground, SDA to GPIO 21 (ESP32) or SDA pin, SCL to GPIO 22 (ESP32) or SCL pin. Use Adafruit SH110X or U8g2 library. The display requires I2C pull-up resistors (usually included on module). Default I2C address is 0x3C or 0x3D.",
    resources: [
      {
        name: "SH1106 Datasheet",
        url: "https://www.velleman.eu/downloads/29/infosheets/sh1106_datasheet.pdf"
      },
      {
        name: "Adafruit SH110X Library",
        url: "https://github.com/adafruit/Adafruit_SH110X"
      },
      {
        name: "Schematic",
        url: "https://learn.adafruit.com/monochrome-oled-breakouts/wiring"
      },
      {
        name: "Tutorial",
        url: "https://randomnerdtutorials.com/esp32-oled-display-ssd1306-sh1106/"
      }
    ],
    whereToBuy: [
      {
        name: "AliExpress",
        url: "https://www.aliexpress.com/item/1005001621294563.html"
      },
      {
        name: "Amazon",
        url: "https://www.amazon.com/s?k=sh1106+1.3+inch+oled"
      }
    ],
    libraries: [
      "Adafruit SH110X (by Adafruit)",
      "Adafruit GFX Library (dependency)",
      "Wire (built-in I2C)"
    ],
    code: `// SH1106 1.3" OLED Display Example
// This example demonstrates how to use a SH1106 OLED display via I2C
//
// Wiring:
//   VCC -> 3.3V or 5V
//   GND -> GND
//   SDA -> GPIO 21 (ESP32) or SDA pin
//   SCL -> GPIO 22 (ESP32) or SCL pin

// Include required libraries
#include <Wire.h>              // I2C communication library (built-in)
#include <Adafruit_GFX.h>      // Graphics library for drawing functions
#include <Adafruit_SH110X.h>   // SH1106 display driver library

// Display configuration
#define SCREEN_WIDTH 128      // Display width in pixels
#define SCREEN_HEIGHT 64      // Display height in pixels
#define OLED_RESET -1         // Reset pin (not used, set to -1)
#define SCREEN_ADDRESS 0x3C   // I2C address (try 0x3D if 0x3C doesn't work)

// Create display object
Adafruit_SH1106G display = Adafruit_SH1106G(SCREEN_WIDTH, SCREEN_HEIGHT, &Wire, OLED_RESET);

void setup() {
  // Initialize serial communication for debugging
  Serial.begin(115200);
  
  // Initialize I2C bus and display
  // If initialization fails, print error and stop execution
  if (!display.begin(SCREEN_ADDRESS)) {
    Serial.println(F("SH1106 allocation failed"));
    for (;;);  // Infinite loop - don't proceed if display fails
  }
  
  // Display splash screen (shows Adafruit logo by default)
  display.display();
  delay(2000);  // Show splash for 2 seconds
  
  // Clear the display
  display.clearDisplay();
  
  // Configure text settings
  display.setTextSize(1);                    // Set text size (1 = smallest)
  display.setTextColor(SH110X_WHITE);        // Set text color (white on black)
  display.setCursor(0, 0);                   // Set cursor to top-left (x, y)
  
  // Display initial text
  display.println("Hello, World!");          // Print text and move to next line
  display.println("SH1106 OLED");
  display.println("128x64 pixels");
  
  // Update display to show the text
  display.display();
}

void loop() {
  // Clear display before drawing new content
  display.clearDisplay();
  
  // Display running time
  display.setCursor(0, 0);                   // Set cursor to top-left
  display.print("Time: ");                   // Print label
  display.print(millis() / 1000);            // Print seconds since startup
  display.println(" sec");                   // Print unit and newline
  
  // Draw shapes to demonstrate graphics capabilities
  display.drawRect(10, 20, 50, 30, SH110X_WHITE);   // Draw outline rectangle (x, y, width, height, color)
  display.fillRect(70, 20, 30, 30, SH110X_WHITE);   // Draw filled rectangle (x, y, width, height, color)
  
  // Update display to show all changes
  display.display();
  
  // Small delay for animation smoothness
  delay(100);
}`,
    link: "/hardware/oled-display-sh1106-13inch-i2c"
  },
  {
    name: "AHT10 Temperature and Humidity Sensor (I2C)",
    slug: "aht10-temperature-humidity-sensor-i2c",
    intro: "A high-precision digital temperature and humidity sensor from Aosong with I2C interface. Features excellent accuracy, low power consumption, and factory-calibrated measurements with fast response time.",
    images: [
      "/images/hardware/aht10.webp",
    ],
    features: [
      "Temperature range: -40 to +85°C",
      "Temperature accuracy: ±0.3°C (typical)",
      "Temperature resolution: 0.01°C",
      "Humidity range: 0 to 100% RH",
      "Humidity accuracy: ±2% RH (typical)",
      "Humidity resolution: 0.024% RH",
      "I2C interface (SDA, SCL)",
      "Operating voltage: 1.8V to 6.0V (3.3V recommended)",
      "Low power consumption",
      "Factory calibrated",
      "Fast response time",
      "Compact SMD package"
    ],
    howToUse: "Connect VCC to 3.3V, GND to ground, SDA to GPIO 21 (ESP32) or SDA pin, SCL to GPIO 22 (ESP32) or SCL pin. Use AHT10 library or Adafruit AHTX0 library. The sensor requires I2C pull-up resistors (usually included on module). Default I2C address is 0x38. Note: For similar temperature/humidity sensing, consider the SHT21 sensor. For temperature and barometric pressure, the GY-BMP280 (BMP280) is an excellent alternative.",
    resources: [
      {
        name: "AHT10 Datasheet",
        url: "https://www.aosong.com/userfiles/files/media/AHT10%20%E8%8B%B1%E6%96%87%E7%89%88%E6%9C%AC%20Datasheet%20AHT10.pdf"
      },
      {
        name: "Adafruit AHTX0 Library",
        url: "https://github.com/adafruit/Adafruit_AHTX0"
      },
      {
        name: "AHT10 Arduino Library",
        url: "https://github.com/enjoyneering/AHT10"
      },
      {
        name: "Tutorial",
        url: "https://randomnerdtutorials.com/esp32-aht10-humidity-temperature-sensor-arduino/"
      },
      {
        name: "Alternative Sensors",
        url: "https://randomnerdtutorials.com/esp32-sensors-tutorials/"
      }
    ],
    whereToBuy: [
      {
        name: "AliExpress",
        url: "https://www.aliexpress.com/item/1005001621294563.html"
      },
      {
        name: "Amazon",
        url: "https://www.amazon.com/s?k=aht10+temperature+humidity+sensor"
      }
    ],
    libraries: [
      "Adafruit AHTX0 (by Adafruit)",
      "Adafruit Unified Sensor (dependency)",
      "Wire (built-in I2C)"
    ],
    code: `// AHT10 Temperature and Humidity Sensor Example
// This example demonstrates how to read temperature and humidity from AHT10 sensor
//
// Wiring:
//   VCC -> 3.3V
//   GND -> GND
//   SDA -> GPIO 21 (ESP32) or SDA pin
//   SCL -> GPIO 22 (ESP32) or SCL pin
//
// Note: I2C pull-up resistors are usually included on the sensor module

// Include required libraries
#include <Wire.h>                    // I2C communication library (built-in)
#include <Adafruit_AHTX0.h>         // AHT10 sensor library

// Create sensor object
Adafruit_AHTX0 aht;

void setup() {
  // Initialize serial communication for debugging
  Serial.begin(115200);
  
  // Wait for serial monitor to open (optional, for debugging)
  while (!Serial) {
    delay(10);
  }
  
  // Initialize AHT10 sensor
  if (!aht.begin()) {
    Serial.println("Could not find AHT10 sensor! Check wiring.");
    while (1) delay(10);  // Halt execution if sensor not found
  }
  
  // Print header information
  Serial.println("AHT10 Temperature & Humidity Sensor");
  Serial.println("-----------------------------------");
}

void loop() {
  // Create sensor event objects to hold readings
  sensors_event_t humidity, temp;
  
  // Read temperature and humidity from sensor
  aht.getEvent(&humidity, &temp);
  
  // Print temperature reading with 2 decimal places
  Serial.print("Temperature: ");
  Serial.print(temp.temperature, 2);  // Print with 2 decimal places
  Serial.println(" °C");
  
  // Print humidity reading with 2 decimal places
  Serial.print("Humidity: ");
  Serial.print(humidity.relative_humidity, 2);  // Print with 2 decimal places
  Serial.println(" %RH");                        // %RH = Percentage Relative Humidity
  
  // Print separator line
  Serial.println("-----------------------------------");
  
  // Wait 2 seconds before next reading
  // This prevents excessive sensor queries and reduces power consumption
  delay(2000);
}`,
    link: "/hardware/aht10-temperature-humidity-sensor-i2c"
  }
];
