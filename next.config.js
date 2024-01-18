/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "fmissk0fg7gckfll.public.blob.vercel-storage.com",
      },
    ],
  },
};

module.exports = nextConfig;
