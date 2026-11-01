import type { Metadata } from "next";
import Navbar from "@/components/sections/Navbar";
import ProjectArchive from "@/components/sections/ProjectArchive";
import CTA from "@/components/sections/CTA";
import Footer from "@/components/sections/Footer";
import SplitText from "@/components/motion/SplitText";
import Reveal from "@/components/motion/Reveal";
import { ArrowLeft } from "@/components/ui/Icons";
import { allProjectsIntro } from "@/data/allProjects";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: `Projects — ${site.name}`,
  description: allProjectsIntro.subtitle,
};

export default function ProjectsPage() {
  return (
    <>
      <Navbar />
      <main>
        <header className="relative overflow-x-clip pb-14 pt-32 lg:pb-20 lg:pt-44">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(40%_60%_at_10%_20%,rgba(255,45,85,0.18),transparent),radial-gradient(40%_60%_at_90%_10%,rgba(47,107,255,0.18),transparent)]"
          />
          <div className="shell relative">
            <Reveal y={16}>
              <a href="/" className="group inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-muted hover:text-white">
                <ArrowLeft className="h-3.5 w-3.5 transition-transform duration-500 ease-premium group-hover:-translate-x-1" />
                Back to Home
              </a>
            </Reveal>
            <p className="mt-10 text-[10px] font-semibold uppercase tracking-[0.3em] text-neon">{allProjectsIntro.eyebrow}</p>
            <h1 className="mt-4 max-w-3xl text-5xl font-light leading-[1.05] tracking-tight md:text-7xl">
              <SplitText text={allProjectsIntro.title} onMount />
              <span className="mt-2 block md:mt-3">
                <SplitText text={allProjectsIntro.titleAccent} className="font-serif italic" delay={0.2} onMount />
              </span>
            </h1>
            <Reveal delay={0.3} y={20}>
              <p className="mt-6 max-w-xl text-sm leading-relaxed text-muted md:text-base">{allProjectsIntro.subtitle}</p>
            </Reveal>
          </div>
        </header>

        <ProjectArchive />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
