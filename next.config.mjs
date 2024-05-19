import createJiti from 'jiti';
import { env } from 'node:process';
import { fileURLToPath } from 'node:url';
const jiti = createJiti(fileURLToPath(import.meta.url));

jiti('./src/lib/env/server.ts');
jiti('./src/lib/env/client.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['tsx', 'ts'],
  experimental: {
    optimizePackageImports: [
      '@mantine/core',
      '@mantine/hooks',
      '@mantine/notifications',
    ],
  },
  sassOptions: {
    prependData: `@import "./_mantine.scss";`,
  },
  reactStrictMode: true,
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.discordapp.com',
        port: '',
        pathname: '/avatars/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 's3.dercraker.fr',
        port: '',
        pathname: `/${env.S3_BUCKET_NAME}/**`,
      },
      {
        protocol: 'https',
        hostname: 's3.dercraker.fr',
        port: '',
        pathname: '/staracter-dev/**',
      },
    ],
  },
};

export default nextConfig;
