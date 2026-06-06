import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'astroword.in',
          },
        ],
        destination: 'https://www.astroword.in/:path*',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
