import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, vi } from 'vitest'
import { ProjectForm } from './ProjectForm'
import { site } from '@/lib/site'

afterEach(() => vi.unstubAllGlobals())
async function fill() {
  await userEvent.type(screen.getByLabelText(/your name/i), 'Example Visitor')
  await userEvent.type(screen.getByLabelText(/email address/i), 'visitor@example.com')
  await userEvent.selectOptions(screen.getByLabelText(/budget range/i), 'unsure')
  await userEvent.type(screen.getByLabelText(/project description/i), 'A useful internal business application.')
}
describe('ProjectForm', () => {
  it('validates required fields without contacting the server', async () => {
    const fetch = vi.fn(); vi.stubGlobal('fetch', fetch)
    render(<ProjectForm />)
    expect(screen.getByRole('form')).toHaveAttribute('method', 'post')
    expect(screen.getByRole('form')).toHaveAttribute('action', '/api/contact')
    await userEvent.click(screen.getByRole('button', { name: /prepare email/i }))
    expect(await screen.findByText('Name is required.')).toBeInTheDocument()
    expect(screen.getByLabelText(/your name/i)).toHaveAttribute('aria-invalid', 'true')
    expect(fetch).not.toHaveBeenCalled()
  })
  it('offers a correctly addressed draft and never claims fallback delivery', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: true, json: async () => ({ status: 'fallback' }) }))
    render(<ProjectForm />); await fill()
    await userEvent.click(screen.getByRole('button', { name: /prepare email/i }))
    const link = await screen.findByRole('link', { name: /open email draft/i })
    expect(link.getAttribute('href')).toContain(`mailto:${site.email}?subject=`)
    expect(decodeURIComponent(link.getAttribute('href')!)).toContain('visitor@example.com')
    expect(screen.getByText(/has not been sent/i)).toBeInTheDocument()
    expect(screen.queryByText(/submitted successfully/i)).not.toBeInTheDocument()
  })
  it('reports success only after server confirmation', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: true, json: async () => ({ status: 'sent' }) }))
    render(<ProjectForm emailConfigured />); await fill()
    await userEvent.click(screen.getByRole('button', { name: /send request/i }))
    expect(await screen.findByText(/submitted successfully/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/your name/i)).toHaveValue('')
  })
  it('prevents duplicate submissions and preserves an email fallback after network failure', async () => {
    let fail!: (error: Error) => void
    const fetch = vi.fn(() => new Promise((_resolve, reject) => { fail = reject }))
    vi.stubGlobal('fetch', fetch)
    render(<ProjectForm emailConfigured />); await fill()
    const submit = screen.getByRole('button', { name: /send request/i })
    await userEvent.dblClick(submit)
    expect(submit).toBeDisabled(); expect(fetch).toHaveBeenCalledTimes(1)
    fail(new Error('Network failure'))
    expect(await screen.findByRole('link', { name: /open email draft/i })).toBeInTheDocument()
    await waitFor(() => expect(submit).not.toBeDisabled())
  })
  it('translates validation messages', async () => {
    render(<ProjectForm locale="es" />)
    await userEvent.click(screen.getByRole('button', { name: /preparar correo/i }))
    expect(await screen.findByText('El nombre es obligatorio.')).toBeInTheDocument()
  })
})
