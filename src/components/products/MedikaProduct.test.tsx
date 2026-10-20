import { render, screen } from '@testing-library/react'
import { MedikaProduct } from './MedikaProduct'
import { t } from '@/i18n'
import { medikaCapabilities, medikaTechnologies } from '@/content/medika'

describe.each(['en', 'es'] as const)('MEDIKA product in %s', locale => {
  it('explains the product, challenge, solution and real capabilities', () => {
    render(<MedikaProduct locale={locale} />)
    expect(screen.getByRole('heading', { level: 1, name: 'MEDIKA' })).toBeInTheDocument()
    for (const key of ['overviewTitle', 'problemTitle', 'solutionTitle', 'gallery', 'capabilitiesTitle', 'engineeringTitle', 'experienceTitle']) {
      expect(screen.getByRole('heading', { name: t(`products.medika.${key}`, locale) })).toBeInTheDocument()
    }
    expect(screen.getByText(t('products.medika.summary', locale))).toBeInTheDocument()
    for (const capability of medikaCapabilities) expect(screen.getByText(t(`products.medika.capabilities.${capability}`, locale))).toBeInTheDocument()
    for (const technology of medikaTechnologies) expect(screen.getByText(technology)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: t('products.medika.back', locale) })).toHaveAttribute('href', `/?lang=${locale}`)
    expect(screen.getByRole('link', { name: t('products.medika.cta', locale) })).toHaveAttribute('href', '/medika')
    expect(screen.getByRole('link', { name: t('products.medika.demoCta', locale) })).toHaveAttribute('href', '/medika')
  })

  it('reuses four accessible, responsive screenshots with full-size links', () => {
    const { container } = render(<MedikaProduct locale={locale} />)
    const images = screen.getAllByRole('img')
    expect(images).toHaveLength(4)
    images.forEach(image => {
      expect(image.getAttribute('alt')!.length).toBeGreaterThan(20)
      expect(image).toHaveAttribute('loading', 'lazy')
      expect(image).toHaveAttribute('width', '1440')
      expect(image).toHaveAttribute('height', '900')
      expect(image).toHaveAttribute('sizes')
    })
    expect(new Set(images.map(image => image.getAttribute('src'))).size).toBe(4)
    expect(container.querySelectorAll('a[target="_blank"][rel="noopener noreferrer"]')).toHaveLength(4)
    expect(container.textContent).not.toMatch(/99.9%|HIPAA|GDPR|guaranteed|garantizado/i)
  })
})
