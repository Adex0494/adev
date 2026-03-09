'use client'

import { useState, useEffect, useRef } from 'react'

export interface UseCountUpReturn {
  count: number
  ref: React.RefObject<HTMLDivElement | null>
}

export function useCountUp(target: number, duration = 1500): UseCountUpReturn {
  const [count, setCount] = useState(0)
  const hasAnimated = useRef(false)
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = elementRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true
          let startTime: number | null = null

          const tick = (timestamp: number) => {
            if (startTime === null) startTime = timestamp
            const progress = Math.min((timestamp - startTime) / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3)
            setCount(Math.round(eased * target))
            if (progress < 1) requestAnimationFrame(tick)
          }

          requestAnimationFrame(tick)
        }
      },
      { threshold: 0.1 },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [target, duration])

  return { count, ref: elementRef }
}
