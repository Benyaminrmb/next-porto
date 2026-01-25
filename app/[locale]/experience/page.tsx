import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { getData } from '@/lib/data';
import { Briefcase, GraduationCap, MapPin, Calendar } from 'lucide-react';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const data = await getData(locale);
  return {
    title: `Experience | ${data.name}`,
    description: 'My professional experience and education',
  };
}

export default async function ExperiencePage({ params }: PageProps) {
  const { locale } = await params;
  const data = await getData(locale);
  const t = await getTranslations('pages.experience');

  return (
    <main className="min-h-screen">
      <section className="section-padding relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[150px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-secondary/10 rounded-full blur-[120px]" />
          <div className="absolute inset-0 line-pattern opacity-30" />
        </div>

        <div className="section-container relative">
          {/* Header */}
          <div className="mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <Briefcase className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">
                {locale === 'fa' ? 'مسیر شغلی' : 'Career Path'}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">{t('title')}</h1>
            <p className="text-lg text-white/50 max-w-xl">
              {t('description')}
            </p>
          </div>

          {/* Work Experience */}
          <div className="mb-20">
            <div className="flex items-center gap-3 mb-10">
              <div className="p-2.5 rounded-xl bg-gradient-to-br from-primary to-primary/50">
                <Briefcase className="h-5 w-5 text-black" />
              </div>
              <h2 className="text-2xl font-bold tracking-tight text-white">{t('workExperience')}</h2>
            </div>

            <div className="space-y-6">
              {data.workExperience.map((exp, index) => (
                <div
                  key={exp.id}
                  className="relative pl-8 before:absolute before:left-[11px] before:top-12 before:bottom-0 before:w-px before:bg-gradient-to-b before:from-primary/50 before:to-transparent last:before:hidden"
                >
                  {/* Timeline dot */}
                  <div className="absolute left-0 top-0 w-6 h-6 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                  </div>

                  <div className="glass-card p-6 hover-glow transition-all">
                    <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                      <div>
                        <h3 className="font-bold text-xl text-white">{exp.title}</h3>
                        <p className="text-primary font-medium">{exp.company}</p>
                      </div>
                      <div className="flex flex-col items-end gap-1 text-sm text-white/40">
                        <span className="flex items-center gap-1.5">
                          <Calendar className="h-4 w-4" />
                          {exp.period}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <MapPin className="h-4 w-4" />
                          {exp.location}
                        </span>
                      </div>
                    </div>

                    <ul className="space-y-2 mb-4">
                      {exp.description.map((item, idx) => (
                        <li key={idx} className="text-sm text-white/60 flex items-start gap-3">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary/50 mt-1.5 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>

                    {exp.technologies && exp.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-2 pt-4 border-t border-white/[0.06]">
                        {exp.technologies.map((tech, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 text-xs font-medium rounded-full bg-white/[0.03] border border-white/[0.08] text-white/60"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div>
            <div className="flex items-center gap-3 mb-10">
              <div className="p-2.5 rounded-xl bg-gradient-to-br from-secondary to-secondary/50">
                <GraduationCap className="h-5 w-5 text-black" />
              </div>
              <h2 className="text-2xl font-bold tracking-tight text-white">{t('education')}</h2>
            </div>

            <div className="space-y-6">
              {data.education.map((edu) => (
                <div
                  key={edu.id}
                  className="relative pl-8 before:absolute before:left-[11px] before:top-12 before:bottom-0 before:w-px before:bg-gradient-to-b before:from-secondary/50 before:to-transparent last:before:hidden"
                >
                  {/* Timeline dot */}
                  <div className="absolute left-0 top-0 w-6 h-6 rounded-full bg-secondary/20 border-2 border-secondary flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-secondary" />
                  </div>

                  <div className="glass-card p-6 hover-glow transition-all">
                    <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                      <div>
                        <h3 className="font-bold text-xl text-white">{edu.title}</h3>
                        <p className="text-secondary font-medium">{edu.company}</p>
                      </div>
                      <div className="flex flex-col items-end gap-1 text-sm text-white/40">
                        <span className="flex items-center gap-1.5">
                          <Calendar className="h-4 w-4" />
                          {edu.period}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <MapPin className="h-4 w-4" />
                          {edu.location}
                        </span>
                      </div>
                    </div>

                    <ul className="space-y-2">
                      {edu.description.map((item, idx) => (
                        <li key={idx} className="text-sm text-white/60 flex items-start gap-3">
                          <span className="w-1.5 h-1.5 rounded-full bg-secondary/50 mt-1.5 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
