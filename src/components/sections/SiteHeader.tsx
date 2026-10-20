'use client'
import { useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useActiveSection } from '@/hooks/useActiveSection'
import { localeHref } from '@/i18n/preferences'
import { t, type Locale } from '@/i18n'
import { useLocale } from '@/i18n/LocaleProvider'
import { LanguageToggle } from '@/components/ui/LanguageToggle'
import { Button, Container, LogoFull } from '@/components/ui'
import { ThemeToggle } from '@/components/ui/ThemeToggle'
import { ProjectIntakeModal } from '@/components/ui/Modal'
import { site } from '@/lib/site'
export interface SiteHeaderProps { locale?: Locale; emailConfigured?: boolean }
const navLinks = ['services', 'work', 'about', 'contact'] as const
export function SiteHeader({ locale: override, emailConfigured = false }: SiteHeaderProps) {
  const { locale } = useLocale(override)
  const pathname = usePathname()
  const isHome = pathname === '/'
  const isProduct = pathname.startsWith('/products/')
  const bar = useRef<HTMLDivElement>(null)
  const section = useActiveSection(isHome, bar)
  const [open, setOpen] = useState(false)
  const [menu, setMenu] = useState(false)
  const text = (key: string) => t(key, locale)
  const href = (key: string) => isHome ? `#${key}` : `${localeHref(locale)}#${key}`
  const active = (key: string) => isProduct ? key === 'work' : isHome && section === key
  const links = (mobile = false) => navLinks.map(key => <Link key={key} href={href(key)}
    aria-current={isProduct && key === 'work' ? 'page' : undefined}
    aria-describedby={isHome && active(key) ? 'nav-current-section' : undefined}
    data-active={active(key) ? 'true' : undefined}
    onClick={() => { setMenu(false); if (mobile && isHome) document.getElementById(key)?.focus({ preventScroll: true }) }}
    className={`nav-link ${mobile ? 'px-3 py-3' : 'py-2'}`}>{text(`nav.${key}`)}</Link>)
  return <>
    <a href="#main-content" className="skip-link">{text('common.skip')}</a>
    <header className="sticky top-0 z-50 border-b border-border-subtle bg-background/95 backdrop-blur-sm">
      <Container size="xl">
        <span id="nav-current-section" className="sr-only">{text('common.currentSection')}</span>
        <div ref={bar} className="flex min-h-18 items-center justify-between gap-2">
          <Link href={isHome ? '#hero' : localeHref(locale)} aria-label={text('nav.home')} className="flex shrink-0 items-center gap-1 sm:gap-2"><LogoFull height={32} priority /><span className="text-sm font-semibold tracking-[0.12em] sm:text-base">{site.name}</span></Link>
          <nav aria-label={text('common.navigation')} className="hidden items-center gap-6 lg:flex">{links()}</nav>
          <div className="flex shrink-0 items-center gap-1 sm:gap-2">
            <div className="hidden sm:block"><Button size="sm" onClick={() => setOpen(true)}>{text('home.header.getStarted')}</Button></div>
            <LanguageToggle locale={locale} />
            <ThemeToggle locale={locale} />
            <button type="button" aria-label={text('common.menu')} aria-expanded={menu} aria-controls="mobile-nav" onClick={() => setMenu(!menu)} className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md border border-border lg:hidden"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d={menu ? 'M6 6l12 12M6 18L18 6' : 'M4 6h16M4 12h16M4 18h16'} /></svg></button>
          </div>
        </div>
        {menu && <nav id="mobile-nav" aria-label={text('common.menu')} onKeyDown={e => { if (e.key === 'Escape') { setMenu(false); document.querySelector<HTMLButtonElement>('[aria-controls="mobile-nav"]')?.focus() } }} className="absolute inset-x-0 top-full grid gap-1 border-b border-t border-border bg-background px-4 py-3 shadow-lg sm:px-6 lg:hidden">{links(true)}</nav>}
      </Container>
    </header>
    <ProjectIntakeModal isOpen={open} onClose={() => setOpen(false)} locale={locale} emailConfigured={emailConfigured} />
  </>
}
