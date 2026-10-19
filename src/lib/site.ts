export const site = {
  name: 'AKDEVIA',
  url: 'https://akdevia.com',
  email: 'adex0494@gmail.com',
  founder: 'Ariangel Díaz Espaillat',
  github: 'https://github.com/Adex0494/',
  linkedin: 'https://www.linkedin.com/in/ariangel-diaz-espaillat/',
  medika: '/medika',
  portrait: { src: '/about/ariangel-diaz-espaillat.webp', width: 360, height: 360 },
} as const

export function schedulingUrl(value = process.env.NEXT_PUBLIC_CALENDLY_URL): string | undefined {
  if (!value?.trim()) return undefined
  try {
    const url = new URL(value.trim())
    if (url.protocol !== 'https:' || url.hostname !== 'calendly.com' || url.username || url.password || url.pathname === '/') return undefined
    return url.href
  } catch { return undefined }
}
