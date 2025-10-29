/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: '/JSON-tree-visualizer',
  assetPrefix: '/JSON-tree-visualizer/',
  webpack: (config:any) => {
    return config;
  },
};

module.exports = nextConfig;