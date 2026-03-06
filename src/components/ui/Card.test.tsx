import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './Card'

describe('Card', () => {
  describe('rendering', () => {
    it('renders children', () => {
      render(<Card>Card content</Card>)
      expect(screen.getByText('Card content')).toBeInTheDocument()
    })

    it('applies default variant classes', () => {
      render(<Card data-testid="card">Content</Card>)
      expect(screen.getByTestId('card')).toHaveClass('bg-card', 'border')
    })

    it('renders as a div', () => {
      render(<Card data-testid="card">Content</Card>)
      expect(screen.getByTestId('card').tagName).toBe('DIV')
    })
  })

  describe('variants', () => {
    it('applies outlined variant', () => {
      render(<Card variant="outlined" data-testid="card">Content</Card>)
      expect(screen.getByTestId('card')).toHaveClass('border-2', 'bg-transparent')
    })

    it('applies elevated variant', () => {
      render(<Card variant="elevated" data-testid="card">Content</Card>)
      expect(screen.getByTestId('card')).toHaveClass('shadow-lg')
    })
  })

  it('accepts custom className', () => {
    render(<Card className="extra-class" data-testid="card">Content</Card>)
    expect(screen.getByTestId('card')).toHaveClass('extra-class')
  })

  it('forwards additional props', () => {
    render(<Card data-testid="card" role="article">Content</Card>)
    expect(screen.getByRole('article')).toBeInTheDocument()
  })

  describe('sub-components', () => {
    it('renders CardHeader', () => {
      render(<CardHeader data-testid="header">Header</CardHeader>)
      expect(screen.getByTestId('header')).toBeInTheDocument()
    })

    it('renders CardTitle as h3', () => {
      render(<CardTitle>My Title</CardTitle>)
      expect(screen.getByRole('heading', { level: 3, name: 'My Title' })).toBeInTheDocument()
    })

    it('renders CardDescription as a paragraph', () => {
      render(<CardDescription>Some description</CardDescription>)
      expect(screen.getByText('Some description')).toBeInTheDocument()
    })

    it('renders CardContent', () => {
      render(<CardContent data-testid="content">Body text</CardContent>)
      expect(screen.getByTestId('content')).toBeInTheDocument()
    })

    it('renders CardFooter with flex layout', () => {
      render(<CardFooter data-testid="footer">Footer</CardFooter>)
      expect(screen.getByTestId('footer')).toHaveClass('flex')
    })

    it('composes full Card correctly', () => {
      render(
        <Card>
          <CardHeader>
            <CardTitle>My Card</CardTitle>
            <CardDescription>A description</CardDescription>
          </CardHeader>
          <CardContent>Body content</CardContent>
          <CardFooter>Footer content</CardFooter>
        </Card>,
      )
      expect(screen.getByRole('heading', { name: 'My Card' })).toBeInTheDocument()
      expect(screen.getByText('A description')).toBeInTheDocument()
      expect(screen.getByText('Body content')).toBeInTheDocument()
      expect(screen.getByText('Footer content')).toBeInTheDocument()
    })
  })
})
