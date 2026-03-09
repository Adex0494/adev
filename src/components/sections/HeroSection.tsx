'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { t } from '@/i18n'
import { Badge, Button, Container, Heading, Lead } from '@/components/ui'
import { ProjectIntakeModal } from '@/components/ui/Modal'
import { useCountUp } from '@/hooks/useCountUp'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay, ease: [0.21, 0.47, 0.32, 0.98] },
  }),
}

function StatCounter({ target, suffix = '+' }: { target: number; suffix?: string }) {
  const { count, ref } = useCountUp(target, 1600)
  return (
    <div ref={ref}>
      <p className="text-2xl font-bold text-foreground tabular-nums">
        {count}
        {suffix}
      </p>
    </div>
  )
}

export function HeroSection() {
  const [projectModalOpen, setProjectModalOpen] = useState(false)

  function scrollToContact() {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <section
        id="hero"
        aria-label={t('home.hero.title')}
        className="relative min-h-[calc(100vh-4rem)] overflow-hidden bg-background"
      >
        {/* Animated background glows */}
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="animate-glow-drift absolute left-1/4 top-1/4 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[140px]" />
          <div className="animate-glow-drift-reverse absolute right-1/4 bottom-1/4 h-[400px] w-[400px] translate-x-1/2 translate-y-1/2 rounded-full bg-accent/10 blur-[120px]" />
          <div className="absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent2/5 blur-[100px]" />
        </div>

        <Container size="xl" className="relative">
          <div className="grid items-center gap-12 py-20 lg:grid-cols-2 lg:py-32">
            {/* Left: content */}
            <div>
              <motion.div custom={0} variants={fadeUp} initial="hidden" animate="visible">
                <Badge variant="subtle" className="mb-6">
                  {t('home.hero.badge')}
                </Badge>
              </motion.div>

              <motion.div custom={0.1} variants={fadeUp} initial="hidden" animate="visible">
                <Heading as="h1" className="mb-6">
                  {t('home.hero.title')}
                </Heading>
              </motion.div>

              <motion.div custom={0.2} variants={fadeUp} initial="hidden" animate="visible">
                <Lead className="mb-8 max-w-lg">{t('home.hero.subtitle')}</Lead>
              </motion.div>

              <motion.div
                custom={0.3}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                className="flex flex-wrap gap-4"
              >
                <Button
                  variant="primaryGradient"
                  size="lg"
                  onClick={() => setProjectModalOpen(true)}
                  className="hover:scale-[1.03] hover:shadow-[0_0_28px_rgb(112_72_250/_0.45)] active:scale-[0.98]"
                >
                  {t('home.hero.ctaPrimary')}
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={scrollToContact}
                  className="hover:shadow-[0_0_16px_rgb(112_72_250/_0.25)]"
                >
                  {t('home.hero.ctaSecondary')}
                </Button>
              </motion.div>

              {/* Stats strip */}
              <motion.div
                custom={0.45}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                className="mt-10 flex gap-8"
              >
                <div>
                  <StatCounter target={120} />
                  <p className="text-sm text-muted">{t('home.hero.stats.projectsLabel')}</p>
                </div>
                <div>
                  <StatCounter target={80} />
                  <p className="text-sm text-muted">{t('home.hero.stats.clientsLabel')}</p>
                </div>
                <div>
                  <StatCounter target={8} />
                  <p className="text-sm text-muted">{t('home.hero.stats.yearsLabel')}</p>
                </div>
              </motion.div>
            </div>

            {/* Right: device mockup */}
            <motion.div
              className="relative hidden lg:block"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, delay: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
            >
              {/* Ambient glow behind mockup */}
              <div
                className="absolute -top-8 left-8 h-64 w-64 rounded-full bg-primary/15 blur-[80px]"
                aria-hidden="true"
              />

              {/* Laptop mockup — float animation */}
              <div className="animate-float relative rounded-xl border border-border bg-card-elevated p-4 shadow-2xl">
                <div className="aspect-[16/10] rounded-lg bg-background-secondary">
                  <div className="p-4">
                    <div className="mb-3 h-3 w-1/3 rounded bg-border" />
                    <div className="mb-2 h-2 w-full rounded bg-border-subtle" />
                    <div className="mb-2 h-2 w-5/6 rounded bg-border-subtle" />
                    <div className="mb-4 h-2 w-4/6 rounded bg-border-subtle" />
                    <div className="flex gap-2">
                      <div className="h-8 w-24 rounded bg-primary/30" />
                      <div className="h-8 w-20 rounded bg-border" />
                    </div>
                    <div className="mt-4 grid grid-cols-3 gap-2">
                      <div className="h-16 rounded bg-primary/10" />
                      <div className="h-16 rounded bg-accent/10" />
                      <div className="h-16 rounded bg-accent2/10" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Phone mockup — delayed float */}
              <div className="animate-float-delayed absolute -bottom-6 -right-4 w-28 rounded-2xl border border-border bg-card-elevated p-2 shadow-2xl">
                <div className="aspect-[9/16] rounded-xl bg-background-secondary">
                  <div className="flex flex-col gap-1 p-2">
                    <div className="h-1.5 w-3/4 rounded bg-border" />
                    <div className="h-1.5 w-1/2 rounded bg-border-subtle" />
                    <div className="mt-2 h-8 rounded bg-primary/20" />
                    <div className="mt-1 h-3 w-full rounded bg-border-subtle" />
                    <div className="h-3 w-4/5 rounded bg-border-subtle" />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      <ProjectIntakeModal isOpen={projectModalOpen} onClose={() => setProjectModalOpen(false)} />
    </>
  )
}
