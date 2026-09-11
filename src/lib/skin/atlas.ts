// Minecraft Classic (Steve, 4px arms) 64x64 skin UV atlas.
// Rectangles are [x, y, w, h] on the 64x64 texture.
// Used for the default fill and for framing body-part tabs in the editor.

export const SKIN_SIZE = 64;

export interface Rect {
  x: number;
  y: number;
  w: number;
  h: number;
}

export type SkinPartId = 'head' | 'body' | 'arms' | 'legs';

interface PartFaces {
  base: Rect[];
  overlay: Rect[];
  /** Bounding rect of the part's net on the UV map (for tab zoom framing). */
  bounds: Rect;
}

// Standard Classic layout. Each part lists the six cube faces on the base layer
// and the matching overlay (hat / jacket / sleeve / pant) faces.
export const PARTS: Record<SkinPartId, PartFaces> = {
  head: {
    base: [
      { x: 8, y: 0, w: 8, h: 8 }, { x: 16, y: 0, w: 8, h: 8 },
      { x: 0, y: 8, w: 8, h: 8 }, { x: 8, y: 8, w: 8, h: 8 },
      { x: 16, y: 8, w: 8, h: 8 }, { x: 24, y: 8, w: 8, h: 8 },
    ],
    overlay: [
      { x: 40, y: 0, w: 8, h: 8 }, { x: 48, y: 0, w: 8, h: 8 },
      { x: 32, y: 8, w: 8, h: 8 }, { x: 40, y: 8, w: 8, h: 8 },
      { x: 48, y: 8, w: 8, h: 8 }, { x: 56, y: 8, w: 8, h: 8 },
    ],
    bounds: { x: 0, y: 0, w: 32, h: 16 },
  },
  body: {
    base: [
      { x: 20, y: 16, w: 8, h: 4 }, { x: 28, y: 16, w: 8, h: 4 },
      { x: 16, y: 20, w: 4, h: 12 }, { x: 20, y: 20, w: 8, h: 12 },
      { x: 28, y: 20, w: 4, h: 12 }, { x: 32, y: 20, w: 8, h: 12 },
    ],
    overlay: [
      { x: 20, y: 32, w: 8, h: 4 }, { x: 28, y: 32, w: 8, h: 4 },
      { x: 16, y: 36, w: 4, h: 12 }, { x: 20, y: 36, w: 8, h: 12 },
      { x: 28, y: 36, w: 4, h: 12 }, { x: 32, y: 36, w: 8, h: 12 },
    ],
    bounds: { x: 16, y: 16, w: 24, h: 16 },
  },
  arms: {
    base: [
      // right arm
      { x: 44, y: 16, w: 4, h: 4 }, { x: 48, y: 16, w: 4, h: 4 },
      { x: 40, y: 20, w: 4, h: 12 }, { x: 44, y: 20, w: 4, h: 12 },
      { x: 48, y: 20, w: 4, h: 12 }, { x: 52, y: 20, w: 4, h: 12 },
      // left arm
      { x: 36, y: 48, w: 4, h: 4 }, { x: 40, y: 48, w: 4, h: 4 },
      { x: 32, y: 52, w: 4, h: 12 }, { x: 36, y: 52, w: 4, h: 12 },
      { x: 40, y: 52, w: 4, h: 12 }, { x: 44, y: 52, w: 4, h: 12 },
    ],
    overlay: [
      { x: 44, y: 32, w: 4, h: 4 }, { x: 48, y: 32, w: 4, h: 4 },
      { x: 40, y: 36, w: 4, h: 12 }, { x: 44, y: 36, w: 4, h: 12 },
      { x: 48, y: 36, w: 4, h: 12 }, { x: 52, y: 36, w: 4, h: 12 },
      { x: 52, y: 48, w: 4, h: 4 }, { x: 56, y: 48, w: 4, h: 4 },
      { x: 48, y: 52, w: 4, h: 12 }, { x: 52, y: 52, w: 4, h: 12 },
      { x: 56, y: 52, w: 4, h: 12 }, { x: 60, y: 52, w: 4, h: 12 },
    ],
    bounds: { x: 32, y: 16, w: 24, h: 48 },
  },
  legs: {
    base: [
      // right leg
      { x: 4, y: 16, w: 4, h: 4 }, { x: 8, y: 16, w: 4, h: 4 },
      { x: 0, y: 20, w: 4, h: 12 }, { x: 4, y: 20, w: 4, h: 12 },
      { x: 8, y: 20, w: 4, h: 12 }, { x: 12, y: 20, w: 4, h: 12 },
      // left leg
      { x: 20, y: 48, w: 4, h: 4 }, { x: 24, y: 48, w: 4, h: 4 },
      { x: 16, y: 52, w: 4, h: 12 }, { x: 20, y: 52, w: 4, h: 12 },
      { x: 24, y: 52, w: 4, h: 12 }, { x: 28, y: 52, w: 4, h: 12 },
    ],
    overlay: [
      { x: 4, y: 32, w: 4, h: 4 }, { x: 8, y: 32, w: 4, h: 4 },
      { x: 0, y: 36, w: 4, h: 12 }, { x: 4, y: 36, w: 4, h: 12 },
      { x: 8, y: 36, w: 4, h: 12 }, { x: 12, y: 36, w: 4, h: 12 },
      { x: 4, y: 48, w: 4, h: 4 }, { x: 8, y: 48, w: 4, h: 4 },
      { x: 0, y: 52, w: 4, h: 12 }, { x: 4, y: 52, w: 4, h: 12 },
      { x: 8, y: 52, w: 4, h: 12 }, { x: 12, y: 52, w: 4, h: 12 },
    ],
    bounds: { x: 0, y: 16, w: 16, h: 48 },
  },
};

