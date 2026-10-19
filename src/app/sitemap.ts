import type { MetadataRoute } from 'next'
import { site } from '@/lib/site'

export default function sitemap(): MetadataRoute.Sitemap {
  const languages = { en: `${site.url}/?lang=en`, es: `${site.url}/?lang=es` }
  return [
    { url: `${site.url}/?lang=en`, alternates: { languages } },
    { url: `${site.url}/?lang=es`, alternates: { languages } },
  ]
}
