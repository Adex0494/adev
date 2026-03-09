import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Modal, ProjectIntakeModal, ContactModal } from './Modal'

function renderModal(props?: Partial<Parameters<typeof Modal>[0]>) {
  const onClose = vi.fn()
  render(
    <Modal isOpen={true} onClose={onClose} title="Test Modal" {...props}>
      <p>Modal content</p>
    </Modal>,
  )
  return { onClose }
}

/* ─── Modal (generic) ────────────────────────────────────────────────────── */

describe('Modal', () => {
  it('renders children when open', () => {
    renderModal()
    expect(screen.getByText('Modal content')).toBeInTheDocument()
  })

  it('renders title', () => {
    renderModal({ title: 'My Title' })
    expect(screen.getByText('My Title')).toBeInTheDocument()
  })

  it('renders subtitle when provided', () => {
    renderModal({ subtitle: 'A subtitle' })
    expect(screen.getByText('A subtitle')).toBeInTheDocument()
  })

  it('does not render when closed', () => {
    render(
      <Modal isOpen={false} onClose={vi.fn()} title="Hidden">
        <p>Hidden content</p>
      </Modal>,
    )
    expect(screen.queryByText('Hidden content')).not.toBeInTheDocument()
  })

  it('has role="dialog"', () => {
    renderModal()
    expect(screen.getByRole('dialog')).toBeInTheDocument()
  })

  it('has aria-modal="true"', () => {
    renderModal()
    expect(screen.getByRole('dialog')).toHaveAttribute('aria-modal', 'true')
  })

  it('has aria-labelledby pointing to the title h2', () => {
    renderModal({ title: 'Labelled Modal' })
    const dialog = screen.getByRole('dialog')
    const labelledById = dialog.getAttribute('aria-labelledby')
    expect(labelledById).toBeTruthy()
    const heading = document.getElementById(labelledById!)
    expect(heading).toBeInTheDocument()
    expect(heading?.textContent).toBe('Labelled Modal')
  })

  it('calls onClose when close button is clicked', async () => {
    const { onClose } = renderModal()
    await userEvent.click(screen.getByRole('button', { name: /close/i }))
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('calls onClose when backdrop is clicked', () => {
    const { onClose } = renderModal()
    const backdrop = document.querySelector('[aria-hidden="true"]')
    if (backdrop) fireEvent.click(backdrop)
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('calls onClose on Escape key', () => {
    const { onClose } = renderModal()
    fireEvent.keyDown(document, { key: 'Escape' })
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('close button has an accessible aria-label', () => {
    renderModal()
    expect(screen.getByRole('button', { name: /close/i })).toBeInTheDocument()
  })

  it('accepts custom className on panel', () => {
    renderModal({ className: 'custom-class' })
    expect(screen.getByRole('dialog')).toHaveClass('custom-class')
  })
})

/* ─── ProjectIntakeModal ─────────────────────────────────────────────────── */

describe('ProjectIntakeModal', () => {
  function renderProjectIntakeModal(isOpen = true) {
    const onClose = vi.fn()
    render(<ProjectIntakeModal isOpen={isOpen} onClose={onClose} />)
    return { onClose }
  }

  it('renders project intake form when open', () => {
    renderProjectIntakeModal()
    expect(screen.getByRole('form', { name: /start a project/i })).toBeInTheDocument()
  })

  it('renders name field', () => {
    renderProjectIntakeModal()
    expect(screen.getByLabelText(/your name/i)).toBeInTheDocument()
  })

  it('renders email field', () => {
    renderProjectIntakeModal()
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument()
  })

  it('renders company field', () => {
    renderProjectIntakeModal()
    expect(screen.getByLabelText(/company/i)).toBeInTheDocument()
  })

  it('renders budget select', () => {
    renderProjectIntakeModal()
    expect(screen.getByLabelText(/budget range/i)).toBeInTheDocument()
  })

  it('renders project description textarea', () => {
    renderProjectIntakeModal()
    expect(screen.getByLabelText(/project description/i)).toBeInTheDocument()
  })

  it('renders submit button', () => {
    renderProjectIntakeModal()
    expect(screen.getByRole('button', { name: /send request/i })).toBeInTheDocument()
  })

  it('does not render when closed', () => {
    renderProjectIntakeModal(false)
    expect(screen.queryByRole('form')).not.toBeInTheDocument()
  })

  it('budget select has options', () => {
    renderProjectIntakeModal()
    const select = screen.getByLabelText(/budget range/i) as HTMLSelectElement
    expect(select.options.length).toBeGreaterThan(1)
  })

  // ── Required field indicators ──────────────────────────────────────────

  it('shows required helper text', () => {
    renderProjectIntakeModal()
    expect(screen.getByText(/fields marked with an asterisk/i)).toBeInTheDocument()
  })

  it('shows asterisk indicator on required name field', () => {
    renderProjectIntakeModal()
    const nameLabel = screen.getByText(/your name/i).closest('label')
    expect(nameLabel?.textContent).toContain('*')
  })

  it('shows asterisk indicator on required email field', () => {
    renderProjectIntakeModal()
    const emailLabel = screen.getByText(/email address/i).closest('label')
    expect(emailLabel?.textContent).toContain('*')
  })

  it('shows asterisk on required budget field', () => {
    renderProjectIntakeModal()
    const budgetLabel = screen.getByText(/budget range/i).closest('label')
    expect(budgetLabel?.textContent).toContain('*')
  })

  it('shows asterisk on required description field', () => {
    renderProjectIntakeModal()
    const descLabel = screen.getByText(/project description/i).closest('label')
    expect(descLabel?.textContent).toContain('*')
  })

  it('company field does NOT show asterisk (optional)', () => {
    renderProjectIntakeModal()
    const companyLabel = screen.getByText(/company/i).closest('label')
    expect(companyLabel?.textContent).not.toContain('*')
  })

  // ── aria attributes ────────────────────────────────────────────────────

  it('name input has aria-required', () => {
    renderProjectIntakeModal()
    expect(screen.getByLabelText(/your name/i)).toHaveAttribute('aria-required', 'true')
  })

  it('email input has aria-required', () => {
    renderProjectIntakeModal()
    expect(screen.getByLabelText(/email address/i)).toHaveAttribute('aria-required', 'true')
  })

  it('name input does NOT have aria-invalid when pristine', () => {
    renderProjectIntakeModal()
    expect(screen.getByLabelText(/your name/i)).toHaveAttribute('aria-invalid', 'false')
  })

  // ── Validation errors on submit ────────────────────────────────────────

  it('shows name required error after empty submit', async () => {
    renderProjectIntakeModal()
    await userEvent.click(screen.getByRole('button', { name: /send request/i }))
    expect(await screen.findByText('Name is required.')).toBeInTheDocument()
  })

  it('shows email required error after empty submit', async () => {
    renderProjectIntakeModal()
    await userEvent.click(screen.getByRole('button', { name: /send request/i }))
    expect(await screen.findByText('Email address is required.')).toBeInTheDocument()
  })

  it('shows budget required error after empty submit', async () => {
    renderProjectIntakeModal()
    await userEvent.click(screen.getByRole('button', { name: /send request/i }))
    expect(await screen.findByText('Please select a budget range.')).toBeInTheDocument()
  })

  it('shows description required error after empty submit', async () => {
    renderProjectIntakeModal()
    await userEvent.click(screen.getByRole('button', { name: /send request/i }))
    expect(await screen.findByText('Project description is required.')).toBeInTheDocument()
  })

  it('shows email invalid error for bad email format', async () => {
    renderProjectIntakeModal()
    const emailInput = screen.getByLabelText(/email address/i)
    await userEvent.type(emailInput, 'notanemail')
    await userEvent.tab() // trigger onBlur
    expect(await screen.findByText('Please enter a valid email address.')).toBeInTheDocument()
  })

  it('shows name min-length error for 1-char name on blur', async () => {
    renderProjectIntakeModal()
    const nameInput = screen.getByLabelText(/your name/i)
    await userEvent.type(nameInput, 'A')
    await userEvent.tab()
    expect(await screen.findByText('Name must be at least 2 characters.')).toBeInTheDocument()
  })

  it('shows description min-length error for short description on blur', async () => {
    renderProjectIntakeModal()
    const descInput = screen.getByLabelText(/project description/i)
    await userEvent.type(descInput, 'Too short')
    await userEvent.tab()
    expect(await screen.findByText('Description must be at least 10 characters.')).toBeInTheDocument()
  })

  it('error messages have role="alert"', async () => {
    renderProjectIntakeModal()
    await userEvent.click(screen.getByRole('button', { name: /send request/i }))
    const alerts = await screen.findAllByRole('alert')
    expect(alerts.length).toBeGreaterThan(0)
  })

  it('name input gets aria-invalid=true after error', async () => {
    renderProjectIntakeModal()
    await userEvent.click(screen.getByRole('button', { name: /send request/i }))
    await screen.findByText('Name is required.')
    expect(screen.getByLabelText(/your name/i)).toHaveAttribute('aria-invalid', 'true')
  })

  it('name input gets aria-describedby pointing to error message', async () => {
    renderProjectIntakeModal()
    await userEvent.click(screen.getByRole('button', { name: /send request/i }))
    await screen.findByText('Name is required.')
    const nameInput = screen.getByLabelText(/your name/i)
    const describedById = nameInput.getAttribute('aria-describedby')
    expect(describedById).toBeTruthy()
    expect(document.getElementById(describedById!)).toBeInTheDocument()
  })

  it('does not show error for valid name', async () => {
    renderProjectIntakeModal()
    const nameInput = screen.getByLabelText(/your name/i)
    await userEvent.type(nameInput, 'Jane Smith')
    await userEvent.tab()
    await waitFor(() => {
      expect(screen.queryByText('Name is required.')).not.toBeInTheDocument()
      expect(screen.queryByText('Name must be at least 2 characters.')).not.toBeInTheDocument()
    })
  })
})

/* ─── ContactModal ───────────────────────────────────────────────────────── */

describe('ContactModal', () => {
  function renderContactModal(isOpen = true) {
    const onClose = vi.fn()
    render(<ContactModal isOpen={isOpen} onClose={onClose} />)
    return { onClose }
  }

  it('renders contact form when open', () => {
    renderContactModal()
    expect(screen.getByRole('form', { name: /get in touch/i })).toBeInTheDocument()
  })

  it('renders name field', () => {
    renderContactModal()
    expect(screen.getByLabelText(/your name/i)).toBeInTheDocument()
  })

  it('renders email field', () => {
    renderContactModal()
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument()
  })

  it('renders message textarea', () => {
    renderContactModal()
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument()
  })

  it('renders submit button', () => {
    renderContactModal()
    expect(screen.getByRole('button', { name: /send message/i })).toBeInTheDocument()
  })

  it('does not render when closed', () => {
    renderContactModal(false)
    expect(screen.queryByRole('form')).not.toBeInTheDocument()
  })

  it('required fields have aria-required', () => {
    renderContactModal()
    expect(screen.getByLabelText(/your name/i)).toHaveAttribute('aria-required', 'true')
    expect(screen.getByLabelText(/email address/i)).toHaveAttribute('aria-required', 'true')
    expect(screen.getByLabelText(/message/i)).toHaveAttribute('aria-required', 'true')
  })

  it('dialog has aria-labelledby referencing visible title', () => {
    renderContactModal()
    const dialog = screen.getByRole('dialog')
    const labelId = dialog.getAttribute('aria-labelledby')
    expect(labelId).toBeTruthy()
    expect(document.getElementById(labelId!)).toBeInTheDocument()
  })
})
