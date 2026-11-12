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

import { withBase, stripBase } from './baseUrl';

async function fetchDecoded(path: string, inheritedCharset?: string): Promise<{ text: string; charset: string } | null> {
  const res = await fetch(withBase(path));
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

/**
 * The archive uses root-absolute URLs ("/image/bullet.gif", "/index.htm"). Hosted at a domain root that is fine, but on
 * GitHub project pages (https://user.github.io/<repo>/) they resolve to https://user.github.io/image/... and 404 -
 * <base href> does not help because a leading "/" ignores it. So, at run time only (the archive files stay untouched),
 * prefix those URLs with the site's base path: HTML attributes (quoted or not) and quoted string literals in scripts.
 */
export const rebaseRootPaths = (s: string): string => withBase('/') === '/' ? s : s
  .replace(/(\b(?:src|background|lowsrc|href|value)\s*=\s*)(["']?)\/(?!\/)([^"'\s>]*)/gi,
    (_m, pre: string, q: string, rest: string) => `${pre}${q}${withBase('/' + rest)}`)
  .replace(/(["'])\/(?!\/)([^"'\s<>]*\.(?:html?|gif|jpe?g|png|bmp|ico|css|js))\1/gi,
    (_m, q: string, rest: string) => `${q}${withBase('/' + rest)}${q}`);

/**
 * `patch: false` builds the "raw" view: the file exactly as authored (no IE-compat script patches), but still decoded
 * with the charset it declares (GB2312 / Big5). GitHub Pages cannot send a per-file charset header and labels every
 * .htm as UTF-8, so an iframe / tab pointed straight at the file shows mojibake; decoding here and serving the result as
 * a UTF-8 blob avoids that.
 */
export async function buildLegacyDocument(path: string, opts: { patch?: boolean } = {}): Promise<string> {
  const patch = opts.patch !== false;
  const fix = (t: string) => rebaseRootPaths(patch ? patchLegacyScript(t) : t);
  const page = await fetchDecoded(path);
  if (page === null) throw new Error(`Archive page not found: ${path}`);
  const dir = path.slice(0, path.lastIndexOf('/') + 1);   // "/" or "/activity/"

  let html = fix(page.text);

  const scriptRe = /<script\b[^>]*?\bsrc\s*=\s*["']?([^"'\s>]+)["']?[^>]*>\s*<\/script>/gi;
  const srcs = [...new Set([...html.matchAll(scriptRe)].map((m) => m[1]))];
  const inlined = new Map<string, string>();
  await Promise.all(srcs.map(async (src) => {
    const abs = src.startsWith('/') ? src : dir + src;
    const script = await fetchDecoded(abs, page.charset).catch(() => null);
    inlined.set(src, script === null ? '' : fix(script.text));
  }));
  html = html.replace(scriptRe, (_m, src: string) => `<script>${(inlined.get(src) ?? '').replace(/<\/script/gi, '<\\/script')}</script>`);

  // absolute: a blob: document cannot resolve a relative <base>
  const base = `<base href="${window.location.origin}${withBase(dir)}">` + `<script>${POPUP_INTERCEPTOR}</script>`;
  return /<head[^>]*>/i.test(html) ? html.replace(/<head[^>]*>/i, (m) => m + base) : base + html;
}

/**
 * Injected into every page we build. Pop-ups (`window.open`), named-window links (target="notice") and - inside a pop-up -
 * ordinary links would otherwise load the raw .htm URL, which GitHub Pages labels UTF-8 (GB2312 text -> mojibake).
 * They are routed through the app's decoder instead (window.__pbcumArchive, installed by installArchiveOpener()).
 */
const POPUP_INTERCEPTOR = `(function(){
  function api(){
    var c=[window.parent,window.top,window.opener];
    for(var i=0;i<c.length;i++){try{if(c[i]&&c[i].__pbcumArchive)return c[i].__pbcumArchive;}catch(e){}}
    return null;
  }
  function isArchive(u){return u.origin===location.origin&&/\.html?$/i.test(u.pathname)&&u.pathname.indexOf('.htm')>0;}
  var nativeOpen=window.open;
  window.open=function(href,name,features){
    try{var u=new URL(href,document.baseURI),a=api();if(a&&isArchive(u))return a.open(u.href,name,features);}catch(e){}
    return nativeOpen.apply(window,arguments);
  };
  document.addEventListener('click',function(e){
    if(e.defaultPrevented||e.button||e.metaKey||e.ctrlKey||e.shiftKey)return;
    var el=e.target,a=el&&el.closest&&el.closest('a[href]');if(!a)return;
    var u;try{u=new URL(a.href,document.baseURI);}catch(x){return;}
    var api_=api();if(!api_||!isArchive(u))return;
    var t=(a.getAttribute('target')||'').toLowerCase();
    var self_=!t||t==='_self'||t==='_top'||t==='_parent';
    var popup=window.parent===window;            // top-level pop-up window (not the app's frame, which routes itself)
    if(self_&&!popup)return;
    e.preventDefault();
    if(self_)api_.navigate(window,u.href);else api_.open(u.href,a.getAttribute('target'),'');
  },true);
})();`;

/**
 * Installed once by the app. Lets documents we built (frames and the pop-ups they open) open / navigate to archive pages
 * through the decoder. window.open is called here, in the app window, so the new window is not sandboxed.
 */
export function installArchiveOpener(): void {
  const toPath = (href: string) => { const u = new URL(href); return stripBase(decodeURI(u.pathname)) + u.hash; };
  const blobUrl = async (href: string) => {
    const p = toPath(href);
    const hash = p.includes('#') ? p.slice(p.indexOf('#')) : '';
    const html = await buildLegacyDocument(p.split('#')[0]);
    const url = URL.createObjectURL(new Blob([html], { type: 'text/html;charset=utf-8' }));
    setTimeout(() => URL.revokeObjectURL(url), 10 * 60_000);
    return url + hash;
  };
  (window as unknown as { __pbcumArchive: unknown }).__pbcumArchive = {
    open(href: string, name?: string | null, features?: string): Window | null {
      const w = window.open('', name || '_blank', features || '');   // synchronous, so pop-up blockers allow it
      blobUrl(href).then((u) => w?.location.replace(u)).catch(() => w?.location.replace(href));
      return w;
    },
    navigate(win: Window, href: string): void {
      blobUrl(href).then((u) => win.location.replace(u)).catch(() => win.location.assign(href));
    },
  };
}

/** Opens an archived page in a new tab with its original charset decoded correctly (no IE patches). */
export async function openOriginalInNewTab(path: string): Promise<void> {
  const w = window.open('', '_blank');           // opened synchronously so pop-up blockers allow it
  try {
    const html = await buildLegacyDocument(path, { patch: false });
    const url = URL.createObjectURL(new Blob([html], { type: 'text/html;charset=utf-8' }));
    if (w) w.location.href = url; else window.open(url, '_blank');
    setTimeout(() => URL.revokeObjectURL(url), 60_000);
  } catch (e) {
    w?.close();
    throw e;
  }
}
