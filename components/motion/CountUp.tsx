"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";
import { EASE } from "@/lib/motion";

/** Counts the numeric part of a value like "$50M+" from 0 when it enters view */
export default function CountUp({ value, duration = 2, className }: { value: string; duration?: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const reduce = useReducedMotion();

  const [, prefix = "", num = "0", suffix = ""] = value.match(/^([^\d]*)([\d.]+)(.*)$/) ?? [];
  const target = parseFloat(num);
  const decimals = (num.split(".")[1] ?? "").length;
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setDisplay(num);
      return;
    }
    const controls = animate(0, target, {
      duration,
      ease: EASE,
      onUpdate: (v) => setDisplay(v.toFixed(decimals)),
    });
    return () => controls.stop();
  }, [inView, reduce, target, decimals, duration, num]);

  return (
    <span ref={ref} className={className} aria-label={value}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}
