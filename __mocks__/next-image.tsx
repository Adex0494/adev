/* eslint-disable @next/next/no-img-element */
import React from 'react'

interface MockImageProps {
  src: string | { src: string }
  alt: string
  width?: number
  height?: number
  priority?: boolean
  unoptimized?: boolean
  className?: string
  [key: string]: unknown
}

export default function MockImage({
  src,
  alt,
  width,
  height,
  priority,
  unoptimized,
  className,
  ...rest
}: MockImageProps) {
  void priority // intentionally unused in mock
  void unoptimized // Next.js-only prop; do not forward it to the DOM
  const srcStr = typeof src === 'string' ? src : (src as { src: string }).src
  return (
    <img
      src={srcStr}
      alt={alt}
      width={width}
      height={height}
      className={className}
      {...(rest as React.HTMLAttributes<HTMLImageElement>)}
    />
  )
}
