'use client'
import { useState } from 'react'
import Image from 'next/image'
import { t, type Locale } from '@/i18n'
import { Badge, Button, Container, Heading, Lead } from '@/components/ui'
import { ProjectIntakeModal } from '@/components/ui/Modal'

export interface HeroSectionProps { locale?: Locale; emailConfigured?: boolean }
export function HeroSection({ locale = 'en', emailConfigured = false }: HeroSectionProps) {
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
            <Lead className="mb-8 max-w-xl">{text('home.hero.subtitle')}</Lead>
            <div className="flex flex-wrap gap-3">
              <Button size="lg" onClick={() => setOpen(true)}>{text('home.hero.ctaPrimary')}</Button>
              <a href="#work" className="action-link action-secondary">{text('home.hero.ctaSecondary')} <span aria-hidden="true">↗</span></a>
            </div>
            <p className="mt-6 max-w-lg text-sm leading-relaxed text-muted">{text('home.hero.note')}</p>
          </div>
          <div className="relative min-w-0">
            <a href="#work" className="group block overflow-hidden rounded-2xl border border-border bg-card shadow-xl shadow-primary/5">
              <div className="flex items-center justify-between gap-3 border-b border-border-subtle px-5 py-4">
                <span className="font-semibold tracking-wide">MEDIKA</span><span className="text-xs text-muted">{text('common.demo')}</span>
              </div>
              <div className="overflow-hidden bg-background-secondary p-3 sm:p-5">
                <Image src="/projects/medika/medika-patients.webp" width={1440} height={900} sizes="(min-width: 1280px) 550px, (min-width: 1024px) 45vw, 92vw" alt={text('home.projects.imageAlt')} priority className="h-auto w-full rounded-lg border border-border-subtle transition-transform duration-300 group-hover:scale-[1.015]" />
              </div>
              <div className="px-5 py-4"><p className="mb-2 text-sm text-muted">{text('home.hero.preview')}</p><span className="text-sm font-medium text-primary-text">{text('home.hero.previewLink')} <span aria-hidden="true">→</span></span></div>
            </a>
            <p className="mt-5 text-center text-xs tracking-wide text-muted">{text('home.hero.capabilities')}</p>
          </div>
        </div>
      </Container>
    </section>
    <ProjectIntakeModal isOpen={open} onClose={() => setOpen(false)} locale={locale} emailConfigured={emailConfigured} />
  </>
}
