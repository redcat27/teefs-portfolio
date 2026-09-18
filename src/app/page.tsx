import { Fragment } from "react";
import Header from "@/components/header";
import Projects from "@/components/projects";
import RevealObserver from "@/components/reveal-observer";
import Terminal from "@/components/terminal";
import {
  IconArrowRight,
  IconArrowUp,
  IconGitHub,
  IconLinkedIn,
  IconMail,
  IconX,
} from "@/components/icons";
import {
  aboutParas,
  facts,
  heroMeta,
  heroSub,
  heroTerminalLines,
  heroTitle,
  journey,
  skillGroups,
  site,
  socials,
} from "@/lib/site";

/** 交替区块底色，制造段落节奏 */
const altSectionStyle = { background: "var(--color-surface-offset)" } as const;

const socialIcons = {
  github: IconGitHub,
  x: IconX,
  linkedin: IconLinkedIn,
} as const;

/** 滚动显现只需一个全局观察者，见 RevealObserver；类名写在这里，延迟写在 style 上 */
export default function Home() {
  return (
    <>
      <RevealObserver />
      <a href="#main" className="sr-only">
        跳到主内容
      </a>
      <Header />

      <main id="main">
        <span id="top"></span>

        {/* ===== Hero ===== */}
        <section className="hero">
          <div className="hero-glow" aria-hidden="true"></div>
          <div className="container">
            <Terminal
              title={site.heroTerminalTitle}
              prompt="~"
              command={site.heroCommand}
              lines={heroTerminalLines}
            />

            <h1>
              {heroTitle.map((seg, i) => (
                <Fragment key={i}>
                  {seg.className ? <span className={seg.className}>{seg.text}</span> : seg.text}
                  {seg.br ? <br /> : null}
                </Fragment>
              ))}
            </h1>

            <p className="hero-sub">{heroSub}</p>

            <div className="hero-cta">
              <a href="#work" className="btn btn-primary">
                查看项目
                <IconArrowRight />
              </a>
              <a href="#contact" className="btn btn-ghost">
                取得联系
              </a>
            </div>

            <div className="hero-meta">
              {heroMeta.map((m) => (
                <div className="meta-item" key={m.label}>
                  <span className="meta-label">{m.label}</span>
                  <span className="meta-value">
                    {"withDot" in m && m.withDot ? (
                      <span className="status-dot" aria-hidden="true"></span>
                    ) : null}
                    {m.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== Projects ===== */}
        <section className="section" id="work">
          <div className="container">
            <div className="section-head reveal">
              <span className="eyebrow">selected work</span>
              <h2 className="section-title">精选项目</h2>
              <p className="section-lead">
                这些是占位项目，稍后会替换为你的真实作品。每张卡片包含标题、简介、技术标签与链接。
              </p>
            </div>
            <Projects />
          </div>
        </section>

        {/* ===== Skills ===== */}
        <section className="section" id="skills" style={altSectionStyle}>
          <div className="container">
            <div className="section-head reveal">
              <span className="eyebrow">tech stack</span>
              <h2 className="section-title">技能与工具</h2>
              <p className="section-lead">以下是占位技术栈，可替换为你实际掌握的技能。</p>
            </div>
            <div className="skills-grid">
              {skillGroups.map((g, i) => (
                <div
                  key={g.title}
                  className="skill-block reveal"
                  style={{ transitionDelay: `${i * 60}ms` }}
                >
                  <h3>{g.title}</h3>
                  <div className="skill-list">
                    {g.items.map((item) => (
                      <span className="skill-chip" key={item}>
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== About ===== */}
        <section className="section" id="about">
          <div className="container">
            <div className="section-head reveal">
              <span className="eyebrow">about</span>
              <h2 className="section-title">关于我</h2>
            </div>
            <div className="about-grid">
              <div className="about-text reveal">
                {aboutParas.map((para, i) => (
                  <p key={i}>
                    {para.map((seg, j) =>
                      seg.bold ? (
                        <strong key={j}>{seg.text}</strong>
                      ) : (
                        <Fragment key={j}>{seg.text}</Fragment>
                      )
                    )}
                  </p>
                ))}
              </div>
              <div className="about-card reveal" style={{ transitionDelay: "80ms" }}>
                <h3>快速概览</h3>
                {facts.map((f) => (
                  <div className="fact-row" key={f.label}>
                    <span>{f.label}</span>
                    <span>{f.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ===== Journey ===== */}
        <section className="section" id="journey" style={altSectionStyle}>
          <div className="container">
            <div className="section-head reveal">
              <span className="eyebrow">journey</span>
              <h2 className="section-title">经历与教育</h2>
              <p className="section-lead">以下为占位时间线，可替换为你的真实经历。</p>
            </div>
            <div className="timeline">
              {journey.map((j, i) => (
                <div
                  key={j.title}
                  className="timeline-item reveal"
                  style={{ transitionDelay: `${i * 70}ms` }}
                >
                  <div className="timeline-date">{j.date}</div>
                  <h3 className="timeline-title">{j.title}</h3>
                  <p className="timeline-org">{j.org}</p>
                  <p className="timeline-desc">{j.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== Contact ===== */}
        <section className="section" id="contact">
          <div className="container">
            <div className="contact-card reveal">
              <span className="eyebrow">get in touch</span>
              <h2>{site.contactTitle}</h2>
              <p className="contact-lead">{site.contactNote}</p>
              <a href={`mailto:${site.email}`} className="contact-email">
                <IconMail />
                {site.email}
              </a>
              <div className="socials">
                {socials.map((s) => {
                  const Icon = socialIcons[s.name];
                  return (
                    <a
                      key={s.name}
                      href={s.href}
                      className="social-link"
                      aria-label={s.label}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Icon />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ===== Footer ===== */}
      <footer className="footer">
        <div className="container footer-inner">
          <p>
            © {new Date().getFullYear()} {site.name} · {site.footerNote}
          </p>
          <a href="#top" className="footer-back">
            回到顶部
            <IconArrowUp />
          </a>
        </div>
      </footer>
    </>
  );
}
