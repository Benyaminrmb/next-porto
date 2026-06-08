'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { ArrowUpRight, ArrowRight, ArrowLeft, Clock, CalendarDays } from 'lucide-react'

export interface BlogPost {
  slug: string
  title: string
  excerpt?: string
  coverImage?: string
  category?: string
  tags?: string[]
  publishedAt?: string
  readingTime?: string
}

interface BlogBentoProps {
  posts?: BlogPost[]
}

function formatDate(dateStr: string, locale: string) {
  try {
    return new Date(dateStr).toLocaleDateString(
      locale === 'fa' ? 'fa-IR' : 'en-US',
      { year: 'numeric', month: 'short', day: 'numeric' }
    )
  } catch {
    return dateStr
  }
}

export function BlogBento({ posts = [] }: BlogBentoProps) {
  const pathname = usePathname()
  const locale = pathname.startsWith('/fa') ? 'fa' : 'en'
  const isRTL = locale === 'fa'

  const hasPosts = posts.length > 0

  return (
    <section className="pb-16">
      <div className="page-container">

        {/* Section label */}
        <div className="flex items-center gap-3 mb-8">
          <span className="eyebrow">{locale === 'fa' ? 'بلاگ' : 'Blog'}</span>
          <hr className="flex-1" style={{ borderColor: 'var(--clr-border)' }} />
          <Link
            href={`/${locale}/blog`}
            className="flex items-center gap-1.5 text-xs transition-colors"
            style={{ color: 'var(--fg-4)' }}
          >
            {locale === 'fa' ? 'همه مقالات' : 'All posts'}
            {isRTL ? <ArrowLeft className="h-3 w-3" /> : <ArrowRight className="h-3 w-3" />}
          </Link>
        </div>

        {hasPosts ? (
          <div className="bento-grid">
            {posts.slice(0, 3).map((post, i) => (
              <Link
                key={post.slug}
                href={`/${locale}/blog/${post.slug}`}
                className={`bento bento-link flex flex-col ${
                  i === 0
                    ? 'col-span-12 md:col-span-6 lg:col-span-6 bento-tall'
                    : 'col-span-12 md:col-span-6 lg:col-span-3'
                }`}
              >
                <span className="bento-arrow">
                  <ArrowUpRight className="h-4 w-4" />
                </span>

                {post.coverImage && i === 0 && (
                  <div
                    className="relative w-full rounded-md overflow-hidden mb-4 flex-shrink-0"
                    style={{ height: '140px', background: 'var(--bg-3)' }}
                  >
                    <Image
                      src={post.coverImage}
                      alt={post.title}
                      fill
                      className="object-cover"
                      sizes="50vw"
                    />
                  </div>
                )}

                {post.category && (
                  <span className="bento-kind">{post.category}</span>
                )}

                <h3 className="bento-title flex-1">{post.title}</h3>

                {post.excerpt && i === 0 && (
                  <p className="bento-desc line-clamp-2 mb-4">{post.excerpt}</p>
                )}

                <div className="bento-foot flex flex-wrap items-center gap-3">
                  {post.publishedAt && (
                    <span className="bento-meta">
                      <CalendarDays className="h-3 w-3" />
                      {formatDate(post.publishedAt, locale)}
                    </span>
                  )}
                  {post.readingTime && (
                    <span className="bento-meta">
                      <Clock className="h-3 w-3" />
                      {post.readingTime}
                    </span>
                  )}
                  {post.tags?.slice(0, 2).map((tag) => (
                    <span key={tag} className="chip">{tag}</span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        ) : (
          /* ── Empty state ── */
          <div className="bento bento-gridded flex flex-col items-center justify-center text-center py-12 relative">
            <span className="x tl dim" />
            <span className="x tr dim" />
            <span className="x bl dim" />
            <span className="x br dim" />

            <p
              className="text-5xl mb-4 select-none"
              style={{ filter: 'grayscale(1) opacity(0.4)' }}
            >
              ✍️
            </p>
            <h3 className="bento-title mb-2">
              {locale === 'fa' ? 'به زودی مقالاتی منتشر می‌شود' : 'Articles coming soon'}
            </h3>
            <p className="bento-desc max-w-sm mb-6">
              {locale === 'fa'
                ? 'در حال نوشتن مطالبی درباره توسعه وب، معماری نرم‌افزار و تجربیات کاری هستم.'
                : 'Writing about web development, software architecture, and lessons learned from real projects.'}
            </p>
            <Link href={`/${locale}/blog`} className="btn-ghost text-xs">
              {locale === 'fa' ? 'مشاهده بلاگ' : 'Visit blog'}
            </Link>
          </div>
        )}

      </div>
    </section>
  )
}
