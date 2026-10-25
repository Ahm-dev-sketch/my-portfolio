"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Download, Menu, X } from "lucide-react";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";
import { useLanguage } from "@/hooks/useLanguage";
import { profile } from "@/data/portfolio";
import type { SectionId } from "@/types/portfolio";

const NAV_SECTIONS = [
  "about",
  "experience",
  "work",
  "education",
  "skills",
  "contact",
] as const satisfies ReadonlyArray<SectionId>;

type NavSectionId = (typeof NAV_SECTIONS)[number];

function LinkedInGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden focusable="false" fill="currentColor" className={className}>
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
    </svg>
  );
}

export function Navbar() {
  const { t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<NavSectionId | null>(null);

  const toggleRef = useRef<HTMLButtonElement>(null);

  const links = NAV_SECTIONS.map((id) => ({ id, label: t.nav.items[id] }));

  const dismiss = useCallback(() => {
    setOpen(false);
    toggleRef.current?.focus({ preventScroll: true });
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 15);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const targets = NAV_SECTIONS.map((id) => ({
      id,
      el: document.getElementById(id),
    })).filter((entry): entry is { id: NavSectionId; el: HTMLElement } =>
      entry.el !== null,
    );

    if (targets.length === 0) return;

    const update = () => {
      const probe = window.innerHeight * 0.3;
      let current: NavSectionId | null = null;
      for (const target of targets) {
        if (target.el.getBoundingClientRect().top <= probe) current = target.id;
      }
      setActiveSection(current);
    };

    const observer = new IntersectionObserver(update, {
      rootMargin: "-30% 0px -60% 0px",
      threshold: 0,
    });

    targets.forEach((target) => observer.observe(target.el));
    update();
    window.addEventListener("resize", update, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-[#FEF4EA]/90 backdrop-blur-md shadow-2xs py-3.5 border-b border-[#F0E3DC]"
          : "bg-[#FEF4EA] py-5"
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-6 sm:px-8 flex items-center justify-between">
        {/* Brand Wordmark with Sparkle Star */}
        <Link
          href="#home"
          className="group inline-flex items-center gap-2"
          aria-label={`${t.nav.wordmark} — ${t.nav.items.home}`}
        >
          <div className="relative w-5 h-5 shrink-0">
            <Image
              src="/star_dusty_rose.png"
              alt="Sparkle"
              fill
              sizes="20px"
              className="object-contain transition-transform duration-300 group-hover:rotate-45"
            />
          </div>
          <span className="font-serif text-xl sm:text-2xl font-bold tracking-[0.08em] text-[#421623] transition-colors group-hover:text-[#D47779]">
            {t.nav.wordmark}
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7 xl:gap-8">
          <Link
            href="#home"
            className="font-sans text-[14.5px] font-semibold text-[#421623] hover:text-[#D47779] transition-colors"
          >
            {t.nav.items.home}
          </Link>
          {links.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <Link
                key={link.id}
                href={`#${link.id}`}
                className={`font-sans text-[14.5px] font-semibold transition-colors ${
                  isActive
                    ? "text-[#D47779] underline underline-offset-8 decoration-2"
                    : "text-[#421623] hover:text-[#D47779]"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Tools: Language Switcher & Social */}
        <div className="flex items-center gap-3">
          <LanguageSwitcher />

          <a
            href={profile.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`LinkedIn — ${t.a11y.externalLink}`}
            className="hidden sm:inline-flex w-9 h-9 items-center justify-center rounded-full bg-white text-[#421623] hover:text-[#D47779] hover:shadow-xs transition-all border border-[#F0E3DC]"
          >
            <LinkedInGlyph className="w-4 h-4" />
          </a>

          {/* Mobile Menu Button */}
          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-label={open ? t.a11y.closeMenu : t.a11y.openMenu}
            className="lg:hidden p-2 text-[#421623] hover:text-[#D47779] transition-colors cursor-pointer"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {open && (
        <div className="lg:hidden bg-[#FEF4EA] border-t border-[#F0E3DC] px-6 py-6 shadow-xl animate-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col gap-4">
            <Link
              href="#home"
              onClick={dismiss}
              className="font-sans text-base font-semibold text-[#421623] hover:text-[#D47779] py-1"
            >
              {t.nav.items.home}
            </Link>
            {links.map((link) => (
              <Link
                key={link.id}
                href={`#${link.id}`}
                onClick={dismiss}
                className="font-sans text-base font-semibold text-[#421623] hover:text-[#D47779] py-1"
              >
                {link.label}
              </Link>
            ))}
            <a
              href="/cv-mutiah-ulfa-sitompul.pdf"
              download="CV-Mutiah-Ulfa-Sitompul.pdf"
              onClick={dismiss}
              className="inline-flex items-center gap-2 font-sans text-base font-semibold text-[#D47779] py-2 mt-1 border-t border-[#F0E3DC]"
            >
              <Download className="w-4 h-4" />
              <span>{t.hero.downloadCvCta}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
