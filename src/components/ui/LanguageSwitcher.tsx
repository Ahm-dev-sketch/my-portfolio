"use client";

import { useLanguage } from "@/hooks/useLanguage";
import { cn } from "@/lib/utils";
import type { Language } from "@/types/portfolio";

const OPTIONS: ReadonlyArray<{ value: Language; label: string }> = [
  { value: "en", label: "EN" },
  { value: "id", label: "ID" },
];

export interface LanguageSwitcherProps {
  className?: string;
}

/**
 * Compact segmented control. Both options hold a fixed width, so changing
 * language never shifts the header.
 */
export function LanguageSwitcher({ className }: LanguageSwitcherProps) {
  const { language, setLanguage, t } = useLanguage();

  return (
    <div
      role="group"
      aria-label={t.a11y.switchLanguage}
      className={cn(
        "inline-flex items-center gap-0.5 rounded-sm border border-line bg-surface p-0.5",
        className,
      )}
    >
      {OPTIONS.map((option) => {
        const isActive = language === option.value;

        return (
          <button
            key={option.value}
            type="button"
            lang={option.value}
            aria-pressed={isActive}
            onClick={() => setLanguage(option.value)}
            className={cn(
              "inline-flex h-8 w-9 items-center justify-center rounded-xs text-[0.6875rem] font-semibold uppercase tracking-[0.08em] transition-colors duration-200",
              "focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
              isActive
                ? "bg-primary text-white"
                : "text-muted hover:bg-accent/70 hover:text-ink",
            )}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}

export default LanguageSwitcher;