/** 16-swatch Voxel Workbench palette (hex). */
export const PALETTE: string[] = [
  '#1B1B1F', '#5B5F66', '#9AA0A8', '#FFFFFF',
  '#C8372D', '#E07B39', '#F2C14E', '#3E8E2A',
  '#1FB5AC', '#2E5AAC', '#6C4AB6', '#B0457B',
  '#8A5A36', '#5A3A24', '#E9B48c', '#F4D8B0',
];

// Front-facing UV rects for each body part (used for card thumbnails).
export const FRONT = {
  head: { x: 8, y: 8, w: 8, h: 8 },
  body: { x: 20, y: 20, w: 8, h: 12 },
  rArm: { x: 44, y: 20, w: 4, h: 12 },
  lArm: { x: 36, y: 52, w: 4, h: 12 },
  rLeg: { x: 4, y: 20, w: 4, h: 12 },
  lLeg: { x: 20, y: 52, w: 4, h: 12 },
} as const;

type FaceStyle = 'human' | 'creeper' | 'robot' | 'bunny' | 'none';

export interface CharacterOptions {
  skin: string;
  hair?: string; // cap over head top + upper sides
  shirt: string;
  pants: string;
  shoes?: string;
  eyes?: string;
  face?: FaceStyle;
}

function fillRects(ctx: CanvasRenderingContext2D, rects: readonly Rect[], color: string) {
  ctx.fillStyle = color;
  for (const r of rects) ctx.fillRect(r.x, r.y, r.w, r.h);
}

function paintHeadFront(ctx: CanvasRenderingContext2D, opts: CharacterOptions) {
  // Head front face occupies (8,8) 8x8.
  const face = opts.face ?? 'human';
  const px = (x: number, y: number, c: string) => { ctx.fillStyle = c; ctx.fillRect(8 + x, 8 + y, 1, 1); };
  if (face === 'none') return;
  if (face === 'creeper') {
    for (const [x, y] of [[2, 2], [3, 2], [2, 3], [3, 3], [4, 5], [4, 6], [3, 6], [5, 6]] as const) px(x, y, '#0d1f0d');
    px(2, 4, '#0d1f0d');
    return;
  }
  if (face === 'robot') {
    ctx.fillStyle = '#1B1B1F';
    ctx.fillRect(8 + 1, 8 + 3, 6, 3); // visor band
    px(2, 4, '#4FE3E0'); px(5, 4, '#4FE3E0');
    return;
  }
  // human / bunny: two eyes
  const eye = opts.eyes ?? '#3A3D42';
  px(2, 4, '#FFFFFF'); px(3, 4, eye);
  px(5, 4, '#FFFFFF'); px(6, 4, eye);
  if (face === 'bunny') { px(1, 5, '#F2A0B4'); px(6, 5, '#F2A0B4'); }
}

