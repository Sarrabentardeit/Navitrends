import HeroSection from "@/components/sections/HeroSection";
import SolveSection from "@/components/sections/SolveSection";
import ServicesSection from "@/components/sections/ServicesSection";
import ProcessSection from "@/components/sections/ProcessSection";
import CaseStudiesSection from "@/components/sections/CaseStudiesSection";
import WhySection from "@/components/sections/WhySection";
import FaqSection from "@/components/sections/FaqSection";
import CtaSection from "@/components/sections/CtaSection";
import JsonLd from "@/components/JsonLd";
import type { Metadata } from "next";
import { getAppearance, getHomeMessages, getHomeSeo, getSiteSettings } from "@/lib/cms";
import type { HomeSectionId } from "@/lib/appearance";
import { absUrl, faqPageSchema, jsonLdGraph, serviceListSchema } from "@/lib/seo";

export const dynamic = "force-dynamic";

const blocks: Record<HomeSectionId, React.ReactNode> = {
  hero: <HeroSection />,
  solve: <SolveSection />,
  services: <ServicesSection />,
  process: <ProcessSection />,
  cases: <CaseStudiesSection />,
  why: <WhySection />,
  faq: <FaqSection />,
  cta: <CtaSection />,
};

export async function generateMetadata(): Promise<Metadata> {
  const [home, settings] = await Promise.all([getHomeSeo(), getSiteSettings()]);
  const title = home?.seoTitle || settings?.seoTitle || settings?.siteTitle;
  const description = home?.seoDescription || settings?.seoDescription;
  const image = absUrl(home?.ogImage || settings?.logoUrl || "/logo.png");
  return {
    ...(title ? { title } : {}),
    ...(description ? { description } : {}),
    alternates: { canonical: absUrl("/") },
    openGraph: {
      type: "website",
      url: absUrl("/"),
      siteName: "Navitrends UK",
      title,
      description,
      images: [{ url: image }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export default async function Home() {
  const [appearance, messages] = await Promise.all([getAppearance(), getHomeMessages()]);
  const visible = appearance.sections.filter((section) => section.visible && blocks[section.id]);
  const faq = faqPageSchema(messages?.faq.items ?? []);
  const services = serviceListSchema(messages?.services.families ?? []);

  return (
    <>
      <JsonLd data={jsonLdGraph([faq, ...services])} />
      {visible.map((section) => (
        <div key={section.id}>{blocks[section.id]}</div>
      ))}
    </>
  );
}
