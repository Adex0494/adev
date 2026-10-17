import en from './en.json'
import es from './es.json'
import { t } from './index'

function strings(value: object, prefix = ''): Record<string, string> {
  return Object.fromEntries(Object.entries(value).flatMap(([key, item]) => {
    const path = prefix ? `${prefix}.${key}` : key
    return typeof item === 'string' ? [[path, item]] : Object.entries(strings(item, path))
  }))
}
it('provides matching, nonempty English and Spanish strings', () => {
  const english = strings(en); const spanish = strings(es)
  expect(Object.keys(spanish).sort()).toEqual(Object.keys(english).sort())
  for (const [key, text] of Object.entries(english)) {
    expect(t(key, 'en')).toBe(text)
    expect(t(key, 'es')).toBe(spanish[key])
    expect(spanish[key].length).toBeGreaterThan(0)
    expect(text + spanish[key]).not.toMatch(/[a-zA-Z]\?[a-zA-Z]|�/)
  }
})
it('excludes invented products and business claims from both languages', () => {
  expect(JSON.stringify({ en, es })).not.toMatch(/HealthOS|Fintrack|Nomad Mobile|50,000|120\+|80\+|12 clinics|AI-assisted|HIPAA|Calendly calendar|Twitter|Fortune 500/i)
})
