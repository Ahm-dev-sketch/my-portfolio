"use client";

import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useLanguage } from "@/hooks/useLanguage";

export function AboutSection() {
  const { t } = useLanguage();

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="border-b border-line bg-surface"
    >
      <div className="container-page py-16 sm:py-20 md:py-24 lg:py-28">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <Reveal className="min-w-0 lg:col-span-4">
            <SectionHeading
              eyebrow={t.about.eyebrow}
              title={t.about.heading}
              id="about-heading"
            />
          </Reveal>

          <Reveal className="min-w-0 lg:col-span-8" delay={0.08}>
            <div className="lg:border-l lg:border-line lg:pl-10">
              <div className="max-w-[68ch] space-y-5">
                {t.about.paragraphs.map((paragraph, index) =>
                  index === 0 ? (
                    <p key={paragraph} className="type-lead text-ink">
                      {paragraph}
                    </p>
                  ) : (
                    <p key={paragraph} className="type-body text-muted">
                      {paragraph}
                    </p>
                  ),
                )}
              </div>

              <div className="mt-10 border-t border-line pt-6">
                <p className="eyebrow text-muted">{t.about.competenciesLabel}</p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {t.about.competencies.map((competency) => (
                    <li
                      key={competency}
                      className="rounded-pill border border-line bg-canvas px-3 py-1.5 text-[0.8125rem] leading-none text-ink/80"
                    >
                      {competency}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;
