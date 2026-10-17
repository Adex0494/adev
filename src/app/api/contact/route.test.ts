// @vitest-environment node
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { POST } from './route'
import { site } from '@/lib/site'

const valid = { name: 'Example Visitor', email: 'visitor@example.com', budget: 'unsure', description: 'A useful business application.', locale: 'en' }
function request(body: unknown = valid, headers: Record<string, string> = {}) {
  return new Request('https://akdevia.com/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json', Origin: 'https://akdevia.com', ...headers }, body: JSON.stringify(body) })
}
beforeEach(() => { vi.stubEnv('RESEND_API_KEY', ''); vi.stubEnv('CONTACT_FROM_EMAIL', '') })
afterEach(() => { vi.unstubAllEnvs(); vi.unstubAllGlobals() })
describe('Marketing contact API', () => {
  it('returns a truthful fallback when no provider is configured', async () => {
    const fetch = vi.fn(); vi.stubGlobal('fetch', fetch)
    const response = await POST(request())
    expect(await response.json()).toEqual({ status: 'fallback' })
    expect(fetch).not.toHaveBeenCalled()
    expect(response.headers.get('cache-control')).toBe('no-store')
  })
  it.each([{ ...valid, name: ' ' }, { ...valid, email: 'bad' }, { ...valid, budget: 'unknown' }, { ...valid, description: 'x'.repeat(4001) }, { ...valid, website: 'spam' }])('rejects invalid data and honeypots', async body => {
    expect((await POST(request(body))).status).toBe(400)
  })
  it('rejects cross-origin, non-JSON and oversized submissions', async () => {
    expect((await POST(request(valid, { Origin: 'https://unrelated.invalid' }))).status).toBe(403)
    expect((await POST(request(valid, { 'Content-Type': 'text/plain' }))).status).toBe(415)
    expect((await POST(request({ description: 'x'.repeat(20000) }))).status).toBe(413)
  })
  it('sends only to the central recipient and uses visitor reply-to', async () => {
    vi.stubEnv('RESEND_API_KEY', 'test-only-key'); vi.stubEnv('CONTACT_FROM_EMAIL', 'AKDEVIA <sender@example.com>')
    const fetch = vi.fn().mockResolvedValue({ ok: true, json: async () => ({ id: 'mock-email-id' }) })
    vi.stubGlobal('fetch', fetch)
    expect(await (await POST(request())).json()).toEqual({ status: 'sent' })
    const [url, options] = fetch.mock.calls[0]
    expect(url).toBe('https://api.resend.com/emails')
    expect(JSON.parse(options.body)).toMatchObject({ to: [site.email], reply_to: valid.email })
    expect(JSON.parse(options.body).text).toContain(valid.description)
  })
  it('never reports success on provider failure', async () => {
    vi.stubEnv('RESEND_API_KEY', 'test-only-key'); vi.stubEnv('CONTACT_FROM_EMAIL', 'sender@example.com')
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false }))
    const response = await POST(request())
    expect(response.status).toBe(502)
    expect(await response.json()).toEqual({ status: 'error' })
  })
})
