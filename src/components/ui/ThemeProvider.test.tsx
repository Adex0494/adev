import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, act } from '@testing-library/react'
import { ThemeProvider, useTheme } from './ThemeProvider'

function TestConsumer() {
  const { theme, resolvedTheme, setTheme } = useTheme()
  return (
    <div>
      <span data-testid="theme">{theme}</span>
      <span data-testid="resolved">{resolvedTheme}</span>
      <button onClick={() => setTheme('dark')}>Set Dark</button>
      <button onClick={() => setTheme('light')}>Set Light</button>
      <button onClick={() => setTheme('system')}>Set System</button>
    </div>
  )
}

describe('ThemeProvider', () => {
  beforeEach(() => {
    localStorage.clear()
    document.documentElement.className = ''
  })

  it('provides theme context to children', () => {
    render(
      <ThemeProvider>
        <TestConsumer />
      </ThemeProvider>,
    )
    expect(screen.getByTestId('theme')).toBeInTheDocument()
  })

  it('defaults to system theme', () => {
    render(
      <ThemeProvider>
        <TestConsumer />
      </ThemeProvider>,
    )
    expect(screen.getByTestId('theme')).toHaveTextContent('system')
  })

  it('applies a theme class to <html> after mount', async () => {
    render(
      <ThemeProvider>
        <TestConsumer />
      </ThemeProvider>,
    )
    await act(async () => {})
    const hasThemeClass =
      document.documentElement.classList.contains('light') ||
      document.documentElement.classList.contains('dark')
    expect(hasThemeClass).toBe(true)
  })

  it('applies dark class when setTheme("dark") is called', async () => {
    render(
      <ThemeProvider>
        <TestConsumer />
      </ThemeProvider>,
    )
    await act(async () => {
      screen.getByText('Set Dark').click()
    })
    expect(document.documentElement).toHaveClass('dark')
    expect(document.documentElement).not.toHaveClass('light')
  })

  it('applies light class when setTheme("light") is called', async () => {
    render(
      <ThemeProvider>
        <TestConsumer />
      </ThemeProvider>,
    )
    await act(async () => {
      screen.getByText('Set Light').click()
    })
    expect(document.documentElement).toHaveClass('light')
    expect(document.documentElement).not.toHaveClass('dark')
  })

  it('persists theme choice to localStorage', async () => {
    render(
      <ThemeProvider>
        <TestConsumer />
      </ThemeProvider>,
    )
    await act(async () => {
      screen.getByText('Set Dark').click()
    })
    expect(localStorage.getItem('adev-theme')).toBe('dark')
  })

  it('restores theme from localStorage on mount', async () => {
    localStorage.setItem('adev-theme', 'dark')
    render(
      <ThemeProvider>
        <TestConsumer />
      </ThemeProvider>,
    )
    await act(async () => {})
    expect(screen.getByTestId('theme')).toHaveTextContent('dark')
  })

  it('ignores invalid localStorage values', async () => {
    localStorage.setItem('adev-theme', 'invalid-theme')
    render(
      <ThemeProvider>
        <TestConsumer />
      </ThemeProvider>,
    )
    await act(async () => {})
    expect(screen.getByTestId('theme')).toHaveTextContent('system')
  })

  it('throws when useTheme is used outside ThemeProvider', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {})
    expect(() => render(<TestConsumer />)).toThrow('useTheme must be used inside <ThemeProvider>')
    spy.mockRestore()
  })
})
