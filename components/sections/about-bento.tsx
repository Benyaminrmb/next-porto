'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ArrowUpRight } from 'lucide-react'

interface Language {
  name: string
  level: string
  flag?: string
}

interface Stats {
  yearsOfExperience: string
  projectsCompleted: string
  clientsSatisfied: string
  linesOfCode: string
}

interface AboutBentoProps {
  description: string
  languages: Language[]
  skills: string[]
  stats: Stats
}

export function AboutBento({ description, languages, skills, stats }: AboutBentoProps) {
  const pathname = usePathname()
  const locale = pathname.startsWith('/fa') ? 'fa' : 'en'

  const statItems = [
    {
      value: stats.yearsOfExperience + '+',
      label: locale === 'fa' ? 'سال تجربه' : 'Years exp.',
    },
    {
      value: stats.projectsCompleted,
      label: locale === 'fa' ? 'پروژه' : 'Projects',
    },
    {
      value: stats.clientsSatisfied,
      label: locale === 'fa' ? 'مشتری' : 'Clients',
    },
    {
      value: stats.linesOfCode,
      label: locale === 'fa' ? 'خط کد' : 'Lines',
    },
  ]

  return (
    <section className="pb-16">
      <div className="page-container">

        {/* Section label */}
        <div className="flex items-center gap-3 mb-8">
          <span className="eyebrow">{locale === 'fa' ? 'درباره' : 'About'}</span>
          <hr className="flex-1" style={{ borderColor: 'var(--clr-border)' }} />
        </div>

        <div className="bento-grid">

          {/* ── Bio card ── */}
          <div className="col-span-12 lg:col-span-8 bento bento-tall flex flex-col relative">
            <span className="x tl" />
            <span className="x br dim" />

            <span className="bento-kind">
              {locale === 'fa' ? 'بیوگرافی' : 'Bio'}
            </span>

            <p
              className="flex-1 mb-6"
              style={{
                fontSize: 'clamp(15px, 2vw, 18px)',
                lineHeight: 1.7,
                color: 'var(--fg-2)',
              }}
            >
              {description}
            </p>

            <Link
              href={`/${locale}/about`}
              className="bento-foot flex items-center gap-2 group"
              style={{ color: 'var(--fg-3)', textDecoration: 'none', fontSize: 13 }}
            >
              <span>{locale === 'fa' ? 'بیشتر درباره من' : 'Read more about me'}</span>
              <ArrowUpRight
                className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                style={{ color: 'var(--clr-accent)' }}
              />
            </Link>
          </div>

          {/* ── Languages card ── */}
          <div className="col-span-12 lg:col-span-4 bento flex flex-col">
            <span className="bento-kind">
              {locale === 'fa' ? 'زبان‌ها' : 'Languages'}
            </span>

            <ul className="space-y-3 flex-1">
              {languages.map((lang) => (
                <li key={lang.name} className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-sm" style={{ color: 'var(--fg-2)' }}>
                    {lang.flag && <span className="text-base">{lang.flag}</span>}
                    {lang.name}
                  </span>
                  <span className="chip">{lang.level}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Stat cards ── */}
          {statItems.map((s) => (
            <div
              key={s.label}
              className="col-span-6 md:col-span-3 bento bento-gridded flex flex-col justify-between"
            >
              <span className="bento-kind">{s.label}</span>
              <p
                className="text-4xl font-bold"
                style={{ color: 'var(--fg)', letterSpacing: '-0.04em' }}
              >
                {s.value}
              </p>
            </div>
          ))}

          {/* ── Skills card ── */}
          <div className="col-span-12 bento">
            <span className="bento-kind">
              {locale === 'fa' ? 'مهارت‌ها' : 'Tech stack'}
            </span>
            <div className="flex flex-wrap gap-2 mt-2">
              {skills.map((skill) => (
                <span key={skill} className="chip">{skill}</span>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
