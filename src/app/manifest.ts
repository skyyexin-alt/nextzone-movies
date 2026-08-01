import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'XFlix - Watch Free Movies & TV Shows',
    short_name: 'XFlix-Movies',
    description: 'Watch unlimited movies and TV shows online free in HD, 1080p, 4K quality.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0f0f23',
    theme_color: '#0f0f23',
    icons: [
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
