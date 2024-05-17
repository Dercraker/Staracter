import { SiteConfig } from '@/utils/site-config';
import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SiteConfig.title,
    short_name: SiteConfig.title,
    description: SiteConfig.description,
    start_url: '/',
    display: 'standalone',
    background_color: '#fff',
    dir: 'ltr',
    lang: 'en',

    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  };
}
