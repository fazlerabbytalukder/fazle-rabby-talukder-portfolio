"use client";

import { useRef } from "react";
import { DESKTOP_MOTION, MOTION_OK, gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import SectionHeading from "@/components/ui/SectionHeading";
import PillButton from "@/components/ui/PillButton";
import Portrait from "@/components/ui/Portrait";
import Reveal from "@/components/motion/Reveal";
import { experience, experienceIntro } from "@/data/experience";
import { images } from "@/data/images";

export default function Experience() {
  const root = useRef<HTMLElement>(null);
  const timeline = useRef<HTMLDivElement>(null);
  const line = useRef<HTMLDivElement>(null);
  const bigNumber = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const entries = gsap.utils.toArray<HTMLElement>(".timeline-entry");
      const mm = gsap.matchMedia();

      mm.add(MOTION_OK, () => {
        // Line draws downward as you scroll
        gsap.fromTo(
          line.current,
          { scaleY: 0 },
          { scaleY: 1, ease: "none", scrollTrigger: { trigger: timeline.current, start: "top 70%", end: "bottom 60%", scrub: true } }
        );
        // Each dot lights up + entry fades in when the line reaches it
        entries.forEach((el) =>
          ScrollTrigger.create({
            trigger: el,
            start: "top 68%",
            onEnter: () => el.classList.add("is-active"),
            onLeaveBack: () => el.classList.remove("is-active"),
          })
        );
      });

      // Reduced motion: everything visible immediately
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(line.current, { scaleY: 1 });
        entries.forEach((el) => el.classList.add("is-active"));
      });

      mm.add(DESKTOP_MOTION, () => {
        gsap.fromTo(
          bigNumber.current,
          { scale: 0.75, yPercent: 30 },
          { scale: 1.1, yPercent: -20, ease: "none", scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true } }
        );
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} id="experience" className="relative overflow-hidden pt-24 lg:pt-32">
      <div className="shell grid items-center gap-16 lg:grid-cols-2">
        <div>
          <SectionHeading title={experienceIntro.title} accent={experienceIntro.titleAccent} subtitle={experienceIntro.subtitle} />

          <div ref={timeline} className="relative mt-14 pl-10">
            <div aria-hidden className="absolute bottom-3 left-[7px] top-2 w-px bg-white/10" />
            <div ref={line} aria-hidden className="absolute bottom-3 left-[7px] top-2 w-px origin-top bg-gradient-to-b from-neon via-magenta to-electric" />

            {experience.map((item) => (
              <div key={item.role} className="timeline-entry relative pb-12 last:pb-4">
                <span className="timeline-dot absolute -left-10 top-2 h-[15px] w-[15px] rounded-full border border-white/30 bg-ink" />
                <div className="timeline-content">
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="font-serif text-2xl italic md:text-[1.7rem]">{item.role}</h3>
                    <span className={`rounded-full px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.15em] ${item.badgeClass}`}>
                      {item.badge}
                    </span>
                  </div>
                  <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted">{item.text}</p>
                </div>
              </div>
            ))}
          </div>

          <Reveal y={20} className="mt-6">
            <PillButton href="#contact" label="Get Started" />
          </Reveal>
        </div>

        {/* Dramatic portrait with outlined "15+" */}
        <div className="relative h-[520px] lg:h-[680px]">
          <Reveal className="h-full" y={60} duration={1.2}>
            <Portrait
              src={images.experiencePortrait}
              alt="Fazle Rabby Talukder portrait"
              flip
              className="h-full w-full"
              mask="radial-gradient(ellipse 75% 80% at 55% 38%, #000 55%, transparent 100%)"
            />
          </Reveal>
          <span
            ref={bigNumber}
            aria-hidden
            className="pointer-events-none absolute -right-2 bottom-[6%] font-display text-[clamp(8rem,24vw,17rem)] leading-none text-transparent [-webkit-text-stroke:2px_rgba(140,170,255,0.85)] drop-shadow-[0_0_30px_rgba(47,107,255,0.45)]"
          >
            {experienceIntro.bigNumber}
          </span>
        </div>
      </div>
    </section>
  );
}
