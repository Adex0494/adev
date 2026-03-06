import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { Button } from './Button'

describe('Button', () => {
  describe('rendering', () => {
    it('renders children', () => {
      render(<Button>Click me</Button>)
      expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument()
    })

    it('renders with primary variant by default', () => {
      render(<Button data-testid="btn">Default</Button>)
      expect(screen.getByTestId('btn')).toHaveClass('bg-primary')
    })

    it('renders with md size by default', () => {
      render(<Button data-testid="btn">Default</Button>)
      expect(screen.getByTestId('btn')).toHaveClass('h-10')
    })
  })

  describe('variants', () => {
    it('applies secondary variant', () => {
      render(<Button variant="secondary" data-testid="btn">Secondary</Button>)
      expect(screen.getByTestId('btn')).toHaveClass('bg-card')
    })

    it('applies ghost variant', () => {
      render(<Button variant="ghost" data-testid="btn">Ghost</Button>)
      expect(screen.getByTestId('btn')).toHaveClass('text-foreground')
    })

    it('applies outline variant', () => {
      render(<Button variant="outline" data-testid="btn">Outline</Button>)
      expect(screen.getByTestId('btn')).toHaveClass('border-primary')
    })

    it('applies danger variant', () => {
      render(<Button variant="danger" data-testid="btn">Danger</Button>)
      expect(screen.getByTestId('btn')).toHaveClass('bg-danger')
    })

    it('applies primaryGradient variant', () => {
      render(<Button variant="primaryGradient" data-testid="btn">Gradient</Button>)
      expect(screen.getByTestId('btn')).toHaveClass('from-primary', 'to-accent')
    })
  })

  describe('sizes', () => {
    it('applies sm size', () => {
      render(<Button size="sm" data-testid="btn">Small</Button>)
      expect(screen.getByTestId('btn')).toHaveClass('h-8')
    })

    it('applies md size', () => {
      render(<Button size="md" data-testid="btn">Medium</Button>)
      expect(screen.getByTestId('btn')).toHaveClass('h-10')
    })

    it('applies lg size', () => {
      render(<Button size="lg" data-testid="btn">Large</Button>)
      expect(screen.getByTestId('btn')).toHaveClass('h-12')
    })
  })

  describe('interactions', () => {
    it('calls onClick when clicked', () => {
      const onClick = vi.fn()
      render(<Button onClick={onClick}>Click</Button>)
      fireEvent.click(screen.getByRole('button'))
      expect(onClick).toHaveBeenCalledTimes(1)
    })

    it('does not call onClick when disabled', () => {
      const onClick = vi.fn()
      render(<Button disabled onClick={onClick}>Click</Button>)
      fireEvent.click(screen.getByRole('button'))
      expect(onClick).not.toHaveBeenCalled()
    })

    it('does not call onClick when loading', () => {
      const onClick = vi.fn()
      render(<Button isLoading onClick={onClick}>Click</Button>)
      fireEvent.click(screen.getByRole('button'))
      expect(onClick).not.toHaveBeenCalled()
    })
  })

  describe('disabled state', () => {
    it('is disabled when disabled prop is passed', () => {
      render(<Button disabled>Disabled</Button>)
      expect(screen.getByRole('button')).toBeDisabled()
    })

    it('has aria-disabled="true" when disabled', () => {
      render(<Button disabled>Disabled</Button>)
      expect(screen.getByRole('button')).toHaveAttribute('aria-disabled', 'true')
    })
  })

  describe('loading state', () => {
    it('is disabled when isLoading is true', () => {
      render(<Button isLoading>Loading</Button>)
      expect(screen.getByRole('button')).toBeDisabled()
    })

    it('has aria-busy="true" when isLoading', () => {
      render(<Button isLoading>Loading</Button>)
      expect(screen.getByRole('button')).toHaveAttribute('aria-busy', 'true')
    })

    it('renders a spinner when isLoading', () => {
      render(<Button isLoading>Loading</Button>)
      expect(screen.getByRole('button').querySelector('[aria-hidden="true"]')).toBeInTheDocument()
    })
  })

  describe('accessibility', () => {
    it('has a button role', () => {
      render(<Button>Action</Button>)
      expect(screen.getByRole('button')).toBeInTheDocument()
    })

    it('accepts custom className', () => {
      render(<Button className="custom-class">Custom</Button>)
      expect(screen.getByRole('button')).toHaveClass('custom-class')
    })

    it('forwards additional HTML attributes', () => {
      render(<Button data-testid="btn" type="submit">Submit</Button>)
      expect(screen.getByTestId('btn')).toHaveAttribute('type', 'submit')
    })

    it('forwards ref', () => {
      const ref = { current: null } as React.RefObject<HTMLButtonElement>
      render(<Button ref={ref}>Ref</Button>)
      expect(ref.current).toBeInstanceOf(HTMLButtonElement)
    })
  })
})
