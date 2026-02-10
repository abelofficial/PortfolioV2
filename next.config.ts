import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "avatars.githubusercontent.com",
                pathname: "**",
            },
            {
                protocol: "https",
                hostname: "www.datocms-assets.com",
                pathname: "**",
            },
        ],
    },
    experimental: {
        optimizePackageImports: ["lucide-react"],
    },
};

export default nextConfig;