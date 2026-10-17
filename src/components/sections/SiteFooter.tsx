import { t, type Locale } from '@/i18n'
import { Container, Logo } from '@/components/ui'
import { site } from '@/lib/site'
export interface SiteFooterProps { locale?: Locale }
export function SiteFooter({ locale = 'en' }: SiteFooterProps) {
  const text = (key: string) => t(key, locale)
  return <footer className="border-t border-border-subtle">
    <Container size="xl">
      <div className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr]">
        <div><div className="flex items-center gap-2"><Logo height={48} /><span className="font-semibold tracking-widest">{site.name}</span></div><p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">{text('home.footer.tagline')}</p></div>
        <div><h2 className="mb-4 text-sm font-semibold">{text('home.footer.navigation')}</h2><ul className="grid gap-3 text-sm text-muted">{['services','work','process','about','contact'].map(key => <li key={key}><a href={`#${key}`} className="hover:text-foreground">{text(`nav.${key}`)}</a></li>)}</ul></div>
        <div><h2 className="mb-4 text-sm font-semibold">{text('home.footer.connect')}</h2><ul className="grid gap-3 text-sm text-muted"><li><a href={site.github} target="_blank" rel="noopener noreferrer" aria-label={text('common.github')}>GitHub <span aria-hidden="true">↗</span></a></li><li><a href={site.linkedin} target="_blank" rel="noopener noreferrer" aria-label={text('common.linkedin')}>LinkedIn <span aria-hidden="true">↗</span></a></li><li><a href={`mailto:${site.email}`} className="break-all">{site.email}</a></li></ul></div>
      </div>
      <p className="border-t border-border-subtle py-6 text-xs text-muted">© {new Date().getFullYear()} {site.name}. {text('home.footer.copyright')}</p>
    </Container>
  </footer>
}
