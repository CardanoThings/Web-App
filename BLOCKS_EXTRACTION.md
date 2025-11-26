# Building Blocks Extraction

This document explains how to extract building blocks from the web app data and prepare them for GitHub.

## Overview

The `extract-blocks.js` script automatically extracts all building block code examples from `src/lib/data/blocks.js` and creates a structured directory ready for GitHub publishing.

## What It Does

1. **Creates Directory Structure**: Generates a `/blocks` directory with subdirectories for each building block
2. **Follows Arduino Conventions**: For Arduino projects, ensures the `.ino` file name matches the directory name (e.g., `blink/blink.ino`)
3. **Generates README Files**: Creates comprehensive README.md files with:
   - Complete usage instructions
   - Prerequisites and setup steps
   - Code explanations
   - Troubleshooting guides
   - Links to additional resources
4. **Extracts Code Files**: Saves the actual code with appropriate file extensions (`.ino`, `.js`, etc.)

## Usage

### Run the extraction script:

```bash
# Using npm script (recommended)
npm run extract-blocks

# Or directly with node
node extract-blocks.js
```

### Output Structure:

```
blocks/
├── README.md (Main index of all blocks)
├── blink/
│   ├── blink.ino
│   └── README.md
├── cyd-hello-display/
│   ├── cyd-hello-display.ino
│   └── README.md
├── nodejs-express-server/
│   ├── server.js
│   └── README.md
├── esp32-wifi-connection/
│   ├── esp32-wifi-connection.ino
│   └── README.md
└── ... (more blocks)
```

## Arduino Naming Convention

The script automatically follows Arduino's naming convention:

- **Directory name**: `blink/`
- **Arduino file**: `blink.ino` (matches directory name)
- **README**: `README.md`

This allows users to:
1. Clone or download the block directory
2. Open the `.ino` file directly in Arduino IDE
3. Start using it immediately

## File Extensions by Language

The script intelligently assigns file extensions based on the block's language:

| Language   | Extension | Example File        |
|------------|-----------|---------------------|
| cpp        | .ino      | blink.ino          |
| javascript | .js       | server.js          |
| python     | .py       | main.py            |
| typescript | .ts       | main.ts            |

## Generated README Features

Each block's README.md includes:

### 1. Overview & Description
Quick introduction to what the block does

### 2. Tags & Categories
Hardware/software requirements and categories

### 3. Features List
Key capabilities demonstrated by the code

### 4. Prerequisites
Detailed setup instructions including:
- Required hardware
- Software installations
- Library dependencies
- Wiring diagrams

### 5. Usage Instructions
Step-by-step guide to use the code

### 6. Key Parameters & Functions
Explanation of important code elements

### 7. Notes
Additional context and explanations for beginners

### 8. Troubleshooting
Common issues and solutions

### 9. Additional Resources
Links to documentation and tutorials

### 10. Next Steps
Suggestions for expanding the project

## Updating Blocks

When you add or modify blocks in `src/lib/data/blocks.js`:

1. Edit the block data in `src/lib/data/blocks.js`
2. Run `npm run extract-blocks` to regenerate the blocks directory
3. Review the changes in the `/blocks` directory
4. Commit and push to GitHub

## Publishing to GitHub

The `/blocks` directory is **NOT** in `.gitignore`, so it will be tracked by git.

To publish the blocks:

```bash
# Generate/update the blocks
npm run extract-blocks

# Add to git
git add blocks/

# Commit
git commit -m "Update building blocks"

# Push to GitHub
git push origin main
```

## Main README

The script generates a main `blocks/README.md` that includes:

- Table of all available blocks
- Blocks organized by category (Arduino-IDE, ESP32-C3, ESP32-CYD, Node.js)
- Usage instructions
- Links to all individual blocks

This makes it easy for users to browse and find the blocks they need on GitHub.

## Benefits

### For Users:
- ✅ Can browse blocks directly on GitHub
- ✅ Can clone individual blocks without downloading the entire web app
- ✅ Arduino projects work immediately (correct naming convention)
- ✅ Complete documentation with each block
- ✅ Easy to copy-paste code

### For Maintainers:
- ✅ Single source of truth (blocks.js)
- ✅ Automatic extraction - no manual copying
- ✅ Consistent formatting across all blocks
- ✅ Easy to update - just re-run the script

## Example Use Cases

### 1. Share a Specific Block
```
https://github.com/your-org/Web-App/tree/main/blocks/blink
```

### 2. Clone Just One Block
```bash
git clone --depth 1 --filter=blob:none --sparse \
  https://github.com/your-org/Web-App
cd Web-App
git sparse-checkout set blocks/blink
```

### 3. Download as ZIP
Users can click "Download ZIP" on any block directory in GitHub

## Script Details

### Location
`extract-blocks.js` (project root)

### Dependencies
- Node.js built-in modules only (fs, path)
- No external npm packages required

### Execution Time
< 1 second for all blocks

### Script Features
- HTML to Markdown conversion for README files
- Smart file extension detection
- Arduino naming convention enforcement
- Error handling
- Progress reporting

## Troubleshooting

### Script fails to run:
```bash
# Make sure you're in the project root
cd /Users/mad/Business/156kr/Clients/CardanoThings/github/Web-App

# Run with node directly
node extract-blocks.js
```

### Blocks not updating:
1. Delete the `/blocks` directory
2. Re-run the extraction script
3. The directory will be recreated fresh

### Arduino file not opening:
Make sure the directory name matches the `.ino` file name exactly.

## Next Steps

1. ✅ Script created and tested
2. ✅ Blocks directory generated
3. **TODO**: Review generated README files for formatting
4. **TODO**: Test an Arduino block in Arduino IDE
5. **TODO**: Commit blocks to GitHub
6. **TODO**: Update main project README with link to blocks

---

*This extraction system ensures the building blocks are always up-to-date and properly formatted for GitHub users.*

