/*
 * PBCUM archive charset service worker.
 *
 * Static hosts such as GitHub Pages label every .htm file "text/html; charset=utf-8" and cannot be configured
 * otherwise. The archived pages are GB2312 / Big5, so opening one directly - a window.open() pop-up, a named-window
 * link (target="notice"), a typed URL - shows mojibake. This worker re-labels those responses with the charset the page
 * declares in its own <meta>. The archive files themselves stay byte-for-byte untouched.
 */
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (event) => event.waitUntil(self.clients.claim()));

const declaredCharset = (buf) => {
  const head = new TextDecoder('latin1').decode(new Uint8Array(buf, 0, Math.min(buf.byteLength, 4096)));
  const m = head.match(/charset\s*=\s*["']?([\w-]+)/i);
  return m ? m[1].toLowerCase() : null;
};

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin || !/\.html?$/i.test(url.pathname)) return;
  // Only documents (navigations / frames / pop-ups); fetch() of the same file by the app is decoded by the app itself.
  if (req.mode !== 'navigate') return;

  event.respondWith((async () => {
    const res = await fetch(req);
    if (!res.ok) return res;
    const buf = await res.clone().arrayBuffer();
    const charset = declaredCharset(buf);
    if (!charset || charset === 'utf-8' || charset === 'utf8') return res;
    const headers = new Headers(res.headers);
    headers.set('Content-Type', `text/html; charset=${charset}`);
    headers.delete('Content-Length');
    headers.delete('Content-Encoding');
    return new Response(buf, { status: res.status, statusText: res.statusText, headers });
  })());
});
