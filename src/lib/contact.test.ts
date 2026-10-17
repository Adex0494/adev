import { contactMailto, contactMessage } from './contact'
it('safely encodes a complete email draft including special characters', () => {
  const values = { name: 'Example & Visitor', email: 'visitor@example.com', company: 'Example', budget: 'unsure' as const, description: 'Build an application with reports & workflows.' }
  const uri = new URL(contactMailto(values, 'es'))
  expect(uri.pathname).toBe('adex0494@gmail.com')
  expect(uri.searchParams.get('body')).toBe(contactMessage(values, 'es'))
  expect(uri.searchParams.get('subject')).toContain(values.name)
  expect(uri.searchParams.get('body')).toContain('Definámoslo juntos')
})
