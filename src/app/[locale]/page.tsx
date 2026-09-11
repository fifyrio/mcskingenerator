import { Metadata } from 'next';
import HomePageClient from './HomePageClient';
import { WebsiteSchema, BreadcrumbSchema } from '@/components/seo';

const BASE_URL = 'https://mcskingenerator.com';

export const metadata: Metadata = {
  title: 'Minecraft Skin Maker – Create Your Own Skin Online | MCSkinGenerator',
  description:
    'Free skin maker for Minecraft: draw your own skin, preview in 3D, and download a PNG for Java & Bedrock.',
  alternates: { canonical: BASE_URL },
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
      <HomePageClient />
    </>
  );
}
