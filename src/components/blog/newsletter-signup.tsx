"use client";

import Link from "next/link";
import { useActionState, useEffect, useId } from "react";
import { subscribe, type SubscribeState } from "@/app/(site)/bulten/actions";
import { trackEvent } from "@/lib/analytics";

const initial: SubscribeState = { status: "idle" };

/**
 * Blog newsletter sign-up. Double opt-in: the visitor gets a confirmation
 * e-mail and is only added to the list after clicking the link in it.
 */
export function NewsletterSignup({ className = "" }: { className?: string }) {
  const [state, action, pending] = useActionState(subscribe, initial);
  const id = useId();

  useEffect(() => {
    // No personal data — only that a sign-up happened.
    if (state.status === "ok") trackEvent("sign_up", { method: "newsletter" });
  }, [state.status]);

  return (
    <section
      aria-labelledby={`${id}-baslik`}
      className={`@container relative isolate overflow-hidden rounded-3xl border border-line bg-surface px-6 py-10 sm:px-10 sm:py-12 ${className}`}
    >
      <div
        aria-hidden="true"
        className="absolute -right-24 -top-24 -z-10 size-72 rounded-full bg-sage-50"
      />

      <div className="grid gap-8 @3xl:grid-cols-[1fr_1.15fr] @3xl:items-start @3xl:gap-12">
        <div>
          <p className="flex items-center gap-2.5 text-xs font-medium uppercase tracking-[0.18em] text-ink-muted">
            <span aria-hidden="true" className="size-1.5 rounded-full bg-sage-700" />
            Bülten
          </p>
          <h2
            id={`${id}-baslik`}
            className="mt-4 font-serif text-[1.75rem] leading-[1.15] tracking-[-0.01em] text-ink text-balance sm:text-[2rem]"
          >
            Yeni yazılar <span className="italic text-sage-700">e-postanıza</span> gelsin
          </h2>
          <p className="mt-4 leading-relaxed text-ink-muted text-pretty">
            Yeni bir yazı yayımlandığında kısa bir özetini ve bağlantısını
            gönderirim. Reklam yok; dilediğiniz an tek tıkla ayrılabilirsiniz.
          </p>
        </div>

        {state.status === "ok" ? (
          <div role="status" className="rounded-2xl border border-sage-100 bg-sage-50 p-6">
            <span className="inline-flex size-10 items-center justify-center rounded-full bg-surface text-sage-700">
              <svg aria-hidden="true" viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="m3 7 9 6 9-6" />
              </svg>
            </span>
            <p className="mt-4 font-serif text-xl text-ink">Son bir adım kaldı</p>
            <p className="mt-2 leading-relaxed text-ink-muted text-pretty">
              Size bir onay e-postası gönderdim. İçindeki bağlantıya tıkladığınızda
              aboneliğiniz başlayacak. Birkaç dakika içinde gelmezse spam klasörüne
              göz atın.
            </p>
          </div>
        ) : (
          <form action={action} className="space-y-4">
            <div aria-hidden="true" className="absolute -left-[9999px] size-px overflow-hidden">
              <label htmlFor={`${id}-website`}>Web siteniz</label>
              <input id={`${id}-website`} name="website" type="text" tabIndex={-1} autoComplete="off" />
            </div>

            <div>
              <label htmlFor={`${id}-email`} className="sr-only">
                E-posta adresiniz
              </label>
              <div className="flex flex-col gap-3 sm:flex-row">
                <input
                  id={`${id}-email`}
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  inputMode="email"
                  placeholder="ornek@eposta.com"
                  defaultValue={state.status === "error" ? state.email : undefined}
                  aria-invalid={state.status === "error" || undefined}
                  aria-describedby={state.status === "error" ? `${id}-hata` : undefined}
                  className="block min-h-13 w-full min-w-0 flex-1 rounded-full border border-line-strong bg-canvas px-5 text-base text-ink transition-colors duration-150 placeholder:text-ink-muted/70 hover:border-ink-muted focus-visible:border-sage-700 focus-visible:outline-offset-0 aria-[invalid=true]:border-clay-700"
                />
                <button
                  type="submit"
                  disabled={pending}
                  className="inline-flex min-h-13 shrink-0 items-center justify-center rounded-full bg-sage-700 px-7 text-base font-medium text-canvas transition-colors duration-150 hover:bg-sage-800 active:bg-ink disabled:cursor-wait disabled:opacity-70"
                >
                  {pending ? "Gönderiliyor…" : "Abone ol"}
                </button>
              </div>
            </div>

            <label className="flex cursor-pointer items-start gap-3">
              <input type="checkbox" name="consent" required className="mt-1 size-5 shrink-0 accent-sage-700" />
              <span className="text-sm leading-relaxed text-ink-muted">
                <Link
                  href="/kvkk-ve-gizlilik#bulten"
                  target="_blank"
                  className="text-ink underline decoration-line-strong underline-offset-4 transition-colors duration-150 hover:decoration-ink"
                >
                  KVKK Aydınlatma Metni
                  <span className="sr-only"> (yeni sekmede açılır)</span>
                </Link>
                ’ni okudum. Yeni blog yazılarının e-posta adresime gönderilmesine ve
                bu amaçla e-posta adresimin yurt dışındaki e-posta hizmet
                sağlayıcısına aktarılmasına onay veriyorum.
              </span>
            </label>

            <div aria-live="polite" className="empty:hidden">
              {state.status === "error" && (
                <p id={`${id}-hata`} className="text-sm text-clay-700">
                  {state.message}
                </p>
              )}
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
