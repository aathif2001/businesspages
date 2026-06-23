import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: '/sample6vite2next',
  /* config options here */
  images: {
    // 1. Allow external/remote image sources securely
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],

    // 2. Control preferred modern formats (Default handles webp automatically)
    formats: ['image/avif', 'image/webp'],

    // 3. Set the default image caching TTL in seconds (Default is 60 seconds)
    minimumCacheTTL: 60,

    // 4. Disable optimization API and use a third-party service provider (optional)
    loader: 'default', // Can be 'custom', 'cloudinary', 'imgix', etc.
    
    // 5. Enable unoptimized images globally (disables processing entirely)
    unoptimized: false,
  }
};

export default nextConfig;
