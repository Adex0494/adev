import { render, screen } from '@testing-library/react'
import { FounderSection } from './FounderSection'
import { site } from '@/lib/site'
import { t } from '@/i18n'
it('identifies the founder and links to both real profiles', () => {
  render(<FounderSection />)
  expect(screen.getByText(site.founder)).toBeInTheDocument()
  expect(screen.getByRole('link', { name: /github profile/i })).toHaveAttribute('href', site.github)
  expect(screen.getByRole('link', { name: /linkedin profile/i })).toHaveAttribute('href', site.linkedin)
})

it.each(['en', 'es'] as const)('presents a real founder in the About section in %s', locale => {
  const { container } = render(<FounderSection locale={locale} />)
  expect(container.querySelector('section')).toHaveAttribute('id', 'about')
  expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(t('home.founder.heading', locale))
  expect(screen.getByText(t('home.founder.role', locale))).toBeInTheDocument()
  const image = screen.getByRole('img', { name: t('home.founder.imageAlt', locale) })
  expect(image).toHaveAttribute('src', site.portrait.src)
  expect(image).toHaveAttribute('width', '360')
  expect(image).toHaveAttribute('height', '360')
  expect(screen.getByText(t('home.founder.description', locale))).toBeInTheDocument()
  expect(container.textContent).not.toMatch(/our engineering team|our staff|our offices/i)
})
