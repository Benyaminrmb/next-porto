import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { getData } from '@/lib/data';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const data = await getData(locale);
  return {
    title: `Projects | ${data.name}`,
    description: 'Browse my portfolio of web development projects',
  };
}

export default async function ProjectsPage({ params }: PageProps) {
  const { locale } = await params;
  const data = await getData(locale);
  const t = await getTranslations('pages.projects');

  return (
    <main className="min-h-screen pt-8">
      <section className="section-padding">
        <div className="section-container-wide">
          <div className="mb-12">
            <h1 className="text-3xl font-bold tracking-tight mb-3">{t('title')}</h1>
            <p className="text-muted-foreground max-w-xl">
              {t('description')}
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {data.projects.map((project) => (
              <Link
                key={project.id}
                href={project.slug ? `/${locale}/projects/${project.slug}` : '#'}
              >
                <Card className="overflow-hidden group hover:border-primary/50 transition-colors h-full">
                  {project.image && (
                    <div className="relative w-full aspect-video overflow-hidden border-b">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform group-hover:scale-105"
                        unoptimized
                      />
                    </div>
                  )}
                  <CardContent className="p-5">
                    <h2 className="font-medium mb-2 group-hover:text-primary transition-colors">
                      {project.title}
                    </h2>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {project.description}
                    </p>
                    {project.tags && project.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5">
                        {project.tags.slice(0, 4).map((tag, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
