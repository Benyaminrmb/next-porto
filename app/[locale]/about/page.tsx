import type { Metadata } from 'next';
import { getData } from '@/lib/data';
import { AboutEditorial } from '@/components/sections/editorial';

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
      <AboutEditorial data={data} locale={locale}/>
    </main>
  );
}
