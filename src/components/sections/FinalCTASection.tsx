'use client'

import { t } from '@/i18n'
import { Badge, Button, Container, Heading, Lead } from '@/components/ui'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { cn } from '@/lib/utils'

const inputClass = cn(
  'w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground',
  'placeholder:text-muted',
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1',
  'transition-colors',
)

export function FinalCTASection() {
  return (
    <section id="contact" className="bg-background-secondary py-24">
      <Container size="xl">
        <ScrollReveal>
          <div className="mb-16 text-center">
            <Badge variant="subtle" className="mb-6">
              {t('home.cta.badge')}
            </Badge>
            <Heading as="h2" className="mb-6">
              {t('home.cta.heading')}
            </Heading>
            <Lead className="mx-auto max-w-xl">{t('home.cta.subheading')}</Lead>
          </div>
        </ScrollReveal>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Book a Call */}
          <ScrollReveal delay={0.1} direction="left">
            <div className="flex h-full flex-col rounded-2xl border border-border bg-card p-8">
              <div className="mb-6">
                <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 9v7.5"
                    />
                  </svg>
                </div>
                <h3 className="mb-1 text-xl font-semibold text-foreground">
                  {t('home.cta.bookCall')}
                </h3>
                <p className="text-sm text-muted">{t('home.cta.bookCallSubtitle')}</p>
              </div>

              {/* Calendly placeholder */}
              <div
                className="flex flex-1 items-center justify-center rounded-xl border border-dashed border-border bg-background-secondary p-8 text-center"
                role="region"
                aria-label={t('home.cta.bookCall')}
              >
                <div>
                  <div className="mb-3 h-8 w-8 mx-auto rounded-full bg-primary/20" aria-hidden="true" />
                  <p className="text-sm text-muted">{t('home.cta.calendlyPlaceholder')}</p>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Send a Message */}
          <ScrollReveal delay={0.2} direction="right">
            <div className="flex h-full flex-col rounded-2xl border border-border bg-card p-8">
              <div className="mb-6">
                <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-accent"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                    />
                  </svg>
                </div>
                <h3 className="mb-1 text-xl font-semibold text-foreground">
                  {t('home.cta.sendMessage')}
                </h3>
                <p className="text-sm text-muted">{t('home.cta.sendMessageSubtitle')}</p>
              </div>

              <form
                onSubmit={(e) => e.preventDefault()}
                className="flex flex-1 flex-col gap-4"
                aria-label={t('home.cta.sendMessage')}
              >
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="cta-name" className="text-sm font-medium text-foreground">
                      {t('home.cta.formName')}
                    </label>
                    <input
                      id="cta-name"
                      type="text"
                      placeholder={t('home.cta.formNamePlaceholder')}
                      className={inputClass}
                      required
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="cta-email" className="text-sm font-medium text-foreground">
                      {t('home.cta.formEmail')}
                    </label>
                    <input
                      id="cta-email"
                      type="email"
                      placeholder={t('home.cta.formEmailPlaceholder')}
                      className={inputClass}
                      required
                    />
                  </div>
                </div>

                <div className="flex flex-1 flex-col gap-1.5">
                  <label htmlFor="cta-message" className="text-sm font-medium text-foreground">
                    {t('home.cta.formMessage')}
                  </label>
                  <textarea
                    id="cta-message"
                    rows={5}
                    placeholder={t('home.cta.formMessagePlaceholder')}
                    className={cn(inputClass, 'flex-1 resize-none')}
                    required
                  />
                </div>

                <Button
                  type="submit"
                  variant="primaryGradient"
                  size="lg"
                  className="w-full hover:scale-[1.01] hover:shadow-[0_0_24px_rgb(112_72_250/_0.4)]"
                >
                  {t('home.cta.formSubmit')}
                </Button>
              </form>
            </div>
          </ScrollReveal>
        </div>
      </Container>
    </section>
  )
}
