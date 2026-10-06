import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { LogoFull } from './LogoFull'

describe('LogoFull', () => {
  it('renders an image element', () => {
    render(<LogoFull />)
    expect(screen.getByRole('img')).toBeInTheDocument()
  })

  it('has correct alt text', () => {
    render(<LogoFull />)
    expect(screen.getByRole('img', { name: 'ADEV' })).toBeInTheDocument()
  })

  it('points to the full PNG logo path', () => {
    render(<LogoFull />)
    expect(screen.getByRole('img')).toHaveAttribute('src', '/logo/logo.png')
  })

  it('applies default height of 120', () => {
    render(<LogoFull />)
    expect(screen.getByRole('img')).toHaveAttribute('height', '120')
  })

  it('derives proportional width from height', () => {
    // The official image is 1536 × 1024 (3:2).
    render(<LogoFull height={60} />)
    const img = screen.getByRole('img')
    expect(img).toHaveAttribute('height', '60')
    expect(img).toHaveAttribute('width', '90')
  })

  it('applies custom className', () => {
    render(<LogoFull className="extra-class" />)
    expect(screen.getByRole('img')).toHaveClass('extra-class')
  })

  it('always includes shrink-0 class', () => {
    render(<LogoFull />)
    expect(screen.getByRole('img')).toHaveClass('shrink-0')
  })
})
