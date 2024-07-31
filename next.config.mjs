/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://backend-t05h.onrender.com/api/:path*",
      },
    ];
  },
};

export default nextConfig;
