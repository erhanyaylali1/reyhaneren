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
    "İzmir Bayraklı’da yüz yüze ve Türkiye genelinde online aile danışmanlığı ve çift terapisi. Aile Danışmanı Reyhan Eren ile güvenli, yargısız ve tarafsız seanslarda ilişkilerinizdeki döngüleri keşfedin. ☎ 0541 162 08 27",
  phone: {
    display: "0541 162 08 27",
    href: "tel:+905411620827",
    e164: "+905411620827",
  },
  whatsapp: {
    href: `https://wa.me/905411620827?text=${encodeURIComponent(
      "Merhaba Reyhan Hanım, danışmanlık hakkında bilgi almak ve randevu oluşturmak istiyorum."
    )}`,
  },
  email: "ailedanismanireyhaneren@gmail.com",
  address: {
    locality: "Bayraklı",
    region: "İzmir",
    country: "TR",
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

/**
 * The four services — the single source for the services pages, home cards,
 * appointment form, footer, sitemap and structured data. Order = display order.
 */
export const servicePages = [
  {
    slug: "bireysel-danismanlik",
    title: "İlişki Odaklı Bireysel Danışmanlık",
    tone: "bg-mist-100 text-mist-700",
    short:
      "İlişki ve aile yaşamındaki zorlanmalarınızı kendinizden başlayarak ele alan seanslar.",
  },
  {
    slug: "cift-terapisi",
    title: "Çift Terapisi",
    tone: "bg-clay-100 text-clay-700",
    short:
      "İletişim, güven ve tekrarlayan çatışmalar için çift odaklı seanslar.",
  },
  {
    slug: "aile-danismanligi",
    title: "Aile Danışmanlığı",
    tone: "bg-sage-100 text-sage-700",
    short:
      "Ebeveyn–çocuk ilişkileri, ergenlik ve aile içi iletişim için sistemik çalışmalar.",
  },
  {
    slug: "kurumsal-danismanlik",
    title: "Kurumsal Danışmanlık",
    tone: "bg-sand-100 text-sand-700",
    short: "Ekip içi iletişim ve iş–aile dengesi için kuruma özel çalışmalar.",
  },
] as const;

/**
 * Online is a way of meeting, not a separate service: every service above can
 * be done online. It keeps its own page (and URL) because "online aile
 * danışmanlığı" is searched for, but it is not listed among the services.
 */
export const onlinePage = {
  slug: "online-danismanlik",
  title: "Online Danışmanlık",
  tone: "bg-sage-50 text-sage-700",
  short:
    "Tüm hizmetler, Türkiye’nin ve dünyanın her yerinden güvenli görüntülü görüşmeyle.",
} as const;

export type ServiceSlug = (typeof servicePages)[number]["slug"];
/** Any page rendered with the service template (the four services + online). */
export type ServicePageSlug = ServiceSlug | typeof onlinePage.slug;
export const serviceLikePages = [...servicePages, onlinePage] as const;
