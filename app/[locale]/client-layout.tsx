'use client'

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
      <div className="flex min-h-screen flex-col">
        <HeaderClean />
        {children}
        <FooterClean />
      </div>
    </ThemeProvider>
  );
}
