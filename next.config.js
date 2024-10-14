/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['videodelivery.net', 'imagedelivery.net'],
  },
  compiler: {
    styledComponents: true,
  },
};

module.exports = nextConfig;
