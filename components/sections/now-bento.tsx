'use client'

import { usePathname } from 'next/navigation'
import { Clock } from 'lucide-react'

interface NowBentoProps {
  now: {
    updated: string
    items: { label: string; value: string }[]
  }
}

export function NowBento({ now }: NowBentoProps) {
  const pathname = usePathname()
  const locale = pathname.startsWith('/fa') ? 'fa' : 'en'

  return (
    <section className="pt-[88px] pb-16 dot-pattern">
      <div className="page-container">

        {/* ── Page head ── */}
        <div className="mb-8">
          <span className="eyebrow">/now</span>
          <h1
            className="text-[clamp(1.8rem,4vw,2.6rem)] font-semibold leading-[1.1] mt-2 mb-3"
            style={{ color: 'var(--fg)', letterSpacing: '-0.04em' }}
          >
            {locale === 'fa' ? 'الان مشغول چه کاری هستم.' : "What I'm doing now."}
          </h1>
          <p className="max-w-xl mb-3" style={{ fontSize: 14.5, lineHeight: 1.7, color: 'var(--fg-3)' }}>
            {locale === 'fa'
              ? 'صفحه‌ای الهام‌گرفته از /now درک سیورز. عکس لحظه‌ای زنده، بازنویسی‌شده نه افزوده‌شده.'
              : "A page inspired by Derek Sivers' /now. Live snapshot, re-written, not appended."}
          </p>
          <span className="bento-meta">
            <Clock className="h-3 w-3" />
            {locale === 'fa' ? `آخرین ویرایش: ${now.updated}` : `Last edited: ${now.updated}`}
          </span>
        </div>

        <div className="bento-grid">
          {now.items.map((item, i) => (
            <div
              key={item.label}
              className={`col-span-12 ${i === 0 ? 'lg:col-span-12 bento-tall' : 'md:col-span-6'} bento bento-gridded flex flex-col relative`}
            >
              {i === 0 && <span className="x tl" />}
              {i === 0 && <span className="x br dim" />}
              <span className="bento-kind">{item.label}</span>
              <p style={{ fontSize: 14.5, lineHeight: 1.7, color: 'var(--fg-2)' }}>
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
