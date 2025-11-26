import type { Metadata } from 'next';
import { getData } from '@/lib/data';
import { GlassHero } from '@/components/glass/glass-hero';
import { GlassAbout } from '@/components/glass/glass-about';
import { GlassProjects } from '@/components/glass/glass-projects';
import { GlassExperience } from '@/components/glass/glass-experience';
import { GlassContact } from '@/components/glass/glass-contact';
import { GlassNav } from '@/components/glass/glass-nav';

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

  // Transform projects for glass component
  const transformedProjects = data.projects.map(project => ({
    title: project.title,
    description: project.description,
    technologies: project.tags || [],
    link: project.link,
    github: undefined,
  }));

  // Transform experiences for glass component
  const transformedExperiences = [
    ...(data.workExperience || []).map(exp => {
      const [startDate, endDate] = exp.period.split(' - ');
      return {
        title: exp.title,
        company: exp.company,
        location: exp.location,
        startDate: startDate.trim(),
        endDate: endDate?.trim() || 'Present',
        description: Array.isArray(exp.description) ? exp.description.join('. ') : exp.description,
      };
    }),
    ...(data.education || []).map(edu => {
      const [startDate, endDate] = edu.period.split(' - ');
      return {
        title: edu.title,
        institution: edu.company,
        location: edu.location,
        startDate: startDate.trim(),
        endDate: endDate?.trim() || 'Present',
        description: Array.isArray(edu.description) ? edu.description.join('. ') : edu.description,
      };
    }),
  ];

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 relative overflow-hidden">
        {/* Animated background */}
        <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent" />
        <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent" />

        {/* Floating orbs */}
        <div className="fixed top-20 left-20 w-72 h-72 bg-purple-500/30 rounded-full blur-3xl animate-pulse" />
        <div className="fixed bottom-20 right-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000" />

        <GlassNav />

        <main className="relative z-10">
          <GlassHero
            name={data.name}
            title={data.title}
            description={data.description}
          />
          <GlassAbout
            name={data.name}
            description={data.description}
            highlights={highlights}
          />
          <GlassProjects projects={transformedProjects} />
          <GlassExperience experiences={transformedExperiences} />
          <GlassContact
            email={data.contact.email}
            phone={data.contact.phone}
            location={data.contact.location}
            social={{
              github: data.contact.github || "https://github.com/benyaminrmb",
              linkedin: data.contact.linkedin || "https://linkedin.com/in/benyaminrmb",
              twitter: undefined
            }}
          />
        </main>
      </div>
    </>
  );
}
