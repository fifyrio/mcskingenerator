const createNextIntlPlugin = require('next-intl/plugin');
const withNextIntl = createNextIntlPlugin();
const withMDX = require('@next/mdx')()

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],

  // Enable SWC minification for faster builds and smaller bundles
  swcMinify: true,

  // Enable gzip compression
  compress: true,

  // Optimize for production deployment
  output: 'standalone',

  images: {
    unoptimized: true,
  },

  // Optimize package imports to reduce bundle size
  experimental: {
    optimizePackageImports: ['@supabase/supabase-js', 'react-hot-toast', 'react-markdown'],
  },

  async redirects() {
    return [
      // Canonicalize to the bare domain (www -> non-www).
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.mcskingenerator.com' }],
        destination: 'https://mcskingenerator.com/:path*',
        permanent: true,
      },
      // Old AI route -> new keyword-direct slug.
      {
        source: '/ai-image-effects/ai-minecraft-skin',
        destination: '/ai-minecraft-skin-maker',
        permanent: true,
      },
    ];
  },
}

module.exports = withNextIntl(withMDX(nextConfig));
