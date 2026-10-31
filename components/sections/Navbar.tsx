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
          <a href="#home" onClick={(e) => go(e, "#home")} className="group relative font-display text-2xl tracking-wider">
            {site.logo}
            <span className="text-neon">.</span>
            {/* Name tooltip: pops out from the logo's top-right corner with a blur-to-sharp reveal */}
            <span
              role="tooltip"
              className="pointer-events-none absolute left-full top-0 ml-0.5 -translate-x-1 -translate-y-[55%] scale-90 opacity-0 blur-[2px] transition-[opacity,transform,filter] duration-300 ease-premium group-hover:translate-x-0 group-hover:scale-100 group-hover:opacity-100 group-hover:blur-none group-focus-visible:translate-x-0 group-focus-visible:scale-100 group-focus-visible:opacity-100 group-focus-visible:blur-none origin-bottom-left"
            >
              <span className="glow-pill inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-1 font-sans text-[9px] font-semibold uppercase leading-none tracking-[0.12em]">
                <span className="h-1 w-1 rounded-full bg-neon" />
                {site.name}
              </span>
            </span>
          </a>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setOpen(true)}
              aria-expanded={open}
              aria-controls="site-menu"
              className="glow-pill inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[11px] font-bold uppercase tracking-[0.06em]"
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
                  className="glow-pill inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[11px] font-bold uppercase tracking-[0.06em]"
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
