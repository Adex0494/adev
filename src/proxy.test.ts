// @vitest-environment node
import { NextRequest } from 'next/server'
import { config, proxy } from './proxy'

it('resolves direct loads on the server without intercepting MEDIKA', () => {
  const request = new NextRequest('https://akdevia.com/', { headers: { 'accept-language': 'es-DO' } })
  expect(proxy(request).headers.get('x-middleware-request-x-akdevia-locale')).toBe('es')
  expect(config.matcher).toEqual(['/'])
})
it('honors a saved choice before browser language, and a URL before that choice', () => {
  const headers = { cookie: 'akdevia-locale=en', 'accept-language': 'es-DO' }
  expect(proxy(new NextRequest('https://akdevia.com/', { headers })).headers.get('x-middleware-request-x-akdevia-locale')).toBe('en')
  expect(proxy(new NextRequest('https://akdevia.com/?lang=es', { headers })).headers.get('x-middleware-request-x-akdevia-locale')).toBe('es')
})
