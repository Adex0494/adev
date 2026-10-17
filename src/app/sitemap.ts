import type { MetadataRoute } from 'next'
import { site } from '@/lib/site'

export default function sitemap(): MetadataRoute.Sitemap {
  const languages = { en: site.url, es: `${site.url}/?lang=es` }
  return [
    { url: site.url, alternates: { languages } },
    { url: `${site.url}/?lang=es`, alternates: { languages } },
  ]
}
