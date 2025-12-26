import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  reactCompiler: true,
  trailingSlash: true,
  allowedDevOrigins: ['*'],
};

export default nextConfig;