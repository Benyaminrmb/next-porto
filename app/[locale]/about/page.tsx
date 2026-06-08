import type { Metadata } from 'next';
import { getData } from '@/lib/data';
import { AboutFullBento } from '@/components/sections/about-full-bento';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const data = await getData(locale);
  return {
    title: `About | ${data.name}`,
    description: data.description,
  };
}

export default async function AboutPage({ params }: PageProps) {
  const { locale } = await params;
  const data = await getData(locale);

  return (
    <main>
      <AboutFullBento
        description={data.description}
        availability={data.availability}
        skillGroups={data.skillGroups ?? []}
        languages={data.languages}
        stats={data.stats}
        teaching={data.teaching}
      />
    </main>
  );
}
