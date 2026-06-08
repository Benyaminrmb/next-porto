'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ArrowUpRight, CalendarDays, Clock } from 'lucide-react'

interface Post {
  slug: string
  title: string
  titleFa?: string
  description: string
  descriptionFa?: string
  date: string
  tags: string[]
  readingTime: string
}

interface BlogListingBentoProps {
  posts: Post[]
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

export function BlogListingBento({ posts }: BlogListingBentoProps) {
  const pathname = usePathname()
  const locale = pathname.startsWith('/fa') ? 'fa' : 'en'
  const isRTL = locale === 'fa'

  return (
    <section className="pt-[88px] pb-16 dot-pattern">
      <div className="page-container">

        {/* ── Page head ── */}
        <div className="mb-8 max-w-2xl">
          <span className="eyebrow">{`${locale === 'fa' ? 'بلاگ' : 'BLOG'} · ${posts.length} ${locale === 'fa' ? 'مقاله' : 'POSTS'}`}</span>
          <h1
            className="text-[clamp(1.8rem,4vw,2.6rem)] font-semibold leading-[1.1] mt-2 mb-3"
            style={{ color: 'var(--fg)', letterSpacing: '-0.04em' }}
          >
            {locale === 'fa' ? 'نوشته‌ها.' : 'Writing.'}
          </h1>
          <p style={{ fontSize: 14.5, lineHeight: 1.7, color: 'var(--fg-3)' }}>
            {locale === 'fa'
              ? 'ترکیبی از مطالب: مقاله‌های بلند وقتی حرفی برای گفتن دارم، یادداشت‌های کوتاه وقتی چیزی یاد می‌گیرم که ارزش به‌خاطر سپردن دارد، و گزارش پروژه‌ها وقتی چیزی برای تحویل دارم.'
              : 'Mixed: long essays when I have something to say, short notes when I learn something worth remembering, and project logs when I get something to ship.'}
          </p>
        </div>

        {posts.length > 0 ? (
          <div className="flex flex-col">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/${locale}/blog/${post.slug}`}
                className="group grid grid-cols-1 md:grid-cols-[140px_1fr_auto] gap-4 md:gap-6 py-6 px-1 items-start transition-[padding] hover:ps-3"
                style={{ borderTop: '1px solid var(--clr-border)' }}
              >
                <div className="bento-meta flex flex-col items-start gap-1">
                  <span className="flex items-center gap-1.5">
                    <CalendarDays className="h-3 w-3" />
                    {formatDate(post.date, locale)}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="h-3 w-3" />
                    {post.readingTime} {locale === 'fa' ? 'دقیقه' : 'min read'}
                  </span>
                </div>

                <div>
                  <h2
                    className="text-[19px] font-medium leading-[1.3] mb-2 transition-colors"
                    style={{ color: 'var(--fg)', letterSpacing: '-0.015em' }}
                  >
                    <span className="group-hover:text-[var(--clr-accent)]">
                      {isRTL && post.titleFa ? post.titleFa : post.title}
                    </span>
                  </h2>
                  <p className="bento-desc mb-3" style={{ maxWidth: '60ch' }}>
                    {isRTL && post.descriptionFa ? post.descriptionFa : post.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {post.tags.map((tag) => (
                      <span key={tag} className="chip">{tag}</span>
                    ))}
                  </div>
                </div>

                <ArrowUpRight
                  className="h-4 w-4 self-center hidden md:block transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  style={{ color: 'var(--fg-4)' }}
                />
              </Link>
            ))}
            <div style={{ borderTop: '1px solid var(--clr-border)' }} />
          </div>
        ) : (
          <div className="bento bento-gridded flex flex-col items-center justify-center text-center py-16">
            <span className="bento-kind">{locale === 'fa' ? 'به‌زودی' : 'Coming soon'}</span>
            <p className="bento-desc max-w-md">
              {locale === 'fa'
                ? 'هنوز چیزی منتشر نشده — اولین نوشته به‌زودی اینجا قرار می‌گیرد.'
                : "Nothing published yet — the first post will land here soon."}
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
