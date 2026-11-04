import type { Metadata } from "next";
import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { AppointmentForm } from "@/components/appointment-form";
import { HeroLine } from "@/components/hero-line";
import { WhatsAppIcon } from "@/components/page-ui";
import { credentials, steps } from "@/lib/content";
import { servicePages, site, type ServiceSlug } from "@/lib/site";

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

// Titles and URLs come from servicePages (lib/site) so the home cards, the
// service pages and the appointment form always use the same four names.
type Service = {
  slug: ServiceSlug;
  lead: string;
  body: string;
  tone: string;
  icon: ReactNode;
};

const services: Service[] = [
  {
    slug: "bireysel-danismanlik",
    lead: "Duygusal ihtiyaçlarınızı keşfedin.",
    body: "Aile ve ilişki içinde yaşadığınız zorlanmaları bireysel seanslarda ele alıyor, kendinizi ve ihtiyaçlarınızı daha net görmenize destek oluyoruz.",
    tone: "bg-sage-100 text-sage-700",
    icon: (
      <svg {...iconProps}>
        <circle cx="12" cy="8" r="3.5" />
        <path d="M5 20c.8-3.6 3.6-6 7-6s6.2 2.4 7 6" />
      </svg>
    ),
  },
  {
    slug: "cift-terapisi",
    lead: "Sağlıklı bir ilişki için adım atın.",
    body: "İletişim kopukluğu, güven sorunları ya da tekrar eden çatışmalar için çift odaklı seanslarla birbirinizi yeniden duymanın yolunu birlikte arıyoruz.",
    tone: "bg-clay-100 text-clay-700",
    icon: (
      <svg {...iconProps}>
        <circle cx="8.5" cy="8.5" r="3" />
        <circle cx="15.5" cy="8.5" r="3" />
        <path d="M3 19c.6-3 2.8-5 5.5-5 1.4 0 2.6.5 3.5 1.4.9-.9 2.1-1.4 3.5-1.4 2.7 0 4.9 2 5.5 5" />
      </svg>
    ),
  },
  {
    slug: "aile-danismanligi",
    lead: "Aile dinamiklerinizi yeniden yapılandırın.",
    body: "Ebeveyn–çocuk ilişkileri, ergenlik dönemi ve aile içi roller üzerine çalışarak evdeki iletişimi daha sakin ve dengeli bir zemine taşıyoruz.",
    tone: "bg-mist-100 text-mist-700",
    icon: (
      <svg {...iconProps}>
        <path d="M3.5 11 12 4l8.5 7" />
        <path d="M5.5 9.5V20h13V9.5" />
        <path d="M10 20v-5h4v5" />
      </svg>
    ),
  },
  {
    slug: "kurumsal-danismanlik",
    lead: "Güçlü ekip ilişkileri için.",
    body: "Kurumlara yönelik çalışmalarla iş yerindeki iletişimi güçlendiriyor, daha tatmin edici bir çalışma deneyimine katkı sağlıyoruz.",
    tone: "bg-sand-100 text-sand-700",
    icon: (
      <svg {...iconProps}>
        <rect x="3.5" y="7.5" width="17" height="12" rx="2" />
        <path d="M9 7.5V6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v1.5M3.5 12.5h17" />
      </svg>
    ),
  },
];

