import React, { useState } from 'react';
import { 
  FlybirdBanner, 
  PbcumLogo, 
  WelcomeGraphic, 
  ColorBarDivider,
  SocietyAnthemSynthesizer 
} from './HeaderDecorations';
import { OrgChartInteractive } from './OrgChartInteractive';
import { 
  EXCO_18TH, 
  EXCO_19TH,
  EXCO_17TH,
  EXCO_16TH,
  EXCO_15TH,
  EXCO_14TH,
  UNITS_DATA, 
  HISTORY_CHAPTERS, 
  TERMS_HISTORY,
  SOCIETY_ANTHEM, 
  BULLETIN_ARTICLES, 
  LITERATURE_LIST,
  SPECIAL_ACTIVITIES,
  BulletinArticle,
  LiteratureItem,
  ExcoMember
} from '../data/pbcumData';
import { 
  Home, 
  BookOpen, 
  History as HistoryIcon, 
  Network, 
  Users, 
  Grid, 
  Calendar, 
  Music, 
  Newspaper, 
  FileText, 
  Image as ImageIcon,
  ChevronRight,
  ArrowUp,
  X,
  ExternalLink,
  MessageSquare,
  Award
} from 'lucide-react';

interface PbcumSiteViewerProps {
  initialPage?: string;
  modernMode?: boolean;
}

