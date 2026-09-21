import type { Metadata } from "next";
import Link from "next/link";
import { getPosts } from "@/lib/cms";
import { absUrl } from "@/lib/seo";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Insights | Navitrends UK",
  description: "Operational digitalisation notes, case lessons and applied systems thinking from Navitrends UK.",
  alternates: { canonical: absUrl("/insights") },
  openGraph: {
    type: "website",
    url: absUrl("/insights"),
    title: "Insights | Navitrends UK",
    description: "Operational digitalisation notes, case lessons and applied systems thinking from Navitrends UK.",
  },
};

export default async function InsightsPage() {
  const posts = await getPosts();

  return (
    <section className="bg-[#fbfbfd]">
      <div className="wrap py-20 lg:py-28">
        <p className="kicker mb-4">Insights</p>
        <h1 className="serif text-[2.6rem] sm:text-[3.15rem] leading-[1.08] text-[#0a1638] max-w-[16ch]">
          Evidence, not noise.
        </h1>
        <p className="mt-6 max-w-xl text-[#4b5573] leading-relaxed">
          Short notes on operational systems, automation and applied intelligence.
        </p>

        {posts.length === 0 ? (
          <p className="mt-16 border-t border-[#e6e9f2] pt-8 text-[#5b6178]">Articles coming soon.</p>
        ) : (
          <div className="mt-16 grid gap-6 md:grid-cols-2">
            {posts.map((post) => (
              <article key={post._id} className="border border-[#e6e9f2] bg-white p-8 h-full">
                {post.coverUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={post.coverUrl} alt={post.title} className="mb-6 w-full object-cover" />
                ) : null}
                <p className="text-[11px] tracking-[0.18em] uppercase text-[#8b91a5]">
                  {post.publishedAt
                    ? new Date(post.publishedAt).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })
                    : "Insight"}
                </p>
                <h2 className="serif mt-3 text-[1.75rem] leading-snug text-[#0a1638]">
                  <Link href={`/insights/${post.slug}`} className="hover:text-[#e31c23]">
                    {post.title}
                  </Link>
                </h2>
                {post.excerpt && <p className="mt-4 text-sm text-[#4b5573] leading-relaxed">{post.excerpt}</p>}
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
