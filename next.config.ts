import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Fully static site — `next build` writes plain HTML/CSS/JS to /out
  output: "export",
  images: {
    // Static export has no image optimization server
    unoptimized: true,
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }],
  },
};

export default nextConfig;
