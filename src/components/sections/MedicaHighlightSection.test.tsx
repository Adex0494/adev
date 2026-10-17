import { render, screen } from '@testing-library/react'
import { MedicaHighlightSection } from './MedicaHighlightSection'
import type { Locale } from '@/i18n'
describe.each(['en','es'] as Locale[])('MEDIKA case study in %s', locale => {
  it('renders four responsive, accessible demo images and the public demo link', () => {
    render(<MedicaHighlightSection locale={locale} />)
    const images = screen.getAllByRole('img')
    expect(images).toHaveLength(4)
    images.forEach(image => {
      expect(image.getAttribute('alt')?.length).toBeGreaterThan(20)
      expect(image).toHaveAttribute('loading','lazy')
      expect(image).toHaveAttribute('width','1440')
      expect(image).toHaveAttribute('height','900')
    })
    expect(document.querySelector('a[href="/medika"]')).toBeInTheDocument()
    expect(document.querySelector('[href*="medika-demo.vercel.app"]')).toBeNull()
    expect(document.querySelectorAll('a[target="_blank"][rel="noopener noreferrer"]')).toHaveLength(4)
  })
})
