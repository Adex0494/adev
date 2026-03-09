import { t } from '@/i18n'
import { Badge, CardTitle, Container, Heading, Lead } from '@/components/ui'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { homeProjects } from '@/content/home'
import { cn } from '@/lib/utils'

const projectGradients: Record<(typeof homeProjects)[number], string> = {
  project1: 'from-primary/30 to-accent/30',
  project2: 'from-accent/30 to-accent2/30',
  project3: 'from-accent2/30 to-primary/30',
}

export function FeaturedProjectsSection() {
  return (
    <section id="work" className="bg-background py-24">
      <Container size="xl">
        <ScrollReveal>
          <div className="mb-16 flex flex-col items-start gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <Badge variant="subtle" className="mb-4">
                {t('home.projects.badge')}
              </Badge>
              <Heading as="h2" className="mb-4">
                {t('home.projects.heading')}
              </Heading>
              <Lead className="max-w-2xl">{t('home.projects.subheading')}</Lead>
            </div>
            <a
              href="#"
              className="shrink-0 text-sm font-medium text-primary underline-offset-4 hover:underline transition-colors"
            >
              {t('home.projects.viewAll')} →
            </a>
          </div>
        </ScrollReveal>

        <div className="grid gap-8 md:grid-cols-3">
          {homeProjects.map((key, i) => (
            <ScrollReveal key={key} delay={i * 0.12}>
              <ProjectCard projectKey={key} />
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  )
}

function ProjectCard({ projectKey }: { projectKey: (typeof homeProjects)[number] }) {
  return (
    <article
      className={cn(
        'group overflow-hidden rounded-xl border border-border bg-card',
        'cursor-default transition-all duration-300',
        'hover:-translate-y-2 hover:border-primary/30',
        'hover:shadow-[0_16px_48px_rgb(0_0_0/_0.15)]',
      )}
    >
      {/* Image container with zoom + overlay */}
      <div className="relative aspect-video overflow-hidden">
        <div
          className={cn(
            'absolute inset-0 bg-gradient-to-br transition-transform duration-500',
            'group-hover:scale-[1.08]',
            projectGradients[projectKey],
          )}
          aria-hidden="true"
        />
        {/* Gradient overlay on hover */}
        <div
          className={cn(
            'absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100',
            'bg-gradient-to-t from-foreground/30 via-transparent to-transparent',
          )}
          aria-hidden="true"
        />
        {/* Category badge reveal */}
        <div className="absolute bottom-3 left-3 translate-y-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <Badge variant="outline" className="border-primary-foreground/30 bg-foreground/20 text-primary-foreground backdrop-blur-sm">
            {t(`home.projects.items.${projectKey}.category`)}
          </Badge>
        </div>
      </div>

      <div className="p-6">
        <Badge variant="outline" className="mb-3">
          {t(`home.projects.items.${projectKey}.category`)}
        </Badge>
        <CardTitle className="transition-colors duration-200 group-hover:text-primary">
          {t(`home.projects.items.${projectKey}.title`)}
        </CardTitle>
      </div>
    </article>
  )
}
