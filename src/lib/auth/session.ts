// Signed admin session cookie. Uses Web Crypto so it also runs in proxy.ts.
//
// Token: "<expiresAtMs>.<sessionVersion>.<hmac>". The version lets a PIN
// change invalidate every existing session (checked server-side in dal.ts).

export const SESSION_COOKIE = "re_admin";
export const SESSION_TTL_MS = 12 * 60 * 60 * 1000;

const encoder = new TextEncoder();

function secret(): string {
  const s = process.env.ADMIN_SESSION_SECRET;
  if (s) return s;
  if (process.env.NODE_ENV === "production" && process.env.NEXT_PHASE !== "phase-production-build") {
    console.warn("ADMIN_SESSION_SECRET is not set — using an insecure demo secret.");
  }
  return "demo-only-secret-change-me-in-env";
}

async function hmac(payload: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const sig = await crypto.subtle.sign("HMAC", key, encoder.encode(payload));
  return btoa(String.fromCharCode(...new Uint8Array(sig)))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

export async function createSessionToken(version: number): Promise<string> {
  const payload = `${Date.now() + SESSION_TTL_MS}.${version}`;
  return `${payload}.${await hmac(payload)}`;
}

/** Returns the session version if the token is authentic and unexpired. */
export async function readSessionToken(token: string | undefined): Promise<number | null> {
  if (!token) return null;
  const [exp, version, sig] = token.split(".");
  if (!exp || !version || !sig) return null;
  if (Number(exp) < Date.now()) return null;
  const expected = await hmac(`${exp}.${version}`);
  if (expected.length !== sig.length) return null;
  let diff = 0;
  for (let i = 0; i < sig.length; i++) diff |= expected.charCodeAt(i) ^ sig.charCodeAt(i);
  return diff === 0 ? Number(version) : null;
}
