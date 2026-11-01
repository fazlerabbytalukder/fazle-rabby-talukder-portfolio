"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import Reveal from "@/components/motion/Reveal";
import { ArrowUpRight } from "@/components/ui/Icons";
import { allProjects, categoryLabels, projectFilters, type ArchiveProject } from "@/data/allProjects";
import { EASE } from "@/lib/motion";

function ProjectCard({ project, index }: { project: ArchiveProject; index: number }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.7, ease: EASE, delay: (index % 3) * 0.08 }}
      className="group flex flex-col overflow-hidden rounded-sm border border-white/10 bg-white/[0.03] backdrop-blur transition-colors duration-500 hover:border-white/25"
    >
      <div className="relative aspect-[1233/867] overflow-hidden bg-[radial-gradient(70%_60%_at_50%_45%,rgba(124,58,237,0.22),transparent),linear-gradient(160deg,#0d0f1f,#07070c)]">
        <Image
          src={project.image}
          alt={`${project.title} preview`}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className={`transition-transform duration-[1.2s] ease-premium group-hover:scale-105 ${
            project.contain ? "object-contain p-6" : "object-cover object-top"
          }`}
        />
        <span className="force-dark absolute left-3 top-3 rounded-full border border-white/15 bg-ink/70 px-3 py-1 text-[9px] font-semibold uppercase tracking-[0.2em] text-white backdrop-blur">
          {categoryLabels[project.category]}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-neon">{project.client}</p>
        <h3 className="mt-2 text-xl font-light leading-snug md:text-2xl">{project.title}</h3>
        <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted">{project.overview}</p>

        <ul className="mt-4 flex flex-wrap gap-1.5">
          {project.tech.map((t) => (
            <li key={t} className="rounded-full border border-white/10 px-2.5 py-1 text-[10px] tracking-wide text-white/70">
              {t}
            </li>
          ))}
        </ul>

        <div className="mt-auto flex flex-wrap gap-2 pt-6">
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="glow-pill inline-flex items-center gap-2 rounded-full px-4 py-2 text-[10px] font-bold uppercase tracking-[0.12em]"
            >
              Live Preview <ArrowUpRight className="h-3 w-3" />
            </a>
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/25 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.12em] transition-colors hover:border-white/60 hover:bg-white/5"
            >
              GitHub <ArrowUpRight className="h-3 w-3" />
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}

/** Filterable grid of every project */
export default function ProjectArchive() {
  const [filter, setFilter] = useState<(typeof projectFilters)[number]["value"]>("all");
  const visible = filter === "all" ? allProjects : allProjects.filter((p) => p.category === filter);

  return (
    <section className="shell pb-24 lg:pb-32">
      <Reveal y={20}>
        <LayoutGroup>
          <div role="tablist" aria-label="Filter projects" className="flex flex-wrap gap-2">
            {projectFilters.map((f) => {
              const active = filter === f.value;
              const count = f.value === "all" ? allProjects.length : allProjects.filter((p) => p.category === f.value).length;
              return (
                <button
                  key={f.value}
                  role="tab"
                  aria-selected={active}
                  onClick={() => setFilter(f.value)}
                  className={`relative rounded-full border px-5 py-2.5 text-[10px] font-semibold uppercase tracking-[0.22em] transition-colors duration-300 ${
                    active ? "border-transparent text-white" : "border-white/15 text-white/60 hover:border-white/40 hover:text-white"
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="project-filter"
                      className="absolute inset-0 rounded-full bg-[linear-gradient(90deg,#FF2D55,#2F6BFF)]"
                      transition={{ duration: 0.5, ease: EASE }}
                    />
                  )}
                  <span className="relative">
                    {f.label} <span className="opacity-60">({count})</span>
                  </span>
                </button>
              );
            })}
          </div>
        </LayoutGroup>
      </Reveal>

      <motion.div layout className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        <AnimatePresence>
          {visible.map((p, i) => (
            <ProjectCard key={p.title} project={p} index={i} />
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
