"use client";

import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";

/** Wrapper that gently pulls its child toward the cursor */
export default function MagneticButton({ children, strength = 0.3, className = "" }: { children: ReactNode; strength?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const x = useSpring(useMotionValue(0), { stiffness: 200, damping: 15, mass: 0.4 });
  const y = useSpring(useMotionValue(0), { stiffness: 200, damping: 15, mass: 0.4 });

  const onMove = (e: React.MouseEvent) => {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div ref={ref} onMouseMove={onMove} onMouseLeave={reset} style={{ x, y }} className={`inline-block ${className}`}>
      {children}
    </motion.div>
  );
}
