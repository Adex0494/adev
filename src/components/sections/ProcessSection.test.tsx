import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ProcessSection } from './ProcessSection'

describe('ProcessSection', () => {
  it('renders the section heading', () => {
    render(<ProcessSection />)
    expect(screen.getByRole('heading', { name: /proven process/i })).toBeInTheDocument()
  })

  it('renders the badge', () => {
    render(<ProcessSection />)
    expect(screen.getByText('How we work')).toBeInTheDocument()
  })

  it('renders all 4 step numbers', () => {
    render(<ProcessSection />)
    expect(screen.getByText('01')).toBeInTheDocument()
    expect(screen.getByText('02')).toBeInTheDocument()
    expect(screen.getByText('03')).toBeInTheDocument()
    expect(screen.getByText('04')).toBeInTheDocument()
  })

  it('renders all 4 step titles', () => {
    render(<ProcessSection />)
    expect(screen.getByText('Discovery')).toBeInTheDocument()
    expect(screen.getByText('Design')).toBeInTheDocument()
    expect(screen.getByText('Development')).toBeInTheDocument()
    expect(screen.getByText('Launch')).toBeInTheDocument()
  })

  it('has section id=process', () => {
    const { container } = render(<ProcessSection />)
    expect(container.querySelector('#process')).toBeInTheDocument()
  })

  it('renders horizontal connecting line with aria-hidden', () => {
    const { container } = render(<ProcessSection />)
    const line = container.querySelector('.absolute.h-px[aria-hidden="true"]')
    expect(line).toBeInTheDocument()
  })

  it('step circles have z-10 to sit above the timeline line', () => {
    const { container } = render(<ProcessSection />)
    // The step circles have relative z-10 class
    const circles = container.querySelectorAll('.rounded-full.z-10')
    expect(circles.length).toBeGreaterThanOrEqual(4)
  })

  it('step circles have bg-background for solid coverage of the line', () => {
    const { container } = render(<ProcessSection />)
    const circles = container.querySelectorAll('.rounded-full.bg-background')
    expect(circles.length).toBeGreaterThanOrEqual(4)
  })

  it('process step wrappers have z-10 to stack above the absolute line', () => {
    const { container } = render(<ProcessSection />)
    const steps = container.querySelectorAll('.group.relative.z-10')
    expect(steps.length).toBe(4)
  })

  it('step descriptions are present', () => {
    render(<ProcessSection />)
    expect(screen.getByText(/business goals/i)).toBeInTheDocument()
  })

  it('badge uses subtle variant (dark text on light bg)', () => {
    const { container } = render(<ProcessSection />)
    const badge = container.querySelector('.bg-primary\\/10')
    expect(badge).toBeInTheDocument()
    expect(badge).toHaveClass('text-primary')
  })
})
