import { getPages, getPosts } from "@/lib/cms";
import { SITE_URL } from "@/lib/seo";
import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = SITE_URL;
  const rows: MetadataRoute.Sitemap = [
    {
      url: base,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];

  try {
    const [posts, pages] = await Promise.all([getPosts(), getPages()]);
    if (posts.length) {
      rows.push({
        url: `${base}/insights`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.8,
      });
      for (const post of posts) {
        rows.push({
          url: `${base}/insights/${post.slug}`,
          lastModified: post.publishedAt ? new Date(post.publishedAt) : new Date(),
          changeFrequency: "monthly",
          priority: 0.7,
        });
      }
    }
    for (const page of pages) {
      rows.push({
        url: `${base}/p/${page.slug}`,
        lastModified: page._updatedAt ? new Date(page._updatedAt) : new Date(),
        changeFrequency: "monthly",
        priority: 0.5,
      });
    }
  } catch {
    // still return the homepage so Search Console has a valid sitemap
  }

  return rows;
}
