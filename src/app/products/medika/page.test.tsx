import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import MedikaPage, { generateMetadata } from './page'
import sitemap from '@/app/sitemap'
import robots from '@/app/robots'
import { t } from '@/i18n'
import { ThemeProvider } from '@/components/ui/ThemeProvider'

vi.mock('@/i18n/server', () => ({ getLocale: vi.fn(async () => 'en') }))
import { getLocale } from '@/i18n/server'

afterEach(() => { window.history.replaceState(null, '', '/') })

it('renders the product route with the normal header, footer and Work current', () => {
  window.history.replaceState(null, '', '/products/medika')
  render(<ThemeProvider><MedikaPage /></ThemeProvider>)
  expect(screen.getByRole('heading', { level: 1, name: 'MEDIKA' })).toBeInTheDocument()
  expect(screen.getByRole('banner')).toBeInTheDocument()
  expect(screen.getByRole('contentinfo')).toBeInTheDocument()
  expect(screen.getByRole('navigation', { name: 'Main navigation' }).querySelector('[aria-current="page"]')).toHaveTextContent('Work')
})

it.each(['en', 'es'] as const)('provides truthful localized metadata in %s', async locale => {
  vi.mocked(getLocale).mockResolvedValue(locale)
  const metadata = await generateMetadata()
  expect(metadata.title).toBe(t('products.medika.seo.title', locale))
  expect(metadata.description).toBe(t('products.medika.seo.description', locale))
  expect(metadata.alternates?.canonical).toBe('https://akdevia.com/products/medika')
  expect(metadata.alternates?.languages).toEqual({ en: '/products/medika?lang=en', es: '/products/medika?lang=es', 'x-default': '/products/medika' })
  expect(metadata.openGraph).toMatchObject({ url: 'https://akdevia.com/products/medika', locale: locale === 'es' ? 'es_DO' : 'en_US' })
  expect(metadata.twitter).toMatchObject({ title: t('products.medika.seo.title', locale), card: 'summary_large_image' })
})

it('indexes the product while preserving demo indexing restrictions', () => {
  const entries = sitemap()
  expect(entries.find(entry => entry.url === 'https://akdevia.com/products/medika')?.alternates?.languages?.es).toBe('https://akdevia.com/products/medika?lang=es')
  expect(entries.some(entry => new URL(entry.url).pathname.startsWith('/medika'))).toBe(false)
  expect(robots().rules).toMatchObject({ disallow: ['/api/', '/medika'] })
})
