/** @type {import('next').NextConfig} */

// GitHub Pages project sites live under /<repo>. Set NEXT_PUBLIC_BASE_PATH
// (e.g. "/date-night") in CI for a subpath deploy; leave empty for a root/user site.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  basePath: basePath || undefined,
  assetPrefix: basePath || undefined,
  trailingSlash: true,
};

export default nextConfig;
