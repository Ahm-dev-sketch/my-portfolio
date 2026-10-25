"use client";

import Image from "next/image";
import { ArrowUpRight, Download, Mail, MapPin, Phone } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { useLanguage } from "@/hooks/useLanguage";
import { profile } from "@/data/portfolio";

export function ContactSection() {
  const { language, t } = useLanguage();

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="relative overflow-hidden bg-[#5C1227] text-white pt-16 sm:pt-20 pb-16 sm:pb-24"
    >
      {/* Subtle Background Monogram */}
      <span
        aria-hidden
        className="pointer-events-none absolute -bottom-10 -right-8 select-none font-serif text-[10rem] sm:text-[14rem] font-bold leading-none tracking-tight text-white/5"
      >
        {profile.monogram}
      </span>

      <div className="max-w-[1200px] mx-auto px-6 sm:px-8 relative z-10">
        <Reveal>
          <div className="flex items-center gap-2.5 mb-3">
            <span className="h-1.5 w-1.5 rounded-full bg-[#D47779]" />
            <p className="eyebrow text-[#F6ABB1] font-sans text-xs tracking-wider font-semibold">
              {t.contact.eyebrow}
            </p>
          </div>

          <div className="relative inline-block max-w-[42rem]">
            <h2
              id="contact-heading"
              className="font-serif text-[32px] sm:text-[44px] lg:text-[50px] font-semibold text-white leading-[1.15]"
            >
              {t.contact.heading}
            </h2>

            {/* Sparkle Star */}
            <div className="absolute -top-3 -right-8 pointer-events-none w-7 h-7">
              <Image
                src="/star_dusty_rose.png"
                alt="Sparkle"
                fill
                sizes="28px"
                className="object-contain"
              />
            </div>
          </div>

          <div className="mt-8 grid gap-8 md:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] md:gap-12 lg:gap-16">
            <p className="font-sans text-[15px] sm:text-[16px] leading-[1.8] text-white/80 max-w-[56ch]">
              {t.contact.description}
            </p>

            <div className="flex flex-col gap-3.5 sm:flex-row sm:items-start md:flex-col md:items-stretch">
              <a
                href={profile.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-[#D47779] hover:bg-[#C26567] text-white font-sans font-medium text-sm transition-all duration-300 shadow-md shadow-black/20 hover:scale-[1.02]"
              >
                <span>{t.contact.linkedinCta}</span>
                <ArrowUpRight className="h-4 w-4" />
                <span className="sr-only">({t.a11y.externalLink})</span>
              </a>

              <a
                href="/cv-mutiah-ulfa-sitompul.pdf"
                download="CV-Mutiah-Ulfa-Sitompul.pdf"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-white/10 hover:bg-white/15 border border-white/20 text-white font-sans font-medium text-sm transition-all duration-300 hover:scale-[1.02]"
              >
                <Download className="h-4 w-4 text-[#F6ABB1]" />
                <span>{t.contact.downloadCvCta}</span>
              </a>
            </div>
          </div>
        </Reveal>

        {/* Quick Direct Contact Cards */}
        <Reveal delay={0.06}>
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-3.5">
            {/* Email */}
            <a
              href={`mailto:${profile.email}`}
              className="flex items-center gap-3.5 p-4 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/15 transition-all hover:scale-[1.02] group"
            >
              <div className="w-10 h-10 rounded-xl bg-[#D47779] flex items-center justify-center text-white shrink-0 shadow-sm">
                <Mail className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <span className="block text-[11px] font-sans uppercase tracking-wider text-[#F6ABB1] font-semibold">
                  Email
                </span>
                <span className="block text-xs sm:text-sm font-sans font-medium text-white truncate group-hover:text-[#F6ABB1] transition-colors">
                  {profile.email}
                </span>
              </div>
            </a>

            {/* WhatsApp / Phone */}
            <a
              href={profile.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3.5 p-4 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/15 transition-all hover:scale-[1.02] group"
            >
              <div className="w-10 h-10 rounded-xl bg-[#D47779] flex items-center justify-center text-white shrink-0 shadow-sm">
                <Phone className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <span className="block text-[11px] font-sans uppercase tracking-wider text-[#F6ABB1] font-semibold">
                  WhatsApp / Phone
                </span>
                <span className="block text-xs sm:text-sm font-sans font-medium text-white truncate group-hover:text-[#F6ABB1] transition-colors">
                  {profile.phoneDisplay}
                </span>
              </div>
            </a>

            {/* Location */}
            <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-white/10 border border-white/15">
              <div className="w-10 h-10 rounded-xl bg-[#D47779] flex items-center justify-center text-white shrink-0 shadow-sm">
                <MapPin className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <span className="block text-[11px] font-sans uppercase tracking-wider text-[#F6ABB1] font-semibold">
                  {t.contact.locationLabel}
                </span>
                <span className="block text-xs sm:text-sm font-sans font-medium text-white truncate">
                  {profile.location[language]}
                </span>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="mt-10 sm:mt-12 pt-6 border-t border-white/15 grid gap-6 sm:grid-cols-2 items-center text-xs font-sans text-white/70">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#D47779]" />
              <span>
                <strong className="text-white font-semibold">{t.contact.locationLabel}:</strong>{" "}
                {profile.location[language]}
              </span>
            </div>

            <p className="sm:text-right text-white/70">
              {t.contact.footerNote}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default ContactSection;
