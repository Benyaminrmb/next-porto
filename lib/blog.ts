import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';

const postsDirectory = path.join(process.cwd(), 'content/blog');

export interface BlogPost {
  slug: string;
  title: string;
  titleFa?: string;
  description: string;
  descriptionFa?: string;
  date: string;
  author: string;
  tags: string[];
  image?: string;
  readingTime: string;
  content: string;
}

export interface BlogPostMeta {
  slug: string;
  title: string;
  titleFa?: string;
  description: string;
  descriptionFa?: string;
  date: string;
  author: string;
  tags: string[];
  image?: string;
  readingTime: string;
}

export function getAllPosts(): BlogPostMeta[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);
  const posts = fileNames
    .filter((fileName) => fileName.endsWith('.mdx'))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx$/, '');
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);
      const stats = readingTime(content);

      return {
        slug,
        title: data.title || slug,
        titleFa: data.titleFa,
        description: data.description || '',
        descriptionFa: data.descriptionFa,
        date: data.date || new Date().toISOString(),
        author: data.author || 'Benyamin',
        tags: data.tags || [],
        image: data.image,
        readingTime: Math.ceil(stats.minutes).toString(),
      };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return posts;
}

export function getPostBySlug(slug: string): BlogPost | null {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.mdx`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
    const stats = readingTime(content);

    return {
      slug,
      title: data.title || slug,
      titleFa: data.titleFa,
      description: data.description || '',
      descriptionFa: data.descriptionFa,
      date: data.date || new Date().toISOString(),
      author: data.author || 'Benyamin',
      tags: data.tags || [],
      image: data.image,
      readingTime: Math.ceil(stats.minutes).toString(),
      content,
    };
  } catch {
    return null;
  }
}

export function getAllPostSlugs(): string[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames
    .filter((fileName) => fileName.endsWith('.mdx'))
    .map((fileName) => fileName.replace(/\.mdx$/, ''));
}
