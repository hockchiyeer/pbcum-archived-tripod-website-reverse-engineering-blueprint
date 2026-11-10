/**
 * Comprehensive reverse-engineered dataset for Universiti Malaya Chinese Language Society
 * (PBCUM 马来亚大学华文学会 / Persatuan Bahasa Cina Universiti Malaya)
 * Extracted verbatim from historical archive documents.
 */

export interface FileNode {
  name: string;
  type: 'file' | 'folder';
  path: string;
  size?: string;
  count?: number;
  category: 'root' | 'image' | 'structure' | 'philosophy' | 'activity' | 'bulletin' | 'wenxian' | 'unit' | 'poster' | 'former_exco' | 'style' | 'script' | 'third_party';
  description: string;
  modernComponent?: string;
  children?: FileNode[];
}

export interface ExcoMember {
  role: string;
  name: string;
  href?: string;
  bio?: string;
  note?: string;
}

export interface UnitInfo {
  id: string;
  name: string;
  motto: string;
  category: 'interest' | 'admin';
  goals: string[];
  description: string;
  sublinks?: { title: string; href?: string }[];
  clauses?: string[];
}

export interface HistoryItem {
  id: number;
  roman: string;
  title: string;
  content: string;
}

export interface TermHistoryItem {
  term: string;
  academicYear: string;
  theme?: string;
  content: string;
  highlights?: string[];
}

export interface BulletinArticle {
  id: string;
  title: string;
  author: string;
  category: 'interview' | 'commentary' | 'literature';
  href: string;
  summary: string;
  fullExcerpt?: string;
}

export interface LiteratureItem {
  id: string;
  title: string;
  author: string;
  category: 'xianci' | 'pinlun' | 'ganyan';
  categoryLabel: string;
  href: string;
  summary: string;
  year?: string;
}

