"use client";

import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useLanguage } from "@/hooks/useLanguage";

export function AboutSection() {
  const { t } = useLanguage();

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="relative bg-white pt-10 sm:pt-14 pb-0 overflow-hidden"
    >
      <div className="max-w-[1200px] mx-auto px-6 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12 items-center">
          {/* Left Column: Pinterest Arch Photo (Foto 3) & 3 Leaf Stat Badges */}
          <div className="lg:col-span-5">
            <Reveal className="min-w-0">
              <div className="relative max-w-[360px] sm:max-w-[380px] mx-auto">
                {/* Sparkle Star at Top Left */}
                <div className="absolute -top-3 -left-3 w-8 h-8 pointer-events-none z-10">
                  <Image
                    src="/star_dusty_rose.png"
                    alt="Sparkle"
                    fill
                    sizes="32px"
                    className="object-contain"
                  />
                </div>

                {/* Arch Portrait Container with Photo 3 */}
                <div className="relative aspect-[3/4] w-full rounded-t-[180px] rounded-b-[24px] overflow-hidden border-[5px] border-[#FEF4EA] shadow-xl shadow-[#D47779]/10 bg-[#FFF9F5]">
                  <Image
                    src="/foto3.jpeg"
                    alt="Mutiah Ulfa Sitompul"
                    fill
                    sizes="(max-width: 768px) 100vw, 380px"
                    className="object-cover object-top hover:scale-105 transition-transform duration-700"
                  />
                </div>

                {/* 3 Metric Stat Cards with Leaf Asymmetric Rounding from Pinterest */}
                <div className="grid grid-cols-3 gap-2.5 sm:gap-3 mt-5">
                  {/* Stat 1: Dusty Rose */}
                  <div className="bg-[#D47779] text-white rounded-tl-[20px] rounded-br-[20px] rounded-tr-[4px] rounded-bl-[4px] p-3 sm:p-3.5 text-center shadow-sm hover:scale-[1.02] transition-transform duration-200">
                    <div className="font-serif text-2xl sm:text-3xl font-semibold leading-none">
                      3.69
                    </div>
                    <div className="font-sans text-[11px] font-normal tracking-wide opacity-90 mt-1">
                      GPA
                    </div>
                  </div>

                  {/* Stat 2: Cream */}
                  <div className="bg-[#FEF4EA] border border-[#F0E3DC] text-[#421623] rounded-tl-[20px] rounded-br-[20px] rounded-tr-[4px] rounded-bl-[4px] p-3 sm:p-3.5 text-center shadow-2xs hover:scale-[1.02] transition-transform duration-200">
                    <div className="font-serif text-2xl sm:text-3xl font-semibold leading-none text-[#421623]">
                      3+
                    </div>
                    <div className="font-sans text-[11px] font-normal tracking-wide text-[#7D6B70] mt-1">
                      Roles
                    </div>
                  </div>

                  {/* Stat 3: Cream */}
                  <div className="bg-[#FEF4EA] border border-[#F0E3DC] text-[#421623] rounded-tl-[20px] rounded-br-[20px] rounded-tr-[4px] rounded-bl-[4px] p-3 sm:p-3.5 text-center shadow-2xs hover:scale-[1.02] transition-transform duration-200">
                    <div className="font-serif text-2xl sm:text-3xl font-semibold leading-none text-[#421623]">
                      10+
                    </div>
                    <div className="font-sans text-[11px] font-normal tracking-wide text-[#7D6B70] mt-1">
                      Skills
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right Column: Heading, Paragraphs & Competency Tags */}
          <div className="lg:col-span-7">
            <Reveal className="min-w-0" delay={0.08}>
              <div className="lg:border-l lg:border-[#F0E3DC] lg:pl-10">
                <SectionHeading
                  eyebrow={t.about.eyebrow}
                  title={t.about.heading}
                  watermark="About Me"
                  sparkle
                  id="about-heading"
                />

                <div className="space-y-4 font-sans mt-6">
                  {t.about.paragraphs.map((paragraph, index) =>
                    index === 0 ? (
                      <p key={paragraph} className="font-serif text-lg sm:text-xl text-[#421623] leading-relaxed">
                        {paragraph}
                      </p>
                    ) : (
                      <p key={paragraph} className="font-sans text-[14.5px] sm:text-[15.5px] text-[#7D6B70] leading-[1.75]">
                        {paragraph}
                      </p>
                    ),
                  )}
                </div>

                {/* Competencies Badges */}
                <div className="mt-8 pt-6 border-t border-[#F0E3DC]">
                  <p className="eyebrow text-[#D47779] text-xs font-semibold mb-3">
                    {t.about.competenciesLabel}
                  </p>
                  <ul className="flex flex-wrap gap-2">
                    {t.about.competencies.map((competency) => (
                      <li
                        key={competency}
                        className="rounded-full border border-[#F0E3DC] bg-[#FEF4EA] px-3.5 py-1.5 text-xs font-semibold text-[#421623] hover:border-[#D47779] hover:bg-[#FFF9F5] transition-colors"
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
      </div>

      {/* Smooth Bottom Arch Wave Transition from White to Cream (#FEF4EA) */}
      <div className="w-full overflow-hidden leading-none mt-10 sm:mt-14 pointer-events-none">
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

export default AboutSection;
