"use client";

import { useEffect, useState } from "react";
import { navLinks, site } from "@/lib/site";
import { IconBrand, IconMail, IconMenu, IconMoon, IconSun } from "./icons";

/**
 * 主题由 layout.tsx 里 beforeInteractive 的内联脚本先写到 <html data-theme>，
 * 避免首屏闪白。所以这里不用 React state 存主题：
 * - 图标显示哪个，由 globals.css 里的 [data-theme='dark'] 规则决定（无 hydration 差异）
 * - 切换时直接读写 document 和 localStorage
 */
export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleTheme = () => {
    const isDark = document.documentElement.getAttribute("data-theme") === "dark";
    const next = isDark ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
  };

  const closeMenu = () => setOpen(false);

  return (
    <header id="header" className={`header${scrolled ? " is-scrolled" : ""}`}>
      <div className="container header-inner">
        <a href="#top" className="brand" aria-label={`${site.name} 首页`}>
          <span className="brand-mark" aria-hidden="true">
            <IconBrand />
          </span>
          <span className="brand-name">
            {site.brand}
            <b>{site.brandSuffix}</b>
          </span>
        </a>

        <nav id="nav" className={`nav${open ? " is-open" : ""}`} aria-label="主导航">
          {navLinks.map((l) => (
            <a key={l.href} href={l.href} onClick={closeMenu}>
              {l.label}
            </a>
          ))}
        </nav>

        <div className="header-actions">
          <button
            type="button"
            className="icon-btn"
            onClick={toggleTheme}
            aria-label="切换深浅色主题"
          >
            <IconMoon className="icon-moon" />
            <IconSun className="icon-sun" />
          </button>
          <a href="#contact" className="btn btn-primary">
            <IconMail />
            <span>联系我</span>
          </a>
          <button
            type="button"
            className="icon-btn nav-toggle"
            aria-label={open ? "关闭菜单" : "打开菜单"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <IconMenu />
          </button>
        </div>
      </div>
    </header>
  );
}
