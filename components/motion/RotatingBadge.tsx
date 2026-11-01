"use client";

import type { ReactNode } from "react";

type Props = {
  text: string;
  size?: number;
  className?: string;
  /** Centre content, e.g. an arrow icon */
  children?: ReactNode;
};

/** Circular text that spins continuously around an icon */
export default function RotatingBadge({ text, size = 120, className = "", children }: Props) {
  const chars = Array.from(text);

  return (
    <div className={`relative shrink-0 ${className}`} style={{ width: size, height: size }}>
      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full animate-spin-slow" aria-hidden>
        {/* One glyph per evenly spaced angle: Firefox ignores textLength on textPath, so the text wouldn't fill the circle */}
        <g className="fill-white/80 font-sans text-[8px] font-medium uppercase">
          {chars.map((char, i) =>
            char === " " ? null : (
              <text key={i} x="50" y="10" textAnchor="middle" transform={`rotate(${(i * 360) / chars.length} 50 50)`}>
                {char}
              </text>
            )
          )}
        </g>
      </svg>
      <div className="absolute inset-[26%] grid place-items-center rounded-full border border-white/15 text-white">
        {children}
      </div>
      <span className="sr-only">{text}</span>
    </div>
  );
}
