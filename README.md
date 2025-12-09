# CardanoThings Web App

> **Cardano meets the Internet of Things**

A comprehensive educational platform for building IoT projects with Cardano blockchain using ESP32-based microcontrollers. Funded by Project Catalyst Fund 11.

## Overview

CardanoThings.io is a step-by-step learning platform that teaches developers how to integrate Cardano blockchain technology with Internet of Things (IoT) devices. The platform provides workshops, introductions, hardware guides, and code blocks to help you build real-world Cardano IoT projects.

## Features

- **5 Comprehensive Workshops** - From basics to advanced projects:
  - Workshop 01: The Basics (Cardano Setup, Arduino Setup, API Setup)
  - Workshop 02: Read and Output (Fetch Wallet Balance, Display Data, Hardware Control, Epoch Clock)
  - Workshop 03: Input and Write (Sensor Data, Building APIs, Minting NFTs)
  - Workshop 04: Cardano Ticker (Data Gathering, Building the Ticker)
  - Workshop 05: QR-Code Payments (Interface Building, CIP13, QR Codes, Payment Confirmation)

- **Educational Content**:
  - Introductions to key concepts (Cardano, Blockchain, Arduino, Microcontrollers, APIs, etc.)
  - Hardware guides for ESP32-based devices
  - Code blocks and examples
  - Comprehensive glossary

- **Interactive Features**:
  - Section navigation with sticky sidebar
  - Workshop step navigation
  - Search functionality
  - Responsive design

## Tech Stack

- **Framework**: [SvelteKit](https://kit.svelte.dev/) with [Svelte 5](https://svelte.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) v4
- **UI Components**: Built with [shadcn-svelte](https://shadcn-svelte.com/)
- **Icons**: [Lucide Svelte](https://lucide.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Deployment**: Static site generation with `@sveltejs/adapter-static`

## Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- npm, pnpm, or yarn package manager

## Installation

1. **Clone the repository**:

   ```bash
   git clone <repository-url>
   cd Web-App
   ```

2. **Install dependencies**:

   ```bash
   npm install
   # or
   pnpm install
   # or
   yarn install
   ```

## Development

Start the development server:

```bash
npm run dev

# or start with auto-open in browser
npm run dev -- --open
```

The app will be available at `http://localhost:5173` (or the port shown in the terminal).

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run format` - Format code with Prettier
- `npm run lint` - Lint and check code formatting

## Building for Production

Build the static site:

```bash
npm run build
```

The production build will be in the `build/` directory, ready to be deployed to any static hosting service.

Preview the production build:

```bash
npm run preview
```

## Project Structure

```text
src/
├── lib/
│   ├── base/              # Base components (Header, Footer, etc.)
│   ├── components/        # Reusable components
│   │   ├── ui/           # UI component library
│   │   ├── SectionNavigator.svelte
│   │   └── ...
│   ├── data/             # Data files (workshops, introductions, etc.)
│   └── ...
├── routes/               # SvelteKit routes
│   ├── workshops/        # Workshop pages
│   ├── introductions/    # Introduction pages
│   ├── hardware/         # Hardware pages
│   ├── blocks/           # Code block pages
│   └── glossary/         # Glossary page
└── stores/               # Svelte stores
```

## Key Components

- **SectionNavigator** - Provides sticky sidebar navigation for workshop steps
- **WorkshopNavigation** - Bottom navigation between workshop steps
- **IntroContainer** - Contextual introduction links
- **SyntaxHighlighter** - Code syntax highlighting

## Data Management

Content is managed through data files in `src/lib/data/`:

- `workshops.js` - Workshop definitions and steps
- `introductions.js` - Introduction content
- `hardware.js` - Hardware information
- `blocks.js` - Code block definitions
- `glossary.js` - Glossary terms

**Workshop Code Examples**: All code examples from the workshops (Arduino `.ino` files, Node.js, HTML, CSS, and JavaScript) are available in the [CardanoThings/Workshops](https://github.com/CardanoThings/Workshops) repository, organized by workshop with ready-to-use files.

## Links

- **Website**: [cardanothings.io](https://cardanothings.io)
- **Project Catalyst**: Funded by Project Catalyst Fund 11

---

Built with ❤️ for the Cardano community
