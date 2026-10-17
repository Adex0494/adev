import { schedulingUrl, site } from './site'
it('uses the intended canonical site and public demo path', () => {
  expect(site.url).toBe('https://akdevia.com')
  expect(site.medika).toBe('/medika')
})
it('hides scheduling without a valid HTTPS Calendly event URL', () => {
  for (const value of ['', 'invalid', 'javascript:alert(1)', 'https://example.com/event', 'http://calendly.com/event', 'https://calendly.com/']) expect(schedulingUrl(value)).toBeUndefined()
  expect(schedulingUrl('https://calendly.com/configured-account/discovery')).toBe('https://calendly.com/configured-account/discovery')
})