// 1. REVERSE ENGINEERED FILE & FOLDER TREE (STRICT SPECIFICATION)
export const FILE_STRUCTURE_TREE: FileNode = {
  name: "pbcum_website",
  type: "folder",
  path: "/",
  category: "root",
  description: "Root repository of Universiti Malaya Chinese Language Society (PBCUM 马来亚大学华文学会)",
  count: 285,
  children: [
    {
      name: "Root Directory (32 Root Files)",
      type: "folder",
      path: "/root_files",
      category: "root",
      description: "32 root files comprising live pages, design iterations, core stylesheets, marquee engines, and counters",
      count: 32,
      children: [
        { name: "index.htm", type: "file", path: "/index.htm", size: "11.8 KB", category: "root", description: "Live homepage: 680px card layout, dual marquees, animated header banner, news feed, 12 navigation links", modernComponent: "<HomeCard />" },
        { name: "index_test.htm", type: "file", path: "/index_test.htm", size: "10.9 KB", category: "root", description: "Design iteration 0: Early prototype without full marquee styling", modernComponent: "Archived Draft" },
        { name: "index1.htm", type: "file", path: "/index1.htm", size: "7.7 KB", category: "root", description: "Design iteration 1: First experimental table layout", modernComponent: "Archived Draft" },
        { name: "index2.htm", type: "file", path: "/index2.htm", size: "7.8 KB", category: "root", description: "Design iteration 2: Second table layout variant", modernComponent: "Archived Draft" },
        { name: "index3.htm", type: "file", path: "/index3.htm", size: "7.8 KB", category: "root", description: "Design iteration 3: Third table layout variant", modernComponent: "Archived Draft" },
        { name: "index4.htm", type: "file", path: "/index4.htm", size: "7.8 KB", category: "root", description: "Design iteration 4: Fourth table layout variant", modernComponent: "Archived Draft" },
        { name: "indexcss.htm", type: "file", path: "/indexcss.htm", size: "10.6 KB", category: "root", description: "CSS-based variant: CSS DIV layout alternative to traditional nested TABLEs", modernComponent: "<IndexCssPrototype />" },
        { name: "philosophy.htm", type: "file", path: "/philosophy.htm", size: "5.0 KB", category: "philosophy", description: "学会思想: Core theme ('扎实为经，回馈为纬'), existential value, 3 tenets, 5 strategic goals", modernComponent: "<PhilosophyPage />" },
        { name: "history.htm", type: "file", path: "/history.htm", size: "22.3 KB", category: "root", description: "学会历史: 21 historical milestones (1974-1986) + 12 archive photos + 17 terms history log (1986-2003)", modernComponent: "<HistoryPage />" },
        { name: "structure.htm", type: "file", path: "/structure.htm", size: "8.8 KB", category: "structure", description: "学会组织架构: Visual org chart with interactive hover twin button GIFs", modernComponent: "<OrgChartInteractive />" },
        { name: "structureexco.htm", type: "file", path: "/structureexco.htm", size: "3.0 KB", category: "structure", description: "执委会组织架构: Executive committee internal structure with structureme.gif", modernComponent: "<StructureExcoView />" },
        { name: "exco.htm", type: "file", path: "/exco.htm", size: "12.9 KB", category: "former_exco", description: "执委会名单: 18th & 19th EXCO rosters with dropdown selector for 14th-17th terms", modernComponent: "<ExcoPage />" },
        { name: "unit.htm", type: "file", path: "/unit.htm", size: "20.8 KB", category: "unit", description: "学会各小组 (第一部分): 6 grassroots activity interest sub-units (Debate, Chinese Class, Social Awakening, Culture, Crosstalk, Yaolanshou)", modernComponent: "<UnitsPage />" },
        { name: "unit2.htm", type: "file", path: "/unit2.htm", size: "20.0 KB", category: "unit", description: "学会各小组 (第二部分): 6 administrative divisions (Advisory, Disciplinary, Student Reporters, External, Secretariat, Finance)", modernComponent: "<UnitsAdminPage />" },
        { name: "activity.htm", type: "file", path: "/activity.htm", size: "6.3 KB", category: "activity", description: "特别活动: Major annual initiatives (Quanbian 9th, Quanzhong 3rd, Orientation 2002, Dayao)", modernComponent: "<ActivityPage />" },
        { name: "notice.htm", type: "file", path: "/notice.htm", size: "7.1 KB", category: "root", description: "活动预告: Event noticeboard & AGM 2004 election schedule table with quorum rules", modernComponent: "<NoticePage />" },
        { name: "bulletin.htm", type: "file", path: "/bulletin.htm", size: "9.2 KB", category: "bulletin", description: "学会会讯: Issue 10 bulletin directory with interviews, student essays, and critiques", modernComponent: "<BulletinPage />" },
        { name: "song.htm", type: "file", path: "/song.htm", size: "3.3 KB", category: "root", description: "学会会歌: Society anthem lyrics ('不灭的信念' / 余锦畅作曲, 钟采旺填词) & Web Audio synthesizer", modernComponent: "<SongPage />" },
        { name: "wenxian.htm", type: "file", path: "/wenxian.htm", size: "7.6 KB", category: "wenxian", description: "学会文献: Historical speeches, advisor dedications, and 9 commentary essays", modernComponent: "<WenxianPage />" },
        { name: "photo.htm", type: "file", path: "/photo.htm", size: "2.4 KB", category: "root", description: "学会掠影: Historical photography gallery of 1986 Ungku Aziz announcement and 1st AGM", modernComponent: "<PhotoPage />" },
        { name: "Tripod.htm", type: "file", path: "/Tripod.htm", size: "22.1 KB", category: "third_party", description: "Tripod mirror: Lycos Tripod host wrapper with navigation and banner integration", modernComponent: "Historical Mirror" },
        { name: "marquee_function.htm", type: "file", path: "/marquee_function.htm", size: "2.3 KB", category: "script", description: "Marquee documentation: Technical specification for cross-browser DHTML scrolling text", modernComponent: "Specification Doc" },
        { name: "onmouse_effect.css", type: "file", path: "/onmouse_effect.css", size: "0.9 KB", category: "style", description: "The only site stylesheet: Link pseudo-classes (:hover, :active), font families, text underlines", modernComponent: "Global CSS" },
        { name: "marquee.js", type: "file", path: "/marquee.js", size: "1.4 KB", category: "script", description: "Marquee script: Cross-browser scrolling text engine for Internet Explorer and Netscape", modernComponent: "CSS Keyframes" },
        { name: "marquee1.js", type: "file", path: "/marquee1.js", size: "1.2 KB", category: "script", description: "Marquee script 1: Alternate horizontal scrolling ticker engine", modernComponent: "CSS Keyframes" },
        { name: "marquee_content.js", type: "file", path: "/marquee_content.js", size: "3.8 KB", category: "script", description: "Marquee data: News announcements and AGM election results in JavaScript array", modernComponent: "TypeScript Dataset" },
        { name: "marquee_content1.js", type: "file", path: "/marquee_content1.js", size: "3.4 KB", category: "script", description: "Marquee data 1: Secondary announcement data feed", modernComponent: "TypeScript Dataset" },
        { name: "edit_marquee.js", type: "file", path: "/edit_marquee.js", size: "0.4 KB", category: "script", description: "Marquee utility: Helper script for dynamic ticker text modification", modernComponent: "Script Utility" },
        { name: "about_js.js", type: "file", path: "/about_js.js", size: "1.4 KB", category: "script", description: "Vertical marquee script: 130x160 vertical scrolling news ticker in unit profiles", modernComponent: "CSS Keyframes" },
        { name: "neon.js", type: "file", path: "/neon.js", size: "0.7 KB", category: "script", description: "Neon glow script: Flashing illuminated text effect for announcements", modernComponent: "CSS Animation" },
        { name: "showdate.js", type: "file", path: "/showdate.js", size: "1.0 KB", category: "script", description: "Date script: Chinese lunar calendar and Gregorian date formatter", modernComponent: "Date Formatter" },
        { name: "counter", type: "file", path: "/counter", size: "1.5 KB", category: "root", description: "CountZ hit-counter <img> tag for recording visitor page statistics", modernComponent: "Visitor Counter" }
      ]
    },
    {
      name: "image/ (55 Site-Wide Assets)",
      type: "folder",
      path: "/image",
      category: "image",
      description: "Site-wide visual assets: official crests, animated GIFs, event photographs, and historical plates",
      count: 55,
      children: [
        { name: "Pbcum_logo.gif", type: "file", path: "/image/Pbcum_logo.gif", size: "12.1 KB", category: "image", description: "Official PBCUM Society Crest with Universiti Malaya palm tree emblem & calligraphy banner", modernComponent: "<PbcumLogo />" },
        { name: "flybird.gif", type: "file", path: "/image/flybird.gif", size: "6.9 KB", category: "image", description: "Animated crane banner: 520x30 flying crane birds representing '火浴后的火鸟'", modernComponent: "<FlybirdBanner />" },
        { name: "animate.gif", type: "file", path: "/image/animate.gif", size: "402 KB", category: "image", description: "Welcome graphic: 300x100 illuminated animated greeting banner ('欢迎浏览')", modernComponent: "<WelcomeGraphic />" },
        { name: "zhashi.jpg", type: "file", path: "/image/zhashi.jpg", size: "27.5 KB", category: "image", description: "Original calligraphy banner: '扎实为经，回馈为纬' (Core Society Theme)", modernComponent: "<CalligraphyBanner />" },
        { name: "colorbar.gif", type: "file", path: "/image/colorbar.gif", size: "4.5 KB", category: "image", description: "Spectral rainbow dividing bar (520x1 px)", modernComponent: "<ColorBarDivider />" },
        { name: "red.gif", type: "file", path: "/image/red.gif", size: "0.9 KB", category: "image", description: "Red accent bar graphic", modernComponent: "Decorative Accent" },
        { name: "bullet.gif & bullet1.gif", type: "file", path: "/image/bullet.gif", size: "1.0 KB", category: "image", description: "Retro list bullet icons for document headers", modernComponent: "List Bullet Icon" },
        { name: "back*.gif / next.gif / top.gif", type: "file", path: "/image/top.gif", size: "0.8 KB", category: "image", description: "Navigation arrows: '到最上面' top.gif, back.gif, back1.gif, back2.gif, next.gif", modernComponent: "Navigation Arrows" },
        { name: "read_more.gif & read_more1.gif", type: "file", path: "/image/read_more1.gif", size: "0.7 KB", category: "image", description: "Read More action button GIFs for philosophy and articles", modernComponent: "Button Icon" },
        { name: "structure.gif & structureme.gif", type: "file", path: "/image/structureme.gif", size: "4.5 KB", category: "image", description: "Full hierarchical organizational chart of the 18th Executive Committee", modernComponent: "<StructureDiagramImage />" },
        { name: "historical_moment.jpg", type: "file", path: "/image/historical_moment.jpg", size: "29.5 KB", category: "image", description: "1986 Dec 24: Vice-Chancellor Ungku Aziz announcing PBCUM re-establishment at Rumah Universiti", modernComponent: "<HistoricPhoto1 />" },
        { name: "1stAGM.jpg & 1st_AGM.jpg", type: "file", path: "/image/1stAGM.jpg", size: "37.1 KB", category: "image", description: "1987 Jan 3: Historic 1st Annual General Meeting in Faculty of Arts lecture hall", modernComponent: "<HistoricPhoto2 />" },
        { name: "2nd_ChouWei.jpg", type: "file", path: "/image/2nd_ChouWei.jpg", size: "33.9 KB", category: "image", description: "Historical group portrait: 2nd Preparatory Committee (第二届筹委会执委)", modernComponent: "<HistoricPhoto3 />" },
        { name: "1stQuanBian.jpg", type: "file", path: "/image/1stQuanBian.jpg", size: "24.7 KB", category: "image", description: "1st National Inter-Varsity Chinese Debate Championship (第一届全国大专辩论会)", modernComponent: "<HistoricPhoto4 />" },
        { name: "pbcum.jpg, pbcum1.jpg, pbcum2.jpg", type: "file", path: "/image/pbcum.jpg", size: "16.0 KB", category: "image", description: "Archived campus banners and student assembly moments", modernComponent: "<CampusMomentPhoto />" },
        { name: "14.jpg", type: "file", path: "/image/14.jpg", size: "8.5 KB", category: "image", description: "14th Executive Committee commemorative snapshot", modernComponent: "<Exco14Photo />" },
        { name: "16th_1.gif & 16th_2.gif", type: "file", path: "/image/16th_1.gif", size: "70.8 KB", category: "image", description: "16th Executive Committee anniversary banners", modernComponent: "<Exco16Banner />" },
        { name: "Event Photos (13thQuanWen, 2thQuanzhong, FoodStall...)", type: "folder", path: "/image/events", size: "850 KB", category: "image", description: "Special activity photos: 13thQuanWen1-2.gif, 2thQuanzhong1-5.gif, 2001FoodStall1-2.gif, 2001JiaTingRi.gif, 2002DaXiang1-2.gif, 2002Dayao1-2.gif, 8thQuanbian1.gif", modernComponent: "<EventPhotoArchive />" },
        { name: "history/ (1-12.jpg)", type: "folder", path: "/image/history", size: "118 KB", category: "image", description: "12 photographic plates documenting student struggle from 1974 de-registration to 1986 re-establishment", modernComponent: "<HistoryPhotoFilmstrip />" }
      ]
    },
    {
      name: "structure/ (27 Org-Chart Button GIFs)",
      type: "folder",
      path: "/structure",
      category: "structure",
      description: "Interactive button tiles for organizational flowchart with twin hover '_2' states",
      count: 27,
      children: [
        { name: "Advisor.gif & Advisor_2.gif", type: "file", path: "/structure/Advisor.gif", size: "0.5 KB", category: "structure", description: "Faculty Advisors tile (顾问老师)", modernComponent: "Interactive Button" },
        { name: "AGM.gif & AGM_2.gif", type: "file", path: "/structure/AGM.gif", size: "0.6 KB", category: "structure", description: "Annual General Meeting tile (常年会员大会)", modernComponent: "Interactive Button" },
        { name: "ME.gif & ME_2.gif", type: "file", path: "/structure/ME.gif", size: "0.5 KB", category: "structure", description: "Majlis Eksekutif / 执委会 tile", modernComponent: "Interactive Button" },
        { name: "WaiWuChu.gif & WaiWuChu_2.gif", type: "file", path: "/structure/WaiWuChu.gif", size: "0.5 KB", category: "structure", description: "External Affairs Department tile (外务处)", modernComponent: "Interactive Button" },
        { name: "MiShuChu.gif & MiShuChu_2.gif", type: "file", path: "/structure/MiShuChu.gif", size: "0.6 KB", category: "structure", description: "Secretariat Department tile (秘书处)", modernComponent: "Interactive Button" },
        { name: "CaiWuChu.gif & CaiWuChu_2.gif", type: "file", path: "/structure/CaiWuChu.gif", size: "0.6 KB", category: "structure", description: "Finance Department tile (财务处)", modernComponent: "Interactive Button" },
        { name: "JiLuWeiYuanHui.gif & _2.gif", type: "file", path: "/structure/JiLuWeiYuanHui.gif", size: "0.6 KB", category: "structure", description: "Disciplinary Committee tile (纪律委员会)", modernComponent: "Interactive Button" },
        { name: "XueJiTuan.gif & XueJiTuan_2.gif", type: "file", path: "/structure/XueJiTuan.gif", size: "0.6 KB", category: "structure", description: "Student Reporters Corps tile (学记团)", modernComponent: "Interactive Button" },
        { name: "ZiXunWeiYuanHui.gif & _2.gif", type: "file", path: "/structure/ZiXunWeiYuanHui.gif", size: "0.8 KB", category: "structure", description: "Consultative Committee tile (咨询研究委员会)", modernComponent: "Interactive Button" },
        { name: "unit.gif & unit_2.gif", type: "file", path: "/structure/unit.gif", size: "0.7 KB", category: "structure", description: "Activity Sub-Units tile (学会各小组)", modernComponent: "Interactive Button" },
        { name: "ChouWeiHui.gif & ChouWeiHui_2.gif", type: "file", path: "/structure/ChouWeiHui.gif", size: "0.8 KB", category: "structure", description: "Ad-hoc Working Committees tile (筹委会)", modernComponent: "Interactive Button" },
        { name: "VerticalFrame1.gif & VerticalFrame2.gif", type: "file", path: "/structure/VerticalFrame2.gif", size: "0.9 KB", category: "structure", description: "Vertical connection hierarchy lines", modernComponent: "Tree Connector" },
        { name: "HorizontalFrame1.gif & HorizontalFrame2.gif", type: "file", path: "/structure/HorizontalFrame1.gif", size: "0.3 KB", category: "structure", description: "Horizontal branching connection lines", modernComponent: "Tree Connector" },
        { name: "BlankBlock.gif", type: "file", path: "/structure/BlankBlock.gif", size: "0.1 KB", category: "structure", description: "Transparent table spacer block (82 bytes)", modernComponent: "Spacer Block" }
      ]
    },
    {
      name: "philosophy/ (4 Topic Pages)",
      type: "folder",
      path: "/philosophy",
      category: "philosophy",
      description: "Dedicated single-topic detail pages for core ideological pillars",
      count: 4,
      children: [
        { name: "zhuti.htm", type: "file", path: "/philosophy/zhuti.htm", size: "2.1 KB", category: "philosophy", description: "学会主题: 《扎实为经，回馈为纬》深刻内涵阐释", modernComponent: "<PhilosophyModal />" },
        { name: "mubiao.htm", type: "file", path: "/philosophy/mubiao.htm", size: "2.4 KB", category: "philosophy", description: "学会目标: 五大核心行动发展目标细则", modernComponent: "<PhilosophyModal />" },
        { name: "jiazhi.htm", type: "file", path: "/philosophy/jiazhi.htm", size: "2.3 KB", category: "philosophy", description: "存在价值: 《通过华族文化精华，改善社会》宣言", modernComponent: "<PhilosophyModal />" },
        { name: "zongzhi.htm", type: "file", path: "/philosophy/zongzhi.htm", size: "2.0 KB", category: "philosophy", description: "学会宗旨: 创会三大法定宪章宗旨", modernComponent: "<PhilosophyModal />" }
      ]
    },
    {
      name: "activity/ (20 Files: Reports & Photos)",
      type: "folder",
      path: "/activity",
      category: "activity",
      description: "Event documentation, retrospective reports, and photographs of major annual student initiatives",
      count: 20,
      children: [
        { name: "8thquanbian.htm", type: "file", path: "/activity/8thquanbian.htm", size: "6.4 KB", category: "activity", description: "2001年第8届全国大专辩论会纪实与赛果", modernComponent: "<ActivityDetail />" },
        { name: "2thquanzhong.htm", type: "file", path: "/activity/2thquanzhong.htm", size: "5.8 KB", category: "activity", description: "2001年第2届全国中学生生活营回顾报告", modernComponent: "<ActivityDetail />" },
        { name: "dayao2002.htm", type: "file", path: "/activity/dayao2002.htm", size: "5.0 KB", category: "activity", description: "2002年度摇篮手创作歌曲发表演绎会回顾", modernComponent: "<ActivityDetail />" },
        { name: "13thquanwen.htm", type: "file", path: "/activity/13thquanwen.htm", size: "6.5 KB", category: "activity", description: "第13届全国大专文学奖颁奖典礼与得奖名单", modernComponent: "<ActivityDetail />" },
        { name: "familygather2001.htm", type: "file", path: "/activity/familygather2001.htm", size: "5.9 KB", category: "activity", description: "2001年华文学会家庭聚会纪实", modernComponent: "<ActivityDetail />" },
        { name: "familygather2002.htm", type: "file", path: "/activity/familygather2002.htm", size: "5.7 KB", category: "activity", description: "2002年华文学会家庭聚会回顾", modernComponent: "<ActivityDetail />" },
        { name: "foodstall2001.htm", type: "file", path: "/activity/foodstall2001.htm", size: "4.8 KB", category: "activity", description: "2001年毕业典礼华文学会食物摊义卖与基金筹募", modernComponent: "<ActivityDetail />" },
        { name: "yingxinzhou2002.htm", type: "file", path: "/activity/yingxinzhou2002.htm", size: "9.0 KB", category: "activity", description: "2002/2003年度华文学会迎新周迎新晚会特刊", modernComponent: "<ActivityDetail />" },
        { name: "peixunying2002.htm", type: "file", path: "/activity/peixunying2002.htm", size: "5.1 KB", category: "activity", description: "2002年华文学会会员干部培训营", modernComponent: "<ActivityDetail />" },
        { name: "quanbianyuanqi.htm & quanbianjiazhi.htm", type: "file", path: "/activity/quanbianyuanqi.htm", size: "12.8 KB", category: "activity", description: "全国大专辩论会缘起与辩论价值哲学专论", modernComponent: "<ActivityDetail />" },
        { name: "lijiesaihui.htm", type: "file", path: "/activity/lijiesaihui.htm", size: "13.5 KB", category: "activity", description: "历届全国大专辩论会赛绩总录 (1989-2003)", modernComponent: "<ActivityDetail />" },
        { name: "Activity Photographs (8 assets)", type: "folder", path: "/activity/photos", size: "1.7 MB", category: "image", description: "yinxinwanhui2002.jpg, peixunying2002.jpg, jiatingri2002.jpg, jiatingri2002_alt.jpg, AGM2003.jpg, 45.jpg, 1stSing-Mal.GIF, db950001.JPG", modernComponent: "<PhotoGallery />" }
      ]
    },
    {
      name: "bulletin/ (14 Articles)",
      type: "folder",
      path: "/bulletin",
      category: "bulletin",
      description: "Issue 10 Society Bulletin articles, one distinct page per author",
      count: 14,
      children: [
        { name: "zhuxi.htm", type: "file", path: "/bulletin/zhuxi.htm", size: "4.2 KB", category: "bulletin", description: "专访马大华文学会主席 (叶文彬)", modernComponent: "<ArticleDetail />" },
        { name: "zhixing.htm", type: "file", path: "/bulletin/zhixing.htm", size: "3.8 KB", category: "bulletin", description: "专访学生理事会代表许志兴 / 陈贞荣撰写", modernComponent: "<ArticleDetail />" },
        { name: "jiannan.htm", type: "file", path: "/bulletin/jiannan.htm", size: "4.5 KB", category: "bulletin", description: "吴健南: 《对马大生的期许：回归单纯的学习态度》", modernComponent: "<ArticleDetail />" },
        { name: "jiannan2.htm", type: "file", path: "/bulletin/jiannan2.htm", size: "4.8 KB", category: "bulletin", description: "吴健南: 《大专生与政治参与》", modernComponent: "<ArticleDetail />" },
        { name: "jiannan3.htm", type: "file", path: "/bulletin/jiannan3.htm", size: "4.9 KB", category: "bulletin", description: "吴健南: 《大专校园竞选感言：我也有一个梦》", modernComponent: "<ArticleDetail />" },
        { name: "guangliang.htm", type: "file", path: "/bulletin/guangliang.htm", size: "3.1 KB", category: "bulletin", description: "谢光亮: 《手扎四篇》", modernComponent: "<ArticleDetail />" },
        { name: "guiting.htm", type: "file", path: "/bulletin/guiting.htm", size: "3.5 KB", category: "bulletin", description: "吕桂婷: 《大学生习态度改良刍议》", modernComponent: "<ArticleDetail />" },
        { name: "minzhi.htm", type: "file", path: "/bulletin/minzhi.htm", size: "3.2 KB", category: "bulletin", description: "黄敏芝: 《扭转命运》、《鸽子 VS 和平》、《牡丹 VS 绿叶》", modernComponent: "<ArticleDetail />" },
        { name: "xin.htm", type: "file", path: "/bulletin/xin.htm", size: "2.1 KB", category: "bulletin", description: "馨: 《心情小记》", modernComponent: "<ArticleDetail />" },
        { name: "zejing.htm", type: "file", path: "/bulletin/zejing.htm", size: "2.3 KB", category: "bulletin", description: "泽靖: 《等候巴士》", modernComponent: "<ArticleDetail />" },
        { name: "jingling.htm", type: "file", path: "/bulletin/jingling.htm", size: "2.0 KB", category: "bulletin", description: "精灵: 《给没有人的信》", modernComponent: "<ArticleDetail />" },
        { name: "yourui.htm", type: "file", path: "/bulletin/yourui.htm", size: "2.8 KB", category: "bulletin", description: "张尤蕊: 《心情贵宾》、《待航》", modernComponent: "<ArticleDetail />" },
        { name: "zhenrong.htm", type: "file", path: "/bulletin/zhenrong.htm", size: "4.6 KB", category: "bulletin", description: "陈贞荣: 《文西阿都拉•2003游X大》、《祭 X 大文》", modernComponent: "<ArticleDetail />" },
        { name: "haifeng.htm", type: "file", path: "/bulletin/haifeng.htm", size: "2.5 KB", category: "bulletin", description: "蓝色海风: 《老哥》", modernComponent: "<ArticleDetail />" }
      ]
    },
    {
      name: "wenxian/ (14 Documents: Tributes & Commentary)",
      type: "folder",
      path: "/wenxian",
      category: "wenxian",
      description: "Official documents: 4 advisor/presidential tributes, 9 critical essays, and 1 historical reflection",
      count: 14,
      children: [
        { name: "18thguwenxianci.htm", type: "file", path: "/wenxian/18thguwenxianci.htm", size: "2.8 KB", category: "wenxian", description: "2003年度学会代顾问老师周添健献词", modernComponent: "<DocumentDetail />" },
        { name: "18thzhuxixianci.htm", type: "file", path: "/wenxian/18thzhuxixianci.htm", size: "3.2 KB", category: "wenxian", description: "2003年度学会主席潘宏文迎新献词", modernComponent: "<DocumentDetail />" },
        { name: "xianci1.htm", type: "file", path: "/wenxian/xianci1.htm", size: "2.7 KB", category: "wenxian", description: "2002年度学会顾问老师谢爱萍博士献词", modernComponent: "<DocumentDetail />" },
        { name: "xianci2.htm", type: "file", path: "/wenxian/xianci2.htm", size: "2.7 KB", category: "wenxian", description: "2002年度学会主席丁国亮迎新献词", modernComponent: "<DocumentDetail />" },
        { name: "pinlun1.htm", type: "file", path: "/wenxian/pinlun1.htm", size: "3.2 KB", category: "wenxian", description: "吴学勤: 《学会的存在价值》", modernComponent: "<DocumentDetail />" },
        { name: "pinlun2.htm", type: "file", path: "/wenxian/pinlun2.htm", size: "3.0 KB", category: "wenxian", description: "刘敬文: 《勇敢向前迈开脚步．保持你独特的容姿》", modernComponent: "<DocumentDetail />" },
        { name: "pinlun3.htm", type: "file", path: "/wenxian/pinlun3.htm", size: "3.1 KB", category: "wenxian", description: "林猷荃: 《从三重矛盾看马大华文学会》", modernComponent: "<DocumentDetail />" },
        { name: "pinlun4.htm", type: "file", path: "/wenxian/pinlun4.htm", size: "2.9 KB", category: "wenxian", description: "苏爱萍: 《省思 ·期望》", modernComponent: "<DocumentDetail />" },
        { name: "pinlun5.htm", type: "file", path: "/wenxian/pinlun5.htm", size: "3.3 KB", category: "wenxian", description: "余福祺: 《摆脱多元的迷失，走出自我的风格》", modernComponent: "<DocumentDetail />" },
        { name: "pinlun6.htm", type: "file", path: "/wenxian/pinlun6.htm", size: "3.4 KB", category: "wenxian", description: "吴健南: 《以多元包容的精神来灌溉学会》", modernComponent: "<DocumentDetail />" },
        { name: "pinlun7.htm", type: "file", path: "/wenxian/pinlun7.htm", size: "3.0 KB", category: "wenxian", description: "陈政弘: 《校园文化的困境》", modernComponent: "<DocumentDetail />" },
        { name: "pinlun8.htm", type: "file", path: "/wenxian/pinlun8.htm", size: "3.2 KB", category: "wenxian", description: "丁国亮: 《背弃空泛的活动包袱》", modernComponent: "<DocumentDetail />" },
        { name: "pinlun.htm", type: "file", path: "/wenxian/pinlun.htm", size: "3.1 KB", category: "wenxian", description: "余福祺: 《拥抱价值 抓紧信念》", modernComponent: "<DocumentDetail />" },
        { name: "ganyan1.htm", type: "file", path: "/wenxian/ganyan1.htm", size: "4.5 KB", category: "wenxian", description: "何国忠博士: 《残存记忆中的腾跃--马大华文学会筹委会点滴》", modernComponent: "<DocumentDetail />" }
      ]
    },
    {
      name: "unit/ (3 Files)",
      type: "folder",
      path: "/unit",
      category: "unit",
      description: "Sub-unit member rosters and cultural calligraphy sub-pages",
      count: 3,
      children: [
        { name: "unit_member.htm", type: "file", path: "/unit/unit_member.htm", size: "4.2 KB", category: "unit", description: "六大活动小组常设执委名单 (Debate, Chinese Class, Culture...)", modernComponent: "<UnitMembersList />" },
        { name: "unit_member2.htm", type: "file", path: "/unit/unit_member2.htm", size: "4.0 KB", category: "unit", description: "行政各处室与各委员会成员全名单", modernComponent: "<UnitAdminMembersList />" },
        { name: "wenhua/shufa.htm", type: "file", path: "/unit/wenhua/shufa.htm", size: "3.6 KB", category: "unit", description: "文化组书法研习班章程与师资介绍", modernComponent: "<CalligraphyClassModal />" }
      ]
    },
    {
      name: "bianlunzu/ (2 Files)",
      type: "folder",
      path: "/bianlunzu",
      category: "unit",
      description: "Chinese debate group dedicated portal and match results",
      count: 2,
      children: [
        { name: "index.htm", type: "file", path: "/bianlunzu/index.htm", size: "3.5 KB", category: "unit", description: "马大华文学会辩论组专属主页", modernComponent: "<DebateGroupPortal />" },
        { name: "result.htm", type: "file", path: "/bianlunzu/result.htm", size: "4.1 KB", category: "unit", description: "国内外大专辩论赛历年辉煌战绩与对垒记录", modernComponent: "<DebateResultsViewer />" }
      ]
    },
    {
      name: "poster/ (20 Items: Posters & Docs)",
      type: "folder",
      path: "/poster",
      category: "poster",
      description: "Event posters (GIF/JPG) with HTML wrappers + quanzhong registration forms",
      count: 20,
      children: [
        { name: "AGM2003.jpg & agm2003.htm", type: "file", path: "/poster/agm2003.htm", size: "49.2 KB", category: "poster", description: "2003年会员大会改选宣传海报与网页", modernComponent: "<PosterModal />" },
        { name: "poster1.GIF & poster1.htm", type: "file", path: "/poster/poster1.htm", size: "38.5 KB", category: "poster", description: "全国大专辩论会官方宣传海报", modernComponent: "<PosterModal />" },
        { name: "DaXiang2003.gif & daxiang2003.htm", type: "file", path: "/poster/daxiang2003.htm", size: "52.1 KB", category: "poster", description: "2003年大马相声节专场宣传海报", modernComponent: "<PosterModal />" },
        { name: "feixingshu.gif & feixingshu.htm", type: "file", path: "/poster/feixingshu.htm", size: "44.6 KB", category: "poster", description: "飞行书文化巡回图书展海报", modernComponent: "<PosterModal />" },
        { name: "yaolanshou_poster1.jpg & .htm", type: "file", path: "/poster/yaolanshou_poster1.htm", size: "46.2 KB", category: "poster", description: "摇篮手创作歌曲专辑发售宣传海报", modernComponent: "<PosterModal />" },
        { name: "WenJuan2002.gif & wenjuan2002.htm", type: "file", path: "/poster/wenjuan2002.htm", size: "39.0 KB", category: "poster", description: "大专生社会关怀调查问卷海报", modernComponent: "<PosterModal />" },
        { name: "quanzhong/biaoge.doc & Jian", type: "file", path: "/poster/quanzhong/biaoge.doc", size: "65.0 KB", category: "poster", description: "第3届全国中学生生活营学员报名表 Word 文档与简章", modernComponent: "<DownloadLink />" }
      ]
    },
    {
      name: "former_exco/ (74 Files)",
      type: "folder",
      path: "/former_exco",
      category: "former_exco",
      description: "14th-18th committee archives, member portraits, and individual per-post pages",
      count: 74,
      children: [
        { name: "18th_exco/ (16 pages)", type: "folder", path: "/former_exco/18th_exco", size: "38 KB", category: "former_exco", description: "President, VP Ext/Int, Secretary, Treasurer, Unit heads profile pages", modernComponent: "<ExcoProfileModal />" },
        { name: "17th.htm", type: "file", path: "/former_exco/17th.htm", size: "4.2 KB", category: "former_exco", description: "第十七届执委会全名单 (2002/2003)", modernComponent: "<ExcoHistoricalArchive />" },
        { name: "16th.htm", type: "file", path: "/former_exco/16th.htm", size: "4.0 KB", category: "former_exco", description: "第十六届执委会全名单 (2001/2002)", modernComponent: "<ExcoHistoricalArchive />" },
        { name: "15th.htm", type: "file", path: "/former_exco/15th.htm", size: "3.9 KB", category: "former_exco", description: "第十五届执委会全名单 (2000/2001)", modernComponent: "<ExcoHistoricalArchive />" },
        { name: "14th.htm", type: "file", path: "/former_exco/14th.htm", size: "3.8 KB", category: "former_exco", description: "第十四届执委会全名单 (1999/2000)", modernComponent: "<ExcoHistoricalArchive />" }
      ]
    },
    {
      name: "Tripod_files/ (24 Files)",
      type: "folder",
      path: "/Tripod_files",
      category: "third_party",
      description: "Saved Tripod page: tripod.css, dmenu.js, menubuilder.js, headerLayer.js and its navigation GIFs",
      count: 24,
      children: [
        { name: "tripod.css", type: "file", path: "/Tripod_files/tripod.css", size: "4.2 KB", category: "style", description: "Lycos Tripod hosting portal external style rules", modernComponent: "Archived CSS" },
        { name: "dmenu.js & menubuilder.js", type: "file", path: "/Tripod_files/dmenu.js", size: "12.5 KB", category: "script", description: "Dynamic DHTML dropdown menu scripts for hosting frame", modernComponent: "Archived JS" },
        { name: "headerLayer.js", type: "file", path: "/Tripod_files/headerLayer.js", size: "6.1 KB", category: "script", description: "Floating header banner injection script", modernComponent: "Archived JS" },
        { name: "Navigation GIFs (1.gif, alert.gif, go.gif...)", type: "folder", path: "/Tripod_files/gifs", size: "18.2 KB", category: "image", description: "tripod_logo_bottom_new.gif, tab_right_active.gif, sitebuilder_spot.gif, etc.", modernComponent: "Archived GIFs" }
      ]
    }
  ]
};

