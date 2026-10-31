"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { EASE, VIEWPORT } from "@/lib/motion";

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** Starting offset in px (defaults to sliding up from 40px below) */
  x?: number;
  y?: number;
  duration?: number;
};

/** Fades + slides its children into place once, when scrolled into view */
export default function Reveal({ children, className, delay = 0, x = 0, y = 40, duration = 1 }: Props) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduce ? { opacity: 0 } : { opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration: reduce ? 0.6 : duration, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}
