// Single source of truth for NAP (name/address/phone) data.
// Header, footer, metadata and JSON-LD all read from here so Google sees
// identical business details everywhere — inconsistent NAP hurts local SEO.

export const site = {
  // Live domain (Netlify). www.reyhaneren.com.tr 301s here. NOT reyhaneren.com
  // — that domain belongs to someone else (a parked lander page).
  url: "https://reyhaneren.com.tr",
  name: "Reyhan Eren Aile Danışmanlığı",
  person: "Reyhan Eren",
  title: "Aile Danışmanı",
  description:
    "İzmir Bayraklı’da yüz yüze ve Türkiye genelinde online aile danışmanlığı ve çift terapisi. Reyhan Eren ile güvenli, yargısız bir seansta ilişkinizi keşfedin. ☎ 0541 162 08 27",
  phone: {
    display: "0541 162 08 27",
    href: "tel:+905411620827",
    e164: "+905411620827",
  },
  whatsapp: {
    href: `https://wa.me/905411620827?text=${encodeURIComponent(
      "Merhaba Reyhan Hanım, danışmanlık hakkında bilgi almak ve randevu oluşturmak istiyorum.",
    )}`,
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
  { label: "Hakkımda", href: "/hakkimda" },
  { label: "Hizmetler", href: "/hizmetler" },
  { label: "Blog", href: "/blog" },
  { label: "İletişim", href: "/iletisim" },
] as const;

/** Service pages under /hizmetler. Order = order shown everywhere. */
export const servicePages = [
  {
    slug: "cift-terapisi",
    tone: "bg-clay-100 text-clay-700",
    title: "Çift Terapisi",
    short: "İletişim, güven ve tekrarlayan çatışmalar için çift odaklı seanslar.",
  },
  {
    slug: "aile-danismanligi",
    tone: "bg-sage-100 text-sage-700",
    title: "Aile Danışmanlığı",
    short: "Bireysel, ebeveyn–çocuk ve tüm aileyle yapılan sistemik çalışmalar.",
  },
  {
    slug: "online-danismanlik",
    tone: "bg-mist-100 text-mist-700",
    title: "Online Danışmanlık",
    short: "Türkiye’nin ve dünyanın her yerinden güvenli görüntülü seanslar.",
  },
  {
    slug: "kurumsal-danismanlik",
    tone: "bg-sand-100 text-sand-700",
    title: "Kurumsal Danışmanlık",
    short: "Ekip içi iletişim ve iş–aile dengesi için kuruma özel çalışmalar.",
  },
] as const;

export type ServiceSlug = (typeof servicePages)[number]["slug"];
