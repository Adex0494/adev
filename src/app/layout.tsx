import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { ThemeProvider } from '@/components/ui/ThemeProvider'
import { ADEV_LOGO } from '@/lib/brand'
import { site } from '@/lib/site'
import { getLocale } from '@/i18n/server'
import { t } from '@/i18n'
import { LocaleProvider } from '@/i18n/LocaleProvider'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: t('seo.title'),
  description:
    t('seo.description'),
  openGraph: {
    type: 'website',
    siteName: site.name,
    title: t('seo.title'),
    description:
      t('seo.description'),
    images: [
      {
        url: ADEV_LOGO.src,
        width: ADEV_LOGO.width,
        height: ADEV_LOGO.height,
        alt: 'AKDEVIA — ADEV',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: t('seo.title'),
    description:
      t('seo.description'),
    images: [ADEV_LOGO.src],
  },
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const locale = await getLocale()
  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        {/* Sets theme class before first paint to prevent FOUC */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('adev-theme')||'system';var r=t==='system'?(window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'):t;document.documentElement.classList.add(r)}catch(e){}})()`,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-background text-foreground antialiased`}
      >
        <LocaleProvider initialLocale={locale}><ThemeProvider>{children}</ThemeProvider></LocaleProvider>
      </body>
    </html>
  )
}
