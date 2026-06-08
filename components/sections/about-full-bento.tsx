'use client'

import { usePathname } from 'next/navigation'
import { Sparkles, Youtube } from 'lucide-react'

interface SkillGroup {
  group: string
  items: string[]
}

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

interface Teaching {
  title: string
  description: string
  link: string
  period: string
}

interface AboutFullBentoProps {
  description: string
  availability?: string
  skillGroups: SkillGroup[]
  languages: Language[]
  stats: Stats
  teaching?: Teaching
}

export function AboutFullBento({
  description,
  availability,
  skillGroups,
  languages,
  stats,
  teaching,
}: AboutFullBentoProps) {
  const pathname = usePathname()
  const locale = pathname.startsWith('/fa') ? 'fa' : 'en'

  const statItems = [
    { value: stats.yearsOfExperience + '+', label: locale === 'fa' ? 'سال تجربه' : 'Years exp.' },
    { value: stats.projectsCompleted, label: locale === 'fa' ? 'پروژه' : 'Projects' },
    { value: stats.clientsSatisfied, label: locale === 'fa' ? 'مشتری' : 'Clients' },
    { value: stats.linesOfCode, label: locale === 'fa' ? 'خط کد' : 'Lines' },
  ]

  return (
    <section className="pt-[88px] pb-16 dot-pattern">
      <div className="page-container">

        {/* ── Page head ── */}
        <div className="mb-8 max-w-2xl">
          <span className="eyebrow">{locale === 'fa' ? 'درباره' : 'About'}</span>
          <h1
            className="text-[clamp(1.8rem,4vw,2.6rem)] font-semibold leading-[1.1] mt-2"
            style={{ color: 'var(--fg)', letterSpacing: '-0.04em' }}
          >
            {locale === 'fa' ? 'درباره من.' : 'About me.'}
          </h1>
        </div>

        <div className="bento-grid">

          {/* ── Bio ── */}
          <div className="col-span-12 lg:col-span-8 bento bento-tall flex flex-col relative">
            <span className="x tl" />
            <span className="x br dim" />
            <span className="bento-kind">{locale === 'fa' ? 'بیوگرافی' : 'Bio'}</span>
            <p style={{ fontSize: 'clamp(15px, 2vw, 18px)', lineHeight: 1.7, color: 'var(--fg-2)' }}>
              {description}
            </p>
            {availability && (
              <div className="mt-auto bento-foot flex items-center gap-2.5">
                <span className="status-dot" />
                <span className="eyebrow">{availability}</span>
              </div>
            )}
          </div>

          {/* ── Languages ── */}
          <div className="col-span-12 lg:col-span-4 bento flex flex-col">
            <span className="bento-kind">{locale === 'fa' ? 'زبان‌ها' : 'Languages'}</span>
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
            <div key={s.label} className="col-span-6 md:col-span-3 bento bento-gridded flex flex-col justify-between">
              <span className="bento-kind">{s.label}</span>
              <p className="text-4xl font-bold" style={{ color: 'var(--fg)', letterSpacing: '-0.04em' }}>
                {s.value}
              </p>
            </div>
          ))}

          {/* ── Skill groups ── */}
          {skillGroups.map((g, i) => (
            <div key={g.group} className="col-span-12 md:col-span-6 bento flex flex-col relative">
              {i === 0 && <span className="x tl" />}
              <span className="bento-kind">
                <Sparkles className="h-3 w-3" />
                {g.group}
              </span>
              <div className="flex flex-wrap gap-2">
                {g.items.map((item) => (
                  <span key={item} className="chip">{item}</span>
                ))}
              </div>
            </div>
          ))}

          {/* ── Teaching / content ── */}
          {teaching && (
            <a
              href={teaching.link}
              target="_blank"
              rel="noreferrer"
              className="col-span-12 bento bento-link flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
            >
              <div className="flex items-start gap-3">
                <Youtube className="h-5 w-5 mt-0.5 shrink-0" style={{ color: 'var(--clr-accent)' }} />
                <div>
                  <p className="bento-title mb-1">{teaching.title}</p>
                  <p className="bento-desc">{teaching.description}</p>
                </div>
              </div>
              <span className="chip chip-accent shrink-0 self-start sm:self-center">{teaching.period}</span>
            </a>
          )}
        </div>
      </div>
    </section>
  )
}
