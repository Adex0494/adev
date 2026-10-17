import { headers } from 'next/headers'
import type { Locale } from './index'

export async function getLocale(): Promise<Locale> {
  return (await headers()).get('x-akdevia-locale') === 'es' ? 'es' : 'en'
}
