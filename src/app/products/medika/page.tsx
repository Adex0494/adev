import type { Metadata } from 'next'
import { SiteHeader, SiteFooter } from '@/components/sections'
import { MedikaProduct } from '@/components/products/MedikaProduct'
import { getLocale } from '@/i18n/server'
import { localeHref } from '@/i18n/preferences'
import { localeSeo } from '@/lib/seo'
import { site } from '@/lib/site'
import { t } from '@/i18n'

const path = '/products/medika'

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale()
  const seo = localeSeo(locale, path)
  const image = { url: '/projects/medika/medika-patient-history.webp', width: 1440, height: 900, alt: t('products.medika.history.alt', locale) }
  return {
    title: seo.title, description: seo.description,
    alternates: { canonical: seo.canonical, languages: { en: localeHref('en', path), es: localeHref('es', path), 'x-default': path } },
    openGraph: { type: 'website', siteName: site.name, title: seo.title, description: seo.description, url: seo.canonical, locale: seo.language, alternateLocale: seo.alternateLanguage, images: [image] },
    twitter: { card: 'summary_large_image', title: seo.title, description: seo.description, images: [{ url: image.url, alt: image.alt }] },
  }
}

export default function MedikaPage() {
  const emailConfigured = Boolean(process.env.RESEND_API_KEY && process.env.CONTACT_FROM_EMAIL)
  return <><SiteHeader emailConfigured={emailConfigured} /><main id="main-content" tabIndex={-1}><MedikaProduct /></main><SiteFooter /></>
}
