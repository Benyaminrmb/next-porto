import type { Metadata } from 'next'
import { getData } from '@/lib/data'
import { ResumeBento } from '@/components/sections/resume-bento'

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
      <ResumeBento
        description={data.description}
        workExperience={data.workExperience}
        education={data.education}
        skillGroups={data.skillGroups ?? []}
        languages={data.languages}
        contact={data.contact}
        details={data.details}
      />
    </main>
  )
}
