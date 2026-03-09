import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Badge } from './Badge'

describe('Badge', () => {
  it('renders children', () => {
    render(<Badge>New</Badge>)
    expect(screen.getByText('New')).toBeInTheDocument()
  })

  it('renders as a span element', () => {
    render(<Badge data-testid="badge">Tag</Badge>)
    expect(screen.getByTestId('badge').tagName).toBe('SPAN')
  })

  it('applies default variant', () => {
    render(<Badge data-testid="badge">Default</Badge>)
    expect(screen.getByTestId('badge')).toHaveClass('bg-primary')
  })

  it('default variant uses primary-foreground (white) text for contrast', () => {
    render(<Badge data-testid="badge">Default</Badge>)
    expect(screen.getByTestId('badge')).toHaveClass('text-primary-foreground')
  })

  it('applies subtle variant with dark text on light background', () => {
    render(<Badge variant="subtle" data-testid="badge">Subtle</Badge>)
    const el = screen.getByTestId('badge')
    expect(el).toHaveClass('bg-primary/10')
    expect(el).toHaveClass('text-primary')
  })

  it('subtle variant does NOT use white text (contrast fix)', () => {
    render(<Badge variant="subtle" data-testid="badge">Subtle</Badge>)
    expect(screen.getByTestId('badge')).not.toHaveClass('text-primary-foreground')
  })

  it('applies success variant', () => {
    render(<Badge variant="success" data-testid="badge">Active</Badge>)
    expect(screen.getByTestId('badge')).toHaveClass('bg-success')
  })

  it('applies warning variant', () => {
    render(<Badge variant="warning" data-testid="badge">Pending</Badge>)
    expect(screen.getByTestId('badge')).toHaveClass('bg-warning')
  })

  it('applies danger variant', () => {
    render(<Badge variant="danger" data-testid="badge">Error</Badge>)
    expect(screen.getByTestId('badge')).toHaveClass('bg-danger')
  })

  it('applies outline variant', () => {
    render(<Badge variant="outline" data-testid="badge">Tag</Badge>)
    expect(screen.getByTestId('badge')).toHaveClass('border', 'bg-transparent')
  })

  it('outline variant uses foreground text for readability', () => {
    render(<Badge variant="outline" data-testid="badge">Tag</Badge>)
    expect(screen.getByTestId('badge')).toHaveClass('text-foreground')
  })

  it('accepts custom className', () => {
    render(<Badge className="custom" data-testid="badge">Custom</Badge>)
    expect(screen.getByTestId('badge')).toHaveClass('custom')
  })

  it('forwards additional props', () => {
    render(<Badge aria-label="status badge">Status</Badge>)
    expect(screen.getByLabelText('status badge')).toBeInTheDocument()
  })
})
