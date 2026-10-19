import { fireEvent, render, screen } from '@testing-library/react'
import { LocaleProvider } from '@/i18n/LocaleProvider'
import { LanguageToggle } from './LanguageToggle'

it('provides a shareable native fallback and localized accessible label', () => {
  render(<LanguageToggle locale="en" />)
  expect(screen.getByRole('link', { name: 'Cambiar a español' })).toHaveAttribute('href', '/?lang=es')
  expect(screen.getByRole('link')).toHaveAttribute('hreflang', 'es')
})
it('preserves modified-click browser behavior', () => {
  window.history.replaceState(null, '', '/?lang=en')
  render(<LocaleProvider initialLocale="en"><LanguageToggle /></LocaleProvider>)
  const push = vi.spyOn(window.history, 'pushState')
  const link = screen.getByRole('link')
  // Cancel browser navigation after observing whether the component intercepted it.
  let intercepted = true
  link.addEventListener('click', event => { intercepted = event.defaultPrevented; event.preventDefault() })
  fireEvent.click(link, { ctrlKey: true })
  expect(intercepted).toBe(false)
  expect(push).not.toHaveBeenCalled()
  push.mockRestore()
})
