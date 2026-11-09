import "server-only";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// Server-only client using the SECRET key. It bypasses Row Level Security,
// so it must never be imported from a Client Component ("server-only" above
// makes the build fail if that ever happens).

export const BLOG_IMAGES_BUCKET = "blog-images";

export function isSupabaseConfigured(): boolean {
  return Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_SECRET_KEY);
}

let client: SupabaseClient | undefined;

export function supabaseAdmin(): SupabaseClient {
  if (!isSupabaseConfigured()) {
    throw new Error("SUPABASE_URL / SUPABASE_SECRET_KEY are not set.");
  }
  client ??= createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SECRET_KEY!, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return client;
}
