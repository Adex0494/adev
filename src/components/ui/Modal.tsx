'use client'

import { useEffect, useCallback, useRef, useId } from 'react'
import { createPortal } from 'react-dom'
import { ProjectForm } from './ProjectForm'

import { cn } from '@/lib/utils'
import { t, type Locale } from '@/i18n'


/* ─── Focusable element selector ─────────────────────────────────────────── */

const FOCUSABLE =
  'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'

/* ─── Generic Modal ──────────────────────────────────────────────────────── */

export interface ModalProps {
  locale?: Locale
  isOpen: boolean
  onClose: () => void
  title: string
  subtitle?: string
  className?: string
  children: React.ReactNode
}

export function Modal({ isOpen, onClose, title, subtitle, className, children, locale = 'en' }: ModalProps) {
  const panelRef = useRef<HTMLDivElement>(null)
  const previousFocusRef = useRef<HTMLElement | null>(null)
  const titleId = useId()

  // Save previous focus + focus first element when opened
  useEffect(() => {
    if (isOpen) {
      previousFocusRef.current = document.activeElement as HTMLElement
      const firstFocusable = panelRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE)?.[0]
      // Defer to allow portal to render
      const frame = requestAnimationFrame(() => firstFocusable?.focus())
      return () => cancelAnimationFrame(frame)
    } else {
      // Restore focus when closed
      previousFocusRef.current?.focus()
      previousFocusRef.current = null
    }
  }, [isOpen])

  const handleKeyDown = useCallback(
    (e: globalThis.KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
        return
      }

      if (e.key === 'Tab') {
        const focusable = panelRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE)
        if (!focusable || focusable.length === 0) return
        const first = focusable[0]
        const last = focusable[focusable.length - 1]

        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault()
            last.focus()
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault()
            first.focus()
          }
        }
      }
    },
    [onClose],
  )

  useEffect(() => {
    if (!isOpen) return
    const background = Array.from(document.body.children).filter((element): element is HTMLElement => element instanceof HTMLElement && !element.contains(panelRef.current))
    const previousInert = background.map(element => element.inert)
    background.forEach(element => { element.inert = true })
    const previousOverflow = document.body.style.overflow
    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = previousOverflow
      background.forEach((element, index) => { element.inert = previousInert[index] })
    }
  }, [isOpen, handleKeyDown])

  if (!isOpen) return null
  if (typeof document === 'undefined') return null

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-foreground/60 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className={cn(
          'relative z-10 w-full max-w-lg rounded-2xl border border-border bg-card shadow-2xl',
          'max-h-[90vh] overflow-y-auto',
          className,
        )}
      >
        {/* Header */}
        <div className="flex items-start justify-between border-b border-border p-6">
          <div>
            <h2 id={titleId} className="text-xl font-semibold text-foreground">
              {title}
            </h2>
            {subtitle && <p className="mt-1 text-sm text-muted">{subtitle}</p>}
          </div>
          <button
            onClick={onClose}
            aria-label={t('common.close', locale)}
            className={cn(
              'ml-4 inline-flex h-8 w-8 items-center justify-center rounded-md border border-border',
              'text-muted hover:bg-background hover:text-foreground transition-colors',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
            )}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="p-6">{children}</div>
      </div>
    </div>,
    document.body,
  )
}

export interface ProjectIntakeModalProps {
  isOpen: boolean
  onClose: () => void
  locale?: Locale
  emailConfigured?: boolean
}
export function ProjectIntakeModal({ isOpen, onClose, locale = 'en', emailConfigured = false }: ProjectIntakeModalProps) {
  return <Modal isOpen={isOpen} onClose={onClose} title={t('modal.projectIntake.title', locale)} subtitle={t('modal.projectIntake.subtitle', locale)} locale={locale}>
    <ProjectForm locale={locale} emailConfigured={emailConfigured} />
  </Modal>
}
export type ContactModalProps = ProjectIntakeModalProps
export function ContactModal(props: ContactModalProps) {
  return <ProjectIntakeModal {...props} />
}
