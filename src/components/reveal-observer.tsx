"use client";

import { useEffect } from "react";

/**
 * 全局滚动显现：一次性观察文档里所有 .reveal 元素，进入视口后加 .is-visible。
 *
 * 为什么不用「每个 reveal 包一个组件」：那样只能管到被组件包住的元素，
 * 直接写在 JSX 上的 className="reveal"（section 标题、筛选栏、联系卡等）
 * 永远没人观察，会一直停在 opacity:0。统一交给这一个 effect 管才不漏。
 *
 * 渲染 null，不产出任何 DOM。挂在 page.tsx 顶层即可。
 */
export default function RevealObserver() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    if (els.length === 0) return;

    // 不支持 IO，或用户关了「减少动态效果」：直接全部显示
    if (
      !("IntersectionObserver" in window) ||
      matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      els.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    // 逐个跟踪还没亮起的元素。不能只记「回调是否来过」：
    // 只要页面上部有一个 .reveal 触发过回调，下方还没交付的元素就会被漏网，
    // 一直停在 opacity:0。
    const pending = new Set<HTMLElement>();
    els.forEach((el) => {
      if (!el.classList.contains("is-visible")) pending.add(el);
    });

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            el.classList.add("is-visible");
            pending.delete(el);
            io.unobserve(el);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );

    els.forEach((el) => io.observe(el));

    // 看门狗：正常浏览器里 observe 后立刻就会回调，这个计时器是空转的。
    // 只有在 IO 不完全回调（某些嵌入式/受限 Webview）时才生效，
    // 保证内容不会永远停在 opacity:0 变成空白页。
    const watchdog = setTimeout(() => {
      pending.forEach((el) => el.classList.add("is-visible"));
    }, 2500);

    return () => {
      io.disconnect();
      clearTimeout(watchdog);
    };
  }, []);

  return null;
}
