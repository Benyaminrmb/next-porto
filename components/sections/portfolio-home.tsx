import Image from 'next/image'
import {Github, Globe, Mail, MapPin, Phone, Youtube} from 'lucide-react'
import type {PortfolioData} from '@/lib/data'

const resume = {
  en: {
    role: 'PHP · Laravel Software Engineer',
    summary: 'Software engineer with about 7 years of experience designing and developing websites, applications, and web platforms, with a focus on PHP and Laravel. Experienced in backend and frontend development for CRM, reservation, education, healthcare, and management products.',
    sections: ['Work Experience', 'Selected Projects'],
    skills: 'Skills',
    education: 'Education',
    educationText: 'Computer Engineering · studies not completed\nMathematics diploma',
    languages: 'Languages',
    languagesText: 'Persian · Native\nEnglish · C2',
    more: 'Other projects',
    moreText: 'Steel Rizan: inventory and operations management, CRM and ticketing, custom formula pricing; React frontend. Idro: Node.js backend.',
    view: 'YouTube programming videos',
    projects: [
      {slug: 'eventoment', title: 'Eventoment', url: 'eventoment.com', subtitle: 'Event reservation platform', bullets: ['Laravel backend and Nuxt.js frontend; Google SSO authentication and PWA.', 'Streaming media uploads and downloads for the Android app.', 'Database management and backup; CDN monitoring with Prometheus and Grafana.']},
      {slug: 'onyar', title: 'OnYar', url: 'on-yar.com', subtitle: 'Media-centered app for rare diseases', bullets: ['Google SSO authentication.', 'Streaming uploads and downloads for faster media transfer.', 'Automated database backups on CDN; Prometheus monitoring and Grafana dashboards.']},
      {slug: 'd2type', title: 'D2Type', url: 'd2type.com', subtitle: 'Diabetes care app · Laravel', bullets: ['Health Connect on Android and HealthKit on Apple; health-data analysis.', 'Food-portion analysis and guidance on foods to eat or avoid.', 'Doctor-approved daily and weekly goals; Sentry monitoring and Telegram alerts.']},
      {slug: 'catalyst', title: 'Catalyst / Azar', url: 'app.azarpmr.ir', subtitle: 'Automotive catalyst pricing platform', bullets: ['Management panel built with Laravel, Filament, Livewire, and Alpine.js.', 'Custom, dynamic formulas for price calculation.']},
      {slug: 'sales-coaching', title: 'Sales Coaching', url: 'salescoaching.school', subtitle: 'Course sales platform', bullets: ['Laravel backend and Next.js frontend.', 'Deployed on Kubernetes.']},
    ],
    availability: 'Tehran, Iran',
  },
  fa: {
    role: 'PHP · Laravel Software Engineer',
    summary: 'مهندس نرم‌افزار با حدود ۷ سال تجربه در طراحی و توسعه وب‌سایت، اپلیکیشن و پلتفرم‌های تحت وب. تمرکز فنی من PHP و Laravel است و در توسعه Backend و Frontend برای محصولات CRM، رزرو، آموزش، سلامت و پنل‌های مدیریتی تجربه دارم.',
    sections: ['سوابق کاری', 'پروژه‌های منتخب'],
    skills: 'مهارت‌ها',
    education: 'تحصیلات',
    educationText: 'مهندسی کامپیوتر · تحصیل ناتمام\nدیپلم ریاضی',
    languages: 'زبان',
    languagesText: 'فارسی · زبان مادری\nانگلیسی · C2',
    more: 'پروژه‌های دیگر',
    moreText: 'Steel Rizan: مدیریت انبار و عملیات، CRM و Ticketing و محاسبه قیمت با فرمول‌های اختصاصی؛ توسعه Frontend با React. Idro: توسعه Backend با Node.js.',
    view: 'ویدیوهای برنامه‌نویسی',
    projects: [
      {slug: 'eventoment', title: 'Eventoment', url: 'eventoment.com', subtitle: 'پلتفرم رزرو دورهمی (Event)', bullets: ['توسعه Backend با Laravel و Frontend با Nuxt.js؛ پیاده‌سازی Authentication و SSO با Google و ساخت PWA.', 'آپلود و دانلود فایل‌های مدیا با Streaming برای انتقال سریع‌تر در اپلیکیشن Android.', 'مدیریت دیتابیس و راه‌اندازی Backup خودکار؛ Monitoring روی CDN با Prometheus و داشبوردهای Grafana.']},
      {slug: 'onyar', title: 'آن‌یار', url: 'on-yar.com', subtitle: 'اپلیکیشن مدیا محور برای بیماری‌های خاص', bullets: ['پیاده‌سازی Authentication و SSO با Google.', 'آپلود و دانلود فایل‌های مدیا با Streaming برای بهبود سرعت انتقال.', 'راه‌اندازی Backup خودکار دیتابیس روی CDN؛ Monitoring با Prometheus و داشبوردهای Grafana.']},
      {slug: 'd2type', title: 'D2Type', url: 'd2type.com', subtitle: 'اپلیکیشن بیماران دیابتی · Laravel', bullets: ['اتصال به Health Connect در Android و HealthKit در Apple و تحلیل داده‌های سلامت کاربران.', 'تحلیل Portion غذا و پیشنهاد به کاربر برای مصرف یا پرهیز از وعده‌ها.', 'تولید اهداف روزانه و هفتگی با تأیید پزشک؛ پایش خطا با Sentry و هشدار Telegram.']},
      {slug: 'catalyst', title: 'Catalyst / آذر', url: 'app.azarpmr.ir', subtitle: 'پلتفرم محاسبه قیمت کاتالیست خودرو', bullets: ['توسعه پنل مدیریت با Laravel، Filament، Livewire و Alpine.js.', 'تعریف فرمول‌های محاسباتی سفارشی و داینامیک برای قیمت‌گذاری.']},
      {slug: 'sales-coaching', title: 'Sales Coaching', url: 'salescoaching.school', subtitle: 'پلتفرم فروش دوره', bullets: ['توسعه Backend با Laravel و Frontend با Next.js.', 'Deploy روی Kubernetes.']},
    ],
    availability: 'تهران، ایران',
  },
}

