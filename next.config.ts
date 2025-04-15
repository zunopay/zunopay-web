import { NextConfig } from 'next'
import * as path from 'path'

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: '/privacy-policy',
        headers: [
          {
            key: 'Cache-Control',
            value: 'max-age=2592000, stale-while-revalidate=86400',
          },
        ],
      },
    ]
  },
  eslint: {
    dirs: ['src'],
  },
  env: {
  },
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  logging: {
    fetches: { fullUrl: true },
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
    ],
  },
  webpack(config) {
    config.resolve.fallback = { fs: false, net: false, tls: false }
    config.externals.push('pino-pretty', 'encoding')
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })
    config.module.rules.push({
      test: /\.md$/,
      use: 'raw-loader',
    })

    return config
  },
}

export default nextConfig;
