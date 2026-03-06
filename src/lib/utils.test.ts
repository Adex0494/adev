import { describe, it, expect } from 'vitest'
import { cn } from './utils'

describe('cn', () => {
  it('joins multiple class names', () => {
    expect(cn('a', 'b', 'c')).toBe('a b c')
  })

  it('filters out undefined', () => {
    expect(cn('a', undefined, 'b')).toBe('a b')
  })

  it('filters out null', () => {
    expect(cn('a', null, 'b')).toBe('a b')
  })

  it('filters out false', () => {
    expect(cn('a', false, 'b')).toBe('a b')
  })

  it('returns empty string when all values are falsy', () => {
    expect(cn(undefined, null, false)).toBe('')
  })

  it('handles a single class name', () => {
    expect(cn('foo')).toBe('foo')
  })

  it('handles empty string input', () => {
    expect(cn()).toBe('')
  })

  it('is useful for conditional classes', () => {
    const isActive = true
    const isDisabled = false
    expect(cn('base', isActive && 'active', isDisabled && 'disabled')).toBe('base active')
  })
})
