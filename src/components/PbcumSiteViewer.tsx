import React, { useCallback, useEffect, useState } from 'react';
import { ArrowLeft, ExternalLink, FileCode } from 'lucide-react';
import { LegacyFrame } from './LegacyFrame';
import { ArchiveFrame } from './ArchiveFrame';
import { ARCHIVE_PAGES } from '../data/archiveTree';

interface PbcumSiteViewerProps {
  /** A core page id ("index", "philosophy", ...) or an archive path ("/activity/13thquanwen.htm#top"). */
  initialPage?: string;
  /** Rounded, softer frame around the page (the page content itself is never restyled). */
  modernMode?: boolean;
}

const toPath = (page: string) => (page.startsWith('/') ? page : `/${page}.htm`);

/**
 * The website. Every one of the 112 archived pages is rendered from its own original markup (LegacyFrame), so the
 * text, images, link targets, pop-up windows and in-page behaviour are exactly the original's. "原始文件" shows the
 * untouched file in a plain frame for side-by-side checking.
 */
export const PbcumSiteViewer: React.FC<PbcumSiteViewerProps> = ({ initialPage = 'index', modernMode = false }) => {
  const [stack, setStack] = useState<string[]>([toPath(initialPage)]);
  const [mode, setMode] = useState<'compat' | 'raw'>('compat');
  const current = stack[stack.length - 1];
  const basePath = current.split('#')[0];
  const meta = ARCHIVE_PAGES.find((p) => p.path === basePath);

  // follow the page chosen outside the viewer (page picker, quick search, blueprint inspector)
  useEffect(() => { setStack([toPath(initialPage)]); setMode('compat'); }, [initialPage]);

  const go = useCallback((path: string) => setStack((s) => (s[s.length - 1] === path ? s : [...s, path])), []);
  const back = () => setStack((s) => (s.length > 1 ? s.slice(0, -1) : s));

  const modeBtn = (m: 'compat' | 'raw', label: string) => (
    <button
      onClick={() => setMode(m)}
      className={`px-3 py-1 text-xs font-medium ${mode === m ? 'bg-blue-800 text-white' : 'bg-white text-slate-700 hover:bg-slate-50'}`}
    >
      {label}
    </button>
  );

  return (
    <div className="w-full min-h-screen bg-slate-200/80 py-4">
      <div className="max-w-[820px] mx-auto px-1">
        <div className="mb-2 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-600">
          <div className="flex items-center gap-2 min-w-0">
            <button
              onClick={back}
              disabled={stack.length < 2}
              className="inline-flex items-center gap-1 px-2 py-1 rounded border border-slate-300 bg-white disabled:opacity-40 hover:bg-slate-50"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> 返回
            </button>
            <span className="inline-flex items-center gap-1.5 font-mono min-w-0">
              <FileCode className="w-3.5 h-3.5 text-sky-600 shrink-0" />
              <span className="truncate">{current}</span>
              {meta?.title && <span className="text-slate-400 truncate">· {meta.title}</span>}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <a href={basePath} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-blue-800 hover:underline">
              <ExternalLink className="w-3 h-3" /> 在新窗口打开原页
            </a>
            <div className="inline-flex rounded overflow-hidden border border-slate-300" role="group" aria-label="页面呈现方式">
              {modeBtn('compat', '兼容渲染')}
              {modeBtn('raw', '原始文件')}
            </div>
          </div>
        </div>

        <div className={`bg-white border border-slate-300 shadow-md overflow-hidden ${modernMode ? 'rounded-xl' : ''}`}>
          {mode === 'compat'
            ? <LegacyFrame path={current} onNavigate={go} />
            : <ArchiveFrame path={basePath} onNavigate={go} embedded />}
        </div>
      </div>
    </div>
  );
};
