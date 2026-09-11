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

interface DefaultTone {
  faces: Rect[];
  color: string;
}

/**
 * Paints a recognizable default Steve-style skin onto a 64x64 canvas context:
 * skin-tone head/arms/legs-feet, a shirt on the body, and trousers on the legs.
 */
export function paintDefaultSkin(ctx: CanvasRenderingContext2D): void {
  const SKIN = '#E9B48c';
  const HAIR = '#5A3A24';
  const SHIRT = '#1FB5AC';
  const PANTS = '#2E5AAC';
  const SHOES = '#3A3D42';

  ctx.clearRect(0, 0, SKIN_SIZE, SKIN_SIZE);

  const fill = (rects: Rect[], color: string) => {
    ctx.fillStyle = color;
    for (const r of rects) ctx.fillRect(r.x, r.y, r.w, r.h);
  };

  const tones: DefaultTone[] = [
    { faces: PARTS.head.base, color: SKIN },
    { faces: PARTS.body.base, color: SHIRT },
    { faces: PARTS.arms.base, color: SKIN },
    { faces: PARTS.legs.base, color: PANTS },
  ];
  for (const t of tones) fill(t.faces, t.color);

  // Hair cap on the top + upper front of the head.
  fill([
    { x: 8, y: 0, w: 8, h: 8 },
    { x: 8, y: 8, w: 8, h: 3 },
    { x: 0, y: 8, w: 8, h: 3 },
    { x: 16, y: 8, w: 8, h: 3 },
    { x: 24, y: 8, w: 8, h: 3 },
  ], HAIR);

  // Eyes (front head face is at 8,8 8x8 → eyes around row 12).
  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(10, 12, 1, 1);
  ctx.fillRect(13, 12, 1, 1);
  ctx.fillStyle = '#6C4AB6';
  ctx.fillRect(11, 12, 1, 1);
  ctx.fillRect(14, 12, 1, 1);

  // Shoes: bottom of each leg front.
  fill([
    { x: 4, y: 28, w: 4, h: 4 },
    { x: 20, y: 60, w: 4, h: 4 },
  ], SHOES);
}
