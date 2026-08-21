import type { Metadata } from 'next';
import { getAllPosts } from '@/lib/blog';
import { getData } from '@/lib/data';
import { BlogEditorial } from '@/components/sections/editorial';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const data = await getData(locale);
  return {
    title: `Blog | ${data.name}`,
    description: data.description,
  };
}

export default async function BlogPage({ params }: PageProps) {
  const { locale } = await params;
  const posts = getAllPosts(locale);

  return (
    <main>
      <BlogEditorial posts={posts} locale={locale} />
    </main>
  );
}
