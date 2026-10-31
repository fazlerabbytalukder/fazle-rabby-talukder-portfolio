"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { gsap, ScrollTrigger } from "@/lib/gsap";

let lenisInstance: Lenis | null = null;

/** Access the active Lenis instance (null when reduced motion is on) */
export const getLenis = () => lenisInstance;

/** Scroll smoothly to an in-page anchor like "#projects" */
export function scrollToHash(hash: string) {
  const target = document.querySelector<HTMLElement>(hash);
  if (!target) return;
  if (lenisInstance) {
    lenisInstance.start();
    lenisInstance.scrollTo(target, { duration: 1.4 });
  } else {
    target.scrollIntoView({ behavior: "smooth" });
  }
}

/**
 * Lenis smooth scrolling, driven by GSAP's ticker so ScrollTrigger
 * and Lenis stay perfectly in sync.
 */
export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({ lerp: 0.1, anchors: true });
    lenisInstance = lenis;
    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    // Re-measure pinned sections once images & fonts are in
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);

    return () => {
      window.removeEventListener("load", refresh);
      gsap.ticker.remove(raf);
      lenis.destroy();
      lenisInstance = null;
    };
  }, []);

  return null;
}
