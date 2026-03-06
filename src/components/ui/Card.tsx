import { type HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

export type CardVariant = 'default' | 'outlined' | 'elevated'

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant
}

const variantClasses: Record<CardVariant, string> = {
  default: 'bg-card border border-border',
  outlined: 'bg-transparent border-2 border-border',
  elevated: 'bg-card shadow-lg',
}

export function Card({ variant = 'default', className, children, ...props }: CardProps) {
  return (
    <div className={cn('rounded-xl p-6', variantClasses[variant], className)} {...props}>
      {children}
    </div>
  )
}

export function CardHeader({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('mb-4', className)} {...props}>
      {children}
    </div>
  )
}

export function CardTitle({ className, children, ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3 className={cn('text-lg font-semibold text-foreground', className)} {...props}>
      {children}
    </h3>
  )
}

export function CardDescription({ className, children, ...props }: HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cn('text-sm text-muted', className)} {...props}>
      {children}
    </p>
  )
}

export function CardContent({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('', className)} {...props}>
      {children}
    </div>
  )
}

export function CardFooter({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('mt-4 flex items-center', className)} {...props}>
      {children}
    </div>
  )
}
