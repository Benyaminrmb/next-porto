'use client'

import {HeroUIProvider} from '@heroui/react'
import {ThemeProvider} from '@/components/option/theme-provider'
import HeaderClean from '@/components/main/header/header-clean'
import FooterClean from '@/components/main/footer/footer-clean'

export function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem={false}
      disableTransitionOnChange>
      <HeroUIProvider>
        <div className="flex min-h-screen flex-col">
          <HeaderClean />
          <div className="flex-1">
            {children}
          </div>
          <FooterClean />
        </div>
      </HeroUIProvider>
    </ThemeProvider>
  );
}
