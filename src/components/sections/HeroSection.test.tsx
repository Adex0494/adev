import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { HeroSection } from './HeroSection'

// framer-motion renders motion elements as regular divs in jsdom

describe('HeroSection', () => {
  it('renders the h1 heading', () => {
    render(<HeroSection />)
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
  })

  it('renders the badge', () => {
    render(<HeroSection />)
    expect(screen.getByText('Trusted by ambitious teams')).toBeInTheDocument()
  })

  it('renders the primary CTA button', () => {
    render(<HeroSection />)
    expect(screen.getByRole('button', { name: /start a project/i })).toBeInTheDocument()
  })

  it('renders the secondary CTA button', () => {
    render(<HeroSection />)
    expect(screen.getByRole('button', { name: /get in touch/i })).toBeInTheDocument()
  })

  it('renders all 3 stat labels', () => {
    render(<HeroSection />)
    expect(screen.getByText('Projects delivered')).toBeInTheDocument()
    expect(screen.getByText('Happy clients')).toBeInTheDocument()
    expect(screen.getByText('Years of experience')).toBeInTheDocument()
  })

  it('has an aria-label on the section', () => {
    render(<HeroSection />)
    expect(screen.getByRole('region')).toBeInTheDocument()
  })

  it('opens project intake modal when "Start a Project" is clicked', async () => {
    render(<HeroSection />)
    const startBtn = screen.getByRole('button', { name: /start a project/i })
    await userEvent.click(startBtn)
    expect(screen.getByRole('dialog')).toBeInTheDocument()
  })

  it('closes modal when close button is clicked', async () => {
    render(<HeroSection />)
    await userEvent.click(screen.getByRole('button', { name: /start a project/i }))
    const closeBtn = screen.getByRole('button', { name: /close/i })
    await userEvent.click(closeBtn)
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('"Get in Touch" button does not open modal (scrolls instead)', async () => {
    // Stub scrollIntoView
    const scrollMock = vi.fn()
    document.getElementById = vi.fn((id) => {
      if (id === 'contact') return { scrollIntoView: scrollMock } as unknown as HTMLElement
      return null
    })
    render(<HeroSection />)
    await userEvent.click(screen.getByRole('button', { name: /get in touch/i }))
    // Modal should NOT open
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })
})
