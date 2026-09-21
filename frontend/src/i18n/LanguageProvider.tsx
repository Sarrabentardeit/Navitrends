"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import en, { type Messages } from "./en";
import fr from "./fr";
import GoogleTranslate, { isGoogleLocale, writeGoogTrans } from "./GoogleTranslate";

export type Locale = "en" | "fr" | "de" | "es";

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

function isLocale(value: string | null): value is Locale {
  return value === "en" || value === "fr" || value === "de" || value === "es";
}

export function LanguageProvider({
  children,
  cmsEnglish,
}: {
  children: React.ReactNode;
  cmsEnglish?: Messages | null;
}) {
  const [locale, setLocaleState] = useState<Locale>("en");
  const [ready, setReady] = useState(false);
  const english = cmsEnglish ?? en;

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (isLocale(saved)) setLocaleState(saved);
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    window.localStorage.setItem(STORAGE_KEY, locale);
    document.documentElement.lang = locale;
    if (isGoogleLocale(locale)) writeGoogTrans(`/en/${locale}`);
  }, [locale, ready]);

  const setLocale = (next: Locale) => {
    const needsReload = isGoogleLocale(locale) || isGoogleLocale(next);
    window.localStorage.setItem(STORAGE_KEY, next);
    if (isGoogleLocale(next)) writeGoogTrans(`/en/${next}`);
    else writeGoogTrans(null);
    if (needsReload) {
      window.location.reload();
      return;
    }
    setLocaleState(next);
  };

  const value = useMemo(
    () => ({
      locale,
      t: locale === "fr" ? fr : english,
      setLocale,
    }),
    [locale, english]
  );

  return (
    <LanguageContext.Provider value={value}>
      <GoogleTranslate locale={locale} />
      {children}
    </LanguageContext.Provider>
  );
}

export function useT() {
  return useContext(LanguageContext).t;
}

export function useLocale() {
  const { locale, setLocale } = useContext(LanguageContext);
  return { locale, setLocale };
}
