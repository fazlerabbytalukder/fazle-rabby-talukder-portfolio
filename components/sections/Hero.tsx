"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { DESKTOP_MOTION, gsap, useGSAP } from "@/lib/gsap";
import { scrollToHash } from "@/components/motion/SmoothScroll";
import { EASE } from "@/lib/motion";
import SplitText from "@/components/motion/SplitText";
import RotatingBadge from "@/components/motion/RotatingBadge";
import PillButton from "@/components/ui/PillButton";
import { ArrowDown } from "@/components/ui/Icons";
import { hero } from "@/data/site";
import { images } from "@/data/images";

/*
 * Desktop layout is measured from the design on a grid unit `--u` (1/83 of the shell width, see globals.css),
 * so headline, portrait and copy keep the same proportions at every desktop size.
 * The portrait's eyes sit on the headline's mid-line; its chin lands just under the headline.
 */

// Bottom fade intersected with soft side fades, so the figure reads as a lit column.
// Tuned for hero-portrait.png (1448×1086): eyes at ~34% of its height, head ~28% of its width.
const PORTRAIT_MASK =
  "linear-gradient(to bottom, #000 50%, transparent 96%), linear-gradient(to right, transparent 12%, #000 32%, #000 68%, transparent 88%)";

/** Full-size layer clipped to the portrait cut-out's alpha */
function SilhouetteLayer({ className }: { className: string }) {
  const mask = `url(${images.heroPortrait})`;
  return (
    <div
      aria-hidden
      className={`absolute inset-0 [mask-position:top] [mask-repeat:no-repeat] [mask-size:contain] ${className}`}
      style={{ maskImage: mask, WebkitMaskImage: mask }}
    />
  );
}

