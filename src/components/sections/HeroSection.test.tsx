import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { HeroSection } from './HeroSection'

describe('HeroSection', () => {
  it('renders the h1 heading', () => {
    render(<HeroSection />)
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
  })

  it('renders the badge', () => {
    render(<HeroSection />)
    expect(screen.getByText('Trusted by ambitious teams')).toBeInTheDocument()
  })

  it('renders the primary CTA button', () => {
    render(<HeroSection />)
    expect(screen.getByRole('button', { name: /start a project/i })).toBeInTheDocument()
  })

  it('renders the secondary CTA button', () => {
    render(<HeroSection />)
    expect(screen.getByRole('button', { name: /get in touch/i })).toBeInTheDocument()
  })

  it('renders all 3 stat labels', () => {
    render(<HeroSection />)
    expect(screen.getByText('Projects delivered')).toBeInTheDocument()
    expect(screen.getByText('Happy clients')).toBeInTheDocument()
    expect(screen.getByText('Years of experience')).toBeInTheDocument()
  })

  it('has an aria-label on the section', () => {
    render(<HeroSection />)
    expect(screen.getByRole('region')).toBeInTheDocument()
  })
})
