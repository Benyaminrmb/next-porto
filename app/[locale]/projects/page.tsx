import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { getData } from '@/lib/data';
import { Folder, ArrowUpRight } from 'lucide-react';

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
    <main className="min-h-screen">
      <section className="section-padding relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-secondary/10 rounded-full blur-[150px]" />
          <div className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px]" />
          <div className="absolute inset-0 line-pattern opacity-30" />
        </div>

        <div className="section-container-wide relative">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 border border-secondary/20 mb-6">
              <Folder className="w-4 h-4 text-secondary" />
              <span className="text-sm font-medium text-secondary">
                {locale === 'fa' ? 'نمونه کارها' : 'Portfolio'}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">{t('title')}</h1>
            <p className="text-lg text-white/50 max-w-2xl mx-auto">
              {t('description')}
            </p>
          </div>

          {/* Projects Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {data.projects.map((project) => (
              <Link
                key={project.id}
                href={project.slug ? `/${locale}/projects/${project.slug}` : '#'}
                className="group block"
              >
                <div className="relative h-full glass-card overflow-hidden hover-glow transition-all duration-500 group-hover:border-primary/20">
                  {/* Image */}
                  {project.image && (
                    <div className="relative aspect-video overflow-hidden">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        unoptimized
                      />
                      {/* Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

                      {/* Hover Icon */}
                      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                        <div className="w-10 h-10 rounded-xl bg-primary/90 backdrop-blur flex items-center justify-center shadow-lg shadow-primary/25">
                          <ArrowUpRight className="w-5 h-5 text-black" />
                        </div>
                      </div>

                      {/* Title on Image */}
                      <div className="absolute bottom-0 left-0 right-0 p-5">
                        <h2 className="text-lg font-bold text-white group-hover:text-primary transition-colors">
                          {project.title}
                        </h2>
                      </div>
                    </div>
                  )}

                  {/* Content */}
                  <div className="p-5">
                    <p className="text-sm text-white/50 mb-4 line-clamp-2">
                      {project.description}
                    </p>
                    {project.tags && project.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {project.tags.slice(0, 3).map((tag, idx) => (
                          <span
                            key={idx}
                            className="px-2.5 py-1 text-xs font-medium rounded-full bg-white/[0.03] border border-white/[0.08] text-white/60"
                          >
                            {tag}
                          </span>
                        ))}
                        {project.tags.length > 3 && (
                          <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-primary/10 border border-primary/20 text-primary">
                            +{project.tags.length - 3}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
