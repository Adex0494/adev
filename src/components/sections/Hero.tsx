import { t } from '@/i18n'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { Badge } from '@/components/ui/Badge'
import { Heading, Lead } from '@/components/ui/Typography'

export function Hero() {
  return (
    <section
      className="relative flex min-h-[90vh] items-center bg-background"
      aria-label={t('home.hero.tagline')}
    >
      <Container size="lg">
        <div className="mx-auto max-w-3xl text-center">
          <Badge variant="outline" className="mb-6">
            {t('home.hero.tagline')}
          </Badge>

          <Heading as="h1" className="mb-6">
            {t('home.hero.title')}
          </Heading>

          <Lead className="mb-10">{t('home.hero.subtitle')}</Lead>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" variant="primary">
              {t('home.hero.cta')}
            </Button>
            <Button size="lg" variant="secondary">
              {t('home.hero.ctaSecondary')}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  )
}
