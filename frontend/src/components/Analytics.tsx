"use client";

import { useEffect, useState } from "react";
import { GoogleAnalytics } from "@next/third-parties/google";
import { CONSENT_EVENT, getConsent } from "@/lib/analytics";

const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "G-2JD6TXHWMX";

export default function Analytics() {
  const [granted, setGranted] = useState(false);

  useEffect(() => {
    const sync = () => setGranted(getConsent() === "granted");
    sync();
    window.addEventListener(CONSENT_EVENT, sync);
    return () => window.removeEventListener(CONSENT_EVENT, sync);
  }, []);

  const host = typeof window !== "undefined" ? window.location.hostname : "";
  const live = host === "navitrends.uk" || host === "www.navitrends.uk";

  if (!gaId || !granted || !live) return null;

  return <GoogleAnalytics gaId={gaId} />;
}
