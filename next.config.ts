import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'pbs.twimg.com',
        port: '',
        search: '',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',

      },
      {
        protocol: 'https',
        hostname: 'assets.aceternity.com',

      },
    ],
  },
};

export default nextConfig;