/** First word bright, the rest dimmed — "FROM idea", "TO impact" */
function HeadlineWords({ text, delay }: { text: string; delay: number }) {
  const [first, ...rest] = text.split(" ");
  return (
    <span className="mb-[0.3em] inline-block origin-top scale-y-[1.3] whitespace-nowrap lg:mb-0 lg:scale-y-[1.95]">
      <SplitText text={first} by="char" onMount delay={delay} />{" "}
      <SplitText text={rest.join(" ")} by="char" onMount delay={delay + 0.15} className="text-white/50" />
    </span>
  );
}

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
      className="relative flex min-h-[100svh] flex-col overflow-hidden pt-24 lg:block lg:h-[calc(var(--u)*54)] lg:min-h-0 lg:pt-0"
    >
      {/* Fluted panel texture + coloured light behind the portrait */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="hero-flutes absolute inset-0" />
        <div className="absolute left-1/2 top-[8%] h-[70%] w-[38%] -translate-x-[95%] rounded-full bg-neon/15 blur-[110px]" />
        <div className="absolute left-1/2 top-[2%] h-[70%] w-[34%] -translate-x-[5%] rounded-full bg-electric/25 blur-[110px]" />
      </div>

      {/* Headline — stacked on mobile, split around the portrait's head on desktop */}
      <h1 className="shell relative z-10 order-1 flex flex-col items-center font-display uppercase leading-[0.85] text-[18vw] lg:absolute lg:inset-x-0 lg:top-[calc(var(--u)*15.9)] lg:flex-row lg:justify-between lg:text-[length:calc(var(--u)*7)]">
        <span ref={left} className="block">
          <HeadlineWords text={hero.lineLeft} delay={0.3} />
        </span>
        <span ref={right} className="block">
          <HeadlineWords text={hero.lineRight} delay={0.55} />
        </span>
      </h1>

      {/* Portrait — transparent cut-out with cyan/red rim light */}
      {/* lg:pl nudges the figure right to centre it in the headline gap ("FROM CONCEPT" is wider than "TO CREATION") */}
      <div className="relative order-2 flex justify-center lg:absolute lg:inset-x-0 lg:top-[calc(var(--u)*3.5)] lg:pl-[calc(var(--u)*4)]">
        <div
          ref={portrait}
          className="relative mt-[6vw] aspect-[1448/1086] w-[135vw] max-w-none shrink-0 lg:mt-0 lg:h-[calc(var(--u)*48.9)] lg:w-auto"
          style={{ maskImage: PORTRAIT_MASK, WebkitMaskImage: PORTRAIT_MASK, maskComposite: "intersect", WebkitMaskComposite: "source-in" }}
        >
          <motion.div
            className="relative h-full w-full"
            initial={{ opacity: 0, scale: reduce ? 1 : 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.8, ease: EASE, delay: 0.1 }}
          >
            <Image
              src={images.heroPortrait}
              alt="Portrait of Fazle Rabby Talukder"
              fill
              priority
              sizes="(min-width: 1024px) 40vw, 80vw"
              draggable={false}
              className="object-contain object-top grayscale contrast-[1.25] brightness-[0.8]"
            />
            {/* Colour layers clipped to the figure's silhouette (each masked layer blends with the photo itself) */}
            <SilhouetteLayer className="bg-[linear-gradient(100deg,#1fa8ff_0%,#2f8bff_40%,#ff2d55_64%,#ff2d55_100%)] opacity-90 mix-blend-color" />
            <SilhouetteLayer className="bg-[radial-gradient(35%_40%_at_6%_42%,rgb(255_45_85/0.6),transparent),radial-gradient(30%_40%_at_97%_30%,rgb(255_45_85/0.45),transparent)] mix-blend-screen" />
            {/* Darken the shirt so the figure sinks into the page like the design */}
            <SilhouetteLayer className="bg-[linear-gradient(to_bottom,transparent_48%,color-mix(in_srgb,var(--color-ink)_60%,transparent)_78%)]" />
          </motion.div>
        </div>
      </div>

      {/* Intro copy */}
      <div className="shell relative z-10 order-3 -mt-24 pb-12 lg:absolute lg:inset-x-0 lg:top-[calc(var(--u)*31)] lg:mt-0 lg:pb-0">
        <motion.h2
          {...fadeUp(1)}
          className="text-[clamp(1.6rem,6.4vw,2.25rem)] font-light leading-[1.12] tracking-[-0.03em] lg:text-[length:calc(var(--u)*2.45)]"
        >
          {hero.title.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
          <span className="mt-[0.88em] block font-serif text-[20px] italic tracking-[-0.005em] sm:text-[22px] lg:text-[26px]">
            {hero.titleAccent}
          </span>
        </motion.h2>
        <motion.p
          {...fadeUp(1.1)}
          className="mt-4 max-w-[30rem] text-[13px] leading-[1.55] text-white/80 lg:mt-[calc(var(--u)*1.3)] lg:max-w-[calc(var(--u)*31)] lg:text-[length:max(13px,calc(var(--u)*0.95))]"
        >
          {hero.body}
        </motion.p>
        <motion.div {...fadeUp(1.2)} className="mt-7 lg:hidden">
          <PillButton href="#contact" label="Lets Contact" variant="glow" />
        </motion.div>
      </div>

      {/* Desktop: contact button centred under the portrait, scroll badge at the right */}
      <motion.div
        {...fadeUp(1.2)}
        className="absolute left-1/2 top-[calc(var(--u)*41.9)] z-10 hidden -translate-x-1/2 lg:block"
      >
        <PillButton href="#contact" label="Lets Contact" variant="glow" />
      </motion.div>
      <div className="shell pointer-events-none relative z-10 order-4 flex justify-end pb-12 lg:absolute lg:inset-x-0 lg:top-[calc(var(--u)*36.5)] lg:pb-0">
        <motion.a
          href="#footer"
          aria-label="Scroll to footer"
          onClick={(e) => {
            e.preventDefault();
            scrollToHash("#footer");
          }}
          {...fadeUp(1.3)}
          className="pointer-events-auto lg:-mr-[calc(var(--u)*1)]"
        >
          <RotatingBadge text="Scroll Down • Scroll Down • " size={124} className="lg:!h-[calc(var(--u)*8.4)] lg:!w-[calc(var(--u)*8.4)]">
            <ArrowDown className="h-5 w-5" />
          </RotatingBadge>
        </motion.a>
      </div>

      {/* Divider closing the hero */}
      <motion.div aria-hidden {...fadeUp(1.4)} className="shell absolute inset-x-0 bottom-0 hidden lg:block">
        <div className="h-px w-full bg-white/10" />
      </motion.div>
    </section>
  );
}
