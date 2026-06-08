'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { ArrowUpRight, ArrowRight, ArrowLeft } from 'lucide-react'

interface Project {
  id: number
  slug: string
  title: string
  description: string
  image: string
  tags?: string[]
  role?: string
  category?: string
}

interface ProjectsBentoProps {
  projects: Project[]
}

export function ProjectsBento({ projects }: ProjectsBentoProps) {
  const pathname = usePathname()
  const locale = pathname.startsWith('/fa') ? 'fa' : 'en'
  const isRTL = locale === 'fa'

  const featured = projects[0]
  const secondary = projects.slice(1, 3)
  const rest = projects.slice(3)

  const colSpanFor = (index: number) => {
    if (index === 0) return 'col-span-12 md:col-span-6 lg:col-span-8 bento-xtall'
    return 'col-span-12 md:col-span-6 lg:col-span-4 bento-tall'
  }

  return (
    <section className="pb-16">
      <div className="page-container">

        {/* Section label */}
        <div className="flex items-center gap-3 mb-8">
          <span className="eyebrow">
            {locale === 'fa' ? 'نمونه کارها' : 'Selected work'}
          </span>
          <hr className="flex-1" style={{ borderColor: 'var(--clr-border)' }} />
          <Link
            href={`/${locale}/projects`}
            className="flex items-center gap-1.5 text-xs transition-colors"
            style={{ color: 'var(--fg-4)' }}
          >
            {locale === 'fa' ? 'همه' : 'All'}
            {isRTL ? <ArrowLeft className="h-3 w-3" /> : <ArrowRight className="h-3 w-3" />}
          </Link>
        </div>

        <div className="bento-grid">

          {/* ── Featured project ── */}
          {featured && (
            <Link
              href={`/${locale}/projects/${featured.slug}`}
              className={`${colSpanFor(0)} bento bento-link flex flex-col`}
            >
              <span className="bento-arrow">
                <ArrowUpRight className="h-4 w-4" />
              </span>

              <div
                className="relative w-full rounded-md overflow-hidden mb-4 flex-shrink-0"
                style={{ height: '180px', background: 'var(--bg-3)' }}
              >
                <Image
                  src={featured.image}
                  alt={featured.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 60vw"
                />
              </div>

              <span className="bento-kind">
                {featured.category ?? (locale === 'fa' ? 'وب' : 'Web')}
              </span>
              <h3 className="bento-title">{featured.title}</h3>
              <p className="bento-desc line-clamp-3 flex-1">{featured.description}</p>

              <div className="bento-foot flex flex-wrap gap-1.5">
                {featured.tags?.slice(0, 4).map((tag) => (
                  <span key={tag} className="chip">{tag}</span>
                ))}
                {featured.role && (
                  <span className="chip chip-accent ms-auto">{featured.role}</span>
                )}
              </div>
            </Link>
          )}

          {/* ── Secondary projects ── */}
          <div className="col-span-12 lg:col-span-4 flex flex-col gap-3.5">
            {secondary.map((project) => (
              <Link
                key={project.id}
                href={`/${locale}/projects/${project.slug}`}
                className="bento bento-link bento-tall flex flex-col"
              >
                <span className="bento-arrow">
                  <ArrowUpRight className="h-4 w-4" />
                </span>

                <span className="bento-kind">
                  {project.category ?? (locale === 'fa' ? 'وب' : 'Web')}
                </span>
                <h3 className="bento-title">{project.title}</h3>
                <p className="bento-desc line-clamp-3 flex-1">{project.description}</p>

                <div className="bento-foot flex flex-wrap gap-1.5">
                  {project.tags?.slice(0, 3).map((tag) => (
                    <span key={tag} className="chip">{tag}</span>
                  ))}
                </div>
              </Link>
            ))}
          </div>

          {/* ── Remaining projects (if any) ── */}
          {rest.map((project) => (
            <Link
              key={project.id}
              href={`/${locale}/projects/${project.slug}`}
              className="col-span-12 md:col-span-6 lg:col-span-4 bento bento-link flex flex-col"
            >
              <span className="bento-arrow">
                <ArrowUpRight className="h-4 w-4" />
              </span>
              <span className="bento-kind">
                {project.category ?? (locale === 'fa' ? 'وب' : 'Web')}
              </span>
              <h3 className="bento-title">{project.title}</h3>
              <p className="bento-desc line-clamp-2 flex-1">{project.description}</p>
              <div className="bento-foot flex flex-wrap gap-1.5">
                {project.tags?.slice(0, 3).map((tag) => (
                  <span key={tag} className="chip">{tag}</span>
                ))}
              </div>
            </Link>
          ))}

          {/* ── View all CTA ── */}
          <Link
            href={`/${locale}/projects`}
            className="col-span-12 bento bento-link flex items-center justify-between py-4"
            style={{ minHeight: 'auto' }}
          >
            <span className="text-sm" style={{ color: 'var(--fg-3)' }}>
              {locale === 'fa' ? 'مشاهده همه پروژه‌ها' : 'View all projects'}
            </span>
            <span className="bento-arrow static" style={{ position: 'static', color: 'var(--clr-accent)' }}>
              <ArrowUpRight className="h-4 w-4" />
            </span>
          </Link>

        </div>
      </div>
    </section>
  )
}
