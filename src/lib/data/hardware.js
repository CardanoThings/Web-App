export const hardware = [
  {
    name: "Cheap Yellow Display (CYD)",
    slug: "cheap-yellow-display-cyd",
    intro: "The Cheap Yellow Display (CYD) is an affordable ESP32-based development board featuring an integrated 2.8-inch TFT display with resistive touch capabilities, making it perfect for interactive IoT projects and GUIs.",
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
    code: `#include <TFT_eSPI.h>
#include <XPT2046_Touchscreen.h>
#include <SPI.h>

TFT_eSPI tft = TFT_eSPI();
XPT2046_Touchscreen ts(15); // CS pin

void setup() {
  Serial.begin(115200);
  tft.init();
  tft.setRotation(0);
  tft.fillScreen(TFT_BLACK);
  tft.setTextColor(TFT_WHITE, TFT_BLACK);
  tft.setTextSize(2);
  
  ts.begin();
  ts.setRotation(0);
  
  tft.drawString("CYD Test", 50, 100);
}

void loop() {
  if (ts.touched()) {
    TS_Point p = ts.getPoint();
    tft.fillCircle(p.x, p.y, 5, TFT_RED);
    Serial.printf("Touch: x=%d, y=%d\\n", p.x, p.y);
  }
  delay(10);
}`,
    link: "/hardware/cheap-yellow-display-cyd"
  },
  {
    name: "ESP32-C3",
    slug: "esp32-c3",
    intro: "The ESP32-C3 is a cost-effective, RISC-V based microcontroller with Wi-Fi and Bluetooth 5 (LE) support, perfect for IoT applications requiring low power consumption and modern architecture.",
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
    code: `#include <WiFi.h>

const char* ssid = "YOUR_WIFI_SSID";
const char* password = "YOUR_WIFI_PASSWORD";

void setup() {
  Serial.begin(115200);
  delay(1000);
  
  // Initialize WiFi
  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid, password);
  
  Serial.print("Connecting to WiFi");
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  
  Serial.println();
  Serial.print("Connected! IP address: ");
  Serial.println(WiFi.localIP());
  
  pinMode(8, OUTPUT); // Built-in LED on GPIO 8
}

void loop() {
  digitalWrite(8, HIGH);
  delay(500);
  digitalWrite(8, LOW);
  delay(500);
  Serial.println("ESP32-C3 running...");
}`,
    link: "/hardware/esp32-c3"
  },
  {
    name: "Relay Module 3V, 1 Channel",
    slug: "relay-module-3v-1channel",
    intro: "A low-voltage 3V single-channel relay module with opto-isolation, perfect for controlling AC/DC devices safely from ESP32 or other 3.3V microcontrollers without level shifters.",
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
    code: `// 3V Relay Module Control
// Connect: VCC -> 3.3V, GND -> GND, IN -> GPIO 12

const int relayPin = 12; // GPIO pin connected to relay IN

void setup() {
  Serial.begin(115200);
  pinMode(relayPin, OUTPUT);
  digitalWrite(relayPin, HIGH); // Start with relay OFF (active LOW)
  Serial.println("Relay module initialized");
}

void loop() {
  // Turn relay ON (active LOW)
  Serial.println("Relay ON");
  digitalWrite(relayPin, LOW);
  delay(2000);
  
  // Turn relay OFF
  Serial.println("Relay OFF");
  digitalWrite(relayPin, HIGH);
  delay(2000);
}`,
    link: "/hardware/relay-module-3v-1channel"
  },
  {
    name: "WS2812B LED Matrix 8x8",
    slug: "ws2812b-led-matrix-8x8",
    intro: "An 8x8 RGB LED matrix using WS2812B addressable LEDs, capable of displaying 64 individually controllable pixels with 24-bit color. Perfect for creating colorful displays, animations, and visual effects.",
    features: [
      "64 WS2812B addressable RGB LEDs (8x8 grid)",
      "24-bit color depth (16.7 million colors)",
      "Single-wire data interface (DIN/DOUT)",
      "5V operation (3.3V logic compatible with level shifter)",
      "Cascadable via DOUT pin",
      "Refresh rate: up to 800 Hz",
      "Low power consumption per LED",
      "No external resistors needed"
    ],
    howToUse: "Connect VCC to 5V, GND to ground, DIN to a digital GPIO pin (e.g., GPIO 2). For ESP32, use a level shifter or connect directly (works but not recommended for long wires). Use FastLED or NeoPixel library to control individual LEDs. The matrix is addressed as a linear array of 64 LEDs (0-63).",
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
        url: "https://www.amazon.com/s?k=ws2812b+8x8+matrix"
      }
    ],
    libraries: [
      "FastLED (by FastLED)",
      "Adafruit NeoPixel (alternative)"
    ],
    code: `#include <FastLED.h>

#define LED_PIN     2    // GPIO pin connected to DIN
#define NUM_LEDS    64   // 8x8 = 64 LEDs
#define BRIGHTNESS  50   // 0-255
#define LED_TYPE    WS2812B
#define COLOR_ORDER GRB

CRGB leds[NUM_LEDS];

void setup() {
  Serial.begin(115200);
  FastLED.addLeds<LED_TYPE, LED_PIN, COLOR_ORDER>(leds, NUM_LEDS);
  FastLED.setBrightness(BRIGHTNESS);
  Serial.println("WS2812B Matrix initialized");
}

void loop() {
  // Fill with rainbow colors
  for (int i = 0; i < NUM_LEDS; i++) {
    leds[i] = CHSV((i * 256 / NUM_LEDS + millis() / 10) % 256, 255, 255);
  }
  FastLED.show();
  delay(10);
  
  // Example: Draw a pattern
  // fill_solid(leds, NUM_LEDS, CRGB::Black);
  // leds[XY(3, 3)] = CRGB::Red;  // Center pixel
  // FastLED.show();
}

// Helper function to convert X,Y to linear index (if needed)
uint8_t XY(uint8_t x, uint8_t y) {
  return y * 8 + x;
}`,
    link: "/hardware/ws2812b-led-matrix-8x8"
  },
  {
    name: "1.3 Inch OLED Display (SH1106, I2C)",
    slug: "oled-display-sh1106-13inch-i2c",
    intro: "A compact 1.3-inch monochrome OLED display using the SH1106 controller with I2C interface. Features high contrast, low power consumption, and excellent visibility even in bright light conditions.",
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
    code: `#include <Wire.h>
#include <Adafruit_GFX.h>
#include <Adafruit_SH110X.h>

#define SCREEN_WIDTH 128
#define SCREEN_HEIGHT 64
#define OLED_RESET -1
#define SCREEN_ADDRESS 0x3C // or 0x3D

Adafruit_SH1106G display = Adafruit_SH1106G(SCREEN_WIDTH, SCREEN_HEIGHT, &Wire, OLED_RESET);

void setup() {
  Serial.begin(115200);
  
  // Initialize I2C and display
  if (!display.begin(SCREEN_ADDRESS)) {
    Serial.println(F("SH1106 allocation failed"));
    for (;;); // Don't proceed
  }
  
  display.display();
  delay(2000);
  display.clearDisplay();
  
  // Display text
  display.setTextSize(1);
  display.setTextColor(SH110X_WHITE);
  display.setCursor(0, 0);
  display.println("Hello, World!");
  display.println("SH1106 OLED");
  display.println("128x64 pixels");
  display.display();
}

void loop() {
  // Draw a simple animation
  display.clearDisplay();
  display.setCursor(0, 0);
  display.print("Time: ");
  display.print(millis() / 1000);
  display.println(" sec");
  
  // Draw a rectangle
  display.drawRect(10, 20, 50, 30, SH110X_WHITE);
  display.fillRect(70, 20, 30, 30, SH110X_WHITE);
  
  display.display();
  delay(100);
}`,
    link: "/hardware/oled-display-sh1106-13inch-i2c"
  },
  {
    name: "SHT21 Temperature Sensor (I2C)",
    slug: "sht21-temperature-sensor-i2c",
    intro: "A high-precision digital temperature and humidity sensor from Sensirion with I2C interface. Features excellent accuracy, low power consumption, and factory-calibrated measurements.",
    features: [
      "Temperature range: -40 to +125°C",
      "Temperature accuracy: ±0.3°C (typical)",
      "Humidity range: 0 to 100% RH",
      "Humidity accuracy: ±2% RH (typical)",
      "I2C interface (SDA, SCL)",
      "3.3V operation",
      "Low power consumption",
      "Factory calibrated",
      "Fast response time",
      "No external components needed"
    ],
    howToUse: "Connect VCC to 3.3V, GND to ground, SDA to GPIO 21 (ESP32) or SDA pin, SCL to GPIO 22 (ESP32) or SCL pin. Use Sensirion SHT2x library or SparkFun SHT21 library. The sensor requires I2C pull-up resistors (usually included on module). Default I2C address is 0x40.",
    resources: [
      {
        name: "SHT21 Datasheet",
        url: "https://www.sensirion.com/fileadmin/user_upload/customers/sensirion/Dokumente/2_Humidity_Sensors/Sensirion_Humidity_Sensors_SHT21_Datasheet.pdf"
      },
      {
        name: "Schematic",
        url: "https://www.sensirion.com/fileadmin/user_upload/customers/sensirion/Dokumente/2_Humidity_Sensors/Application_Note_SHT2x_I2C_Interface.pdf"
      },
      {
        name: "SparkFun Library",
        url: "https://github.com/sparkfun/SparkFun_SHT21_Arduino_Library"
      },
      {
        name: "Tutorial",
        url: "https://learn.sparkfun.com/tutorials/sht21-humidity-sensor-hookup-guide"
      }
    ],
    whereToBuy: [
      {
        name: "AliExpress",
        url: "https://www.aliexpress.com/item/1005001621294563.html"
      },
      {
        name: "Amazon",
        url: "https://www.amazon.com/s?k=sht21+temperature+sensor"
      }
    ],
    libraries: [
      "SparkFun SHT21 Arduino Library (by SparkFun)",
      "Wire (built-in I2C)"
    ],
    code: `#include <Wire.h>
#include <SparkFun_SHT21.h>

SHT21 sht21;

void setup() {
  Serial.begin(115200);
  Wire.begin();
  
  // Initialize SHT21
  sht21.begin();
  
  Serial.println("SHT21 Temperature & Humidity Sensor");
  Serial.println("-----------------------------------");
}

void loop() {
  // Read temperature
  float temperature = sht21.getTemperature();
  
  // Read humidity
  float humidity = sht21.getHumidity();
  
  // Print readings
  Serial.print("Temperature: ");
  Serial.print(temperature, 2);
  Serial.println(" °C");
  
  Serial.print("Humidity: ");
  Serial.print(humidity, 2);
  Serial.println(" %RH");
  
  Serial.println("-----------------------------------");
  
  delay(2000); // Wait 2 seconds between readings
}`,
    link: "/hardware/sht21-temperature-sensor-i2c"
  }
];
