export const CONSENT_KEY = "navitrends-consent";
export const CONSENT_EVENT = "navitrends-consent";
export const CONSENT_OPEN = "navitrends-consent-open";

export type Consent = "granted" | "denied";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function getConsent(): Consent | null {
  if (typeof window === "undefined") return null;
  const value = window.localStorage.getItem(CONSENT_KEY);
  return value === "granted" || value === "denied" ? value : null;
}

export function setConsent(value: Consent) {
  window.localStorage.setItem(CONSENT_KEY, value);
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: value }));
}

export function openCookieSettings() {
  window.dispatchEvent(new Event(CONSENT_OPEN));
}

export function trackEvent(name: string, params?: Record<string, string>) {
  if (getConsent() !== "granted") return;
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: name, ...params });
  window.gtag?.("event", name, params);
}

export function trackDiagnosticSubmit() {
  trackEvent("generate_lead", { method: "diagnostic_form" });
}

export function trackPhoneClick() {
  trackEvent("click_phone", { link: "tel" });
}

export function trackEmailClick() {
  trackEvent("click_email", { link: "mailto" });
}
