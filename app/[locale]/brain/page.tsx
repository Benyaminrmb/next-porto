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
    title: `Brain | ${data.name}`,
    description: data.description,
  }
}

export default async function BrainPage({ params }: PageProps) {
  const { locale } = await params
  const data = await getData(locale)

  return (
    <main>
      <SimpleDataPage type="brain" data={data} locale={locale}/>
    </main>
  )
}
