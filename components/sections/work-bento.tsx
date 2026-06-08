'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ArrowUpRight } from 'lucide-react'

interface Project {
  id: number
  slug: string
  title: string
  description: string
  tags?: string[]
  role?: string
  category?: string
  year?: string
}

interface WorkBentoProps {
  projects: Project[]
}

export function WorkBento({ projects }: WorkBentoProps) {
  const pathname = usePathname()
  const locale = pathname.startsWith('/fa') ? 'fa' : 'en'
  const [filter, setFilter] = useState('all')

  const tags = useMemo(
    () => ['all', ...Array.from(new Set(projects.flatMap((p) => p.tags ?? [])))],
    [projects]
  )
  const filtered = filter === 'all' ? projects : projects.filter((p) => p.tags?.includes(filter))

  return (
    <section className="pt-[88px] pb-16 dot-pattern">
      <div className="page-container">

        {/* ── Page head ── */}
        <div className="mb-8 max-w-2xl">
          <span className="eyebrow">{`${locale === 'fa' ? 'پروژه‌ها' : 'PROJECTS'} · ${projects.length}`}</span>
          <h1
            className="text-[clamp(1.8rem,4vw,2.6rem)] font-semibold leading-[1.1] mt-2 mb-3"
            style={{ color: 'var(--fg)', letterSpacing: '-0.04em' }}
          >
            {locale === 'fa' ? 'نمونه کارهای منتخب' : 'Selected work'}
          </h1>
          <p style={{ fontSize: 14.5, lineHeight: 1.7, color: 'var(--fg-3)' }}>
            {locale === 'fa'
              ? 'بخشی از آنچه ساخته‌ام — کار برای کارفرما، ابزارهای داخلی و گاهی پروژه‌های جانبی که از لپ‌تاپ فرار کرده‌اند.'
              : 'A subset of what I have shipped — client work, internal tools, and the occasional side project that escaped the laptop.'}
          </p>
        </div>

        {/* ── Filter toolbar ── */}
        <div
          className="flex items-center gap-1.5 mb-6 p-2.5 rounded-[10px] flex-wrap"
          style={{ border: '1px solid var(--clr-border)', background: 'var(--bg-2)' }}
        >
          <span className="eyebrow ps-2">{locale === 'fa' ? 'فیلتر' : 'FILTER'}</span>
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => setFilter(tag)}
              className={filter === tag ? 'chip chip-accent' : 'chip'}
              style={{ cursor: 'pointer', border: filter === tag ? undefined : '1px solid transparent', background: filter === tag ? undefined : 'transparent' }}
            >
              {tag === 'all' ? `${locale === 'fa' ? 'همه' : 'all'} (${projects.length})` : tag}
            </button>
          ))}
        </div>

        <div className="bento-grid">
          {filtered.map((project, i) => (
            <Link
              key={project.id}
              href={`/${locale}/projects/${project.slug}`}
              className="col-span-12 md:col-span-6 bento bento-link bento-tall flex flex-col relative"
            >
              {i === 0 && <span className="x tl" />}
              <span className="bento-arrow">
                <ArrowUpRight className="h-4 w-4" />
              </span>

              <div className="flex items-center justify-between mb-2">
                <span className="bento-kind">
                  {project.role ?? (locale === 'fa' ? 'وب' : 'Web')}
                </span>
                {project.year && <span className="bento-meta">{project.year}</span>}
              </div>

              <h3 className="bento-title">{project.title}</h3>
              <p className="bento-desc line-clamp-3 flex-1">{project.description}</p>

              <div className="bento-foot flex flex-wrap gap-1.5">
                {project.tags?.slice(0, 4).map((tag) => (
                  <span key={tag} className="chip">{tag}</span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
