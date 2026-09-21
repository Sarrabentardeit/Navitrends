import type { Metadata } from "next";
import { notFound } from "next/navigation";
import HtmlBody from "@/components/HtmlBody";
import JsonLd from "@/components/JsonLd";
import { getPage, getPages } from "@/lib/cms";
import { absUrl, breadcrumbSchema, jsonLdGraph } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  const pages = await getPages();
  return pages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = await getPage(slug);
  if (!page) return {};
  const title = page.seoTitle || `${page.title} | Navitrends UK`;
  const description = page.seoDescription;
  const url = absUrl(`/p/${page.slug}`);
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      title,
      description,
      siteName: "Navitrends UK",
    },
  };
}

export default async function CmsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = await getPage(slug);
  if (!page) notFound();
  const url = absUrl(`/p/${page.slug}`);

  return (
    <article className="bg-[#fbfbfd]">
      <JsonLd
        data={jsonLdGraph([
          {
            "@type": "WebPage",
            name: page.title,
            url,
            description: page.seoDescription,
          },
          breadcrumbSchema([
            { name: "Home", url: absUrl("/") },
            { name: page.title, url },
          ]),
        ])}
      />
      <div className="wrap py-20 lg:py-28 max-w-3xl">
        <h1 className="serif text-[2.6rem] sm:text-[3.15rem] leading-[1.08] text-[#0a1638]">{page.title}</h1>
        <div className="mt-10">
          <HtmlBody html={page.html} />
        </div>
      </div>
    </article>
  );
}
