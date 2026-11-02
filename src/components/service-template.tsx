import Link from "next/link";
import { JsonLd, ArrowIcon, CtaBand, FaqList, PageHero, WhatsAppIcon, bodyText, eyebrow, h2Class, primaryCta, secondaryCta } from "@/components/page-ui";
import { ServiceMark } from "@/components/service-mark";
import { SESSION_LENGTH, steps, type ServiceContent } from "@/lib/content";
import { servicePages, site } from "@/lib/site";

export function ServiceTemplate({ content: c }: { content: ServiceContent }) {
  const page = servicePages.find((s) => s.slug === c.slug)!;
  const others = servicePages.filter((s) => s.slug !== c.slug);
  const url = `${site.url}/hizmetler/${c.slug}`;
  const facts = c.facts ?? [
    { label: "Seans süresi", value: SESSION_LENGTH },
    { label: "Görüşme şekli", value: "Yüz yüze · Online" },
  ];
  const processSteps = c.steps ?? steps;

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          "@id": `${url}#service`,
          name: page.title,
          serviceType: c.serviceType,
          description: c.metaDescription,
          url,
          provider: { "@id": `${site.url}/#clinic` },
          areaServed: [
            { "@type": "City", name: "İzmir" },
            { "@type": "Country", name: "Türkiye" },
          ],
          availableChannel: {
            "@type": "ServiceChannel",
            servicePhone: site.phone.e164,
            serviceUrl: `${site.url}/iletisim`,
          },
        }}
      />

      <PageHero
        crumbs={[
          { name: "Hizmetler", href: "/hizmetler" },
          { name: page.title, href: `/hizmetler/${c.slug}` },
        ]}
        mark={<ServiceMark slug={c.slug} size="lg" />}
        kicker={c.kicker}
        title={c.title}
        accent={c.accent}
        lead={<p>{c.lead}</p>}
      >
        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
          <Link href="/iletisim#randevu" className={primaryCta}>
            Randevu Al
            <ArrowIcon />
          </Link>
          <a href={site.whatsapp.href} target="_blank" rel="noopener noreferrer" className={secondaryCta}>
            <WhatsAppIcon className="size-5 text-sage-700" />
            WhatsApp’tan sorun
            <span className="sr-only"> (yeni sekmede açılır)</span>
          </a>
        </div>
      </PageHero>

      {/* ─── Article + session card ─── */}
      <section className="border-t border-line bg-surface">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 py-20 sm:px-8 md:py-24 lg:grid-cols-12 lg:gap-16">
          <div className="space-y-14 lg:col-span-7">
            {c.sections.map((s) => (
              <div key={s.heading}>
                <h2 className={h2Class}>{s.heading}</h2>
                <div className={`mt-5 space-y-5 ${bodyText}`}>
                  {s.paragraphs.map((p) => (
                    <p key={p.slice(0, 32)}>{p}</p>
                  ))}
                </div>
                {s.list && (
                  <ul className="mt-6 space-y-3">
                    {s.list.map((item) => (
                      <li key={item} className="flex gap-3 text-ink">
                        <span aria-hidden="true" className="mt-2.5 size-1.5 shrink-0 rounded-full bg-sage-700" />
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>

          <aside className="lg:col-span-5">
            <div className="rounded-3xl border border-line bg-canvas p-7 sm:p-8 lg:sticky lg:top-28">
              <h2 className="text-xl font-semibold tracking-[-0.01em] text-ink">{c.topicsHeading}</h2>
              <ul className="mt-5 divide-y divide-line border-y border-line">
                {c.topics.map((t) => (
                  <li key={t} className="py-3.5 leading-snug text-ink-muted">
                    {t}
                  </li>
                ))}
              </ul>
              <dl className="mt-7 grid grid-cols-2 gap-5">
                {facts.map((f) => (
                  <div key={f.label}>
                    <dt className="text-sm text-ink-muted">{f.label}</dt>
                    <dd className="mt-1 font-serif text-lg text-ink">{f.value}</dd>
                  </div>
                ))}
              </dl>
              <a
                href={site.phone.href}
                className="mt-7 flex min-h-12 items-center justify-center rounded-full border border-line-strong font-medium text-ink tabular-nums transition-colors duration-150 hover:border-ink hover:bg-surface"
              >
                {site.phone.display}
              </a>
            </div>
          </aside>
        </div>
      </section>

      {/* ─── Process ─── */}
      <section className="border-t border-line">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 md:py-24">
          <p className={eyebrow}>Süreç</p>
          <h2 className={`mt-4 max-w-2xl ${h2Class}`}>Görüşmeler nasıl ilerler?</h2>
          <ol className="mt-12 grid gap-12 md:grid-cols-3 md:gap-10">
            {processSteps.map((step, i) => (
              <li key={step.title} className="border-t border-line-strong pt-6">
                <span aria-hidden="true" className="font-serif text-[2.75rem] leading-none text-sage-700 tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-6 text-xl font-semibold tracking-[-0.01em] text-ink text-balance">
                  <span className="sr-only">{i + 1}. adım: </span>
                  {step.title}
                </h3>
                <p className="mt-3 leading-relaxed text-ink-muted text-pretty">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section className="border-t border-line bg-surface">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 py-20 sm:px-8 md:py-24 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <p className={eyebrow}>Sıkça sorulan sorular</p>
            <h2 className={`mt-4 ${h2Class}`}>{page.title} hakkında merak edilenler</h2>
          </div>
          <div className="lg:col-span-8">
            <FaqList faqs={c.faqs} name={`sss-${c.slug}`} />
          </div>
        </div>
      </section>

      {/* ─── Other services ─── */}
      <section className="border-t border-line">
        <div className="mx-auto max-w-6xl px-5 pt-20 sm:px-8 md:pt-24">
          <p className={eyebrow}>Diğer hizmetler</p>
          <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((o) => (
              <li key={o.slug}>
                <Link
                  href={`/hizmetler/${o.slug}`}
                  className="group flex h-full flex-col rounded-3xl border border-line bg-surface p-7 transition-colors duration-150 hover:border-line-strong"
                >
                  <span className="text-xl font-semibold tracking-[-0.01em] text-ink">{o.title}</span>
                  <span className="mt-2 leading-relaxed text-ink-muted">{o.short}</span>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-[0.9375rem] font-medium text-sage-700">
                    Detaylı bilgi <ArrowIcon />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand {...c.cta} />
    </>
  );
}
