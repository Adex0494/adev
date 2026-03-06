import { t } from '@/i18n'
import { Badge, Button, Container, Heading, Lead } from '@/components/ui'

export function HeroSection() {
  return (
    <section
      aria-label={t('home.hero.title')}
      className="relative min-h-[calc(100vh-4rem)] overflow-hidden bg-background"
    >
      {/* Background glow blobs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/4 top-1/4 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[120px]" />
        <div className="absolute right-1/4 bottom-1/4 h-80 w-80 translate-x-1/2 translate-y-1/2 rounded-full bg-accent/10 blur-[120px]" />
      </div>

      <Container size="xl" className="relative">
        <div className="grid items-center gap-12 py-20 lg:grid-cols-2 lg:py-32">
          {/* Left: content */}
          <div>
            <Badge className="mb-6 bg-primary/10 text-primary border-0">
              {t('home.hero.badge')}
            </Badge>
            <Heading as="h1" className="mb-6">
              {t('home.hero.title')}
            </Heading>
            <Lead className="mb-8 max-w-lg">
              {t('home.hero.subtitle')}
            </Lead>
            <div className="flex flex-wrap gap-4">
              <Button variant="primaryGradient" size="lg">
                {t('home.hero.ctaPrimary')}
              </Button>
              <Button variant="outline" size="lg">
                {t('home.hero.ctaSecondary')}
              </Button>
            </div>

            {/* Stats strip */}
            <div className="mt-10 flex gap-8">
              <div>
                <p className="text-2xl font-bold text-foreground">{t('home.hero.stats.projects')}</p>
                <p className="text-sm text-muted">{t('home.hero.stats.projectsLabel')}</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{t('home.hero.stats.clients')}</p>
                <p className="text-sm text-muted">{t('home.hero.stats.clientsLabel')}</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{t('home.hero.stats.years')}</p>
                <p className="text-sm text-muted">{t('home.hero.stats.yearsLabel')}</p>
              </div>
            </div>
          </div>

          {/* Right: device mockup */}
          <div className="relative hidden lg:block">
            <div className="absolute -top-8 left-8 h-64 w-64 rounded-full bg-primary/10 blur-[80px]" />
            <div className="relative rounded-xl border border-border bg-card-elevated p-4 shadow-2xl">
              {/* Laptop screen area */}
              <div className="aspect-[16/10] rounded-lg bg-background-secondary">
                {/* Simulated UI inside screen */}
                <div className="p-4">
                  <div className="mb-3 h-3 w-1/3 rounded bg-border" />
                  <div className="mb-2 h-2 w-full rounded bg-border-subtle" />
                  <div className="mb-2 h-2 w-5/6 rounded bg-border-subtle" />
                  <div className="mb-4 h-2 w-4/6 rounded bg-border-subtle" />
                  <div className="flex gap-2">
                    <div className="h-8 w-24 rounded bg-primary/20" />
                    <div className="h-8 w-20 rounded bg-border" />
                  </div>
                </div>
              </div>
            </div>
            {/* Overlapping phone mock */}
            <div className="absolute -bottom-6 -right-4 w-28 rounded-2xl border border-border bg-card-elevated p-2 shadow-2xl">
              <div className="aspect-[9/16] rounded-xl bg-background-secondary">
                <div className="flex flex-col gap-1 p-2">
                  <div className="h-1.5 w-3/4 rounded bg-border" />
                  <div className="h-1.5 w-1/2 rounded bg-border-subtle" />
                  <div className="mt-2 h-8 rounded bg-primary/10" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
