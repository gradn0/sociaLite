/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "fer-uig.glitch.me",
      },
    ],
  },
};

export default nextConfig;
