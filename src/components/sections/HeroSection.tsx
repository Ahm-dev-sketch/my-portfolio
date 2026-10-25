"use client";

import { Fragment } from "react";
import Image from "next/image";
import { ArrowUpRight, Download } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useLanguage } from "@/hooks/useLanguage";
import { profile } from "@/data/portfolio";

export function HeroSection() {
  const { language, t } = useLanguage();
  const headlineParts = profile.headline[language]
    .split("|")
    .map((part) => part.trim())
    .filter(Boolean);

  return (
    <section id="home" aria-labelledby="hero-heading" className="relative bg-[#FEF4EA] pt-6 sm:pt-10 lg:pt-14 pb-0 overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-10 lg:gap-10 min-h-[500px]">
          {/* Left Column: Profile Headline & CTAs */}
          <div className="lg:col-span-7 z-10 relative">
            {/* Sparkle Stars from Pinterest Design */}
            <div className="relative inline-block mb-3">
              <div className="relative w-10 h-10">
                <Image
                  src="/hero_stars_pair.png"
                  alt="Sparkles"
                  fill
                  sizes="40px"
                  className="object-contain"
                />
              </div>
            </div>

            {/* Eyebrow Pill */}
            <div className="mb-4">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#F0E3DC] bg-[#FFF9F5] px-3.5 py-1.5 shadow-2xs">
                <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-[#D47779]" />
                <span className="eyebrow text-[#D47779] text-xs font-semibold tracking-wider">
                  {t.hero.eyebrow}
                </span>
              </span>
            </div>

            {/* Main Name Heading (Serif) */}
            <h1 id="hero-heading" className="font-serif text-[42px] sm:text-[54px] lg:text-[62px] font-semibold leading-[1.08] text-[#421623] tracking-tight">
              {profile.name}
            </h1>

            {/* Headline parts (Serif & Sans mix) */}
            <p className="font-serif text-xl sm:text-2xl text-[#421623]/90 mt-4 leading-snug">
              {headlineParts.map((part, index) => (
                <Fragment key={part}>
                  <span className="inline-block">
                    {index > 0 ? (
                      <span aria-hidden className="px-2 font-light text-[#D47779]">
                        ·
                      </span>
                    ) : null}
                    <span className={index === 0 ? "font-semibold text-[#D47779]" : undefined}>
                      {part}
                    </span>
                  </span>
                </Fragment>
              ))}
            </p>

            {/* Description */}
            <p className="font-sans text-[15px] sm:text-[16px] leading-[1.75] text-[#7D6B70] max-w-[540px] mt-5">
              {t.hero.description}
            </p>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-3.5">
              <Button href="#experience" size="lg" className="w-full sm:w-auto">
                {t.hero.primaryCta}
              </Button>
              <a
                href="/cv-mutiah-ulfa-sitompul.pdf"
                download="CV-Mutiah-Ulfa-Sitompul.pdf"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-[#D47779] bg-white px-7 py-3 text-sm font-semibold text-[#D47779] shadow-2xs hover:bg-[#FEF4EA] hover:border-[#C26567] transition-all duration-200 w-full sm:w-auto"
              >
                <Download aria-hidden className="h-4 w-4" />
                <span>{t.hero.downloadCvCta}</span>
              </a>
              <Button
                href={profile.linkedinUrl}
                variant="secondary"
                size="lg"
                className="w-full sm:w-auto"
              >
                {t.hero.secondaryCta}
                <ArrowUpRight aria-hidden className="h-4 w-4 ml-1" />
                <span className="sr-only">({t.a11y.externalLink})</span>
              </Button>
            </div>

            {/* Quick Meta Row */}
            <div className="mt-8 pt-5 border-t border-[#F0E3DC] flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-sans text-[#7D6B70]">
              <div>
                <span className="font-semibold text-[#421623]">{t.hero.card.locationLabel}:</span>{" "}
                {t.hero.card.location}
              </div>
              <div>
                <span className="font-semibold text-[#421623]">{t.hero.card.availabilityLabel}:</span>{" "}
                <span className="text-[#D47779] font-bold">{t.hero.card.availability}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Pinterest Arch Portrait & Profile Badges */}
          <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
            <div className="w-full max-w-[360px] sm:max-w-[390px] relative">
              {/* Decorative Subtle Glow Backdrop */}
              <div className="absolute -inset-2 bg-[#F6ABB1]/20 rounded-t-[220px] rounded-b-[36px] blur-xs pointer-events-none" />

              {/* 3 Color Palette Dots from Pinterest Reference */}
              <div className="absolute -left-3.5 top-28 flex flex-col gap-2 z-20">
                <span className="w-3 h-3 rounded-full bg-[#F8D8CF] shadow-xs ring-2 ring-white" />
                <span className="w-3 h-3 rounded-full bg-[#D47779] shadow-xs ring-2 ring-white" />
                <span className="w-3 h-3 rounded-full bg-[#5C1227] shadow-xs ring-2 ring-white" />
              </div>

              {/* Sparkle Star at Top Right */}
              <div className="absolute -top-4 -right-4 w-9 h-9 pointer-events-none z-20">
                <Image
                  src="/star_dusty_rose.png"
                  alt="Sparkle"
                  fill
                  sizes="36px"
                  className="object-contain"
                />
              </div>

              {/* Main Pinterest Arch Frame with Photo 1 */}
              <div className="relative aspect-[3/4] w-full rounded-t-[200px] sm:rounded-t-[220px] rounded-b-[28px] overflow-hidden border-[6px] border-white shadow-xl shadow-[#D47779]/15 bg-[#FEF4EA]">
                <Image
                  src="/foto1.jpeg"
                  alt={profile.name}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 420px"
                  className="object-cover object-top hover:scale-105 transition-transform duration-700"
                />
              </div>

              {/* Status Indicator Pill (Top Right) */}
              <div className="absolute top-5 -right-2 sm:-right-4 bg-white/95 backdrop-blur-xs border border-[#F0E3DC] rounded-full px-3.5 py-1.5 shadow-md flex items-center gap-2 z-20">
                <span className="flex h-2.5 w-2.5 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D47779] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#D47779]" />
                </span>
                <span className="font-sans text-[11px] font-semibold text-[#421623]">
                  {t.hero.card.availability}
                </span>
              </div>

              {/* GPA Highlight Leaf Badge from Pinterest Design (Bottom Left) */}
              <div className="absolute -bottom-4 -left-3 sm:-left-5 bg-white/95 backdrop-blur-xs rounded-tl-[24px] rounded-br-[24px] rounded-tr-[4px] rounded-bl-[4px] p-3.5 sm:p-4 border border-[#F0E3DC] shadow-lg shadow-black/5 z-20 max-w-[210px]">
                <p className="eyebrow text-[#D47779] text-[10px] font-bold tracking-wider">
                  {t.hero.card.gpaLabel} · CUM LAUDE
                </p>
                <div className="flex items-baseline gap-1.5 mt-0.5">
                  <span className="font-serif text-3xl font-bold text-[#421623] tabular-nums leading-none">
                    {t.hero.card.gpaValue}
                  </span>
                  <span className="font-sans text-[11px] text-[#7D6B70]">
                    {t.hero.card.gpaMeta}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Smooth Bottom Arch Wave Transition into White About Section */}
      <div className="w-full overflow-hidden leading-none mt-8 sm:mt-12 pointer-events-none">
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

export default HeroSection;
