#!/usr/bin/env node

/**
 * Building Blocks Extractor
 * 
 * This script extracts building blocks from src/lib/data/blocks.js
 * and creates a structured directory with code files and README.md files.
 * 
 * Usage: node extract-blocks.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Import the blocks data
import { blocks } from './src/lib/data/blocks.js';

// Output directory
const OUTPUT_DIR = path.join(__dirname, 'blocks');

/**
 * Generate folder name from title and hardware tags
 * Prefixes with hardware type if block is specific to one platform
 */
function getFolderName(block) {
  const hasC3 = block.tags.includes('ESP32-C3');
  const hasCYD = block.tags.includes('ESP32-CYD');
  const hasArduino = block.tags.includes('Arduino-IDE');
  
  // Convert title to folder-friendly format
  let folderName = block.title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special chars except spaces and hyphens
    .replace(/\s+/g, '-')      // Replace spaces with hyphens
    .replace(/-+/g, '-')       // Replace multiple hyphens with single
    .replace(/^-|-$/g, '');    // Remove leading/trailing hyphens
  
  // Add hardware prefix if block is specific to one platform
  if (hasArduino) {
    if (hasC3 && !hasCYD) {
      // C3 only
      folderName = 'c3-' + folderName;
    } else if (hasCYD && !hasC3) {
      // CYD only
      folderName = 'cyd-' + folderName;
    }
    // If both C3 and CYD, no prefix
  }
  
  return folderName;
}

/**
 * Get file extension based on language
 */
function getFileExtension(language) {
  const extensions = {
    'cpp': 'ino',        // Arduino uses .ino extension
    'javascript': 'js',
    'python': 'py',
    'typescript': 'ts',
    'html': 'html',
    'css': 'css',
    'shell': 'sh',
    'bash': 'sh'
  };
  
  return extensions[language] || 'txt';
}

/**
 * Get code filename following conventions
 * For Arduino: directory-name/directory-name.ino
 * For others: directory-name/main.ext or directory-name/index.ext
 */
function getCodeFilename(folderName, language, block) {
  const ext = getFileExtension(language || 'cpp');
  
  // Arduino convention: file name must match directory name
  if (ext === 'ino') {
    return `${folderName}.${ext}`;
  }
  
  // For JavaScript/Node.js, use common names
  if (ext === 'js') {
    const title = block.title.toLowerCase();
    return title.includes('express') || title.includes('server') || title.includes('api') ? 'server.js' : 'index.js';
  }
  
  // For others, use main.ext
  return `main.${ext}`;
}

/**
 * Clean HTML tags for markdown
 */
