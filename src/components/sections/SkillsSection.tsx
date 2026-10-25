"use client";

import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useLanguage } from "@/hooks/useLanguage";
import { skillGroups } from "@/data/portfolio";

export function SkillsSection() {
  const { language, t } = useLanguage();

  const cardAccents = [
    { num: "01" },
    { num: "02" },
  ];

  return (
    <section id="skills" aria-labelledby="skills-heading" className="relative bg-white pt-12 sm:pt-16 pb-0 overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6 sm:px-8">
        <Reveal>
          <SectionHeading
            eyebrow={t.skills.eyebrow}
            title={t.skills.heading}
            description={t.skills.description}
            watermark="Skills"
            sparkle
            id="skills-heading"
          />
        </Reveal>

        <div className="mt-10 sm:mt-14 grid gap-6 sm:gap-8 md:grid-cols-2 max-w-4xl mx-auto">
          {skillGroups.map((group, index) => {
            const accent = cardAccents[index % cardAccents.length];

            return (
              <Reveal
                key={group.id}
                className="h-full min-w-0"
                delay={index * 0.08}
              >
                <div className="h-full flex flex-col justify-between bg-[#FFF9F5] border border-[#F0E3DC] rounded-3xl p-6 sm:p-7 hover:shadow-md hover:border-[#D47779] transition-all">
                  <div>
                    {/* Numbering Badge & Title */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-serif text-2xl font-bold text-[#D47779] tabular-nums">
                        {accent.num}
                      </span>
                      <span className="w-2.5 h-2.5 rounded-full bg-[#D47779]" />
                    </div>

                    <h3 className="font-serif text-xl sm:text-2xl font-semibold text-[#421623] leading-snug">
                      {group.title[language]}
                    </h3>
                  </div>

                  {/* Skills Tag Pills */}
                  <div className="mt-6 pt-5 border-t border-[#F0E3DC]">
                    <ul className="flex flex-wrap gap-2">
                      {group.skills.map((skill) => (
                        <li
                          key={skill}
                          className="rounded-full border border-[#F0E3DC] bg-white px-3 py-1.5 text-xs font-semibold text-[#421623] shadow-2xs hover:border-[#D47779] hover:text-[#D47779] transition-colors"
                        >
                          {skill}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>

      {/* Smooth Bottom Arch Wave Transition into Cream Contact Section */}
      <div className="w-full overflow-hidden leading-none mt-12 sm:mt-16 pointer-events-none">
        <svg
          viewBox="0 0 1200 90"
          preserveAspectRatio="none"
          className="w-full h-10 sm:h-16 lg:h-20 text-[#FEF4EA] fill-current block"
        >
          <path d="M0,90 L0,0 C320,80 880,80 1200,0 L1200,90 Z" />
        </svg>
      </div>
    </section>
  );
}

export default SkillsSection;
