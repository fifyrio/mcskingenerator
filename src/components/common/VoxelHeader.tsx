import { Link as I18nLink } from '@/i18n/routing';

const NAV = [
  { label: 'Editor', href: '/' },
  { label: 'Skin Packs', href: '/minecraft-skin-pack-maker' },
  { label: 'AI Skins', href: '/ai-minecraft-skin-maker' },
  { label: 'Bedrock', href: '/minecraft-bedrock-skin-maker' },
  { label: 'Templates', href: '/#start' },
];

/** Shared Voxel Workbench site header (light, sticky). */
export default function VoxelHeader() {
  return (
    <header className="sticky top-0 z-30 border-b-2 border-ink bg-paper/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3 sm:px-6">
        <I18nLink href="/" prefetch={false} className="flex items-center gap-2">
          <span className="grid h-7 w-7 place-items-center border-2 border-ink bg-grass text-chalk">⛏</span>
          <span className="font-pixel text-lg text-ink">MCSkinGenerator</span>
        </I18nLink>
        <nav className="ml-6 hidden items-center gap-5 md:flex" aria-label="Main navigation">
          {NAV.map((n) => (
            <I18nLink key={n.label} href={n.href} prefetch={false} className="text-sm font-semibold text-ink-muted hover:text-grass-ink">
              {n.label}
            </I18nLink>
          ))}
        </nav>
        <I18nLink href="/" prefetch={false} className="ml-auto border-2 border-ink bg-chalk px-3 py-1.5 text-sm font-semibold text-ink shadow-block-sm press-block">
          Open Editor
        </I18nLink>
      </div>
    </header>
  );
}
