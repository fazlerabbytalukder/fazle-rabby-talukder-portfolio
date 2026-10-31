"use client";

import Reveal from "@/components/motion/Reveal";
import CountUp from "@/components/motion/CountUp";
import RotatingBadge from "@/components/motion/RotatingBadge";
import SectionHeading from "@/components/ui/SectionHeading";
import Portrait from "@/components/ui/Portrait";
import { stats, type Stat } from "@/data/stats";
import { about } from "@/data/site";
import { images } from "@/data/images";

// Starting offsets for cards sliding in from each direction
const offsets: Record<Stat["from"], { x: number; y: number }> = {
  left: { x: -60, y: 0 },
  right: { x: 60, y: 0 },
  up: { x: 0, y: 60 },
  down: { x: 0, y: -60 },
};

export default function Stats() {
  return (
    <section id="about" className="relative overflow-x-clip pt-24 lg:pt-32">
      <div className="shell grid gap-16 lg:grid-cols-2 lg:items-center lg:gap-20">
        {/* Checkerboard stat grid */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3 lg:grid-rows-3">
          {stats.map((s, i) => (
            <Reveal key={s.label} {...offsets[s.from]} delay={i * 0.1} className={s.place}>
              <div
                className={`flex aspect-square flex-col justify-between rounded-sm p-4 sm:p-5 ${
                  s.gradient
                    ? "force-dark bg-[linear-gradient(160deg,#FF2D55_0%,#B4246E_45%,#2F6BFF_100%)] shadow-[0_20px_60px_-20px_rgba(255,45,85,0.5)]"
                    : "border border-white/10 bg-white/[0.03] backdrop-blur"
                }`}
              >
                <CountUp value={s.value} className="font-display text-5xl leading-none sm:text-6xl" />
                <span className={`text-[10px] uppercase tracking-[0.18em] ${s.gradient ? "text-white/85" : "text-muted"}`}>
                  {s.label}
                </span>
              </div>
            </Reveal>
          ))}
        </div>

        {/* About copy */}
        <div>
          <SectionHeading title={about.title} accent={about.titleAccent} breakAccent />
          <div className="mt-8 space-y-4 text-sm leading-relaxed text-muted">
            {about.paragraphs.map((p, i) => (
              <Reveal key={i} delay={0.1 + i * 0.1} y={24}>
                <p>{p}</p>
              </Reveal>
            ))}
            <Reveal delay={0.45} y={24}>
              <p className="font-semibold text-white">{about.highlight}</p>
            </Reveal>
          </div>

          <div className="mt-10 flex items-center justify-between gap-6">
            <Reveal delay={0.2}>
              <RotatingBadge text="Product • Strategy • Vision • " size={110}>
                <span className="h-2 w-2 rounded-full bg-neon shadow-[0_0_12px_#FF2D55]" />
              </RotatingBadge>
            </Reveal>
            <Reveal delay={0.3} x={40} y={0}>
              <Portrait
                src={images.aboutPortrait}
                alt="Fazle Rabby Talukder"
                sizes="160px"
                flip
                className="h-44 w-36 rounded-sm sm:h-52 sm:w-40"
              />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
