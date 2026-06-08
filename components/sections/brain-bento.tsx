'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { Lightbulb, Youtube, Hammer } from 'lucide-react'

interface BrainItem {
  kind: 'idea' | 'youtube' | 'build'
  title: string
  body: string
  date: string
}

interface BrainBentoProps {
  brain: BrainItem[]
}

const KIND_ICON = {
  idea: Lightbulb,
  youtube: Youtube,
  build: Hammer,
} as const

export function BrainBento({ brain }: BrainBentoProps) {
  const pathname = usePathname()
  const locale = pathname.startsWith('/fa') ? 'fa' : 'en'
  const [filter, setFilter] = useState<'all' | BrainItem['kind']>('all')

  const tabs: { key: 'all' | BrainItem['kind']; label: string }[] = [
    { key: 'all', label: locale === 'fa' ? 'همه' : 'All' },
    { key: 'idea', label: locale === 'fa' ? 'ایده‌ها' : 'Ideas' },
    { key: 'youtube', label: locale === 'fa' ? 'یوتیوب' : 'YouTube' },
    { key: 'build', label: locale === 'fa' ? 'برای ساخت' : 'To build' },
  ]

  const items = filter === 'all' ? brain : brain.filter((b) => b.kind === filter)

  return (
    <section className="pt-[88px] pb-16 dot-pattern">
      <div className="page-container">

        {/* ── Page head ── */}
        <div className="mb-8 max-w-2xl">
          <span className="eyebrow">{locale === 'fa' ? 'ذهن' : 'Brain'}</span>
          <h1
            className="text-[clamp(1.8rem,4vw,2.6rem)] font-semibold leading-[1.1] mt-2 mb-3"
            style={{ color: 'var(--fg)', letterSpacing: '-0.04em' }}
          >
            {locale === 'fa' ? 'چیزهایی که در ذهنم است.' : 'Things in my head.'}
          </h1>
          <p style={{ fontSize: 14.5, lineHeight: 1.7, color: 'var(--fg-3)' }}>
            {locale === 'fa'
              ? 'فهرستی نسبتاً ساماندهی‌شده از ایده‌ها، مفاهیم یوتیوب و ابزارهایی که می‌خواهم بسازم. بر اساس تازگی مرتب شده. هیچ‌کدام تعهد نیستند.'
              : 'A loosely-curated list of ideas, YouTube concepts, and tools I want to build. Sorted by recency. Nothing here is a commitment.'}
          </p>
        </div>

        {/* ── Filter tabs ── */}
        <div className="flex flex-wrap gap-2 mb-6">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setFilter(tab.key)}
              className={filter === tab.key ? 'chip chip-accent' : 'chip'}
              style={{ cursor: 'pointer', border: filter === tab.key ? undefined : '1px solid var(--clr-border)' }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="bento-grid">
          {items.map((item, i) => {
            const Icon = KIND_ICON[item.kind]
            return (
              <div
                key={item.title}
                className="col-span-12 md:col-span-6 bento flex flex-col relative"
              >
                {i === 0 && <span className="x tl" />}
                <div className="flex items-center justify-between mb-3">
                  <span className="bento-kind">
                    <Icon className="h-3 w-3" />
                    {item.kind === 'idea'
                      ? (locale === 'fa' ? 'ایده' : 'Idea')
                      : item.kind === 'youtube'
                        ? 'YouTube'
                        : (locale === 'fa' ? 'برای ساخت' : 'To build')}
                  </span>
                  <span className="bento-meta">{item.date}</span>
                </div>
                <p className="bento-title">{item.title}</p>
                <p className="bento-desc">{item.body}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
