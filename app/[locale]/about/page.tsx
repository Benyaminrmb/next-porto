import type {Metadata} from 'next'
import {getData} from '@/lib/data'
import About from '@/components/section/about'
import Projects from '@/components/section/projects'
import Skills from '@/components/section/skills'
import Contact from '@/components/section/contact'

export const metadata: Metadata = {
  title: 'Benyamin Bolhassani - Resume',
  description:
    'A passionate web developer with experience in building social platforms and tourism-related services.',
  keywords: [
    'Benyamin Bolhassani',
    'Web Developer',
    'Resume',
    'Portfolio',
    'JavaScript',
    'Vue.js',
    'Laravel',
  ],
  authors: [
    {name: 'Benyamin Bolhassani', url: 'https://github.com/benyamhrmb'},
  ],
  openGraph: {
    title: 'Benyamin Bolhassani - Resume',
    description:
      'A passionate web developer with experience in building social platforms and tourism-related services.',
    url: 'https://benyaminrmb.ir', // Replace with your actual website URL
    siteName: 'Benyamin Bolhassani',

    locale: 'en_US',
    type: 'website',
  },
}
export default async function AboutPage() {
  const data = await getData()
  return (
    <>
      <About />
      <Projects />
      <Skills />
      <Contact />
    </>
  )
}
