import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ExternalLink, FileCode } from 'lucide-react';
import { ARCHIVE_PAGES } from '../data/archiveTree';

interface ArchiveFrameProps {
  /** Original archive URL path of the page, e.g. "/activity/13thquanwen.htm". */
  path: string;
  /** Called when a link inside the archived page navigates the frame to another archive page. */
  onNavigate?: (path: string) => void;
  /** Hide the toolbar (used inside modals that already have a header). */
  embedded?: boolean;
}

const PAGE_PATHS = new Set(ARCHIVE_PAGES.map((p) => p.path));
const MIN_HEIGHT = 420;

/**
 * Renders an archived page *verbatim* — the original markup, text and images served from the archive
 * at its original URL — so every one of the 112 original pages is reachable with exact content parity,
 * independent of the hand-built React replicas.
 */
export const ArchiveFrame: React.FC<ArchiveFrameProps> = ({ path, onNavigate, embedded = false }) => {
  const ref = useRef<HTMLIFrameElement>(null);
  const [height, setHeight] = useState(MIN_HEIGHT);
  const meta = useMemo(() => ARCHIVE_PAGES.find((p) => p.path === path), [path]);

  const measure = useCallback(() => {
    const doc = ref.current?.contentDocument;
    if (!doc) return;
    setHeight(Math.max(MIN_HEIGHT, doc.documentElement.scrollHeight + 4));
  }, []);

  const handleLoad = useCallback(() => {
    const frame = ref.current;
    if (!frame) return;
    try {
      const loaded = decodeURI(frame.contentWindow!.location.pathname);
      if (loaded !== path && PAGE_PATHS.has(loaded)) onNavigate?.(loaded);   // user followed a link inside the page
    } catch { /* cross-origin (external) page: nothing to sync */ }
    measure();
    // images finish loading after the document: re-measure
    frame.contentWindow?.addEventListener('load', measure);
    const imgs = frame.contentDocument?.images;
    if (imgs) Array.from(imgs).forEach((img) => img.addEventListener('load', measure));
  }, [path, onNavigate, measure]);

  useEffect(() => { setHeight(MIN_HEIGHT); }, [path]);

  return (
    <div className="w-full">
      {!embedded && (
        <div className="flex flex-wrap items-center justify-between gap-2 mb-2 text-xs text-slate-600">
          <div className="flex items-center gap-1.5 font-mono min-w-0">
            <FileCode className="w-3.5 h-3.5 text-sky-600 shrink-0" />
            <span className="truncate">{path}</span>
            {meta?.title && <span className="text-slate-400 truncate">· {meta.title}</span>}
          </div>
          <a
            href={path}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-blue-800 hover:underline shrink-0"
          >
            <ExternalLink className="w-3 h-3" /> 在新窗口打开原页
          </a>
        </div>
      )}
      <iframe
        ref={ref}
        key={path}
        src={path}
        title={meta?.title ?? path}
        // The 2004 home pages contain a frame-buster (top.location = self); without allow-top-navigation it is inert.
        sandbox="allow-same-origin allow-scripts allow-popups allow-popups-to-escape-sandbox allow-forms"
        onLoad={handleLoad}
        style={{ height }}
        className="w-full border border-slate-300 bg-white"
      />
    </div>
  );
};
