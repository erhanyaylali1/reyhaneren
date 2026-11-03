import { CookieConsent } from "@/components/cookie-consent";
import { SiteFooter } from "@/components/site-footer";
import { PageTransition } from "@/components/page-transition";
import { ScrollToTop } from "@/components/scroll-to-top";
import { SiteHeader } from "@/components/site-header";

export default function SiteLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      <a
        href="#icerik"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-canvas"
      >
        İçeriğe geç
      </a>
      <SiteHeader />
      <main id="icerik" className="flex-1">
        <PageTransition>{children}</PageTransition>
      </main>
      <SiteFooter />
      <ScrollToTop />
      {/* Consent banner + Google Analytics (loaded only after "Kabul et").
          Public pages only, so admin visits don't pollute the stats. */}
      <CookieConsent />
    </>
  );
}
