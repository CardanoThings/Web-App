export const troubleshooting = [
    {
        id: "esp32-c3-wifi-connection",
        question: "My ESP32-C3 won't connect to WiFi",
        answer: "Check your WiFi credentials and make sure your ESP32-C3 is connected to the same network as your computer. The ESP32-C3 will not connect to 5GHz WiFi networks. Make sure you're using the ESP32-C3 workaround <code>WiFi.setTxPower(WIFI_POWER_8_5dBm);</code> in your code.",
        categories: ["ESP32C3", "WiFi"],
        links: [
            {
                name: "ESP32 WiFi Connection Example",
                url: "/blocks/esp32-wifi-connection"
            }
        ]
    },
    {
        id: "cyd-upload-fails",
        question: "My code won't upload to my ESP32 CYD",
        answer: "Make sure you're using the correct board and port and have the CH340 driver installed. Use a different USB cable if the problem persists. You might need to turn down the upload speed to 115200 baud rate to successfully upload your code.",
        categories: ["ESP32 CYD", "Upload"],
    },
    {
        id: "i2c-communication-issues",
        question: "I'm having issues with I2C communication",
        answer: "Make sure your I2C devices are connected correctly, you defined the SDA and SCL pins in your code correctly (if different from the default pins). Make sure you have set the correct I2C address for your device. Use the I2C Scanner block to check if your I2C devices are connected correctly. If you're not sure what the I2C address of your device is, check out the I2C Scanner block.",
        categories: ["I2C", "Communication"],
        links: [
            {
                name: "I2C Scanner",
                url: "/blocks/esp32-i2c-scanner"
            }
        ]
    },
    {
        id: "board-not-detected",
        question: "My board is not detected by the Arduino IDE",
        answer: "Make sure you have the correct board selected in the Arduino IDE. You will need to install the ESP32 drivers and if you're using a CYD, you will need to install the CH340 driver. Use a different USB cable if the problem persists.",
        categories: ["ESP32", "Communication"],
        links: [
            {
                name: "Arduino Setup Guide",
                url: "/workshops/01-basics/arduino-setup"
            },
            {
                name: "ArduinoESP32 Drivers",
                url: "https://github.com/espressif/arduino-esp32"
            },
            {
                name: "CH340 Driver Installation Guide",
                url: "https://learn.adafruit.com/how-to-install-drivers-for-wch-usb-to-serial-chips-ch9102f-ch9102/overview"
            }
        ]
    },
    {
        id: "serial-monitor-not-working",
        question: "My serial monitor is not working or is showing garbled text",
        answer: "Make sure your code uses the same baud rate as the serial monitor. Use a different USB cable if the problem persists.",
        categories: ["Serial Monitor", "Communication"],
    }
];
