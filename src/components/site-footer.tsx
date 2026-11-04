import Link from "next/link";
import { CookiePreferencesButton } from "@/components/cookie-consent";
import { navLinks, onlinePage, servicePages, site } from "@/lib/site";

// Every footer link is at least 44px tall (mobile touch-target minimum);
// the underline stays on the text, the extra height is invisible padding.
const linkClass =
  "inline-flex min-h-11 min-w-11 items-center text-ink underline decoration-line-strong underline-offset-4 transition-colors duration-150 hover:decoration-ink";

const legalLinkClass =
  "inline-flex min-h-11 items-center rounded-lg px-2 underline decoration-line-strong underline-offset-4 transition-colors duration-150 hover:text-ink hover:decoration-ink";

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
            İzmir Bayraklı’da yüz yüze, Türkiye’nin her yerinden
            online olarak aile danışmanlığı ve çift terapisi seansları.
          </p>
        </div>

        <nav aria-label="Sayfalar" className="md:col-span-2">
          <h2 className="text-xs font-medium uppercase tracking-[0.18em] text-ink-muted">
            Sayfalar
          </h2>
          <ul className="mt-3">
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
          <ul className="mt-3">
            {servicePages.map((sp) => (
              <li key={sp.slug}>
                <Link href={`/hizmetler/${sp.slug}`} className={linkClass}>
                  {sp.title}
                </Link>
              </li>
            ))}
            <li className="mt-2 border-t border-line pt-2">
              <Link href={`/hizmetler/${onlinePage.slug}`} className={linkClass}>
                {onlinePage.title}
              </Link>
            </li>
          </ul>
        </nav>

        <div className="md:col-span-3">
          <h2 className="text-xs font-medium uppercase tracking-[0.18em] text-ink-muted">
            İletişim
          </h2>
          <address className="mt-3 not-italic">
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
            <p className="flex min-h-11 items-center text-ink">
              {site.address.locality}, {site.address.region}
            </p>
          </address>
          <h2 className="mt-8 text-xs font-medium uppercase tracking-[0.18em] text-ink-muted">
            Sosyal medya
          </h2>
          <ul className="mt-3 flex flex-wrap gap-x-4">
            {site.social.map((s) => (
              <li key={s.href}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer me"
                  className={`${linkClass} min-w-11`}
                >
                  {s.label}
                  <span className="sr-only"> (yeni sekmede açılır)</span>
                </a>
              </li>
            ))}
          </ul>
          <h2 className="mt-8 text-xs font-medium uppercase tracking-[0.18em] text-ink-muted">
            Platformlar
          </h2>
          <ul className="mt-3 flex flex-wrap gap-x-4">
            {site.platforms.map((p) => (
              <li key={p.href}>
                <a
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${linkClass} min-w-11`}
                >
                  {p.label}
                  <span className="sr-only"> profili (yeni sekmede açılır)</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-4 text-sm text-ink-muted sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p className="py-2">© 2026 {site.name}. Tüm hakları saklıdır.</p>
          <div className="-mx-2 flex flex-wrap items-center self-start sm:self-auto">
            <Link href="/kvkk-ve-gizlilik" className={legalLinkClass}>
              KVKK Aydınlatma Metni ve Gizlilik
            </Link>
            <CookiePreferencesButton className={`${legalLinkClass} cursor-pointer`} />
          </div>
        </div>
      </div>
    </footer>
  );
}
