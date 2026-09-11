'use client';

import { useState } from 'react';
import { Link as I18nLink } from '@/i18n/routing';
import SkinEditor from '@/components/editor/SkinEditor';
import TemplateCard from '@/components/editor/TemplateCard';
import { TEMPLATES } from '@/lib/skin/atlas';

const NAV = [
  { label: 'Editor', href: '#editor' },
  { label: 'Skin Packs', href: '#make' },
  { label: 'AI Skins', href: '/ai-image-effects/ai-minecraft-skin' },
  { label: 'Bedrock', href: '#make' },
  { label: 'Templates', href: '#start' },
];

const PROMPTS = ['Samurai golem', 'Mushroom maiden', 'Copper robot'];

interface Tile {
  title: string;
  desc: string;
  href?: string;
  cta: string;
  accent?: string;
  span: string;
  soon?: boolean;
}
const TILES: Tile[] = [
  { title: 'Minecraft Skin Pack Maker', desc: 'Bundle several skins into one pack with an auto-generated manifest, then import it into Minecraft Bedrock in one tap.', cta: 'Make a skin pack', href: '/minecraft-skin-pack-maker', span: 'sm:col-span-2' },
  { title: 'AI Minecraft Skin Maker', desc: 'Describe it or upload a photo — get a Minecraft skin in seconds, then keep editing it here.', href: '/ai-image-effects/ai-minecraft-skin', cta: 'Try AI skins', accent: 'diamond', span: '' },
  { title: 'Custom Minecraft Skin Maker', desc: 'Layers, mirror drawing, palettes and templates for full control over every pixel.', cta: 'Open the editor', href: '/custom-minecraft-skin-maker', span: '' },
  { title: 'Minecraft Bedrock Skin Maker', desc: 'Design a 64×64 PNG and import it into Bedrock Edition via Dressing Room → Classic Skins.', cta: 'Bedrock guide', href: '/minecraft-bedrock-skin-maker', span: '' },
  { title: 'Free Minecraft Skin Maker', desc: 'The editor, templates and PNG downloads are free. No sign-up, no watermark.', cta: "Why it's free", href: '/free-minecraft-skin-maker', span: '' },
];

const STEPS = [
  { n: '01', title: 'Draw or pick a template', body: 'Start from a blank canvas or a template. Mirror drawing keeps both sides symmetrical.' },
  { n: '02', title: 'Preview in real-time 3D', body: 'Rotate your character and toggle the outer layer to check every angle before you export.' },
  { n: '03', title: 'Download & play', body: 'Download a 64×64 PNG ready for Minecraft Java, or import it into Bedrock Edition.' },
];

const FAQ = [
  { q: 'How do I use my skin in Minecraft Java Edition?', a: 'Download the PNG, open the Minecraft Launcher, go to the Skins tab, click New Skin, pick Classic or Slim, and select your file.' },
  { q: 'Can I use these skins on Minecraft Bedrock?', a: 'Yes — on Windows, iOS and Android via Dressing Room → Classic Skins → Import. Consoles cannot import custom PNG skins.' },
  { q: "What's the difference between Classic (4px) and Slim (3px)?", a: 'Classic (Steve) has 4-pixel-wide arms; Slim (Alex) has 3-pixel-wide arms. Toggle the model in the 3D preview to match your character.' },
  { q: 'Is MCSkinGenerator free?', a: 'The editor, templates and PNG downloads are 100% free with no sign-up and no watermark.' },
];

