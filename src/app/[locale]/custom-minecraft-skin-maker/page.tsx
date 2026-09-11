import { buildMetadata, canonicalFor, BASE_URL } from '@/lib/seo';
import { SoftwareAppSchema, FAQSchema, BreadcrumbSchema } from '@/components/seo';
import { Breadcrumb, SubpageHero, Section, FaqAccordion, RelatedPages } from '@/components/landing/Landing';
import { SKIN_PAGES, relatedPages } from '@/lib/skin/pages';
import SkinEditor from '@/components/editor/SkinEditor';

const PAGE = SKIN_PAGES.custom;

export const metadata = buildMetadata({
  title: 'Custom Minecraft Skin Maker - Build Your Own Skin Online Free',
  description:
    'Create a custom Minecraft skin free online. Use layers, colors, brushes and templates, then download in seconds for Java & Bedrock.',
  path: PAGE.href,
});

const FAQ = [
  { q: 'How do I make a custom Minecraft skin?', a: 'Pick a color, draw on the 64×64 canvas part by part, turn on mirror for symmetry, then download the PNG. Everything happens in your browser — no account needed.' },
  { q: 'Can I edit an existing skin?', a: 'Yes. Use Import PNG to load any 64×64 Java or Bedrock skin, then keep editing it pixel by pixel.' },
  { q: 'Does the custom skin work on Java and Bedrock?', a: 'Yes. The exported 64×64 PNG works in Minecraft Java, and can be imported into Bedrock Edition on Windows, iOS and Android.' },
];

export default function CustomMinecraftSkinMakerPage() {
  return (
    <main className="workbench-bg min-h-screen text-ink">
      <SoftwareAppSchema name="Custom Minecraft Skin Maker" description={metadata.description as string} url={canonicalFor(PAGE.href)} applicationCategory="DesignApplication" />
      <FAQSchema items={FAQ.map((f) => ({ question: f.q, answer: f.a }))} />
      <BreadcrumbSchema items={[{ name: 'Home', url: BASE_URL }, { name: PAGE.title, url: canonicalFor(PAGE.href) }]} />

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <Breadcrumb title={PAGE.title} />
        <div className="mt-3">
          <SubpageHero
            eyebrow="CUSTOM SKIN EDITOR"
            h1="Custom Minecraft Skin Maker"
            lead="Build a custom Minecraft skin from scratch. Draw every pixel with layers, a color palette, mirror drawing and templates, then download a ready-to-use PNG."
          />
        </div>

        <div className="mt-6">
          <SkinEditor />
        </div>

        <Section title="Design your skin layer by layer">
          <p>
            Switch between the Head, Body, Arms and Legs regions and draw directly on the UV canvas. Toggle the
            outer layer to add a hat, jacket or sleeves on top of the base skin, and use mirror mode to keep both
            sides of your character perfectly symmetrical.
          </p>
        </Section>

        <Section title="Start from a custom skin template">
          <p>
            Not sure where to begin? Load one of the starter templates from the home page, recolor it, and make it
            your own — a fast way to build a custom skin without drawing every pixel by hand.
          </p>
        </Section>

        <Section title="How to use the custom skin maker">
          <ol className="list-decimal space-y-1 pl-5">
            <li>Pick a color from the palette (or type a hex value).</li>
            <li>Choose the pencil, fill, eyedropper or eraser tool.</li>
            <li>Draw on the 64×64 canvas — rotate the 3D preview to check your work.</li>
            <li>Click <span className="font-semibold text-ink">Download Skin (.PNG)</span> and add it to Minecraft.</li>
          </ol>
        </Section>

        <FaqAccordion items={FAQ} />
        <RelatedPages pages={relatedPages('custom', ['pack', 'free', 'ai'])} />
      </div>
    </main>
  );
}
