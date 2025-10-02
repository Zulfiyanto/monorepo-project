/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@repo/ui", "@repo/auth", "@repo/utils"],
  experimental: {
    optimizePackageImports: ["@repo/ui"],
  },
};

module.exports = nextConfig;
