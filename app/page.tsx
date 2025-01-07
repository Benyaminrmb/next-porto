import Image from 'next/image';
import Head from 'next/head';
import type { Metadata } from 'next';
import { getData } from '@/lib/data';
import {Test} from '@/components/test'
 import {AuroraBackground} from '@/components/ui/aurora-background'
import {  HeroSection} from '@/components/bg-effect'
import {ProjectsSection} from '@/components/projects-section'
import {SkillsSection} from '@/components/skills-section'
import {ContactSection} from '@/components/contact-section'
// Function to fetch data


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

      <HeroSection data={data} />
      <ProjectsSection projects={data.projects} />
      <SkillsSection skills={data.skills} />
      <ContactSection contact={data.contact} />
      </>
  );
}