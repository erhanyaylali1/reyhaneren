"use client";

import { useEffect, useState } from "react";

const SHOW_AFTER = 640; // px — roughly one screen down

export function scrollToTop() {
  // Uses the root's CSS scroll-behavior: smooth, or instant when the user
  // prefers reduced motion (see globals.css).
  window.scrollTo({ top: 0 });
  history.replaceState(null, "", window.location.pathname + window.location.search);
  // Hand keyboard focus back to the top of the page.
  document.querySelector<HTMLElement>("[data-home-link]")?.focus({ preventScroll: true });
}

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      setVisible(window.scrollY > SHOW_AFTER);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Sayfanın başına dön"
      title="Başa dön"
      inert={!visible}
      className={`fixed right-4 z-30 inline-flex size-12 items-center justify-center rounded-full border border-line bg-surface text-sage-700 shadow-[0_6px_20px_-6px_rgb(31_42_37/0.25)] transition-[opacity,translate,background-color,color] duration-200 hover:bg-sage-700 hover:text-canvas active:bg-sage-800 sm:right-6 max-xl:in-data-[bulten-kutusu=acik]:pointer-events-none max-xl:in-data-[bulten-kutusu=acik]:translate-y-3 max-xl:in-data-[bulten-kutusu=acik]:opacity-0 ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
      }`}
      style={{ bottom: "max(1.25rem, calc(env(safe-area-inset-bottom) + 0.75rem))" }}
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="size-5"
      >
        <path d="M12 19V5" />
        <path d="m6 11 6-6 6 6" />
      </svg>
    </button>
  );
}
