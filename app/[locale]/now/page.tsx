import type { Metadata } from 'next'
import { getData } from '@/lib/data'
import { SimpleDataPage } from '@/components/sections/editorial'

interface PageProps {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params
  const data = await getData(locale)
  return {
    title: `Now | ${data.name}`,
    description: data.description,
  }
}

export default async function NowPage({ params }: PageProps) {
  const { locale } = await params
  const data = await getData(locale)

  if (!data.now) return null

  return (
    <main>
      <SimpleDataPage type="now" data={data} locale={locale}/>
    </main>
  )
}
