import Link from "next/link";
import { ArrowIcon, primaryCta, secondaryCta } from "@/components/page-ui";
import { servicePages } from "@/lib/site";

// Shown for unknown URLs and removed blog posts. Gives lost visitors the
// most likely next steps instead of a dead end.
export function NotFoundView() {
  const shortcuts = [
    ...servicePages.map((s) => ({ label: s.title, href: `/hizmetler/${s.slug}` })),
    { label: "Hakkımda", href: "/hakkimda" },
    { label: "Blog yazıları", href: "/blog" },
  ];

  return (
    <section className="mx-auto max-w-6xl px-5 pb-24 pt-14 sm:px-8 md:pb-32 md:pt-24">
      <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          <p className="flex items-center gap-2.5 text-sm font-medium text-ink-muted">
            <span aria-hidden="true" className="size-1.5 rounded-full bg-clay-700" />
            Hata 404 · Sayfa bulunamadı
          </p>
          <h1 className="mt-6 font-serif text-[2.5rem] leading-[1.08] tracking-[-0.02em] text-ink text-balance sm:text-5xl md:text-[3.5rem]">
            Aradığınız sayfaya ulaşamadık
            <span className="block italic text-sage-700">ama yolunuzu birlikte bulabiliriz</span>
          </h1>
          <p className="mt-7 max-w-[34rem] text-lg leading-relaxed text-ink-muted text-pretty">
            Bağlantı eski ya da hatalı olabilir veya sayfa taşınmış olabilir.
            Ana sayfaya dönebilir ya da doğrudan bizimle iletişime geçebilirsiniz.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
            <Link href="/" className={primaryCta}>
              Ana sayfaya dönün
              <ArrowIcon />
            </Link>
            <Link href="/iletisim" className={secondaryCta}>
              İletişime geçin
            </Link>
          </div>
        </div>

        <nav aria-label="Sık ziyaret edilen sayfalar" className="lg:col-span-5 lg:pt-3">
          <div className="rounded-3xl border border-line bg-surface p-7 sm:p-8">
            <h2 className="text-xs font-medium uppercase tracking-[0.18em] text-ink-muted">
              Belki bunları arıyordunuz
            </h2>
            <ul className="mt-4 divide-y divide-line">
              {shortcuts.map((s) => (
                <li key={s.href}>
                  <Link
                    href={s.href}
                    className="group flex min-h-12 items-center justify-between gap-4 py-2 text-ink transition-colors duration-150 hover:text-sage-700"
                  >
                    {s.label}
                    <ArrowIcon />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </div>
    </section>
  );
}
