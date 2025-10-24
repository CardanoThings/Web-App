<script>
	import ESP32 from '$lib/ESP32.svelte';
	import * as Card from '$lib/components/ui/card/index.js';
</script>

<ESP32 modelUrl="/models/esp32c6.gltf" />

<section>
	<h1>Workshops</h1>
	<Card.Root>
		<Card.Header>
			<Card.Title class="text-xl">Workshop 01</Card.Title>
			<Card.Description
				>This workshop starts with the very basics to set you up for the coming workshops.</Card.Description
			>
		</Card.Header>
		<Card.Content>
			<ol>
				<li>
					Cardano Setup
					<p>
						You will learn how to install and setup a Cardano Wallet like Nami for Testnet use and
						request and receive tADA. If you don’t know anything about Cadano, the
						Introductions-Section has a short intro on Cardano and Blockchain in general.
					</p>
				</li>

				<li>
					Arduino Setup
					<p>
						You will learn the very basics of an Arduino Script, how to connect your Microcontroller
						to your PC and your WIFI and how to make it blink. If you don’t know anything about
						Microcontrollers or Arduino yet, the Introductions-Section has short intros on both.
					</p>
				</li>
				<li>
					API Setup & First Call
					<p>
						You will learn how to fetch data like the current Epoch Number with your Microcontroller
						from an API like Koios and how to output it to the Arduino console.
					</p>
				</li>
			</ol>
		</Card.Content>
	</Card.Root>

	<Card.Root>
		<Card.Header>
			<Card.Title class="text-xl">Workshop 02</Card.Title>
			<Card.Description>
				Based on what you have learned in Workshop 1, this workshop will teach you how to read data
				from the blockchain in intervals and use this data to trigger an action on your
				Microcontroller. You will learn about two other Cardano APIs called Maestro and Blockfrost
				and how to set them up and get a short introduction into connecting external hardware to
				your microcontroller.
			</Card.Description>
		</Card.Header>
		<Card.Content>
			<ol>
				<li>
					Fetch your Wallet Balance <p>
						You will learn how to fetch your wallet balance in intervals using your Microcontroller
						and an API, output the fetched data to the Arduino console and listen for changes. We
						will also introduce you to other API endpoints and look into different APIs like
						Blockfrost or Maestro.
					</p>
				</li>

				<li>
					Display data on your Microcontroller
					<p>
						We will introduce you to the Arduino TFT_eSPI Library and you will learn how to display
						the fetched data from Step 1 on your TFT-Display.
					</p>
				</li>
				<li>
					Light up the tree
					<p>
						In this step of this workshop you will learn how to use your Microcontroller with
						external hardware like a 110V/220V relais to turn a lightbulb (or the Christmas Tree for
						that matter) on and off based on on-chain events. We will also look briefly into other
						options like motors, LEDs and other hardware.
					</p>
				</li>
				<li>
					Epoch Clock
					<p>
						Based on what you have learned in former steps and workshops, you will learn how to
						build a physical Epoch Clock with a D1 Microcontroller and LED Matrix.
					</p>
				</li>
			</ol>
		</Card.Content>
	</Card.Root>

	<Card.Root>
		<Card.Header>
			<Card.Title class="text-xl">Workshop 03: Input and Write</Card.Title>
			<Card.Description>
				Time to put data on chain. In this workshop you will learn how to read sensor data from your
				Microcontroller and put this data on chain forever using a very simple API. We will also
				introduce another API: NMKR.
			</Card.Description>
		</Card.Header>
		<Card.Content>
			<ol>
				<li>
					Connect and read sensor data
					<p>
						Your will learn how to connect a DHT-22 temperature sensor to your Microcontroller, read
						the sensor output, store it and display it in the Arduino console and on the display of
						your Microcontroller.
					</p>
				</li>

				<li>
					Build your own API to put data on chain
					<p>
						You will learn how to setup a really simple API with NodeJs and how to create and submit
						a mint transaction on chain using Blockfrost using the data from your Microcontroller.
						We will also look into how to utilize the touch screen capabilities of your
						microcontroller.
					</p>
				</li>

				<li>
					Mint on NMKR
					<p>
						If building your own API to mint NFTs seems to complex for you, no worries. You will get
						a short introduction into NMKR and how to set it up to use their API to mint an NFT with
						data from your Microcontroller.
					</p>
				</li>
			</ol>
		</Card.Content>
	</Card.Root>

	<Card.Root>
		<Card.Header>
			<Card.Title class="text-xl">Workshop 04: Cardano Ticker</Card.Title>
			<Card.Description>
				With all the basic building blocks in place, lets start with some (more) real world use
				cases: In this workshop you will learn how to fetch Cardano token prices from the
				realfi.info API and display them neatly on your Microcontroller. We will also briefly
				introduce you to the Taptools.io API and include a quick way to fetch NFT prices from
				JPG.store.
			</Card.Description>
		</Card.Header>
		<Card.Content>
			<ol>
				<li>
					Gathering data
					<p>
						We will go through the process of fetching and setting up all the data on your own API:
						First we check your own (or any other) wallet, see what is in there, fetch token prices
						from the Realfi.info API and some NFT floors from JPG.store and put it all together to
						be requested by your microcontroller. We will also introduce you to the paid Taptools
						API.
					</p>
				</li>

				<li>
					Building the Ticker
					<p>
						With most of the building blocks already in place from former workshops, you will learn
						more about the Arduino TFT_eSPI Library, how to work with fonts, images and sprites and
						how to animate text, to make your ticker interesting and visually beautiful.
					</p>
				</li>
			</ol>
		</Card.Content>
	</Card.Root>

	<Card.Root>
		<Card.Header>
			<Card.Title class="text-xl">Workshop 05: QR-Code Payments</Card.Title>
			<Card.Description>
				In this workshop you will build a simple payment system right on your microcontroller
				utilising everything you have learned in former workshops. You will also learn about Cardano
				mobile wallets like Yoroi, Vespr or BeginWallet.
			</Card.Description>
		</Card.Header>
		<Card.Content>
			<ol>
				<li>
					Building the Interface
					<p>
						You will learn how to build a simple payment user interface utilizing the touch
						capabilities of your microcontroller and your knowledge from former workshops about the
						TFT_eSPI Library.
					</p>
				</li>
				<li>
					CIP13 Integration
					<p>
						You will learn about Cardano Improvement Proposals (CIPs) in general and in the specific
						case of CIP13, which lets you create payment URIs for Cardano mobile wallets. Of cause,
						you’ll get a brief introduction into various mobile wallets, too.
					</p>
				</li>
				<li>
					QR-Code Creation
					<p>
						You will learn how to create and display a QR-Code with a CIP-13 Payment URI on your
						microcontroller display that can be scanned to send a transaction by using your
						smartphone and a mobile wallet (tbd).
					</p>
				</li>
				<li>
					Confirming the payment
					<p>
						In this last step you will implement a simple listener for the created transaction and
						display a confirmation, once the transaction has arrived in your wallet.
					</p>
				</li>
			</ol>
		</Card.Content>
	</Card.Root>
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	ol {
		font-size: 0.875rem;
	}
	ol li {
		font-weight: 600;
	}

	ol li p {
		line-height: 1.4rem;
		margin-bottom: 0.25rem;
		color: var(--color-text-secondary);
		font-weight: 400;
	}
</style>
