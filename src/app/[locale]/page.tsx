import { Metadata } from 'next';
import HomePageClient from './HomePageClient';
import { WebsiteSchema, BreadcrumbSchema, FAQSchema } from '@/components/seo';

const BASE_URL = 'https://mcskingenerator.com';

const FAQ_ITEMS = [
  { question: 'How do I use my skin in Minecraft Java Edition?', answer: 'Download the PNG, open the Minecraft Launcher, go to the Skins tab, click New Skin, pick Classic or Slim, and select your file.' },
  { question: 'Can I use these skins on Minecraft Bedrock?', answer: 'Yes — on Windows, iOS and Android via Dressing Room → Classic Skins → Import. Consoles cannot import custom PNG skins.' },
  { question: "What's the difference between Classic (4px) and Slim (3px)?", answer: 'Classic (Steve) has 4-pixel-wide arms; Slim (Alex) has 3-pixel-wide arms. Toggle the model in the 3D preview to match your character.' },
  { question: 'Is MCSkinGenerator free?', answer: 'The editor, templates and PNG downloads are 100% free with no sign-up and no watermark.' },
];

export const metadata: Metadata = {
  title: 'Minecraft Skin Maker – Create Your Own Skin Online | MCSkinGenerator',
  description:
    'Free skin maker for Minecraft: draw your own skin pixel by pixel, preview in 3D, and download a PNG for Java & Bedrock.',
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
      <FAQSchema items={FAQ_ITEMS} />
      <HomePageClient />
    </>
  );
}
