# teefs-portfolio

Teefs Jiang 的个人作品集。基于 [teefs](https://github.com/redcat27/teefs) 骨架生成，
视觉系统移植自一个静态 HTML 作品集设计（暗色优先 + 翡翠绿点缀，终端风格 Hero）。

## 技术栈

| 层 | 选择 |
| --- | --- |
| 框架 | Next.js 16（App Router）+ React 19 + TypeScript 5.9 |
| 样式 | 纯 CSS 设计令牌，不用 Tailwind 工具类（见「样式」一节） |
| 字体 | Cabinet Grotesk / General Sans（Fontshare）+ JetBrains Mono（next/font 自托管） |
| ORM | Prisma 6（@prisma/adapter-pg），本项目暂未使用 |
| 数据库 | Neon Postgres（免费档），已预留 |
| 代码托管 | GitHub |
| 部署 | Vercel |
| 包管理器 | pnpm |

## 快速开始

```
pnpm install
pnpm dev          # http://localhost:3000
```

这个站点是纯静态的，**不需要** `DATABASE_URL` 也能跑。
`prisma/`、`src/lib/db.ts` 和 `.env.example` 是骨架带过来的，
将来要加「留言写入数据库」这类功能时直接能用，目前不参与构建。

## 改什么

| 想改 | 改这里 |
| --- | --- |
| 姓名 / 邮箱 / 项目 / 技能 / 经历 / 导航 | `src/lib/site.ts` |
| 页面区块结构（Hero、项目、技能、关于、经历、联系） | `src/app/page.tsx` |
| 字号 / 间距 / 圆角 / 过渡（流体标尺） | `src/app/globals.css` 顶部 `:root` |
| 浅色 & 暗色两套配色 | `globals.css` 里 `:root, [data-theme='light']` 和 `[data-theme='dark']` |
| 终端里打出的命令与输出 | `src/lib/site.ts` 的 `heroCommand` / `heroTerminalLines` |
| 主题切换 / 移动导航 / 滚动阴影 | `src/components/header.tsx` |
| 终端打字机动画 | `src/components/terminal.tsx` |
| 项目筛选逻辑 | `src/components/projects.tsx` |
| 滚动显现 | `src/components/reveal-observer.tsx` |

**90% 的改动只需要动 `src/lib/site.ts`。**

## 样式：为什么不写 Tailwind 类

整个视觉建立在一份自包含的 CSS 设计系统上（`globals.css`，约 900 行），
类名是语义化的（`.project-card`、`.section-head`、`.eyebrow`…），
颜色、字号、间距全部走 CSS 变量。

换皮只改 `:root` 里的色板；改全局字号只改一行 `clamp()`。
如果改用 Tailwind 工具类，这些调整会变成翻遍每个组件。

> 项目里仍保留 `postcss.config.mjs` 的 `@tailwindcss/postcss` 插件，
> 但因为 `globals.css` 没有 `@import "tailwindcss"`，它什么都不做，可以安全忽略。

## 这套设计为什么在电脑和手机上都好看

核心不是断点，是**流式排版**：字号、行宽、区块留白都用 `clamp(min, calc, max)`
随视口连续变化，而不是在断点处跳变。

```css
--text-hero: clamp(2.75rem, 0.5rem + 6vw, 7rem);   /* 44px → 112px 连续变化 */
.container { padding-inline: clamp(var(--space-5), 4vw, var(--space-12)); }
.section   { padding-block:  clamp(var(--space-12), 8vw, var(--space-24)); }
```

其他要点：

- `grid-template-columns: repeat(auto-fit, minmax(330px, 1fr))` —— 网格列数自适应，
  不需要为项目卡写断点
- `html { text-size-adjust: none }` 关掉 iOS 自动放大字号，
  `scroll-padding-top` 让锚点跳转不被 sticky 导航挡住
- `prefers-reduced-motion` 下全局禁用动画，并直接显示全部滚动内容
- 主题脚本在 SSR 阶段就写好 `<html data-theme>`，暗色站点不会首屏闪白
- 触控目标 ≥ 44px（图标按钮、社交链接、移动端导航项都是）

实测各断点（291px → 1309px）均无横向溢出。

## 部署到 Vercel

1. [vercel.com](https://vercel.com) 用 GitHub 登录 → Add New → Project → 选这个仓库 → Deploy
2. 直接部署即可，不需要任何环境变量（纯静态站点）
3. 推送 `main` 自动重新部署

要启用数据库功能时才需要在 Environment Variables 里加 `DATABASE_URL`
（用带 `-pooler` 的那条），步骤见
[teefs 模板](https://github.com/redcat27/teefs)的 README。

**注意**：Vercel 的 "Optional Integrations → Prisma Postgres" 不要点。
那会开通 Vercel 自己的付费数据库产品，本项目用的是 Neon。

## 常用脚本

```
pnpm dev         # 开发服务器
pnpm build       # 生产构建
pnpm lint        # ESLint
pnpm start       # 本地预览生产构建
pnpm db:migrate  # 开发环境迁移（本项目暂未使用）
```
