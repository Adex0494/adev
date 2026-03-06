import { t } from '@/i18n'
import { Button, Container } from '@/components/ui'
import { ThemeToggle } from '@/components/ui/ThemeToggle'

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-sm bg-background/80 border-b border-border-subtle">
      <Container size="xl">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            {t('home.header.logo')}
          </span>

          {/* Nav */}
          <nav aria-label="Main navigation" className="hidden md:flex items-center gap-8">
            <a href="#services" className="text-sm text-foreground-secondary hover:text-foreground transition-colors">
              {t('nav.services')}
            </a>
            <a href="#work" className="text-sm text-foreground-secondary hover:text-foreground transition-colors">
              {t('nav.work')}
            </a>
            <a href="#about" className="text-sm text-foreground-secondary hover:text-foreground transition-colors">
              {t('nav.about')}
            </a>
            <a href="#process" className="text-sm text-foreground-secondary hover:text-foreground transition-colors">
              Process
            </a>
            <a href="#contact" className="text-sm text-foreground-secondary hover:text-foreground transition-colors">
              {t('nav.contact')}
            </a>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <Button variant="primaryGradient" size="sm">
              {t('home.header.getStarted')}
            </Button>
            <ThemeToggle />
          </div>
        </div>
      </Container>
    </header>
  )
}
