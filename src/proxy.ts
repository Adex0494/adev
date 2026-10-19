import { NextResponse, type NextRequest } from 'next/server'
import { LOCALE_COOKIE, resolveLocale } from '@/i18n/preferences'

// Only the marketing homepage is localized here. Never intercept the MEDIKA zone.
export function proxy(request: NextRequest) {
  const headers = new Headers(request.headers)
  const locale = resolveLocale({
    query: request.nextUrl.searchParams.get('lang'),
    preference: request.cookies.get(LOCALE_COOKIE)?.value,
    browserLanguage: request.headers.get('accept-language'),
  })
  headers.set('x-akdevia-locale', locale)
  return NextResponse.next({ request: { headers } })
}

export const config = { matcher: ['/'] }
