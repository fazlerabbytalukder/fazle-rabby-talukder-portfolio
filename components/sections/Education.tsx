"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import { education, type Education as EducationItem } from "@/data/education";

/** Updates the CSS vars that position the hover glow (see .glow-card in globals.css) */
function trackMouse(e: React.MouseEvent<HTMLElement>) {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--x", `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty("--y", `${e.clientY - r.top}px`);
}

/** -1 = left card, 0 = middle, 1 = right */
function EducationCard({ item, index, side, progress }: { item: EducationItem; index: number; side: number; progress: MotionValue<number> }) {
  const reduce = useReducedMotion();
  // Cards start fanned out and lower, then settle into a straight row as the grid reaches mid-screen
  const x = useTransform(progress, [0, 1], [side * 48, 0]);
  const y = useTransform(progress, [0, 1], [80 + Math.abs(side) * 40, 0]);
  const rotate = useTransform(progress, [0, 1], [side * 5, 0]);
  const opacity = useTransform(progress, [0, 0.6], [0, 1]);

  return (
    <motion.article
      onMouseMove={trackMouse}
      style={reduce ? undefined : { x, y, rotate, opacity }}
      className="glow-card h-full rounded-md border border-white/10 bg-white/[0.03] px-7 py-9 text-center backdrop-blur"
    >
      <span className="font-display text-sm tracking-[0.3em] text-neon">0{index + 1}</span>
      <h3 className="mx-auto mt-3 max-w-[16ch] text-xl leading-snug">{item.degree}</h3>
      <p className="mt-2 text-[10px] uppercase tracking-[0.2em] text-white/50">
        {item.school} · {item.years}
      </p>
      <p className="mt-5 text-sm leading-relaxed text-muted">{item.description}</p>
    </motion.article>
  );
}

export default function Education() {
  const grid = useRef<HTMLDivElement>(null);
  // Fan out sideways only when the cards sit in a row (md+); stacked cards just rise
  const [row, setRow] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setRow(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  const { scrollYProgress } = useScroll({ target: grid, offset: ["start end", "center 60%"] });

  return (
    <section id="education" className="relative overflow-x-clip pt-24 lg:pt-32">
      <div className="shell">
        <SectionHeading
          title="My"
          accent="Education"
          align="center"
          subtitle="An academic journey that built my foundation in computer science, problem-solving, and technology."
        />

        <div ref={grid} className="mt-14 grid gap-4 md:grid-cols-3 md:gap-5">
          {education.map((item, i) => (
            <EducationCard
              key={item.degree}
              item={item}
              index={i}
              side={row && education.length === 3 ? i - 1 : 0}
              progress={scrollYProgress}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
