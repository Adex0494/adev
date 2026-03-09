import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ScrollReveal } from './ScrollReveal'

// framer-motion useInView uses IntersectionObserver — mocked in vitest.setup.ts

describe('ScrollReveal', () => {
  it('renders children', () => {
    render(<ScrollReveal>Hello world</ScrollReveal>)
    expect(screen.getByText('Hello world')).toBeInTheDocument()
  })

  it('accepts custom className', () => {
    const { container } = render(<ScrollReveal className="custom-class">Content</ScrollReveal>)
    expect(container.firstChild).toHaveClass('custom-class')
  })

  it('renders with all direction variants without error', () => {
    const directions = ['up', 'down', 'left', 'right', 'none'] as const
    directions.forEach((direction) => {
      expect(() =>
        render(<ScrollReveal direction={direction}>Child</ScrollReveal>),
      ).not.toThrow()
    })
  })

  it('renders with delay prop', () => {
    expect(() => render(<ScrollReveal delay={0.2}>Delayed</ScrollReveal>)).not.toThrow()
  })

  it('renders with once=false', () => {
    expect(() => render(<ScrollReveal once={false}>Repeated</ScrollReveal>)).not.toThrow()
  })

  it('passes children through to the DOM', () => {
    render(
      <ScrollReveal>
        <button>Click me</button>
      </ScrollReveal>,
    )
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument()
  })
})
