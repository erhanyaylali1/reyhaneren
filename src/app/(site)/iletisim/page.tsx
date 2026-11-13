import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import type { ReactNode } from "react";
import { AppointmentForm } from "@/components/appointment-form";
import { JsonLd, MapLink, PageHero, WhatsAppIcon, bodyText, eyebrow, h2Class } from "@/components/page-ui";
import { site } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "İletişim ve Randevu — Reyhan Eren Aile Danışmanlığı | Bayraklı, İzmir",
  description: `Randevu ve bilgi için ${site.phone.display} numaralı telefondan arayın, WhatsApp’tan yazın ya da formu doldurun. Bayraklı, İzmir’de yüz yüze ve online aile danışmanlığı.`,
  path: "/iletisim",
});

const iconProps = {
  "aria-hidden": true,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  className: "size-6",
} as const;

type Channel = {
  label: string;
  value: string;
  note: string;
  /** Omit for an info-only card (no link). */
  href?: string;
  external?: boolean;
  icon: ReactNode;
  tone: string;
};

const channels: Channel[] = [
  {
    label: "Telefon",
    value: site.phone.display,
    note: "Arayın ya da WhatsApp’tan yazın.",
    href: site.phone.href,
    tone: "bg-sage-100 text-sage-700",
    icon: (
      <svg {...iconProps}>
        <path d="M5 4h3l2 5-2.5 1.5a11 11 0 0 0 5 5L14 13l5 2v3a2 2 0 0 1-2 2A15 15 0 0 1 3 6a2 2 0 0 1 2-2" />
      </svg>
    ),
  },
  {
    label: "E-posta",
    value: site.email,
    note: "Yazılı sorularınız için.",
    href: `mailto:${site.email}`,
    tone: "bg-mist-100 text-mist-700",
    icon: (
      <svg {...iconProps}>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3.5 6.5 8.5 6 8.5-6" />
      </svg>
    ),
  },
  {
    label: "Konum",
    value: `${site.address.locality}, ${site.address.region}`,
    note: "Yüz yüze seanslar İzmir Bayraklı’da. Konumu Google Haritalar’da görün.",
    href: site.address.maps,
    external: true,
    tone: "bg-clay-100 text-clay-700",
    icon: (
      <svg {...iconProps}>
        <path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21Z" />
        <circle cx="12" cy="9.5" r="2.5" />
      </svg>
    ),
  },
];

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          url: `${site.url}/iletisim`,
          about: { "@id": `${site.url}/#clinic` },
        }}
      />

      <PageHero
        crumbs={[{ name: "İletişim", href: "/iletisim" }]}
        kicker="İletişim · Bayraklı, İzmir ve online"
        title="İletişim ve randevu"
        lead={
          <p>
            Size en kolay gelen yoldan ulaşın; başvuru konunuzu dinleyip
            seanslarınızın planlamasını birlikte yapalım.
          </p>
        }
      >
        {/* Primary conversion: one tap to a WhatsApp chat on phones. */}
        <a
          href={site.whatsapp.href}
          target="_blank"
          rel="noopener noreferrer"
          className="group mt-10 inline-flex min-h-14 w-full items-center justify-center gap-3 rounded-full bg-sage-700 px-8 text-lg font-medium text-canvas transition-colors duration-150 hover:bg-sage-800 active:bg-ink sm:w-auto"
        >
          <WhatsAppIcon className="size-6" />
          WhatsApp’tan sohbet başlatın
          <span className="sr-only"> (yeni sekmede açılır)</span>
        </a>
      </PageHero>

      <section className="border-t border-line bg-surface">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 md:py-20">
          <ul className="grid gap-5 md:grid-cols-3">
            {channels.map((c) => {
              const body = (
                <>
                  <span className={`inline-flex size-12 items-center justify-center rounded-2xl ${c.tone}`}>
                    {c.icon}
                  </span>
                  <span className="mt-7 text-sm text-ink-muted">{c.label}</span>
                  <span className={`mt-1 break-all font-serif text-[1.375rem] leading-snug text-ink tabular-nums decoration-line-strong underline-offset-4 ${c.href ? "group-hover:underline" : ""}`}>
                    {c.value}
                  </span>
                  <span className="mt-3 text-[0.9375rem] leading-relaxed text-ink-muted">{c.note}</span>
                  {c.external && <span className="sr-only"> (yeni sekmede açılır)</span>}
                </>
              );
              const card = "group flex h-full flex-col rounded-3xl border border-line bg-canvas p-7";
              return (
                <li key={c.label}>
                  {c.href ? (
                    <a
                      href={c.href}
                      {...(c.external && { target: "_blank", rel: "noopener noreferrer" })}
                      className={`${card} transition-colors duration-150 hover:border-line-strong`}
                    >
                      {body}
                    </a>
                  ) : (
                    <div className={card}>{body}</div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section id="randevu" aria-labelledby="randevu-baslik" className="border-t border-line bg-sage-50">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 py-20 sm:px-8 md:py-24 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <p className={eyebrow}>Randevu formu</p>
            <h2 id="randevu-baslik" className={`mt-4 ${h2Class}`}>
              Randevu talebi
            </h2>
            <p className={`mt-5 ${bodyText}`}>
              Formu doldurun, danışmanlık hizmetleri ile ilgili size ulaşalım ve
              seanslarınızın uygun planlamasını beraber yapalım.
            </p>
            <dl className="mt-10 grid grid-cols-2 gap-6 border-t border-line-strong pt-6">
              <div>
                <dt className="font-serif text-xl text-ink">Yüz yüze</dt>
                <dd className="mt-1 text-sm text-ink-muted">
                  <MapLink />
                </dd>
              </div>
              <div>
                <dt className="font-serif text-xl text-ink">Online</dt>
                <dd className="mt-1 text-sm text-ink-muted">Türkiye’nin her yerinden</dd>
              </div>
            </dl>
          </div>
          <div className="lg:col-span-7">
            <AppointmentForm />
          </div>
        </div>
      </section>
    </>
  );
}
