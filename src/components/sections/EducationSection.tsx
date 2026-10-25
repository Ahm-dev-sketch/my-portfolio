"use client";

import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useLanguage } from "@/hooks/useLanguage";
import { education } from "@/data/portfolio";

export function EducationSection() {
  const { language, t } = useLanguage();
  const summaryParagraphs = education.summary[language]
    .split("\n\n")
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

  return (
    <section
      id="education"
      aria-labelledby="education-heading"
      className="border-y border-line bg-surface"
    >
      <div className="container-page py-16 sm:py-20 md:py-24 lg:py-28">
        <Reveal>
          <SectionHeading
            eyebrow={t.education.eyebrow}
            title={t.education.heading}
            id="education-heading"
          />
        </Reveal>

        <div className="mt-10 grid gap-10 md:mt-14 lg:grid-cols-12 lg:gap-12">
          <Reveal className="min-w-0 lg:col-span-5">
            <h3 className="text-[1.25rem] font-semibold tracking-[-0.01em] text-ink">
              {education.institution}
            </h3>
            <p className="type-body mt-1.5 max-w-[34ch] text-ink/80">
              {education.degree[language]}
            </p>

            <p className="mt-4 flex flex-wrap items-baseline gap-x-2 text-[0.8125rem]">
              <span className="text-muted">{t.education.periodLabel}</span>
              <time className="font-medium text-ink/85 tabular-nums">
                {education.period[language]}
              </time>
            </p>
            <p className="mt-1 text-[0.8125rem] text-muted">{education.location}</p>

            <div className="mt-6 border-t border-line pt-5">
              <p className="eyebrow text-muted">{t.education.gpaLabel}</p>
              <p className="mt-2 flex items-baseline gap-2">
                <span className="text-[2.75rem] font-semibold leading-none tracking-[-0.04em] text-primary tabular-nums">
                  {education.gpaValue}
                </span>
                <span className="text-[0.875rem] text-muted">
                  / {education.gpaScale}
                </span>
              </p>
            </div>
          </Reveal>

          <Reveal className="min-w-0 lg:col-span-7" delay={0.08}>
            <div className="lg:border-l lg:border-line lg:pl-10">
              <p className="eyebrow text-muted">{t.education.activitiesLabel}</p>
              <ul className="mt-3 divide-y divide-line border-y border-line">
                {education.activities[language].map((activity) => (
                  <li
                    key={activity}
                    className="flex gap-3 py-2.5 text-[0.8125rem] leading-relaxed text-ink/80"
                  >
                    <span
                      aria-hidden
                      className="mt-[0.6em] h-px w-2.5 shrink-0 bg-accent-line"
                    />
                    <span className="min-w-0">{activity}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8">
                <p className="eyebrow text-muted">{t.education.summaryLabel}</p>
                <div className="mt-3 max-w-[66ch] space-y-4">
                  {summaryParagraphs.map((paragraph) => (
                    <p key={paragraph} className="type-body text-muted">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export default EducationSection;
