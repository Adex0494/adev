import { render, screen } from '@testing-library/react'
import { Hero } from './Hero'
it('keeps the legacy export connected to the functional hero', () => {
  render(<Hero />)
  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Software built around your business.')
  expect(screen.getByRole('link', { name: /view our work/i })).toHaveAttribute('href', '#work')
})
