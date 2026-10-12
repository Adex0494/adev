import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MedicaHighlightSection } from './MedicaHighlightSection'

describe('MedicaHighlightSection', () => {
  it('renders the section heading', () => {
    render(<MedicaHighlightSection />)
    expect(screen.getByRole('heading', { name: /medica/i })).toBeInTheDocument()
  })

  it('renders the badge', () => {
    render(<MedicaHighlightSection />)
    expect(screen.getByText('Case study')).toBeInTheDocument()
  })

  it('links to the Medika zone with a document navigation', () => {
    render(<MedicaHighlightSection />)
    const link = screen.getByRole('link', { name: /view live demo/i })
    expect(link).toHaveAttribute('href', '/medika')
    expect(link).toHaveClass('from-primary')
  })

  it('renders the browser chrome frame', () => {
    render(<MedicaHighlightSection />)
    expect(screen.getByTestId('browser-frame')).toBeInTheDocument()
  })

  it('renders subheading text', () => {
    render(<MedicaHighlightSection />)
    expect(screen.getByText(/50,000\+ patients/i)).toBeInTheDocument()
  })
})
