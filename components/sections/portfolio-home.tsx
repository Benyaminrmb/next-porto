import Link from 'next/link'
import {
  ArrowDownRight,
  ArrowUpRight,
  Download,
  Github,
  Linkedin,
  Mail,
} from 'lucide-react'
import type {PortfolioData} from '@/lib/data'

const copy = {
  en: {
    availability: 'Available for select opportunities',
    role: 'Full-stack software & AI engineer',
    title: (
      <>
        I build dependable software for <em>real-world problems.</em>
      </>
    ),
    intro:
      'I design and ship web products, internal platforms, and AI-powered workflows—with a focus on clarity, performance, and long-term maintainability.',
    work: 'Selected work',
    contact: 'Start a conversation',
    download: 'Download résumé',
    scroll: 'Explore',
    projectsLabel: 'Selected work',
    projectsTitle: 'A small selection of systems I’ve helped build.',
    projectsIntro:
      'Complex products made simpler, faster, and easier to operate.',
    projectLink: 'Read case study',
    allProjects: 'All projects',
    expertiseLabel: 'What I do',
    expertiseTitle: 'One engineer, from product thinking to production.',
    expertise: [
      {
        title: 'AI systems & automation',
        body: 'Multi-agent systems, LLM tooling, and practical automation that removes repetitive work from a team’s day.',
      },
      {
        title: 'Backend & architecture',
        body: 'Clear APIs, modular systems, multi-tenancy, and databases designed to remain understandable as products grow.',
      },
      {
        title: 'Product engineering',
        body: 'End-to-end product delivery with Laravel, Next.js, and Vue—from the first technical decision to a stable release.',
      },
    ],
    experienceLabel: 'Experience',
    experienceTitle: 'Building and improving web products since 2019.',
    resume: 'View full résumé',
    aboutLabel: 'Approach',
    aboutTitle: 'Simple is the result of understanding the problem well.',
    aboutBody:
      'I work close to the people using the product, ask direct questions, and reduce complexity before adding code. The goal is not just to ship—it is to leave behind a system the next engineer can confidently work with.',
    contactLabel: 'Contact',
    contactTitle: 'Have a difficult problem worth solving?',
    contactBody:
      'I’m open to remote engineering roles and a small number of focused collaborations.',
    email: 'Email me',
  },
  fa: {
    availability: 'آماده همکاری در فرصت‌های حرفه‌ای منتخب',
    role: 'مهندس نرم‌افزار؛ توسعه فول‌استک و هوش مصنوعی',
    title: (
      <>
        برای مسئله‌های واقعی، <em>راهکارهای نرم‌افزاری قابل اتکا</em> می‌سازم.
      </>
    ),
    intro:
      'محصولات وب، سامانه‌های سازمانی و فرایندهای مبتنی بر هوش مصنوعی را با تمرکز بر سادگی، کارایی و توسعه‌پذیری طراحی و پیاده‌سازی می‌کنم.',
    work: 'پروژه‌های منتخب',
    contact: 'شروع گفت‌وگو',
    download: 'دانلود رزومه',
    scroll: 'بیشتر ببینید',
    projectsLabel: 'پروژه‌های منتخب',
    projectsTitle: 'منتخبی از محصولاتی که در طراحی و توسعه آن‌ها نقش داشته‌ام.',
    projectsIntro: 'تبدیل نیازهای پیچیده به محصولاتی سریع، روشن و قابل مدیریت.',
    projectLink: 'جزئیات پروژه',
    allProjects: 'همه پروژه‌ها',
    expertiseLabel: 'چه کار می‌کنم',
    expertiseTitle: 'از شناخت مسئله تا محصولی که در دنیای واقعی کار می‌کند.',
    expertise: [
      {
        title: 'سیستم‌های هوش مصنوعی و اتوماسیون',
        body: 'طراحی سیستم‌های چندعاملی، ابزارهای مبتنی بر مدل‌های زبانی و اتوماسیون‌هایی که کارهای تکراری تیم را کاهش می‌دهند.',
      },
      {
        title: 'بک‌اند و معماری',
        body: 'طراحی API، معماری ماژولار، سامانه‌های چندمستاجری و پایگاه‌داده‌هایی که با رشد محصول همچنان قابل نگهداری می‌مانند.',
      },
      {
        title: 'مهندسی محصول',
        body: 'توسعه یکپارچه محصول با Laravel، Next.js و Vue؛ از تصمیم‌های فنی اولیه تا انتشار پایدار در محیط عملیاتی.',
      },
    ],
    experienceLabel: 'تجربه',
    experienceTitle: 'بیش از شش سال تجربه در ساخت و بهبود محصولات نرم‌افزاری.',
    resume: 'مشاهده رزومه کامل',
    aboutLabel: 'رویکرد',
    aboutTitle: 'یک محصول ساده، از درک عمیق مسئله شروع می‌شود.',
    aboutBody:
      'در کنار کاربران و تیم محصول کار می‌کنم، سؤال‌های دقیق می‌پرسم و پیش از نوشتن کد، پیچیدگی‌های غیرضروری را کنار می‌گذارم. هدفم فقط تحویل پروژه نیست؛ محصول باید برای تیم بعدی هم روشن، قابل توسعه و قابل اعتماد بماند.',
    contactLabel: 'تماس',
    contactTitle: 'برای حل یک مسئله جدی آماده‌اید؟',
    contactBody:
      'برای موقعیت‌های مهندسی دورکار و تعداد محدودی همکاری حرفه‌ای آماده گفت‌وگو هستم.',
    email: 'ارسال ایمیل',
  },
}

