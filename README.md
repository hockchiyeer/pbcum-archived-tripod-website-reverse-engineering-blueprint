# PBCUM Archive & Reverse-Engineering Blueprint

An interactive, modern reconstruction and archival browser for the **Universiti Malaya Chinese Language Society** — *Persatuan Bahasa Cina Universiti Malaya* (PBCUM, 马大华文学会).

The project brings together a browsable reconstruction of the society's historical website, a structured archive of its pages and media, and an interactive blueprint for exploring the original site's information architecture.

## Overview

This repository contains two related deliverables:

1. **Interactive reconstructed website** — a React application that presents selected PBCUM historical content in a navigable, modern interface.
2. **Historical website archive and reverse-engineering reference** — preserved HTML pages, scripts, stylesheets, images, and a structured description of the legacy site's folders, page roles, visual conventions, and components.

The archive and reconstruction focus primarily on material from **1986–2004**, as represented in the supplied source collection. Historical descriptions and dates should be treated as archival content rather than independently verified current information.

## Features

### Reconstructed website

- Browse 14 reconstructed sections, including:
  - Home
  - Society philosophy and guiding principles
  - Society history and term-by-term history
  - Organisation structure and EXCO hierarchy
  - EXCO rosters from multiple terms
  - Activity units and administrative divisions
  - Special activities and reports
  - Notices
  - Society anthem
  - Society bulletin
  - Historical literature and documents
  - Historical photographs
- Navigate between sections using the site navigation and page selector.
- Use the quick-search overlay to find sections by keyword.
- Inspect EXCO and organisational information through interactive content panels.
- View historical organisational diagrams in their original image-based style or as a modern vector-style layout.
- Open image, article, member, activity, and document details where supported by the interface.
- Switch between the reconstructed site, the blueprint inspector, and a side-by-side comparison view.

### Reverse-engineering blueprint

The blueprint inspector provides a structured view of the legacy site's architecture and design:

- Expandable folder and file tree
- Searchable file/path descriptions
- Explanations of original file roles and corresponding modern components
- Visual layout and navigation analysis
- CSS/framework comparison
- Asset inventory and component-reconstruction reference

### Interactive elements

The application includes interactive organisation-chart controls and a browser-based society-anthem synthesizer. Guestbook messages are held in application state for the current session; this repository does not provide a database-backed guestbook service.

## Technology stack

| Area | Technology |
|---|---|
| UI framework | React 19 |
| Language | TypeScript |
| Build and development server | Vite 8 |
| Styling | Tailwind CSS 4 |
| Icons | Lucide React |
| Animation and motion | Motion |
| Audio interaction | Web Audio API (browser) |
| Additional package dependencies | Express, dotenv, Google GenAI SDK |

The current application entry point is `src/main.tsx`. The package manifest includes Express, dotenv, and the Google GenAI SDK, but the inspected React application does not currently import or call those services. No server-side API workflow is required to run the reconstructed site as supplied.

## Repository layout

```text
.
├── index.html                 # Vite HTML entry point
├── package.json               # Scripts and dependencies
├── bun.lock                   # Bun dependency lockfile
├── tsconfig.json              # TypeScript configuration
├── vite.config.ts             # Vite configuration
├── .env.example               # Example environment variables
├── public/                    # Static assets served by Vite
│   ├── image/                 # Historical photographs and graphics
│   ├── structure/             # Organisation-chart graphics
│   ├── activity/              # Activity-related assets
│   ├── Tripod_files/          # Legacy hosting assets
│   └── assets/                # Additional bundled assets
├── src/
│   ├── main.tsx               # React application bootstrap
│   ├── App.tsx                # Main shell, navigation, and view modes
│   ├── index.css              # Global styles and Tailwind integration
│   ├── data/
│   │   └── pbcumData.ts       # Structured historical content and file tree
│   └── components/
│       ├── PbcumSiteViewer.tsx
│       ├── BlueprintInspector.tsx
│       ├── OrgChartInteractive.tsx
│       └── HeaderDecorations.tsx
├── pbcum_website/             # Preserved legacy website source/archive
└── site/                      # Additional preserved legacy-site copy
```

