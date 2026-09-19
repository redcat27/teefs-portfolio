"use client";

import { useState } from "react";
import { projectFilters, projects, type Tech } from "@/lib/site";

/**
 * 项目网格 + 按技术筛选。
 *
 * 卡片的显隐只能由这一个入口控制（.is-filtered）。**不要**给卡片包一层
 * className="reveal"：滚动显现的 .is-visible 是 IntersectionObserver 直接写进
 * DOM 节点的，而 React 筛选时会按自己缓存的旧 className 重算并整体覆盖该属性，
 * 把 is-visible 冲掉。display:none 解除后 opacity 仍停在 0 —— 切一次 tab 内容
 * 就永久消失，网格也随之塌掉、看起来像"布局变了"。
 * 所以卡片入场改用 CSS animation，靠 key 含 active 强制重播，不依赖滚动观察者。
 * 动画只加在外层槽位上，hover 位移在内层 .project-card 上，两者互不覆盖。
 */
export default function Projects() {
  const [active, setActive] = useState<string>("all");

  const matches = (tech: Tech[]) =>
    active === "all" || tech.includes(active as Tech);

  const countOf = (value: string) =>
    value === "all"
      ? projects.length
      : projects.filter((p) => p.tech.includes(value as Tech)).length;

  return (
    <>
      <div className="filter-bar reveal" role="tablist" aria-label="按技术筛选项目">
        {projectFilters.map((f) => (
          <button
            key={f.value}
            type="button"
            className={`filter-btn${active === f.value ? " is-active" : ""}`}
            role="tab"
            aria-selected={active === f.value}
            onClick={() => setActive(f.value)}
          >
            {f.label}
            <span className="filter-count">{countOf(f.value)}</span>
          </button>
        ))}
      </div>

      <div className="projects-grid">
        {projects.map((p, i) => {
          // key 带 active：切换 tab 时整批卡片重挂，入场动画随之重播
          return (
            <div
              key={`${active}-${p.title}`}
              className={`filter-slot${matches(p.tech) ? "" : " is-filtered"}`}
              style={{ animationDelay: `${(i % 3) * 70}ms` }}
            >
              <article className="project-card">
                <span className="project-index">{p.index} / {String(projects.length).padStart(2, "0")}</span>
                <h3 className="project-title">{p.title}</h3>
                <p className="project-desc">{p.desc}</p>
                <div className="project-tags">
                  {p.tags.map((t) => (
                    <span className="tag" key={t}>
                      {t}
                    </span>
                  ))}
                </div>
                <div className="project-links">
                  <a href={p.demoUrl} target="_blank" rel="noreferrer">
                    ↗ 演示
                  </a>
                  <a href={p.repoUrl} target="_blank" rel="noreferrer">
                    ↗ 源码
                  </a>
                </div>
              </article>
            </div>
          );
        })}
      </div>
    </>
  );
}
