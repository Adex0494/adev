import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { SiteFooter } from './SiteFooter'

describe('SiteFooter', () => {
  it('has the contentinfo (footer) role', () => {
    render(<SiteFooter />)
    expect(screen.getByRole('contentinfo')).toBeInTheDocument()
  })

  it('renders the logo image', () => {
    render(<SiteFooter />)
    expect(screen.getByRole('img', { name: 'ADEV' })).toBeInTheDocument()
  })

  it('renders 3 column headings', () => {
    render(<SiteFooter />)
    expect(screen.getByText('Company')).toBeInTheDocument()
    expect(screen.getByText('Services')).toBeInTheDocument()
    expect(screen.getByText('Connect')).toBeInTheDocument()
  })

  it('renders 3 social links with aria-labels', () => {
    render(<SiteFooter />)
    expect(screen.getByRole('link', { name: 'GitHub' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'LinkedIn' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Twitter' })).toBeInTheDocument()
  })

  it('renders copyright text', () => {
    render(<SiteFooter />)
    expect(screen.getByText(/© 2025 ADEV/)).toBeInTheDocument()
  })

  it('renders the tagline', () => {
    render(<SiteFooter />)
    expect(screen.getByText('Building digital experiences that matter.')).toBeInTheDocument()
  })
})
