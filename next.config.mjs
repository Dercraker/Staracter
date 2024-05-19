import createJiti from 'jiti';
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
        hostname: 's3.dercraker.fr',
        port: '',
        pathname: '/staracter-dev/**',
      },
      {
        protocol: 'https',
        hostname: 's3.dercraker.fr',
        port: '',
        pathname: '/staracter/**',
      },
    ],
  },
};

export default nextConfig;
