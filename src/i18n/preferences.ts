import type { Locale } from './index'

export const LOCALE_COOKIE = 'akdevia-locale'

export function isLocale(value: unknown): value is Locale {
  return value === 'en' || value === 'es'
}

/** A shared URL is explicit; otherwise respect the saved choice before the browser. */
export function resolveLocale({ query, preference, browserLanguage }: {
  query?: string | null
  preference?: string | null
  browserLanguage?: string | null
}): Locale {
  if (isLocale(query)) return query
  if (isLocale(preference)) return preference
  const primaryLanguage = browserLanguage?.split(',')[0].split(';')[0].trim().toLowerCase()
  return primaryLanguage?.startsWith('es') ? 'es' : 'en'
}

export function localeHref(locale: Locale): string {
  return `/?lang=${locale}`
}
