import type { Locale } from "./LanguageProvider";
import en from "./en";
import fr from "./fr";

const de = {
  solve: "Lösungen",
  services: "Leistungen",
  work: "Methode",
  cases: "Fälle",
  why: "Warum wir",
  contact: "Kontakt",
  insights: "Insights",
  faq: "FAQ",
  book: "Diagnostik",
  menu: "Menü",
};

const es = {
  solve: "Soluciones",
  services: "Servicios",
  work: "Método",
  cases: "Casos",
  why: "Por qué",
  contact: "Contacto",
  insights: "Insights",
  faq: "FAQ",
  book: "Diagnóstico",
  menu: "Menú",
};

const nav: Record<Locale, typeof en.nav> = {
  en: en.nav,
  fr: fr.nav,
  de,
  es,
};

export function navFor(locale: Locale) {
  return nav[locale];
}
