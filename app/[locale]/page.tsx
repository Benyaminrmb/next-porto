import type {Metadata} from 'next'
import {getData} from '@/lib/data'
import {PortfolioHome} from '@/components/sections/portfolio-home'

interface PageProps {
  params: Promise<{locale: string}>
}

export async function generateMetadata({params}: PageProps): Promise<Metadata> {
  const {locale} = await params
  const data = await getData(locale)
  return {
    title: `${data.name} — ${data.title}`,
    description: data.description,
    alternates: {canonical: `/${locale}`, languages: {en: '/en', fa: '/fa'}},
    openGraph: {
      title: `${data.name} — ${data.title}`,
      description: data.description,
      type: 'website',
      locale: locale === 'fa' ? 'fa_IR' : 'en_US',
    },
  }
}

export default async function Home({params}: PageProps) {
  const {locale} = await params
  const data = await getData(locale)
  return <PortfolioHome data={data} locale={locale} />
}
