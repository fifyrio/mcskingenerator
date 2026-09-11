import { buildMetadata, canonicalFor, BASE_URL } from '@/lib/seo';
import { SoftwareAppSchema, FAQSchema, BreadcrumbSchema } from '@/components/seo';
import { Breadcrumb, SubpageHero, Section, FaqAccordion, RelatedPages } from '@/components/landing/Landing';
import { SKIN_PAGES, relatedPages } from '@/lib/skin/pages';
import SkinEditor from '@/components/editor/SkinEditor';

const PAGE = SKIN_PAGES.bedrock;

export const metadata = buildMetadata({
  title: 'Minecraft Bedrock Skin Maker – Make & Import Skins Free',
  description:
    'Make Minecraft Bedrock skins online free. Design a 64×64 PNG, preview it in 3D, and import it into Bedrock Edition with a step-by-step guide.',
  path: PAGE.href,
});

const FAQ = [
  { q: 'How do I import a skin into Minecraft Bedrock?', a: 'Open Minecraft Bedrock, go to the Dressing Room, choose Classic Skins, select an empty slot, choose Import, and pick your downloaded PNG. Available on Windows, iOS and Android.' },
  { q: 'What size should a Bedrock skin be?', a: 'A standard Bedrock skin is a 64×64 PNG. This editor exports exactly that size.' },
  { q: 'Can I import a custom skin on console (Xbox / PlayStation / Switch)?', a: 'No. Consoles do not support importing custom PNG skins — use Windows, iOS or Android to import, or use the in-game marketplace on console.' },
];

const STEPS = [
  'Design your skin above, then click Download Skin (.PNG).',
  'Open Minecraft Bedrock Edition and go to the Dressing Room.',
  'Select Classic Skins → an empty slot → Import.',
  'Choose your PNG file and pick Classic (Steve) or Slim (Alex), then equip it.',
];

export default function MinecraftBedrockSkinMakerPage() {
  return (
    <main className="workbench-bg min-h-screen text-ink">
      <SoftwareAppSchema name="Minecraft Bedrock Skin Maker" description={metadata.description as string} url={canonicalFor(PAGE.href)} applicationCategory="DesignApplication" operatingSystem="Windows, iOS, Android" />
      <FAQSchema items={FAQ.map((f) => ({ question: f.q, answer: f.a }))} />
      <BreadcrumbSchema items={[{ name: 'Home', url: BASE_URL }, { name: PAGE.title, url: canonicalFor(PAGE.href) }]} />

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <Breadcrumb title={PAGE.title} />
        <div className="mt-3">
          <SubpageHero
            eyebrow="BEDROCK EDITION"
            h1="Minecraft Bedrock Skin Maker"
            lead="Design a Bedrock-ready Minecraft skin online, preview it in 3D, and import the 64×64 PNG into Minecraft Bedrock on Windows, iOS or Android."
          />
        </div>

        <div className="mt-6">
          <SkinEditor />
        </div>

        <Section title="Create Bedrock-compatible skins">
          <p>
            Bedrock Edition uses a 64×64 PNG skin, the same format this editor exports. Draw your character, toggle
            the Classic (Steve) or Slim (Alex) model in the 3D preview to match your account, then download.
          </p>
        </Section>

        <Section title="Download your Bedrock skin (.png)">
          <p>
            Click Download Skin (.PNG) to save a 64×64 PNG. Keep it somewhere easy to find on your device — you will
            select it during import.
          </p>
        </Section>

        <Section title="How to import a skin into Bedrock Edition">
          <ol className="list-decimal space-y-1 pl-5">
            {STEPS.map((s) => (<li key={s}>{s}</li>))}
          </ol>
          <p className="mt-3 text-sm text-ink-soft">
            Menu names can vary slightly between Bedrock versions. Importing custom PNG skins is supported on
            Windows, iOS and Android, but not on consoles.
          </p>
        </Section>

        <FaqAccordion items={FAQ} />
        <RelatedPages pages={relatedPages('bedrock', ['pack', 'ai', 'custom'])} />
      </div>
    </main>
  );
}
