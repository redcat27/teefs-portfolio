import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { JetBrains_Mono, Manrope, Sora } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";

/*
 * 字体分两层：
 * 1. next/font/google（Sora / Manrope / JetBrains Mono）—— 自托管、无 FOUC，
 *    注入 --font-sora / --font-manrope / --font-jetbrains 三个 CSS 变量。
 * 2. Fontshare 的 Cabinet Grotesk + General Sans —— 参考站的原字体，下面的
 *    <link> 会被 Next 提升到 <head>；加载到就优先用它，加载不到自动落到第 1 层。
 */
const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const jetBrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: {
    default: `${site.name} — ${site.roleLabel}`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  openGraph: {
    title: `${site.name} — ${site.roleLabel}`,
    description: site.description,
    type: "website",
    locale: "zh_CN",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.roleLabel}`,
    description: site.description,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f4f5f7" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0d12" },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="zh-CN"
      suppressHydrationWarning
      className={`${sora.variable} ${manrope.variable} ${jetBrains.variable} h-full antialiased`}
    >
      <link rel="preconnect" href="https://api.fontshare.com" />
      <link
        href="https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@500,700&f[]=general-sans@400,500,600&display=swap"
        rel="stylesheet"
      />
      <body className="min-h-full flex flex-col">
        {/* 在任何脚本之前决定主题，避免暗色站点首屏闪白。
            beforeInteractive 在 SSR 阶段就执行，React 挂载前 <html> 已带 data-theme。 */}
        <Script id="theme-init" strategy="beforeInteractive">
          {`
(function () {
  try {
    var saved = localStorage.getItem('theme');
    var mode = saved === 'dark' || saved === 'light'
      ? saved
      : (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', mode);
  } catch (e) {}
})();
`}
        </Script>
        {children}
      </body>
    </html>
  );
}
