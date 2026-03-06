import { t } from '@/i18n'
import { Badge, Container, Heading, Lead } from '@/components/ui'
import { homeProcessSteps } from '@/content/home'

export function ProcessSection() {
  return (
    <section id="process" className="bg-background py-24">
      <Container size="xl">
        <div className="mb-16 text-center">
          <Badge className="mb-4 bg-primary/10 text-primary border-0">
            {t('home.process.badge')}
          </Badge>
          <Heading as="h2" className="mb-4">
            {t('home.process.heading')}
          </Heading>
          <Lead className="mx-auto max-w-2xl">
            {t('home.process.subheading')}
          </Lead>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {homeProcessSteps.map((key, index) => (
            <div key={key} className="relative">
              {/* Connector line (not on last step) */}
              {index < homeProcessSteps.length - 1 && (
                <div className="hidden lg:block absolute right-0 top-8 h-px w-1/2 bg-border" />
              )}
              <div className="rounded-2xl bg-primary/10 p-4 mb-6 inline-flex items-center justify-center">
                <span className="text-2xl font-bold text-primary">
                  {t(`home.process.steps.${key}.number`)}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {t(`home.process.steps.${key}.title`)}
              </h3>
              <p className="text-sm text-muted leading-relaxed">
                {t(`home.process.steps.${key}.description`)}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
