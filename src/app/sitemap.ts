import type { MetadataRoute } from "next";
import { getPublishedPosts } from "@/lib/blog/queries";
import { site } from "@/lib/site";

// Rebuilt automatically when a post is published, edited or deleted
// (getPublishedPosts is cached under the "posts" tag that admin actions update).
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getPublishedPosts();
  const newest = posts[0]?.publishedAt;

  return [
    { url: site.url, changeFrequency: "monthly", priority: 1 },
    {
      url: `${site.url}/blog`,
      ...(newest && { lastModified: newest }),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...posts.map((p) => ({
      url: `${site.url}/blog/${p.slug}`,
      ...(p.publishedAt && { lastModified: p.publishedAt }),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
