/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // This ensures assets work correctly on GitHub Pages
  basePath: process.env.NODE_ENV === 'production' ? '/portfolio-project' : '',
  // Disable asset prefix in development
  assetPrefix: process.env.NODE_ENV === 'production' ? '/portfolio-project' : '',
};

export default nextConfig;
