import React, { useState } from 'react';
import { Network, CheckCircle2 } from 'lucide-react';

interface OrgChartProps {
  onNavigateToUnit?: (unitId: string) => void;
  onNavigateToExco?: () => void;
}

export const OrgChartInteractive: React.FC<OrgChartProps> = ({
  onNavigateToUnit,
  onNavigateToExco
}) => {
  const [activeNode, setActiveNode] = useState<string | null>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'retro' | 'vector'>('retro');

  const nodeDetails: Record<string, {
    title: string;
    chineseTitle: string;
    nature: string;
    description: string;
    constitutionalBasis: string;
    targetPage?: string;
  }> = {
    AGM: {
      title: "Annual General Meeting",
      chineseTitle: "常年会员大会",
      nature: "学会最高权力机构 (Supreme Governing Body)",
      description: "由全体注册有效会员组成，法定人数为100人。负责制定及修改学会章程、检讨年度会务财务，并选举产生新一届中央执行委员会。",
      constitutionalBasis: "章程第4章：每年学年结束前召开，具绝对决议权。"
    },
    Advisor: {
      title: "Faculty Advisors",
      chineseTitle: "顾问老师",
      nature: "校方师长咨询辅导体系 (Advisory & Guidance)",
      description: "由马大校方及文学院中文系资深教授出任（如周添健代顾问老师、谢爱萍博士等），协助就大专法令、学务申请及学术规范提供指引。",
      constitutionalBasis: "章程第8章：提供学术与行政咨询，不干涉日常自治决议。"
    },
    ME: {
      title: "Majlis Eksekutif (Executive Committee)",
      chineseTitle: "执委会 (中央执行委员会)",
      nature: "常设最高行政执行中枢 (Executive Council)",
      description: "由会长、内/外副会长、总秘书、总财政、六大小组组长及咨询委员共15人组成，全面推展会务及落实各项方针计划。",
      constitutionalBasis: "章程第5章：对常年会员大会负责，每周召开执委会例会。",
      targetPage: "exco"
    },
    ZiXunWeiYuanHui: {
      title: "Consultative & Research Committee",
      chineseTitle: "咨询研究委员会",
      nature: "辅助政策智囊机构 (Policy Advisory Arm)",
      description: "定期列席执委会会议，协助执委会检讨及拟定学会中长期方针与活动重点，并就校内外交流难题提供专业咨询。",
      constitutionalBasis: "章程第6章：受执委会交托针对关键课题进行调查与研究。",
      targetPage: "unit2"
    },
    JiLuWeiYuanHui: {
      title: "Disciplinary Committee",
      chineseTitle: "纪律委员会",
      nature: "宪章与准则监管仲裁机关 (Arbitration Body)",
      description: "确保章程、纪律条规及学会各项立场受到严格遵从，有权就违反章程之个人或单位进行纪律聆讯与处分。",
      constitutionalBasis: "章程第7章条款23：独立执行纪律裁决，维护学会公信力。",
      targetPage: "unit2"
    },
    XueJiTuan: {
      title: "Student Reporters Corps",
      chineseTitle: "学记团 (学会记者团)",
      nature: "内部媒体与舆论平台 (Media & Editorial Arm)",
      description: "负责采写及出版《马大华文学会会讯》，举办专题专访、时事评论与大专生心声报道，弘扬批判独立思考精神。",
      constitutionalBasis: "第11届执委会创立，出版9期以上纸本会讯。",
      targetPage: "unit2"
    },
    WaiWuChu: {
      title: "External Affairs Division",
      chineseTitle: "外务处",
      nature: "联络外交与公关窗口 (External Relations)",
      description: "协助外务副主席统筹对外公事应酬、各校华文学会交流联合会、校友及社会赞助团体联络。",
      constitutionalBasis: "第15届执委会（2000年）正式改制成立。",
      targetPage: "unit2"
    },
    MiShuChu: {
      title: "Secretariat Division",
      chineseTitle: "秘书处",
      nature: "行政总枢纽与档案中心 (Central Archive)",
      description: "实行学会文件保存管理系统，编纂常年报告书、会议记录规范化，统筹各小组秘书处联席会议。",
      constitutionalBasis: "章程第5章第18条明确其行政总汇功能。",
      targetPage: "unit2"
    },
    CaiWuChu: {
      title: "Finance Division",
      chineseTitle: "财务处",
      nature: "财政监督与基金筹募 (Treasury & Finance)",
      description: "前身为1989年成立之发行部，负责管理公款账册、活动预算审查、出版物义卖及华文学会活动基金库。",
      constitutionalBasis: "1991年由发行部正式更名为财务处。",
      targetPage: "unit2"
    },
    unit: {
      title: "Student Activity Units (6 Sub-Units)",
      chineseTitle: "学会各小组",
      nature: "六大核心基层兴趣培养组 (Core Activity Arms)",
      description: "辩论组、华文班、社醒组、文化组（书法/茶艺/篆刻/戏剧）、相声组、摇篮手（原创歌曲音乐创作）。",
      constitutionalBasis: "各小组组长为执委会当然委员（Ex-officio members）。",
      targetPage: "unit"
    },
    ChouWeiHui: {
      title: "Special Project Working Committees",
      chineseTitle: "各特别活动筹委会",
      nature: "专案性大型活动执行队伍 (Ad-hoc Committees)",
      description: "主办全国大专辩论会（全辩）、全国中学生生活营（全中）、摇篮手大摇演绎会、迎新周等特别活动之筹委会组织。",
      constitutionalBasis: "由执委会根据年度工作大纲委任特委会主席及团队。",
      targetPage: "activity"
    }
  };

  const selected = activeNode ? nodeDetails[activeNode] : null;

  const getImgSrc = (baseName: string) => {
    const isHovered = hoveredNode === baseName;
    const isSelected = activeNode === baseName;
    if (isHovered || isSelected) {
      return `/structure/${baseName}_2.gif`;
    }
    return `/structure/${baseName}.gif`;
  };

  return (
    <div className="w-full bg-white border border-blue-200 rounded p-3 my-2 select-none">
      {/* Sub-Header & Switcher */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-2 mb-2 border-b border-blue-100">
        <div className="flex items-center gap-2">
          <Network className="w-4 h-4 text-blue-800" />
          <span className="font-bold text-xs text-blue-900 font-serif">
            学会组织架构图解 (PBCUM Organizational Structure)
          </span>
        </div>
        <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded text-[11px]">
          <button
            onClick={() => setViewMode('retro')}
            className={`px-2.5 py-1 rounded transition-colors ${
              viewMode === 'retro' 
                ? 'bg-blue-800 text-white font-medium shadow-sm' 
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            原版架构图 (Authentic GIFs)
          </button>
          <button
            onClick={() => setViewMode('vector')}
            className={`px-2.5 py-1 rounded transition-colors ${
              viewMode === 'vector' 
                ? 'bg-blue-800 text-white font-medium shadow-sm' 
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            现代矢量树 (Vector Grid)
          </button>
        </div>
      </div>

      <p className="text-[11px] text-blue-700 mb-2 text-center">
        💡 您可尝试点击下列架构表中的各单位按钮，查看其职能并跳转直属页面。
      </p>

      {viewMode === 'retro' ? (
        /* Authentic Web 1.0 GIF Table Structure matching structure_a4f3616a.htm */
        <div className="overflow-x-auto flex justify-center py-2">
          <table className="border-0 p-0 border-spacing-0 leading-none select-none">
            <tbody>
              {/* Row 1: Advisor, AGM -> ME, ZiXunWeiYuanHui */}
              <tr>
                <td className="w-[87px] h-[112px] align-bottom p-0">
                  <div
                    onClick={() => setActiveNode('Advisor')}
                    onMouseEnter={() => setHoveredNode('Advisor')}
                    onMouseLeave={() => setHoveredNode(null)}
                    className="cursor-pointer"
                  >
                    <img 
                      src={getImgSrc('Advisor')} 
                      alt="顾问老师" 
                      width={87} 
                      height={39} 
                      className="block"
                    />
                  </div>
                </td>

                <td className="w-[205px] h-[112px] align-bottom p-0">
                  <div className="flex items-center">
                    <img src="/structure/BlankBlock.gif" alt="" width={46} height={39} className="block" />
                    <div
                      onClick={() => setActiveNode('AGM')}
                      onMouseEnter={() => setHoveredNode('AGM')}
                      onMouseLeave={() => setHoveredNode(null)}
                      className="cursor-pointer"
                    >
                      <img 
                        src={getImgSrc('AGM')} 
                        alt="常年会员大会" 
                        width={98} 
                        height={39} 
                        className="block"
                      />
                    </div>
                    <img src="/structure/BlankBlock.gif" alt="" width={60} height={39} className="block" />
                  </div>
                  <img src="/structure/VerticalFrame1.gif" alt="" width={203} height={34} className="block" />
                  <div className="flex items-center">
                    <img src="/structure/HorizontalFrame1.gif" alt="" width={47} height={39} className="block" />
                    <div
                      onClick={() => {
                        setActiveNode('ME');
                        if (onNavigateToExco) onNavigateToExco();
                      }}
                      onMouseEnter={() => setHoveredNode('ME')}
                      onMouseLeave={() => setHoveredNode(null)}
                      className="cursor-pointer"
                    >
                      <img 
                        src={getImgSrc('ME')} 
                        alt="执委会" 
                        width={98} 
                        height={39} 
                        className="block"
                      />
                    </div>
                    <img src="/structure/HorizontalFrame2.gif" alt="" width={59} height={39} className="block" />
                  </div>
                </td>

                <td className="w-[100px] h-[112px] align-middle p-0">
                  <div
                    onClick={() => setActiveNode('ZiXunWeiYuanHui')}
                    onMouseEnter={() => setHoveredNode('ZiXunWeiYuanHui')}
                    onMouseLeave={() => setHoveredNode(null)}
                    className="cursor-pointer"
                  >
                    <img 
                      src={getImgSrc('ZiXunWeiYuanHui')} 
                      alt="咨询研究委员会" 
                      width={87} 
                      height={51} 
                      className="block"
                    />
                  </div>
                </td>
              </tr>

              {/* Row 2: Left (External, Sec, Fin), Center (VerticalFrame2), Right (Disc, Rep) */}
              <tr>
                <td className="w-[87px] h-[210px] align-top p-0">
                  <img src="/structure/BlankBlock.gif" alt="" width={87} height={14} className="block" />
                  <div
                    onClick={() => setActiveNode('WaiWuChu')}
                    onMouseEnter={() => setHoveredNode('WaiWuChu')}
                    onMouseLeave={() => setHoveredNode(null)}
                    className="cursor-pointer"
                  >
                    <img src={getImgSrc('WaiWuChu')} alt="外务处" width={87} height={39} className="block" />
                  </div>
                  <img src="/structure/BlankBlock.gif" alt="" width={87} height={20} className="block" />
                  <div
                    onClick={() => setActiveNode('MiShuChu')}
                    onMouseEnter={() => setHoveredNode('MiShuChu')}
                    onMouseLeave={() => setHoveredNode(null)}
                    className="cursor-pointer"
                  >
                    <img src={getImgSrc('MiShuChu')} alt="秘书处" width={87} height={39} className="block" />
                  </div>
                  <img src="/structure/BlankBlock.gif" alt="" width={87} height={20} className="block" />
                  <div
                    onClick={() => setActiveNode('CaiWuChu')}
                    onMouseEnter={() => setHoveredNode('CaiWuChu')}
                    onMouseLeave={() => setHoveredNode(null)}
                    className="cursor-pointer"
                  >
                    <img src={getImgSrc('CaiWuChu')} alt="财务处" width={87} height={39} className="block" />
                  </div>
                </td>

                <td className="w-[205px] h-[210px] align-top p-0">
                  <img src="/structure/VerticalFrame2.gif" alt="" width={203} height={210} className="block" />
                </td>

                <td className="w-[100px] h-[210px] align-top p-0">
                  <img src="/structure/BlankBlock.gif" alt="" width={99} height={8} className="block" />
                  <div
                    onClick={() => setActiveNode('JiLuWeiYuanHui')}
                    onMouseEnter={() => setHoveredNode('JiLuWeiYuanHui')}
                    onMouseLeave={() => setHoveredNode(null)}
                    className="cursor-pointer"
                  >
                    <img src={getImgSrc('JiLuWeiYuanHui')} alt="纪律委员会" width={99} height={39} className="block" />
                  </div>
                  <img src="/structure/BlankBlock.gif" alt="" width={99} height={30} className="block" />
                  <div
                    onClick={() => setActiveNode('XueJiTuan')}
                    onMouseEnter={() => setHoveredNode('XueJiTuan')}
                    onMouseLeave={() => setHoveredNode(null)}
                    className="cursor-pointer"
                  >
                    <img src={getImgSrc('XueJiTuan')} alt="学记团" width={99} height={39} className="block" />
                  </div>
                </td>
              </tr>

              {/* Row 3: Bottom (unit, ChouWeiHui) */}
              <tr>
                <td colSpan={3} className="h-[39px] p-0">
                  <div className="flex items-center">
                    <img src="/structure/BlankBlock.gif" alt="" width={48} height={39} className="block" />
                    <div
                      onClick={() => {
                        setActiveNode('unit');
                        if (onNavigateToUnit) onNavigateToUnit('bianlunzu');
                      }}
                      onMouseEnter={() => setHoveredNode('unit')}
                      onMouseLeave={() => setHoveredNode(null)}
                      className="cursor-pointer"
                    >
                      <img src={getImgSrc('unit')} alt="学会各小组" width={111} height={39} className="block" />
                    </div>
                    <img src="/structure/BlankBlock.gif" alt="" width={47} height={39} className="block" />
                    <div
                      onClick={() => setActiveNode('ChouWeiHui')}
                      onMouseEnter={() => setHoveredNode('ChouWeiHui')}
                      onMouseLeave={() => setHoveredNode(null)}
                      className="cursor-pointer"
                    >
                      <img src={getImgSrc('ChouWeiHui')} alt="特别活动筹委会" width={135} height={39} className="block" />
                    </div>
                    <img src="/structure/BlankBlock.gif" alt="" width={50} height={39} className="block" />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      ) : (
        /* Vector interactive tree diagram */
        <div className="py-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {Object.entries(nodeDetails).map(([key, item]) => {
              const isSelected = activeNode === key;
              return (
                <div
                  key={key}
                  onClick={() => setActiveNode(key)}
                  className={`p-3 rounded border cursor-pointer transition-all ${
                    isSelected 
                      ? 'border-blue-600 bg-blue-50/70 shadow-sm ring-1 ring-blue-500' 
                      : 'border-slate-200 bg-white hover:border-blue-300 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-bold text-sm text-blue-900 font-serif">
                        {item.chineseTitle}
                      </h4>
                      <p className="text-[11px] text-slate-500">{item.title}</p>
                    </div>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-100 text-blue-800 font-mono">
                      {key}
                    </span>
                  </div>
                  <p className="text-xs text-slate-700 mt-2 line-clamp-2">
                    {item.nature}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Selected Node Details Drawer */}
      {selected && (
        <div className="mt-3 p-3 bg-yellow-50 border border-yellow-300 rounded text-xs text-slate-800 animate-fadeIn">
          <div className="flex items-center justify-between pb-1.5 border-b border-yellow-200 mb-1.5">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span className="font-bold text-sm text-blue-950">
                {selected.chineseTitle} ({selected.title})
              </span>
            </div>
            {selected.targetPage && (
              <span className="text-[10px] text-blue-700 font-medium bg-white px-2 py-0.5 rounded border border-yellow-300">
                直属页面: {selected.targetPage}.htm
              </span>
            )}
          </div>

          <div className="space-y-1 text-slate-700 leading-relaxed">
            <p><strong>法定地位：</strong>{selected.nature}</p>
            <p><strong>核心职责：</strong>{selected.description}</p>
            <p className="text-slate-600"><strong>宪章依据：</strong>{selected.constitutionalBasis}</p>
          </div>
        </div>
      )}
    </div>
  );
};
