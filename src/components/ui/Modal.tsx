'use client'

import { useEffect, useCallback, useRef, useId } from 'react'
import { createPortal } from 'react-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { cn } from '@/lib/utils'
import { t } from '@/i18n'
import {
  projectIntakeSchema,
  type ProjectIntakeFormValues,
} from '@/lib/schemas/projectIntake'

/* ─── Focusable element selector ─────────────────────────────────────────── */

const FOCUSABLE =
  'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'

/* ─── Generic Modal ──────────────────────────────────────────────────────── */

export interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  subtitle?: string
  className?: string
  children: React.ReactNode
}

export function Modal({ isOpen, onClose, title, subtitle, className, children }: ModalProps) {
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
    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
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
            aria-label={t('common.close')}
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

/* ─── Project Intake Form ────────────────────────────────────────────────── */

export interface ProjectIntakeModalProps {
  isOpen: boolean
  onClose: () => void
}

export function ProjectIntakeModal({ isOpen, onClose }: ProjectIntakeModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ProjectIntakeFormValues>({
    resolver: zodResolver(projectIntakeSchema),
    mode: 'onBlur',
  })

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) reset()
  }, [isOpen, reset])

  // Placeholder: replace with API call (data arg intentionally unused)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  function onSubmit(_data: ProjectIntakeFormValues) {}

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={t('modal.projectIntake.title')}
      subtitle={t('modal.projectIntake.subtitle')}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
        aria-label={t('modal.projectIntake.title')}
        noValidate
      >
        {/* Required fields helper */}
        <p className="text-xs text-muted">{t('form.requiredHelper')}</p>

        <div className="grid gap-4 sm:grid-cols-2">
          <FormField
            label={t('modal.projectIntake.name')}
            htmlFor="pi-name"
            required
            error={errors.name && t(errors.name.message!)}
          >
            <input
              id="pi-name"
              type="text"
              placeholder={t('modal.projectIntake.namePlaceholder')}
              className={fieldInputClass(!!errors.name)}
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? 'pi-name-error' : undefined}
              aria-required="true"
              {...register('name')}
            />
          </FormField>

          <FormField
            label={t('modal.projectIntake.email')}
            htmlFor="pi-email"
            required
            error={errors.email && t(errors.email.message!)}
          >
            <input
              id="pi-email"
              type="email"
              placeholder={t('modal.projectIntake.emailPlaceholder')}
              className={fieldInputClass(!!errors.email)}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? 'pi-email-error' : undefined}
              aria-required="true"
              {...register('email')}
            />
          </FormField>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <FormField label={t('modal.projectIntake.company')} htmlFor="pi-company">
            <input
              id="pi-company"
              type="text"
              placeholder={t('modal.projectIntake.companyPlaceholder')}
              className={fieldInputClass(false)}
              {...register('company')}
            />
          </FormField>

          <FormField
            label={t('modal.projectIntake.budget')}
            htmlFor="pi-budget"
            required
            error={errors.budget && t(errors.budget.message!)}
          >
            <select
              id="pi-budget"
              className={fieldInputClass(!!errors.budget)}
              aria-invalid={!!errors.budget}
              aria-describedby={errors.budget ? 'pi-budget-error' : undefined}
              aria-required="true"
              {...register('budget')}
            >
              <option value="">{t('modal.projectIntake.budgetPlaceholder')}</option>
              <option value="small">{t('modal.projectIntake.budgetSmall')}</option>
              <option value="medium">{t('modal.projectIntake.budgetMedium')}</option>
              <option value="large">{t('modal.projectIntake.budgetLarge')}</option>
              <option value="enterprise">{t('modal.projectIntake.budgetEnterprise')}</option>
            </select>
          </FormField>
        </div>

        <FormField
          label={t('modal.projectIntake.description')}
          htmlFor="pi-description"
          required
          error={errors.description && t(errors.description.message!)}
        >
          <textarea
            id="pi-description"
            rows={4}
            placeholder={t('modal.projectIntake.descriptionPlaceholder')}
            className={cn(fieldInputClass(!!errors.description), 'resize-none')}
            aria-invalid={!!errors.description}
            aria-describedby={errors.description ? 'pi-description-error' : undefined}
            aria-required="true"
            {...register('description')}
          />
        </FormField>

        <button type="submit" disabled={isSubmitting} className={submitClass}>
          {isSubmitting ? t('modal.projectIntake.submitting') : t('modal.projectIntake.submit')}
        </button>
      </form>
    </Modal>
  )
}

/* ─── Contact Form Modal ─────────────────────────────────────────────────── */

export interface ContactModalProps {
  isOpen: boolean
  onClose: () => void
}

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={t('modal.contact.title')}
      subtitle={t('modal.contact.subtitle')}
    >
      <form
        onSubmit={(e) => e.preventDefault()}
        className="flex flex-col gap-4"
        aria-label={t('modal.contact.title')}
        noValidate
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <FormField label={t('modal.contact.name')} htmlFor="ct-name" required>
            <input
              id="ct-name"
              type="text"
              placeholder={t('modal.contact.namePlaceholder')}
              className={fieldInputClass(false)}
              aria-required="true"
            />
          </FormField>
          <FormField label={t('modal.contact.email')} htmlFor="ct-email" required>
            <input
              id="ct-email"
              type="email"
              placeholder={t('modal.contact.emailPlaceholder')}
              className={fieldInputClass(false)}
              aria-required="true"
            />
          </FormField>
        </div>

        <FormField label={t('modal.contact.message')} htmlFor="ct-message" required>
          <textarea
            id="ct-message"
            rows={4}
            placeholder={t('modal.contact.messagePlaceholder')}
            className={cn(fieldInputClass(false), 'resize-none')}
            aria-required="true"
          />
        </FormField>

        <button type="submit" className={submitClass}>
          {t('modal.contact.submit')}
        </button>
      </form>
    </Modal>
  )
}

/* ─── FormField helper ───────────────────────────────────────────────────── */

interface FormFieldProps {
  label: string
  htmlFor: string
  required?: boolean
  error?: string
  children: React.ReactNode
}

function FormField({ label, htmlFor, required, error, children }: FormFieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={htmlFor} className="text-sm font-medium text-foreground">
        {label}
        {required && (
          <span className="ml-1 text-danger" aria-hidden="true">
            *
          </span>
        )}
      </label>
      {children}
      {error && (
        <p id={`${htmlFor}-error`} role="alert" className="text-xs text-danger">
          {error}
        </p>
      )}
    </div>
  )
}

/* ─── Shared style helpers ───────────────────────────────────────────────── */

function fieldInputClass(hasError: boolean): string {
  return cn(
    'w-full rounded-md border px-3 py-2 text-sm text-foreground bg-background',
    'placeholder:text-muted',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1',
    'transition-colors',
    hasError ? 'border-danger' : 'border-border',
  )
}

const submitClass = cn(
  'mt-2 inline-flex h-11 w-full items-center justify-center rounded-md font-medium transition-all',
  'bg-gradient-to-r from-primary to-accent text-primary-foreground',
  'hover:shadow-[0_0_24px_rgb(112_72_250/_0.4)] hover:scale-[1.01]',
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
  'disabled:pointer-events-none disabled:opacity-50',
)
