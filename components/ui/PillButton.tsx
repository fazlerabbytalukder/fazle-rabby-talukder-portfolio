import MagneticButton from "@/components/motion/MagneticButton";
import { ArrowUpRight } from "./Icons";

type Props = {
  href: string;
  label: string;
  /** "glow" adds a red→blue gradient ring */
  variant?: "outline" | "glow";
  className?: string;
  /** Open in a new tab */
  external?: boolean;
};

/** Small uppercase pill link with a ↗ arrow that nudges diagonally on hover */
export default function PillButton({ href, label, variant = "outline", className = "", external }: Props) {
  const ring =
    variant === "glow"
      ? "glow-pill px-6 py-3 text-[11px] font-bold tracking-[0.06em]"
      : "border border-white/25 px-5 py-2.5 text-[10px] font-semibold tracking-[0.22em] hover:border-white/60 hover:bg-white/5";

  return (
    <MagneticButton>
      <a
        href={href}
        {...(external && { target: "_blank", rel: "noopener noreferrer" })}
        className={`group inline-flex items-center gap-2 rounded-full uppercase text-white transition-colors duration-300 ${ring} ${className}`}
      >
        {label}
        <span className="overflow-hidden">
          <ArrowUpRight className="h-3 w-3 transition-transform duration-500 ease-premium group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </span>
      </a>
    </MagneticButton>
  );
}
