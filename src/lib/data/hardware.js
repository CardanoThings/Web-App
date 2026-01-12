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
    resources: [
      {
        name: "ESP32 CYD Case STL Files",
        url: "https://www.thingiverse.com/thing:6653040"
      },
      {
        name: "ESP32 CYD - Getting Started Guide",
        url: "https://github.com/witnessmenow/ESP32-Cheap-Yellow-Display"
      },
      {
        name: "ESP32 CYD Pins",
        url: "https://github.com/witnessmenow/ESP32-Cheap-Yellow-Display/blob/main/PINS.md"
      },
      {
        name: "ESP32 CYD on Random Nerd Tutorials",
        url: "https://randomnerdtutorials.com/cheap-yellow-display-esp32-2432s028r/"
      },
    ],
    whereToBuy: [
      {
        name: "AliExpress",
        url: "https://s.click.aliexpress.com/e/_c3AtbKgB"
      },
      {
        name: "Amazon US",
        url: "https://amzn.to/4jy26EG"
      },
      {
        name: "Amazon Germany",
        url: "https://amzn.to/3LEmpUo"
      },
    ],
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
    resources: [
      {
        name: "Datasheet",
        url: "https://www.espressif.com/sites/default/files/documentation/esp32-c3_datasheet_en.pdf"
      },
      {
        name: "Technical Reference Manual",
        url: "https://www.espressif.com/sites/default/files/documentation/esp32-c3_technical_reference_manual_en.pdf"
      },
      {
        name: "Pinout Diagram",
        url: "https://i0.wp.com/randomnerdtutorials.com/wp-content/uploads/2025/05/ESP32-C3-Super-Mini-Pinout-f.png?w=918&quality=100&strip=all&ssl=1"
      },
      {
        name: "ESP32-C3 Super Mini Case STL Files",
        url: "https://www.printables.com/model/1137008-esp32-c3c6h2s3-super-mini-case"
      },
      {
        name: "ESP32-C3 on Random Nerd Tutorials",
        url: "https://randomnerdtutorials.com/getting-started-esp32-c3-super-mini/"
      },
      {
        name: "ESP32io.com",
        url: "https://esp32io.com/"
      },
    ],
    whereToBuy: [
      {
        name: "AliExpress",
        url: "https://s.click.aliexpress.com/e/_c3Eyz6EL"
      },
      {
        name: "Amazon US",
        url: "https://amzn.to/49V8xgT"
      },
      {
        name: "Amazon Germany",
        url: "https://amzn.to/4sv2isB"
      }
    ],
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
    resources: [
      {
        name: "ESP32 IO Tutorial",
        url: "https://esp32io.com/tutorials/esp32-relay"
      },
      {
        name: "Random Nerd Tutorial",
        url: "https://randomnerdtutorials.com/esp32-relay-module-ac-web-server/"
      },
    ],
    whereToBuy: [
      {
        name: "AliExpress",
        url: "https://s.click.aliexpress.com/e/_c4dcY23d"
      },
      {
        name: "Amazon US",
        url: "https://amzn.to/3LHOEBA"
      },
      {
        name: "Amazon Germany",
        url: "https://amzn.to/453y85x"
      }
    ],
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
        name: "Adafruit NeoPixel Library",
        url: "https://github.com/adafruit/Adafruit_NeoPixel"
      },
      {
        name: "Adafruit NeoPixel Überguide",
        url: "https://learn.adafruit.com/adafruit-neopixel-uberguide/arduino-library-use"
      },
    ],
    whereToBuy: [
      {
        name: "AliExpress",
        url: "https://s.click.aliexpress.com/e/_c3iXvLqP"
      },
      {
        name: "Amazon US",
        url: "https://amzn.to/3NlRBIv"
      },
      {
        name: "Amazon Germany",
        url: "https://amzn.to/3Yw2IRH"
      }
    ],
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
    resources: [
      {
        name: "SH1106 Datasheet",
        url: "https://www.velleman.eu/downloads/29/infosheets/sh1106_datasheet.pdf"
      },
      {
        name: "Adafruit SH1106 Library",
        url: "https://github.com/winneymj/SH1106"
      },
      {
        name: "U8glib Library",
        url: "https://github.com/olikraus/u8glib"
      },
      {
        name: "Instructables Tutorial",
        url: "https://www.instructables.com/How-to-Interface-With-OLED-13-Inch-LCD128x64/"
      },

    ],
    whereToBuy: [
      {
        name: "AliExpress",
        url: "https://s.click.aliexpress.com/e/_c4sQlYaj"
      },
      {
        name: "Amazon US",
        url: "https://amzn.to/4pte57L"
      },
      {
        name: "Amazon Germany",
        url: "https://amzn.to/4qfU7hY"
      }
    ],
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
        name: "AHT20 Adafruit Tutorial",
        url: "https://learn.adafruit.com/adafruit-aht20/arduino"
      },
    ],
    whereToBuy: [
      {
        name: "AliExpress",
        url: "https://s.click.aliexpress.com/e/_c32qqi9D"
      },
      {
        name: "Amazon US",
        url: "https://amzn.to/4jDI9fF"
      },
      {
        name: "Amazon Germany",
        url: "https://amzn.to/3Ywrml8"
      }
    ],
    link: "/hardware/aht10-temperature-humidity-sensor-i2c"
  }
];
