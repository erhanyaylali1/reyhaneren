"use client";

import { GoogleAnalytics } from "@next/third-parties/google";
import Link from "next/link";
import { useSyncExternalStore } from "react";

// Google Analytics only loads after the visitor explicitly accepts it
// (KVKK Çerez Uygulamaları Rehberi: analytics cookies need prior consent,
// and "Reddet" must be as easy as "Kabul et").
const GA_ID = "G-8Q4YRDMTTM";
const STORAGE_KEY = "cookie-consent";
const CHANGE_EVENT = "cookie-consent-change";
// Bump when the cookie policy changes in a way that needs fresh consent.
const VERSION = 1;

type Choice = "granted" | "denied";
// "unset" = no valid choice stored → show the banner.
type State = Choice | "unset" | "editing";

let editing = false;

function readChoice(): Choice | "unset" {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return "unset";
    const saved = JSON.parse(raw) as { v?: number; analytics?: Choice };
    if (saved.v !== VERSION) return "unset";
    return saved.analytics === "granted" || saved.analytics === "denied" ? saved.analytics : "unset";
  } catch {
    return "unset"; // storage blocked or corrupt → ask again
  }
}

function getSnapshot(): State {
  return editing ? "editing" : readChoice();
}

// On the server (and during hydration) nothing is shown or loaded.
function getServerSnapshot(): State | null {
  return null;
}

function subscribe(onChange: () => void) {
  const onStorage = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY) onChange();
  };
  window.addEventListener(CHANGE_EVENT, onChange);
  window.addEventListener("storage", onStorage); // other tabs
  return () => {
    window.removeEventListener(CHANGE_EVENT, onChange);
    window.removeEventListener("storage", onStorage);
  };
}

/** Re-opens the banner so the visitor can change their choice (footer link). */
export function openCookiePreferences() {
  editing = true;
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

function deleteAnalyticsCookies() {
  // GA sets _ga and _ga_<ID> on the top-level domain (e.g. .reyhaneren.com.tr).
  const host = location.hostname;
  const domains = ["", host, `.${host}`, `.${host.split(".").slice(-3).join(".")}`];
  for (const name of document.cookie.split(";").map((c) => c.split("=")[0].trim())) {
    if (name !== "_ga" && !name.startsWith("_ga_") && name !== "_gid") continue;
    for (const d of domains) {
      document.cookie = `${name}=; Max-Age=0; path=/${d ? `; domain=${d}` : ""}`;
    }
  }
}

function save(choice: Choice) {
  const previous = readChoice();
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ v: VERSION, analytics: choice, date: new Date().toISOString() }),
    );
  } catch {
    // Storage unavailable: the choice still applies for this page view.
  }
  editing = false;

  if (choice === "denied" && previous === "granted") {
    // Stop the already-loaded tag immediately and remove what it stored.
    (window as unknown as Record<string, boolean>)[`ga-disable-${GA_ID}`] = true;
    deleteAnalyticsCookies();
  }
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

export function CookieConsent() {
  const state = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  if (state === null) return null;

  // While editing, keep GA running only if it was already accepted.
  const analyticsOn = state === "granted" || (state === "editing" && readChoice() === "granted");
  const showBanner = state === "unset" || state === "editing";

  return (
    <>
      {analyticsOn && <GoogleAnalytics gaId={GA_ID} />}
      {showBanner && (
        <section
          role="dialog"
          aria-modal="false"
          aria-labelledby="cookie-consent-title"
          aria-describedby="cookie-consent-desc"
          className="fixed inset-x-3 z-40 mx-auto max-w-xl rounded-2xl border border-line bg-surface p-5 shadow-[0_18px_50px_-12px_rgb(31_42_37/0.35)] transition-[opacity,translate] duration-300 starting:translate-y-4 starting:opacity-0 sm:inset-x-auto sm:left-6 sm:p-6"
          style={{ bottom: "max(0.75rem, calc(env(safe-area-inset-bottom) + 0.5rem))" }}
        >
          <h2 id="cookie-consent-title" className="font-serif text-xl text-ink">
            Çerez tercihleriniz
          </h2>
          <p id="cookie-consent-desc" className="mt-2 text-[0.9375rem] leading-relaxed text-ink-muted">
            Sitenin çalışması için gerekli olanlar dışında, yalnızca izin verirseniz
            ziyaret istatistikleri için Google Analytics çerezleri kullanılır. Bu
            veriler sitenin geliştirilmesine yardımcı olur; reklam amacıyla
            kullanılmaz. Ayrıntılar için{" "}
            <Link
              href="/kvkk-ve-gizlilik#cerezler"
              className="text-ink underline decoration-line-strong underline-offset-4 transition-colors duration-150 hover:decoration-ink"
            >
              KVKK ve Gizlilik
            </Link>{" "}
            sayfasına bakabilirsiniz.
          </p>
          {/* Equal visual weight for both choices — no nudging. */}
          <div className="mt-5 grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => save("denied")}
              className="inline-flex min-h-11 items-center justify-center rounded-full border border-line-strong px-5 text-[0.9375rem] font-medium text-ink transition-colors duration-150 hover:border-ink hover:bg-canvas"
            >
              Reddet
            </button>
            <button
              type="button"
              onClick={() => save("granted")}
              className="inline-flex min-h-11 items-center justify-center rounded-full bg-sage-700 px-5 text-[0.9375rem] font-medium text-canvas transition-colors duration-150 hover:bg-sage-800 active:bg-ink"
            >
              Kabul et
            </button>
          </div>
        </section>
      )}
    </>
  );
}

/** Footer link that re-opens the banner. */
export function CookiePreferencesButton({ className }: { className?: string }) {
  return (
    <button type="button" onClick={openCookiePreferences} className={className}>
      Çerez tercihleri
    </button>
  );
}
