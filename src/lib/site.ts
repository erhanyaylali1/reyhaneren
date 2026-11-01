// Single source of truth for NAP (name/address/phone) data.
// Header, footer, metadata and JSON-LD all read from here so Google sees
// identical business details everywhere — inconsistent NAP hurts local SEO.

export const site = {
  url: "https://www.reyhaneren.com",
  name: "Reyhan Eren Aile Danışmanlığı",
  person: "Reyhan Eren",
  title: "Aile Danışmanı",
  description:
    "İzmir Bayraklı'da yüz yüze, Türkiye genelinde online aile danışmanlığı ve çift terapisi. Aile Danışmanı Reyhan Eren ile hemen randevu alın.",
  phone: {
    display: "0541 162 08 27",
    href: "tel:+905411620827",
    e164: "+905411620827",
  },
  email: "ailedanismanireyhaneren@gmail.com",
  address: {
    locality: "Bayraklı",
    region: "İzmir",
    country: "TR",
    mapUrl: "https://maps.app.goo.gl/Xts7HiSaptfNrVx5A",
  },
  social: [
    { label: "Instagram", href: "https://www.instagram.com/basicsociology/" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/reyhan-erenin/" },
    { label: "X", href: "https://www.x.com/reyhanerentr" },
  ],
} as const;

export const navLinks = [
  { label: "Hakkımda", href: "/#hakkimda" },
  { label: "Hizmetler", href: "/#hizmetler" },
  { label: "SSS", href: "/#sss" },
  { label: "Blog", href: "/blog" },
  { label: "İletişim", href: "#iletisim" },
] as const;
