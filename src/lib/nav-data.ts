/**
 * Shared navigation data. Trimmed to the Minecraft skin product only.
 * Consumed by common/Header.tsx.
 */

export interface NavDropdownItem {
  label: string;
  href: string;
  icon: string;
}

export interface NavDropdownGroup {
  label: string;
  items: NavDropdownItem[];
}

type Translate = (key: string) => string;

export function buildAiEffectGroups(_tNav: Translate): NavDropdownGroup[] {
  return [
    {
      label: 'Minecraft',
      items: [
        { label: 'AI Minecraft Skin', href: '/ai-image-effects/ai-minecraft-skin', icon: '🎮' },
        { label: 'Minecraft Skin Maker', href: '/minecraft-skin', icon: '⛏️' },
      ],
    },
  ];
}

export function buildVideoDropdown(_tNav: Translate): NavDropdownItem[] {
  return [];
}