export default function HomePageClient() {
  const [template, setTemplate] = useState<string | undefined>(undefined);
  const [templateNonce, setTemplateNonce] = useState(0);

  const loadTemplate = (id: string) => {
    setTemplate(id);
    setTemplateNonce((n) => n + 1);
    if (typeof document !== 'undefined') {
      document.getElementById('editor')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="workbench-bg min-h-screen text-ink">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b-2 border-ink bg-paper/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3 sm:px-6">
          <a href="#top" className="flex items-center gap-2">
            <span className="grid h-7 w-7 place-items-center border-2 border-ink bg-grass text-chalk">⛏</span>
            <span className="font-pixel text-lg">MCSkinGenerator</span>
          </a>
          <nav className="ml-6 hidden items-center gap-5 md:flex" aria-label="Main navigation">
            {NAV.map((n) => (
              <a key={n.label} href={n.href} className="text-sm font-semibold text-ink-muted hover:text-grass-ink">{n.label}</a>
            ))}
          </nav>
          <a href="#editor" className="ml-auto border-2 border-ink bg-chalk px-3 py-1.5 text-sm font-semibold shadow-block-sm press-block">
            Import PNG
          </a>
        </div>
      </header>

      <main id="top" className="mx-auto max-w-7xl px-4 pb-20 sm:px-6">
        {/* Hero + editor */}
        <section id="editor" aria-labelledby="hero-heading" className="pt-10">
          <div className="mb-6 border-2 border-ink bg-paper p-6 sm:p-8">
            <span className="inline-flex items-center gap-2 border-2 border-ink bg-chalk px-3 py-1 text-xs font-semibold">
              <span className="h-2 w-2 rounded-full bg-grass" /> Ready · 64×64 UV · Java &amp; Bedrock
            </span>
            <h1 id="hero-heading" className="mt-4 font-pixel text-3xl leading-tight sm:text-5xl">
              Minecraft Skin Maker – Create Your Own Skin Online
            </h1>
            <p className="mt-3 max-w-2xl text-lg text-ink-muted">
              The free skin maker for Minecraft: draw pixel by pixel, preview in 3D, and download a PNG for Java &amp; Bedrock.
            </p>
          </div>
          <SkinEditor template={template} templateNonce={templateNonce} />
        </section>

        {/* Quick starters */}
        <section id="start" className="mt-16">
          <p className="font-pixel text-sm text-grass-ink">01 // QUICK STARTERS</p>
          <h2 className="font-pixel text-2xl sm:text-3xl">Start from a popular base, or generate from text</h2>
          <div className="mt-6 grid gap-4 lg:grid-cols-3">
            <div className="lg:col-span-2 grid grid-cols-2 gap-4 sm:grid-cols-3">
              {TEMPLATES.map((t) => (
                <TemplateCard key={t.id} template={t} onSelect={loadTemplate} />
              ))}
            </div>
            <div className="border-2 border-diamond bg-diamond-tint p-5 shadow-block">
              <h3 className="font-pixel text-xl">Generate a skin with AI</h3>
              <p className="mt-1 text-sm text-ink-muted">Type anything from anime protagonists to voxel monsters.</p>
              <div className="mt-3 border-2 border-ink bg-chalk px-3 py-2 text-sm text-ink-soft">a neon cyberpunk ninja…</div>
              <div className="mt-2 flex flex-wrap gap-2">
                {PROMPTS.map((p) => (
                  <span key={p} className="border-2 border-ink bg-chalk px-2 py-1 text-xs">{p}</span>
                ))}
              </div>
              <I18nLink href="/ai-image-effects/ai-minecraft-skin" prefetch={false} className="mt-4 block border-2 border-ink bg-diamond px-4 py-2.5 text-center text-sm font-semibold text-ink shadow-block press-block">
                Generate skin
              </I18nLink>
            </div>
          </div>
        </section>

        {/* Bento of sub-pages */}
        <section id="make" className="mt-16">
          <p className="font-pixel text-sm text-grass-ink">02 // CAPABILITIES</p>
          <h2 className="font-pixel text-2xl sm:text-3xl">Everything you can make with MCSkinGenerator</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {TILES.map((tile) => {
              const inner = (
                <>
                  <div className="flex items-center gap-2">
                    <h3 className="font-pixel text-xl">{tile.title}</h3>
                    {tile.soon && <span className="border border-ink bg-paper px-1.5 py-0.5 text-[10px] font-bold uppercase">Soon</span>}
                  </div>
                  <p className="mt-2 text-sm text-ink-muted">{tile.desc}</p>
                  <span className={`mt-3 inline-block text-sm font-semibold ${tile.accent === 'diamond' ? 'text-diamond' : 'text-grass-ink'}`}>
                    {tile.cta} →
                  </span>
                </>
              );
              const cls = `border-2 border-ink p-5 shadow-block ${tile.accent === 'diamond' ? 'bg-diamond-tint' : 'bg-chalk'} ${tile.span}`;
              return tile.href ? (
                tile.href.startsWith('#') ? (
                  <a key={tile.title} href={tile.href} className={`${cls} press-block block`}>{inner}</a>
                ) : (
                  <I18nLink key={tile.title} href={tile.href} prefetch={false} className={`${cls} press-block block`}>{inner}</I18nLink>
                )
              ) : (
                <div key={tile.title} className={cls}>{inner}</div>
              );
            })}
          </div>
        </section>

        {/* How it works */}
        <section className="mt-16">
          <p className="font-pixel text-sm text-grass-ink">03 // WORKFLOW</p>
          <h2 className="font-pixel text-2xl sm:text-3xl">Create your skin in 3 steps</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {STEPS.map((s) => (
              <div key={s.n} className="border-2 border-ink bg-chalk p-5 shadow-block">
                <p className="font-pixel text-3xl text-grass-ink">{s.n}</p>
                <h3 className="mt-2 text-lg font-semibold">{s.title}</h3>
                <p className="mt-1 text-sm text-ink-muted">{s.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="mt-16 max-w-3xl">
          <p className="font-pixel text-sm text-grass-ink">04 // FAQ</p>
          <h2 className="font-pixel text-2xl sm:text-3xl">Frequently asked questions</h2>
          <div className="mt-6 space-y-3">
            {FAQ.map((f) => (
              <details key={f.q} className="group border-2 border-ink bg-chalk p-4 open:bg-paper">
                <summary className="cursor-pointer list-none font-semibold marker:hidden">
                  {f.q}
                </summary>
                <p className="mt-2 text-sm text-ink-muted">{f.a}</p>
              </details>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
