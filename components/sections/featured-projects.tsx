"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, ArrowLeft } from "lucide-react";

interface Project {
  id: number;
  slug?: string;
  title: string;
  description: string;
  image?: string;
  tags?: string[];
}

interface FeaturedProjectsProps {
  projects: Project[];
}

export function FeaturedProjects({ projects }: FeaturedProjectsProps) {
  const pathname = usePathname();
  const locale = pathname.startsWith('/fa') ? 'fa' : 'en';
  const isRTL = locale === 'fa';
  const t = useTranslations('home');
  const tPages = useTranslations('pages.projects');

  return (
    <section className="section-padding border-t">
      <div className="section-container">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-2xl font-semibold tracking-tight">{t('featuredProjects')}</h2>
          <Link
            href={`/${locale}/projects`}
            className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
          >
            {tPages('viewAll')}
            {isRTL ? <ArrowLeft className="h-4 w-4" /> : <ArrowRight className="h-4 w-4" />}
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {projects.slice(0, 4).map((project) => (
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
                  <h3 className="font-medium mb-2 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {project.description}
                  </p>
                  {project.tags && project.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {project.tags.slice(0, 3).map((tag, idx) => (
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
  );
}
