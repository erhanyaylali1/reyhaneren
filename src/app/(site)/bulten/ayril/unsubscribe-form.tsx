"use client";

import { useActionState } from "react";
import { unsubscribe, type UnsubscribeState } from "../actions";
import { BlogLink, StatusCard } from "../status-card";

const initial: UnsubscribeState = { status: "idle" };

export function UnsubscribeForm({ token, email }: { token: string; email: string }) {
  const [state, action, pending] = useActionState(unsubscribe, initial);

  if (state.status === "done") {
    return (
      <StatusCard kicker="Bülten · Abonelik sonlandırıldı" title="Listeden çıkarıldınız">
        <p className="mt-5 text-lg leading-relaxed text-ink-muted text-pretty">
          <strong className="font-medium text-ink">{email}</strong> adresine artık bülten
          gönderilmeyecek. Fikrinizi değiştirirseniz blog sayfasından yeniden abone
          olabilirsiniz.
        </p>
        <BlogLink />
      </StatusCard>
    );
  }

  return (
    <StatusCard kicker="Bülten" title="Bülten aboneliğinden çıkmak istiyor musunuz?">
      <p className="mt-5 text-lg leading-relaxed text-ink-muted text-pretty">
        <strong className="font-medium text-ink">{email}</strong> adresine yeni blog
        yazıları artık gönderilmeyecek.
      </p>
      <form action={action} className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
        <input type="hidden" name="t" value={token} />
        <button
          type="submit"
          disabled={pending}
          className="inline-flex min-h-13 items-center justify-center rounded-full bg-ink px-7 text-base font-medium text-canvas transition-colors duration-150 hover:bg-sage-800 disabled:cursor-wait disabled:opacity-70"
        >
          {pending ? "İşleniyor…" : "Evet, abonelikten çık"}
        </button>
      </form>
      {state.status === "error" && (
        <p role="alert" className="mt-4 text-sm text-clay-700">
          Bir sorun oluştu. Lütfen tekrar deneyin.
        </p>
      )}
    </StatusCard>
  );
}
