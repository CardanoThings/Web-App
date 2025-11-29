export let glossary = [
    // ===== BLOCKCHAIN & CARDANO BASICS =====
    {
        term: "Blockchain",
        definition: "A decentralized digital ledger that records transactions across many computers. Think of it as a shared database that everyone can see and verify, but no single person controls. Each block contains a list of transactions, and blocks are linked together in a chain, making it very difficult to alter past records.",
    },
    {
        term: "Cardano",
        definition: "A blockchain platform for smart contracts, known for its focus on security, scalability, and sustainability. Cardano uses a proof-of-stake consensus mechanism, making it more energy-efficient than proof-of-work blockchains like Bitcoin. It's designed to support financial applications, smart contracts, and decentralized applications (dApps).",
        links: [
            { title: "Cardano Introduction", url: "/introductions/cardano" },
            { title: "Official Website", url: "https://cardano.org/" }
        ]
    },
    {
        term: "ADA",
        definition: "The native cryptocurrency of the Cardano blockchain. Named after Ada Lovelace, a 19th-century mathematician. ADA is used to pay for transactions, stake for network security, and participate in governance. The smallest unit of ADA is called Lovelace (1 ADA = 1,000,000 Lovelace)."
    },
    {
        term: "Lovelace",
        definition: "The smallest unit of ADA, named after Ada Lovelace. 1 ADA equals 1,000,000 Lovelace. When making payments or working with Cardano APIs, amounts are often specified in Lovelace rather than ADA for precision."
    },
    {
        term: "Smart Contract",
        definition: "Self-executing contracts with the terms of the agreement directly written into code. Once deployed on a blockchain, smart contracts automatically execute when certain conditions are met, without needing a middleman. On Cardano, smart contracts are written in Plutus, a functional programming language."
    },
    {
        term: "Decentralization",
        definition: "The distribution of authority and decision-making away from a central entity. In blockchain, this means no single person or organization controls the network. Instead, many participants (nodes) work together to maintain and verify the blockchain, making it more secure and resistant to censorship."
    },
    {
        term: "Tokenomics",
        definition: "The study of the economic model and incentives behind a cryptocurrency or token. This includes how tokens are created, distributed, used, and what motivates people to participate in the network. Good tokenomics ensure a sustainable and valuable ecosystem."
    },
    {
        term: "Web3",
        definition: "The decentralized web, built on blockchain technology, enabling peer-to-peer interactions without intermediaries. Web3 applications (dApps) run on blockchains and give users more control over their data and digital assets compared to traditional web applications (Web2)."
    },

    // ===== CARDANO-SPECIFIC TERMS =====
    {
        term: "Epoch",
        definition: "A specific period in blockchain time during which certain processes occur, such as staking rewards distribution. On Cardano, one epoch lasts approximately 5 days. Epochs are used to organize the blockchain's operations, including when staking rewards are calculated and distributed to stakeholders.",
        links: [
            { title: "Epoch Clock Workshop", url: "/workshops/02-read-and-output/epoch-clock" }
        ]
    },
    {
        term: "Staking",
        definition: "The process of locking up cryptocurrency to support the operations of a blockchain network in exchange for rewards. On Cardano, you can delegate your ADA to a stake pool (without giving up ownership) and earn rewards for helping secure the network. Staking is energy-efficient and doesn't require expensive hardware.",
        links: [
            { title: "Cardano Staking Guide", url: "https://cardano.org/stake-pools/" }
        ]
    },
    {
        term: "Stake Pool",
        definition: "A server that participates in the Cardano network's consensus mechanism. Stake pools are run by operators and allow ADA holders to delegate their stake to earn rewards. Multiple stakeholders can delegate to the same pool, combining their stake to increase the pool's chances of creating blocks and earning rewards."
    },
    {
        term: "Preprod",
        definition: "A testnet of the Cardano blockchain used for testing and development before deployment to the mainnet. The currency used is tADA (test ADA), which can be obtained through the Cardano faucet. Preprod allows developers to test applications without risking real ADA or affecting the main network.",
        links: [
            { title: "Cardano Faucet", url: "https://docs.cardano.org/cardano-testnet/tools/faucet" }
        ]
    },
    {
        term: "tADA",
        definition: "Test ADA, the cryptocurrency used on the Cardano preprod testnet for testing purposes. tADA has no real-world value and is used exclusively for development and testing. You can get tADA for free from the Cardano faucet to test your applications.",
        links: [
            { title: "Cardano Faucet", url: "https://docs.cardano.org/cardano-testnets/tools/faucet" }
        ]
    },
    {
        term: "Mainnet",
        definition: "The live, production version of the Cardano blockchain where real transactions occur using real ADA. This is in contrast to testnets like Preprod, which are used for testing. Always test thoroughly on testnets before deploying to mainnet."
    },
    {
        term: "Testnet",
        definition: "A separate blockchain network used for testing applications without using real cryptocurrency. Cardano has several testnets, including Preprod, where developers can experiment safely. Testnets use test tokens (like tADA) that have no real value."
    },
    {
        term: "Faucet",
        definition: "A service that gives away free test cryptocurrency (like tADA) for use on testnets. Faucets allow developers to test their applications without spending real money. Cardano has official faucets for its testnets.",
        links: [
            { title: "Cardano Faucet", url: "https://docs.cardano.org/cardano-testnets/tools/faucet" }
        ]
    },
    {
        term: "UTXO",
        definition: "Unspent Transaction Output. Cardano uses a UTXO model, similar to Bitcoin, where transactions consume previous outputs and create new ones. Think of it like cash: when you spend a $10 bill, you might get $7 back as change. Each UTXO is like a bill that can be spent."
    },
    {
        term: "Transaction",
        definition: "A record of value transfer on the blockchain. A transaction takes inputs (UTXOs) and creates outputs (new UTXOs). Transactions can transfer ADA, mint tokens, or execute smart contracts. All transactions are recorded permanently on the blockchain."
    },
    {
        term: "Transaction Hash",
        definition: "A unique identifier (also called txhash or transaction ID) for a specific transaction on the blockchain. It's a long string of characters that acts like a fingerprint for that transaction. Every transaction on Cardano has a unique transaction hash that can be used to look up all the details about that transaction on blockchain explorers like CardanoScan.",
        links: [
            { title: "Cardano Setup Workshop", url: "/workshops/01-basics/cardano-setup" },
            { title: "Preprod CardanoScan", url: "https://preprod.cardanoscan.io/" }
        ]
    },
    {
        term: "txHash",
        definition: "Short for transaction hash, a unique identifier for a specific transaction on the blockchain. It's a long string of characters that acts like a fingerprint for that transaction. Every transaction on Cardano has a unique txhash that can be used to look up all the details about that transaction on blockchain explorers like CardanoScan.",
        links: [
            { title: "Cardano Setup Workshop", url: "/workshops/01-basics/cardano-setup" },
            { title: "Preprod CardanoScan", url: "https://preprod.cardanoscan.io/" }
        ]
    },
    {
        term: "Wallet",
        definition: "A software application or hardware device that stores your cryptocurrency and allows you to send and receive transactions. A wallet contains your private keys (which prove ownership) and your public addresses (where others can send you funds). Popular Cardano wallets include Yoroi, Vespr, Eternl, and Begin.",
        links: [
            { title: "Yoroi Wallet", url: "https://yoroi-wallet.com/" },
            { title: "Vespr Wallet", url: "https://vespr.xyz/" },
            { title: "Eternl Wallet", url: "https://eternl.io/" },
            { title: "Begin Wallet", url: "https://begin.is/" }
        ]
    },
    {
        term: "Address",
        definition: "A unique identifier on the Cardano blockchain where you can receive ADA and tokens. Cardano addresses start with 'addr' for mainnet or 'addr_test' for testnet. You can share your address publicly to receive payments, but you must keep your private keys secret."
    },
    {
        term: "Private Key",
        definition: "A secret cryptographic key that proves ownership of your wallet and allows you to spend your ADA and tokens. Never share your private key with anyone. If someone has your private key, they can steal all your funds. Wallets manage private keys securely for you."
    },
    {
        term: "NFT",
        definition: "Non-Fungible Token. A unique digital asset on the blockchain that cannot be replaced or exchanged one-for-one like cryptocurrency. Each NFT has unique properties and ownership records. On Cardano, NFTs can represent digital art, collectibles, sensor data, or any unique digital item.",
        links: [
            { title: "Minting NFTs Workshop", url: "/workshops/03-input-and-write/mint-sensor-data-on-chain" }
        ]
    },
    {
        term: "Minting",
        definition: "The process of creating new tokens or NFTs on the blockchain. When you mint an NFT, you're creating a unique token with specific metadata (like name, description, and properties) that gets permanently recorded on the Cardano blockchain.",
        links: [
            { title: "Minting Workshop", url: "/workshops/03-input-and-write/build-your-own-api" }
        ]
    },
    {
        term: "Metadata",
        definition: "Additional information attached to transactions, tokens, or NFTs on the blockchain. Metadata can include names, descriptions, images, sensor readings, timestamps, or any other structured data. This information helps identify and describe what a token or NFT represents."
    },
    {
        term: "CIP",
        definition: "Cardano Improvement Proposal. Documents that describe standards, processes, or features for the Cardano ecosystem. Similar to Ethereum's EIPs or Bitcoin's BIPs. CIPs ensure interoperability between different applications and wallets. For example, CIP-13 defines payment URIs for Cardano wallets.",
        links: [
            { title: "CIP-13 Integration Workshop", url: "/workshops/05-qr-code-payments/cip13-integration" },
            { title: "All CIPs", url: "https://cips.cardano.org/" }
        ]
    },
    {
        term: "CIP-13",
        definition: "A Cardano Improvement Proposal that defines a standard URI scheme for Cardano payments. It allows applications to create payment links (like 'web+cardano://address?amount=1000000') that can be opened by Cardano mobile wallets, similar to how 'bitcoin:' URIs work for Bitcoin.",
        links: [
            { title: "CIP-13 Specification", url: "https://cips.cardano.org/cips/cip13/" },
            { title: "CIP-13 Workshop", url: "/workshops/05-qr-code-payments/cip13-integration" }
        ]
    },
    {
        term: "Plutus",
        definition: "The smart contract platform and programming language for Cardano. Plutus is based on Haskell, a functional programming language. Smart contracts written in Plutus are secure, formally verifiable, and run on the Cardano blockchain.",
        links: [
            { title: "Plutus Documentation", url: "https://plutus.readthedocs.io/" }
        ]
    },
    {
        term: "Ouroboros",
        definition: "The proof-of-stake consensus protocol used by Cardano. Ouroboros is the first provably secure proof-of-stake algorithm, meaning it's mathematically proven to be secure. It's much more energy-efficient than proof-of-work systems like Bitcoin."
    },

    // ===== HARDWARE & IoT =====
    {
        term: "IoT",
        definition: "Internet of Things, a network of physical devices that are connected to the internet and can collect and exchange data. Examples include smart thermostats, fitness trackers, and industrial sensors. IoT devices often use microcontrollers like ESP32 to connect physical objects to the digital world.",
        links: [
            { title: "ESP32/D1 Microcontrollers Introduction", url: "/introductions/esp32-d1-microcontrollers" }
        ]
    },
    {
        term: "Arduino",
        definition: "An open-source electronics platform based on easy-to-use hardware and software. Arduino consists of microcontroller boards and the Arduino IDE (Integrated Development Environment) for programming them. It's perfect for beginners and experts alike to create interactive projects.",
        links: [
            { title: "Arduino Introduction", url: "/introductions/arduino" },
            { title: "Arduino Setup Workshop", url: "/workshops/01-basics/arduino-setup" },
            { title: "Official Website", url: "https://www.arduino.cc/" }
        ]
    },
    {
        term: "Arduino IDE",
        definition: "The Integrated Development Environment (IDE) used to write, compile, and upload code to Arduino-compatible boards. It's a free, user-friendly software that makes it easy to program microcontrollers. The IDE includes a code editor, compiler, and serial monitor for debugging.",
        links: [
            { title: "Arduino IDE Download", url: "https://www.arduino.cc/en/software" }
        ]
    },
    {
        term: "Microcontroller",
        definition: "A small computer on a single integrated circuit that contains a processor, memory, and input/output peripherals. Microcontrollers are the 'brains' of IoT devices. They're designed to control specific tasks and are much simpler and cheaper than full computers. Examples include ESP32, ESP8266, and Arduino boards.",
        links: [
            { title: "ESP32/D1 Microcontrollers Introduction", url: "/introductions/esp32-d1-microcontrollers" }
        ]
    },
    {
        term: "ESP32",
        definition: "A low-cost, low-power system on a chip (SoC) microcontroller with integrated Wi-Fi and dual-mode Bluetooth. ESP32 is popular for IoT projects because it's affordable, powerful, and has built-in wireless connectivity. It can be programmed using the Arduino IDE.",
        links: [
            { title: "ESP32 Introduction", url: "/introductions/esp32-d1-microcontrollers" }
        ]
    },
    {
        term: "ESP8266",
        definition: "A low-cost Wi-Fi enabled microcontroller, predecessor to ESP32. ESP8266 boards like the D1 Mini are popular for simple IoT projects that need Wi-Fi connectivity. While less powerful than ESP32, ESP8266 is still widely used and very affordable.",

    },
    {
        term: "D1 Mini",
        definition: "A compact development board based on the ESP8266 microcontroller. The D1 Mini is small, affordable, and perfect for IoT projects. It has built-in Wi-Fi, multiple GPIO pins, and can be programmed using the Arduino IDE. It's commonly used in the CardanoThings workshops."
    },
    {
        term: "GPIO",
        definition: "General Purpose Input/Output pins on a microcontroller. These pins can be configured as inputs (to read sensors) or outputs (to control LEDs, motors, relays, etc.). GPIO pins are how microcontrollers interact with the physical world, connecting to sensors, displays, and other hardware components."
    },
    {
        term: "LED",
        definition: "Light Emitting Diode, a semiconductor light source that emits light when current flows through it. LEDs are commonly used as indicators, displays, and lighting in electronics projects. They're energy-efficient, long-lasting, and come in various colors. In IoT projects, LEDs often indicate device status or provide visual feedback."
    },
    {
        term: "Relay",
        definition: "A programmable hardware device used to control electrical circuits by opening and closing contacts in another circuit. Relays allow low-voltage microcontrollers to safely control high-voltage devices like lights, motors, or appliances. Think of it as an electrically operated switch that your microcontroller can turn on or off.",
        links: [
            { title: "Relay Hardware Guide", url: "/hardware/relay-module-3v-1channel" },
            { title: "Light Up the Tree Workshop", url: "/workshops/02-read-and-output/light-up-the-tree" }
        ]
    },
    {
        term: "Relais",
        definition: "Alternative spelling of 'Relay'. A programmable hardware device used to control electrical circuits by opening and closing contacts in another circuit."
    },
    {
        term: "TFT Display",
        definition: "Thin-Film Transistor display, a type of LCD screen commonly used in embedded projects. TFT displays can show text, graphics, and images. They're often touch-sensitive, allowing for interactive user interfaces. In CardanoThings projects, TFT displays are used to show wallet balances, sensor data, and payment information.",
        links: [
            { title: "Display Data Workshop", url: "/workshops/02-read-and-output/display-data" }
        ]
    },
    {
        term: "Sensor",
        definition: "A device that detects and measures physical properties like temperature, humidity, light, motion, or pressure. Sensors convert physical phenomena into electrical signals that microcontrollers can read. Common sensors include DHT-22 (temperature/humidity), motion sensors, and light sensors.",
        links: [
            { title: "Sensor Data Workshop", url: "/workshops/03-input-and-write/connect-and-read-sensor-data" }
        ]
    },
    {
        term: "DHT-22",
        definition: "A digital temperature and humidity sensor commonly used in IoT projects. The DHT-22 is more accurate than the DHT-11 and can measure temperatures from -40°C to 80°C and humidity from 0% to 100%. It communicates with microcontrollers using a single-wire interface.",
        links: [
            { title: "Sensor Data Workshop", url: "/workshops/03-input-and-write/connect-and-read-sensor-data" }
        ]
    },
    {
        term: "SHT21",
        definition: "A high-precision digital temperature and humidity sensor from Sensirion with I2C interface. The SHT21 features excellent accuracy (±0.3°C for temperature, ±2% RH for humidity), low power consumption, and factory-calibrated measurements. It operates from -40°C to +125°C for temperature and 0% to 100% RH for humidity. The sensor communicates via I2C protocol, making it easy to connect to microcontrollers like ESP32.",
        links: [
            { title: "SHT21 Hardware Guide", url: "/hardware/sht21-temperature-sensor-i2c" },
            { title: "Sensor Data Workshop", url: "/workshops/03-input-and-write/connect-and-read-sensor-data" }
        ]
    },
    {
        term: "Breadboard",
        definition: "A solderless prototyping board used for building and testing electronic circuits. Breadboards have holes connected by metal strips underneath, allowing you to insert components and wires to create temporary circuits without soldering. Perfect for experimenting and prototyping before creating permanent circuits."
    },
    {
        term: "Jumper Wires",
        definition: "Pre-cut wires with connectors on the ends, used to connect components on breadboards or between circuit boards. Jumper wires come in different types (male-to-male, male-to-female, female-to-female) and various lengths. They're essential for prototyping and connecting sensors, displays, and other components to microcontrollers."
    },

    // ===== PROGRAMMING & APIs =====
    {
        term: "API",
        definition: "Application Programming Interface, a set of rules that allows different software entities to communicate with each other. APIs define how applications can request and receive data from services. For example, Cardano APIs allow your microcontroller to fetch wallet balances or transaction information from the blockchain.",
        links: [
            { title: "API Setup Workshop", url: "/workshops/01-basics/api-setup" },
            { title: "REST APIs Introduction", url: "/introductions/rest-apis" }
        ]
    },
    {
        term: "REST API",
        definition: "Representational State Transfer Application Programming Interface, a set of rules for building web services that allow communication between client and server. REST APIs use standard HTTP methods (GET, POST, PUT, DELETE) and return data in formats like JSON. Most Cardano APIs (Koios, Blockfrost) are REST APIs.",
        links: [
            { title: "REST APIs Introduction", url: "/introductions/rest-apis" }
        ]
    },
    {
        term: "HTTP",
        definition: "Hypertext Transfer Protocol, the foundation of data communication on the web. HTTP defines how messages are formatted and transmitted between web browsers and servers. When your microcontroller makes an API call, it's using HTTP to request data from a server."
    },
    {
        term: "JSON",
        definition: "JavaScript Object Notation, a lightweight data format used to exchange data between applications. JSON is human-readable and easy for both humans and machines to parse. Most APIs return data in JSON format. For example, a wallet balance API might return: {\"balance\": 1000000, \"currency\": \"ADA\"}."
    },
    {
        term: "Node.js",
        definition: "An open-source JavaScript runtime environment that allows you to run JavaScript on the server side. Node.js is commonly used to build APIs and backend services. In CardanoThings workshops, Node.js is used to create simple APIs that interact with the Cardano blockchain.",
        links: [
            { title: "Node.js Introduction", url: "/introductions/nodejs" },
            { title: "Build Your Own API Workshop", url: "/workshops/03-input-and-write/build-your-own-api" }
        ]
    },
    {
        term: "npm",
        definition: "Node Package Manager, the package manager for Node.js. npm allows you to install and manage JavaScript libraries and tools. It's used to add dependencies to your Node.js projects, like libraries for making HTTP requests or interacting with Cardano APIs."
    },
    {
        term: "Serial Monitor",
        definition: "A tool in the Arduino IDE that displays text output from your microcontroller. The Serial Monitor is essential for debugging - you can print messages, sensor readings, and error information to see what your code is doing. It communicates with your microcontroller over USB at a specific baud rate (like 115200)."
    },
    {
        term: "Sketch",
        definition: "In Arduino terminology, a 'sketch' is a program written for an Arduino-compatible board. Sketches are written in a simplified version of C++ and saved with a .ino file extension. The Arduino IDE compiles sketches and uploads them to your microcontroller."
    },
    {
        term: "Library",
        definition: "Pre-written code that provides additional functionality for your Arduino sketches. Libraries make it easier to use sensors, displays, and other components without writing all the code from scratch. For example, the TFT_eSPI library simplifies using TFT displays, and the DHT library makes reading DHT sensors easy."
    },
    {
        term: "QR Code",
        definition: "Quick Response Code, a two-dimensional barcode that can store information like text, URLs, or payment URIs. QR codes can be scanned by smartphones to quickly access information. In CardanoThings projects, QR codes are used to display payment URIs that can be scanned by mobile wallets.",
        links: [
            { title: "QR Code Creation Workshop", url: "/workshops/05-qr-code-payments/qr-code-creation" }
        ]
    },
    {
        term: "WiFi",
        definition: "A wireless networking technology that allows devices to connect to the internet and communicate with each other. ESP32 and ESP8266 microcontrollers have built-in WiFi, allowing them to connect to your home network and access APIs, send data, and receive commands over the internet."
    },
    {
        term: "SSID",
        definition: "Service Set Identifier, the name of a WiFi network. When connecting your microcontroller to WiFi, you need to provide the SSID (network name) and password. The SSID is what you see when you look for available WiFi networks on your phone or computer."
    },

    // ===== CARDANO SERVICES & TOOLS =====
    {
        term: "Koios",
        definition: "A community-driven Cardano API service that provides access to blockchain data. Koios offers REST APIs to query wallet balances, transaction information, epoch data, and more. It's free to use and doesn't require an API key, making it great for beginners.",
        links: [
            { title: "Koios API Documentation", url: "https://api.koios.rest/" },
            { title: "API Setup Workshop", url: "/workshops/01-basics/api-setup" }
        ]
    },
    {
        term: "Blockfrost",
        definition: "A Cardano API service that provides comprehensive blockchain data access. Blockfrost offers both free and paid tiers, with the free tier suitable for development and testing. It requires an API key and provides detailed information about addresses, transactions, assets, and more.",
        links: [
            { title: "Blockfrost Documentation", url: "https://blockfrost.io/" },
            { title: "Fetch Wallet Balance Workshop", url: "/workshops/02-read-and-output/fetch-wallet-balance" }
        ]
    },
    {
        term: "Maestro",
        definition: "A Cardano API service that provides blockchain data and transaction building capabilities. Maestro offers both REST APIs and GraphQL interfaces for querying Cardano data and constructing transactions. It's another option alongside Koios and Blockfrost for accessing Cardano blockchain information."
    },
    {
        term: "NMKR",
        definition: "A platform (formerly NFT-MAKER) that simplifies minting NFTs on Cardano. NMKR provides a simple API that handles all the complex transaction building, making it easy for beginners to mint NFTs without deep knowledge of Cardano's technical details. Perfect for rapid prototyping and projects focused on application logic.",
        links: [
            { title: "NMKR Website", url: "https://www.nmkr.io/" },
            { title: "Mint Sensor Data On-Chain Workshop", url: "/workshops/03-input-and-write/mint-sensor-data-on-chain" }
        ]
    },
    {
        term: "Yoroi",
        definition: "A popular Cardano wallet available on mobile (iOS/Android) and as a browser extension. Yoroi is free, open-source, and supports both Mainnet and Testnet. It supports CIP-13 payment URIs, making it compatible with QR code payment systems. Yoroi is user-friendly and great for beginners.",
        links: [
            { title: "Yoroi Wallet", url: "https://yoroi-wallet.com/" }
        ]
    },
    {
        term: "Vespr",
        definition: "A modern Cardano wallet with a focus on user experience and design. Vespr is available on iOS and Android and supports CIP-13 payment URIs. It offers an intuitive interface for managing ADA, tokens, and NFTs on Cardano.",
        links: [
            { title: "Vespr Wallet", url: "https://vespr.xyz/" }
        ]
    },
    {
        term: "Begin Wallet",
        definition: "A self-custodial, open-source Cardano and Bitcoin wallet designed for beginners and advanced users alike. Begin Wallet is available on iOS, Android, and as a Chrome extension. It supports CIP-13 payment URIs, ADA staking, lending with Liqwid, governance participation (DRep delegation), dApp discovery with on-chain ratings, and manages both Cardano and Bitcoin under one seed phrase. It's open-source, audited, and puts users in full control of their keys.",
        links: [
            { title: "Begin Wallet", url: "https://begin.is/" }
        ]
    },
    {
        term: "Eternl",
        definition: "A comprehensive Cardano wallet (formerly CCVault) available on iOS, Android, and as a browser extension. Eternl offers advanced features including ADA staking, NFT management, token handling, dApp connectivity, and supports CIP-13 payment URIs. It provides a powerful interface for both beginners and advanced users managing Cardano assets.",
        links: [
            { title: "Eternl Wallet", url: "https://eternl.io/" }
        ]
    },
    {
        term: "CardanoScan",
        definition: "A blockchain explorer for Cardano that allows you to view transactions, addresses, blocks, and other blockchain data. Blockchain explorers are like search engines for blockchains - you can look up any transaction, address, or token to see its details and history.",
        links: [
            { title: "CardanoScan", url: "https://cardanoscan.io/" }
        ]
    },
    {
        term: "Cexplorer",
        definition: "Another Cardano blockchain explorer that provides detailed information about transactions, addresses, epochs, and other blockchain data. Like CardanoScan, it's a useful tool for verifying transactions and exploring the Cardano blockchain.",
        links: [
            { title: "Cexplorer", url: "https://cexplorer.io/" }
        ]
    },
    {
        term: "Realfi.info",
        definition: "An API service that provides token price data for Cardano native tokens. Realfi.info offers real-time and historical price information for various tokens on Cardano, useful for building tickers, price displays, and financial applications.",
        links: [
            { title: "Cardano Ticker Workshop", url: "/workshops/04-cardano-ticker/gathering-data" }
        ]
    },
    {
        term: "JPG.store",
        definition: "An NFT marketplace and API service for Cardano. JPG.store provides NFT floor prices, collection data, and marketplace information. It's useful for building applications that display NFT prices or interact with the Cardano NFT ecosystem.",
        links: [
            { title: "JPG.store", url: "https://www.jpg.store/" }
        ]
    },
    {
        term: "Taptools",
        definition: "A Cardano analytics and API platform that provides comprehensive data about tokens, NFTs, and blockchain metrics. Taptools offers both free and paid API tiers with detailed analytics and market data for Cardano assets."
    },

    // ===== TECHNICAL CONCEPTS =====
    {
        term: "Baud Rate",
        definition: "The speed at which data is transmitted over a serial connection, measured in bits per second. Common baud rates include 9600, 115200, etc. When using the Serial Monitor in Arduino IDE, you need to set the baud rate to match what your code uses (typically 115200 for ESP32)."
    },
    {
        term: "SPI",
        definition: "Serial Peripheral Interface, a communication protocol used to connect microcontrollers with peripheral devices like displays, sensors, and memory chips. SPI uses multiple wires (MOSI, MISO, SCK, CS) for fast, synchronous communication. TFT displays often use SPI for communication."
    },
    {
        term: "I2C",
        definition: "Inter-Integrated Circuit, a communication protocol that allows multiple devices to communicate over just two wires (SDA and SCL). I2C is useful for connecting multiple sensors or devices to a microcontroller using fewer pins than SPI."
    },
    {
        term: "UART",
        definition: "Universal Asynchronous Receiver-Transmitter, a communication protocol for serial communication. UART is used for communication between microcontrollers and computers (via USB-to-serial converters) and is what the Serial Monitor uses to communicate with your Arduino board."
    },
    {
        term: "PWM",
        definition: "Pulse Width Modulation, a technique for controlling analog devices (like LED brightness or motor speed) using digital signals. PWM rapidly switches a signal on and off, and by varying the ratio of on-time to off-time, you can control the average power delivered to a device."
    },
    {
        term: "ADC",
        definition: "Analog-to-Digital Converter, a component that converts analog voltage signals (like from sensors) into digital values that a microcontroller can process. ADCs allow microcontrollers to read analog sensors that output varying voltages rather than simple on/off signals."
    },
    {
        term: "Git",
        definition: "A version control system that tracks changes in code and allows multiple people to collaborate on projects. Git helps you save different versions of your code, track changes, and collaborate with others. Many developers use Git to manage their project code."
    },
    {
        term: "GitHub",
        definition: "A web-based platform for hosting and sharing code using Git. GitHub allows developers to store their code online, collaborate with others, and share projects. Many open-source projects, including Arduino libraries, are hosted on GitHub."
    },
    {
        term: "IDE",
        definition: "Integrated Development Environment, a software application that provides tools for writing, editing, compiling, and debugging code. The Arduino IDE is an example - it combines a code editor, compiler, and uploader in one application, making it easier to develop microcontroller programs."
    },
    {
        term: "Compiler",
        definition: "A program that translates human-readable source code into machine code that a computer or microcontroller can execute. When you click 'Upload' in Arduino IDE, it compiles your sketch (converts it to machine code) and then uploads it to your microcontroller."
    },
    {
        term: "Debugging",
        definition: "The process of finding and fixing errors (bugs) in code. Debugging techniques include using the Serial Monitor to print messages, checking error messages, testing code step by step, and using breakpoints. Good debugging skills are essential for programming."
    },
    {
        term: "Firmware",
        definition: "Software that is permanently stored in a hardware device's read-only memory. Firmware provides low-level control for the device's hardware. When you upload a sketch to an Arduino board, you're essentially updating its firmware."
    },
    {
        term: "Open Source",
        definition: "Software or hardware whose source code or design is made freely available for anyone to view, modify, and distribute. Arduino, ESP32, and many Cardano tools are open source, meaning the community can contribute improvements and everyone benefits."
    }
];
