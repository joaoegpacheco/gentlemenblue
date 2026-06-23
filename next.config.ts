import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/favicon.ico",
        destination: "/images/logo.webp",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
