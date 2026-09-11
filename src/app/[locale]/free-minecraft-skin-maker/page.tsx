import { buildMetadata, canonicalFor, BASE_URL } from '@/lib/seo';
import { SoftwareAppSchema, FAQSchema, BreadcrumbSchema } from '@/components/seo';
import { Breadcrumb, SubpageHero, Section, FaqAccordion, RelatedPages } from '@/components/landing/Landing';
import { SKIN_PAGES, relatedPages } from '@/lib/skin/pages';
import SkinEditor from '@/components/editor/SkinEditor';

const PAGE = SKIN_PAGES.free;

export const metadata = buildMetadata({
  title: 'Free Minecraft Skin Maker - No Sign-Up, No Watermark',
  description:
    'Create Minecraft skins 100% free online. No sign-up, no watermark, no download limits. Use the free editor and template library.',
  path: PAGE.href,
});

const FAQ = [
  { q: 'Is this Minecraft skin maker really free?', a: 'Yes. The editor, templates and PNG downloads are free with no sign-up and no watermark. AI generation includes a free daily quota.' },
  { q: 'Do I need an account to download a skin?', a: 'No. You can draw and download PNG skins without creating an account.' },
  { q: 'Are there any download limits?', a: 'No limits on editing or PNG downloads. Only AI generations are metered by a daily free quota.' },
];

export default function FreeMinecraftSkinMakerPage() {
  return (
    <main className="workbench-bg min-h-screen text-ink">
      <SoftwareAppSchema name="Free Minecraft Skin Maker" description={metadata.description as string} url={canonicalFor(PAGE.href)} applicationCategory="DesignApplication" />
      <FAQSchema items={FAQ.map((f) => ({ question: f.q, answer: f.a }))} />
      <BreadcrumbSchema items={[{ name: 'Home', url: BASE_URL }, { name: PAGE.title, url: canonicalFor(PAGE.href) }]} />

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <Breadcrumb title={PAGE.title} />
        <div className="mt-3">
          <SubpageHero
            eyebrow="100% FREE"
            h1="Free Minecraft Skin Maker"
            lead="Make Minecraft skins completely free — no sign-up, no watermark, no download limits. Draw, preview in 3D, and download a PNG for Java & Bedrock."
          />
        </div>

        <div className="mt-6">
          <SkinEditor />
        </div>

        <Section title="The best free Minecraft skin editor">
          <p>
            A full pixel editor in your browser: draw tools, a 16-color palette, mirror drawing, a base and outer
            layer, and a live 3D preview — all free, with nothing to install.
          </p>
        </Section>

        <Section title="Free Minecraft skin templates">
          <p>
            Start from a free template on the home page and recolor it, or begin from a blank canvas. Every template
            and every download is free to use in your own worlds and on servers.
          </p>
        </Section>

        <Section title="Why our free skin maker">
          <ul className="list-disc space-y-1 pl-5">
            <li><span className="font-semibold text-ink">No sign-up</span> — start drawing immediately.</li>
            <li><span className="font-semibold text-ink">No watermark</span> — your skin, unbranded.</li>
            <li><span className="font-semibold text-ink">Unlimited</span> editing and PNG downloads.</li>
            <li>AI generation is also available with a free daily quota.</li>
          </ul>
        </Section>

        <FaqAccordion items={FAQ} />
        <RelatedPages pages={relatedPages('free', ['custom', 'ai', 'bedrock'])} />
      </div>
    </main>
  );
}