export function PortfolioHome({data, locale}: {data: PortfolioData; locale: string}) {
  const fa = locale === 'fa'
  const t = resume[fa ? 'fa' : 'en']
  const contact = data.contact
  return (
    <main className="resume-page">
      <article className="resume-sheet" dir={fa ? 'rtl' : 'ltr'}>
        <header className="resume-header">
          <Image className="resume-avatar" src="/resume-avatar.png" alt={data.name} width={180} height={180} priority />
          <div className="resume-identity">
            <h1>{data.name}</h1>
            <p className="resume-role">{t.role}</p>
            <div className="resume-contact">
              {contact.github && <a href={contact.github}><Github/><span>github.com/benyaminrmb</span></a>}
              {contact.website && <a href={contact.website}><Globe/><span>benyaminrmb.ir</span></a>}
              {contact.phone && <a href={`tel:${contact.phone.replaceAll(' ', '')}`}><Phone/><span dir="ltr">09108453606</span></a>}
              <span><MapPin/><span>{t.availability}</span></span>
              <a href={`mailto:${contact.email}`}><Mail/><span>{contact.email}</span></a>
            </div>
          </div>
        </header>

        <section className="resume-summary"><p>{t.summary}</p></section>

        <section className="resume-skills" aria-label={t.skills}>
          <div className="resume-skills-grid" dir="rtl">
            {data.skillGroups?.map(group => <article key={group.group} dir={fa ? 'rtl' : 'ltr'}>
              <h2>{group.group}</h2><p>{group.items.join(' · ')}</p>
            </article>)}
          </div>
        </section>

        <section className="resume-section resume-experience">
          <header className="resume-section-title"><span>01</span><h2>{t.sections[0]}</h2></header>
          <div className="resume-jobs">
            {data.workExperience.map(job => <article className="resume-job" key={job.id}>
              <time dir={fa ? 'rtl' : 'ltr'}>{job.period}</time>
              <div className="resume-job-content" dir={fa ? 'rtl' : 'ltr'}>
                <h3><span>{job.company}</span><b>{job.title}</b></h3>
                <ul>{job.description.map(item => <li key={item}>{item}</li>)}</ul>
              </div>
            </article>)}
          </div>
        </section>

        <section className="resume-section resume-projects">
          <header className="resume-section-title"><span>02</span><h2>{t.sections[1]}</h2></header>
          <div className="resume-project-grid" dir="rtl">
            {t.projects.map(project => <article className={`resume-project resume-project-${project.slug}`} key={project.slug} dir={fa ? 'rtl' : 'ltr'}>
              <div className="resume-project-heading"><a href={`https://${project.url}`} dir="ltr">{project.url}</a><h3>{project.title}</h3></div>
              <h4>{project.subtitle}</h4>
              <ul>{project.bullets.map(bullet => <li key={bullet}>{bullet}</li>)}</ul>
            </article>)}
          </div>
          <p className="resume-other"><strong>{t.more}:</strong> {t.moreText}</p>
        </section>

        <footer className="resume-footer">
          <div className="resume-video"><strong>{t.view}</strong>{contact.youtube && <a href={contact.youtube}>youtube.com/@benyaminrmb</a>}</div>
          <div className="resume-credentials" dir={fa ? 'rtl' : 'ltr'}>
            <p><strong>{t.education}:</strong> {t.educationText.split('\n').join(' · ')}</p>
            <p><strong>{t.languages}:</strong> {t.languagesText.split('\n').join(' · ')}</p>
          </div>
        </footer>
      </article>
    </main>
  )
}
