export const hardware = [
  {
    "name": "ESP32 DevKit",
    "slug": "esp32-devkit",
    "intro": "The ESP32 DevKit is a development board based on the ESP32 microcontroller, widely used for IoT projects due to its Wi-Fi and Bluetooth capabilities.",
    "features": [
      "Dual-core 32-bit processor (up to 240 MHz)",
      "520 KB SRAM, 448 KB ROM",
      "2.4 GHz Wi-Fi (802.11 b/g/n)",
      "Bluetooth 4.2 BR/EDR and BLE",
      "36 GPIOs, ADC, DAC, I2C, SPI, UART",
      "USB-to-UART bridge for programming",
      "Micro-USB for power/programming"
    ],
    "howToUse": "Connect via USB to computer, select ESP32 Dev Module in Arduino IDE, upload sketches. Use GPIOs for sensors/displays, WiFi for internet connectivity.",
    "resources": [
      {
        "name": "Datasheet",
        "url": "https://www.espressif.com/sites/default/files/documentation/esp32_datasheet_en.pdf"
      },
      {
        "name": "Pinout Diagram",
        "url": "https://randomnerdtutorials.com/esp32-pinout-reference-gpios/"
      }
    ],
    "whereToBuy": [
      {
        "name": "Amazon",
        "url": "https://www.amazon.com/ESP32-Development-Bluetooth-ESP-WROOM-32/dp/B08BTJ5Z5T"
      },
      {
        "name": "AliExpress",
        "url": "https://www.aliexpress.com/item/1005001455538495.html"
      }
    ],
    "link": "/hardware/esp32-devkit"
  },
  {
    "name": "Cheap Yellow Display (CYD)",
    "slug": "cheap-yellow-display-cyd",
    "intro": "The Cheap Yellow Display (CYD) is an affordable ESP32-based development board featuring an integrated 2.8-inch TFT display with resistive touch capabilities, making it perfect for interactive IoT projects and GUIs.",
    "features": [
      "ESP32-WROOM-32 microcontroller (240 MHz dual-core)",
      "2.8\" 320x240 ILI9341 TFT LCD display",
      "Resistive touch panel",
      "MicroSD card slot",
      "3.5mm audio jack with speaker amplifier",
      "LiPo battery connector (with charging circuit)",
      "30+ GPIO pins",
      "WiFi and Bluetooth support",
      "USB-C for programming and power"
    ],
    "howToUse": "Connect via USB-C to computer, select ESP32 Dev Module in Arduino IDE. The display is pre-wired to specific GPIOs (typically TFT_CS=5, TFT_DC=2, etc.). Use TFT_eSPI library with proper pin configuration. Touch input via XPT2046 controller.",
    "resources": [
      {
        "name": "Product Page",
        "url": "https://www.aliexpress.com/item/1005001621096425.html"
      },
      {
        "name": "Pinout Diagram",
        "url": "https://github.com/witnessmenow/ESP32-Cheap-Yellow-Display/blob/main/pinout.png"
      },
      {
        "name": "Tutorial",
        "url": "https://randomnerdtutorials.com/esp32-cheap-yellow-display/"
      }
    ],
    "whereToBuy": [
      {
        "name": "AliExpress",
        "url": "https://www.aliexpress.com/item/1005001621096425.html"
      },
      {
        "name": "Amazon",
        "url": "https://www.amazon.com/s?k=esp32+cheap+yellow+display"
      }
    ],
    "link": "/hardware/cheap-yellow-display-cyd"
  },
  {
    "name": "Arduino Uno",
    "slug": "arduino-uno",
    "intro": "The Arduino Uno is a microcontroller board based on the ATmega328P, ideal for beginners in electronics and programming.",
    "features": [
      "ATmega328P microcontroller (16 MHz)",
      "32 KB flash memory, 2 KB SRAM, 1 KB EEPROM",
      "14 digital I/O pins (6 PWM), 6 analog inputs",
      "USB connection for programming/power",
      "ICSP header for advanced programming",
      "Reset button, power LED"
    ],
    "howToUse": "Connect via USB, install Arduino IDE, select Arduino Uno board, upload sketches. Use pins for digital/analog I/O, sensors, motors.",
    "resources": [
      {
        "name": "Official Site",
        "url": "https://store.arduino.cc/products/arduino-uno-rev3"
      },
      {
        "name": "Pinout Diagram",
        "url": "https://www.arduino.cc/en/uploads/Main/Arduino_Uno_Rev3-schematic.pdf"
      }
    ],
    "whereToBuy": [
      {
        "name": "Amazon",
        "url": "https://www.amazon.com/Arduino-A000066-ARDUINO-UNO-R3/dp/B008GRTSV6"
      },
      {
        "name": "AliExpress",
        "url": "https://www.aliexpress.com/item/1005001621294563.html"
      }
    ],
    "link": "/hardware/arduino-uno"
  },
  {
    "name": "DHT11 Sensor",
    "slug": "dht11-sensor",
    "intro": "The DHT11 is a low-cost digital sensor for measuring temperature and humidity, commonly used in weather stations and IoT projects.",
    "features": [
      "Temperature range: 0-50°C (±2°C accuracy)",
      "Humidity range: 20-90% RH (±5% accuracy)",
      "Operating voltage: 3-5V",
      "Single-wire serial interface",
      "Low power consumption"
    ],
    "howToUse": "Connect VCC to 5V, GND to ground, DATA to digital pin (e.g., GPIO 4). Use DHT library in Arduino IDE to read temperature/humidity values.",
    "resources": [
      {
        "name": "Datasheet",
        "url": "https://www.mouser.com/datasheet/2/758/DHT11-Technical-Data-Sheet-Translated-Version-1143054.pdf"
      },
      {
        "name": "Tutorial",
        "url": "https://randomnerdtutorials.com/esp32-dht11-dht22-temperature-humidity-sensor-arduino-ide/"
      }
    ],
    "whereToBuy": [
      {
        "name": "Amazon",
        "url": "https://www.amazon.com/HiLetgo-Temperature-Humidity-Digital-Connection/dp/B07L7P6YJG"
      },
      {
        "name": "AliExpress",
        "url": "https://www.aliexpress.com/item/1005001621294563.html"
      }
    ],
    "link": "/hardware/dht11-sensor"
  },
  {
    "name": "ILI9341 TFT Display",
    "slug": "ili9341-tft-display",
    "intro": "The ILI9341 is a 2.8\" color TFT LCD display module, used for showing graphics and text in embedded projects.",
    "features": [
      "320x240 resolution (QVGA)",
      "262,144 colors (18-bit)",
      "SPI interface",
      "Touchscreen support (optional)",
      "Backlight control",
      "Compatible with Arduino/ESP32"
    ],
    "howToUse": "Connect to SPI pins (MOSI, MISO, SCK, CS, DC, RST). Use TFT_eSPI library in Arduino IDE to draw text, shapes, images.",
    "resources": [
      {
        "name": "Datasheet",
        "url": "https://www.displayfuture.com/Display/datasheet/controller/ILI9341.pdf"
      },
      {
        "name": "Tutorial",
        "url": "https://randomnerdtutorials.com/esp32-tft-display-st7789/"
      }
    ],
    "whereToBuy": [
      {
        "name": "Amazon",
        "url": "https://www.amazon.com/HiLetgo-ILI9341-Serial-Module-STM32/dp/B07P9X3LJQ"
      },
      {
        "name": "AliExpress",
        "url": "https://www.aliexpress.com/item/1005001455538495.html"
      }
    ],
    "link": "/hardware/ili9341-tft-display"
  },
  {
    "name": "Relay Module",
    "slug": "relay-module",
    "intro": "A relay module is an electromechanical switch that controls high-voltage circuits using low-voltage signals, useful for controlling lights or motors.",
    "features": [
      "5V or 12V operation",
      "Normally open (NO) and normally closed (NC) contacts",
      "Max load: 10A/250VAC or 10A/30VDC",
      "Opto-isolated input",
      "LED indicator"
    ],
    "howToUse": "Connect VCC to 5V, GND to ground, IN to digital pin (e.g., GPIO 12). Set pin HIGH to activate relay, controlling external devices.",
    "resources": [
      {
        "name": "Tutorial",
        "url": "https://randomnerdtutorials.com/guide-for-relay-module-with-arduino/"
      }
    ],
    "whereToBuy": [
      {
        "name": "Amazon",
        "url": "https://www.amazon.com/SunFounder-Channel-Optocoupler-Raspberry-Electric/dp/B00E0NTPP4"
      },
      {
        "name": "AliExpress",
        "url": "https://www.aliexpress.com/item/1005001621294563.html"
      }
    ],
    "link": "/hardware/relay-module"
  },
  {
    "name": "MAX7219 LED Matrix",
    "slug": "max7219-led-matrix",
    "intro": "The MAX7219 is an LED driver IC for controlling 8x8 LED matrices, often cascaded for larger displays.",
    "features": [
      "Drives up to 64 LEDs",
      "Serial interface (SPI)",
      "Brightness control",
      "Cascadable for larger displays",
      "Low power consumption"
    ],
    "howToUse": "Connect DIN, CLK, CS to SPI pins. Use MD_MAX72XX library to display text/numbers on the matrix.",
    "resources": [
      {
        "name": "Datasheet",
        "url": "https://datasheets.maximintegrated.com/en/ds/MAX7219-MAX7221.pdf"
      },
      {
        "name": "Tutorial",
        "url": "https://randomnerdtutorials.com/esp32-max7219-led-matrix-scrolling-text/"
      }
    ],
    "whereToBuy": [
      {
        "name": "Amazon",
        "url": "https://www.amazon.com/HiLetgo-MAX7219-Dot-Matrix-Module/dp/B07ZPX8P4L"
      },
      {
        "name": "AliExpress",
        "url": "https://www.aliexpress.com/item/1005001455538495.html"
      }
    ],
    "link": "/hardware/max7219-led-matrix"
  },
  {
    "name": "D1 Mini",
    "slug": "d1-mini",
    "intro": "The D1 Mini is a compact development board based on ESP8266, offering Wi-Fi for IoT projects.",
    "features": [
      "ESP8266 microcontroller (80 MHz)",
      "4 MB flash memory",
      "11 GPIOs, ADC",
      "2.4 GHz Wi-Fi",
      "Micro-USB for programming/power",
      "Compatible with Arduino IDE"
    ],
    "howToUse": "Connect via USB, select WeMos D1 R2 & mini in Arduino IDE, upload sketches. Use for Wi-Fi connectivity and GPIO control.",
    "resources": [
      {
        "name": "Pinout",
        "url": "https://www.wemos.cc/en/latest/d1/d1_mini.html"
      }
    ],
    "whereToBuy": [
      {
        "name": "Amazon",
        "url": "https://www.amazon.com/HiLetgo-ESP8266-ESP-12E-Development-Board/dp/B081CSJV2V"
      },
      {
        "name": "AliExpress",
        "url": "https://www.aliexpress.com/item/1005001621294563.html"
      }
    ],
    "link": "/hardware/d1-mini"
  },
  {
    "name": "USB Cable",
    "slug": "usb-cable",
    "intro": "A USB cable is essential for powering and programming microcontroller boards.",
    "features": [
      "USB 2.0 or 3.0 standard",
      "Various lengths (1-3m recommended)",
      "Micro-USB or USB-C connectors",
      "Data and power transfer"
    ],
    "howToUse": "Connect one end to computer USB port, other to board's USB connector for programming and power.",
    "resources": [],
    "whereToBuy": [
      {
        "name": "Amazon",
        "url": "https://www.amazon.com/AmazonBasics-Male-Micro-B-Cable-Black/dp/B0711PVX6Z"
      },
      {
        "name": "AliExpress",
        "url": "https://www.aliexpress.com/item/1005001455538495.html"
      }
    ],
    "link": "/hardware/usb-cable"
  },
  {
    "name": "Breadboard",
    "slug": "breadboard",
    "intro": "A breadboard is a solderless prototyping board for building circuits without soldering.",
    "features": [
      "400-800 tie points",
      "Power rails for VCC/GND",
      "Plastic housing with metal clips",
      "Reusable for experiments"
    ],
    "howToUse": "Insert components and wires into holes; connect power to rails, use for testing circuits before permanent assembly.",
    "resources": [],
    "whereToBuy": [
      {
        "name": "Amazon",
        "url": "https://www.amazon.com/EL-CP-003-Breadboard-Solderless-Prototype/dp/B07PVBJX5S"
      },
      {
        "name": "AliExpress",
        "url": "https://www.aliexpress.com/item/1005001621294563.html"
      }
    ],
    "link": "/hardware/breadboard"
  },
  {
    "name": "Jumper Wires",
    "slug": "jumper-wires",
    "intro": "Jumper wires are pre-cut wires for connecting components on breadboards or PCBs.",
    "features": [
      "Male-to-male, male-to-female, female-to-female",
      "Various lengths (10-30cm)",
      "Color-coded for organization",
      "Flexible insulation"
    ],
    "howToUse": "Connect pins on boards/sensors to breadboard or directly to microcontroller pins.",
    "resources": [],
    "whereToBuy": [
      {
        "name": "Amazon",
        "url": "https://www.amazon.com/EDGELEC-Breadboard-Optional-Assorted-Multicolored/dp/B07GD2BWPY"
      },
      {
        "name": "AliExpress",
        "url": "https://www.aliexpress.com/item/1005001455538495.html"
      }
    ],
    "link": "/hardware/jumper-wires"
  }
]