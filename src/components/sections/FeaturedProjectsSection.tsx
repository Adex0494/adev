import { t } from '@/i18n'
import { Badge, CardTitle, Container, Heading, Lead } from '@/components/ui'
import { homeProjects } from '@/content/home'

const projectGradients: Record<(typeof homeProjects)[number], string> = {
  project1: 'from-primary/20 to-accent/20',
  project2: 'from-accent/20 to-accent2/20',
  project3: 'from-accent2/20 to-primary/20',
}

export function FeaturedProjectsSection() {
  return (
    <section id="work" className="bg-background py-24">
      <Container size="xl">
        <div className="mb-16 flex flex-col items-start gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Badge className="mb-4 bg-primary/10 text-primary border-0">
              {t('home.projects.badge')}
            </Badge>
            <Heading as="h2" className="mb-4">
              {t('home.projects.heading')}
            </Heading>
            <Lead className="max-w-2xl">
              {t('home.projects.subheading')}
            </Lead>
          </div>
          <a
            href="#"
            className="shrink-0 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
          >
            {t('home.projects.viewAll')} →
          </a>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {homeProjects.map((key) => (
            <article
              key={key}
              className="overflow-hidden rounded-xl border border-border bg-card hover:-translate-y-2 hover:shadow-2xl transition-all"
            >
              {/* Gradient image area */}
              <div className={`aspect-video bg-gradient-to-br ${projectGradients[key]}`} />
              <div className="p-6">
                <Badge variant="outline" className="mb-3">
                  {t(`home.projects.items.${key}.category`)}
                </Badge>
                <CardTitle>{t(`home.projects.items.${key}.title`)}</CardTitle>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  )
}
