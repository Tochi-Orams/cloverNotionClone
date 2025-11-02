import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https", // Or 'http' if needed, but 'https' is recommended
        hostname: "**", // This wildcard allows any hostname
        port: "", // Leave empty to allow any port
        pathname: "**", // This wildcard allows any path
      },
    ],
  },
};

export default nextConfig;
