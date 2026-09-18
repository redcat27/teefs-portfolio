// 站点用到的全部内联 SVG。统一 stroke/fill 走 currentColor，尺寸由调用方给。
import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const strokeBase = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  "aria-hidden": true,
} as const;

export function IconBrand({ size = 30, ...props }: IconProps & { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" {...strokeBase} {...props}>
      <rect x="1" y="1" width="30" height="30" rx="8" stroke="currentColor" strokeWidth="1.6" opacity="0.35" />
      <path
        d="M9 11l5 5-5 5M15 21h7"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function IconMenu(props: IconProps) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" {...strokeBase} {...props}>
      <path d="M3 6h18M3 12h18M3 18h18" strokeLinecap="round" />
    </svg>
  );
}

export function IconSun(props: IconProps) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" {...strokeBase} {...props}>
      <circle cx="12" cy="12" r="5" />
      <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
    </svg>
  );
}

export function IconMoon(props: IconProps) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" {...strokeBase} {...props}>
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IconMail(props: IconProps) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" {...strokeBase} {...props}>
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <path d="M22 6l-10 7L2 6" />
    </svg>
  );
}

export function IconArrowRight(props: IconProps) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" {...strokeBase} {...props}>
      <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IconArrowUp(props: IconProps) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" {...strokeBase} {...props}>
      <path d="M12 19V5M5 12l7-7 7 7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IconGitHub(props: IconProps) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12 .5C5.7.5.5 5.7.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.3.8-.6v-2c-3.2.7-3.9-1.5-3.9-1.5-.5-1.3-1.3-1.7-1.3-1.7-1-.7.1-.7.1-.7 1.1.1 1.7 1.2 1.7 1.2 1 .1.7 1.7 2.7 1.2.1-.7.4-1.2.7-1.5-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C17.3 4.6 18.3 5 18.3 5c.6 1.6.2 2.8.1 3.1.8.8 1.2 1.9 1.2 3.1 0 4.4-2.7 5.4-5.3 5.7.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6 4.6-1.5 7.9-5.8 7.9-10.9C23.5 5.7 18.3.5 12 .5z" />
    </svg>
  );
}

export function IconX(props: IconProps) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M18.9 2H22l-7 8 8.2 12H17l-5.2-6.8L6 22H2.9l7.5-8.6L2 2h7l4.7 6.2L18.9 2zm-1.1 18h1.7L7.3 4H5.5l12.3 16z" />
    </svg>
  );
}

export function IconLinkedIn(props: IconProps) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14zM8.3 18.3V10H5.7v8.3h2.6zM7 8.8a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm11.3 9.5v-4.6c0-2.4-1.3-3.5-3-3.5a2.6 2.6 0 0 0-2.4 1.3v-1.1h-2.6v8.3h2.6v-4.6c0-1.2.5-1.7 1.3-1.7s1.4.5 1.4 1.6v4.7h2.7z" />
    </svg>
  );
}
