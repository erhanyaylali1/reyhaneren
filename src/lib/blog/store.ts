import "server-only";
import { isSupabaseConfigured } from "@/lib/supabase/server";
import * as memory from "./store-memory";
import * as supabase from "./store-supabase";

/*
  The app's only entry point to persistence.
  • SUPABASE_URL + SUPABASE_SECRET_KEY set → Supabase (Postgres + Storage)
  • otherwise                              → in-memory demo (lost on restart)
*/
const impl: typeof supabase = isSupabaseConfigured() ? supabase : memory;

if (!isSupabaseConfigured() && process.env.NODE_ENV === "production") {
  console.warn("[blog] Supabase is not configured — using the in-memory demo store.");
}

export const {
  listPosts,
  findPostBySlug,
  findPostById,
  insertPost,
  updatePost,
  removePost,
  incrementViews,
  checkPin,
  setPin,
  getSessionVersion,
  getLoginLock,
  recordFailedLogin,
  clearLoginFailures,
  uploadImage,
} = impl;
