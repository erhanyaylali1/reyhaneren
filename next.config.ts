import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  // Let phones on the same Wi-Fi use `npm run dev` (e.g. http://192.168.1.22:3000).
  // Without this, Next 16 blocks dev resources for other hosts and the page
  // never hydrates — buttons like the mobile menu silently do nothing.
  // Dev-only; has no effect on production builds.
  allowedDevOrigins: ["192.168.*.*", "10.*.*.*", "*.local"],
  experimental: {
    inlineCss: true,
    serverActions: {
      // Image uploads go through a Server Action (max 5 MB + form overhead).
      bodySizeLimit: "6mb",
    },
  },
  partialPrefetching: true,
  // Old/guessed URLs for sections that live on the home page. 301s pass their
  // link value to the right section instead of serving thin placeholder pages.
  async redirects() {
    return [
      { source: "/hakkimda", destination: "/#hakkimda", permanent: true },
      { source: "/hizmetler", destination: "/#hizmetler", permanent: true },
      { source: "/iletisim", destination: "/#iletisim", permanent: true },
      { source: "/sss", destination: "/#sss", permanent: true },
      { source: "/randevu", destination: "/#randevu", permanent: true },
    ];
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
