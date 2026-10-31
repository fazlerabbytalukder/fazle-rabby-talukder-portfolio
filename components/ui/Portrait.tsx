import Image from "next/image";

type Props = {
  src: string;
  alt: string;
  priority?: boolean;
  sizes?: string;
  className?: string;
  /** CSS mask, e.g. to fade the bottom edge into the page */
  mask?: string;
  /** Swap the light: blue on the left, red on the right */
  flip?: boolean;
  position?: string;
};

/**
 * Photo with a cinematic red/blue duotone: the image is desaturated,
 * then colour + overlay blend layers fake red and blue rim lighting.
 */
export default function Portrait({
  src,
  alt,
  priority,
  sizes = "(min-width: 1024px) 40vw, 90vw",
  className = "",
  mask,
  flip,
  position = "center top",
}: Props) {
  const tint = flip
    ? "bg-[linear-gradient(90deg,#2F6BFF,#6a2fd6_50%,#FF2D55)]"
    : "bg-[linear-gradient(90deg,#FF2D55,#8a2bd0_50%,#2F6BFF)]";

  return (
    <div className={`relative overflow-hidden ${className}`} style={mask ? { maskImage: mask, WebkitMaskImage: mask } : undefined}>
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        draggable={false}
        className="object-cover grayscale contrast-[1.2] brightness-[0.8]"
        style={{ objectPosition: position }}
      />
      <div aria-hidden className={`absolute inset-0 opacity-75 mix-blend-color ${tint}`} />
      <div
        aria-hidden
        className="absolute inset-0 opacity-70 mix-blend-overlay bg-[radial-gradient(55%_60%_at_10%_40%,#FF2D55,transparent),radial-gradient(55%_60%_at_90%_40%,#2F6BFF,transparent)]"
      />
      <div aria-hidden className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,color-mix(in_srgb,var(--color-ink)_70%,transparent)_100%)]" />
    </div>
  );
}
