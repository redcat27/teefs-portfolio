"use client";

import { useState } from "react";
import { projectFilters, projects } from "@/lib/site";

/**
 * 项目网格 + 按技术筛选。
 * 卡片外层 div 同时是滚动显现目标（.reveal）和筛选隐藏容器：
 * 隐藏要加在这层而不是 .project-card 上，否则 grid 会留一个空格子。
 * 显现逻辑见 RevealObserver。
 */
export default function Projects() {
  const [active, setActive] = useState<string>("all");

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
          </button>
        ))}
      </div>

      <div className="projects-grid">
        {projects.map((p, i) => {
          const hidden = active !== "all" && !p.tech.includes(active as (typeof p.tech)[number]);
          return (
            <div
              key={p.title}
              className={`reveal${hidden ? " is-hidden" : ""}`}
              style={{ transitionDelay: `${(i % 3) * 70}ms` }}
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
