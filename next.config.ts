import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    // Explicit root to avoid inference issues when the project sits inside a larger monorepo-like folder structure
    root: __dirname,
  },
};

export default nextConfig;
