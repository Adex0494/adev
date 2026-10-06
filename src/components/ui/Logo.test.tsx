import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Logo } from './Logo'

describe('Logo', () => {
  it('renders an image element', () => {
    render(<Logo />)
    expect(screen.getByRole('img')).toBeInTheDocument()
  })

  it('has correct alt text', () => {
    render(<Logo />)
    expect(screen.getByRole('img', { name: 'ADEV' })).toBeInTheDocument()
  })

  it('points to the official PNG logo path', () => {
    render(<Logo />)
    expect(screen.getByRole('img')).toHaveAttribute('src', '/logo/logo.png')
  })

  it('applies default height of 36', () => {
    render(<Logo />)
    expect(screen.getByRole('img')).toHaveAttribute('height', '36')
  })

  it('derives proportional width from height', () => {
    // height=48 → width = Math.round(48 * 1536/1024) = Math.round(72) = 72
    render(<Logo height={48} />)
    const img = screen.getByRole('img')
    expect(img).toHaveAttribute('height', '48')
    expect(img).toHaveAttribute('width', '72')
  })

  it('applies custom className', () => {
    render(<Logo className="extra-class" />)
    expect(screen.getByRole('img')).toHaveClass('extra-class')
  })

  it('always includes shrink-0 class', () => {
    render(<Logo />)
    expect(screen.getByRole('img')).toHaveClass('shrink-0')
  })
})
