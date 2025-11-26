import type { Metadata } from 'next';
import { getData } from '@/lib/data';

import { HeroSection } from '@/components/sections/hero-section';
import { AboutSection } from '@/components/sections/about-section';
import { ProjectsShowcase } from '@/components/sections/projects-showcase';
import { SkillsShowcase } from '@/components/sections/skills-showcase';
import { ExperienceTimeline } from '@/components/sections/experience-timeline';
import { ContactShowcase } from '@/components/sections/contact-showcase';
import { BackToTop } from '@/components/ui/back-to-top';

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

  return (
    <>
      <main className="scroll-smooth">
        <HeroSection name={data.name} description={data.description} />
        <AboutSection name={data.name} description={data.description} />
        <ProjectsShowcase projects={data.projects} />
        <SkillsShowcase skills={data.skills} />
        <ExperienceTimeline
          workExperience={data.workExperience}
          education={data.education}
        />
        <ContactShowcase contact={data.contact} />
      </main>
      <BackToTop />
    </>
  );
}