export const PbcumSiteViewer: React.FC<PbcumSiteViewerProps> = ({
  initialPage = 'index',
  modernMode = false
}) => {
  const [currentPage, setCurrentPage] = useState<string>(initialPage);
  const [selectedExcoTerm, setSelectedExcoTerm] = useState<string>('18th');
  const [activeArticleModal, setActiveArticleModal] = useState<BulletinArticle | null>(null);
  const [activeDocModal, setActiveDocModal] = useState<LiteratureItem | null>(null);
  const [activeMemberModal, setActiveMemberModal] = useState<ExcoMember | null>(null);
  const [activePhilosophyModal, setActivePhilosophyModal] = useState<{ title: string; content: string } | null>(null);
  const [activePhotoLightbox, setActivePhotoLightbox] = useState<{ src: string; title: string; caption: string } | null>(null);
  const [activeActivityModal, setActiveActivityModal] = useState<{ title: string; year?: string; content: string; images?: { src: string; caption: string }[] } | null>(null);
  const [structureExcoViewMode, setStructureExcoViewMode] = useState<'authentic' | 'breakdown'>('authentic');
  const [guestbookOpen, setGuestbookOpen] = useState(false);
  const [guestbookMessages, setGuestbookMessages] = useState<Array<{ name: string; message: string; date: string }>>([
    { name: "张伟明 (1998年校友)", message: "重温当年的执委会岁月，看到会歌歌词依然热血沸腾！扎实为经，回馈为纬！", date: "2004-01-15" },
    { name: "李秀兰 (国大华文学会)", message: "预祝马大华文学会第19届新执委会会务昌隆，期待两校来年的全辩交流！", date: "2004-01-17" }
  ]);
  const [newName, setNewName] = useState('');
  const [newMessage, setNewMessage] = useState('');

  // 12 Authentic Historical Plates (matching history/1-12.jpg sequence)
  const historyPlates = [
    { id: 2, src: "/image/history/2.jpg", title: "1974年学潮与抗争", caption: "大专生走上街头捍卫华教权益与学术自由，随后国会发表白皮书勒令关闭马大华文学会。" },
    { id: 3, src: "/image/history/3.jpg", title: "低潮时期的沉寂与萌芽", caption: "1974至1979年间，同学们在校园各角落默默筹谋，酝酿复办的星火。" },
    { id: 4, src: "/image/history/4.jpg", title: "1979年踏上复办长征路", caption: "1979年12月17日呈交关闭五年后的第一份重新注册申请信。" },
    { id: 5, src: "/image/history/5.jpg", title: "筹委会会见马大副校长", caption: "筹委代表会晤马大副校长Ungku Aziz，商讨复办条件与大学章程。" },
    { id: 6, src: "/image/history/6.jpg", title: "跨族群校内万人签名运动", caption: "收集超过2,000名学生签名，其中华、巫、印各族同学踊跃联署，展现校园团结力量。" },
    { id: 7, src: "/image/history/7.jpg", title: "第二次签名运动狂潮", caption: "1983年签名狂潮横扫校园，2,316位跨源流大专生签下名字全力支持成立华文学会。" },
    { id: 1, src: "/image/history/1.jpg", title: "第一届筹委会常年大会", caption: "1984年8月4日在文学院F讲堂召开首届常年大会，逾200位同学聚首确定争取大纲。" },
    { id: 8, src: "/image/history/8.jpg", title: "灯笼之夜中秋文化晚会", caption: "克服重重限制首次获准举办中秋晚会与毕业典礼义卖摊位，奠定广泛群众基础。" },
    { id: 9, src: "/image/history/9.jpg", title: "第二届筹委会常年大会", caption: "1985年8月18日逾550位同学出席大会，表达坚决不移复办意志。" },
    { id: 10, src: "/image/history/10.jpg", title: "通过言路版向全国交代", caption: "何国忠执笔《风风雨雨说马大华文学会》刊登于《南洋商报》，打破黑箱传言。" },
    { id: 11, src: "/image/history/11.jpg", title: "千人第三次筹委会常年大会", caption: "1986年8月逾千名同学塞满文学院F座，成为马大创校以来最壮观的学生集会之一。" },
    { id: 12, src: "/image/history/12.jpg", title: "1986年12月24日历史性宣布成立", caption: "Ungku Aziz副校长在Rumah Universiti正式宣布华文学会成立，十二年漫长奋斗终获圆满！" }
  ];

  // Authentic special activities reports dataset with real images
  const activityReportsData: Record<string, {
    title: string;
    year: string;
    content: string;
    images: { src: string; caption: string }[];
  }> = {
    "yingxinzhou2002": {
      title: "2002/2003年度华文学会迎新周",
      year: "2002/2003",
      content: "马大华文学会于2002/2003新学年伊始举办隆重迎新周活动。设立六大小组巡回展示摊位、华文班报名、书法即席挥毫、相声逗趣表演与迎新晚会，热烈欢迎踏入马大校园的华裔及各族新生，播撒文化自觉与回馈社会的种子。",
      images: [{ src: "/activity/yinxinwanhui2002.jpg", caption: "2002/2003年度迎新晚会现场盛况" }]
    },
    "peixunying2002": {
      title: "2002年华文学会会员干部培训营",
      year: "2002/2003",
      content: "为期三天的干部培训营旨在提升新任骨干会员之组织协调、领导纪律与社会批判思考力。全体营员通过密集专题讨论、体能与心理拓展训练，深入体会‘扎实为经，回馈为纬’的核心精神。",
      images: [{ src: "/activity/peixunying2002.jpg", caption: "2002年华文学会会员培训营大合影" }]
    },
    "familygather2002": {
      title: "2002年华文学会家庭聚会",
      year: "2002/2003",
      content: "一年一度的华文学会大家庭聚会，凝聚历届老执委、离校学长姐与在籍会员。大家围坐重温当年争取复办的艰辛岁月，分享走出校园后在各个行业回馈社会的经验体会，温馨感人。",
      images: [{ src: "/activity/jiatingri2002.jpg", caption: "2002年华文学会家庭聚会现场其乐融融" }]
    },
    "dayao2002": {
      title: "2002年度摇篮手创作歌曲发表演绎会",
      year: "2001/2002",
      content: "摇篮手（音乐创作小组）年度旗舰演出‘大摇’在马大实验剧场隆重引爆。由大专生包揽作词、作曲、编曲与乐器伴奏，公开发表二十余首原创校园歌曲，展现青年炽热的生命感悟与音乐才华。",
      images: [
        { src: "/image/2002Dayao1.gif", caption: "2002大摇演绎会舞台灯光与乐队伴奏" },
        { src: "/image/2002Dayao2.gif", caption: "大摇歌手深情演绎原创校园歌曲" }
      ]
    },
    "8thquanbian": {
      title: "2001年第8届全国大专辩论会",
      year: "2001/2002",
      content: "由马大华文学会主办的全国大专辩论会（全辩）是大马最高荣誉的华语辩论殿堂。第八届全辩围绕全球化浪潮、宪政民主、教育体制与伦理思辨展开数十场激烈角逐，马大辩论队与各大专顶尖辨手奉献了极高水准的唇枪舌剑。",
      images: [{ src: "/image/8thQuanbian1.gif", caption: "第8届全辩获奖队伍代表与评委留影" }]
    },
    "13thquanwen": {
      title: "第13届全国大专文学奖",
      year: "2001/2002",
      content: "全国大专文学奖由马大华文学会发起，面向全马各大专院校在籍学生征集原创文学作品。本届设立小说、散文与新诗三大组别，收到数百篇参赛佳作，由资深作家及中文系教授严格评选，是马来西亚华文文学的重要摇篮。",
      images: [
        { src: "/image/13thQuanWen1.gif", caption: "第13届全国大专文学奖筹委会合影" },
        { src: "/image/13thQuanWen2.gif", caption: "全国文学奖颁奖典礼与得奖代表" }
      ]
    },
    "2thquanzhong": {
      title: "2001年第2届全国中学生生活营",
      year: "2001/2002",
      content: "面向全国各州华文独立中学与国民型中学的重点学生营会。中学生亲临马大文学院校园，体验大学学风，通过思辨工作坊、文化破冰和营火会，激发中学生关怀社会与坚持母语文化的自觉意识。",
      images: [
        { src: "/image/2thQuanzhong1.gif", caption: "全中营营员破冰分组与活动启航" },
        { src: "/image/2thQuanzhong2.gif", caption: "营员团队研讨与大专生活分享" },
        { src: "/image/2thQuanzhong3.gif", caption: "文化体验与肢体带动唱" },
        { src: "/image/2thQuanzhong4.gif", caption: "大专辅导员与营员亲密互动" },
        { src: "/image/2thQuanzhong5.gif", caption: "第2届全中营圆满结业大合照" }
      ]
    },
    "familygather2001": {
      title: "2001年华文学会家庭聚会",
      year: "2001/2002",
      content: "2001年度华文学会家庭聚会在马大校园举行，联络新老会员情谊，传承扎实会务优良传统。",
      images: [{ src: "/image/2001JiaTingRi.gif", caption: "2001年华文学会家庭日全员大合影" }]
    },
    "foodstall2001": {
      title: "2001年毕业典礼华文学会食物摊",
      year: "2001/2002",
      content: "配合马大年度毕业典礼，学会在东姑礼堂旁设立义卖食物摊位。全体执委与会员通宵达旦备料烹调、服务来宾，为学会筹集重要的常年运作基金，展现脚踏实地的奉献精神。",
      images: [
        { src: "/image/2001FoodStall1.gif", caption: "毕业典礼食物摊工委准备与义卖摊位" },
        { src: "/image/2001FoodStall2.gif", caption: "热心校友与家长赞助支持食物摊" }
      ]
    }
  };

  const navigateTo = (page: string) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePostGuestbook = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newMessage.trim()) return;
    setGuestbookMessages([
      { name: newName.trim(), message: newMessage.trim(), date: "2004-01-18" },
      ...guestbookMessages
    ]);
    setNewName('');
    setNewMessage('');
  };

  // Nav items list matching the exact 10 core sidebar items
  const sidebarNavItems = [
    { id: 'index', label: '主页', icon: Home },
    { id: 'philosophy', label: '学会思想', icon: BookOpen },
    { id: 'history', label: '学会历史', icon: HistoryIcon },
    { id: 'structure', label: '学会组织架构', icon: Network },
    { id: 'exco', label: '执委会名单', icon: Users },
    { id: 'unit', label: '学会各小组', icon: Grid },
    { id: 'activity', label: '特别活动', icon: Calendar },
    { id: 'song', label: '学会会歌', icon: Music },
    { id: 'bulletin', label: '学会会讯', icon: Newspaper },
    { id: 'wenxian', label: '学会文献', icon: FileText }
  ];

  /* ==========================================================
   * 1. HOMEPAGE VIEW (index.htm)
   * ========================================================== */
  const renderHomePage = () => (
    <div className="w-full flex justify-center py-2 px-1 select-none">
      <div className={`w-full max-w-[680px] bg-white border border-blue-900/60 shadow-lg p-3 ${modernMode ? 'rounded-xl' : 'rounded-none'}`}>
        {/* Header */}
        <header className="flex items-center justify-between gap-3 pb-2 border-b border-blue-900/40">
          <div className="flex-1">
            <h1 className="text-2xl sm:text-3xl font-bold font-serif text-blue-950 tracking-wider">
              马大华文学会
            </h1>
            <div className="mt-1">
              <FlybirdBanner width="100%" height={26} />
            </div>
          </div>
          <PbcumLogo size={58} className="shrink-0" />
        </header>

        {/* Band Section (Two Columns) */}
        <section className="grid grid-cols-1 sm:grid-cols-12 gap-3 my-3">
          {/* Menu Column (Left) */}
          <div className="sm:col-span-5 flex flex-col items-center">
            <WelcomeGraphic />
            <nav className="w-full mt-2 bg-gradient-to-b from-blue-900 to-blue-950 text-white rounded border border-blue-800 p-2 shadow-inner">
              <h2 className="text-xs font-bold text-center text-yellow-300 pb-1.5 border-b border-blue-700/60 tracking-widest font-serif">
                网 站 内 容
              </h2>
              <ul className="grid grid-cols-2 gap-1 pt-1.5 text-xs">
                <li><button onClick={() => navigateTo('philosophy')} className="w-full text-left py-1 px-1.5 rounded hover:bg-blue-800 hover:text-yellow-200 transition-colors">学会思想</button></li>
                <li><button onClick={() => navigateTo('history')} className="w-full text-left py-1 px-1.5 rounded hover:bg-blue-800 hover:text-yellow-200 transition-colors">学会历史</button></li>
                <li><button onClick={() => navigateTo('structure')} className="w-full text-left py-1 px-1.5 rounded hover:bg-blue-800 hover:text-yellow-200 transition-colors">学会组织架构</button></li>
                <li><button onClick={() => navigateTo('exco')} className="w-full text-left py-1 px-1.5 rounded hover:bg-blue-800 hover:text-yellow-200 transition-colors">执委会名单</button></li>
                <li><button onClick={() => navigateTo('unit')} className="w-full text-left py-1 px-1.5 rounded hover:bg-blue-800 hover:text-yellow-200 transition-colors">学会各小组</button></li>
                <li><button onClick={() => navigateTo('activity')} className="w-full text-left py-1 px-1.5 rounded hover:bg-blue-800 hover:text-yellow-200 transition-colors">特别活动报告</button></li>
                <li><button onClick={() => navigateTo('notice')} className="w-full text-left py-1 px-1.5 rounded hover:bg-blue-800 hover:text-yellow-200 transition-colors">活动预告</button></li>
                <li><button onClick={() => navigateTo('bulletin')} className="w-full text-left py-1 px-1.5 rounded hover:bg-blue-800 hover:text-yellow-200 transition-colors">学会会讯</button></li>
                <li><button onClick={() => navigateTo('song')} className="w-full text-left py-1 px-1.5 rounded hover:bg-blue-800 hover:text-yellow-200 transition-colors">学会会歌</button></li>
                <li><button onClick={() => navigateTo('wenxian')} className="w-full text-left py-1 px-1.5 rounded hover:bg-blue-800 hover:text-yellow-200 transition-colors">学会文献</button></li>
                <li><button onClick={() => setGuestbookOpen(true)} className="w-full text-left py-1 px-1.5 rounded hover:bg-blue-800 text-yellow-300 font-bold">线上留言</button></li>
                <li><a href="mailto:pbcum@yahoo.com" className="w-full inline-block py-1 px-1.5 rounded hover:bg-blue-800 hover:text-yellow-200">询问/回馈</a></li>
              </ul>
            </nav>
          </div>

          {/* News Column (Right with upward marquee) */}
          <div className="sm:col-span-7 flex flex-col">
            <div className="bg-black border-2 border-blue-900 rounded p-2 text-white h-[260px] overflow-hidden relative flex flex-col justify-between shadow-inner">
              <div className="text-[11px] font-bold text-yellow-300 pb-1 border-b border-zinc-800 flex items-center justify-between">
                <span>★ 马大华文学会 · 最新消息 (NEWS TICKER)</span>
                <span className="text-[9px] text-zinc-400 font-mono">悬停暂停滚动</span>
              </div>

              {/* Upward scrolling marquee */}
              <div className="mq mq-up flex-1 relative overflow-hidden" style={{ '--d': '38s' } as React.CSSProperties}>
                <div className="mq-in space-y-4 py-3 text-xs leading-relaxed text-zinc-200">
                  <article className="border-b border-zinc-800 pb-2">
                    <h3 className="font-bold text-yellow-300 text-sm">
                      恭祝大家猴年新年进步，万事如意！
                    </h3>
                  </article>

                  <article className="border-b border-zinc-800 pb-2">
                    <h3 className="font-bold text-cyan-300 text-xs">
                      2004/2005年度第十九届马大华文学会执委会已经成立了！
                    </h3>
                    <p className="text-[11px] text-zinc-300 mt-1">
                      马大华文学会于2004年1月11日举行第十九届会员大会，并遴选出2004/2005年度执委会。
                    </p>
                    <div className="mt-1.5 bg-zinc-900 p-2 rounded border border-zinc-800 grid grid-cols-2 gap-1 text-[11px]">
                      <div><strong className="text-yellow-400">主席：</strong>王天政</div>
                      <div><strong className="text-yellow-400">外务副主席：</strong>柯永善</div>
                      <div><strong className="text-yellow-400">内务副主席：</strong>邓健庆</div>
                      <div><strong className="text-yellow-400">总秘书：</strong>王秀娴</div>
                      <div><strong className="text-yellow-400">副总秘书：</strong>暂悬空</div>
                      <div><strong className="text-yellow-400">总财政：</strong>王惠均</div>
                      <div><strong className="text-yellow-400">副总财政：</strong>李景华</div>
                      <div><strong className="text-yellow-400">辩论组组长：</strong>彭雪琴</div>
                      <div><strong className="text-yellow-400">华文班组长：</strong>赵田宏</div>
                      <div><strong className="text-yellow-400">社醒组组长：</strong>张诗婷</div>
                      <div><strong className="text-yellow-400">文化组组长：</strong>陈丽诗</div>
                      <div><strong className="text-yellow-400">相声组组长：</strong>姚荷荃</div>
                      <div><strong className="text-yellow-400">摇篮手组长：</strong>暂悬空</div>
                      <div><strong className="text-yellow-400">特别活动咨询委员：</strong>黄妙韵、罗文尧</div>
                    </div>
                  </article>

                  <article className="border-b border-zinc-800 pb-2">
                    <h3 className="font-bold text-yellow-300 text-xs">
                      非常高兴认识到南洋理工大学中文学会之执委！
                    </h3>
                    <p className="text-[11px] text-zinc-300 mt-0.5">
                      交流会后，希望我们彼此互相联系。
                    </p>
                  </article>

                  <article className="border-b border-zinc-800 pb-2">
                    <button 
                      onClick={() => navigateTo('activity')} 
                      className="text-left group w-full"
                    >
                      <h3 className="font-bold text-yellow-300 text-xs group-hover:underline">
                        2003第三届全国中学生生活营已经圆满结束
                      </h3>
                      <p className="text-[11px] text-cyan-300 mt-0.5">
                        <b>请点击此处，以浏览活动的点点滴滴。</b>
                      </p>
                    </button>
                  </article>

                  <article className="border-b border-zinc-800 pb-2">
                    <button 
                      onClick={() => navigateTo('activity')} 
                      className="text-left group w-full"
                    >
                      <p className="text-cyan-300 font-bold group-hover:underline">
                        <b>第九届全国大专辩论会已经圆满结束了！</b>
                      </p>
                      <p className="text-rose-400 font-bold text-[11px]"><b>欲知赛果，请点击此处。</b></p>
                    </button>
                  </article>

                  <article className="pb-2">
                    <button 
                      onClick={() => navigateTo('activity')} 
                      className="text-left group w-full"
                    >
                      <p className="text-cyan-300 font-bold"><b>第十四届全国大专文学奖</b></p>
                      <p className="text-[11px] text-zinc-400">主办单位:马六甲多媒体大学华文学会</p>
                      <p className="text-rose-400 font-bold text-[11px]"><b>请点击此处，以阅读最新资讯。</b></p>
                    </button>
                  </article>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Colorbar & Slogan Marquee */}
        <ColorBarDivider />
        <div className="bg-black text-yellow-300 py-1.5 px-3 my-2 text-center overflow-hidden border border-zinc-800 rounded">
          <div className="mq mq-alt" style={{ '--d': '7s' } as React.CSSProperties}>
            <div className="mq-in font-serif text-sm font-bold tracking-widest text-yellow-300">
              扎 实 为 经 ，回 馈 为 纬 。
            </div>
          </div>
        </div>

        {/* Home Footer */}
        <footer className="text-center text-xs text-slate-700 pt-2 border-t border-slate-200 space-y-1">
          <p>
            此网站由
            <button 
              onClick={() => navigateTo('photo')} 
              className="text-blue-700 font-bold underline hover:text-blue-900 mx-1"
            >
              马大华文学会
            </button>
            呈献
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 text-[11px] text-slate-500">
            <span>如有回馈,请联络 <a href="mailto:pbcum@yahoo.com" className="text-blue-700 underline">pbcum@yahoo.com</a></span>
            <span>·</span>
            <span>最后更新日期：18－1－2004</span>
          </div>
        </footer>
      </div>
    </div>
  );

  /* ==========================================================
   * 2. INNER PAGE LAYOUT WRAPPER (740px layout + 180px sidebar)
   * ========================================================== */
  const renderInnerPage = (pageContent: React.ReactNode) => (
    <div className="w-full flex justify-center py-2 px-1 select-none">
      <div className={`w-full max-w-[740px] bg-white border border-blue-900/40 shadow-md ${modernMode ? 'rounded-xl' : 'rounded-none'} overflow-hidden`}>
        {/* Two-Column Grid (.layout) */}
        <div className="grid grid-cols-1 md:grid-cols-12 min-h-[580px]">
          {/* Sidebar (.side) - 180px Equivalent */}
          <aside className="md:col-span-3 bg-[#00007f] text-white p-3 flex flex-col justify-between border-b md:border-b-0 md:border-r border-blue-900">
            <div>
              <button
                onClick={() => navigateTo('index')}
                className="w-full text-center pb-2.5 mb-2.5 border-b border-blue-800/80 group"
              >
                <div className="text-base font-bold font-serif text-yellow-300 group-hover:text-yellow-100 transition-colors tracking-wide">
                  马大华文学会
                </div>
                <div className="text-[10px] text-blue-200 tracking-tighter">
                  UNIVERSITI MALAYA · PBCUM
                </div>
              </button>

              {/* Sidebar Navigation Links */}
              <nav aria-label="网站内容">
                <ul className="space-y-1 text-xs">
                  {sidebarNavItems.map((item) => {
                    const isActive = currentPage === item.id;
                    return (
                      <li key={item.id}>
                        <button
                          onClick={() => navigateTo(item.id)}
                          className={`w-full text-left px-2.5 py-1.5 rounded transition-all flex items-center justify-between ${
                            isActive
                              ? 'bg-yellow-400 text-blue-950 font-bold shadow-xs'
                              : 'text-blue-100 hover:bg-blue-800/80 hover:text-white'
                          }`}
                        >
                          <span>{item.label}</span>
                          {isActive && <ChevronRight className="w-3.5 h-3.5" />}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            </div>

            {/* Contact button */}
            <div className="pt-3 border-t border-blue-800/80 mt-4">
              <a
                href="mailto:pbcum@yahoo.com"
                className="w-full block text-center py-1.5 rounded bg-blue-900 text-yellow-200 text-xs font-medium hover:bg-blue-950 transition-colors border border-blue-700"
              >
                询问/回馈
              </a>
              <div className="text-[10px] text-center text-blue-300/80 mt-2">
                扎实为经 · 回馈为纬
              </div>
            </div>
          </aside>

          {/* Main Content Area (<main>) - 520px/540px Equivalent */}
          <main className="md:col-span-9 p-4 bg-white flex flex-col justify-between overflow-x-hidden">
            <div className="w-full max-w-[520px] mx-auto">
              {pageContent}
            </div>

            {/* Bottom Footer inside inner layout */}
            <div className="w-full max-w-[520px] mx-auto mt-4 pt-2 border-t border-slate-100 text-center text-[11px] text-slate-400 flex items-center justify-between">
              <span>马大华文学会 1986–2004 历史档案</span>
              <button 
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="text-blue-700 hover:underline flex items-center gap-1"
              >
                <ArrowUp className="w-3 h-3" />
                <span>到最上面</span>
              </button>
            </div>
          </main>
        </div>
      </div>
    </div>
  );

  /* ==========================================================
   * 3. PAGE: 学会思想 (philosophy.htm)
   * ========================================================== */
  const renderPhilosophyPage = () => (
    <div>
      {/* Title Table with Animated Slide */}
      <div className="border-b-2 border-cyan-400 pb-1 mb-2">
        <div className="mq mq-slide">
          <div className="mq-in text-lg font-bold font-serif text-[#0000cf]">
            学会思想
          </div>
        </div>
      </div>

      <FlybirdBanner width="100%" height={26} />

      {/* Main Purple Framed Table (cellpadding=2 cellspacing=1 border=#9933ff width=400) */}
      <div className="flex justify-center my-3">
        <table className="retro-table w-full max-w-[420px] text-xs border-2 border-[#9933ff] bg-[#9933ff]">
          <tbody>
            {/* Theme Row */}
            <tr>
              <td className="w-1/5 p-2 bg-[#00ffff] font-bold text-center align-middle text-black">
                主题
              </td>
              <td className="w-4/5 p-2 bg-[#e8f2fd] text-slate-900">
                <span className="font-bold text-sm">扎实为经，回馈为纬。</span>
                <button
                  onClick={() => setActivePhilosophyModal({
                    title: "主题：扎实为经，回馈为纬",
                    content: "扎实为经，回馈为纬。\n\n马大华文学会以此八字为贯穿历届活动的中心主题。'扎实'乃向内扎根，要求每一位会员脚踏实地、充实学识、锤炼道德与修养；'回馈'乃向外奉献，将大专所学与文化精萃回报社会、关怀弱势、推动国家进步。"
                  })}
                  className="ml-2 inline-block px-1.5 py-0.5 rounded bg-blue-700 text-white text-[10px] hover:bg-blue-800"
                >
                  (阅读更多)
                </button>
              </td>
            </tr>

            {/* Value Row */}
            <tr>
              <td className="p-2 bg-[#00ffff] font-bold text-center align-middle text-black">
                存在价值
              </td>
              <td className="p-2 bg-[#e8f2fd] text-slate-900">
                <span className="font-bold">通过华族文化精华，改善社会。</span>
                <button
                  onClick={() => setActivePhilosophyModal({
                    title: "存在价值：通过华族文化精华，改善社会",
                    content: "马大华文学会于1991/1992学年由第六届执委会整理出学会的存在价值即：“通过华族文化精华，改善社会”。\n\n学会绝非单纯的联谊组织，而是将华族优秀文化传统与现代人文理念相结合，以天下为己任，通过文化、教育与社会批判实践改善马来西亚社会风气与制度。"
                  })}
                  className="ml-2 inline-block px-1.5 py-0.5 rounded bg-blue-700 text-white text-[10px] hover:bg-blue-800"
                >
                  (阅读更多)
                </button>
              </td>
            </tr>

            {/* Tenets Row */}
            <tr>
              <td className="p-2 bg-[#00ffff] font-bold text-center align-top text-black">
                宗旨
              </td>
              <td className="p-2 bg-[#e8f2fd] text-slate-900">
                <ol className="list-decimal list-inside space-y-1 text-xs">
                  <li>推广华语，提高华文程度。</li>
                  <li>促进对所有文化的了解，尤其是大马各族文化。</li>
                  <li>促进学生之间的谅解，培养容忍与和睦的精神。</li>
                </ol>
                <div className="mt-1.5 text-right">
                  <button
                    onClick={() => setActivePhilosophyModal({
                      title: "学会三大宗旨阐释",
                      content: "马大华文学会宗旨：\n\n1. 推广华语，提高华文程度：学会致力于在多元种族国度里推广华文华语之正确使用与精髓文化，使其获得应有之重视与法理尊严。\n\n2. 促进对所有文化的了解，尤其是大马各族文化：通过各类活动促进各族学生对彼此文化的认识，把各族学生拉在一起，以达到彼此之间的了解与合作。\n\n3. 促进学生之间的谅解，培养容忍与和睦的精神：强调华文学会并不局限于华文源流学生，欢迎各源流学生积极参与，促使和谐共处。"
                    })}
                    className="text-blue-700 underline text-[11px] hover:text-blue-900"
                  >
                    <u>(阅读更多)</u>
                  </button>
                </div>
              </td>
            </tr>

            {/* Goals Row */}
            <tr>
              <td className="p-2 bg-[#00ffff] font-bold text-center align-top text-black">
                目标
              </td>
              <td className="p-2 bg-[#e8f2fd] text-slate-900">
                <ol className="list-decimal list-inside space-y-1 text-xs">
                  <li>推广使用正确的华文华语。</li>
                  <li>使会员认识华族传统价值观。</li>
                  <li>提高会员的社会意识。</li>
                  <li>推广校园内的文学创作风气。</li>
                  <li>促进校园内各族群之间的交流。</li>
                </ol>
                <div className="mt-1.5 text-right">
                  <button
                    onClick={() => setActivePhilosophyModal({
                      title: "学会五大目标落实",
                      content: "马大华文学会五大目标：\n\n1. 推广使用正确的华文华语（华文班、华语讲座、规范词汇训练）；\n2. 使会员认识华族传统价值观（文化组书法、茶艺、篆刻、中华哲学探讨）；\n3. 提高会员的社会意识（社醒组社会调查、时事评论会、人权论坛）；\n4. 推广校园内的文学创作风气（全国大专文学奖、出版刊物、诗歌创作）；\n5. 促进校园内各族群之间的交流（与各源流学生代表联办活动、多元文化周）。"
                    })}
                    className="text-blue-700 underline text-[11px] hover:text-blue-900"
                  >
                    <u>(阅读更多)</u>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <ColorBarDivider />
    </div>
  );

  /* ==========================================================
   * 4. PAGE: 学会历史 (history.htm)
   * ========================================================== */
  const renderHistoryPage = () => (
    <div id="top">
      <div className="border-b border-blue-900 pb-1 mb-2">
        <h2 className="text-xl font-bold font-serif text-[#00007f]">学会历史</h2>
      </div>
      <FlybirdBanner width="100%" height={26} />

      <div className="my-2 text-center">
        <h3 className="text-base font-bold text-[#ff6600] font-serif">
          不灭的信念--记马大华文学会争取成立过程与成长史
        </h3>
      </div>

      {/* 12 Historical Photographic Plates (Matching image/history/1.jpg - 12.jpg) */}
      <div className="my-3 bg-slate-50 border border-slate-300 rounded p-2.5">
        <div className="flex items-center justify-between pb-1.5 mb-2 border-b border-slate-200">
          <div className="flex items-center gap-1.5 text-xs font-bold text-blue-900 font-serif">
            <ImageIcon className="w-3.5 h-3.5 text-blue-700" />
            <span>历史珍贵镜头档案 (12 组纪实原版照片 · 1974–1986)</span>
          </div>
          <span className="text-[10px] text-slate-500 font-mono">image/history/1-12.jpg</span>
        </div>

        {/* Authentic horizontal filmstrip matching original table */}
        <div className="overflow-x-auto pb-2 flex gap-2 scrollbar-thin">
          {historyPlates.map((plate) => (
            <div 
              key={plate.id}
              onClick={() => setActivePhotoLightbox({ src: plate.src, title: plate.title, caption: plate.caption })}
              className="shrink-0 w-[200px] bg-white border border-slate-200 rounded p-1.5 cursor-pointer hover:border-blue-500 hover:shadow-sm transition-all group"
            >
              <div className="w-[190px] h-[126px] bg-slate-100 overflow-hidden rounded relative">
                <img
                  src={plate.src}
                  alt={plate.title}
                  width={300}
                  height={200}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
              </div>
              <div className="text-[11px] font-bold text-blue-950 mt-1 truncate font-serif">
                {plate.title}
              </div>
              <div className="text-[10px] text-slate-500 line-clamp-2 mt-0.5 leading-snug">
                {plate.caption}
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between text-[10px] text-blue-700 mt-1 px-1">
          <span>← 点击横向拖动浏览全部 12 张原版历史相片 →</span>
          <span>点击相片可放大阅读详细说明</span>
        </div>
      </div>

      {/* 21 Historical Chapters of Founding Struggle (1974-1986) */}
      <div className="space-y-3 text-xs leading-relaxed text-slate-800 my-4">
        {HISTORY_CHAPTERS.map((ch, idx) => (
          <div key={ch.id} className="p-2.5 bg-slate-50 border border-slate-200 rounded">
            <h4 className="font-bold text-[#9933ff] text-xs mb-1">
              ( {ch.roman} ) {ch.title}
            </h4>
            <p className="text-slate-700 text-justify">{ch.content}</p>
            {/* Retro jump-to-top every 10 chapters matching original htm */}
            {(idx === 9 || idx === 20) && (
              <div className="text-right pt-2 border-t border-slate-100 mt-2">
                <button 
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="text-blue-800 text-[11px] underline inline-flex items-center gap-1 hover:text-blue-950"
                >
                  <img src="/image/top.gif" width={14} height={10} alt="" className="inline" />
                  <span><u>到最上面</u></span>
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Jump to top link */}
      <div className="py-2 text-center flex items-center justify-center gap-1">
        <img src="/image/top.gif" width={14} height={10} alt="" className="inline" />
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="text-blue-800 underline text-xs font-bold hover:text-blue-950 inline-flex items-center gap-1"
        >
          <span><u>到最上面</u></span>
        </button>
      </div>

      <ColorBarDivider />

      {/* Historical Terms Log: 第一届执委会至第十七届执委会 (1986 - 2003) */}
      <div className="mt-4 pt-2">
        <div className="bg-[#00007f] text-yellow-300 py-1.5 px-3 rounded text-center mb-3">
          <span className="font-bold text-sm font-serif">
            马大华文学会历届执委会成长与会务演变史 (1986–2003)
          </span>
        </div>

        <div className="space-y-3 text-xs leading-relaxed text-slate-800">
          {TERMS_HISTORY.map((term, tIdx) => (
            <div key={tIdx} className="p-2.5 bg-[#e8f2fd]/60 border border-blue-200 rounded">
              <div className="flex items-center justify-between pb-1 border-b border-blue-200 mb-1.5">
                <h4 className="font-bold text-[#9933ff] text-xs">
                  {term.academicYear} ({term.term})
                </h4>
                {term.theme && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-yellow-200 text-blue-950 font-bold">
                    主题: {term.theme}
                  </span>
                )}
              </div>
              <p className="text-slate-800 whitespace-pre-line text-justify leading-relaxed">
                {term.content}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="py-2 text-center mt-3">
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="text-blue-800 underline text-xs font-bold hover:text-blue-950 inline-flex items-center gap-1"
        >
          <ArrowUp className="w-3 h-3" />
          <span><u>到最上面</u></span>
        </button>
      </div>

      <ColorBarDivider />
    </div>
  );

  /* ==========================================================
   * 5. PAGE: 学会组织架构 (structure.htm & structureexco.htm)
   * ========================================================== */
  const renderStructurePage = () => (
    <div>
      <div className="border-b border-blue-900 pb-1 mb-2">
        <h2 className="text-xl font-bold font-serif text-[#00007f]">学会组织架构</h2>
      </div>
      <FlybirdBanner width="100%" height={26} />

      {/* Sub-Tabs: Org Chart vs EXCO Hierarchy */}
      <div className="flex justify-center my-3">
        <div className="inline-flex border-2 border-yellow-400 bg-yellow-400 p-0.5 rounded">
          <button
            onClick={() => navigateTo('structure')}
            className={`px-3 py-1 text-xs font-bold transition-colors ${
              currentPage === 'structure' ? 'bg-[#6699FF] text-white shadow-xs' : 'bg-yellow-100 text-blue-900 hover:bg-yellow-200'
            }`}
          >
            学会组织架构
          </button>
          <button
            onClick={() => navigateTo('structureexco')}
            className={`px-3 py-1 text-xs font-bold transition-colors ${
              currentPage === 'structureexco' ? 'bg-[#6699FF] text-white shadow-xs' : 'bg-yellow-100 text-blue-900 hover:bg-yellow-200'
            }`}
          >
            执委会组织架构
          </button>
        </div>
      </div>

      <p className="text-center text-xs text-blue-700 mb-2">
        您可尝试点击下列架构表中的部分单位，有关单位将提供进一步资讯的联结。
      </p>

      {currentPage === 'structure' ? (
        <OrgChartInteractive 
          onNavigateToUnit={(unitId) => navigateTo('unit')}
          onNavigateToExco={() => navigateTo('exco')}
        />
      ) : (
        /* structureexco.htm view with authentic structureme.gif diagram */
        <div className="bg-white border border-blue-300 p-3 rounded text-center">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-blue-100">
            <span className="text-xs font-bold text-blue-900 font-serif">
              第十八届马大华文学会执委会组织架构图
            </span>
            <div className="flex items-center gap-1 text-[11px]">
              <button
                onClick={() => setStructureExcoViewMode('authentic')}
                className={`px-2 py-0.5 rounded transition-colors ${
                  structureExcoViewMode === 'authentic'
                    ? 'bg-blue-800 text-white font-medium shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                原版架构图 (GIF)
              </button>
              <button
                onClick={() => setStructureExcoViewMode('breakdown')}
                className={`px-2 py-0.5 rounded transition-colors ${
                  structureExcoViewMode === 'breakdown'
                    ? 'bg-blue-800 text-white font-medium shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                名册卡片
              </button>
            </div>
          </div>

          {structureExcoViewMode === 'authentic' ? (
            <div className="py-2 overflow-x-auto flex flex-col items-center">
              <div 
                className="cursor-pointer group relative inline-block"
                onClick={() => setActivePhotoLightbox({
                  src: "/image/structureme.gif",
                  title: "第十八届马大华文学会执委会组织架构图 (structureme.gif)",
                  caption: "18th Executive Committee Organizational Chart: 包含主席、内/外副主席、总秘书、总财政、六大小组组长及咨询委员。"
                })}
              >
                <img
                  src="/image/structureme.gif"
                  alt="第十八届马大华文学会执委会组织架构"
                  width={442}
                  height={454}
                  className="max-w-full h-auto mx-auto border border-slate-300 shadow-sm block select-none group-hover:opacity-95 transition-opacity"
                />
                <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/70 text-white text-[10px] opacity-0 group-hover:opacity-100 transition-opacity">
                  点击查看大图
                </span>
              </div>
              <p className="text-center font-bold text-blue-700 mt-2 text-xs font-serif">
                <b>执委会组织架构</b> (原版图形文件: image/structureme.gif)
              </p>
            </div>
          ) : (
            <div className="max-w-[442px] mx-auto bg-slate-50 border border-blue-200 p-3 rounded shadow-xs">
              <div className="space-y-3 text-xs text-slate-800">
                <div className="p-2 bg-yellow-300 border-2 border-yellow-600 rounded font-bold text-blue-950">
                  主 席 (潘宏文)
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="p-2 bg-sky-200 border border-blue-400 rounded font-semibold">
                    外务副主席 (谢光亮)
                  </div>
                  <div className="p-2 bg-sky-200 border border-blue-400 rounded font-semibold">
                    内务副主席 (杨丽萍)
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="p-2 bg-slate-100 border border-slate-300 rounded">
                    总秘书 (罗伟杰)<br />副总秘书 (李志祥)
                  </div>
                  <div className="p-2 bg-slate-100 border border-slate-300 rounded">
                    总财政 (江妙奇)<br />副总财政 (唐志斌)
                  </div>
                </div>
                <div className="p-2.5 bg-blue-50 border border-blue-300 rounded text-left">
                  <strong className="text-blue-950 block mb-1">六大小组组长：</strong>
                  <div className="grid grid-cols-2 gap-1 text-[11px]">
                    <div>• 辩论组：刘燕金</div>
                    <div>• 华文班：张永威</div>
                    <div>• 社醒组：悬空</div>
                    <div>• 文化组：吴晓萍</div>
                    <div>• 相声组：黄佩美</div>
                    <div>• 摇篮手：刘康蓝</div>
                  </div>
                </div>
                <div className="p-2 bg-amber-100 border border-amber-300 rounded text-xs font-medium">
                  特别活动咨询委员：苏梦蕾、梁泰荣
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      <ColorBarDivider />
    </div>
  );

  /* ==========================================================
   * 6. PAGE: 执委会名单 (exco.htm)
   * ========================================================== */
  const renderExcoPage = () => {
    let listToShow = EXCO_18TH;
    let termLabel = "第十八届马大华文学会执委会名单如下:";
    if (selectedExcoTerm === '19th') {
      listToShow = EXCO_19TH;
      termLabel = "第十九届马大华文学会执委会名单如下:";
    } else if (selectedExcoTerm === '17th') {
      listToShow = EXCO_17TH;
      termLabel = "第十七届马大华文学会执委会名单如下:";
    } else if (selectedExcoTerm === '16th') {
      listToShow = EXCO_16TH;
      termLabel = "第十六届马大华文学会执委会名单如下:";
    } else if (selectedExcoTerm === '15th') {
      listToShow = EXCO_15TH;
      termLabel = "第十五届马大华文学会执委会名单如下:";
    } else if (selectedExcoTerm === '14th') {
      listToShow = EXCO_14TH;
      termLabel = "第十四届马大华文学会执委会名单如下:";
    }

    return (
      <div>
        <div className="border-b border-blue-900 pb-1 mb-2">
          <h2 className="text-xl font-bold font-serif text-[#00007f]">马大华文学会执委会</h2>
        </div>
        <FlybirdBanner width="100%" height={26} />

        {/* Black Banner Bar matching original table */}
        <div className="bg-black text-center py-2 px-3 my-2 rounded border border-zinc-800">
          <span className="text-[#FFFFCC] text-sm font-bold">
            {termLabel}
          </span>
        </div>

        {/* EXCO Table matching retro table (352 width, border=1) */}
        <div className="flex justify-center my-3">
          <table className="retro-table w-full max-w-[380px] text-xs border border-slate-400 shadow-xs">
            <tbody>
              {listToShow.map((m, idx) => (
                <tr key={idx} className="hover:bg-blue-50/60">
                  <td className="p-2 text-right font-medium text-slate-800 w-1/2">
                    {m.role}：
                  </td>
                  <td className="p-2 text-left font-bold text-blue-700 w-1/2">
                    {m.bio ? (
                      <button
                        onClick={() => setActiveMemberModal(m)}
                        className="hover:underline text-left text-blue-700 cursor-pointer"
                        title="点击阅读执委资料"
                      >
                        {m.name}
                      </button>
                    ) : (
                      <span>{m.name}</span>
                    )}
                    {m.note && <span className="text-[10px] text-rose-600 ml-1 font-normal">({m.note})</span>}
                  </td>
                </tr>
              ))}
              <tr>
                <td colSpan={2} className="p-2.5 text-center text-[#00007f] text-[12px]">
                  (您可点击以上执委的名字，以阅读他们的资料。)
                </td>
              </tr>
              {/* Dropdown selector row (background-color:#ffffcc) */}
              <tr>
                <td colSpan={2} className="p-2.5 bg-[#ffffcc] text-center border-t border-slate-300">
                  <div className="flex flex-wrap items-center justify-center gap-2 text-xs">
                    <span className="text-blue-900 font-bold">想不想认识历届华文学会执委会？</span>
                    <select
                      value={selectedExcoTerm}
                      onChange={(e) => setSelectedExcoTerm(e.target.value)}
                      className="text-xs bg-white border border-blue-500 rounded p-1 font-medium text-slate-800"
                    >
                      <option value="18th">第十八届执委会 (2003/2004)</option>
                      <option value="19th">第十九届执委会 (2004/2005 · 新任)</option>
                      <option value="17th">第十七届执委会 (2002/2003)</option>
                      <option value="16th">第十六届执委会 (2001/2002)</option>
                      <option value="15th">第十五届执委会 (2000/2001)</option>
                      <option value="14th">第十四届执委会 (1999/2000)</option>
                    </select>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <ColorBarDivider />
      </div>
    );
  };

  /* ==========================================================
   * 7. PAGE: 学会各小组 (unit.htm & unit2.htm)
   * ========================================================== */
  const renderUnitsPage = () => {
    const isPage2 = currentPage === 'unit2';
    const displayedUnits = UNITS_DATA.filter(u => isPage2 ? u.category === 'admin' : u.category === 'interest');

    return (
      <div id="top">
        {/* 2x5 Sub-navigation Bar matching original yellow framed table */}
        <div className="border-2 border-yellow-400 bg-yellow-400 p-0.5 rounded my-2">
          <div className="grid grid-cols-5 gap-0.5 text-center text-[11px] font-bold text-white">
            <button onClick={() => navigateTo('unit')} className="p-1.5 bg-[#6699FF] hover:bg-blue-600 transition-colors">辩论组</button>
            <button onClick={() => navigateTo('unit')} className="p-1.5 bg-[#6699FF] hover:bg-blue-600 transition-colors">华文班</button>
            <button onClick={() => navigateTo('unit')} className="p-1.5 bg-[#6699FF] hover:bg-blue-600 transition-colors">社醒组</button>
            <button onClick={() => navigateTo('unit')} className="p-1.5 bg-[#6699FF] hover:bg-blue-600 transition-colors">文化组</button>
            <button onClick={() => navigateTo('unit')} className="p-1.5 bg-[#6699FF] hover:bg-blue-600 transition-colors">相声组</button>
            <button onClick={() => navigateTo('unit')} className="p-1.5 bg-[#6699FF] hover:bg-blue-600 transition-colors">摇篮手</button>
            <button onClick={() => navigateTo('unit2')} className="p-1.5 bg-[#6699FF] hover:bg-blue-600 transition-colors">外务处</button>
            <button onClick={() => navigateTo('unit2')} className="p-1.5 bg-[#6699FF] hover:bg-blue-600 transition-colors">秘书处</button>
            <button onClick={() => navigateTo('unit2')} className="p-1.5 bg-[#6699FF] hover:bg-blue-600 transition-colors">财务处</button>
            <button onClick={() => navigateTo('unit2')} className="p-1.5 bg-[#6699FF] hover:bg-blue-600 transition-colors">学记团</button>
          </div>
        </div>

        <FlybirdBanner width="100%" height={26} />

        <div className="flex items-center justify-between my-2 text-xs">
          <span className="font-bold text-blue-900">
            {isPage2 ? '第二部分：行政与咨询机构 (unit2.htm)' : '第一部分：六大基层兴趣活动组 (unit.htm)'}
          </span>
          <button
            onClick={() => navigateTo(isPage2 ? 'unit' : 'unit2')}
            className="text-blue-700 underline font-semibold hover:text-blue-950"
          >
            {isPage2 ? '← 返回第一页 (六大小组)' : '下一页 (行政机构与委员会) →'}
          </button>
        </div>

        {/* Units Profiles matching original tables with vertical marquees */}
        <div className="space-y-6 my-4">
          {displayedUnits.map((u) => (
            <div key={u.id} id={u.id} className="border-2 border-blue-400 rounded bg-[#e8f2fd] p-3 shadow-xs">
              {/* Top Sub-Links Bar matching original 5-column sub-header */}
              <div className="grid grid-cols-5 text-center text-xs border border-blue-400 bg-white mb-2">
                <div className="bg-[#00007F] text-white p-2 font-bold flex items-center justify-center">
                  {u.name}
                </div>
                {u.sublinks?.map((sub, sIdx) => (
                  <div key={sIdx} className="p-2 border-l border-blue-200 flex items-center justify-center">
                    {sub.href ? (
                      <span className="text-blue-700 underline cursor-pointer hover:text-blue-950">
                        {sub.title}
                      </span>
                    ) : (
                      <span className="text-slate-600">{sub.title}</span>
                    )}
                  </div>
                ))}
              </div>

              {/* Motto Box + Goals Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 my-2">
                {/* Vertical Marquee Motto */}
                <div className="sm:col-span-4 bg-white border border-blue-400 p-2 rounded flex items-center justify-center text-center">
                  <div className="mq mq-up h-[120px] w-full" style={{ '--d': '10s' } as React.CSSProperties}>
                    <div className="mq-in font-serif font-bold text-blue-900 text-xs tracking-widest leading-loose">
                      {u.motto}
                    </div>
                  </div>
                </div>

                {/* Goals */}
                <div className="sm:col-span-8 bg-white/90 p-2.5 rounded border border-blue-200 text-xs">
                  <h4 className="font-bold text-blue-900 mb-1">{isPage2 && u.id === 'zixunweiyuanhui' ? '角色' : '目标'}</h4>
                  <ol className="list-decimal list-inside space-y-1 text-slate-700">
                    {u.goals.map((g, gi) => (
                      <li key={gi} className="leading-snug">{g}</li>
                    ))}
                  </ol>
                </div>
              </div>

              {/* Description */}
              <div className="text-xs text-slate-800 leading-relaxed bg-white/70 p-2.5 rounded border border-blue-200/80 mt-2">
                <p>{u.description}</p>
                {u.clauses && (
                  <ol className="list-decimal list-inside space-y-1 mt-2 font-serif text-slate-800">
                    {u.clauses.map((c, ci) => (
                      <li key={ci}>{c}</li>
                    ))}
                  </ol>
                )}
              </div>

              {/* To top link */}
              <div className="text-right pt-2">
                <button 
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="text-blue-800 text-[11px] underline inline-flex items-center gap-1 hover:text-blue-950"
                >
                  <ArrowUp className="w-3 h-3" />
                  <span>到最上面</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination at bottom */}
        <div className="flex justify-between items-center py-2 text-xs">
          {isPage2 ? (
            <button
              onClick={() => navigateTo('unit')}
              className="text-[#008000] font-bold underline hover:text-emerald-900"
            >
              <u>上一页 (六大小组)</u>
            </button>
          ) : (
            <button
              onClick={() => navigateTo('unit2')}
              className="text-[#008000] font-bold underline hover:text-emerald-900 ml-auto"
            >
              <u>下一页 (行政机构与委员会)</u>
            </button>
          )}
        </div>

        <ColorBarDivider />
      </div>
    );
  };

  /* ==========================================================
   * 8. PAGE: 特别活动报告 (activity.htm)
   * ========================================================== */
  const renderActivityPage = () => (
    <div>
      <div className="border-b border-blue-900 pb-1 mb-2">
        <h2 className="text-xl font-bold font-serif text-[#00007f]">特别活动报告</h2>
      </div>
      <FlybirdBanner width="100%" height={26} />

      <div className="bg-black text-yellow-300 py-1 px-3 my-2 text-center rounded">
        <span className="font-serif font-bold text-xs text-[#ffff00]">扎实为经，回馈为纬。</span>
      </div>

      <div className="space-y-4 my-3">
        {/* Table 1: Notice Jump (width=380, border=1) */}
        <div className="flex justify-center">
          <table className="retro-table w-full max-w-[400px] text-xs border border-[#00007f]">
            <tbody>
              <tr>
                <td className="w-[26%] p-2.5 bg-[#e8f2fd] text-center font-bold text-slate-900 align-middle">
                  学会活动<br />预告
                </td>
                <td className="w-[74%] p-2.5 bg-[#ffffcc]">
                  <ul className="list-disc list-inside">
                    <li>
                      <button
                        onClick={() => navigateTo('notice')}
                        className="text-blue-700 underline font-bold hover:text-blue-900"
                      >
                        请点击此处
                      </button>
                    </li>
                  </ul>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Table 2: Special Activities Archive (2003/2004, 2002/2003, 2001/2002) */}
        <div className="flex justify-center">
          <table className="retro-table w-full max-w-[400px] text-xs border border-slate-400">
            <tbody>
              {/* 2003/2004 */}
              <tr>
                <td className="w-[26%] p-2.5 bg-[#e8f2fd] text-center font-bold text-slate-900 align-middle">
                  2003/2004年度<br />学会特别<br />活动报告
                </td>
                <td className="w-[74%] p-2.5 bg-[#ffffcc]">
                  <ul className="list-disc list-inside space-y-1">
                    <li>
                      <a href="http://quanbian9.tripod.com" target="_blank" rel="noopener noreferrer" className="text-blue-700 underline hover:text-blue-950 font-medium">
                        2003第9届全国大专辩论会
                      </a>
                    </li>
                    <li>
                      <a href="http://quanzhong.tripod.com" target="_blank" rel="noopener noreferrer" className="text-blue-700 underline hover:text-blue-950 font-medium">
                        2003第3届全国中学生生活营
                      </a>
                    </li>
                  </ul>
                </td>
              </tr>

              {/* 2002/2003 */}
              <tr>
                <td className="w-[26%] p-2.5 bg-[#e8f2fd] text-center font-bold text-slate-900 align-middle">
                  2002/2003年度<br />学会特别<br />活动报告
                </td>
                <td className="w-[74%] p-2.5 bg-[#ffffcc]">
                  <ul className="list-disc list-inside space-y-1">
                    <li>
                      <button
                        onClick={() => setActiveActivityModal(activityReportsData['yingxinzhou2002'])}
                        className="text-blue-700 underline hover:text-blue-950 font-medium text-left cursor-pointer"
                      >
                        2002/2003年度华文学会迎新周
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => setActiveActivityModal(activityReportsData['peixunying2002'])}
                        className="text-blue-700 underline hover:text-blue-950 font-medium text-left cursor-pointer"
                      >
                        2002年华文学会会员培训营
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => setActiveActivityModal(activityReportsData['familygather2002'])}
                        className="text-blue-700 underline hover:text-blue-950 font-medium text-left cursor-pointer"
                      >
                        2002年华文学会家庭聚会
                      </button>
                    </li>
                  </ul>
                </td>
              </tr>

              {/* 2001/2002 */}
              <tr>
                <td className="w-[26%] p-2.5 bg-[#e8f2fd] text-center font-bold text-slate-900 align-middle">
                  2001/2002年度<br />学会特别<br />活动报告
                </td>
                <td className="w-[74%] p-2.5 bg-[#ffffcc]">
                  <ul className="list-disc list-inside space-y-1">
                    <li>
                      <button
                        onClick={() => setActiveActivityModal(activityReportsData['dayao2002'])}
                        className="text-blue-700 underline hover:text-blue-950 font-medium text-left cursor-pointer"
                      >
                        2002年度摇篮手创作歌曲发表演绎会
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => setActiveActivityModal(activityReportsData['8thquanbian'])}
                        className="text-blue-700 underline hover:text-blue-950 font-medium text-left cursor-pointer"
                      >
                        2001年第8届全国大专辩论会
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => setActiveActivityModal(activityReportsData['13thquanwen'])}
                        className="text-blue-700 underline hover:text-blue-950 font-medium text-left cursor-pointer"
                      >
                        第13届全国大专文学奖
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => setActiveActivityModal(activityReportsData['2thquanzhong'])}
                        className="text-blue-700 underline hover:text-blue-950 font-medium text-left cursor-pointer"
                      >
                        2001年第2届全国中学生生活营
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => setActiveActivityModal(activityReportsData['familygather2001'])}
                        className="text-blue-700 underline hover:text-blue-950 font-medium text-left cursor-pointer"
                      >
                        2001年华文学会家庭聚会
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => setActiveActivityModal(activityReportsData['foodstall2001'])}
                        className="text-blue-700 underline hover:text-blue-950 font-medium text-left cursor-pointer"
                      >
                        2001年毕业典礼华文学会食物摊
                      </button>
                    </li>
                  </ul>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Authentic Event Photos Strip */}
        <div className="bg-slate-50 border border-slate-300 rounded p-2.5 mt-3">
          <div className="flex items-center justify-between pb-1.5 mb-2 border-b border-slate-200">
            <div className="flex items-center gap-1.5 text-xs font-bold text-blue-900 font-serif">
              <ImageIcon className="w-3.5 h-3.5 text-blue-700" />
              <span>特别活动原版历史照片纪实 (Original Event Photos)</span>
            </div>
            <span className="text-[10px] text-slate-500 font-mono">image/ & activity/</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
            <div 
              onClick={() => setActivePhotoLightbox({ src: "/image/13thQuanWen1.gif", title: "第13届全国大专文学奖工委会", caption: "第13届全国大专文学奖工作委员会全员留影。" })}
              className="bg-white p-1 rounded border border-slate-200 hover:border-blue-500 cursor-pointer group"
            >
              <img src="/image/13thQuanWen1.gif" alt="第13届全国大专文学奖" className="w-full h-24 object-cover rounded group-hover:scale-105 transition-transform" />
              <div className="text-[10px] font-bold text-slate-800 mt-1 truncate">第13届文学奖工委</div>
            </div>

            <div 
              onClick={() => setActivePhotoLightbox({ src: "/image/2thQuanzhong1.gif", title: "第2届全国中学生生活营", caption: "2001年第2届全中营营员破冰与开幕留影。" })}
              className="bg-white p-1 rounded border border-slate-200 hover:border-blue-500 cursor-pointer group"
            >
              <img src="/image/2thQuanzhong1.gif" alt="第2届全中营" className="w-full h-24 object-cover rounded group-hover:scale-105 transition-transform" />
              <div className="text-[10px] font-bold text-slate-800 mt-1 truncate">第2届全中营营员</div>
            </div>

            <div 
              onClick={() => setActivePhotoLightbox({ src: "/image/8thQuanbian1.gif", title: "第8届全国大专辩论会", caption: "2001年第8届全辩获奖队伍与评委大合照。" })}
              className="bg-white p-1 rounded border border-slate-200 hover:border-blue-500 cursor-pointer group"
            >
              <img src="/image/8thQuanbian1.gif" alt="第8届全国大专辩论会" className="w-full h-24 object-cover rounded group-hover:scale-105 transition-transform" />
              <div className="text-[10px] font-bold text-slate-800 mt-1 truncate">第8届全辩优胜队</div>
            </div>

            <div 
              onClick={() => setActivePhotoLightbox({ src: "/image/2002Dayao1.gif", title: "2002大摇音乐会舞台", caption: "2002年度摇篮手创作歌曲发表演绎会舞台全景。" })}
              className="bg-white p-1 rounded border border-slate-200 hover:border-blue-500 cursor-pointer group"
            >
              <img src="/image/2002Dayao1.gif" alt="2002大摇音乐会" className="w-full h-24 object-cover rounded group-hover:scale-105 transition-transform" />
              <div className="text-[10px] font-bold text-slate-800 mt-1 truncate">2002大摇音乐会</div>
            </div>

            <div 
              onClick={() => setActivePhotoLightbox({ src: "/image/2001FoodStall1.gif", title: "2001毕业典礼华文学会食物摊", caption: "马大毕业典礼期间华文学会食物摊位工委。" })}
              className="bg-white p-1 rounded border border-slate-200 hover:border-blue-500 cursor-pointer group"
            >
              <img src="/image/2001FoodStall1.gif" alt="毕业典礼食物摊" className="w-full h-24 object-cover rounded group-hover:scale-105 transition-transform" />
              <div className="text-[10px] font-bold text-slate-800 mt-1 truncate">2001食物摊义卖</div>
            </div>

            <div 
              onClick={() => setActivePhotoLightbox({ src: "/image/2001JiaTingRi.gif", title: "2001年华文学会家庭日", caption: "2001年华文学会家庭日温馨聚会大合照。" })}
              className="bg-white p-1 rounded border border-slate-200 hover:border-blue-500 cursor-pointer group"
            >
              <img src="/image/2001JiaTingRi.gif" alt="2001家庭日" className="w-full h-24 object-cover rounded group-hover:scale-105 transition-transform" />
              <div className="text-[10px] font-bold text-slate-800 mt-1 truncate">2001家庭聚会</div>
            </div>

            <div 
              onClick={() => setActivePhotoLightbox({ src: "/activity/yinxinwanhui2002.jpg", title: "2002迎新晚会", caption: "2002/2003迎新晚会现场大礼堂盛况。" })}
              className="bg-white p-1 rounded border border-slate-200 hover:border-blue-500 cursor-pointer group"
            >
              <img src="/activity/yinxinwanhui2002.jpg" alt="迎新晚会" className="w-full h-24 object-cover rounded group-hover:scale-105 transition-transform" />
              <div className="text-[10px] font-bold text-slate-800 mt-1 truncate">2002迎新晚会</div>
            </div>

            <div 
              onClick={() => setActivePhotoLightbox({ src: "/activity/peixunying2002.jpg", title: "2002干部培训营", caption: "2002年华文学会会员干部培训营结业大合影。" })}
              className="bg-white p-1 rounded border border-slate-200 hover:border-blue-500 cursor-pointer group"
            >
              <img src="/activity/peixunying2002.jpg" alt="干部培训营" className="w-full h-24 object-cover rounded group-hover:scale-105 transition-transform" />
              <div className="text-[10px] font-bold text-slate-800 mt-1 truncate">2002干部培训营</div>
            </div>
          </div>
        </div>
      </div>

      <ColorBarDivider />
    </div>
  );

  /* ==========================================================
   * 9. PAGE: 活动预告 (notice.htm)
   * ========================================================== */
  const renderNoticePage = () => (
    <div>
      <div className="border-b border-blue-900 pb-1 mb-2">
        <h2 className="text-xl font-bold font-serif text-[#00007f]">活动预告</h2>
      </div>
      <FlybirdBanner width="100%" height={26} />

      <div className="bg-black text-yellow-300 py-1 px-3 my-2 text-center rounded">
        <span className="font-serif font-bold text-xs text-[#ffff00]">扎实为经，回馈为纬。</span>
      </div>

      <div className="my-3">
        <div className="text-left font-bold text-base text-[#3300FF] font-serif mb-2">
          学会重要盛事
        </div>

        {/* Schedule Table matching notice_f25c29cc.htm (width=503, bg=#333333) */}
        <div className="overflow-x-auto flex justify-center">
          <table className="retro-table w-full max-w-[503px] text-xs border border-[#333333] bg-[#333333]">
            <thead>
              <tr className="bg-white text-slate-900 font-bold text-center">
                <th className="p-2 border border-slate-300 w-[24%]">活动</th>
                <th className="p-2 border border-slate-300 w-[19%]">日期</th>
                <th className="p-2 border border-slate-300 w-[14%]">时间</th>
                <th className="p-2 border border-slate-300 w-[16%]">地点</th>
                <th className="p-2 border border-slate-300 w-[25%]">备注</th>
              </tr>
            </thead>
            <tbody className="bg-white text-slate-800">
              <tr>
                <td className="p-2 text-center font-bold border border-slate-300">
                  <span className="text-rose-600">马大华文学会<br />执委会改选<br /></span>
                  <span className="text-blue-700">候选人简报会</span>
                </td>
                <td className="p-2 text-center border border-slate-300">
                  21-12-2003<br /><span className="text-blue-700">(星期日)</span>
                </td>
                <td className="p-2 text-center border border-slate-300">8.00pm</td>
                <td className="p-2 text-center border border-slate-300">MPM会议室</td>
                <td rowSpan={3} className="p-2.5 text-xs align-top border border-slate-300 text-justify leading-relaxed">
                  只有在第一学期登记或更新会员籍的同学,方享有竞选执委以及投票的权利。会员大会的法定人数为100人。欢迎会员们踊跃出席会员大会。
                </td>
              </tr>
              <tr>
                <td className="p-2 text-center font-bold border border-slate-300">
                  <span className="text-rose-600">马大华文学会<br />执委会改选<br /></span>
                  <span className="text-blue-700">候选人提名日</span>
                </td>
                <td className="p-2 text-center border border-slate-300">
                  13-1-2003<br /><span className="text-blue-700">(星期一)</span>
                </td>
                <td className="p-2 text-center border border-slate-300">12.00pm - 5.00pm</td>
                <td className="p-2 text-center border border-slate-300">华文学会<br />行动室</td>
              </tr>
              <tr>
                <td className="p-2 text-center font-bold border border-slate-300">
                  <span className="text-rose-600">第19届<br />马大华文学会<br /></span>
                  <span className="text-blue-700">会员大会暨<br />执委会改选</span>
                </td>
                <td className="p-2 text-center border border-slate-300">
                  11-1-2004<br /><span className="text-blue-700">(星期日)</span>
                </td>
                <td className="p-2 text-center border border-slate-300">1.00pm</td>
                <td className="p-2 text-center border border-slate-300">
                  DK A,<br />Fakulti Sastera<br />dan Sains Sosial
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <ColorBarDivider />
    </div>
  );

  /* ==========================================================
   * 10. PAGE: 学会会歌 (song.htm)
   * ========================================================== */
  const renderSongPage = () => (
    <div>
      <div className="border-b border-blue-900 pb-1 mb-2">
        <h2 className="text-xl font-bold font-serif text-[#ff6600]">马大华文学会会歌</h2>
      </div>
      <FlybirdBanner width="100%" height={26} />

      {/* Interactive Web Audio Synthesizer */}
      <SocietyAnthemSynthesizer />

      {/* Lyrics sheet matching song_efabb81c.htm */}
      <div className="bg-yellow-50/70 border border-yellow-200 rounded p-4 my-3 text-center">
        <div className="text-xs text-slate-700 mb-3 font-serif">
          作曲：{SOCIETY_ANTHEM.composer}<br />填词：{SOCIETY_ANTHEM.lyricist}
        </div>

        <div className="space-y-4 text-sm font-serif leading-loose text-blue-950">
          {SOCIETY_ANTHEM.stanzas.map((stanza, sIdx) => (
            <div key={sIdx} className="space-y-0.5">
              {stanza.map((line, lIdx) => (
                <p key={lIdx} className="tracking-widest">{line}</p>
              ))}
            </div>
          ))}
        </div>
      </div>

      <ColorBarDivider />
    </div>
  );

  /* ==========================================================
   * 11. PAGE: 学会会讯 (bulletin.htm)
   * ========================================================== */
  const renderBulletinPage = () => (
    <div>
      <div className="border-b border-blue-900 pb-1 mb-2">
        <h2 className="text-xl font-bold font-serif text-[#3366FF]">马大华文学会会讯（十）</h2>
      </div>
      <FlybirdBanner width="100%" height={26} />

      <div className="bg-black text-[#00ffff] py-1 px-3 my-2 text-center rounded">
        <span className="font-serif font-bold text-xs">扎实为经，回馈为纬。</span>
      </div>

      {/* Bulletin Directory Table matching bulletin_acf1a8e9.htm (width=450, border=1) */}
      <div className="flex justify-center my-3">
        <table className="retro-table w-full max-w-[460px] text-xs border border-slate-400">
          <tbody>
            {/* 专访 */}
            <tr>
              <td className="w-[110px] p-2.5 bg-[#e8f2fd] text-center font-bold text-slate-900 align-middle">
                专访
              </td>
              <td className="p-2.5 bg-[#ffffcc] text-slate-800 space-y-1.5 leading-relaxed">
                <div>
                  <button
                    onClick={() => setActiveArticleModal(BULLETIN_ARTICLES[0])}
                    className="text-[#0000FF] font-medium hover:underline text-left"
                  >
                    专访马大华文学会主席
                  </button>
                  <span className="text-[#00007F]"> / 叶文彬</span>
                </div>
                <div>
                  <button
                    onClick={() => setActiveArticleModal(BULLETIN_ARTICLES[1])}
                    className="text-[#0000FF] font-medium hover:underline text-left"
                  >
                    专访学生理事会代表许志兴
                  </button>
                  <span className="text-[#00007F]"> / 陈贞荣</span>
                </div>
              </td>
            </tr>

            {/* 评论 */}
            <tr>
              <td className="p-2.5 bg-[#e8f2fd] text-center font-bold text-slate-900 align-middle">
                评论
              </td>
              <td className="p-2.5 bg-[#ffffcc] text-slate-800 space-y-1 leading-relaxed">
                <div>
                  <span className="text-[#00007F] mr-1">吴健南</span>
                  <button
                    onClick={() => setActiveArticleModal(BULLETIN_ARTICLES[2])}
                    className="text-[#0000FF] hover:underline"
                  >
                    对马大生的期许：回归单纯的学习态度
                  </button>
                </div>
                <div>
                  <span className="text-[#00007F] mr-1">吴健南</span>
                  <button
                    onClick={() => setActiveArticleModal(BULLETIN_ARTICLES[3])}
                    className="text-[#0000FF] hover:underline"
                  >
                    大专生与政治参与
                  </button>
                </div>
                <div>
                  <span className="text-[#00007F] mr-1">吴健南</span>
                  <button
                    onClick={() => setActiveArticleModal(BULLETIN_ARTICLES[4])}
                    className="text-[#0000FF] hover:underline"
                  >
                    大专校园竞选感言：我也有一个梦
                  </button>
                </div>
                <div>
                  <span className="text-[#00007F] mr-1">谢光亮</span>
                  <button
                    onClick={() => setActiveArticleModal(BULLETIN_ARTICLES[5])}
                    className="text-[#0000FF] hover:underline"
                  >
                    手扎四篇
                  </button>
                </div>
                <div>
                  <span className="text-[#00007F] mr-1">吕桂婷</span>
                  <button
                    onClick={() => setActiveArticleModal(BULLETIN_ARTICLES[6])}
                    className="text-[#0000FF] hover:underline"
                  >
                    《大学生习态度改良刍议》
                  </button>
                </div>
              </td>
            </tr>

            {/* 文学 */}
            <tr>
              <td className="p-2.5 bg-[#e8f2fd] text-center font-bold text-slate-900 align-middle">
                文学
              </td>
              <td className="p-2.5 bg-[#ffffcc] text-slate-800 space-y-1.5 leading-relaxed">
                <div>
                  <span className="text-[#00007F] mr-1">黄敏芝</span>
                  <button
                    onClick={() => setActiveArticleModal(BULLETIN_ARTICLES[7])}
                    className="text-[#0000FF] hover:underline text-left"
                  >
                    《扭转命运》、《鸽子 VS 和平》<br />《牡丹 VS 绿叶》、《野草 VS 仙人掌》
                  </button>
                </div>
                <div>
                  <span className="text-[#00007F] mr-1">馨</span>
                  <button
                    onClick={() => setActiveArticleModal(BULLETIN_ARTICLES[8])}
                    className="text-[#0000FF] hover:underline"
                  >
                    《心情小记》
                  </button>
                </div>
                <div>
                  <span className="text-[#00007F] mr-1">泽靖</span>
                  <button
                    onClick={() => setActiveArticleModal(BULLETIN_ARTICLES[9])}
                    className="text-[#0000FF] hover:underline"
                  >
                    《等候巴士》
                  </button>
                </div>
                <div>
                  <span className="text-[#00007F] mr-1">精灵</span>
                  <button
                    onClick={() => setActiveArticleModal(BULLETIN_ARTICLES[10])}
                    className="text-[#0000FF] hover:underline"
                  >
                    《给没有人的信》
                  </button>
                </div>
                <div>
                  <span className="text-[#00007F] mr-1">张尤蕊</span>
                  <button
                    onClick={() => setActiveArticleModal(BULLETIN_ARTICLES[11])}
                    className="text-[#0000FF] hover:underline text-left"
                  >
                    《心情贵宾》、《待航》、《在一抹清雅的妆里陀陷过》
                  </button>
                </div>
                <div>
                  <span className="text-[#00007F] mr-1">陈贞荣</span>
                  <button
                    onClick={() => setActiveArticleModal(BULLETIN_ARTICLES[12])}
                    className="text-[#0000FF] hover:underline text-left"
                  >
                    《文西阿都拉•2003游X大》、《爱情未亡人》、《想起那一场战争》、《我是预言家》、《政治的迷思》 、《祭 X 大文》
                  </button>
                </div>
                <div>
                  <span className="text-[#00007F] mr-1">蓝色海风</span>
                  <button
                    onClick={() => setActiveArticleModal(BULLETIN_ARTICLES[13])}
                    className="text-[#0000FF] hover:underline"
                  >
                    《老哥》
                  </button>
                </div>
              </td>
            </tr>

            {/* 学会活动预告 */}
            <tr>
              <td className="p-2.5 bg-[#e8f2fd] text-center font-bold text-slate-900 align-middle">
                学会活动预告
              </td>
              <td className="p-2.5 bg-[#FFFFCC]">
                <ul className="list-disc list-inside">
                  <li>
                    <button
                      onClick={() => navigateTo('notice')}
                      className="text-[#0000FF] hover:underline"
                    >
                      请点击此处
                    </button>
                  </li>
                </ul>
              </td>
            </tr>

            {/* 学会特别活动报告 */}
            <tr>
              <td className="p-2.5 bg-[#e8f2fd] text-center font-bold text-slate-900 align-middle">
                学会特别活动<br />报告
              </td>
              <td className="p-2.5 bg-[#FFFFCC] space-y-1">
                <ul className="list-disc list-inside space-y-1">
                  <li>
                    <a href="http://quanbian9.tripod.com" target="_blank" rel="noopener noreferrer" className="text-[#0000FF] hover:underline">
                      全国大专辩论会
                    </a>
                  </li>
                  <li>
                    <a href="http://quanzhong.tripod.com" target="_blank" rel="noopener noreferrer" className="text-[#0000FF] hover:underline">
                      全国中学生生活营
                    </a>
                  </li>
                  <li>
                    <button
                      onClick={() => navigateTo('activity')}
                      className="text-[#0000FF] hover:underline"
                    >
                      请点击此处，以阅读其他活动资讯。
                    </button>
                  </li>
                </ul>
              </td>
            </tr>

            {/* 学会文献 */}
            <tr>
              <td className="p-2.5 bg-[#e8f2fd] text-center font-bold text-slate-900 align-middle">
                学会文献
              </td>
              <td className="p-2.5 bg-[#FFFFCC]">
                <ul className="list-disc list-inside">
                  <li>
                    <button
                      onClick={() => navigateTo('wenxian')}
                      className="text-[#0000FF] hover:underline"
                    >
                      学会评论集
                    </button>
                  </li>
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <ColorBarDivider />
    </div>
  );

  /* ==========================================================
   * 12. PAGE: 学会文献 (wenxian.htm)
   * ========================================================== */
  const renderWenxianPage = () => (
    <div>
      <div className="border-b border-blue-900 pb-1 mb-2">
        <h2 className="text-xl font-bold font-serif text-[#00007f]">马大华文学会文献</h2>
      </div>
      <FlybirdBanner width="100%" height={26} />

      <div className="bg-black text-[#00ffff] py-1 px-3 my-2 text-center rounded">
        <span className="font-serif font-bold text-xs">扎实为经，回馈为纬。</span>
      </div>

      {/* Documents Table matching wenxian_7ab5fbc0.htm (width=450, border=1) */}
      <div className="flex justify-center my-3">
        <table className="retro-table w-full max-w-[460px] text-xs border border-slate-400">
          <tbody>
            {/* 献词 (4 items) */}
            <tr>
              <td className="w-[110px] p-2.5 bg-[#e8f2fd] text-center font-bold text-slate-900 align-middle">
                献词
              </td>
              <td className="p-2.5 bg-[#6699FF] text-white space-y-1.5 leading-relaxed">
                <div>
                  <span className="text-[#FFFFFF] font-medium mr-1.5">周添健</span>
                  <button
                    onClick={() => setActiveDocModal(LITERATURE_LIST[0])}
                    className="underline hover:text-yellow-200"
                  >
                    2003年度学会代顾问老师献词
                  </button>
                </div>
                <div>
                  <span className="text-[#FFFFFF] font-medium mr-1.5">潘宏文</span>
                  <button
                    onClick={() => setActiveDocModal(LITERATURE_LIST[1])}
                    className="underline hover:text-yellow-200"
                  >
                    2003年度学会主席迎新献词
                  </button>
                </div>
                <div>
                  <span className="text-[#FFFFFF] font-medium mr-1.5">谢爱萍</span>
                  <button
                    onClick={() => setActiveDocModal(LITERATURE_LIST[2])}
                    className="underline hover:text-yellow-200"
                  >
                    2002年度学会顾问老师献词
                  </button>
                </div>
                <div>
                  <span className="text-[#FFFFFF] font-medium mr-1.5">丁国亮</span>
                  <button
                    onClick={() => setActiveDocModal(LITERATURE_LIST[3])}
                    className="underline hover:text-yellow-200"
                  >
                    2002年度学会主席迎新献词
                  </button>
                </div>
              </td>
            </tr>

            {/* 学会评论集 (9 items) */}
            <tr>
              <td className="p-2.5 bg-[#e8f2fd] text-center font-bold text-slate-900 align-middle">
                学会评论集
              </td>
              <td className="p-2.5 bg-[#6699FF] text-white space-y-1.5 leading-relaxed">
                <div>
                  <span className="text-[#FFFFFF] font-medium mr-1.5">吴学勤</span>
                  <button
                    onClick={() => setActiveDocModal(LITERATURE_LIST[4])}
                    className="underline hover:text-yellow-200"
                  >
                    学会的存在价值
                  </button>
                </div>
                <div>
                  <span className="text-[#FFFFFF] font-medium mr-1.5">刘敬文</span>
                  <button
                    onClick={() => setActiveDocModal(LITERATURE_LIST[5])}
                    className="underline hover:text-yellow-200"
                  >
                    勇敢向前迈开脚步．保持你独特的容姿
                  </button>
                </div>
                <div>
                  <span className="text-[#FFFFFF] font-medium mr-1.5">林猷荃</span>
                  <button
                    onClick={() => setActiveDocModal(LITERATURE_LIST[6])}
                    className="underline hover:text-yellow-200"
                  >
                    从三重矛盾看马大华文学会
                  </button>
                </div>
                <div>
                  <span className="text-[#FFFFFF] font-medium mr-1.5">苏爱萍</span>
                  <button
                    onClick={() => setActiveDocModal(LITERATURE_LIST[7])}
                    className="underline hover:text-yellow-200"
                  >
                    省思 ·期望
                  </button>
                </div>
                <div>
                  <span className="text-[#FFFFFF] font-medium mr-1.5">余福祺</span>
                  <button
                    onClick={() => setActiveDocModal(LITERATURE_LIST[8])}
                    className="underline hover:text-yellow-200"
                  >
                    摆脱多元的迷失，走出自我的风格。
                  </button>
                </div>
                <div>
                  <span className="text-[#FFFFFF] font-medium mr-1.5">吴健南</span>
                  <button
                    onClick={() => setActiveDocModal(LITERATURE_LIST[9])}
                    className="underline hover:text-yellow-200"
                  >
                    以多元包容的精神来灌溉学会
                  </button>
                </div>
                <div>
                  <span className="text-[#FFFFFF] font-medium mr-1.5">陈政弘</span>
                  <button
                    onClick={() => setActiveDocModal(LITERATURE_LIST[10])}
                    className="underline hover:text-yellow-200"
                  >
                    校园文化的困境
                  </button>
                </div>
                <div>
                  <span className="text-[#FFFFFF] font-medium mr-1.5">丁国亮</span>
                  <button
                    onClick={() => setActiveDocModal(LITERATURE_LIST[11])}
                    className="underline hover:text-yellow-200"
                  >
                    背弃空泛的活动包袱
                  </button>
                </div>
                <div>
                  <span className="text-[#FFFFFF] font-medium mr-1.5">余福祺</span>
                  <button
                    onClick={() => setActiveDocModal(LITERATURE_LIST[12])}
                    className="underline hover:text-yellow-200"
                  >
                    拥抱价值 抓紧信念
                  </button>
                </div>
              </td>
            </tr>

            {/* 学会感言 (1 item) */}
            <tr>
              <td className="p-2.5 bg-[#e8f2fd] text-center font-bold text-slate-900 align-middle">
                学会感言
              </td>
              <td className="p-2.5 bg-[#6699FF] text-white">
                <div>
                  <span className="text-[#FFFFFF] font-medium mr-1.5">何国忠</span>
                  <button
                    onClick={() => setActiveDocModal(LITERATURE_LIST[13])}
                    className="underline hover:text-yellow-200 text-left"
                  >
                    残存记忆中的腾跃--马大华文学会筹委会点滴
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <ColorBarDivider />
    </div>
  );

  /* ==========================================================
   * 13. PAGE: 学会掠影 (photo.htm)
   * ========================================================== */
  const renderPhotoPage = () => {
    const archivalGallery = [
      {
        src: "/image/2nd_ChouWei.jpg",
        title: "1985年 第二届复办筹委会执委群像",
        caption: "1985年8月18日第二届复办筹委会成立，团结全校逾550位大专生坚定争取复会。"
      },
      {
        src: "/image/1stQuanBian.jpg",
        title: "1988年 第一届全国大专辩论会 (全辩一)",
        caption: "马大华文学会破土创办全马首届华语大专辩论会，奠定马来西亚辩论界最高殿堂基石。"
      },
      {
        src: "/image/zhashi.jpg",
        title: "学会精神图腾：扎实为经 · 回馈为纬",
        caption: "历代马大华文学会执委与会员共同恪守之精神格言——扎扎实实求知，诚诚恳恳回馈。"
      },
      {
        src: "/image/14.jpg",
        title: "第十四届中央执委会工作剪影",
        caption: "承前启后的第十四届执委会，在千禧年交替之际深化内部小组建设与外展文化项目。"
      },
      {
        src: "/image/pbcum.jpg",
        title: "马大华文学会会徽与创会历史文献",
        caption: "马大校园历史档案库中保存之学会官方初创文献与创会原始徽记。"
      },
      {
        src: "/image/16th_1.gif",
        title: "第十六届执委会就职与重大活动合影",
        caption: "第十六届执委会全体同仁合影，见证全辩与全国中学华文学会生活营之辉煌成就。"
      }
    ];

    return (
      <div>
        <div className="border-b border-blue-900 pb-1 mb-2">
          <h2 className="text-xl font-bold font-serif text-[#00007f]">学会掠影</h2>
        </div>
        <FlybirdBanner width="100%" height={26} />

        <div className="bg-black text-[#ffff00] py-1.5 px-3 my-2 text-center rounded">
          <div className="mq mq-scroll" style={{ '--d': '12s' } as React.CSSProperties}>
            <div className="mq-in font-serif font-bold text-xs">
              那些发黄的相片，有你我岁月的身影......
            </div>
          </div>
        </div>

        {/* Authentic Original Photos Table matching photo.htm */}
        <div className="space-y-6 my-4">
          {/* Photo 1: Ungku Aziz 1986 */}
          <table 
            width="100%" 
            border={1} 
            cellPadding={4} 
            cellSpacing={0} 
            className="bg-white border-collapse shadow-sm border border-slate-600"
          >
            <tbody>
              <tr>
                <td align="center" className="bg-[#f0f4f8] p-3">
                  <div className="relative group inline-block cursor-zoom-in"
                    onClick={() => setActivePhotoLightbox({
                      src: "/image/historical_moment.jpg",
                      title: "1986年12月24日 · Rumah Universiti 记者会",
                      caption: "1986年12月24日，前马大副校长Ungku Aziz皇家教授在Rumah Universiti召开记者招待会，宣布马大华文学会正式成立。"
                    })}
                  >
                    <img 
                      src="/image/historical_moment.jpg" 
                      alt="1986年12月24日记者会" 
                      width={400} 
                      height={266}
                      className="border-2 border-slate-700 max-w-full h-auto shadow transition group-hover:opacity-95"
                    />
                    <div className="absolute bottom-2 right-2 bg-black/75 text-yellow-300 text-[10px] px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition font-mono">
                      点击放大浏览 🔍
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <td className="p-3 bg-white border-t border-slate-400">
                  <p className="text-xs font-bold text-[#00007f] font-serif leading-relaxed text-center">
                    1986年12月24日，前马大副校长Ungku Aziz皇家教授在Rumah Universiti召开记者招待会，宣布马大华文学会正式成立。
                  </p>
                  <p className="text-[11px] text-slate-500 font-mono text-center mt-1">
                    [ 档案原图规格: 400 × 266 像素 · 历史性宣告成立现场 ]
                  </p>
                </td>
              </tr>
            </tbody>
          </table>

          {/* Photo 2: 1st AGM 1987 */}
          <table 
            width="100%" 
            border={1} 
            cellPadding={4} 
            cellSpacing={0} 
            className="bg-white border-collapse shadow-sm border border-slate-600"
          >
            <tbody>
              <tr>
                <td align="center" className="bg-[#f0f4f8] p-3">
                  <div className="relative group inline-block cursor-zoom-in"
                    onClick={() => setActivePhotoLightbox({
                      src: "/image/1stAGM.jpg",
                      title: "1987年1月3日 · 首届会员大会 (1st AGM)",
                      caption: "1987年1月3日下午，那一个令人振奋人心的首届会员大会,至今回想起来，一切仍旧历历在目......"
                    })}
                  >
                    <img 
                      src="/image/1stAGM.jpg" 
                      alt="1987年1月3日首届会员大会" 
                      width={400} 
                      height={272}
                      className="border-2 border-slate-700 max-w-full h-auto shadow transition group-hover:opacity-95"
                    />
                    <div className="absolute bottom-2 right-2 bg-black/75 text-yellow-300 text-[10px] px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition font-mono">
                      点击放大浏览 🔍
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <td className="p-3 bg-white border-t border-slate-400">
                  <p className="text-xs font-bold text-[#00007f] font-serif leading-relaxed text-center">
                    1987年1月3日下午，那一个令人振奋人心的首届会员大会,至至今想起来，一切仍旧历历在目......
                  </p>
                  <p className="text-[11px] text-slate-500 font-mono text-center mt-1">
                    [ 档案原图规格: 400 × 272 像素 · 首届常年大会庄严瞬间 ]
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Archival Milestones Gallery */}
        <div className="mt-8 border-t-2 border-blue-900 pt-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold font-serif text-[#00007f] flex items-center gap-1.5">
              <span>🏛️ 珍贵历史档案图辑 (Archival Photo Collection)</span>
            </h3>
            <span className="text-[11px] font-mono text-slate-500">共收录 6 组核心珍贵文献原图</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {archivalGallery.map((item, idx) => (
              <div 
                key={idx}
                onClick={() => setActivePhotoLightbox(item)}
                className="bg-white border border-slate-300 rounded p-2 hover:border-blue-700 transition cursor-pointer shadow-xs hover:shadow-md group flex flex-col justify-between"
              >
                <div>
                  <div className="h-36 bg-slate-100 rounded overflow-hidden flex items-center justify-center border border-slate-200">
                    <img 
                      src={item.src} 
                      alt={item.title}
                      className="max-h-full max-w-full object-contain group-hover:scale-105 transition duration-200"
                    />
                  </div>
                  <h4 className="font-bold text-xs text-blue-950 font-serif mt-2 group-hover:text-blue-700">
                    {item.title}
                  </h4>
                </div>
                <p className="text-[11px] text-slate-600 font-serif line-clamp-2 mt-1">
                  {item.caption}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="text-right my-3">
          <a href="#top" className="inline-flex items-center text-[11px] text-blue-800 hover:underline">
            <img src="/image/top.gif" alt="Top" className="inline mr-1" /> 回到页面顶端
          </a>
        </div>

        <ColorBarDivider />
      </div>
    );
  };

  return (
    <div className="w-full min-h-screen bg-slate-200/80 py-4 font-pbcum-retro">
      {/* Active Page Switcher */}
      {currentPage === 'index' ? renderHomePage() : (
        renderInnerPage(
          currentPage === 'philosophy' ? renderPhilosophyPage() :
          currentPage === 'history' ? renderHistoryPage() :
          (currentPage === 'structure' || currentPage === 'structureexco') ? renderStructurePage() :
          currentPage === 'exco' ? renderExcoPage() :
          (currentPage === 'unit' || currentPage === 'unit2') ? renderUnitsPage() :
          currentPage === 'activity' ? renderActivityPage() :
          currentPage === 'notice' ? renderNoticePage() :
          currentPage === 'song' ? renderSongPage() :
          currentPage === 'bulletin' ? renderBulletinPage() :
          currentPage === 'wenxian' ? renderWenxianPage() :
          currentPage === 'photo' ? renderPhotoPage() :
          renderHomePage()
        )
      )}

      {/* ARTICLE READER MODAL */}
      {activeArticleModal && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-lg w-full max-h-[85vh] overflow-y-auto p-5 shadow-2xl animate-fadeIn">
            <div className="flex items-start justify-between pb-3 border-b border-slate-200">
              <div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-100 text-blue-800">
                  学会会讯 (十) · {activeArticleModal.category === 'interview' ? '专访' : activeArticleModal.category === 'commentary' ? '评论' : '文学'}
                </span>
                <h3 className="font-bold text-base text-blue-950 mt-1 font-serif">
                  {activeArticleModal.title}
                </h3>
                <p className="text-xs text-slate-500 font-mono">作者：{activeArticleModal.author}</p>
              </div>
              <button 
                onClick={() => setActiveArticleModal(null)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-4 text-xs leading-relaxed text-slate-800 space-y-3 font-serif">
              <p className="bg-slate-50 p-3 rounded border border-slate-200 italic text-slate-700">
                “{activeArticleModal.summary}”
              </p>
              <p>
                在当代多元文化马来西亚与马大校园气候演变之背景下，本文深刻反思了大专青年如何摆脱虚浮口号，回归求真务实之学术关怀与文化自觉。
              </p>
              <p>
                正如作者所言，学识并非仅供个人求职之筹码，更需与土地、人民及历史之脉搏紧密相连。扎实求学，方能真诚回馈。
              </p>
            </div>

            <div className="pt-3 border-t border-slate-200 flex justify-end">
              <button
                onClick={() => setActiveArticleModal(null)}
                className="px-4 py-1.5 rounded bg-blue-800 text-white text-xs font-medium hover:bg-blue-900"
              >
                关闭阅读
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DOCUMENT DETAIL MODAL */}
      {activeDocModal && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-lg w-full max-h-[85vh] overflow-y-auto p-5 shadow-2xl animate-fadeIn">
            <div className="flex items-start justify-between pb-3 border-b border-slate-200">
              <div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-100 text-purple-800">
                  马大华文学会文献档案 · {activeDocModal.categoryLabel}
                </span>
                <h3 className="font-bold text-base text-blue-950 mt-1 font-serif">
                  {activeDocModal.title}
                </h3>
                <p className="text-xs text-slate-500">作者：{activeDocModal.author} {activeDocModal.year && `(${activeDocModal.year}年)`}</p>
              </div>
              <button 
                onClick={() => setActiveDocModal(null)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-4 text-xs leading-relaxed text-slate-800 space-y-3 font-serif">
              <p className="bg-purple-50 p-3 rounded border border-purple-200 text-purple-950">
                <strong>文献核心论述：</strong>{activeDocModal.summary}
              </p>
              <p>
                本篇文献作为马大华文学会思想建构史之重要篇章，系统解答了华文学会“为何而立、因何而战”之本体论课题，成为历代执委与骨干培训之必读经典。
              </p>
              <p className="text-slate-600 font-mono text-[11px]">
                原始档案索引：{activeDocModal.href}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-200 flex justify-end">
              <button
                onClick={() => setActiveDocModal(null)}
                className="px-4 py-1.5 rounded bg-blue-800 text-white text-xs font-medium hover:bg-blue-900"
              >
                完成浏览
              </button>
            </div>
          </div>
        </div>
      )}

      {/* EXCO MEMBER PROFILE MODAL */}
      {activeMemberModal && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-5 shadow-2xl animate-fadeIn">
            <div className="flex items-start justify-between pb-3 border-b border-slate-200">
              <div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-100 text-blue-800 font-semibold">
                  中央执行委员会
                </span>
                <h3 className="font-bold text-lg text-blue-950 mt-1 font-serif">
                  {activeMemberModal.name}
                </h3>
                <p className="text-xs font-bold text-blue-700">{activeMemberModal.role}</p>
              </div>
              <button 
                onClick={() => setActiveMemberModal(null)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-3 text-xs text-slate-700 leading-relaxed space-y-2">
              <p>{activeMemberModal.bio}</p>
              {activeMemberModal.href && (
                <p className="text-[11px] text-slate-500 font-mono pt-2 border-t border-slate-100">
                  原始资料来源: {activeMemberModal.href}
                </p>
              )}
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setActiveMemberModal(null)}
                className="px-3.5 py-1.5 rounded bg-blue-800 text-white text-xs font-medium hover:bg-blue-900"
              >
                确定
              </button>
            </div>
          </div>
        </div>
      )}

      {/* PHILOSOPHY MODAL */}
      {activePhilosophyModal && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-5 shadow-2xl animate-fadeIn">
            <div className="flex items-start justify-between pb-2 border-b border-slate-200">
              <h3 className="font-bold text-base text-blue-950 font-serif">
                {activePhilosophyModal.title}
              </h3>
              <button 
                onClick={() => setActivePhilosophyModal(null)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="py-3 text-xs text-slate-700 leading-relaxed font-serif whitespace-pre-line">
              {activePhilosophyModal.content}
            </div>
            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setActivePhilosophyModal(null)}
                className="px-3.5 py-1.5 rounded bg-blue-800 text-white text-xs font-medium hover:bg-blue-900"
              >
                关 闭
              </button>
            </div>
          </div>
        </div>
      )}

      {/* PHOTO LIGHTBOX MODAL */}
      {activePhotoLightbox && (
        <div 
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 backdrop-blur-xs"
          onClick={() => setActivePhotoLightbox(null)}
        >
          <div 
            className="bg-white rounded-lg max-w-2xl w-full p-4 shadow-2xl animate-fadeIn overflow-hidden border border-slate-400"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-2 border-b border-slate-200">
              <h3 className="font-bold text-sm text-blue-950 font-serif flex items-center gap-1.5">
                <ImageIcon className="w-4 h-4 text-blue-800" />
                <span>{activePhotoLightbox.title}</span>
              </h3>
              <button 
                onClick={() => setActivePhotoLightbox(null)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-800 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-3 flex flex-col items-center justify-center bg-slate-900 rounded my-2 p-2">
              <img 
                src={activePhotoLightbox.src} 
                alt={activePhotoLightbox.title}
                className="max-h-[65vh] max-w-full object-contain rounded shadow"
              />
            </div>

            <div className="bg-slate-50 p-2.5 rounded border border-slate-200 text-xs text-slate-700 leading-relaxed font-serif">
              {activePhotoLightbox.caption}
            </div>

            <div className="pt-2 flex justify-between items-center text-[11px] text-slate-500 font-mono">
              <span>档案路径: {activePhotoLightbox.src}</span>
              <button
                onClick={() => setActivePhotoLightbox(null)}
                className="px-3 py-1 rounded bg-blue-800 text-white text-xs font-medium hover:bg-blue-900"
              >
                关闭预览
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ACTIVITY REPORT DETAIL MODAL WITH AUTHENTIC ORIGINAL ATTACHMENTS */}
      {activeActivityModal && (
        <div 
          className="fixed inset-0 z-50 bg-black/75 flex items-center justify-center p-4 backdrop-blur-xs"
          onClick={() => setActiveActivityModal(null)}
        >
          <div 
            className="bg-white rounded-lg max-w-2xl w-full max-h-[88vh] overflow-y-auto p-5 shadow-2xl animate-fadeIn border border-slate-300"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between pb-3 border-b border-slate-200">
              <div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-100 text-blue-800 font-semibold">
                  学会重点活动回顾 · {activeActivityModal.year || '历史纪事'}
                </span>
                <h3 className="font-bold text-base text-blue-950 mt-1 font-serif">
                  {activeActivityModal.title}
                </h3>
              </div>
              <button 
                onClick={() => setActiveActivityModal(null)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-800 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Event Images Gallery */}
            {activeActivityModal.images && activeActivityModal.images.length > 0 && (
              <div className="my-3 grid grid-cols-1 sm:grid-cols-2 gap-2 bg-slate-50 p-2.5 rounded border border-slate-200">
                {activeActivityModal.images.map((img, i) => (
                  <div key={i} className="flex flex-col items-center bg-white p-2 rounded border border-slate-200 shadow-xs">
                    <img 
                      src={img.src} 
                      alt={img.caption} 
                      className="max-h-48 object-contain rounded hover:scale-102 transition cursor-pointer"
                      onClick={() => setActivePhotoLightbox({
                        src: img.src,
                        title: activeActivityModal.title,
                        caption: img.caption
                      })}
                    />
                    <p className="text-[11px] text-slate-600 font-serif text-center mt-1.5 leading-snug">
                      {img.caption}
                    </p>
                  </div>
                ))}
              </div>
            )}

            <div className="py-2 text-xs leading-relaxed text-slate-800 font-serif whitespace-pre-line space-y-2">
              <p className="bg-blue-50/50 p-3 rounded border border-blue-100 text-blue-950 leading-relaxed">
                {activeActivityModal.content}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-200 flex justify-end">
              <button
                onClick={() => setActiveActivityModal(null)}
                className="px-4 py-1.5 rounded bg-blue-800 text-white text-xs font-medium hover:bg-blue-900"
              >
                关闭简报
              </button>
            </div>
          </div>
        </div>
      )}

      {/* GUESTBOOK MODAL */}
      {guestbookOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-lg w-full max-h-[85vh] overflow-y-auto p-5 shadow-2xl animate-fadeIn">
            <div className="flex items-start justify-between pb-3 border-b border-slate-200">
              <div>
                <h3 className="font-bold text-base text-blue-950 font-serif flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-blue-700" />
                  <span>马大华文学会 · 线上留言簿 (Guestbook)</span>
                </h3>
                <p className="text-xs text-slate-500">欢迎留下来自各地大专校友与同学的勉励与祝词</p>
              </div>
              <button 
                onClick={() => setGuestbookOpen(false)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Post message form */}
            <form onSubmit={handlePostGuestbook} className="my-3 p-3 bg-blue-50/60 rounded border border-blue-200 space-y-2">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="您的姓名 / 身份 (如: 陈大文 / 97届辩论组校友)"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full text-xs p-1.5 rounded border border-slate-300 bg-white"
                  required
                />
              </div>
              <textarea
                rows={2}
                placeholder="写下您的留言或期许..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="w-full text-xs p-1.5 rounded border border-slate-300 bg-white"
                required
              />
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-3 py-1 rounded bg-blue-800 text-white text-xs font-medium hover:bg-blue-900"
                >
                  发表留言
                </button>
              </div>
            </form>

            {/* Message list */}
            <div className="space-y-2.5 max-h-[260px] overflow-y-auto pr-1">
              {guestbookMessages.map((m, i) => (
                <div key={i} className="p-2.5 rounded bg-slate-50 border border-slate-200 text-xs">
                  <div className="flex items-center justify-between font-bold text-blue-950 mb-1">
                    <span>{m.name}</span>
                    <span className="text-[10px] text-slate-400 font-mono">{m.date}</span>
                  </div>
                  <p className="text-slate-700 leading-relaxed">{m.message}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
