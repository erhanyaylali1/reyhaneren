import "server-only";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { connection } from "next/server";
import { getSessionVersion } from "@/lib/blog/store";
import { SESSION_COOKIE, readSessionToken } from "./session";

/** True when the request carries a valid, current admin session. */
export async function hasAdminSession(): Promise<boolean> {
  // Session checks compare against the current time and hit the DB, so they
  // must run per request — never during (runtime) prerendering.
  await connection();
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  const version = await readSessionToken(token);
  return version !== null && version === (await getSessionVersion());
}

/** Call at the top of every admin page and Server Action. */
export async function requireAdmin(): Promise<void> {
  if (!(await hasAdminSession())) redirect("/admin");
}
