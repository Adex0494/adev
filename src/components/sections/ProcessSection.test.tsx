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
})
