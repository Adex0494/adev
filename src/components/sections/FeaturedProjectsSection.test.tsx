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
    expect(screen.getByRole('link', { name: /explore the case study/i })).toHaveAttribute('href', '#medika-case-study')
  })
  it('renders the complete Spanish presentation', () => {
    render(<FeaturedProjectsSection locale="es" />)
    expect(screen.getByText(t('home.projects.summary', 'es'))).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /abrir demo/i })).toHaveAttribute('href', '/medika')
  })
})
