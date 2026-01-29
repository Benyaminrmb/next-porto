import type { Metadata } from 'next';
import { getData } from '@/lib/data';

import { HeroMinimal } from '@/components/sections/hero-minimal';
import { AboutMinimal } from '@/components/sections/about-minimal';
import { ProjectsMinimal } from '@/components/sections/projects-minimal';
import { ContactMinimal } from '@/components/sections/contact-minimal';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const data = await getData(locale);
  return {
    title: data.name,
    description: data.description,
  };
}

export default async function Home({ params }: PageProps) {
  const { locale } = await params;
  const data = await getData(locale);

  return (
    <main className="min-h-screen">
      <HeroMinimal
        name={data.name}
        title={data.title}
        description={data.description}
      />
      <AboutMinimal
        description={data.description}
        languages={data.languages}
        skills={data.skills}
        stats={data.stats}
      />
      <ProjectsMinimal
        projects={data.projects}
      />
      <ContactMinimal
        contact={data.contact}
      />
    </main>
  );
}