import type { Metadata } from 'next';
import { getData } from '@/lib/data';

import { HeroRedesign } from '@/components/sections/hero-redesign';
import { AboutRedesign } from '@/components/sections/about-redesign';
import { ProjectsRedesign } from '@/components/sections/projects-redesign';
import { TechStackRedesign } from '@/components/sections/tech-stack-redesign';
import { ExperienceRedesign } from '@/components/sections/experience-redesign';
import { ContactRedesign } from '@/components/sections/contact-redesign';
import { BackToTop } from '@/components/ui/back-to-top';
import { CustomCursor } from '@/components/ui/custom-cursor';

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
    <>
      <CustomCursor />
      <main className="scroll-smooth">
        <HeroRedesign name={data.name} title={data.title} description={data.description} />
        <AboutRedesign name={data.name} description={data.description} highlights={highlights} />
        <TechStackRedesign />
        <ProjectsRedesign projects={data.projects} />
        <ExperienceRedesign experiences={allExperiences} />
        <ContactRedesign
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
      <BackToTop />
    </>
  );
}