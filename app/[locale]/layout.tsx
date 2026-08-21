import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Vazirmatn } from 'next/font/google'
import '../assets/globals.scss'
import { ClientLayout } from './client-layout'

const vazirmatn = Vazirmatn({ subsets:['arabic'], variable:'--font-vazirmatn', display:'swap' })

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  const locales = ['en', 'fa']
  if (!locales.includes(locale)) {
    notFound()
  }

  const messages = await getMessages()

  return (
    <html
      lang={locale}
      dir={locale === 'fa' ? 'rtl' : 'ltr'}
      suppressHydrationWarning
    >
      <body
        className={`antialiased ${GeistSans.variable} ${GeistMono.variable} ${vazirmatn.variable}`}
      >
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ClientLayout>{children}</ClientLayout>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
