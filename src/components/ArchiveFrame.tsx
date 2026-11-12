import React, { useMemo } from 'react';
import { ExternalLink, FileCode } from 'lucide-react';
import { ARCHIVE_PAGES } from '../data/archiveTree';
import { LegacyFrame } from './LegacyFrame';
import { openOriginalInNewTab } from '../lib/legacyDocument';

interface ArchiveFrameProps {
  /** Original archive URL path of the page, e.g. "/activity/13thquanwen.htm". */
  path: string;
  /** Called when a link inside the archived page navigates to another archive page. */
  onNavigate?: (path: string) => void;
  /** Hide the toolbar (used inside modals that already have a header). */
  embedded?: boolean;
}

/**
 * Renders an archived page as authored (no IE-compat patches). The file is fetched and decoded with the charset it
 * declares (GB2312 / Big5) and shown as a UTF-8 blob, because static hosts such as GitHub Pages label every .htm
 * as UTF-8, which turns the legacy Chinese pages into mojibake when they are framed or opened directly.
 */
export const ArchiveFrame: React.FC<ArchiveFrameProps> = ({ path, onNavigate, embedded = false }) => {
  const meta = useMemo(() => ARCHIVE_PAGES.find((p) => p.path === path), [path]);
  return (
    <div className="w-full">
      {!embedded && (
        <div className="flex flex-wrap items-center justify-between gap-2 mb-2 text-xs text-slate-600">
          <div className="flex items-center gap-1.5 font-mono min-w-0">
            <FileCode className="w-3.5 h-3.5 text-sky-600 shrink-0" />
            <span className="truncate">{path}</span>
            {meta?.title && <span className="text-slate-400 truncate">· {meta.title}</span>}
          </div>
          <button onClick={() => openOriginalInNewTab(path).catch(() => undefined)} className="inline-flex items-center gap-1 text-blue-800 hover:underline shrink-0">
            <ExternalLink className="w-3 h-3" /> 在新窗口打开原页
          </button>
        </div>
      )}
      <LegacyFrame path={path} onNavigate={onNavigate ?? (() => undefined)} raw />
    </div>
  );
};
