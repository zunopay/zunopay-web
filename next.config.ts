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
    PRIVY_APPLICATION_ID: process.env.PRIVY_APPLICATION_ID,
    PRIVY_CLIENT_ID: process.env.PRIVY_CLIENT_ID,
    RPC_ENDPOINT: process.env.RPC_ENDPOINT
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
    config.externals['@solana/web3.js'] = 'commonjs @solana/web3.js'
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
