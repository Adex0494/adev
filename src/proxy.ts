import { NextResponse, type NextRequest } from 'next/server'

// Only the marketing homepage is localized here. Never intercept the MEDIKA zone.
export function proxy(request: NextRequest) {
  const headers = new Headers(request.headers)
  headers.set('x-akdevia-locale', request.nextUrl.searchParams.get('lang') === 'es' ? 'es' : 'en')
  return NextResponse.next({ request: { headers } })
}

export const config = { matcher: ['/'] }
