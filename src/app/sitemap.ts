import type { MetadataRoute } from 'next';

const BASE_URL = 'https://mcskingenerator.com';

// Minimal sitemap for the initial launch. Expand as real pages ship.
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const paths = [
    '',
    '/ai-image-effects/ai-minecraft-skin',
    '/minecraft-skin',
    '/pricing',
    '/privacy',
    '/terms',
    '/contact',
  ];
  return paths.map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: path === '' ? 1 : 0.7,
  }));
}
