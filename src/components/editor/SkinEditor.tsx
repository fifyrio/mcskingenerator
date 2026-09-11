'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { SKIN_SIZE, PALETTE, PARTS, paintDefaultSkin, paintTemplate, type SkinPartId } from '@/lib/skin/atlas';

interface SkinEditorProps {
  /** Optional template id to load into the canvas. */
  template?: string;
  /** Bump this to re-load `template` even if the id is unchanged. */
  templateNonce?: number;
}

type Tool = 'pencil' | 'eraser' | 'eyedropper' | 'bucket';

const TOOLS: { id: Tool; label: string; icon: string }[] = [
  { id: 'pencil', label: 'Pencil', icon: '✏️' },
  { id: 'eraser', label: 'Eraser', icon: '⌫' },
  { id: 'eyedropper', label: 'Pick', icon: '💧' },
  { id: 'bucket', label: 'Fill', icon: '🪣' },
];

const PART_TABS: { id: SkinPartId; label: string }[] = [
  { id: 'head', label: 'Head' },
  { id: 'body', label: 'Body' },
  { id: 'arms', label: 'Arms' },
  { id: 'legs', label: 'Legs' },
];

const VIEW = 512; // visible canvas internal resolution
const SCALE = VIEW / SKIN_SIZE;

export default function SkinEditor({ template, templateNonce }: SkinEditorProps = {}) {
  const textureRef = useRef<HTMLCanvasElement | null>(null); // 64x64 source of truth
  const drawRef = useRef<HTMLCanvasElement | null>(null); // scaled editable view
  const preview3dRef = useRef<HTMLCanvasElement | null>(null);
  const viewerRef = useRef<{ loadSkin: (u: string, o?: { model: 'default' | 'slim' }) => void; dispose?: () => void; playerObject?: any } | null>(null);
  const paintingRef = useRef(false);

  const [tool, setTool] = useState<Tool>('pencil');
  const [color, setColor] = useState<string>('#3E8E2A');
  const [mirror, setMirror] = useState(false);
  const [activePart, setActivePart] = useState<SkinPartId>('head');
  const [model, setModel] = useState<'default' | 'slim'>('default');
  const [showBase, setShowBase] = useState(true);
  const [showOverlay, setShowOverlay] = useState(true);
  const [ready, setReady] = useState(false);

  // Ensure the offscreen texture canvas exists (client only).
  const getTexture = useCallback((): HTMLCanvasElement => {
    if (!textureRef.current) {
      const c = document.createElement('canvas');
      c.width = SKIN_SIZE;
      c.height = SKIN_SIZE;
      const ctx = c.getContext('2d')!;
      ctx.imageSmoothingEnabled = false;
      paintDefaultSkin(ctx);
      textureRef.current = c;
    }
    return textureRef.current;
  }, []);

  const renderView = useCallback(() => {
    const view = drawRef.current;
    const tex = getTexture();
    if (!view) return;
    const ctx = view.getContext('2d')!;
    ctx.imageSmoothingEnabled = false;
    ctx.clearRect(0, 0, VIEW, VIEW);
    // transparent checker is provided by CSS behind the canvas
    ctx.drawImage(tex, 0, 0, SKIN_SIZE, SKIN_SIZE, 0, 0, VIEW, VIEW);
    // pixel grid
    ctx.strokeStyle = 'rgba(27,27,31,0.08)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    for (let i = 0; i <= SKIN_SIZE; i++) {
      const p = i * SCALE + 0.5;
      ctx.moveTo(p, 0); ctx.lineTo(p, VIEW);
      ctx.moveTo(0, p); ctx.lineTo(VIEW, p);
    }
    ctx.stroke();
    // active-part outline
    const b = PARTS[activePart].bounds;
    ctx.strokeStyle = '#3E8E2A';
    ctx.lineWidth = 2;
    ctx.strokeRect(b.x * SCALE, b.y * SCALE, b.w * SCALE, b.h * SCALE);
  }, [activePart, getTexture]);

  const scheduleRef = useRef<number | null>(null);
  const update3d = useCallback(() => {
    if (scheduleRef.current) cancelAnimationFrame(scheduleRef.current);
    scheduleRef.current = requestAnimationFrame(() => {
      const viewer = viewerRef.current;
      if (!viewer) return;
      try {
        viewer.loadSkin(getTexture().toDataURL('image/png'), { model });
      } catch {
        /* viewer not ready */
      }
    });
  }, [getTexture, model]);

  // Initialise the 3D viewer once.
  useEffect(() => {
    let disposed = false;
    getTexture();
    renderView();
    setReady(true);
    (async () => {
      const mod = await import('skinview3d');
      if (disposed || !preview3dRef.current) return;
      const viewer = new mod.SkinViewer({
        canvas: preview3dRef.current,
        width: 320,
        height: 400,
        skin: getTexture().toDataURL('image/png'),
      });
      viewer.animation = new mod.IdleAnimation();
      viewer.autoRotate = true;
      viewer.autoRotateSpeed = 0.5;
      viewer.zoom = 0.9;
      viewerRef.current = viewer as unknown as typeof viewerRef.current;
      applyLayerVisibility();
    })();
    return () => {
      disposed = true;
      viewerRef.current?.dispose?.();
      viewerRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const applyLayerVisibility = useCallback(() => {
    const po = viewerRef.current?.playerObject;
    if (!po) return;
    for (const part of ['head', 'body', 'rightArm', 'leftArm', 'rightLeg', 'leftLeg'] as const) {
      const seg = po.skin?.[part];
      if (seg?.innerLayer) seg.innerLayer.visible = showBase;
      if (seg?.outerLayer) seg.outerLayer.visible = showOverlay;
    }
  }, [showBase, showOverlay]);

  useEffect(() => { applyLayerVisibility(); }, [applyLayerVisibility]);
  useEffect(() => { update3d(); }, [model, update3d]);
  useEffect(() => { renderView(); }, [activePart, renderView]);

  // Load a template into the canvas when selected from the home page.
  useEffect(() => {
    if (!template) return;
    paintTemplate(getTexture().getContext('2d')!, template);
    renderView();
    update3d();
  }, [template, templateNonce, getTexture, renderView, update3d]);

  // ---- drawing ----
  const setPixel = (px: number, py: number, erase: boolean) => {
    const ctx = getTexture().getContext('2d')!;
    const put = (x: number, y: number) => {
      if (x < 0 || y < 0 || x >= SKIN_SIZE || y >= SKIN_SIZE) return;
      if (erase) {
        ctx.clearRect(x, y, 1, 1);
      } else {
        ctx.fillStyle = color;
        ctx.fillRect(x, y, 1, 1);
      }
    };
    put(px, py);
    if (mirror) {
      const b = PARTS[activePart].bounds;
      if (px >= b.x && px < b.x + b.w) put(b.x + (b.x + b.w - 1 - px), py);
    }
  };

  const pixelToColor = (px: number, py: number): string | null => {
    const ctx = getTexture().getContext('2d')!;
    const d = ctx.getImageData(px, py, 1, 1).data;
    if (d[3] === 0) return null;
    return `#${[d[0], d[1], d[2]].map((v) => v.toString(16).padStart(2, '0')).join('')}`;
  };

  const bucketFill = (sx: number, sy: number) => {
    const ctx = getTexture().getContext('2d')!;
    const img = ctx.getImageData(0, 0, SKIN_SIZE, SKIN_SIZE);
    const data = img.data;
    const idx = (x: number, y: number) => (y * SKIN_SIZE + x) * 4;
    const start = idx(sx, sy);
    const target = [data[start], data[start + 1], data[start + 2], data[start + 3]];
    const hex = color.replace('#', '');
    const fillC = [parseInt(hex.slice(0, 2), 16), parseInt(hex.slice(2, 4), 16), parseInt(hex.slice(4, 6), 16), 255];
    if (target.every((v, i) => v === fillC[i])) return;
    const stack = [[sx, sy]];
    const match = (i: number) => data[i] === target[0] && data[i + 1] === target[1] && data[i + 2] === target[2] && data[i + 3] === target[3];
    while (stack.length) {
      const [x, y] = stack.pop()!;
      if (x < 0 || y < 0 || x >= SKIN_SIZE || y >= SKIN_SIZE) continue;
      const i = idx(x, y);
      if (!match(i)) continue;
      data[i] = fillC[0]; data[i + 1] = fillC[1]; data[i + 2] = fillC[2]; data[i + 3] = fillC[3];
      stack.push([x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]);
    }
    ctx.putImageData(img, 0, 0);
  };

  const eventToPixel = (e: React.PointerEvent<HTMLCanvasElement>): [number, number] => {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = Math.floor(((e.clientX - rect.left) / rect.width) * SKIN_SIZE);
    const py = Math.floor(((e.clientY - rect.top) / rect.height) * SKIN_SIZE);
    return [px, py];
  };

  const applyAt = (px: number, py: number) => {
    if (tool === 'eyedropper') {
      const c = pixelToColor(px, py);
      if (c) setColor(c);
      return;
    }
    if (tool === 'bucket') {
      bucketFill(px, py);
    } else {
      setPixel(px, py, tool === 'eraser');
    }
    renderView();
    update3d();
  };

  const onPointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    paintingRef.current = true;
    const [px, py] = eventToPixel(e);
    applyAt(px, py);
  };
  const onPointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!paintingRef.current || tool === 'eyedropper' || tool === 'bucket') return;
    const [px, py] = eventToPixel(e);
    setPixel(px, py, tool === 'eraser');
    renderView();
    update3d();
  };
  const onPointerUp = () => { paintingRef.current = false; };

  const resetToDefault = () => {
    const ctx = getTexture().getContext('2d')!;
    paintDefaultSkin(ctx);
    renderView();
    update3d();
  };
  const clearAll = () => {
    getTexture().getContext('2d')!.clearRect(0, 0, SKIN_SIZE, SKIN_SIZE);
    renderView();
    update3d();
  };
  const download = () => {
    getTexture().toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'minecraft-skin.png';
      a.click();
      URL.revokeObjectURL(url);
    }, 'image/png');
  };

  const btn = 'inline-flex items-center justify-center border-2 border-ink bg-chalk press-block';

  return (
    <div className="grid gap-4 lg:grid-cols-[300px_minmax(0,1fr)_340px]">
      {/* Toolbox */}
      <div className="border-2 border-ink bg-chalk shadow-block p-4">
        <p className="font-pixel text-lg text-ink mb-3">Toolbox</p>
        <div className="grid grid-cols-4 gap-2">
          {TOOLS.map((t) => (
            <button
              key={t.id}
              type="button"
              aria-label={t.label}
              aria-pressed={tool === t.id}
              onClick={() => setTool(t.id)}
              className={`${btn} aspect-square text-lg ${tool === t.id ? 'bg-ink text-chalk shadow-none' : ''}`}
            >
              <span aria-hidden>{t.icon}</span>
            </button>
          ))}
        </div>

        <div className="mt-4 flex items-center gap-2">
          <button
            type="button"
            aria-pressed={mirror}
            onClick={() => setMirror((m) => !m)}
            className={`${btn} px-3 py-2 text-xs font-semibold ${mirror ? 'bg-ink text-chalk shadow-none' : ''}`}
          >
            ⇄ Mirror
          </button>
          <button type="button" onClick={clearAll} className={`${btn} px-3 py-2 text-xs font-semibold text-redstone`}>Clear</button>
        </div>

        <div className="mt-4">
          <p className="text-2xs font-extrabold uppercase tracking-widest text-ink-soft mb-2">Color</p>
          <div className="flex items-center gap-2 mb-2">
            <span className="h-8 w-8 border-2 border-ink" style={{ background: color }} />
            <input
              aria-label="Hex color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="w-24 border-2 border-ink bg-paper px-2 py-1 font-mono text-xs"
            />
          </div>
          <div className="grid grid-cols-8 gap-1.5">
            {PALETTE.map((c) => (
              <button
                key={c}
                type="button"
                aria-label={`Color ${c}`}
                onClick={() => setColor(c)}
                className={`aspect-square border-2 ${color.toLowerCase() === c.toLowerCase() ? 'border-ink ring-2 ring-grass' : 'border-ink/40'}`}
                style={{ background: c }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Canvas */}
      <div className="border-2 border-ink bg-chalk shadow-block p-4">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          {PART_TABS.map((p) => (
            <button
              key={p.id}
              type="button"
              aria-pressed={activePart === p.id}
              onClick={() => setActivePart(p.id)}
              className={`${btn} px-3 py-1.5 text-xs font-semibold ${activePart === p.id ? 'bg-ink text-chalk shadow-none' : ''}`}
            >
              {p.label}
            </button>
          ))}
          <span className="ml-auto font-mono text-2xs text-ink-soft">CANVAS 64×64 RGBA</span>
        </div>
        <div className="mx-auto max-w-[512px] border-2 border-ink pixel-checker-bg">
          <canvas
            ref={drawRef}
            width={VIEW}
            height={VIEW}
            className="block w-full crisp-pixel touch-none cursor-crosshair"
            style={{ aspectRatio: '1 / 1' }}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerLeave={onPointerUp}
          />
        </div>
        <p className="mt-2 text-xs text-ink-soft">
          Editing region: <span className="font-semibold text-ink">{activePart}</span>
          {mirror && ' · mirror on'}
        </p>
      </div>

      {/* 3D preview + actions */}
      <div className="border-2 border-ink bg-chalk shadow-block p-4">
        <p className="font-pixel text-lg text-ink mb-3">3D Preview</p>
        <div className="mx-auto flex justify-center border-2 border-ink bg-paper">
          <canvas ref={preview3dRef} className="block" style={{ width: 320, height: 400 }} />
        </div>

        <div className="mt-4 grid grid-cols-2 border-2 border-ink">
          {(['default', 'slim'] as const).map((m) => (
            <button
              key={m}
              type="button"
              aria-pressed={model === m}
              onClick={() => setModel(m)}
              className={`px-3 py-2 text-xs font-semibold ${model === m ? 'bg-ink text-chalk' : 'bg-chalk text-ink'}`}
            >
              {m === 'default' ? 'Classic (4px)' : 'Slim (3px)'}
            </button>
          ))}
        </div>

        <div className="mt-3 flex flex-col gap-2 text-sm">
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={showBase} onChange={(e) => setShowBase(e.target.checked)} className="accent-grass h-4 w-4" />
            Base skin
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={showOverlay} onChange={(e) => setShowOverlay(e.target.checked)} className="accent-diamond h-4 w-4" />
            Outer layer (hat / jacket)
          </label>
        </div>

        <button
          type="button"
          onClick={download}
          disabled={!ready}
          className="mt-4 w-full border-2 border-ink bg-grass px-4 py-3 font-semibold text-white shadow-block press-block disabled:opacity-60"
        >
          ⬇ Download Skin (.PNG)
        </button>
        <div className="mt-2 grid grid-cols-2 gap-2">
          <button type="button" onClick={resetToDefault} className={`${btn} px-3 py-2 text-xs font-semibold`}>Reset</button>
          <button
            type="button"
            onClick={() => alert('Skin pack (.mcpack) export is coming soon.')}
            className={`${btn} px-3 py-2 text-xs font-semibold`}
          >
            Export .mcpack
          </button>
        </div>
      </div>
    </div>
  );
}
