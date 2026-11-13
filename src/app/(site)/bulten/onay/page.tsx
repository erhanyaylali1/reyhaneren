import type { Metadata } from "next";
import { Suspense } from "react";
import { confirm, isToken } from "@/lib/newsletter/store";
import { BlogLink, StatusCard, StatusFallback } from "../status-card";

export const metadata: Metadata = {
  title: "Bülten aboneliği",
  robots: { index: false, follow: false },
};

async function Result({ searchParams }: { searchParams: PageProps<"/bulten/onay">["searchParams"] }) {
  const t = (await searchParams).t;
  const email = isToken(t) ? await confirm(t).catch(() => null) : null;

  if (!email) {
    return (
      <StatusCard tone="clay" kicker="Bülten" title="Bu onay bağlantısı geçersiz">
        <p className="mt-5 text-lg leading-relaxed text-ink-muted text-pretty">
          Bağlantının süresi dolmuş ya da daha yeni bir onay e-postası gönderilmiş
          olabilir. Blog sayfasındaki formdan tekrar abone olabilirsiniz.
        </p>
        <BlogLink />
      </StatusCard>
    );
  }

  return (
    <StatusCard
      kicker="Bülten · Abonelik onaylandı"
      title={
        <>
          Teşekkürler,
          <span className="block italic text-sage-700">aboneliğiniz başladı</span>
        </>
      }
    >
      <p className="mt-5 text-lg leading-relaxed text-ink-muted text-pretty">
        Yeni bir yazı yayımlandığında <strong className="font-medium text-ink">{email}</strong>{" "}
        adresine kısa bir özetini ve bağlantısını göndereceğim. Her e-postanın
        altındaki bağlantıyla dilediğiniz an ayrılabilirsiniz.
      </p>
      <BlogLink />
    </StatusCard>
  );
}

export default function ConfirmPage(props: PageProps<"/bulten/onay">) {
  return (
    <div className="px-5 pb-24 pt-14 sm:px-8 md:pb-32 md:pt-24">
      <Suspense fallback={<StatusFallback />}>
        <Result searchParams={props.searchParams} />
      </Suspense>
    </div>
  );
}
