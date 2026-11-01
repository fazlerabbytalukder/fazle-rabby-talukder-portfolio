"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { animate, motion, useMotionValue, useReducedMotion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import { ArrowLeft, ArrowRight, ArrowUpRight, Quote } from "@/components/ui/Icons";
import { testimonials as allTestimonials, testimonialsIntro } from "@/data/testimonials";
import { EASE, VIEWPORT } from "@/lib/motion";

// Placeholder reviews only fill out the layout locally; they never ship
const testimonials =
  process.env.NODE_ENV === "production" ? allTestimonials.filter((t) => !t.isPlaceholder) : allTestimonials;

/** Auto-advance interval */
const AUTOPLAY_MS = 4000;

export default function Testimonials() {
  const track = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  // step = card width + gap; max = how far the track can travel left
  const [metrics, setMetrics] = useState({ step: 0, max: 0 });

  useEffect(() => {
    const measure = () => {
      const el = track.current;
      const card = el?.firstElementChild as HTMLElement | null;
      if (!el || !card) return;
      const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
      // Room from the track's left edge to the viewport's right edge (minus a gutter); anything wider can slide
      const parent = el.parentElement!;
      const start = parent.getBoundingClientRect().left + parseFloat(getComputedStyle(parent).paddingLeft);
      const visible = document.documentElement.clientWidth - start - 32;
      const max = Math.max(0, el.scrollWidth - visible);
      setMetrics({ step: card.offsetWidth + gap, max });
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const lastIndex = metrics.step ? Math.ceil(metrics.max / metrics.step) : 0;

  const goTo = useCallback(
    (i: number) => {
      const next = Math.max(0, Math.min(i, lastIndex));
      setIndex(next);
      animate(x, -Math.min(next * metrics.step, metrics.max), { duration: reduce ? 0 : 0.8, ease: EASE });
    },
    [lastIndex, metrics, reduce, x]
  );

  // Keep position valid after a resize
  useEffect(() => goTo(index), [metrics]); // eslint-disable-line react-hooks/exhaustive-deps

  // Autoplay: advance every few seconds and loop back to the start; pauses on hover, drag, or off-screen.
  // Any manual move re-runs this effect (index changes), which restarts the timer.
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (reduce || paused || !inView || lastIndex === 0) return;
    const id = setTimeout(() => goTo(index >= lastIndex ? 0 : index + 1), AUTOPLAY_MS);
    return () => clearTimeout(id);
  }, [index, lastIndex, paused, inView, reduce, goTo]);

  return (
    <section id="reviews" className="relative overflow-hidden pt-24 lg:pt-32">
      <div className="shell flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <SectionHeading title={testimonialsIntro.title} accent={testimonialsIntro.titleAccent} subtitle={testimonialsIntro.subtitle} breakAccent />
        {/* Arrows only when the cards don't all fit */}
        <div className={`flex gap-3 ${lastIndex === 0 ? "hidden" : ""}`}>
          {[
            { label: "Previous", icon: <ArrowLeft />, onClick: () => goTo(index - 1), disabled: index === 0 },
            { label: "Next", icon: <ArrowRight />, onClick: () => goTo(index + 1), disabled: index >= lastIndex },
          ].map((b) => (
            <button
              key={b.label}
              aria-label={b.label}
              onClick={b.onClick}
              disabled={b.disabled}
              className="grid h-12 w-12 place-items-center rounded-full border border-white/20 transition-all duration-300 hover:border-neon hover:bg-neon/10 disabled:opacity-30 disabled:hover:border-white/20 disabled:hover:bg-transparent"
            >
              {b.icon}
            </button>
          ))}
        </div>
      </div>

      {/* Track sits in the shell so its left edge lines up with the heading, and bleeds off the right edge */}
      <motion.div
        className="shell mt-14"
        onViewportEnter={() => setInView(true)}
        onViewportLeave={() => setInView(false)}
        onHoverStart={() => setPaused(true)}
        onHoverEnd={() => setPaused(false)}
      >
        <motion.div
          ref={track}
          drag={metrics.max > 0 ? "x" : false}
          dragConstraints={{ left: -metrics.max, right: 0 }}
          dragElastic={0.08}
          dragMomentum={false}
          onDragStart={() => setPaused(true)}
          onDragEnd={() => {
            setPaused(false);
            goTo(Math.round(-x.get() / (metrics.step || 1)));
          }}
          style={{ x }}
          className={`flex w-max gap-4 md:gap-5 ${metrics.max > 0 ? "cursor-grab active:cursor-grabbing" : ""}`}
        >
          {testimonials.map((t, i) => (
            <motion.article
              key={t.name}
              initial={{ opacity: 0, y: reduce ? 0 : 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT}
              transition={{ duration: 0.9, ease: EASE, delay: i * 0.08 }}
              className="flex w-[82vw] shrink-0 select-none flex-col rounded-md border border-white/10 bg-white/[0.03] p-7 backdrop-blur sm:w-[360px] lg:w-[400px]"
            >
              <div className="flex items-start justify-between gap-4">
                <Quote className="h-7 w-7 text-white/80" />
                {t.source && t.sourceUrl && (
                  <a
                    href={t.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 rounded-full border border-white/15 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/70 transition-colors hover:border-neon hover:text-white"
                  >
                    {t.source} <ArrowUpRight className="h-3 w-3" />
                  </a>
                )}
              </div>
              <p className="mt-5 text-[15px] leading-relaxed text-white/85">{t.text}</p>
              <div className="mt-auto flex items-center gap-3 pt-8">
                {/* Initial avatar — the platform doesn't share client photos */}
                <span
                  aria-hidden
                  className="force-dark grid h-10 w-10 place-items-center rounded-full bg-[linear-gradient(160deg,#FF2D55,#2F6BFF)] text-sm font-semibold uppercase text-white"
                >
                  {t.name[0]}
                </span>
                <div>
                  <p className="text-sm font-medium">{t.name}</p>
                  <p className="text-xs text-muted">{t.location}</p>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
