import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Container } from './Container'

describe('Container', () => {
  it('renders children', () => {
    render(<Container>Content</Container>)
    expect(screen.getByText('Content')).toBeInTheDocument()
  })

  it('always applies centering and padding classes', () => {
    render(<Container data-testid="c">Content</Container>)
    const el = screen.getByTestId('c')
    expect(el).toHaveClass('mx-auto', 'w-full', 'px-4')
  })

  it('applies lg max-width by default', () => {
    render(<Container data-testid="c">Content</Container>)
    expect(screen.getByTestId('c')).toHaveClass('max-w-6xl')
  })

  it('applies sm size', () => {
    render(<Container size="sm" data-testid="c">Content</Container>)
    expect(screen.getByTestId('c')).toHaveClass('max-w-2xl')
  })

  it('applies md size', () => {
    render(<Container size="md" data-testid="c">Content</Container>)
    expect(screen.getByTestId('c')).toHaveClass('max-w-4xl')
  })

  it('applies xl size', () => {
    render(<Container size="xl" data-testid="c">Content</Container>)
    expect(screen.getByTestId('c')).toHaveClass('max-w-7xl')
  })

  it('applies full size', () => {
    render(<Container size="full" data-testid="c">Content</Container>)
    expect(screen.getByTestId('c')).toHaveClass('max-w-full')
  })

  it('accepts custom className', () => {
    render(<Container className="extra" data-testid="c">Content</Container>)
    expect(screen.getByTestId('c')).toHaveClass('extra')
  })
})
