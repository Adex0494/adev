import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ServicesSection } from './ServicesSection'

describe('ServicesSection', () => {
  it('renders the section heading', () => {
    render(<ServicesSection />)
    expect(screen.getByRole('heading', { name: /end-to-end digital services/i })).toBeInTheDocument()
  })

  it('renders the section badge', () => {
    render(<ServicesSection />)
    expect(screen.getByText('What we do')).toBeInTheDocument()
  })

  it('renders all 3 service card titles', () => {
    render(<ServicesSection />)
    expect(screen.getByText('Web Development')).toBeInTheDocument()
    expect(screen.getByText('Mobile Apps')).toBeInTheDocument()
    expect(screen.getByText('Product Design')).toBeInTheDocument()
  })

  it('renders service descriptions', () => {
    render(<ServicesSection />)
    expect(screen.getByText(/scalable web applications/i)).toBeInTheDocument()
    expect(screen.getByText(/cross-platform mobile/i)).toBeInTheDocument()
    expect(screen.getByText(/user research/i)).toBeInTheDocument()
  })
})
