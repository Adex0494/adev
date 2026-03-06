import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { FeaturedProjectsSection } from './FeaturedProjectsSection'

describe('FeaturedProjectsSection', () => {
  it('renders the section heading', () => {
    render(<FeaturedProjectsSection />)
    expect(screen.getByRole('heading', { name: /products we're proud of/i })).toBeInTheDocument()
  })

  it('renders the badge', () => {
    render(<FeaturedProjectsSection />)
    expect(screen.getByText('Featured work')).toBeInTheDocument()
  })

  it('renders 3 project articles', () => {
    render(<FeaturedProjectsSection />)
    expect(screen.getAllByRole('article')).toHaveLength(3)
  })

  it('renders the view all link', () => {
    render(<FeaturedProjectsSection />)
    expect(screen.getByText(/view all projects/i)).toBeInTheDocument()
  })

  it('renders 3 project category badges', () => {
    render(<FeaturedProjectsSection />)
    expect(screen.getByText('Web App')).toBeInTheDocument()
    expect(screen.getByText('SaaS')).toBeInTheDocument()
    expect(screen.getByText('Mobile App')).toBeInTheDocument()
  })

  it('renders 3 project titles', () => {
    render(<FeaturedProjectsSection />)
    expect(screen.getByText('HealthOS Platform')).toBeInTheDocument()
    expect(screen.getByText('Fintrack Dashboard')).toBeInTheDocument()
    expect(screen.getByText('Nomad Mobile')).toBeInTheDocument()
  })
})
