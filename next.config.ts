import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // AVIF first, WebP fallback. AVIF is ~20% smaller than WebP; the extra
    // encode cost is paid once per image and then cached for a year below.
    formats: ["image/avif", "image/webp"],
    // Required from Next 16 — unlisted qualities are rejected. 75 is the
    // default; 60 is used for the decorative showcase/marquee imagery.
    qualities: [60, 75, 90],
    minimumCacheTTL: 31536000,
    /* Next 16 rejects a local <Image src> carrying a query string unless the
       exact search is allowed here, and the failure is not gentle: the image
       throws during render, the whole home page falls out of server rendering
       into a client-side retry, and everything below the hero disappears —
       which reads as "the page won't scroll" because there is nothing left to
       scroll to.

       The versioned entry covers the `?v=real_photo_2026` cache-buster on the
       SOLUTIONS artwork in components/royal/data.tsx. It is an exact match by
       design (a wildcard search would let anyone enumerate the optimizer), so
       bumping that version string means editing this list too — the empty
       `search` below is what keeps every un-versioned local image working. */
    localPatterns: [
      { pathname: "/**", search: "" },
      { pathname: "/**", search: "?v=real_photo_2026" },
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
        pathname: '/**',
      },
    ],
  },

  // Ship smaller client bundles: these three are barrel-heavy and were pulling
  // far more into the graph than the handful of icons/components actually used.
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion", "motion"],
  },

  async redirects() {
    return [
      // /new-home was the preview route for this design. It is the live home
      // page now, so the old URL is folded into it permanently (308).
      {
        source: "/new-home",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
