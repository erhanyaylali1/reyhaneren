import Link from "next/link";
import type { ReactNode } from "react";
import { site } from "@/lib/site";

// Shared building blocks for the inner pages (hakkımda, hizmetler, iletişim)
// so every page speaks the same visual language as the home page.

export const eyebrow = "text-xs font-medium uppercase tracking-[0.18em] text-ink-muted";
export const primaryCta =
  "group inline-flex min-h-13 items-center justify-center gap-2 rounded-full bg-sage-700 px-7 text-base font-medium text-canvas transition-colors duration-150 hover:bg-sage-800 active:bg-ink";
export const secondaryCta =
  "inline-flex min-h-13 items-center justify-center gap-2 rounded-full border border-line-strong px-7 text-base font-medium text-ink transition-colors duration-150 hover:border-ink hover:bg-surface";
export const h2Class =
  "font-serif text-[2rem] leading-[1.15] tracking-[-0.015em] text-ink text-balance md:text-[2.5rem]";
export const bodyText = "text-lg leading-relaxed text-ink-muted text-pretty";

export function ArrowIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-4 transition-transform duration-150 ease-out group-hover:translate-x-0.5"
    >
      <path d="M4 10h12M11 5l5 5-5 5" />
    </svg>
  );
}

export function WhatsAppIcon({ className = "size-5" }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 18.15h-.01a8.23 8.23 0 0 1-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.25-8.23a8.2 8.2 0 0 1 8.24 8.24c0 4.54-3.7 8.23-8.23 8.23Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.24-.64.8-.78.97-.15.16-.29.18-.54.06-.25-.12-1.05-.39-1.99-1.23a7.44 7.44 0 0 1-1.38-1.72c-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.13-.15.17-.25.25-.42.08-.16.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.42h-.48a.92.92 0 0 0-.66.31c-.23.25-.87.85-.87 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.24 3.74.59.26 1.05.41 1.41.52.6.19 1.14.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.06-.1-.23-.16-.48-.29Z" />
    </svg>
  );
}

export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

// ─── Breadcrumbs (visible trail + BreadcrumbList schema) ───────────────────

export type Crumb = { name: string; href: string };

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const trail = [{ name: "Ana sayfa", href: "/" }, ...items];
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: trail.map((c, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: c.name,
            item: `${site.url}${c.href === "/" ? "" : c.href}`,
          })),
        }}
      />
      <nav aria-label="Sayfa konumu">
        <ol className="flex flex-wrap items-center gap-x-2 text-sm text-ink-muted">
          {trail.map((c, i) => {
            const last = i === trail.length - 1;
            return (
              <li key={c.href} className="flex items-center gap-2">
                {last ? (
                  <span aria-current="page" className="inline-flex min-h-11 items-center text-ink">
                    {c.name}
                  </span>
                ) : (
                  <>
                    <Link
                      href={c.href}
                      className="inline-flex min-h-11 items-center underline decoration-transparent underline-offset-4 transition-colors duration-150 hover:text-ink hover:decoration-line-strong"
                    >
                      {c.name}
                    </Link>
                    <span aria-hidden="true">/</span>
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}

// ─── Page hero ──────────────────────────────────────────────────────────────

export function PageHero({
  crumbs,
  kicker,
  title,
  accent,
  lead,
  mark,
  children,
}: {
  crumbs: Crumb[];
  mark?: ReactNode;
  kicker: string;
  title: string;
  accent?: string;
  lead: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="mx-auto max-w-6xl px-5 pb-16 pt-8 sm:px-8 md:pb-24 md:pt-12">
      <Breadcrumbs items={crumbs} />
      <div className="mt-10 max-w-3xl md:mt-14">
        {mark && <div className="mb-7">{mark}</div>}
        <p className="flex items-center gap-2.5 text-sm font-medium text-ink-muted">
          <span aria-hidden="true" className="size-1.5 rounded-full bg-sage-700" />
          {kicker}
        </p>
        <h1 className="mt-6 font-serif text-[2.5rem] leading-[1.08] tracking-[-0.02em] text-ink text-balance sm:text-5xl md:text-[3.5rem]">
          {title}
          {accent && <span className="block italic text-sage-700">{accent}</span>}
        </h1>
        <div className={`mt-7 max-w-[36rem] ${bodyText}`}>{lead}</div>
        {children}
      </div>
    </section>
  );
}

// ─── FAQ (visible accordion + FAQPage schema from the same data) ───────────

export type Faq = { q: string; a: string };

export function FaqList({ faqs, name }: { faqs: Faq[]; name: string }) {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }}
      />
      <div className="divide-y divide-line border-y border-line">
        {faqs.map((f, i) => (
          <details key={f.q} name={name} open={i === 0} className="group">
            <summary className="-mx-4 flex min-h-11 cursor-pointer list-none items-start justify-between gap-6 rounded-2xl px-4 py-6 text-left focus-visible:outline-offset-0 [&::-webkit-details-marker]:hidden">
              <h3 className="text-lg font-medium leading-snug text-ink text-pretty">{f.q}</h3>
              <span
                aria-hidden="true"
                className="relative mt-0.5 inline-flex size-7 shrink-0 items-center justify-center rounded-full border border-line-strong text-ink transition-colors duration-150 group-hover:border-ink group-open:border-sage-700 group-open:bg-sage-700 group-open:text-canvas"
              >
                <span className="absolute h-px w-3 bg-current" />
                <span className="absolute h-3 w-px bg-current transition-transform duration-200 ease-out group-open:rotate-90" />
              </span>
            </summary>
            <p className="max-w-[42rem] pb-7 pr-12 leading-relaxed text-ink-muted text-pretty">{f.a}</p>
          </details>
        ))}
      </div>
    </>
  );
}

// ─── Closing call-to-action band ────────────────────────────────────────────

export function CtaBand({
  title = "İlk adımı birlikte atalım",
  text = "Bayraklı’da yüz yüze ya da Türkiye’nin her yerinden online görüşme için randevu oluşturabilirsiniz.",
}: {
  title?: string;
  text?: string;
}) {
  return (
    <section className="border-t border-line">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 md:py-24">
        <div className="rounded-3xl bg-sage-700 px-7 py-12 text-canvas sm:px-12 md:flex md:items-end md:justify-between md:gap-12 md:py-14">
          <div className="max-w-xl">
            <h2 className="font-serif text-[2rem] leading-[1.15] tracking-[-0.015em] text-balance md:text-[2.5rem]">
              {title}
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-sage-100 text-pretty">{text}</p>
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row md:mt-0 md:shrink-0 md:flex-col lg:flex-row">
            <Link
              href="/iletisim#randevu"
              className="group inline-flex min-h-13 items-center justify-center gap-2 rounded-full bg-canvas px-7 font-medium text-ink transition-colors duration-150 hover:bg-surface"
            >
              Randevu Al
              <ArrowIcon />
            </Link>
            <a
              href={site.whatsapp.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-13 items-center justify-center gap-2 rounded-full border border-sage-100/40 px-7 font-medium text-canvas transition-colors duration-150 hover:border-canvas hover:bg-sage-800"
            >
              <WhatsAppIcon />
              WhatsApp’tan yazın
              <span className="sr-only"> (yeni sekmede açılır)</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