// 2. VISUAL LAYOUT SPECIFICATION TOKENS
export const VISUAL_LAYOUT_SPEC = {
  palettes: [
    { name: "Royal Blue (Brand & Sidebar)", hex: "#00007f", rgb: "rgb(0, 0, 127)", usage: "Main branding, active headers, sidebar background, table title cells" },
    { name: "Pastel Blue (Table Row Header)", hex: "#e8f2fd", rgb: "rgb(232, 242, 253)", usage: "Alternate table headers, left-column category cells, sub-table borders" },
    { name: "Cream Yellow (Table Data Cell)", hex: "#ffffcc", rgb: "rgb(255, 255, 204)", usage: "Table content bodies, lists, former EXCO selector row" },
    { name: "Bright Yellow (Marquee Highlight)", hex: "#ffff00", rgb: "rgb(255, 255, 0)", usage: "Primary marquee motto text, sub-navigation border frames" },
    { name: "Cyan (Sub-Marquee & Headers)", hex: "#00ffff", rgb: "rgb(0, 255, 255)", usage: "Bulletin & Literature sub-header marquee text, philosophy tags" },
    { name: "Sky Blue (Table Sub-Nav)", hex: "#6699ff", rgb: "rgb(102, 153, 255)", usage: "Unit 2x5 sub-navigation buttons, Literature author blocks" },
    { name: "Deep Link Blue", hex: "#0000ff", rgb: "rgb(0, 0, 255)", usage: "Hyperlinks, document anchors, candidate highlights" },
    { name: "Accent Red (Urgent Notice)", hex: "#ff0000", rgb: "rgb(255, 0, 0)", usage: "Election warning titles, deadline alerts, hot news links" },
    { name: "Imperial Violet (Philosophy Border)", hex: "#9933ff", rgb: "rgb(153, 51, 255)", usage: "Philosophy 400px table outer border, history chapter numbering" },
    { name: "Mandarin Orange (Anthem Header)", hex: "#ff6600", rgb: "rgb(255, 102, 0)", usage: "Song title banner, history subtitle headers" },
    { name: "Pitch Black (Marquee Track)", hex: "#000000", rgb: "rgb(0, 0, 0)", usage: "Marquee ticker background bar, 18th EXCO sub-header stripe" }
  ],
  containers: [
    { name: "Home Card Container", width: "680px", structure: "Single-card container on body.home with 1px border and centered margin auto" },
    { name: "Inner Layout Container", width: "740px", structure: "Two-column grid (.layout): 180px royal blue sidebar (.side) + 540px main column" },
    { name: "Sidebar (.side)", width: "180px", structure: "Sticky/fixed width sidebar with brand anchor, 10-link vertical list (.on for active), contact link" },
    { name: "Main Content Table (.c)", width: "520px", structure: "Fixed 520px nested table layout for headers, content tables, and horizontal rainbow dividers" },
    { name: "Vertical News Marquee", dimensions: "200px height, 46s duration", structure: ".mq-up container with upwards translating article blocks, pause on hover" },
    { name: "Horizontal Motto Marquees", dimensions: "4s - 13s duration", structure: "Single-line banner scrolling '扎实为经，回馈为纬。' across 520px table cell" }
  ],
  typography: [
    { level: "Page Title", size: "24px", weight: "Bold", color: "#00007f or #3366ff", font: "SimSun / Songti / Serif" },
    { level: "Section Header", size: "18px", weight: "Bold", color: "#ffff00, #ff6600, #3300ff", font: "SimSun / Serif" },
    { level: "Sub-Header / Announcement", size: "16px", weight: "Bold", color: "#ffffcc or #000000", font: "SimSun / Sans" },
    { level: "Table Body / List Text", size: "13px", weight: "Regular", color: "#00007f or #000000", font: "SimSun / Sans" },
    { level: "Hyperlink Text", size: "13px", weight: "Underlined", color: "#0000ff", font: "SimSun / Sans" }
  ]
};

