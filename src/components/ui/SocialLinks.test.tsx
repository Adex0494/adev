import { render, screen } from '@testing-library/react'
import { SocialLinks } from './SocialLinks'
import { site } from '@/lib/site'
import { t } from '@/i18n'

it.each(['en', 'es'] as const)('renders four real accessible icons in %s', locale => {
  render(<SocialLinks locale={locale} />)
  for (const [name, href] of Object.entries({ github: site.github, linkedin: site.linkedin, email: `mailto:${site.email}`, website: site.url })) {
    const link = screen.getByRole('link', { name: t(`common.${name}`, locale) })
    expect(link).toHaveAttribute('href', href)
    expect(link.querySelector('svg')).toHaveAttribute('aria-hidden', 'true')
    expect(link.querySelector('svg')).toHaveAttribute('data-icon', name)
    if (name !== 'email') {
      expect(link).toHaveAttribute('target', '_blank')
      expect(link).toHaveAttribute('rel', 'noopener noreferrer')
    } else expect(link).not.toHaveAttribute('target')
  }
  expect(screen.getAllByRole('link')).toHaveLength(4)
})
