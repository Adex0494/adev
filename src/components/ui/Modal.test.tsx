import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Modal } from './Modal'

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
