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
      className="relative bg-[#FEF4EA] pt-10 sm:pt-14 pb-0 overflow-hidden"
    >
      <div className="max-w-[1200px] mx-auto px-6 sm:px-8">
        <Reveal>
          <SectionHeading
            eyebrow={t.experience.eyebrow}
            title={t.experience.heading}
            description={t.experience.description}
            watermark="Experience"
            sparkle
            id="experience-heading"
          />
        </Reveal>

        <Reveal className="mt-10 sm:mt-14" delay={0.08}>
          <ol className="relative border-l-2 border-[#EBDCD5] ml-3 sm:ml-4 space-y-10 sm:space-y-12">
            {experiences.map((experience) => (
              <li key={experience.id} className="relative pl-6 sm:pl-8 group">
                {/* Timeline Dot in Dusty Rose */}
                <span
                  aria-hidden
                  className="absolute -left-[9px] top-1.5 h-4 w-4 rounded-full border-2 border-white bg-[#D47779] shadow-xs group-hover:scale-125 transition-transform"
                />

                <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#F0E3DC] shadow-xs group-hover:shadow-md transition-shadow">
                  {/* Period Tag & Employment Type */}
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <span className="inline-block px-3 py-1 rounded-full bg-[#FEF4EA] text-[#D47779] font-sans text-xs font-semibold">
                      {experience.period[language]}
                    </span>
                    <span className="font-sans text-xs text-[#7D6B70]">
                      {experience.employmentType[language]} · {experience.location[language]}
                    </span>
                  </div>

                  {/* Role Title (Serif) */}
                  <h3 className="font-serif text-xl sm:text-2xl font-semibold text-[#421623]">
                    {experience.role[language]}
                  </h3>

                  {/* Organization */}
                  <p className="font-sans text-sm font-semibold text-[#D47779] mt-1">
                    {experience.organization}
                  </p>

                  {/* Description Bullets */}
                  <ul className="mt-4 space-y-2 font-sans text-sm text-[#7D6B70] leading-relaxed">
                    {experience.description[language].map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-[#D47779] mt-1.5 leading-none">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Skills Applied */}
                  <div className="mt-5 pt-4 border-t border-[#F0E3DC]">
                    <span className="text-xs font-semibold text-[#421623] block mb-2">
                      {t.experience.skillsLabel}:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {experience.skills.map((skill) => (
                        <span
                          key={skill}
                          className="rounded-full bg-[#FEF4EA] border border-[#F0E3DC] px-2.5 py-1 text-xs text-[#421623]"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>

      {/* Smooth Bottom Arch Wave Transition into White Selected Work Section */}
      <div className="w-full overflow-hidden leading-none mt-12 sm:mt-16 pointer-events-none">
        <svg
          viewBox="0 0 1200 90"
          preserveAspectRatio="none"
          className="w-full h-10 sm:h-16 lg:h-20 text-white fill-current block"
        >
          <path d="M0,0 C320,80 880,80 1200,0 L1200,90 L0,90 Z" />
        </svg>
      </div>
    </section>
  );
}

export default ExperienceSection;
