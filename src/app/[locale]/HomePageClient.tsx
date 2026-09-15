'use client';

import { useState } from 'react';
import { Link as I18nLink } from '@/i18n/routing';
import VoxelHeader from '@/components/common/VoxelHeader';
import SkinEditor from '@/components/editor/SkinEditor';
import TemplateCard from '@/components/editor/TemplateCard';
import { TEMPLATES } from '@/lib/skin/atlas';
import { HOME_FAQ } from '@/lib/home-content';

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
  { title: 'AI Minecraft Skin Maker', desc: 'Describe it or upload a photo — get a Minecraft skin in seconds, then keep editing it here.', href: '/ai-minecraft-skin-maker', cta: 'Try AI skins', accent: 'diamond', span: '' },
  { title: 'Custom Minecraft Skin Maker', desc: 'Layers, mirror drawing, palettes and templates for full control over every pixel.', cta: 'Open the editor', href: '/custom-minecraft-skin-maker', span: '' },
  { title: 'Minecraft Bedrock Skin Maker', desc: 'Design a 64×64 PNG and import it into Bedrock Edition via Dressing Room → Classic Skins.', cta: 'Bedrock guide', href: '/minecraft-bedrock-skin-maker', span: '' },
  { title: 'Free Minecraft Skin Maker', desc: 'The editor, templates and PNG downloads are free. No sign-up, no watermark.', cta: "Why it's free", href: '/free-minecraft-skin-maker', span: '' },
];

const STEPS = [
  { n: '01', title: 'Draw or pick a template', body: 'Start from a blank canvas, a ready-made template, or your own existing skin. Pick a color, choose the pencil, fill or eyedropper tool, and paint the head, body, arms and legs. Mirror drawing keeps both sides of your character symmetrical automatically.' },
  { n: '02', title: 'Preview in real-time 3D', body: 'Every pixel you place updates the rotating 3D model instantly. Switch between the Classic and Slim body types and toggle the outer layer on and off so you can check hats, jackets and sleeves from every angle before exporting.' },
  { n: '03', title: 'Download & play', body: 'When it looks right, download a clean 64×64 PNG that works in Minecraft Java Edition, or follow the Bedrock guide to import it in-game. There is no watermark and no limit on how many skins you save.' },
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
      <VoxelHeader />

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
            <p className="mt-3 max-w-3xl text-lg text-ink-muted">
              MCSkinGenerator is a free online skin maker for Minecraft that runs entirely in your browser — no
              download, no sign-up and no watermark. Draw your character pixel by pixel on a true 64×64 canvas,
              recolor one of the ready-made templates, or generate a skin from a photo, and watch it update live on
              a rotating 3D model. Everything you make works in both Minecraft Java and Bedrock Edition, and you can
              export a clean PNG (or a Bedrock skin pack) the moment it looks right.
            </p>
          </div>
          <SkinEditor template={template} templateNonce={templateNonce} />

          {/* How to use — guidance copy */}
          <div className="mt-6 grid gap-4 border-2 border-ink bg-chalk p-6 shadow-block sm:p-8 md:grid-cols-2">
            <div>
              <h2 className="font-pixel text-2xl">How to use this skin maker</h2>
              <p className="mt-3 text-ink-muted">
                Pick a color from the palette (or type an exact hex value), then choose a tool: the pencil paints
                single pixels, the fill bucket floods a whole region, and the eyedropper copies a color you have
                already used. Use the Head, Body, Arms and Legs tabs to focus on one part of your character at a time,
                and turn on mirror mode to paint both sides at once for clean, symmetrical results.
              </p>
            </div>
            <div>
              <p className="text-ink-muted md:mt-11">
                The right-hand panel shows your skin on a live 3D model. Rotate it, switch between the Classic (4px)
                and Slim (3px) body types, and toggle the base skin and outer layer so you can see exactly how hats
                and jackets sit on top. When you are done, click <span className="font-semibold text-ink">Download
                Skin (.PNG)</span> to save a game-ready file, or reset the canvas and start again — it is completely
                free, every single time.
              </p>
            </div>
          </div>
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
              <I18nLink href="/ai-minecraft-skin-maker" prefetch={false} className="mt-4 block border-2 border-ink bg-diamond px-4 py-2.5 text-center text-sm font-semibold text-ink shadow-block press-block">
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

        {/* Why use it */}
        <section className="mt-16 max-w-3xl">
          <p className="font-pixel text-sm text-grass-ink">03 // WHY MCSKINGENERATOR</p>
          <h2 className="font-pixel text-2xl sm:text-3xl">Built for Minecraft players, not designers</h2>
          <p className="mt-4 text-ink-muted">
            Most people who want a new Minecraft skin do not want to learn image-editing software — they just want a
            character that looks like them, or like the idea in their head. MCSkinGenerator keeps that simple. The
            canvas is a real 64×64 skin map, so what you draw is exactly what appears in game, and the live 3D preview
            means you never have to guess how a texture wraps around the model. Pick a color, block in the shapes, and
            adjust as you go.
          </p>
          <p className="mt-3 text-ink-muted">
            When you need a head start, the template library gives you a knight, a robot, a hoodie character and more
            to recolor, and the AI skin maker can turn a short description or a photo into a starting point in
            seconds. Whether you play Java or Bedrock, on a laptop or a phone, you get the same tools and the same
            clean PNG export — no accounts, no watermarks, and no paywall between you and a finished skin.
          </p>
        </section>

        {/* How it works */}
        <section className="mt-16">
          <p className="font-pixel text-sm text-grass-ink">04 // WORKFLOW</p>
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
          <p className="font-pixel text-sm text-grass-ink">05 // FAQ</p>
          <h2 className="font-pixel text-2xl sm:text-3xl">Frequently asked questions</h2>
          <div className="mt-6 space-y-3">
            {HOME_FAQ.map((f) => (
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
