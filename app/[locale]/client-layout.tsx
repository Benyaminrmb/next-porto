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
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange>
      <HeroUIProvider>
        <div className="flex min-h-screen flex-col">
          <HeaderClean />
          {/* Spacer for fixed header */}
          <div className="h-20" />
          <main className="flex-1">
            {children}
          </main>
          <FooterClean />
        </div>
      </HeroUIProvider>
    </ThemeProvider>
  );
}
