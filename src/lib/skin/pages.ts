// Registry of the Minecraft skin sub-pages (for internal linking / related nav).
export interface SkinPageRef {
  key: string;
  title: string; // anchor / H2 text = target keyword
  href: string;
  blurb: string;
}

export const HOME_PAGE: SkinPageRef = {
  key: 'home',
  title: 'Minecraft Skin Maker',
  href: '/',
  blurb: 'Draw a skin, preview in 3D, download a PNG.',
};

export const SKIN_PAGES: Record<string, SkinPageRef> = {
  custom: {
    key: 'custom',
    title: 'Custom Minecraft Skin Maker',
    href: '/custom-minecraft-skin-maker',
    blurb: 'Full pixel editor: layers, mirror, palettes and templates.',
  },
  pack: {
    key: 'pack',
    title: 'Minecraft Skin Pack Maker',
    href: '/minecraft-skin-pack-maker',
    blurb: 'Bundle skins into a Bedrock .mcpack you can import in one tap.',
  },
  ai: {
    key: 'ai',
    title: 'AI Minecraft Skin Maker',
    href: '/ai-image-effects/ai-minecraft-skin',
    blurb: 'Generate a skin from a text prompt or a photo.',
  },
  bedrock: {
    key: 'bedrock',
    title: 'Minecraft Bedrock Skin Maker',
    href: '/minecraft-bedrock-skin-maker',
    blurb: 'Make a 64×64 PNG and import it into Bedrock Edition.',
  },
  free: {
    key: 'free',
    title: 'Free Minecraft Skin Maker',
    href: '/free-minecraft-skin-maker',
    blurb: 'No sign-up, no watermark, unlimited downloads.',
  },
};

export function relatedPages(currentKey: string, keys: string[]): SkinPageRef[] {
  return keys.filter((k) => k !== currentKey).map((k) => SKIN_PAGES[k]).filter(Boolean);
}
