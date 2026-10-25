"use client";

import { Fragment } from "react";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { useLanguage } from "@/hooks/useLanguage";
import { profile } from "@/data/portfolio";

export function HeroSection() {
  const { t } = useLanguage();
  const headlineParts = t.hero.headline
    .split("|")
    .map((part) => part.trim())
    .filter(Boolean);

  return (
    <section id="home" aria-labelledby="hero-heading" className="border-b border-line">
      <div className="container-page grid items-start gap-12 py-14 sm:py-16 md:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)] md:gap-10 md:py-20 lg:grid-cols-[minmax(0,1.14fr)_minmax(0,0.86fr)] lg:gap-16 lg:py-24">
        <Reveal className="min-w-0">
          <p className="inline-flex items-center gap-2 rounded-pill border border-accent-line bg-accent px-3 py-1.5">
            <span aria-hidden className="h-1.5 w-1.5 rounded-pill bg-primary" />
            <span className="eyebrow text-primary">{t.hero.eyebrow}</span>
          </p>

          <h1 id="hero-heading" className="type-hero mt-6 text-ink">
            {profile.name}
          </h1>

          <p className="type-lead mt-6 max-w-[40ch] font-medium text-ink">
            {headlineParts.map((part, index) => (
              <Fragment key={part}>
                <span className="inline-block whitespace-nowrap">
                  {index > 0 ? (
                    <span aria-hidden className="pr-2 font-normal text-muted/50">
                      ·
                    </span>
                  ) : null}
                  {index > 0 ? <span className="sr-only">, </span> : null}
                  <span className={index === 0 ? "text-primary" : undefined}>
                    {part}
                  </span>
                </span>
              </Fragment>
            ))}
          </p>

          <p className="type-body mt-5 max-w-[58ch] text-muted">
            {t.hero.description}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <Button href="#experience" size="lg" className="w-full sm:w-auto">
              {t.hero.primaryCta}
            </Button>
            <Button
              href={profile.linkedinUrl}
              variant="secondary"
              size="lg"
              className="w-full sm:w-auto"
            >
              {t.hero.secondaryCta}
              <ArrowUpRight aria-hidden className="h-4 w-4" />
              <span className="sr-only">({t.a11y.externalLink})</span>
            </Button>
          </div>

          <div className="mt-9 flex flex-col gap-2 border-t border-line pt-5 text-[0.8125rem] sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-4 sm:gap-y-1.5">
            <p className="flex flex-wrap items-baseline gap-x-2">
              <span className="text-muted">{t.hero.card.locationLabel}</span>
              <span className="font-medium text-ink/85">{t.hero.card.location}</span>
            </p>
            <span aria-hidden className="hidden h-3.5 w-px shrink-0 bg-line sm:block" />
            <p className="text-muted">{profile.pronouns}</p>
          </div>
        </Reveal>

        <Reveal className="relative min-w-0" delay={0.1}>
          <div
            aria-hidden
            className="absolute inset-0 translate-x-2 translate-y-2 rounded-lg border border-accent-line lg:translate-x-2.5 lg:translate-y-2.5"
          />

          <div className="relative rounded-lg border border-line bg-surface p-5 sm:p-6 md:p-7">
            <div className="flex items-center gap-3.5">
              <span
                aria-hidden
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-sm border border-accent-line bg-accent text-[0.8125rem] font-semibold uppercase tracking-[0.12em] text-primary"
              >
                {profile.monogram}
              </span>
              <p className="min-w-0 text-[0.9375rem] font-semibold leading-snug text-ink">
                {profile.name}
              </p>
            </div>

            <p className="type-body mt-5 text-muted">{t.hero.card.descriptor}</p>

            <div className="mt-6 border-t border-line pt-5">
              <p className="eyebrow text-muted">{t.hero.card.gpaLabel}</p>
              <p className="mt-2 text-[2.75rem] font-semibold leading-none tracking-[-0.04em] text-primary tabular-nums">
                {t.hero.card.gpaValue}
              </p>
              <p className="mt-2 text-[0.8125rem] text-muted">{t.hero.card.gpaMeta}</p>
            </div>

            <div className="mt-5 border-t border-line pt-5">
              <p className="eyebrow text-muted">{t.hero.card.summaryLabel}</p>
              <p className="mt-2 text-[0.875rem] leading-relaxed text-ink/85">
                {t.hero.card.summary}
              </p>
            </div>

            <div className="mt-6 flex items-center justify-between gap-4 border-t border-line pt-4">
              <div className="min-w-0">
                <p className="eyebrow text-muted">{t.hero.card.availabilityLabel}</p>
                <p className="mt-1 text-[0.875rem] font-medium text-ink">
                  {t.hero.card.availability}
                </p>
              </div>
              <span
                aria-hidden
                className="flex h-5 w-5 shrink-0 items-center justify-center rounded-pill border border-accent-line"
              >
                <span className="h-1.5 w-1.5 rounded-pill bg-primary" />
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default HeroSection;
