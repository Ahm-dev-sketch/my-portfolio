"use client";

import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { translations } from "@/data/translations";
import type { Language, TranslationContent } from "@/types/portfolio";

const STORAGE_KEY = "mus-portfolio-language";
const DEFAULT_LANGUAGE: Language = "en";

function isLanguage(value: string | null): value is Language {
  return value === "en" || value === "id";
}

function readStoredLanguage(): Language {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return isLanguage(stored) ? stored : DEFAULT_LANGUAGE;
  } catch {
    return DEFAULT_LANGUAGE;
  }
}

/*
 * Tiny external store: the active language is external state (localStorage),
 * so it belongs in an external store rather than in an effect that mirrors it
 * into React state. During hydration React reads the server snapshot ("en"),
 * then switches to the stored value, so markup never mismatches.
 */
let currentLanguage: Language =
  typeof window === "undefined" ? DEFAULT_LANGUAGE : readStoredLanguage();

const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function getSnapshot(): Language {
  return currentLanguage;
}

function getServerSnapshot(): Language {
  return DEFAULT_LANGUAGE;
}

function persistLanguage(language: Language) {
  try {
    window.localStorage.setItem(STORAGE_KEY, language);
  } catch {
    // Storage unavailable (private mode); the language still works per session.
  }
}

export interface LanguageContextValue {
  language: Language;
  t: TranslationContent;
  setLanguage: (language: Language) => void;
}

export const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const language = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const setLanguage = useCallback((next: Language) => {
    currentLanguage = next;
    persistLanguage(next);
    listeners.forEach((listener) => listener());
  }, []);

  const value = useMemo<LanguageContextValue>(
    () => ({ language, t: translations[language], setLanguage }),
    [language, setLanguage],
  );

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
}
