export let troubleshooting = [
    // ===== UPLOAD & CONNECTION ISSUES =====
    {
        issue: "Upload Failed - Wrong USB Cable",
        category: "Upload & Connection",
        tags: ["Arduino", "ESP32", "Hardware"],
        description: "The upload fails or the board isn't detected by the computer.",
        cause: "Using a USB cable that only supports charging (power-only cable) instead of a data cable. Many USB cables, especially those that come with phones or power banks, only have power wires and no data wires.",
        solution: "Use a USB cable that supports data transfer. Try a different cable, preferably one that came with a device that needed data transfer (like a printer, external hard drive, or a known working Arduino cable). You can test if a cable supports data by checking if your computer recognizes the device when you plug it in.",
        prevention: "Keep a dedicated USB data cable for your Arduino projects. Label it or keep it separate from charging-only cables.",
        links: [
            { title: "Arduino Setup Workshop", url: "/workshops/01-basics/arduino-setup" }
        ]
    },
    {
        issue: "Upload Failed - Wrong Upload Speed",
        category: "Upload & Connection",
        tags: ["Arduino", "ESP32"],
        description: "Upload fails with timeout errors or 'Failed to connect to ESP32' messages.",
        cause: "The upload speed (baud rate) in Arduino IDE doesn't match what the board expects. ESP32 boards typically require 921600 baud rate for uploads, but some boards or situations may need different speeds.",
        solution: "Go to Tools > Upload Speed in Arduino IDE and try different speeds: 921600 (most common for ESP32), 115200, 460800, or 230400. If one speed fails, try the next one. You may also need to hold the BOOT button on your ESP32 board while clicking Upload, then release it when the upload starts.",
        prevention: "Check the board documentation for the recommended upload speed. For ESP32-C3, 921600 is usually correct. Save your board settings once you find what works.",
        links: [
            { title: "Arduino Setup Workshop", url: "/workshops/01-basics/arduino-setup" }
        ]
    },
    {
        issue: "Serial Monitor Shows Garbage Characters",
        category: "Upload & Connection",
        tags: ["Arduino", "ESP32"],
        description: "The Serial Monitor displays random characters, symbols, or gibberish instead of readable text.",
        cause: "The baud rate in your Serial Monitor doesn't match the baud rate in your code. If your code uses Serial.begin(115200) but the Serial Monitor is set to 9600, you'll see garbage.",
        solution: "Check the baud rate in your code (look for Serial.begin() in setup()) and make sure the Serial Monitor dropdown matches it. Common baud rates are 115200, 9600, 57600. The Serial Monitor dropdown is in the bottom-right corner of the Serial Monitor window.",
        prevention: "Always use the same baud rate consistently. 115200 is a good standard for ESP32. Make it a habit to check the Serial Monitor baud rate before opening it.",
        links: [
            { title: "Arduino Setup Workshop", url: "/workshops/01-basics/arduino-setup" }
        ]
    },
    {
        issue: "Scrambled Serial Output",
        category: "Code & Compilation",
        tags: ["Arduino", "ESP32"],
        description: "Serial output appears scrambled, corrupted, or mixed up - characters are in wrong order, data is fragmented, or output is partially readable but jumbled.",
        cause: "Multiple Serial.print() calls happening too quickly, buffer overflow, or code running too fast for the serial connection to keep up. This can also happen when using Serial.print() inside interrupts or when the serial buffer is full.",
        solution: "Add small delays between Serial.print() statements (delay(10) or delay(50)). Use Serial.flush() after important print statements to ensure data is sent before continuing. Increase the serial buffer size if needed. Avoid printing from interrupt service routines. If printing large amounts of data, break it into smaller chunks with delays between them.",
        prevention: "Use Serial.flush() after critical print statements. Add delays when printing large amounts of data. Avoid printing from interrupts. Consider using a slower baud rate (115200 or lower) if you're sending a lot of data quickly.",
        links: [
            { title: "Arduino Setup Workshop", url: "/workshops/01-basics/arduino-setup" }
        ]
    },
    {
        issue: "Board Not Detected / Port Not Showing",
        category: "Upload & Connection",
        tags: ["Arduino", "ESP32", "Hardware"],
        description: "The Arduino IDE doesn't show any ports in Tools > Port, or the board isn't recognized when plugged in.",
        cause: "Missing USB drivers for the board. ESP32 boards (especially ESP32-C3) need CH340 or CP2102 USB-to-serial drivers installed on your computer.",
        solution: "Install the appropriate USB driver: For CH340 chips, download the CH340 driver. For CP2102 chips, download the CP210x driver from Silicon Labs. After installing, unplug and replug your board, then check Tools > Port again. On Mac, you may need to allow the driver in System Preferences > Security & Privacy.",
        prevention: "Install drivers before starting your first project. Check which chip your board uses (usually printed on the board or in the product description) and install the matching driver.",
        links: [
            { title: "Arduino Setup Workshop", url: "/workshops/01-basics/arduino-setup" },
            { title: "CH340 Driver", url: "https://github.com/WCHSoftGroup/ch34xser_macos" },
            { title: "CP210x Driver", url: "https://www.silabs.com/developers/usb-to-uart-bridge-vcp-drivers" }
        ]
    },
    {
        issue: "Wrong Board Selected",
        category: "Upload & Connection",
        tags: ["Arduino", "ESP32"],
        description: "Code compiles but upload fails, or the board behaves unexpectedly after upload.",
        cause: "The board selected in Tools > Board doesn't match your physical board. For example, selecting 'ESP32 Dev Module' when you have an 'ESP32-C3' board.",
        solution: "Go to Tools > Board and select the exact board you're using. For ESP32-C3, select 'ESP32C3 Dev Module'. For ESP8266 D1 Mini, select 'LOLIN(WEMOS) D1 R2 & mini'. Make sure the board name matches your hardware.",
        prevention: "Double-check your board selection before uploading. Write down your board model and keep it with your project notes.",
        links: [
            { title: "Arduino Setup Workshop", url: "/workshops/01-basics/arduino-setup" }
        ]
    },

    // ===== CODE & COMPILATION ISSUES =====
    {
        issue: "Library Not Found Error",
        category: "Code & Compilation",
        tags: ["Arduino"],
        description: "Compilation fails with errors like 'No such file or directory' or 'Library not found'.",
        cause: "Missing required library for your code. The library hasn't been installed in Arduino IDE, or the library name in your #include statement is incorrect.",
        solution: "Install the missing library: Go to Sketch > Include Library > Manage Libraries, search for the library name (e.g., 'TFT_eSPI', 'DHT sensor library'), and click Install. Make sure the library name in your #include matches exactly (case-sensitive).",
        prevention: "Read the code comments or README for required libraries before starting. Install all dependencies first, then write your code.",
        links: [
            { title: "Arduino Setup Workshop", url: "/workshops/01-basics/arduino-setup" }
        ]
    },
    {
        issue: "WiFi Connection Fails",
        category: "Code & Compilation",
        tags: ["Arduino", "ESP32", "WiFi"],
        description: "The device can't connect to WiFi, or connection attempts timeout.",
        cause: "Incorrect WiFi credentials (SSID or password), WiFi network not in range, or 2.4GHz vs 5GHz issue. ESP32 only supports 2.4GHz WiFi networks.",
        solution: "Double-check your WiFi SSID and password in the code - they're case-sensitive and must match exactly. Make sure your router broadcasts 2.4GHz WiFi (ESP32 doesn't support 5GHz). Move closer to the router. Try connecting to a phone hotspot to test if it's a network issue.",
        prevention: "Test WiFi credentials on another device first. Use a phone hotspot for testing if your main router has issues. Keep WiFi credentials in a separate config section at the top of your code for easy editing.",
        links: [
            { title: "WiFi Connection Block", url: "/blocks/esp32-wifi-connection" }
        ]
    },
    {
        issue: "Code Uploads But Nothing Happens",
        category: "Code & Compilation",
        tags: ["Arduino", "ESP32", "Hardware"],
        description: "Upload succeeds, but the device doesn't do what the code says it should (LEDs don't blink, Serial Monitor is empty, etc.).",
        cause: "Wrong pin numbers in code, hardware not connected properly, or code stuck in setup() with an infinite loop or blocking operation.",
        solution: "Check your pin connections - verify the physical pin numbers match your code. Add Serial.println() statements throughout your code to see where execution stops. Make sure setup() completes (no infinite loops) before loop() runs. Check if you're using the correct pin numbers for your board (GPIO numbers vs physical pin numbers).",
        prevention: "Start with a simple 'Hello World' or blink example to verify your setup works. Use Serial Monitor for debugging. Test each component individually before combining them.",
        links: [
            { title: "Hello World Blink Workshop", url: "/workshops/01-basics/hello-world-blink" }
        ]
    },
    {
        issue: "Serial Monitor Shows Nothing",
        category: "Code & Compilation",
        tags: ["Arduino", "ESP32"],
        description: "Serial Monitor is open but completely blank, no output at all.",
        cause: "Serial Monitor opened before code started, wrong baud rate, or no Serial.print() statements in code. Sometimes the Serial Monitor needs to be closed and reopened after upload.",
        solution: "Close and reopen the Serial Monitor after uploading code. Check that your code has Serial.begin() in setup() and Serial.print() or Serial.println() statements. Verify the baud rate matches. Try pressing the reset button on your board.",
        prevention: "Always include Serial.begin() in setup() and add Serial.println('Starting...') as the first line to confirm code is running. Open Serial Monitor after upload, not before.",
        links: [
            { title: "Arduino Setup Workshop", url: "/workshops/01-basics/arduino-setup" }
        ]
    },

    // ===== HARDWARE ISSUES =====
    {
        issue: "LED Doesn't Light Up",
        category: "Hardware",
        tags: ["Arduino", "ESP32", "Hardware"],
        description: "LED connected but doesn't turn on when code says it should.",
        cause: "LED connected backwards (wrong polarity), wrong pin, missing resistor, or LED is burned out. LEDs are directional - they only work when connected the correct way.",
        solution: "Check LED polarity: The longer leg (anode) should connect to the GPIO pin through a resistor (220Ω-1kΩ), and the shorter leg (cathode) should connect to GND. Try reversing the LED. Verify the pin number in your code matches where you connected it. Test with a multimeter or try a different LED.",
        prevention: "Learn to identify LED polarity (long leg = positive). Always use a current-limiting resistor (220Ω-1kΩ) to protect the LED. Test LEDs before using them in projects.",
        links: [
            { title: "Hello World Blink Workshop", url: "/workshops/01-basics/hello-world-blink" }
        ]
    },
    {
        issue: "Wrong Pin Numbers",
        category: "Hardware",
        tags: ["Arduino", "ESP32", "Hardware"],
        description: "Code references pins that don't exist or behave unexpectedly on your board.",
        cause: "Using physical pin numbers instead of GPIO numbers, or using pins that have special functions (like being used for USB communication on ESP32-C3).",
        solution: "Use GPIO numbers, not physical pin positions. For ESP32-C3, avoid GPIO 18 and 19 (used for USB). Check your board's pinout diagram. Common safe GPIO pins for ESP32-C3: 2, 3, 4, 5, 6, 7, 8, 9, 10.",
        prevention: "Keep a pinout reference handy. Use a pinout component or diagram when writing code. Document which pins you're using and why.",
        links: [
            { title: "ESP32-C3 Pinout", url: "/hardware/esp32c3" },
            { title: "Arduino Setup Workshop", url: "/workshops/01-basics/arduino-setup" }
        ]
    },
    {
        issue: "Loose Connections / Intermittent Behavior",
        category: "Hardware",
        tags: ["Arduino", "ESP32", "Hardware"],
        description: "Device works sometimes but not others, or behavior is inconsistent.",
        cause: "Loose jumper wires, poor breadboard connections, or wires not fully inserted. Breadboards can wear out and lose contact over time.",
        solution: "Push all wires and components firmly into the breadboard. Check that wires are making good contact - you should feel resistance when inserting. Try different breadboard holes. Replace old or worn breadboards. Use shorter jumper wires when possible (long wires can cause issues).",
        prevention: "Use quality jumper wires and breadboards. Keep connections tidy and organized. Test connections with a multimeter if available. Secure wires with cable management.",
        links: []
    },
    {
        issue: "Power Issues - Board Resets Randomly",
        category: "Hardware",
        tags: ["Arduino", "ESP32", "Hardware", "WiFi"],
        description: "Board resets unexpectedly, especially when using WiFi or powering external components.",
        cause: "Insufficient power supply. USB ports may not provide enough current, especially when using WiFi (which draws significant power). External components like displays or motors can also cause power issues.",
        solution: "Use a powered USB hub or a USB wall adapter that provides at least 1A (1000mA). Avoid powering from laptop USB ports if possible. For projects with displays or motors, consider an external 5V power supply. Add a large capacitor (1000µF) between VCC and GND to smooth power fluctuations.",
        prevention: "Plan power requirements before building. Use external power for projects with displays, motors, or multiple sensors. Keep USB cable as short as possible to reduce voltage drop.",
        links: []
    },

    // ===== API & NETWORK ISSUES =====
    {
        issue: "API Calls Fail / Timeout",
        category: "API & Network",
        tags: ["Arduino", "ESP32", "API", "WiFi", "Cardano"],
        description: "HTTP requests to APIs fail or timeout, even though WiFi is connected.",
        cause: "Incorrect API URL, missing HTTP client library, SSL/TLS certificate issues, or API requires authentication (API key) that wasn't provided.",
        solution: "Verify the API URL is correct and accessible (test in a browser first). For HTTPS APIs, you may need to update root certificates. Check if the API requires an API key in headers. Increase timeout values. Use HTTPClient library correctly - call begin(), then add headers, then GET().",
        prevention: "Test API endpoints in a browser or Postman first. Read API documentation carefully. Keep API keys secure and don't hardcode them in shared code.",
        links: [
            { title: "Making HTTP GET Requests Block", url: "/blocks/making-http-get-requests" },
            { title: "API Setup Workshop", url: "/workshops/01-basics/api-setup" }
        ]
    },
    {
        issue: "JSON Parsing Errors",
        category: "API & Network",
        tags: ["Arduino", "ESP32", "API", "Cardano"],
        description: "Code crashes or fails when trying to parse JSON responses from APIs.",
        cause: "JSON response format doesn't match what the code expects, or the response isn't valid JSON. API might return an error message instead of data.",
        solution: "Print the raw API response to Serial Monitor first to see what you're actually receiving. Use a JSON validator online to check if the response is valid JSON. Update your parsing code to match the actual JSON structure. Handle error responses from the API.",
        prevention: "Always print raw responses during development. Use ArduinoJson library's assistant tool to generate parsing code. Test with known-good API responses first.",
        links: [
            { title: "Working with JSON Block", url: "/blocks/working-with-json-in-arduino" }
        ]
    },

    // ===== GENERAL TROUBLESHOOTING TIPS =====
    {
        issue: "Code Works on Computer But Not on Board",
        category: "General",
        tags: ["Arduino", "ESP32"],
        description: "Code compiles and uploads successfully, but behaves differently than expected or doesn't work at all.",
        cause: "Logic errors in code, hardware not matching code assumptions, or timing issues. Microcontrollers run code sequentially and much slower than computers.",
        solution: "Add Serial.print() debugging statements throughout your code to trace execution. Check variable values, pin states, and function returns. Verify hardware connections match your code. Remember that delay() blocks execution - consider using millis() for non-blocking timing.",
        prevention: "Test code incrementally - get one thing working before adding the next. Use Serial Monitor extensively for debugging. Read error messages carefully.",
        links: [
            { title: "Arduino Setup Workshop", url: "/workshops/01-basics/arduino-setup" }
        ]
    },
    {
        issue: "Can't Upload - Port in Use",
        category: "Upload & Connection",
        tags: ["Arduino", "ESP32"],
        description: "Error message saying the port is already in use or can't be accessed.",
        cause: "Serial Monitor or another program is using the USB port. Only one program can access a serial port at a time.",
        solution: "Close the Serial Monitor before uploading code. Close any other programs that might be using the port (other Arduino IDE windows, serial terminal programs, etc.). Unplug and replug the board, then try again.",
        prevention: "Make it a habit: Close Serial Monitor → Upload Code → Open Serial Monitor. This prevents port conflicts.",
        links: []
    }
];

