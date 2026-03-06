import { type HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

export type SectionSpacing = 'sm' | 'md' | 'lg'
export type SectionAs = 'section' | 'div' | 'article' | 'main'

export interface SectionProps extends HTMLAttributes<HTMLElement> {
  as?: SectionAs
  spacing?: SectionSpacing
}

const spacingClasses: Record<SectionSpacing, string> = {
  sm: 'py-8',
  md: 'py-16',
  lg: 'py-24',
}

export function Section({ as: Tag = 'section', spacing = 'md', className, children, ...props }: SectionProps) {
  return (
    <Tag className={cn(spacingClasses[spacing], className)} {...props}>
      {children}
    </Tag>
  )
}
