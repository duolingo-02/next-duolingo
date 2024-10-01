import withPWA from 'next-pwa';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Webpack custom configuration
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/, // Handling SVG files
      use: ['@svgr/webpack'],
    });
    return config;
  },

  // Image optimization settings
  images: {
    domains: ['cdn.countryflags.com','loremflickr.com', 'picsum.photos'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.countryflags.com',
        pathname: '/thumbs/**',
      },
    ],
  },
};

// Separate PWA configuration and do not spread it with nextConfig
export default withPWA({
  dest: 'public', // Directory for service worker and cached files
  disable: process.env.NODE_ENV === 'development', // Disable PWA in development
})(nextConfig); // Apply PWA only to the overall config
