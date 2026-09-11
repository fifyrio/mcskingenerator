'use client';

import { Link as I18nLink } from '@/i18n/routing';

// Placeholder homepage. The final editor-first homepage (Voxel Workbench,
// see .stitch/DESIGN.md) is built in a later step.
export default function HomePageClient() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <section className="max-w-4xl mx-auto px-6 py-24">
        <h1 className="text-4xl font-bold">Minecraft Skin Maker</h1>
        <p className="mt-4 text-lg text-slate-600">
          Create your own Minecraft skin online — draw it, preview it, and download a PNG for Java &amp; Bedrock.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <I18nLink
            href="/ai-image-effects/ai-minecraft-skin"
            className="rounded-lg bg-slate-900 px-5 py-3 font-semibold text-white"
          >
            AI Minecraft Skin Maker
          </I18nLink>
          <I18nLink
            href="/minecraft-skin"
            className="rounded-lg border border-slate-300 px-5 py-3 font-semibold"
          >
            Skin Maker Landing
          </I18nLink>
        </div>
      </section>
    </div>
  );
}