`public/` contains the static files used by the running Vite application. The `pbcum_website/` and `site/` directories preserve the broader legacy website material for reference and reverse engineering; they are not the React application's entry point.

## Requirements

- Node.js compatible with the installed Vite version (use a current supported LTS release).
- npm, or Bun if you prefer the included `bun.lock`.

Check your installed versions:

```bash
node --version
npm --version
```

## Getting started

### 1. Extract the repository

Extract the ZIP archive, then open a terminal in the project root — the directory containing `package.json`.

### 2. Install dependencies

Using npm:

```bash
npm install
```

Or using Bun:

```bash
bun install
```

### 3. Start the development server

```bash
npm run dev
```

Vite is configured to listen on port **3000** and bind to `0.0.0.0`. Open:

```text
http://localhost:3000
```

Stop the development server with `Ctrl+C`.

## Available scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the Vite development server on port 3000 |
| `npm run build` | Create a production build in `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run TypeScript checking with `tsc --noEmit` |
| `npm run clean` | Remove `dist/` and `server.js` |

For a typical verification run:

```bash
npm run lint
npm run build
```

To serve the production build locally:

```bash
npm run preview
```

## Using the application

The top-level interface offers three main working modes:

- **Site view** — browse the reconstructed PBCUM website.
- **Blueprint view** — inspect the reverse-engineered file structure, layout conventions, navigation, assets, and component mapping.
- **Split view** — compare the reconstructed website and blueprint inspector side by side.

Within the site view, use the navigation controls, quick search, or page selector to move between sections. The organisation chart supports selecting nodes to inspect the corresponding descriptions and, where configured, navigate to related sections.

## Content and asset organisation

The structured historical content used by the React interface is maintained primarily in:

```text
src/data/pbcumData.ts
```

This file contains typed datasets for items such as:

- Legacy file and folder descriptions
- EXCO members and term rosters
- Activity units
- Historical chapters and term histories
- Society anthem content
- Bulletin articles
- Literature and archival documents
- Special activities

Static images and other browser-served resources are placed under `public/`. Components refer to these resources using root-relative paths such as `/image/...` and `/structure/...`.

When adding or replacing an asset, keep its path and filename consistent with the references in the source code. If you change an asset path, update every corresponding component reference.

## Configuration and environment variables

An `.env.example` file is included with placeholders for:

- `GEMINI_API_KEY`
- `APP_URL`

These values are associated with the supplied AI Studio-oriented project metadata. **They are not currently required by the inspected frontend implementation**: the React source does not presently reference `GEMINI_API_KEY` or make Gemini API calls.

Do not commit real API keys or secrets. If AI or server-side functionality is added in the future, keep credentials on the server and document the required configuration and deployment steps at that time.

## Build and deployment

Create the production bundle:

```bash
npm run build
```

The generated static site is written to:

```text
dist/
```

The output can be deployed to a static hosting provider that supports single-page applications. Configure the host to serve `index.html` for application routes if deep links are introduced.

The development server's `--host 0.0.0.0` option makes it listen on available network interfaces; production hosting and network exposure should be configured separately.

## Known scope and limitations

- This is an archival reconstruction, not an official or live PBCUM website.
- The React interface reconstructs selected sections and interactions; it does not guarantee that every legacy HTML page behaves exactly as it did on its original hosting platform.
- The preserved legacy files may contain obsolete HTML, scripts, hosting-specific paths, and third-party resources that are not needed by the modern React application.
- Some content and interface details are based on the supplied archive and the project's reverse-engineered data model. Verify historical claims against primary records before relying on them for formal research or publication.
- Interactive guestbook messages are in-memory demo content and are not saved to a persistent service.
- No database, authentication system, or production API backend is configured in the supplied application.

## Contributing and maintenance

When extending the reconstruction:

1. Keep historical source material in the archive directories and avoid silently overwriting original files.
2. Add or revise typed content in `src/data/pbcumData.ts`.
3. Implement interface changes in the relevant component under `src/components/`.
4. Place browser-served assets under `public/` and preserve referenced paths.
5. Run `npm run lint` and `npm run build` before submitting changes.
6. Clearly distinguish source-derived facts from editorial interpretation or reconstructed behaviour.