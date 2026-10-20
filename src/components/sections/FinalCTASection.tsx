'use client'

import { useLocale } from '@/i18n/LocaleProvider'
import { SocialIcon } from '@/components/ui/SocialLinks'
import { t, type Locale } from '@/i18n'
import { Badge, Container, Heading, Lead } from '@/components/ui'
import { ProjectForm } from '@/components/ui/ProjectForm'
import { site, schedulingUrl } from '@/lib/site'
export interface FinalCTASectionProps { locale?: Locale; emailConfigured?: boolean }
export function FinalCTASection({ locale: override, emailConfigured = false }: FinalCTASectionProps) {
  const { locale } = useLocale(override)
  const text = (key: string) => t(key, locale)
  const calendar = schedulingUrl()
  return <section id="contact" tabIndex={-1} aria-labelledby="contact-title" className="bg-background-secondary py-20 lg:py-24">
    <Container size="xl">
      <Badge variant="subtle" className="mb-4">{text('home.cta.badge')}</Badge>
      <Heading as="h2" id="contact-title" className="mb-4">{text('home.cta.heading')}</Heading>
      <Lead className="mb-10 max-w-2xl">{text('home.cta.subheading')}</Lead>
      <div className="grid items-start gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div className="py-3"><h3 className="mb-4 text-xl font-semibold">{text('home.cta.directTitle')}</h3><p className="mb-6 max-w-md leading-relaxed text-muted">{text('home.cta.directBody')}</p><a href={`mailto:${site.email}`} className="inline-flex max-w-full items-center gap-2 break-all text-base font-medium text-primary-text underline underline-offset-4 sm:text-lg"><SocialIcon name="email" />{site.email}</a><p className="mt-4 text-sm text-muted">{text('home.cta.response')}</p>{calendar && <div className="mt-8 border-t border-border pt-6"><p className="mb-4 text-sm text-muted">{text('home.cta.bookCallSubtitle')}</p><a href={calendar} target="_blank" rel="noopener noreferrer" className="action-link">{text('home.cta.bookCall')} <span aria-hidden="true">↗</span></a></div>}</div>
        <div className="rounded-2xl border border-border bg-card p-5 sm:p-8"><h3 className="mb-6 text-xl font-semibold">{text('home.cta.sendMessage')}</h3><ProjectForm locale={locale} emailConfigured={emailConfigured} /></div>
      </div>
    </Container>
  </section>
}
