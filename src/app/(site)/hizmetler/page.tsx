import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import Link from "next/link";
import { ArrowIcon, CtaBand, PageHero } from "@/components/page-ui";
import { ServiceMark } from "@/components/service-mark";
import { onlinePage, servicePages } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Hizmetler — İzmir Aile Danışmanlığı ve Çift Terapisi | Reyhan Eren",
  description:
    "Bireysel danışmanlık, çift terapisi, aile danışmanlığı ve kurumsal danışmanlık. İzmir Bayraklı’da yüz yüze, Türkiye genelinde online seanslar.",
  path: "/hizmetler",
});


export default function ServicesPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Hizmetler", href: "/hizmetler" }]}
        kicker="Hizmetler · Bayraklı ve online"
        title="Aile danışmanlığı ve çift terapisi hizmetleri"
        lead={
          <p>
            İlişki odaklı bireysel görüşmelerden çift ve aile seanslarına kadar her
            süreci ihtiyacınıza göre birlikte şekillendiriyoruz. Hangisinin size
            uygun olduğundan emin değilseniz randevu formunu doldurun, birlikte
            planlayalım.
          </p>
        }
      />

      <section className="border-t border-line bg-surface">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 md:py-24">
          <ul className="grid gap-5 sm:grid-cols-2 md:gap-6">
            {servicePages.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/hizmetler/${s.slug}`}
                  className="group flex h-full flex-col rounded-3xl border border-line bg-canvas p-7 transition-colors duration-150 hover:border-line-strong sm:p-8"
                >
                  <ServiceMark slug={s.slug} />
                  <h2 className="mt-8 text-xl font-semibold tracking-[-0.01em] text-ink">{s.title}</h2>
                  <p className="mt-3 flex-1 leading-relaxed text-ink-muted">{s.short}</p>
                  <span className="mt-6 inline-flex items-center gap-1.5 text-[0.9375rem] font-medium text-sage-700">
                    Detaylı bilgi <ArrowIcon />
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          {/* Online is a way of meeting, offered for every service above. */}
          <Link
            href={`/hizmetler/${onlinePage.slug}`}
            className="group mt-6 flex flex-col gap-5 rounded-3xl border border-line bg-sage-50 p-7 transition-colors duration-150 hover:border-line-strong sm:flex-row sm:items-center sm:p-8"
          >
            <ServiceMark slug={onlinePage.slug} />
            <span className="flex-1">
              <span className="block text-xl font-semibold tracking-[-0.01em] text-ink">
                Tüm hizmetler online olarak da sunulur
              </span>
              <span className="mt-1.5 block leading-relaxed text-ink-muted">
                Türkiye’nin ve dünyanın her yerinden, güvenli görüntülü görüşmeyle.
              </span>
            </span>
            <span className="inline-flex items-center gap-1.5 text-[0.9375rem] font-medium text-sage-700">
              Online görüşmeler nasıl işler? <ArrowIcon />
            </span>
          </Link>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
