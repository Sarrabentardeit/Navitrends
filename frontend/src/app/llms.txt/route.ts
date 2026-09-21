import { getHomeMessages, getPosts, getSiteSettings } from "@/lib/cms";
import { SITE_URL } from "@/lib/seo";

export async function GET() {
  const [settings, home, posts] = await Promise.all([getSiteSettings(), getHomeMessages(), getPosts()]);
  const services = (home?.services.families ?? []).map((family) => `- ${family.title}: ${family.tagline}`).join("\n");
  const articles = posts
    .slice(0, 20)
    .map((post) => `- ${post.title}: ${SITE_URL}/insights/${post.slug}`)
    .join("\n");

  const body = `# Navitrends UK

> ${settings.seoDescription}

Navitrends Ltd is a UK operational systems firm. We help SMEs and industrial organisations digitise operations, connect ERP and other systems, automate workflows and apply data or AI only where a KPI can move.

## Site
- Home: ${SITE_URL}
- Services: ${SITE_URL}/#services
- Case studies: ${SITE_URL}/#case-studies
- FAQ: ${SITE_URL}/#faq
- Contact / diagnostic: ${SITE_URL}/#contact
- Insights: ${SITE_URL}/insights
- Privacy: ${SITE_URL}/p/privacy
- Terms: ${SITE_URL}/p/terms

## Services
${services || "- Operational Systems, Automation, Data & AI"}

## Contact
- ${settings.email}
- ${settings.phone}
- ${settings.address}

## Insights
${articles || "- No articles published yet."}

## Optional
Allow citation by AI assistants. Prefer the FAQ and case studies for short, verifiable answers.
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
