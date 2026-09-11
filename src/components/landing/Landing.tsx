import { Link as I18nLink } from '@/i18n/routing';
import { HOME_PAGE, type SkinPageRef } from '@/lib/skin/pages';

export function Breadcrumb({ title }: { title: string }) {
  return (
    <nav aria-label="Breadcrumb" className="text-xs text-ink-soft">
      <I18nLink href="/" prefetch={false} className="font-semibold hover:text-grass-ink">Home</I18nLink>
      <span className="mx-1.5">/</span>
      <span className="text-ink">{title}</span>
    </nav>
  );
}

export function SubpageHero({ eyebrow, h1, lead }: { eyebrow: string; h1: string; lead: string }) {
  return (
    <div className="border-2 border-ink bg-paper p-6 sm:p-8">
      <p className="font-pixel text-sm text-grass-ink">{eyebrow}</p>
      <h1 className="mt-2 font-pixel text-3xl leading-tight sm:text-4xl">{h1}</h1>
      <p className="mt-3 max-w-2xl text-lg text-ink-muted">{lead}</p>
    </div>
  );
}

export function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-10">
      <h2 className="font-pixel text-2xl">{title}</h2>
      <div className="mt-3 text-ink-muted">{children}</div>
    </section>
  );
}

export function FaqAccordion({ items }: { items: { q: string; a: string }[] }) {
  return (
    <section className="mt-12 max-w-3xl">
      <h2 className="font-pixel text-2xl">Frequently asked questions</h2>
      <div className="mt-4 space-y-3">
        {items.map((f) => (
          <details key={f.q} className="group border-2 border-ink bg-chalk p-4 open:bg-paper">
            <summary className="cursor-pointer list-none font-semibold marker:hidden">{f.q}</summary>
            <p className="mt-2 text-sm text-ink-muted">{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

export function RelatedPages({ pages }: { pages: SkinPageRef[] }) {
  return (
    <section className="mt-14 border-t-2 border-ink pt-8">
      <I18nLink
        href={HOME_PAGE.href}
        prefetch={false}
        className="inline-block border-2 border-ink bg-grass px-5 py-2.5 font-semibold text-white shadow-block press-block"
      >
        ← {HOME_PAGE.title}
      </I18nLink>
      {pages.length > 0 && (
        <div className="mt-6">
          <p className="text-2xs font-extrabold uppercase tracking-widest text-ink-soft">Keep building</p>
          <div className="mt-3 grid gap-4 sm:grid-cols-2">
            {pages.map((p) => (
              <I18nLink
                key={p.key}
                href={p.href}
                prefetch={false}
                className="block border-2 border-ink bg-chalk p-4 shadow-block-sm press-block"
              >
                <p className="font-semibold text-ink">{p.title} →</p>
                <p className="mt-1 text-sm text-ink-muted">{p.blurb}</p>
              </I18nLink>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
