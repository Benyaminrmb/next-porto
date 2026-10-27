import Link from 'next/link'
import {ArrowDown, ArrowUpRight, Download, Mail} from 'lucide-react'
import type {PortfolioData} from '@/lib/data'

const copy = {
  en: {
    available: 'Open to new opportunities',
    intro: 'PHP · LARAVEL · FULL-STACK ENGINEERING',
    headline: <>I build software that makes <span>complex work feel simple.</span></>,
    work: 'Explore selected work', contact: 'Get in touch', download: 'Download résumé',
    selected: 'Selected work', workTitle: 'Products built around real work.',
    workBody: 'Reservation systems, health applications, and tools for teams.',
    experience: 'Experience', experienceTitle: 'Seven years, working across the stack.',
    skills: 'The stack', skillsTitle: 'Tools I use to get useful software into production.',
    contactTitle: 'Have a product to build or a hard problem to solve?',
    contactBody: 'I’m open to software engineering roles and focused collaborations.',
    email: 'Send me an email', resume: 'Full résumé',
    proof: ['years building software', 'queries reduced on a critical route', 'teams led'],
    details: 'View project',
  },
  fa: {
    available: 'آماده همکاری در موقعیت‌های جدید',
    intro: 'PHP · LARAVEL · FULL-STACK ENGINEERING',
    headline: <>نرم‌افزاری می‌سازم که <span>کارهای پیچیده را ساده می‌کند.</span></>,
    work: 'دیدن پروژه‌های منتخب', contact: 'در تماس باشیم', download: 'دانلود رزومه',
    selected: 'پروژه‌های منتخب', workTitle: 'محصولاتی برای حل مسئله‌های واقعی.',
    workBody: 'پلتفرم‌های رزرو، اپلیکیشن‌های سلامت و ابزارهای تیمی.',
    experience: 'تجربه کاری', experienceTitle: 'هفت سال کار در بخش‌های مختلف توسعه نرم‌افزار.',
    skills: 'تکنولوژی‌ها', skillsTitle: 'ابزارهایی که با آن‌ها نرم‌افزار را به Production می‌رسانم.',
    contactTitle: 'پروژه‌ای برای ساختن یا مسئله‌ای جدی برای حل کردن دارید؟',
    contactBody: 'برای موقعیت‌های مهندسی نرم‌افزار و همکاری‌های محدود آماده گفت‌وگو هستم.',
    email: 'ارسال ایمیل', resume: 'رزومه کامل',
    proof: ['سال تجربه', 'کوئری در یک Route مهم', 'توسعه‌دهنده در تیم'],
    details: 'مشاهده پروژه',
  },
}

export function PortfolioHome({data, locale}: {data: PortfolioData; locale: string}) {
  const fa = locale === 'fa'
  const t = copy[fa ? 'fa' : 'en']
  const projects = data.projects.slice(0, 7)
  return (
    <main className="folio">
      <section className="folio-hero shell">
        <div className="folio-hero-orbit" aria-hidden="true"><span>BB</span></div>
        <div className="folio-hero-copy">
          <p className="folio-status"><i />{t.available}</p>
          <p className="folio-overline">{t.intro}</p>
          <h1>{t.headline}</h1>
          <p className="folio-lede">{data.description}</p>
          <div className="folio-actions">
            <a className="folio-button folio-button-primary" href="#work">{t.work}<ArrowDown size={16}/></a>
            <a className="folio-button" href={`mailto:${data.contact.email}`}>{t.contact}<Mail size={16}/></a>
            <a className="folio-download" href="/resume.pdf" download><Download size={15}/>{t.download}</a>
          </div>
        </div>
        <div className="folio-proof">
          {[data.stats.yearsOfExperience, data.stats.queryReduction, '4'].map((value, i) => <div key={i}><strong dir="ltr">{value}</strong><span>{t.proof[i]}</span></div>)}
        </div>
        <span className="folio-hero-index">01 / 04</span>
      </section>

      <section className="folio-section shell" id="work">
        <header className="folio-heading"><div><p className="folio-label">01 — {t.selected}</p><h2>{t.workTitle}</h2></div><p>{t.workBody}</p></header>
        <div className="folio-project-grid">
          {projects.map((project, i) => <article className={`folio-project folio-project-${i + 1}`} key={project.slug}>
            <div className="folio-project-top"><span>{String(i + 1).padStart(2, '0')}</span><span>{[project.company, project.year].filter(Boolean).join(' · ')}</span></div>
            <div className="folio-project-content"><div><p className="folio-project-type">{project.tags?.slice(0, 2).join(' / ')}</p><h3>{project.title}</h3><p className="folio-project-description">{project.description}</p></div>
              <Link href={`/${locale}/projects/${project.slug}`} className="folio-project-link"><span>{t.details}</span><ArrowUpRight size={18}/></Link>
            </div>
            <div className="folio-project-tags">{project.tags?.slice(0, 4).map(tag=><span key={tag}>{tag}</span>)}</div>
            <div className="folio-project-art" aria-hidden="true"><b>{project.title.slice(0, 1)}</b><i/><i/><i/></div>
          </article>)}
        </div>
      </section>

      <section className="folio-experience" id="experience"><div className="shell">
        <header className="folio-heading"><div><p className="folio-label">02 — {t.experience}</p><h2>{t.experienceTitle}</h2></div><Link href={`/${locale}/resume`} className="folio-inline-link">{t.resume}<ArrowUpRight size={16}/></Link></header>
        <div className="folio-timeline">{data.workExperience.map((job, i)=><article key={job.id}><span className="folio-job-number">0{i+1}</span><time>{job.period}</time><div><h3>{job.title}</h3><p className="folio-company">{job.company}</p><ul>{job.description.slice(0, 4).map(item=><li key={item}>{item}</li>)}</ul><div className="folio-project-tags">{job.technologies?.slice(0, 6).map(tech=><span key={tech}>{tech}</span>)}</div></div></article>)}</div>
      </div></section>

      <section className="folio-section shell folio-stack"><header className="folio-heading"><div><p className="folio-label">03 — {t.skills}</p><h2>{t.skillsTitle}</h2></div></header><div className="folio-stack-grid">{data.skillGroups?.map(group=><article key={group.group}><h3>{group.group}</h3><div>{group.items.map(item=><span key={item}>{item}</span>)}</div></article>)}</div></section>

      <section className="folio-contact shell" id="contact"><p className="folio-label">04 — CONTACT</p><h2>{t.contactTitle}</h2><p>{t.contactBody}</p><a className="folio-button folio-button-light" href={`mailto:${data.contact.email}`}>{t.email}<ArrowUpRight size={17}/></a><div className="folio-socials">{data.contact.github && <a href={data.contact.github} target="_blank" rel="noreferrer">GitHub</a>}{data.contact.linkedin && <a href={data.contact.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>}{data.contact.youtube && <a href={data.contact.youtube} target="_blank" rel="noreferrer">YouTube</a>}</div></section>
    </main>
  )
}
