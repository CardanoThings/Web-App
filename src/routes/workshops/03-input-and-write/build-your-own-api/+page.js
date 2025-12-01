export const load = async () => {
	return {
		basicApiCode: `
			// Import required Node.js packages
			import express from 'express';              // Web framework for building API

			// Create Express application instance
			const app = express();
			
			// Server port number
			const PORT = 3000;

			// GET endpoint for health check
			// Useful for testing if server is running
			// URL: http://localhost:3000/health
			app.get('/health', (req, res) => {
				res.json({ status: 'ok', timestamp: new Date().toISOString() });
			});

			// Start server and listen on specified port
			app.listen(PORT, () => {
				console.log(\`Server running on http://localhost:\${PORT}\`);
			});`,
		enhancedApiCode: `
			// Import required Node.js packages
			import express from 'express';              // Web framework for building API
			import cors from 'cors';                   // Enable Cross-Origin Resource Sharing

			// Create Express application instance
			const app = express();
			
			// Server port number
			const PORT = 3000;

			// Store received data in memory
			// In a production app, you would use a database instead
			let storedData = null;

			// Middleware: Enable CORS to allow requests from different origins
			app.use(cors());
			
			// Middleware: Parse JSON request bodies
			app.use(express.json());

			// POST endpoint to receive and store data
			// URL: http://localhost:3000/data
			app.post('/data', async (req, res) => {
				try {
					// Extract data from request body
					const data = req.body;
					
					// Store the data in a variable
					storedData = data;
					
					// Log received data to console for debugging
					console.log('Received and stored data:', data);
					
					// Return success response
					res.json({ 
						success: true, 
						message: 'Data received and stored successfully.',
						data: data
					});
				} catch (error) {
					// Handle errors and return error response
					console.error('Error:', error);
					res.status(500).json({ success: false, error: error.message });
				}
			});

			// GET endpoint to retrieve stored data
			// URL: http://localhost:3000/data
			app.get('/data', (req, res) => {
				try {
					if (storedData === null) {
						return res.status(404).json({ 
							success: false, 
							message: 'No data has been stored yet. Send a POST request to /data first.' 
						});
					}
					
					// Return the stored data
					res.json({ 
						success: true, 
						data: storedData 
					});
				} catch (error) {
					// Handle errors and return error response
					console.error('Error:', error);
					res.status(500).json({ success: false, error: error.message });
				}
			});

			// GET endpoint for health check
			// Useful for testing if server is running
			// URL: http://localhost:3000/health
			app.get('/health', (req, res) => {
				res.json({ status: 'ok', timestamp: new Date().toISOString() });
			});

			// Start server and listen on specified port
			app.listen(PORT, () => {
				console.log(\`Server running on http://localhost:\${PORT}\`);
			});`,
		basicPackageJson: `
			{
				"name": "simple-api",
				"version": "1.0.0",
				"description": "Simple Node.js API server",
				"type": "module",
				"main": "server.js",
				"scripts": {
					"start": "node server.js"
				},
				"dependencies": {
					"express": "^4.18.2"
				}
			}`,
		enhancedPackageJson: `
			{
				"name": "simple-api",
				"version": "1.0.0",
				"description": "Simple Node.js API server",
				"type": "module",
				"main": "server.js",
				"scripts": {
					"start": "node server.js"
				},
				"dependencies": {
					"express": "^4.18.2",
					"cors": "^2.8.5"
				}
			}`,
		meshWalletCode: `
			// Import Mesh SDK components
			import { KoiosProvider, MeshWallet } from '@meshsdk/core';

			// Initialize Koios provider for Preprod Testnet
			// Koios is free to use and doesn't require an API key
			// 'preprod' = Preprod testnet, 'api' = Mainnet
			const provider = new KoiosProvider('preprod');

			// Initialize wallet using mnemonic
			// WARNING: This is for example purposes only! Never hardcode your mnemonic in production code!
			// In production, always use environment variables: process.env.WALLET_MNEMONIC?.split(' ') || []
			// Replace with your actual 12 or 24 word mnemonic phrase from your testnet wallet
			const mnemonic = ["word1", "word2", "word3", "word4", "word5", "word6", "word7", "word8", "word9", "word10", "word11", "word12"];

			// Create MeshWallet instance
			// This wallet will be used to interact with the Cardano blockchain
			const wallet = new MeshWallet({
				networkId: 0,  // 0 = testnet (Preprod), 1 = mainnet
				fetcher: provider,  // Provider for fetching blockchain data
				submitter: provider,  // Provider for submitting transactions
				key: {
					type: 'mnemonic',  // Wallet key type: mnemonic phrase
					words: mnemonic  // Array of mnemonic words
				}
			});

			// Function to fetch and log wallet balance
			async function fetchWalletBalance() {
				try {
					// Get wallet address
					// The change address is the address where change from transactions is sent
					const address = await wallet.getChangeAddress();
					console.log('Wallet Address:', address);
					
					// Get wallet balance using Mesh's built-in method
					// Returns an array of assets: [{ unit: 'lovelace', quantity: '...' }, ...]
					// The first item is always lovelace (ADA), followed by any native tokens
					const balanceArray = await wallet.getBalance();
					
					// Extract lovelace from the balance array
					// Find the item with unit 'lovelace' and get its quantity
					const lovelaceAsset = balanceArray.find(asset => asset.unit === 'lovelace');
					const balanceLovelace = lovelaceAsset ? parseInt(lovelaceAsset.quantity) : 0;
					
					// Convert Lovelace to ADA
					// 1 ADA = 1,000,000 Lovelace
					const balanceADA = balanceLovelace / 1000000;
					
					// Log wallet information to console
					console.log('Wallet Balance:', balanceADA, 'ADA');
					console.log('Balance in Lovelace:', balanceLovelace);
				} catch (error) {
					// Handle any errors that occur during balance fetching
					console.error('Error fetching wallet balance:', error);
				}
			}

			// Call the function to fetch and log wallet balance
			fetchWalletBalance();`,
		meshTransactionCode: `
			// Import Mesh SDK components
			import { KoiosProvider, MeshWallet, MeshTxBuilder } from '@meshsdk/core';

			// Initialize Koios provider for Preprod Testnet
			// Koios is free to use and doesn't require an API key
			// 'preprod' = Preprod testnet, 'api' = Mainnet
			const provider = new KoiosProvider('preprod');

			// Initialize wallet using mnemonic
			// WARNING: This is for example purposes only! Never hardcode your mnemonic in production code!
			// In production, always use environment variables: process.env.WALLET_MNEMONIC?.split(' ') || []
			// Replace with your actual 12 or 24 word mnemonic phrase from your testnet wallet
			const mnemonic = ["word1", "word2", "word3", "word4", "word5", "word6", "word7", "word8", "word9", "word10", "word11", "word12"];

			// Create MeshWallet instance
			// This wallet will be used to create and sign transactions
			const wallet = new MeshWallet({
				networkId: 0,  // 0 = testnet (Preprod), 1 = mainnet
				fetcher: provider,  // Provider for fetching blockchain data
				submitter: provider,  // Provider for submitting transactions
				key: {
					type: 'mnemonic',  // Wallet key type: mnemonic phrase
					words: mnemonic  // Array of mnemonic words
				}
			});

			// Function to create and submit a transaction with metadata
			async function sendTransaction() {
				try {
					// PingPong wallet address - this wallet will automatically refund the transaction minus fees within 60 seconds
					// Perfect for testing transactions on the Cardano Preprod testnet
					// The PingPong wallet sends your funds back automatically, making it ideal for testing
					const recipientAddress = 'addr_test1qpvla0l6zgkl4ufzur0wal0uny5lyqsg4rw7g6gxj08lzacth0hnd66lz6uqqz7kwkmx07xyppsk2cddvxnqvfd05reqf7p26w';
					
					// Amount to send in ADA
					// This will be converted to Lovelace (1 ADA = 1,000,000 Lovelace)
					const amountADA = 10.0;  // Send 10 ADA
					const amountLovelace = Math.floor(amountADA * 1000000);  // Convert to Lovelace
					
					// Transaction metadata
					// Metadata allows you to attach additional data to transactions that is permanently stored on the blockchain
					// Metadata labels must be numbers between 0 and 65535
					// Label 674 = Message (CIP-20 standard for transaction messages)
					const metadata = {
						674: {  // Message label (CIP-20 standard)
							msg: ['Hello from CardanoThings!', 'This is a test transaction with metadata.']
						}
					};
					
					// Log transaction details before creating it
					console.log('Creating transaction...');
					console.log('Recipient:', recipientAddress);
					console.log('Amount:', amountADA, 'ADA');
					console.log('Metadata:', JSON.stringify(metadata, null, 2));
					
					// Get wallet UTXOs (Unspent Transaction Outputs)
					// UTXOs represent available funds in your wallet that can be spent
					const utxos = await wallet.getUtxos();
					
					// Get change address
					// This is where any remaining funds (after transaction amount and fees) will be sent
					const changeAddress = await wallet.getChangeAddress();
					
					// Initialize MeshTxBuilder
					// MeshTxBuilder provides low-level APIs for building transactions with fine-grained control
					// This gives you more control than the higher-level wallet.buildTx() method
					const txBuilder = new MeshTxBuilder({
						fetcher: provider,  // Provider for fetching blockchain data needed for transaction building
						verbose: true  // Enable verbose logging for debugging transaction building
					});
					
					// Build the transaction using MeshTxBuilder
					// This approach gives you more control over the transaction structure
					const unsignedTx = await txBuilder
						.txOut(recipientAddress, [{ unit: 'lovelace', quantity: amountLovelace.toString() }])  // Output: send lovelace to recipient address
						.changeAddress(changeAddress)  // Address to receive change (remaining funds after transaction)
						.metadataValue(674, metadata[674])  // Attach message metadata (label 674, CIP-20 standard)
						.selectUtxosFrom(utxos)  // Automatically select UTXOs from the provided list to fund the transaction
						.complete();  // Finalize the transaction structure and return the unsigned transaction
					
					// Sign the transaction with your wallet's private key
					// This proves that you own the wallet and authorizes the transaction
					const signedTx = await wallet.signTx(unsignedTx);
					
					// Submit the signed transaction to the Cardano network
					// The transaction will be broadcast to the network and included in the next block
					const txHash = await wallet.submitTx(signedTx);
					
					// Log success message and transaction details
					console.log('Transaction submitted successfully!');
					console.log('Transaction Hash:', txHash);
					console.log('View on Cardano Explorer:', \`https://preprod.cardanoscan.io/transaction/\${txHash}\`);
					console.log('Metadata will be visible on the blockchain explorer');
				} catch (error) {
					// Handle any errors that occur during transaction creation or submission
					console.error('Error creating or submitting transaction:', error);
				}
			}

			// Call the function to create and submit transaction
			sendTransaction();`,
		meshApiCode: `
			// Import required Node.js packages
			import express from 'express';
			import cors from 'cors';
			import { KoiosProvider, MeshWallet, MeshTxBuilder } from '@meshsdk/core';

			// Create Express application instance
			const app = express();
			
			// Server port number
			const PORT = 3000;

			// Initialize Koios provider for Preprod Testnet
			// Koios is free to use and doesn't require an API key
			const provider = new KoiosProvider(
				'preprod'  // Network: 'preprod' for testnet, 'api' for mainnet
			);

			// Initialize wallet using mnemonic
			// WARNING: This is for example purposes only! Never hardcode your mnemonic in production code!
			// In production, always use environment variables: process.env.WALLET_MNEMONIC?.split(' ') || []
			// Replace with your actual 12 or 24 word mnemonic phrase from your testnet wallet
			const mnemonic = ["word1", "word2", "word3", "word4", "word5", "word6", "word7", "word8", "word9", "word10", "word11", "word12"];

			// Create MeshWallet instance
			// This wallet will be used to interact with the Cardano blockchain
			const wallet = new MeshWallet({
				networkId: 0,  // 0 = testnet (Preprod), 1 = mainnet
				fetcher: provider,  // Provider for fetching blockchain data
				submitter: provider,  // Provider for submitting transactions
				key: {
					type: 'mnemonic',  // Wallet key type: mnemonic phrase
					words: mnemonic  // Array of mnemonic words
				}
			});

			// Middleware: Enable CORS to allow requests from different origins
			// This allows your microcontroller to make requests to this API from a different domain
			app.use(cors());
			
			// Middleware: Parse JSON request bodies
			// This automatically parses JSON data sent in POST/PUT requests
			app.use(express.json());

			// GET endpoint to retrieve wallet information
			// Returns wallet address, balance, and network information
			app.get('/wallet', async (req, res) => {
				try {
					// Get wallet address
					// The change address is the address where change from transactions is sent
					const address = await wallet.getChangeAddress();
					
					// Get wallet balance using Mesh's built-in method
					// Returns an array of assets: [{ unit: 'lovelace', quantity: '...' }, ...]
					// The first item is always lovelace (ADA), followed by any native tokens
					const balanceArray = await wallet.getBalance();
					
					// Extract lovelace from the balance array
					// Find the item with unit 'lovelace' and get its quantity
					const lovelaceAsset = balanceArray.find(asset => asset.unit === 'lovelace');
					const balanceLovelace = lovelaceAsset ? parseInt(lovelaceAsset.quantity) : 0;
					
					// Convert Lovelace to ADA
					// 1 ADA = 1,000,000 Lovelace
					const balanceADA = balanceLovelace / 1000000;
					
					// Get native tokens (all assets except lovelace)
					const nativeTokens = balanceArray.filter(asset => asset.unit !== 'lovelace');
					
					// Return wallet information as JSON response
					res.json({ 
						success: true, 
						address: address,  // Wallet address
						balance: {
							lovelace: balanceLovelace,  // Balance in Lovelace
							ada: balanceADA  // Balance in ADA
						},
						nativeTokens: nativeTokens,  // Array of native tokens (if any)
						network: 'preprod'  // Network: preprod testnet
					});
				} catch (error) {
					// Handle errors and return error response
					console.error('Error:', error);
					res.status(500).json({ success: false, error: error.message });
				}
			});

			// POST endpoint to create and submit a transaction
			// URL: http://localhost:3000/transaction
			// Request Body: { recipientAddress: "addr_test1...", amount: 1.0, metadata?: { msg: [...] } }
			app.post('/transaction', async (req, res) => {
				try {
					// Extract transaction parameters from request body
					const { recipientAddress, amount, metadata } = req.body;
					
					// Validate required fields
					if (!recipientAddress || !amount) {
						return res.status(400).json({ 
							success: false, 
							error: 'recipientAddress and amount are required' 
						});
					}

					// Convert amount from ADA to Lovelace
					// 1 ADA = 1,000,000 Lovelace
					const amountLovelace = Math.floor(parseFloat(amount) * 1000000);
					
					// Validate amount is positive
					if (amountLovelace <= 0) {
						return res.status(400).json({ 
							success: false, 
							error: 'Amount must be greater than 0' 
						});
					}

					// Prepare transaction metadata
					// If metadata is provided in request, use it; otherwise use default message
					// Label 674 = Message (CIP-20 standard for transaction messages)
					const transactionMetadata = metadata || {
						674: {  // Message label (CIP-20 standard)
							msg: ['Transaction from CardanoThings API']
						}
					};

					// Get wallet UTXOs (Unspent Transaction Outputs)
					// UTXOs represent available funds in your wallet that can be spent
					const utxos = await wallet.getUtxos();
					
					// Get change address
					// This is where any remaining funds (after transaction amount and fees) will be sent
					const changeAddress = await wallet.getChangeAddress();
					
					// Initialize MeshTxBuilder
					// MeshTxBuilder provides low-level APIs for building transactions
					const txBuilder = new MeshTxBuilder({
						fetcher: provider,  // Provider for fetching blockchain data
						verbose: true  // Enable verbose logging for debugging
					});
					
					// Build the transaction using MeshTxBuilder
					const unsignedTx = await txBuilder
						.txOut(recipientAddress, [{ unit: 'lovelace', quantity: amountLovelace.toString() }])  // Output: send lovelace to recipient
						.changeAddress(changeAddress)  // Address to receive change
						.metadataValue(674, transactionMetadata[674])  // Attach metadata (label 674)
						.selectUtxosFrom(utxos)  // Automatically select UTXOs to fund the transaction
						.complete();  // Finalize the transaction structure
					
					// Sign the transaction with your wallet's private key
					// This proves that you own the wallet and authorizes the transaction
					const signedTx = await wallet.signTx(unsignedTx);
					
					// Submit the signed transaction to the Cardano network
					// The transaction will be broadcast to the network and included in the next block
					const txHash = await wallet.submitTx(signedTx);
					
					// Return success response with transaction details
					res.json({ 
						success: true, 
						message: 'Transaction submitted successfully',
						txHash: txHash,  // Transaction hash (unique identifier)
						explorerUrl: \`https://preprod.cardanoscan.io/transaction/\${txHash}\`,  // Link to view transaction on explorer
						recipientAddress: recipientAddress,  // Recipient address
						amount: {
							ada: amount,  // Amount in ADA
							lovelace: amountLovelace  // Amount in Lovelace
						}
					});
				} catch (error) {
					// Handle errors and return error response
					console.error('Error creating or submitting transaction:', error);
					res.status(500).json({ success: false, error: error.message });
				}
			});

			// GET endpoint for health check
			app.get('/health', (req, res) => {
				res.json({ status: 'ok', timestamp: new Date().toISOString() });
			});

			// Start server and listen on specified port
			app.listen(PORT, () => {
				console.log(\`Server running on http://localhost:\${PORT}\`);
			});`,
		meshPackageJson: `
			{
				"name": "mesh-api",
				"version": "1.0.0",
				"description": "Node.js API with Mesh.js integration",
				"type": "module",
				"main": "server.js",
				"scripts": {
					"start": "node server.js"
				},
				"dependencies": {
					"express": "^4.18.2",
					"cors": "^2.8.5",
					"@meshsdk/core": "^1.7.0"
				}
			}`
	};
};

