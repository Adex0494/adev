import { render, screen } from '@testing-library/react'
import { afterEach, vi } from 'vitest'
import { FinalCTASection } from './FinalCTASection'
import { site } from '@/lib/site'
afterEach(()=>vi.unstubAllEnvs())
describe('Contact and scheduling', () => {
  it('uses email and a truthful draft fallback when unconfigured', () => {
    vi.stubEnv('NEXT_PUBLIC_CALENDLY_URL','')
    render(<FinalCTASection />)
    expect(screen.queryByRole('link',{name:/book a call/i})).not.toBeInTheDocument()
    expect(screen.getByRole('link',{name:site.email})).toHaveAttribute('href',`mailto:${site.email}`)
    expect(screen.getByRole('button',{name:/prepare email/i})).toBeInTheDocument()
  })
  it('shows only a configured real HTTPS Calendly event', () => {
    vi.stubEnv('NEXT_PUBLIC_CALENDLY_URL','https://calendly.com/configured-account/discovery')
    render(<FinalCTASection emailConfigured />)
    expect(screen.getByRole('link',{name:/book a call/i})).toHaveAttribute('href','https://calendly.com/configured-account/discovery')
    expect(screen.getByRole('button',{name:/send request/i})).toBeInTheDocument()
  })
})
