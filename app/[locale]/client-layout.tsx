'use client'

import {usePathname} from 'next/navigation'
import {HeroUIProvider} from '@heroui/react'
import {ThemeProvider} from '@/components/option/theme-provider'
import HeaderClean from '@/components/main/header/header-clean'
import FooterClean from '@/components/main/footer/footer-clean'

export function ClientLayout({children}: {children: React.ReactNode}) {
  const pathname = usePathname()
  const resumeHome = /^\/(en|fa)\/?$/.test(pathname || '')
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
      <HeroUIProvider>
        <div className="flex min-h-screen flex-col">
          {!resumeHome && <HeaderClean />}
          <div className="flex-1">{children}</div>
          {!resumeHome && <FooterClean />}
        </div>
      </HeroUIProvider>
    </ThemeProvider>
  )
}
