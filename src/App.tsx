import React, { useState } from 'react';
import { ARCHIVE_PAGES } from './data/archiveTree';
import { PbcumSiteViewer } from './components/PbcumSiteViewer';
import { BlueprintInspector } from './components/BlueprintInspector';
import { 
  Compass, 
  Code2, 
  SplitSquareVertical, 
  BookOpen, 
  Layers, 
  ExternalLink,
  Sparkles,
  RotateCcw,
  Search,
  ChevronRight
} from 'lucide-react';

export default function App() {
  const [appMode, setAppMode] = useState<'site' | 'blueprint' | 'split'>('site');
  const [activeSitePage, setActiveSitePage] = useState<string>('index');
  const [modernMode, setModernMode] = useState<boolean>(false);
  const [quickSearchQuery, setQuickSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Quick jump items for search
  const searchablePages = [
    { id: 'index', title: '主页 (Home / 猴年新岁与第19届改选)', category: '核心主页' },
    { id: 'philosophy', title: '学会思想 (Philosophy / 扎实为经，回馈为纬)', category: '思想纲领' },
    { id: 'history', title: '学会历史 (History / 21章节不灭的信念与复办史)', category: '历史档案' },
    { id: 'structure', title: '学会组织架构 (Org Chart / 10大治理委员会)', category: '组织体系' },
    { id: 'structureexco', title: '执委会组织架构 (EXCO Hierarchy / 执委会层级图)', category: '组织体系' },
    { id: 'exco', title: '执委会名单 (EXCO Roster / 第18届与19届执委)', category: '执委会' },
    { id: 'unit', title: '学会各小组 (辩论、华文班、社醒、文化、相声、摇篮手)', category: '小组部门' },
    { id: 'unit2', title: '学会各小组 (咨询研究、纪律、学记团、外务、秘书、财务)', category: '行政部门' },
    { id: 'activity', title: '特别活动报告 (全辩、全中、大摇、迎新周)', category: '特别活动' },
    { id: 'notice', title: '活动预告 (2004改选日程与会员大会预告)', category: '活动看板' },
    { id: 'song', title: '学会会歌 (火浴后的火鸟 / 余锦畅作曲 钟采旺填词)', category: '会歌文化' },
    { id: 'bulletin', title: '学会会讯 (第十期会讯 / 叶文彬、吴健南评论)', category: '出版期刊' },
    { id: 'wenxian', title: '学会文献 (周添健、谢爱萍、潘宏文献词与评论集)', category: '文献典藏' },
    { id: 'photo', title: '学会掠影 (1986翁姑阿兹副校长宣布成立旧照)', category: '历史相片' }
  ];

  // Every other page of the archive (98 more) is reachable too, verbatim, by its original URL path.
  const corePaths = new Set(searchablePages.map(p => `/${p.id}.htm`));
  const sectionLabel = (path: string) => (path.split('/').length > 2 ? path.split('/')[1] : '根目录');
  const archiveSearchPages = ARCHIVE_PAGES
    .filter(f => !corePaths.has(f.path))
    .map(f => ({ id: f.path, title: `${f.path} (${f.title ?? ''})`, category: sectionLabel(f.path) }));
  const allSearchablePages = [...searchablePages, ...archiveSearchPages];
  /** '/philosophy.htm' -> 'philosophy' (has a replica); other archive paths are opened verbatim. */
  const toPageId = (path: string) => {
    const m = path.match(/^\/([A-Za-z0-9_]+)\.htm$/);
    return m && searchablePages.some(p => p.id === m[1]) ? m[1] : path;
  };

  const filteredPages = quickSearchQuery.trim() === '' 
    ? allSearchablePages 
    : allSearchablePages.filter(p => 
        p.title.toLowerCase().includes(quickSearchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(quickSearchQuery.toLowerCase())
      );

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 flex flex-col font-sans">
      {/* 
        TOP BAR CONTRACT:
        [Brand title, one line] — [4–5 nav links, 1–2 word labels, single-line] — [1 primary action]
      */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-xs flex items-center justify-between gap-8 px-6 py-3">
        {/* Zone 1: Single text element wordmark */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="w-8 h-8 rounded bg-[#00007f] text-yellow-300 font-serif font-bold text-xs flex items-center justify-center shadow-xs">
            马大
          </div>
          <a 
            href="#root" 
            onClick={() => { setAppMode('site'); setActiveSitePage('index'); }}
            className="text-base font-bold tracking-tight text-slate-900 whitespace-nowrap shrink-0 hover:text-blue-900 transition-colors"
          >
            马大华文学会架构蓝图 (PBCUM)
          </a>
        </div>

        {/* Zone 2: 4–5 clean single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-medium text-slate-600">
          <button
            onClick={() => { setAppMode('site'); setActiveSitePage('index'); }}
            className={`whitespace-nowrap shrink-0 transition-colors ${
              appMode === 'site' ? 'text-blue-900 font-bold underline underline-offset-4' : 'hover:text-slate-900'
            }`}
          >
            全站浏览
          </button>
          <button
            onClick={() => setAppMode('blueprint')}
            className={`whitespace-nowrap shrink-0 transition-colors ${
              appMode === 'blueprint' ? 'text-blue-900 font-bold underline underline-offset-4' : 'hover:text-slate-900'
            }`}
          >
            架构检查器
          </button>
          <button
            onClick={() => setAppMode('split')}
            className={`whitespace-nowrap shrink-0 transition-colors ${
              appMode === 'split' ? 'text-blue-900 font-bold underline underline-offset-4' : 'hover:text-slate-900'
            }`}
          >
            分屏对照
          </button>
          <button
            onClick={() => { setAppMode('site'); setActiveSitePage('structure'); }}
            className="whitespace-nowrap shrink-0 hover:text-slate-900 transition-colors"
          >
            组织架构
          </button>
          <button
            onClick={() => setIsSearchOpen(true)}
            className="whitespace-nowrap shrink-0 text-blue-700 hover:text-blue-900 transition-colors flex items-center gap-1"
          >
            <Search className="w-3.5 h-3.5" />
            <span>档案检索</span>
          </button>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setModernMode(!modernMode)}
            className="px-3.5 py-1.5 text-xs font-medium text-white bg-blue-900 rounded-md hover:bg-blue-800 transition-colors whitespace-nowrap shrink-0 shadow-xs flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
            <span>{modernMode ? '切换复古质感' : '切换现代平滑'}</span>
          </button>
        </div>
      </header>

      {/* Main Workspace Body */}
      <main className="flex-1 flex flex-col">
        {/* Workspace Quick Mode Bar */}
        <div className="bg-slate-200/90 border-b border-slate-300 px-6 py-2 flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-1.5 text-slate-700">
            <span className="font-bold text-slate-900">当前工作模式：</span>
            <span className="bg-white px-2 py-0.5 rounded text-blue-900 font-medium border border-slate-300">
              {appMode === 'site' ? '100% 全真复刻网站体验' : appMode === 'blueprint' ? '架构与文件树全面解构蓝图' : '全屏双视比对模式'}
            </span>
            <span className="text-slate-400">|</span>
            <span className="text-slate-600">
              原站发布年代: 2004年1月 (马来亚大学华文学会 PBCUM)
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Quick Page Picker when in site mode */}
            {appMode !== 'blueprint' && (
              <div className="flex items-center gap-1 text-[11px]">
                <span className="text-slate-500">跳转页面:</span>
                <select
                  value={activeSitePage}
                  onChange={(e) => setActiveSitePage(e.target.value)}
                  className="bg-white border border-slate-300 rounded px-1.5 py-0.5 font-medium text-slate-800 outline-none"
                >
                  <option value="index">index.htm (主页)</option>
                  <option value="philosophy">philosophy.htm (学会思想)</option>
                  <option value="history">history.htm (学会历史)</option>
                  <option value="structure">structure.htm (学会组织架构)</option>
                  <option value="structureexco">structureexco.htm (执委会架构)</option>
                  <option value="exco">exco.htm (执委会名单)</option>
                  <option value="unit">unit.htm (学会各小组 P1)</option>
                  <option value="unit2">unit2.htm (学会各小组 P2)</option>
                  <option value="activity">activity.htm (特别活动报告)</option>
                  <option value="notice">notice.htm (活动预告)</option>
                  <option value="song">song.htm (学会会歌)</option>
                  <option value="bulletin">bulletin.htm (学会会讯)</option>
                  <option value="wenxian">wenxian.htm (学会文献)</option>
                  <option value="photo">photo.htm (学会掠影)</option>
                <optgroup label="其余原站页面 (Archive, verbatim)">
                    {archiveSearchPages.map(p => (
                      <option key={p.id} value={p.id}>{p.id}</option>
                    ))}
                  </optgroup>
                </select>
              </div>
            )}

            <button
              onClick={() => {
                setActiveSitePage('index');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="p-1 rounded bg-white text-slate-600 hover:text-slate-900 border border-slate-300"
              title="重设为主页"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Viewport content */}
        <div className="flex-1 p-3 sm:p-6">
          {appMode === 'site' && (
            <div className="max-w-5xl mx-auto">
              <PbcumSiteViewer 
                initialPage={activeSitePage} 
                modernMode={modernMode}
              />
            </div>
          )}

          {appMode === 'blueprint' && (
            <div className="max-w-6xl mx-auto">
              <BlueprintInspector 
                onOpenFileInPreview={(pageId) => {
                  setActiveSitePage(toPageId(pageId));
                  setAppMode('site');
                }}
              />
            </div>
          )}

          {appMode === 'split' && (
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
              {/* Left Column: Live Site */}
              <div className="xl:col-span-6 bg-slate-200 p-2 rounded-lg border border-slate-300">
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-300 text-xs font-bold text-slate-700">
                  <span>实时复刻展示 (Live Interactive Site)</span>
                  <span className="text-[10px] bg-blue-100 text-blue-900 px-1.5 py-0.5 rounded font-mono">
                    {activeSitePage}.htm
                  </span>
                </div>
                <div className="max-h-[82vh] overflow-y-auto pr-1">
                  <PbcumSiteViewer 
                    initialPage={activeSitePage}
                    modernMode={modernMode}
                  />
                </div>
              </div>

              {/* Right Column: Blueprint Inspector */}
              <div className="xl:col-span-6">
                <BlueprintInspector 
                  onOpenFileInPreview={(pageId) => setActiveSitePage(toPageId(pageId))}
                />
              </div>
            </div>
          )}
        </div>
      </main>

      {/* QUICK SEARCH & ARCHIVE JUMP MODAL */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-lg w-full p-4 shadow-2xl animate-fadeIn">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-200">
              <Search className="w-4 h-4 text-blue-800" />
              <input
                type="text"
                autoFocus
                placeholder="键入关键词快速检索 (如: 辩论, 会歌, 翁姑阿兹, 执委会, 猴年)..."
                value={quickSearchQuery}
                onChange={(e) => setQuickSearchQuery(e.target.value)}
                className="w-full text-xs font-medium outline-none bg-transparent"
              />
              <button
                onClick={() => setIsSearchOpen(false)}
                className="text-xs text-slate-400 hover:text-slate-600 px-1"
              >
                ✕
              </button>
            </div>

            <div className="py-2 max-h-[300px] overflow-y-auto space-y-1">
              {filteredPages.map((page) => (
                <div
                  key={page.id}
                  onClick={() => {
                    setActiveSitePage(page.id);
                    setAppMode('site');
                    setIsSearchOpen(false);
                    setQuickSearchQuery('');
                  }}
                  className="p-2 rounded hover:bg-blue-50 cursor-pointer flex items-center justify-between text-xs transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-100 text-slate-600">
                      {page.category}
                    </span>
                    <span className="font-semibold text-slate-900">{page.title}</span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                </div>
              ))}
            </div>

            <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-400 flex justify-between">
              <span>共收录 14 个独立页面与专栏</span>
              <span>ESC 或点击关闭</span>
            </div>
          </div>
        </div>
      )}

      {/* Persistent Quiet Architectural Footer */}
      <footer className="bg-white border-t border-slate-200 py-3 px-6 text-center text-xs text-slate-500 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-slate-800">PBCUM 马来亚大学华文学会</span>
          <span>·</span>
          <span>Persatuan Bahasa Cina Universiti Malaya (1986–2004)</span>
        </div>
        <div className="flex items-center gap-4 text-[11px]">
          <span>核心校训：扎实为经，回馈为纬</span>
          <span>·</span>
          <span>重构架构：React 19 + TypeScript + Tailwind v4 + Web Audio API</span>
        </div>
      </footer>
    </div>
  );
}
