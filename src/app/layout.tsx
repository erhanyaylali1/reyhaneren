import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Reyhan Eren - Aile Danışmanı",
  description:
    "Türkiye genelinde online veya İzmir'de yüzyüze aile danışmanlığı hizmetleri sunuyorum.",
  category: "Aile Danışmanlığı",
  authors: { name: "Reyhan Eren", url: "https://www.reyhaneren.com/" },
  keywords:
    "İzmir aile danışmanlığı, online aile danışmanlığı, Türkiye Aile Danışmanlığı, Aile Danışmalığı",
  alternates: {
    canonical: "https://www.reyhaneren.com/",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

const schema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Reyhan Eren",
  image: "URL_TO_PROFILE_IMAGE",
  url: "https://www.reyhaneren.com",
  telephone: "+90 123 456 7890",
  address: {
    "@type": "PostalAddress",
    addressLocality: "İzmir",
    addressCountry: "TR",
  },
  description:
    "Türkiye genelinde online veya İzmir'de yüzyüze aile danışmanlığı hizmetleri sunuyorum.",
  keywords: [
    "İzmir aile danışmanlığı",
    "Türkiye genelinde aile danışmanı",
    "online aile danışmanlığı",
    "Aile Danışmanlığı",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning lang="en">
      <head>
        <script
          id=""
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
