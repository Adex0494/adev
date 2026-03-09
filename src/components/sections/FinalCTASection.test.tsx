import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { FinalCTASection } from './FinalCTASection'

describe('FinalCTASection', () => {
  it('renders the heading', () => {
    render(<FinalCTASection />)
    expect(screen.getByRole('heading', { name: /ready to build/i })).toBeInTheDocument()
  })

  it('renders the badge', () => {
    render(<FinalCTASection />)
    expect(screen.getByText("Let's work together")).toBeInTheDocument()
  })

  it('renders the Book a Call heading', () => {
    render(<FinalCTASection />)
    expect(screen.getByText('Book a Call')).toBeInTheDocument()
  })

  it('renders the Send a Message heading', () => {
    render(<FinalCTASection />)
    expect(screen.getByText('Send a Message')).toBeInTheDocument()
  })

  it('renders the contact form', () => {
    render(<FinalCTASection />)
    expect(screen.getByRole('form', { name: /send a message/i })).toBeInTheDocument()
  })

  it('renders name field', () => {
    render(<FinalCTASection />)
    expect(screen.getByLabelText(/your name/i)).toBeInTheDocument()
  })

  it('renders email field', () => {
    render(<FinalCTASection />)
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument()
  })

  it('renders message textarea', () => {
    render(<FinalCTASection />)
    expect(screen.getByLabelText('Message')).toBeInTheDocument()
  })

  it('renders form submit button', () => {
    render(<FinalCTASection />)
    expect(screen.getByRole('button', { name: /send message/i })).toBeInTheDocument()
  })

  it('has section id=contact', () => {
    const { container } = render(<FinalCTASection />)
    expect(container.querySelector('#contact')).toBeInTheDocument()
  })

  it('renders calendly placeholder', () => {
    render(<FinalCTASection />)
    expect(screen.getByText(/calendly/i)).toBeInTheDocument()
  })
})
