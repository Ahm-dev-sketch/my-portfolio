"use client";

import { useLanguage } from "@/hooks/useLanguage";
import { cn } from "@/lib/utils";
import type { PortfolioProject, ProjectAccent } from "@/types/portfolio";

export interface ProjectCardProps {
  project: PortfolioProject;
  className?: string;
}

interface Tone {
  band: string;
  /** Applied to the abstract plate: glyph, frame and hairline accents. */
  glyph: string;
  hairline: string;
}

const TONES: Record<ProjectAccent, Tone> = {
  primary: {
    band: "bg-primary",
    glyph: "text-white/90",
    hairline: "bg-white/15",
  },
  sage: {
    band: "bg-accent",
    glyph: "text-primary/80",
    hairline: "bg-primary/10",
  },
  ink: {
    band: "bg-ink",
    glyph: "text-accent",
    hairline: "bg-white/10",
  },
  sand: {
    band: "bg-canvas",
    glyph: "text-ink/70",
    hairline: "bg-line",
  },
};

const SKIPPED_WORDS = new Set(["a", "an", "and", "the", "of", "for", "&"]);

/** Two-letter plate mark derived from the localized title. Decorative only. */
function plateMark(title: string) {
  const words = title
    .split(/\s+/)
    .map((word) => word.replace(/[^\p{L}\p{N}]/gu, ""))
    .filter((word) => word.length > 0 && !SKIPPED_WORDS.has(word.toLowerCase()));

  const mark = words
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase() ?? "")
    .join("");

  return mark || title.slice(0, 2).toUpperCase();
}

/**
 * Editorial project card: an abstract typographic plate instead of an image.
 * Every accent variant shares the same composition so the grid stays calm.
 */
export function ProjectCard({ project, className }: ProjectCardProps) {
  const { language, t } = useLanguage();
  const tone = TONES[project.accent];
  const mark = plateMark(project.title[language]);
  const titleId = `project-${project.id}-title`;

  return (
    <article
      aria-labelledby={titleId}
      className={cn(
        "group flex h-full min-w-0 flex-col overflow-hidden rounded-lg border border-line bg-surface",
        "transition-[transform,border-color,box-shadow] duration-300 ease-out",
        "hover:-translate-y-0.5 hover:border-accent-line hover:shadow-[0_20px_40px_-34px_rgba(23,35,31,0.55)]",
        "motion-reduce:transform-none",
        className,
      )}
    >
      <div
        aria-hidden
        className={cn(
          "relative h-40 shrink-0 overflow-hidden border-b border-line md:h-44",
          tone.band,
        )}
      >
        <span className={cn("absolute inset-y-0 left-1/3 w-px", tone.hairline)} />
        <span className={cn("absolute inset-y-0 left-2/3 w-px", tone.hairline)} />
        <span className={cn("absolute inset-x-0 top-1/2 h-px", tone.hairline)} />

        <span
          className={cn(
            "absolute left-5 top-5 flex h-9 w-9 items-center justify-center border border-current",
            tone.glyph,
          )}
        >
          <span className="h-1.5 w-1.5 bg-current" />
        </span>

        <span
          className={cn(
            "absolute bottom-3 right-5 select-none text-[5rem] font-semibold leading-none tracking-[-0.06em] md:text-[5.5rem]",
            tone.glyph,
          )}
        >
          {mark}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5 md:p-6">
        <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.75rem] leading-snug">
          <span className="font-medium text-primary">
            {project.category[language]}
          </span>
          <span className="text-muted">{project.context[language]}</span>
        </p>

        <h3 id={titleId} className="type-card mt-3 text-ink">
          {project.title[language]}
        </h3>

        <p className="type-body mt-2 text-muted">{project.description[language]}</p>

        <div className="mt-5">
          <p className="eyebrow text-muted">{t.work.highlightsLabel}</p>
          <ul className="mt-2.5 space-y-1.5">
            {project.highlights[language].map((highlight) => (
              <li
                key={highlight}
                className="flex gap-2.5 text-[0.8125rem] leading-relaxed text-ink/80"
              >
                <span
                  aria-hidden
                  className="mt-[0.62em] h-px w-2.5 shrink-0 bg-accent-line"
                />
                <span className="min-w-0">{highlight}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-auto pt-5">
          <ul
            aria-label={t.work.skillsLabel}
            className="flex flex-wrap gap-1.5 border-t border-line pt-4"
          >
            {project.skills.map((skill) => (
              <li
                key={skill}
                className="rounded-pill border border-line px-2.5 py-1 text-[0.6875rem] leading-none text-muted"
              >
                {skill}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}

export default ProjectCard;
