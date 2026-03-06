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

  it('accepts custom className', () => {
    render(<Badge className="custom" data-testid="badge">Custom</Badge>)
    expect(screen.getByTestId('badge')).toHaveClass('custom')
  })

  it('forwards additional props', () => {
    render(<Badge aria-label="status badge">Status</Badge>)
    expect(screen.getByLabelText('status badge')).toBeInTheDocument()
  })
})
