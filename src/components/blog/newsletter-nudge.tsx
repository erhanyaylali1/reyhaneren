"use client";

import { useEffect, useState, useSyncExternalStore } from "react";

const DISMISS_KEY = "bulten-kutusu-kapali";
const DISMISS_EVENT = "bulten-kutusu-kapandi";

const subscribeDismiss = (onChange: () => void) => {
  window.addEventListener(DISMISS_EVENT, onChange);
  return () => window.removeEventListener(DISMISS_EVENT, onChange);
};
const isDismissed = () => localStorage.getItem(DISMISS_KEY) === "1";

/**
 * Blog-post newsletter nudge: a top-right card on xl screens, a small
 * bottom card below that (a top box would cover the text on narrow screens). Appears once the reader is ~35% into the article and
 * hides when the real sign-up form (#bulten) comes into view. The button only
 * scrolls to that form, so the KVKK consent lives in a single place.
 * Closing it is remembered in localStorage (a UI preference, no tracking).
 */
export function NewsletterNudge() {
  const [visible, setVisible] = useState(false);
  // The mobile strip sits where the cookie banner does, so it waits for it.
  const [cookieBannerOpen, setCookieBannerOpen] = useState(false);
  // Server snapshot "true": nothing renders until the browser has checked.
  const dismissed = useSyncExternalStore(subscribeDismiss, isDismissed, () => true);

  useEffect(() => {
    const article = document.getElementById("yazi-icerigi");
    const form = document.getElementById("bulten");
    if (!article || !form) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const a = article.getBoundingClientRect();
      const read = (window.innerHeight - a.top) / a.height;
      const formInView = form.getBoundingClientRect().top < window.innerHeight;
      setVisible(read > 0.35 && !formInView);
      setCookieBannerOpen(Boolean(document.getElementById("cookie-consent-title")));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const mobileVisible = visible && !cookieBannerOpen && !dismissed;

  // On narrow screens the card takes the scroll-to-top button's spot, so it
  // flags <html>; the button hides itself while this is set.
  useEffect(() => {
    const root = document.documentElement;
    if (mobileVisible) root.dataset.bultenKutusu = "acik";
    else delete root.dataset.bultenKutusu;
    return () => {
      delete root.dataset.bultenKutusu;
    };
  }, [mobileVisible]);

  if (dismissed) return null;

  const close = () => {
    localStorage.setItem(DISMISS_KEY, "1");
    window.dispatchEvent(new Event(DISMISS_EVENT));
  };

  const goToForm = () => {
    const form = document.getElementById("bulten");
    form?.scrollIntoView({ behavior: "smooth", block: "center" });
    form?.querySelector<HTMLInputElement>('input[type="email"]')?.focus({ preventScroll: true });
  };

  const closeButton = (className: string) => (
    <button
      type="button"
      onClick={close}
      aria-label="Kapat"
      className={`inline-flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-full text-ink-muted transition-colors duration-150 hover:bg-sand-100 hover:text-ink ${className}`}
    >
      <svg aria-hidden="true" viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round">
        <path d="M6 6l12 12M18 6 6 18" />
      </svg>
    </button>
  );

  return (
    <>
      {/* Mobile / tablet: small card at the bottom (scroll-to-top hides meanwhile). */}
      <aside
        aria-label="Bülten"
        inert={!mobileVisible}
        className={`fixed inset-x-3 isolate z-30 mx-auto max-w-sm overflow-hidden rounded-3xl border border-line bg-surface p-4 shadow-[0_18px_50px_-12px_rgb(31_42_37/0.35)] transition-[opacity,translate] duration-300 ease-out sm:inset-x-auto sm:right-6 sm:w-sm xl:hidden ${
          mobileVisible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
        }`}
        style={{ bottom: "max(0.75rem, calc(env(safe-area-inset-bottom) + 0.5rem))" }}
      >
        <div aria-hidden="true" className="absolute -right-16 -top-16 -z-10 size-40 rounded-full bg-sage-50" />
        {closeButton("absolute right-1.5 top-1.5")}

        <div className="flex items-start gap-3.5 pr-8">
          <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-full bg-sage-100 text-sage-700">
            <svg aria-hidden="true" viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="5" width="18" height="14" rx="2" />
              <path d="m3 7 9 6 9-6" />
            </svg>
          </span>
          <div className="min-w-0">
            <p className="font-serif text-lg leading-snug text-ink text-balance">
              Yeni yazılar <span className="italic text-sage-700">e-postanıza</span> gelsin
            </p>
            <p className="mt-1 text-sm leading-relaxed text-ink-muted">
              Reklam yok; tek tıkla ayrılabilirsiniz.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={goToForm}
          className="mt-4 inline-flex min-h-11 w-full cursor-pointer items-center justify-center gap-1.5 rounded-full bg-sage-700 px-5 text-[0.9375rem] font-medium text-canvas transition-colors duration-150 hover:bg-sage-800 active:bg-ink"
        >
          Abone ol <span aria-hidden="true">→</span>
        </button>
      </aside>

      {/* Desktop: card in the top-right corner, in the empty margin beside the text. */}
      <aside
        aria-label="Bülten"
        inert={!visible}
        className={`fixed right-4 top-24 z-30 hidden w-64 rounded-2xl border border-line bg-surface p-5 shadow-[0_18px_50px_-12px_rgb(31_42_37/0.3)] transition-[opacity,translate] duration-300 xl:block ${
          visible ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-2 opacity-0"
        }`}
      >
        {closeButton("absolute right-2 top-2")}

        <p className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-ink-muted">
          <span aria-hidden="true" className="size-1.5 rounded-full bg-sage-700" />
          Bülten
        </p>
        <p className="mt-3 pr-4 font-serif text-xl leading-snug text-ink">
          Yeni yazılar <span className="italic text-sage-700">e-postanıza</span> gelsin
        </p>
        <p className="mt-2 text-sm leading-relaxed text-ink-muted">
          Reklam yok; tek tıkla ayrılabilirsiniz.
        </p>
        <button
          type="button"
          onClick={goToForm}
          className="mt-4 inline-flex min-h-11 w-full cursor-pointer items-center justify-center rounded-full bg-sage-700 px-5 text-[0.9375rem] font-medium text-canvas transition-colors duration-150 hover:bg-sage-800 active:bg-ink"
        >
          Abone ol
        </button>
      </aside>
    </>
  );
}
