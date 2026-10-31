"use client";

import { useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { DESKTOP_MOTION, gsap, useGSAP } from "@/lib/gsap";
import { EASE } from "@/lib/motion";
import SplitText from "@/components/motion/SplitText";
import RotatingBadge from "@/components/motion/RotatingBadge";
import PillButton from "@/components/ui/PillButton";
import Portrait from "@/components/ui/Portrait";
import { ArrowDown } from "@/components/ui/Icons";
import { hero } from "@/data/site";
import { images } from "@/data/images";

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const left = useRef<HTMLSpanElement>(null);
  const right = useRef<HTMLSpanElement>(null);
  const portrait = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  // Scroll: headline halves drift apart, portrait sinks with parallax
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(DESKTOP_MOTION, () => {
        const tl = gsap.timeline({
          scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
        });
        tl.to(left.current, { xPercent: -40, ease: "none" }, 0)
          .to(right.current, { xPercent: 40, ease: "none" }, 0)
          .to(portrait.current, { yPercent: 18, ease: "none" }, 0);
      });
    },
    { scope: root }
  );

  const fadeUp = (delay: number) => ({
    initial: { opacity: 0, y: reduce ? 0 : 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 1, ease: EASE, delay },
  });

  return (
    <section
      ref={root}
      id="home"
      className="relative flex min-h-[100svh] flex-col overflow-hidden pt-24 lg:block lg:h-[100svh] lg:min-h-[720px] lg:pt-0"
    >
      {/* Ambient red/blue glows */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute left-[8%] top-1/3 h-[50vh] w-[40vw] rounded-full bg-neon/20 blur-[120px]" />
        <div className="absolute right-[8%] top-1/4 h-[50vh] w-[40vw] rounded-full bg-electric/20 blur-[120px]" />
      </div>

      {/* Headline — stacked on mobile, split left/right on desktop */}
      <h1 className="shell relative z-10 order-1 flex flex-col items-center font-display uppercase leading-[0.85] text-[21vw] lg:absolute lg:inset-x-0 lg:top-[17%] lg:flex-row lg:justify-between lg:text-[clamp(5rem,10.5vw,10.5rem)]">
        <span ref={left} className="block">
          <SplitText text={hero.lineLeft} by="char" onMount delay={0.3} />
        </span>
        <span ref={right} className="block">
          <SplitText text={hero.lineRight} by="char" onMount delay={0.55} />
        </span>
      </h1>

      {/* Portrait — behind the headline, centred */}
      <div
        ref={portrait}
        className="relative order-2 mx-auto -mt-[12vw] h-[60svh] w-full max-w-md lg:absolute lg:inset-x-0 lg:bottom-0 lg:mt-0 lg:h-[94%] lg:w-[min(600px,42vw)] lg:max-w-none"
      >
        <motion.div
          className="h-full w-full"
          initial={{ opacity: 0, scale: reduce ? 1 : 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.8, ease: EASE, delay: 0.1 }}
        >
          <Portrait
            src={images.heroPortrait}
            alt="Portrait of Fazle Rabby Talukder"
            priority
            className="h-full w-full"
            mask="linear-gradient(to bottom, #000 65%, transparent 98%)"
          />
        </motion.div>
      </div>

      {/* Intro copy + scroll badge */}
      <div className="shell relative z-10 order-3 -mt-24 flex flex-col gap-10 pb-12 lg:absolute lg:inset-x-0 lg:bottom-10 lg:mt-0 lg:flex-row lg:items-end lg:justify-between lg:pb-0">
        <div className="max-w-sm">
          <motion.p {...fadeUp(0.9)} className="mb-4 text-[10px] font-semibold uppercase tracking-[0.3em] text-neon">
            {hero.eyebrow}
          </motion.p>
          <motion.h2 {...fadeUp(1)} className="text-2xl font-light leading-tight md:text-3xl">
            {hero.title} <span className="font-serif italic">{hero.titleAccent}</span>
          </motion.h2>
          <motion.p {...fadeUp(1.1)} className="mt-4 text-sm leading-relaxed text-muted">
            {hero.body}
          </motion.p>
          <motion.div {...fadeUp(1.2)} className="mt-7">
            <PillButton href="#contact" label="Let's Contact" variant="glow" />
          </motion.div>
        </div>

        <motion.a href="#about" aria-label="Scroll down" {...fadeUp(1.3)} className="self-end">
          <RotatingBadge text="Scroll Down • Scroll Down • " size={124}>
            <ArrowDown className="h-5 w-5" />
          </RotatingBadge>
        </motion.a>
      </div>
    </section>
  );
}
