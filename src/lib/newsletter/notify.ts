import "server-only";
import type { Post } from "@/lib/blog/types";
import { isMailConfigured, newPostEmails, sendMany } from "./mail";
import { claimPost, listConfirmed, releasePost } from "./store";

export type NotifyResult =
  | { kind: "skipped" } // draft, or already sent before
  | { kind: "not-configured" }
  | { kind: "no-subscribers" }
  | { kind: "sent"; sent: number; total: number }
  | { kind: "failed" };

/**
 * E-mails a newly published post to every confirmed subscriber — once.
 * Safe to call on every save: drafts and already-sent posts are skipped.
 */
export async function notifySubscribers(post: Post): Promise<NotifyResult> {
  if (post.status !== "published") return { kind: "skipped" };
  // Claim first, even when mail isn't set up: a post is only ever mailed at
  // the moment it is first published, never later when an old post is edited.
  if (!(await claimPost(post.id))) return { kind: "skipped" };
  if (!isMailConfigured()) return { kind: "not-configured" };

  try {
    const recipients = await listConfirmed();
    if (recipients.length === 0) return { kind: "no-subscribers" };

    const sent = await sendMany(newPostEmails(post, recipients));
    if (sent === 0) {
      await releasePost(post.id); // nothing went out — allow a retry on next save
      return { kind: "failed" };
    }
    return { kind: "sent", sent, total: recipients.length };
  } catch (err) {
    console.error("[bülten] yeni yazı bildirimi başarısız", err);
    await releasePost(post.id).catch(() => {});
    return { kind: "failed" };
  }
}
