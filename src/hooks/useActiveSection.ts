'use client'

import { useEffect, useState, type RefObject } from 'react'

export type NavSection = 'services' | 'work' | 'about' | 'contact'

/** Observe one stable reading line below the header, rather than competing visibility ratios. */
export function useActiveSection(enabled: boolean, header: RefObject<HTMLDivElement | null>) {
  const [active, setActive] = useState<NavSection | null>(null)

  useEffect(() => {
    if (!enabled || !window.IntersectionObserver) return
    const sections = ['hero', 'services', 'work', 'about', 'process', 'contact']
      .map(id => document.getElementById(id)).filter((node): node is HTMLElement => Boolean(node))
    let observer: IntersectionObserver | undefined

    function observe() {
      observer?.disconnect()
      const line = Math.min((header.current?.getBoundingClientRect().height || 72) + 24, window.innerHeight - 1)
      function update() {
        // Read current geometry once per observer delivery. This also handles jumps past whole sections.
        const current = sections.filter(section => section.getBoundingClientRect().top <= line + 1).at(-1)?.id
        setActive(current === 'process' ? 'about' : current && current !== 'hero' ? current as NavSection : null)
      }
      observer = new IntersectionObserver(update, {
        rootMargin: `-${line}px 0px -${Math.max(0, window.innerHeight - line - 1)}px 0px`,
        threshold: 0,
      })
      sections.forEach(section => observer?.observe(section))
      update()
    }

    observe()
    window.addEventListener('resize', observe)
    const resizeObserver = typeof ResizeObserver === 'undefined' ? undefined : new ResizeObserver(observe)
    if (header.current) resizeObserver?.observe(header.current)
    return () => {
      observer?.disconnect()
      resizeObserver?.disconnect()
      window.removeEventListener('resize', observe)
    }
  }, [enabled, header])

  return enabled ? active : null
}
