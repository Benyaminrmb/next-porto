import type { Metadata } from 'next';
import { getData } from '@/lib/data';

import { HeroSection } from '@/components/sections/hero-section';
import { AboutSection } from '@/components/sections/about-section';
import { StatsShowcase } from '@/components/sections/stats-showcase';
import { ProjectsShowcase } from '@/components/sections/projects-showcase';
import { TechStack } from '@/components/sections/tech-stack';
import { SkillsShowcase } from '@/components/sections/skills-showcase';
import { ExperienceTimeline } from '@/components/sections/experience-timeline';
import { LanguageShowcase } from '@/components/sections/language-showcase';
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
        <HeroSection name={data.name} title={data.title} description={data.description} />
        <AboutSection name={data.name} description={data.description} />
        {data.stats && <StatsShowcase stats={data.stats} />}
        <ProjectsShowcase projects={data.projects} />
        <TechStack />
        <SkillsShowcase skills={data.skills} />
        <ExperienceTimeline
          workExperience={data.workExperience}
          education={data.education}
        />
        <LanguageShowcase languages={data.languages} />
        <ContactShowcase contact={data.contact} />
      </main>
      <BackToTop />
    </>
  );
}