// 3. EXECUTIVE COMMITTEES (18TH, 19TH, AND HISTORICAL TERMS)
export const EXCO_18TH: ExcoMember[] = [
  { role: "主席", name: "潘宏文", href: "former_exco/18th_exco/president.htm", bio: "马大经济系。第18届马大华文学会主席，秉承'扎实为经，回馈为纬'之思想方针统摄全局。" },
  { role: "外务副主席", name: "谢光亮", href: "former_exco/18th_exco/ext_vice_president.htm", bio: "外务副主席，主管学会涉外事务、跨校大专交流、对社会团体联络与外交文宣。" },
  { role: "内务副主席", name: "杨丽萍", href: "former_exco/18th_exco/int_vice_president.htm", bio: "内务副主席，负责统筹内部日常营运、六大小组及行政部门协调、会员福利。" },
  { role: "总秘书", name: "罗伟杰", href: "former_exco/18th_exco/secretary.htm", bio: "总秘书，掌管学会文书档案保存系统、例常执委会议纪要与校方公文书信往来。" },
  { role: "副总秘书", name: "李志祥", href: "former_exco/18th_exco/vice_secretary.htm", bio: "副总秘书，协助总秘书处理行政文书、各小组秘书处联络与会员资料库。" },
  { role: "总财政", name: "江妙奇", href: "former_exco/18th_exco/treasurer.htm", bio: "总财政，主管学会财务管理系统、账目收支审核、活动拨款与年度财务报告。" },
  { role: "副总财政", name: "唐志斌", href: "former_exco/18th_exco/vice_treasurer.htm", bio: "副总财政，协助总财政处理财务账目、管理学会例常款项及财务处日常事务。" },
  { role: "辩论组组长", name: "刘燕金", href: "former_exco/18th_exco/bianlun.htm", bio: "辩论组组长，统筹马大华语辩论队梯队训练、华语辩论研讨会及辩风建设。" },
  { role: "华文班组长", name: "张永威", href: "former_exco/18th_exco/huawen.htm", bio: "华文班组长，推动校内三级华文教学课程，促进不谙华文华裔及友族学生文化交流。" },
  { role: "社醒组组长", name: "悬空", note: "本届由内务处暂代主持相关社会觉醒议题" },
  { role: "文化组组长", name: "吴晓萍", href: "former_exco/18th_exco/wenhua.htm", bio: "文化组组长，主持书法班、茶艺班、篆刻班与戏剧班，推动文化普及化。" },
  { role: "相声组组长", name: "黄佩美", href: "former_exco/18th_exco/xiangsheng.htm", bio: "相声组组长，推动本土相声剧本创作、相声演员培训与校园幽默讽喻演出。" },
  { role: "摇篮手组长", name: "刘康蓝", href: "former_exco/18th_exco/yaolan.htm", bio: "摇篮手组长，统筹校园原创歌曲音乐创作、创作人发表会及大摇演绎会。" },
  { role: "特别活动咨询委员", name: "苏梦蕾、梁泰荣", href: "former_exco/18th_exco/tewei1.htm", bio: "资深学会骨干，为全国大专辩论会、全国中学生生活营等重案提供策略指导。" }
];

export const EXCO_19TH: ExcoMember[] = [
  { role: "主席", name: "王天政" },
  { role: "外务副主席", name: "柯永善" },
  { role: "内务副主席", name: "邓健庆" },
  { role: "总秘书", name: "王秀娴" },
  { role: "副总秘书", name: "暂悬空" },
  { role: "总财政", name: "王惠均" },
  { role: "副总财政", name: "李景华" },
  { role: "辩论组组长", name: "彭雪琴" },
  { role: "华文班组长", name: "赵田宏" },
  { role: "社醒组组长", name: "张诗婷" },
  { role: "文化组组长", name: "陈丽诗" },
  { role: "相声组组长", name: "姚荷荃" },
  { role: "摇篮手组长", name: "暂悬空" },
  { role: "特别活动咨询委员", name: "黄妙韵、罗文尧" }
];

export const EXCO_17TH: ExcoMember[] = [
  { role: "主席", name: "丁国亮" },
  { role: "外务副主席", name: "林欣达" },
  { role: "内务副主席", name: "潘宏文" },
  { role: "总秘书", name: "黄敏芝" },
  { role: "副总秘书", name: "罗伟杰" },
  { role: "总财政", name: "叶瑞华" },
  { role: "副总财政", name: "江妙奇" },
  { role: "辩论组组长", name: "郑立慷" },
  { role: "华文班组长", name: "罗健良" },
  { role: "社醒组组长", name: "谢光亮" },
  { role: "文化组组长", name: "何淑娴" },
  { role: "相声组组长", name: "梁泰荣" },
  { role: "摇篮手组长", name: "黄冠民" },
  { role: "特别活动咨询委员", name: "余福祺、陈政弘" }
];

export const EXCO_16TH: ExcoMember[] = [
  { role: "主席", name: "吴学勤" },
  { role: "外务副主席", name: "丁国亮" },
  { role: "内务副主席", name: "李运强" },
  { role: "总秘书", name: "杨佩诗" },
  { role: "副总秘书", name: "黄敏芝" },
  { role: "总财政", name: "陈翠芳" },
  { role: "副总财政", name: "叶瑞华" },
  { role: "辩论组组长", name: "胡渐彪" },
  { role: "华文班组长", name: "陈政弘" },
  { role: "社醒组组长", name: "苏爱萍" },
  { role: "文化组组长", name: "林欣达" },
  { role: "相声组组长", name: "周若鹏" },
  { role: "摇篮手组长", name: "余锦畅" },
  { role: "特别活动咨询委员", name: "吴健南、刘敬文" }
];

