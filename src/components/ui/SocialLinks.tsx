'use client'

import { t, type Locale } from '@/i18n'
import { useLocale } from '@/i18n/LocaleProvider'
import { site } from '@/lib/site'
import { cn } from '@/lib/utils'

type SocialName = 'github' | 'linkedin' | 'email' | 'website'
export interface SocialIconProps { name: SocialName; className?: string }

/** Recognizable inline brand marks and native contact icons, without an icon dependency. */
export function SocialIcon({ name, className }: SocialIconProps) {
  const brand = name === 'github' || name === 'linkedin'
  return <svg viewBox="0 0 24 24" width="20" height="20" fill={brand ? 'currentColor' : 'none'} stroke={brand ? undefined : 'currentColor'} strokeWidth={brand ? undefined : 1.7} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false" data-icon={name} className={cn('h-5 w-5 shrink-0', className)}>
    {name === 'github' && <path d="M12 .75a11.25 11.25 0 0 0-3.56 21.92c.56.1.77-.24.77-.54v-2.1c-3.13.68-3.79-1.33-3.79-1.33-.51-1.3-1.25-1.65-1.25-1.65-1.02-.7.08-.69.08-.69 1.13.08 1.72 1.16 1.72 1.16 1 1.72 2.63 1.22 3.27.94.1-.73.39-1.22.71-1.5-2.5-.28-5.13-1.25-5.13-5.56 0-1.23.44-2.24 1.16-3.03-.12-.28-.5-1.43.11-2.98 0 0 .95-.3 3.09 1.16A10.77 10.77 0 0 1 12 6.17c.96 0 1.92.13 2.82.38 2.15-1.46 3.09-1.16 3.09-1.16.61 1.55.23 2.7.11 2.98.72.79 1.15 1.8 1.15 3.03 0 4.32-2.63 5.27-5.14 5.55.4.35.76 1.04.76 2.1v3.08c0 .3.2.65.77.54A11.25 11.25 0 0 0 12 .75Z" />}
    {name === 'linkedin' && <path d="M20.45 20.45H16.9v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12Zm1.78 13.02H3.55V9h3.57v11.45ZM22.23 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.23 0Z" />}
    {name === 'email' && <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></>}
    {name === 'website' && <><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c5 5 5 13 0 18-5-5-5-13 0-18Z" /></>}
  </svg>
}

export interface SocialLinksProps { locale?: Locale; className?: string }
const links = [
  { name: 'github', href: site.github, external: true },
  { name: 'linkedin', href: site.linkedin, external: true },
  { name: 'email', href: `mailto:${site.email}`, external: false },
  { name: 'website', href: site.url, external: true },
] as const

export function SocialLinks({ locale: override, className }: SocialLinksProps) {
  const { locale } = useLocale(override)
  return <ul className={cn('flex flex-wrap items-center gap-3', className)}>
    {links.map(({ name, href, external }) => <li key={name}><a href={href} target={external ? '_blank' : undefined} rel={external ? 'noopener noreferrer' : undefined} aria-label={t(`common.${name}`, locale)} title={t(`common.${name}`, locale)} className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-card text-foreground-secondary transition-colors hover:border-primary/50 hover:bg-primary/10 hover:text-primary-text"><SocialIcon name={name} /></a></li>)}
  </ul>
}
