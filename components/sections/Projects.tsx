"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import Reveal from "@/components/motion/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import PillButton from "@/components/ui/PillButton";
import { Plus } from "@/components/ui/Icons";
import { projects, projectsIntro, type Project } from "@/data/projects";
import { EASE, VIEWPORT } from "@/lib/motion";

/** Stacking only kicks in on desktop, where each 540px card fits on screen */
function useIsDesktop() {
  const [desktop, setDesktop] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return desktop;
}

type RowProps = {
  project: Project;
  index: number;
  total: number;
  reverse: boolean;
  /** Scroll progress through the whole stack */
  stackProgress: MotionValue<number>;
  stacking: boolean;
};

function ProjectRow({ project, index, total, reverse, stackProgress, stacking }: RowProps) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  // Image drifts inside its frame for parallax
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  // Once the next card starts covering this one, shrink and dim it so the stack reads as depth
  // Progress spans the stack's full height, so card i pins at i/n and the last card pins at (n-1)/n
  const behind = total - 1 - index;
  const start = index / total;
  const end = Math.max((total - 1) / total, start + 0.001);
  const scale = useTransform(stackProgress, [start, end], [1, 1 - behind * 0.05]);
  const dim = useTransform(stackProgress, [start, end], [0, behind * 0.25]);
  const stacked = stacking && !reduce && behind > 0;

  // Wipe in from the side nearest the page edge
  const hiddenClip = reverse ? "inset(0 0 0 100%)" : "inset(0 100% 0 0)";

  return (
    <motion.article
      ref={ref}
      style={stacked ? { scale } : undefined}
      className="relative grid origin-top bg-ink lg:sticky lg:top-0 lg:h-[540px] lg:grid-cols-2 lg:overflow-hidden lg:rounded-t-3xl lg:shadow-[0_-30px_60px_-20px_rgba(0,0,0,0.7)]"
    >
      {/* Observe the unclipped frame: a fully clipped element has no visible area, so it may never register as in view */}
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={VIEWPORT}
        className={`group relative min-h-[320px] overflow-hidden sm:min-h-[420px] lg:h-full lg:min-h-0 ${reverse ? "lg:order-2" : ""}`}
      >
        <motion.div
          className="absolute inset-0"
          variants={{
            hidden: { clipPath: reduce ? "inset(0 0 0 0)" : hiddenClip, opacity: reduce ? 0 : 1 },
            show: { clipPath: "inset(0 0% 0 0%)", opacity: 1, transition: { duration: 1.3, ease: EASE } },
          }}
        >
          <motion.div className="absolute inset-x-0 -inset-y-[10%]" style={reduce ? undefined : { y }}>
            <div className="relative h-full w-full transition-transform duration-[1.2s] ease-premium group-hover:scale-105">
              <Image
                src={project.image}
                alt={project.imageAlt}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover object-top"
              />
            </div>
          </motion.div>
          <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink/50 to-transparent" />
        </motion.div>
      </motion.div>

      <div className={`relative flex flex-col justify-center px-6 py-14 sm:px-10 lg:px-16 lg:py-20 ${project.panel}`}>
        <div className="max-w-md">
          <Reveal y={20}>
            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-neon">{project.label}</p>
          </Reveal>
          <Reveal y={30} delay={0.08}>
            <h3 className="mt-3 text-3xl font-light md:text-4xl">{project.title}</h3>
          </Reveal>
          <Reveal y={30} delay={0.16}>
            <p className="mt-4 text-sm leading-relaxed text-white/60">{project.text}</p>
          </Reveal>
          <ul className="mt-6 space-y-2.5">
            {project.results.map((r, i) => (
              <li key={r}>
                <Reveal y={16} delay={0.24 + i * 0.08} className="flex items-center gap-3 text-sm">
                  <span className="grid h-5 w-5 place-items-center rounded-full bg-neon/15 text-neon">
                    <Plus className="h-3 w-3" />
                  </span>
                  {r}
                </Reveal>
              </li>
            ))}
          </ul>
          <Reveal y={16} delay={0.5} className="mt-8">
            <PillButton href={project.href} label="View Live Project" external />
          </Reveal>
        </div>
      </div>

      {/* Darkens as later cards stack on top */}
      {stacked && <motion.div aria-hidden style={{ opacity: dim }} className="pointer-events-none absolute inset-0 z-10 bg-black" />}
    </motion.article>
  );
}

export default function Projects() {
  const stackRef = useRef<HTMLDivElement>(null);
  const stacking = useIsDesktop();
  const { scrollYProgress } = useScroll({ target: stackRef, offset: ["start start", "end start"] });

  return (
    <section id="projects" className="relative pt-24 lg:pt-32">
      <div className="shell mb-14 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <SectionHeading title={projectsIntro.title} accent={projectsIntro.titleAccent} subtitle={projectsIntro.subtitle} />
        <Reveal y={20}>
          <PillButton href="/projects" label="View All Projects" />
        </Reveal>
      </div>

      {/* Sticky cards: each pins to the top while the next slides up over it; the page moves on after the last */}
      <div ref={stackRef} className="relative flex flex-col">
        {projects.map((p, i) => (
          <ProjectRow
            key={p.title}
            project={p}
            index={i}
            total={projects.length}
            reverse={i % 2 === 1}
            stackProgress={scrollYProgress}
            stacking={stacking}
          />
        ))}
      </div>
    </section>
  );
}
