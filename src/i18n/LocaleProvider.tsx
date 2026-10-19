'use client'

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { type Locale } from './index'
import { isLocale, LOCALE_COOKIE } from './preferences'
import { localeSeo } from '@/lib/seo'

interface LocaleContextValue {
  locale: Locale
  setLocale?: (locale: Locale) => void
}

const LocaleContext = createContext<LocaleContextValue>({ locale: 'en' })

function updateMetadata(locale: Locale) {
  const seo = localeSeo(locale)
  document.documentElement.lang = locale
  document.title = seo.title
  document.querySelector<HTMLLinkElement>('link[rel="canonical"]')?.setAttribute('href', seo.canonical)
  const fields = {
    'name="description"': seo.description,
    'property="og:title"': seo.title,
    'property="og:description"': seo.description,
    'property="og:url"': seo.canonical,
    'property="og:locale"': seo.language,
    'property="og:locale:alternate"': seo.alternateLanguage,
    'name="twitter:title"': seo.title,
    'name="twitter:description"': seo.description,
  }
  for (const [selector, content] of Object.entries(fields)) {
    document.querySelector<HTMLMetaElement>(`meta[${selector}]`)?.setAttribute('content', content)
  }
}

export interface LocaleProviderProps { initialLocale: Locale; children: ReactNode }

export function LocaleProvider({ initialLocale, children }: LocaleProviderProps) {
  // The server has already resolved URL, cookie and Accept-Language: no hydration flash.
  const [locale, setLocaleState] = useState(initialLocale)

  useEffect(() => {
    const url = new URL(window.location.href)
    if (!isLocale(url.searchParams.get('lang'))) {
      url.searchParams.set('lang', initialLocale)
      window.history.replaceState(null, '', `${url.pathname}${url.search}${url.hash}`)
    }
    function restoreLanguage() {
      const value = new URL(window.location.href).searchParams.get('lang')
      setLocaleState(isLocale(value) ? value : initialLocale)
    }
    window.addEventListener('popstate', restoreLanguage)
    return () => window.removeEventListener('popstate', restoreLanguage)
  }, [initialLocale])

  useEffect(() => { updateMetadata(locale) }, [locale])

  function setLocale(next: Locale) {
    if (next === locale) return
    const url = new URL(window.location.href)
    url.searchParams.set('lang', next)
    // Native history is supported by the App Router and preserves scroll/form/theme state.
    window.history.pushState(null, '', `${url.pathname}${url.search}${url.hash}`)
    document.cookie = `${LOCALE_COOKIE}=${next}; Path=/; Max-Age=31536000; SameSite=Lax${window.location.protocol === 'https:' ? '; Secure' : ''}`
    setLocaleState(next)
  }

  return <LocaleContext.Provider value={{ locale, setLocale }}>{children}</LocaleContext.Provider>
}

/** Optional overrides keep sections independently renderable in tests and other pages. */
export function useLocale(override?: Locale) {
  const context = useContext(LocaleContext)
  return { ...context, locale: override ?? context.locale }
}
