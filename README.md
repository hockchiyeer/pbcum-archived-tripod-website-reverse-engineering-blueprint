# PBCUM 马大华文学会 — Archived Website: Reverse-Engineering Blueprint

An interactive blueprint and modern React rebuild of the **Persatuan Bahasa Cina Universiti Malaya (PBCUM / 马大华文学会)**
website as archived in January 2004 (a hand-built, table-based HTML site: 112 pages, 289 files, GB2312/Big5 text).

The app has two jobs, and keeps them strictly separate:

1. **Serve the original archive untouched** — every original page and asset at its original URL.
2. **Run and explain it** — a compatibility renderer that runs each archived page from its own markup in a modern
   browser (same text, images, navigation and pop-ups), plus a file/folder inspector and a layout/CSS specification.

> **Parity rule:** nothing shown as site content is written by hand. Every page is rendered from its archived file;
> the file tree is generated from the real folders; `npm run verify` proves `site/` is the untouched original.

---

## Quick start

**Prerequisites:** Node.js 20+

```bash
npm install --legacy-peer-deps   # the pinned Vite/plugin versions have a peer-dependency conflict
npm run dev                      # http://localhost:3000
```

Optional: copy `.env.example` to `.env.local` and set `GEMINI_API_KEY` if you use the AI Studio features.

| Command | What it does |
|---|---|
| `npm run dev` | Dev server on port 3000 (regenerates the manifest first) |
| `npm run build` | Production build to `dist/` (regenerates the manifest first) |
| `npm run preview` | Serve `dist/` locally |
| `npm run manifest` | Regenerate `src/data/archiveManifest.generated.json` from `site/` |
| `npm run verify` | Parity check (see below) — run after `npm run build` |
| `npm run lint` | Type-check (`tsc --noEmit`) |

## Deploy to GitHub Pages

```bash
npm install --legacy-peer-deps
npm run build:pages                       # -> dist/ (static site; base path auto-detected from the git remote)
npm run build:pages -- --base /           # custom domain or <user>.github.io repo
npm run build:pages -- --base /my-repo/   # explicit project-page path
```

`build:pages` regenerates the manifest, runs `vite build` with the right `base`, adds `.nojekyll` and `404.html`, then runs the
parity check. Publish `dist/` either way:

- **Automatic (recommended):** push to `main`; `.github/workflows/deploy-pages.yml` builds and deploys. Set
  *Settings → Pages → Source → GitHub Actions* once.
- **Manual:** publish the contents of `dist/` to a `gh-pages` branch (e.g. `npx gh-pages -d dist --dotfiles`) and set *Source* to that branch.

Preview locally under the same path: `npx vite preview --base /my-repo/`.

> GitHub Pages sends `.htm` files as UTF-8, which can garble the GB2312/Big5 pages in the **原始文件 (Raw)** view and
> the inspector previews. The default **兼容渲染 (Compat)** view decodes each page itself and is unaffected.

## What you get in the app

| Area | Purpose |
|---|---|
| **全站浏览 (Site browse)** | The website itself: all 112 archived pages, reachable from the page picker, quick search or any link. |
| **兼容渲染 / 原始文件** | *Compat* runs each page from its own original markup with the IE-only scripts patched at run time; *Raw* shows the untouched file. |
| **架构检查器 (Blueprint inspector)** | The real folder/file tree (289 files) with notes, sizes, previews and the layout/colour specification. |
| **分屏对照 (Split view)** | Blueprint and site side by side. |

Nothing on a page is written by hand: text, images, link targets, pop-ups and effects all come from the archived file.

## Repository layout

```
site/                 The original archive — byte-identical to the received pbcum_website.zip (289 files)
  *.htm               112 pages (root pages + activity/, bulletin/, wenxian/, philosophy/, unit/,
                      bianlunzu/, poster/, former_exco/)
  image/ structure/ Tripod_files/ …   161 images, 11 scripts, 2 stylesheets, 2 .doc files
src/
  App.tsx             App shell: mode switch, page picker, quick search
  components/
    PbcumSiteViewer.tsx     The website: page history + back button, compat/raw toggle
    LegacyFrame.tsx         Runs an archived page in quirks mode; handles links, pop-ups, anchors, height
    ArchiveFrame.tsx        Untouched file in a plain frame (raw view, inspector previews)
    BlueprintInspector.tsx  File tree, notes, previews, layout/colour specification
  lib/legacyDocument.ts     Builds the runnable document: charset decode, IE-only patches, inlined scripts, <base>
  data/
    archiveManifest.generated.json   GENERATED from site/ (files, sizes, page titles, folder counts)
    archiveTree.ts                   Builds the in-app file tree from the manifest
    archiveNotes.ts                  Reverse-engineering notes keyed by real file path
    pbcumData.ts                     Layout/palette specification and component notes
scripts/
  build-archive-manifest.mjs         Generates the manifest (`--check` fails if it is stale)
  verify-parity.mjs                  Parity check
  original-archive.sha256.json       SHA-256 of every original file
vite.config.ts        publicDir = site/, plus the charset plugin below
```

