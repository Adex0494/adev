import { t } from '@/i18n'
import { Badge, Card, CardTitle, CardDescription, Container, Heading, Lead } from '@/components/ui'
import { homeServices } from '@/content/home'

const serviceIcons: Record<(typeof homeServices)[number], React.ReactNode> = {
  web: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="h-6 w-6"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"
      />
    </svg>
  ),
  mobile: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="h-6 w-6"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 15.75h3"
      />
    </svg>
  ),
  design: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="h-6 w-6"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42"
      />
    </svg>
  ),
}

export function ServicesSection() {
  return (
    <section id="services" className="bg-background-secondary py-24">
      <Container size="xl">
        <div className="mb-16 text-center">
          <Badge className="mb-4 bg-primary/10 text-primary border-0">
            {t('home.services.badge')}
          </Badge>
          <Heading as="h2" className="mb-4">
            {t('home.services.heading')}
          </Heading>
          <Lead className="mx-auto max-w-2xl">
            {t('home.services.subheading')}
          </Lead>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {homeServices.map((key) => (
            <Card
              key={key}
              className="hover:-translate-y-1 hover:shadow-xl transition-all"
            >
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                {serviceIcons[key]}
              </div>
              <CardTitle className="mb-2">{t(`home.services.items.${key}.title`)}</CardTitle>
              <CardDescription>{t(`home.services.items.${key}.description`)}</CardDescription>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  )
}
