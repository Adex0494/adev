'use client'
import { createContext, useContext, useEffect, useState, useSyncExternalStore, type ReactNode } from 'react'
export type Theme = 'light' | 'dark' | 'system'
export type ResolvedTheme = 'light' | 'dark'
interface ThemeContextValue { theme: Theme; resolvedTheme: ResolvedTheme; setTheme: (theme: Theme) => void }
const ThemeContext = createContext<ThemeContextValue | null>(null)
const STORAGE_KEY = 'adev-theme'
const CHANGE_EVENT = 'akdevia-theme-change'
function resolve(theme: Theme): ResolvedTheme {
  return theme === 'system' ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light') : theme
}
function snapshot() {
  let theme: Theme = 'system'
  try { const value = localStorage.getItem(STORAGE_KEY); if (value === 'dark' || value === 'light' || value === 'system') theme = value } catch { /* Storage may be disabled. */ }
  return `${theme}:${resolve(theme)}`
}
function serverSnapshot() { return 'system:light' }
function subscribe(callback: () => void) {
  const media = window.matchMedia('(prefers-color-scheme: dark)')
  window.addEventListener('storage', callback)
  window.addEventListener(CHANGE_EVENT, callback)
  media.addEventListener('change', callback)
  return () => { window.removeEventListener('storage', callback); window.removeEventListener(CHANGE_EVENT, callback); media.removeEventListener('change', callback) }
}
export function ThemeProvider({ children }: { children: ReactNode }) {
  const value = useSyncExternalStore(subscribe, snapshot, serverSnapshot)
  const [fallback, setFallback] = useState<Theme | null>(null)
  const [storedTheme, storedResolved] = value.split(':') as [Theme, ResolvedTheme]
  const theme = fallback ?? storedTheme
  const resolvedTheme = fallback ? resolve(fallback) : storedResolved
  useEffect(() => {
    document.documentElement.classList.remove('light', 'dark')
    document.documentElement.classList.add(resolvedTheme)
    document.documentElement.style.colorScheme = resolvedTheme
  }, [resolvedTheme])
  function setTheme(next: Theme) {
    try { localStorage.setItem(STORAGE_KEY, next); setFallback(null) } catch { setFallback(next) }
    window.dispatchEvent(new Event(CHANGE_EVENT))
  }
  return <ThemeContext.Provider value={{ theme, resolvedTheme, setTheme }}>{children}</ThemeContext.Provider>
}
export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext)
  if (!context) throw new Error('useTheme must be used inside <ThemeProvider>')
  return context
}
