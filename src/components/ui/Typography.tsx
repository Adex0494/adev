import { type HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'

export interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  as?: HeadingLevel
}

const headingClasses: Record<HeadingLevel, string> = {
  h1: 'text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground',
  h2: 'text-3xl sm:text-4xl font-bold tracking-tight text-foreground',
  h3: 'text-2xl sm:text-3xl font-semibold text-foreground',
  h4: 'text-xl font-semibold text-foreground',
  h5: 'text-lg font-medium text-foreground',
  h6: 'text-base font-medium text-foreground',
}

export function Heading({ as: Tag = 'h2', className, children, ...props }: HeadingProps) {
  return (
    <Tag className={cn(headingClasses[Tag], className)} {...props}>
      {children}
    </Tag>
  )
}

export function Lead({ className, children, ...props }: HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cn('text-lg sm:text-xl text-muted leading-relaxed', className)} {...props}>
      {children}
    </p>
  )
}

export function Text({ className, children, ...props }: HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cn('text-base text-foreground leading-relaxed', className)} {...props}>
      {children}
    </p>
  )
}

export function Label({ className, children, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn('text-xs font-semibold uppercase tracking-wider text-muted', className)}
      {...props}
    >
      {children}
    </span>
  )
}
