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
			const provider = new KoiosProvider('preprod');

			// Initialize wallet using mnemonic from environment variable
			// IMPORTANT: Store your mnemonic in an environment variable, never in code!
			const mnemonic = process.env.WALLET_MNEMONIC?.split(' ') || [];
			
			if (mnemonic.length === 0) {
				console.error('Error: WALLET_MNEMONIC environment variable not set!');
				process.exit(1);
			}

			const wallet = new MeshWallet({
				networkId: 0,  // 0 = testnet
				fetcher: provider,
				submitter: provider,
				key: {
					type: 'mnemonic',
					words: mnemonic
				}
			});

			// Function to fetch and log wallet balance
			async function fetchWalletBalance() {
				try {
					// Get wallet address
					const address = await wallet.getChangeAddress();
					console.log('Wallet Address:', address);
					
					// Get UTXOs for the wallet
					const utxos = await wallet.getUtxos();
					
					// Calculate total balance in Lovelace
					let totalLovelace = 0;
					utxos.forEach(utxo => {
						totalLovelace += parseInt(utxo.output.amount[0].quantity);
					});
					
					// Convert Lovelace to ADA (1 ADA = 1,000,000 Lovelace)
					const balanceADA = totalLovelace / 1000000;
					
					// Log wallet information to console
					console.log('Wallet Balance:', balanceADA, 'ADA');
					console.log('Balance in Lovelace:', totalLovelace);
					console.log('Number of UTXOs:', utxos.length);
				} catch (error) {
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
			const provider = new KoiosProvider('preprod');

			// Initialize wallet using mnemonic from environment variable
			// IMPORTANT: Store your mnemonic in an environment variable, never in code!
			const mnemonic = process.env.WALLET_MNEMONIC?.split(' ') || [];
			
			if (mnemonic.length === 0) {
				console.error('Error: WALLET_MNEMONIC environment variable not set!');
				process.exit(1);
			}

			const wallet = new MeshWallet({
				networkId: 0,  // 0 = testnet
				fetcher: provider,
				submitter: provider,
				key: {
					type: 'mnemonic',
					words: mnemonic
				}
			});

			// Function to create and submit a transaction with metadata
			async function sendTransaction() {
				try {
					// Recipient address (replace with actual testnet address)
					const recipientAddress = 'addr_test1q...';  // Replace with recipient address
					
					// Amount to send in ADA (convert to Lovelace: 1 ADA = 1,000,000 Lovelace)
					const amountADA = 1.0;  // Send 1 ADA
					const amountLovelace = Math.floor(amountADA * 1000000);
					
					// Transaction metadata
					// Metadata labels must be numbers (0-65535)
					// Label 674 = Message (CIP-20 standard)
					const metadata = {
						674: {  // Message label (CIP-20 standard)
							msg: ['Hello from CardanoThings!', 'This is a test transaction with metadata.']
						}
					};
					
					console.log('Creating transaction...');
					console.log('Recipient:', recipientAddress);
					console.log('Amount:', amountADA, 'ADA');
					console.log('Metadata:', JSON.stringify(metadata, null, 2));
					
					// Get wallet UTXOs and change address
					const utxos = await wallet.getUtxos();
					const changeAddress = await wallet.getChangeAddress();
					
					// Initialize MeshTxBuilder
					// MeshTxBuilder provides low-level APIs for building transactions
					const txBuilder = new MeshTxBuilder({
						fetcher: provider,
						verbose: true  // Enable verbose logging for debugging
					});
					
					// Build the transaction using MeshTxBuilder
					// This approach gives you more control over the transaction structure
					const unsignedTx = await txBuilder
						.txOut(recipientAddress, [{ unit: 'lovelace', quantity: amountLovelace.toString() }])  // Output: send lovelace to recipient
						.changeAddress(changeAddress)  // Address to receive change (remaining funds)
						.metadataValue(674, metadata[674])  // Attach message metadata (label 674, CIP-20 standard)
						.selectUtxosFrom(utxos)  // Automatically select UTXOs to fund the transaction
						.complete();  // Finalize the transaction structure
					
					// Sign the transaction with your wallet
					const signedTx = await wallet.signTx(unsignedTx);
					
					// Submit the transaction to the network
					const txHash = await wallet.submitTx(signedTx);
					
					console.log('Transaction submitted successfully!');
					console.log('Transaction Hash:', txHash);
					console.log('View on Cardano Explorer:', \`https://preprod.cardanoscan.io/transaction/\${txHash}\`);
					console.log('Metadata will be visible on the blockchain explorer');
				} catch (error) {
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

			// Initialize wallet using mnemonic from environment variable
			// IMPORTANT: Store your mnemonic in an environment variable, never in code!
			const mnemonic = process.env.WALLET_MNEMONIC?.split(' ') || [];
			
			if (mnemonic.length === 0) {
				console.warn('Warning: WALLET_MNEMONIC not set. Wallet functionality will not work.');
			}

			const wallet = new MeshWallet({
				networkId: 0,  // 0 = testnet
				fetcher: provider,
				submitter: provider,
				key: {
					type: 'mnemonic',
					words: mnemonic
				}
			});

			// Middleware: Enable CORS to allow requests from different origins
			app.use(cors());
			
			// Middleware: Parse JSON request bodies
			app.use(express.json());

			// GET endpoint to retrieve wallet information
			// Uses the wallet instance initialized from environment variable
			app.get('/wallet', async (req, res) => {
				try {
					if (mnemonic.length === 0) {
						return res.status(400).json({ 
							success: false, 
							error: 'Wallet mnemonic not configured. Set WALLET_MNEMONIC environment variable.' 
						});
					}

					// Get wallet address
					const address = await wallet.getChangeAddress();
					
					// Get UTXOs for the wallet
					const utxos = await wallet.getUtxos();
					
					// Calculate total balance in Lovelace
					let totalLovelace = 0;
					utxos.forEach(utxo => {
						totalLovelace += parseInt(utxo.output.amount[0].quantity);
					});
					
					// Convert Lovelace to ADA (1 ADA = 1,000,000 Lovelace)
					const balanceADA = totalLovelace / 1000000;
					
					res.json({ 
						success: true, 
						address: address,
						balance: {
							lovelace: totalLovelace,
							ada: balanceADA
						},
						utxos: utxos.length,
						network: 'preprod'
					});
				} catch (error) {
					console.error('Error:', error);
					res.status(500).json({ success: false, error: error.message });
				}
			});

			// POST endpoint to create and submit a transaction
			// URL: http://localhost:3000/transaction
			// Body: { recipientAddress: "addr_test1...", amount: 1.0, metadata?: { msg: [...] } }
			app.post('/transaction', async (req, res) => {
				try {
					if (mnemonic.length === 0) {
						return res.status(400).json({ 
							success: false, 
							error: 'Wallet mnemonic not configured. Set WALLET_MNEMONIC environment variable.' 
						});
					}

					const { recipientAddress, amount, metadata } = req.body;
					
					// Validate required fields
					if (!recipientAddress || !amount) {
						return res.status(400).json({ 
							success: false, 
							error: 'recipientAddress and amount are required' 
						});
					}

					// Convert amount from ADA to Lovelace (1 ADA = 1,000,000 Lovelace)
					const amountLovelace = Math.floor(parseFloat(amount) * 1000000);
					
					if (amountLovelace <= 0) {
						return res.status(400).json({ 
							success: false, 
							error: 'Amount must be greater than 0' 
						});
					}

					// Prepare metadata (default to empty if not provided)
					const transactionMetadata = metadata || {
						674: {  // Message label (CIP-20 standard)
							msg: ['Transaction from CardanoThings API']
						}
					};

					// Get wallet UTXOs and change address
					const utxos = await wallet.getUtxos();
					const changeAddress = await wallet.getChangeAddress();
					
					// Initialize MeshTxBuilder
					const txBuilder = new MeshTxBuilder({
						fetcher: provider,
						verbose: true
					});
					
					// Build the transaction using MeshTxBuilder
					const unsignedTx = await txBuilder
						.txOut(recipientAddress, [{ unit: 'lovelace', quantity: amountLovelace.toString() }])
						.changeAddress(changeAddress)
						.metadataValue(674, transactionMetadata[674])
						.selectUtxosFrom(utxos)
						.complete();
					
					// Sign the transaction with your wallet
					const signedTx = await wallet.signTx(unsignedTx);
					
					// Submit the transaction to the network
					const txHash = await wallet.submitTx(signedTx);
					
					res.json({ 
						success: true, 
						message: 'Transaction submitted successfully',
						txHash: txHash,
						explorerUrl: \`https://preprod.cardanoscan.io/transaction/\${txHash}\`,
						recipientAddress: recipientAddress,
						amount: {
							ada: amount,
							lovelace: amountLovelace
						}
					});
				} catch (error) {
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

