import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CookieBanner from "@/components/CookieBanner";
import Analytics from "@/components/Analytics";
import ThemeStyle from "@/components/ThemeStyle";
import JsonLd from "@/components/JsonLd";
import { LanguageProvider } from "@/i18n/LanguageProvider";
import { getAppearance, getHomeMessages, getPosts, getSiteSettings } from "@/lib/cms";
import { jsonLdGraph, organizationGraph } from "@/lib/seo";

export const dynamic = "force-dynamic";

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const [cmsEnglish, posts, appearance, settings] = await Promise.all([
    getHomeMessages(),
    getPosts(),
    getAppearance(),
    getSiteSettings(),
  ]);
  const showInsights = posts.length > 0;

  return (
    <LanguageProvider cmsEnglish={cmsEnglish}>
      <ThemeStyle colors={appearance.colors} />
      <JsonLd
        data={jsonLdGraph(
          organizationGraph({
            name: settings.siteTitle || "Navitrends Ltd",
            phone: settings.phone,
            email: settings.email,
            address: settings.address,
            logoUrl: settings.logoUrl,
          })
        )}
      />
      <Analytics />
      <Header showInsights={showInsights} />
      <main className="flex-1">{children}</main>
      <Footer showInsights={showInsights} />
      <CookieBanner />
    </LanguageProvider>
  );
}
