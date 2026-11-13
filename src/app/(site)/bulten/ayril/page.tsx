import type { Metadata } from "next";
import { Suspense } from "react";
import { findByToken, isToken } from "@/lib/newsletter/store";
import { BlogLink, StatusCard, StatusFallback } from "../status-card";
import { UnsubscribeForm } from "./unsubscribe-form";

export const metadata: Metadata = {
  title: "Bülten aboneliğinden çık",
  robots: { index: false, follow: false },
};

// Unsubscribing needs a button press (not just opening the link), because
// mail security scanners open every link in an e-mail automatically.
async function Content({ searchParams }: { searchParams: PageProps<"/bulten/ayril">["searchParams"] }) {
  const t = (await searchParams).t;
  const sub = isToken(t) ? await findByToken(t).catch(() => null) : null;

  if (!sub) {
    return (
      <StatusCard tone="clay" kicker="Bülten" title="Bu bağlantı geçersiz">
        <p className="mt-5 text-lg leading-relaxed text-ink-muted text-pretty">
          Abonelikten çıkmakta sorun yaşıyorsanız bize e-posta ile yazmanız yeterli;
          adresinizi listeden hemen çıkaralım.
        </p>
        <BlogLink />
      </StatusCard>
    );
  }

  if (sub.status === "unsubscribed") {
    return (
      <StatusCard kicker="Bülten" title="Bülten listesinde değilsiniz">
        <p className="mt-5 text-lg leading-relaxed text-ink-muted text-pretty">
          <strong className="font-medium text-ink">{sub.email}</strong> adresine artık
          bülten gönderilmiyor.
        </p>
        <BlogLink />
      </StatusCard>
    );
  }

  return <UnsubscribeForm token={sub.token} email={sub.email} />;
}

export default function UnsubscribePage(props: PageProps<"/bulten/ayril">) {
  return (
    <div className="px-5 pb-24 pt-14 sm:px-8 md:pb-32 md:pt-24">
      <Suspense fallback={<StatusFallback />}>
        <Content searchParams={props.searchParams} />
      </Suspense>
    </div>
  );
}
