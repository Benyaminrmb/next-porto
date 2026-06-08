import type { Metadata } from 'next';
import { getData } from '@/lib/data';
import { WorkBento } from '@/components/sections/work-bento';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const data = await getData(locale);
  return {
    title: `Projects | ${data.name}`,
    description: 'Browse my portfolio of web development projects',
  };
}

export default async function ProjectsPage({ params }: PageProps) {
  const { locale } = await params;
  const data = await getData(locale);

  return (
    <main>
      <WorkBento projects={data.projects} />
    </main>
  );
}
