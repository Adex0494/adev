import { z } from 'zod'
import { projectIntakeSchema } from '@/lib/schemas/projectIntake'
import { contactMessage } from '@/lib/contact'
import { site } from '@/lib/site'
import { t } from '@/i18n'

export const runtime = 'nodejs'
const schema = projectIntakeSchema.extend({ locale: z.enum(['en', 'es']).default('en') })
// Best-effort, bounded per-instance protection; no submission content is retained.
const attempts = new Map<string, { count: number; until: number }>()
const MAX_BYTES = 16384

export async function POST(request: Request) {
  const respond = (status: string, code = 200) => Response.json({ status }, { status: code, headers: { 'Cache-Control': 'no-store' } })
  const origin = request.headers.get('origin')
  if (origin && origin !== new URL(request.url).origin) return respond('error', 403)
  if (!request.headers.get('content-type')?.startsWith('application/json')) return respond('error', 415)
  if (Number(request.headers.get('content-length')) > MAX_BYTES) return respond('error', 413)
  let parsed: z.infer<typeof schema>
  try {
    const reader = request.body?.getReader()
    if (!reader) return respond('error', 400)
    const chunks: Uint8Array[] = []
    let size = 0
    while (true) {
      const { done, value } = await reader.read()
      if (done) break
      size += value.byteLength
      if (size > MAX_BYTES) { await reader.cancel(); return respond('error', 413) }
      chunks.push(value)
    }
    const result = schema.safeParse(JSON.parse(Buffer.concat(chunks).toString('utf8')))
    if (!result.success) return respond('error', 400)
    parsed = result.data
  } catch { return respond('error', 400) }
  if (parsed.website) return respond('error', 400)
  if (!process.env.RESEND_API_KEY || !process.env.CONTACT_FROM_EMAIL) return respond('fallback')
  const key = request.headers.get('x-vercel-forwarded-for') || request.headers.get('x-forwarded-for') || 'local'
  const now = Date.now()
  for (const [key, value] of attempts) if (value.until <= now) attempts.delete(key)
  if (attempts.size >= 1000 && !attempts.has(key)) return respond('error', 429)
  const entry = attempts.get(key) || { count: 0, until: now + 600000 }
  if (entry.count >= 5) return respond('error', 429)
  entry.count++
  attempts.set(key, entry)
  const id = request.headers.get('idempotency-key')
  const idempotencyKey = id && /^[\da-f-]{36}$/i.test(id) ? id : crypto.randomUUID()
  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, 'Content-Type': 'application/json', 'Idempotency-Key': idempotencyKey },
      body: JSON.stringify({ from: process.env.CONTACT_FROM_EMAIL, to: [site.email], reply_to: parsed.email, subject: `${site.name} — ${t('home.cta.sendMessage', parsed.locale)} — ${parsed.name.replace(/[\r\n]/g, ' ')}`, text: contactMessage(parsed, parsed.locale) }),
      signal: AbortSignal.timeout(10000),
    })
    if (!response.ok) return respond('error', 502)
    const body = await response.json()
    return typeof body.id === 'string' && body.id ? respond('sent') : respond('error', 502)
  } catch { return respond('error', 502) }
}
