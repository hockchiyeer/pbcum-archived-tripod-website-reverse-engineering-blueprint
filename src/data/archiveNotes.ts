/**
 * Reverse-engineering notes (what each archived file is for / which React component replaces it).
 * Keyed by the file's real path in the archive. The tree itself is generated from the archive on disk
 * (see archiveTree.ts); these notes are only an annotation layer and never invent files.
 */
export interface ArchiveNote { description: string; modernComponent?: string }

export const ARCHIVE_NOTES: Record<string, ArchiveNote> = {
  "/index.htm": {
    "description": "Live homepage: 680px card layout, dual marquees, animated header banner, news feed, 12 navigation links",
    "modernComponent": "<HomeCard />"
  },
  "/index_test.htm": {
    "description": "Design iteration 0: Early prototype without full marquee styling",
    "modernComponent": "Archived Draft"
  },
  "/index1.htm": {
    "description": "Design iteration 1: First experimental table layout",
    "modernComponent": "Archived Draft"
  },
  "/index2.htm": {
    "description": "Design iteration 2: Second table layout variant",
    "modernComponent": "Archived Draft"
  },
  "/index3.htm": {
    "description": "Design iteration 3: Third table layout variant",
    "modernComponent": "Archived Draft"
  },
  "/index4.htm": {
    "description": "Design iteration 4: Fourth table layout variant",
    "modernComponent": "Archived Draft"
  },
  "/indexcss.htm": {
    "description": "CSS-based variant: CSS DIV layout alternative to traditional nested TABLEs",
    "modernComponent": "<IndexCssPrototype />"
  },
  "/philosophy.htm": {
    "description": "学会思想: Core theme ('扎实为经，回馈为纬'), existential value, 3 tenets, 5 strategic goals",
    "modernComponent": "<PhilosophyPage />"
  },
  "/history.htm": {
    "description": "学会历史: 21 historical milestones (1974-1986) + 12 archive photos + 17 terms history log (1986-2003)",
    "modernComponent": "<HistoryPage />"
  },
  "/structure.htm": {
    "description": "学会组织架构: Visual org chart with interactive hover twin button GIFs",
    "modernComponent": "<OrgChartInteractive />"
  },
  "/structureexco.htm": {
    "description": "执委会组织架构: Executive committee internal structure with structureme.gif",
    "modernComponent": "<StructureExcoView />"
  },
  "/exco.htm": {
    "description": "执委会名单: 18th & 19th EXCO rosters with dropdown selector for 14th-17th terms",
    "modernComponent": "<ExcoPage />"
  },
  "/unit.htm": {
    "description": "学会各小组 (第一部分): 6 grassroots activity interest sub-units (Debate, Chinese Class, Social Awakening, Culture, Crosstalk, Yaolanshou)",
    "modernComponent": "<UnitsPage />"
  },
  "/unit2.htm": {
    "description": "学会各小组 (第二部分): 6 administrative divisions (Advisory, Disciplinary, Student Reporters, External, Secretariat, Finance)",
    "modernComponent": "<UnitsAdminPage />"
  },
  "/activity.htm": {
    "description": "特别活动: Major annual initiatives (Quanbian 9th, Quanzhong 3rd, Orientation 2002, Dayao)",
    "modernComponent": "<ActivityPage />"
  },
  "/notice.htm": {
    "description": "活动预告: Event noticeboard & AGM 2004 election schedule table with quorum rules",
    "modernComponent": "<NoticePage />"
  },
  "/bulletin.htm": {
    "description": "学会会讯: Issue 10 bulletin directory with interviews, student essays, and critiques",
    "modernComponent": "<BulletinPage />"
  },
  "/song.htm": {
    "description": "学会会歌: Society anthem lyrics ('不灭的信念' / 余锦畅作曲, 钟采旺填词) & Web Audio synthesizer",
    "modernComponent": "<SongPage />"
  },
  "/wenxian.htm": {
    "description": "学会文献: Historical speeches, advisor dedications, and 9 commentary essays",
    "modernComponent": "<WenxianPage />"
  },
  "/photo.htm": {
    "description": "学会掠影: Historical photography gallery of 1986 Ungku Aziz announcement and 1st AGM",
    "modernComponent": "<PhotoPage />"
  },
  "/Tripod.htm": {
    "description": "Tripod mirror: Lycos Tripod host wrapper with navigation and banner integration",
    "modernComponent": "Historical Mirror"
  },
  "/marquee_function.htm": {
    "description": "Marquee documentation: Technical specification for cross-browser DHTML scrolling text",
    "modernComponent": "Specification Doc"
  },
  "/onmouse_effect.css": {
    "description": "The only site stylesheet: Link pseudo-classes (:hover, :active), font families, text underlines",
    "modernComponent": "Global CSS"
  },
  "/marquee.js": {
    "description": "Marquee script: Cross-browser scrolling text engine for Internet Explorer and Netscape",
    "modernComponent": "CSS Keyframes"
  },
  "/marquee1.js": {
    "description": "Marquee script 1: Alternate horizontal scrolling ticker engine",
    "modernComponent": "CSS Keyframes"
  },
  "/marquee_content.js": {
    "description": "Marquee data: News announcements and AGM election results in JavaScript array",
    "modernComponent": "TypeScript Dataset"
  },
  "/marquee_content1.js": {
    "description": "Marquee data 1: Secondary announcement data feed",
    "modernComponent": "TypeScript Dataset"
  },
  "/edit_marquee.js": {
    "description": "Marquee utility: Helper script for dynamic ticker text modification",
    "modernComponent": "Script Utility"
  },
  "/about_js.js": {
    "description": "Vertical marquee script: 130x160 vertical scrolling news ticker in unit profiles",
    "modernComponent": "CSS Keyframes"
  },
  "/neon.js": {
    "description": "Neon glow script: Flashing illuminated text effect for announcements",
    "modernComponent": "CSS Animation"
  },
  "/showdate.js": {
    "description": "Date script: Chinese lunar calendar and Gregorian date formatter",
    "modernComponent": "Date Formatter"
  },
  "/counter": {
    "description": "CountZ hit-counter <img> tag for recording visitor page statistics",
    "modernComponent": "Visitor Counter"
  },
  "/image/Pbcum_logo.gif": {
    "description": "Official PBCUM Society Crest with Universiti Malaya palm tree emblem & calligraphy banner",
    "modernComponent": "<PbcumLogo />"
  },
  "/image/flybird.gif": {
    "description": "Animated crane banner: 520x30 flying crane birds representing '火浴后的火鸟'",
    "modernComponent": "<FlybirdBanner />"
  },
  "/image/animate.gif": {
    "description": "Welcome graphic: 300x100 illuminated animated greeting banner ('欢迎浏览')",
    "modernComponent": "<WelcomeGraphic />"
  },
  "/image/zhashi.jpg": {
    "description": "Original calligraphy banner: '扎实为经，回馈为纬' (Core Society Theme)",
    "modernComponent": "<CalligraphyBanner />"
  },
  "/image/colorbar.gif": {
    "description": "Spectral rainbow dividing bar (520x1 px)",
    "modernComponent": "<ColorBarDivider />"
  },
  "/image/red.gif": {
    "description": "Red accent bar graphic",
    "modernComponent": "Decorative Accent"
  },
  "/image/bullet.gif": {
    "description": "Retro list bullet icons for document headers",
    "modernComponent": "List Bullet Icon"
  },
  "/image/top.gif": {
    "description": "Navigation arrows: '到最上面' top.gif, back.gif, back1.gif, back2.gif, next.gif",
    "modernComponent": "Navigation Arrows"
  },
  "/image/read_more1.gif": {
    "description": "Read More action button GIFs for philosophy and articles",
    "modernComponent": "Button Icon"
  },
  "/image/structureme.gif": {
    "description": "Full hierarchical organizational chart of the 18th Executive Committee",
    "modernComponent": "<StructureDiagramImage />"
  },
  "/image/historical_moment.jpg": {
    "description": "1986 Dec 24: Vice-Chancellor Ungku Aziz announcing PBCUM re-establishment at Rumah Universiti",
    "modernComponent": "<HistoricPhoto1 />"
  },
  "/image/1stAGM.jpg": {
    "description": "1987 Jan 3: Historic 1st Annual General Meeting in Faculty of Arts lecture hall",
    "modernComponent": "<HistoricPhoto2 />"
  },
  "/image/2nd_ChouWei.jpg": {
    "description": "Historical group portrait: 2nd Preparatory Committee (第二届筹委会执委)",
    "modernComponent": "<HistoricPhoto3 />"
  },
  "/image/1stQuanBian.jpg": {
    "description": "1st National Inter-Varsity Chinese Debate Championship (第一届全国大专辩论会)",
    "modernComponent": "<HistoricPhoto4 />"
  },
  "/image/pbcum.jpg": {
    "description": "Archived campus banners and student assembly moments",
    "modernComponent": "<CampusMomentPhoto />"
  },
  "/image/14.jpg": {
    "description": "14th Executive Committee commemorative snapshot",
    "modernComponent": "<Exco14Photo />"
  },
  "/image/16th_1.gif": {
    "description": "16th Executive Committee anniversary banners",
    "modernComponent": "<Exco16Banner />"
  },
  "/structure/Advisor.gif": {
    "description": "Faculty Advisors tile (顾问老师)",
    "modernComponent": "Interactive Button"
  },
  "/structure/AGM.gif": {
    "description": "Annual General Meeting tile (常年会员大会)",
    "modernComponent": "Interactive Button"
  },
  "/structure/ME.gif": {
    "description": "Majlis Eksekutif / 执委会 tile",
    "modernComponent": "Interactive Button"
  },
  "/structure/WaiWuChu.gif": {
    "description": "External Affairs Department tile (外务处)",
    "modernComponent": "Interactive Button"
  },
  "/structure/MiShuChu.gif": {
    "description": "Secretariat Department tile (秘书处)",
    "modernComponent": "Interactive Button"
  },
  "/structure/CaiWuChu.gif": {
    "description": "Finance Department tile (财务处)",
    "modernComponent": "Interactive Button"
  },
  "/structure/JiLuWeiYuanHui.gif": {
    "description": "Disciplinary Committee tile (纪律委员会)",
    "modernComponent": "Interactive Button"
  },
  "/structure/XueJiTuan.gif": {
    "description": "Student Reporters Corps tile (学记团)",
    "modernComponent": "Interactive Button"
  },
  "/structure/ZiXunWeiYuanHui.gif": {
    "description": "Consultative Committee tile (咨询研究委员会)",
    "modernComponent": "Interactive Button"
  },
  "/structure/unit.gif": {
    "description": "Activity Sub-Units tile (学会各小组)",
    "modernComponent": "Interactive Button"
  },
  "/structure/ChouWeiHui.gif": {
    "description": "Ad-hoc Working Committees tile (筹委会)",
    "modernComponent": "Interactive Button"
  },
  "/structure/VerticalFrame2.gif": {
    "description": "Vertical connection hierarchy lines",
    "modernComponent": "Tree Connector"
  },
  "/structure/HorizontalFrame1.gif": {
    "description": "Horizontal branching connection lines",
    "modernComponent": "Tree Connector"
  },
  "/structure/BlankBlock.gif": {
    "description": "Transparent table spacer block (82 bytes)",
    "modernComponent": "Spacer Block"
  },
  "/philosophy/zhuti.htm": {
    "description": "学会主题: 《扎实为经，回馈为纬》深刻内涵阐释",
    "modernComponent": "<PhilosophyModal />"
  },
  "/philosophy/mubiao.htm": {
    "description": "学会目标: 五大核心行动发展目标细则",
    "modernComponent": "<PhilosophyModal />"
  },
  "/philosophy/jiazhi.htm": {
    "description": "存在价值: 《通过华族文化精华，改善社会》宣言",
    "modernComponent": "<PhilosophyModal />"
  },
  "/philosophy/zongzhi.htm": {
    "description": "学会宗旨: 创会三大法定宪章宗旨",
    "modernComponent": "<PhilosophyModal />"
  },
  "/activity/8thquanbian.htm": {
    "description": "2001年第8届全国大专辩论会纪实与赛果",
    "modernComponent": "<ActivityDetail />"
  },
  "/activity/2thquanzhong.htm": {
    "description": "2001年第2届全国中学生生活营回顾报告",
    "modernComponent": "<ActivityDetail />"
  },
  "/activity/dayao2002.htm": {
    "description": "2002年度摇篮手创作歌曲发表演绎会回顾",
    "modernComponent": "<ActivityDetail />"
  },
  "/activity/13thquanwen.htm": {
    "description": "第13届全国大专文学奖颁奖典礼与得奖名单",
    "modernComponent": "<ActivityDetail />"
  },
  "/activity/familygather2001.htm": {
    "description": "2001年华文学会家庭聚会纪实",
    "modernComponent": "<ActivityDetail />"
  },
  "/activity/familygather2002.htm": {
    "description": "2002年华文学会家庭聚会回顾",
    "modernComponent": "<ActivityDetail />"
  },
  "/activity/foodstall2001.htm": {
    "description": "2001年毕业典礼华文学会食物摊义卖与基金筹募",
    "modernComponent": "<ActivityDetail />"
  },
  "/activity/yingxinzhou2002.htm": {
    "description": "2002/2003年度华文学会迎新周迎新晚会特刊",
    "modernComponent": "<ActivityDetail />"
  },
  "/activity/peixunying2002.htm": {
    "description": "2002年华文学会会员干部培训营",
    "modernComponent": "<ActivityDetail />"
  },
  "/activity/quanbianyuanqi.htm": {
    "description": "全国大专辩论会缘起与辩论价值哲学专论",
    "modernComponent": "<ActivityDetail />"
  },
  "/activity/lijiesaihui.htm": {
    "description": "历届全国大专辩论会赛绩总录 (1989-2003)",
    "modernComponent": "<ActivityDetail />"
  },
  "/bulletin/zhuxi.htm": {
    "description": "专访马大华文学会主席 (叶文彬)",
    "modernComponent": "<ArticleDetail />"
  },
  "/bulletin/zhixing.htm": {
    "description": "专访学生理事会代表许志兴 / 陈贞荣撰写",
    "modernComponent": "<ArticleDetail />"
  },
  "/bulletin/jiannan.htm": {
    "description": "吴健南: 《对马大生的期许：回归单纯的学习态度》",
    "modernComponent": "<ArticleDetail />"
  },
  "/bulletin/jiannan2.htm": {
    "description": "吴健南: 《大专生与政治参与》",
    "modernComponent": "<ArticleDetail />"
  },
  "/bulletin/jiannan3.htm": {
    "description": "吴健南: 《大专校园竞选感言：我也有一个梦》",
    "modernComponent": "<ArticleDetail />"
  },
  "/bulletin/guangliang.htm": {
    "description": "谢光亮: 《手扎四篇》",
    "modernComponent": "<ArticleDetail />"
  },
  "/bulletin/guiting.htm": {
    "description": "吕桂婷: 《大学生习态度改良刍议》",
    "modernComponent": "<ArticleDetail />"
  },
  "/bulletin/minzhi.htm": {
    "description": "黄敏芝: 《扭转命运》、《鸽子 VS 和平》、《牡丹 VS 绿叶》",
    "modernComponent": "<ArticleDetail />"
  },
  "/bulletin/xin.htm": {
    "description": "馨: 《心情小记》",
    "modernComponent": "<ArticleDetail />"
  },
  "/bulletin/zejing.htm": {
    "description": "泽靖: 《等候巴士》",
    "modernComponent": "<ArticleDetail />"
  },
  "/bulletin/jingling.htm": {
    "description": "精灵: 《给没有人的信》",
    "modernComponent": "<ArticleDetail />"
  },
  "/bulletin/yourui.htm": {
    "description": "张尤蕊: 《心情贵宾》、《待航》",
    "modernComponent": "<ArticleDetail />"
  },
  "/bulletin/zhenrong.htm": {
    "description": "陈贞荣: 《文西阿都拉•2003游X大》、《祭 X 大文》",
    "modernComponent": "<ArticleDetail />"
  },
  "/wenxian/18thguwenxianci.htm": {
    "description": "2003年度学会代顾问老师周添健献词",
    "modernComponent": "<DocumentDetail />"
  },
  "/wenxian/18thzhuxixianci.htm": {
    "description": "2003年度学会主席潘宏文迎新献词",
    "modernComponent": "<DocumentDetail />"
  },
  "/wenxian/xianci1.htm": {
    "description": "2002年度学会顾问老师谢爱萍博士献词",
    "modernComponent": "<DocumentDetail />"
  },
  "/wenxian/xianci2.htm": {
    "description": "2002年度学会主席丁国亮迎新献词",
    "modernComponent": "<DocumentDetail />"
  },
  "/wenxian/pinlun1.htm": {
    "description": "吴学勤: 《学会的存在价值》",
    "modernComponent": "<DocumentDetail />"
  },
  "/wenxian/pinlun2.htm": {
    "description": "刘敬文: 《勇敢向前迈开脚步．保持你独特的容姿》",
    "modernComponent": "<DocumentDetail />"
  },
  "/wenxian/pinlun3.htm": {
    "description": "林猷荃: 《从三重矛盾看马大华文学会》",
    "modernComponent": "<DocumentDetail />"
  },
  "/wenxian/pinlun4.htm": {
    "description": "苏爱萍: 《省思 ·期望》",
    "modernComponent": "<DocumentDetail />"
  },
  "/wenxian/pinlun5.htm": {
    "description": "余福祺: 《摆脱多元的迷失，走出自我的风格》",
    "modernComponent": "<DocumentDetail />"
  },
  "/wenxian/pinlun6.htm": {
    "description": "吴健南: 《以多元包容的精神来灌溉学会》",
    "modernComponent": "<DocumentDetail />"
  },
  "/wenxian/pinlun7.htm": {
    "description": "陈政弘: 《校园文化的困境》",
    "modernComponent": "<DocumentDetail />"
  },
  "/wenxian/pinlun8.htm": {
    "description": "丁国亮: 《背弃空泛的活动包袱》",
    "modernComponent": "<DocumentDetail />"
  },
  "/wenxian/ganyan1.htm": {
    "description": "何国忠博士: 《残存记忆中的腾跃--马大华文学会筹委会点滴》",
    "modernComponent": "<DocumentDetail />"
  },
  "/unit/unit_member.htm": {
    "description": "六大活动小组常设执委名单 (Debate, Chinese Class, Culture...)",
    "modernComponent": "<UnitMembersList />"
  },
  "/unit/unit_member2.htm": {
    "description": "行政各处室与各委员会成员全名单",
    "modernComponent": "<UnitAdminMembersList />"
  },
  "/unit/wenhua/shufa.htm": {
    "description": "文化组书法研习班章程与师资介绍",
    "modernComponent": "<CalligraphyClassModal />"
  },
  "/bianlunzu/index.htm": {
    "description": "马大华文学会辩论组专属主页",
    "modernComponent": "<DebateGroupPortal />"
  },
  "/bianlunzu/result.htm": {
    "description": "国内外大专辩论赛历年辉煌战绩与对垒记录",
    "modernComponent": "<DebateResultsViewer />"
  },
  "/poster/agm2003.htm": {
    "description": "2003年会员大会改选宣传海报与网页",
    "modernComponent": "<PosterModal />"
  },
  "/poster/poster1.htm": {
    "description": "全国大专辩论会官方宣传海报",
    "modernComponent": "<PosterModal />"
  },
  "/poster/daxiang2003.htm": {
    "description": "2003年大马相声节专场宣传海报",
    "modernComponent": "<PosterModal />"
  },
  "/poster/feixingshu.htm": {
    "description": "飞行书文化巡回图书展海报",
    "modernComponent": "<PosterModal />"
  },
  "/poster/yaolanshou_poster1.htm": {
    "description": "摇篮手创作歌曲专辑发售宣传海报",
    "modernComponent": "<PosterModal />"
  },
  "/poster/wenjuan2002.htm": {
    "description": "大专生社会关怀调查问卷海报",
    "modernComponent": "<PosterModal />"
  },
  "/poster/quanzhong/biaoge.doc": {
    "description": "第3届全国中学生生活营学员报名表 Word 文档与简章",
    "modernComponent": "<DownloadLink />"
  },
  "/former_exco/17th.htm": {
    "description": "第十七届执委会全名单 (2002/2003)",
    "modernComponent": "<ExcoHistoricalArchive />"
  },
  "/former_exco/16th.htm": {
    "description": "第十六届执委会全名单 (2001/2002)",
    "modernComponent": "<ExcoHistoricalArchive />"
  },
  "/former_exco/15th.htm": {
    "description": "第十五届执委会全名单 (2000/2001)",
    "modernComponent": "<ExcoHistoricalArchive />"
  },
  "/former_exco/14th.htm": {
    "description": "第十四届执委会全名单 (1999/2000)",
    "modernComponent": "<ExcoHistoricalArchive />"
  },
  "/Tripod_files/tripod.css": {
    "description": "Lycos Tripod hosting portal external style rules",
    "modernComponent": "Archived CSS"
  },
  "/Tripod_files/dmenu.js": {
    "description": "Dynamic DHTML dropdown menu scripts for hosting frame",
    "modernComponent": "Archived JS"
  },
  "/Tripod_files/headerLayer.js": {
    "description": "Floating header banner injection script",
    "modernComponent": "Archived JS"
  }
};

