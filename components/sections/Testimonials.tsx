"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { animate, motion, useMotionValue, useReducedMotion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import { ArrowLeft, ArrowRight, Quote } from "@/components/ui/Icons";
import { testimonials, testimonialsIntro } from "@/data/testimonials";
import { EASE, VIEWPORT } from "@/lib/motion";

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
      const max = Math.max(0, el.scrollWidth - window.innerWidth + 32);
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

  return (
    <section id="reviews" className="relative overflow-hidden py-24 lg:py-32">
      <div className="shell flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <SectionHeading title={testimonialsIntro.title} accent={testimonialsIntro.titleAccent} subtitle={testimonialsIntro.subtitle} breakAccent />
        <div className="flex gap-3">
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

      {/* Track bleeds off the right edge; left edge aligns with content */}
      <div className="mt-14 pl-[max(1rem,calc((100vw-1200px)/2+2rem))] max-md:pl-4">
        <motion.div
          ref={track}
          drag="x"
          dragConstraints={{ left: -metrics.max, right: 0 }}
          dragElastic={0.08}
          dragMomentum={false}
          onDragEnd={() => goTo(Math.round(-x.get() / (metrics.step || 1)))}
          style={{ x }}
          className="flex w-max cursor-grab gap-4 active:cursor-grabbing md:gap-5"
        >
          {testimonials.map((t, i) => (
            <motion.article
              key={i}
              initial={{ opacity: 0, y: reduce ? 0 : 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT}
              transition={{ duration: 0.9, ease: EASE, delay: i * 0.08 }}
              className="flex w-[82vw] shrink-0 select-none flex-col rounded-md border border-white/10 bg-white/[0.03] p-7 backdrop-blur sm:w-[340px] lg:w-[315px]"
            >
              <Quote className="h-7 w-7 text-white/80" />
              <h3 className="mt-5 text-lg font-semibold leading-snug">{t.heading}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{t.text}</p>
              <div className="mt-auto flex items-center gap-3 pt-8">
                <Image src={t.avatar} alt={t.name} width={40} height={40} draggable={false} className="h-10 w-10 rounded-full object-cover grayscale" />
                <div>
                  <p className="text-sm font-medium">{t.name}</p>
                  <p className="text-xs text-muted">{t.role}</p>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
