import type { Metadata } from 'next';
import { getData } from '@/lib/data';

import { HeroClean } from '@/components/sections/hero-clean';
import { AboutClean } from '@/components/sections/about-clean';
import { TechStackClean } from '@/components/sections/tech-stack-clean';
import { ProjectsClean } from '@/components/sections/projects-clean';
import { ExperienceClean } from '@/components/sections/experience-clean';
import { ContactClean } from '@/components/sections/contact-clean';

// Dynamically generate metadata
export async function generateMetadata(): Promise<Metadata> {
  const data = await getData();
  return {
    title: data.name,
    description: data.description,
  };
}

export default async function Home() {
  const data = await getData();

  // Prepare highlights for About section
  const highlights = [
    "6+ years of experience building web applications",
    "Specialized in Laravel, PHP, and modern JavaScript frameworks",
    "Strong focus on clean architecture and maintainable code",
    "Experience leading teams and mentoring junior developers"
  ];

  // Combine work experience and education for timeline
  const allExperiences = [
    ...(data.workExperience || []),
    ...(data.education || [])
  ];

  return (
    <main className="min-h-screen">
      <HeroClean name={data.name} title={data.title} description={data.description} />
      <AboutClean name={data.name} description={data.description} highlights={highlights} />
      <TechStackClean />
      <ProjectsClean projects={data.projects} />
      <ExperienceClean experiences={allExperiences} />
      <ContactClean
        email={data.contact.email}
        phone={data.contact.phone}
        location={data.contact.location}
        social={{
          github: "https://github.com/benyaminrmb",
          linkedin: "https://linkedin.com/in/benyaminrmb",
          twitter: "https://twitter.com/benyaminrmb"
        }}
      />
    </main>
  );
}