/** Paints a full editable character skin from a color/style spec. */
export function paintCharacter(ctx: CanvasRenderingContext2D, opts: CharacterOptions): void {
  ctx.clearRect(0, 0, SKIN_SIZE, SKIN_SIZE);
  fillRects(ctx, PARTS.head.base, opts.skin);
  fillRects(ctx, PARTS.body.base, opts.shirt);
  fillRects(ctx, PARTS.arms.base, opts.skin);
  fillRects(ctx, PARTS.legs.base, opts.pants);

  if (opts.hair) {
    fillRects(ctx, [
      { x: 8, y: 0, w: 8, h: 8 },
      { x: 8, y: 8, w: 8, h: 3 },
      { x: 0, y: 8, w: 8, h: 3 },
      { x: 16, y: 8, w: 8, h: 3 },
      { x: 24, y: 8, w: 8, h: 3 },
    ], opts.hair);
  }
  paintHeadFront(ctx, opts);

  if (opts.shoes) {
    fillRects(ctx, [
      { x: 4, y: 28, w: 4, h: 4 },
      { x: 20, y: 60, w: 4, h: 4 },
    ], opts.shoes);
  }
}

export interface SkinTemplate {
  id: string;
  name: string;
  tag: string;
  accent: string; // card tag background
  options: CharacterOptions;
}

export const TEMPLATES: SkinTemplate[] = [
  { id: 'knight', name: 'Knight', tag: 'ARMOR', accent: '#5B5F66', options: { skin: '#E9B48c', shirt: '#9AA0A8', pants: '#5B5F66', shoes: '#3A3D42', hair: '#9AA0A8', face: 'robot' } },
  { id: 'anime', name: 'Anime Hero', tag: 'ANIME', accent: '#2E5AAC', options: { skin: '#F4D8B0', hair: '#2E5AAC', shirt: '#C8372D', pants: '#1B1B1F', shoes: '#1B1B1F', eyes: '#2E5AAC', face: 'human' } },
  { id: 'bunny', name: 'Cute Bunny', tag: 'CUTE', accent: '#B0457B', options: { skin: '#F4D8B0', hair: '#FFFFFF', shirt: '#B0457B', pants: '#9AA0A8', face: 'bunny' } },
  { id: 'robot', name: 'Robot', tag: 'ROBOT', accent: '#5B5F66', options: { skin: '#9AA0A8', shirt: '#5B5F66', pants: '#5B5F66', shoes: '#3A3D42', face: 'robot' } },
  { id: 'hoodie', name: 'Street Hoodie', tag: 'HOODIE', accent: '#3E8E2A', options: { skin: '#E9B48c', hair: '#3E8E2A', shirt: '#3E8E2A', pants: '#1B1B1F', shoes: '#FFFFFF', face: 'human' } },
  { id: 'creeper', name: 'Creeper Style', tag: 'MOB', accent: '#2f7d32', options: { skin: '#3E8E2A', shirt: '#2f7d32', pants: '#2f7d32', face: 'creeper' } },
];

export function paintTemplate(ctx: CanvasRenderingContext2D, id: string): void {
  const t = TEMPLATES.find((x) => x.id === id);
  paintCharacter(ctx, t ? t.options : DEFAULT_OPTIONS);
}

const DEFAULT_OPTIONS: CharacterOptions = {
  skin: '#E9B48c', hair: '#5A3A24', shirt: '#1FB5AC', pants: '#2E5AAC', shoes: '#3A3D42', eyes: '#6C4AB6', face: 'human',
};

/** Default Steve-style skin. */
export function paintDefaultSkin(ctx: CanvasRenderingContext2D): void {
  paintCharacter(ctx, DEFAULT_OPTIONS);
}

/**
 * Composes a front-facing character preview from a 64x64 skin canvas onto a
 * destination context (unit grid 16 wide x 32 tall, scaled by `scale`).
 */
export function composeFrontView(src: CanvasImageSource, ctx: CanvasRenderingContext2D, scale: number): void {
  ctx.imageSmoothingEnabled = false;
  const draw = (r: Rect, dx: number, dy: number) =>
    ctx.drawImage(src, r.x, r.y, r.w, r.h, dx * scale, dy * scale, r.w * scale, r.h * scale);
  draw(FRONT.head, 4, 0);
  draw(FRONT.rArm, 0, 8);
  draw(FRONT.body, 4, 8);
  draw(FRONT.lArm, 12, 8);
  draw(FRONT.rLeg, 4, 20);
  draw(FRONT.lLeg, 8, 20);
}
