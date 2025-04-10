import type { NextConfig } from 'next';

const { i18n } = require('./next-i18next.config');

const nextConfig: NextConfig = {
  /* config options here */
  i18n: {
    ...i18n,
    defaultLocale: 'ar',
    localeDetection: false,
  },
  transpilePackages: [
    'antd',
    'rc-pagination',
    'rc-picker',
    'rc-util',
    'rc-select',
    'rc-dialog',
    '@ant-design/icons-svg',
  ],
  reactStrictMode: true,
  swcMinify: false,
  runtime: 'edge',
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
};

export default nextConfig;
