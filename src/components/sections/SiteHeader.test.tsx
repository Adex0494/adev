import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
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
  it('renders the logo image', () => {
    renderWithProvider()
    expect(screen.getByRole('img', { name: 'ADEV' })).toBeInTheDocument()
  })

  it('renders the Get Started button', () => {
    renderWithProvider()
    expect(screen.getByRole('button', { name: /get started/i })).toBeInTheDocument()
  })

  it('renders 4 nav links', () => {
    renderWithProvider()
    const nav = screen.getByRole('navigation', { name: /main navigation/i })
    expect(nav.querySelectorAll('a')).toHaveLength(4)
  })

  it('renders nav links with correct hrefs', () => {
    renderWithProvider()
    expect(screen.getByRole('link', { name: /services/i })).toHaveAttribute('href', '#services')
    expect(screen.getByRole('link', { name: /work/i })).toHaveAttribute('href', '#work')
    expect(screen.getByRole('link', { name: /process/i })).toHaveAttribute('href', '#process')
    expect(screen.getByRole('link', { name: /contact/i })).toHaveAttribute('href', '#contact')
  })

  it('renders the ThemeToggle button', () => {
    renderWithProvider()
    const buttons = screen.getAllByRole('button')
    expect(buttons.length).toBeGreaterThanOrEqual(2)
  })

  it('is a sticky header', () => {
    renderWithProvider()
    const header = screen.getByRole('banner')
    expect(header).toHaveClass('sticky')
  })

  it('opens project intake modal when Get Started is clicked', async () => {
    renderWithProvider()
    await userEvent.click(screen.getByRole('button', { name: /get started/i }))
    expect(screen.getByRole('dialog')).toBeInTheDocument()
  })

  it('closes modal when close button is clicked', async () => {
    renderWithProvider()
    await userEvent.click(screen.getByRole('button', { name: /get started/i }))
    const closeBtn = screen.getByRole('button', { name: /close/i })
    await userEvent.click(closeBtn)
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })
})
