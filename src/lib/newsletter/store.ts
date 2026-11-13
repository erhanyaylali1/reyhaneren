import "server-only";
import { randomBytes } from "node:crypto";
import { isSupabaseConfigured, supabaseAdmin } from "@/lib/supabase/server";

/*
  Newsletter persistence.
  • Supabase configured → `subscribers` table + `posts.newsletter_sent_at`
  • otherwise           → in-memory demo (lost on restart)
*/

export type SubscriberStatus = "pending" | "confirmed" | "unsubscribed";

export type Subscriber = {
  email: string;
  status: SubscriberStatus;
  token: string;
  confirmSentAt: string | null;
};

/** What the admin list shows. The token is deliberately left out. */
export type SubscriberRow = {
  email: string;
  status: SubscriberStatus;
  createdAt: string;
  confirmedAt: string | null;
  unsubscribedAt: string | null;
};

const newToken = () => randomBytes(24).toString("base64url");
export const isToken = (v: unknown): v is string =>
  typeof v === "string" && /^[A-Za-z0-9_-]{32}$/.test(v);

// ─── Supabase ───────────────────────────────────────────────────────────────

function fail(error: { message: string } | null, what: string): asserts error is null {
  if (error) throw new Error(`Supabase: ${what} başarısız — ${error.message}`);
}

const table = () => supabaseAdmin().from("subscribers");

type Row = { email: string; status: SubscriberStatus; token: string; confirm_sent_at: string | null };
const toSub = (r: Row): Subscriber => ({
  email: r.email,
  status: r.status,
  token: r.token,
  confirmSentAt: r.confirm_sent_at,
});

const supabase = {
  async findByEmail(email: string) {
    const { data, error } = await table()
      .select("email, status, token, confirm_sent_at")
      .eq("email", email)
      .maybeSingle();
    fail(error, "abone okunamadı");
    return data ? toSub(data as Row) : null;
  },

  /** New sign-up, or a returning (unsubscribed) address signing up again. */
  async upsertPending(email: string) {
    const { data, error } = await table()
      .upsert(
        {
          email,
          status: "pending",
          token: newToken(),
          consent_at: new Date().toISOString(),
          confirmed_at: null,
          unsubscribed_at: null,
        },
        { onConflict: "email" },
      )
      .select("email, status, token, confirm_sent_at")
      .single();
    fail(error, "abone kaydedilemedi");
    return toSub(data as Row);
  },

  async markConfirmSent(email: string) {
    const { error } = await table().update({ confirm_sent_at: new Date().toISOString() }).eq("email", email);
    fail(error, "abone güncellenemedi");
  },

  /** Returns the e-mail if the token was valid and is now confirmed. */
  async confirm(token: string) {
    const { data, error } = await table()
      .update({ status: "confirmed", confirmed_at: new Date().toISOString() })
      .eq("token", token)
      .neq("status", "unsubscribed")
      .select("email")
      .maybeSingle();
    fail(error, "abonelik onaylanamadı");
    return (data?.email as string | undefined) ?? null;
  },

  async unsubscribe(token: string) {
    const { data, error } = await table()
      .update({ status: "unsubscribed", unsubscribed_at: new Date().toISOString() })
      .eq("token", token)
      .select("email")
      .maybeSingle();
    fail(error, "abonelikten çıkılamadı");
    return (data?.email as string | undefined) ?? null;
  },

  async findByToken(token: string) {
    const { data, error } = await table()
      .select("email, status, token, confirm_sent_at")
      .eq("token", token)
      .maybeSingle();
    fail(error, "abone okunamadı");
    return data ? toSub(data as Row) : null;
  },

  async listConfirmed() {
    const { data, error } = await table()
      .select("email, token")
      .eq("status", "confirmed")
      .order("created_at");
    fail(error, "aboneler okunamadı");
    return (data ?? []) as { email: string; token: string }[];
  },

  async countConfirmed() {
    const { count, error } = await table()
      .select("id", { count: "exact", head: true })
      .eq("status", "confirmed");
    fail(error, "aboneler sayılamadı");
    return count ?? 0;
  },

  async listAll(): Promise<SubscriberRow[]> {
    const { data, error } = await table()
      .select("email, status, created_at, confirmed_at, unsubscribed_at")
      .order("created_at", { ascending: false });
    fail(error, "aboneler okunamadı");
    return (data ?? []).map((r) => ({
      email: r.email as string,
      status: r.status as SubscriberStatus,
      createdAt: r.created_at as string,
      confirmedAt: r.confirmed_at as string | null,
      unsubscribedAt: r.unsubscribed_at as string | null,
    }));
  },

  /** Erases the address completely (KVKK deletion request). */
  async remove(email: string) {
    const { error } = await table().delete().eq("email", email);
    fail(error, "abone silinemedi");
  },

  /**
   * Atomically claims a published post for mailing. Only the first caller
   * gets `true`, so a post is never sent twice (double-click, two tabs…).
   */
  async claimPost(postId: string) {
    const { data, error } = await supabaseAdmin()
      .from("posts")
      .update({ newsletter_sent_at: new Date().toISOString() })
      .eq("id", postId)
      .eq("status", "published")
      .is("newsletter_sent_at", null)
      .select("id");
    fail(error, "bülten durumu güncellenemedi");
    return (data ?? []).length > 0;
  },

  /** Undo a claim when nothing could be sent, so the next save retries. */
  async releasePost(postId: string) {
    const { error } = await supabaseAdmin()
      .from("posts")
      .update({ newsletter_sent_at: null })
      .eq("id", postId);
    fail(error, "bülten durumu geri alınamadı");
  },
};

