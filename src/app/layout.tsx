import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Reyhan Eren - Aile Danışmanı",
  description:
    "Türkiye genelinde online veya İzmir'de yüzyüze aile danışmanlığı hizmetleri sunuyorum.",
  category: "Aile Danışmanlığı",
  authors: { name: "Reyhan Eren", url: "https://www.reyhaneren.com/" },
  keywords:
    "İzmir aile danışmanlığı, online aile danışmanlığı, Türkiye Aile Danışmanlığı, Aile Danışmalığı",
  viewport: { width: "device-width", initialScale: 1 },
  alternates: {
    canonical: "https://www.reyhaneren.com/",
  },
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
    <html lang="tr">
      <head>
        <script
          id=""
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
