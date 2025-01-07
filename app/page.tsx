import Image from 'next/image';
import Head from 'next/head';
import type { Metadata } from 'next';
import { getData } from '@/lib/data';

import BCard from '@/components/main/b-card'
import TextEffect from '@/components/text-effect'
import {WavyBackgroundDemo} from '@/components/WavyBackgroundDemo'
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
      <BCard>
        <WavyBackgroundDemo/>
      </BCard>
      {/*<HeroSection data={data} />*/}
      {/*<ProjectsSection projects={data.projects} />*/}
      {/*<SkillsSection skills={data.skills} />*/}
      {/*<ContactSection contact={data.contact} />*/}
      </>
  );
}