'use client'

import Image from 'next/image'
import { t, type Locale } from '@/i18n'
import { useLocale } from '@/i18n/LocaleProvider'
import { Badge, Container, Heading } from '@/components/ui'
import { SocialLinks } from '@/components/ui/SocialLinks'
import { site } from '@/lib/site'

export interface FounderSectionProps { locale?: Locale }

export function FounderSection({ locale: override }: FounderSectionProps) {
  const { locale } = useLocale(override)
  const text = (key: string) => t(key, locale)
  return <section id="about" tabIndex={-1} aria-labelledby="founder-title" className="bg-background py-20 lg:py-24">
    <Container size="xl">
      <div className="border-t border-border pt-12">
        <div className="mb-10 text-center">
          <Badge variant="subtle" className="mb-4">{text('home.founder.badge')}</Badge>
          <Heading as="h2" id="founder-title">{text('home.founder.heading')}</Heading>
        </div>
        <div className="mx-auto grid max-w-4xl items-center gap-10 md:grid-cols-[0.9fr_1.1fr] md:gap-16">
          <div className="min-w-0 text-center">
            <div className="mx-auto mb-5 max-w-60 rounded-[2rem] border border-primary/20 bg-gradient-to-br from-primary/10 to-accent/5 p-2 md:max-w-72">
              <Image src={site.portrait.src} width={site.portrait.width} height={site.portrait.height} sizes="(min-width: 768px) 272px, 224px" alt={text('home.founder.imageAlt')} className="aspect-square h-auto w-full rounded-[1.5rem] object-contain" />
            </div>
            <h3 className="mb-1 text-xl font-semibold tracking-tight">{site.founder}</h3>
            <p className="mb-5 text-sm text-primary-text">{text('home.founder.role')}</p>
            <SocialLinks locale={locale} className="justify-center" />
          </div>
          <div className="min-w-0 space-y-5 text-base leading-relaxed text-muted">
            <p>{text('home.founder.description')}</p>
            <p>{text('home.founder.approach')}</p>
          </div>
        </div>
      </div>
    </Container>
  </section>
}
