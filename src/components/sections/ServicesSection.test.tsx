import { render, screen } from '@testing-library/react'
import { ServicesSection } from './ServicesSection'
import { homeServices } from '@/content/home'
import { t } from '@/i18n'
import type { Locale } from '@/i18n'
describe.each(['en','es'] as Locale[])('Services in %s', locale => {
  it('renders three concrete capabilities in the chosen language', () => {
    render(<ServicesSection locale={locale} />)
    expect(screen.getAllByRole('article')).toHaveLength(3)
    for (const key of homeServices) expect(screen.getByText(t(`home.services.items.${key}.title`,locale))).toBeInTheDocument()
  })
})
