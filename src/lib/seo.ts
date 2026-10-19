import { t, type Locale } from '@/i18n'
import { site } from './site'

/** Shared by server metadata and the immediate client-side language switch. */
export function localeSeo(locale: Locale) {
  return {
    title: t('seo.title', locale),
    description: t('seo.description', locale),
    canonical: `${site.url}/?lang=${locale}`,
    language: locale === 'es' ? 'es_DO' : 'en_US',
    alternateLanguage: locale === 'es' ? 'en_US' : 'es_DO',
  }
}
