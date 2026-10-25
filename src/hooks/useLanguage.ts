"use client";

import { useContext } from "react";
import { LanguageContext } from "@/components/providers/LanguageProvider";
import type { LanguageContextValue } from "@/components/providers/LanguageProvider";

export function useLanguage(): LanguageContextValue {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
}