export const EXCO_15TH: ExcoMember[] = [
  { role: "主席", name: "吴健南" },
  { role: "外务副主席", name: "吴学勤" },
  { role: "内务副主席", name: "林猷荃" },
  { role: "总秘书", name: "刘敬文" },
  { role: "总财政", name: "陈秋燕" },
  { role: "辩论组组长", name: "胡渐彪" },
  { role: "华文班组长", name: "李运强" },
  { role: "文化组组长", name: "苏爱萍" },
  { role: "相声组组长", name: "叶文彬" },
  { role: "摇篮手组长", name: "钟采旺" }
];

export const EXCO_14TH: ExcoMember[] = [
  { role: "主席", name: "林猷荃" },
  { role: "外务副主席", name: "吴健南" },
  { role: "内务副主席", name: "陈行武" },
  { role: "总秘书", name: "黄佩玲" },
  { role: "总财政", name: "林美凤" },
  { role: "辩论组组长", name: "陈绍康" },
  { role: "华文班组长", name: "许志兴" },
  { role: "文化组组长", name: "刘敬文" }
];

// 4. UNITS AND SUB-GROUPS DATA
export const UNITS_DATA: UnitInfo[] = [
  {
    id: "bianlunzu",
    name: "辩论组",
    category: "interest",
    motto: "激荡思维，掀辩浪。",
    sublinks: [
      { title: "小组历史", href: "bianlunzu" },
      { title: "组委名单", href: "unit/unit_member.htm#bianlunzu" },
      { title: "活动看板", href: "notice.htm" },
      { title: "最新资讯" }
    ],
    goals: [
      "培养出色辩手。",
      "树立优良辩风。",
      "鼓励独立思考。",
      "倡导人文关怀。"
    ],
    description: "辩论组的成立，提供一个空间予组员去学习，而不只是为了找出可以上台的辩论员。这个小组让组员们学习从不同的角度去探讨及分析课题，学习如何全面性地思考及建立批判精神，一个好的辩论员不只要只齿伶俐并掌说话的技巧，还要具备学识、人格修养、语言，内涵及团队精神等条件。"
  },
  {
    id: "huawenban",
    name: "华文班",
    category: "interest",
    motto: "学好华文，掌握华语。",
    sublinks: [
      { title: "小组历史" },
      { title: "组委名单", href: "unit/unit_member.htm#huawenban" },
      { title: "活动看板" },
      { title: "最新资讯" }
    ],
    goals: [
      "鼓励及推广使用正确的华文、华语。",
      "通过教育与学生之间的交流，促进谅解和团结精神。"
    ],
    description: "华文班为不谙华文的华裔大专生及友族提供了一个学习华文和交流的空间。华文班共分为三个等级：第一等级是为完全没有基础的学员而设（基础和非基础班）；第二等级的学员只能掌握基本的华语；第三等级的学员有能力阅读和书写浅白的华文。"
  },
  {
    id: "shexingzu",
    name: "社醒组",
    category: "interest",
    motto: "青年是时代的眼睛。",
    sublinks: [
      { title: "小组历史" },
      { title: "组委名单", href: "unit/unit_member.htm#shexingzu" },
      { title: "活动看板", href: "notice.htm" },
      { title: "最新资讯" }
    ],
    goals: [
      "提高大专生的社会意识，以加强大专生对社会现象的关注。",
      "提高大专生的批判能力与独立思考能力，以便塑造更具人格与个性的大专生。",
      "推动大学内的阅读与知识探讨风气，以便促使大专生建立正确的思想与观念。"
    ],
    description: "社会觉醒组的成立是在于提供一个管道让组员从民主与人权的观点探讨社会课题，从中激发组员的思考，分析与判断能力，希望通过组在提升组员的社会意识方面给予适当的启发。让他们从活动中学习自我充实与定位，进而为社会作出贡献。"
  },
  {
    id: "wenhuazu",
    name: "文化组",
    category: "interest",
    motto: "释放文化，感受文化。",
    sublinks: [
      { title: "小组历史" },
      { title: "组委名单", href: "unit/unit_member.htm#wenhuazu" },
      { title: "活动看板", href: "notice.htm" },
      { title: "关于中华文化" }
    ],
    goals: [
      "传承中华文化进而将其精华发扬光大。",
      "加强大专生对中华文化的了解及认识，以便促进各族文化的交流。",
      "探索中华哲学思想，以助大专生建立个人正确的价值观和人生观。"
    ],
    description: "文化组所定下的路线主要以重质不重量为活动之理念，将几项活动固定化及普及化，把“文化”从高不可攀的的殿堂里释放出来。文化组的例常活动包括：书法班、篆刻班、茶艺班以及戏剧班。"
  },
  {
    id: "xiangshengzu",
    name: "相声组",
    category: "interest",
    motto: "只说给你笑。",
    sublinks: [
      { title: "小组历史" },
      { title: "组委名单", href: "unit/unit_member.htm#xiangshengzu" },
      { title: "活动看板", href: "notice.htm" },
      { title: "最新资讯" }
    ],
    goals: [
      "了解与发展相声的文化。",
      "培训马来西亚的相声演员。",
      "创作本土风格的相声脚本。",
      "提高大专生的社会意识。"
    ],
    description: "相声的活动主要是在课余时间提供空间让组员们发挥其演绎才华及训练其应变能力，以幽默方式来反省与影射社会的弊病与现象，在笑之余，达到传达迅息与提升社会觉醒之功能。"
  },
  {
    id: "yaolanshou",
    name: "摇篮手",
    category: "interest",
    motto: "是谁的手，轻轻摆弄音乐的摇篮？",
    sublinks: [
      { title: "小组历史" },
      { title: "组委名单", href: "unit/unit_member.htm#yaolanshou" },
      { title: "活动看板", href: "notice.htm" },
      { title: "最新资讯" }
    ],
    goals: [
      "百花齐放－以马大为中心点，作为创作爱好者发挥才华的场所，孕育多类型歌乐者，营造百家争鸣的局面。",
      "南征北伐－把马大生的歌曲带出校园，到其他大专或中学开发表会，扩大视野及增进对校外创作趋势的掌握。",
      "四海一家－邀请各大专到校园及组团前往各大专去表演，促进各大专创作歌曲的交流与了解，形成一股庞大的创作风气。"
    ],
    description: "摇篮手不但汇集了校园内热爱歌曲创作的同学，更提供他们互相学习，互相观摩的空间。创作并不是个人的，它必须结合创作者与周遭事物的情感联系，进而显示出作者对社会的关心。歌曲亦能抒发创作者对社会的情操‘关怀与期盼’。"
  },
  {
    id: "zixunweiyuanhui",
    name: "咨询研究委员会",
    category: "admin",
    motto: "扎实为经，回馈为纬。",
    sublinks: [
      { title: "小组历史" },
      { title: "成员名单", href: "unit/unit_member2.htm#zixunweiyuanhui" },
      { title: "活动看板" },
      { title: "最新资讯" }
    ],
    goals: [
      "定期召开会议，并列席执委会会议以协助执委会检讨及拟定学会方针及活动重点等。",
      "针对学会在行政、织及校内外交流方面所遇到的难题提供咨询性质的协助。",
      "必须针对执委会交托该委员会的课题进行研究工作。",
      "关注和检讨学会的活动进展，使其不乖离学会的宗旨。"
    ],
    description: "咨询研究委员会是个辅助性质的机构，为执委会在学会行政、组织及校内外交流方面提供咨询性质的协助。此外，委员会也须常关注学会活动的进展，确保其不乖离学会的中心思想及针对学会的行政及活动方面的问题给予执委会意见与建议。"
  },
  {
    id: "jiluweiyuanhui",
    name: "纪律委员会",
    category: "admin",
    motto: "扎实为经，回馈为纬。",
    sublinks: [
      { title: "小组历史" },
      { title: "成员名单", href: "unit/unit_member2.htm#jiluweiyuanhui" },
      { title: "活动看板" },
      { title: "最新资讯" }
    ],
    goals: [
      "马大华文学会纪律委员会的成立是为了确保章程、纪律条规及学会其它一切条规及立场受到遵从。"
    ],
    description: "根据学会章程第七章条款23，纪委会的职责为：",
    clauses: [
      "纪律委员会的主要职责为执行纪律条规及学会其它一切条规和立场。",
      "学会必须拥有一份由执委会依据条款20及21(e)而制定并生效的纪律条规。",
      "纪律委员会必须有权对任何违反章程，纪律条规及学会其它一切条规和立场的会员采取行动，其中包括开除或暂停会员籍、罚款、公开或私下道歉或其它任何合理的处罚。",
      "如纪律委员会认为情况需要，可委任或授权任何组织成立纪律小组以执行纪律条规及学会其它一切条规和立场。"
    ]
  },
  {
    id: "xuejituan",
    name: "学记团",
    category: "admin",
    motto: "扎实为经，回馈为纬。",
    sublinks: [
      { title: "小组历史" },
      { title: "组委名单", href: "unit/unit_member2.htm#xuejituan" },
      { title: "活动看板" },
      { title: "最新资讯" }
    ],
    goals: [
      "提高大专生对时事的认识与敏感度并鼓励他们发言。",
      "鼓吹创作风气，以提高个人的创作水平。",
      "促进会员之间的联系，增加会员对学会记者团及学会的认识。",
      "提供培训及个人发挥的空间,以发掘能和有潜能的学记。"
    ],
    description: "马大华文学会记者团（简称学记团）成立于1996/1997年度第十一届华文学会执委会。然而，直至第十三届（1996/1997年度）执委会，学记团才成功复苏。学记团所扮演的角色为报导及传达学会内外之讯息，从而提高会员们的社会意识。至今，学记团一共出版了九本会讯，内容除了含盖学会点滴和校园动态，也包括华社和大专生的切身课题。"
  },
  {
    id: "waiwuchu",
    name: "外务处",
    category: "admin",
    motto: "扎实为经，回馈为纬。",
    sublinks: [
      { title: "小组历史" },
      { title: "组委名单", href: "unit/unit_member2.htm#waiwuchu" },
      { title: "活动看板" },
      { title: "最新资讯" }
    ],
    goals: [
      "确保学会对外的资料系统化。",
      "协助外务副主席进行对外事务。",
      "协助将学会的活动讯息传达于社会，并加强学会对外的联系与合作空间。"
    ],
    description: "一直以来，学会的外务事项都非常繁杂。事实上，学会各小组都有自己的对外合作与联系对象，所以许多时候各小组都是直接与外界联系。若要通过外务处事先加以处理或协调，反而多此一举。因此，外务处职责的基本范围，大致上锁定于组织与组织之间公事上的应酬。而功能性质的对外联系与合作，如：辩论、音乐、华语教学、相声等，则继续交由各小组自行处理。"
  },
  {
    id: "mishuchu",
    name: "秘书处",
    category: "admin",
    motto: "扎实为经，回馈为纬。",
    sublinks: [
      { title: "小组历史" },
      { title: "组委名单", href: "unit/unit_member2.htm#mishuchu" },
      { title: "活动看板" },
      { title: "最新资讯" }
    ],
    goals: [
      "确保学会组织完善，将顺利操作运行及加强各单位的联系。"
    ],
    description: "秘书处主要是负责执行学会的行政工作。当中包括了实行学会的文件保存系统、处理来往信件与会员资料等。学会各单位秘书除了须处理来往函件和书写及整理会议记录外，也须与总秘书及副总秘书保持联系，并出席秘书处会议。"
  },
  {
    id: "caiwuchu",
    name: "财务处",
    category: "admin",
    motto: "扎实为经，回馈为纬。",
    sublinks: [
      { title: "小组历史" },
      { title: "组委名单", href: "unit/unit_member2.htm#caiwuchu" },
      { title: "活动看板" },
      { title: "最新资讯" }
    ],
    goals: [
      "确保学会的财政管理系统完善。",
      "确保任何有关财务事项顺利操作运行。"
    ],
    description: "财务处最早的名称是发行部，成立于1989年。当马大华文学会在1991年重组后，发行部就正式更名为财务处，及本着为学会增添活动基金而成立。其实。财务处的成立也是为了协助学会总财政及副总财政处理财务问题、保管学会的财务及款项。"
  }
];

