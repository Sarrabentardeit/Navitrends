"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    googleTranslateElementInit?: () => void;
    google?: {
      translate: {
        TranslateElement: new (options: Record<string, unknown>, id: string) => void;
      };
    };
  }
}

export function isGoogleLocale(locale: string) {
  return locale === "de" || locale === "es";
}

export function writeGoogTrans(pair: string | null) {
  const clear = "expires=Thu, 01 Jan 1970 00:00:00 GMT; ";
  const parts = pair
    ? [`googtrans=${pair}; path=/`, `googtrans=${pair}; path=/; domain=${window.location.hostname}`]
    : [
        `googtrans=; ${clear}path=/`,
        `googtrans=; ${clear}path=/; domain=${window.location.hostname}`,
      ];
  for (const part of parts) document.cookie = part;
}

export default function GoogleTranslate({ locale }: { locale: string }) {
  useEffect(() => {
    if (!isGoogleLocale(locale)) return;

    window.googleTranslateElementInit = () => {
      if (!window.google?.translate) return;
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          includedLanguages: "en,de,es",
          autoDisplay: false,
        },
        "google_translate_element"
      );
    };

    if (!document.querySelector('script[data-google-translate]')) {
      const script = document.createElement("script");
      script.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      script.dataset.googleTranslate = "true";
      document.body.appendChild(script);
    } else if (window.google?.translate) {
      window.googleTranslateElementInit();
    }
  }, [locale]);

  if (!isGoogleLocale(locale)) return null;

  return <div id="google_translate_element" aria-hidden className="sr-only" />;
}
