/**
 * Builds a browser-runnable copy of an archived 2004 page *at run time*, without touching the archive files.
 *
 * The page's own markup, text, images, links, `window.open` pop-ups and `<marquee>`s are kept exactly as they are
 * (the document is deliberately left without a DOCTYPE so the browser lays it out in quirks mode, like the original).
 * Only the handful of IE-only constructs that stop the original scripts from running in a modern browser are patched:
 *
 *   document.all / document.marquee.all.marq1 / document.all.neonlight / event.fromElement / event.toElement
 *
 * External <script src> files are inlined (patched) so that they run inside the sandboxed srcdoc frame, and a <base>
 * tag (absolute, because the frame is a blob: document) keeps the page's links resolving against its own folder.
 */

/** Charset a page declares in its <meta>; scripts and styles carry none and inherit their page's charset. */
const declaredCharset = (bytes: Uint8Array): string | null =>
  new TextDecoder('latin1').decode(bytes.subarray(0, 4096)).match(/charset\s*=\s*["']?([\w-]+)/i)?.[1] ?? null;

const decode = (bytes: Uint8Array, label: string): string => {
  try { return new TextDecoder(label).decode(bytes); } catch { return new TextDecoder('utf-8').decode(bytes); }
};

async function fetchDecoded(path: string, inheritedCharset?: string): Promise<{ text: string; charset: string } | null> {
  const res = await fetch(path);
  if (!res.ok) return null;
  const bytes = new Uint8Array(await res.arrayBuffer());
  const charset = declaredCharset(bytes) ?? inheritedCharset ?? 'utf-8';
  const text = decode(bytes, charset);
  // a missing file falls through to the SPA index.html: treat that as "not found"
  return /^\s*<!doctype html>\s*<html lang="en">/i.test(text) && text.includes('id="root"') ? null : { text, charset };
}

/** IE-only constructs -> standard equivalents. Behaviour of the original scripts is otherwise untouched. */
export const patchLegacyScript = (s: string): string => s
  .replace(/event\.(?:from|to)Element/g, 'event.relatedTarget')
  .replace(/if\s*\(\s*document\.all\s*\)/g, 'if (true)')
  .replace(/document\.marquee\.all\.marq1/g, 'document.getElementById("marq1")')
  .replace(/document\.all\.neonlight/g, 'document.querySelectorAll("[id=neonlight]")');

export async function buildLegacyDocument(path: string): Promise<string> {
  const page = await fetchDecoded(path);
  if (page === null) throw new Error(`Archive page not found: ${path}`);
  const dir = path.slice(0, path.lastIndexOf('/') + 1);   // "/" or "/activity/"

  let html = patchLegacyScript(page.text);

  const scriptRe = /<script\b[^>]*?\bsrc\s*=\s*["']?([^"'\s>]+)["']?[^>]*>\s*<\/script>/gi;
  const srcs = [...new Set([...html.matchAll(scriptRe)].map((m) => m[1]))];
  const inlined = new Map<string, string>();
  await Promise.all(srcs.map(async (src) => {
    const abs = src.startsWith('/') ? src : dir + src;
    const script = await fetchDecoded(abs, page.charset).catch(() => null);
    inlined.set(src, script === null ? '' : patchLegacyScript(script.text));
  }));
  html = html.replace(scriptRe, (_m, src: string) => `<script>${(inlined.get(src) ?? '').replace(/<\/script/gi, '<\\/script')}</script>`);

  // absolute: a blob: document cannot resolve a relative <base>
  const base = `<base href="${window.location.origin}${dir}">`;
  return /<head[^>]*>/i.test(html) ? html.replace(/<head[^>]*>/i, (m) => m + base) : base + html;
}
