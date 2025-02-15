import { NextConfig } from "next";

const nextConfig: NextConfig = {
  swcMinify: true,
  productionBrowserSourceMaps: false,

  // Cache ultra-agressif et compression maximale
  headers: async () => [
    {
      source: "/:all*(svg|jpg|jpeg|png|gif|webp|mp4|woff2|css|js)",
      headers: [
        {
          key: "Cache-Control",
          value:
            "public, max-age=31536000, stale-while-revalidate=86400, stale-if-error=259200, immutable",
        },
        {
          key: "X-Content-Type-Options",
          value: "nosniff",
        },
        {
          key: "Content-Security-Policy",
          value:
            "default-src 'self'; img-src 'self' data: https:; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline';",
        },
        {
          key: "Timing-Allow-Origin",
          value: "*",
        },
      ],
    },
    {
      source: "/:path*",
      headers: [
        {
          key: "Permissions-Policy",
          value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
        },
        {
          key: "X-DNS-Prefetch-Control",
          value: "on",
        },
      ],
    },
  ],

  compress: true,

  // Optimisation extrême des images
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [320, 640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 604800,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    domains: [],
    unoptimized: false,
  },

  experimental: {
    optimizeCss: {
      logLevel: "warn",
      allowedOrigins: ["self"],
    },
    nextScriptWorkers: true,
    serverComponentsExternalPackages: [],
    optimisticClientCache: true,
    fullySpecified: true,
    swcTraceProfiling: true,
    forceSwcTransforms: true,
    gzipSize: true,
    craCompat: false,
    esmExternals: true,
    optimizePackageImports: [
      "lodash",
      "date-fns",
      "@mui/material",
      "@mui/icons-material",
    ],
  },

  // Optimisations système
  onDemandEntries: {
    maxInactiveAge: 60 * 1000, // 1 minute
    pagesBufferLength: 5,
  },

  reactStrictMode: true,
  poweredByHeader: false,
  generateEtags: true,
  keepAlive: true,
  httpAgentOptions: {
    keepAlive: true,
  },

  // Redirection optimisée avec mise en cache
  async redirects() {
    return [
      {
        source: "/",
        destination: "/home",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
