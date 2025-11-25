export const workshops = [
    {
        title: "Workshop 01: The Basics",
        description: "This workshop starts with the very basics to set you up for the coming workshops: You will install and fund a Cardano wallet on the Preprod Network, install the Arduino IDE, set up your Microcontroller and make your first API call. Lets get started!",
        steps: [
            {
                title: "Cardano Setup",
                description: "You will learn how to install and setup a Cardano Wallet like Yoroi for the Preprod Testnet, request and receive tADA. If you don't know anything about Cadano, the Introductions-Section has a short intro on Cardano and Blockchain in general.",
                link: "/workshops/01-basics/cardano-setup",
                intros: [
                    { title: "Cardano", link: "/introductions/cardano" },
                    { title: "Blockchain", link: "/introductions/blockchain" }
                ],
            },
            {
                title: "Arduino Setup",
                description: "You will learn the very basics of an Arduino Script, how to connect your Microcontroller to your PC and your WIFI and how to make it blink. If you don't know anything about Microcontrollers or Arduino yet, the Introductions-Section has short intros on both.",
                link: "/workshops/01-basics/arduino-setup",
                intros: [
                    {
                        title: "Arduino", link: "/introductions/arduino",
                    },
                    {
                        title: "Microcontrollers", link: "/introductions/esp32-d1-microcontrollers"
                    }
                ],
            },
            {
                title: "API Setup & First Call",
                description: "You will learn how to fetch data like the current Epoch Number with your Microcontroller from an API like Koios and how to output it to the Arduino console.",
                link: "/workshops/01-basics/api-setup",
                intros: [
                    { title: "Rest APIs", link: "/introductions/rest-apis" },
                ],
            }
        ],
        link: "/workshops/01-basics"
    },
    {
        title: "Workshop 02: Read and Output",
        description: "This workshop will teach you how to read data from the blockchain in intervals and use this data to trigger an action on your Microcontroller. You will learn about two other Cardano APIs and how to set them up and get a short introduction into connecting external hardware to your microcontroller.",
        steps: [
            {
                title: "Fetch your Wallet Balance",
                description: "You will learn how to fetch your wallet balance in intervals using your Microcontroller and an API, output the fetched data to the Arduino console and listen for changes. We will also introduce you to other API endpoints and look into different APIs like Blockfrost or Maestro.",
                link: "/workshops/02-read-and-output/fetch-wallet-balance"
            },
            {
                title: "Display data on your Microcontroller",
                description: "We will introduce you to the Arduino TFT_eSPI Library and you will learn how to display the fetched data from Step 1 on your TFT-Display.",
                link: "/workshops/02-read-and-output/display-data"
            },
            {
                title: "Light up the tree",
                description: "In this step of this workshop you will learn how to use your Microcontroller with external hardware like a 110V/220V relais to turn a lightbulb (or the Christmas Tree for that matter) on and off based on on-chain events. We will also look briefly into other options like motors, LEDs and other hardware.",
                link: "/workshops/02-read-and-output/light-up-the-tree"
            },
            {
                title: "Epoch Clock",
                description: "Based on what you have learned in former steps and workshops, you will learn how to build a physical Epoch Clock with a D1 Microcontroller and LED Matrix.",
                link: "/workshops/02-read-and-output/epoch-clock"
            }
        ],
        link: "/workshops/02-read-and-output"
    },
    {
        title: "Workshop 03: Input and Write",
        description: "Time to put data on chain. In this workshop you will learn how to read sensor data from your Microcontroller and put this data on chain forever using a very simple API. We will also introduce another API: NMKR.",
        steps: [
            {
                title: "Connect and read sensor data",
                description: "Your will learn how to connect a DHT-22 temperature sensor to your Microcontroller, read the sensor output, store it and display it in the Arduino console and on the display of your Microcontroller.",
                link: "/workshops/03-input-and-write/connect-and-read-sensor-data"
            },
            {
                title: "Build your own API to put data on chain",
                description: "You will learn how to setup a really simple API with NodeJs and how to create and submit a mint transaction on chain using Blockfrost using the data from your Microcontroller. We will also look into how to utilize the touch screen capabilities of your microcontroller.",
                link: "/workshops/03-input-and-write/build-your-own-api"
            },
            {
                title: "Mint on NMKR",
                description: "If building your own API to mint NFTs seems to complex for you, no worries. You will get a short introduction into NMKR and how to set it up to use their API to mint an NFT with data from your Microcontroller.",
                link: "/workshops/03-input-and-write/mint-on-nmkr"
            }
        ],
        link: "/workshops/03-input-and-write"
    },
    {
        title: "Workshop 04: Cardano Ticker",
        description: "With all the basic building blocks in place, lets start with some (more) real world use cases: In this workshop you will learn how to fetch Cardano token prices from the realfi.info API and display them neatly on your Microcontroller. We will also briefly introduce you to the Taptools.io API and include a quick way to fetch NFT prices from JPG.store.",
        steps: [
            {
                title: "Gathering data",
                description: "We will go through the process of fetching and setting up all the data on your own API: First we check your own (or any other) wallet, see what is in there, fetch token prices from the Realfi.info API and some NFT floors from JPG.store and put it all together to be requested by your microcontroller. We will also introduce you to the paid Taptools API.",
                link: "/workshops/04-cardano-ticker/gathering-data"
            },
            {
                title: "Building the Ticker",
                description: "With most of the building blocks already in place from former workshops, you will learn more about the Arduino TFT_eSPI Library, how to work with fonts, images and sprites and how to animate text, to make your ticker interesting and visually beautiful.",
                link: "/workshops/04-cardano-ticker/building-the-ticker"
            }
        ],
        link: "/workshops/04-cardano-ticker"
    },
    {
        title: "Workshop 05: QR-Code Payments",
        description: "In this workshop you will build a simple payment system right on your microcontroller utilising everything you have learned in former workshops. You will also learn about Cardano mobile wallets like Yoroi, Vespr, Eternl, or Begin.",
        steps: [
            {
                title: "Building the Interface",
                description: "You will learn how to build a simple payment user interface utilizing the touch capabilities of your microcontroller and your knowledge from former workshops about the TFT_eSPI Library.",
                link: "/workshops/05-qr-code-payments/building-the-interface"
            },
            {
                title: "CIP13 Integration",
                description: "You will learn about Cardano Improvement Proposals (CIPs) in general and in the specific case of CIP13, which lets you create payment URIs for Cardano mobile wallets. Of cause, you'll get a brief introduction into various mobile wallets, too.",
                link: "/workshops/05-qr-code-payments/cip13-integration"
            },
            {
                title: "QR-Code Creation",
                description: "You will learn how to create and display a QR-Code with a CIP-13 Payment URI on your microcontroller display that can be scanned to send a transaction by using your smartphone and a mobile wallet (tbd).",
                link: "/workshops/05-qr-code-payments/qr-code-creation"
            },
            {
                title: "Confirming the payment",
                description: "In this last step you will implement a simple listener for the created transaction and display a confirmation, once the transaction has arrived in your wallet.",
                link: "/workshops/05-qr-code-payments/confirming-the-payment"
            }
        ],
        link: "/workshops/05-qr-code-payments"
    }
];