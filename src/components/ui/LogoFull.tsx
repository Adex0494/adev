import { Logo, type LogoProps } from './Logo'

export type LogoFullProps = LogoProps

export function LogoFull({ height = 120, className, priority = false }: LogoFullProps) {
  return <Logo height={height} className={className} priority={priority} />
}
