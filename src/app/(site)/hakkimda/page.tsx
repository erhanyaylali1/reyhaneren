import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import Image from "next/image";
import Link from "next/link";
import { ArrowIcon, CtaBand, JsonLd, PageHero, bodyText, eyebrow, h2Class, primaryCta } from "@/components/page-ui";
import { certificates, credentials } from "@/lib/content";
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
            danışmanlığı ve çift terapisi seansları yürütüyorum. İnsanların yaşam
            boyu gelişimine ve ilişki süreçlerine duyduğum merak, beni kimya
            mühendisliğinden sosyolojiye, oradan da aile danışmanlığına
            yönlendirdi.
          </p>
        }
      />

      {/* ─── Story ─── */}
      <section className="border-t border-line bg-surface">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 py-20 sm:px-8 md:py-24 lg:grid-cols-12 lg:gap-16">
          <figure className="lg:col-span-5">
            <Image
              src="/reyhan-eren-aile-danismani-izmir-portre.jpg"
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
            <h2 className={h2Class}>Mühendislikten insan ilişkilerine uzanan yolculuk</h2>
            <div className={`mt-6 space-y-5 ${bodyText}`}>
              <p>
                Her şey 2018 yılında, rasyonel ve sistem odaklı mühendislik
                dünyasından ayrılıp insan zihninin ve ilişkilerinin karmaşık
                dokusunu anlama arzusuyla başladı. Bu karar, beni Ege Üniversitesi
                Kimya Mühendisliği’ni bırakıp{" "}
                <strong className="font-medium text-ink">Akdeniz Üniversitesi Sosyoloji</strong>{" "}
                lisans eğitimine başlamaya yöneltti.
              </p>
              <p>
                İlişkilerdeki krizlerin ve aile içi dinamiklerin arka planındaki
                toplumsal, kültürel ve ekonomik yapıları okumayı öğrendiğim bu
                süreci,{" "}
                <strong className="font-medium text-ink">Marmara Üniversitesi Aile Danışmanlığı</strong>{" "}
                eğitimimle birleştirdim. Bugün bilgi birikimimi{" "}
                <strong className="font-medium text-ink">Sosyoloji Yüksek Lisans</strong>{" "}
                çalışmalarımla akademik düzeyde derinleştirmeye devam ediyorum.
              </p>
              <p>Seanslarıma taşıdığım bu çok yönlü arka plan, bana iki temel güç sunuyor:</p>
              <ul className="space-y-4 border-l-2 border-sage-100 pl-5">
                <li>
                  <strong className="font-medium text-ink">Analitik bakış açısı:</strong>{" "}
                  Mühendislik eğitimiyle başlayan analitik düşünme alışkanlığımla,
                  karmaşık ve içinden çıkılmaz görünen ilişki sorunlarını parçalarına
                  ayırıyor, net ve anlaşılır bir yapıya kavuşturuyorum.
                </li>
                <li>
                  <strong className="font-medium text-ink">Geniş ve empatik perspektif:</strong>{" "}
                  Sosyoloji ve aile danışmanlığı birikimimle bireyi ve ilişkiyi
                  yargılamadan, içinde bulunduğu koşullarla birlikte değerlendirerek
                  güvenli ve şefkatli bir alan açıyorum.
                </li>
              </ul>
              <p>
                Bugün seanslarımda analitik zihnin düzenleyici gücünü insan odaklı
                bir anlayışla birleştiriyor; çiftlerin ve bireylerin kendi ilişkisel
                dengelerini ve kendilerine uygun iletişim yollarını keşfetmelerine
                rehberlik ediyorum.
              </p>
            </div>

            <h3 className="mt-14 text-lg font-semibold text-ink">Eğitim ve uzmanlık</h3>
            <ol className="mt-4 divide-y divide-line border-y border-line">
              {credentials.map((c) => (
                <li key={c.year} className="grid grid-cols-[5rem_1fr] gap-x-4 py-5 sm:grid-cols-[5.5rem_1fr]">
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

            <div className="mt-14 flex items-baseline justify-between gap-4">
              <h3 className="text-lg font-semibold text-ink">Sertifikalar</h3>
              <span className="text-xs font-medium uppercase tracking-[0.18em] text-ink-muted tabular-nums">
                {certificates.length} program
              </span>
            </div>
            <ul className="mt-4 grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2">
              {certificates.map((c, i) => (
                <li
                  key={c.title}
                  className="group relative flex flex-col bg-surface p-6 transition-colors duration-200 hover:bg-canvas sm:last:odd:col-span-2"
                >
                  <span
                    aria-hidden="true"
                    className="font-serif text-sm text-sage-700 tabular-nums"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="mt-3 font-serif text-xl leading-snug tracking-[-0.01em] text-ink text-balance">
                    {c.title}
                  </p>
                  <p className="mt-auto flex items-start gap-2 pt-4 text-sm leading-snug text-ink-muted text-pretty">
                    <span aria-hidden="true" className="mt-[0.45em] h-px w-4 shrink-0 bg-sage-700/50" />
                    {c.institution}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ─── Approach ─── */}
      <section className="border-t border-line">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 py-20 sm:px-8 md:py-24 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <p className={eyebrow}>Yaklaşımım</p>
            <h2 className={`mt-4 ${h2Class}`}>Sistemik yaklaşım: ilişkiyi bir bütün olarak görmek</h2>
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
              değiştirebiliriz?” sorusuna odaklanırız. Sosyoloji birikimim de bu
              tabloya kuşaklar arası aktarılan alışkanlıkları, toplumsal
              beklentileri ve gündelik hayatın çeşitli baskılarını katmamı
              kolaylaştırıyor.
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

      <CtaBand title="Tanışmak için bir görüşme planlayalım" />
    </>
  );
}
