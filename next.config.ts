import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    turbopack:{
        root: process.cwd(),
    },

    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "flags.restcountries.com"
            },
        ],
    },
};

export default nextConfig;

