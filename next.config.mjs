/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    domains: [
      `${
        process.env.NEXT_PUBLIC_NODE_ENV === "development"
          ? process.env.NEXT_PUBLIC_API_DEV
          : process.env.NEXT_PUBLIC_API_PRODUCTION
      }`,
    ],
  },
  experimental: {
    appDir: true,
  },
};

export default nextConfig;
