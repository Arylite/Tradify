import { NextConfig } from "next";
import { Configuration as WebpackConfig } from "webpack";

interface WebpackConfigContext {
  dev: boolean;
  isServer: boolean;
}

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

  // Configuration Webpack ultra-optimisée
  webpack: (config: WebpackConfig, { dev, isServer }: WebpackConfigContext) => {
    if (!dev) {
      // Optimisations extrêmes en production
      config.optimization = {
        ...config.optimization,
        moduleIds: "deterministic",
        chunkIds: "deterministic",
        mangleExports: "deterministic",
        concatenateModules: true,
        removeAvailableModules: true,
        removeEmptyChunks: true,
        mergeDuplicateChunks: true,
        minimize: true,
        runtimeChunk: {
          name: "runtime",
        },
        splitChunks: {
          chunks: "all",
          maxInitialRequests: 30,
          maxAsyncRequests: 30,
          minSize: 15000,
          maxSize: 50000,
          cacheGroups: {
            default: false,
            vendors: false,
            framework: {
              name: "framework",
              test: /[\\/]node_modules[\\/](react|react-dom|next|@next)[\\/]/,
              priority: 50,
              chunks: "all",
              enforce: true,
              reuseExistingChunk: true,
            },
            lib: {
              test: /[\\/]node_modules[\\/]/,
              priority: 40,
              chunks: "async",
              name(module: any, chunks: any) {
                return `lib.${module.context?.split("/").slice(-2).join(".")}`;
              },
              minChunks: 2,
              reuseExistingChunk: true,
            },
            commons: {
              name: "commons",
              minChunks: 3,
              priority: 30,
              chunks: "all",
              reuseExistingChunk: true,
            },
            shared: {
              name(module: any, chunks: any) {
                return `shared.${chunks.map((chunk: any) => chunk.name).join(".")}`;
              },
              priority: 20,
              minChunks: 2,
              reuseExistingChunk: true,
              enforce: true,
            },
            styles: {
              name: "styles",
              test: /\.(css|scss|sass)$/,
              chunks: "all",
              enforce: true,
              reuseExistingChunk: true,
            },
          },
        },
      };

      // Optimisation des assets
      config.performance = {
        hints: "error",
        maxEntrypointSize: 170000,
        maxAssetSize: 170000,
      };
    }

    return config;
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
