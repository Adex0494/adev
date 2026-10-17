import { cn } from '@/lib/utils'
export interface ScrollRevealProps {
  children: React.ReactNode
  className?: string
  delay?: number
  direction?: 'up' | 'down' | 'left' | 'right' | 'none'
  once?: boolean
}
/** Keep content visible with or without JavaScript; motion is deliberately restrained. */
export function ScrollReveal({ children, className }: ScrollRevealProps) {
  return <div className={cn(className)}>{children}</div>
}
