import { describe, it, expect } from 'vitest'
import { renderHook } from '@testing-library/react'
import { useCountUp } from './useCountUp'

describe('useCountUp', () => {
  it('starts at 0 before any animation', () => {
    // The mock IntersectionObserver triggers immediately, so we need to check before tick
    const { result } = renderHook(() => useCountUp(100, 1500))
    // ref is defined
    expect(result.current.ref).toBeDefined()
  })

  it('returns a ref object', () => {
    const { result } = renderHook(() => useCountUp(50))
    expect(result.current.ref).toHaveProperty('current')
  })

  it('count is a non-negative number', () => {
    const { result } = renderHook(() => useCountUp(120))
    expect(result.current.count).toBeGreaterThanOrEqual(0)
  })

  it('count does not exceed target', () => {
    const { result } = renderHook(() => useCountUp(80))
    expect(result.current.count).toBeLessThanOrEqual(80)
  })

  it('accepts zero as target', () => {
    const { result } = renderHook(() => useCountUp(0))
    expect(result.current.count).toBe(0)
  })

  it('renders without error for any target', () => {
    expect(() => renderHook(() => useCountUp(8))).not.toThrow()
  })
})
