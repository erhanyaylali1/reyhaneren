import type { Metadata, Viewport } from "next";
import { Figtree, Newsreader } from "next/font/google";
import { servicePages, site } from "@/lib/site";
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

const defaultTitle = "Aile Danışmanı Reyhan Eren | İzmir Aile Danışmanlığı ve Çift Terapisi";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: defaultTitle,
    template: "%s | Aile Danışmanı Reyhan Eren",
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
  // Canonical is set per page (home, /blog, each post). A canonical here would
  // be inherited by every route and point them all at the home page.
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: "/",
    siteName: site.name,
    title: defaultTitle,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image", // image comes from app/opengraph-image.tsx
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

// One linked graph: the business (LocalBusiness + MedicalClinic), the person
// who works there, and the website. FAQPage lives on the home page because
// Google only accepts it on the page where the questions are visible.
const businessId = `${site.url}/#clinic`;
const personId = `${site.url}/#reyhan-eren`;
// Social accounts + verified expert profiles: tells Google these are the same
// person/business (a trust signal). Used by both Person and LocalBusiness.
const sameAs = site.social.map((s) => s.href);

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["LocalBusiness", "MedicalClinic"],
      "@id": businessId,
      name: site.name,
      // Previous profile name kept so older mentions still map to this business.
      alternateName: ["Reyhan Eren Aile Danışmanlığı", `${site.person} — İzmir Aile Danışmanı`],
      description: site.description,
      url: site.url,
      telephone: site.phone.e164,
      email: site.email,
      image: `${site.url}/reyhan-eren-aile-danismani-izmir-portre.jpg`,
      logo: `${site.url}/icon.png`,
      address: {
        "@type": "PostalAddress",
        addressLocality: site.address.locality,
        addressRegion: site.address.region,
        addressCountry: site.address.country,
      },
      areaServed: [
        { "@type": "City", name: "İzmir" },
        { "@type": "Country", name: "Türkiye" },
      ],
      availableService: [
        ...servicePages.map((s) => ({
          "@type": "MedicalTherapy",
          name: s.title,
          url: `${site.url}/hizmetler/${s.slug}`,
        })),
      ],
      knowsLanguage: "tr",
      hasMap: site.address.maps,
      founder: { "@id": personId },
      employee: { "@id": personId },
      // Google Business Profile listed too, so Google links the site to it.
      sameAs: [...sameAs, site.address.maps],
    },
    {
      "@type": "Person",
      "@id": personId,
      name: site.person,
      jobTitle: site.title,
      // The profile page is the authoritative "about the author" page (E-E-A-T).
      url: `${site.url}/hakkimda`,
      image: `${site.url}/reyhan-eren-aile-danismani-izmir-portre.jpg`,
      worksFor: { "@id": businessId },
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
      sameAs,
    },
    {
      "@type": "WebSite",
      "@id": `${site.url}/#website`,
      url: site.url,
      name: site.name,
      inLanguage: "tr-TR",
      publisher: { "@id": businessId },
    },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="tr"
      className={`${figtree.variable} ${newsreader.variable} antialiased`}
      // globals.css sets scroll-behavior: smooth for in-page anchors. This
      // tells Next.js to switch it off during page navigations, so a new page
      // opens at the very top instantly instead of gliding up from mid-page.
      data-scroll-behavior="smooth"
    >
      <body className="flex min-h-dvh flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
          }}
        />
        {children}
      </body>
    </html>
  );
}
