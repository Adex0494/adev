import { t } from '@/i18n'
import { Badge, Button, Container, Heading, Lead } from '@/components/ui'

export function MedicaHighlightSection() {
  return (
    <section className="bg-background-secondary py-24">
      <Container size="xl">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* Left: content */}
          <div>
            <Badge className="mb-6 bg-primary/10 text-primary border-0">
              {t('home.medica.badge')}
            </Badge>
            <Heading as="h2" className="mb-6">
              {t('home.medica.heading')}
            </Heading>
            <Lead className="mb-8">
              {t('home.medica.subheading')}
            </Lead>
            <Button variant="primaryGradient" size="lg">
              {t('home.medica.cta')}
            </Button>
          </div>

          {/* Right: browser frame mockup */}
          <div
            data-testid="browser-frame"
            className="rounded-xl border border-border shadow-2xl bg-card-elevated overflow-hidden"
          >
            {/* Chrome bar */}
            <div className="flex h-10 items-center gap-2 border-b border-border bg-card px-4">
              <span className="h-3 w-3 rounded-full bg-danger/70" />
              <span className="h-3 w-3 rounded-full bg-warning/70" />
              <span className="h-3 w-3 rounded-full bg-success/70" />
              <div className="ml-4 h-5 flex-1 rounded-full bg-background-secondary" />
            </div>
            {/* Screen content */}
            <div className="aspect-[4/3] bg-background-secondary p-6">
              <div className="mb-4 flex items-center gap-4">
                <div className="h-8 w-8 rounded-full bg-primary/20" />
                <div className="h-3 w-32 rounded bg-border" />
              </div>
              <div className="grid grid-cols-3 gap-3 mb-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="rounded-lg bg-card p-3">
                    <div className="mb-2 h-2 w-1/2 rounded bg-border" />
                    <div className="h-5 w-3/4 rounded bg-primary/10" />
                  </div>
                ))}
              </div>
              <div className="space-y-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex items-center gap-3 rounded bg-card px-3 py-2">
                    <div className="h-6 w-6 rounded-full bg-border-subtle" />
                    <div className="h-2 flex-1 rounded bg-border" />
                    <div className="h-2 w-12 rounded bg-border-subtle" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
