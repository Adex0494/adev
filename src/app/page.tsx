import type { Metadata } from 'next'
import { SiteHeader, HeroSection, ServicesSection, FeaturedProjectsSection, MedicaHighlightSection, ProcessSection, FounderSection, FinalCTASection, SiteFooter } from '@/components/sections'
import { getLocale } from '@/i18n/server'
import { t } from '@/i18n'
import { site } from '@/lib/site'
import { ADEV_LOGO } from '@/lib/brand'
import { localeSeo } from '@/lib/seo'
import { localeHref } from '@/i18n/preferences'

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale()
  const seo = localeSeo(locale)
  return {
    title: seo.title, description: seo.description,
    alternates: { canonical: seo.canonical, languages: { en: localeHref('en'), es: localeHref('es'), 'x-default': '/' } },
    openGraph: { type: 'website', siteName: site.name, images: [{ url: ADEV_LOGO.src, width: ADEV_LOGO.width, height: ADEV_LOGO.height, alt: 'AKDEVIA — ADEV' }], title: seo.title, description: seo.description, url: seo.canonical, locale: seo.language, alternateLocale: seo.alternateLanguage },
    twitter: { card: 'summary_large_image', images: [ADEV_LOGO.src], title: seo.title, description: seo.description },
  }
}
export default async function Home() {
  const locale = await getLocale()
  const emailConfigured = Boolean(process.env.RESEND_API_KEY && process.env.CONTACT_FROM_EMAIL)
  const schema = { '@context': 'https://schema.org', '@type': 'Organization', name: site.name, url: site.url, logo: `${site.url}/logo/logo.png`, email: site.email, founder: { '@type': 'Person', name: site.founder, jobTitle: t('home.founder.role', locale), image: `${site.url}${site.portrait.src}`, sameAs: [site.linkedin, site.github] } }
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }} />
    <SiteHeader emailConfigured={emailConfigured} />
    <main id="main-content" tabIndex={-1}>
      <HeroSection emailConfigured={emailConfigured} />
      <ServicesSection />
      <FeaturedProjectsSection />
      <MedicaHighlightSection />
      <ProcessSection />
      <FounderSection />
      <FinalCTASection emailConfigured={emailConfigured} />
    </main>
    <SiteFooter />
  </>
}
