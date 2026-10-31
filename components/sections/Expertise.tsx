"use client";

import { useRef } from "react";
import { DESKTOP_MOTION, gsap, useGSAP } from "@/lib/gsap";
import PillButton from "@/components/ui/PillButton";
import { expertise, expertiseIntro } from "@/data/expertise";

// Deterministic spark positions around the ring (no Math.random → no hydration mismatch)
const SPARKS = Array.from({ length: 16 }, (_, i) => ({
  angle: i * 22.5 + (i % 3) * 7,
  size: 2 + (i % 3),
  delay: (i * 0.37) % 2.6,
  color: i % 16 < 7 ? "#FF2D55" : i % 16 < 9 ? "var(--color-white)" : "#2F6BFF",
}));

/** Corner each card flies in from: TL, TR, BL, BR */
const FROM = [
  { x: -260, y: -160 },
  { x: 260, y: -160 },
  { x: -260, y: 160 },
  { x: 260, y: 160 },
];

export default function Expertise() {
  const root = useRef<HTMLElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const center = useRef<HTMLDivElement>(null);
  const cards = useRef<(HTMLElement | null)[]>([]);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // Desktop: pin the section and scrub ring + cards with scroll
      mm.add(DESKTOP_MOTION, () => {
        const tl = gsap.timeline({
          scrollTrigger: { trigger: root.current, start: "top top", end: "+=130%", scrub: 1, pin: true },
        });
        tl.fromTo(ring.current, { scale: 0.55, rotate: -50, opacity: 0.3 }, { scale: 1, rotate: 25, opacity: 1, ease: "none", duration: 1 }, 0)
          .fromTo(center.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, ease: "power2.out", duration: 0.4 }, 0.25);
        cards.current.forEach((card, i) => {
          tl.fromTo(card, { ...FROM[i], opacity: 0 }, { x: 0, y: 0, opacity: 1, ease: "power3.out", duration: 0.5 }, 0.3 + i * 0.08);
        });
      });

      // Mobile / tablet: simple fade-up, no pinning
      mm.add("(max-width: 1023px) and (prefers-reduced-motion: no-preference)", () => {
        cards.current.forEach((card) => {
          gsap.from(card, { y: 40, opacity: 0, duration: 1, ease: "expo.out", scrollTrigger: { trigger: card, start: "top 90%" } });
        });
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} id="services" className="relative overflow-hidden pt-24 lg:h-screen lg:pt-0">
      <div className="shell relative lg:h-full">
        {/* Neon ring */}
        <div className="relative mx-auto aspect-square w-[min(88vw,520px)] lg:absolute lg:left-1/2 lg:top-1/2 lg:w-[min(68vh,560px)] lg:-translate-x-1/2 lg:-translate-y-1/2">
          <div ref={ring} className="absolute inset-0">
            <div className="neon-ring neon-ring--haze animate-pulse-glow" />
            <div className="neon-ring neon-ring--glow animate-pulse-glow" />
            <div className="neon-ring" />
            {SPARKS.map((s, i) => (
              <span key={i} aria-hidden className="absolute inset-0" style={{ transform: `rotate(${s.angle}deg)` }}>
                <span
                  className="absolute left-1/2 top-0 -ml-px -mt-px block animate-twinkle rounded-full"
                  style={{
                    width: s.size,
                    height: s.size,
                    background: s.color,
                    boxShadow: `0 0 10px 2px ${s.color}`,
                    animationDelay: `${s.delay}s`,
                  }}
                />
              </span>
            ))}
          </div>

          {/* Centre copy (doesn't rotate) */}
          <div ref={center} className="absolute inset-0 grid place-items-center px-[16%] text-center">
            <div>
              <h2 className="text-3xl font-light leading-tight md:text-5xl">
                {expertiseIntro.title} <span className="font-serif italic">{expertiseIntro.titleAccent}</span>
              </h2>
              <p className="mx-auto mt-4 max-w-xs text-xs leading-relaxed text-muted md:text-sm">{expertiseIntro.body}</p>
              <div className="mt-6">
                <PillButton href="#contact" label="Get Started" />
              </div>
            </div>
          </div>
        </div>

        {/* Corner cards (stacked grid on mobile) */}
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:mt-0 lg:block">
          {expertise.map((item, i) => (
            <article
              key={item.title}
              ref={(el) => {
                cards.current[i] = el;
              }}
              className={`relative rounded-md border border-white/10 bg-white/[0.04] p-6 backdrop-blur-md lg:absolute lg:w-[270px] xl:w-[300px] ${item.corner}`}
            >
              <span
                aria-hidden
                className={`absolute top-0 h-px w-16 bg-gradient-to-r ${i % 2 ? "right-6 from-electric to-transparent" : "left-6 from-neon to-transparent"}`}
              />
              <h3 className="font-display text-3xl uppercase leading-none tracking-wide">{item.title}</h3>
              <p className="mt-3 text-xs leading-relaxed text-muted">{item.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
