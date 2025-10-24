export function load() {
    return {
        title: "Sensor Input",
        description: "Read data from different sensors with this block.",
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
    };
}