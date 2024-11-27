/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/',
        destination: '/page',
      },
    ];
  },
};

module.exports = nextConfig;