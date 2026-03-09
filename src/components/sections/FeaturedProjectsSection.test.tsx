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

  it('renders project titles', () => {
    render(<FeaturedProjectsSection />)
    expect(screen.getByText('HealthOS Platform')).toBeInTheDocument()
    expect(screen.getByText('Fintrack Dashboard')).toBeInTheDocument()
    expect(screen.getByText('Nomad Mobile')).toBeInTheDocument()
  })

  it('has section id=work', () => {
    const { container } = render(<FeaturedProjectsSection />)
    expect(container.querySelector('#work')).toBeInTheDocument()
  })

  it('project articles have hover elevation class', () => {
    const { container } = render(<FeaturedProjectsSection />)
    const articles = container.querySelectorAll('article')
    articles.forEach((article) => {
      expect(article.className).toContain('hover:-translate-y-2')
    })
  })

  it('image containers have overflow-hidden for zoom effect', () => {
    const { container } = render(<FeaturedProjectsSection />)
    const imageContainers = container.querySelectorAll('.overflow-hidden.aspect-video')
    expect(imageContainers.length).toBe(3)
  })
})
