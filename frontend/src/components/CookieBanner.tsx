"use client";

import { useEffect, useState } from "react";
import {
  CONSENT_EVENT,
  CONSENT_OPEN,
  getConsent,
  setConsent,
  type Consent,
} from "@/lib/analytics";
import { useT } from "@/i18n/LanguageProvider";

export default function CookieBanner() {
  const t = useT();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const sync = () => setVisible(getConsent() === null);
    sync();
    const onOpen = () => setVisible(true);
    const onChange = () => sync();
    window.addEventListener(CONSENT_OPEN, onOpen);
    window.addEventListener(CONSENT_EVENT, onChange);
    return () => {
      window.removeEventListener(CONSENT_OPEN, onOpen);
      window.removeEventListener(CONSENT_EVENT, onChange);
    };
  }, []);

  if (!visible) return null;

  const choose = (value: Consent) => {
    const previous = getConsent();
    setConsent(value);
    setVisible(false);
    if (previous === "granted" && value === "denied") window.location.reload();
  };

  return (
    <div
      translate="no"
      className="notranslate fixed inset-x-0 bottom-0 z-[80] border-t border-[#e6e9f2] bg-[#0a1638] text-white shadow-[0_-12px_40px_rgba(10,22,56,0.18)]"
      role="dialog"
      aria-label={t.cookies.title}
    >
      <div className="wrap flex flex-col gap-4 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="max-w-2xl">
          <p className="text-[13px] font-semibold">{t.cookies.title}</p>
          <p className="mt-1 text-[12px] leading-relaxed text-white/70">{t.cookies.body}</p>
        </div>
        <div className="flex shrink-0 flex-wrap gap-2">
          <button
            type="button"
            className="h-10 border border-white/25 px-4 text-[11px] font-semibold tracking-[0.08em] uppercase text-white hover:bg-white/10"
            onClick={() => choose("denied")}
          >
            {t.cookies.reject}
          </button>
          <button type="button" className="btn btn-red h-10 px-5" onClick={() => choose("granted")}>
            {t.cookies.accept}
          </button>
        </div>
      </div>
    </div>
  );
}
