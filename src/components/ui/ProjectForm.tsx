'use client'

import { useId, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { t, type Locale } from '@/i18n'
import { useLocale } from '@/i18n/LocaleProvider'
import { projectIntakeSchema, type ProjectIntakeFormValues } from '@/lib/schemas/projectIntake'
import { contactMailto } from '@/lib/contact'
import { site } from '@/lib/site'
import { Button } from './Button'

export interface ProjectFormProps { locale?: Locale; emailConfigured?: boolean; className?: string }

export function ProjectForm({ locale: override, emailConfigured = false, className }: ProjectFormProps) {
  const { locale } = useLocale(override)
  const id = useId()
  const lock = useRef(false)
  const requestId = useRef('')
  const [status, setStatus] = useState<'idle' | 'sent' | 'fallback' | 'error'>('idle')
  const [draft, setDraft] = useState('')
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<ProjectIntakeFormValues>({ resolver: zodResolver(projectIntakeSchema), mode: 'onBlur' })
  const text = (key: string) => t(key, locale)
  const label = (key: string) => text(`modal.projectIntake.${key}`)

  async function submit(values: ProjectIntakeFormValues) {
    if (lock.current) return
    lock.current = true
    setStatus('idle')
    setDraft(contactMailto(values, locale))
    requestId.current ||= crypto.randomUUID()
    try {
      const response = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json', 'Idempotency-Key': requestId.current }, body: JSON.stringify({ ...values, locale }), signal: AbortSignal.timeout(15000) })
      const data = await response.json()
      if (response.ok && data.status === 'sent') { setStatus('sent'); setDraft(''); reset(); requestId.current = '' }
      else if (data.status === 'fallback') setStatus('fallback')
      else setStatus('error')
    } catch { setStatus('error') }
    finally { lock.current = false }
  }

  const fields = ['name', 'email', 'company', 'budget', 'description'] as const
  return <form method="post" action="/api/contact" onSubmit={event => { void handleSubmit(submit)(event) }} onChange={() => { requestId.current = ''; setStatus('idle'); setDraft('') }} noValidate aria-label={label('title')} className={className}>
    <noscript><p className="mb-4 text-sm">{text('form.noScript')} <a href={`mailto:${site.email}`} className="underline">{site.email}</a></p></noscript>
    <p className="mb-4 text-xs text-muted">{text('form.requiredHelper')}</p>
    {!emailConfigured && <p className="mb-5 rounded-lg border border-border bg-background-secondary p-3 text-sm leading-relaxed text-muted">{text('form.unconfigured')}</p>}
    <div className="grid gap-5 sm:grid-cols-2">
      {fields.map(field => {
        const fieldId = `${id}-${field}`
        const props = { id: fieldId, required: field !== 'company', disabled: isSubmitting, 'aria-invalid': !!errors[field], 'aria-describedby': errors[field] ? `${fieldId}-error` : undefined, 'aria-required': field !== 'company', className: 'form-input', ...register(field) }
        return <div key={field} className={field === 'description' || field === 'budget' ? 'sm:col-span-2' : ''}>
          <label htmlFor={fieldId} className="mb-2 block text-sm font-medium">{label(field)}{field !== 'company' && <span aria-hidden="true" className="ml-1 text-primary-text">*</span>}</label>
          {field === 'description' ? <textarea {...props} rows={5} maxLength={4000} placeholder={label('descriptionPlaceholder')} /> : field === 'budget' ? <select {...props} defaultValue=""><option value="" disabled>{label('budgetPlaceholder')}</option>{(['small','medium','large','enterprise','unsure'] as const).map(key => <option key={key} value={key}>{label(`budget${key[0].toUpperCase()}${key.slice(1)}`)}</option>)}</select> : <input {...props} type={field === 'email' ? 'email' : 'text'} autoComplete={field === 'company' ? 'organization' : field} maxLength={field === 'email' ? 254 : field === 'name' ? 100 : 150} placeholder={label(`${field}Placeholder`)} />}
          {errors[field] && <p id={`${fieldId}-error`} role="alert" className="mt-2 text-sm text-danger-text">{text(errors[field]?.message || 'form.error')}</p>}
        </div>
      })}
      <div hidden aria-hidden="true"><label htmlFor={`${id}-website`}>{text('form.honeypot')}</label><input id={`${id}-website`} tabIndex={-1} autoComplete="off" {...register('website')} /></div>
    </div>
    <p className="my-5 text-xs leading-relaxed text-muted">{text('form.privacy')}</p>
    <Button type="submit" size="lg" isLoading={isSubmitting} className="w-full">{isSubmitting ? label('submitting') : label(emailConfigured ? 'submit' : 'prepare')}</Button>
    <div aria-live="polite" aria-atomic="true">
      {status !== 'idle' && <p className="mt-4 text-sm leading-relaxed">{text(`form.${status === 'sent' ? 'success' : status}`)}</p>}
      {draft && status !== 'idle' && <a href={draft} className="action-link action-secondary mt-4 w-full">{text('form.openEmail')}</a>}
    </div>
  </form>
}
