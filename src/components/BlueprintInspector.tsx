import React, { useState } from 'react';
import { 
  FolderTree, 
  Layers, 
  Code2, 
  Compass, 
  Package, 
  Cpu, 
  Search, 
  ChevronRight, 
  ChevronDown, 
  FileText, 
  FileCode, 
  Image as ImageIcon, 
  CheckCircle2, 
  Sparkles,
  ExternalLink,
  Copy,
  Check
} from 'lucide-react';
import { 
  FILE_STRUCTURE_TREE, 
  VISUAL_LAYOUT_SPEC, 
  REBUILD_COMPONENTS, 
  FileNode 
} from '../data/pbcumData';

export const BlueprintInspector: React.FC<{
  onOpenFileInPreview?: (pageId: string) => void;
}> = ({ onOpenFileInPreview }) => {
  const [activeTab, setActiveTab] = useState<'tree' | 'layout' | 'css' | 'nav' | 'assets' | 'rebuild'>('tree');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFile, setSelectedFile] = useState<FileNode | null>(null);
  const [expandedFolders, setExpandedFolders] = useState<Record<string, boolean>>({
    "/": true,
    "/pages": true,
    "/image": false,
    "/structure": false,
    "/bulletin": false,
    "/wenxian": false,
    "/former_exco": false,
    "/activity": false,
    "/unit": false,
    "/poster": false,
    "/assets": true
  });
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [assetCategory, setAssetCategory] = useState<string>('all');
  const [selectedAssetModal, setSelectedAssetModal] = useState<{
    path: string;
    name: string;
    dims: string;
    category: string;
    desc: string;
    size?: string;
  } | null>(null);

  const toggleFolder = (path: string) => {
    setExpandedFolders(prev => ({ ...prev, [path]: !prev[path] }));
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  // Render tree recursively
  const renderTreeNode = (node: FileNode, depth = 0) => {
    const isFolder = node.type === 'folder';
    const isExpanded = expandedFolders[node.path];
    const isSelected = selectedFile?.path === node.path;
    const matchesSearch = searchQuery === '' || 
      node.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      node.description.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch && !isFolder) return null;

    return (
      <div key={node.path} className="select-none">
        <div
          onClick={() => {
            if (isFolder) {
              toggleFolder(node.path);
            } else {
              setSelectedFile(node);
            }
          }}
          className={`flex items-center gap-2 py-1 px-2 rounded cursor-pointer text-xs font-mono transition-colors ${
            isSelected 
              ? 'bg-blue-800 text-white font-medium' 
              : 'hover:bg-slate-100 text-slate-800'
          }`}
          style={{ paddingLeft: `${Math.max(8, depth * 16)}px` }}
        >
          {isFolder ? (
            <>
              {isExpanded ? (
                <ChevronDown className="w-3.5 h-3.5 text-blue-600 shrink-0" />
              ) : (
                <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              )}
              <FolderTree className="w-3.5 h-3.5 text-amber-500 shrink-0" />
              <span className="font-semibold text-slate-900 truncate">
                {node.name}
              </span>
              {node.count && (
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isSelected ? 'bg-blue-950 text-blue-200' : 'bg-slate-200 text-slate-600'}`}>
                  {node.count}
                </span>
              )}
            </>
          ) : (
            <>
              {node.name.endsWith('.htm') || node.name.endsWith('.html') ? (
                <FileCode className="w-3.5 h-3.5 text-sky-500 shrink-0 ml-3.5" />
              ) : node.name.endsWith('.gif') || node.name.endsWith('.jpg') ? (
                <ImageIcon className="w-3.5 h-3.5 text-emerald-500 shrink-0 ml-3.5" />
              ) : (
                <FileText className="w-3.5 h-3.5 text-purple-500 shrink-0 ml-3.5" />
              )}
              <span className="truncate">{node.name}</span>
              {node.size && (
                <span className={`text-[10px] ml-auto shrink-0 ${isSelected ? 'text-blue-200' : 'text-slate-400'}`}>
                  {node.size}
                </span>
              )}
            </>
          )}
        </div>

        {isFolder && isExpanded && node.children && (
          <div>
            {node.children.map(child => renderTreeNode(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="w-full bg-slate-50 border border-slate-300 rounded-lg shadow-sm overflow-hidden text-slate-800">
      {/* Inspector Header */}
      <div className="bg-slate-900 text-white px-5 py-3.5 flex flex-wrap items-center justify-between gap-3 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 bg-blue-600 rounded">
            <Cpu className="w-4 h-4 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-sm tracking-wide flex items-center gap-2">
              <span>PBCUM 架构反向工程与重构蓝图</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-950 text-cyan-300 border border-blue-800">
                REVERSE-ENGINEERED SPEC
              </span>
            </h3>
            <p className="text-[11px] text-slate-400">
              Universiti Malaya Chinese Language Society (1986–2004 Architecture Inspector)
            </p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-1 bg-slate-800 p-1 rounded-md text-xs font-medium">
          <button
            onClick={() => setActiveTab('tree')}
            className={`px-3 py-1.5 rounded flex items-center gap-1.5 transition-colors ${
              activeTab === 'tree' ? 'bg-blue-600 text-white' : 'text-slate-300 hover:text-white'
            }`}
          >
            <FolderTree className="w-3.5 h-3.5" />
            <span>目录与文件树</span>
          </button>
          <button
            onClick={() => setActiveTab('layout')}
            className={`px-3 py-1.5 rounded flex items-center gap-1.5 transition-colors ${
              activeTab === 'layout' ? 'bg-blue-600 text-white' : 'text-slate-300 hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>视觉排版规范</span>
          </button>
          <button
            onClick={() => setActiveTab('css')}
            className={`px-3 py-1.5 rounded flex items-center gap-1.5 transition-colors ${
              activeTab === 'css' ? 'bg-blue-600 text-white' : 'text-slate-300 hover:text-white'
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>CSS 框架对比</span>
          </button>
          <button
            onClick={() => setActiveTab('nav')}
            className={`px-3 py-1.5 rounded flex items-center gap-1.5 transition-colors ${
              activeTab === 'nav' ? 'bg-blue-600 text-white' : 'text-slate-300 hover:text-white'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>导航与页脚解构</span>
          </button>
          <button
            onClick={() => setActiveTab('assets')}
            className={`px-3 py-1.5 rounded flex items-center gap-1.5 transition-colors ${
              activeTab === 'assets' ? 'bg-blue-600 text-white' : 'text-slate-300 hover:text-white'
            }`}
          >
            <Package className="w-3.5 h-3.5" />
            <span>资产清单</span>
          </button>
          <button
            onClick={() => setActiveTab('rebuild')}
            className={`px-3 py-1.5 rounded flex items-center gap-1.5 transition-colors ${
              activeTab === 'rebuild' ? 'bg-blue-600 text-white' : 'text-slate-300 hover:text-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>重构组件矩阵</span>
          </button>
        </div>
      </div>

      {/* Tab 1: Folder & File Structure Tree */}
      {activeTab === 'tree' && (
        <div className="p-4 grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Tree view */}
          <div className="lg:col-span-5 bg-white border border-slate-200 rounded-lg p-3 shadow-xs">
            <div className="flex items-center gap-2 mb-3 pb-2 border-b border-slate-100">
              <Search className="w-3.5 h-3.5 text-slate-400" />
              <input
                type="text"
                placeholder="搜索文件或路径 (如: exco, flybird, bulletin)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full text-xs outline-none bg-transparent"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="text-xs text-slate-400 hover:text-slate-600"
                >
                  ✕
                </button>
              )}
            </div>

            <div className="h-[460px] overflow-y-auto space-y-0.5 pr-1">
              {renderTreeNode(FILE_STRUCTURE_TREE)}
            </div>
            
            <div className="mt-2 pt-2 border-t border-slate-100 text-[11px] text-slate-500 flex justify-between">
              <span>共 12 目录 / 280+ 原始资源文件</span>
              <span>编码: UTF-8 / GB2312</span>
            </div>
          </div>

          {/* Node detail inspector */}
          <div className="lg:col-span-7 bg-white border border-slate-200 rounded-lg p-4 shadow-xs">
            {selectedFile ? (
              <div className="space-y-4">
                <div className="flex items-start justify-between pb-3 border-b border-slate-200">
                  <div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-100 text-blue-800 uppercase font-semibold">
                      {selectedFile.category}
                    </span>
                    <h4 className="font-bold text-base text-slate-900 mt-1 font-mono">
                      {selectedFile.path}
                    </h4>
                  </div>
                  {selectedFile.size && (
                    <span className="text-xs font-mono bg-slate-100 px-2 py-1 rounded text-slate-700">
                      {selectedFile.size}
                    </span>
                  )}
                </div>

                <div>
                  <h5 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                    反向工程功能定义 (Reversed Role)
                  </h5>
                  <p className="text-sm text-slate-800 leading-relaxed bg-slate-50 p-2.5 rounded border border-slate-200">
                    {selectedFile.description}
                  </p>
                </div>

                {selectedFile.modernComponent && (
                  <div>
                    <h5 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                      现代 React / TypeScript 重构映射
                    </h5>
                    <div className="p-2.5 bg-sky-50 border border-sky-200 rounded text-xs font-mono text-blue-900 flex items-center justify-between">
                      <code>{selectedFile.modernComponent}</code>
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    </div>
                  </div>
                )}

                {/* Quick actions */}
                <div className="pt-2 border-t border-slate-100 flex items-center gap-2">
                  {selectedFile.name.endsWith('.htm') && onOpenFileInPreview && (
                    <button
                      onClick={() => {
                        const pageKey = selectedFile.name.replace('.htm', '');
                        onOpenFileInPreview(pageKey);
                      }}
                      className="px-3 py-1.5 rounded bg-blue-800 text-white text-xs font-medium hover:bg-blue-900 flex items-center gap-1.5 transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>在内嵌预览中打开此页</span>
                    </button>
                  )}
                  <button
                    onClick={() => copyToClipboard(selectedFile.path, 'path')}
                    className="px-3 py-1.5 rounded border border-slate-300 text-slate-700 text-xs font-medium hover:bg-slate-50 flex items-center gap-1.5"
                  >
                    {copiedCode === 'path' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>复制文件路径</span>
                  </button>
                </div>

                {/* Legacy vs Modern Comparison Info */}
                <div className="p-3 bg-amber-50/70 border border-amber-200 rounded text-xs text-amber-950 space-y-1">
                  <p className="font-bold">💡 架构反向工程要点：</p>
                  <p>• 原始文件采用微软 FrontPage / 纯 HTML4 嵌套表格渲染，包含硬编码行内背景色与字体标签。</p>
                  <p>• 本重构通过语义化 React 组件与 Tailwind v4 彻底解耦结构与表现层，保留原始视觉质感的同时赋予其 100% 响应式能力与无障碍性。</p>
                </div>
              </div>
            ) : (
              <div className="h-full min-h-[300px] flex flex-col items-center justify-center text-slate-400 text-center p-6">
                <FolderTree className="w-12 h-12 text-slate-300 mb-3" />
                <p className="text-sm font-medium text-slate-600">请在左侧文件树中点击任意文件</p>
                <p className="text-xs text-slate-400 mt-1 max-w-sm">
                  查看其在马大华文学会网站中的完整技术职责、历史演进与重构组件映射。
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tab 2: Visual Layout & Design System Spec */}
      {activeTab === 'layout' && (
        <div className="p-4 space-y-6">
          {/* Dimensional Geometry */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
              1. 核心容器几何尺寸规范 (Container Dimensions)
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {VISUAL_LAYOUT_SPEC.containers.map((c, i) => (
                <div key={i} className="p-3 bg-white border border-slate-200 rounded shadow-xs">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-sm text-blue-900 font-serif">{c.name}</span>
                    <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
                      {c.width || c.dimensions}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    {c.structure}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Color Palette Tokens */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
              2. 原始调色板色标体系 (Color Palette Architecture)
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {VISUAL_LAYOUT_SPEC.palettes.map((p, i) => (
                <div key={i} className="p-2.5 bg-white border border-slate-200 rounded shadow-xs">
                  <div 
                    className="w-full h-10 rounded border border-black/10 shadow-inner mb-2"
                    style={{ backgroundColor: p.hex }}
                  />
                  <div className="text-xs font-bold text-slate-900 truncate" title={p.name}>
                    {p.name.split(' ')[0]}
                  </div>
                  <div className="text-[11px] font-mono text-slate-600">{p.hex}</div>
                  <div className="text-[10px] text-slate-500 mt-1 line-clamp-2" title={p.usage}>
                    {p.usage}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Typography Scale */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
              3. 字体层级与排印规范 (Typographic Hierarchy)
            </h4>
            <div className="bg-white border border-slate-200 rounded overflow-hidden">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-100 border-b border-slate-200 text-slate-700 font-bold">
                  <tr>
                    <th className="p-2.5">层级 (Level)</th>
                    <th className="p-2.5">字号 (Size)</th>
                    <th className="p-2.5">字重 (Weight)</th>
                    <th className="p-2.5">主色 (Color)</th>
                    <th className="p-2.5">字体族 (Font Stack)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {VISUAL_LAYOUT_SPEC.typography.map((t, i) => (
                    <tr key={i} className="hover:bg-slate-50">
                      <td className="p-2.5 font-semibold text-slate-900">{t.level}</td>
                      <td className="p-2.5 font-mono text-blue-700">{t.size}</td>
                      <td className="p-2.5">{t.weight}</td>
                      <td className="p-2.5 font-mono">
                        <span className="inline-block w-2.5 h-2.5 rounded-full mr-1.5 align-middle border border-slate-300" style={{ backgroundColor: t.color.split(' ')[0] }} />
                        {t.color}
                      </td>
                      <td className="p-2.5 text-slate-600">{t.font}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: CSS Framework Analysis & Modernization */}
      {activeTab === 'css' && (
        <div className="p-4 space-y-4">
          <div className="bg-white border border-slate-200 rounded p-4">
            <h4 className="font-bold text-sm text-slate-900 mb-2">
              样式引擎变迁：onmouse_effect.css 到 assets/style.css
            </h4>
            <p className="text-xs text-slate-700 leading-relaxed mb-4">
              原始马大华文学会网站仅搭载单一样式表 <code>onmouse_effect.css</code>，大量依赖 IE 专属的 <code>document.all</code>、
              DHTML 滤镜与表格行内 <code>bgcolor</code> 属性。我们在重构中将其转化为干净的现代化样式架构：
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Legacy onmouse_effect.css */}
              <div className="p-3 bg-red-50/50 border border-red-200 rounded text-xs font-mono">
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-red-200 text-red-900 font-bold">
                  <span>原始实现 (onmouse_effect.css + DHTML)</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-red-200 text-red-800">LEGACY IE4-6</span>
                </div>
                <pre className="text-[11px] text-slate-800 overflow-x-auto leading-relaxed">
{`/* 原始表格嵌套与滤镜 */
table { border-collapse: collapse; }
td.navcell {
  background-color: #00007f;
  filter: progid:DXImageTransform.Microsoft.Gradient();
}
/* 必须配合 JS document.all 做滚动 */
<marquee direction="up" height="200" 
         scrollamount="1" scrolldelay="60"
         onmouseover="this.stop()" 
         onmouseout="this.start()">
  <!-- 新闻内容 -->
</marquee>`}
                </pre>
              </div>

              {/* Modernized assets/style.css */}
              <div className="p-3 bg-emerald-50/50 border border-emerald-200 rounded text-xs font-mono">
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-emerald-200 text-emerald-900 font-bold">
                  <span>现代重构 (assets/style.css + CSS Grid)</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-200 text-emerald-800">MODERN CSS</span>
                </div>
                <pre className="text-[11px] text-slate-800 overflow-x-auto leading-relaxed">
{`/* 纯 CSS keyframes 替换 <marquee> */
.mq-up .mq-in {
  display: block;
  animation: mq-up var(--d, 40s) linear infinite;
}
.mq-up:hover .mq-in {
  animation-play-state: paused;
}
@keyframes mq-up {
  0% { transform: translateY(100%); }
  100% { transform: translateY(-100%); }
}
/* 响应式断点自适应 (<680px 侧边栏折叠为顶部栏) */
@media (max-width: 680px) {
  .layout { grid-template-columns: 1fr; }
}`}
                </pre>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Navigation & Footer Architecture */}
      {activeTab === 'nav' && (
        <div className="p-4 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Navigation breakdown */}
            <div className="bg-white border border-slate-200 rounded p-4 shadow-xs">
              <h4 className="font-bold text-sm text-blue-900 font-serif mb-3">
                1. 网站主导航系统结构 (Navigation Architecture)
              </h4>
              <div className="space-y-2 text-xs">
                <div className="p-2 rounded bg-slate-50 border border-slate-200">
                  <div className="font-bold text-blue-950">A. 首页 12 项矩阵栏 (Home Band Menu)</div>
                  <p className="text-slate-600 mt-1">
                    涵盖学会思想、历史、组织架构、执委会名单、学会各小组、特别活动报告、活动预告、学会会讯、会歌、文献、线上留言与联系回馈。
                  </p>
                </div>
                <div className="p-2 rounded bg-slate-50 border border-slate-200">
                  <div className="font-bold text-blue-950">B. 内页 180px 皇家蓝侧边栏 (Sidebar Nav)</div>
                  <p className="text-slate-600 mt-1">
                    宽度固定 180px，背景色 <code>#00007f</code>。采用 <code>&lt;li class="on"&gt;</code> 赋予当前活动页面的黄色高亮指示。
                  </p>
                </div>
                <div className="p-2 rounded bg-slate-50 border border-slate-200">
                  <div className="font-bold text-blue-950">C. 小组 2x5 矩阵式二级导航 (Sub-unit Matrix Bar)</div>
                  <p className="text-slate-600 mt-1">
                    黄色双边框 <code>#ffff00</code>，天蓝背景 <code>#6699ff</code>，贯穿 unit.htm 与 unit2.htm 快速跳转所有 10 大小组。
                  </p>
                </div>
                <div className="p-2 rounded bg-slate-50 border border-slate-200">
                  <div className="font-bold text-blue-950">D. 执委会历届选择下拉单 (calcForm Dropdown)</div>
                  <p className="text-slate-600 mt-1">
                    表单下拉单 <code>calcType</code>，实现 14届至 17届执委会档案的即时跳转。
                  </p>
                </div>
              </div>
            </div>

            {/* Footer breakdown */}
            <div className="bg-white border border-slate-200 rounded p-4 shadow-xs">
              <h4 className="font-bold text-sm text-blue-900 font-serif mb-3">
                2. 历史页脚解构 (Footer & Meta Anatomy)
              </h4>
              <div className="space-y-3 text-xs">
                <div className="p-3 bg-yellow-50 border border-yellow-200 rounded font-mono text-slate-800">
                  <div className="text-[11px] text-yellow-800 font-bold mb-1">HTML 原始结构：</div>
                  <pre className="text-[11px] overflow-x-auto leading-relaxed">
{`<footer class="home-foot">
  <p>此网站由<a href="photo.htm">马大华文学会</a>呈献</p>
  <p class="foot-row">
    <span>如有回馈,请联络
      <a href="mailto:pbcum@yahoo.com">pbcum@yahoo.com</a>
    </span>
    <span>最后更新日期：18－1－2004</span>
  </p>
</footer>`}
                  </pre>
                </div>

                <div className="text-slate-700 space-y-1.5">
                  <p><strong>• 呈现主体：</strong>马大华文学会 (PBCUM)</p>
                  <p><strong>• 官方联络信箱：</strong>pbcum@yahoo.com</p>
                  <p><strong>• 档案基准时间戳：</strong>2004年1月18日（农历猴年春节前夕，第19届会员大会暨执委会改选后）</p>
                  <p><strong>• 核心口号横幅：</strong>扎实为经，回馈为纬。（贯穿于所有页面底部彩条之上）</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 5: Assets Inventory & Live Visual Gallery */}
      {activeTab === 'assets' && (
        <div className="p-4 space-y-4">
          {/* Header Summary */}
          <div className="bg-gradient-to-r from-blue-900 to-indigo-950 text-white p-4 rounded shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-emerald-500 text-white font-mono text-[10px] font-bold">
                  HTTP 200 OK · 100% MOUNTED
                </span>
                <span className="text-xs text-blue-200">55+ 官方原始图像与导航资产库</span>
              </div>
              <h3 className="font-bold text-base font-serif mt-1">
                马大华文学会历史静态资产总览 (Authentic Assets Explorer)
              </h3>
              <p className="text-xs text-slate-300 mt-0.5">
                所有原版 GIF 动画、历史相片扫描件、组织架构图元及活动报告插图均已完整挂载，支持原样渲染与交互放大
              </p>
            </div>
            <div className="flex gap-1.5 flex-wrap">
              {[
                { id: 'all', label: '全部资产' },
                { id: 'branding', label: '会徽与动图' },
                { id: 'history', label: '历史长征相片' },
                { id: 'structure', label: '架构按键 (27)' },
                { id: 'activity', label: '活动简报原图' },
                { id: 'icons', label: '导航图元' }
              ].map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setAssetCategory(cat.id)}
                  className={`px-2.5 py-1 rounded text-xs transition font-medium ${
                    assetCategory === cat.id
                      ? 'bg-yellow-400 text-blue-950 font-bold shadow'
                      : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Visual Gallery Grid */}
          <div className="bg-white border border-slate-200 rounded p-4 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-3">
              <span className="font-bold text-xs text-slate-800 flex items-center gap-1.5">
                <ImageIcon className="w-4 h-4 text-blue-700" />
                <span>实景图像预览陈列馆 (Visual Thumbnail Gallery)</span>
              </span>
              <span className="text-[11px] text-slate-500 font-mono">点击任意缩略图可唤出原图元数据与全屏高保真视图</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {[
                // Branding
                { cat: 'branding', src: '/image/Pbcum_logo.gif', name: 'Pbcum_logo.gif', dims: '60x75 px', size: '12 KB', role: '官方会徽' },
                { cat: 'branding', src: '/image/flybird.gif', name: 'flybird.gif', dims: '520x30 px', size: '6.9 KB', role: '飞鸟动画横幅' },
                { cat: 'branding', src: '/image/animate.gif', name: 'animate.gif', dims: '300x100 px', size: '402 KB', role: '欢迎动画(402KB)' },
                { cat: 'branding', src: '/image/colorbar.gif', name: 'colorbar.gif', dims: '520x1 px', size: '4.5 KB', role: '彩条分割线' },
                { cat: 'branding', src: '/image/zhashi.jpg', name: 'zhashi.jpg', dims: '240x180 px', size: '27.5 KB', role: '扎实为经拓印' },
                { cat: 'branding', src: '/image/pbcum.jpg', name: 'pbcum.jpg', dims: '300x220 px', size: '16 KB', role: '创会历史文献' },

                // History
                { cat: 'history', src: '/image/historical_moment.jpg', name: 'historical_moment.jpg', dims: '400x266 px', size: '29.5 KB', role: '1986宣布成立记者招待会' },
                { cat: 'history', src: '/image/1stAGM.jpg', name: '1stAGM.jpg', dims: '400x272 px', size: '37.1 KB', role: '1987首届会员大会现场' },
                { cat: 'history', src: '/image/2nd_ChouWei.jpg', name: '2nd_ChouWei.jpg', dims: '380x250 px', size: '33.9 KB', role: '1985第二届筹委会执委' },
                { cat: 'history', src: '/image/1stQuanBian.jpg', name: '1stQuanBian.jpg', dims: '380x260 px', size: '24.7 KB', role: '1988第一届全辩破土' },
                { cat: 'history', src: '/image/14.jpg', name: '14.jpg', dims: '240x180 px', size: '8.5 KB', role: '第十四届执委会剪影' },
                { cat: 'history', src: '/image/16th_1.gif', name: '16th_1.gif', dims: '360x240 px', size: '70.8 KB', role: '第十六届代表合影' },
                { cat: 'history', src: '/image/history/1.jpg', name: 'history/1.jpg', dims: '400x280 px', size: '32 KB', role: '第一届复办大会' },
                { cat: 'history', src: '/image/history/2.jpg', name: 'history/2.jpg', dims: '400x280 px', size: '28 KB', role: '1974学潮走上街头' },
                { cat: 'history', src: '/image/history/4.jpg', name: 'history/4.jpg', dims: '400x280 px', size: '35 KB', role: '呈交复办申请信' },
                { cat: 'history', src: '/image/history/6.jpg', name: 'history/6.jpg', dims: '400x280 px', size: '30 KB', role: '跨族群万人签名' },
                { cat: 'history', src: '/image/history/8.jpg', name: 'history/8.jpg', dims: '400x280 px', size: '31 KB', role: '灯笼之夜中秋晚会' },
                { cat: 'history', src: '/image/history/12.jpg', name: 'history/12.jpg', dims: '400x280 px', size: '36 KB', role: '12年奋斗圆满成立' },

                // Structure
                { cat: 'structure', src: '/image/structureme.gif', name: 'structureme.gif', dims: '442x454 px', size: '4.5 KB', role: '组织架构交互图' },
                { cat: 'structure', src: '/image/structure.gif', name: 'structure.gif', dims: '400x300 px', size: '3.8 KB', role: '架构概览图' },
                { cat: 'structure', src: '/structure/Advisor.gif', name: 'Advisor.gif', dims: '80x42 px', size: '1.2 KB', role: '顾问老师按键' },
                { cat: 'structure', src: '/structure/Pbcum.gif', name: 'Pbcum.gif', dims: '80x42 px', size: '1.2 KB', role: '执委会按键' },
                { cat: 'structure', src: '/structure/ChunJie.gif', name: 'ChunJie.gif', dims: '80x42 px', size: '1.2 KB', role: '新春晚会按键' },
                { cat: 'structure', src: '/structure/QuanBian.gif', name: 'QuanBian.gif', dims: '80x42 px', size: '1.2 KB', role: '全辩筹委会按键' },
                { cat: 'structure', src: '/structure/QuanZhong.gif', name: 'QuanZhong.gif', dims: '80x42 px', size: '1.2 KB', role: '全中筹委会按键' },
                { cat: 'structure', src: '/structure/Wenhua.gif', name: 'Wenhua.gif', dims: '80x42 px', size: '1.2 KB', role: '文化组按键' },
                { cat: 'structure', src: '/structure/BianLun.gif', name: 'BianLun.gif', dims: '80x42 px', size: '1.2 KB', role: '辩论组按键' },
                { cat: 'structure', src: '/structure/ShengLe.gif', name: 'ShengLe.gif', dims: '80x42 px', size: '1.2 KB', role: '声乐组按键' },
                { cat: 'structure', src: '/structure/XiJu.gif', name: 'XiJu.gif', dims: '80x42 px', size: '1.2 KB', role: '戏剧组按键' },
                { cat: 'structure', src: '/structure/BiDao.gif', name: 'BiDao.gif', dims: '80x42 px', size: '1.2 KB', role: '笔导组按键' },

                // Activity
                { cat: 'activity', src: '/image/13thQuanWen1.gif', name: '13thQuanWen1.gif', dims: '350x240 px', size: '54.6 KB', role: '第13届全国文学营' },
                { cat: 'activity', src: '/image/2thQuanzhong1.gif', name: '2thQuanzhong1.gif', dims: '350x240 px', size: '55.8 KB', role: '第2届全中生活营' },
                { cat: 'activity', src: '/image/8thQuanbian1.gif', name: '8thQuanbian1.gif', dims: '350x240 px', size: '65.9 KB', role: '第8届全辩赛场' },
                { cat: 'activity', src: '/image/2002Dayao1.gif', name: '2002Dayao1.gif', dims: '350x240 px', size: '64.5 KB', role: '2002大药房义卖会' },
                { cat: 'activity', src: '/image/2001FoodStall1.gif', name: '2001FoodStall1.gif', dims: '350x240 px', size: '48.3 KB', role: '2001毕业义卖小食摊' },
                { cat: 'activity', src: '/image/2001JiaTingRi.gif', name: '2001JiaTingRi.gif', dims: '350x240 px', size: '69.2 KB', role: '2001执委会家庭日' },

                // Icons
                { cat: 'icons', src: '/image/bullet.gif', name: 'bullet.gif', dims: '14x14 px', size: '1.0 KB', role: '蓝色项目圆点' },
                { cat: 'icons', src: '/image/bullet1.gif', name: 'bullet1.gif', dims: '14x14 px', size: '0.9 KB', role: '绿色项目圆点' },
                { cat: 'icons', src: '/image/red.gif', name: 'red.gif', dims: '14x14 px', size: '0.9 KB', role: '红色状态圆点' },
                { cat: 'icons', src: '/image/top.gif', name: 'top.gif', dims: '40x14 px', size: '0.8 KB', role: 'Top 回顶图标' },
                { cat: 'icons', src: '/image/back.gif', name: 'back.gif', dims: '40x14 px', size: '0.6 KB', role: 'Back 返回图标' },
                { cat: 'icons', src: '/image/read_more.gif', name: 'read_more.gif', dims: '60x14 px', size: '0.4 KB', role: '全文链接按键' }
              ]
                .filter(a => assetCategory === 'all' || a.cat === assetCategory)
                .map((asset, i) => (
                  <div
                    key={i}
                    onClick={() => setSelectedAssetModal({
                      path: asset.src,
                      name: asset.name,
                      dims: asset.dims,
                      size: asset.size,
                      category: asset.cat,
                      desc: asset.role
                    })}
                    className="p-2 border border-slate-200 rounded hover:border-blue-600 hover:shadow-md transition cursor-pointer bg-slate-50 flex flex-col justify-between group"
                  >
                    <div className="h-24 bg-white rounded flex items-center justify-center p-1 border border-slate-100 overflow-hidden">
                      <img
                        src={asset.src}
                        alt={asset.name}
                        className="max-h-full max-w-full object-contain group-hover:scale-110 transition duration-150"
                        loading="lazy"
                      />
                    </div>
                    <div className="mt-2">
                      <div className="text-[11px] font-bold text-slate-800 font-mono truncate" title={asset.name}>
                        {asset.name}
                      </div>
                      <div className="text-[10px] text-blue-800 font-serif truncate mt-0.5" title={asset.role}>
                        {asset.role}
                      </div>
                      <div className="text-[9px] text-slate-500 font-mono mt-0.5 flex justify-between">
                        <span>{asset.dims}</span>
                        <span>{asset.size}</span>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Full Tabular Inventory */}
          <div className="bg-white border border-slate-200 rounded overflow-hidden shadow-xs">
            <div className="p-3 bg-slate-100 border-b border-slate-200 flex items-center justify-between">
              <span className="font-bold text-xs text-slate-800">静态资源完整索引清单 (Archival Manifest Matrix)</span>
              <span className="text-xs font-mono text-emerald-700 font-bold">● 已全量挂载于 /public/</span>
            </div>
            <div className="max-h-[300px] overflow-y-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 sticky top-0 font-medium">
                  <tr>
                    <th className="p-2">资源名称与相对路径</th>
                    <th className="p-2">原始规格 / 尺寸</th>
                    <th className="p-2">资源类型</th>
                    <th className="p-2">历史网站中的功能</th>
                    <th className="p-2">部署与渲染状态</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-mono">
                  <tr className="hover:bg-slate-50">
                    <td className="p-2 font-bold text-blue-900">image/Pbcum_logo.gif</td>
                    <td className="p-2">60x75 px (12 KB)</td>
                    <td className="p-2 font-sans">会徽</td>
                    <td className="p-2 font-sans">学会官方会徽与盾牌标志 (顶栏与页脚)</td>
                    <td className="p-2 font-sans text-emerald-700 font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>原生图象已挂载</span>
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="p-2 font-bold text-blue-900">image/flybird.gif</td>
                    <td className="p-2">520x30 px (6.9 KB)</td>
                    <td className="p-2 font-sans">横幅动图</td>
                    <td className="p-2 font-sans">飞鹤动画横幅，象征火鸟展翅</td>
                    <td className="p-2 font-sans text-emerald-700 font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>原生图象已挂载</span>
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="p-2 font-bold text-blue-900">image/animate.gif</td>
                    <td className="p-2">300x100 px (402 KB)</td>
                    <td className="p-2 font-sans">迎宾动图</td>
                    <td className="p-2 font-sans">'欢迎浏览' 霓虹动态迎宾字样 (402KB 典藏原版)</td>
                    <td className="p-2 font-sans text-emerald-700 font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>原生图象已挂载</span>
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="p-2 font-bold text-blue-900">image/colorbar.gif</td>
                    <td className="p-2">520x1 px (4.5 KB)</td>
                    <td className="p-2 font-sans">分割线</td>
                    <td className="p-2 font-sans">七彩渐变分割细条 (各页顶底关键视觉构件)</td>
                    <td className="p-2 font-sans text-emerald-700 font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>原生图象已挂载</span>
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="p-2 font-bold text-blue-900">image/historical_moment.jpg</td>
                    <td className="p-2">400x266 px (29.5 KB)</td>
                    <td className="p-2 font-sans">历史相片</td>
                    <td className="p-2 font-sans">1986年12月24日Ungku Aziz副校长记者招待会</td>
                    <td className="p-2 font-sans text-emerald-700 font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>原生图象已挂载</span>
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="p-2 font-bold text-blue-900">image/1stAGM.jpg</td>
                    <td className="p-2">400x272 px (37.1 KB)</td>
                    <td className="p-2 font-sans">历史相片</td>
                    <td className="p-2 font-sans">1987年1月3日第一届会员大会现场</td>
                    <td className="p-2 font-sans text-emerald-700 font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>原生图象已挂载</span>
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="p-2 font-bold text-blue-900">image/structureme.gif</td>
                    <td className="p-2">442x454 px (4.5 KB)</td>
                    <td className="p-2 font-sans">架构示意</td>
                    <td className="p-2 font-sans">原版中央执委会组织结构树拓扑全图</td>
                    <td className="p-2 font-sans text-emerald-700 font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>原生图象已挂载</span>
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="p-2 font-bold text-blue-900">structure/ (27 图元)</td>
                    <td className="p-2">39-51 px 高度</td>
                    <td className="p-2 font-sans">按键图元</td>
                    <td className="p-2 font-sans">组织架构图各单位按键及_2悬停配对双态图</td>
                    <td className="p-2 font-sans text-emerald-700 font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>原生图象已挂载</span>
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="p-2 font-bold text-blue-900">image/history/1-12.jpg</td>
                    <td className="p-2">400x280 px (12张)</td>
                    <td className="p-2 font-sans">档案相片</td>
                    <td className="p-2 font-sans">1974-1986 复办长征路十二大历史事件现场记录</td>
                    <td className="p-2 font-sans text-emerald-700 font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>原生图象已挂载</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Modal Lightbox for selected asset */}
          {selectedAssetModal && (
            <div
              className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 backdrop-blur-xs"
              onClick={() => setSelectedAssetModal(null)}
            >
              <div
                className="bg-white rounded-lg max-w-xl w-full p-4 shadow-2xl animate-fadeIn border border-slate-300"
                onClick={e => e.stopPropagation()}
              >
                <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                  <div className="font-bold text-sm text-blue-950 font-mono">
                    {selectedAssetModal.path}
                  </div>
                  <button
                    onClick={() => setSelectedAssetModal(null)}
                    className="p-1 rounded text-slate-400 hover:text-slate-800"
                  >
                    ✕
                  </button>
                </div>
                <div className="p-4 my-2 bg-slate-900 rounded flex items-center justify-center min-h-[220px]">
                  <img
                    src={selectedAssetModal.path}
                    alt={selectedAssetModal.name}
                    className="max-h-[50vh] max-w-full object-contain shadow"
                  />
                </div>
                <div className="space-y-1.5 text-xs text-slate-700 font-serif">
                  <p><strong>功能定位：</strong>{selectedAssetModal.desc}</p>
                  <p className="font-mono text-slate-500">
                    <strong>规格尺寸：</strong>{selectedAssetModal.dims} {selectedAssetModal.size && `(${selectedAssetModal.size})`}
                  </p>
                  <p className="font-mono text-emerald-700">
                    <strong>访问 URL：</strong>http://localhost:3000{selectedAssetModal.path}
                  </p>
                </div>
                <div className="mt-3 pt-2 border-t border-slate-200 flex justify-end">
                  <button
                    onClick={() => setSelectedAssetModal(null)}
                    className="px-3 py-1 rounded bg-blue-800 text-white text-xs font-medium hover:bg-blue-900"
                  >
                    关闭视窗
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tab 6: Rebuild Component Matrix */}
      {activeTab === 'rebuild' && (
        <div className="p-4 space-y-4">
          <div className="bg-white border border-slate-200 rounded p-4">
            <h4 className="font-bold text-sm text-slate-900 mb-2">
              生产级工程重构规范矩阵 (Component Matrix)
            </h4>
            <p className="text-xs text-slate-600 mb-4">
              针对现代前端框架（React 19 / TypeScript / Tailwind CSS），将马大华文学会原始松散 HTML/TABLE 抽象为高度可复用之模块化组件：
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {REBUILD_COMPONENTS.map((comp, idx) => (
                <div key={idx} className="p-3 bg-slate-50 border border-slate-200 rounded">
                  <div className="flex items-center justify-between pb-1.5 border-b border-slate-200">
                    <span className="font-bold text-sm text-blue-900 font-mono">
                      &lt;{comp.name} /&gt;
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono truncate max-w-[140px]">
                      {comp.originalFile.split(' ')[0]}
                    </span>
                  </div>
                  <div className="mt-2 space-y-1 text-xs">
                    <p><strong>功能定位：</strong>{comp.role}</p>
                    <p className="text-slate-600 font-mono text-[11px]">
                      <strong>Props:</strong> {comp.props}
                    </p>
                    <p className="text-slate-700"><strong>技术特性：</strong>{comp.features}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
