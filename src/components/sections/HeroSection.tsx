'use client'
import { useState } from 'react'
import { t, type Locale } from '@/i18n'
import { useLocale } from '@/i18n/LocaleProvider'
import { Badge, Button, Container, Heading, Lead } from '@/components/ui'
import { ProjectIntakeModal } from '@/components/ui/Modal'

export interface HeroSectionProps { locale?: Locale; emailConfigured?: boolean }
export function HeroSection({ locale: override, emailConfigured = false }: HeroSectionProps) {
  const { locale } = useLocale(override)
  const [open, setOpen] = useState(false)
  const text = (key: string) => t(key, locale)
  return <>
    <section id="hero" aria-labelledby="hero-title" className="relative overflow-hidden bg-background">
      <div aria-hidden="true" className="pointer-events-none absolute -right-24 top-8 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
      <Container size="xl" className="relative">
        <div className="grid items-center gap-12 py-20 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:py-28">
          <div>
            <Badge variant="subtle" className="mb-6">{text('home.hero.tagline')}</Badge>
            <Heading as="h1" id="hero-title" className="mb-6 max-w-xl leading-[1.08]">{text('home.hero.title')}</Heading>
            <p className="mb-6 max-w-lg border-l-2 border-primary/40 pl-4 text-xl font-medium leading-snug text-primary-text sm:text-2xl">{text('home.hero.brandPhrase')}</p>
            <Lead className="mb-8 max-w-xl">{text('home.hero.subtitle')}</Lead>
            <div className="flex flex-wrap gap-3">
              <Button size="lg" onClick={() => setOpen(true)}>{text('home.hero.ctaPrimary')}</Button>
              <a href="#work" className="action-link action-secondary">{text('home.hero.ctaSecondary')} <span aria-hidden="true">↗</span></a>
            </div>
            <p className="mt-6 max-w-lg text-sm leading-relaxed text-muted">{text('home.hero.note')}</p>
          </div>
          <div className="relative min-w-0">
            <div className="rounded-2xl border border-border bg-card p-6 shadow-xl shadow-primary/5 sm:p-10">
              <p className="mb-8 text-xs font-semibold uppercase tracking-widest text-primary-text">{text('home.hero.focus')}</p>
              <div className="space-y-7">{['purpose', 'workflow', 'experience'].map((key, index) => <div key={key} className="flex gap-4">
                <span aria-hidden="true" className="pt-1 font-mono text-xs text-primary-text">0{index + 1}</span>
                <div><h2 className="mb-2 text-xl font-semibold tracking-tight">{text(`home.hero.${key}.title`)}</h2><p className="text-sm leading-relaxed text-muted">{text(`home.hero.${key}.description`)}</p></div>
              </div>)}</div>
            </div>
            <p className="mt-5 text-center text-xs tracking-wide text-muted">{text('home.hero.capabilities')}</p>
          </div>
        </div>
      </Container>
    </section>
    <ProjectIntakeModal isOpen={open} onClose={() => setOpen(false)} locale={locale} emailConfigured={emailConfigured} />
  </>
}