export const FOLDER_NOTES: Record<string, string> = {
  "/image": "Site-wide visual assets: official crests, animated GIFs, event photographs, and historical plates",
  "/image/history": "12 photographic plates documenting student struggle from 1974 de-registration to 1986 re-establishment",
  "/structure": "Interactive button tiles for organizational flowchart with twin hover '_2' states",
  "/philosophy": "Dedicated single-topic detail pages for core ideological pillars",
  "/activity": "Event documentation, retrospective reports, and photographs of major annual student initiatives",
  "/bulletin": "Issue 10 Society Bulletin articles, one distinct page per author",
  "/wenxian": "Official documents: 4 advisor/presidential tributes, 9 critical essays, and 1 historical reflection",
  "/unit": "Sub-unit member rosters and cultural calligraphy sub-pages",
  "/bianlunzu": "Chinese debate group dedicated portal and match results",
  "/poster": "Event posters (GIF/JPG) with HTML wrappers + quanzhong registration forms",
  "/former_exco": "14th-18th committee archives, member portraits, and individual per-post pages",
  "/former_exco/18th_exco": "President, VP Ext/Int, Secretary, Treasurer, Unit heads profile pages",
  "/Tripod_files": "Saved Tripod page: tripod.css, dmenu.js, menubuilder.js, headerLayer.js and its navigation GIFs"
};
