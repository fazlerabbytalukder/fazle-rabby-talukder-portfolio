/** Minimal stroke icons (inherit currentColor) */
type IconProps = { className?: string };

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

export const ArrowUpRight = ({ className = "h-3.5 w-3.5" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} {...base}>
    <path d="M7 17 17 7M8 7h9v9" />
  </svg>
);

export const ArrowDown = ({ className = "h-5 w-5" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} {...base}>
    <path d="M12 4v16M6 14l6 6 6-6" />
  </svg>
);

export const ArrowLeft = ({ className = "h-4 w-4" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} {...base}>
    <path d="M20 12H4M10 6l-6 6 6 6" />
  </svg>
);

export const ArrowRight = ({ className = "h-4 w-4" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} {...base}>
    <path d="M4 12h16M14 6l6 6-6 6" />
  </svg>
);

export const Plus = ({ className = "h-3.5 w-3.5" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} {...base} strokeWidth={2.4}>
    <path d="M12 5v14M5 12h14" />
  </svg>
);

export const Menu = ({ className = "h-3.5 w-3.5" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} {...base}>
    <path d="M4 8h16M4 16h16" />
  </svg>
);

export const Sun = ({ className = "h-3.5 w-3.5" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} {...base}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
  </svg>
);

export const Moon = ({ className = "h-3.5 w-3.5" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} {...base}>
    <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z" />
  </svg>
);

export const Close = ({ className = "h-4 w-4" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} {...base}>
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
);

export const Quote = ({ className = "h-8 w-8" }: IconProps) => (
  <svg viewBox="0 0 32 32" className={className} fill="currentColor" aria-hidden>
    <path d="M6 24c-2-2-3-4-3-7 0-5 3-9 9-12l1 2c-3 2-5 4-5 7 1 0 2 0 3 1 2 1 2 2 2 4 0 3-2 5-5 5-1 0-1 0-2 0Zm15 0c-2-2-3-4-3-7 0-5 3-9 9-12l1 2c-3 2-5 4-5 7 1 0 2 0 3 1 2 1 2 2 2 4 0 3-2 5-5 5-1 0-1 0-2 0Z" />
  </svg>
);
