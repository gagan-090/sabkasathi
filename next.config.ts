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
