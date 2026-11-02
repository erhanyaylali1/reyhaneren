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
  // Short URLs people may type or that old links may use.
  async redirects() {
    return [
      { source: "/sss", destination: "/#sss", permanent: true },
      { source: "/randevu", destination: "/iletisim#randevu", permanent: true },
      { source: "/cift-terapisi", destination: "/hizmetler/cift-terapisi", permanent: true },
      { source: "/aile-danismanligi", destination: "/hizmetler/aile-danismanligi", permanent: true },
      { source: "/online-danismanlik", destination: "/hizmetler/online-danismanlik", permanent: true },
      { source: "/kurumsal-danismanlik", destination: "/hizmetler/kurumsal-danismanlik", permanent: true },
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
