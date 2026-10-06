import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { ThemeProvider } from '@/components/ui/ThemeProvider'
import { ADEV_LOGO } from '@/lib/brand'
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
  title: 'ADEV — Digital Agency',
  description:
    'ADEV partners with ambitious companies to design, develop, and scale world-class digital products.',
  openGraph: {
    type: 'website',
    siteName: 'ADEV',
    title: 'ADEV — Digital Agency',
    description:
      'ADEV partners with ambitious companies to design, develop, and scale world-class digital products.',
    images: [
      {
        url: ADEV_LOGO.src,
        width: ADEV_LOGO.width,
        height: ADEV_LOGO.height,
        alt: 'ADEV — Digital Agency',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ADEV — Digital Agency',
    description:
      'ADEV partners with ambitious companies to design, develop, and scale world-class digital products.',
    images: [ADEV_LOGO.src],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
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
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
