"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Check, Link2 } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { useLanguage } from "@/hooks/useLanguage";
import { profile } from "@/data/portfolio";

export function ContactSection() {
  const { language, t } = useLanguage();
  const [copied, setCopied] = useState(false);
  const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (resetTimer.current) clearTimeout(resetTimer.current);
    },
    [],
  );

  const flashSuccess = () => {
    setCopied(true);
    if (resetTimer.current) clearTimeout(resetTimer.current);
    resetTimer.current = setTimeout(() => setCopied(false), 2000);
  };

  const copyLink = async () => {
    const url = window.location.href;

    try {
      if (!navigator.clipboard?.writeText) throw new Error("No clipboard API");
      await navigator.clipboard.writeText(url);
      flashSuccess();
      return;
    } catch {
      // Fall through to the selection-based fallback below.
    }

    try {
      const field = document.createElement("textarea");
      field.value = url;
      field.setAttribute("readonly", "");
      field.style.position = "fixed";
      field.style.top = "0";
      field.style.opacity = "0";
      document.body.appendChild(field);

      try {
        field.select();
        if (document.execCommand("copy")) flashSuccess();
      } finally {
        field.remove();
      }
    } catch {
      // Copying is a convenience; LinkedIn stays the primary route.
    }
  };

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="relative overflow-hidden bg-primary-dark text-white"
    >
      <span
        aria-hidden
        className="pointer-events-none absolute -bottom-10 -right-8 select-none text-[9rem] font-semibold leading-none tracking-[-0.06em] text-white/5 sm:text-[14rem]"
      >
        {profile.monogram}
      </span>

      <div className="container-page relative py-20 md:py-28 lg:py-32">
        <Reveal>
          <div className="flex items-center gap-3">
            <span aria-hidden className="h-px w-7 shrink-0 bg-white/40" />
            <p className="eyebrow text-accent-line">{t.contact.eyebrow}</p>
          </div>

          <div className="mt-8 grid gap-8 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-7">
              <h2
                id="contact-heading"
                className="type-section max-w-[17ch] text-white"
              >
                {t.contact.heading}
              </h2>
            </div>

            <div className="min-w-0 lg:col-span-5">
              <p className="type-body max-w-[52ch] text-white/75">
                {t.contact.description}
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a
                  href={profile.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-sm bg-white px-6 text-[0.9375rem] font-medium text-primary-dark transition-colors duration-200 hover:bg-accent active:translate-y-px"
                >
                  {t.contact.linkedinCta}
                  <ArrowUpRight aria-hidden className="h-4 w-4" />
                  <span className="sr-only">({t.a11y.externalLink})</span>
                </a>

                <button
                  type="button"
                  onClick={copyLink}
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-sm border border-white/30 px-6 text-[0.9375rem] font-medium text-white transition-colors duration-200 hover:border-white/60 hover:bg-white/10 active:translate-y-px"
                >
                  <Link2 aria-hidden className="h-4 w-4" />
                  {t.contact.copyLinkCta}
                </button>
              </div>

              <p
                aria-live="polite"
                className="mt-3 flex h-5 items-center gap-1.5 text-[0.8125rem] text-accent-line"
              >
                {copied ? (
                  <>
                    <Check aria-hidden className="h-3.5 w-3.5 shrink-0" />
                    {t.contact.copyLinkSuccess}
                  </>
                ) : null}
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="mt-14 grid gap-6 border-t border-white/15 pt-6 sm:grid-cols-2 md:mt-16">
            <div className="min-w-0">
              <p className="eyebrow text-white/70">{t.contact.locationLabel}</p>
              <p className="mt-2 text-[0.9375rem] text-white/85">
                {profile.location[language]}
              </p>
            </div>
            <p className="max-w-[44ch] text-[0.9375rem] leading-relaxed text-white/70 sm:justify-self-end sm:text-right">
              {t.contact.footerNote}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default ContactSection;
