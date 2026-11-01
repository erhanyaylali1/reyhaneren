import Link from "next/link";
import { navLinks, site } from "@/lib/site";
import { HomeLink } from "./home-link";
import { MobileMenu } from "./mobile-menu";

// z-index scale (the only one in the app): header 40.
export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-canvas">
      <nav
        aria-label="Ana menü"
        className="relative mx-auto flex h-18 max-w-6xl items-center justify-between px-5 sm:px-8"
      >
        <HomeLink className="flex flex-col leading-none">
          <span className="font-serif text-[1.375rem] tracking-[-0.01em] text-ink">
            {site.person}
          </span>
          <span className="mt-1 text-[0.6875rem] font-medium uppercase tracking-[0.18em] text-ink-muted">
            {site.title}
          </span>
          <span className="sr-only"> — Ana sayfa</span>
        </HomeLink>

        <div className="hidden items-center gap-10 md:flex">
          <ul className="flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-[0.9375rem] text-ink-muted transition-colors duration-150 hover:text-ink"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <Link
            href="/#randevu"
            className="inline-flex min-h-11 items-center rounded-full bg-sage-700 px-5 text-[0.9375rem] font-medium text-canvas transition-colors duration-150 hover:bg-sage-800 active:bg-ink"
          >
            Randevu Al
          </Link>
        </div>

        <MobileMenu />
      </nav>
    </header>
  );
}
