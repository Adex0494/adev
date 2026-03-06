type ClassValue = string | undefined | null | false

/**
 * Merges class names, filtering out falsy values.
 * Use this instead of string concatenation for Tailwind classes.
 */
export function cn(...classes: ClassValue[]): string {
  return classes.filter(Boolean).join(' ')
}
