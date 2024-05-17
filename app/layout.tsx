import '@/styles/background.css';
import { SiteConfig } from '@/utils/site-config';
import { ColorSchemeScript } from '@mantine/core';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import type { ReactNode } from 'react';

import { Providers } from './providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: SiteConfig.title,
  description: SiteConfig.description,
  applicationName: SiteConfig.title,
  authors: [
    {
      name: SiteConfig.maker.name,
      url: SiteConfig.maker.website,
    },
  ],
  generator: 'Next.js',
  keywords: [
    'Next.js',
    'React',
    'TypeScript',
    'Mantine',
    'Now.ts',
    'Boilerplate',
  ],
  creator: 'Dercraker',
  publisher: 'Vercel',
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children?: React.ReactNode;
}> & { modal?: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript defaultColorScheme="dark" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>
      <body className={inter.className}>
        <Providers>
          {children}
          {modal}
        </Providers>
      </body>
    </html>
  );
}
