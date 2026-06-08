import type { Metadata } from 'next';
import { getAllPosts } from '@/lib/blog';
import { getData } from '@/lib/data';
import { BlogListingBento } from '@/components/sections/blog-listing-bento';

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
  await params;
  const posts = getAllPosts();

  return (
    <main>
      <BlogListingBento posts={posts} />
    </main>
  );
}
