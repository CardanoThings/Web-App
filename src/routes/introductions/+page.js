export function load() {
    const workshops = [
        {
            title: "Cardano",
            description: "Learn about Cardano, a blockchain platform for smart contracts and decentralized applications.",
            url: `/introductions/cardano`
        },
        {
            title: "ESP32",
            description: "Learn about the ESP32 microcontroller and its features.",
            url: `/introductions/esp32`
        },
        {
            title: "Arduino",
            description: "Explore the Arduino platform for building electronics projects.",
            url: `/introductions/arduino`
        },
        {
            title: "Node.js",
            description: "Learn about Node.js, a JavaScript runtime built on Chrome's V8 engine.",
            url: `/introductions/nodejs`
        },
        {
            title: "REST API",
            description: "Understand REST APIs and how to interact with them.",
            url: `/introductions/rest-api`
        },
    ];
    return { workshops };
}
