import { act, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { LocaleProvider, useLocale } from './LocaleProvider'
import { LanguageToggle } from '@/components/ui/LanguageToggle'
import { localeSeo } from '@/lib/seo'

function Content() {
  const { locale } = useLocale()
  return <><output>{locale}</output><input aria-label="Project notes" /><LanguageToggle /></>
}
beforeEach(() => {
  window.history.replaceState(null, '', '/')
  document.cookie = 'akdevia-locale=; Max-Age=0; Path=/'
  document.head.innerHTML = '<link rel="canonical" href="https://akdevia.com"><meta name="description"><meta property="og:locale">'
})
afterEach(() => { document.head.innerHTML = ''; document.cookie = 'akdevia-locale=; Max-Age=0; Path=/' })

it('starts with the server locale and makes it shareable without persisting an automatic choice', () => {
  const routeSnapshot = { __NA: true, route: 'preserved' }
  window.history.replaceState(routeSnapshot, '', '/')
  render(<LocaleProvider initialLocale="es"><Content /></LocaleProvider>)
  expect(screen.getByRole('status')).toHaveTextContent('es')
  expect(document.documentElement.lang).toBe('es')
  expect(window.location.search).toBe('?lang=es')
  expect(document.cookie).not.toContain('akdevia-locale=')
  expect(window.history.state).toEqual(routeSnapshot)
})
it('switches immediately using history, preserving mounted form state and updating SEO', async () => {
  window.history.replaceState(null, '', '/?lang=en#about')
  const push = vi.spyOn(window.history, 'pushState')
  render(<LocaleProvider initialLocale="en"><Content /></LocaleProvider>)
  const input = screen.getByRole('textbox')
  await userEvent.type(input, 'A real project')
  await userEvent.click(screen.getByRole('link'))
  expect(screen.getByRole('status')).toHaveTextContent('es')
  expect(screen.getByRole('textbox')).toBe(input)
  expect(input).toHaveValue('A real project')
  expect(push).toHaveBeenCalledWith(null, '', '/?lang=es#about')
  expect(document.cookie).toContain('akdevia-locale=es')
  expect(document.title).toBe(localeSeo('es').title)
  expect(document.querySelector('link[rel="canonical"]')).toHaveAttribute('href', 'https://akdevia.com/?lang=es')
  expect(document.querySelector('meta[property="og:locale"]')).toHaveAttribute('content', 'es_DO')
  push.mockRestore()
})
it('restores back/forward language without replacing the saved manual preference', async () => {
  render(<LocaleProvider initialLocale="en"><Content /></LocaleProvider>)
  await userEvent.click(screen.getByRole('link'))
  act(() => {
    window.history.replaceState(null, '', '/?lang=en')
    window.dispatchEvent(new PopStateEvent('popstate'))
  })
  expect(screen.getByRole('status')).toHaveTextContent('en')
  expect(document.cookie).toContain('akdevia-locale=es')
})
it('preserves Spanish on product navigation and switches its metadata without leaving the route', async () => {
  window.history.replaceState(null, '', '/products/medika?lang=es')
  render(<LocaleProvider initialLocale="es"><Content /></LocaleProvider>)
  expect(document.title).toBe(localeSeo('es', '/products/medika').title)
  expect(screen.getByRole('link')).toHaveAttribute('href', '/products/medika?lang=en')
  await userEvent.click(screen.getByRole('link'))
  expect(window.location.pathname).toBe('/products/medika')
  expect(window.location.search).toBe('?lang=en')
  expect(document.title).toBe(localeSeo('en', '/products/medika').title)
  expect(document.querySelector('link[rel="canonical"]')).toHaveAttribute('href', 'https://akdevia.com/products/medika')
})
