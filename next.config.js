/** @type {import('next').NextConfig} */

module.exports = {
  unstable_runtimeJS: false,
  reactStrictMode: true,
  swcMinify: true,
  compress: true,

  experimental: {
    legacyBrowsers: false,
    browsersListForSwc: true
  },

  images: {
    domains: ['image/png', 'image/webp', 's3-alpha.figma.com']
  }
};