## How parity is enforced

- **`site/` is the source of truth.** Vite serves it at the web root (`publicDir: 'site'`), so `/index.htm`,
  `/activity/13thquanwen.htm`, `/image/animate.gif`, … all resolve exactly as in the original. There is no second
  `public/` copy.
- **Untouched bytes.** The original pages are GB2312/Big5. Vite would label them UTF-8 and garble them, so
  `vite.config.ts` includes a small plugin that serves each page with the charset it declares in its own `<meta>`
  (dev and preview). When hosting `dist/` elsewhere, serve the `.htm` files the same way, or send no charset and let the
  `<meta>` decide.
- **Generated, not hand-written.** The file tree, counts, and page list come from `npm run manifest`, so they cannot
  drift from the real folders.
- **`npm run verify`** checks that:
  1. every file in `site/` matches the SHA-256 in `scripts/original-archive.sha256.json` (no edits, no extras);
  2. the manifest is current;
  3. `dist/` contains all 289 archive files byte-for-byte.

### How a page is rendered (compat mode)

`LegacyFrame` fetches the page from `/…` (original bytes, original charset), then:

1. patches only the IE-only constructs that stop the original scripts in modern browsers
   (`document.all`, `document.marquee.all.marq1`, `document.all.neonlight`, `event.fromElement/toElement`);
2. inlines the page's `<script src>` files (decoded with the page's charset) and adds an absolute `<base>`;
3. loads the result as a `blob:` document. It has no DOCTYPE, so the browser lays it out in **quirks mode** exactly
   like the original (an `srcdoc` iframe would force standards mode and change the layout).

Behaviour is the original's: `window.open` pop-ups open real windows at their original sizes (580×450 credit page,
550×500 committee-member pages), `target="notice"/"main"/…` links open their named windows, `<marquee>` news ticker,
hover cells, org-chart rollovers, the neon title and the "past committees" dropdown all work. Same-window links to
archive pages (including `#anchors` such as `/unit2.htm#WaiWuChu`) navigate inside the app, with a back button.
External same-window links open in a new tab so they cannot replace the app.

### How parity was checked

- Text and images: for all 112 pages the compat render was compared with the raw file. The only differences are
  script-generated content (home-page news, dates) and images that are already broken in the original
  (`marquee_function.htm`, the saved Tripod page).
- Navigation: every distinct link on every page (about 900) was clicked in a browser and compared with what the markup
  specifies — pop-up URL and window size, named window, in-app navigation, in-page anchor.

### Known limits

- Links from archived pages to external sites (the Tripod debate site, clsm.org) are most likely dead.
- `unit/wenhua/shufa.htm` links to `chayi.htm` and `zhuanke.htm`, which were never in the archive.
- The CountZ hit counter in `site/counter` is an inert `<img>` tag.
- The saved Tripod page and `marquee_function.htm` reference images that were never in the archive.
- Pages are laid out at their original fixed widths (they were never responsive); narrow screens scroll sideways.

## Design reference (from the reverse-engineering)

- **Layout:** nested `<table>` pages, no CSS framework. Home card 680 px; inner pages 700 px (+40 px padding) with a
  150 px blue sidebar. Fonts: SimSun/宋体 for Chinese text.
- **Palette:** page `#e8f2fd`, accent `#6699ff`, headings `#00007f`, cream `#ffffcc`, hover lime `#b1e664`,
  frame `#9933ff` / cyan `#00ffff`.
- **Behaviour:** `<marquee>` tickers, `inCell/outCell` hover cells, Macromedia `MM_swapImage` rollovers on the
  organisation chart, a "jump to past committee" dropdown, and `window.open` pop-ups — all preserved by compat mode.

## Updating or extending

- **Archive changed?** Replace files in `site/`, then run `npm run manifest`. If the change is intentional, regenerate
  `scripts/original-archive.sha256.json` (hash each file with SHA-256) so `verify` reflects the new reference.
- **New IE-only construct in a page?** Add its replacement to `patchLegacyScript` in `src/lib/legacyDocument.ts`.
- **Do not hand-edit** `archiveManifest.generated.json`.

## Provenance

The archive arrived as a zip attached to a 2004 committee e-mail ("PBCUM 16th Exco"), which says to unzip to a drive
root and open `index.htm`. The society's motto on the home page is 扎实为经，回馈为纬 ("Solidity is the warp,
feedback the weft"). The last-updated date on the home page is 18-1-2004.

View the original AI Studio app: https://ai.studio/apps/9aadfb13-edc8-489c-9410-4960514c5bd1
