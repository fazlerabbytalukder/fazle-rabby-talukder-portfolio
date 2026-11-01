"use client";

import Reveal from "@/components/motion/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { education } from "@/data/education";

/** Updates the CSS vars that position the hover glow (see .glow-card in globals.css) */
function trackMouse(e: React.MouseEvent<HTMLElement>) {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--x", `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty("--y", `${e.clientY - r.top}px`);
}

export default function Education() {
  return (
    <section id="education" className="relative pt-24 lg:pt-32">
      <div className="shell">
        <SectionHeading
          title="My"
          accent="Education"
          align="center"
          subtitle="An academic journey that built my foundation in computer science, problem-solving, and technology."
        />

        <div className="mt-14 grid gap-4 md:grid-cols-3 md:gap-5">
          {education.map((item, i) => (
            <Reveal key={item.degree} delay={i * 0.12}>
              <article
                onMouseMove={trackMouse}
                className="glow-card h-full rounded-md border border-white/10 bg-white/[0.03] px-7 py-9 text-center backdrop-blur"
              >
                <span className="font-display text-sm tracking-[0.3em] text-neon">0{i + 1}</span>
                <h3 className="mx-auto mt-3 max-w-[16ch] text-xl leading-snug">{item.degree}</h3>
                <p className="mt-2 text-[10px] uppercase tracking-[0.2em] text-white/50">
                  {item.school} · {item.years}
                </p>
                <p className="mt-5 text-sm leading-relaxed text-muted">{item.description}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