// 5. HISTORY 21 MILESTONES (1974 - 1986 RE-REGISTRATION)
export const HISTORY_CHAPTERS: HistoryItem[] = [
  { id: 1, roman: "一", title: "学潮", content: "国会在1974年12月19日发表白皮书,指马大华文学会涉及共产党之颠覆活动而关闭华文学会。" },
  { id: 2, roman: "二", title: "低潮时期", content: "岁月如梭而过，在1974年末至1979年末共约五年之间，马大华文学会似乎已被人淡忘，在当时是否有任何同学或社会人士曾为复办马大华文学会作过努力，现今已无资料可考。" },
  { id: 3, roman: "三", title: "踏上长征路", content: "1979年12月17日,马大学生事务局收到了自华文学会在1974年被关闭以来的第一份申请学会注册信。" },
  { id: 4, roman: "四", title: "还不是时候", content: "1980年8月12日，筹委们会见马大副校长UNGKU AZIZ皇家教授，商讨有关华文学会成立之事，但副校长认为时机仍未成熟。" },
  { id: 5, roman: "五", title: "签名运动", content: "1981年12月31日至1982年1月10日，筹委会展开了一项校内签名运动并收集了2067位同学的签名，其中华裔同学占了78％，巫裔同学占了13％，而印裔同学则占了9％。当时，年终大考在即，同学们仍有如此积极的反应，证明了筹委所争取的目标是势之所趋。签名运动过后,两份申请重新注册的公函经由学生事务局署理副校长呈交予教育部长。" },
  { id: 6, roman: "六", title: "上达部长", content: "1982年10月6日，筹委会会见了副教育部长拿都陈忠鸿医生，但未有进展。过后获得青团运的帮助，筹委会在1983年6月23日与28日呈交备忘录予副教育部长及马大当局。然而，考验重重而至，筹委会在83年11月17日向学生事务局申请主办中华文化晚会，却被学生事务局以筹委会非注册团体为由而拒绝批准。" },
  { id: 7, roman: "七", title: "再一次签名运动", content: "由1983年10月17日至29日,一股签名的狂潮横扫过校园。此次签名运动的成绩更令人鼓舞,共有2316名学生签下名字支持成立华文学会，其中华裔同学占了72.62％，巫裔同学占了15.85％，印裔同学则占了11.53％。筹委会打铁乘热，在83年12月15日与84年1月12日，分别再呈上备忘录与申请信予学生事务局与教育部长Datuk Sulaiman Daud医生，但一切的努力皆石沉大海，华文学会还是不能成立。" },
  { id: 8, roman: "八", title: "第一次的筹委会常年大会", content: "在1984年8月4日,马大华文学会筹委会常年大会第一次在文学院F座讲堂召开。超过200名学生出席这项常年大会,会上选出了84/85年度的执委,也检讨了争取成立的途径与方针,成立的目标与宗旨。" },
  { id: 9, roman: "九", title: "新的争取方针", content: "依照大学内的一般程序，大学理事会有绝对的权利决定批准一个学生团体的成立与否，但大学当局以华文学会既有“前科”，因此须慎重行事，以致筹委会得在大学当局、教育部、内政部以及国家团结局等单位奔走，把一个又一个死结打开。84年8月15日，筹委会会见了谭亚木，以了解学会在74年被关闭的情形，更征求了他的意见；隔日，筹委会又会见了黄木良律师（国家团结局成员），黄律师认为团结局方面不会有问题，内政部也一样，所担心的只是大学当局是否又会以保安问题来拒绝华文学会的成立而已。为了令更多同学关注华文学会，筹委会在马大毕业典礼期间开设了一个饮食摊位。过后，筹委会又在9月5日举办了一个中秋晚会，这是筹委会有史以来第一个被批准的活动。" },
  { id: 10, roman: "十", title: "看到了希望", content: "在9月13日的执委会议中, 主席报告黄木良致电予他通知，国家团结局已正式接纳华文学会的成立,内政部的障碍亦已消除，现在只等大学当局的答复。1984年10月，副教育部长TUAN BUJANG ULIS 在国会中以书面回答国会议员陈仁安在1983年国会所提出的问题时指出，教育部已接获筹委会的申请, 而教育部在原则上并不阻止华文学会的成立，此事将交由马大理事会作进一步决定。" },
  { id: 11, roman: "十一", title: "无肯定答复", content: "一切原本都向着一个积极的方向进展，但突然间一切都慢了下来。直至1985年4月3日,大学当局及教育部依然无法给予华文学会筹委会一个肯定的答复。5月间，林良实医生继任副教育部长。筹委会前往会见林医生，与他详谈争取成立华文学会之事。林副教育部长答应尽力安排一个时间让筹委会会见教育部长。过后，筹委会一直未能再会见林医生。" },
  { id: 12, roman: "十二", title: "第二届常年大会", content: "华文学会筹委会第二届常年大会在1985年8月18日召开,共有554名学生出席,大家对华文学会的成立与否都极度关心,会上一部份的情绪颇为激动,提议如华文学会不获准成立,即示威抗议。" },
  { id: 13, roman: "十三", title: "灯笼之夜起风波", content: "常年大会之后，筹委会在1985年8月21日的会议当中议决将于9月7日举办一项灯笼之夜。9月6日午间，学生事务局署理副校长突然拒绝批准灯笼之夜的活动准证，理由是筹委会的任务只限于争取华文学会的成立，不能有任何其他活动。而针对之前一年学生事务局却批准筹委会举办中秋晚会，学生事务局认为那只是一时疏忽所至，因此不能作为先例。学生事务局署理副校长建议用中文系或马大校外寄宿生协会的名义来举办灯笼之夜，但筹委会担心此举可能会造成错觉，即华文学会是可以由其他学会所替代的。由于时间逼促，又不能取消或延迟活动，筹委会向林良实副教育部长求助，林医生认为不妨用中文系的名义主办活动。在其斡旋下，灯笼之夜以一位中文系学生的名义申请而获得学生事务局批准。" },
  { id: 14, roman: "十四", title: "不需要会见教育部长", content: "灯笼之夜过后，筹委会一直会见不到林副教育部长，迟至10月下旬筹委会主席范利宜才见着他，唯他并没有给予任何乐观的答复。当提到筹委会希望会见教育部长时，副部长表示此时并无此需要，所以他不会替筹委会安排。85年11月4日，筹委会执委在国会大厦巧遇林副部长，他答应再催促教育部长，并表示在离开教育部之前，他会先解决马大华文学会之事。" },
  { id: 15, roman: "十五", title: "这只是一场空欢喜", content: "1985年11月16日, 马大校外寄宿生协会举办了一项常年晚餐会,署理副校长受邀出席致词。致词时,他透露教育部已批准马大华文学会的成立。然而华文学会的成立与否, 最主要的关键是教育部的公函,一切的口头承诺都不能当作准许学会成立的证据。1986年1月，黄俊杰律师已取代林良实医生为副教育部长，但华文学会仍未能成立。1986年5月27日, 筹委们往见黄俊杰副教长,他说教长曾答应要签署批准马大华文学会的信件,可是后来却改变了主意。" },
  { id: 16, roman: "十六", title: "风风雨雨说马大华文学会", content: "从1985年11月马大华文学会获口头批准成立至1986年7月马大再次开学为止，已经过了8个月，可是筹委会仍未接获当局的正式批准公函，然而许多校园的同学以及校外人士却被蒙在鼓里，以为马大华文学会已经正式成立。经过商讨过后，筹委会一致决定通过报界向广大人士透露马大华文学会的争取状况。1986年7月6日, 筹委会副主席何国忠执笔写“风风雨雨说马大华文学会”一文刊登于《南洋商报》言路版，向各界人士清楚交代华文学会尚未成立。" },
  { id: 17, roman: "十七", title: "第三次筹委会常年大会", content: "1986年8月17日，超过1000位学生出席位于文学院F座讲堂召开的第三次筹委会常年大会。新任筹委在1986年8月25日会见了劳工部长拿都李金狮，拿都答应如果成立华文学会之事无任何进展，他将在内阁中提出讨论，并要求给他两个月的时间。筹委在1986年8月16日会见了副教育部长云时进律师,并向他提呈了一份备忘录。" },
  { id: 18, roman: "十八", title: "新的策略", content: "在86年9月4日的筹委会会议中，筹委们决定选择性的联络一些有助于协助华文学会成立的大学理事会成员，并重新起草一份新的备忘录。筹委们更于15日会见了署理副校长，向他表达了同学们的不满情绪。署理副校长一再劝同学们不要示威，并透露华文学会之事将在10月间的国内大学副校长会议中讨论。" },
  { id: 19, roman: "十九", title: "两个月的期限到了", content: "马大中文系学生在1986年10月18日主办了一项百人捐血运动，大会邀请拿都李金狮主持开幕。当时，正是两个月期限的尾端。拿都在致词时强调他会尽一切努力协助华文学会的成立，并要求同学稍为忍耐。过后，筹委会多方设法，在11月4日国会走廊遇见了教育部长，并向他呈上了一份备忘录。大学副校长与教育部长之会议之后,仍然没有华文学会的消息。" },
  { id: 20, roman: "二十", title: "副校长的召见", content: "正当筹委会决定采取更强硬的态度时，情况却有了出人意表的转变。一个星期过后，即1986年12月12日,马大副校长UNGKU AZIZ皇家教授召见筹委会全体执委,正式通知说大学理事会已批准华文学会的成立。副校长强调,现今成立的华文学会是一个全新的学会,与在1974年被关闭的学会是不同的。" },
  { id: 21, roman: "二十一", title: "宣布成立", content: "1986年12月24日,马大公共关系部于RUMAH UNIVERSITI召开了一项记者招待会。招待会上,在宣布了有关马大植物学研究计划后,副校长UNGKU AZIZ皇家教授即宣布马大华文学会正式成立。" }
];

