import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getPostBySlug, getAllPostSlugs } from '@/lib/blog';
import { Button } from '@/components/ui/heroui-wrappers';
import { ArrowLeft, ArrowRight, Calendar, Clock, User, Tag, BookOpen } from 'lucide-react';

interface PageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllPostSlugs();
  const locales = ['en', 'fa'];

  return locales.flatMap((locale) =>
    slugs.map((slug) => ({
      locale,
      slug,
    }))
  );
}

const components = {
  h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1 className="text-3xl font-bold mt-10 mb-4 text-white" {...props} />
  ),
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 className="text-2xl font-bold mt-8 mb-4 text-white" {...props} />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 className="text-xl font-semibold mt-6 mb-3 text-white" {...props} />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="text-white/60 leading-relaxed mb-4" {...props} />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="list-disc list-inside mb-4 space-y-2 text-white/60" {...props} />
  ),
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className="list-decimal list-inside mb-4 space-y-2 text-white/60" {...props} />
  ),
  li: (props: React.HTMLAttributes<HTMLLIElement>) => (
    <li className="text-white/60" {...props} />
  ),
  code: (props: React.HTMLAttributes<HTMLElement>) => {
    const isInline = typeof props.children === 'string' && !props.children.includes('\n');
    if (isInline) {
      return (
        <code className="px-1.5 py-0.5 rounded bg-primary/10 text-primary text-sm font-mono border border-primary/20" {...props} />
      );
    }
    return <code className="text-white/80" {...props} />;
  },
  pre: (props: React.HTMLAttributes<HTMLPreElement>) => (
    <pre className="mb-6 p-4 rounded-xl bg-black/40 border border-white/[0.08] overflow-x-auto font-mono text-sm" {...props} />
  ),
  blockquote: (props: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote className="border-l-2 border-primary pl-4 italic text-white/50 mb-4" {...props} />
  ),
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a className="text-primary hover:text-primary/80 underline underline-offset-2" {...props} />
  ),
};

export default async function BlogPostPage({ params }: PageProps) {
  const { locale, slug } = await params;
  const t = await getTranslations('pages.blog');
  const post = getPostBySlug(slug);
  const isRTL = locale === 'fa';

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen">
      <section className="section-padding relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[150px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-secondary/10 rounded-full blur-[120px]" />
        </div>

        <div className="max-w-3xl mx-auto px-5 sm:px-8 relative">
          {/* Back Button */}
          <Link
            href={`/${locale}/blog`}
            className="inline-flex items-center gap-2 text-white/50 hover:text-primary transition-colors mb-10"
          >
            {isRTL ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
            {t('backToBlog')}
          </Link>

          {/* Article Header */}
          <header className="mb-10">
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 border border-primary/20 text-primary"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-6">
              {isRTL && post.titleFa ? post.titleFa : post.title}
            </h1>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-white/40">
              <span className="flex items-center gap-2">
                <User className="w-4 h-4" />
                {post.author}
              </span>
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {new Date(post.date).toLocaleDateString(locale === 'fa' ? 'fa-IR' : 'en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {post.readingTime} {t('minRead')}
              </span>
            </div>
          </header>

          {/* Featured Image */}
          {post.image && (
            <div className="relative aspect-video rounded-2xl overflow-hidden mb-10 glass-card">
              <Image
                src={post.image}
                alt={isRTL && post.titleFa ? post.titleFa : post.title}
                fill
                className="object-cover"
                unoptimized
              />
            </div>
          )}

          {/* Content */}
          <article className="prose prose-lg max-w-none">
            <MDXRemote source={post.content} components={components} />
          </article>

          {/* Footer */}
          <div className="mt-16 pt-8 border-t border-white/[0.08]">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 text-xs font-medium rounded-full bg-white/[0.03] border border-white/[0.08] text-white/60 flex items-center gap-1.5"
                  >
                    <Tag className="w-3 h-3" />
                    {tag}
                  </span>
                ))}
              </div>

              <Button
                as={Link}
                href={`/${locale}/blog`}
                variant="flat"
                className="bg-white/[0.03] border border-white/[0.08] text-white hover:border-primary/30"
              >
                {t('backToBlog')}
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
