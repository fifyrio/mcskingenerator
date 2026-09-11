import type { Metadata } from 'next';

export const BASE_URL = 'https://mcskingenerator.com';

export function canonicalFor(path: string): string {
  return `${BASE_URL}${path === '/' ? '' : path}`;
}

interface BuildMetadataArgs {
  title: string;
  description: string;
  path: string;
}

/** Shared metadata builder: title/description/canonical + OG/robots. No `keywords` (TDH). */
export function buildMetadata({ title, description, path }: BuildMetadataArgs): Metadata {
  const url = canonicalFor(path);
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: 'MCSkinGenerator',
      locale: 'en_US',
      type: 'website',
    },
    twitter: { card: 'summary_large_image', title, description },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
    },
  };
}
