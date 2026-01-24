import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { getData } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
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
    <main className="min-h-screen pt-8">
      <section className="section-padding">
        <div className="section-container">
          {/* Header */}
          <div className="mb-16">
            <h1 className="text-3xl font-bold tracking-tight mb-3">{t('title')}</h1>
            <p className="text-muted-foreground">
              {t('description')}
            </p>
          </div>

          {/* Work Experience */}
          <div className="mb-16">
            <div className="flex items-center gap-2 mb-8">
              <Briefcase className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-semibold tracking-tight">{t('workExperience')}</h2>
            </div>

            <div className="space-y-8">
              {data.workExperience.map((exp, index) => (
                <div key={exp.id} className="relative pl-6 border-l-2 border-border">
                  <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-primary" />

                  <div className="mb-2">
                    <h3 className="font-semibold text-lg">{exp.title}</h3>
                    <p className="text-primary font-medium">{exp.company}</p>
                  </div>

                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {exp.period}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {exp.location}
                    </span>
                  </div>

                  <ul className="space-y-2 mb-4">
                    {exp.description.map((item, idx) => (
                      <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                        <span className="w-1 h-1 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>

                  {exp.technologies && exp.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {exp.technologies.map((tech, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <Separator className="my-12" />

          {/* Education */}
          <div>
            <div className="flex items-center gap-2 mb-8">
              <GraduationCap className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-semibold tracking-tight">{t('education')}</h2>
            </div>

            <div className="space-y-8">
              {data.education.map((edu) => (
                <div key={edu.id} className="relative pl-6 border-l-2 border-border">
                  <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-secondary border-2 border-primary" />

                  <div className="mb-2">
                    <h3 className="font-semibold text-lg">{edu.title}</h3>
                    <p className="text-primary font-medium">{edu.company}</p>
                  </div>

                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {edu.period}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {edu.location}
                    </span>
                  </div>

                  <ul className="space-y-2">
                    {edu.description.map((item, idx) => (
                      <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                        <span className="w-1 h-1 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
