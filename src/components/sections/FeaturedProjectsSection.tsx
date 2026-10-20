'use client'

import { useLocale } from '@/i18n/LocaleProvider'

import Image from 'next/image'
import Link from 'next/link'
import { localeHref } from '@/i18n/preferences'
import { t, type Locale } from '@/i18n'
import { Badge, Container, Heading, Lead } from '@/components/ui'
import { site } from '@/lib/site'
export interface FeaturedProjectsSectionProps { locale?: Locale }
export function FeaturedProjectsSection({ locale: override }: FeaturedProjectsSectionProps) {
  const { locale } = useLocale(override)
  const text = (key: string) => t(key, locale)
  return <section id="work" tabIndex={-1} aria-labelledby="work-title" className="bg-background-secondary py-20 lg:py-24">
    <Container size="xl">
      <Badge variant="subtle" className="mb-4">{text('home.projects.badge')}</Badge>
      <Heading as="h2" id="work-title" className="mb-4">{text('home.projects.heading')}</Heading>
      <Lead className="mb-10 max-w-2xl">{text('home.projects.subheading')}</Lead>
      <article className="overflow-hidden rounded-2xl border border-border bg-card">
        <div className="grid lg:grid-cols-[1fr_1.35fr]">
          <div className="flex flex-col justify-center p-6 sm:p-10">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-primary-text">MEDIKA</p>
            <h3 className="mb-5 text-2xl font-semibold tracking-tight sm:text-3xl">{text('home.projects.type')}</h3>
            <p className="mb-6 leading-relaxed text-muted">{text('home.projects.summary')}</p>
            <div className="flex flex-wrap gap-3">
              <Link href={localeHref(locale, '/products/medika')} className="action-link">{text('home.projects.explore')}</Link>
              <a href={site.medika} className="action-link action-secondary">{text('products.medika.cta')} <span aria-hidden="true">↗</span></a>
            </div>
          </div>
          <Link href={localeHref(locale, '/products/medika')} className="flex min-w-0 items-center bg-background p-4 sm:p-8">
            <Image src="/projects/medika/medika-patient-history.webp" width={1440} height={900} sizes="(min-width: 1280px) 650px, (min-width: 1024px) 55vw, 92vw" alt={text('products.medika.history.alt')} className="h-auto w-full rounded-lg border border-border shadow-lg" />
          </Link>
        </div>
      </article>
    </Container>
  </section>
}
