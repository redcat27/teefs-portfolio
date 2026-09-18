# teefs-portfolio

基于 teefs 模板初始化的 Next.js 项目骨架。

## 技术栈

| 层 | 选择 |
| --- | --- |
| 框架 | Next.js（App Router）+ React 19 + TypeScript |
| 样式 | Tailwind CSS 4（主题色 token 在 src/app/globals.css） |
| ORM | Prisma 6（@prisma/adapter-pg 驱动适配器） |
| 数据库 | Neon Postgres（免费档） |
| 代码托管 | GitHub |
| 部署 | Vercel |
| 包管理器 | pnpm |

## 快速开始

    pnpm install
    cp .env.example .env   # 填 Neon 连接串
    pnpm db:migrate        # 建表
    pnpm dev               # http://localhost:3000

## 改什么

| 想改 | 改这里 |
| --- | --- |
| 文案 / 联系方式 / 导航 | src/lib/site.ts |
| 首页内容 | src/app/page.tsx |
| 主题色（现在是森林绿） | src/app/globals.css 的 @theme |
| 数据库表 | prisma/schema.prisma，改完跑 pnpm db:migrate |

## 数据库（Neon）

Neon 给两种连接串，区别只在主机名，库名和密码相同：

- 带 -pooler  -> 填 DATABASE_URL（应用运行时用，适合 serverless）
- 去掉 -pooler -> 填 DIRECT_URL（Prisma migrate 专用）

## 部署到 Vercel

1. vercel.com 用 GitHub 登录 -> Add New -> Project -> 选这个仓库 -> Deploy
2. Environment Variables 里加 DATABASE_URL，用带 -pooler 的那条
3. 推送 main 自动重新部署

只需配 DATABASE_URL。DIRECT_URL 只被 Prisma CLI 用来跑迁移，
运行时不需要，Vercel 上不配也不会崩。

pnpm install 会触发 postinstall prisma generate，
所以 Vercel 构建时不需要额外配置 Prisma。

## 常用脚本

    pnpm dev           # 开发服务器
    pnpm build         # 生产构建
    pnpm lint          # ESLint
    pnpm db:migrate    # 开发环境迁移
    pnpm db:push       # 直接同步 schema（不用 migrations 时）
    pnpm db:studio     # 查看数据库
