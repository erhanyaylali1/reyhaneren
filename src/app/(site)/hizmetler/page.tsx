import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import Link from "next/link";
import { ArrowIcon, CtaBand, PageHero } from "@/components/page-ui";
import { servicePages } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Hizmetler — İzmir Aile Danışmanlığı ve Çift Terapisi | Reyhan Eren",
  description:
    "Çift terapisi, aile danışmanlığı, online danışmanlık ve kurumsal danışmanlık. İzmir Bayraklı’da yüz yüze, Türkiye genelinde online seanslar.",
  path: "/hizmetler",
});

const tones = [
  "bg-clay-100 text-clay-700",
  "bg-sage-100 text-sage-700",
  "bg-mist-100 text-mist-700",
  "bg-sand-100 text-sand-700",
];

export default function ServicesPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Hizmetler", href: "/hizmetler" }]}
        kicker="Hizmetler · Bayraklı ve online"
        title="Aile danışmanlığı ve çift terapisi hizmetleri"
        lead={
          <p>
            Bireysel görüşmelerden çift terapisine, aile seanslarından online
            danışmanlığa kadar her süreci ihtiyacınıza göre şekillendiriyorum.
            Hangisinin size uygun olduğundan emin değilseniz, bunu ilk görüşmede
            birlikte belirleriz.
          </p>
        }
      />

      <section className="border-t border-line bg-surface">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 md:py-24">
          <ul className="grid gap-5 sm:grid-cols-2 md:gap-6">
            {servicePages.map((s, i) => (
              <li key={s.slug}>
                <Link
                  href={`/hizmetler/${s.slug}`}
                  className="group flex h-full flex-col rounded-3xl border border-line bg-canvas p-7 transition-colors duration-150 hover:border-line-strong sm:p-8"
                >
                  <span
                    aria-hidden="true"
                    className={`inline-flex size-12 items-center justify-center rounded-2xl font-serif text-2xl italic ${tones[i % tones.length]}`}
                  >
                    {s.title.charAt(0)}
                  </span>
                  <h2 className="mt-8 text-xl font-semibold tracking-[-0.01em] text-ink">{s.title}</h2>
                  <p className="mt-3 flex-1 leading-relaxed text-ink-muted">{s.short}</p>
                  <span className="mt-6 inline-flex items-center gap-1.5 text-[0.9375rem] font-medium text-sage-700">
                    Detaylı bilgi <ArrowIcon />
                  </span>
                </Link>
              </li>
            ))}
          </ul>

        </div>
      </section>

      <CtaBand />
    </>
  );
}
