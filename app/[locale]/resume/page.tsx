import type { Metadata } from 'next'
import { getData } from '@/lib/data'
import { ExperienceEditorial } from '@/components/sections/editorial'

interface PageProps {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params
  const data = await getData(locale)
  return {
    title: `Resume | ${data.name}`,
    description: data.description,
  }
}

export default async function ResumePage({ params }: PageProps) {
  const { locale } = await params
  const data = await getData(locale)

  return (
    <main>
      <ExperienceEditorial data={data} locale={locale} resume/>
    </main>
  )
}
