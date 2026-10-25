import { cn } from "@/lib/utils";

export interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  /** Set when the section uses aria-labelledby. */
  id?: string;
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  id,
  className,
}: SectionHeadingProps) {
  const centered = align === "center";

  return (
    <header
      className={cn(
        "max-w-[44rem]",
        centered && "mx-auto text-center",
        className,
      )}
    >
      <div className={cn("flex items-center gap-3", centered && "justify-center")}>
        <span aria-hidden className="h-px w-7 shrink-0 bg-primary/50" />
        <p className="eyebrow text-primary">{eyebrow}</p>
        {centered ? (
          <span aria-hidden className="h-px w-7 shrink-0 bg-primary/50" />
        ) : null}
      </div>

      <h2 id={id} className="type-section mt-4 text-ink">
        {title}
      </h2>

      {description ? (
        <p className="type-body mt-4 max-w-[62ch] text-muted">{description}</p>
      ) : null}
    </header>
  );
}

export default SectionHeading;
