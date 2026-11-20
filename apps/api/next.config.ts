import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["db", "validation"],
};

export default nextConfig;