// 6. HISTORICAL LOG OF 17 TERMS OF EXECUTIVE COMMITTEES (1986 - 2003)
export const TERMS_HISTORY: TermHistoryItem[] = [
  {
    term: "第一届执委会",
    academicYear: "1986/1987 学年",
    content: "第一届执委会策划了一个完整的组织结构及拟定学会的方针，以让来届执委有所遵循。学会宗旨：\n1. 促进对华文华语的认识，学会将致力推广华语及精髓文化，使其在这多元种族的国度里得到广泛的应用与重视。\n2. 促进对所有文化的了解，尤其是大马各族文化。希望通过各类活动能使各族同学对彼此的文化能有所认识与了解，把各族学生紧紧拉在一起，以达到彼此之间的了解与合作。\n3. 促进学生之间的了解。容忍与和睦的精神。特别强调的是华文学会并不只局限于华文源流的学生，而希望各源流的学生都能积极参与活动，促使各源流学生之间和谐共处。"
  },
  {
    term: "第二届执委会",
    academicYear: "1987/1988 学年",
    theme: "文化之年",
    content: "此届活动较偏向文化路线，列当年为文化之年。本年最为注目的活动是为期一周的文化周。"
  },
  {
    term: "第三届执委会",
    academicYear: "1988/1989 学年",
    theme: "自我教育，自我醒觉",
    content: "常年大会选举中开始出现席位悬空的情形。此届学会方针为'自我教育，自我醒觉'。7.1.1989，马大副校长在全国大专辩论比赛大决赛的颁奖典礼上宣布马大华文学会正式获准注册，生效日期由1.1.1989开始。"
  },
  {
    term: "第四届执委会",
    academicYear: "1989/1990 学年",
    theme: "通过训育，关怀社会，提高文化修养",
    content: "为加强学会的组织，学会增加了宣传部与发行部。此届学会主题为'通过训育，关怀社会，提高文化修养'。"
  },
  {
    term: "第五届执委会",
    academicYear: "1990/1991 学年",
    theme: "扎稳脚步，提升思想",
    content: "常年大会选举中依然出现席位悬空的情形。今年学会的主题为'扎稳脚步，提升思想'。学会特别强调华文学会乃语文学会而非华人学会，并大力鼓吹各源流同学积极参与活动，以便将华文华语及华族文化推至更广的层面。"
  },
  {
    term: "第六届执委会",
    academicYear: "1991/1992 学年",
    theme: "扎稳脚步，关怀社会",
    content: "本届执委的组织结构有了更动，并进行了改组,由'组'取代'股'。今年的主题是 '扎稳脚步，关怀社会'。执委会更整理出学会的存在价值即“通过华族文化精华，改善社会”。"
  },
  {
    term: "第七届执委会",
    academicYear: "1992/1993 学年",
    theme: "文化为基，关怀社会",
    content: "'文化为基，关怀社会'被选为本届主题。改组后的学会提供会员们广大的培训及发挥空间。"
  },
  {
    term: "第八届执委会",
    academicYear: "1993/1994 学年",
    theme: "文化为基，自我提升，关怀社会",
    content: "本届主题'文化为基，自我提升，关怀社会'希望会员能在参与活动的过程中自我充实，提高对华文及文化的修养，并增进对时事的关注，以便日后能回馈社会。"
  },
  {
    term: "第九届执委会",
    academicYear: "1994/1995 学年",
    theme: "扎实为经，回馈为纬",
    content: "本届执委的组织结构保持不变，例常活动增设了辩论小组。'扎实为经，回馈为纬'乃本届主题。"
  },
  {
    term: "第十届执委会",
    academicYear: "1995/1996 学年",
    content: "第十届执委会为学会提供了一连串的思想、概念及活动，为后人提供了可贵的参考模式。"
  },
  {
    term: "第十一届执委会",
    academicYear: "1996/1997 学年",
    content: "本届执委会接任后，就开始积极推展会务以及落实各项计划与活动。本届执委会规定各小组组长为当然执委，列组织秘书为副总秘书，更新设了学会记者团。"
  },
  {
    term: "第十二届执委会",
    academicYear: "1997/1998 学年",
    theme: "扎实为经，回馈为纬",
    content: "本届执委会依然采用'扎实为经，回馈为纬'为主题。华文班正式成为学会的小组之一。"
  },
  {
    term: "第十三届执委会",
    academicYear: "1998/1999 学年",
    theme: "文化与社醒并重",
    content: "执委会为学会订下了一个方向：即文化与社醒并重。此外，秘书处及学会记者团亦成功复苏。"
  },
  {
    term: "第十四届执委会",
    academicYear: "1999/2000 学年",
    theme: "扎实为经，回馈为纬",
    content: "学会今年的主题和往年一样是“扎实为经，回馈为纬”，也延续学会一贯的作风，把活动的重点放在文化与社会这两个层面。在行政方面，秘书处及财务处继续重视其传统功能。在外交方面，学会也成立外务特别委员会为学会整理对外资料。学会也举办组委培训交流营，以拉近学会各单位之间的联系。"
  },
  {
    term: "第十五届执委会",
    academicYear: "2000/2001 学年",
    theme: "扎实为经，回馈为纬",
    content: "本届执委会续以“扎实为经，回馈为纬”为主题，积极推展会务以守着学长们所建立的基业，让学会平稳的发展。学会于这一年正式成立外务处。之前草拟的学会章程也于2000年2月5日正式生效.为了使学会的操作更趋完善，纪律委员会修改了《学会纪律条规》；执委会也对学会的条规和立场作出了一系列的修改。"
  },
  {
    term: "第十六届执委会",
    academicYear: "2001/2002 学年",
    theme: "加强会员的向心力",
    content: "由于意识到会员向心力的不足，执委会把学会的路线定位“加强会员的向心力”，以重塑会员对学会的归属感。今年，执委会也举办了学会家庭日，广邀历届执委与会员们供聚一堂，一起重温学会于70 年代被关闭直到尔后艰辛复办过程的点点滴滴。此届学会所面对的最大问题便是部分执委态度不够积极，以及特别活动的开支入不敷出。此外，会员的向心力并未获得具体改善，多数人只抱着观望心态，有所保留并选择性的参与学会的活动。"
  },
  {
    term: "第十七届执委会",
    academicYear: "2002/2003 学年",
    theme: "扎实为经，回馈为纬",
    content: "本届执委会继续采用“扎实为经，回馈为纬”为学会年度主题，以秉承学会一贯的原则、方向与目标，在校园内外积极推广中华文化、提高时事觉醒，进而回馈群众与社会。除了举办学会内部的例常活动外，学会也积极参与校园内外其他组织的活动，并与它们联办一些活动，一同为推广文化以及提高社会觉醒风气而努力。基于校园气候与环境的改变，本届执委会以节省资源及精简人力的方式来策划及进行活动，包括积极推动例常活动，并减少大型活动的数量。执委会也尽量给予会员参与学会活动的各种优惠，以照顾会员的福利。本届执委会值得令人赞赏的一面，是无时无刻关注校园内外之时事课题，积极参与社区活动，以实际行动实践学会理念。"
  }
];

// 7. SOCIETY ANTHEM (马大华文学会会歌)
export const SOCIETY_ANTHEM = {
  title: "马大华文学会会歌",
  composer: "余锦畅",
  lyricist: "钟采旺",
  theme: "火浴后的火鸟，不灭的信念",
  stanzas: [
    [
      "漫漫岁月我们踏过",
      "传承的火炬在燃烧",
      "期待火浴后的火鸟",
      "展翅翱翔晴空"
    ],
    [
      "纵然路途艰辛坎坷",
      "不灭的信念永坚持",
      "多年的盼望终成真",
      "你我绽放笑容"
    ],
    [
      "掀起灿烂的一页",
      "晴空万里在眼前",
      "让我们携手迎向前",
      "迎向美丽的虹彩"
    ],
    [
      "纵然路途艰辛坎坷",
      "不灭的信念永坚持",
      "多年的盼望终成真",
      "你我绽放笑容"
    ]
  ],
  notes: [
    { note: "C4", duration: 0.5 }, { note: "D4", duration: 0.5 }, { note: "E4", duration: 0.8 }, { note: "G4", duration: 0.8 },
    { note: "A4", duration: 0.5 }, { note: "G4", duration: 0.5 }, { note: "E4", duration: 1.0 },
    { note: "C4", duration: 0.5 }, { note: "E4", duration: 0.5 }, { note: "G4", duration: 0.8 }, { note: "A4", duration: 0.8 },
    { note: "C5", duration: 1.2 }
  ]
};

// 8. BULLETIN ARTICLES (ISSUE 10 VERBATIM)
export const BULLETIN_ARTICLES: BulletinArticle[] = [
  {
    id: "zhuxi",
    title: "专访马大华文学会主席",
    author: "叶文彬",
    category: "interview",
    href: "bulletin/zhuxi.htm",
    summary: "回顾学会走过的曲折长征，探讨如何在当前校园政治气候中坚持文化自主性，并提出'扎实为经，回馈为纬'的践行路径。"
  },
  {
    id: "zhixing",
    title: "专访学生理事会代表许志兴",
    author: "陈贞荣",
    category: "interview",
    href: "bulletin/zhixing.htm",
    summary: "分析华裔大专生在全校学生代表理事会（MPM）的参政状况，倡导突破单一族群视界，捍卫全体大专生之基本权益。"
  },
  {
    id: "jiannan",
    title: "对马大生的期许：回归单纯的学习态度",
    author: "吴健南",
    category: "commentary",
    href: "bulletin/jiannan.htm",
    summary: "批判校园功利主义与文凭崇拜风气，呼吁大专生重拾批判阅读与求知热忱，找回大学作为思想策源地的纯粹本真。"
  },
  {
    id: "jiannan2",
    title: "大专生与政治参与",
    author: "吴健南",
    category: "commentary",
    href: "bulletin/jiannan2.htm",
    summary: "剖析大专法令束缚下学生运动的演变，阐述校园政治与社会公义之间的不可分割性。"
  },
  {
    id: "jiannan3",
    title: "大专校园竞选感言：我也有一个梦",
    author: "吴健南",
    category: "commentary",
    href: "bulletin/jiannan3.htm",
    summary: "纪录校园选举洗礼中的心路历程，期盼一个学术自由、族群共融、学生自治的理想马大校园。"
  },
  {
    id: "guangliang",
    title: "手扎四篇",
    author: "谢光亮",
    category: "commentary",
    href: "bulletin/guangliang.htm",
    summary: "通过四则思想随笔，探讨青年责任、文化认同、执委传承与理想主义在现实土壤中的扎根。"
  },
  {
    id: "guiting",
    title: "《大学生习态度改良刍议》",
    author: "吕桂婷",
    category: "commentary",
    href: "bulletin/guiting.htm",
    summary: "从课堂讨论冷漠与死记硬背现象切入，提出自主研究与对话式学习的改革建议。"
  },
  {
    id: "minzhi",
    title: "《扭转命运》、《鸽子 VS 和平》、《牡丹 VS 绿叶》、《野草 VS 仙人掌》",
    author: "黄敏芝",
    category: "literature",
    href: "bulletin/minzhi.htm",
    summary: "寓言式散文小品四篇，以自然界草木禽鸟为喻，抒发青年面对历史抉择与时代挑战的敏锐哲思。"
  },
  {
    id: "xin",
    title: "《心情小记》",
    author: "馨",
    category: "literature",
    href: "bulletin/xin.htm",
    summary: "记录校园黄昏与长廊读书的细腻心境，映照当代学子内心的宁静与执着。"
  },
  {
    id: "zejing",
    title: "《等候巴士》",
    author: "泽靖",
    category: "literature",
    href: "bulletin/zejing.htm",
    summary: "在校门巴士站的等待中体悟时光流转与人生际遇，语言清新质朴。"
  },
  {
    id: "jingling",
    title: "《给没有人的信》",
    author: "精灵",
    category: "literature",
    href: "bulletin/jingling.htm",
    summary: "自白体散文，向空旷岁月投递青年心声，探索自我与群体之边界。"
  },
  {
    id: "yourui",
    title: "《心情贵宾》、《待航》、《在一抹清雅的妆里陀陷过》",
    author: "张尤蕊",
    category: "literature",
    href: "bulletin/yourui.htm",
    summary: "现代抒情短诗与散文三章，文字婉约蕴藉，寄托青春旅程中的沉思与期冀。"
  },
  {
    id: "zhenrong",
    title: "《文西阿都拉•2003游X大》、《爱情未亡人》、《想起那一场战争》、《我是预言家》、《政治的迷思》 、《祭 X 大文》",
    author: "陈贞荣",
    category: "literature",
    href: "bulletin/zhenrong.htm",
    summary: "拟古风刺小说与讽喻杂文六篇，假托马来古典文学先驱文西阿都拉游历当代校园之视角，笔锋辛辣冷峻。"
  },
  {
    id: "lansehaifeng",
    title: "《老哥》",
    author: "蓝色海风",
    category: "literature",
    href: "bulletin/lansehaifeng.htm",
    summary: "真挚回忆昔日学长提携后进的温暖旧事，展现马大华文学会长幼相扶之纯厚情谊。"
  }
];

