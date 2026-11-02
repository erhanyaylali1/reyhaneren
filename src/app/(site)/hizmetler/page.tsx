import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import Link from "next/link";
import { ArrowIcon, CtaBand, PageHero, bodyText, eyebrow, h2Class } from "@/components/page-ui";
import { servicePages } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Hizmetler — İzmir Aile Danışmanlığı ve Çift Terapisi | Reyhan Eren",
  description:
    "Çift terapisi, aile danışmanlığı, online danışmanlık ve kurumsal danışmanlık. İzmir Bayraklı’da yüz yüze, Türkiye genelinde online seanslar.",
  path: "/hizmetler",
});

const tones = ["bg-clay-100 text-clay-700", "bg-sage-100 text-sage-700", "bg-mist-100 text-mist-700"];

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
          <ul className="grid gap-5 md:grid-cols-3 md:gap-6">
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

          <div className="mt-16 grid gap-8 border-t border-line pt-14 md:grid-cols-12 md:gap-12">
            <div className="md:col-span-5">
              <p className={eyebrow}>Kurumlar için</p>
              <h2 className={`mt-4 ${h2Class}`}>Kurumsal danışmanlık</h2>
            </div>
            <p className={`md:col-span-7 md:pt-8 ${bodyText}`}>
              Kurumlara yönelik çalışmalarla iş yerindeki iletişimi güçlendiriyor,
              çalışanların iş ve aile yaşamı arasındaki dengeyi gözeten, daha
              tatmin edici bir çalışma deneyimine katkı sağlıyorum. Kurumunuza
              özel bir çalışma için{" "}
              <Link href="/iletisim" className="text-ink underline decoration-line-strong underline-offset-4 transition-colors duration-150 hover:decoration-ink">
                iletişime geçebilirsiniz
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
