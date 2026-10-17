import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { HeroSection } from './HeroSection'
import { t } from '@/i18n'

describe('HeroSection', () => {
  it('explains the business and links to real work', () => {
    render(<HeroSection />)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(t('home.hero.title'))
    expect(screen.getByRole('link', { name: /view our work/i })).toHaveAttribute('href', '#work')
    expect(screen.getByRole('img')).toHaveAttribute('src', '/projects/medika/medika-patients.webp')
  })
  it('opens and closes the project form', async () => {
    render(<HeroSection />)
    await userEvent.click(screen.getByRole('button', { name: /start a project/i }))
    expect(screen.getByRole('dialog')).toBeInTheDocument()
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument()
    await userEvent.click(screen.getByRole('button', { name: /close/i }))
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })
  it('localizes the modal and form together', async () => {
    render(<HeroSection locale="es" />)
    await userEvent.click(screen.getByRole('button', { name: /iniciar un proyecto/i }))
    expect(screen.getByLabelText(/correo electrónico/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /cerrar/i })).toBeInTheDocument()
  })
})
