import { Metadata } from 'next';
import HomePageClient from './HomePageClient';
import { WebsiteSchema, BreadcrumbSchema, FAQSchema } from '@/components/seo';
import { HOME_FAQ } from '@/lib/home-content';

const BASE_URL = 'https://mcskingenerator.com';
const TITLE = 'Minecraft Skin Maker - Free Online Skin Creator';
const DESCRIPTION =
  'Free online Minecraft skin maker: draw your own skin pixel by pixel, preview it in 3D, use AI or templates, and download a PNG for Java & Bedrock.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: BASE_URL },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: BASE_URL,
    siteName: 'MCSkinGenerator',
    type: 'website',
    locale: 'en_US',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'MCSkinGenerator — free Minecraft skin maker' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    images: ['/og-image.png'],
  },
  robots: { index: true, follow: true },
};

export default function HomePage() {
  return (
    <>
      <WebsiteSchema
        name="MCSkinGenerator"
        url={BASE_URL}
        description="Free Minecraft skin maker: draw your own skin, preview in 3D, and download a PNG for Java & Bedrock."
      />
      <BreadcrumbSchema items={[{ name: 'Home', url: BASE_URL }]} />
      <FAQSchema items={HOME_FAQ.map((f) => ({ question: f.q, answer: f.a }))} />
      <HomePageClient />
    </>
  );
}
