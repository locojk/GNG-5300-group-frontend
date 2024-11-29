import { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: "standalone",

  // Proxy setup for API requests
  async rewrites() {
    return [
      {
        source: '/api/:path*', // Proxy any request starting with /api/
        destination: 'http://localhost:8000/api/:path*', // Redirect to backend
      },
    ];
  },
};

export default nextConfig;
