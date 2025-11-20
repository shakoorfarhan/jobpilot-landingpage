import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",                  // Static export
  images: { unoptimized: true },     // Needed for S3
  reactCompiler: true,
  trailingSlash: true,
};

export default nextConfig;