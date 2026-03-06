import en from './en.json'
import es from './es.json'

export type Locale = 'en' | 'es'

const locales: Record<Locale, typeof en> = { en, es }

const defaultLocale: Locale = 'en'

function resolve(obj: unknown, keys: string[]): string {
  let cur = obj
  for (const key of keys) {
    if (typeof cur !== 'object' || cur === null) return keys.join('.')
    cur = (cur as Record<string, unknown>)[key]
  }
  return typeof cur === 'string' ? cur : keys.join('.')
}

/**
 * Translates a dot-notation key to a string for the given locale.
 *
 * @example t('home.hero.title') => "We build digital experiences..."
 * @example t('nav.contact', 'es') => "Contacto"
 */
export function t(key: string, locale: Locale = defaultLocale): string {
  const translations = locales[locale] ?? locales[defaultLocale]
  return resolve(translations, key.split('.'))
}
