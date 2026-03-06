import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen, fireEvent, act } from '@testing-library/react'
import { ThemeToggle } from './ThemeToggle'
import { ThemeProvider } from './ThemeProvider'

function renderWithProvider(ui: React.ReactElement) {
  return render(<ThemeProvider>{ui}</ThemeProvider>)
}

describe('ThemeToggle', () => {
  beforeEach(() => {
    localStorage.clear()
    document.documentElement.className = ''
  })

  it('renders a button', () => {
    renderWithProvider(<ThemeToggle />)
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('has an accessible aria-label', async () => {
    renderWithProvider(<ThemeToggle />)
    await act(async () => {})
    // matchMedia mock returns matches=false => system resolves to light
    expect(screen.getByRole('button')).toHaveAttribute('aria-label', 'Switch to dark mode')
  })

  it('toggles to dark mode on first click', async () => {
    renderWithProvider(<ThemeToggle />)
    await act(async () => {})
    await act(async () => {
      fireEvent.click(screen.getByRole('button'))
    })
    expect(document.documentElement).toHaveClass('dark')
  })

  it('toggles back to light mode on second click', async () => {
    renderWithProvider(<ThemeToggle />)
    await act(async () => {})
    await act(async () => { fireEvent.click(screen.getByRole('button')) }) // → dark
    await act(async () => { fireEvent.click(screen.getByRole('button')) }) // → light
    expect(document.documentElement).toHaveClass('light')
  })

  it('updates aria-label after toggle to dark', async () => {
    renderWithProvider(<ThemeToggle />)
    await act(async () => {})
    await act(async () => {
      fireEvent.click(screen.getByRole('button'))
    })
    expect(screen.getByRole('button')).toHaveAttribute('aria-label', 'Switch to light mode')
  })

  it('accepts custom className', () => {
    renderWithProvider(<ThemeToggle className="custom" />)
    expect(screen.getByRole('button')).toHaveClass('custom')
  })

  it('renders an SVG icon', () => {
    renderWithProvider(<ThemeToggle />)
    expect(screen.getByRole('button').querySelector('svg')).toBeInTheDocument()
  })
})
