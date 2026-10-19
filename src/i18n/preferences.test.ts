import { isLocale, localeHref, resolveLocale } from './preferences'

describe('locale priority', () => {
  it('uses an explicit shared URL before saved or browser language', () => {
    expect(resolveLocale({ query: 'en', preference: 'es', browserLanguage: 'es-DO' })).toBe('en')
  })
  it('respects a saved manual preference', () => {
    expect(resolveLocale({ preference: 'en', browserLanguage: 'es-DO' })).toBe('en')
    expect(resolveLocale({ preference: 'es', browserLanguage: 'en-US' })).toBe('es')
  })
  it.each(['es', 'es-DO, en;q=0.9', 'ES-es'])('defaults Spanish browsers to Spanish: %s', browserLanguage => {
    expect(resolveLocale({ browserLanguage })).toBe('es')
  })
  it.each([undefined, 'en-US', 'fr-FR', 'de,es;q=0.5'])('otherwise falls back to English: %s', browserLanguage => {
    expect(resolveLocale({ query: 'invalid', preference: 'invalid', browserLanguage })).toBe('en')
  })
  it('limits locales and produces shareable URLs', () => {
    expect(isLocale('fr')).toBe(false)
    expect(localeHref('es')).toBe('/?lang=es')
  })
})
