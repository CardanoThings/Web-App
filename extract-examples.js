import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Map of code example names to their descriptions and workshop links
const exampleInfo = {
	// Workshop 01
	blinkCode: {
		description: "Basic LED blink example - your first Arduino sketch",
		workshopLink: "/workshops/01-basics/arduino-setup"
	},
	wifiCode: {
		description: "WiFi connection example for ESP32/ESP8266",
		workshopLink: "/workshops/01-basics/arduino-setup"
	},
	koiosApiCode: {
		description: "Example of making HTTP requests to Koios API",
		workshopLink: "/workshops/01-basics/api-setup"
	},
	
	// Workshop 02
	walletBalanceCode: {
		description: "Fetch wallet balance from Koios API",
		workshopLink: "/workshops/02-read-and-output/fetch-wallet-balance"
	},
	blockfrostCode: {
		description: "Fetch wallet balance from Blockfrost API",
		workshopLink: "/workshops/02-read-and-output/fetch-wallet-balance"
	},
	helloWorldCode: {
		description: "Hello World display test - verify CYD setup with centered text",
		workshopLink: "/workshops/02-read-and-output/display-data"
	},
	tftDisplayCode: {
		description: "Display wallet balance on TFT screen",
		workshopLink: "/workshops/02-read-and-output/display-data"
	},
	formattedDisplayCode: {
		description: "Formatted text display example using TFT_eSPI",
		workshopLink: "/workshops/02-read-and-output/display-data"
	},
	relayCode: {
		description: "Control relay based on wallet balance changes",
		workshopLink: "/workshops/02-read-and-output/light-up-the-tree"
	},
	ledCode: {
		description: "Control LED and relay based on balance changes",
		workshopLink: "/workshops/02-read-and-output/light-up-the-tree"
	},
	epochClockCode: {
		description: "Display Cardano epoch and slot on LED matrix",
		workshopLink: "/workshops/02-read-and-output/epoch-clock"
	},
	simpleEpochCode: {
		description: "Simple epoch display using serial monitor",
		workshopLink: "/workshops/02-read-and-output/epoch-clock"
	},
	
	// Workshop 03
	dht22Code: {
		description: "Read temperature and humidity from DHT22 sensor with TFT display",
		workshopLink: "/workshops/03-input-and-write/connect-and-read-sensor-data"
	},
	simpleDhtCode: {
		description: "Simple DHT22 sensor reading example",
		workshopLink: "/workshops/03-input-and-write/connect-and-read-sensor-data"
	},
	arduinoApiCall: {
		description: "Send sensor data to Node.js API",
		workshopLink: "/workshops/03-input-and-write/build-your-own-api"
	},
	touchScreenCode: {
		description: "Touch screen button example for minting",
		workshopLink: "/workshops/03-input-and-write/build-your-own-api"
	},
	nmkrApiCode: {
		description: "Mint NFT directly from Arduino using NMKR API",
		workshopLink: "/workshops/03-input-and-write/mint-on-nmkr"
	},
	
	// Workshop 04
	arduinoFetchCode: {
		description: "Fetch ticker data from Node.js API",
		workshopLink: "/workshops/04-cardano-ticker/gathering-data"
	},
	tickerDisplayCode: {
		description: "Complete ticker display with multiple screens",
		workshopLink: "/workshops/04-cardano-ticker/building-the-ticker"
	},
	animatedTextCode: {
		description: "Scrolling text animation example",
		workshopLink: "/workshops/04-cardano-ticker/building-the-ticker"
	},
	spriteCode: {
		description: "Using sprites for smooth animations",
		workshopLink: "/workshops/04-cardano-ticker/building-the-ticker"
	},
	
	// Workshop 05
	paymentUICode: {
		description: "Complete payment interface with number pad",
		workshopLink: "/workshops/05-qr-code-payments/building-the-interface"
	},
	simpleUICode: {
		description: "Simple touch button example",
		workshopLink: "/workshops/05-qr-code-payments/building-the-interface"
	},
	cip13UriCode: {
		description: "Create CIP-13 payment URIs",
		workshopLink: "/workshops/05-qr-code-payments/cip13-integration"
	},
	qrCodeCode: {
		description: "Generate and display QR code with CIP-13 URI",
		workshopLink: "/workshops/05-qr-code-payments/qr-code-creation"
	},
	simpleQRCode: {
		description: "Simple QR code generation example",
		workshopLink: "/workshops/05-qr-code-payments/qr-code-creation"
	},
	paymentMonitorCode: {
		description: "Monitor wallet for incoming payments",
		workshopLink: "/workshops/05-qr-code-payments/confirming-the-payment"
	},
	simpleMonitorCode: {
		description: "Simple balance-based payment monitoring",
		workshopLink: "/workshops/05-qr-code-payments/confirming-the-payment"
	}
};

