import type { Metadata } from 'next';
import { getData } from '@/lib/data';
import { ExperienceBento } from '@/components/sections/experience-bento';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const data = await getData(locale);
  return {
    title: `Experience | ${data.name}`,
    description: 'My professional experience and education',
  };
}

export default async function ExperiencePage({ params }: PageProps) {
  const { locale } = await params;
  const data = await getData(locale);

  return (
    <main>
      <ExperienceBento workExperience={data.workExperience} education={data.education} />
    </main>
  );
}
