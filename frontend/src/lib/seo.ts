export const SITE_URL = "https://navitrends.uk";

export function absUrl(path = "/") {
  if (!path) return SITE_URL;
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export function titleScore(title: string) {
  const n = title.trim().length;
  if (n >= 50 && n <= 60) return "good" as const;
  if (n >= 35 && n <= 70) return "ok" as const;
  return "bad" as const;
}

export function descriptionScore(description: string) {
  const n = description.trim().length;
  if (n >= 120 && n <= 160) return "good" as const;
  if (n >= 70 && n <= 170) return "ok" as const;
  return "bad" as const;
}

export function ellipsize(value: string, max: number) {
  const text = value.trim();
  if (text.length <= max) return text;
  return `${text.slice(0, max - 1).trimEnd()}…`;
}

type AddressParts = {
  name: string;
  phone: string;
  email: string;
  logoUrl?: string;
  address?: string;
};

function postalAddress(address?: string) {
  const line = address || "5 Brayford Square, London, United Kingdom E1 0SG";
  return {
    "@type": "PostalAddress",
    streetAddress: "5 Brayford Square",
    addressLocality: "London",
    postalCode: "E1 0SG",
    addressCountry: "GB",
    description: line,
  };
}

export function organizationGraph(site: AddressParts) {
  const orgId = `${SITE_URL}/#organization`;
  return [
    {
      "@type": "Organization",
      "@id": orgId,
      name: site.name || "Navitrends Ltd",
      url: SITE_URL,
      logo: absUrl(site.logoUrl || "/logo.png"),
      email: site.email,
      telephone: site.phone,
      address: postalAddress(site.address),
      sameAs: [] as string[],
    },
    {
      "@type": "ProfessionalService",
      "@id": `${SITE_URL}/#localbusiness`,
      name: site.name || "Navitrends Ltd",
      url: SITE_URL,
      image: absUrl(site.logoUrl || "/logo.png"),
      telephone: site.phone,
      email: site.email,
      address: postalAddress(site.address),
      areaServed: ["GB", "Europe"],
      parentOrganization: { "@id": orgId },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "Navitrends UK",
      publisher: { "@id": orgId },
      inLanguage: "en-GB",
    },
  ];
}

export function serviceListSchema(families: { title: string; tagline?: string }[]) {
  const orgId = `${SITE_URL}/#organization`;
  return families.map((family) => ({
    "@type": "Service",
    name: family.title,
    description: family.tagline || family.title,
    url: `${SITE_URL}/#services`,
    provider: { "@id": orgId },
    areaServed: "GB",
  }));
}

export function faqPageSchema(items: { q: string; a: string }[]) {
  const valid = items.filter((item) => item.q.trim() && item.a.trim());
  if (!valid.length) return null;
  return {
    "@type": "FAQPage",
    "@id": `${SITE_URL}/#faq`,
    mainEntity: valid.map((item) => ({
      "@type": "Question",
      name: item.q.trim(),
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a.trim(),
      },
    })),
  };
}

export function articleSchema(post: {
  title: string;
  description: string;
  url: string;
  coverUrl?: string;
  publishedAt?: string;
  updatedAt?: string;
  author?: string;
}) {
  return {
    "@type": "Article",
    headline: post.title,
    description: post.description,
    url: post.url,
    mainEntityOfPage: post.url,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt || post.publishedAt,
    image: post.coverUrl ? [absUrl(post.coverUrl)] : undefined,
    author: {
      "@type": "Person",
      name: post.author || "Navitrends UK",
    },
    publisher: {
      "@type": "Organization",
      name: "Navitrends Ltd",
      logo: { "@type": "ImageObject", url: absUrl("/logo.png") },
    },
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function jsonLdGraph(nodes: unknown[]) {
  return {
    "@context": "https://schema.org",
    "@graph": nodes.filter(Boolean),
  };
}