// Single source for both the visible accordion and the FAQPage JSON-LD —
// Google requires the structured answers to match the on-page text.
const faqs = [
  {
    q: "İzmir Bayraklı’da yüz yüze ve online çift terapisi seansları nasıl işliyor?",
    a: "Yüz yüze görüşmeler İzmir Bayraklı’da, sessiz ve gizliliğin tam korunduğu bir ortamda 50–60 dakika olarak gerçekleştirilir. Şehir dışında veya yurt dışında yaşayan danışanlarımız için ise güvenli görüntülü görüşme altyapısıyla online aile danışmanlığı ve çift terapisi sunulmaktadır.",
  },
  {
    q: "Çift terapisine eşim veya partnerim olmadan tek başıma başvurabilir miyim?",
    a: "Evet. Partneriniz henüz hazır değilse ya da katılmak istemiyorsa sürece bireysel görüşmelerle başlayabilirsiniz. İlişkideki kendi payınızı, ihtiyaçlarınızı ve iletişim biçiminizi ele almak çoğu zaman ilişkinin tamamına olumlu yansır; uygun olduğunda partnerinizin de katılımıyla ortak seanslara geçilebilir.",
  },
  {
    q: "Aile danışmanlığı ve çift terapisi süreci kaç seans sürer?",
    a: "Seans sayısı, başvuru konusuna, ilişkinin dinamiklerine ve belirlenen hedeflere göre kişiden kişiye değişir. İlk görüşmenin ardından ihtiyaçlarınızı birlikte değerlendirerek size uygun bir yol haritası ve seans sıklığı belirliyor, süreç boyunca ilerlemeyi düzenli olarak gözden geçiriyoruz.",
  },
  {
    q: "Görüşmelerde paylaştıklarım gizli kalır mı?",
    a: "Evet. Seanslarda paylaşılan her bilgi mesleki etik ilkeleri çerçevesinde gizli tutulur ve sizin onayınız olmadan üçüncü kişilerle paylaşılmaz. Çift seanslarında da her iki tarafın güvenle konuşabileceği dengeli bir ortam gözetilir.",
  },
  {
    q: "Randevu almak için ne yapmalıyım?",
    a: `Sayfanın altındaki randevu formunu doldurabilir ya da ${site.phone.display} numaralı telefondan arayabilirsiniz. Size ulaştığımızda başvuru konunuzu dinleyip seanslarınızın planlamasını birlikte yapıyoruz.`,
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

const sessionFormats = [
  {
    label: "Yüz yüze",
    detail: `${site.address.locality}, ${site.address.region}`,
  },
  { label: "Online", detail: "Türkiye’nin her yerinden" },
  { label: "Bireysel · Çift · Aile", detail: "İlişki odaklı seanslar" },
];

function ArrowIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-4 transition-transform duration-150 ease-out group-hover:translate-x-0.5"
    >
      <path d="M4 10h12M11 5l5 5-5 5" />
    </svg>
  );
}

const eyebrow =
  "text-xs font-medium uppercase tracking-[0.18em] text-ink-muted";
const primaryCta =
  "group inline-flex min-h-13 items-center justify-center gap-2 rounded-full bg-sage-700 px-7 text-base font-medium text-canvas transition-colors duration-150 hover:bg-sage-800 active:bg-ink";
