"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";
import { useLanguage } from "@/hooks/useLanguage";
import { profile } from "@/data/portfolio";
import { cn } from "@/lib/utils";
import type { SectionId } from "@/types/portfolio";

/** Sections listed in the navigation. `home` belongs to the wordmark. */
const NAV_SECTIONS = [
  "about",
  "experience",
  "work",
  "education",
  "skills",
  "contact",
] as const satisfies ReadonlyArray<SectionId>;

type NavSectionId = (typeof NAV_SECTIONS)[number];

const MENU_ID = "mobile-navigation";

/** Brand glyph: this lucide build ships no brand icons. */
function LinkedInGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden focusable="false" fill="currentColor" className={className}>
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12Zm1.78 13.02H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45C23.2 24 24 23.23 24 22.27V1.73C24 .77 23.2 0 22.22 0Z" />
    </svg>
  );
}

export function Navbar() {
  const { t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<NavSectionId | null>(null);

  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLElement>(null);

  const links = NAV_SECTIONS.map((id) => ({ id, label: t.nav.items[id] }));

  const dismiss = useCallback(() => {
    setOpen(false);
    toggleRef.current?.focus({ preventScroll: true });
  }, []);

  /* Hairline strengthens once the page leaves the top. */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Active section: the last section whose top has passed the probe line.
     IntersectionObserver only schedules the work; rects keep it exact. */
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

  /* Lock the page behind the panel without stealing the scrollbar gutter.
     The lock lives on <html>: locking <body> turns it into a scroll container
     and unpins the sticky header. */
  useEffect(() => {
    if (!open) return;

    const root = document.documentElement;
    const previousOverflow = root.style.overflow;
    const previousPadding = root.style.paddingRight;
    const gutter = window.innerWidth - root.clientWidth;

    root.style.overflow = "hidden";
    if (gutter > 0) root.style.paddingRight = `${gutter}px`;

    return () => {
      root.style.overflow = previousOverflow;
      root.style.paddingRight = previousPadding;
    };
  }, [open]);

  /* Escape and outside clicks dismiss the panel. */
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        dismiss();
      }
    };

    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as Node | null;
      if (!target) return;
      if (panelRef.current?.contains(target)) return;
      if (toggleRef.current?.contains(target)) return;
      dismiss();
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open, dismiss]);

  /* Rotating to the desktop layout must not leave the page scroll-locked. */
  useEffect(() => {
    if (!open) return;

    const query = window.matchMedia("(min-width: 768px)");
    const onChange = () => {
      if (query.matches) setOpen(false);
    };

    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, [open]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b backdrop-blur-sm",
        "transition-[background-color,border-color,box-shadow] duration-300 ease-out",
        scrolled
          ? "border-line bg-canvas/90 shadow-[0_12px_28px_-26px_rgba(23,35,31,0.55)] backdrop-blur-md"
          : "border-line/55 bg-canvas/70",
      )}
    >
      <a
        href="#main-content"
        className="absolute left-4 top-3 z-[60] -translate-y-20 rounded-sm bg-primary px-4 py-2 text-[0.8125rem] font-medium text-white transition-transform duration-200 focus:translate-y-0"
      >
        {t.a11y.skipToContent}
      </a>

      <div className="container-page flex h-[var(--nav-height)] items-center justify-between gap-3">
        <a
          href="#home"
          aria-label={`${t.nav.wordmark} — ${t.nav.items.home}`}
          className="group -ml-1 flex h-full shrink-0 items-center rounded-xs px-1"
        >
          <span className="text-[0.8125rem] font-semibold uppercase leading-none tracking-[0.22em] text-ink transition-colors duration-200 group-hover:text-primary">
            {t.nav.wordmark}
          </span>
        </a>

        <nav aria-label={t.a11y.primaryNavigation} className="hidden md:block">
          <ul className="flex items-center">
            {links.map((link) => {
              const isActive = activeSection === link.id;

              return (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    aria-current={isActive ? "true" : undefined}
                    className={cn(
                      "relative inline-flex h-9 items-center whitespace-nowrap rounded-xs px-2 text-[0.75rem] font-medium",
                      "transition-colors duration-200 lg:px-3 lg:text-[0.8125rem]",
                      "after:absolute after:inset-x-2 after:-bottom-0.5 after:h-px after:origin-left after:bg-primary after:transition-transform after:duration-300 after:ease-out lg:after:inset-x-3",
                      isActive
                        ? "text-ink after:scale-x-100"
                        : "text-muted after:scale-x-0 hover:text-ink hover:after:scale-x-100",
                    )}
                  >
                    {link.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <LanguageSwitcher />

          <a
            href={profile.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`LinkedIn — ${t.a11y.externalLink}`}
            className="hidden h-8 w-8 items-center justify-center rounded-xs text-muted transition-colors duration-200 hover:bg-accent/60 hover:text-ink md:inline-flex"
          >
            <LinkedInGlyph className="h-[15px] w-[15px]" />
            <span className="sr-only">{t.a11y.externalLink}</span>
          </a>

          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen((previous) => !previous)}
            aria-expanded={open}
            aria-controls={MENU_ID}
            aria-label={open ? t.a11y.closeMenu : t.a11y.openMenu}
            className={cn(
              "inline-flex h-10 w-10 items-center justify-center rounded-sm border bg-surface text-ink md:hidden",
              "transition-colors duration-200",
              open
                ? "border-accent-line bg-accent/70"
                : "border-line hover:border-accent-line hover:bg-accent/60",
            )}
          >
            {open ? (
              <X aria-hidden className="h-[18px] w-[18px]" />
            ) : (
              <Menu aria-hidden className="h-[18px] w-[18px]" />
            )}
          </button>
        </div>
      </div>

      {open ? (
        <>
          <div
            aria-hidden
            className="absolute inset-x-0 top-full h-[calc(100dvh-var(--nav-height))] bg-ink/20 backdrop-blur-[2px] md:hidden"
          />
          <nav
            ref={panelRef}
            id={MENU_ID}
            aria-label={t.a11y.mobileNavigation}
            className="absolute inset-x-0 top-full z-10 max-h-[calc(100dvh-var(--nav-height))] overflow-y-auto border-b border-line bg-surface shadow-[0_28px_48px_-32px_rgba(23,35,31,0.45)] md:hidden"
          >
            <ul className="container-page grid gap-0.5 py-4">
              {links.map((link, index) => {
                const isActive = activeSection === link.id;

                return (
                  <li key={link.id}>
                    <a
                      href={`#${link.id}`}
                      onClick={dismiss}
                      aria-current={isActive ? "true" : undefined}
                      className={cn(
                        "flex min-h-12 items-center gap-4 rounded-xs px-2 text-[0.9375rem] font-medium",
                        "transition-colors duration-200 hover:bg-accent/60",
                        isActive ? "text-primary" : "text-ink",
                      )}
                    >
                      <span
                        aria-hidden
                        className={cn(
                          "w-5 shrink-0 text-[0.6875rem] font-medium tabular-nums tracking-[0.1em]",
                          isActive ? "text-primary" : "text-muted/70",
                        )}
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      {link.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>
        </>
      ) : null}
    </header>
  );
}

export default Navbar;
