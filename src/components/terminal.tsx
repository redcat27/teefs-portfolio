"use client";

import { useEffect, useState, useSyncExternalStore } from "react";

type Segment = { text: string; className?: string };

type TerminalProps = {
  title: string;
  prompt: string;
  command: string;
  lines: readonly (readonly Segment[])[];
  /** 关掉时直接输出最终文本，不跑打字机动画 */
  animated?: boolean;
};

/* prefers-reduced-motion 的外部信号，用 useSyncExternalStore 订阅，
   避免在 effect 里同步 setState。服务端快照固定为 false，
   所以 SSR 输出的是空终端，跟客户端首帧一致。 */
let motionQuery: MediaQueryList | null = null;

function subscribeReduced(callback: () => void) {
  motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  motionQuery.addEventListener("change", callback);
  return () => motionQuery?.removeEventListener("change", callback);
}

function getReduced() {
  return motionQuery ? motionQuery.matches : false;
}

function renderSegments(segments: readonly Segment[], keyPrefix: string) {
  return segments.map((seg, i) => {
    const key = `${keyPrefix}-${i}`;
    return seg.className ? (
      <span className={seg.className} key={key}>
        {seg.text}
      </span>
    ) : (
      <span key={key}>{seg.text}</span>
    );
  });
}

/**
 * Hero 里的假终端：先逐字打出命令，再逐行打印输出，最后光标停止闪烁。
 * 用户开了「减少动态效果」时跳过动画，直接渲染最终文本。
 * 状态只在客户端变化，SSR / 首帧只输出空终端 + 闪烁光标。
 */
export default function Terminal({
  title,
  prompt,
  command,
  lines,
  animated = true,
}: TerminalProps) {
  const reduced = useSyncExternalStore(subscribeReduced, getReduced, () => false);
  const staticMode = reduced || !animated;

  const [typed, setTyped] = useState("");
  const [shownCount, setShownCount] = useState(0);
  const [cursorHidden, setCursorHidden] = useState(false);

  useEffect(() => {
    if (staticMode) return;

    let alive = true;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const later = (fn: () => void, ms: number) => {
      const t = setTimeout(() => {
        if (alive) fn();
      }, ms);
      timers.push(t);
    };

    let lineIdx = 0;
    const showOutput = () => {
      if (lineIdx < lines.length) {
        lineIdx += 1;
        setShownCount(lineIdx);
        later(showOutput, 220);
      } else {
        later(() => setCursorHidden(true), 1800);
      }
    };

    let i = 0;
    const typeCmd = () => {
      if (i <= command.length) {
        setTyped(command.slice(0, i));
        i += 1;
        later(typeCmd, 70 + Math.random() * 40);
      } else {
        later(showOutput, 380);
      }
    };

    later(typeCmd, 500);

    return () => {
      alive = false;
      timers.forEach(clearTimeout);
    };
  }, [staticMode, command, lines]);

  const displayTyped = staticMode ? command : typed;
  const displayCount = staticMode ? lines.length : shownCount;
  const cursorClass = staticMode || cursorHidden ? "cursor is-hidden" : "cursor";

  return (
    <div className="terminal">
      <div className="terminal-bar">
        <span className="terminal-dots" aria-hidden="true">
          <i></i>
          <i></i>
          <i></i>
        </span>
        <span className="terminal-title">{title}</span>
      </div>
      <div className="terminal-body">
        <div>
          <span className="prompt">{prompt}</span>{" "}
          {displayTyped}
          <span className={cursorClass} aria-hidden="true"></span>
        </div>
        {lines.slice(0, displayCount).map((line, i) => (
          <div className="out" key={i}>
            {renderSegments(line, `line-${i}`)}
          </div>
        ))}
      </div>
    </div>
  );
}
