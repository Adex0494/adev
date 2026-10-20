'use client'

import { t, type Locale } from '@/i18n'
import { useLocale } from '@/i18n/LocaleProvider'
import { Container, Logo } from '@/components/ui'
import { SocialLinks } from '@/components/ui/SocialLinks'
import { site } from '@/lib/site'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { localeHref } from '@/i18n/preferences'
export interface SiteFooterProps { locale?: Locale }
export function SiteFooter({ locale: override }: SiteFooterProps) {
  const { locale } = useLocale(override)
  const text = (key: string) => t(key, locale)
  const isHome = usePathname() === '/'
  return <footer className="border-t border-border-subtle">
    <Container size="xl">
      <div className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr]">
        <div><div className="flex items-center gap-2"><Logo height={48} /><span className="font-semibold tracking-widest">{site.name}</span></div><p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">{text('home.footer.tagline')}</p></div>
        <div><h2 className="mb-4 text-sm font-semibold">{text('home.footer.navigation')}</h2><ul className="grid gap-3 text-sm text-muted">{['services','work','about','process','contact'].map(key => <li key={key}><Link href={isHome ? `#${key}` : `${localeHref(locale)}#${key}`} className="hover:text-foreground">{text(`nav.${key}`)}</Link></li>)}</ul></div>
        <div><h2 className="mb-4 text-sm font-semibold">{text('home.footer.connect')}</h2><SocialLinks locale={locale} /><a href={`mailto:${site.email}`} className="mt-4 inline-block break-all text-sm text-muted hover:text-foreground">{site.email}</a></div>
      </div>
      <p className="border-t border-border-subtle py-6 text-xs text-muted">© {new Date().getFullYear()} {site.name}. {text('home.footer.copyright')}</p>
    </Container>
  </footer>
}
