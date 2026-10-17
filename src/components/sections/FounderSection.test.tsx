import { render, screen } from '@testing-library/react'
import { FounderSection } from './FounderSection'
import { site } from '@/lib/site'
it('identifies the founder and links to both real profiles', () => {
  render(<FounderSection />)
  expect(screen.getByText(site.founder)).toBeInTheDocument()
  expect(screen.getByRole('link', { name: /github profile/i })).toHaveAttribute('href', site.github)
  expect(screen.getByRole('link', { name: /linkedin profile/i })).toHaveAttribute('href', site.linkedin)
})
