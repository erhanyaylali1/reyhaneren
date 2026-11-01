import type { Metadata, Viewport } from "next";
import { Figtree, Newsreader } from "next/font/google";
import { site } from "@/lib/site";
import "./globals.css";

// latin-ext is required for Turkish glyphs (ğ, ş, ı, İ).
const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin", "latin-ext"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  display: "swap",
});

const defaultTitle =
  "İzmir Aile Danışmanı ve Çift Terapisi | Reyhan Eren · Bayraklı";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: defaultTitle,
    template: "%s | Reyhan Eren · İzmir Aile Danışmanı",
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.person, url: site.url }],
  creator: site.person,
  keywords: [
    "İzmir aile danışmanı",
    "İzmir çift terapisi",
    "Bayraklı aile danışmanı",
    "İzmir aile danışmanlığı",
    "online aile danışmanlığı",
    "çift terapisi",
    "aile terapisi",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: "/",
    siteName: site.name,
    title: defaultTitle,
    description: site.description,
  },
  twitter: {
    // Switch to "summary_large_image" once an opengraph-image is added.
    card: "summary",
    site: "@reyhanerentr",
    creator: "@reyhanerentr",
    title: defaultTitle,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  category: "health",
};

export const viewport: Viewport = {
  themeColor: "#f6f2ec",
  colorScheme: "light",
};

const clinicJsonLd = {
  "@context": "https://schema.org",
  "@type": "MedicalClinic",
  "@id": `${site.url}/#clinic`,
  name: site.name,
  alternateName: `${site.person} — İzmir Aile Danışmanı`,
  description: site.description,
  url: site.url,
  telephone: site.phone.e164,
  email: site.email,
  address: {
    "@type": "PostalAddress",
    addressLocality: site.address.locality,
    addressRegion: site.address.region,
    addressCountry: site.address.country,
  },
  hasMap: site.address.mapUrl,
  areaServed: [
    { "@type": "City", name: "İzmir" },
    { "@type": "Country", name: "Türkiye" },
  ],
  availableService: [
    { "@type": "MedicalTherapy", name: "Birey Odaklı Aile Danışmanlığı" },
    { "@type": "MedicalTherapy", name: "Çift Terapisi" },
    { "@type": "MedicalTherapy", name: "Aile Terapisi" },
    { "@type": "MedicalTherapy", name: "Kurumsal Danışmanlık" },
  ],
  knowsLanguage: "tr",
  image: `${site.url}/reyhan-eren-aile-danismani.jpg`,
  employee: {
    "@type": "Person",
    "@id": `${site.url}/#reyhan-eren`,
    name: site.person,
    jobTitle: site.title,
    image: `${site.url}/reyhan-eren-aile-danismani.jpg`,
    alumniOf: [
      { "@type": "CollegeOrUniversity", name: "Akdeniz Üniversitesi" },
      { "@type": "CollegeOrUniversity", name: "Marmara Üniversitesi" },
    ],
    hasCredential: {
      "@type": "EducationalOccupationalCredential",
      name: "Aile Danışmanlığı Eğitimi",
      credentialCategory: "certificate",
      recognizedBy: { "@type": "CollegeOrUniversity", name: "Marmara Üniversitesi" },
    },
    knowsAbout: ["Aile danışmanlığı", "Çift terapisi", "Aile terapisi", "Sosyoloji"],
    sameAs: site.social.map((s) => s.href),
  },
  sameAs: site.social.map((s) => s.href),
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="tr"
      className={`${figtree.variable} ${newsreader.variable} antialiased`}
    >
      <body className="flex min-h-dvh flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(clinicJsonLd).replace(/</g, "\\u003c"),
          }}
        />
        {children}
      </body>
    </html>
  );
}
