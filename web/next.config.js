/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Never fail the production build on lint issues (there is no eslint config here).
  eslint: { ignoreDuringBuilds: true },
};

module.exports = nextConfig;
