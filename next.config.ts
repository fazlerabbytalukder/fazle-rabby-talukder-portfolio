import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Server output (not static export): the contact form needs the /api/contact route to keep the Resend key server-side
  images: {
    // Images are served as-is (pre-sized local files)
    unoptimized: true,
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }],
  },
};

export default nextConfig;
