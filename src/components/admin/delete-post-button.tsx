"use client";

import { useState, useTransition } from "react";
import { deletePost } from "@/app/admin/actions";
import { Icon } from "./icons";

export function DeletePostButton({ id, title }: { id: string; title: string }) {
  const [confirming, setConfirming] = useState(false);
  const [pending, start] = useTransition();

  if (confirming) {
    return (
      <span className="flex items-center gap-1" role="group" aria-label={`“${title}” silinsin mi?`}>
        <span className="px-1 text-sm text-ink-muted">Silinsin mi?</span>
        <button
          type="button"
          autoFocus
          disabled={pending}
          onClick={() => start(() => deletePost(id))}
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
      aria-label={`“${title}” yazısını sil`}
      className="inline-flex size-9 items-center justify-center rounded-lg text-ink-muted transition-colors duration-150 hover:bg-clay-100 hover:text-clay-700"
    >
      <Icon name="trash" />
    </button>
  );
}
