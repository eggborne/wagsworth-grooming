/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    remotePatterns: [     
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com', // Add Firebase Storage domain
      },
      {
        protocol: 'https',
        hostname: '**.wagsworth-editor.appspot.com', // Allow Firebase Storage URLs
      },
      {
        protocol: 'https',
        hostname: 'firebase-backend-beis.onrender.com', // Allow firebase-backend API
      },
      {
        protocol: 'https',
        hostname: 'images.dog.ceo',
      },
    ],
  },
  // compiler: {
  //   removeConsole: process.env.NODE_ENV === 'production',
  // }
};

export default nextConfig;