// ─── In-memory demo ─────────────────────────────────────────────────────────

type MemSub = Subscriber & Omit<SubscriberRow, "email" | "status">;
type Mem = { subs: Map<string, MemSub>; sentPosts: Set<string> };
const g = globalThis as typeof globalThis & { __reyhanNewsletter?: Mem };
const mem = () =>
  (g.__reyhanNewsletter ??= { subs: new Map(), sentPosts: new Set() });
const byToken = (token: string) => [...mem().subs.values()].find((s) => s.token === token);

const memory: typeof supabase = {
  async findByEmail(email) {
    const s = mem().subs.get(email);
    return s ? { ...s } : null;
  },
  async upsertPending(email) {
    const prev = mem().subs.get(email);
    const s: MemSub = {
      email,
      status: "pending",
      token: newToken(),
      confirmSentAt: prev?.confirmSentAt ?? null,
      createdAt: prev?.createdAt ?? new Date().toISOString(),
      confirmedAt: null,
      unsubscribedAt: null,
    };
    mem().subs.set(email, s);
    return { ...s };
  },
  async markConfirmSent(email) {
    const s = mem().subs.get(email);
    if (s) s.confirmSentAt = new Date().toISOString();
  },
  async confirm(token) {
    const s = byToken(token);
    if (!s || s.status === "unsubscribed") return null;
    s.status = "confirmed";
    s.confirmedAt = new Date().toISOString();
    return s.email;
  },
  async unsubscribe(token) {
    const s = byToken(token);
    if (!s) return null;
    s.status = "unsubscribed";
    s.unsubscribedAt = new Date().toISOString();
    return s.email;
  },
  async findByToken(token) {
    const s = byToken(token);
    return s ? { ...s } : null;
  },
  async listConfirmed() {
    return [...mem().subs.values()]
      .filter((s) => s.status === "confirmed")
      .map(({ email, token }) => ({ email, token }));
  },
  async countConfirmed() {
    return [...mem().subs.values()].filter((s) => s.status === "confirmed").length;
  },
  async listAll() {
    return [...mem().subs.values()]
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
      .map(({ email, status, createdAt, confirmedAt, unsubscribedAt }) => ({
        email, status, createdAt, confirmedAt, unsubscribedAt,
      }));
  },
  async remove(email) {
    mem().subs.delete(email);
  },
  async claimPost(postId) {
    if (mem().sentPosts.has(postId)) return false;
    mem().sentPosts.add(postId);
    return true;
  },
  async releasePost(postId) {
    mem().sentPosts.delete(postId);
  },
};

const impl = isSupabaseConfigured() ? supabase : memory;

export const {
  findByEmail,
  upsertPending,
  markConfirmSent,
  confirm,
  unsubscribe,
  findByToken,
  listConfirmed,
  countConfirmed,
  listAll,
  remove,
  claimPost,
  releasePost,
} = impl;
