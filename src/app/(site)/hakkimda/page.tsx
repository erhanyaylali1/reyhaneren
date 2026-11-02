import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import Image from "next/image";
import Link from "next/link";
import { ArrowIcon, CtaBand, JsonLd, PageHero, bodyText, eyebrow, h2Class, primaryCta } from "@/components/page-ui";
import { credentials } from "@/lib/content";
import { site } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Hakkımda — Aile Danışmanı Reyhan Eren | İzmir Bayraklı",
  description:
    "Aile Danışmanı Reyhan Eren: Akdeniz Üniversitesi Sosyoloji (yüksek onur), Marmara Üniversitesi Aile Danışmanlığı eğitimi. Sistemik yaklaşımla İzmir Bayraklı’da ve online danışmanlık.",
  path: "/hakkimda",
  type: "profile",
});

const principles = [
  {
    title: "Yargısız bir alan",
    body: "Görüşmelerde kimin haklı olduğunu değil, ilişkide neyin zorlandığını anlamaya çalışırız. Her bakış açısı aynı özenle dinlenir.",
  },
  {
    title: "Gizlilik",
    body: "Seanslarda paylaşılan her bilgi mesleki etik ilkeleri çerçevesinde gizli tutulur ve onayınız olmadan kimseyle paylaşılmaz.",
  },
  {
    title: "Şeffaf süreç",
    body: "Hedefleri birlikte belirler, ilerlemeyi düzenli olarak birlikte gözden geçiririz. Sürecin neresinde olduğunuzu her zaman bilirsiniz.",
  },
  {
    title: "Bağlamı görmek",
    body: "İnsanı, içinde yaşadığı aile ve toplumsal koşullardan bağımsız düşünmeyiz; sorunu bu bağlamın içinde anlamaya çalışırız.",
  },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ProfilePage",
          url: `${site.url}/hakkimda`,
          mainEntity: { "@id": `${site.url}/#reyhan-eren` },
        }}
      />

      <PageHero
        crumbs={[{ name: "Hakkımda", href: "/hakkimda" }]}
        kicker="Hakkımda · Aile Danışmanı"
        title="Reyhan Eren"
        accent="ilişkilere sosyolojik ve sistemik bir bakış"
        lead={
          <p>
            İzmir Bayraklı’da yüz yüze, Türkiye genelinde online olarak aile
            danışmanlığı ve çift terapisi sunuyorum. İnsanların birbirine nasıl
            bağlandığını anlamaya duyduğum merak, beni sosyolojiden aile
            danışmanlığına taşıdı.
          </p>
        }
      />

      {/* ─── Story ─── */}
      <section className="border-t border-line bg-surface">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 py-20 sm:px-8 md:py-24 lg:grid-cols-12 lg:gap-16">
          <figure className="lg:col-span-5">
            <Image
              src="/reyhan-eren-aile-danismani-izmir.jpg"
              width={1200}
              height={1500}
              alt="Aile Danışmanı Reyhan Eren’in portresi"
              sizes="(min-width: 1152px) 448px, (min-width: 1024px) 38vw, 100vw"
              loading="eager"
              fetchPriority="high"
              className="aspect-[4/5] w-full rounded-3xl bg-sand-100 object-cover object-top"
            />
            <figcaption className="mt-5 flex items-baseline justify-between gap-4">
              <span>
                <span className="block font-serif text-2xl text-ink">{site.person}</span>
                <span className="mt-1 block text-xs font-medium uppercase tracking-[0.18em] text-ink-muted">
                  {site.title}
                </span>
              </span>
              <span className="flex items-center gap-2 text-sm text-ink-muted">
                <span aria-hidden="true" className="size-1.5 rounded-full bg-sage-700" />
                {site.address.locality}, {site.address.region}
              </span>
            </figcaption>
          </figure>

          <div className="lg:col-span-7 lg:pt-2">
            <h2 className={h2Class}>Sosyolojiden aile danışmanlığına</h2>
            <div className={`mt-6 space-y-5 ${bodyText}`}>
              <p>
                Akdeniz Üniversitesi Sosyoloji bölümünden 2022 yılında yüksek onur
                derecesiyle mezun oldum. Lisans eğitimim boyunca ilişkilerin nasıl
                kurulduğu ve ailelerin nasıl oluştuğu üzerine düşündüm; bitirme
                tezimi de bu merakla <em>Flört Kültürü</em> üzerine yazdım.
              </p>
              <p>
                Ardından Marmara Üniversitesi’nde Aile Danışmanlığı eğitimini
                tamamlayarak 2025 yılında Aile Danışmanı unvanını aldım. Bugün bu
                iki alanı bir araya getiriyorum: bir ilişkide yaşananları, o
                ilişkinin içinde bulunduğu aile ve toplumsal koşullarla birlikte
                anlamaya çalışıyorum.
              </p>
            </div>

            <h3 className="mt-14 text-lg font-semibold text-ink">Eğitim ve uzmanlık</h3>
            <ol className="mt-4 divide-y divide-line border-y border-line">
              {credentials.map((c) => (
                <li key={c.year} className="grid grid-cols-[4.5rem_1fr] gap-x-4 py-5 sm:grid-cols-[5.5rem_1fr]">
                  <span className="font-serif text-xl text-sage-700 tabular-nums">{c.year}</span>
                  <div>
                    <p className="font-medium text-ink">
                      {c.institution}
                      <span className="text-ink-muted"> · </span>
                      {c.title}
                    </p>
                    <p className="mt-1 text-[0.9375rem] text-ink-muted">{c.note}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ─── Approach ─── */}
      <section className="border-t border-line">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 py-20 sm:px-8 md:py-24 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <p className={eyebrow}>Yaklaşımım</p>
            <h2 className={`mt-4 ${h2Class}`}>Sistemik yaklaşım: sorunu ilişkinin içinde görmek</h2>
          </div>
          <div className={`space-y-5 lg:col-span-7 lg:pt-8 ${bodyText}`}>
            <p>
              Sistemik yaklaşımda bir aile ya da çift, parçalarının toplamından
              fazlası olan bir bütün olarak ele alınır. Bir kişinin yaşadığı
              zorluk çoğu zaman tek başına onun “sorunu” değil; ilişkideki
              karşılıklı tepkilerin, tekrar eden döngülerin ve söylenemeyen
              ihtiyaçların bir yansımasıdır.
            </p>
            <p>
              Bu bakış, suçlamanın yerini merakın almasını sağlar. Seanslarda
              “kim haklı?” sorusu yerine “aramızda ne oluyor ve bunu nasıl
              değiştirebiliriz?” sorusuna odaklanırız. Sosyoloji eğitimim de bu
              resme kuşaklar arası aktarılan alışkanlıkları, toplumsal beklentileri
              ve gündelik hayatın baskılarını ekler.
            </p>
          </div>

          <ul className="grid gap-5 sm:grid-cols-2 lg:col-span-12 lg:grid-cols-4">
            {principles.map((p) => (
              <li key={p.title} className="rounded-3xl border border-line bg-surface p-7">
                <h3 className="text-lg font-semibold tracking-[-0.01em] text-ink">{p.title}</h3>
                <p className="mt-3 leading-relaxed text-ink-muted text-pretty">{p.body}</p>
              </li>
            ))}
          </ul>

          <div className="lg:col-span-12">
            <Link href="/hizmetler" className={primaryCta}>
              Hizmetleri inceleyin
              <ArrowIcon />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Verified profiles (E-E-A-T trust section) ─── */}
      <section aria-labelledby="platformlar" className="border-t border-line bg-surface">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 md:py-20">
          <div className="grid gap-8 rounded-3xl border border-line bg-canvas p-6 sm:p-10 lg:grid-cols-12 lg:items-center lg:gap-14">
            <div className="lg:col-span-5">
              <p className={eyebrow}>Bağlantılı platformlar</p>
              <h2
                id="platformlar"
                className="mt-3 font-serif text-[1.75rem] leading-snug tracking-[-0.01em] text-ink text-balance"
              >
                Danışan değerlendirmeleri için profillerim
              </h2>
              <p className="mt-3 max-w-md leading-relaxed text-ink-muted">
                Uzman profillerimi ve danışan yorumlarını bağımsız platformlarda da
                inceleyebilirsiniz.
              </p>
            </div>

            <ul className="space-y-1 lg:col-span-7">
              {site.platforms.map((p, i) => (
                <li key={p.href}>
                  <a
                    href={p.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group -mx-3 flex min-h-16 items-center gap-4 rounded-2xl px-3 py-3 transition-colors duration-150 hover:bg-surface"
                  >
                    <span
                      aria-hidden="true"
                      className={`inline-flex size-11 shrink-0 items-center justify-center rounded-xl font-serif text-xl italic ${
                        ["bg-clay-100 text-clay-700", "bg-mist-100 text-mist-700", "bg-sage-100 text-sage-700"][i % 3]
                      }`}
                    >
                      {p.label.charAt(0)}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-medium text-ink">{p.label}</span>
                      <span className="block text-sm text-ink-muted">{p.note}</span>
                    </span>
                    <span
                      aria-hidden="true"
                      className="inline-flex size-9 shrink-0 items-center justify-center rounded-full border border-line-strong text-ink-muted transition-colors duration-150 group-hover:border-sage-700 group-hover:bg-sage-700 group-hover:text-canvas"
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="size-4">
                        <path d="M7 17 17 7" />
                        <path d="M8 7h9v9" />
                      </svg>
                    </span>
                    <span className="sr-only"> profili (yeni sekmede açılır)</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <CtaBand title="Tanışmak için bir görüşme planlayalım" />
    </>
  );
}
