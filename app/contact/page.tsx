import type { Metadata } from "next";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import ContactForm from "@/components/sections/ContactForm";
import SplitText from "@/components/motion/SplitText";
import Reveal from "@/components/motion/Reveal";
import RotatingBadge from "@/components/motion/RotatingBadge";
import { ArrowLeft, ArrowUpRight } from "@/components/ui/Icons";
import { contactPage, site, socials } from "@/data/site";

export const metadata: Metadata = {
  title: `Contact — ${site.name}`,
  description: contactPage.subtitle,
};

const details = [
  { label: "Email", value: site.email, href: `mailto:${site.email}` },
  { label: "Phone", value: site.phone, href: `tel:${site.phone.replace(/[^+\d]/g, "")}` },
  { label: "Location", value: site.location },
];

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="relative overflow-x-clip">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(40%_50%_at_8%_15%,rgba(255,45,85,0.18),transparent),radial-gradient(40%_50%_at_92%_60%,rgba(47,107,255,0.18),transparent)]"
        />

        <section className="shell relative pb-24 pt-32 lg:pb-32 lg:pt-44">
          <Reveal y={16}>
            <a href="/" className="group inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-muted hover:text-white">
              <ArrowLeft className="h-3.5 w-3.5 transition-transform duration-500 ease-premium group-hover:-translate-x-1" />
              Back to Home
            </a>
          </Reveal>

          <div className="mt-10 grid gap-14 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
            {/* Intro + details */}
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-neon">{contactPage.eyebrow}</p>
              <h1 className="mt-4 text-5xl font-light leading-[1.05] tracking-tight md:text-7xl">
                <SplitText text={contactPage.title} onMount />
                <span className="mt-2 block md:mt-3">
                  <SplitText text={contactPage.titleAccent} className="font-serif italic" delay={0.2} onMount />
                </span>
              </h1>
              <Reveal delay={0.3} y={20}>
                <p className="mt-6 max-w-md text-sm leading-relaxed text-muted md:text-base">{contactPage.subtitle}</p>
              </Reveal>

              <ul className="mt-12 divide-y divide-white/10 border-y border-white/10">
                {details.map((d, i) => (
                  <li key={d.label}>
                    <Reveal y={16} delay={0.35 + i * 0.08}>
                      {d.href ? (
                        <a href={d.href} className="group flex items-center justify-between gap-4 py-5">
                          <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-muted">{d.label}</span>
                          <span className="flex items-center gap-2 text-sm transition-colors group-hover:text-neon md:text-base">
                            {d.value}
                            <ArrowUpRight className="h-3.5 w-3.5 opacity-50 transition-transform duration-500 ease-premium group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100" />
                          </span>
                        </a>
                      ) : (
                        <div className="flex items-center justify-between gap-4 py-5">
                          <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-muted">{d.label}</span>
                          <span className="text-sm md:text-base">{d.value}</span>
                        </div>
                      )}
                    </Reveal>
                  </li>
                ))}
              </ul>

              <Reveal y={16} delay={0.6} className="mt-10 flex items-center justify-between gap-6">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-muted">Find me online</p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {socials.map((s) => (
                      <li key={s.label}>
                        <a
                          href={s.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-4 py-2 text-xs text-white/70 transition-colors hover:border-white/50 hover:text-white"
                        >
                          {s.label} <ArrowUpRight className="h-3 w-3" />
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="hidden shrink-0 sm:block">
                  <RotatingBadge text="Available for work • Available for work • " size={110}>
                    <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_12px_#34d399]" />
                  </RotatingBadge>
                </div>
              </Reveal>
            </div>

            {/* Form */}
            <Reveal y={40} delay={0.2}>
              <ContactForm />
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
