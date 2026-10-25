"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUp, Mail, Phone } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { profile } from "@/data/portfolio";

function LinkedInGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden focusable="false" fill="currentColor" className={className}>
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
    </svg>
  );
}

export function Footer() {
  const { t } = useLanguage();

  const goToTop = () => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const behavior = reduceMotion ? "auto" : "smooth";
    const home = document.getElementById("home");

    if (home) {
      home.scrollIntoView({ behavior, block: "start" });
    } else {
      window.scrollTo({ top: 0, behavior });
    }
  };

  return (
    <footer className="bg-[#FEF4EA] border-t border-[#F0E3DC] py-10 sm:py-12 text-[#421623]">
      <div className="max-w-[1200px] mx-auto px-6 sm:px-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between pb-8 border-b border-[#F0E3DC]">
          <div className="min-w-0 md:flex-1">
            <Link
              href="#home"
              className="group inline-flex items-center gap-2"
              aria-label={`${t.nav.wordmark} — ${t.nav.items.home}`}
            >
              <div className="relative w-4 h-4 shrink-0">
                <Image
                  src="/star_dusty_rose.png"
                  alt="Sparkle"
                  fill
                  sizes="16px"
                  className="object-contain"
                />
              </div>
              <span className="font-serif text-lg font-bold tracking-[0.1em] text-[#421623] transition-colors group-hover:text-[#D47779]">
                {t.nav.wordmark}
              </span>
            </Link>

            <p className="font-sans text-xs sm:text-sm text-[#7D6B70] mt-2 max-w-[48ch] leading-relaxed">
              {t.hero.card.descriptor}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white border border-[#F0E3DC] text-xs font-semibold text-[#421623] hover:text-[#D47779] hover:border-[#D47779] transition-colors shadow-2xs"
            >
              <Mail className="w-3.5 h-3.5 text-[#D47779]" />
              <span>Email</span>
            </a>

            <a
              href={profile.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white border border-[#F0E3DC] text-xs font-semibold text-[#421623] hover:text-[#D47779] hover:border-[#D47779] transition-colors shadow-2xs"
            >
              <Phone className="w-3.5 h-3.5 text-[#D47779]" />
              <span>WhatsApp</span>
            </a>

            <a
              href={profile.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`LinkedIn — ${t.a11y.externalLink}`}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white border border-[#F0E3DC] text-xs font-semibold text-[#421623] hover:text-[#D47779] hover:border-[#D47779] transition-colors shadow-2xs"
            >
              <LinkedInGlyph className="w-3.5 h-3.5 text-[#D47779]" />
              <span>LinkedIn</span>
            </a>

            <button
              type="button"
              onClick={goToTop}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white border border-[#F0E3DC] text-xs font-semibold text-[#421623] hover:text-[#D47779] hover:border-[#D47779] transition-colors shadow-2xs cursor-pointer"
              aria-label={t.footer.backToTop}
            >
              <span>{t.footer.backToTop}</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-sans text-[#7D6B70]">
          <div>{t.footer.rights}</div>
          <div>{t.footer.builtWith}</div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
