import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'XFlix - Watch Free Movies & TV Shows',
    short_name: 'XFlix - Watch Free Movies & TV Shows',
    description: 'Watch unlimited movies and TV shows online free in HD, 1080p, 4K quality.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0f0f23',
    theme_color: '#0f0f23',
    icons: [
      {
        src: '/api/icon/192',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/api/icon/512',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
    ],
  };
}
