import { t, type Locale } from '@/i18n'
import { site } from './site'

/** Shared by server metadata and the immediate client-side language switch. */
export function localeSeo(locale: Locale, pathname = '/') {
  const product = pathname === '/products/medika'
  const prefix = product ? 'products.medika.seo' : 'seo'
  return {
    title: t(`${prefix}.title`, locale),
    description: t(`${prefix}.description`, locale),
    canonical: product ? `${site.url}/products/medika` : `${site.url}/?lang=${locale}`,
    language: locale === 'es' ? 'es_DO' : 'en_US',
    alternateLanguage: locale === 'es' ? 'en_US' : 'es_DO',
  }
}