// Skip these (Node.js, JSON, or info-only)
const skipExamples = ['nodeApiCode', 'packageJson', 'nodeCip13Code', 'nodeNmkrCode', 'walletComparison', 'qrLibraryInfo'];

// Workshop mapping
const workshopMapping = {
	'01-basics': {
		'arduino-setup': ['blinkCode', 'wifiCode'],
		'api-setup': ['koiosApiCode']
	},
	'02-read-and-output': {
		'fetch-wallet-balance': ['walletBalanceCode', 'blockfrostCode'],
		'display-data': ['helloWorldCode', 'tftDisplayCode', 'formattedDisplayCode'],
		'light-up-the-tree': ['relayCode', 'ledCode'],
		'epoch-clock': ['epochClockCode', 'simpleEpochCode']
	},
	'03-input-and-write': {
		'connect-and-read-sensor-data': ['dht22Code', 'simpleDhtCode'],
		'build-your-own-api': ['arduinoApiCall', 'touchScreenCode'],
		'mint-on-nmkr': ['nmkrApiCode']
	},
	'04-cardano-ticker': {
		'gathering-data': ['arduinoFetchCode'],
		'building-the-ticker': ['tickerDisplayCode', 'animatedTextCode', 'spriteCode']
	},
	'05-qr-code-payments': {
		'building-the-interface': ['paymentUICode', 'simpleUICode'],
		'cip13-integration': ['cip13UriCode'],
		'qr-code-creation': ['qrCodeCode', 'simpleQRCode'],
		'confirming-the-payment': ['paymentMonitorCode', 'simpleMonitorCode']
	}
};

function removeLeadingIndentation(code) {
	if (!code || code.trim().length === 0) return code;
	
	const lines = code.split('\n');
	if (lines.length === 0) return code;
	
	// Find minimum indentation (excluding empty lines)
	const indentLengths = lines
		.filter(line => line.trim().length > 0)
		.map(line => {
			// Count leading tabs and spaces
			let indent = 0;
			for (let i = 0; i < line.length; i++) {
				if (line[i] === '\t' || line[i] === ' ') {
					indent += 1;
				} else {
					break;
				}
			}
			return indent;
		});
	
	if (indentLengths.length === 0) return code.trim();
	
	const minIndent = Math.min(...indentLengths);
	
	if (minIndent === 0) return code.trim();
	
	// Remove minimum indentation from all lines
	const result = lines
		.map(line => {
			if (line.trim().length === 0) return '';
			// Remove minIndent characters from start
			if (line.length >= minIndent) {
				return line.slice(minIndent);
			}
			return line.trimStart();
		})
		.join('\n')
		.trim();
	
	return result;
}

function extractCodeFromFile(filePath) {
	const content = fs.readFileSync(filePath, 'utf-8');
	const examples = {};
	
	// Extract each code example using a more flexible regex
	for (const [key, info] of Object.entries(exampleInfo)) {
		if (skipExamples.includes(key)) continue;
		
		// Match: key: `...code...` (handles tabs, spaces, and multiline)
		const regex = new RegExp(`${key}:\\s*\\\`([\\s\\S]*?)\\\``, 'g');
		let match;
		
		// Find all matches and get the last one (in case there are multiple)
		while ((match = regex.exec(content)) !== null) {
			examples[key] = match[1].trim();
		}
	}
	
	return examples;
}

