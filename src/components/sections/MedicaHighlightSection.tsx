import Image from 'next/image'
import { t, type Locale } from '@/i18n'
import { Badge, Container, Heading, Lead } from '@/components/ui'
import { site } from '@/lib/site'
export interface MedicaHighlightSectionProps { locale?: Locale }
const screenshots = [
  { key: 'patients', file: 'medika-patients' },
  { key: 'history', file: 'medika-patient-history' },
  { key: 'consultation', file: 'medika-consultation' },
  { key: 'reports', file: 'medika-reports' },
] as const
export function MedicaHighlightSection({ locale = 'en' }: MedicaHighlightSectionProps) {
  const text = (key: string) => t(key, locale)
  return <section id="medika-case-study" aria-labelledby="case-title" className="bg-background-secondary py-20 lg:py-24">
    <Container size="xl">
      <div className="mb-10 max-w-3xl">
        <Badge variant="subtle" className="mb-4">{text('home.medica.badge')}</Badge>
        <Heading as="h2" id="case-title" className="mb-4">{text('home.medica.heading')}</Heading>
        <Lead>{text('home.medica.subheading')}</Lead>
      </div>
      <div className="mb-14 grid gap-8 md:grid-cols-3">
        {['problem', 'solution', 'engineering'].map(key => <div key={key} className="border-t border-border pt-5">
          <h3 className="mb-3 text-lg font-semibold">{text(`home.medica.${key}Title`)}</h3>
          <p className="text-sm leading-relaxed text-muted">{text(`home.medica.${key}`)}</p>
        </div>)}
      </div>
      <h3 className="mb-2 text-2xl font-semibold">{text('home.medica.gallery')}</h3>
      <p className="mb-8 text-sm text-muted">{text('home.medica.screenshots')}</p>
      <div className="grid gap-6 md:grid-cols-2">
        {screenshots.map(({ key, file }) => <figure key={key} className="overflow-hidden rounded-xl border border-border bg-card">
          <a href={`/projects/medika/${file}.webp`} target="_blank" rel="noopener noreferrer" aria-label={`${text(`home.medica.${key}.title`)} — ${text('common.enlarge')}`} className="block bg-background p-2 sm:p-3">
            <Image src={`/projects/medika/${file}.webp`} width={1440} height={900} sizes="(min-width: 1280px) 580px, (min-width: 768px) 46vw, 92vw" alt={text(`home.medica.${key}.alt`)} loading="lazy" className="h-auto w-full rounded-md border border-border-subtle" />
          </a>
          <figcaption className="p-5"><h4 className="mb-2 font-semibold">{text(`home.medica.${key}.title`)}</h4><p className="text-sm leading-relaxed text-muted">{text(`home.medica.${key}.description`)}</p></figcaption>
        </figure>)}
      </div>
      <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
        <a href={site.medika} className="action-link shrink-0">{text('home.medica.cta')} <span aria-hidden="true">↗</span></a>
        <p className="max-w-xl text-xs leading-relaxed text-muted">{text('home.medica.demoNote')}</p>
      </div>
    </Container>
  </section>
}
