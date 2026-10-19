import { localeSeo } from './seo'

it('keeps production canonicals and distinct localized metadata', () => {
  expect(localeSeo('en').canonical).toBe('https://akdevia.com/?lang=en')
  expect(localeSeo('es').canonical).toBe('https://akdevia.com/?lang=es')
  expect(localeSeo('en').description).not.toBe(localeSeo('es').description)
  expect(localeSeo('es').alternateLanguage).toBe('en_US')
})