// 9. LITERATURE DOCUMENTS (WENXIAN VERBATIM 14 ITEMS)
export const LITERATURE_LIST: LiteratureItem[] = [
  // 献词 (4 items)
  {
    id: "18thguwen",
    title: "2003年度学会代顾问老师献词",
    author: "周添健",
    category: "xianci",
    categoryLabel: "献词",
    href: "wenxian/18thguwenxianci.htm",
    year: "2003",
    summary: "勉励学会执委在风雨中砥砺前行，立足华文文化本位，拥抱多元开放视野，成为马来西亚国家建设的中流砥柱。"
  },
  {
    id: "18thzhuxi",
    title: "2003年度学会主席迎新献词",
    author: "潘宏文",
    category: "xianci",
    categoryLabel: "献词",
    href: "wenxian/18thzhuxixianci.htm",
    year: "2003",
    summary: "欢迎新一届大专新生踏入马大校园，寄语青年莫忘初衷，积极投入学会各项文化、辩论与社会关怀活动。"
  },
  {
    id: "xianci1",
    title: "2002年度学会顾问老师献词",
    author: "谢爱萍",
    category: "xianci",
    categoryLabel: "献词",
    href: "wenxian/xianci1.htm",
    year: "2002",
    summary: "肯定学会在弘扬母语文化与跨族群交流上的坚韧贡献，勉励学子在学术与人格修养上并重精进。"
  },
  {
    id: "xianci2",
    title: "2002年度学会主席迎新献词",
    author: "丁国亮",
    category: "xianci",
    categoryLabel: "献词",
    href: "wenxian/xianci2.htm",
    year: "2002",
    summary: "号召新生突破个体狭隘功利主义，投入大专公民实践，在华文学会大熔炉中锤炼独立批判思考。"
  },

  // 学会评论集 (9 items)
  {
    id: "value1",
    title: "学会的存在价值",
    author: "吴学勤",
    category: "pinlun",
    categoryLabel: "学会评论集",
    href: "wenxian/value1.htm",
    year: "1992",
    summary: "系统论证PBCUM的存在价值，明确华文学会非单纯联谊社团，而是以华族文化精华改善社会为终极宗旨的思想共同体。"
  },
  {
    id: "pinlun1",
    title: "勇敢向前迈开脚步．保持你独特的容姿",
    author: "刘敬文",
    category: "pinlun",
    categoryLabel: "学会评论集",
    href: "wenxian/pinlun1.htm",
    summary: "针对大专生随波逐流之现状，呼吁青年勇于探索非主流命题，在时代狂潮中守护纯真品格与批判锐气。"
  },
  {
    id: "pinlun2",
    title: "从三重矛盾看马大华文学会",
    author: "林猷荃",
    category: "pinlun",
    categoryLabel: "学会评论集",
    href: "wenxian/pinlun2.htm",
    year: "1998",
    summary: "深入剖析语文学会定位 vs 华人权益诉求、校园体制限制 vs 社会介入意识、精英传承 vs 大众普及之间的三重张力。"
  },
  {
    id: "pinlun6",
    title: "省思 ·期望",
    author: "苏爱萍",
    category: "pinlun",
    categoryLabel: "学会评论集",
    href: "wenxian/pinlun6.htm",
    summary: "反思大型活动所带来的资源耗损与组织疲劳，倡导回归日常思想育人与深层读书会建设。"
  },
  {
    id: "pinlun3",
    title: "摆脱多元的迷失，走出自我的风格。",
    author: "余福祺",
    category: "pinlun",
    categoryLabel: "学会评论集",
    href: "wenxian/pinlun3.htm",
    year: "2001",
    summary: "呼吁学会在多元化的喧嚣中保持清醒的定位意识，不盲目追求活动数量与表面排场，而在深度上打造独特学会风貌。"
  },
  {
    id: "pinlun4",
    title: "以多元包容的精神来灌溉学会",
    author: "吴健南",
    category: "pinlun",
    categoryLabel: "学会评论集",
    href: "wenxian/pinlun4.htm",
    summary: "倡导破除门户之见，以兼容并蓄之胸襟包容不同政治思潮与文化源流，营造百花齐放的学术生态。"
  },
  {
    id: "pinlun5",
    title: "校园文化的困境",
    author: "陈政弘",
    category: "pinlun",
    categoryLabel: "学会评论集",
    href: "wenxian/pinlun5.htm",
    summary: "探讨大专法令与商业消费主义双重夹击下，大专生文化自主性遭受严重挤压的深刻危机。"
  },
  {
    id: "pinlun8",
    title: "背弃空泛的活动包袱",
    author: "丁国亮",
    category: "pinlun",
    categoryLabel: "学会评论集",
    href: "wenxian/pinlun8.htm",
    summary: "犀利剖析盲目重复举办例常大型活动之弊病，主张大刀阔斧精简冗余，回归实质思想启蒙。"
  },
  {
    id: "pinlun7",
    title: "拥抱价值 抓紧信念",
    author: "余福祺",
    category: "pinlun",
    categoryLabel: "学会评论集",
    href: "wenxian/pinlun7.htm",
    summary: "重申创会先贤十六字精神，呼吁在瞬息万变的大环境之下，学会骨干更应笃信文化使命，矢志不渝。"
  },

  // 学会感言 (1 item)
  {
    id: "ganyan1",
    title: "残存记忆中的腾跃--马大华文学会筹委会点滴",
    author: "何国忠",
    category: "ganyan",
    categoryLabel: "学会感言",
    href: "wenxian/ganyan1.htm",
    year: "1996",
    summary: "由八十年代筹委会副主席亲笔撰述，深情回忆当年在国会走廊、教育部与大学副校长官邸奔走交涉的艰难点滴与腾跃历程。"
  }
];

// 10. SPECIAL ACTIVITIES ARCHIVE (VERBATIM ACCORDING TO activity_31ba6eee.htm)
export const SPECIAL_ACTIVITIES = [
  {
    year: "2003/2004年度",
    title: "2003/2004年度学会特别活动报告",
    events: [
      { name: "2003第9届全国大专辩论会", href: "http://quanbian9.tripod.com", target: "quanbian9", desc: "全国最高水准大专华语辩论会，汇聚全国各大专顶尖辨手争夺全辩桂冠。" },
      { name: "2003第3届全国中学生生活营", href: "http://quanzhong.tripod.com", target: "quanzhong", desc: "面向全国中学生的中华文化体验与大专思想启蒙生活营，点燃青少年传承火种。" }
    ]
  },
  {
    year: "2002/2003年度",
    title: "2002/2003年度学会特别活动报告",
    events: [
      { name: "2002/2003年度华文学会迎新周", href: "activity/yingxinzhou2002.htm", desc: "热烈迎接踏入马大的华裔及各族新生，介绍学会思想与六大小组。" },
      { name: "2002年华文学会会员培训营", href: "activity/peixunying2002.htm", desc: "强化会员组织纪律、团队默契与社会关怀意识之骨干集训营。" },
      { name: "2002年华文学会家庭聚会", href: "activity/familygather2002.htm", desc: "历届执委、老校友与新会员共聚一堂重温复办长征史，增进会员向心力。" }
    ]
  },
  {
    year: "2001/2002年度",
    title: "2001/2002年度学会特别活动报告",
    events: [
      { name: "2002年度摇篮手创作歌曲发表演绎会", href: "activity/dayao2002.htm", desc: "大摇演绎会，发表马大原创音乐词曲作品，百花齐放掀起校园创作风气。" },
      { name: "2001年第8届全国大专辩论会", href: "activity/8thquanbian.htm", desc: "第八届全辩盛会，探讨全球化挑战、大马宪政与社会人文热点议题。" },
      { name: "第13届全国大专文学奖", href: "activity/13thquanwen.htm", desc: "激发大专青年文学创作热情，发掘马来西亚本土优秀华文文坛新秀。" },
      { name: "2001年第2届全国中学生生活营", href: "activity/2thquanzhong.htm", desc: "第二届全中营，带领中学生亲临大学讲堂，体验独立思考与团队合作。" },
      { name: "2001年华文学会家庭聚会", href: "activity/familygather2001.htm", desc: "凝聚历届老友，分享学会成长心路与社会立足体会。" },
      { name: "2001年毕业典礼华文学会食物摊", href: "activity/foodstall2001.htm", desc: "配合马大毕业典礼设立义卖食物摊，筹募学会年度常年活动基金。" }
    ]
  }
];

// 11. REBUILD COMPONENT SPECIFICATION MATRIX
export const REBUILD_COMPONENTS = [
  {
    name: "HomeCard",
    role: "Core retro 680px card wrapper hosting header, logo, twin marquees, news ticker, and menu",
    props: "{ children?: ReactNode, onNavigate: (page: string) => void }",
    features: "Fixed 680px container, centered auto margins, 1px retro border, responsive viewport adaptation",
    originalFile: "index_c084c885.htm / index.htm"
  },
  {
    name: "SidebarNav",
    role: "Inner page 180px royal blue navigation panel with active page highlight and email action",
    props: "{ currentPage: string, onSelectPage: (id: string) => void }",
    features: "180px fixed desktop width, collapses to top horizontal pill bar on mobile <=680px, .on active state",
    originalFile: "assets/style.css (.side)"
  },
  {
    name: "MarqueeTicker",
    role: "Vertical upwards scrolling news ticker and horizontal smooth motto banners",
    props: "{ direction: 'up' | 'horizontal', duration?: string, items?: ReactNode[] }",
    features: "CSS keyframe mq-up and mq-alt, pause-on-hover interaction, reduced-motion accessibility",
    originalFile: "assets/style.css (.mq, .mq-up, .mq-alt)"
  },
  {
    name: "OrgChartViewer",
    role: "Interactive graphic flowchart representing the 10 constitutional divisions of PBCUM",
    props: "{ onSelectUnit: (unitId: string) => void }",
    features: "Interactive hover highlight, twin hover image states simulation, modal / deep link triggers",
    originalFile: "structure_a4f3616a.htm"
  },
  {
    name: "ExcoRosterTable",
    role: "Executive committee tabular viewer with role titles, member hyperlinks, and term switcher",
    props: "{ term: string, onSelectMember: (member: ExcoMember) => void }",
    features: "Classic Web 1.0 border-collapse table, #e8f2fd and #ffffcc alternating cells, dropdown selector",
    originalFile: "exco_23a29b83.htm"
  },
  {
    name: "UnitShowcase",
    role: "Sub-unit profile card featuring mottos, 4-point goal lists, descriptions, and 2x5 sub-nav",
    props: "{ unit: UnitInfo, onSwitchPage: (pageId: string) => void }",
    features: "Vertical animated motto box, 2x5 yellow-framed sub-nav grid, jump anchors to top",
    originalFile: "unit_1ef2a558.htm & unit2_d68b86e3.htm"
  },
  {
    name: "AnthemAudioPlayer",
    role: "Interactive Web Audio API synthesizer for the PBCUM Anthem melody + lyric sheet",
    props: "{ onPlayStateChange?: (playing: boolean) => void }",
    features: "In-browser procedural synthesizer playing 余锦畅's melody notes, animated lyrics follow-along",
    originalFile: "song_efabb81c.htm"
  },
  {
    name: "ArticleReader",
    role: "Full-text reader for historical bulletin articles, presidential dedications, and critiques",
    props: "{ articleId: string, onClose: () => void }",
    features: "Clean editorial reading measure (65-75ch), author metadata, historic context drawer",
    originalFile: "bulletin_acf1a8e9.htm & wenxian_7ab5fbc0.htm"
  }
];
