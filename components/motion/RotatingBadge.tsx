"use client";

import { useId, type ReactNode } from "react";

type Props = {
  text: string;
  size?: number;
  className?: string;
  /** Centre content, e.g. an arrow icon */
  children?: ReactNode;
};

/** Circular text that spins continuously around an icon */
export default function RotatingBadge({ text, size = 120, className = "", children }: Props) {
  const id = `badge-${useId().replace(/:/g, "")}`;

  return (
    <div className={`relative shrink-0 ${className}`} style={{ width: size, height: size }}>
      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full animate-spin-slow" aria-hidden>
        <defs>
          <path id={id} d="M50,50 m-40,0 a40,40 0 1,1 80,0 a40,40 0 1,1 -80,0" />
        </defs>
        <text className="fill-white/80 font-sans text-[8px] font-medium uppercase">
          <textPath href={`#${id}`} textLength="250" lengthAdjust="spacing">
            {text}
          </textPath>
        </text>
      </svg>
      <div className="absolute inset-[26%] grid place-items-center rounded-full border border-white/15 text-white">
        {children}
      </div>
      <span className="sr-only">{text}</span>
    </div>
  );
}
