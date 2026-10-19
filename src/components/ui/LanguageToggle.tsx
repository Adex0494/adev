'use client'

import { t } from '@/i18n'
import { useLocale } from '@/i18n/LocaleProvider'
import { localeHref } from '@/i18n/preferences'
import type { Locale } from '@/i18n'
import { cn } from '@/lib/utils'

export interface LanguageToggleProps { locale?: Locale; className?: string }

export function LanguageToggle({ locale: override, className }: LanguageToggleProps) {
  const { locale, setLocale } = useLocale(override)
  const next = locale === 'en' ? 'es' : 'en'
  return <a
    href={localeHref(next)}
    hrefLang={next}
    lang={next}
    aria-label={t('common.language', locale)}
    onClick={event => {
      if (!setLocale || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
      event.preventDefault()
      setLocale(next)
    }}
    className={cn('flex h-11 w-11 shrink-0 items-center justify-center rounded-md border border-border text-xs font-semibold transition-colors hover:bg-background-secondary', className)}
  >{next.toUpperCase()}</a>
}
