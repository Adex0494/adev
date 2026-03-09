'use client'

import { useState } from 'react'
import { t } from '@/i18n'
import { Button, Container } from '@/components/ui'
import { ThemeToggle } from '@/components/ui/ThemeToggle'
import { ProjectIntakeModal } from '@/components/ui/Modal'
import { cn } from '@/lib/utils'

const navLinks = [
  { key: 'services', href: '#services' },
  { key: 'work', href: '#work' },
  { key: 'process', href: '#process' },
  { key: 'contact', href: '#contact' },
] as const

function NavLink({ href, label }: { href: string; label: string }) {
  function handleClick(e: React.MouseEvent<HTMLAnchorElement>) {
    const target = document.querySelector(href)
    if (target) {
      e.preventDefault()
      target.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <a
      href={href}
      onClick={handleClick}
      className={cn(
        'relative rounded-sm text-sm text-foreground-secondary transition-colors hover:text-foreground',
        'after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-0 after:bg-primary',
        'after:transition-all after:duration-300 hover:after:w-full',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
      )}
    >
      {label}
    </a>
  )
}

export function SiteHeader() {
  const [projectModalOpen, setProjectModalOpen] = useState(false)

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-border-subtle bg-background/80 backdrop-blur-sm">
        <Container size="xl">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-xl font-bold text-transparent">
              {t('home.header.logo')}
            </span>

            {/* Nav */}
            <nav aria-label="Main navigation" className="hidden items-center gap-8 md:flex">
              {navLinks.map(({ key, href }) => (
                <NavLink key={key} href={href} label={t(`nav.${key}`)} />
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <Button
                variant="primaryGradient"
                size="sm"
                onClick={() => setProjectModalOpen(true)}
                className="hover:scale-[1.03] hover:shadow-[0_0_20px_rgb(112_72_250/_0.4)]"
              >
                {t('home.header.getStarted')}
              </Button>
              <ThemeToggle />
            </div>
          </div>
        </Container>
      </header>

      <ProjectIntakeModal isOpen={projectModalOpen} onClose={() => setProjectModalOpen(false)} />
    </>
  )
}
