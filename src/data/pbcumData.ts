/**
 * Comprehensive reverse-engineered dataset for Universiti Malaya Chinese Language Society
 * (PBCUM 马来亚大学华文学会 / Persatuan Bahasa Cina Universiti Malaya)
 * Layout/palette specification and component notes. The file tree is generated from the archive (archiveTree.ts);
 * no website content is stored here — pages are rendered from the archived files themselves.
 */

export interface FileNode {
  name: string;
  type: 'file' | 'folder';
  path: string;
  size?: string;
  count?: number;
  category: 'root' | 'image' | 'structure' | 'philosophy' | 'activity' | 'bulletin' | 'wenxian' | 'unit' | 'poster' | 'former_exco' | 'style' | 'script' | 'third_party';
  description: string;
  modernComponent?: string;
  children?: FileNode[];
}

// FILE & FOLDER TREE — generated from the real archive in ./site (see scripts/build-archive-manifest.mjs)
export { FILE_STRUCTURE_TREE } from './archiveTree';

export const VISUAL_LAYOUT_SPEC = {
  palettes: [
    { name: "Royal Blue (Brand & Sidebar)", hex: "#00007f", rgb: "rgb(0, 0, 127)", usage: "Main branding, active headers, sidebar background, table title cells" },
    { name: "Pastel Blue (Table Row Header)", hex: "#e8f2fd", rgb: "rgb(232, 242, 253)", usage: "Alternate table headers, left-column category cells, sub-table borders" },
    { name: "Cream Yellow (Table Data Cell)", hex: "#ffffcc", rgb: "rgb(255, 255, 204)", usage: "Table content bodies, lists, former EXCO selector row" },
    { name: "Bright Yellow (Marquee Highlight)", hex: "#ffff00", rgb: "rgb(255, 255, 0)", usage: "Primary marquee motto text, sub-navigation border frames" },
    { name: "Cyan (Sub-Marquee & Headers)", hex: "#00ffff", rgb: "rgb(0, 255, 255)", usage: "Bulletin & Literature sub-header marquee text, philosophy tags" },
    { name: "Sky Blue (Table Sub-Nav)", hex: "#6699ff", rgb: "rgb(102, 153, 255)", usage: "Unit 2x5 sub-navigation buttons, Literature author blocks" },
    { name: "Deep Link Blue", hex: "#0000ff", rgb: "rgb(0, 0, 255)", usage: "Hyperlinks, document anchors, candidate highlights" },
    { name: "Accent Red (Urgent Notice)", hex: "#ff0000", rgb: "rgb(255, 0, 0)", usage: "Election warning titles, deadline alerts, hot news links" },
    { name: "Imperial Violet (Philosophy Border)", hex: "#9933ff", rgb: "rgb(153, 51, 255)", usage: "Philosophy 400px table outer border, history chapter numbering" },
    { name: "Mandarin Orange (Anthem Header)", hex: "#ff6600", rgb: "rgb(255, 102, 0)", usage: "Song title banner, history subtitle headers" },
    { name: "Pitch Black (Marquee Track)", hex: "#000000", rgb: "rgb(0, 0, 0)", usage: "Marquee ticker background bar, 18th EXCO sub-header stripe" }
  ],
  containers: [
    { name: "Home Card Container", width: "680px", structure: "Single-card container on body.home with 1px border and centered margin auto" },
    { name: "Inner Layout Container", width: "740px", structure: "Two-column grid (.layout): 180px royal blue sidebar (.side) + 540px main column" },
    { name: "Sidebar (.side)", width: "180px", structure: "Sticky/fixed width sidebar with brand anchor, 10-link vertical list (.on for active), contact link" },
    { name: "Main Content Table (.c)", width: "520px", structure: "Fixed 520px nested table layout for headers, content tables, and horizontal rainbow dividers" },
    { name: "Vertical News Marquee", dimensions: "200px height, 46s duration", structure: ".mq-up container with upwards translating article blocks, pause on hover" },
    { name: "Horizontal Motto Marquees", dimensions: "4s - 13s duration", structure: "Single-line banner scrolling '扎实为经，回馈为纬。' across 520px table cell" }
  ],
  typography: [
    { level: "Page Title", size: "24px", weight: "Bold", color: "#00007f or #3366ff", font: "SimSun / Songti / Serif" },
    { level: "Section Header", size: "18px", weight: "Bold", color: "#ffff00, #ff6600, #3300ff", font: "SimSun / Serif" },
    { level: "Sub-Header / Announcement", size: "16px", weight: "Bold", color: "#ffffcc or #000000", font: "SimSun / Sans" },
    { level: "Table Body / List Text", size: "13px", weight: "Regular", color: "#00007f or #000000", font: "SimSun / Sans" },
    { level: "Hyperlink Text", size: "13px", weight: "Underlined", color: "#0000ff", font: "SimSun / Sans" }
  ]
};


export const REBUILD_COMPONENTS = [
  {
    name: "LegacyFrame",
    role: "Runs any archived page from its own original markup: same text, images, links, <marquee>s, hover effects, named-window links and window.open pop-ups (580x450, 550x500). Same-window links stay inside the app.",
    props: "{ path: string, onNavigate: (path: string) => void }",
    features: "Quirks-mode blob: document (the pages have no DOCTYPE); inlines and patches the IE-only scripts (document.all, event.fromElement) at run time; <base> keeps relative links working; in-page #anchors and script-driven location changes are handled; sandboxed.",
    originalFile: "src/lib/legacyDocument.ts"
  },
  {
    name: "ArchiveFrame",
    role: "Shows the untouched archived file in a plain frame (no patches) for side-by-side checking and for inspector previews",
    props: "{ path: string, onNavigate?: (path: string) => void, embedded?: boolean }",
    features: "Original GB2312/Big5 bytes served with their declared charset; sandboxed with allow-popups only (no top navigation, so the 2004 frame-buster is inert)",
    originalFile: "src/components/ArchiveFrame.tsx"
  },
  {
    name: "PbcumSiteViewer",
    role: "The website: page history with a back button, picker/quick-search/inspector hand-off, compat vs raw toggle",
    props: "{ initialPage?: string, modernMode?: boolean }",
    features: "All 112 archived pages reachable at their original paths (with #anchors); no page content is written by hand",
    originalFile: "src/components/PbcumSiteViewer.tsx"
  },
  {
    name: "ArchiveTree",
    role: "File and folder tree of the archive (289 files) with sizes, counts and notes",
    props: "generated from scripts/build-archive-manifest.mjs",
    features: "Generated from ./site on every dev/build, so it always matches the real folders; npm run verify checks SHA-256 of every file",
    originalFile: "src/data/archiveTree.ts"
  },
  {
    name: "archiveCharset (Vite plugin)",
    role: "Serves each archived page with the charset it declares so the untouched GB2312/Big5 files display correctly",
    props: "vite.config.ts",
    features: "dev + preview middleware; scripts and styles inherit their page's charset",
    originalFile: "vite.config.ts"
  }
];
