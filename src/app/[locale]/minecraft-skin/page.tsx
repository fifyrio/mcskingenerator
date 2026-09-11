import { Link as I18nLink } from '@/i18n/routing';
import { buildMetadata, canonicalFor, BASE_URL } from '@/lib/seo';
import { FAQSchema, BreadcrumbSchema } from '@/components/seo';
import { Breadcrumb, SubpageHero, Section, FaqAccordion, RelatedPages } from '@/components/landing/Landing';
import { SKIN_PAGES, relatedPages } from '@/lib/skin/pages';

const PATH = '/minecraft-skin';

export const metadata = buildMetadata({
  title: 'How to Make a Minecraft Skin – Free Online Guide | MCSkinGenerator',
  description:
    'Learn how to make a Minecraft skin the easy way: draw one pixel by pixel, generate it with AI, or start from a template, then download a PNG for Java & Bedrock.',
  path: PATH,
});

const FAQ = [
  { q: 'What is a Minecraft skin?', a: 'A Minecraft skin is the texture wrapped around your character. It is a small 64×64 PNG image where each region maps to a body part — head, body, arms and legs — plus an outer layer for hats and clothing.' },
  { q: 'What is the easiest way to make a Minecraft skin?', a: 'The fastest way is to open a browser skin maker, start from a template, recolor it, and download the PNG. No software to install and no account required.' },
  { q: 'Do I need any software to make a skin?', a: 'No. Everything runs in your browser. You draw on a 64×64 canvas, preview your character in 3D, and export a PNG that Minecraft can read directly.' },
  { q: 'What resolution should a Minecraft skin be?', a: 'Standard skins are 64×64 pixels. Older skins used 64×32; modern Java and Bedrock both use the full 64×64 layout with a second (overlay) layer.' },
];

interface Way {
  title: string;
  body: string;
  href: string;
  cta: string;
}
const WAYS: Way[] = [
  { title: 'Draw it in the editor', body: 'Paint pixel by pixel with tools, a palette and mirror drawing. Best when you want full control.', href: '/', cta: 'Open the skin editor' },
  { title: 'Generate it with AI', body: 'Describe a character or upload a photo and let AI build the skin, then fine-tune it in the editor.', href: SKIN_PAGES.ai.href, cta: 'Try the AI skin maker' },
  { title: 'Start from a template', body: 'Pick a ready-made base — knight, robot, hoodie and more — and recolor it in seconds.', href: SKIN_PAGES.custom.href, cta: 'Browse templates' },
];

export default function MinecraftSkinGuidePage() {
  return (
    <main className="workbench-bg min-h-screen text-ink">
      <FAQSchema items={FAQ.map((f) => ({ question: f.q, answer: f.a }))} />
      <BreadcrumbSchema items={[{ name: 'Home', url: BASE_URL }, { name: 'How to Make a Minecraft Skin', url: canonicalFor(PATH) }]} />

      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
        <Breadcrumb title="How to Make a Minecraft Skin" />
        <div className="mt-3">
          <SubpageHero
            eyebrow="GUIDE"
            h1="How to Make a Minecraft Skin"
            lead="Three simple ways to make your own Minecraft skin — draw it, generate it with AI, or start from a template — then download a 64×64 PNG for Java & Bedrock."
          />
        </div>

        <Section title="Three ways to make a skin">
          <div className="mt-2 grid gap-4 sm:grid-cols-3">
            {WAYS.map((w) => (
              <I18nLink key={w.title} href={w.href} prefetch={false} className="block border-2 border-ink bg-chalk p-4 shadow-block press-block">
                <p className="font-pixel text-lg text-ink">{w.title}</p>
                <p className="mt-2 text-sm text-ink-muted">{w.body}</p>
                <span className="mt-3 inline-block text-sm font-semibold text-grass-ink">{w.cta} →</span>
              </I18nLink>
            ))}
          </div>
        </Section>

        <Section title="Java vs Bedrock skins">
          <p>
            Both editions use the same 64×64 PNG skin file, so a skin you make here works in either one. The
            difference is how you apply it: in <span className="font-semibold text-ink">Java Edition</span> you upload
            the PNG through the Minecraft Launcher or minecraft.net; in{' '}
            <span className="font-semibold text-ink">Bedrock Edition</span> you import it in-game through the Dressing
            Room on Windows, iOS or Android. See the{' '}
            <I18nLink href={SKIN_PAGES.bedrock.href} prefetch={false} className="font-semibold text-grass-ink underline">Bedrock skin guide</I18nLink>{' '}
            for the exact steps.
          </p>
        </Section>

        <Section title="How a Minecraft skin is laid out">
          <p>
            A skin texture is an unwrapped map of the character. The top-left holds the head, the middle holds the
            body and arms, and the lower area holds the legs — each as a small set of cube faces. A second{' '}
            <span className="font-semibold text-ink">overlay layer</span> sits on top for hats, jackets and sleeves.
            Characters come in two shapes: <span className="font-semibold text-ink">Classic (Steve)</span> with
            4-pixel arms and <span className="font-semibold text-ink">Slim (Alex)</span> with 3-pixel arms — you can
            switch between them in the 3D preview.
          </p>
        </Section>

        <Section title="Make your skin now">
          <p className="mb-3">Ready to start? Open the editor and you will have a downloadable skin in a couple of minutes.</p>
          <I18nLink href="/" prefetch={false} className="inline-block border-2 border-ink bg-grass px-5 py-2.5 font-semibold text-white shadow-block press-block">
            Open the Minecraft Skin Maker →
          </I18nLink>
        </Section>

        <FaqAccordion items={FAQ} />
        <RelatedPages pages={relatedPages('', ['custom', 'ai', 'bedrock', 'free'])} />
      </div>
    </main>
  );
}
