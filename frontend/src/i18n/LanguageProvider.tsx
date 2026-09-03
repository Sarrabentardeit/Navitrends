"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import en, { type Messages } from "./en";
import fr from "./fr";

export type Locale = "en" | "fr";

const dictionaries: Record<Locale, Messages> = { en, fr };
const STORAGE_KEY = "navitrends-lang";

const LanguageContext = createContext<{
  locale: Locale;
  t: Messages;
  setLocale: (locale: Locale) => void;
}>({
  locale: "en",
  t: en,
  setLocale: () => {},
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === "en" || saved === "fr") setLocaleState(saved);
  }, []);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, locale);
    document.documentElement.lang = locale === "fr" ? "fr" : "en";
  }, [locale]);

  const value = useMemo(
    () => ({
      locale,
      t: dictionaries[locale],
      setLocale: (next: Locale) => setLocaleState(next),
    }),
    [locale]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useT() {
  return useContext(LanguageContext).t;
}

export function useLocale() {
  const { locale, setLocale } = useContext(LanguageContext);
  return { locale, setLocale };
}
