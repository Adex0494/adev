import { t } from '@/i18n'
import { Badge, Container, Heading, Lead } from '@/components/ui'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { homeProcessSteps } from '@/content/home'
import { cn } from '@/lib/utils'

export function ProcessSection() {
  return (
    <section id="process" className="bg-background py-24">
      <Container size="xl">
        <ScrollReveal>
          <div className="mb-16 text-center">
            <Badge variant="subtle" className="mb-4">
              {t('home.process.badge')}
            </Badge>
            <Heading as="h2" className="mb-4">
              {t('home.process.heading')}
            </Heading>
            <Lead className="mx-auto max-w-2xl">{t('home.process.subheading')}</Lead>
          </div>
        </ScrollReveal>

        {/* Timeline container */}
        <div className="relative">
          {/* Horizontal connecting line — rendered behind steps via z-0 */}
          <div
            className="absolute left-0 right-0 top-10 z-0 hidden h-px bg-gradient-to-r from-transparent via-border to-transparent lg:block"
            aria-hidden="true"
          />

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {homeProcessSteps.map((key, i) => (
              <ScrollReveal key={key} delay={i * 0.12} direction="up">
                <ProcessStep stepKey={key} isLast={i === homeProcessSteps.length - 1} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}

function ProcessStep({
  stepKey,
  isLast,
}: {
  stepKey: (typeof homeProcessSteps)[number]
  isLast: boolean
}) {
  return (
    <div
      className={cn(
        'group relative z-10 rounded-2xl p-6 transition-all duration-300',
        'hover:bg-primary/5 hover:border-primary/20',
        'border border-transparent',
      )}
    >
      {/* Number circle — solid bg ensures it covers the absolute line */}
      <div className="relative mb-6 inline-flex items-center justify-center">
        <div
          className={cn(
            'relative z-10 h-20 w-20 rounded-full border-2 border-border bg-background',
            'flex items-center justify-center',
            'transition-all duration-300',
            'group-hover:border-primary/60',
            'group-hover:shadow-[0_0_20px_rgb(112_72_250/_0.2)]',
          )}
        >
          {/* Solid colour fill on hover — stays opaque */}
          <div
            className="absolute inset-0 rounded-full bg-primary/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            aria-hidden="true"
          />
          <span className="relative z-10 text-2xl font-bold text-primary">
            {t(`home.process.steps.${stepKey}.number`)}
          </span>
        </div>

        {/* Arrow connector (desktop, not on last step) */}
        {!isLast && (
          <div
            className="absolute -right-8 top-1/2 hidden -translate-y-1/2 text-border lg:flex items-center"
            aria-hidden="true"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M8.293 2.293a1 1 0 0 1 1.414 0l5 5a1 1 0 0 1 0 1.414l-5 5a1 1 0 0 1-1.414-1.414L11.586 9H2a1 1 0 0 1 0-2h9.586L8.293 3.707a1 1 0 0 1 0-1.414Z" />
            </svg>
          </div>
        )}
      </div>

      <h3 className="mb-2 text-lg font-semibold text-foreground transition-colors duration-200 group-hover:text-primary">
        {t(`home.process.steps.${stepKey}.title`)}
      </h3>
      <p className="text-sm leading-relaxed text-muted">
        {t(`home.process.steps.${stepKey}.description`)}
      </p>
    </div>
  )
}
