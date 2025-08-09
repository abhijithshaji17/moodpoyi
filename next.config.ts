import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      };
      config.resolve.alias = {
        ...config.resolve.alias,
        encoding: "./empty.js",
      };
    }
    return config;
  },
};

export default nextConfig;