function htmlToMarkdown(html) {
  if (!html) return '';
  
  return html
    // Convert headers
    .replace(/<h3>(.*?)<\/h3>/g, '### $1')
    .replace(/<h4>(.*?)<\/h4>/g, '#### $1')
    // Convert links
    .replace(/<a href="(.*?)"(?:\s+target="_blank")?\s*>(.*?)<\/a>/g, '[$2]($1)')
    // Convert lists
    .replace(/<ul>/g, '\n')
    .replace(/<\/ul>/g, '\n')
    .replace(/<ol>/g, '\n')
    .replace(/<\/ol>/g, '\n')
    .replace(/<li>(.*?)<\/li>/g, '- $1')
    // Convert inline code
    .replace(/<code>(.*?)<\/code>/g, '`$1`')
    // Convert code blocks
    .replace(/<pre><code>(.*?)<\/code><\/pre>/gs, '\n```\n$1\n```\n')
    // Convert paragraphs
    .replace(/<p>(.*?)<\/p>/g, '\n$1\n')
    // Convert strong/bold
    .replace(/<strong>(.*?)<\/strong>/g, '**$1**')
    // Remove remaining tags
    .replace(/<[^>]*>/g, '')
    // Clean up extra whitespace
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

/**
 * Generate README.md content for a block
 */
function generateReadme(block, folderName) {
  const language = block.language || 'cpp';
  const ext = getFileExtension(language);
  const filename = getCodeFilename(folderName, language, block);
  
  let readme = `# ${block.title}\n\n`;
  readme += `${block.description}\n\n`;
  
  // Tags
  readme += `**Tags:** ${block.tags.join(', ')}\n\n`;
  
  // Overview
  readme += `## Overview\n\n${block.overview}\n\n`;
  
  // Features
  if (block.features && block.features.length > 0) {
    readme += `## Features\n\n`;
    block.features.forEach(feature => {
      readme += `- ${feature}\n`;
    });
    readme += `\n`;
  }
  
  // Prerequisites
  if (block.prerequisites) {
    readme += `## Prerequisites\n\n`;
    readme += htmlToMarkdown(block.prerequisites);
    readme += `\n\n`;
  }
  
  // Usage
  if (block.usage) {
    readme += `## Usage\n\n`;
    readme += htmlToMarkdown(block.usage);
    readme += `\n\n`;
  }
  
  // Code file reference
  readme += `## Code\n\n`;
  readme += `The complete code for this block can be found in [\`${filename}\`](./${filename}).\n\n`;
  
  // Parameters
  if (block.parameters && block.parameters.length > 0) {
    readme += `## Key Parameters & Functions\n\n`;
    block.parameters.forEach(param => {
      readme += `### \`${param.name}\` (${param.type})\n`;
      readme += `${param.description}\n\n`;
    });
  }
  
  // Notes
  if (block.notes) {
    readme += `## Notes\n\n`;
    readme += htmlToMarkdown(block.notes);
    readme += `\n\n`;
  }
  
  // Troubleshooting
  if (block.troubleshooting) {
    readme += `## Troubleshooting\n\n`;
    readme += htmlToMarkdown(block.troubleshooting);
    readme += `\n\n`;
  }
  
  // Resources
  if (block.resources && block.resources.length > 0) {
    readme += `## Additional Resources\n\n`;
    block.resources.forEach(resource => {
      readme += `- [${resource.title}](${resource.url}) - ${resource.description}\n`;
    });
    readme += `\n`;
  }
  
  // Next Steps
  if (block.nextSteps) {
    readme += `## Next Steps\n\n`;
    readme += htmlToMarkdown(block.nextSteps);
    readme += `\n\n`;
  }
  
  // GitHub Link
  if (block.githubLink) {
    readme += `## GitHub Repository\n\n`;
    readme += `View the official repository: [${block.githubLink}](${block.githubLink})\n\n`;
  }
  
  // Link back to website
  readme += `---\n\n`;
  readme += `*This building block is part of the [CardanoThings Web App](https://cardanothings.io${block.link}).*\n`;
  
  return readme;
}

/**
 * Create directory structure and files for a block
 */
function createBlockFiles(block) {
  const folderName = getFolderName(block);
  const blockDir = path.join(OUTPUT_DIR, folderName);
  const language = block.language || 'cpp';
  const filename = getCodeFilename(folderName, language, block);
  const codePath = path.join(blockDir, filename);
  const readmePath = path.join(blockDir, 'README.md');
  
  // Create directory
  if (!fs.existsSync(blockDir)) {
    fs.mkdirSync(blockDir, { recursive: true });
  }
  
  // Write code file
  const code = block.code.trim();
  fs.writeFileSync(codePath, code + '\n');
  console.log(`  ✓ Created ${filename}`);
  
  // Write README
  const readme = generateReadme(block, folderName);
  fs.writeFileSync(readmePath, readme);
  console.log(`  ✓ Created README.md`);
  
  // Return folder name for use in main README
  return folderName;
}

/**
 * Generate main README for the blocks directory
 */
function generateMainReadme(blockFolders) {
  let readme = `# Building Blocks\n\n`;
  readme += `This directory contains ready-to-use code examples for ESP32 and IoT projects. Each block is a complete, documented example that you can use as a starting point for your own projects.\n\n`;
  
  readme += `## Available Blocks\n\n`;
  
  // Group blocks by tags with their folder names
  const tagGroups = {};
  blocks.forEach((block, index) => {
    block.tags.forEach(tag => {
      if (!tagGroups[tag]) {
        tagGroups[tag] = [];
      }
      tagGroups[tag].push({ block, folderName: blockFolders[index] });
    });
  });
  
  // List all blocks
  readme += `### All Blocks\n\n`;
  readme += `| Title | Description | Tags |\n`;
  readme += `|-------|-------------|------|\n`;
  blocks.forEach((block, index) => {
    const tags = block.tags.join(', ');
    const folderName = blockFolders[index];
    readme += `| [${block.title}](./${folderName}) | ${block.description} | ${tags} |\n`;
  });
  readme += `\n`;
  
  // Group by primary tags
  readme += `## Blocks by Category\n\n`;
  
  const categories = {
    'Arduino-IDE': 'Arduino IDE Projects',
    'ESP32-C3': 'ESP32-C3 Projects',
    'ESP32-CYD': 'ESP32 CYD (Cheap Yellow Display) Projects',
    'Node.js': 'Node.js Projects'
  };
  
  Object.keys(categories).forEach(tag => {
    if (tagGroups[tag]) {
      readme += `### ${categories[tag]}\n\n`;
      tagGroups[tag].forEach(({ block, folderName }) => {
        readme += `- [${block.title}](./${folderName}) - ${block.description}\n`;
      });
      readme += `\n`;
    }
  });
  
  readme += `## How to Use\n\n`;
  readme += `1. Browse the blocks above to find what you need\n`;
  readme += `2. Click on a block to open its directory\n`;
  readme += `3. Read the README.md for complete instructions\n`;
  readme += `4. Copy the code file to your project\n`;
  readme += `5. Follow the prerequisites and usage instructions\n\n`;
  
  readme += `## Arduino Projects\n\n`;
  readme += `For Arduino projects (.ino files), the directory structure follows Arduino conventions:\n`;
  readme += `- Each sketch is in a directory with the same name as the .ino file\n`;
  readme += `- Example: \`c3-hello-world-blink/c3-hello-world-blink.ino\`\n`;
  readme += `- Folders are prefixed with hardware type if specific to one platform:\n`;
  readme += `  - \`c3-\` prefix = ESP32-C3 only\n`;
  readme += `  - \`cyd-\` prefix = Cheap Yellow Display only\n`;
  readme += `  - No prefix = Compatible with multiple platforms\n`;
  readme += `- Open the .ino file in Arduino IDE to use it\n\n`;
  
  readme += `## Contributing\n\n`;
  readme += `These building blocks are maintained as part of the CardanoThings project.\n`;
  readme += `For questions or contributions, please visit [CardanoThings.io](https://cardanothings.io).\n\n`;
  
  readme += `---\n\n`;
  readme += `*Generated from the [CardanoThings Web App](https://cardanothings.io) building blocks data.*\n`;
  
  return readme;
}

/**
 * Main execution
 */
function main() {
  console.log('Building Blocks Extractor');
  console.log('=========================\n');
  
  // Create output directory
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }
  
  console.log(`Extracting ${blocks.length} blocks...\n`);
  
  // Process each block and collect folder names
  const blockFolders = [];
  blocks.forEach((block, index) => {
    const folderName = getFolderName(block);
    console.log(`[${index + 1}/${blocks.length}] ${block.title}`);
    console.log(`  → Folder: ${folderName}`);
    createBlockFiles(block);
    blockFolders.push(folderName);
    console.log('');
  });
  
  // Create main README
  console.log('Creating main README.md...');
  const mainReadme = generateMainReadme(blockFolders);
  fs.writeFileSync(path.join(OUTPUT_DIR, 'README.md'), mainReadme);
  console.log('  ✓ Created main README.md\n');
  
  console.log('=========================');
  console.log('✓ Extraction complete!');
  console.log(`\nBlocks directory: ${OUTPUT_DIR}`);
  console.log(`Total blocks created: ${blocks.length}`);
}

// Run the script
main();

