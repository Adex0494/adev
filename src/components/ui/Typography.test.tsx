import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Heading, Lead, Text, Label } from './Typography'

describe('Heading', () => {
  it('renders as h2 by default', () => {
    render(<Heading>Title</Heading>)
    expect(screen.getByRole('heading', { level: 2, name: 'Title' })).toBeInTheDocument()
  })

  it('renders as h1 when as="h1"', () => {
    render(<Heading as="h1">Main Title</Heading>)
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
  })

  it('renders as h3 when as="h3"', () => {
    render(<Heading as="h3">Sub Title</Heading>)
    expect(screen.getByRole('heading', { level: 3 })).toBeInTheDocument()
  })

  it('applies large text class for h1', () => {
    render(<Heading as="h1" data-testid="h">Title</Heading>)
    expect(screen.getByTestId('h')).toHaveClass('text-4xl')
  })

  it('applies medium text class for h3', () => {
    render(<Heading as="h3" data-testid="h">Title</Heading>)
    expect(screen.getByTestId('h')).toHaveClass('text-2xl')
  })

  it('applies text-foreground class', () => {
    render(<Heading data-testid="h">Title</Heading>)
    expect(screen.getByTestId('h')).toHaveClass('text-foreground')
  })

  it('accepts custom className', () => {
    render(<Heading className="custom" data-testid="h">Title</Heading>)
    expect(screen.getByTestId('h')).toHaveClass('custom')
  })
})

describe('Lead', () => {
  it('renders text', () => {
    render(<Lead>Lead paragraph</Lead>)
    expect(screen.getByText('Lead paragraph')).toBeInTheDocument()
  })

  it('applies muted text class', () => {
    render(<Lead data-testid="lead">Lead</Lead>)
    expect(screen.getByTestId('lead')).toHaveClass('text-muted')
  })

  it('applies large text size', () => {
    render(<Lead data-testid="lead">Lead</Lead>)
    expect(screen.getByTestId('lead')).toHaveClass('text-lg')
  })
})

describe('Text', () => {
  it('renders text', () => {
    render(<Text>Body paragraph</Text>)
    expect(screen.getByText('Body paragraph')).toBeInTheDocument()
  })

  it('applies foreground text class', () => {
    render(<Text data-testid="text">Body</Text>)
    expect(screen.getByTestId('text')).toHaveClass('text-foreground')
  })
})

describe('Label', () => {
  it('renders label text', () => {
    render(<Label>Category</Label>)
    expect(screen.getByText('Category')).toBeInTheDocument()
  })

  it('applies uppercase class', () => {
    render(<Label data-testid="label">Label</Label>)
    expect(screen.getByTestId('label')).toHaveClass('uppercase')
  })

  it('applies tracking-wider class', () => {
    render(<Label data-testid="label">Label</Label>)
    expect(screen.getByTestId('label')).toHaveClass('tracking-wider')
  })
})
