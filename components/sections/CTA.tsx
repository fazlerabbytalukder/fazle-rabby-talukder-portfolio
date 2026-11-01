"use client";

import { useRef } from "react";
import { MOTION_OK, gsap, useGSAP } from "@/lib/gsap";
import SectionHeading from "@/components/ui/SectionHeading";
import PillButton from "@/components/ui/PillButton";
import Portrait from "@/components/ui/Portrait";
import RotatingBadge from "@/components/motion/RotatingBadge";
import Reveal from "@/components/motion/Reveal";
import { ArrowUpRight } from "@/components/ui/Icons";
import { cta, site } from "@/data/site";
import { images } from "@/data/images";

export default function CTA() {
  const root = useRef<HTMLElement>(null);
  const lineOne = useRef<HTMLSpanElement>(null);
  const lineTwo = useRef<HTMLSpanElement>(null);
  const portrait = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const st = { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true };
        // Background lines slide in opposite directions
        gsap.fromTo(lineOne.current, { xPercent: 8 }, { xPercent: -18, ease: "none", scrollTrigger: st });
        gsap.fromTo(lineTwo.current, { xPercent: -15 }, { xPercent: 10, ease: "none", scrollTrigger: st });
        // Portrait rises into place
        gsap.fromTo(
          portrait.current,
          { yPercent: 25 },
          { yPercent: 0, ease: "none", scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom bottom", scrub: true } }
        );
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} id="contact" className="relative flex flex-col overflow-hidden pt-24 lg:block lg:min-h-[100svh] lg:pt-0">
      {/* Huge outlined background words */}
      <div aria-hidden className="pointer-events-none flex flex-col font-display uppercase leading-[0.82] text-[20vw] lg:absolute lg:inset-x-0 lg:top-[8%]">
        <span ref={lineOne} className="block whitespace-nowrap bg-gradient-to-b from-white/15 to-white/0 bg-clip-text text-outline">
          {cta.bgLineOne}
        </span>
        <span ref={lineTwo} className="block whitespace-nowrap bg-gradient-to-b from-white/15 to-white/0 bg-clip-text pl-[38vw] text-outline">
          {cta.bgLineTwo}
        </span>
      </div>

      {/* Glow behind portrait */}
      <div aria-hidden className="pointer-events-none absolute bottom-0 left-1/2 h-[60%] w-[60%] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(255,45,85,0.25),rgba(47,107,255,0.15),transparent)] blur-3xl" />

      <div
        ref={portrait}
        className="relative mx-auto -mt-[10vw] h-[60svh] w-full max-w-md lg:absolute lg:bottom-0 lg:left-1/2 lg:mt-0 lg:h-[82%] lg:w-[min(560px,42vw)] lg:max-w-none lg:-translate-x-1/2"
      >
        <Portrait
          src={images.ctaPortrait}
          alt="Fazle Rabby Talukder leaning on a stair railing, holding sunglasses"
          position="48% top"
          className="h-full w-full"
          mask="linear-gradient(to bottom, #000 70%, transparent)"
        />
      </div>

      <div className="shell relative z-10 -mt-16 flex flex-col gap-10 pb-20 lg:absolute lg:inset-x-0 lg:bottom-16 lg:mt-0 lg:flex-row lg:items-end lg:justify-between lg:pb-0">
        <div className="max-w-sm">
          <SectionHeading title={cta.title} accent={cta.titleAccent} breakAccent />
          <Reveal y={20} delay={0.2}>
            <p className="mt-5 text-sm leading-relaxed text-muted">{cta.body}</p>
          </Reveal>
          <Reveal y={20} delay={0.3} className="mt-7">
            <PillButton href={`mailto:${site.email}`} label="Contact Me" variant="glow" />
          </Reveal>
        </div>
        <Reveal delay={0.3} className="self-end">
          <a href={`mailto:${site.email}`} aria-label="Contact me">
            <RotatingBadge text="Contact Me • Contact Me • " size={130}>
              <ArrowUpRight className="h-5 w-5" />
            </RotatingBadge>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
