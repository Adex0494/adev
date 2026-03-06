import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { FinalCTASection } from './FinalCTASection'

describe('FinalCTASection', () => {
  it('renders the heading', () => {
    render(<FinalCTASection />)
    expect(screen.getByRole('heading', { name: /ready to build/i })).toBeInTheDocument()
  })

  it('renders the badge', () => {
    render(<FinalCTASection />)
    expect(screen.getByText("Let's work together")).toBeInTheDocument()
  })

  it('renders the primary CTA button', () => {
    render(<FinalCTASection />)
    expect(screen.getByRole('button', { name: /start a project/i })).toBeInTheDocument()
  })

  it('renders the secondary CTA button', () => {
    render(<FinalCTASection />)
    expect(screen.getByRole('button', { name: /view our work/i })).toBeInTheDocument()
  })

  it('renders 2 buttons total', () => {
    render(<FinalCTASection />)
    expect(screen.getAllByRole('button')).toHaveLength(2)
  })
})
