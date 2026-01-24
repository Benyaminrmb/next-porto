import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getData } from '@/lib/data';
import { ProjectDetail } from '@/components/sections/project-detail';

interface PageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const data = await getData();
  const project = data.projects.find((p) => p.slug === slug);

  if (!project) {
    return {
      title: 'Project Not Found',
    };
  }

  return {
    title: `${project.title} | ${data.name}`,
    description: project.description,
  };
}

export async function generateStaticParams() {
  const data = await getData();
  const locales = ['en', 'fa'];

  return locales.flatMap((locale) =>
    data.projects.map((project) => ({
      locale,
      slug: project.slug,
    }))
  );
}

export default async function ProjectPage({ params }: PageProps) {
  const { locale, slug } = await params;
  const data = await getData();
  const project = data.projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="min-h-screen pt-16">
      <ProjectDetail project={project} locale={locale} />
    </main>
  );
}
