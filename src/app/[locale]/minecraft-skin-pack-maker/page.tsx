import { Link as I18nLink } from '@/i18n/routing';
import { buildMetadata, canonicalFor, BASE_URL } from '@/lib/seo';
import { SoftwareAppSchema, FAQSchema, BreadcrumbSchema } from '@/components/seo';
import { Breadcrumb, SubpageHero, Section, FaqAccordion, RelatedPages } from '@/components/landing/Landing';
import { SKIN_PAGES, relatedPages } from '@/lib/skin/pages';

const PAGE = SKIN_PAGES.pack;

export const metadata = buildMetadata({
  title: 'Minecraft Skin Pack Maker – Make Bedrock .mcpack Files Free',
  description:
    'Make your own Minecraft skin pack free. Build multiple skins, name them, and export a ready-to-import .mcpack for Minecraft Bedrock Edition.',
  path: PAGE.href,
});

const FAQ = [
  { q: 'What is a Minecraft skin pack?', a: 'A skin pack is a single .mcpack file that bundles several skins together so you can install and switch between them inside Minecraft Bedrock.' },
  { q: 'Is a skin pack the same on Java and Bedrock?', a: 'No. Skin packs (.mcpack) are a Bedrock Edition feature. Java Edition applies one skin at a time, so on Java you just download and apply individual PNGs.' },
  { q: 'How do I install a skin pack?', a: 'On Bedrock (Windows / iOS / Android), open the .mcpack file and Minecraft imports it automatically. The pack then appears in the Dressing Room.' },
];

export default function MinecraftSkinPackMakerPage() {
  return (
    <main className="workbench-bg min-h-screen text-ink">
      <SoftwareAppSchema name="Minecraft Skin Pack Maker" description={metadata.description as string} url={canonicalFor(PAGE.href)} applicationCategory="DesignApplication" operatingSystem="Windows, iOS, Android" />
      <FAQSchema items={FAQ.map((f) => ({ question: f.q, answer: f.a }))} />
      <BreadcrumbSchema items={[{ name: 'Home', url: BASE_URL }, { name: PAGE.title, url: canonicalFor(PAGE.href) }]} />

      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
        <Breadcrumb title={PAGE.title} />
        <div className="mt-3">
          <SubpageHero
            eyebrow="BEDROCK SKIN PACKS"
            h1="Minecraft Skin Pack Maker"
            lead="Turn your skins into a single Minecraft Bedrock skin pack. Design each skin in the editor, then bundle them into a .mcpack you can import in one tap."
          />
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <I18nLink href={SKIN_PAGES.custom.href} prefetch={false} className="border-2 border-ink bg-grass px-5 py-2.5 font-semibold text-white shadow-block press-block">
            Make skins in the editor →
          </I18nLink>
          <span className="inline-flex items-center border-2 border-ink bg-paper px-4 py-2.5 text-sm font-semibold">
            One-click .mcpack export — coming soon
          </span>
        </div>

        <Section title="Build a skin pack from your skins">
          <p>
            Create each skin with the <I18nLink href={SKIN_PAGES.custom.href} prefetch={false} className="font-semibold text-grass-ink underline">custom skin maker</I18nLink>{' '}
            and download the PNGs. A skin pack simply groups several of these skins under one name so they show up
            together inside Minecraft.
          </p>
        </Section>

        <Section title="Export your skin pack (.mcpack)">
          <p>
            A Bedrock skin pack is a folder containing your skin PNGs plus a <code className="bg-paper px-1">manifest.json</code>{' '}
            and a <code className="bg-paper px-1">skins.json</code>, zipped and renamed to <code className="bg-paper px-1">.mcpack</code>.
            Automatic one-click export from your saved skins is on the way.
          </p>
        </Section>

        <Section title="How to import a skin pack into Minecraft Bedrock">
          <ol className="list-decimal space-y-1 pl-5">
            <li>Open the <code className="bg-paper px-1">.mcpack</code> file on Windows, iOS or Android.</li>
            <li>Minecraft launches and imports the pack automatically.</li>
            <li>Open the Dressing Room and pick any skin from your new pack.</li>
          </ol>
        </Section>

        <FaqAccordion items={FAQ} />
        <RelatedPages pages={relatedPages('pack', ['bedrock', 'custom', 'free'])} />
      </div>
    </main>
  );
}
