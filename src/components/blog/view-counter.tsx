"use client";

import { useEffect, useState } from "react";
import { getViews, recordView } from "@/app/(site)/blog/actions";
import { formatNumber } from "@/lib/blog/text";

// Counts once per post per browser session (refreshes don't inflate it), and
// only after the page actually renders — link prefetches never count.
export function ViewCounter({ slug }: { slug: string }) {
  const [views, setViews] = useState<number | null>(null);

  useEffect(() => {
    const key = `viewed:${slug}`;
    const counted = sessionStorage.getItem(key) !== null;
    // Mark synchronously so React's dev double-effect can't count twice.
    sessionStorage.setItem(key, "1");
    let cancelled = false;
    (counted ? getViews(slug) : recordView(slug)).then((n) => {
      if (!cancelled) setViews(n);
    });
    return () => {
      cancelled = true;
    };
  }, [slug]);

  if (views === null) return null;
  return (
    <>
      <span aria-hidden="true">·</span>
      <span className="tabular-nums">{formatNumber(views)} görüntülenme</span>
    </>
  );
}
