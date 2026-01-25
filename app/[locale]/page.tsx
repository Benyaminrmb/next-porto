import type { Metadata } from 'next';
import { getData } from '@/lib/data';

import { HeroCreative } from '@/components/sections/hero-creative';
import { AboutCreative } from '@/components/sections/about-creative';
import { StatsCreative } from '@/components/sections/stats-creative';
import { ProjectsCreative } from '@/components/sections/projects-creative';
import { ExperienceCreative } from '@/components/sections/experience-creative';
import { ContactCreative } from '@/components/sections/contact-creative';

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
      <HeroCreative
        name={data.name}
        title={data.title}
        description={data.description}
      />
      <AboutCreative
        description={data.description}
        languages={data.languages}
        skills={data.skills}
        stats={data.stats}
      />
      <StatsCreative
        stats={data.stats}
      />
      <ProjectsCreative
        projects={data.projects}
      />
      <ExperienceCreative
        workExperience={data.workExperience}
        education={data.education}
      />
      <ContactCreative
        contact={data.contact}
      />
    </main>
  );
}