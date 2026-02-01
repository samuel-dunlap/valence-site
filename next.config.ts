import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export", // Static export for GitHub Pages
  trailingSlash: true,
  images: {
    // Image optimization disabled because static export doesn't support Next.js Image API.
    // Images are manually optimized to WebP format before deployment.
    // See: https://nextjs.org/docs/app/building-your-application/deploying/static-exports#image-optimization
    unoptimized: true,
  },
};

export default nextConfig;
