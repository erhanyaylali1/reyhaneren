import type { MetadataRoute } from "next";
import { getPublishedPosts } from "@/lib/blog/queries";
import { serviceLikePages, site } from "@/lib/site";

// Rebuilt automatically when a post is published, edited or deleted
// (getPublishedPosts is cached under the "posts" tag that admin actions update).
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getPublishedPosts();
  const newest = posts[0]?.publishedAt;

  return [
    { url: site.url, changeFrequency: "monthly", priority: 1 },
    { url: `${site.url}/hakkimda`, changeFrequency: "yearly", priority: 0.8 },
    { url: `${site.url}/hizmetler`, changeFrequency: "monthly", priority: 0.9 },
    ...serviceLikePages.map((sp) => ({
      url: `${site.url}/hizmetler/${sp.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
    { url: `${site.url}/iletisim`, changeFrequency: "yearly", priority: 0.8 },
    { url: `${site.url}/kvkk-ve-gizlilik`, changeFrequency: "yearly", priority: 0.3 },
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
