/** @type {import('next').NextConfig} */

console.log(process.env.NODE_ENV);
const dev = process.env.NODE_ENV !== 'production';

const nextConfig = {
  basePath: dev ? '' : '/wagnew',
  assetPrefix: dev ? '' : '/wagnew',
};

export default nextConfig;
