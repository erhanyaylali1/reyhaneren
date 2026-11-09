import Link from "next/link";
import { ArrowIcon, WhatsAppIcon } from "@/components/page-ui";
import { ServiceMark } from "@/components/service-mark";
import { servicePages, site } from "@/lib/site";

const SLUGS = ["bireysel-danismanlik", "cift-terapisi", "aile-danismanligi"] as const;

// End-of-article bridge from reading to the service pages (internal linking)
// and to booking.
export function RelatedServices() {
  const services = servicePages.filter((s) => (SLUGS as readonly string[]).includes(s.slug));
  return (
    <section aria-labelledby="ilgili-hizmetler">
      <h2
        id="ilgili-hizmetler"
        className="font-serif text-[1.75rem] leading-snug text-ink text-balance sm:text-[2rem]"
      >
        Bu konuda destek almak ister misiniz?
      </h2>
      <p className="mt-3 max-w-xl leading-relaxed text-ink-muted text-pretty">
        Bayraklı’da yüz yüze ya da Türkiye’nin her yerinden online görüşmelerle
        size eşlik edebilirim.
      </p>
      <ul className="mt-7 grid gap-4 sm:grid-cols-3">
        {services.map((s) => (
          <li key={s.slug}>
            <Link
              href={`/hizmetler/${s.slug}`}
              className="group flex h-full flex-col rounded-2xl border border-line bg-surface p-5 transition-colors duration-150 hover:border-line-strong"
            >
              <ServiceMark slug={s.slug} />
              <span className="mt-5 font-semibold tracking-[-0.01em] text-ink">{s.title}</span>
              <span className="mt-1.5 flex-1 text-[0.9375rem] leading-relaxed text-ink-muted">
                {s.short}
              </span>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-sage-700">
                Detaylı bilgi <ArrowIcon />
              </span>
            </Link>
          </li>
        ))}
      </ul>
      <div className="mt-7 flex flex-col gap-3 sm:flex-row">
        <Link
          href="/iletisim#randevu"
          className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-sage-700 px-6 font-medium text-canvas transition-colors duration-150 hover:bg-sage-800 active:bg-ink"
        >
          Randevu Al
          <ArrowIcon />
        </Link>
        <a
          href={site.whatsapp.href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-line-strong px-6 font-medium text-ink transition-colors duration-150 hover:border-ink hover:bg-surface"
        >
          <WhatsAppIcon className="size-5 text-sage-700" />
          WhatsApp’tan yazın
          <span className="sr-only"> (yeni sekmede açılır)</span>
        </a>
      </div>
    </section>
  );
}
