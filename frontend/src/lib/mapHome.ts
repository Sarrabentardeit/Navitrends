import en, { type Messages } from "@/i18n/en";

type HomeDoc = {
  hero?: Partial<Messages["hero"]>;
  solve?: Partial<Messages["solve"]>;
  chain?: Messages["chain"];
  services?: Partial<Messages["services"]>;
  process?: Partial<Messages["process"]>;
  cases?: Partial<Messages["cases"]>;
  why?: Partial<Messages["why"]>;
  cta?: Partial<Messages["cta"]>;
  nav?: Partial<Messages["nav"]>;
  footer?: Partial<Messages["footer"]>;
  cookies?: Partial<Messages["cookies"]>;
  faq?: Partial<Messages["faq"]>;
};

export type CmsSettings = {
  phone?: string;
  email?: string;
  address?: string;
  logoUrl?: string;
  privacySlug?: string;
  termsSlug?: string;
};

function filled<T>(value: T | undefined | null): value is T {
  if (value === undefined || value === null || value === "") return false;
  if (Array.isArray(value) && value.length === 0) return false;
  return true;
}

function mergeSection<T extends object>(base: T, patch?: Partial<T> | null): T {
  if (!patch) return base;
  const next = { ...base };
  for (const key of Object.keys(base) as (keyof T)[]) {
    const value = patch[key];
    if (filled(value)) next[key] = value as T[keyof T];
  }
  return next;
}

export function mapHomeToMessages(
  doc: HomeDoc | null | undefined,
  settings?: CmsSettings | null,
  media?: { logoUrl?: string | null; ctaImageUrl?: string | null }
): Messages {
  const base: Messages = doc
    ? {
        ...en,
        nav: mergeSection(en.nav, doc.nav),
        hero: mergeSection(en.hero, doc.hero),
        solve: mergeSection(en.solve, doc.solve),
        chain: filled(doc.chain) ? doc.chain : en.chain,
        services: mergeSection(en.services, doc.services),
        process: mergeSection(en.process, doc.process),
        cases: mergeSection(en.cases, doc.cases),
        why: mergeSection(en.why, doc.why),
        cta: mergeSection(en.cta, doc.cta),
        footer: mergeSection(en.footer, doc.footer),
        cookies: mergeSection(en.cookies, doc.cookies),
        faq: mergeSection(en.faq, doc.faq),
      }
    : { ...en };

  return {
    ...base,
    site: {
      ...en.site,
      phone: settings?.phone || en.site.phone,
      email: settings?.email || en.site.email,
      address: settings?.address || en.site.address,
      logoUrl: media?.logoUrl || en.site.logoUrl,
      ctaImageUrl: media?.ctaImageUrl || en.site.ctaImageUrl,
      privacyHref: settings?.privacySlug ? `/p/${settings.privacySlug}` : en.site.privacyHref,
      termsHref: settings?.termsSlug ? `/p/${settings.termsSlug}` : en.site.termsHref,
    },
  };
}
