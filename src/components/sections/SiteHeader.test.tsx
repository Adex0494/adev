import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ThemeProvider } from '@/components/ui'
import { SiteHeader } from './SiteHeader'

function renderWithProvider() {
  return render(
    <ThemeProvider>
      <SiteHeader />
    </ThemeProvider>,
  )
}

describe('SiteHeader', () => {
  it('renders the logo', () => {
    renderWithProvider()
    expect(screen.getByText('ADEV')).toBeInTheDocument()
  })

  it('renders the Get Started button', () => {
    renderWithProvider()
    expect(screen.getByRole('button', { name: /get started/i })).toBeInTheDocument()
  })

  it('renders 5 nav links', () => {
    renderWithProvider()
    const nav = screen.getByRole('navigation', { name: /main navigation/i })
    expect(nav.querySelectorAll('a')).toHaveLength(5)
  })

  it('renders the ThemeToggle button', () => {
    renderWithProvider()
    // ThemeToggle renders an icon-only button with aria-label
    const buttons = screen.getAllByRole('button')
    expect(buttons.length).toBeGreaterThanOrEqual(2)
  })

  it('is a sticky header', () => {
    renderWithProvider()
    const header = screen.getByRole('banner')
    expect(header).toHaveClass('sticky')
  })
})
