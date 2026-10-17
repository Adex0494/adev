'use client'
import { useState } from 'react'
import { t, type Locale } from '@/i18n'
import { Button, Container, LogoFull } from '@/components/ui'
import { ThemeToggle } from '@/components/ui/ThemeToggle'
import { ProjectIntakeModal } from '@/components/ui/Modal'
import { site } from '@/lib/site'
export interface SiteHeaderProps { locale?: Locale; emailConfigured?: boolean }
const navLinks = ['services', 'work', 'process', 'contact'] as const
export function SiteHeader({ locale = 'en', emailConfigured = false }: SiteHeaderProps) {
  const [open, setOpen] = useState(false)
  const [menu, setMenu] = useState(false)
  const text = (key: string) => t(key, locale)
  return <>
    <a href="#main-content" className="skip-link">{text('common.skip')}</a>
    <header className="sticky top-0 z-50 border-b border-border-subtle bg-background/95 backdrop-blur-sm">
      <Container size="xl">
        <div className="flex min-h-18 items-center justify-between gap-2">
          <a href={locale === 'es' ? '/?lang=es' : '/'} aria-label={text('nav.home')} className="flex shrink-0 items-center gap-1 sm:gap-2"><LogoFull height={40} priority /><span className="text-sm font-semibold tracking-[0.12em] sm:text-base">{site.name}</span></a>
          <nav aria-label={text('common.navigation')} className="hidden items-center gap-6 lg:flex">{navLinks.map(key => <a key={key} href={`#${key}`} className="text-sm text-muted hover:text-foreground">{text(`nav.${key}`)}</a>)}</nav>
          <div className="flex shrink-0 items-center gap-1 sm:gap-2">
            <div className="hidden sm:block"><Button size="sm" onClick={() => setOpen(true)}>{text('home.header.getStarted')}</Button></div>
            <a href={locale === 'en' ? '/?lang=es' : '/'} hrefLang={locale === 'en' ? 'es' : 'en'} lang={locale === 'en' ? 'es' : 'en'} aria-label={text('common.language')} className="flex h-10 w-10 items-center justify-center rounded-md border border-border text-xs font-semibold">{locale === 'en' ? 'ES' : 'EN'}</a>
            <ThemeToggle locale={locale} />
            <button type="button" aria-label={text('common.menu')} aria-expanded={menu} aria-controls="mobile-nav" onClick={() => setMenu(!menu)} className="flex h-10 w-10 items-center justify-center rounded-md border border-border lg:hidden"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d={menu ? 'M6 6l12 12M6 18L18 6' : 'M4 6h16M4 12h16M4 18h16'} /></svg></button>
          </div>
        </div>
        {menu && <nav id="mobile-nav" aria-label={text('common.menu')} onKeyDown={e => { if (e.key === 'Escape') { setMenu(false); document.querySelector<HTMLButtonElement>('[aria-controls="mobile-nav"]')?.focus() } }} className="grid gap-1 border-t border-border py-3 lg:hidden">{navLinks.map(key => <a key={key} href={`#${key}`} onClick={() => setMenu(false)} className="rounded-md px-3 py-3 text-sm hover:bg-background-secondary">{text(`nav.${key}`)}</a>)}</nav>}
      </Container>
    </header>
    <ProjectIntakeModal isOpen={open} onClose={() => setOpen(false)} locale={locale} emailConfigured={emailConfigured} />
  </>
}
