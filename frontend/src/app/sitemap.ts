import { getPages, getPosts } from "@/lib/cms";
import { SITE_URL } from "@/lib/seo";
import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [posts, pages] = await Promise.all([getPosts(), getPages()]);
  const base = SITE_URL;

  return [
    {
      url: base,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    ...(posts.length
      ? [
          {
            url: `${base}/insights`,
            lastModified: new Date(),
            changeFrequency: "weekly" as const,
            priority: 0.8,
          },
          ...posts.map((post) => ({
            url: `${base}/insights/${post.slug}`,
            lastModified: post.publishedAt ? new Date(post.publishedAt) : new Date(),
            changeFrequency: "monthly" as const,
            priority: 0.7,
          })),
        ]
      : []),
    ...pages.map((page) => ({
      url: `${base}/p/${page.slug}`,
      lastModified: page._updatedAt ? new Date(page._updatedAt) : new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.5,
    })),
  ];
}
