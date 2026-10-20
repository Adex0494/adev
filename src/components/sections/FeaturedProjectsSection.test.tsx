import { render, screen } from '@testing-library/react'
import { FeaturedProjectsSection } from './FeaturedProjectsSection'
import { t } from '@/i18n'
import { site } from '@/lib/site'

describe('FeaturedProjectsSection', () => {
  it('presents one real flagship product with a cross-zone document link', () => {
    render(<FeaturedProjectsSection />)
    expect(screen.getAllByRole('article')).toHaveLength(1)
    expect(screen.getByRole('heading', { name: t('home.projects.heading') })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /launch live demo/i })).toHaveAttribute('href', site.medika)
    expect(screen.getByRole('link', { name: /explore medika/i })).toHaveAttribute('href', '/products/medika?lang=en')
    expect(document.body.textContent).not.toMatch(/Next.js|React|TypeScript|Supabase|Tailwind|Vercel/)
    expect(screen.getAllByRole('img')).toHaveLength(1)
  })
  it('renders the complete Spanish presentation', () => {
    render(<FeaturedProjectsSection locale="es" />)
    expect(screen.getByText(t('home.projects.summary', 'es'))).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /abrir demo/i })).toHaveAttribute('href', '/medika')
    expect(screen.getByRole('link', { name: /explorar medika/i })).toHaveAttribute('href', '/products/medika?lang=es')
  })
})
