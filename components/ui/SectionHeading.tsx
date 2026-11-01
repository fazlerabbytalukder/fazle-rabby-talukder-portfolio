import SplitText from "@/components/motion/SplitText";
import Reveal from "@/components/motion/Reveal";

type Props = {
  /** Regular sans part of the heading */
  title: string;
  /** Italic serif accent words */
  accent?: string;
  subtitle?: string;
  align?: "left" | "center";
  /** Put the accent on its own line */
  breakAccent?: boolean;
  className?: string;
};

/** Heading that mixes light sans with italic serif accent words */
export default function SectionHeading({ title, accent, subtitle, align = "left", breakAccent, className = "" }: Props) {
  const centered = align === "center";

  return (
    <div className={`${centered ? "mx-auto text-center" : ""} max-w-xl ${className}`}>
      <h2 className="text-4xl font-light leading-[1.05] tracking-tight md:text-5xl">
        <SplitText text={title} />
        {accent &&
          (breakAccent ? (
            <span className="mt-3 block md:mt-4">
              <SplitText text={accent} className="font-serif italic" delay={0.2} />
            </span>
          ) : (
            <>
              {" "}
              <SplitText text={accent} className="font-serif italic" delay={0.2} />
            </>
          ))}
      </h2>
      {subtitle && (
        <Reveal delay={0.25} y={20}>
          <p className={`mt-4 text-sm leading-relaxed text-muted ${centered ? "mx-auto max-w-md" : "max-w-md"}`}>{subtitle}</p>
        </Reveal>
      )}
    </div>
  );
}
