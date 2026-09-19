// 站点内容全部改这一个文件，不用翻组件。
//
// 定位：一人公司的名片 + 项目作品展示。
// 目前显示 项目 / 关于 / 联系 三个区块；
// 「技能与工具」和「经历」暂时隐藏，样式还留在 globals.css 里，
// 以后要恢复或改成「合作客户」时，把 page.tsx 里对应的 section 加回来即可。

export const site = {
  name: "Teefs Jiang",
  /** 导航左侧的品牌名，拆成「teefs」+ 高亮的「.dev」两段 */
  brand: "teefs",
  brandSuffix: ".dev",
  /** 事实卡「角色」一行 */
  role: "软件开发者",
  /** 页面 <title> 用的角色词 */
  roleLabel: "独立软件开发者",
  location: "苏州",
  email: "teefsjiang@gmail.com",
  description:
    "Teefs Jiang — 独立软件开发者，常驻苏州。展示项目作品与技术能力，欢迎项目合作。",
  heroTerminalTitle: "~/teefs — zsh",
  heroCommand: "whoami --intro",
  contactTitle: "有项目想聊聊吗？",
  contactNote: "无论是项目合作还是技术交流，欢迎随时联系。我会在 1–2 天内回复。",
  footerNote: "用 ❤ 与代码构建于苏州",
} as const;

/** 页面里带局部强调的一段文字：bold 的部分渲染成 <strong> */
type TextSegment = { text: string; bold?: boolean };
/** Hero 大标题片段：className 对应 globals.css 里 .hero h1 下的修饰类，br 表示后面接 <br> */
type TitleSegment = { text: string; className?: string; br?: boolean };

export const navLinks = [
  { href: "#work", label: "项目" },
  { href: "#about", label: "关于" },
  { href: "#contact", label: "联系" },
] as const;

export const heroTitle: TitleSegment[] = [
  { text: "构建" },
  { text: "简洁", className: "accent" },
  { text: "、", br: true },
  { text: "可靠的", className: "thin" },
  { text: "软件" },
  { text: "体验。", className: "accent nowrap" },
];

export const heroSub =
  "我是 Teefs Jiang，一名常驻苏州的软件开发者。专注于把模糊的想法变成可交付、可维护的真实产品。";

/** 终端里逐行打印的输出，每行是一段富文本片段（className: val / out / key） */
export const heroTerminalLines: readonly (readonly TitleSegment[])[] = [
  [
    { text: site.name, className: "val" },
    { text: " — software developer", className: "out" },
  ],
  [{ text: `📍 ${site.location} · building things that ship`, className: "out" }],
];

export const heroMeta = [
  { label: "位置", value: site.location },
  { label: "状态", value: "开放合作", withDot: true },
  { label: "专长", value: "全栈 · 产品工程" },
] as const;

export const projectFilters = [
  { value: "all", label: "全部" },
  { value: "react", label: "React" },
  { value: "python", label: "Python" },
  { value: "node", label: "Node" },
  { value: "go", label: "Go" },
] as const;

export type Tech = "react" | "python" | "node" | "go";

export type Project = {
  index: string;
  title: string;
  desc: string;
  tech: Tech[];
  tags: string[];
  demoUrl: string;
  repoUrl: string;
};

/**
 * 占位项目。改成你自己的真实作品时，每条建议写清：
 * 这个项目解决什么问题、你做了哪些关键决定、现在什么状态。
 * 有截图的可以把图放进 src/app/ 下再在 project-card 里加。
 */
export const projects: Project[] = [
  {
    index: "01",
    title: "实时协作看板",
    desc: "支持多人实时同步的看板应用，基于 CRDT 实现无冲突合并，含离线缓存与光标同步。",
    tech: ["react", "node"],
    tags: ["React", "Node.js", "WebSocket"],
    demoUrl: "#",
    repoUrl: "#",
  },
  {
    index: "02",
    title: "智能文档摘要器",
    desc: "基于 LLM 的长文档摘要与问答工具，支持 PDF/Markdown 导入与引用溯源。",
    tech: ["python"],
    tags: ["Python", "FastAPI", "LLM"],
    demoUrl: "#",
    repoUrl: "#",
  },
  {
    index: "03",
    title: "轻量 API 网关",
    desc: "用 Go 构建的高性能 API 网关，支持限流、鉴权与可插拔中间件，QPS 达 5 万+。",
    tech: ["go"],
    tags: ["Go", "Redis", "gRPC"],
    demoUrl: "#",
    repoUrl: "#",
  },
  {
    index: "04",
    title: "个人财务仪表盘",
    desc: "可视化支出与预算的全栈应用，支持银行数据导入、分类规则与月度趋势分析。",
    tech: ["react", "node"],
    tags: ["React", "Node.js", "PostgreSQL"],
    demoUrl: "#",
    repoUrl: "#",
  },
  {
    index: "05",
    title: "代码相似度检测",
    desc: "基于 AST 的代码查重工具，支持多语言输入与可视化差异对比。",
    tech: ["python"],
    tags: ["Python", "CLI"],
    demoUrl: "#",
    repoUrl: "#",
  },
  {
    index: "06",
    title: "分布式任务队列",
    desc: "支持延迟、重试与优先级的任务队列系统，提供 Web 监控面板与指标导出。",
    tech: ["go", "node"],
    tags: ["Go", "Node.js", "Docker"],
    demoUrl: "#",
    repoUrl: "#",
  },
];

export const aboutParas: TextSegment[][] = [
  [
    { text: "你好，我是 " },
    { text: site.name, bold: true },
    {
      text: "，一名常驻苏州的软件开发者。我喜欢从零到一构建产品，也享受打磨细节、让代码更简洁可维护的过程。",
    },
  ],
  [
    { text: "我的兴趣横跨 " },
    { text: "全栈开发", bold: true },
    { text: " 与 " },
    { text: "产品工程", bold: true },
    {
      text: "，尤其关注如何用工程化的方式把模糊的想法变成可交付的真实体验。",
    },
  ],
];

export const facts = [
  { label: "姓名", value: site.name },
  { label: "角色", value: site.role },
  { label: "所在地", value: "苏州" },
  { label: "语言", value: "中文 / 英语" },
  { label: "邮箱", value: site.email },
] as const;

export type SocialName = "github" | "x" | "linkedin";

export const socials: { name: SocialName; label: string; href: string }[] = [
  { name: "github", label: "GitHub", href: "https://github.com/redcat27" },
  { name: "x", label: "X / Twitter", href: "#" },
  { name: "linkedin", label: "LinkedIn", href: "#" },
];
