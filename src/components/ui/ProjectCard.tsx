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
  glyph: string;
  hairline: string;
}

const TONES: Record<ProjectAccent, Tone> = {
  primary: {
    band: "bg-[#D47779]",
    glyph: "text-white/90",
    hairline: "bg-white/20",
  },
  sage: {
    band: "bg-[#FDF5EF]",
    glyph: "text-[#D47779]",
    hairline: "bg-[#D47779]/20",
  },
  ink: {
    band: "bg-[#5C1227]",
    glyph: "text-white/90",
    hairline: "bg-white/15",
  },
  sand: {
    band: "bg-[#FEF4EA]",
    glyph: "text-[#421623]/80",
    hairline: "bg-[#F0E3DC]",
  },
};

const SKIPPED_WORDS = new Set(["a", "an", "and", "the", "of", "for", "&"]);

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

export function ProjectCard({ project, className }: ProjectCardProps) {
  const { language, t } = useLanguage();
  const tone = TONES[project.accent];
  const mark = plateMark(project.title[language]);
  const titleId = `project-${project.id}-title`;

  return (
    <article
      aria-labelledby={titleId}
      className={cn(
        "group flex h-full min-w-0 flex-col overflow-hidden rounded-3xl border border-[#F0E3DC] bg-white",
        "transition-all duration-300 ease-out",
        "hover:-translate-y-1 hover:border-[#D47779] hover:shadow-lg hover:shadow-[#D47779]/15",
        className,
      )}
    >
      {/* Decorative Brand Header */}
      <div
        aria-hidden
        className={cn(
          "relative h-36 shrink-0 overflow-hidden border-b border-[#F0E3DC] md:h-40",
          tone.band,
        )}
      >
        <span className={cn("absolute inset-y-0 left-1/3 w-px", tone.hairline)} />
        <span className={cn("absolute inset-y-0 left-2/3 w-px", tone.hairline)} />
        <span className={cn("absolute inset-x-0 top-1/2 h-px", tone.hairline)} />

        <span
          className={cn(
            "absolute left-5 top-5 flex h-8 w-8 items-center justify-center rounded-full border border-current",
            tone.glyph,
          )}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-current" />
        </span>

        <span
          className={cn(
            "absolute bottom-2 right-5 select-none font-serif text-[4.5rem] font-bold leading-none tracking-tight md:text-[5rem]",
            tone.glyph,
          )}
        >
          {mark}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <p className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs">
          <span className="font-semibold text-[#D47779]">
            {project.category[language]}
          </span>
          <span className="text-[#7D6B70]/80">·</span>
          <span className="text-[#7D6B70]">{project.context[language]}</span>
        </p>

        <h3 id={titleId} className="font-serif text-xl sm:text-2xl font-semibold text-[#421623] mt-2">
          {project.title[language]}
        </h3>

        <p className="font-sans text-sm text-[#7D6B70] leading-relaxed mt-2.5">
          {project.description[language]}
        </p>

        <div className="mt-5">
          <p className="eyebrow text-[#D47779] text-xs font-semibold">
            {t.work.highlightsLabel}
          </p>
          <ul className="mt-2.5 space-y-1.5">
            {project.highlights[language].map((highlight) => (
              <li
                key={highlight}
                className="flex items-start gap-2 text-xs leading-relaxed text-[#421623]/85"
              >
                <span className="text-[#D47779] mt-1">•</span>
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-auto pt-5">
          <ul
            aria-label={t.work.skillsLabel}
            className="flex flex-wrap gap-1.5 border-t border-[#F0E3DC] pt-4"
          >
            {project.skills.map((skill) => (
              <li
                key={skill}
                className="rounded-full border border-[#F0E3DC] bg-[#FEF4EA] px-2.5 py-1 text-[11px] text-[#421623]"
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
