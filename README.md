# CardanoThings Web App

> **Cardano meets the Internet of Things**

A comprehensive educational platform for building IoT projects with Cardano blockchain using ESP32-based microcontrollers. Funded by Project Catalyst Fund 11.

**Version**: 1.0

## Overview

CardanoThings.io is a step-by-step learning platform that teaches developers how to integrate Cardano blockchain technology with Internet of Things (IoT) devices. The platform provides workshops, introductions, hardware guides, code blocks, and troubleshooting resources to help you build real-world Cardano IoT projects.

## Features

- **5 Comprehensive Workshops** - From basics to advanced projects:
  - Workshop 01: The Basics (Cardano Setup, Arduino Setup, API Setup)
  - Workshop 02: Read and Output (Fetch Wallet Balance, Display Data, Hardware Control, Epoch Clock)
  - Workshop 03: Input and Write (Sensor Data, Building APIs, Minting NFTs)
  - Workshop 04: Cardano Ticker (Data Gathering, Building the Ticker)
  - Workshop 05: QR-Code Payments (Interface Building, CIP13, QR Codes, Payment Confirmation)

- **Educational Content**:
  - Introductions to key concepts (Cardano, Blockchain, Arduino, Microcontrollers, APIs, etc.)
  - Hardware guides for ESP32-based devices (ESP32-C3, ESP32 CYD, etc.)
  - Building blocks - Ready-to-use code examples for common IoT tasks
  - **Resources** - Curated list of Cardano tools, APIs, and explorers with tag-based filtering
  - Comprehensive glossary with terms and definitions
  - Troubleshooting guide with common issues and solutions

- **Interactive Features**:
  - Section navigation with sticky sidebar
  - Workshop step navigation
  - Search functionality
  - Featured projects showcase
  - Project submission dialog for community contributions
  - Responsive design
  - Code syntax highlighting
  - Live code examples

## Tech Stack

- **Framework**: [SvelteKit](https://kit.svelte.dev/) with [Svelte 5](https://svelte.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) v4 with `@tailwindcss/vite`
- **UI Components**: Built with [shadcn-svelte](https://shadcn-svelte.com/) (bits-ui)
- **Icons**: [Lucide Svelte](https://lucide.dev/)
- **Code Highlighting**: [highlight.js](https://highlightjs.org/)
- **Utilities**:
  - [fast-sort](https://github.com/snovakovic/fast-sort) for sorting
  - [svelte-sonner](https://github.com/wobsoriano/svelte-sonner) for notifications
  - [vaul-svelte](https://github.com/emilkowalski/vaul) for drawer components
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

3. **Workshop code (required)** — Live workshop examples are loaded from a local mirror of [CardanoThings/Workshops](https://github.com/CardanoThings/Workshops). Clone that repository into **`./Workshops`** at this project’s root (same level as `package.json`). `npm run dev` and `npm run build` run `npm run sync:workshops` first, which copies files into `static/cache/` so the app serves them at `/cache/...`. In CI, check out the Workshops repo into `./Workshops` before building. Override the path with `WORKSHOPS_DIR` if needed.

## Development

Start the development server:

```bash
npm run dev

# or start with auto-open in browser
npm run dev -- --open
```

The app will be available at `http://localhost:5173` (or the port shown in the terminal).

### Available Scripts

- `npm run sync:workshops` - Copy `./Workshops` into `static/cache/` (also runs automatically before `dev` and `build`)
- `npm run dev` - Sync workshops, then start development server
- `npm run build` - Sync workshops, then build for production
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
│   ├── base/              # Base components (Header, Footer, Banner, etc.)
│   ├── components/        # Reusable components
│   │   ├── ui/           # shadcn-svelte UI component library
│   │   ├── CodeCard.svelte
│   │   ├── LiveCodeCard.svelte
│   │   ├── SyntaxHighlighter.svelte
│   │   ├── SectionNavigator.svelte
│   │   ├── SearchBox.svelte
│   │   ├── SubmitProjectDialog.svelte
│   │   ├── GlossaryTracker.svelte
│   │   ├── ImageSlideshow.svelte
│   │   ├── TipBox.svelte
│   │   └── ...
│   ├── data/             # Content data files
│   │   ├── workshops.js
│   │   ├── introductions.js
│   │   ├── hardware.js
│   │   ├── blocks.js
│   │   ├── glossary.js
│   │   ├── troubleshooting.js
│   │   ├── projects.js
│   │   └── links.js
│   ├── FeaturedProjects.svelte
│   ├── SectionWorkshops.svelte
│   ├── SectionIntroductions.svelte
│   ├── SectionBlocks.svelte
│   └── ...
├── routes/               # SvelteKit routes
│   ├── workshops/        # Workshop pages (01-basics through 05-qr-code-payments)
│   ├── introductions/    # Introduction pages
│   ├── hardware/         # Hardware pages
│   ├── blocks/           # Code block pages
│   ├── resources/        # Resources page (Cardano tools, APIs; filterable by tags)
│   ├── glossary/         # Glossary page
│   ├── troubleshooting/  # Troubleshooting guide
│   ├── about/            # About page
│   └── ...
├── stores/               # Svelte stores
│   └── glossary.js
└── app.css               # Global styles
```

## Key Components

- **SectionNavigator** - Provides sticky sidebar navigation for workshop steps
- **WorkshopNavigation** - Bottom navigation between workshop steps
- **IntroContainer** - Contextual introduction links
- **SyntaxHighlighter** - Code syntax highlighting with highlight.js
- **CodeCard** - Displays code examples with syntax highlighting
- **LiveCodeCard** - Interactive code examples
- **FeaturedProjects** - Showcases community projects
- **SubmitProjectDialog** - Dialog for submitting community projects
- **SearchBox** - Global search functionality
- **GlossaryTracker** - Tracks and highlights glossary terms
- **ImageSlideshow** - Image carousel for hardware and workshop photos
- **TipBox** - Displays helpful tips and notes

## Data Management

Content is managed through data files in `src/lib/data/`:

- `workshops.js` - Workshop definitions and steps
- `introductions.js` - Introduction content
- `hardware.js` - Hardware information and specifications
- `blocks.js` - Building block code examples with comprehensive documentation
- `glossary.js` - Glossary terms and definitions
- `troubleshooting.js` - Common issues and solutions
- `projects.js` - Featured community projects
- `resources.js` - Curated Cardano resources (APIs, explorers, tools) with tags
- `links.js` - Navigation links configuration

**Workshop Code Examples**: All code examples from the workshops (Arduino `.ino` files, Node.js, HTML, CSS, and JavaScript) are available in the [CardanoThings/Workshops](https://github.com/CardanoThings/Workshops) repository, organized by workshop with ready-to-use files.

**Building Blocks Extraction**: The `extract-blocks.js` script can extract building blocks from `blocks.js` into the `blocks/` directory, creating individual folders with code files and README.md documentation for each block. Run `npm run extract-blocks` to generate the blocks structure.

**Resources Page** (`/resources`): Displays a card grid of Cardano-related resources (APIs, blockchain explorers, tools) loaded from `resources.js`. Resources are sorted by title and can be filtered by clicking tags (e.g. Cardano, API, Blockchain Explorer).

## Links

- **Website**: [cardanothings.io](https://cardanothings.io)
- **Project Catalyst**: Funded by Project Catalyst Fund 11
- **Workshops Repository**: [CardanoThings/Workshops](https://github.com/CardanoThings/Workshops)

---

Built with ❤️ for the Cardano community
