import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { getData } from '@/lib/data';
import { Code2, Database, Wrench, Users, Sparkles, User } from 'lucide-react';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const data = await getData(locale);
  return {
    title: `About | ${data.name}`,
    description: data.description,
  };
}

const skills = {
  backend: [
    { name: 'PHP / Laravel', level: 95 },
    { name: 'Filament / Livewire', level: 90 },
    { name: 'REST API Design', level: 90 },
    { name: 'PostgreSQL / MySQL', level: 85 },
    { name: 'Redis', level: 80 },
  ],
  frontend: [
    { name: 'Vue.js / Nuxt.js', level: 90 },
    { name: 'React / Next.js', level: 85 },
    { name: 'TypeScript', level: 85 },
    { name: 'Tailwind CSS', level: 95 },
  ],
  tools: [
    { name: 'Git / GitHub', level: 90 },
    { name: 'Docker', level: 75 },
    { name: 'CI/CD', level: 80 },
    { name: 'Linux / Nginx', level: 85 },
  ],
  soft: [
    { name: 'Team Leadership', level: 85 },
    { name: 'Scrum / Agile', level: 80 },
    { name: 'Problem Solving', level: 90 },
    { name: 'Communication', level: 85 },
  ],
};

const skillCategories = [
  { key: 'backend', icon: Database, gradient: 'from-primary to-primary/50', label: 'Backend', labelFa: 'بک‌اند' },
  { key: 'frontend', icon: Code2, gradient: 'from-secondary to-secondary/50', label: 'Frontend', labelFa: 'فرانت‌اند' },
  { key: 'tools', icon: Wrench, gradient: 'from-green-500 to-green-500/50', label: 'Tools & DevOps', labelFa: 'ابزارها' },
  { key: 'soft', icon: Users, gradient: 'from-yellow-500 to-yellow-500/50', label: 'Soft Skills', labelFa: 'مهارت‌های نرم' },
];

export default async function AboutPage({ params }: PageProps) {
  const { locale } = await params;
  const data = await getData(locale);
  const t = await getTranslations('pages.about');
  const isRTL = locale === 'fa';

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="section-padding relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[150px]" />
          <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[120px]" />
          <div className="absolute inset-0 line-pattern opacity-30" />
        </div>

        <div className="section-container relative">
          <div className="max-w-3xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8">
              <User className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">
                {locale === 'fa' ? 'درباره من' : 'About Me'}
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-white">
              {t('title')}
            </h1>

            <p className="text-lg text-white/50 leading-relaxed mb-12">
              {data.description}
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { value: '6+', label: locale === 'fa' ? 'سال تجربه' : 'Years Exp.' },
                { value: '50+', label: locale === 'fa' ? 'پروژه' : 'Projects' },
                { value: '20+', label: locale === 'fa' ? 'مشتری' : 'Clients' },
              ].map((stat, i) => (
                <div key={i} className="glass-card p-6 text-center hover-glow transition-all">
                  <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">{stat.value}</div>
                  <div className="text-sm text-white/40">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="section-padding relative">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-secondary/5 rounded-full blur-[150px]" />
        </div>

        <div className="section-container-wide relative">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 border border-secondary/20 mb-6">
              <Sparkles className="w-4 h-4 text-secondary" />
              <span className="text-sm font-medium text-secondary uppercase tracking-wider">
                {locale === 'fa' ? 'مهارت‌ها' : 'Skills'}
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-4">{t('techStack')}</h2>
            <p className="text-white/50 max-w-lg mx-auto">
              {locale === 'fa'
                ? 'تکنولوژی‌هایی که با آن‌ها کار می‌کنم'
                : 'Technologies I work with'}
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {skillCategories.map((category) => {
              const Icon = category.icon;
              const categorySkills = skills[category.key as keyof typeof skills];

              return (
                <div key={category.key} className="glass-card p-6 hover-glow transition-all">
                  <div className="flex items-center gap-3 mb-6">
                    <div className={`p-2.5 rounded-xl bg-gradient-to-br ${category.gradient}`}>
                      <Icon className="w-5 h-5 text-black" />
                    </div>
                    <h3 className="font-semibold text-lg text-white">
                      {isRTL ? category.labelFa : category.label}
                    </h3>
                  </div>

                  <div className="space-y-4">
                    {categorySkills.map((skill) => (
                      <div key={skill.name}>
                        <div className="flex justify-between mb-2">
                          <span className="text-sm font-medium text-white/80">{skill.name}</span>
                          <span className="text-sm text-white/40">{skill.level}%</span>
                        </div>
                        <div className="h-1.5 bg-white/[0.05] rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full bg-gradient-to-r ${category.gradient} transition-all duration-1000`}
                            style={{ width: `${skill.level}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Languages Section */}
      <section className="section-padding">
        <div className="section-container">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white mb-4">{t('languages')}</h2>
          </div>

          <div className="flex flex-wrap justify-center gap-6">
            {data.languages.map((lang) => (
              <div key={lang.name} className="glass-card p-6 text-center min-w-[140px] hover-glow transition-all">
                <span className="text-4xl mb-3 block">{lang.flag}</span>
                <span className="font-medium text-white mb-2 block">{lang.name}</span>
                <span className="text-xs px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary">
                  {lang.level}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
