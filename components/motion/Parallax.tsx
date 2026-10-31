"use client";

import { useRef, type ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

/** Moves children vertically at a different speed than the scroll (positive = slower) */
export default function Parallax({ children, speed = 0.2, className }: { children: ReactNode; speed?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [speed * 200, -speed * 200]);

  return (
    <motion.div ref={ref} className={className} style={reduce ? undefined : { y }}>
      {children}
    </motion.div>
  );
}
