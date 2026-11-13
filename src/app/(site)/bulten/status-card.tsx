import Link from "next/link";
import { ArrowIcon, primaryCta } from "@/components/page-ui";

// Shared frame for the newsletter confirm / unsubscribe pages.
export function StatusCard({
  tone = "sage",
  kicker,
  title,
  children,
}: {
  tone?: "sage" | "clay";
  kicker: string;
  title: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <div className="mx-auto max-w-2xl rounded-3xl border border-line bg-surface p-8 sm:p-12">
      <p className="flex items-center gap-2.5 text-sm font-medium text-ink-muted">
        <span
          aria-hidden="true"
          className={`size-1.5 rounded-full ${tone === "sage" ? "bg-sage-700" : "bg-clay-700"}`}
        />
        {kicker}
      </p>
      <h1 className="mt-5 font-serif text-[2rem] leading-[1.12] tracking-[-0.015em] text-ink text-balance sm:text-[2.5rem]">
        {title}
      </h1>
      {children}
    </div>
  );
}

export function BlogLink() {
  return (
    <Link href="/blog" className={`mt-8 ${primaryCta}`}>
      Blog yazılarına göz atın
      <ArrowIcon />
    </Link>
  );
}

export function StatusFallback() {
  return (
    <div
      aria-hidden="true"
      className="mx-auto h-72 max-w-2xl animate-pulse rounded-3xl border border-line bg-surface"
    />
  );
}
