import { t, type Locale } from '@/i18n'
import { site } from './site'
import type { ProjectIntakeFormValues } from './schemas/projectIntake'

const budgetKeys = { small: 'budgetSmall', medium: 'budgetMedium', large: 'budgetLarge', enterprise: 'budgetEnterprise', unsure: 'budgetUnsure' } as const

export function contactMessage(values: ProjectIntakeFormValues, locale: Locale) {
  const text = (key: string) => t(`modal.projectIntake.${key}`, locale)
  return [
    `${text('name')}: ${values.name}`,
    `${text('email')}: ${values.email}`,
    `${text('company')}: ${values.company || '—'}`,
    `${text('budget')}: ${text(budgetKeys[values.budget])}`,
    '', text('description'), values.description,
  ].join('\n')
}

export function contactMailto(values: ProjectIntakeFormValues, locale: Locale) {
  const subject = `${site.name} — ${t('home.cta.sendMessage', locale)} — ${values.name}`
  return `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(contactMessage(values, locale))}`
}