const secondaryCta =
  "inline-flex min-h-13 items-center justify-center rounded-full border border-line-strong px-7 text-base font-medium text-ink transition-colors duration-150 hover:border-ink hover:bg-surface";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      {/* ───────────── Hero ───────────── */}
      <section
        aria-labelledby="hero-baslik"
        className="relative mx-auto max-w-6xl px-5 pb-20 pt-12 sm:px-8 md:pb-28 md:pt-20"
      >
        <HeroLine className="absolute right-8 top-8 hidden h-[30rem] w-auto lg:block xl:right-4" />
        <div className="max-w-3xl">
          <p className="flex items-center gap-2.5 text-sm font-medium text-ink-muted">
            <span
              aria-hidden="true"
              className="size-1.5 rounded-full bg-sage-700"
            />
            Bayraklı, İzmir · Online tüm Türkiye
          </p>

          <h1
            id="hero-baslik"
            className="mt-6 font-serif text-[2.5rem] leading-[1.08] tracking-[-0.02em] text-ink text-balance sm:text-5xl md:text-[3.75rem]"
          >
            İzmir’de aile danışmanlığı ve çift terapisi
            <span className="block italic text-sage-700">
              daha huzurlu ilişkiler için
            </span>
          </h1>

          <p className="mt-7 max-w-[34rem] text-lg leading-relaxed text-ink-muted text-pretty">
            Aile Danışmanı {site.person} ile tarafsız ve güvenli bir ortamda
            ilişkilerinizdeki tekrar eden döngüleri fark edin. Kendinize ve
            ilişkinize yeni bir yerden bakarken çözümleri birlikte arayalım.
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
            <a href="#randevu" className={primaryCta}>
              Randevu Al
              <ArrowIcon />
            </a>
            <Link href="/hizmetler" className={secondaryCta}>
              Hizmetleri inceleyin
            </Link>
          </div>

          {/* Session formats: lets visitors self-select before they call. */}
          <dl className="mt-12 grid max-w-2xl grid-cols-2 gap-6 border-t border-line pt-6 sm:grid-cols-[auto_auto_1fr] sm:gap-x-10">
            {sessionFormats.map((f) => (
              <div key={f.label}>
                <dt className="font-serif text-xl text-ink">{f.label}</dt>
                <dd className="mt-1 text-sm text-ink-muted">{f.detail}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ───────────── Hakkımda ───────────── */}
      <section
        id="hakkimda"
        aria-labelledby="hakkimda-baslik"
        className="border-t border-line bg-surface"
      >
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-20 sm:px-8 md:py-28 lg:grid-cols-12 lg:gap-16">
          {/* Counsellor card: face + name + title read as one unit, which
              builds trust better than a large standalone photo. Side-by-side
              on mobile so the bio stays near the fold; stacked on desktop. */}
          <figure className="flex items-end gap-5 sm:gap-6 lg:col-span-4 lg:block">
            <Image
              src="/reyhan-eren-aile-danismani-izmir.jpg"
              width={1200}
              height={1500}
              alt="İzmir aile danışmanı Reyhan Eren’in portresi"
              sizes="(min-width: 1152px) 352px, (min-width: 1024px) 30vw, (min-width: 640px) 224px, 176px"
              className="aspect-[4/5] w-44 shrink-0 rounded-2xl bg-sand-100 object-cover object-top sm:w-56 lg:w-full lg:rounded-3xl"
            />
            <figcaption className="pb-1 lg:mt-6 lg:flex lg:items-baseline lg:justify-between lg:gap-4 lg:pb-0">
              <span className="block">
                <span className="block font-serif text-2xl leading-tight text-ink">
                  {site.person}
                </span>
                <span className="mt-1.5 block text-xs font-medium uppercase tracking-[0.18em] text-ink-muted">
                  {site.title}
                </span>
              </span>
              <span className="mt-4 flex items-center gap-2 text-sm text-ink-muted lg:mt-0">
                <span
                  aria-hidden="true"
                  className="size-1.5 rounded-full bg-sage-700"
                />
                {site.address.locality}, {site.address.region}
              </span>
            </figcaption>
          </figure>

          <div className="lg:col-span-8 lg:pt-4">
            <p className={eyebrow}>Hakkımda</p>
            <h2
              id="hakkimda-baslik"
              className="mt-4 font-serif text-[2rem] leading-[1.15] tracking-[-0.015em] text-ink text-balance md:text-[2.75rem]"
            >
              İzmir Aile Danışmanı Reyhan Eren
            </h2>

            <div className="mt-6 max-w-[38rem] space-y-5 text-lg leading-relaxed text-ink-muted text-pretty">
              <p>
                Reyhan Eren, Akdeniz Üniversitesi Sosyoloji bölümünden 2022
                yılında yüksek onur derecesiyle mezun olmuştur. Lisans döneminde
                ilişkilerin gelişimine ve aile oluşumuna duyduğu merakla tezini
                Dijital Flört Kültürü üzerine yapmıştır.
              </p>
              <p>
                2025 itibarıyla Marmara Üniversitesi Aile Danışmanlığı eğitimini
                başarıyla tamamlayarak Aile Danışmanı unvanını almıştır. İzmir
                Bayraklı’da yüz yüze ve tüm Türkiye’ye online danışmanlık
                sunmaktadır.
              </p>
            </div>

            <h3 className="mt-12 text-lg font-semibold text-ink">
              Eğitim ve uzmanlık
            </h3>
            <ol className="mt-4 divide-y divide-line border-y border-line">
              {credentials.map((c) => (
                <li
                  key={c.year}
                  className="grid grid-cols-[4.5rem_1fr] gap-x-4 py-5 sm:grid-cols-[5.5rem_1fr]"
                >
                  <span className="font-serif text-xl text-sage-700 tabular-nums">
                    {c.year}
                  </span>
                  <div>
                    <p className="font-medium text-ink">
                      {c.institution}
                      <span className="text-ink-muted"> · </span>
                      {c.title}
                    </p>
                    <p className="mt-1 text-[0.9375rem] text-ink-muted">
                      {c.note}
                    </p>
                  </div>
                </li>
              ))}
            </ol>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
              <a href="#randevu" className={`${primaryCta} w-full sm:w-auto`}>
                Reyhan Eren’den randevu alın
                <ArrowIcon />
              </a>
              <Link
                href="/hakkimda"
                className={`${secondaryCta} w-full sm:w-auto`}
              >
                Yaklaşımım ve eğitimim
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────── Hizmetler ───────────── */}
      <section
        id="hizmetler"
        aria-labelledby="hizmetler-baslik"
        className="border-t border-line"
      >
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 md:py-28">
          <div className="max-w-2xl">
            <p className={eyebrow}>Hizmetler</p>
            <h2
              id="hizmetler-baslik"
              className="mt-4 font-serif text-[2rem] leading-[1.15] tracking-[-0.015em] text-ink text-balance md:text-[2.75rem]"
            >
              İzmir’de aile danışmanlığı ve çift terapisi hizmetleri
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-ink-muted text-pretty">
              İlişki odaklı bireysel görüşmelerden çift ve aile seanslarına kadar her
              süreci ihtiyacınıza göre birlikte şekillendiriyoruz. Hangisinin size
              uygun olduğundan emin değilseniz randevu formunu doldurun, birlikte
              planlayalım.
              Tüm hizmetler{" "}
              <Link
                href="/hizmetler/online-danismanlik"
                className="text-ink underline decoration-line-strong underline-offset-4 transition-colors duration-150 hover:decoration-ink"
              >
                online olarak da
              </Link>{" "}
              sunulmaktadır.
            </p>
          </div>

          <ul className="mt-14 grid gap-5 sm:grid-cols-2 md:mt-16 md:gap-6">
            {services.map((s) => ({ ...s, ...servicePages.find((p) => p.slug === s.slug)! })).map((s) => (
              <li
                key={s.slug}
                className="group relative flex flex-col rounded-3xl border border-line bg-surface p-7 transition-colors duration-150 hover:border-line-strong sm:p-8"
              >
                <span
                  className={`inline-flex size-12 items-center justify-center rounded-2xl ${s.tone}`}
                >
                  {s.icon}
                </span>
                <h3 className="mt-8 text-xl font-semibold tracking-[-0.01em] text-ink">
                  <Link
                    href={`/hizmetler/${s.slug}`}
                    className="after:absolute after:inset-0 after:rounded-3xl"
                  >
                    {s.title}
                  </Link>
                </h3>
                <p className="mt-2 font-serif text-lg italic text-ink">
                  {s.lead}
                </p>
                <p className="mt-4 flex-1 leading-relaxed text-ink-muted">
                  {s.body}
                </p>
                <span className="mt-6 inline-flex items-center gap-1.5 text-[0.9375rem] font-medium text-sage-700">
                  Detaylı bilgi
                  <ArrowIcon />
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ───────────── Süreç ───────────── */}
      <section
        id="surec"
        aria-labelledby="surec-baslik"
        className="border-t border-line bg-surface"
      >
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 md:py-28">
          <div className="max-w-2xl">
            <p className={eyebrow}>
              Adım adım yaklaşım · Şeffaf ve güvenilir süreç
            </p>
            <h2
              id="surec-baslik"
              className="mt-4 font-serif text-[2rem] leading-[1.15] tracking-[-0.015em] text-ink text-balance md:text-[2.75rem]"
            >
              İzmir çift terapisi ve aile danışmanlığı süreci nasıl ilerler?
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-ink-muted text-pretty">
              Her ilişkinin dinamiği kendine özgüdür. Sosyolojik perspektif ve
              sistemik aile danışmanlığı ilkeleriyle yapılandırılan
              görüşmelerimiz üç temel aşamada ilerler.
            </p>
          </div>

          <ol className="mt-14 grid gap-12 md:mt-16 md:grid-cols-3 md:gap-10">
            {steps.map((step, i) => (
              <li key={step.title} className="border-t border-line-strong pt-6">
                <span
                  aria-hidden="true"
                  className="font-serif text-[2.75rem] leading-none text-sage-700 tabular-nums"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-6 text-xl font-semibold tracking-[-0.01em] text-ink text-balance">
                  <span className="sr-only">{i + 1}. adım: </span>
                  {step.title}
                </h3>
                <p className="mt-3 leading-relaxed text-ink-muted text-pretty">
                  {step.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ───────────── SSS ───────────── */}
      <section
        id="sss"
        aria-labelledby="sss-baslik"
        className="border-t border-line"
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c"),
          }}
        />
        <div className="mx-auto grid max-w-6xl gap-12 px-5 py-20 sm:px-8 md:py-28 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <p className={eyebrow}>Merak edilenler · İzmir aile danışmanlığı</p>
            <h2
              id="sss-baslik"
              className="mt-4 font-serif text-[2rem] leading-[1.15] tracking-[-0.015em] text-ink text-balance md:text-[2.75rem]"
            >
              Sıkça sorulan sorular
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-ink-muted text-pretty">
              İzmir Bayraklı yüz yüze görüşmelerimiz ve online terapi
              seanslarımız hakkında danışanlarımızın en sık yönelttiği sorular.
            </p>
          </div>

          {/* Native <details>: keyboard + screen-reader support with zero JS,
              and the answers stay in the HTML for crawlers. A shared `name`
              makes it an exclusive accordion — opening one closes the rest. */}
          <div className="divide-y divide-line border-y border-line lg:col-span-8">
            {faqs.map((f, i) => (
              <details key={f.q} name="sss" open={i === 0} className="group">
                <summary className="-mx-4 flex min-h-11 cursor-pointer list-none items-start justify-between gap-6 rounded-2xl px-4 py-6 text-left focus-visible:outline-offset-0 [&::-webkit-details-marker]:hidden">
                  <h3 className="text-lg font-medium leading-snug text-ink text-pretty">
                    {f.q}
                  </h3>
                  <span
                    aria-hidden="true"
                    className="relative mt-0.5 inline-flex size-7 shrink-0 items-center justify-center rounded-full border border-line-strong text-ink transition-colors duration-150 group-hover:border-ink group-open:border-sage-700 group-open:bg-sage-700 group-open:text-canvas"
                  >
                    <span className="absolute h-px w-3 bg-current" />
                    <span className="absolute h-3 w-px bg-current transition-transform duration-200 ease-out group-open:rotate-90" />
                  </span>
                </summary>
                <p className="max-w-[42rem] pb-7 pr-12 leading-relaxed text-ink-muted text-pretty">
                  {f.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────── Randevu formu ───────────── */}
      <section
        id="randevu"
        aria-labelledby="randevu-baslik"
        className="border-t border-line bg-sage-50"
      >
        <div className="mx-auto grid max-w-6xl gap-12 px-5 py-20 sm:px-8 md:py-28 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <p className={eyebrow}>Randevu · Bayraklı ve online</p>
            <h2
              id="randevu-baslik"
              className="mt-4 font-serif text-[2rem] leading-[1.15] tracking-[-0.015em] text-ink text-balance md:text-[2.75rem]"
            >
              Randevu talebi
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-ink-muted text-pretty">
              Formu doldurun, danışmanlık hizmetleri ile ilgili size ulaşalım ve
              seanslarınızın uygun planlamasını beraber yapalım.
            </p>

            <div className="mt-10 border-t border-line-strong pt-6">
              <p className="text-sm text-ink-muted">
                Dilerseniz doğrudan WhatsApp’tan yazın
              </p>
              <a
                href={site.whatsapp.href}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 inline-flex min-h-11 items-center gap-3 font-serif text-[1.75rem] tracking-[-0.01em] text-ink tabular-nums underline decoration-transparent underline-offset-4 transition-colors duration-150 hover:decoration-ink"
              >
                <WhatsAppIcon className="size-6 shrink-0 text-sage-700" />
                {site.phone.display}
                <span className="sr-only"> (WhatsApp, yeni sekmede açılır)</span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-7">
            <AppointmentForm />
          </div>
        </div>
      </section>
    </>
  );
}
