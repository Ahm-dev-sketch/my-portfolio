"use client";

import Image from "next/image";
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
      className="relative bg-[#FEF4EA] pt-12 sm:pt-16 pb-0 overflow-hidden"
    >
      <div className="max-w-[1200px] mx-auto px-6 sm:px-8">
        <Reveal>
          <SectionHeading
            eyebrow={t.education.eyebrow}
            title={t.education.heading}
            watermark="Education"
            sparkle
            id="education-heading"
          />
        </Reveal>

        <div className="mt-10 sm:mt-14 grid gap-10 lg:grid-cols-12 lg:gap-12 items-start">
          {/* Left Column: Pinterest Arch Photo (Foto 2 - Universitas Riau) */}
          <Reveal className="min-w-0 lg:col-span-5">
            <div className="relative max-w-[360px] sm:max-w-[390px] mx-auto">
              {/* Sparkle Star at Top Right */}
              <div className="absolute -top-3 -right-3 w-8 h-8 pointer-events-none z-10">
                <Image
                  src="/star_dusty_rose.png"
                  alt="Sparkle"
                  fill
                  sizes="32px"
                  className="object-contain"
                />
              </div>

              {/* Arch Photo Container with Photo 2 */}
              <div className="relative aspect-[3/4] w-full rounded-t-[180px] rounded-b-[24px] overflow-hidden border-[6px] border-white shadow-xl shadow-[#D47779]/15 bg-white">
                <Image
                  src="/foto2.jpeg"
                  alt="Mutiah Ulfa Sitompul at Universitas Riau"
                  fill
                  sizes="(max-width: 768px) 100vw, 390px"
                  className="object-cover object-top hover:scale-105 transition-transform duration-700"
                />
              </div>

              {/* Floating Campus Badge in Signature Leaf Shape */}
              <div className="absolute -bottom-4 -left-3 sm:-left-4 bg-white/95 backdrop-blur-xs rounded-tl-[20px] rounded-br-[20px] rounded-tr-[4px] rounded-bl-[4px] p-3.5 border border-[#F0E3DC] shadow-lg shadow-black/5 z-20">
                <p className="eyebrow text-[#D47779] text-[10px] font-bold">
                  CAMPUS HIGHLIGHT
                </p>
                <p className="font-serif text-base font-semibold text-[#421623] mt-0.5 leading-snug">
                  Universitas Riau
                </p>
                <p className="font-sans text-[11px] text-[#7D6B70]">
                  Bachelor of Computer Science
                </p>
              </div>
            </div>
          </Reveal>

          {/* Right Column: Degree, GPA Leaf Badge, Activities & Summary */}
          <div className="lg:col-span-7 space-y-6">
            <Reveal className="min-w-0" delay={0.08}>
              <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#F0E3DC] shadow-xs">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="font-serif text-2xl font-semibold text-[#421623]">
                    {education.institution}
                  </h3>
                  <div className="text-xs font-sans text-[#7D6B70]">
                    <time className="font-medium text-[#421623] tabular-nums">
                      {education.period[language]}
                    </time>
                  </div>
                </div>

                <p className="font-sans text-sm font-semibold text-[#D47779] mt-1.5">
                  {education.degree[language]}
                </p>

                {/* GPA Highlight Badge in Signature Leaf Shape from Pinterest */}
                <div className="mt-5 bg-[#D47779] text-white rounded-tl-[24px] rounded-br-[24px] rounded-tr-[4px] rounded-bl-[4px] p-4.5 shadow-sm">
                  <p className="eyebrow text-white/90 text-[11px] font-semibold tracking-wider">
                    {t.education.gpaLabel} · CUM LAUDE
                  </p>
                  <div className="mt-1 flex items-baseline gap-2">
                    <span className="font-serif text-4xl font-semibold leading-none tabular-nums">
                      {education.gpaValue}
                    </span>
                    <span className="font-sans text-xs opacity-90">
                      of {education.gpaScale} · {education.institution}
                    </span>
                  </div>
                </div>

                {/* Activities */}
                <div className="mt-5 pt-4.5 border-t border-[#F0E3DC]">
                  <p className="eyebrow text-[#D47779] text-xs font-semibold mb-2.5">
                    {t.education.activitiesLabel}
                  </p>
                  <ul className="space-y-1.5 text-xs text-[#7D6B70]">
                    {education.activities[language].map((activity) => (
                      <li key={activity} className="flex items-start gap-2">
                        <span className="text-[#D47779] mt-1">•</span>
                        <span>{activity}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>

            {/* Academic Summary */}
            <Reveal className="min-w-0" delay={0.12}>
              <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#F0E3DC] shadow-xs">
                <h4 className="font-serif text-xl font-semibold text-[#421623] mb-3">
                  {t.education.summaryLabel}
                </h4>
                <div className="space-y-3 text-sm text-[#7D6B70] leading-relaxed font-sans">
                  {summaryParagraphs.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      {/* Smooth Bottom Arch Wave Transition into White Skills Section */}
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

export default EducationSection;
