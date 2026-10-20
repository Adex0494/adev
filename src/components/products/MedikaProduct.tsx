'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Badge, Container, Heading, Lead } from '@/components/ui'
import { t, type Locale } from '@/i18n'
import { useLocale } from '@/i18n/LocaleProvider'
import { localeHref } from '@/i18n/preferences'
import { site } from '@/lib/site'
import { medikaCapabilities, medikaScreenshots, medikaTechnologies } from '@/content/medika'

export function MedikaProduct({ locale: override }: { locale?: Locale }) {
  const { locale } = useLocale(override)
  const text = (key: string) => t(`products.medika.${key}`, locale)
  return <>
    <section aria-labelledby="product-title" className="relative overflow-hidden bg-background py-16 lg:py-24">
      <div aria-hidden="true" className="pointer-events-none absolute -right-20 top-0 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
      <Container size="xl" className="relative">
        <Link href={localeHref(locale)} className="mb-10 inline-flex min-h-11 items-center gap-2 text-sm text-muted hover:text-primary-text"><span aria-hidden="true">←</span>{text('back')}</Link>
        <div className="max-w-4xl">
          <Badge variant="subtle" className="mb-5">{text('badge')}</Badge>
          <h1 id="product-title" className="mb-4 text-6xl font-semibold tracking-tight sm:text-7xl lg:text-8xl">MEDIKA</h1>
          <p className="mb-6 max-w-3xl text-2xl font-medium leading-snug sm:text-4xl">{text('title')}</p>
          <Lead className="mb-8 max-w-2xl">{text('summary')}</Lead>
          <div className="flex flex-wrap gap-3"><a href={site.medika} className="action-link">{text('cta')}<span aria-hidden="true">↗</span></a><Link href={`${localeHref(locale)}#work`} className="action-link action-secondary">{t('nav.work', locale)}</Link></div>
          <p className="mt-5 max-w-xl text-xs leading-relaxed text-muted">{text('demoNote')}</p>
        </div>
      </Container>
    </section>

    <section aria-labelledby="overview-title" className="border-y border-border-subtle bg-background-secondary py-16 lg:py-20">
      <Container size="xl">
        <div className="mb-12 grid gap-6 lg:grid-cols-2 lg:gap-16"><Heading as="h2" id="overview-title">{text('overviewTitle')}</Heading><p className="text-lg leading-relaxed text-muted">{text('overview')}</p></div>
        <div className="grid gap-8 md:grid-cols-2">{['problem', 'solution'].map(key => <div key={key} className="border-t border-border pt-6"><h3 className="mb-3 text-xl font-semibold">{text(`${key}Title`)}</h3><p className="max-w-xl leading-relaxed text-muted">{text(key)}</p></div>)}</div>
      </Container>
    </section>

    <section aria-labelledby="gallery-title" className="bg-background py-20 lg:py-24">
      <Container size="xl">
        <Heading as="h2" id="gallery-title" className="mb-4">{text('gallery')}</Heading>
        <p className="mb-12 max-w-2xl text-sm leading-relaxed text-muted">{text('screenshots')}</p>
        <div className="space-y-16 lg:space-y-24">{medikaScreenshots.map(({ key, file }, index) => <figure key={key} className={`grid items-center gap-6 lg:gap-12 ${index % 2 ? 'lg:grid-cols-[1.5fr_0.65fr]' : 'lg:grid-cols-[0.65fr_1.5fr]'}`}>
          <figcaption className={index % 2 ? 'lg:order-2' : ''}>
            <span aria-hidden="true" className="mb-4 block font-mono text-sm text-primary-text">0{index + 1}</span>
            <h3 className="mb-3 text-2xl font-semibold tracking-tight">{text(`${key}.title`)}</h3><p className="max-w-md leading-relaxed text-muted">{text(`${key}.description`)}</p>
          </figcaption>
          <a href={`/projects/medika/${file}.webp`} target="_blank" rel="noopener noreferrer" aria-label={`${text(`${key}.title`)} — ${t('common.enlarge', locale)}`} className={`block min-w-0 rounded-2xl border border-border bg-background-secondary p-2 shadow-lg shadow-primary/5 sm:p-4 ${index % 2 ? 'lg:order-1' : ''}`}>
            <Image src={`/projects/medika/${file}.webp`} width={1440} height={900} sizes="(min-width: 1280px) 780px, (min-width: 1024px) 65vw, 92vw" alt={text(`${key}.alt`)} loading="lazy" className="h-auto w-full rounded-lg border border-border-subtle" />
          </a>
        </figure>)}</div>
      </Container>
    </section>

    <section aria-labelledby="capabilities-title" className="bg-background-secondary py-16 lg:py-20">
      <Container size="xl">
        <Heading as="h2" id="capabilities-title" className="mb-4">{text('capabilitiesTitle')}</Heading><p className="mb-8 text-muted">{text('capabilitiesIntro')}</p>
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{medikaCapabilities.map(key => <li key={key} className="flex items-start gap-3 rounded-lg border border-border bg-card px-5 py-4"><span aria-hidden="true" className="text-primary-text">✓</span><span>{text(`capabilities.${key}`)}</span></li>)}</ul>
        <div className="mt-14 border-t border-border pt-8"><h3 className="mb-3 text-lg font-semibold">{text('engineeringTitle')}</h3><p className="mb-5 max-w-3xl text-sm leading-relaxed text-muted">{text('engineering')}</p><ul aria-label={text('engineeringTitle')} className="flex flex-wrap gap-2">{medikaTechnologies.map(technology => <li key={technology} className="rounded-md border border-border px-3 py-1.5 text-xs text-muted">{technology}</li>)}</ul></div>
      </Container>
    </section>

    <section aria-labelledby="experience-title" className="bg-background py-20 text-center lg:py-28">
      <Container size="xl"><div className="mx-auto max-w-3xl"><Heading as="h2" id="experience-title" className="mb-6">{text('experienceTitle')}</Heading><Lead className="mb-8">{text('experience')}</Lead><a href={site.medika} className="action-link">{text('demoCta')}<span aria-hidden="true">↗</span></a></div></Container>
    </section>
  </>
}
