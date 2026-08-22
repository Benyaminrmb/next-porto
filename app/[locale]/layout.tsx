import {NextIntlClientProvider} from 'next-intl'
import {getMessages} from 'next-intl/server'
import {notFound} from 'next/navigation'
import {GeistMono} from 'geist/font/mono'
import localFont from 'next/font/local'
import '../assets/globals.scss'
import {ClientLayout} from './client-layout'

const ravi = localFont({
  variable: '--font-ravi',
  display: 'swap',
  src: [
    {
      path: '../../Pro/Ravi Family/Webfonts/fonts/woff2/Ravi-Light.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../../Pro/Ravi Family/Webfonts/fonts/woff2/Ravi-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../Pro/Ravi Family/Webfonts/fonts/woff2/Ravi-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../Pro/Ravi Family/Webfonts/fonts/woff2/Ravi-SemiBold.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../../Pro/Ravi Family/Webfonts/fonts/woff2/Ravi-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../../Pro/Ravi Family/Webfonts/fonts/woff2/Ravi-ExtraBlack.woff2',
      weight: '900',
      style: 'normal',
    },
  ],
})

const manrope = localFont({
  variable: '--font-manrope',
  display: 'swap',
  src: '../fonts/Manrope-Variable.ttf',
  weight: '200 800',
  style: 'normal',
})

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{locale: string}>
}) {
  const {locale} = await params

  const locales = ['en', 'fa']
  if (!locales.includes(locale)) {
    notFound()
  }

  const messages = await getMessages()

  return (
    <html
      lang={locale}
      dir={locale === 'fa' ? 'rtl' : 'ltr'}
      suppressHydrationWarning>
      <body
        className={`antialiased ${manrope.variable} ${GeistMono.variable} ${ravi.variable}`}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ClientLayout>{children}</ClientLayout>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