function createExampleFolder(exampleName, code, description, workshopFolder) {
	// Convert camelCase to kebab-case, handling special cases like "UI" and numbers
	let folderName = exampleName
		.replace(/([a-z])([A-Z])/g, '$1-$2')  // Add dash before capital letters
		.replace(/([A-Z]+)([A-Z][a-z])/g, '$1-$2')  // Handle consecutive capitals like "UI"
		.replace(/([a-z])([0-9])/g, '$1-$2')  // Add dash before numbers
		.replace(/([0-9])([A-Z])/g, '$1-$2')  // Add dash after numbers before capitals
		.toLowerCase();
	
	// Structure: examples/Workshop-01/examples/blink-code/
	const folderPath = path.join(__dirname, 'examples', workshopFolder, 'examples', folderName);
	const inoPath = path.join(folderPath, `${folderName}.ino`);
	const readmePath = path.join(folderPath, 'README.md');
	
	// Create folder
	if (!fs.existsSync(folderPath)) {
		fs.mkdirSync(folderPath, { recursive: true });
	}
	
	// Remove leading indentation from code
	const cleanedCode = removeLeadingIndentation(code);
	
	// Write .ino file
	fs.writeFileSync(inoPath, cleanedCode, 'utf-8');
	
	// Get workshop link
	const exampleData = exampleInfo[exampleName];
	const workshopLink = exampleData?.workshopLink || '';
	const baseUrl = 'https://cardanothings.io';
	
	// Format example name for title (convert camelCase to Title Case)
	// Handle special cases like "UI", "API", "QR", "CIP13", "DHT22"
	let titleName = exampleName
		.replace(/([a-z])([A-Z])/g, '$1 $2')  // Add space before capitals
		.replace(/([A-Z]+)([A-Z][a-z])/g, '$1 $2')  // Handle consecutive capitals
		.replace(/([0-9]+)/g, ' $1 ')  // Add spaces around numbers
		.replace(/\s+/g, ' ')  // Collapse multiple spaces
		.trim();
	
	// Capitalize first letter of each word
	titleName = titleName
		.split(' ')
		.map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
		.join(' ');
	
	// Fix common acronyms
	titleName = titleName
		.replace(/\bUi\b/g, 'UI')
		.replace(/\bApi\b/g, 'API')
		.replace(/\bQr\b/g, 'QR')
		.replace(/\bCip\s*13\b/g, 'CIP-13')
		.replace(/\bDht\s*22\b/g, 'DHT-22');
	
	// Write README.md
	const readme = `# ${titleName}

${description}

## Requirements

- ESP32 or ESP8266 based microcontroller
- Arduino IDE
- Required libraries (see code comments)

## Installation

1. Open Arduino IDE
2. Install required libraries from Library Manager
3. Open this sketch
4. Configure WiFi credentials and other settings
5. Upload to your microcontroller

## Usage

See the workshop documentation for detailed instructions on how to use this example.

${workshopLink ? `## Workshop Documentation

This example is part of a workshop. Learn more at:

[View Workshop](${baseUrl}${workshopLink})

` : ''}## Notes

- Make sure to update WiFi credentials before uploading
- Check pin configurations match your hardware setup
- Some examples require additional hardware (TFT display, sensors, etc.)
`;
	
	fs.writeFileSync(readmePath, readme, 'utf-8');
	
	console.log(`Created: ${folderPath}`);
}

// Main execution
const examplesDir = path.join(__dirname, 'examples');
if (!fs.existsSync(examplesDir)) {
	fs.mkdirSync(examplesDir, { recursive: true });
}

// Process each workshop
for (const [workshop, steps] of Object.entries(workshopMapping)) {
	// Create workshop folder name (e.g., "Workshop-01", "Workshop-02")
	const workshopNumber = workshop.split('-')[0];
	const workshopFolder = `Workshop-${workshopNumber}`;
	const workshopExamplesDir = path.join(__dirname, 'examples', workshopFolder, 'examples');
	
	// Create workshop folder and examples subfolder if they don't exist
	if (!fs.existsSync(workshopExamplesDir)) {
		fs.mkdirSync(workshopExamplesDir, { recursive: true });
	}
	
	for (const [step, examples] of Object.entries(steps)) {
		const filePath = path.join(__dirname, 'src', 'routes', 'workshops', workshop, step, '+page.js');
		
		if (fs.existsSync(filePath)) {
			const extractedExamples = extractCodeFromFile(filePath);
			
			for (const exampleName of examples) {
				if (extractedExamples[exampleName]) {
					const exampleData = exampleInfo[exampleName];
					const description = exampleData?.description || `${exampleName} example`;
					createExampleFolder(exampleName, extractedExamples[exampleName], description, workshopFolder);
				}
			}
		}
	}
}

console.log('\nDone! All examples extracted to /examples folder.');

