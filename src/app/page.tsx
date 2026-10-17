import type { Metadata } from 'next'
import { SiteHeader, HeroSection, ServicesSection, FeaturedProjectsSection, MedicaHighlightSection, ProcessSection, FounderSection, FinalCTASection, SiteFooter } from '@/components/sections'
import { getLocale } from '@/i18n/server'
import { t } from '@/i18n'
import { site } from '@/lib/site'
import { ADEV_LOGO } from '@/lib/brand'

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale()
  return {
    title: t('seo.title', locale), description: t('seo.description', locale),
    alternates: { canonical: locale === 'es' ? '/?lang=es' : '/', languages: { en: '/', es: '/?lang=es', 'x-default': '/' } },
    openGraph: { type: 'website', siteName: site.name, images: [{ url: ADEV_LOGO.src, width: ADEV_LOGO.width, height: ADEV_LOGO.height, alt: 'AKDEVIA — ADEV' }], title: t('seo.title', locale), description: t('seo.description', locale), url: locale === 'es' ? '/?lang=es' : '/', locale: locale === 'es' ? 'es_DO' : 'en_US', alternateLocale: locale === 'es' ? 'en_US' : 'es_DO' },
    twitter: { card: 'summary_large_image', images: [ADEV_LOGO.src], title: t('seo.title', locale), description: t('seo.description', locale) },
  }
}
export default async function Home() {
  const locale = await getLocale()
  const emailConfigured = Boolean(process.env.RESEND_API_KEY && process.env.CONTACT_FROM_EMAIL)
  const schema = { '@context': 'https://schema.org', '@type': 'Organization', name: site.name, url: site.url, logo: `${site.url}/logo/logo.png`, email: site.email, founder: { '@type': 'Person', name: site.founder, sameAs: [site.linkedin, site.github] } }
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }} />
    <SiteHeader locale={locale} emailConfigured={emailConfigured} />
    <main id="main-content" tabIndex={-1}>
      <HeroSection locale={locale} emailConfigured={emailConfigured} />
      <ServicesSection locale={locale} />
      <FeaturedProjectsSection locale={locale} />
      <MedicaHighlightSection locale={locale} />
      <ProcessSection locale={locale} />
      <FounderSection locale={locale} />
      <FinalCTASection locale={locale} emailConfigured={emailConfigured} />
    </main>
    <SiteFooter locale={locale} />
  </>
}
