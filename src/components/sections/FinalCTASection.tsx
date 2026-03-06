import { t } from '@/i18n'
import { Badge, Button, Container, Heading, Lead } from '@/components/ui'

export function FinalCTASection() {
  return (
    <section id="contact" className="bg-background-secondary py-24">
      <Container size="md">
        <div className="text-center">
          <Badge className="mb-6 bg-primary/10 text-primary border-0">
            {t('home.cta.badge')}
          </Badge>
          <Heading as="h2" className="mb-6">
            {t('home.cta.heading')}
          </Heading>
          <Lead className="mx-auto mb-10 max-w-xl">
            {t('home.cta.subheading')}
          </Lead>
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="primaryGradient" size="lg">
              {t('home.cta.ctaPrimary')}
            </Button>
            <Button variant="ghost" size="lg">
              {t('home.cta.ctaSecondary')}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  )
}
