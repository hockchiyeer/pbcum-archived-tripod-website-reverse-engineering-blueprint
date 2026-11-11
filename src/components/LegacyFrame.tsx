import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ARCHIVE_PAGES } from '../data/archiveTree';
import { buildLegacyDocument } from '../lib/legacyDocument';

const PAGE_PATHS = new Set(ARCHIVE_PAGES.map((p) => p.path));

interface LegacyFrameProps {
  /** Archive path, optionally with a #hash (e.g. "/unit2.htm#WaiWuChu"). */
  path: string;
  /** Called when a same-window link inside the page targets another archive page. */
  onNavigate: (path: string) => void;
}

const SANDBOX = 'allow-same-origin allow-scripts allow-popups allow-popups-to-escape-sandbox allow-forms';

/**
 * Runs an archived page the way a 2004 browser would (quirks mode, via a blob: document): same markup, text, images, <marquee>s, hover effects,
 * named-window links and `window.open` pop-ups (580x450, 550x500, ...). Same-window links keep the visitor inside the
 * app; everything else (pop-ups, named windows, mailto:, downloads) behaves natively.
 */
export const LegacyFrame: React.FC<LegacyFrameProps> = ({ path, onNavigate }) => {
  const frameRef = useRef<HTMLIFrameElement>(null);
  const [blobUrl, setBlobUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [height, setHeight] = useState(480);
  const hashIdx = path.indexOf('#');
  const base = hashIdx === -1 ? path : path.slice(0, hashIdx);
  const hash = hashIdx === -1 ? '' : path.slice(hashIdx);

  useEffect(() => {
    let alive = true;
    let url: string | null = null;
    setBlobUrl(null); setError(null); setHeight(480);
    buildLegacyDocument(base)
      .then((h) => {
        if (!alive) return;
        // A blob: document (unlike srcdoc) can stay in quirks mode, which the DOCTYPE-less 2004 pages rely on.
        url = URL.createObjectURL(new Blob([h], { type: 'text/html;charset=utf-8' }));
        setBlobUrl(url);
      })
      .catch((e) => alive && setError(String(e.message ?? e)));
    return () => { alive = false; if (url) URL.revokeObjectURL(url); };
  }, [base]);

  const scrollToHash = useCallback((h: string) => {
    const frame = frameRef.current; const doc = frame?.contentDocument;
    if (!frame || !doc) return;
    const id = decodeURIComponent(h.replace(/^#/, ''));
    const lower = id.toLowerCase();
    const el = id && id !== 'top'
      ? doc.getElementById(id) || doc.getElementsByName(id)[0]
        || Array.from(doc.querySelectorAll('[id],[name]')).find((n) => (n.id || n.getAttribute('name') || '').toLowerCase() === lower)
      : null;
    const offset = el ? el.getBoundingClientRect().top : 0;
    frame.scrollIntoView({ block: 'start' });
    if (offset) {
      // scroll whichever ancestor scrolls (window or an app container) by the anchor's offset inside the frame
      let p: HTMLElement | null = frame.parentElement;
      while (p && p.scrollHeight <= p.clientHeight) p = p.parentElement;
      (p ?? document.scrollingElement ?? document.documentElement).scrollBy({ top: offset });
    }
  }, []);

  const handleLoad = useCallback(() => {
    const frame = frameRef.current; const win = frame?.contentWindow; const doc = frame?.contentDocument;
    if (!frame || !win || !doc) return;

    // A script assigned location.href (e.g. the "past committees" dropdown): stay inside the app.
    if (win.location.protocol !== 'blob:') {
      const p = decodeURI(win.location.pathname);
      if (PAGE_PATHS.has(p)) onNavigate(p + win.location.hash);
      return;
    }

    doc.addEventListener('click', (e) => {
      if (e.defaultPrevented) return;                       // an inline onclick (window.open ... return false) handled it
      const a = (e.target as Element).closest('a');
      if (!a) return;
      const raw = a.getAttribute('href');
      if (raw === null || /^(mailto:|javascript:|tel:)/i.test(raw)) return;
      if (raw === '#') { e.preventDefault(); return; }
      const target = (a.getAttribute('target') || '').toLowerCase();
      const sameWindow = !target || target === '_self' || target === '_top' || target === '_parent';
      const url = new URL(a.href, window.location.href);
      if (url.origin === window.location.origin) {
        if (url.pathname === base && url.hash) { e.preventDefault(); scrollToHash(url.hash); return; }
        if (sameWindow && PAGE_PATHS.has(url.pathname)) { e.preventDefault(); onNavigate(url.pathname + url.hash); }
        // otherwise (named window such as target="notice" / "main", .doc downloads): native behaviour
      } else if (sameWindow) {
        e.preventDefault();                                  // external site: never replace the app
        window.open(url.href, '_blank', 'noopener');
      }
    });

    const measure = () => setHeight(Math.max(240, doc.documentElement.scrollHeight));
    measure();
    if (typeof ResizeObserver !== 'undefined' && doc.body) new ResizeObserver(measure).observe(doc.body);
    Array.from(doc.images).forEach((img) => img.addEventListener('load', measure));
    win.addEventListener('load', measure);
    if (hash) setTimeout(() => scrollToHash(hash), 50);
  }, [base, hash, onNavigate, scrollToHash]);

  if (error) return <p className="text-sm text-red-700 p-4">{error}</p>;
  if (blobUrl === null) return <p className="text-sm text-slate-500 p-4">载入中…</p>;
  return (
    <iframe
      ref={frameRef}
      key={base}
      src={blobUrl}
      sandbox={SANDBOX}
      onLoad={handleLoad}
      title={base}
      style={{ height }}
      className="w-full block border-0 bg-white"
    />
  );
};
