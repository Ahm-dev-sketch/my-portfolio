"use client";

import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useLanguage } from "@/hooks/useLanguage";
import { skillGroups } from "@/data/portfolio";

export function SkillsSection() {
  const { language, t } = useLanguage();

  return (
    <section id="skills" aria-labelledby="skills-heading" className="bg-canvas">
      <div className="container-page py-16 sm:py-20 md:py-24 lg:py-28">
        <Reveal>
          <SectionHeading
            eyebrow={t.skills.eyebrow}
            title={t.skills.heading}
            description={t.skills.description}
            id="skills-heading"
          />
        </Reveal>

        <div className="mt-10 grid gap-8 md:mt-14 md:grid-cols-3 md:gap-6 lg:gap-10">
          {skillGroups.map((group, index) => (
            <Reveal
              key={group.id}
              className="min-w-0 border-t border-line pt-5"
              delay={index * 0.06}
            >
              <div className="flex items-baseline gap-3">
                <span className="text-[0.6875rem] font-semibold tracking-[0.12em] text-primary tabular-nums">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="type-card text-ink">{group.title[language]}</h3>
              </div>

              <ul className="mt-4 flex flex-wrap gap-1.5">
                {group.skills.map((skill) => (
                  <li
                    key={skill}
                    className="rounded-pill border border-line bg-surface px-2.5 py-1 text-[0.75rem] leading-none text-ink/75"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export default SkillsSection;
