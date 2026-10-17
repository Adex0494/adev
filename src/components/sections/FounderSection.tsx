import { t, type Locale } from '@/i18n'
import { Badge, Container, Heading } from '@/components/ui'
import { site } from '@/lib/site'

export interface FounderSectionProps { locale?: Locale }

export function FounderSection({ locale = 'en' }: FounderSectionProps) {
  const text = (key: string) => t(key, locale)
  return <section id="about" aria-labelledby="founder-title" className="bg-background py-20 lg:py-24">
    <Container size="xl">
      <div className="grid gap-10 border-t border-border pt-12 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
        <div>
          <Badge variant="subtle" className="mb-4">{text('home.founder.badge')}</Badge>
          <Heading as="h2" id="founder-title" className="mb-6">{text('home.founder.heading')}</Heading>
          <p className="mb-1 text-lg font-semibold">{site.founder}</p>
          <p className="text-sm text-primary-text">{text('home.founder.role')}</p>
        </div>
        <div className="space-y-5 leading-relaxed text-muted">
          <p>{text('home.founder.description')}</p><p>{text('home.founder.approach')}</p>
          <h3 className="pt-2 font-semibold text-foreground">{text('home.founder.technical')}</h3>
          <p className="text-sm">{text('home.founder.technicalBody')}</p>
          <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm font-medium text-primary-text">
            <a href={site.github} target="_blank" rel="noopener noreferrer" aria-label={text('common.github')}>{text('home.founder.github')} <span aria-hidden="true">↗</span></a>
            <a href={site.linkedin} target="_blank" rel="noopener noreferrer" aria-label={text('common.linkedin')}>{text('home.founder.linkedin')} <span aria-hidden="true">↗</span></a>
          </div>
        </div>
      </div>
    </Container>
  </section>
}
