'use client'

import { usePathname } from 'next/navigation'
import { Briefcase, GraduationCap } from 'lucide-react'

interface Entry {
  id: number
  title: string
  company: string
  location: string
  period: string
  description: string[]
  technologies?: string[]
}

interface ExperienceBentoProps {
  workExperience: Entry[]
  education: Entry[]
}

function Timeline({ entries, icon: Icon, kind, showCrosshair }: { entries: Entry[]; icon: typeof Briefcase; kind: string; showCrosshair?: boolean }) {
  return (
    <div className="col-span-12 lg:col-span-6 bento bento-tall flex flex-col relative">
      {showCrosshair && <span className="x tl" />}
      <span className="bento-kind">
        <Icon className="h-3 w-3" />
        {kind}
      </span>
      <div className="space-y-6">
        {entries.map((entry) => (
          <div
            key={entry.id}
            className="relative ps-5"
            style={{ borderInlineStart: '1px dashed var(--clr-border-2)' }}
          >
            <span
              className="absolute top-1.5 h-1.5 w-1.5 rounded-full"
              style={{ background: 'var(--clr-accent)', insetInlineStart: -4 }}
            />
            <div className="flex flex-wrap items-baseline justify-between gap-2 mb-1.5">
              <p className="bento-title mb-0">{entry.title}</p>
              <span className="bento-meta">{entry.period}</span>
            </div>
            <p className="text-sm mb-2" style={{ color: 'var(--fg-3)' }}>
              {entry.company} · {entry.location}
            </p>
            <ul className="space-y-1.5 mb-3">
              {entry.description.map((line, i) => (
                <li key={i} className="bento-desc flex gap-2">
                  <span style={{ color: 'var(--clr-accent)' }}>—</span>
                  <span>{line}</span>
                </li>
              ))}
            </ul>
            {entry.technologies && (
              <div className="flex flex-wrap gap-1.5">
                {entry.technologies.map((tech) => (
                  <span key={tech} className="chip">{tech}</span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export function ExperienceBento({ workExperience, education }: ExperienceBentoProps) {
  const pathname = usePathname()
  const locale = pathname.startsWith('/fa') ? 'fa' : 'en'

  return (
    <section className="pt-[88px] pb-16 dot-pattern">
      <div className="page-container">

        {/* ── Page head ── */}
        <div className="mb-8 max-w-2xl">
          <span className="eyebrow">{locale === 'fa' ? 'تجربه' : 'Experience'}</span>
          <h1
            className="text-[clamp(1.8rem,4vw,2.6rem)] font-semibold leading-[1.1] mt-2 mb-3"
            style={{ color: 'var(--fg)', letterSpacing: '-0.04em' }}
          >
            {locale === 'fa' ? 'مسیر حرفه‌ای و تحصیلات.' : 'Career and education.'}
          </h1>
          <p style={{ fontSize: 14.5, lineHeight: 1.7, color: 'var(--fg-3)' }}>
            {locale === 'fa'
              ? 'مسیر حرفه‌ای و پروژه‌های فوق‌العاده‌ای که روی آن‌ها کار کرده‌ام.'
              : "My professional journey and the projects I've worked on along the way."}
          </p>
        </div>

        <div className="bento-grid">
          <Timeline
            entries={workExperience}
            icon={Briefcase}
            kind={locale === 'fa' ? 'تجربه کاری' : 'Work experience'}
            showCrosshair
          />
          <Timeline
            entries={education}
            icon={GraduationCap}
            kind={locale === 'fa' ? 'تحصیلات' : 'Education'}
          />
        </div>
      </div>
    </section>
  )
}
