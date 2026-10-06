import Image from 'next/image'
import { cn } from '@/lib/utils'
import { t } from '@/i18n'
import { ADEV_LOGO } from '@/lib/brand'

export interface LogoProps {
  /** Image height in px, including the official artwork's padding. */
  height?: number
  className?: string
  priority?: boolean
}

const LOGO_ASPECT_RATIO = ADEV_LOGO.width / ADEV_LOGO.height

export function Logo({ height = 36, className, priority = false }: LogoProps) {
  const width = Math.round(height * LOGO_ASPECT_RATIO)

  return (
    <Image
      src={ADEV_LOGO.src}
      alt={t('common.logoAlt')}
      width={width}
      height={height}
      priority={priority}
      unoptimized
      className={cn('h-auto shrink-0 object-contain', className)}
    />
  )
}
