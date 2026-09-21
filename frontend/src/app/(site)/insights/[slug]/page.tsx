import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import HtmlBody from "@/components/HtmlBody";
import JsonLd from "@/components/JsonLd";
import { getPost, getPosts } from "@/lib/cms";
import { absUrl, articleSchema, breadcrumbSchema, jsonLdGraph } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};
  const title = post.seoTitle || `${post.title} | Navitrends UK`;
  const description = post.seoDescription || post.excerpt;
  const url = absUrl(`/insights/${post.slug}`);
  const image = post.coverUrl ? absUrl(post.coverUrl) : absUrl("/logo.png");
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title,
      description,
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt || post.publishedAt,
      authors: [post.author || "Navitrends UK"],
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

export default async function InsightArticle({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const published = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })
    : null;
  const url = absUrl(`/insights/${post.slug}`);

  return (
    <article className="bg-[#fbfbfd]">
      <JsonLd
        data={jsonLdGraph([
          articleSchema({
            title: post.title,
            description: post.seoDescription || post.excerpt,
            url,
            coverUrl: post.coverUrl,
            publishedAt: post.publishedAt,
            updatedAt: post.updatedAt,
            author: post.author,
          }),
          breadcrumbSchema([
            { name: "Home", url: absUrl("/") },
            { name: "Insights", url: absUrl("/insights") },
            { name: post.title, url },
          ]),
        ])}
      />
      <div className="wrap py-20 lg:py-28 max-w-3xl">
        <p className="kicker mb-4">
          <Link href="/insights" className="hover:text-[#e31c23]">
            Insights
          </Link>
        </p>
        <h1 className="serif text-[2.6rem] sm:text-[3.15rem] leading-[1.08] text-[#0a1638]">{post.title}</h1>
        <p className="mt-4 text-sm text-[#8b91a5]">
          {post.author ? `${post.author} · ` : ""}
          {published}
          {post.updatedAt ? ` · Updated ${new Date(post.updatedAt).toLocaleDateString("en-GB")}` : ""}
        </p>
        {post.coverUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={post.coverUrl} alt={post.title} className="mt-10 w-full border border-[#e6e9f2]" />
        ) : null}
        <div className="mt-10">
          <HtmlBody html={post.html} />
        </div>
      </div>
    </article>
  );
}
