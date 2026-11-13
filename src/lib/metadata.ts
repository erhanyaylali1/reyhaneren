import type { Metadata } from "next";

// Inner pages define their own openGraph block, which REPLACES the root one
// in Next.js — so the shared social image must be listed again here or it
// silently disappears from those pages.
const ogImage = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: "Aile Danışmanı Reyhan Eren — İzmir Aile Danışmanlığı ve Çift Terapisi",
};

export function pageMetadata({
  title,
  description,
  path,
  type = "website",
}: {
  title: string;
  description: string;
  path: string;
  type?: "website" | "profile";
}): Metadata {
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: path },
    openGraph: { type, url: path, title, description, images: [ogImage] },
    twitter: { card: "summary_large_image", title, description, images: [ogImage.url] },
  };
}
