import type { Metadata, Viewport } from "next";
import "./globals.css";
import Header from "../components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Reyhan Eren - Aile Danışmanı",
  description:
    "Türkiye genelinde online veya İzmir'de yüzyüze aile danışmanlığı hizmetleri sunuyorum.",
  category: "Aile Danışmanlığı",
  authors: { name: "Reyhan Eren", url: "https://www.reyhaneren.com/" },
  keywords:
    "İzmir aile danışmanlığı, online aile danışmanlığı, Türkiye Aile Danışmanlığı, Aile Danışmalığı, Çift Terapisi, Aile Terapisi, İzmir Çift Terapisi",
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
  image:
    "https://media.licdn.com/dms/image/v2/D4D03AQHEpFPp2VeUsQ/profile-displayphoto-shrink_800_800/B4DZP.NJ5FG0Ag-/0/1735136689421?e=1741219200&v=beta&t=k9SEzKf44DbW6nFhRJ2xxPd_Kf78KIA5RBHlTzRmc_w",
  url: "https://www.reyhaneren.com.tr",
  telephone: "+905411620827",
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
    "Çift Terapisi",
    "Aile Terapisi",
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
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Playwrite+NO:wght@100..400&display=swap"
          rel="stylesheet"
        ></link>
      </head>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
