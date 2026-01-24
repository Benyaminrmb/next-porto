import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { getData } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

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

const techStack = {
  backend: ['PHP', 'Laravel', 'Filament', 'Livewire', 'REST API', 'PostgreSQL', 'MySQL', 'Redis'],
  frontend: ['Vue.js', 'Nuxt.js', 'React', 'Next.js', 'TypeScript', 'Tailwind CSS'],
  tools: ['Git', 'Docker', 'CI/CD', 'Linux', 'Nginx'],
  other: ['SEO', 'PWA', 'Scrum', 'Team Leadership'],
};

export default async function AboutPage({ params }: PageProps) {
  const { locale } = await params;
  const data = await getData(locale);
  const t = await getTranslations('pages.about');

  return (
    <main className="min-h-screen pt-8">
      <section className="section-padding">
        <div className="section-container">
          {/* Header */}
          <div className="mb-16">
            <h1 className="text-3xl font-bold tracking-tight mb-4">{t('title')}</h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
              {data.description}
            </p>
          </div>

          {/* Tech Stack */}
          <div className="mb-16">
            <h2 className="text-xl font-semibold tracking-tight mb-6">{t('techStack')}</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-3">{t('backend')}</h3>
                <div className="flex flex-wrap gap-2">
                  {techStack.backend.map((tech) => (
                    <Badge key={tech} variant="secondary">{tech}</Badge>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-3">{t('frontend')}</h3>
                <div className="flex flex-wrap gap-2">
                  {techStack.frontend.map((tech) => (
                    <Badge key={tech} variant="secondary">{tech}</Badge>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-3">{t('tools')}</h3>
                <div className="flex flex-wrap gap-2">
                  {techStack.tools.map((tech) => (
                    <Badge key={tech} variant="secondary">{tech}</Badge>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-3">{t('other')}</h3>
                <div className="flex flex-wrap gap-2">
                  {techStack.other.map((tech) => (
                    <Badge key={tech} variant="outline">{tech}</Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <Separator className="my-12" />

          {/* Languages */}
          <div>
            <h2 className="text-xl font-semibold tracking-tight mb-6">{t('languages')}</h2>
            <div className="space-y-4">
              {data.languages.map((lang) => (
                <div key={lang.name} className="flex items-center justify-between max-w-sm">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{lang.flag}</span>
                    <span className="font-medium">{lang.name}</span>
                  </div>
                  <Badge variant="outline">{lang.level}</Badge>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
