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
    title: `Stack | ${data.name}`,
    description: data.description,
  }
}

export default async function StackPage({ params }: PageProps) {
  const { locale } = await params
  const data = await getData(locale)

  return (
    <main>
      <SimpleDataPage type="stack" data={data} locale={locale}/>
    </main>
  )
}
