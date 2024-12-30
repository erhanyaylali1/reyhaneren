import { IPost } from "@/app/blog/page";
import { getAllPostsForSiteMap } from "@/shared/helpers/apiCall";
import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const SITE_URL = "https://www.reyhaneren.com.tr";

  // Fetch dynamic blog posts from an API or database
  const posts = await getAllPostsForSiteMap();

  // Static pages
  const staticPages = [
    { url: "/", changefreq: "weekly", priority: 1.0 },
    { url: "/blog", changefreq: "weekly", priority: 0.8 },
    { url: "/hizmetler", changefreq: "weekly", priority: 0.7 },
    { url: "/hakkimda", changefreq: "monthly", priority: 0.7 },
    { url: "/randevu-al", changefreq: "weekly", priority: 0.7 },
  ];

  // Generate sitemap entries
  const staticEntries = staticPages.map(
    (page) => `
    <url>
      <loc>${SITE_URL}${page.url}</loc>
      <changefreq>${page.changefreq}</changefreq>
      <priority>${page.priority}</priority>
    </url>
  `
  );

  const dynamicEntries = posts.map(
    (post: IPost) => `
    <url>
      <loc>${SITE_URL}/blog/${post.title.replaceAll(" ", "-")}?id=${
      post.id
    }</loc>
      <changefreq>weekly</changefreq>
      <priority>0.8</priority>
    </url>
  `
  );

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${staticEntries.join("")}
      ${dynamicEntries.join("")}
    </urlset>`;

  // Set response headers
  res.setHeader("Content-Type", "application/xml");
  res.write(sitemap);
  res.end();

  return { props: {} }; // No props needed
};

export default function Sitemap() {
  return null; // No rendering needed
}
