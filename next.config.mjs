/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  basePath: process.env.NODE_ENV === 'production' ? '/portfolio-project' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/portfolio-project' : '',
};

export default nextConfig;

