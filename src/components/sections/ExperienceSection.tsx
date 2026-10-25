"use client";

import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useLanguage } from "@/hooks/useLanguage";
import { experiences } from "@/data/portfolio";

export function ExperienceSection() {
  const { language, t } = useLanguage();

  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="bg-canvas"
    >
      <div className="container-page py-16 sm:py-20 md:py-24 lg:py-28">
        <Reveal>
          <SectionHeading
            eyebrow={t.experience.eyebrow}
            title={t.experience.heading}
            description={t.experience.description}
            id="experience-heading"
          />
        </Reveal>

        <Reveal className="mt-11 md:mt-14" delay={0.08}>
          <ol className="border-t border-line">
            {experiences.map((experience) => (
              <li
                key={experience.id}
                className="grid gap-4 border-b border-line py-8 md:grid-cols-[10rem_minmax(0,1fr)] md:gap-0 md:py-10"
              >
                <div className="relative md:border-r md:border-line md:pr-6">
                  <span
                    aria-hidden
                    className="absolute -right-[3.5px] top-1.5 hidden h-[7px] w-[7px] rounded-pill bg-primary md:block"
                  />
                  <time className="flex items-baseline gap-2 text-[0.8125rem] leading-relaxed text-ink/70 text-balance tabular-nums md:block">
                    <span
                      aria-hidden
                      className="h-1.5 w-1.5 shrink-0 rounded-pill bg-primary md:hidden"
                    />
                    {experience.period[language]}
                  </time>
                </div>

                <div className="min-w-0 md:pl-8">
                  <h3 className="type-card text-ink">{experience.role[language]}</h3>

                  <div className="mt-2 flex flex-wrap items-center gap-x-2.5 gap-y-1.5 text-[0.8125rem]">
                    <span className="font-medium text-ink/85">
                      {experience.organization}
                    </span>
                    <span className="rounded-pill border border-accent-line bg-accent px-2 py-0.5 text-[0.6875rem] font-medium leading-snug text-primary">
                      {experience.employmentType[language]}
                    </span>
                    <span className="text-muted">{experience.location[language]}</span>
                  </div>

                  <div className="mt-4 max-w-[70ch] space-y-3">
                    {experience.description[language].map((paragraph) => (
                      <p key={paragraph} className="type-body text-muted">
                        {paragraph}
                      </p>
                    ))}
                  </div>

                  <div className="mt-5 flex flex-wrap items-baseline gap-x-3 gap-y-2">
                    <p className="eyebrow shrink-0 text-muted">
                      {t.experience.skillsLabel}
                    </p>
                    <ul className="flex flex-wrap gap-1.5">
                      {experience.skills.map((skill) => (
                        <li
                          key={skill}
                          className="rounded-pill border border-line px-2.5 py-1 text-[0.6875rem] leading-none text-ink/70"
                        >
                          {skill}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}

export default ExperienceSection;
