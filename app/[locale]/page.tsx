import type { Metadata } from 'next';
import { getData } from '@/lib/data';

import { HeroMinimal } from '@/components/sections/hero-minimal';
import { FeaturedProjects } from '@/components/sections/featured-projects';
import { ContactCTA } from '@/components/sections/contact-cta';

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
      <FeaturedProjects projects={data.projects} />
      <ContactCTA email={data.contact.email} />
    </main>
  );
}