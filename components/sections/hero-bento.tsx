'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { ArrowRight, ArrowLeft, ArrowUpRight, MapPin, Github, Linkedin, Mail } from 'lucide-react'

interface Project {
  slug: string
  title: string
  description: string
  image: string
  tags?: string[]
  role?: string
}

interface Stats {
  yearsOfExperience: string
  projectsCompleted: string
  clientsSatisfied: string
  linesOfCode: string
}

interface HeroBentoProps {
  name: string
  title?: string
  description: string
  projects?: Project[]
  stats?: Stats
}

export function HeroBento({ name, title, description, projects, stats }: HeroBentoProps) {
  const pathname = usePathname()
  const locale = pathname.startsWith('/fa') ? 'fa' : 'en'
  const isRTL = locale === 'fa'
  const t = useTranslations('home')

  const firstName = locale === 'fa' ? name : name.split(' ')[0]
  const lastName = locale === 'fa' ? '' : (name.split(' ')[1] ?? '')
  const featured = projects?.[0]
  const rest = projects?.slice(1, 3) ?? []

  return (
    <section className="pt-[88px] pb-16 dot-pattern">
      <div className="page-container">
        <div className="bento-grid">

          {/* ── Bio card ── */}
          <div className="col-span-12 lg:col-span-7 bento bento-tall flex flex-col relative">
            <span className="x tl" />
            <span className="x tr" />
            <span className="x bl" />
            <span className="x br" />

            <div className="bento-kind">
              {locale === 'fa' ? 'معرفی' : 'Introduction'}
            </div>

            <div className="flex items-center gap-2.5 mb-5">
              <span className="status-dot" />
              <span className="eyebrow">
                {locale === 'fa' ? 'آماده پروژه جدید' : 'Available for new projects'}
              </span>
            </div>

            <h1
              className="text-[clamp(2rem,5vw,3.2rem)] font-semibold leading-[1.1] mb-4"
              style={{ color: 'var(--fg)', letterSpacing: '-0.04em' }}
            >
              {firstName}
              {lastName && (
                <span style={{ color: 'var(--fg-3)' }}> {lastName}</span>
              )}
            </h1>

            {title && (
              <span className="chip chip-accent mb-5 self-start">{title}</span>
            )}

            <p
              className="mb-8 max-w-md"
              style={{ fontSize: '15px', lineHeight: 1.65, color: 'var(--fg-3)' }}
            >
              {description.split('.')[0]}.
            </p>

            <div className="flex flex-wrap gap-3 mb-6">
              <Link
                href={`/${locale}/projects`}
                className="btn-accent"
              >
                {locale === 'fa' ? 'نمونه کارها' : 'View projects'}
                {isRTL ? <ArrowLeft className="h-4 w-4" /> : <ArrowRight className="h-4 w-4" />}
              </Link>
              <a
                href="mailto:benyaminrmb@gmail.com"
                className="btn-ghost"
              >
                {locale === 'fa' ? 'تماس با من' : 'Get in touch'}
              </a>
            </div>

            <div className="mt-auto bento-foot flex flex-wrap items-center gap-4">
              <span className="bento-meta">
                <MapPin className="h-3 w-3" />
                {locale === 'fa' ? 'تهران، ایران' : 'Tehran, Iran'}
              </span>
              {stats && (
                <span className="bento-meta">
                  {stats.yearsOfExperience}+{' '}
                  {locale === 'fa' ? 'سال تجربه' : 'yrs experience'}
                </span>
              )}
              <div className="flex items-center gap-1.5 ms-auto">
                {[
                  { href: 'https://github.com/benyaminrmb', Icon: Github, label: 'GitHub' },
                  { href: 'https://linkedin.com/in/benyaminrmb', Icon: Linkedin, label: 'LinkedIn' },
                  { href: 'mailto:benyaminrmb@gmail.com', Icon: Mail, label: 'Email' },
                ].map(({ href, Icon, label }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    target={href.startsWith('http') ? '_blank' : undefined}
                    rel="noreferrer"
                    className="flex items-center justify-center w-7 h-7 rounded-md transition-colors"
                    style={{
                      border: '1px solid var(--clr-border)',
                      color: 'var(--fg-4)',
                    }}
                  >
                    <Icon className="h-3.5 w-3.5" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* ── Stats column ── */}
          <div className="col-span-12 lg:col-span-5 grid grid-rows-2 gap-3.5">
            {stats ? (
              <>
                <div className="bento bento-gridded flex flex-col justify-between">
                  <span className="bento-kind">
                    {locale === 'fa' ? 'پروژه‌ها' : 'Projects'}
                  </span>
                  <div>
                    <p
                      className="text-5xl font-bold"
                      style={{ color: 'var(--clr-accent)', letterSpacing: '-0.05em' }}
                    >
                      {stats.projectsCompleted}
                    </p>
                    <p className="bento-desc mt-1">
                      {locale === 'fa' ? 'پروژه تکمیل‌شده' : 'projects completed'}
                    </p>
                  </div>
                </div>

                <div className="bento flex flex-col justify-between">
                  <span className="bento-kind">
                    {locale === 'fa' ? 'تجربه' : 'Experience'}
                  </span>
                  <div>
                    <p
                      className="text-5xl font-bold"
                      style={{ color: 'var(--fg)', letterSpacing: '-0.05em' }}
                    >
                      {stats.yearsOfExperience}
                      <span className="text-2xl" style={{ color: 'var(--fg-3)' }}>+</span>
                    </p>
                    <p className="bento-desc mt-1">
                      {locale === 'fa' ? 'سال تجربه حرفه‌ای' : 'years of professional experience'}
                    </p>
                  </div>
                </div>
              </>
            ) : (
              <div className="bento row-span-2" />
            )}
          </div>

          {/* ── Featured project card ── */}
          {featured && (
            <Link
              href={`/${locale}/projects/${featured.slug}`}
              className="col-span-12 md:col-span-6 bento bento-link bento-tall flex flex-col"
            >
              <span className="bento-arrow">
                <ArrowUpRight className="h-4 w-4" />
              </span>

              {featured.image && (
                <div className="relative w-full h-32 rounded-md overflow-hidden mb-4" style={{ background: 'var(--bg-3)' }}>
                  <Image
                    src={featured.image}
                    alt={featured.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              )}

              <span className="bento-kind">
                {locale === 'fa' ? 'پروژه برگزیده' : 'Featured project'}
              </span>
              <h3 className="bento-title">{featured.title}</h3>
              <p className="bento-desc line-clamp-2">{featured.description}</p>

              <div className="bento-foot flex flex-wrap gap-1.5">
                {featured.tags?.slice(0, 3).map((tag) => (
                  <span key={tag} className="chip">{tag}</span>
                ))}
                {featured.role && (
                  <span className="chip chip-accent ms-auto">{featured.role}</span>
                )}
              </div>
            </Link>
          )}

          {/* ── More projects card ── */}
          {rest.length > 0 && (
            <Link
              href={`/${locale}/projects`}
              className="col-span-12 md:col-span-6 bento bento-link flex flex-col justify-between"
            >
              <span className="bento-arrow">
                <ArrowUpRight className="h-4 w-4" />
              </span>

              <div>
                <span className="bento-kind">
                  {locale === 'fa' ? 'سایر کارها' : 'More work'}
                </span>
                <h3 className="bento-title">
                  {locale === 'fa'
                    ? `${(projects?.length ?? 0) - 1}+ پروژه دیگر`
                    : `${(projects?.length ?? 0) - 1}+ more projects`}
                </h3>
                <ul className="space-y-2 mt-3">
                  {rest.map((p) => (
                    <li key={p.slug} className="bento-desc flex items-center gap-2">
                      <span
                        className="w-1 h-1 rounded-full flex-shrink-0"
                        style={{ background: 'var(--clr-accent)' }}
                      />
                      {p.title}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bento-foot">
                <span className="eyebrow">
                  {locale === 'fa' ? 'مشاهده همه' : 'View all projects →'}
                </span>
              </div>
            </Link>
          )}

        </div>
      </div>
    </section>
  )
}
