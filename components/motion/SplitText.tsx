"use client";

import { Fragment } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { EASE, VIEWPORT } from "@/lib/motion";

type Props = {
  text: string;
  /** Split into words or individual letters */
  by?: "word" | "char";
  className?: string;
  delay?: number;
  stagger?: number;
  /** Play on page load instead of on scroll into view */
  onMount?: boolean;
};

/** Mask reveal: each word/letter slides up from behind an overflow-hidden line */
export default function SplitText({ text, by = "word", className = "", delay = 0, stagger, onMount = false }: Props) {
  const reduce = useReducedMotion();
  const units = by === "char" ? Array.from(text) : text.split(" ");

  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: stagger ?? (by === "char" ? 0.035 : 0.06), delayChildren: delay } },
  };
  const item: Variants = reduce
    ? { hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.6 } } }
    : { hidden: { y: "110%" }, show: { y: "0%", transition: { duration: 1.1, ease: EASE } } };

  const trigger = onMount
    ? { initial: "hidden", animate: "show" }
    : { initial: "hidden", whileInView: "show", viewport: VIEWPORT };

  return (
    // Keyed by text so edited copy remounts and replays instead of leaving new words hidden
    <motion.span key={text} className={`inline ${className}`} aria-label={text} variants={container} {...trigger}>
      {units.map((unit, i) => (
        <Fragment key={i}>
          <span aria-hidden className="inline-block overflow-hidden pb-[0.1em] -mb-[0.1em] align-bottom">
            <motion.span className="inline-block" variants={item}>
              {unit === " " ? " " : unit}
            </motion.span>
          </span>
          {by === "word" && i < units.length - 1 ? " " : null}
        </Fragment>
      ))}
    </motion.span>
  );
}
