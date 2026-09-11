'use client';

import { useEffect, useRef } from 'react';
import { SKIN_SIZE, composeFrontView, paintTemplate, type SkinTemplate } from '@/lib/skin/atlas';

const UNIT = 6; // px per skin-pixel in the thumbnail (16x32 unit grid)

export default function TemplateCard({ template, onSelect }: { template: SkinTemplate; onSelect: (id: string) => void }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const dest = canvasRef.current;
    if (!dest) return;
    const src = document.createElement('canvas');
    src.width = SKIN_SIZE;
    src.height = SKIN_SIZE;
    paintTemplate(src.getContext('2d')!, template.id);
    const ctx = dest.getContext('2d')!;
    ctx.clearRect(0, 0, dest.width, dest.height);
    composeFrontView(src, ctx, UNIT);
  }, [template.id]);

  return (
    <button
      type="button"
      onClick={() => onSelect(template.id)}
      className="group border-2 border-ink bg-chalk p-3 text-left shadow-block-sm press-block"
      aria-label={`Use the ${template.name} template`}
    >
      <div className="relative flex h-28 items-center justify-center border-2 border-ink/20 pixel-checker-bg">
        <canvas ref={canvasRef} width={16 * UNIT} height={32 * UNIT} className="crisp-pixel h-24 w-auto" />
        <span className="absolute right-1 top-1 border border-ink px-1 text-[9px] font-bold text-chalk" style={{ background: template.accent }}>
          {template.tag}
        </span>
      </div>
      <p className="mt-2 text-sm font-semibold">{template.name}</p>
      <span className="text-xs font-semibold text-grass-ink opacity-0 transition-opacity group-hover:opacity-100">Load in editor →</span>
    </button>
  );
}
