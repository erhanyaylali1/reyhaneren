import type { Metadata } from "next";
import { NotFoundView } from "@/components/not-found-view";
import { ScrollToTop } from "@/components/scroll-to-top";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

// Unmatched URLs render here, inside the root layout only — so the site
// chrome (normally from the (site) group layout) is added explicitly.
export const metadata: Metadata = { title: "Sayfa bulunamadı" };

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main id="icerik" className="flex-1">
        <NotFoundView />
      </main>
      <SiteFooter />
      <ScrollToTop />
    </>
  );
}
