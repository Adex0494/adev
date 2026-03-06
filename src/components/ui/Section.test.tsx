import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Section } from './Section'

describe('Section', () => {
  it('renders children', () => {
    render(<Section>Content</Section>)
    expect(screen.getByText('Content')).toBeInTheDocument()
  })

  it('renders as <section> by default', () => {
    render(<Section data-testid="s">Content</Section>)
    expect(screen.getByTestId('s').tagName).toBe('SECTION')
  })

  it('renders as <article> when as="article"', () => {
    render(<Section as="article" data-testid="s">Content</Section>)
    expect(screen.getByTestId('s').tagName).toBe('ARTICLE')
  })

  it('renders as <div> when as="div"', () => {
    render(<Section as="div" data-testid="s">Content</Section>)
    expect(screen.getByTestId('s').tagName).toBe('DIV')
  })

  it('renders as <main> when as="main"', () => {
    render(<Section as="main" data-testid="s">Content</Section>)
    expect(screen.getByRole('main')).toBeInTheDocument()
  })

  it('applies md spacing by default', () => {
    render(<Section data-testid="s">Content</Section>)
    expect(screen.getByTestId('s')).toHaveClass('py-16')
  })

  it('applies sm spacing', () => {
    render(<Section spacing="sm" data-testid="s">Content</Section>)
    expect(screen.getByTestId('s')).toHaveClass('py-8')
  })

  it('applies lg spacing', () => {
    render(<Section spacing="lg" data-testid="s">Content</Section>)
    expect(screen.getByTestId('s')).toHaveClass('py-24')
  })

  it('accepts custom className', () => {
    render(<Section className="custom-section" data-testid="s">Content</Section>)
    expect(screen.getByTestId('s')).toHaveClass('custom-section')
  })

  it('forwards aria attributes', () => {
    render(<Section aria-label="Services section">Content</Section>)
    expect(screen.getByRole('region', { name: 'Services section' })).toBeInTheDocument()
  })
})
