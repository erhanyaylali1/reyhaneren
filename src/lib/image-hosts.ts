// Single list of remote image sources that Next.js may optimize (resize,
// WebP/AVIF, cache). Used by next.config.ts (remotePatterns) and by the
// components deciding whether to optimize a given URL.
//
// Anything else (e.g. images hot-linked from other websites) is still shown,
// but served as-is — we don't let the optimizer proxy arbitrary hosts.

type Pattern = { protocol: "https"; hostname: string; pathname: string };

export function optimizedImagePatterns(): Pattern[] {
  const patterns: Pattern[] = [
    { protocol: "https", hostname: "images.unsplash.com", pathname: "/**" },
  ];
  const supabase = process.env.SUPABASE_URL;
  if (supabase) {
    patterns.push({
      protocol: "https",
      hostname: new URL(supabase).hostname,
      pathname: "/storage/v1/object/public/blog-images/**",
    });
  }
  return patterns;
}

/** True when next/image may optimize this src (local file or allowed host). */
export function canOptimizeImage(src: string): boolean {
  if (src.startsWith("/") && !src.startsWith("//")) return true;
  let url: URL;
  try {
    url = new URL(src);
  } catch {
    return false; // data: URLs (demo mode) and anything unparsable
  }
  return optimizedImagePatterns().some(
    (p) =>
      url.protocol === `${p.protocol}:` &&
      url.hostname === p.hostname &&
      url.pathname.startsWith(p.pathname.replace("/**", "/")),
  );
}
