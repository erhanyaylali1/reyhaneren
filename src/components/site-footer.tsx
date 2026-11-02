import Link from "next/link";
import { navLinks, servicePages, site } from "@/lib/site";

const linkClass =
  "text-ink underline decoration-line-strong underline-offset-4 transition-colors duration-150 hover:decoration-ink";

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-surface">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-16 sm:px-8 md:grid-cols-12 md:py-20">
        <div className="md:col-span-4">
          <p className="font-serif text-2xl text-ink">{site.person}</p>
          <p className="mt-1 text-xs font-medium uppercase tracking-[0.18em] text-ink-muted">
            {site.title}
          </p>
          <p className="mt-6 max-w-sm leading-relaxed text-ink-muted">
            İzmir Bayraklı’daki ofiste yüz yüze, Türkiye’nin her yerinden
            online olarak aile danışmanlığı ve çift terapisi seansları.
          </p>
        </div>

        <nav aria-label="Sayfalar" className="md:col-span-2">
          <h2 className="text-xs font-medium uppercase tracking-[0.18em] text-ink-muted">
            Sayfalar
          </h2>
          <ul className="mt-5 space-y-3">
            {[{ label: "Ana sayfa", href: "/" }, ...navLinks].map((l) => (
              <li key={l.href}>
                <Link href={l.href} className={linkClass}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Hizmetler" className="md:col-span-3">
          <h2 className="text-xs font-medium uppercase tracking-[0.18em] text-ink-muted">
            Hizmetler
          </h2>
          <ul className="mt-5 space-y-3">
            {servicePages.map((sp) => (
              <li key={sp.slug}>
                <Link href={`/hizmetler/${sp.slug}`} className={linkClass}>
                  {sp.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="md:col-span-3">
          <h2 className="text-xs font-medium uppercase tracking-[0.18em] text-ink-muted">
            İletişim
          </h2>
          <address className="mt-5 space-y-3 not-italic">
            <p>
              <a href={site.phone.href} className={linkClass}>
                {site.phone.display}
              </a>
            </p>
            <p>
              <a href={`mailto:${site.email}`} className={`${linkClass} break-all`}>
                {site.email}
              </a>
            </p>
            <p className="text-ink">
              {site.address.locality}, {site.address.region}
              <span className="text-ink-muted"> · </span>
              <a
                href={site.address.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={linkClass}
              >
                Haritada aç
                <span className="sr-only"> (yeni sekmede açılır)</span>
              </a>
            </p>
          </address>
          <h2 className="mt-10 text-xs font-medium uppercase tracking-[0.18em] text-ink-muted">
            Sosyal medya
          </h2>
          <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-3">
            {site.social.map((s) => (
              <li key={s.href}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer me"
                  className={linkClass}
                >
                  {s.label}
                  <span className="sr-only"> (yeni sekmede açılır)</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-line">
        <p className="mx-auto max-w-6xl px-5 py-6 text-sm text-ink-muted sm:px-8">
          © 2026 {site.name}. Tüm hakları saklıdır.
        </p>
      </div>
    </footer>
  );
}
