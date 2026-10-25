import Image from "next/image";
import { cn } from "@/lib/utils";

export interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  watermark?: string;
  sparkle?: boolean;
  /** Set when the section uses aria-labelledby. */
  id?: string;
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  watermark,
  sparkle,
  id,
  className,
}: SectionHeadingProps) {
  const centered = align === "center";
  const watermarkText = watermark || eyebrow;

  return (
    <header
      className={cn(
        "relative max-w-[46rem]",
        centered && "mx-auto text-center",
        className,
      )}
    >
      {/* Faint Watermark Serif Text from Pinterest design */}
      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none select-none absolute font-serif text-[60px] sm:text-[84px] lg:text-[100px] text-[#E8C4B4]/25 font-normal leading-none -top-6 sm:-top-10 z-0 whitespace-nowrap",
          centered ? "left-1/2 -translate-x-1/2" : "-left-2 sm:-left-4",
        )}
      >
        {watermarkText}
      </span>

      {/* Eyebrow with decorative rose pill / line */}
      <div
        className={cn(
          "relative z-10 flex items-center gap-2.5 mb-3",
          centered && "justify-center",
        )}
      >
        <span className="h-1.5 w-1.5 rounded-full bg-[#D47779]" />
        <p className="eyebrow text-[#D47779] font-sans font-semibold text-xs tracking-[0.16em]">
          {eyebrow}
        </p>
      </div>

      {/* Main Title */}
      <div className="relative z-10 inline-block">
        <h2
          id={id}
          className="font-serif text-[32px] sm:text-[42px] lg:text-[48px] font-semibold text-[#421623] leading-[1.15]"
        >
          {title}
        </h2>

        {/* Optional Sparkle Stars */}
        {sparkle && (
          <div className="absolute -top-3 -right-10 pointer-events-none w-8 h-8">
            <Image
              src="/hero_stars_pair.png"
              alt="Sparkle"
              fill
              sizes="32px"
              className="object-contain"
            />
          </div>
        )}
      </div>

      {/* Description */}
      {description ? (
        <p className="font-sans text-[15px] sm:text-[16px] leading-[1.75] text-[#7D6B70] mt-4 max-w-[62ch] relative z-10">
          {description}
        </p>
      ) : null}
    </header>
  );
}

export default SectionHeading;
