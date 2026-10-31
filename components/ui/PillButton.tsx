import MagneticButton from "@/components/motion/MagneticButton";
import { ArrowUpRight } from "./Icons";

type Props = {
  href: string;
  label: string;
  /** "glow" adds a red→blue gradient ring */
  variant?: "outline" | "glow";
  className?: string;
};

/** Small uppercase pill link with a ↗ arrow that nudges diagonally on hover */
export default function PillButton({ href, label, variant = "outline", className = "" }: Props) {
  const ring =
    variant === "glow"
      ? "border-transparent [background:linear-gradient(var(--color-ink),var(--color-ink))_padding-box,linear-gradient(90deg,#FF2D55,#2F6BFF)_border-box] shadow-[0_0_24px_-6px_rgba(255,45,85,0.6)]"
      : "border-white/25 hover:border-white/60 hover:bg-white/5";

  return (
    <MagneticButton>
      <a
        href={href}
        className={`group inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-white transition-colors duration-300 ${ring} ${className}`}
      >
        {label}
        <span className="overflow-hidden">
          <ArrowUpRight className="h-3 w-3 transition-transform duration-500 ease-premium group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </span>
      </a>
    </MagneticButton>
  );
}
