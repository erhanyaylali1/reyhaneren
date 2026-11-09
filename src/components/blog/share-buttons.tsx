"use client";

import { useState } from "react";
import { WhatsAppIcon } from "@/components/page-ui";

// Share links are built from the post's canonical URL + title (passed in from
// the server), so they work without JavaScript; only "copy link" needs it.

const icon = "size-5";
const ICONS = {
  whatsapp: <WhatsAppIcon className={icon} />,
  linkedin: (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" className={icon}>
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
    </svg>
  ),
  facebook: (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" className={icon}>
      <path d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.68.24 2.68.24v2.97h-1.51c-1.49 0-1.96.93-1.96 1.89v2.25h3.33l-.53 3.49h-2.8V24C19.61 23.1 24 18.1 24 12.07Z" />
    </svg>
  ),
  link: (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={icon}>
      <path d="M10 13a5 5 0 0 0 7.07 0l3-3a5 5 0 0 0-7.07-7.07l-1.5 1.5" />
      <path d="M14 11a5 5 0 0 0-7.07 0l-3 3a5 5 0 0 0 7.07 7.07l1.5-1.5" />
    </svg>
  ),
  check: (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={icon}>
      <path d="m5 12 5 5L20 7" />
    </svg>
  ),
};

export function ShareButtons({
  url,
  title,
  variant = "full",
}: {
  url: string;
  title: string;
  variant?: "full" | "compact";
}) {
  const [copied, setCopied] = useState(false);
  const u = encodeURIComponent(url);
  const links = [
    { key: "whatsapp", label: "WhatsApp", href: `https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}` },
    { key: "linkedin", label: "LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${u}` },
    { key: "facebook", label: "Facebook", href: `https://www.facebook.com/sharer/sharer.php?u=${u}` },
  ] as const;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.prompt("Bağlantıyı kopyalayın:", url);
    }
  };

  const compact = variant === "compact";
  const btn = compact
    ? "inline-flex size-11 items-center justify-center rounded-full text-ink-muted transition-colors duration-150 hover:bg-sage-50 hover:text-sage-700"
    : "inline-flex min-h-11 items-center gap-2 rounded-full border border-line-strong bg-surface px-4 text-[0.9375rem] font-medium text-ink transition-colors duration-150 hover:border-ink";

  return (
    <div className={compact ? "flex items-center" : "flex flex-wrap items-center gap-2.5"}>
      {links.map((l) => (
        <a
          key={l.key}
          href={l.href}
          target="_blank"
          rel="noopener noreferrer"
          className={btn}
          aria-label={compact ? `${l.label} ile paylaş (yeni sekmede açılır)` : undefined}
          title={compact ? `${l.label} ile paylaş` : undefined}
        >
          <span className={compact ? "" : "text-sage-700"}>{ICONS[l.key]}</span>
          {!compact && (
            <>
              {l.label}
              <span className="sr-only"> ile paylaş (yeni sekmede açılır)</span>
            </>
          )}
        </a>
      ))}
      <button
        type="button"
        onClick={copy}
        className={btn}
        aria-label={compact ? "Bağlantıyı kopyala" : undefined}
        title={compact ? "Bağlantıyı kopyala" : undefined}
      >
        <span className={compact ? "" : "text-sage-700"}>{copied ? ICONS.check : ICONS.link}</span>
        {!compact && (copied ? "Kopyalandı" : "Bağlantıyı kopyala")}
      </button>
      <span aria-live="polite" className="sr-only">
        {copied ? "Bağlantı kopyalandı" : ""}
      </span>
    </div>
  );
}
