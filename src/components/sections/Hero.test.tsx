import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Hero } from './Hero'

describe('Hero', () => {
  it('renders the section landmark', () => {
    render(<Hero />)
    expect(screen.getByRole('region')).toBeInTheDocument()
  })

  it('renders the h1 heading', () => {
    render(<Hero />)
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
  })

  it('heading contains expected text', () => {
    render(<Hero />)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'We build digital experiences that drive growth',
    )
  })

  it('renders the tagline badge', () => {
    render(<Hero />)
    expect(screen.getByText('Digital Agency')).toBeInTheDocument()
  })

  it('renders the subtitle', () => {
    render(<Hero />)
    expect(screen.getByText(/ADEV partners with ambitious companies/i)).toBeInTheDocument()
  })

  it('renders two CTA buttons', () => {
    render(<Hero />)
    expect(screen.getAllByRole('button')).toHaveLength(2)
  })

  it('renders the primary CTA button', () => {
    render(<Hero />)
    expect(screen.getByRole('button', { name: /see our work/i })).toBeInTheDocument()
  })

  it('renders the secondary CTA button', () => {
    render(<Hero />)
    expect(screen.getByRole('button', { name: /get in touch/i })).toBeInTheDocument()
  })

  it('section has accessible label', () => {
    render(<Hero />)
    expect(screen.getByRole('region', { name: /digital agency/i })).toBeInTheDocument()
  })
})
