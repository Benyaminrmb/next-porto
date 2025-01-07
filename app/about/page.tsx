import type {Metadata} from 'next'
import BCard from '@/components/main/b-card'
import {ProjectsSection} from '@/components/projects-section'
import {getData} from '@/lib/data'

export const metadata: Metadata = {
  title: 'About Benyamin Bolhassani',
  description: '...',
}
export default async function About() {
  const data = await getData();
  return <>
  <BCard>
    <ProjectsSection projects={data.projects} />
  </BCard>
  </>
}
