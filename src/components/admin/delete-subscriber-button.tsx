"use client";

import { useState, useTransition } from "react";
import { deleteSubscriber } from "@/app/admin/actions";
import { Icon } from "./icons";

export function DeleteSubscriberButton({ email }: { email: string }) {
  const [confirming, setConfirming] = useState(false);
  const [pending, start] = useTransition();

  if (confirming) {
    return (
      <span className="flex items-center gap-1" role="group" aria-label={`${email} silinsin mi?`}>
        <span className="hidden px-1 text-sm text-ink-muted sm:inline">Kalıcı olarak silinsin mi?</span>
        <button
          type="button"
          autoFocus
          disabled={pending}
          onClick={() => start(() => deleteSubscriber(email))}
          className="inline-flex h-9 items-center rounded-lg bg-clay-700 px-3 text-sm font-medium text-canvas transition-colors duration-150 hover:bg-[#723f2a] disabled:opacity-60"
        >
          {pending ? "Siliniyor…" : "Sil"}
        </button>
        <button
          type="button"
          disabled={pending}
          onClick={() => setConfirming(false)}
          className="inline-flex h-9 items-center rounded-lg px-3 text-sm text-ink-muted transition-colors duration-150 hover:bg-sage-50 hover:text-ink"
        >
          Vazgeç
        </button>
      </span>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setConfirming(true)}
      title="Sil"
      aria-label={`${email} adresini sil`}
      className="inline-flex size-9 items-center justify-center rounded-lg text-ink-muted transition-colors duration-150 hover:bg-clay-100 hover:text-clay-700"
    >
      <Icon name="trash" />
    </button>
  );
}
