'use client'

import {ThemeProvider} from '@/components/option/theme-provider'
import {useAppStore} from '@/store/app'
import HeaderRedesign from '@/components/main/header/header-redesign'
import Footer from '@/components/main/footer/footer'

export function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const {isDrawerOpen} = useAppStore((state) => state)

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange>
      <main
        className={`w-full flex flex-col gap-0 relative ${isDrawerOpen ? 'drawer-open' : ''}`}>
        <HeaderRedesign />
        <div className="flex w-full flex-col app-main">{children}</div>
        <Footer />
      </main>
    </ThemeProvider>
  );
}
