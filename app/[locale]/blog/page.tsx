import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import Image from 'next/image';
import { getAllPosts } from '@/lib/blog';
import { Calendar, Clock, ArrowUpRight, BookOpen } from 'lucide-react';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function BlogPage({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations('pages.blog');
  const posts = getAllPosts();
  const isRTL = locale === 'fa';

  return (
    <main className="min-h-screen">
      <section className="section-padding relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[150px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[120px]" />
          <div className="absolute inset-0 line-pattern opacity-30" />
        </div>

        <div className="section-container-wide relative">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <BookOpen className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">
                {locale === 'fa' ? 'مقالات' : 'Articles'}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
              {t('title')}
            </h1>
            <p className="text-lg text-white/50 max-w-2xl mx-auto">
              {t('description')}
            </p>
          </div>

          {/* Posts Grid */}
          {posts.length > 0 ? (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/${locale}/blog/${post.slug}`}
                  className="group block"
                >
                  <div className="h-full glass-card overflow-hidden hover-glow transition-all duration-500 group-hover:border-primary/20">
                    {/* Image */}
                    {post.image && (
                      <div className="relative aspect-[16/10] overflow-hidden bg-white/[0.02]">
                        <Image
                          src={post.image}
                          alt={isRTL && post.titleFa ? post.titleFa : post.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                          unoptimized
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                          <div className="w-10 h-10 rounded-xl bg-primary/90 backdrop-blur flex items-center justify-center shadow-lg shadow-primary/25">
                            <ArrowUpRight className="w-5 h-5 text-black" />
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Content */}
                    <div className="p-5">
                      {/* Meta */}
                      <div className="flex items-center gap-4 text-xs text-white/40 mb-3">
                        <span className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5" />
                          {new Date(post.date).toLocaleDateString(locale === 'fa' ? 'fa-IR' : 'en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                          })}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5" />
                          {post.readingTime} {t('minRead')}
                        </span>
                      </div>

                      {/* Title */}
                      <h2 className="text-lg font-bold text-white mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                        {isRTL && post.titleFa ? post.titleFa : post.title}
                      </h2>

                      {/* Description */}
                      <p className="text-white/50 text-sm line-clamp-2 mb-4">
                        {isRTL && post.descriptionFa ? post.descriptionFa : post.description}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2">
                        {post.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="px-2.5 py-1 text-xs font-medium rounded-full bg-white/[0.03] border border-white/[0.08] text-white/60"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-center">
                <BookOpen className="w-10 h-10 text-white/30" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                {locale === 'fa' ? 'هنوز پستی منتشر نشده' : 'No posts yet'}
              </h3>
              <p className="text-white/50">
                {locale === 'fa' ? 'به زودی مقالات جدید منتشر خواهد شد.' : 'New articles coming soon.'}
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
