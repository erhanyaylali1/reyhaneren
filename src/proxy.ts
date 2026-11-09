import { NextResponse, type NextRequest } from "next/server";
import { SESSION_COOKIE, readSessionToken } from "@/lib/auth/session";

// Optimistic gate: bounce visitors without a valid cookie before any admin
// page renders. The authoritative check (incl. PIN-change invalidation) is
// requireAdmin() in every admin page and Server Action.
export async function proxy(request: NextRequest) {
  const version = await readSessionToken(request.cookies.get(SESSION_COOKIE)?.value);
  if (version === null) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }
  return NextResponse.next();
}

export const config = {
  // Everything under /admin except the PIN screen itself.
  matcher: "/admin/:path+",
};
