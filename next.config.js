/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["checks-over-stripes.s3.ap-southeast-1.amazonaws.com"],
  },
  experimental: {
    appDir: true,
  },
}

module.exports = nextConfig
