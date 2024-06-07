/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '127.0.0.1', // Allow localhost
        port: '9199',          // Your Firebase emulator port
      },
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com', // Add Firebase Storage domain
      },
      {
        protocol: 'https',
        hostname: '**.wagsworth-editor.appspot.com', // Allow Firebase Storage URLs
      },
    ],
  },
  // compiler: {
  //   removeConsole: process.env.NODE_ENV === 'production',
  // }
};

export default nextConfig;
