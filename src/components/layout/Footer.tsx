"use client";

import { ArrowUp } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { profile } from "@/data/portfolio";
import { cn } from "@/lib/utils";

/** Brand glyph: this lucide build ships no brand icons. */
function LinkedInGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden focusable="false" fill="currentColor" className={className}>
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12Zm1.78 13.02H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45C23.2 24 24 23.23 24 22.27V1.73C24 .77 23.2 0 22.22 0Z" />
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
    <footer className="border-t border-line bg-canvas">
      <div className="container-page py-10 md:py-12">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between md:gap-12">
          <div className="min-w-0 md:flex-1">
            <a
              href="#home"
              aria-label={`${t.nav.wordmark} — ${t.nav.items.home}`}
              className="group inline-flex items-center rounded-xs"
            >
              <span className="text-[0.8125rem] font-semibold uppercase leading-none tracking-[0.22em] text-ink transition-colors duration-200 group-hover:text-primary">
                {t.nav.wordmark}
              </span>
            </a>

            <p className="type-body mt-4 max-w-[46ch] text-muted">
              {t.hero.card.descriptor}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 sm:gap-3 md:shrink-0 md:flex-nowrap md:pt-0.5">
            <a
              href={profile.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`LinkedIn — ${t.a11y.externalLink}`}
              className="inline-flex h-10 items-center gap-2 rounded-sm px-2 text-[0.8125rem] font-medium text-muted transition-colors duration-200 hover:text-ink hover:underline hover:underline-offset-4"
            >
              <LinkedInGlyph className="h-[14px] w-[14px] shrink-0" />
              <span>LinkedIn</span>
              <span className="sr-only">{t.a11y.externalLink}</span>
            </a>

            <button
              type="button"
              onClick={goToTop}
              aria-label={t.a11y.backToTop}
              className={cn(
                "group inline-flex h-10 items-center gap-2 rounded-sm border border-line bg-surface px-3 text-[0.8125rem] font-medium text-ink",
                "transition-colors duration-200",
                "hover:border-accent-line hover:bg-accent/60 hover:text-primary",
              )}
            >
              <span className="hidden sm:inline">{t.footer.backToTop}</span>
              <ArrowUp
                aria-hidden
                className="h-4 w-4 transition-transform duration-300 ease-out group-hover:-translate-y-0.5"
              />
            </button>
          </div>
        </div>

        <div className="rule mt-8 md:mt-10" />

        <div className="mt-5 flex flex-col gap-1.5 text-[0.8125rem] text-muted sm:flex-row sm:items-center sm:justify-between sm:gap-6">
          <p>{t.footer.rights}</p>
          <p>{t.footer.builtWith}</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