export function PortfolioHome({
  data,
  locale,
}: {
  data: PortfolioData
  locale: string
}) {
  const t = copy[locale === 'fa' ? 'fa' : 'en']
  const projects = data.projects.slice(0, 3)

  return (
    <main className="simple-portfolio">
      <section className="sp-hero shell">
        <div className="sp-object sp-object-grid" aria-hidden="true" />
        <div className="sp-object sp-object-ring" aria-hidden="true" />
        <div className="sp-object sp-object-dot" aria-hidden="true" />

        <div className="sp-hero-top">
          <p className="sp-availability">
            <span />
            {t.availability}
          </p>
          <p className="sp-role">{t.role}</p>
        </div>
        <h1>{t.title}</h1>
        <div className="sp-hero-bottom">
          <p>{t.intro}</p>
          <div className="sp-actions">
            <a className="sp-button sp-button-dark" href="#work">
              {t.work}
              <ArrowDownRight size={18} />
            </a>
            <a className="sp-button" href={`mailto:${data.contact.email}`}>
              {t.contact}
              <Mail size={17} />
            </a>
            <a className="sp-button" href="/resume.pdf" download>
              {t.download}
              <Download size={17} />
            </a>
          </div>
        </div>
        <a className="sp-scroll" href="#work">
          <span>{t.scroll}</span>
          <span className="sp-scroll-line" />
        </a>
      </section>

      <section className="sp-section shell" id="work">
        <header className="sp-section-heading">
          <div>
            <p className="sp-kicker">01 — {t.projectsLabel}</p>
            <h2>{t.projectsTitle}</h2>
          </div>
          <p>{t.projectsIntro}</p>
        </header>
        <div className="sp-projects">
          {projects.map((project, index) => (
            <article className="sp-project" key={project.slug}>
              <div className="sp-project-number">
                {String(index + 1).padStart(2, '0')}
              </div>
              <div className="sp-project-main">
                <div className="sp-project-meta">
                  {[project.company, project.year].filter(Boolean).join(' · ')}
                </div>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="sp-tags">
                  {project.tags?.slice(0, 4).map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </div>
              <Link
                className="sp-project-link"
                href={`/${locale}/projects/${project.slug}`}
                aria-label={`${t.projectLink}: ${project.title}`}>
                <span>{t.projectLink}</span>
                <ArrowUpRight size={20} />
              </Link>
            </article>
          ))}
        </div>
        <Link className="sp-text-link" href={`/${locale}/projects`}>
          {t.allProjects}
          <ArrowUpRight size={17} />
        </Link>
      </section>

      <section className="sp-section sp-expertise" id="expertise">
        <div className="shell">
          <header className="sp-section-heading sp-section-heading-light">
            <div>
              <p className="sp-kicker">02 — {t.expertiseLabel}</p>
              <h2>{t.expertiseTitle}</h2>
            </div>
          </header>
          <div className="sp-expertise-grid">
            {t.expertise.map((item, index) => (
              <article key={item.title}>
                <span>0{index + 1}</span>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="sp-section shell" id="experience">
        <header className="sp-section-heading">
          <div>
            <p className="sp-kicker">03 — {t.experienceLabel}</p>
            <h2>{t.experienceTitle}</h2>
          </div>
          <div className="sp-resume-actions">
            <Link className="sp-text-link" href={`/${locale}/resume`}>
              {t.resume}
              <ArrowUpRight size={17} />
            </Link>
            <a className="sp-button" href="/resume.pdf" download>
              {t.download}
              <Download size={17} />
            </a>
          </div>
        </header>
        <div className="sp-timeline">
          {data.workExperience.map((job) => (
            <article key={job.id}>
              <time>{job.period}</time>
              <div>
                <h3>{job.title}</h3>
                <p>{job.company}</p>
              </div>
              <p>{job.description[0]}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="sp-section shell sp-approach" id="about">
        <p className="sp-kicker">04 — {t.aboutLabel}</p>
        <div>
          <h2>{t.aboutTitle}</h2>
          <p>{t.aboutBody}</p>
        </div>
      </section>

      <section className="sp-contact shell" id="contact">
        <div>
          <p className="sp-kicker">05 — {t.contactLabel}</p>
          <h2>{t.contactTitle}</h2>
          <p>{t.contactBody}</p>
        </div>
        <div className="sp-contact-actions">
          <a
            className="sp-button sp-button-light"
            href={`mailto:${data.contact.email}`}>
            {t.email}
            <Mail size={17} />
          </a>
          <a href={data.contact.linkedin} aria-label="LinkedIn">
            <Linkedin size={20} />
          </a>
          <a href={data.contact.github} aria-label="GitHub">
            <Github size={20} />
          </a>
        </div>
      </section>
    </main>
  )
}
