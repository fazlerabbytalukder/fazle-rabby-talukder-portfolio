import Reveal from "@/components/motion/Reveal";
import { footer, footerLinks, site } from "@/data/site";

export default function Footer() {
  return (
    <footer id="footer" className="relative border-t border-white/5 pb-8 pt-20">
      <div className="shell text-center">
        <Reveal>
          <p className="font-display text-7xl leading-none tracking-wide md:text-9xl">
            {site.shortName}
            <span className="text-neon">.</span>
          </p>
        </Reveal>
        <Reveal delay={0.1} y={20}>
          <p className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-muted">{footer.blurb}</p>
        </Reveal>

        <nav aria-label="Footer" className="mt-14">
          <ul className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-xs text-white/70 md:justify-between">
            {footerLinks.map((l) => (
              <li key={l.label}>
                <a href={l.href.startsWith("#") && l.href !== "#" ? `/${l.href}` : l.href} className="transition-colors hover:text-white">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-8 h-px w-full bg-gradient-to-r from-transparent via-white/15 to-transparent" />
        <p className="mt-6 text-[11px] text-white/45">{footer.copyright}</p>
      </div>
    </footer>
  );
}
