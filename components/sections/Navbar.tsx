"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { getLenis, scrollToHash } from "@/components/motion/SmoothScroll";
import { Close, Menu } from "@/components/ui/Icons";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { navLinks, site } from "@/data/site";
import { EASE } from "@/lib/motion";

export default function Navbar() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  // Glass after 40px; hide when scrolling down, show when scrolling up
  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 40);
    setHidden(y > prev && y > 160);
  });

  // Freeze page scroll while the menu overlay is open
  useEffect(() => {
    const lenis = getLenis();
    if (open) lenis ? lenis.stop() : (document.body.style.overflow = "hidden");
    else lenis ? lenis.start() : (document.body.style.overflow = "");
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const go = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    setOpen(false);
    // Wait for the overlay to start closing before scrolling
    setTimeout(() => scrollToHash(href), 150);
  };

  return (
    <>
      <motion.header
        animate={{ y: hidden && !open ? "-100%" : "0%" }}
        transition={{ duration: 0.5, ease: EASE }}
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter,border-color] duration-500 ${
          scrolled ? "border-b border-white/5 bg-ink/60 backdrop-blur-xl" : "border-b border-transparent"
        }`}
      >
        <nav className="shell flex h-16 items-center justify-between md:h-20">
          <a href="#home" onClick={(e) => go(e, "#home")} className="font-display text-2xl tracking-wider">
            {site.logo}
            <span className="text-neon">.</span>
          </a>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setOpen(true)}
              aria-expanded={open}
              aria-controls="site-menu"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.22em] transition-colors hover:border-white/60 hover:bg-white/5"
            >
              <Menu /> Menu
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="site-menu"
            role="dialog"
            aria-modal="true"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.8, ease: EASE }}
            className="fixed inset-0 z-[60] flex flex-col bg-ink/95 backdrop-blur-2xl"
          >
            <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(40%_50%_at_15%_80%,rgba(255,45,85,0.25),transparent),radial-gradient(40%_50%_at_85%_20%,rgba(47,107,255,0.25),transparent)]" />
            <div className="shell relative flex h-16 items-center justify-between md:h-20">
              <span className="font-display text-2xl tracking-wider">
                {site.logo}
                <span className="text-neon">.</span>
              </span>
              <div className="flex items-center gap-2">
                <ThemeToggle />
                <button
                  onClick={() => setOpen(false)}
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.22em] hover:border-white/60"
                >
                  <Close className="h-3.5 w-3.5" /> Close
                </button>
              </div>
            </div>

            <ul className="shell relative flex flex-1 flex-col justify-center gap-1">
              {navLinks.map((link, i) => (
                <li key={link.href} className="overflow-hidden">
                  <motion.a
                    href={link.href}
                    onClick={(e) => go(e, link.href)}
                    initial={{ y: "110%" }}
                    animate={{ y: "0%" }}
                    exit={{ y: "110%" }}
                    transition={{ duration: 0.8, ease: EASE, delay: 0.15 + i * 0.06 }}
                    className="group flex items-baseline gap-4 font-display text-[13vw] uppercase leading-[0.95] md:text-8xl"
                  >
                    <span className="font-sans text-xs text-muted">0{i + 1}</span>
                    <span className="bg-gradient-to-r from-neon to-electric bg-clip-text transition-colors duration-500 group-hover:text-transparent">
                      {link.label}
                    </span>
                  </motion.a>
                </li>
              ))}
            </ul>

            <div className="shell relative flex justify-between pb-8 text-xs text-muted">
              <span>{site.name}</span>
              <a href={`mailto:${site.email}`} className="hover:text-white">
                {site.email}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
