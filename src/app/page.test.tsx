import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import Home from './page'
import { ThemeProvider } from '@/components/ui/ThemeProvider'

vi.mock('@/i18n/server', () => ({ getLocale: async () => 'en' }))

it('keeps the homepage company-focused with one intentional product summary', async () => {
  const { container } = render(<ThemeProvider>{await Home()}</ThemeProvider>)
  expect([...container.querySelectorAll('main > section')].map(section => section.id)).toEqual(['hero', 'services', 'work', 'about', 'process', 'contact'])
  expect(screen.getByRole('link', { name: 'Explore MEDIKA' })).toHaveAttribute('href', '/products/medika?lang=en')
  expect(screen.getByRole('link', { name: /launch live demo/i })).toHaveAttribute('href', '/medika')
  expect(container.querySelectorAll('main img[src*="/projects/medika/"]')).toHaveLength(1)
  expect(screen.queryByText(/the challenge|a closer look at medika|our core technologies/i)).not.toBeInTheDocument()
  expect(container.querySelector('main')?.textContent).not.toMatch(/React|TypeScript|Next\.js|Supabase|PostgreSQL|Tailwind|Vercel/)
})
