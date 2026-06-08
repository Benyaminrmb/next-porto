'use client'

import { usePathname } from 'next/navigation'
import { Download, MapPin, Mail, GraduationCap, Briefcase } from 'lucide-react'

interface Experience {
  id: number
  title: string
  company: string
  location: string
  period: string
  description: string[]
  technologies?: string[]
}

interface SkillGroup {
  group: string
  items: string[]
}

interface Language {
  name: string
  level: string
  flag?: string
}

interface ResumeBentoProps {
  description: string
  workExperience: Experience[]
  education: Experience[]
  skillGroups: SkillGroup[]
  languages: Language[]
  contact: { email: string; location?: string }
  details?: { born: string; status: string; military: string }
}

export function ResumeBento({
  description,
  workExperience,
  education,
  skillGroups,
  languages,
  contact,
  details,
}: ResumeBentoProps) {
  const pathname = usePathname()
  const locale = pathname.startsWith('/fa') ? 'fa' : 'en'
  const isRTL = locale === 'fa'

  return (
    <section className="pt-[88px] pb-16 dot-pattern">
      <div className="page-container">

        {/* ── Page head ── */}
        <div className="flex items-end justify-between gap-6 mb-8 flex-wrap">
          <div>
            <span className="eyebrow">{locale === 'fa' ? 'رزومه' : 'Resume'}</span>
            <h1
              className="text-[clamp(1.8rem,4vw,2.6rem)] font-semibold leading-[1.1] mt-2"
              style={{ color: 'var(--fg)', letterSpacing: '-0.04em' }}
            >
              {locale === 'fa' ? 'شش سال تحویل نرم‌افزار — نسخه کامل.' : 'Six years of shipping software — the long form.'}
            </h1>
          </div>
          <a href="/resume.pdf" download className="btn-accent shrink-0">
            <Download className="h-3.5 w-3.5" />
            {locale === 'fa' ? 'دانلود PDF' : 'Download PDF'}
          </a>
        </div>

        <div className="bento-grid">

          {/* ── Bio ── */}
          <div className="col-span-12 lg:col-span-8 bento flex flex-col relative">
            <span className="x tl" />
            <span className="x br dim" />
            <span className="bento-kind">{locale === 'fa' ? 'بیوگرافی' : 'Bio'}</span>
            <p style={{ fontSize: 14.5, lineHeight: 1.7, color: 'var(--fg-2)' }}>
              {description}
            </p>
          </div>

          {/* ── Contact / details ── */}
          <div className="col-span-12 lg:col-span-4 bento flex flex-col">
            <span className="bento-kind">{locale === 'fa' ? 'اطلاعات' : 'Details'}</span>
            <ul className="space-y-2.5 text-sm" style={{ color: 'var(--fg-3)' }}>
              <li className="flex items-center gap-2">
                <Mail className="h-3.5 w-3.5" style={{ color: 'var(--fg-4)' }} />
                {contact.email}
              </li>
              {contact.location && (
                <li className="flex items-center gap-2">
                  <MapPin className="h-3.5 w-3.5" style={{ color: 'var(--fg-4)' }} />
                  {contact.location}
                </li>
              )}
              {details && (
                <>
                  <li className="flex items-center justify-between">
                    <span>{locale === 'fa' ? 'تولد' : 'Born'}</span>
                    <span className="chip">{details.born}</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>{locale === 'fa' ? 'وضعیت تأهل' : 'Status'}</span>
                    <span className="chip">{details.status}</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>{locale === 'fa' ? 'خدمت سربازی' : 'Military'}</span>
                    <span className="chip">{details.military}</span>
                  </li>
                </>
              )}
            </ul>
          </div>

          {/* ── Experience timeline ── */}
          <div className="col-span-12 lg:col-span-8 bento bento-tall flex flex-col relative">
            <span className="x tl" />
            <span className="bento-kind">
              <Briefcase className="h-3 w-3" />
              {locale === 'fa' ? 'تجربه کاری' : 'Experience'}
            </span>
            <div className="space-y-6">
              {workExperience.map((job) => (
                <div key={job.id} className="relative ps-5" style={{ borderInlineStart: '1px dashed var(--clr-border-2)' }}>
                  <span
                    className="absolute top-1.5 h-1.5 w-1.5 rounded-full"
                    style={{ background: 'var(--clr-accent)', insetInlineStart: -4 }}
                  />
                  <div className="flex flex-wrap items-baseline justify-between gap-2 mb-1.5">
                    <p className="bento-title mb-0">{job.title}</p>
                    <span className="bento-meta">{job.period}</span>
                  </div>
                  <p className="text-sm mb-2" style={{ color: 'var(--fg-3)' }}>
                    {job.company} · {job.location}
                  </p>
                  <ul className="space-y-1.5 mb-3">
                    {job.description.map((line, i) => (
                      <li key={i} className="bento-desc flex gap-2">
                        <span style={{ color: 'var(--clr-accent)' }}>—</span>
                        <span>{line}</span>
                      </li>
                    ))}
                  </ul>
                  {job.technologies && (
                    <div className="flex flex-wrap gap-1.5">
                      {job.technologies.map((tech) => (
                        <span key={tech} className="chip">{tech}</span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* ── Sidebar: skills + education + languages ── */}
          <div className="col-span-12 lg:col-span-4 flex flex-col gap-[14px]">
            <div className="bento flex flex-col">
              <span className="bento-kind">{locale === 'fa' ? 'مهارت‌ها' : 'Skills'}</span>
              <div className="space-y-4">
                {skillGroups.map((g) => (
                  <div key={g.group}>
                    <p className="bento-meta mb-2">{g.group}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {g.items.map((item) => (
                        <span key={item} className="chip">{item}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bento flex flex-col">
              <span className="bento-kind">
                <GraduationCap className="h-3 w-3" />
                {locale === 'fa' ? 'تحصیلات' : 'Education'}
              </span>
              <div className="space-y-4">
                {education.map((edu) => (
                  <div key={edu.id}>
                    <div className="flex flex-wrap items-baseline justify-between gap-2 mb-1">
                      <p className="bento-title mb-0" style={{ fontSize: 15 }}>{edu.title}</p>
                      <span className="bento-meta">{edu.period}</span>
                    </div>
                    <p className="bento-desc">{edu.company} · {edu.location}</p>
                  </div>
                ))}
              </div>
            </div>

            {languages.length > 0 && (
              <div className="bento flex flex-col">
                <span className="bento-kind">{locale === 'fa' ? 'زبان‌ها' : 'Languages'}</span>
                <ul className="space-y-2.5">
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
            )}
          </div>

        </div>
      </div>
    </section>
  )
}
